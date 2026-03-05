---
layout: essay
title: "Satellite Data Assimilation in Environmental Models"
subtitle: "Observation operators, variational assimilation, and land surface data assimilation"
date: 2026-03-05
categories: modelling
series: computational-geography-laboratory
series_order: 114
cluster: "AU — Ensemble Methods and Data Assimilation"
cluster_order: 3
tags: [math, viz, essay]
math: true
viz: true
math_core:
  - cost function minimisation (variational methods)
  - adjoint operators
  - observation error characterisation
  - background error covariances
spatial_reasoning: observation coverage and model grid
dynamics: 4D-Var trajectory assimilation
computation: 3D-Var cost function, observation operator examples
domain: numerical weather prediction / land surface modelling
difficulty: 5
prerequisites:
  - AU2
  - Z1
notebook_url: https://github.com/waywardhouse/computational-geography-lab/tree/main/essays/AU3-satellite-assimilation
excerpt: >
  More than one billion satellite observations are assimilated into global weather
  models every day. This essay explains the mathematical framework — variational
  assimilation — that ingests these observations while accounting for their
  uncertainties, the observation operators that translate model state to satellite
  radiances, the background error covariance that controls how information spreads
  spatially from each observation, and the 3D-Var and 4D-Var cost functions that
  are minimised to produce the analysis. Land surface data assimilation case
  studies illustrate how MODIS, SMOS, and Landsat observations constrain
  catchment-scale hydrological models.
math_prerequisites: >
  The Kalman filter framework (Essay AU2). Gradient descent and cost function
  minimisation. The concept of an adjoint (transpose) operator.
---

At 00:00 UTC every day, the ECMWF data assimilation system begins ingesting observations that have arrived in the previous 12 hours from: 3,000 radiosonde balloon soundings, 300,000 aircraft reports, 500,000 surface station observations, and approximately 40 million satellite observations from polar-orbiting and geostationary platforms. Six hours later, an analysis of the global atmosphere at 9 km horizontal resolution and 137 vertical levels is available as the initial condition for the forecast. The system that fuses these heterogeneous, asynchronous, uncertain data streams is variational data assimilation — one of the most computationally intensive mathematical procedures run routinely on Earth.

