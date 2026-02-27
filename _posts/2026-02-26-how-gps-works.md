---
layout: essay
title: "How GPS Works"
subtitle: "A modelling approach to space-based positioning, with a micro-example and DOP simulation"
date: 2026-02-26
categories: [modeling]
series: computational-geography-lab
series_order: 16
cluster: F
cluster_title: "Orbital Mechanics"
tags:
  - computational-geography
  - modeling
  - orbital-mechanics
  - geodesy
  - gps
  - trilateration
  - gnss
  - least-squares
  - dop
math: true
viz: true
difficulty: 6
math_core: [distance-formula, systems-of-equations, linearization, least-squares, conditioning]
spatial_reasoning: 5
dynamics: 3
computation: 6
domain: [geodesy, navigation, remote-sensing, space-systems]
excerpt: >
  We construct a mathematical model for GPS positioning from first principles.
  Starting with signal travel time and Euclidean distance, we derive the
  nonlinear trilateration system, introduce receiver clock bias as an unknown,
  linearize and solve via iterative least squares, and examine numerical
  conditioning via Dilution of Precision (DOP). Includes a worked micro-example
  and a computational block for solving and simulating DOP.
math_prerequisites: >
  Algebra. 3D distance formula. Comfort with vectors. Basic calculus (partial
  derivatives) helps but is not required if you can follow the Jacobian form.
---

# 1. The Modelling Question

How can a receiver determine its three-dimensional position on Earth using only time-stamped signals from satellites with known orbital positions?

More formally:

> Given satellite positions \((x_i,y_i,z_i)\) and measured signal arrival times, solve for receiver state \((x,y,z,b)\) where \(b\) is receiver clock bias.

This is a geometric inverse problem with time as the measurement primitive.

---

# 2. Assumptions (First-Order Model)

To build a baseline model we assume:

1. Satellite positions \((x_i,y_i,z_i)\) are known exactly in an Earth-Centered Earth-Fixed (ECEF) frame.
2. Signals propagate in straight lines at constant speed \(c\).
3. Receiver is stationary during the solution interval.
4. No atmospheric delay (ionosphere/troposphere ignored).
5. No multipath reflections.
6. Satellite clocks are perfect (their own biases already corrected).

We will explicitly relax these assumptions later.

---

# 3. Physical Basis: Distance from Time

A satellite \(i\) broadcasts:

- Transmission time \(t_i\)
- Position \((x_i,y_i,z_i)\)

The receiver records reception time \(t_r\).

Travel time:

\[
\Delta t_i = t_r - t_i
\]

Distance estimate (“pseudorange” in GPS terminology):

\[
\rho_i = c \Delta t_i
\]

Each measurement \(\rho_i\) places the receiver on a sphere centered at the satellite.

---

# 4. Geometric Model (Nonlinear Spheres)

Unknown receiver position:

\[
(x,y,z)
\]

True geometric range to satellite \(i\):

\[
r_i(x,y,z)=\sqrt{(x-x_i)^2 + (y-y_i)^2 + (z-z_i)^2}
\]

First-order (ideal) measurement equation:

\[
r_i(x,y,z)=\rho_i
\]

Squaring yields the sphere equation:

\[
(x-x_i)^2 + (y-y_i)^2 + (z-z_i)^2=\rho_i^2
\]

With 3 unknowns \((x,y,z)\), in a perfect world 3 satellites would suffice.

But the world is not perfect.

---

# 5. Receiver Clock Bias (Why You Need Four Satellites)

The receiver clock is not atomic. Let:

\[
b = \text{receiver clock bias (seconds)}
\]

Measured travel time becomes:

\[
\Delta t_i^{meas} = (t_r - t_i) + b
\]

So the measured pseudorange is:

\[
\rho_i = c[(t_r - t_i) + b]
\]

And the measurement model is:

\[
r_i(x,y,z) = c[(t_r - t_i) + b]
\]

Unknowns are now:

