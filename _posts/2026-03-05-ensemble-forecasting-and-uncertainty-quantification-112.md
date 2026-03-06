---
layout: model
title: "Ensemble Forecasting and Uncertainty Quantification"
subtitle: "Monte Carlo ensembles, spread-skill relationships, and probabilistic forecast verification"
date: 2026-03-05
categories: modelling
series: computational-geography-laboratory
series_order: 112
cluster: "AU — Ensemble Methods and Data Assimilation"
cluster_order: 1
tags: [math, viz, essay]
math: true
viz: true
math_core:
  - Monte Carlo sampling
  - probability distributions for forecast verification
  - rank histograms
  - Brier score and reliability
spatial_reasoning: ensemble spread as a function of model uncertainty
dynamics: ensemble divergence and predictability limits
computation: rank histogram, reliability diagram, BMA weighting
domain: meteorology / hydrology / numerical weather prediction
difficulty: 4
prerequisites:
  - Z1
  - AR2
notebook_url: https://github.com/waywardhouse/computational-geography-lab/tree/main/essays/AU1-ensemble-forecasting
excerpt: >
  A single deterministic weather forecast answers "what will happen." An ensemble
  of 50 slightly-different forecasts answers "what might happen and with what
  probability." The spread of the ensemble is a prediction of the uncertainty in
  the forecast. This essay derives the spread-skill relationship, implements
  Monte Carlo ensemble generation, evaluates ensemble reliability with rank
  histograms and reliability diagrams, applies Bayesian Model Averaging to
  combine models, and discusses the fundamental limits of predictability in
  chaotic systems.
math_prerequisites: >
  Probability distributions and sampling (Essay AR2 and Z1). The concept of
  variance and standard deviation. Bayesian weighting introduced here.
---

On January 4, 1992, the European Centre for Medium-Range Weather Forecasts (ECMWF) ran its first operational ensemble forecast — 33 slightly perturbed versions of the same numerical weather prediction model, run simultaneously, producing a range of possible futures rather than a single prediction. In 2025, ECMWF's operational ensemble contains 51 members and is run twice daily to 15 days; ensemble products from Environment and Climate Change Canada (ECCC) drive the forecasts on which Canadian flood warning systems, wildfire behaviour models, and agricultural advisories depend.

The philosophical shift from deterministic to probabilistic forecasting is deeper than it appears. A deterministic forecast is falsifiable in a binary way: it was right or wrong. A probabilistic forecast — "70% probability of precipitation exceeding 10 mm" — is only falsifiable in a statistical sense: if you collect 1000 such forecasts, exactly 700 should verify. This is a fundamentally different epistemology, and it requires fundamentally different verification methods.

---

## 1. The Question

How do we generate an ensemble of forecasts that represents forecast uncertainty? What does "well-calibrated" mean for a probabilistic forecast, and how do we verify it? When is the ensemble mean better than the best individual member? How do ensemble post-processing methods improve raw ensemble output?

---

## 2. The Conceptual Model

Forecast uncertainty has two sources: **initial condition uncertainty** (we do not know the exact state of the atmosphere or catchment at the start of the forecast) and **model uncertainty** (the model is an imperfect representation of reality). Ensemble forecasting addresses both:

- **Perturbation of initial conditions:** Multiple slightly-different starting states are generated (by singular vectors, bred vectors, or random perturbations), then each is run forward with the same model. Divergence of ensemble members represents sensitivity to initial conditions.
- **Multi-model ensembles:** Different models (or parameterisation schemes) are run from the same initial state. Spread represents structural model uncertainty.

A well-calibrated ensemble's spread honestly represents the uncertainty: on average, the observation should behave like a random draw from the ensemble distribution.

---

## 3. Building the Mathematical Model

### 3.1 Monte Carlo Ensemble Generation

For a model with uncertain parameter vector $\boldsymbol{\theta}$ and uncertain initial state $\mathbf{x}_0$:

1. Sample $M$ realisations from the parameter/initial state uncertainty distribution:
$$\boldsymbol{\theta}^{(m)}, \mathbf{x}_0^{(m)} \sim p(\boldsymbol{\theta}, \mathbf{x}_0), \quad m = 1, \ldots, M$$