The core insight is that finding the "best" initial condition is equivalent to minimising a cost function that measures the distance from a background state (the model's prior estimate), penalised by the distances from all available observations, each weighted by the inverse of its error covariance.

---

## 1. The Question

How do we assimilate a billion observations per day into a model with $10^7$ state variables? How are satellite radiances connected to model state variables through observation operators? How do background error covariances control the spatial spreading of observational information? And how does the 4D-Var method extend assimilation to use observations over a time window to constrain the initial state?

---

## 2. The Conceptual Model

Variational data assimilation frames the analysis problem as minimisation of a quadratic cost function:

$$J(\mathbf{x}) = \underbrace{\frac{1}{2}(\mathbf{x} - \mathbf{x}^b)^\top\mathbf{B}^{-1}(\mathbf{x} - \mathbf{x}^b)}_{\text{background term}} + \underbrace{\frac{1}{2}\sum_i (\mathbf{y}_i^o - h_i(\mathbf{x}))^\top\mathbf{R}_i^{-1}(\mathbf{y}_i^o - h_i(\mathbf{x}))}_{\text{observation term}}$$

The minimum $\mathbf{x}^a = \arg\min J$ is the analysis — the model state that is simultaneously closest to the background (prior knowledge) and consistent with all observations (evidence). The solution is equivalent to the Kalman filter analysis when the model and operators are linear and errors are Gaussian, but the variational formulation scales to arbitrary problem size without needing to explicitly form the covariance matrices.

---

## 3. Building the Mathematical Model

### 3.1 The 3D-Var Cost Function

In **3D-Var** (three-dimensional variational assimilation), all observations within a time window are treated as simultaneous, and the cost function is minimised over the 3D model state at a single analysis time:

$$J(\mathbf{x}) = \frac{1}{2}(\mathbf{x} - \mathbf{x}^b)^\top\mathbf{B}^{-1}(\mathbf{x} - \mathbf{x}^b) + \frac{1}{2}(\mathbf{y}^o - H\mathbf{x})^\top\mathbf{R}^{-1}(\mathbf{y}^o - H\mathbf{x})$$

For linear $H$, the gradient:

$$\nabla_\mathbf{x} J = \mathbf{B}^{-1}(\mathbf{x} - \mathbf{x}^b) - H^\top\mathbf{R}^{-1}(\mathbf{y}^o - H\mathbf{x})$$

Setting $\nabla J = 0$ recovers the Kalman filter solution:

$$\mathbf{x}^a = \mathbf{x}^b + (\mathbf{B}^{-1} + H^\top\mathbf{R}^{-1}H)^{-1}H^\top\mathbf{R}^{-1}(\mathbf{y}^o - H\mathbf{x}^b)$$

$$= \mathbf{x}^b + \mathbf{B}H^\top(H\mathbf{B}H^\top + \mathbf{R})^{-1}(\mathbf{y}^o - H\mathbf{x}^b)$$

The $\mathbf{B}$ matrix (background error covariance) in 3D-Var plays the role of $\mathbf{P}^b$ in the Kalman filter. Unlike the Kalman filter where $\mathbf{P}^b$ is updated at each cycle, in 3D-Var $\mathbf{B}$ is fixed — it is estimated statistically from an ensemble of forecast error pairs and is held constant throughout the operational cycle.

**Why not just solve the linear system directly?** Because $\mathbf{B}$ is $n \times n$ with $n = 10^7$ — it cannot be stored explicitly (requires $10^{14}$ elements). Instead, $\mathbf{B}$ is implicitly represented through a sequence of operators: spectral transforms, recursive filters, and balance operators that collectively produce the same effect as multiplying by $\mathbf{B}^{1/2}$. The cost function is minimised using an iterative gradient descent algorithm (L-BFGS or conjugate gradient) that only requires evaluating $J$ and $\nabla J$, not forming $\mathbf{B}$ explicitly.

### 3.2 Background Error Covariance $\mathbf{B}$

The background error covariance $\mathbf{B}_{ij} = \text{Cov}(\varepsilon_i^b, \varepsilon_j^b)$ specifies the spatial structure of expected background errors. Its key properties:

**Spatial correlations:** $\mathbf{B}$ encodes how far observational information should spread. A temperature observation at one grid point should influence temperatures at nearby points (through $\mathbf{B}$ off-diagonal elements) but not at remote points.

**Cross-variable correlations:** Temperature and pressure are dynamically balanced (geostrophic balance). A temperature observation at 500 hPa should update both temperature and winds through the $\mathbf{B}$ cross-covariance. This **balance constraint** is built into the $\mathbf{B}$ representation through balance operators.

**Estimation methods:** The NMC method (Parrish and Derber 1992) estimates $\mathbf{B}$ from differences between 48-hour and 24-hour forecasts valid at the same time (both valid at $t+24$, initialized at $t+0$ and $t-24$). The difference approximates the forecast error covariance. The ensemble method uses an ensemble of model runs to directly sample the forecast error covariance — producing flow-dependent $\mathbf{B}$ estimates (used in hybrid 3D-Var/EnKF systems).

**Horizontal length scales** in operational NWP: ~200–500 km for temperature and wind; shorter for moisture (humidity has shorter correlation scales). In land surface assimilation: 5–50 km depending on land surface heterogeneity.

### 3.3 Observation Error Characterisation

The observation error $\boldsymbol{\epsilon}^o = \mathbf{y}^o - h(\mathbf{x}^t)$ (difference between observation and truth-equivalent) has three components:

1. **Instrument error:** Measurement noise intrinsic to the sensor ($\sim$0.1–1 K for infrared sounders)
2. **Representativeness error:** The observation represents a sub-grid scale process that the model cannot resolve (most important for precipitation and surface observations)
3. **Forward model error:** Error in the observation operator $h$ (e.g., radiative transfer model approximations)

In practice, the $\mathbf{R}$ matrix is assumed diagonal (observation errors are uncorrelated). This is incorrect for dense satellite observations (adjacent pixels are correlated by the point spread function and atmospheric radiative transfer) but simplifies the matrix inversion enormously. Accounting for interchannel and inter-pixel observation error correlations is an active research area.

**Observation thinning:** To reduce inter-observation correlations and computational cost, satellite observations are thinned to one per super-observation box (typically 50–200 km × 50–200 km). Information is lost, but the diagonal $\mathbf{R}$ assumption is better justified.

### 3.4 Observation Operators for Satellite Retrievals

Three types of satellite-derived quantities are assimilated:

**Type 1 — Radiances (direct assimilation):** The model state variables (temperature, humidity profiles) are passed through a **radiative transfer model** (RTTOV, CRTM) to compute the top-of-atmosphere radiance in the sensor's spectral channel. The forward model:

$$\mathbf{y}_{\text{sim}} = h_{\text{RT}}(T(z), q(z), \text{surface}, \text{clouds})$$

Direct radiance assimilation avoids the retrieval step and its assumptions, but requires the radiative transfer calculation to be fast (~1 ms per profile) and its Jacobian (tangent linear) to be available for the adjoint-based gradient computation.

**Type 2 — Retrieved profiles or column quantities:** The observation has been processed through a retrieval algorithm to produce a geophysical variable (e.g., AIRS temperature profile, SMOS soil moisture). The observation operator maps model state to the retrieved quantity. Care is needed because retrieval algorithms often impose smoothing constraints that create correlations in the $\mathbf{R}$ matrix.

**Type 3 — Reflectances and surface properties (land surface assimilation):** MODIS NDVI, Landsat surface temperature, or Sentinel-1 SAR backscatter are related to model state variables (LAI, skin temperature, soil moisture) through land surface parameterisations. These relationships are often highly nonlinear and uncertain.

### 3.5 4D-Var: Time-Window Assimilation

**4D-Var** extends the 3D-Var cost function to use observations at multiple times within an assimilation window $[t_0, t_N]$:

$$J(\mathbf{x}_0) = \frac{1}{2}(\mathbf{x}_0 - \mathbf{x}_0^b)^\top\mathbf{B}^{-1}(\mathbf{x}_0 - \mathbf{x}_0^b) + \frac{1}{2}\sum_{t=0}^N (\mathbf{y}_t^o - h(\mathbf{x}_t))^\top\mathbf{R}_t^{-1}(\mathbf{y}_t^o - h(\mathbf{x}_t))$$

where $\mathbf{x}_t = \mathcal{M}_{0 \to t}(\mathbf{x}_0)$ is the model trajectory starting from initial state $\mathbf{x}_0$.

The cost function is minimised over the initial state $\mathbf{x}_0$. Its gradient requires backpropagating observation residuals through the model using the **adjoint** (transpose of the tangent linear model):

$$\nabla_{\mathbf{x}_0} J = \mathbf{B}^{-1}(\mathbf{x}_0 - \mathbf{x}_0^b) + \mathcal{M}_{0\to N}^*\left[H_N^\top\mathbf{R}_N^{-1}(h(\mathbf{x}_N) - \mathbf{y}_N^o)\right] + \ldots$$

where $\mathcal{M}^*$ is the adjoint of the model. The adjoint propagates the sensitivity of $J$ with respect to the final state backwards in time to the initial state — the same mathematical operation as backpropagation in neural network training.

**4D-Var advantages over 3D-Var:**
- Uses information from the model dynamics to spread observational information in time
- Implicitly provides a flow-dependent background error covariance (through the model trajectory)
- Higher analysis quality, especially for observations between analysis times (aircraft, radiosondes)

**4D-Var computational cost:** Two full model integrations per outer loop iteration: one forward (to compute $J$) and one adjoint (to compute $\nabla J$). ECMWF uses 4D-Var with 12-hour windows; the minimisation requires ~100 iterations, totalling ~200 model integrations per analysis cycle.

### 3.6 Land Surface Data Assimilation

Land surface data assimilation (LDAS) applies the same framework to constrain catchment and land surface models with satellite retrievals. Key examples:

**SMOS/SMAP soil moisture into VIC or Noah-LSM:**

Observation operator: $h(\mathbf{x}) = \text{LPRM}(\sigma_{\text{soil}}, T_{\text{soil}}, \text{texture}) \to \text{TB}_{6-10\text{GHz}}$

Or in retrieval form: $h(\mathbf{x})$ = linear rescaling of model soil moisture to the retrieval observation space (CDF-matching).

Innovation covariance decomposition:
$$\mathbf{S} = \mathbf{H}\mathbf{P}^b\mathbf{H}^\top + \mathbf{R} = \sigma_{\text{model}}^2 + \sigma_{\text{obs}}^2$$

where $\sigma_{\text{model}}^2$ is modelled soil moisture variance and $\sigma_{\text{obs}}^2$ is satellite soil moisture retrieval uncertainty (~0.04 m³/m³ for SMOS).

**MODIS LAI into CLM or CABLE:**

LAI is estimated from MODIS reflectances; model LAI evolves from phenological equations. The observation operator is direct: $h(\mathbf{x}) = \text{LAI}_{\text{model}}$. Assimilation constrains the phenological model parameters and corrects transient LAI errors from cloud contamination in the forcing.

**GRACE total water storage into hydrological models:**

GRACE measures monthly changes in total water storage anomalies at ~300 km resolution. The observation operator integrates all model water storage compartments (soil layers, groundwater, snow, surface water): $h(\mathbf{x}) = \sum_k \Delta S_k$. EnKF assimilation of GRACE provides the only continental-scale constraint on deep soil and groundwater storage in data-sparse regions.

---

## 4. Worked Example by Hand

**Setting:** 3D-Var analysis for a single soil moisture variable at one grid point. Background $x^b = 0.28$ m³/m³ with background error variance $B = 0.0025$ (m³/m³)². Two observations available: in-situ probe $y_1^o = 0.25$, $R_1 = 0.0004$; satellite retrieval $y_2^o = 0.22$, $R_2 = 0.0025$ (both with $H = 1$).

**3D-Var cost function:**

$$J(x) = \frac{(x - 0.28)^2}{2 \times 0.0025} + \frac{(x - 0.25)^2}{2 \times 0.0004} + \frac{(x - 0.22)^2}{2 \times 0.0025}$$

$$= 200(x-0.28)^2 + 1250(x-0.25)^2 + 200(x-0.22)^2$$

**Gradient:** $\nabla J = 400(x-0.28) + 2500(x-0.25) + 400(x-0.22) = 0$

$$3300x = 400(0.28) + 2500(0.25) + 400(0.22) = 112 + 625 + 88 = 825$$

$$x^a = 825/3300 = 0.250 \text{ m}^3/\text{m}^3$$

**Analysis uncertainty:** $1/P^a = 1/B + 1/R_1 + 1/R_2 = 400 + 2500 + 400 = 3300 \Rightarrow P^a = 0.000303$, $\sigma^a = 0.0174$ m³/m³.

The in-situ probe carries the most weight (precision 2500 vs. 400 each for background and satellite) and pulls the analysis toward 0.25. The analysis is the precision-weighted average, and the analysis variance is smaller than any individual component.

---

## 5. Computational Implementation

```
function cost_3dvar(x, x_b, B_inv, y_obs_list, H_list, R_inv_list):
    # Background term
    dx = x - x_b
    J_b = 0.5 * dx.T @ B_inv @ dx
    # Observation terms
    J_o = 0
    for y, H, R_inv in zip(y_obs_list, H_list, R_inv_list):
        innov = y - H @ x
        J_o += 0.5 * innov.T @ R_inv @ innov
    return J_b + J_o

function gradient_3dvar(x, x_b, B_inv, y_obs_list, H_list, R_inv_list):
    grad = B_inv @ (x - x_b)
    for y, H, R_inv in zip(y_obs_list, H_list, R_inv_list):
        innov = y - H @ x
        grad -= H.T @ R_inv @ innov
    return grad

function minimise_3dvar(x_b, B_inv, y_obs_list, H_list, R_inv_list):
    return minimize(lambda x: cost_3dvar(x, ...), x0=x_b,
                    jac=lambda x: gradient_3dvar(x, ...),
                    method='L-BFGS-B')

function observation_operator_soil(model_sm, obs_depth=5):
    # Simple exponential weighting to observation depth
    return model_sm * exp(-obs_depth/10)

function rttov_jacobian(T_profile, q_profile, channel):
    # Tangent linear of RT model: dTB/dT, dTB/dq
    # In practice: call RTTOV TL model
    H_T = forward_rttov(T_profile + epsilon, q_profile, channel) - rttov(T_profile, q_profile, channel)
    return H_T / epsilon
```

```{pyodide}
import numpy as np
from scipy.optimize import minimize

def cost_3dvar(x, x_b, B_inv, obs_data):
    J = 0.5 * np.dot(x - x_b, B_inv * (x - x_b))   # B_inv diagonal
    for y, H, R_inv in obs_data:
        innov = y - H * x
        J += 0.5 * innov**2 * R_inv
    return J

def grad_3dvar(x, x_b, B_inv, obs_data):
    g = B_inv * (x - x_b)
    for y, H, R_inv in obs_data:
        innov = y - H * x
        g -= H * R_inv * innov
    return g

# Single-variable case (scalar)
x_b = np.array([0.28])
B_inv = np.array([1/0.0025])   # 400

# Observations: (value, H, R_inv)
obs = [(np.array([0.25]), 1.0, 1/0.0004),   # in-situ probe
       (np.array([0.22]), 1.0, 1/0.0025)]   # satellite retrieval

result = minimize(lambda x: cost_3dvar(x, x_b, B_inv, obs),
                  x0=x_b, jac=lambda x: grad_3dvar(x, x_b, B_inv, obs))

x_a = result.x[0]
P_a = 1.0 / (B_inv[0] + sum(R_inv for _, _, R_inv in obs))
print(f"3D-Var analysis:")
print(f"  Background: {x_b[0]:.4f} m³/m³  (σ = {1/B_inv[0]**0.5:.4f})")
print(f"  In-situ:    {obs[0][0][0]:.4f} m³/m³  (σ = {obs[0][2]**-0.5:.4f})")
print(f"  Satellite:  {obs[1][0][0]:.4f} m³/m³  (σ = {obs[1][2]**-0.5:.4f})")
print(f"  Analysis:   {x_a:.4f} m³/m³  (σ = {P_a**0.5:.4f})")
print(f"  Weights: bg={B_inv[0]/(B_inv[0]+sum(r for _,_,r in obs)):.2f}, "
      f"insitu={obs[0][2]/(B_inv[0]+sum(r for _,_,r in obs)):.2f}, "
      f"sat={obs[1][2]/(B_inv[0]+sum(r for _,_,r in obs)):.2f}")

# Sensitivity analysis: how does analysis change with different R_satellite?
print(f"\nSensitivity to satellite error:")
for sigma_sat in [0.01, 0.03, 0.05, 0.08, 0.12]:
    obs_test = [(np.array([0.25]), 1.0, 1/0.0004),
                (np.array([0.22]), 1.0, 1/sigma_sat**2)]
    r = minimize(lambda x: cost_3dvar(x, x_b, B_inv, obs_test),
                 x0=x_b, jac=lambda x: grad_3dvar(x, x_b, B_inv, obs_test))
    print(f"  σ_sat={sigma_sat:.2f}: x_a={r.x[0]:.4f}")
```

---

## 6. Visualization

<div data-viz="echarts" style="height:420px" data-options='{
  "title": {"text": "3D-Var Cost Function — Analysis as Minimum of Background + Observation Terms", "textStyle": {"fontSize": 14}},
  "tooltip": {"trigger": "axis"},
  "legend": {"data": ["Background term J_b", "Observation term J_o", "Total cost J", "Analysis x_a"], "bottom": 0},
  "xAxis": {"name": "Soil moisture x (m³/m³)", "nameLocation": "middle", "nameGap": 30,
    "data": ["0.18","0.20","0.22","0.24","0.25","0.26","0.27","0.28","0.30","0.32","0.35"]},
  "yAxis": {"name": "Cost J(x)", "nameLocation": "middle", "nameGap": 45, "min": 0},
  "series": [
    {"name": "Background term J_b", "type": "line", "smooth": true,
     "itemStyle": {"color": "#90A4AE"},
     "data": [4.0, 2.88, 1.92, 0.88, 0.45, 0.18, 0.05, 0.0, 0.18, 0.72, 2.45]},
    {"name": "Observation term J_o", "type": "line", "smooth": true,
     "itemStyle": {"color": "#1565C0"},
     "data": [6.32, 3.87, 2.15, 0.88, 0.45, 0.30, 0.40, 0.72, 1.85, 3.85, 8.35]},
    {"name": "Total cost J", "type": "line", "smooth": true, "lineStyle": {"width": 3},
     "itemStyle": {"color": "#C62828"},
     "data": [10.32, 6.75, 4.07, 1.76, 0.90, 0.48, 0.45, 0.72, 2.03, 4.57, 10.80]},
    {"name": "Analysis x_a", "type": "line",
     "lineStyle": {"type": "dashed", "color": "#2E7D32"},
     "data": [null,null,null,null,null,0.48,null,null,null,null,null],
     "markPoint": {"data": [{"name":"min", "coord":["0.26","0.45"]}]}}
  ]
}'></div>

