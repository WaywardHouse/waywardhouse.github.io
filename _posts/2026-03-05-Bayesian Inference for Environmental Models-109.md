---
layout: essay
title: "Bayesian Inference for Environmental Models"
subtitle: "Prior beliefs, likelihood, posterior updating, and MCMC sampling"
date: 2026-03-05
categories: modelling
series: computational-geography-laboratory
series_order: 109
cluster: "Z — Foundations of Geographic Machine Learning"
cluster_order: 1
tags: [math, viz, essay]
math: true
viz: true
math_core:
  - probability and Bayes' theorem
  - probability distributions (normal, beta, gamma)
  - Markov chain Monte Carlo
  - logarithms and log-likelihoods
spatial_reasoning: parameter uncertainty in spatial models
dynamics: posterior updating with new observations
computation: Metropolis-Hastings algorithm
domain: statistical inference / environmental modelling
difficulty: 4
prerequisites:
  - A3
  - AR2
notebook_url: https://github.com/waywardhouse/computational-geography-lab/tree/main/essays/Z1-bayesian-inference
excerpt: >
  Every environmental model has parameters we don't know exactly — a Manning's n
  here, a decay rate there, an initial condition we can only estimate. Bayesian
  inference treats these parameters not as fixed unknowns to be estimated, but as
  probability distributions to be updated. This essay derives Bayes' theorem from
  first principles, specifies priors and likelihoods for common environmental
  parameters, implements the Metropolis-Hastings MCMC sampler, constructs
  posterior predictive distributions, and compares models by Bayes factor.
math_prerequisites: >
  Probability as area under a curve (density functions). The concept of
  conditional probability. Logarithms for log-likelihoods. The normal
  distribution (Essay AR2).
---

In 1783, the Reverend Thomas Bayes left behind an unpublished manuscript that would not see print until two years after his death. Its central insight was almost embarrassingly simple: the probability that a hypothesis is true, given the data we observe, is proportional to the probability of observing that data if the hypothesis were true, multiplied by how probable we thought the hypothesis was before we saw any data. Prior belief, updated by evidence, yields posterior belief.

For two and a half centuries, this idea has been contested, celebrated, applied, and misapplied. In environmental modelling today, Bayesian inference is indispensable — not because it is philosophically superior to frequentism (a debate that continues), but because it naturally handles the situation environmental scientists actually face: sparse data, uncertain parameters, multiple competing models, and a need to communicate not just best estimates but the full range of possible outcomes.

---

## 1. The Question

How do we update our uncertainty about a model parameter when we collect new observations? How do we propagate that parameter uncertainty into predictions? How do we compare two competing model structures and decide which fits the data better? And what do we do when the mathematics does not yield a closed-form solution?

---

## 2. The Conceptual Model

Bayesian inference treats model parameters as random variables with probability distributions, not as fixed unknowns with point estimates. Before seeing any data, we specify a **prior distribution** $p(\theta)$ encoding our existing knowledge or ignorance. We observe data $\mathbf{y}$ and specify a **likelihood function** $p(\mathbf{y}|\theta)$ — the probability of the data given the parameter. Bayes' theorem combines these into the **posterior distribution** $p(\theta|\mathbf{y})$ — our updated belief about the parameter after seeing the data.

The posterior is the complete answer to the inference question. A frequentist analysis produces a point estimate and a confidence interval; Bayesian analysis produces a probability distribution that can be interrogated at any quantile, propagated through any function, and updated with further data.

---

## 3. Building the Mathematical Model

### 3.1 Bayes' Theorem

From the definition of conditional probability:

$$p(A|B) = \frac{p(A \cap B)}{p(B)} \quad\text{and}\quad p(B|A) = \frac{p(A \cap B)}{p(A)}$$

Combining: $p(A \cap B) = p(A|B)p(B) = p(B|A)p(A)$. Therefore:

$$\boxed{p(\theta|\mathbf{y}) = \frac{p(\mathbf{y}|\theta)\,p(\theta)}{p(\mathbf{y})}}$$

The denominator $p(\mathbf{y}) = \int p(\mathbf{y}|\theta)p(\theta)\,d\theta$ is the **marginal likelihood** (evidence) — the probability of the data averaged over all possible parameter values. Since $p(\mathbf{y})$ does not depend on $\theta$, we write:

$$p(\theta|\mathbf{y}) \propto p(\mathbf{y}|\theta)\,p(\theta)$$

**Posterior $\propto$ Likelihood × Prior.** This is the operational form used in MCMC.

In words: our updated belief about $\theta$ is proportional to how probable the data would be if $\theta$ were true, multiplied by how probable we thought $\theta$ was beforehand. Evidence that is improbable under the prior can still dominate if the likelihood strongly favours it.

### 3.2 Prior Distributions

A prior encodes knowledge before observing data. Choices:

**Conjugate priors** — chosen so the posterior has the same functional form as the prior, yielding closed-form updates.

| Likelihood | Conjugate prior | Posterior |
|---|---|---|
| Normal ($\sigma^2$ known) | Normal on $\mu$ | Normal |
| Poisson | Gamma on $\lambda$ | Gamma |
| Binomial | Beta on $p$ | Beta |
| Normal (both unknown) | Normal-Inverse-Gamma | Normal-Inverse-Gamma |

**Example — Beta-Binomial (conjugate):** Estimating the probability $p$ of a site being occupied by a species. Prior: $p \sim \text{Beta}(\alpha, \beta)$. After observing $k$ successes in $n$ trials:

$$p|\mathbf{y} \sim \text{Beta}(\alpha + k,\ \beta + n - k)$$

If we start with $\text{Beta}(1,1)$ (uniform, no prior knowledge) and observe 7 occupied sites out of 10: posterior is $\text{Beta}(8, 4)$, with mean $8/12 = 0.667$ and 90% credible interval $[0.42, 0.89]$.

**Weakly informative priors** — constrain parameters to physically plausible ranges without strongly influencing the posterior when data are plentiful. For a decay rate $k > 0$: half-normal or log-normal prior centred near the expected order of magnitude.

**Jeffreys prior** — objective prior proportional to $\sqrt{I(\theta)}$, the square root of the Fisher information, representing the information content of the likelihood. Scale-invariant; appropriate when prior knowledge is genuinely absent.

### 3.3 Likelihood Functions

The likelihood $p(\mathbf{y}|\theta)$ is the probability density of observing the data $\mathbf{y}$ given parameter $\theta$. For $n$ independent observations $y_1, \ldots, y_n$:

$$p(\mathbf{y}|\theta) = \prod_{i=1}^n p(y_i|\theta)$$

Taking logs (computationally essential — products of small probabilities underflow):

$$\ln p(\mathbf{y}|\theta) = \sum_{i=1}^n \ln p(y_i|\theta)$$

**Normal likelihood** — appropriate for continuous measurements with additive Gaussian error:

$$\ln p(\mathbf{y}|\mu,\sigma) = -\frac{n}{2}\ln(2\pi\sigma^2) - \frac{1}{2\sigma^2}\sum_{i=1}^n(y_i - \mu)^2$$

**Poisson likelihood** — appropriate for count data (species counts, flood events, contamination detections):

$$\ln p(\mathbf{y}|\lambda) = \sum_{i=1}^n \left[y_i\ln\lambda - \lambda - \ln(y_i!)\right]$$

**Lognormal likelihood** — appropriate for strictly positive, right-skewed environmental variables (streamflow, sediment concentration, contaminant concentration):

$$\ln p(\mathbf{y}|\mu,\sigma) = -n\ln\sigma - \sum_{i=1}^n\ln y_i - \frac{1}{2\sigma^2}\sum_{i=1}^n(\ln y_i - \mu)^2$$

### 3.4 Conjugate Update: Normal-Normal