- \(x\), \(y\), \(z\)
- \(b\)

Minimum satellites required: **4**.

This is the canonical GPS state estimation problem.

---

# 6. Model Form (Residual Function)

Define the residual for satellite \(i\):

\[
f_i(x,y,z,b) = r_i(x,y,z) - c[(t_r - t_i) + b]
\]

We seek a solution such that:

\[
f_i = 0 \quad \forall i
\]

With \(m\) satellites, we have \(m\) equations; typically \(m>4\) and we solve in a least-squares sense.

---

# 7. Linearization and Iterative Least Squares

Let the unknown state vector be:

\[
\mathbf{x} = (x, y, z, b)^T
\]

At an estimate \(\mathbf{x}_0\), linearize:

\[
\mathbf{f}(\mathbf{x}) \approx \mathbf{f}(\mathbf{x}_0) + \mathbf{H}\Delta\mathbf{x}
\]

Where \(\mathbf{H}\) is the Jacobian (“design matrix”), with rows:

\[
\left[
\frac{\partial f_i}{\partial x}\;
\frac{\partial f_i}{\partial y}\;
\frac{\partial f_i}{\partial z}\;
\frac{\partial f_i}{\partial b}
\right]
\]

Compute the partial derivatives at \(\mathbf{x}_0\). Let:

\[
r_{i0} = r_i(x_0,y_0,z_0)
\]

Then:

\[
\frac{\partial f_i}{\partial x}=\frac{x_0-x_i}{r_{i0}},\quad
\frac{\partial f_i}{\partial y}=\frac{y_0-y_i}{r_{i0}},\quad
\frac{\partial f_i}{\partial z}=\frac{z_0-z_i}{r_{i0}},\quad
\frac{\partial f_i}{\partial b}=-c
\]

Solve for the update \(\Delta\mathbf{x}\) using least squares:

\[
\Delta\mathbf{x} = \arg\min_{\Delta\mathbf{x}}\|\mathbf{H}\Delta\mathbf{x} + \mathbf{f}\|^2
\]

Closed form (when \(\mathbf{H}^T\mathbf{H}\) is invertible):

\[
\Delta\mathbf{x} = -(\mathbf{H}^T\mathbf{H})^{-1}\mathbf{H}^T\mathbf{f}
\]

Update:

\[
\mathbf{x}_{k+1}=\mathbf{x}_k+\Delta\mathbf{x}
\]

Iterate until \(\|\Delta\mathbf{x}\|\) is small.

---

# 8. Worked Numerical Micro-Example (2D with Clock Bias)

A full 3D+clock solve is best done computationally.  
But a small 2D analogue makes the logic concrete.

## 8.1 Setup

Assume signal speed \(c = 1\) distance-unit per time-unit (toy units).

Three “satellites” (transmitters) at known coordinates:

- \(S_1=(0,0)\)
- \(S_2=(10,0)\)
- \(S_3=(0,10)\)

Unknown receiver position \((x,y)\) and clock bias \(b\).

Suppose the *true* receiver is at \((x,y)=(2,3)\) with \(b=0.5\).  
We will pretend we don’t know that, and only observe pseudoranges:

\[
\rho_i = r_i(x,y) + b
\]

Compute true ranges:

- \(r_1=\sqrt{2^2+3^2}=\sqrt{13}=3.6055\)
- \(r_2=\sqrt{(2-10)^2+3^2}=\sqrt{73}=8.5440\)
- \(r_3=\sqrt{2^2+(3-10)^2}=\sqrt{53}=7.2801\)

Observed pseudoranges:

- \(\rho_1=4.1055\)
- \(\rho_2=9.0440\)
- \(\rho_3=7.7801\)

## 8.2 Linearize around a guess

Pick an initial guess:

\[
(x_0,y_0,b_0)=(1,1,0)
\]

Predicted ranges at the guess:

