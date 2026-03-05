---
layout: essay
title: "The Kalman Filter and Sequential Data Assimilation"
subtitle: "State-space models, optimal Kalman gain, and the ensemble Kalman filter"
date: 2026-03-05
categories: modelling
series: computational-geography-laboratory
series_order: 113
cluster: "AU — Ensemble Methods and Data Assimilation"
cluster_order: 2
tags: [math, viz, essay]
math: true
viz: true
math_core:
  - state-space representation
  - matrix algebra (Kalman gain, covariance propagation)
  - Bayesian updating in continuous state space
  - ensemble approximations of covariance
spatial_reasoning: state estimation across distributed observing networks
dynamics: sequential filter analysis-forecast cycle
computation: scalar and vector Kalman filter, EnKF
domain: data assimilation / geophysical modelling
difficulty: 5
prerequisites:
  - Z1
  - AU1
notebook_url: https://github.com/waywardhouse/computational-geography-lab/tree/main/essays/AU2-kalman-filter
excerpt: >
  A GPS receiver knows it is uncertain about its position. A Doppler radar knows
  it measures wind with uncertainty. A soil moisture model knows its parameter
  estimates are approximate. The Kalman filter optimally combines these uncertain
  estimates with uncertain observations, producing a state estimate that is better
  than either alone. This essay derives the linear Kalman filter from the Bayesian
  optimal estimation principle, implements it for a simple environmental tracking
  problem, extends to the Extended and Ensemble Kalman filters for nonlinear
  systems, and explains the observation operator that connects model state to
  satellite retrievals.
math_prerequisites: >
  Matrix multiplication and the concept of an inverse. Gaussian distributions
  and their multiplication (Essay Z1). The concept of variance as uncertainty.
  Bayesian updating (Essay Z1).
---

In 1960, Rudolf Kalman published "A New Approach to Linear Filtering and Prediction Problems" in the Journal of Basic Engineering. Within two years, his algorithm was implemented in the navigation computer of the Apollo spacecraft, where it fused gyroscope, accelerometer, and star tracker observations to estimate the spacecraft's position and velocity with sufficient precision to return astronauts safely from the Moon. Kalman's filter is arguably the most consequential algorithm in the history of applied mathematics.

In geophysical applications today, the Kalman filter and its nonlinear extensions are the mathematical backbone of numerical weather prediction: every 6 hours, thousands of in-situ observations (radiosondes, weather stations, ships, aircraft) and hundreds of millions of satellite observations are assimilated into a global model background state to produce the analysis — the optimal estimate of the atmosphere's current state — that becomes the initial condition for the next forecast cycle.

---

## 1. The Question

How do we combine a model prediction (uncertain) with an observation (also uncertain) to produce the best possible state estimate? How does this optimal weighting change as relative uncertainties change? How do we propagate the state uncertainty forward through a nonlinear dynamical model?

---

## 2. The Conceptual Model

The Kalman filter operates as a two-step cycle:

1. **Forecast step:** Use the dynamical model to propagate the current state estimate and its uncertainty forward in time, producing a **background** (or **prior**) state estimate $\mathbf{x}^b$ with background error covariance $\mathbf{P}^b$.

2. **Analysis step:** Observe the system at time $t$, producing observation vector $\mathbf{y}^o$ with observation error covariance $\mathbf{R}$. Optimally combine background and observations to produce the **analysis** (or **posterior**) state estimate $\mathbf{x}^a$ with analysis error covariance $\mathbf{P}^a$.

The analysis is better than either the background or the observation alone, by an amount that depends on their relative uncertainties.

---

## 3. Building the Mathematical Model

### 3.1 State-Space Representation

The state-space model consists of two equations:

**State transition (dynamics):**
$$\mathbf{x}_t = \mathbf{M}_{t-1}\mathbf{x}_{t-1} + \boldsymbol{\eta}_t, \quad \boldsymbol{\eta}_t \sim \mathcal{N}(\mathbf{0}, \mathbf{Q}_t)$$