For observations $y_i \sim \mathcal{N}(\mu, \sigma^2)$ with known $\sigma^2$ and prior $\mu \sim \mathcal{N}(\mu_0, \tau_0^2)$:

$$\mu|\mathbf{y} \sim \mathcal{N}(\mu_n, \tau_n^2)$$

where:

$$\frac{1}{\tau_n^2} = \frac{1}{\tau_0^2} + \frac{n}{\sigma^2}, \quad \mu_n = \tau_n^2\left(\frac{\mu_0}{\tau_0^2} + \frac{\bar{y}n}{\sigma^2}\right)$$

The posterior mean is a **precision-weighted average** of the prior mean and the sample mean. Precision = 1/variance. As $n \to \infty$, the prior is overwhelmed: $\mu_n \to \bar{y}$. With very few observations, the posterior stays close to the prior.

**Environmental interpretation:** Suppose we estimate mean annual runoff $\mu$ for an ungauged watershed. Prior from regional regression: $\mu_0 = 180$ mm yr⁻¹, $\tau_0 = 40$ mm (moderate prior uncertainty). We collect 3 years of data: $\bar{y} = 220$ mm, $\sigma = 30$ mm yr⁻¹.

$$\frac{1}{\tau_n^2} = \frac{1}{40^2} + \frac{3}{30^2} = 0.000625 + 0.00333 = 0.003958 \Rightarrow \tau_n = 15.9 \text{ mm}$$

$$\mu_n = 15.9^2 \times\left(\frac{180}{1600} + \frac{220\times3}{900}\right) = 253 \times (0.1125 + 0.7333) = 213.9 \text{ mm}$$

Three years of data pulled the estimate from 180 to 214 mm — closer to the observed 220 but not all the way there, because the prior had meaningful weight. The posterior uncertainty (16 mm) is substantially smaller than either the prior (40 mm) or the data uncertainty (30/√3 = 17 mm) — combining information from both sources.

### 3.5 Metropolis-Hastings MCMC

When conjugate priors are unavailable (most environmental models), we approximate the posterior by drawing samples using **Markov chain Monte Carlo**. The **Metropolis-Hastings algorithm** constructs a Markov chain whose stationary distribution is the target posterior:

```
Algorithm: Metropolis-Hastings
1. Initialise θ₀ (any starting value)
2. For iteration t = 1, 2, ..., N:
   a. Propose θ* ~ q(θ* | θₜ₋₁)   [proposal distribution, e.g. Normal(θₜ₋₁, σ_prop)]
   b. Compute acceptance ratio:
      α = min(1, p(θ*|y) / p(θₜ₋₁|y))
        = min(1, p(y|θ*) p(θ*) / [p(y|θₜ₋₁) p(θₜ₋₁)])
   c. Accept with probability α: θₜ = θ*
      Reject with probability 1-α: θₜ = θₜ₋₁
3. Discard first B iterations (burn-in)
4. Return {θ_B, θ_{B+1}, ..., θ_N} as posterior samples
```

Because the marginal likelihood $p(\mathbf{y})$ cancels in the ratio, we only need to evaluate $\ln p(\mathbf{y}|\theta) + \ln p(\theta)$ — the log-posterior up to an additive constant.

**Proposal tuning:** The proposal width $\sigma_{\text{prop}}$ controls acceptance rate. Target acceptance rate ≈ 23–44% for scalar or low-dimensional problems (Roberts et al. 1997). Too wide → nearly all proposals rejected; too narrow → chain mixes slowly.

**Diagnostics:**
- **Trace plot:** $\theta_t$ vs. $t$ should look like white noise around the posterior mean (not trending, not stuck)
- **Gelman-Rubin $\hat{R}$:** Compare variance between multiple chains to variance within chains; $\hat{R} < 1.05$ indicates convergence
- **Effective sample size (ESS):** Number of effectively independent samples after accounting for autocorrelation; ESS > 400 for reliable quantiles

### 3.6 Posterior Predictive Distribution