The background term (grey) is minimised at $x^b = 0.28$; the observation term (blue) is minimised at the precision-weighted mean of the two observations (~0.245). The total cost (red) achieves its minimum at the analysis $x^a = 0.250$ — slightly below the background, close to the precise in-situ observation, and less influenced by the noisier satellite retrieval. The parabolic shape of the cost function reflects the Gaussian error assumptions.

---

## 7. Interpretation

The 3D-Var framework makes the observational influence on the analysis transparent. A highly precise observation (small $R$) contributes a steep, narrow parabola to $J$; an imprecise observation contributes a broad, flat parabola. The analysis is the minimum of their sum — geometrically, the point where the "tension" between all observations and the background is balanced. In this precision-weighted view, a useless observation ($R \to \infty$) contributes zero curvature to $J_o$ and has no influence on the analysis.

The $\mathbf{B}$ matrix is the most consequential and most uncertain component of the system. Its spatial correlation structure determines how far observational information spreads: a temperature observation in Edmonton updates temperatures not just at the Edmonton grid point, but at all points within the correlation length scale of the background error — typically 200–500 km in the midlatitude troposphere. If $\mathbf{B}$ has too-short correlation length scales, information from sparse observing networks does not spread far enough; too-long length scales produce overly smooth analyses that blur sharp fronts.