**Observation equation:**
$$\mathbf{y}_t = \mathbf{H}_t\mathbf{x}_t + \boldsymbol{\epsilon}_t, \quad \boldsymbol{\epsilon}_t \sim \mathcal{N}(\mathbf{0}, \mathbf{R}_t)$$

where:
- $\mathbf{x}_t \in \mathbb{R}^n$ = state vector (e.g., temperature, wind, soil moisture at all grid points)
- $\mathbf{M}_t \in \mathbb{R}^{n\times n}$ = linear model operator (transition matrix)
- $\mathbf{Q}_t \in \mathbb{R}^{n\times n}$ = model error covariance (uncertainty added by the model at each step)
- $\mathbf{y}_t \in \mathbb{R}^p$ = observation vector ($p \ll n$ in typical geophysical applications)
- $\mathbf{H}_t \in \mathbb{R}^{p\times n}$ = **observation operator** (maps state space to observation space)
- $\mathbf{R}_t \in \mathbb{R}^{p\times p}$ = observation error covariance

### 3.2 Linear Kalman Filter Derivation

The Kalman filter provides the optimal linear unbiased estimate of $\mathbf{x}_t$ given all observations up to time $t$. Its optimality is in the sense of minimum error variance (the BLUE — Best Linear Unbiased Estimator).

**Forecast step (prior prediction):**

$$\mathbf{x}_t^b = \mathbf{M}_{t-1}\mathbf{x}_{t-1}^a$$

$$\mathbf{P}_t^b = \mathbf{M}_{t-1}\mathbf{P}_{t-1}^a\mathbf{M}_{t-1}^\top + \mathbf{Q}_{t-1}$$

The background covariance $\mathbf{P}^b$ grows as the model propagates uncertainty forward.

**Analysis step (posterior update):** The analysis is a weighted combination of background and observation:

$$\mathbf{x}_t^a = \mathbf{x}_t^b + \mathbf{K}_t(\mathbf{y}_t^o - \mathbf{H}_t\mathbf{x}_t^b)$$

where $\mathbf{y}_t^o - \mathbf{H}_t\mathbf{x}_t^b$ is the **innovation** or **departure** (observation minus background in observation space).

The **Kalman gain** $\mathbf{K}_t$ is the optimal weighting matrix:

$$\boxed{\mathbf{K}_t = \mathbf{P}_t^b\mathbf{H}_t^\top(\mathbf{H}_t\mathbf{P}_t^b\mathbf{H}_t^\top + \mathbf{R}_t)^{-1}}$$

The analysis error covariance:

$$\mathbf{P}_t^a = (\mathbf{I} - \mathbf{K}_t\mathbf{H}_t)\mathbf{P}_t^b$$

**Derivation intuition:** The Kalman gain minimises $\text{tr}(\mathbf{P}_t^a)$, the total analysis error variance. Setting the derivative to zero yields the formula above. Alternatively: the Kalman filter is the sequential Bayesian update of a Gaussian prior (background) with a Gaussian likelihood (observation), producing a Gaussian posterior (analysis). The Kalman gain is the precision-weighted combining formula from Essay Z1, generalised to multivariate Gaussians.

### 3.3 Scalar Case (Worked Algebra)

For a single state variable $x$ (scalar) observed directly ($H = 1$):

$$x_t^a = x_t^b + K(y^o - x_t^b), \quad K = \frac{P^b}{P^b + R}$$

$$P_t^a = (1-K)P_t^b = \frac{P^b R}{P^b + R} = \frac{1}{1/P^b + 1/R}$$

The analysis precision $(1/P^a)$ equals the sum of background and observation precisions:

$$\frac{1}{P^a} = \frac{1}{P^b} + \frac{1}{R}$$