The **posterior predictive distribution** for a new observation $\tilde{y}$ integrates over parameter uncertainty:

$$p(\tilde{y}|\mathbf{y}) = \int p(\tilde{y}|\theta)\,p(\theta|\mathbf{y})\,d\theta$$

In practice, with $N$ posterior samples $\{\theta^{(s)}\}$:

$$p(\tilde{y}|\mathbf{y}) \approx \frac{1}{N}\sum_{s=1}^N p(\tilde{y}|\theta^{(s)})$$

This is broader than a prediction made at the posterior mean parameter — it correctly propagates parameter uncertainty into prediction uncertainty.

### 3.7 Model Comparison by Bayes Factor

Given two models $M_1$ and $M_2$ with the same data $\mathbf{y}$, the **Bayes factor**:

$$B_{12} = \frac{p(\mathbf{y}|M_1)}{p(\mathbf{y}|M_2)} = \frac{\int p(\mathbf{y}|\theta_1,M_1)p(\theta_1|M_1)d\theta_1}{\int p(\mathbf{y}|\theta_2,M_2)p(\theta_2|M_2)d\theta_2}$$

The Bayes factor is the ratio of marginal likelihoods — the evidence for $M_1$ relative to $M_2$. It automatically penalises model complexity: a model with many parameters can fit the data better at any single parameter value, but its marginal likelihood is averaged over all parameter space and is diluted by all the values that fit poorly.

Jeffreys (1961) interpretation:

| $\ln B_{12}$ | Evidence for $M_1$ |
|---|---|
| 0–1 | Weak |
| 1–3 | Positive |
| 3–5 | Strong |
| > 5 | Very strong |

**Parameter identifiability:** A parameter is **non-identifiable** if many different values of $\theta$ produce the same likelihood — the data cannot distinguish them. In a Bayesian context, the posterior for a non-identifiable parameter is identical to the prior: no amount of data narrows the distribution. This is a model structure problem, not a data problem. Identifiability analysis before fitting prevents the false confidence that MCMC results always imply.

---

## 4. Worked Example by Hand

**Setting:** Estimating the decay rate $k$ of a contaminant in a small Alberta lake. We believe (from literature on similar compounds) that $k \sim \mathcal{N}(0.05, 0.02^2)$ day⁻¹ (prior: mean 0.05, sd 0.02). We observe concentrations at day 0 and day 30. Model: $C(t) = C_0 e^{-kt}$, so $C(30) = C_0 e^{-30k}$. Observed: $C_0 = 100$ mg/L, $C(30) = 21.5$ mg/L, measurement error $\sigma = 3$ mg/L.

**Likelihood at $k = 0.05$:**
$C_{\text{pred}}(30) = 100 e^{-30\times0.05} = 100 e^{-1.5} = 22.31$ mg/L

$\ln p(21.5|k=0.05) = -\frac{1}{2}\ln(2\pi \times 9) - \frac{(21.5-22.31)^2}{18} = -2.072 - 0.0365 = -2.108$

**Likelihood at $k = 0.06$:**
$C_{\text{pred}}(30) = 100 e^{-1.8} = 16.53$ mg/L

$\ln p(21.5|k=0.06) = -2.072 - \frac{(21.5-16.53)^2}{18} = -2.072 - 1.370 = -3.442$

**Log-prior at $k = 0.05$:** $\ln p(0.05) = -\frac{(0.05-0.05)^2}{2\times0.0004} = 0$

**Log-prior at $k = 0.06$:** $\ln p(0.06) = -\frac{(0.06-0.05)^2}{0.0008} = -1.25$

**Log-posterior:**
- $k = 0.05$: $-2.108 + 0 = -2.108$ → proportional to $e^{-2.108} = 0.1216$
- $k = 0.06$: $-3.442 + (-1.25) = -4.692$ → proportional to $e^{-4.692} = 0.00916$