2. Run the model forward for each member:
$$\mathbf{x}_t^{(m)} = \mathcal{F}(\mathbf{x}_0^{(m)}, \boldsymbol{\theta}^{(m)}, t)$$

3. The ensemble $\{\mathbf{x}_t^{(1)}, \ldots, \mathbf{x}_t^{(M)}\}$ represents the forecast probability distribution at time $t$.

The **ensemble mean** is the best point forecast in terms of minimising mean squared error (assuming the ensemble is unbiased):

$$\bar{\mathbf{x}}_t = \frac{1}{M}\sum_{m=1}^M \mathbf{x}_t^{(m)}$$

The **ensemble spread** (standard deviation):

$$s_t = \sqrt{\frac{1}{M-1}\sum_{m=1}^M (\mathbf{x}_t^{(m)} - \bar{\mathbf{x}}_t)^2}$$

represents the forecast's self-assessed uncertainty.

For environmental applications: Monte Carlo perturbation of rainfall forcing for hydrological models, soil hydraulic parameters for soil moisture models, Manning's $n$ for flood inundation models.

### 3.2 Spread-Skill Relationship

For a well-calibrated ensemble, spread should equal error: the ensemble spread $s_t$ should be a reliable predictor of forecast error $|x_t^{\text{obs}} - \bar{x}_t|$. The **spread-skill relationship** is assessed by:

1. Sorting forecasts by their ensemble spread $s$
2. Computing mean absolute error (MAE) for each spread bin
3. Plotting MAE vs. $s$: should follow the 1:1 line

For weather forecasting:
- **Over-confident ensemble** ($s < \text{error}$): spread is too small; the ensemble underestimates uncertainty; observations frequently fall outside the ensemble range
- **Under-confident ensemble** ($s > \text{error}$): spread is too large; the ensemble overestimates uncertainty; useful signal is diluted

In practice, atmospheric ensemble systems tend to be under-dispersive (over-confident) due to ensemble size limitations and imperfect perturbation methods.

The **perfect spread-skill ratio** at forecast time $t$ for a $M$-member ensemble should satisfy:

$$\frac{\text{RMSE}(\bar{x}_t)}{s_t} \approx \sqrt{\frac{M+1}{M-1}} \to 1 \text{ as } M \to \infty$$

(Fortin et al. 2014). For a 50-member ensemble, the target ratio is $\sqrt{51/49} = 1.02$ — essentially 1. Ratios significantly above 1 indicate under-dispersion; below 1 indicate over-dispersion.

### 3.3 Rank Histogram (Talagrand Diagram)

The **rank histogram** tests whether the observation is statistically indistinguishable from an ensemble member — the central calibration requirement.

For each forecast-observation pair:
1. Rank the observation among the $M$ ensemble members: it should fall equally often in any of the $M+1$ intervals
2. Accumulate ranks over all forecast cases
3. Plot the histogram of observation ranks

Interpretation:
- **Flat histogram:** Well-calibrated ensemble — observation is equally likely to fall anywhere
- **U-shaped (ends high):** Under-dispersive — observations frequently fall outside the ensemble range (ensemble is too confident)
- **∩-shaped (centre high):** Over-dispersive — observations cluster in the middle of the ensemble range (ensemble spread is too large)
- **Skewed (one side high):** Biased ensemble mean

The Kolmogorov-Smirnov or Pearson $\chi^2$ test provides a formal test of flatness:

$$\chi^2 = \sum_{k=1}^{M+1}\frac{(O_k - E_k)^2}{E_k}$$

where $O_k$ is the observed count in bin $k$ and $E_k = n/(M+1)$ is the expected count under uniformity.

### 3.4 Reliability Diagrams

For probabilistic forecasts of binary events (e.g., P(precipitation > 10 mm)), a **reliability diagram** plots the observed relative frequency against the forecast probability:

1. Bin forecasts by predicted probability: $[0, 0.1)$, $[0.1, 0.2)$, ..., $[0.9, 1.0]$
2. For each bin, compute the observed relative frequency (fraction of cases in that bin where the event occurred)
3. Plot observed frequency vs. forecast probability