This is exactly the Normal-Normal conjugate update from Essay Z1. When $P^b \ll R$ (background much more certain than observation): $K \approx 0$, $x^a \approx x^b$ (trust the background). When $P^b \gg R$ (observation much more certain): $K \approx 1$, $x^a \approx y^o$ (trust the observation).

### 3.4 The Observation Operator

In geophysical applications, the model state and the observations are rarely the same physical quantity. A **radiosonde** observes temperature and wind at a pressure level; the model state variable is temperature and wind on a model sigma-level. A **satellite brightness temperature** depends on the integral of atmospheric temperature weighted by a radiative transfer kernel. The observation operator $\mathbf{H}$ — which may be highly nonlinear — maps the model state to the equivalent of the observation.

**Examples:**

| Observation | Model state | Observation operator |
|---|---|---|
| Surface air temperature | 3D temperature field | Interpolation to surface level |
| Radiosonde temperature at 500 hPa | 3D temperature field | Vertical interpolation to pressure level |
| MODIS LST (land surface temp) | Skin temperature in model | Bi-linear interpolation to pixel centre |
| Passive microwave TB at 19 GHz | Snow water equivalent | Snow emission model (HUT, MEMLS) |
| GPS radio occultation bending angle | 3D T, q, P fields | Forward raytracing through atmosphere |

For a linear observation operator, $\mathbf{H}$ is a matrix. For nonlinear operators (most satellite observations), $\mathbf{H}$ is a function $h(\mathbf{x})$ and the analysis step uses $h(\mathbf{x}^b)$ instead of $\mathbf{H}\mathbf{x}^b$.

### 3.5 Extended Kalman Filter (EKF)

For nonlinear dynamics $\mathbf{x}_t = \mathcal{M}(\mathbf{x}_{t-1}) + \boldsymbol{\eta}$ and nonlinear observations $\mathbf{y}_t = h(\mathbf{x}_t) + \boldsymbol{\epsilon}$, the **Extended Kalman Filter** linearises around the current estimate:

$$\mathbf{M}_t \approx \left.\frac{\partial\mathcal{M}}{\partial\mathbf{x}}\right|_{\mathbf{x}_{t-1}^a} \quad\text{(Jacobian of model)}$$

$$\mathbf{H}_t \approx \left.\frac{\partial h}{\partial\mathbf{x}}\right|_{\mathbf{x}_t^b} \quad\text{(Jacobian of observation operator)}$$

These linear approximations are used in the Kalman gain computation while the nonlinear operators are used for the state propagation itself. The EKF is the standard approach in GPS navigation and robotics; for strongly nonlinear systems (chaotic atmospheric models), it diverges.

### 3.6 Ensemble Kalman Filter (EnKF)

The **Ensemble Kalman Filter** (Evensen 1994) replaces the explicit covariance matrices with their sample estimates from an ensemble of model states $\{\mathbf{x}^{(m)}\}_{m=1}^M$:

**Forecast ensemble:**

$$\mathbf{x}_t^{b,(m)} = \mathcal{M}(\mathbf{x}_{t-1}^{a,(m)}) + \boldsymbol{\eta}_t^{(m)}$$

**Sample background covariance:**

$$\hat{\mathbf{P}}_t^b = \frac{1}{M-1}\sum_{m=1}^M (\mathbf{x}_t^{b,(m)} - \bar{\mathbf{x}}_t^b)(\mathbf{x}_t^{b,(m)} - \bar{\mathbf{x}}_t^b)^\top$$

**Kalman gain using sample covariance:**

$$\hat{\mathbf{K}}_t = \hat{\mathbf{P}}_t^b\mathbf{H}^\top(\mathbf{H}\hat{\mathbf{P}}_t^b\mathbf{H}^\top + \mathbf{R})^{-1}$$

**Analysis update** (perturbed observations — Burgers et al. 1998):

$$\mathbf{x}_t^{a,(m)} = \mathbf{x}_t^{b,(m)} + \hat{\mathbf{K}}_t\left(\mathbf{y}_t^o + \boldsymbol{\epsilon}_t^{(m)} - h(\mathbf{x}_t^{b,(m)})\right)$$

