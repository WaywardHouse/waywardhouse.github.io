---
layout: model
title: "Regression for Continuous Spatial Variables"
subtitle: "Regularisation, bias-variance tradeoff, spatial cross-validation, and random forest regression"
date: 2026-03-05
categories: modelling
series: computational-geography-laboratory
series_order: 110
cluster: "Z — Foundations of Geographic Machine Learning"
cluster_order: 2
tags: [math, viz, essay]
math: true
viz: true
math_core:
  - ordinary least squares and normal equations
  - regularisation (L1 and L2 penalties)
  - bias-variance decomposition
  - tree-based ensemble methods
spatial_reasoning: spatial autocorrelation and cross-validation design
dynamics: feature engineering from gridded environmental datasets
computation: ridge/lasso regression, random forest
domain: spatial statistics / geographic machine learning
difficulty: 4
prerequisites:
  - Z1
  - C8
notebook_url: https://github.com/waywardhouse/computational-geography-lab/tree/main/essays/Z2-spatial-regression
excerpt: >
  Predicting continuous spatial variables — soil organic carbon, land surface
  temperature, species richness — from raster covariates is one of the most
  common tasks in computational geography. This essay reviews ordinary least
  squares, derives the ridge and lasso regularisation penalties, explains the
  bias-variance tradeoff that motivates them, shows why standard k-fold cross-
  validation fails for spatial data and how spatial cross-validation corrects it,
  introduces random forest regression for nonlinear relationships, and
  distinguishes prediction intervals from confidence intervals.
math_prerequisites: >
  Matrix notation and the idea of a dot product. Basic calculus for the
  OLS derivation. The concepts of variance and covariance. The normal
  distribution (Essay AR2).
---

In 2019, the International Soil Reference and Information Centre completed a global mapping exercise that assigned a soil organic carbon (SOC) value to every 250 m grid cell on Earth's land surface. They did not measure SOC at every cell — there are approximately 800 million such cells on the global land surface. They measured it at 150,000 sites and used regression models, trained on those measurements, to predict SOC everywhere else from covariate rasters: climate variables, vegetation indices, terrain attributes, and soil parent material classes.

This process — spatially exhaustive prediction from point observations using covariates — is the central task of environmental machine learning. Its success depends on understanding which regression method is appropriate, how to validate that it generalises correctly to new locations, and how to honestly communicate prediction uncertainty.

---

## 1. The Question

How do we build a model that predicts a continuous spatial variable from raster covariates? How do we prevent overfitting when covariates are many and correlated? Why does standard cross-validation overestimate predictive skill for spatial data, and what should we do instead? What does a random forest add beyond linear regression?

---

## 2. The Conceptual Model

Regression models a response variable $y$ (observed at $n$ locations) as a function of $p$ predictor variables (covariates) $\mathbf{x} = (x_1, \ldots, x_p)$. The goal is a function $\hat{f}(\mathbf{x})$ that predicts $y$ at unsampled locations with minimum expected error. The challenge: with many covariates (a raster stack of 20 bands means 20 predictors), the model may fit the training data well but generalise poorly to new locations — **overfitting**.

---

## 3. Building the Mathematical Model

### 3.1 Ordinary Least Squares

For $n$ observations, $p$ predictors, response vector $\mathbf{y} \in \mathbb{R}^n$, design matrix $\mathbf{X} \in \mathbb{R}^{n \times p}$:

$$\hat{\boldsymbol{\beta}}_{\text{OLS}} = \arg\min_{\boldsymbol{\beta}} \|\mathbf{y} - \mathbf{X}\boldsymbol{\beta}\|_2^2 = \arg\min_{\boldsymbol{\beta}} \sum_{i=1}^n (y_i - \mathbf{x}_i^\top\boldsymbol{\beta})^2$$

Setting the gradient to zero (normal equations):

$$\mathbf{X}^\top\mathbf{X}\hat{\boldsymbol{\beta}} = \mathbf{X}^\top\mathbf{y} \quad\Rightarrow\quad \hat{\boldsymbol{\beta}}_{\text{OLS}} = (\mathbf{X}^\top\mathbf{X})^{-1}\mathbf{X}^\top\mathbf{y}$$

