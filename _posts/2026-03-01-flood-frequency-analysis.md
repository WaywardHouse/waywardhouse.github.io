---
layout: essay
title: "Flood Frequency Analysis"
subtitle: "Estimating flood magnitudes for design and risk assessment"
date: 2026-02-27
categories: [modeling]
series: computational-geography-atmospheric-hazards
series_order: 10
cluster: Y
cluster_title: "Flood Hydrology"
tags:
  - computational-geography
  - modeling
  - hydrology
  - floods
  - frequency-analysis
  - return-periods
math: true
viz: true
difficulty: 4
math_core: [log-pearson-iii, flood-quantiles, confidence-intervals, regional-frequency]
spatial_reasoning: 2
dynamics: 2
computation: 3
domain: [hydrology, flood-risk, civil-engineering, insurance]
excerpt: >
  How large will the 100-year flood be? Flood frequency analysis fits probability
  distributions to annual peak flows enabling estimation of design floods and
  floodplain mapping via Log-Pearson Type III and regional regression methods.
  This essay derives frequency factors, implements LP3 fitting, demonstrates flood
  quantile calculations, and extends to ungauged basins via regional equations.
math_prerequisites: >
  Probability distributions. Logarithms. Return periods (Essay 68). We'll introduce
  flood statistics and frequency methods from first principles.
---

## 1. The Question

What is the 100-year flood discharge for this river?

**Design flood problem:**

Every structure near water needs design flood estimate.

**Bridge:** How high to build?  
**Dam:** What spillway capacity?  
**Floodplain map:** Where is 100-year boundary?  
**Insurance:** What's the premium?

**Flood frequency analysis provides answer:**

Statistical method estimating flood magnitude for given return period.

**Based on:** Historical streamflow records

**Annual peak series:**

Each year, record maximum instantaneous discharge.

**Example - Allegheny River:**
- 1950: 4,200 cms
- 1951: 2,800 cms
- 1952: 5,600 cms (major flood)
- ...
- 2025: 3,100 cms

**Fit probability distribution** to these peaks.

**Extrapolate** to estimate rare events (100-year, 500-year).

**Applications:**
- Floodplain mapping (FEMA flood insurance rate maps)
- Bridge design (scour protection)
- Dam spillway sizing
- Levee height determination
- Building elevation requirements (freeboard)
- Emergency management planning

**Return period interpretation:**

**100-year flood:** 1% annual exceedance probability (AEP)

**Not:** "Occurs once per 100 years"

**Rather:** "1% chance each year, regardless of past floods"

**Misconception:** "We just had 100-year flood, safe for 100 years"

**Wrong!** Each year independent.

---

## 2. The Conceptual Model

### Log-Pearson Type III Distribution

**USGS standard method** (Bulletin 17C, 2017)

**Why logarithms?**

Flood peaks positively skewed (long right tail).

Logarithmic transformation normalizes distribution.

**Transform to log-space:**

$$Y = \log_{10}(Q)$$

**Pearson Type III distribution:**

Three-parameter distribution flexible for skewed data.

$$f(y) = \frac{\lambda^\alpha}{\Gamma(\alpha)}(y-\beta)^{\alpha-1}e^{-\lambda(y-\beta)}$$

Where:
- $\alpha$ = shape parameter (related to skewness)
- $\beta$ = location parameter (related to mean)
- $\lambda$ = scale parameter (related to std dev)
- $\Gamma(\alpha)$ = gamma function

**Method of moments:**

Parameters estimated from sample statistics:

**Mean:** $\bar{y} = \frac{1}{n}\sum y_i$

**Standard deviation:** $s_y = \sqrt{\frac{1}{n-1}\sum(y_i - \bar{y})^2}$

**Skew coefficient:** $G = \frac{n\sum(y_i - \bar{y})^3}{(n-1)(n-2)s_y^3}$

**Flood quantile formula:**

$$y_T = \bar{y} + K_T \times s_y$$

Where $K_T$ = frequency factor (function of skew $G$ and return period $T$)

**Back-transform:**

$$Q_T = 10^{y_T}$$

### Frequency Factor Tables

**$K_T$ values** tabulated by USGS (Bulletin 17C, Appendix 3)

**Example values** for selected skew and return periods:

| G    | T=10 | T=25 | T=50 | T=100 | T=500 |
|------|------|------|------|-------|-------|
| -0.4 | 1.32 | 1.87 | 2.23 | 2.56  | 3.27  |
| 0.0  | 1.28 | 1.75 | 2.05 | 2.33  | 2.88  |
| +0.4 | 1.22 | 1.61 | 1.85 | 2.08  | 2.49  |
| +1.0 | 1.10 | 1.34 | 1.49 | 1.62  | 1.88  |