where $\boldsymbol{\epsilon}_t^{(m)} \sim \mathcal{N}(\mathbf{0}, \mathbf{R})$ are perturbed observations (necessary to prevent filter inbreeding).

**Key EnKF advantages:**
- No need to explicitly compute or store $n\times n$ covariance matrices (impossible for $n = 10^7$ in global NWP)
- Sample covariance naturally captures flow-dependent structure (covariances are larger along weather system axes)
- Handles nonlinear models without explicit Jacobian computation

**EnKF limitations:**
- Sample covariance is rank-deficient (rank $\leq M - 1$); for $M = 50$ members and $n = 10^7$ state variables, the sample covariance is severely rank-deficient → **covariance localisation** (multiplying by a distance-based function) is required to suppress spurious long-range correlations

---

## 4. Worked Example by Hand

**Setting:** Estimating soil moisture $x$ at a single model grid point. Background estimate from model: $x^b = 0.28$ m³/m³, background variance $P^b = 0.0016$ (m³/m³)². Satellite passive microwave observation provides a soil moisture retrieval: $y^o = 0.22$ m³/m³, observation error variance $R = 0.0025$ (m³/m³)².

**Step 1: Innovation**

$d = y^o - x^b = 0.22 - 0.28 = -0.06$ m³/m³

**Step 2: Kalman gain**

$$K = \frac{P^b}{P^b + R} = \frac{0.0016}{0.0016 + 0.0025} = \frac{0.0016}{0.0041} = 0.390$$

**Step 3: Analysis**

$$x^a = x^b + K \cdot d = 0.28 + 0.390 \times (-0.06) = 0.28 - 0.0234 = 0.257 \text{ m}^3/\text{m}^3$$

**Step 4: Analysis uncertainty**

$$P^a = (1 - K)P^b = (1 - 0.390) \times 0.0016 = 0.610 \times 0.0016 = 0.000976$$

$\sigma^a = \sqrt{0.000976} = 0.031$ m³/m³ (improved from background $\sigma^b = \sqrt{0.0016} = 0.040$)

**Interpretation:** The satellite observation pulled the estimate from 0.28 toward 0.22; the final analysis 0.257 is a weighted average. The observation carries 39% of the weight (Kalman gain = 0.39). The analysis uncertainty (0.031) is smaller than either background (0.040) or observation ($\sqrt{0.0025}=0.050$) uncertainties — information from both sources combined.

**Precision check:** $1/P^a = 1/0.0016 + 1/0.0025 = 625 + 400 = 1025$. $P^a = 1/1025 = 0.000976$ ✓

---

## 5. Computational Implementation

```
function kalman_forecast(x_a_prev, P_a_prev, M_matrix, Q):
    x_b = M_matrix @ x_a_prev
    P_b = M_matrix @ P_a_prev @ M_matrix.T + Q
    return x_b, P_b

function kalman_analysis(x_b, P_b, y_obs, H, R):
    innovation = y_obs - H @ x_b
    S = H @ P_b @ H.T + R         # innovation covariance
    K = P_b @ H.T @ inv(S)        # Kalman gain
    x_a = x_b + K @ innovation
    P_a = (I - K @ H) @ P_b
    return x_a, P_a, K

function enkf_analysis(X_b, y_obs, H_fn, R, n_members):
    # X_b: n_state × n_members background ensemble
    x_bar = mean(X_b, axis=1)
    A = X_b - x_bar[:, None]          # anomaly matrix
    P_b_sample = A @ A.T / (M-1)
    
    # Innovation for each member (perturbed obs)
    Y = H_fn(X_b)                      # n_obs × n_members
    y_pert = y_obs[:, None] + normal(0, R_chol, (n_obs, M))
    D = y_pert - Y                     # innovation matrix
    
    # Kalman gain
    S = (Y - mean(Y,axis=1)[:,None]) @ (Y - mean(Y,axis=1)[:,None]).T / (M-1) + R
    K = P_b_sample @ H.T @ inv(S)
    
    X_a = X_b + K @ D
    return X_a
```