The operational progression from 3D-Var to 4D-Var represents a fundamental improvement: by using the model dynamics to propagate observational information in time, 4D-Var effectively has a flow-dependent $\mathbf{B}$ that adjusts to the current weather pattern. An observation near a jet stream contributes information along the jet axis (long correlation length scales); an observation in a diffluent trough contributes information over a shorter range. This flow-dependence is what allows 4D-Var to extract more meteorological value from the same observation network.

---

## 8. What Could Go Wrong?

**Linearisation errors in the adjoint.** The 4D-Var adjoint is derived from the tangent linear model — a linearisation of the full nonlinear dynamics around the background trajectory. For strongly nonlinear processes (deep convection, model shock formation, land surface freeze-thaw transitions), the tangent linear approximation breaks down. The gradient is computed incorrectly, the minimisation converges slowly or to a local minimum, and the resulting analysis can be degraded compared to no assimilation. Ensemble-based methods (EnKF, EnVar) avoid this by sampling the error distribution rather than linearising.

**Bias in observations or model.** The cost function assumes all errors are zero-mean. Systematic bias in the background (model biases: cold tropical stratosphere, warm Arctic surface) or in observations (instrument calibration drift, uncorrected cloud effects in satellite retrievals) produces a biased analysis. Variational bias correction (VarBC) estimates and removes observation biases as part of the minimisation, but requires a long training period to converge.

