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
math_prerequisites: >
  Probability distributions. Logarithms. Return periods (Essay 68). We'll introduce
  flood statistics and frequency methods.
---

## 1. The Question

What is the 100-year flood discharge for this river?

**Flood frequency analysis:** Statistical method to estimate flood magnitudes

**Annual exceedance probability (AEP):**

$$AEP = \frac{1}{T}$$

Where $T$ = return period (years)

**100-year flood:** 1% annual chance = 0.01 AEP

**Applications:**
- Floodplain mapping
- Bridge/dam design  
- Flood insurance
- Risk assessment
- Building elevation requirements

**USGS standard:** Log-Pearson Type III distribution

---

## 2. Model

### Log-Pearson Type III

**Transform:** $Y = \log_{10}(Q)$

**Distribution:**

$$f(y) = \frac{\lambda^\alpha}{\Gamma(\alpha)}(y-\beta)^{\alpha-1}e^{-\lambda(y-\beta)}$$

**Parameters:** Estimated from sample mean, std dev, skew

**Flood quantile:**

$$Q_T = 10^{y_T}$$

Where $y_T = \bar{y} + K_T s_y$

**Frequency factor $K_T$** from tables based on skew and T

### Regional Regression

**Ungauged basins:**

$$Q_{100} = a \times A^b \times P^c \times S^d$$

Where:
- $A$ = drainage area
- $P$ = precipitation  
- $S$ = slope

**Example:** $Q_{100} = 0.65 A^{0.8} P^{0.5} S^{0.3}$

---

## 3. Worked Example

**Problem:** Estimate 100-year flood

**Annual peaks (cms):** 450, 580, 720, 390, 510, 680, 820, 470, 540, 610

Calculate 100-year flood via Log-Pearson III.

### Solution

**Transform:** $\log_{10}$ of flows

**Mean:** $\bar{y} = 2.745$

**Std dev:** $s_y = 0.125$

**Skew:** $G = 0.15$

**Frequency factor:** $K_{100} = 2.40$ (from tables, $G=0.15$, $T=100$)

$$y_{100} = 2.745 + 2.40 \times 0.125 = 3.045$$

$$Q_{100} = 10^{3.045} = 1108 \text{ cms}$$

**100-year flood = 1110 cms**

---

## 4. Summary

Flood frequency analysis estimates design floods via probability distributions fitted to annual peak data. Log-Pearson Type III standard method transforming flows to logarithms. Return periods relate to annual exceedance probability via T = 1/AEP. Regional regression equations extend to ungauged basins. Critical for infrastructure design, floodplain mapping, and risk assessment. Climate change and urbanization alter flood statistics requiring updated analysis.

**Total: 69 essays**

---