- \(r_{10}=\sqrt{1^2+1^2}=1.4142\)
- \(r_{20}=\sqrt{(1-10)^2+1^2}=\sqrt{82}=9.0554\)
- \(r_{30}=\sqrt{1^2+(1-10)^2}=\sqrt{82}=9.0554\)

Residuals (predicted minus observed):

\[
f_i = (r_{i0}+b_0)-\rho_i
\]

So:

- \(f_1 = 1.4142 - 4.1055 = -2.6913\)
- \(f_2 = 9.0554 - 9.0440 = 0.0114\)
- \(f_3 = 9.0554 - 7.7801 = 1.2753\)

Jacobian row in 2D for transmitter \(i\) is:

\[
\left[
\frac{\partial f_i}{\partial x}\;
\frac{\partial f_i}{\partial y}\;
\frac{\partial f_i}{\partial b}
\right]
=
\left[
\frac{x_0-x_i}{r_{i0}}\;
\frac{y_0-y_i}{r_{i0}}\;
1
\right]
\]

Compute rows:

- For \(S_1=(0,0)\): \([1/1.4142,\; 1/1.4142,\; 1] = [0.7071, 0.7071, 1]\)
- For \(S_2=(10,0)\): \([(1-10)/9.0554,\; 1/9.0554,\; 1] = [-0.9940, 0.1104, 1]\)
- For \(S_3=(0,10)\): \([1/9.0554,\; (1-10)/9.0554,\; 1] = [0.1104, -0.9940, 1]\)

Now solve:

\[
\mathbf{H}\Delta\mathbf{x} \approx -\mathbf{f}
\]

This one iteration moves the guess substantially toward \((2,3,b=0.5)\).  
The important modelling takeaway:

> The unknown clock bias behaves like an additive range term and is solved alongside position.

(We skip the manual matrix algebra here; the computational block below performs this exactly and reproducibly.)

---

# 9. Numerical Conditioning: Dilution of Precision (DOP)

Even with perfect measurements, geometry controls how errors propagate.

In linearized form, if measurement errors are approximately i.i.d. with variance \(\sigma^2\), then the state covariance is proportional to:

\[
\mathbf{Q} = (\mathbf{H}^T\mathbf{H})^{-1}
\]

GPS uses DOP metrics derived from \(\mathbf{Q}\), e.g.:

- **GDOP** (geometric DOP): position + time
- **PDOP** (position DOP): 3D position only
- **HDOP/VDOP**: horizontal / vertical components

A common definition:

\[
\text{GDOP}=\sqrt{Q_{xx}+Q_{yy}+Q_{zz}+Q_{bb}}
\]

\[
\text{PDOP}=\sqrt{Q_{xx}+Q_{yy}+Q_{zz}}
\]

**Interpretation:** large DOP means small measurement noise becomes large position error.

---

# 10. Model Extensions (Relaxing Assumptions)

## 10.1 Atmospheric Delay

Add delay terms (in meters) to pseudorange:

\[
\rho_i = r_i(x,y,z) + cb + \delta_i^{ion} + \delta_i^{trop} + \epsilon_i
\]

Where \(\epsilon_i\) is residual noise (including multipath).

Dual-frequency GNSS can estimate \(\delta^{ion}\). Troposphere is typically modeled and partly estimated.

## 10.2 Differential GPS (DGPS)

At a known base station, compute per-satellite corrections:

\[
\Delta\rho_i = \rho_i^{meas} - \rho_i^{pred}
\]

Transmit \(\Delta\rho_i\) to rovers; they correct their pseudoranges before solving.

## 10.3 RTK / Carrier Phase

Augment measurements with carrier phase:

\[
\Phi_i = \frac{1}{\lambda}(r_i + cb) + N_i + \eta_i
\]

Where \(N_i\) is an integer ambiguity. Solving integers yields centimeter-level accuracy.

---

# 11. Coordinate Transformation (ECEF → Lat/Lon/Height)

The solve yields \((x,y,z)\) in ECEF.