**Observation error correlation neglect.** The diagonal $\mathbf{R}$ assumption is wrong for satellite data. Adjacent IASI radiance channels are correlated by the instrument point spread function and atmospheric radiative transfer. Ignoring these correlations leads to suboptimal weighting — either inflating or deflating the influence of satellite observations. Implementing full $\mathbf{R}$ matrices for high-density satellite data is computationally tractable with modern storage but requires careful estimation of the off-diagonal elements.

**Land surface parameter uncertainty.** In land surface data assimilation, the soil moisture observation operator depends on soil texture, vegetation cover, and surface roughness — all uncertain model parameters. Assimilating soil moisture retrievals while ignoring parameter uncertainty produces state updates that are inconsistent with the assumed model structure, potentially degrading rather than improving predictions of soil temperature, evapotranspiration, and runoff.

---

## 9. Summary

3D-Var minimises the cost function $J(\mathbf{x}) = \frac{1}{2}(\mathbf{x}-\mathbf{x}^b)^\top\mathbf{B}^{-1}(\mathbf{x}-\mathbf{x}^b) + \frac{1}{2}(\mathbf{y}^o-H\mathbf{x})^\top\mathbf{R}^{-1}(\mathbf{y}^o-H\mathbf{x})$, producing the analysis as a precision-weighted combination of background and observations. For linear operators, the 3D-Var analysis equals the Kalman filter analysis; the $\mathbf{B}$ matrix plays the role of $\mathbf{P}^b$.