OLS is the **Best Linear Unbiased Estimator (BLUE)** under the Gauss-Markov assumptions: errors are zero-mean, homoscedastic ($\text{Var}(\varepsilon_i) = \sigma^2$), and uncorrelated. **Spatial data frequently violates the uncorrelated errors assumption** — nearby observations share similar unmeasured environmental conditions, creating **spatial autocorrelation** in residuals. This does not bias $\hat{\boldsymbol{\beta}}$, but it inflates apparent precision (standard errors are too small, t-tests are anti-conservative).

### 3.2 Ridge Regression (L2 Regularisation)

Ridge regression adds a penalty on the sum of squared coefficients:

$$\hat{\boldsymbol{\beta}}_{\text{ridge}} = \arg\min_{\boldsymbol{\beta}} \left[\|\mathbf{y} - \mathbf{X}\boldsymbol{\beta}\|_2^2 + \lambda\|\boldsymbol{\beta}\|_2^2\right]$$

where $\lambda \geq 0$ is the **regularisation parameter**. Closed-form solution:

$$\hat{\boldsymbol{\beta}}_{\text{ridge}} = (\mathbf{X}^\top\mathbf{X} + \lambda\mathbf{I})^{-1}\mathbf{X}^\top\mathbf{y}$$

Adding $\lambda\mathbf{I}$ to $\mathbf{X}^\top\mathbf{X}$ makes the matrix invertible even when $\mathbf{X}$ is rank-deficient (more predictors than observations, or highly collinear predictors). Ridge shrinks all coefficients toward zero proportionally — large $\lambda$ produces strong shrinkage. It never sets coefficients exactly to zero.

**Bayesian interpretation:** Ridge is equivalent to OLS with a Normal prior on coefficients: $\beta_j \sim \mathcal{N}(0, \sigma^2/\lambda)$. The posterior mode under this prior is $\hat{\boldsymbol{\beta}}_{\text{ridge}}$.

### 3.3 Lasso Regression (L1 Regularisation)

Lasso replaces the L2 penalty with an L1 penalty:

$$\hat{\boldsymbol{\beta}}_{\text{lasso}} = \arg\min_{\boldsymbol{\beta}} \left[\|\mathbf{y} - \mathbf{X}\boldsymbol{\beta}\|_2^2 + \lambda\|\boldsymbol{\beta}\|_1\right]$$

where $\|\boldsymbol{\beta}\|_1 = \sum_j |\beta_j|$. No closed-form solution (the L1 norm is not differentiable at zero), but efficient coordinate descent algorithms exist. The geometry of the L1 penalty — a diamond-shaped constraint region — causes solutions to lie at corners where some coefficients are exactly zero. Lasso performs **automatic variable selection**: with sufficient regularisation, only the most important predictors have nonzero coefficients.

**Bayesian interpretation:** Lasso is equivalent to a Laplace (double-exponential) prior on coefficients.

Comparison at $p = 2$ predictors (geometric intuition):

| Property | Ridge | Lasso |
|---|---|---|
| Constraint region | Circle | Diamond |
| Exactly zero coefficients | No | Yes |
| Solution form | Closed-form | Iterative |
| Handles multicollinearity | Yes (shares loading) | Yes (picks one) |
| When to use | All predictors relevant | Sparse signal expected |

**Elastic net** combines both penalties: $\lambda_1\|\boldsymbol{\beta}\|_1 + \lambda_2\|\boldsymbol{\beta}\|_2^2$ — providing variable selection (L1) and grouping of correlated variables (L2).

### 3.4 Bias-Variance Tradeoff

The expected prediction error at a new location decomposes as:

$$\text{EPE}(\mathbf{x}_0) = \underbrace{\sigma^2}_{\text{irreducible}} + \underbrace{[\text{Bias}(\hat{f}(\mathbf{x}_0))]^2}_{\text{model error}} + \underbrace{\text{Var}(\hat{f}(\mathbf{x}_0))}_{\text{estimation error}}$$