A **perfectly reliable** forecast lies on the diagonal: when the model says 70% probability, the event occurs 70% of the time.

**Brier Score (BS)** — mean squared error of probability forecasts:

$$\text{BS} = \frac{1}{n}\sum_{i=1}^n (p_i - o_i)^2$$

where $p_i \in [0,1]$ is the forecast probability and $o_i \in \{0,1\}$ is the outcome. BS = 0 is perfect; BS = $p_{\text{clim}}(1-p_{\text{clim}})$ is climatological reference (always forecasting the base rate).

**Brier Skill Score:** $\text{BSS} = 1 - \text{BS}/\text{BS}_{\text{clim}}$. Positive BSS indicates skill above climatology.

**Decomposition** (Murphy 1973): $\text{BS} = \text{Reliability} + \text{Resolution} - \text{Uncertainty}$

- **Reliability:** Calibration term — measures deviation from the diagonal in the reliability diagram
- **Resolution:** Ability to distinguish high-probability from low-probability events
- **Uncertainty:** Variance of the observation — irreducible (equals BS of climatological forecast)

### 3.5 Ensemble Mean vs. Best Member

Counterintuitively, the ensemble mean is almost always a better point forecast than any individual member, despite being physically unrealisable (no actual realisation of the system corresponds to the average of 50 members).

**Mathematical reason:** For $M$ unbiased, uncorrelated members with equal variance $\sigma^2$:

$$\text{Var}(\bar{x}) = \frac{\sigma^2}{M}$$

The ensemble mean variance is $M$-times smaller than any individual member. In practice, members are not uncorrelated (they share model structure and boundary conditions), so the gain is less than $M$-fold but still substantial.

**When the best member is preferred:** Ensemble means produce spatially and temporally smooth fields that lack the fine-scale structure present in individual members. For applications requiring realistic spatial structure (wildfire spotting, flood inundation mapping), single plausible members are preferable to the smooth ensemble mean. Selecting the "best" member requires knowing the truth — impossible in operational settings. Post-processing by quantile mapping or machine learning is a middle path.

### 3.6 Ensemble Post-Processing: Bayesian Model Averaging

**Bayesian Model Averaging (BMA)** (Raftery et al. 2005) assigns weights to ensemble members based on their historical forecast performance and returns a weighted mixture distribution:

$$p(y|\mathbf{f}) = \sum_{m=1}^M w_m \cdot g_m(y|f_m)$$

where $f_m$ is the forecast from member $m$, $g_m$ is a conditional distribution (typically Gaussian) centred on $f_m$, and $w_m \geq 0$ with $\sum_m w_m = 1$ are the BMA weights.

Weights are estimated by maximising the predictive likelihood over a training period (typically 25–40 recent cases):

$$\hat{w}_m, \hat{\sigma}_m = \arg\max \sum_{i=1}^n \ln\left[\sum_{m=1}^M w_m g_m(y_i|f_{m,i})\right]$$

via the Expectation-Maximisation (EM) algorithm:

- **E-step:** $z_{i,m} = w_m g_m(y_i|f_{m,i}) / \sum_k w_k g_k(y_i|f_{k,i})$ (posterior probability that member $m$ is "best" for case $i$)
- **M-step:** $w_m = \frac{1}{n}\sum_i z_{i,m}$; update $\sigma_m$ from weighted residuals

**EMOS (Ensemble Model Output Statistics)** is a simpler parametric alternative: fit a single normal distribution whose mean is a linear function of the ensemble mean and whose variance is a linear function of ensemble variance:

$$y \sim \mathcal{N}(a + b\bar{f},\ c + d\cdot s_f^2)$$

fitting $(a, b, c, d)$ by minimising the continuous ranked probability score (CRPS) over a training period.

---

## 4. Worked Example by Hand

**Setting:** 10-member ensemble temperature forecast for Edmonton, verified against observations over 20 cases. Ensemble spread averages 2.4°C; RMSE of ensemble mean averages 3.1°C.

**Spread-skill ratio:** $3.1/2.4 = 1.29$ — ensemble is moderately under-dispersive (too confident). A spread-skill ratio of 1.29 means the ensemble needs to be inflated by about 29% to be calibrated.