**Acceptance ratio (MH step):** Proposing $k = 0.06$ from $k = 0.05$: $\alpha = \min(1, 0.00916/0.1216) = 0.075$. Reject with probability 0.925 — the proposal is much worse and usually rejected, so the chain stays at 0.05.

**True posterior mean** (analytically for this conjugate-like case): The observed ratio $21.5/100 = 0.215 = e^{-30k}$ gives the MLE $k_{\text{MLE}} = -\ln(0.215)/30 = 1.537/30 = 0.0512$ day⁻¹. The posterior will be near this value, pulled slightly toward the prior mean of 0.05.

---

## 5. Computational Implementation

```
function log_posterior(theta, y_obs, prior_mean, prior_sd, C0, t, sigma_obs):
    # Model prediction
    C_pred = C0 * exp(-theta * t)
    # Log-likelihood
    ll = -0.5 * log(2*pi*sigma_obs**2) - (y_obs - C_pred)**2 / (2*sigma_obs**2)
    # Log-prior (normal)
    lp = -0.5 * ((theta - prior_mean)/prior_sd)**2
    return ll + lp

function metropolis_hastings(log_post_fn, theta_init, n_iter, proposal_sd):
    theta_current = theta_init
    lp_current = log_post_fn(theta_current)
    samples = []
    n_accept = 0
    for i in range(n_iter):
        theta_proposed = theta_current + normal(0, proposal_sd)
        if theta_proposed <= 0: continue   # enforce positivity
        lp_proposed = log_post_fn(theta_proposed)
        log_alpha = lp_proposed - lp_current
        if log(uniform(0,1)) < log_alpha:
            theta_current = theta_proposed
            lp_current = lp_proposed
            n_accept += 1
        samples.append(theta_current)
    return samples, n_accept / n_iter

function posterior_predictive(samples, model_fn, x_pred):
    predictions = [model_fn(theta, x_pred) for theta in samples]
    return predictions  # distribution of predictions
```

```{pyodide}
import numpy as np
from scipy import stats

rng = np.random.default_rng(42)

def log_posterior(k, y_obs, C0, t_obs, sigma_obs, prior_mean=0.05, prior_sd=0.02):
    if k <= 0: return -np.inf
    C_pred = C0 * np.exp(-k * t_obs)
    ll = stats.norm.logpdf(y_obs, loc=C_pred, scale=sigma_obs)
    lp = stats.norm.logpdf(k, loc=prior_mean, scale=prior_sd)
    return ll + lp

def metropolis_hastings(log_post, theta0, n_iter=10_000, prop_sd=0.005):
    theta = theta0
    lp = log_post(theta)
    samples, n_acc = [theta], 0
    for _ in range(n_iter - 1):
        proposal = theta + rng.normal(0, prop_sd)
        lp_new = log_post(proposal)
        if np.log(rng.uniform()) < lp_new - lp:
            theta, lp = proposal, lp_new
            n_acc += 1
        samples.append(theta)
    return np.array(samples), n_acc / n_iter

# Data
C0, t_obs, y_obs, sigma_obs = 100.0, 30.0, 21.5, 3.0

log_post_fn = lambda k: log_posterior(k, y_obs, C0, t_obs, sigma_obs)
samples, acc_rate = metropolis_hastings(log_post_fn, theta0=0.05)

# Discard burn-in
posterior = samples[2000:]
print(f"Acceptance rate: {acc_rate:.2f}")
print(f"Posterior mean:  {posterior.mean():.4f} day⁻¹")
print(f"Posterior sd:    {posterior.std():.4f} day⁻¹")
print(f"95% credible interval: [{np.percentile(posterior,2.5):.4f}, {np.percentile(posterior,97.5):.4f}]")
print(f"Prior mean: 0.0500, MLE: {-np.log(y_obs/C0)/t_obs:.4f}")

# Posterior predictive at t=60
C60_samples = C0 * np.exp(-posterior * 60)
noise = rng.normal(0, sigma_obs, len(C60_samples))
C60_pred = C60_samples + noise
print(f"\nPosterior predictive C(60):")
print(f"  Mean: {C60_pred.mean():.2f} mg/L")
print(f"  90% interval: [{np.percentile(C60_pred,5):.2f}, {np.percentile(C60_pred,95):.2f}]")
```