**Pattern:** Higher positive skew → lower $K_T$ for same return period

**Interpretation:** Positively skewed distributions have heavier upper tail already captured in mean/std dev

### Regional Skew

**Problem:** Sample skew unstable (requires long records)

**Solution:** Generalized skew from regional analysis

**Weighted skew:**

$$G_w = \frac{MSE_G \times G + MSE_r \times G_r}{MSE_G + MSE_r}$$

Where:
- $G$ = station skew
- $G_r$ = regional skew (from USGS maps)
- $MSE$ = mean square error (weighting factor)

**Typical:** Regional skew map provides $G_r \approx 0$ to $+0.5$ depending on location

---

## 3. Building the Mathematical Model

### Step-by-Step LP3 Analysis

**Step 1: Assemble annual peak data**

Minimum 10 years, prefer 30+

**Step 2: Check for outliers**

**High outliers:** Peaks unusually large (different flood mechanism?)

**Low outliers:** Peaks unusually small (dam operation, drought?)

**Grubbs-Beck test:** Statistical outlier detection

Retain outliers if physically plausible.

**Step 3: Transform to logarithms**

$$y_i = \log_{10}(Q_i)$$

**Step 4: Calculate sample statistics**

$$\bar{y} = \frac{1}{n}\sum_{i=1}^n y_i$$

$$s_y = \sqrt{\frac{1}{n-1}\sum_{i=1}^n (y_i - \bar{y})^2}$$

$$G = \frac{n}{(n-1)(n-2)s_y^3}\sum_{i=1}^n (y_i - \bar{y})^3$$

**Step 5: Apply weighted skew** (combine station and regional)

**Step 6: Select frequency factors** from tables

**Step 7: Calculate flood quantiles**

$$y_T = \bar{y} + K_T(G_w, T) \times s_y$$

$$Q_T = 10^{y_T}$$

**Step 8: Estimate confidence intervals**

$$SE(y_T) = s_y \sqrt{\frac{1 + K_T^2/2}{n}}$$

95% CI: $y_T \pm 1.96 \times SE(y_T)$

### Plotting Position

**Empirical probability** for observed peaks:

$$P_i = \frac{i}{n+1}$$

Where $i$ = rank (1 = largest)

**Return period:**

$$T_i = \frac{1}{P_i}$$

**Plot** observed $(T_i, Q_i)$ vs fitted curve $Q_T$

**Visual check** of distribution fit

---

## 4. Worked Example by Hand

**Problem:** Estimate design floods for bridge design.

**River:** Tributary with 15 years of annual peak data

**Annual peaks (m³/s):**

| Year | Peak Q |
|------|--------|
| 2011 | 450    |
| 2012 | 580    |
| 2013 | 720    |
| 2014 | 390    |
| 2015 | 510    |
| 2016 | 680    |
| 2017 | 820    |
| 2018 | 470    |
| 2019 | 540    |
| 2020 | 610    |
| 2021 | 380    |
| 2022 | 650    |
| 2023 | 490    |
| 2024 | 560    |
| 2025 | 530    |

**Regional skew:** $G_r = +0.2$ (from USGS map)

Calculate 10-year, 50-year, and 100-year floods.

### Solution

**Step 1: Transform to logarithms**

$$y_i = \log_{10}(Q_i)$$

| Year | Q    | log₁₀(Q) |
|------|------|----------|
| 2011 | 450  | 2.653    |
| 2012 | 580  | 2.763    |
| 2013 | 720  | 2.857    |
| ...  | ...  | ...      |

**Step 2: Calculate mean**

$$\bar{y} = \frac{1}{15}(2.653 + 2.763 + ... + 2.724) = \frac{40.897}{15} = 2.726$$

**Step 3: Calculate standard deviation**

$$s_y = \sqrt{\frac{1}{14}\sum(y_i - 2.726)^2}$$

Example deviation: $(2.653 - 2.726)^2 = 0.00533$

Sum of squared deviations = 0.2156

$$s_y = \sqrt{\frac{0.2156}{14}} = \sqrt{0.0154} = 0.124$$

**Step 4: Calculate station skew**

$$G = \frac{15}{14 \times 13 \times 0.124^3}\sum(y_i - 2.726)^3$$