```{pyodide}
import numpy as np

rng = np.random.default_rng(42)

def kalman_filter_1d(observations, H, R, M_dyn, Q, x0, P0):
    """1D Kalman filter with dynamics."""
    n = len(observations)
    x_arr = np.zeros(n+1); P_arr = np.zeros(n+1)
    x_b_arr = np.zeros(n); P_b_arr = np.zeros(n)
    x_arr[0], P_arr[0] = x0, P0
    innovations = np.zeros(n)
    
    for t in range(n):
        # Forecast
        x_b = M_dyn * x_arr[t]
        P_b = M_dyn**2 * P_arr[t] + Q
        # Analysis
        K = P_b * H / (H**2 * P_b + R)
        innovations[t] = observations[t] - H * x_b
        x_arr[t+1] = x_b + K * innovations[t]
        P_arr[t+1] = (1 - K*H) * P_b
        x_b_arr[t], P_b_arr[t] = x_b, P_b
    return x_arr[1:], P_arr[1:], innovations

# Soil moisture tracking
n_steps = 30
true_sm = 0.25 + 0.03*np.sin(np.arange(n_steps)*2*np.pi/10) + rng.normal(0,0.01,n_steps)
obs_sm = true_sm + rng.normal(0, 0.05, n_steps)   # noisy satellite obs
obs_sm[5:12] = np.nan   # gap: no satellite obs for 7 days

# Run filter
valid_obs = np.where(np.isnan(obs_sm), obs_sm*0, obs_sm)  # handle NaN
x_filtered = []; P_filtered = []
x, P = 0.28, 0.0016

print("Soil moisture Kalman filter:")
print(f"{'Day':>4} {'Background':>12} {'Observation':>13} {'Analysis':>10} {'KG':>6} {'Unc':>6}")
for t in range(n_steps):
    # Forecast
    x_b = 0.99 * x  # slow drainage
    P_b = 0.99**2 * P + 0.0001  # model noise
    
    if not np.isnan(obs_sm[t]):
        R = 0.0025
        K = P_b / (P_b + R)
        x = x_b + K * (obs_sm[t] - x_b)
        P = (1-K) * P_b
        if t < 5 or t >= 12:
            print(f"{t:4d} {x_b:.4f}      {obs_sm[t]:.4f}        {x:.4f}    {K:.3f}  {P**0.5:.4f}")
    else:
        x, P = x_b, P_b
        if t == 5: print(f"{t:4d} {x_b:.4f}      no obs         {x:.4f}    (free run)")
    
    x_filtered.append(x); P_filtered.append(P)

x_filtered = np.array(x_filtered)
rmse_obs = np.sqrt(np.nanmean((obs_sm - true_sm)**2))
rmse_kf  = np.sqrt(np.mean((x_filtered - true_sm)**2))
print(f"\nRMSE: raw observations = {rmse_obs:.4f}, Kalman filter = {rmse_kf:.4f}")
```

---

## 6. Visualization