---

## 6. Visualization

<div data-viz="echarts" style="height:420px" data-options='{
  "title": {"text": "Prior, Likelihood, and Posterior for Decay Rate k", "textStyle": {"fontSize": 14}},
  "tooltip": {"trigger": "axis"},
  "legend": {"data": ["Prior p(k)", "Likelihood p(y|k) (scaled)", "Posterior p(k|y)"], "bottom": 0},
  "xAxis": {"name": "Decay rate k (day⁻¹)", "nameLocation": "middle", "nameGap": 30,
    "data": ["0.00","0.01","0.02","0.03","0.04","0.05","0.06","0.07","0.08","0.09","0.10"]},
  "yAxis": {"name": "Relative density", "nameLocation": "middle", "nameGap": 45},
  "series": [
    {"name": "Prior p(k)", "type": "line", "smooth": true,
     "itemStyle": {"color": "#90A4AE"},
     "data": [0.5,2.2,6.1,12.1,17.6,19.9,17.6,12.1,6.1,2.2,0.5]},
    {"name": "Likelihood p(y|k) (scaled)", "type": "line", "smooth": true,
     "itemStyle": {"color": "#1565C0"},
     "data": [0.0,0.0,0.1,0.5,2.8,9.8,8.2,2.1,0.2,0.0,0.0]},
    {"name": "Posterior p(k|y)", "type": "line", "smooth": true,
     "itemStyle": {"color": "#C62828"},
     "areaStyle": {"color": "#FFCDD2", "opacity": 0.5},
     "data": [0.0,0.0,0.1,0.8,5.4,18.6,15.0,4.0,0.4,0.0,0.0]}
  ]
}'></div>

The posterior is concentrated between the prior (peaked at 0.05) and the likelihood (peaked near 0.051 from the MLE). With only one observation at t=30, the prior carries substantial weight and the posterior is noticeably narrower than either component alone — demonstrating Bayesian updating as a principled combination of prior knowledge and new evidence.

---

## 7. Interpretation

The Bayesian framework answers three questions that frequentist methods struggle with: what is the probability that the parameter lies in this interval (credible interval, not confidence interval); what is the probability of a future observation exceeding a threshold (posterior predictive); and which of two models is better supported by the data, accounting for complexity (Bayes factor)?

The credible interval has a direct probability interpretation: there is a 95% probability that $k$ lies in $[0.042, 0.064]$ day⁻¹ — given the prior and the data. The frequentist confidence interval does not make this statement; it says that 95% of intervals constructed by this procedure would contain the true value. The distinction matters when communicating risk to decision-makers.

The posterior predictive distribution is richer than a prediction at the maximum likelihood estimate because it propagates all parameter uncertainty into the forecast. A prediction at $k_{\text{MLE}} = 0.0512$ gives a single point; the posterior predictive gives a distribution whose width reflects both observation noise and parameter uncertainty. Ignoring parameter uncertainty systematically produces prediction intervals that are too narrow — a chronic problem in environmental risk assessment.

---

## 8. What Could Go Wrong?

**The prior is a modelling choice with consequences.** An informative prior that places significant probability outside the true parameter range will bias the posterior, especially with small samples. The right response is not to use "non-informative" priors blindly — truly uninformative priors do not exist for all parameterisations — but to document prior choices, conduct sensitivity analysis (how much does the posterior change if the prior is varied?), and be transparent about the information encoded.

**MCMC convergence is not guaranteed.** A Metropolis-Hastings chain that has not converged produces samples from a distribution that is not the posterior — but there is no mathematical guarantee that any finite run has converged. Convergence diagnostics ($\hat{R}$, trace plots, ESS) are necessary but not sufficient. Multimodal posteriors — common when the model is poorly identified — can trap single chains in one mode. Running multiple chains from different starting values and verifying they reach the same distribution is essential.