- **Irreducible noise** $\sigma^2$: variance of $\varepsilon$ — cannot be reduced by any model
- **Bias²**: error from wrong model structure — a linear model for a nonlinear relationship always has bias regardless of sample size
- **Variance**: error from fitting random fluctuations in training data — decreases with more data, increases with model complexity

The tradeoff: increasing model complexity (more parameters, lower $\lambda$) reduces bias but increases variance. Regularisation increases bias slightly but reduces variance substantially, typically lowering total error.

**Mathematical illustration:** For ridge with regularisation $\lambda$:

$$\text{Bias}(\hat{\beta}_{\text{ridge}}) = -\lambda(\mathbf{X}^\top\mathbf{X}+\lambda\mathbf{I})^{-1}\boldsymbol{\beta}_{\text{true}}$$

As $\lambda \to 0$: bias → 0 (OLS is unbiased). As $\lambda \to \infty$: bias → $-\boldsymbol{\beta}_{\text{true}}$ (all coefficients forced to zero — pure bias). But variance of ridge estimates is always lower than OLS. For small $\lambda$, the variance reduction dominates: total error is lower.

**Optimal $\lambda$** minimises cross-validated prediction error. A grid search over $\lambda \in [10^{-4}, 10^2]$ on log scale, evaluating by cross-validated RMSE, finds the optimal regularisation. The "1-se rule" selects the most regularised model within one standard error of the minimum RMSE — favouring parsimony.

### 3.5 Spatial Cross-Validation

Standard $k$-fold cross-validation randomly partitions observations into $k$ folds, trains on $k-1$, and tests on the held-out fold. For spatial data with positive autocorrelation, **nearby observations share information** — a training observation 100 m from a test observation provides essentially the same information as the test observation itself. The model's apparent predictive skill is inflated by spatial proximity, not genuine generalisation.

**Spatial cross-validation** (Brenning 2012; Meyer et al. 2019) partitions observations into geographically contiguous blocks:

1. **Block cross-validation:** Create $k$ spatial blocks (rectangles or geographic clusters); hold out entire blocks, not random points. Separation distance between training and test blocks should exceed the spatial autocorrelation range of the response variable.

2. **Buffered LOO-CV:** Leave-one-out with a spatial exclusion buffer — all training observations within radius $d_{\text{buffer}}$ of the test point are also excluded. The buffer radius equals the autocorrelation range.

The difference in RMSE between standard and spatial CV measures how much of the apparent skill was due to spatial autocorrelation rather than genuine predictive information in the covariates.

**Autocorrelation range** estimated from the variogram of regression residuals: the lag distance at which semivariance plateaus (the sill). See Essay C7 for variogram methods.

### 3.6 Feature Engineering from Raster Datasets

Raw raster pixels are rarely optimal predictors. Feature engineering extracts meaningful quantities:

**Terrain features from DEM** (Essay C8): slope, aspect, curvature, topographic wetness index $\text{TWI} = \ln(A_s/\tan\beta)$ where $A_s$ = upslope contributing area and $\beta$ = slope angle.

**Spectral indices from multispectral imagery:**
- $\text{NDVI} = (\rho_{\text{NIR}} - \rho_{\text{Red}})/(\rho_{\text{NIR}} + \rho_{\text{Red}})$
- $\text{NDWI} = (\rho_{\text{Green}} - \rho_{\text{NIR}})/(\rho_{\text{Green}} + \rho_{\text{NIR}})$
- $\text{EVI} = 2.5(\rho_{\text{NIR}} - \rho_{\text{Red}})/(\rho_{\text{NIR}} + 6\rho_{\text{Red}} - 7.5\rho_{\text{Blue}} + 1)$

**Climate aggregates:** Mean, minimum, maximum, and coefficient of variation across months or seasons. Growing degree days. Precipitation seasonality.

**Spatial lag features:** Mean value of the response variable (or covariate) within a radius $r$ of each prediction location — captures neighbourhood effects and residual spatial structure not explained by the covariates.

### 3.7 Random Forest Regression

Random forest (Breiman 2001) is an ensemble of $B$ regression trees, each trained on a bootstrap sample of the data and using a random subset of $m_{\text{try}}$ predictors at each split.