**Rank histogram:** In 20 cases, observed temperatures fall in these ranks (1 = below all members, 11 = above all members):

Ranks: [11, 1, 9, 8, 11, 3, 10, 11, 2, 7, 11, 6, 10, 11, 4, 9, 11, 2, 8, 11]

Count by rank: rank 1 → 2, rank 2 → 2, rank 3 → 1, rank 4 → 1, rank 5 → 0, rank 6 → 1, rank 7 → 1, rank 8 → 2, rank 9 → 2, rank 10 → 2, rank 11 → 6

Expected count (uniform): $20/11 = 1.82$. Actual: rank 11 has 6 observations — far more than expected. This right-skewed, U-tailed histogram indicates the ensemble is both biased (too cold) and under-dispersive. The observation falls above all members 30% of the time — strong evidence of a warm bias or insufficient ensemble spread.

---

## 5. Computational Implementation

```
function rank_histogram(obs_array, ensemble_matrix):
    # ensemble_matrix: n_cases × n_members
    n, M = shape(ensemble_matrix)
    ranks = []
    for i in range(n):
        sorted_ens = sorted(ensemble_matrix[i])
        rank = searchsorted(sorted_ens, obs_array[i]) + 1  # 1 to M+1
        ranks.append(rank)
    return histogram(ranks, bins=range(1, M+3))

function brier_score(probabilities, outcomes):
    return mean((probabilities - outcomes)**2)

function reliability_diagram_data(probs, outcomes, n_bins=10):
    bins = linspace(0, 1, n_bins+1)
    bin_means, obs_freqs, counts = [], [], []
    for lo, hi in zip(bins[:-1], bins[1:]):
        mask = (probs >= lo) & (probs < hi)
        if mask.sum() > 0:
            bin_means.append(probs[mask].mean())
            obs_freqs.append(outcomes[mask].mean())
            counts.append(mask.sum())
    return bin_means, obs_freqs, counts

function bma_weights_em(forecasts, obs, n_iter=100):
    M = forecasts.shape[1]
    w = ones(M) / M
    sigma = ones(M) * std(obs)
    for _ in range(n_iter):
        # E-step
        g = [normal_pdf(obs, forecasts[:,m], sigma[m]) for m in range(M)]
        z = (w * stack(g).T) / sum(w * stack(g).T, axis=1, keepdims=True)
        # M-step
        w = z.mean(axis=0)
        for m in range(M):
            sigma[m] = sqrt(sum(z[:,m] * (obs - forecasts[:,m])**2) / sum(z[:,m]))
    return w, sigma
```

```{pyodide}
import numpy as np
from scipy import stats

rng = np.random.default_rng(42)

def rank_histogram(obs, ens):
    n, M = ens.shape
    ranks = []
    for i in range(n):
        r = np.searchsorted(np.sort(ens[i]), obs[i]) + 1
        ranks.append(r)
    return np.array(ranks), M+1

def brier_score(p, o):
    return np.mean((p - o)**2)

def spread_skill_ratio(obs, ens_mean, ens):
    rmse = np.sqrt(np.mean((obs - ens_mean)**2))
    spread = np.sqrt(np.mean(np.var(ens, axis=1, ddof=1)))
    return rmse, spread, rmse/spread

# Simulate under-dispersive ensemble (10 members, 500 cases)
n_cases, M = 500, 10
truth = rng.normal(0, 5, n_cases)
# Under-dispersive: members drawn from too-narrow distribution
ens = truth[:, None] + rng.normal(0, 2.5, (n_cases, M))  # spread too small

rmse, spread, ratio = spread_skill_ratio(truth, ens.mean(1), ens)
print(f"Ensemble spread-skill:")
print(f"  RMSE: {rmse:.2f},  Spread: {spread:.2f},  Ratio: {ratio:.2f}")
print(f"  {'Under-dispersive' if ratio>1.05 else 'Over-dispersive' if ratio<0.95 else 'Well-calibrated'}")

# Rank histogram
ranks, n_bins = rank_histogram(truth, ens)
counts = np.bincount(ranks - 1, minlength=M+1)
print(f"\nRank histogram (uniform expected {n_cases/(M+1):.0f} per bin):")
expected = n_cases / (M+1)
for r, c in enumerate(counts, 1):
    bar = '#' * int(c/5)
    flag = ' ← HIGH' if c > expected * 1.5 else (' ← low' if c < expected * 0.6 else '')
    print(f"  Rank {r:2d}: {c:3d} {bar}{flag}")

# Probabilistic verification (Brier score)
# Threshold event: truth > 3°C
thresh = 3.0
obs_binary = (truth > thresh).astype(float)
ens_probs = (ens > thresh).mean(axis=1)  # fraction of members exceeding threshold
bs = brier_score(ens_probs, obs_binary)
bs_clim = brier_score(np.full(n_cases, obs_binary.mean()), obs_binary)
bss = 1 - bs/bs_clim
print(f"\nBrier score (threshold > {thresh}°C): {bs:.3f}")
print(f"Brier skill score: {bss:.3f}")
```