4D-Var extends the cost function over a time window $[t_0, t_N]$, using the model trajectory $\mathbf{x}_t = \mathcal{M}_{0\to t}(\mathbf{x}_0)$ and its adjoint to propagate observational information in time. Satellite radiances are assimilated through nonlinear observation operators (RTTOV for atmospheric sounding, emission models for passive microwave land surface). In land surface assimilation, SMOS/SMAP soil moisture, MODIS LAI, and GRACE total water storage constrain hydrological models at catchment to continental scales.

**Key equations:**

$$J(\mathbf{x}) = \tfrac{1}{2}(\mathbf{x}-\mathbf{x}^b)^\top\mathbf{B}^{-1}(\mathbf{x}-\mathbf{x}^b) + \tfrac{1}{2}(\mathbf{y}^o-H\mathbf{x})^\top\mathbf{R}^{-1}(\mathbf{y}^o-H\mathbf{x})$$

$$\mathbf{x}^a = \mathbf{x}^b + \mathbf{B}H^\top(H\mathbf{B}H^\top + \mathbf{R})^{-1}(\mathbf{y}^o - H\mathbf{x}^b)$$

$$\nabla J = \mathbf{B}^{-1}(\mathbf{x}-\mathbf{x}^b) - H^\top\mathbf{R}^{-1}(\mathbf{y}^o - H\mathbf{x})$$