Example cubed deviation: $(2.653 - 2.726)^3 = -0.000389$

Sum of cubed deviations = +0.000821

$$G = \frac{15 \times 0.000821}{182 \times 0.00191} = \frac{0.0123}{0.348} = +0.035$$

**Low skew** (nearly symmetric)

**Step 5: Weighted skew**

Assume $MSE_G = 0.30$ (typical for $n=15$), $MSE_r = 0.25$

$$G_w = \frac{0.30 \times 0.035 + 0.25 \times 0.2}{0.30 + 0.25} = \frac{0.0105 + 0.050}{0.55} = 0.110$$

**Use $G_w = 0.11$ for frequency factors**

**Step 6: Frequency factors** (interpolated from tables)

For $G = 0.11$:
- $K_{10} = 1.27$
- $K_{50} = 2.01$
- $K_{100} = 2.29$

**Step 7: Calculate flood quantiles**

**10-year flood:**

$$y_{10} = 2.726 + 1.27 \times 0.124 = 2.726 + 0.157 = 2.883$$

$$Q_{10} = 10^{2.883} = 764 \text{ m}^3\text{/s}$$

**50-year flood:**

$$y_{50} = 2.726 + 2.01 \times 0.124 = 2.726 + 0.249 = 2.975$$

$$Q_{50} = 10^{2.975} = 944 \text{ m}^3\text{/s}$$

**100-year flood:**

$$y_{100} = 2.726 + 2.29 \times 0.124 = 2.726 + 0.284 = 3.010$$

$$Q_{100} = 10^{3.010} = 1023 \text{ m}^3\text{/s}$$

**Step 8: Confidence intervals** (95%)

$$SE(y_{100}) = 0.124 \sqrt{\frac{1 + 2.29^2/2}{15}} = 0.124 \sqrt{\frac{3.62}{15}} = 0.124 \times 0.491 = 0.061$$

$$y_{100} \pm 1.96 \times 0.061 = 3.010 \pm 0.120$$

Range: $y = 2.890$ to $3.130$

$$Q_{100} = 10^{2.890} \text{ to } 10^{3.130} = 776 \text{ to } 1349 \text{ m}^3\text{/s}$$

**Wide uncertainty:** 776-1349 cms (±28%)

**Step 9: Design recommendation**

**Bridge design:** Use upper confidence limit for safety

**Design Q₁₀₀ = 1350 m³/s**

---

## 5. Computational Implementation

Below is interactive flood frequency analyzer.

<div class="viz-container" id="flood-freq-viz">
  <div class="controls">
    <label>
      Record length (years):
      <input type="range" id="record-length" min="10" max="100" step="5" value="30">
      <span id="length-val">30</span>
    </label>
    <label>
      Skew coefficient:
      <input type="range" id="skew" min="-0.5" max="1.5" step="0.1" value="0.2">
      <span id="skew-val">0.2</span>
    </label>
    <label>
      Mean flow (log cms):
      <input type="range" id="mean-log" min="2.0" max="3.5" step="0.1" value="2.7">
      <span id="mean-val">2.7</span>
    </label>
    <div class="flood-info">
      <p><strong>Q₁₀:</strong> <span id="q10">--</span> m³/s</p>
      <p><strong>Q₅₀:</strong> <span id="q50">--</span> m³/s</p>
      <p><strong>Q₁₀₀:</strong> <span id="q100">--</span> m³/s</p>
      <p><strong>CI width (Q₁₀₀):</strong> ±<span id="ci-width">--</span>%</p>
    </div>
  </div>
  <div id="flood-canvas" style="height: 400px;"></div>
</div>

<script type="module">
await new Promise(r => {
  const c = () => typeof echarts !== 'undefined' ? r() : setTimeout(c, 50);
  c();
});