---

## 6. Visualization

<div data-viz="echarts" style="height:420px" data-options='{
  "title": {"text": "Rank Histogram — Under-Dispersive Ensemble (U-shape = too confident)", "textStyle": {"fontSize": 14}},
  "tooltip": {"trigger": "axis"},
  "legend": {"data": ["Observed rank counts", "Expected (uniform)"], "bottom": 0},
  "xAxis": {"name": "Rank of observation among ensemble members", "nameLocation": "middle", "nameGap": 30,
    "data": ["Below all","2","3","4","5","6","7","8","9","10","Above all"]},
  "yAxis": {"name": "Count", "nameLocation": "middle", "nameGap": 40},
  "series": [
    {"name": "Observed rank counts", "type": "bar",
     "itemStyle": {"color": "#1565C0"},
     "data": [62, 30, 28, 26, 28, 27, 29, 31, 28, 27, 64]},
    {"name": "Expected (uniform)", "type": "line",
     "lineStyle": {"type": "dashed", "color": "#C62828"},
     "data": [45.5,45.5,45.5,45.5,45.5,45.5,45.5,45.5,45.5,45.5,45.5]}
  ]
}'></div>

The U-shape confirms under-dispersion: the observation falls outside the ensemble range (ranks 1 and 11) far more often than expected. A uniform histogram would indicate perfect calibration. This diagnostic directly informs post-processing: the ensemble spread needs to be inflated, or a BMA/EMOS model needs to be trained on recent cases to recalibrate.

---

## 7. Interpretation

The rank histogram is a necessary but not sufficient condition for ensemble calibration. A flat rank histogram guarantees that the ensemble is marginally calibrated — observations behave like random ensemble draws — but does not guarantee that the ensemble predicts the right probabilities for specific events (which is what the reliability diagram tests) or that the ensemble spread correctly tracks forecast difficulty case-by-case (which is what the spread-skill relationship tests).

The BMA result highlights a conceptually important property of ensemble post-processing: the weights $w_m$ are not fixed forever. They are estimated on a sliding training window (typically 25–40 cases) that adapts to recent model performance. If the operational NWP model is updated and one ensemble member suddenly becomes more skilful, the BMA weights shift to increase its influence within a few weeks of training. This adaptive weighting is a practical advantage over fixed model hierarchies.

The ensemble mean's mathematical superiority over any individual member (lower MSE) has a counterintuitive implication: when weather forecasters pick the "best" member from the ensemble for public communication, they are (on average) degrading the probabilistic information in the ensemble. The correct communication of ensemble information is through probabilistic products — "30–70% probability of snowfall exceeding 15 cm overnight" — not by selecting a representative deterministic member.

---

## 8. What Could Go Wrong?

**Ensemble spread from initial condition perturbations alone is insufficient.** Numerical weather models have structural biases that are not captured by perturbing initial conditions. The same model, run from perturbed initial states, will produce a spread that reflects initial condition uncertainty but not model structural uncertainty. This is why multi-model ensembles (from different modelling centres) consistently outperform single-model ensembles of the same size.