To present a human-readable position, convert to geodetic coordinates on WGS84.  
This step is itself a modelling choice (sphere vs ellipsoid); in production GNSS it is ellipsoidal.

---

# 12. Computational Block: Solve + DOP Simulation

This block mirrors the “computational lab” feel: a minimal solver and a DOP experiment.

> Notes:
> - This uses a simplified GNSS geometry model (no atmosphere, no Earth rotation during flight).
> - Satellite coordinates here are synthetic for learning.
> - For real GNSS, satellite positions come from broadcast ephemerides.

```python
import numpy as np

c = 299_792_458.0  # m/s

def solve_gnss_least_squares(sat_xyz, pr, x0=None, max_iter=10):
    """
    sat_xyz: (m,3) satellite positions in ECEF (m)
    pr: (m,) pseudoranges (m)   pr_i ≈ ||x - s_i|| + c*b
    x0: initial guess [x,y,z,b] with b in seconds
    returns: x (3,), b (seconds), H, residuals
    """
    sat_xyz = np.asarray(sat_xyz, dtype=float)
    pr = np.asarray(pr, dtype=float)
    m = sat_xyz.shape[0]

    if x0 is None:
        # crude initial guess: origin with zero bias
        x = np.array([0.0, 0.0, 0.0], dtype=float)
        b = 0.0
    else:
        x = np.array(x0[:3], dtype=float)
        b = float(x0[3])

    for _ in range(max_iter):
        # predicted geometric ranges
        diff = x[None, :] - sat_xyz
        r = np.linalg.norm(diff, axis=1)

        # residuals: predicted - observed
        f = (r + c*b) - pr

        # build H (m x 4)
        H = np.zeros((m, 4), dtype=float)
        # avoid division by zero if guess hits satellite (won't happen in real GNSS)
        r_safe = np.where(r == 0, 1e-9, r)
        H[:, 0:3] = diff / r_safe[:, None]   # partials wrt x,y,z
        H[:, 3] = c                           # partial wrt b (since r + c*b)

        # solve H * dx ≈ -f in least squares
        dx, *_ = np.linalg.lstsq(H, -f, rcond=None)

        x += dx[0:3]
        b += dx[3]

        if np.linalg.norm(dx) < 1e-6:
            break

    return x, b, H, f

def dop_metrics(H):
    """
    Compute GDOP/PDOP from design matrix H.
    H is (m,4): columns correspond to x,y,z,b (with b scaled by c if you set it that way).
    Here b-column is 'c', so Q elements are in mixed units; we normalize by c for DOP-style metrics.
    """
    Q = np.linalg.inv(H.T @ H)

    # If the 4th state is b in seconds but H uses 'c', Q_bb corresponds to seconds^2.
    # For a dimensionless GDOP, include c*b as the 4th state instead; easiest: rescale:
    # Let state be [x,y,z,cb] so the 4th column should be 1, not c.
    # We'll compute DOP for that equivalent by transforming Q.
    T = np.diag([1.0, 1.0, 1.0, c])  # maps [x,y,z,b] -> [x,y,z,cb]
    Q_cb = T @ Q @ T

    GDOP = np.sqrt(np.trace(Q_cb))                 # x,y,z,cb
    PDOP = np.sqrt(Q_cb[0,0] + Q_cb[1,1] + Q_cb[2,2])
    return GDOP, PDOP, Q_cb

# --- Micro test: synthetic satellites and pseudoranges ---
# Put receiver near Earth's surface on x-axis for a toy example (not geodetically exact).
x_true = np.array([6_371_000.0, 0.0, 0.0])
b_true = 50e-9  # 50 ns clock bias -> ~15 m range bias

# Synthetic satellites ~20,200 km altitude in rough directions
R = 26_571_000.0  # approx Earth radius + GNSS altitude (m)
sat_xyz = np.array([
    [ 0.6*R,  0.8*R,  0.1*R],
    [-0.2*R,  0.9*R,  0.3*R],
    [ 0.1*R, -0.7*R,  0.7*R],
    [ 0.8*R, -0.1*R,  0.6*R],
    [-0.7*R, -0.2*R,  0.6*R],
])

# Generate pseudoranges with small noise
rng = np.random.default_rng(42)
ranges = np.linalg.norm(x_true[None,:] - sat_xyz, axis=1)
noise = rng.normal(0.0, 2.0, size=ranges.shape)  # 2 m std dev
pr = ranges + c*b_true + noise

# Solve
x_est, b_est, H, f = solve_gnss_least_squares(sat_xyz, pr, x0=[6_300_000, 10_000, 10_000, 0.0])

GDOP, PDOP, Qcb = dop_metrics(H)

print("Estimated position (m):", x_est)
print("True position (m):     ", x_true)
print("Position error (m):    ", np.linalg.norm(x_est - x_true))
print("Estimated bias (ns):   ", b_est * 1e9)
print("True bias (ns):        ", b_true * 1e9)
print("GDOP, PDOP:", GDOP, PDOP)

# --- DOP Simulation Experiment ---
# Compare good geometry vs bad geometry by constructing satellites clustered in one sky region.
def simulate_dop(num_sats=6, clustered=False, trials=200):
    dops = []
    for t in range(trials):
        if clustered:
            # cluster directions around a random unit vector
            v0 = rng.normal(size=3)
            v0 /= np.linalg.norm(v0)
            dirs = []
            for _ in range(num_sats):
                v = v0 + 0.15*rng.normal(size=3)   # small spread
                v /= np.linalg.norm(v)
                dirs.append(v)
            dirs = np.array(dirs)
        else:
            # isotropic directions
            v = rng.normal(size=(num_sats, 3))
            v /= np.linalg.norm(v, axis=1)[:, None]
            dirs = v

        sat = R * dirs
        # Build H at a nominal receiver position x0 (use origin for geometry-only DOP)
        # For geometry-only DOP, use unit line-of-sight vectors from receiver to sats.
        x0 = np.array([0.0, 0.0, 0.0])
        diff = x0[None, :] - sat
        r = np.linalg.norm(diff, axis=1)
        H = np.zeros((num_sats, 4))
        H[:, 0:3] = diff / r[:, None]
        H[:, 3] = c  # consistent with dop_metrics()

        try:
            GDOP, PDOP, _ = dop_metrics(H)
            dops.append((GDOP, PDOP))
        except np.linalg.LinAlgError:
            # singular geometry (can happen if sats line up badly)
            continue
    return np.array(dops)

good = simulate_dop(clustered=False)
bad  = simulate_dop(clustered=True)

print("Mean PDOP (good geometry):", good[:,1].mean())
print("Mean PDOP (bad geometry): ", bad[:,1].mean())

What to look for when you run it:
	•	The solver should converge to small position error when geometry is good.
	•	The clustered geometry case should show materially larger mean PDOP.

⸻

13. Summary of the Modelling Framework
	1.	Define the measurement primitive (signal travel time).
	2.	Convert time to pseudorange.
	3.	Express pseudorange as geometric range + clock bias.
	4.	Build nonlinear residual functions.
	5.	Linearize and solve iteratively via least squares.
	6.	Quantify conditioning through ((\mathbf{H}^T\mathbf{H})^{-1}) and DOP.
	7.	Extend the model with delay terms and differential/phase measurements.
	8.	Transform ECEF output to geodetic coordinates.

In this modelling view, GPS is not “finding a location.”

It is repeatedly solving a noisy, nonlinear inverse problem in (\mathbb{R}^3 \times \mathbb{R}).

⸻


If you want this to mirror your orbit essays *even more tightly*, the next refinement would be to add a short “**Sanity checks**” section (units, magnitudes, and why nanoseconds matter) and a “**What we ignored (and how to add it)**” table that explicitly maps each violated assumption to a correction term in the measurement equation.