**Single regression tree:** Recursively partitions the feature space by choosing the split (predictor $j$, threshold $t$) that minimises the residual sum of squares:

$$\text{RSS}(j, t) = \sum_{i:x_{ij}\leq t}(y_i - \bar{y}_L)^2 + \sum_{i:x_{ij}>t}(y_i - \bar{y}_R)^2$$

Each leaf node $R_m$ predicts the mean response of training observations in that region: $\hat{f}(\mathbf{x}) = \bar{y}_m$ for $\mathbf{x} \in R_m$.

**Ensemble aggregation:** Random forest prediction is the average over $B$ trees:

$$\hat{f}_{\text{RF}}(\mathbf{x}) = \frac{1}{B}\sum_{b=1}^B T_b(\mathbf{x})$$

Two sources of randomness reduce correlation between trees (key to variance reduction): bootstrap sampling (each tree uses ~63% of observations) and feature subsampling ($m_{\text{try}} \approx p/3$ for regression). Uncorrelated trees average to give lower variance than any individual tree.

**Variable importance:** For predictor $j$, permutation importance measures the increase in out-of-bag error when $x_j$ is randomly shuffled (destroying its relationship with $y$). Higher increase = more important predictor.

**Out-of-bag (OOB) error:** Each observation is withheld from approximately 37% of trees (not in their bootstrap sample). Predicting each observation from only the trees that did not use it in training gives a cross-validation-equivalent error estimate at no additional computational cost.

### 3.8 Prediction Intervals vs. Confidence Intervals

A **confidence interval** on $\hat{f}(\mathbf{x}_0)$ captures uncertainty in the **mean response** at $\mathbf{x}_0$:

$$\hat{y}_0 \pm t_{\alpha/2,\,n-p}\,\hat{\sigma}\sqrt{\mathbf{x}_0^\top(\mathbf{X}^\top\mathbf{X})^{-1}\mathbf{x}_0}$$

A **prediction interval** captures uncertainty in a **new individual observation** at $\mathbf{x}_0$ — wider by the observation noise $\sigma^2$:

$$\hat{y}_0 \pm t_{\alpha/2,\,n-p}\,\hat{\sigma}\sqrt{1 + \mathbf{x}_0^\top(\mathbf{X}^\top\mathbf{X})^{-1}\mathbf{x}_0}$$

For environmental mapping, prediction intervals are appropriate — we predict actual soil carbon at a specific location, not the mean of all locations with those covariates.

For random forests: **quantile regression forests** (Meinshausen 2006) estimate any quantile of the conditional distribution $F(y|\mathbf{x})$ by tracking the full distribution of training observations in each leaf. The 5th and 95th quantile predictions form a 90% prediction interval.

---

## 4. Worked Example by Hand

**Setting:** Predicting mean annual precipitation (mm yr⁻¹) at 5 Alberta weather stations from two covariates: elevation $x_1$ (m) and latitude $x_2$ (°N). Data:

| Station | $x_1$ (elev) | $x_2$ (lat) | $y$ (precip) |
|---|---|---|---|
| Calgary | 1048 | 51.1 | 412 |
| Edmonton | 671 | 53.5 | 461 |
| Lethbridge | 929 | 49.7 | 386 |
| Jasper | 1062 | 52.9 | 500 |
| Medicine Hat | 717 | 50.0 | 320 |

**OLS solution (simplified, ignoring intercept for illustration):**

Centre variables: $\tilde{x}_1 = x_1 - 885$, $\tilde{x}_2 = x_2 - 51.4$, $\tilde{y} = y - 415.8$.

After centering and computing $\hat{\beta}_1$ and $\hat{\beta}_2$ via the normal equations (numerical steps omitted), OLS gives approximately:

$$\hat{y} = 416 + 0.08(x_1 - 885) + 10.5(x_2 - 51.4)$$

Interpretation: each 100 m of elevation adds ~8 mm yr⁻¹ of precipitation (orographic effect); each degree north adds ~10.5 mm yr⁻¹ (shifting from semi-arid southern Alberta toward boreal precipitation).