<div data-viz="echarts" style="height:420px" data-options='{
  "title": {"text": "Kalman Filter — Soil Moisture Tracking with Satellite Observations", "textStyle": {"fontSize": 14}},
  "tooltip": {"trigger": "axis"},
  "legend": {"data": ["True state", "Noisy observations", "Kalman filter analysis", "Background (no obs)"], "bottom": 0},
  "xAxis": {"name": "Day", "nameLocation": "middle", "nameGap": 28,
    "data": [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30]},
  "yAxis": {"name": "Soil moisture (m³/m³)", "nameLocation": "middle", "nameGap": 60, "min": 0.15, "max": 0.38},
  "series": [
    {"name": "True state", "type": "line", "smooth": true, "lineStyle": {"width": 2},
     "itemStyle": {"color": "#2E7D32"},
     "data": [0.25,0.27,0.28,0.27,0.25,0.24,0.25,0.27,0.28,0.27,0.25,0.24,0.25,0.27,0.28,0.27,0.25,0.24,0.25,0.27,0.28,0.27,0.25,0.24,0.25,0.27,0.28,0.27,0.25,0.24]},
    {"name": "Noisy observations", "type": "scatter",
     "itemStyle": {"color": "#90A4AE"},
     "data": [0.23,0.30,0.26,0.29,0.22,null,null,null,null,null,null,null,0.27,0.29,0.31,0.25,0.23,0.26,0.27,0.30,0.29,0.25,0.22,0.26,0.27,0.30,0.26,0.29,0.23,0.22]},
    {"name": "Kalman filter analysis", "type": "line", "smooth": true,
     "itemStyle": {"color": "#C62828"},
     "data": [0.24,0.27,0.27,0.27,0.24,0.24,0.23,0.23,0.22,0.22,0.21,0.21,0.24,0.27,0.29,0.27,0.24,0.25,0.26,0.28,0.28,0.26,0.24,0.25,0.26,0.28,0.27,0.28,0.25,0.23]},
    {"name": "Background (no obs)", "type": "line", "smooth": true,
     "lineStyle": {"type": "dashed", "color": "#F57F17"},
     "data": [null,null,null,null,null,0.24,0.24,0.24,0.23,0.23,0.23,0.22,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]}
  ]
}'></div>

During days 6–12 (no satellite observations), the Kalman filter background drifts slowly under the model dynamics. When observations resume at day 13, the filter rapidly corrects — the Kalman gain is larger (less certain background after free run), pulling the analysis strongly toward the observation. The filter tracks the true signal better than the raw noisy observations, confirming that optimal weighting reduces RMSE.

---

## 7. Interpretation

The Kalman gain formula $K = P^b/(P^b + R)$ has a beautiful physical interpretation: it weights the innovation by the fraction of total uncertainty attributable to the background. When the background is twice as uncertain as the observation ($P^b = 2R$), the gain is $2R/(2R+R) = 2/3$ — we move two-thirds of the way from background to observation. When uncertainties are equal ($P^b = R$), the gain is 1/2 — the analysis is the midpoint.

The analysis precision $1/P^a = 1/P^b + 1/R$ is the fundamental result: **data assimilation is precision arithmetic**. Every observation contributes its precision to the analysis, regardless of whether the observation confirms or contradicts the background. An observation that says "no change" is as valuable as one that says "big correction" — both add their precision to the analysis.

The EnKF's flow-dependent covariances are its crucial operational advantage. A weather system moving through the model domain creates correlated errors along its axis — the ensemble naturally captures these correlations because all members evolve under the same physical dynamics. A fixed background error covariance (as in 3D-Var, Essay AU3) cannot adapt to the current weather pattern.

---

## 8. What Could Go Wrong?

**Filter divergence.** If the background error covariance is underestimated (because $\mathbf{P}^b$ is computed incorrectly or the model error $\mathbf{Q}$ is too small), the Kalman gain becomes very small and the filter stops responding to observations. The analysis stays near the model background even when observations indicate large errors. Covariance inflation — multiplying $\mathbf{P}^b$ by a constant factor > 1 — is a practical remedy.

**Covariance localisation in EnKF.** Sample covariances from a 50-member ensemble are noisy — two grid points 3000 km apart will show spurious correlations just from sampling. Without localisation (multiplying the sample covariance by a taper function that goes to zero beyond a certain distance), the EnKF introduces spurious global updates from local observations. But localisation disrupts balance in the model state — observations that should affect both wind and pressure do not do so correctly when localised independently.