(function() {
  const chart = echarts.init(document.getElementById('flood-canvas'));
  let recordLength = 30, skew = 0.2, meanLog = 2.7;
  const stdLog = 0.15;
  
  function getK(G, T) {
    const kTable = {
      2: {'-0.5': 0.03, '0': 0.00, '0.5': -0.05, '1.0': -0.16, '1.5': -0.29},
      10: {'-0.5': 1.34, '0': 1.28, '0.5': 1.16, '1.0': 1.00, '1.5': 0.82},
      50: {'-0.5': 2.28, '0': 2.05, '0.5': 1.77, '1.0': 1.45, '1.5': 1.13},
      100: {'-0.5': 2.63, '0': 2.33, '0.5': 1.99, '1.0': 1.62, '1.5': 1.27}
    };
    
    const gKeys = ['-0.5', '0', '0.5', '1.0', '1.5'].map(Number);
    let gIdx = 0;
    for (let i = 0; i < gKeys.length - 1; i++) {
      if (G >= gKeys[i] && G < gKeys[i+1]) {
        gIdx = i;
        break;
      }
    }
    
    const g1 = gKeys[gIdx];
    const g2 = gKeys[gIdx + 1];
    const k1 = kTable[T][g1.toFixed(1)];
    const k2 = kTable[T][g2.toFixed(1)];
    return k1 + (k2 - k1) * (G - g1) / (g2 - g1);
  }
  
  function render() {
    const k10 = getK(skew, 10);
    const k50 = getK(skew, 50);
    const k100 = getK(skew, 100);
    
    const y10 = meanLog + k10 * stdLog;
    const y50 = meanLog + k50 * stdLog;
    const y100 = meanLog + k100 * stdLog;
    
    const q10 = Math.pow(10, y10);
    const q50 = Math.pow(10, y50);
    const q100 = Math.pow(10, y100);
    
    const se100 = stdLog * Math.sqrt((1 + k100*k100/2) / recordLength);
    const ciWidth = (1.96 * se100 / y100) * 100;
    
    document.getElementById('q10').textContent = q10.toFixed(0);
    document.getElementById('q50').textContent = q50.toFixed(0);
    document.getElementById('q100').textContent = q100.toFixed(0);
    document.getElementById('ci-width').textContent = ciWidth.toFixed(0);
    
    const returnPeriods = [];
    const discharges = [];
    const ciUpper = [];
    const ciLower = [];
    
    for (let t = 1.01; t <= 200; t *= 1.1) {
      const k = getK(skew, Math.min(100, Math.max(2, Math.round(t))));
      const y = meanLog + k * stdLog;
      const q = Math.pow(10, y);
      const se = stdLog * Math.sqrt((1 + k*k/2) / recordLength);
      
      returnPeriods.push(t);
      discharges.push(q);
      ciUpper.push(Math.pow(10, y + 1.96*se));
      ciLower.push(Math.pow(10, y - 1.96*se));
    }
    
    chart.setOption({
      title: {text: 'Flood Frequency Curve (Log-Pearson III)', left: 'center'},
      grid: {left: 80, right: 40, top: 60, bottom: 60},
      xAxis: {
        type: 'log',
        name: 'Return Period (years)',
        min: 1,
        max: 200
      },
      yAxis: {
        type: 'log',
        name: 'Discharge (m³/s)'
      },
      series: [
        {
          name: 'Fitted Curve',
          type: 'line',
          data: returnPeriods.map((t,i) => [t, discharges[i]]),
          lineStyle: {color: '#2196F3', width: 3}
        },
        {
          name: '95% CI Upper',
          type: 'line',
          data: returnPeriods.map((t,i) => [t, ciUpper[i]]),
          lineStyle: {color: '#90CAF9', width: 1, type: 'dashed'}
        },
        {
          name: '95% CI Lower',
          type: 'line',
          data: returnPeriods.map((t,i) => [t, ciLower[i]]),
          lineStyle: {color: '#90CAF9', width: 1, type: 'dashed'}
        }
      ]
    });
  }
  
  ['record-length', 'skew', 'mean-log'].forEach(id => {
    document.getElementById(id).addEventListener('input', e => {
      if (id === 'record-length') {
        recordLength = +e.target.value;
        document.getElementById('length-val').textContent = recordLength;
      } else if (id === 'skew') {
        skew = +e.target.value;
        document.getElementById('skew-val').textContent = skew;
      } else {
        meanLog = +e.target.value;
        document.getElementById('mean-val').textContent = meanLog;
      }
      render();
    });
  });
  
  render();
})();
</script>

---

## 6. Summary

Flood frequency analysis estimates design floods via Log-Pearson Type III distribution fitted to annual peak streamflow data transforming to logarithmic space for skewed distributions. Frequency factors K_T derived from skew coefficient and return period enabling quantile calculation via y_T = mean + K_T × std_dev. USGS Bulletin 17C standard method incorporating regional skew weighting and outlier detection improving estimates. Confidence intervals widen significantly for rare events with ±20-40% typical for 100-year estimates from 30-year records. Applications span bridge design, dam spillways, floodplain mapping, and flood insurance requiring return periods from 10 to 10,000 years depending on consequence of failure.

**Total: 69 complete essays**

---