**Ridge with $\lambda = 5$:** Shrinks coefficients toward zero. With only 5 observations and 2 predictors, ridge provides modest benefit; the real advantage appears with 20+ correlated predictors.

**Prediction interval at a new site (Banff, $x_1 = 1383$ m, $x_2 = 51.2°$N):**
$\hat{y} = 416 + 0.08(498) + 10.5(-0.2) = 416 + 39.8 - 2.1 = 453.7$ mm

Given $\hat{\sigma} = 22$ mm from training residuals and the leverage factor for Banff ≈ 1.6:
95% prediction interval: $453.7 \pm 2.78 \times 22 \times \sqrt{1 + 1.6/5} = 453.7 \pm 68 = [386, 521]$ mm.

---

## 5. Computational Implementation

```
function ols(X, y):
    return solve(X.T @ X, X.T @ y)

function ridge(X, y, lambda):
    n, p = shape(X)
    return solve(X.T @ X + lambda * identity(p), X.T @ y)

function lasso(X, y, lambda, max_iter=1000):
    # Coordinate descent
    beta = zeros(p)
    for iteration in range(max_iter):
        for j in range(p):
            r_j = y - X @ beta + X[:, j] * beta[j]   # partial residual
            beta[j] = soft_threshold(dot(X[:, j], r_j)/n, lambda/2) / dot(X[:, j], X[:, j])/n
    return beta

function soft_threshold(z, gamma):
    return sign(z) * max(0, abs(z) - gamma)

function spatial_cv_blocks(X, y, coords, n_blocks=5):
    # Cluster coordinates into n_blocks spatial blocks
    block_labels = kmeans(coords, n_blocks)
    scores = []
    for block_id in unique(block_labels):
        train_mask = block_labels != block_id
        test_mask  = block_labels == block_id
        model = fit(X[train_mask], y[train_mask])
        scores.append(rmse(y[test_mask], predict(model, X[test_mask])))
    return mean(scores), std(scores)
```

```{pyodide}
import numpy as np
from sklearn.linear_model import Ridge, Lasso
from sklearn.model_selection import KFold

rng = np.random.default_rng(42)

# Synthetic spatial dataset: 100 locations, 5 covariates
n, p = 100, 5
coords = rng.uniform(0, 100, (n, 2))   # lon, lat (arbitrary units)
X = rng.standard_normal((n, p))
# True model: y = 2x1 - 1.5x2 + 0.5x3 + noise (x4, x5 irrelevant)
beta_true = np.array([2.0, -1.5, 0.5, 0.0, 0.0])
y = X @ beta_true + rng.standard_normal(n) * 1.5

# Add spatial autocorrelation to y
dist = np.sqrt(((coords[:, None] - coords[None, :])**2).sum(-1))
for i in range(n):
    neighbours = dist[i] < 15
    y[i] = 0.6 * y[i] + 0.4 * y[neighbours].mean()

# OLS vs Ridge vs Lasso
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error

ols  = LinearRegression().fit(X, y)
ridge = Ridge(alpha=1.0).fit(X, y)
lasso = Lasso(alpha=0.2).fit(X, y)

print("Coefficients (true: [2, -1.5, 0.5, 0, 0]):")
print(f"  OLS:   {ols.coef_.round(3)}")
print(f"  Ridge: {ridge.coef_.round(3)}")
print(f"  Lasso: {lasso.coef_.round(3)}")

# Standard k-fold CV
kf = KFold(n_splits=5, shuffle=True, random_state=42)
rmse_std = []
for tr, te in kf.split(X):
    r = Ridge(alpha=1.0).fit(X[tr], y[tr])
    rmse_std.append(np.sqrt(mean_squared_error(y[te], r.predict(X[te]))))

# Spatial block CV (cluster by coordinates)
from sklearn.cluster import KMeans
blocks = KMeans(n_clusters=5, random_state=42).fit_predict(coords)
rmse_spatial = []
for b in range(5):
    tr = blocks != b; te = blocks == b
    if te.sum() == 0: continue
    r = Ridge(alpha=1.0).fit(X[tr], y[tr])
    rmse_spatial.append(np.sqrt(mean_squared_error(y[te], r.predict(X[te]))))

print(f"\nStandard k-fold CV RMSE:  {np.mean(rmse_std):.3f} ± {np.std(rmse_std):.3f}")
print(f"Spatial block CV RMSE:   {np.mean(rmse_spatial):.3f} ± {np.std(rmse_spatial):.3f}")
print(f"Optimism bias (spatial autocorr.): {np.mean(rmse_spatial)-np.mean(rmse_std):.3f}")
```