**Linear observation operator assumption.** The standard Kalman filter assumes $\mathbf{H}$ is linear. Satellite radiance observations are highly nonlinear functions of atmospheric temperature, moisture, and surface properties. The EKF uses the Jacobian (tangent linear) approximation; for strongly nonlinear or non-Gaussian situations (cloudy scenes, sea ice, non-Gaussian soil moisture), neither the EKF nor EnKF with Gaussian assumptions is optimal. Particle filters and nonlinear EnKF variants address this but at substantially higher computational cost.

**Double-counting of observations.** In operational NWP, observations are assimilated every 6 hours using a 6-hour analysis window. If the same satellite observation falls near the boundary between two windows, it may be used twice — once in each window. Observation thinning and temporal windowing protocols prevent this, but they are complex to implement correctly for observations with sub-hourly repeat cycles (geostationary imagers, dense GPS networks).

---

## 9. Summary

The Kalman filter optimally combines a model background $x^b$ (uncertainty $P^b$) with observation $y^o$ (uncertainty $R$) through the Kalman gain $K = P^b H^\top(HP^bH^\top + R)^{-1}$: analysis $x^a = x^b + K(y^o - Hx^b)$, analysis covariance $P^a = (I - KH)P^b$. Precisions add: $1/P^a = 1/P^b + 1/R$ (scalar case).

The state-space representation separates dynamics ($\mathbf{M}$, $\mathbf{Q}$) from observations ($\mathbf{H}$, $\mathbf{R}$). The observation operator $\mathbf{H}$ or $h(\mathbf{x})$ maps model state to observation space. EKF linearises $h$ via Jacobian for nonlinear observations. EnKF replaces explicit covariance matrices with ensemble sample covariances, enabling application to state spaces of dimension $10^7$ in operational NWP.

**Key equations:**

$$\mathbf{K} = \mathbf{P}^b\mathbf{H}^\top(\mathbf{H}\mathbf{P}^b\mathbf{H}^\top + \mathbf{R})^{-1}$$

$$\mathbf{x}^a = \mathbf{x}^b + \mathbf{K}(\mathbf{y}^o - \mathbf{H}\mathbf{x}^b)$$

$$\mathbf{P}^a = (\mathbf{I} - \mathbf{K}\mathbf{H})\mathbf{P}^b$$

$$1/P^a = 1/P^b + 1/R \quad\text{[scalar case]}$$

---

## Math Refresher

**Gaussian multiplication as precision addition.** Two Gaussian distributions $\mathcal{N}(\mu_1, \sigma_1^2)$ and $\mathcal{N}(\mu_2, \sigma_2^2)$ — one for a background estimate, one for an observation — multiply together (as in Bayes' theorem) to give a Gaussian with precision $1/\sigma^2 = 1/\sigma_1^2 + 1/\sigma_2^2$ and mean $\mu = \sigma^2(\mu_1/\sigma_1^2 + \mu_2/\sigma_2^2)$. This is the scalar Kalman filter. The multivariate Kalman filter generalises this to vectors: "precision" becomes the inverse covariance matrix (the precision matrix), and "adding precisions" becomes $(\mathbf{P}^a)^{-1} = (\mathbf{P}^b)^{-1} + \mathbf{H}^\top\mathbf{R}^{-1}\mathbf{H}$. The Kalman gain formula is the solution that makes this update equivalent to the precision-weighted mean.

**The innovation and its covariance.** The innovation $\mathbf{d} = \mathbf{y}^o - \mathbf{H}\mathbf{x}^b$ is the difference between the observation and the background's prediction of what the observation should be. Its covariance — called the innovation covariance or $\mathbf{S}$ matrix — is $\mathbf{S} = \mathbf{H}\mathbf{P}^b\mathbf{H}^\top + \mathbf{R}$: background uncertainty projected onto observation space plus observation uncertainty. The Kalman gain $\mathbf{K} = \mathbf{P}^b\mathbf{H}^\top\mathbf{S}^{-1}$ computes how much of the background state space should be corrected per unit innovation, weighted by the background-to-total covariance ratio.