$$1/P^a = 1/B + \sum_i H_i^2/R_i \quad\text{[scalar, multiple obs]}$$

---

## Math Refresher

**The adjoint operator.** For a linear operator $H: \mathbb{R}^n \to \mathbb{R}^p$ (a matrix), the adjoint is its transpose $H^\top: \mathbb{R}^p \to \mathbb{R}^n$. In 4D-Var, the adjoint of the full model $\mathcal{M}_{0\to N}$ maps a sensitivity at time $N$ (gradient of $J$ with respect to the final state) back to time 0 (gradient with respect to the initial state). This is computed by running the model backwards in time, propagating sensitivity rather than state. The computational cost of one adjoint run equals approximately one forward run — the reason 4D-Var is expensive is not that the adjoint is hard to run, but that many forward-adjoint cycles are needed to converge the minimisation.

**Quadratic minimisation.** The 3D-Var cost function $J(\mathbf{x})$ is a quadratic form — a bowl-shaped surface in $n$-dimensional space with exactly one minimum. Gradient descent on a quadratic function converges exactly in $n$ steps using the conjugate gradient method. In practice, the effective dimensionality is much smaller (the leading eigenvectors of $\mathbf{B}$ and $H^\top\mathbf{R}^{-1}H$ span only a few hundred to a few thousand directions), so convergence is achieved in 50–100 iterations rather than $10^7$. The structure of $\mathbf{B}$ (smooth, large-scale covariances) is what allows such rapid convergence — a poorly conditioned $\mathbf{B}$ would require many more iterations.