---

## 6. Visualization

<div data-viz="echarts" style="height:420px" data-options='{
  "title": {"text": "Bias-Variance Tradeoff — Ridge Regression as λ Varies", "textStyle": {"fontSize": 14}},
  "tooltip": {"trigger": "axis"},
  "legend": {"data": ["Bias²", "Variance", "Total error (Bias² + Var + σ²)"], "bottom": 0},
  "xAxis": {"name": "log₁₀(λ) — regularisation strength", "nameLocation": "middle", "nameGap": 30,
    "data": ["-3","-2.5","-2","-1.5","-1","-0.5","0","0.5","1","1.5","2"]},
  "yAxis": {"name": "Expected prediction error", "nameLocation": "middle", "nameGap": 50},
  "series": [
    {"name": "Bias²", "type": "line", "smooth": true,
     "itemStyle": {"color": "#C62828"},
     "data": [0.01, 0.02, 0.04, 0.08, 0.15, 0.28, 0.50, 0.75, 1.10, 1.50, 2.00]},
    {"name": "Variance", "type": "line", "smooth": true,
     "itemStyle": {"color": "#1565C0"},
     "data": [2.20, 1.80, 1.40, 1.05, 0.75, 0.52, 0.35, 0.25, 0.18, 0.14, 0.12]},
    {"name": "Total error (Bias² + Var + σ²)", "type": "line", "smooth": true,
     "lineStyle": {"width": 3},
     "itemStyle": {"color": "#2E7D32"},
     "data": [4.46, 4.07, 3.69, 3.38, 3.15, 3.05, 3.10, 3.25, 3.53, 3.89, 4.37]}
  ]
}'></div>

Total error has a minimum at intermediate regularisation (λ ≈ 0.3 in this example). Left of the minimum: variance dominates, the model overfits training data. Right of the minimum: bias dominates, the model is too constrained. Standard cross-validation finds this minimum empirically without needing to know the true signal or noise level.

---

## 7. Interpretation

The spatial cross-validation result carries a direct implication for environmental mapping: reported model accuracy metrics (R², RMSE) from standard cross-validation are optimistic for spatially autocorrelated data. A model that achieves RMSE = 1.2 in standard CV and RMSE = 1.8 in spatial block CV has 50% of its apparent skill from spatial proximity of training and test points, not from genuine feature-response relationships. Publishing standard CV metrics for spatial prediction models is a systematic bias in the environmental literature.

The lasso's variable selection property is particularly useful when the covariate stack is large and many variables are irrelevant or redundant. In a typical soil mapping workflow with 20–40 environmental covariates, lasso reliably identifies the 5–10 most important predictors while shrinking the rest to zero — producing a more interpretable and more robust model than OLS on all covariates.

Random forest does not require feature selection because its tree structure naturally handles irrelevant predictors (splits on irrelevant variables produce near-zero importance and are quickly superseded). Its main advantages over regularised linear regression are: capturing nonlinear relationships, handling interactions without explicit specification, and providing OOB error estimates at no additional computational cost.

---

## 8. What Could Go Wrong?

**Spatial leakage invalidates standard cross-validation.** The single most common error in published spatial prediction studies. Always check whether training and test points in your CV folds are spatially separated by more than the autocorrelation range.