**Rank histogram flatness can be achieved trivially and meaninglessly.** A random noise ensemble (members drawn from a climatological distribution regardless of the actual forecast) will produce a perfectly flat rank histogram — it's calibrated but completely uninformative. Calibration is necessary but not sufficient for forecast quality; resolution (ability to distinguish between high-probability and low-probability events) must also be quantified.

**Small ensemble size produces sampling error in rank histograms.** A 10-member ensemble evaluated on 100 cases produces a rank histogram with 100 observations distributed across 11 bins (~9 per bin). The sampling uncertainty in each bin is $\pm\sqrt{9} \approx 3$ — so apparent deviations of ±5 from the expected count are not statistically significant. Reliable rank histogram evaluation requires hundreds to thousands of forecast-observation pairs.

**Post-processing training assumes stationarity.** BMA and EMOS are calibrated on a recent training window, assuming that model performance is stationary. After a model upgrade or a systematic change in climate (e.g., more frequent compound extremes), the training window statistics may no longer be representative. Adaptive or non-stationary post-processing frameworks are an active research area.

---

## 9. Summary

Monte Carlo ensemble forecasting generates multiple model realisations from perturbed initial conditions and/or parameters; the ensemble represents the forecast probability distribution. A well-calibrated ensemble satisfies: spread ≈ RMSE (spread-skill ratio ≈ 1), rank histogram ≈ uniform, and reliability diagram ≈ diagonal.

The rank histogram (Talagrand diagram) tests whether observations behave like random ensemble draws; a U-shape indicates under-dispersion. The Brier score BS $= \frac{1}{n}\sum(p_i-o_i)^2$ measures probabilistic forecast accuracy; BSS $= 1 - \text{BS}/\text{BS}_{\text{clim}}$ measures skill against climatology. BMA post-processing assigns member weights by EM, producing a calibrated mixture distribution; EMOS fits a linear map from ensemble statistics to forecast distribution parameters.

**Key equations:**

$$\bar{x}_t = \frac{1}{M}\sum_{m=1}^M x_t^{(m)}, \quad s_t = \sqrt{\frac{1}{M-1}\sum_m(x_t^{(m)}-\bar{x}_t)^2}$$

$$\text{SS ratio} = \frac{\text{RMSE}(\bar{x})}{s} \approx 1 \text{ (calibrated)}$$

$$\text{BS} = \frac{1}{n}\sum_i(p_i - o_i)^2, \quad \text{BSS} = 1 - \text{BS}/\text{BS}_{\text{clim}}$$

$$p(y|\mathbf{f}) = \sum_m w_m g_m(y|f_m) \quad\text{[BMA]}$$

---

## Math Refresher

**Why ensemble mean MSE < member MSE.** Let $x^{(m)} = \mu + \varepsilon^{(m)}$ where $\varepsilon^{(m)} \sim (0,\sigma^2)$ are i.i.d. errors. Member MSE = $E[(x^{(m)} - \mu_{\text{true}})^2] = \sigma^2$. Ensemble mean MSE = $E[(\bar{x} - \mu_{\text{true}})^2] = E[(\frac{1}{M}\sum_m\varepsilon^{(m)})^2] = \frac{1}{M^2}\sum_m E[(\varepsilon^{(m)})^2] = \sigma^2/M$. The variance of a sample mean is $M$ times smaller than the variance of individual draws — always, for uncorrelated errors. This is why averaging forecasts works: the systematic error (bias) remains but the random error shrinks by $\sqrt{M}$.

**The Brier score is just mean squared error.** Treating probability forecasts as continuous variables in $[0,1]$ and binary outcomes as 0/1, the Brier score $\frac{1}{n}\sum(p_i-o_i)^2$ is literally the MSE of probability estimates. A perfect forecast ($p_i = o_i$ always) has BS = 0. A forecast that always predicts the climatological base rate $\bar{p}$ has BS = $\bar{p}(1-\bar{p})$. A forecast that perfectly predicts all events ($p_i = 1$ if event occurs, $p_i = 0$ otherwise) achieves BS = 0 — but so does a randomly calibrated forecast with high resolution. The decomposition into reliability + resolution − uncertainty clarifies what each component contributes to the total score.