**Model comparison by Bayes factor requires accurate marginal likelihood estimates.** Computing $p(\mathbf{y}|M) = \int p(\mathbf{y}|\theta)p(\theta)d\theta$ is difficult in high dimensions. Harmonic mean estimators (the simplest MCMC-based approach) are notoriously unstable. Thermodynamic integration, nested sampling (MultiNest), and bridge sampling provide more reliable estimates but at significant computational cost.

**Identifiability is a prerequisite, not a guarantee.** If two parameters $\theta_1$ and $\theta_2$ produce the same predictions for all data, MCMC will not fail — it will simply return the prior. The posterior will look informative (it will be narrow) only if the prior was informative. Checking identifiability analytically, or through synthetic data experiments, before deploying MCMC prevents false confidence in posterior results from unidentified models.

---

## 9. Summary

Bayes' theorem $p(\theta|\mathbf{y}) \propto p(\mathbf{y}|\theta)\,p(\theta)$ updates a prior distribution over parameters by the likelihood of the data, yielding a posterior distribution. Conjugate pairs (Beta-Binomial, Normal-Normal, Gamma-Poisson) admit closed-form posteriors. For non-conjugate models, Metropolis-Hastings MCMC draws samples from the posterior by constructing a Markov chain with the target distribution as its stationary distribution, accepting or rejecting proposals in proportion to the posterior ratio.

The posterior predictive distribution $p(\tilde{y}|\mathbf{y}) = \int p(\tilde{y}|\theta)p(\theta|\mathbf{y})d\theta$ propagates parameter uncertainty into forecasts. Model comparison by Bayes factor automatically penalises complexity. Non-identifiable parameters return their prior — a diagnostic that reveals structural model problems.

**Key equations:**

$$p(\theta|\mathbf{y}) \propto p(\mathbf{y}|\theta)\,p(\theta)$$

$$\mu_n = \tau_n^2\!\left(\frac{\mu_0}{\tau_0^2} + \frac{n\bar{y}}{\sigma^2}\right), \quad \frac{1}{\tau_n^2} = \frac{1}{\tau_0^2} + \frac{n}{\sigma^2}$$

$$\alpha = \min\!\left(1,\frac{p(\mathbf{y}|\theta^*)p(\theta^*)}{p(\mathbf{y}|\theta_{t-1})p(\theta_{t-1})}\right) \quad\text{[MH acceptance ratio]}$$

$$B_{12} = \frac{p(\mathbf{y}|M_1)}{p(\mathbf{y}|M_2)} \quad\text{[Bayes factor]}$$

---

## Math Refresher

**Conditional probability and independence.** The conditional probability $p(A|B) = p(A\cap B)/p(B)$ asks: given that $B$ occurred, how probable is $A$? If $A$ and $B$ are independent, $p(A|B) = p(A)$ — knowing $B$ provides no information about $A$. Bayes' theorem is nothing more than two applications of the conditional probability definition; its power comes from inverting the conditioning — from $p(\text{data}|\text{parameter})$ (the forward model) to $p(\text{parameter}|\text{data})$ (the inference we actually want).

**Log-probabilities and numerical stability.** Probabilities of multiple observations are products of numbers between 0 and 1. With 100 observations each having probability 0.1, the joint probability is $0.1^{100} = 10^{-100}$ — smaller than any floating-point number. Working in log-space converts products to sums: $\ln(0.1^{100}) = 100\ln(0.1) = -230.3$ — perfectly representable. The MCMC acceptance ratio $\alpha = \min(1, r)$ with $r = p(\theta^*)/p(\theta_{t-1})$ is computed as $r = \exp(\ln p(\theta^*) - \ln p(\theta_{t-1}))$ — the difference of log-posteriors — which never underflows.