**Extrapolation beyond the training feature space is unreliable.** A regression model trained on observations with NDVI ∈ [0.2, 0.8] will extrapolate to NDVI = 0.05 (bare soil) by extending its fitted curve, which may be completely wrong. Random forests in particular **cannot extrapolate** — they predict the mean of the nearest training observations in feature space. Detecting extrapolation requires measuring the distance of each prediction point from the training data convex hull in feature space (e.g., the CAST package's Area of Applicability metric).

**Variable importance from random forests is biased when predictors have different cardinalities.** If some predictors are continuous and others are binary, the continuous predictors are artificially favoured in split-finding because they have more possible threshold values. Conditional permutation importance and Shapley values (SHAP) provide more reliable importance estimates.

**Prediction intervals from quantile regression forests require large samples.** QRF estimates quantiles by accumulating the leaf node training distributions. With small samples, the tail quantiles (5th, 95th percentile) are poorly estimated. A minimum of 500–1000 training observations is advisable for reliable 90% prediction intervals; below this, Bayesian regression with informative priors (Essay Z1) provides better-calibrated uncertainty.

---

## 9. Summary

OLS regression minimises residual sum of squares: $\hat{\boldsymbol{\beta}} = (\mathbf{X}^\top\mathbf{X})^{-1}\mathbf{X}^\top\mathbf{y}$. Ridge adds an L2 penalty $\lambda\|\boldsymbol{\beta}\|_2^2$, shrinking all coefficients and solving multicollinearity; lasso adds an L1 penalty, producing sparse solutions with exact zeros. The bias-variance tradeoff means that optimal regularisation — found by cross-validation — minimises total prediction error.

For spatial data, standard k-fold CV is anti-conservative due to spatial autocorrelation. Block spatial CV or buffered LOO-CV, with separation exceeding the autocorrelation range, gives honest estimates of generalisation error. Random forest regression handles nonlinearity and interactions through ensemble averaging of deep trees, with OOB error as a built-in CV estimate.

Prediction intervals quantify uncertainty for individual new observations; confidence intervals quantify uncertainty about the mean. For environmental mapping, prediction intervals are appropriate and should be reported alongside point predictions.

**Key equations:**

$$\hat{\boldsymbol{\beta}}_{\text{OLS}} = (\mathbf{X}^\top\mathbf{X})^{-1}\mathbf{X}^\top\mathbf{y}$$

$$\hat{\boldsymbol{\beta}}_{\text{ridge}} = (\mathbf{X}^\top\mathbf{X} + \lambda\mathbf{I})^{-1}\mathbf{X}^\top\mathbf{y}$$

$$\text{EPE} = \sigma^2 + \text{Bias}^2[\hat{f}] + \text{Var}[\hat{f}]$$

$$\hat{f}_{\text{RF}} = \frac{1}{B}\sum_{b=1}^B T_b(\mathbf{x})$$

---

## Math Refresher

**The normal equations and matrix inversion.** Minimising $\|\mathbf{y}-\mathbf{X}\boldsymbol{\beta}\|^2$ is equivalent to finding $\boldsymbol{\beta}$ such that the gradient vector is zero: $\nabla_{\boldsymbol{\beta}} = -2\mathbf{X}^\top(\mathbf{y}-\mathbf{X}\boldsymbol{\beta}) = 0$. Expanding: $\mathbf{X}^\top\mathbf{X}\boldsymbol{\beta} = \mathbf{X}^\top\mathbf{y}$. Solving this linear system gives $\hat{\boldsymbol{\beta}} = (\mathbf{X}^\top\mathbf{X})^{-1}\mathbf{X}^\top\mathbf{y}$ — but only if $\mathbf{X}^\top\mathbf{X}$ is invertible (which requires more observations than predictors and no perfect multicollinearity). Ridge adds $\lambda\mathbf{I}$ to guarantee invertibility regardless.

**Soft thresholding in lasso.** The lasso coordinate update is $\hat{\beta}_j = \text{sign}(z_j)\max(0, |z_j| - \lambda)$ where $z_j$ is the OLS solution for $\beta_j$ holding all others fixed. This "soft threshold" function maps values in $(-\lambda, \lambda)$ to exactly zero — the mathematical mechanism of variable selection. The L1 penalty's non-differentiability at zero is precisely what makes this zeroing possible; the smooth L2 penalty of ridge can only shrink toward zero, never reach it.
