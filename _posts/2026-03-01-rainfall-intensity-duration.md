---
layout: essay
title: "Rainfall Intensity-Duration-Frequency"
subtitle: "Statistical analysis of extreme precipitation for hydrologic design"
date: 2026-02-27
categories: [modeling]
series: computational-geography-atmospheric-hazards
series_order: 9
cluster: Y
cluster_title: "Flood Hydrology"
tags:
  - computational-geography
  - modeling
  - hydrology
  - precipitation
  - idf-curves
  - extreme-values
math: true
viz: true
difficulty: 4
math_core: [extreme-value-statistics, gev-distribution, idf-relationships, return-periods]
spatial_reasoning: 2
dynamics: 2
computation: 3
domain: [hydrology, civil-engineering, flood-risk, climate]
excerpt: >
  How intense will the 100-year storm be? Intensity-Duration-Frequency curves
  relate rainfall intensity to storm duration and return period via extreme value
  statistics, enabling hydrologic design of drainage systems and flood protection.
math_prerequisites: >
  Probability distributions. Statistics. Logarithms. We'll introduce extreme value
  theory and frequency analysis from first principles.
---

## 1. The Question

What rainfall intensity should this culvert be designed for?

**IDF curves:** Relate three quantities:
- **Intensity (I):** Rainfall rate (mm/hr or in/hr)
- **Duration (D):** Storm length (min to days)
- **Frequency (F):** Return period (years)

**Return period:** Average time between events of given magnitude

**Applications:**
- Storm sewer design
- Culvert sizing
- Dam spillway capacity
- Urban drainage
- Flood risk assessment

**Key relationship:** Short intense storms vs long moderate storms

---

## 2. The Conceptual Model

### Extreme Value Theory

**Generalized Extreme Value (GEV) distribution:**

$$F(x) = \exp\left[-\left(1 + \xi\frac{x-\mu}{\sigma}\right)^{-1/\xi}\right]$$

Where:
- $\mu$ = location parameter
- $\sigma$ = scale parameter  
- $\xi$ = shape parameter

**Return period:**

$$T = \frac{1}{1 - F(x)}$$

**Design value for T-year event:**

$$x_T = \mu - \frac{\sigma}{\xi}\left[1 - (-\ln(1-1/T))^{-\xi}\right]$$

### Sherman Equation

**Empirical IDF relationship:**

$$I = \frac{a}{(D + b)^c}$$

Where $a, b, c$ are fitted parameters varying with return period.

**Typical:** $c \approx 0.7-0.9$

**Inverse relationship:** Longer duration → lower intensity

---

## 3. Mathematical Model

### Annual Maximum Series

**Extract maximum:** Annual peak intensity for each duration

**Fit GEV:** Estimate parameters $\mu, \sigma, \xi$

**Calculate quantiles:** For desired return periods

### IDF Equation (General)

$$I = \frac{KT^m}{(D+b)^n}$$

Where:
- $K, m, n, b$ = regional parameters
- $T$ = return period (years)
- $D$ = duration (min)

**Typical values:**
- $m = 0.15-0.25$
- $n = 0.7-0.9$

---

## 4. Worked Example

**Problem:** Design storm sewer.

**Location:** Urban area, 15-min time of concentration

**Design standard:** 10-year return period

**Regional IDF:** $I = \frac{1200 T^{0.2}}{(D+10)^{0.8}}$

Calculate design intensity and depth.

### Solution

**Step 1: Apply IDF equation**

$$I = \frac{1200 \times 10^{0.2}}{(15+10)^{0.8}} = \frac{1200 \times 1.585}{25^{0.8}} = \frac{1902}{14.6} = 130 \text{ mm/hr}$$

**Step 2: Rainfall depth**

$$P = I \times D = 130 \times \frac{15}{60} = 32.5 \text{ mm}$$

**Step 3: Runoff (rational method)**

$$Q = C \times I \times A$$

Assume $C = 0.7$ (urban), $A = 5$ ha

$$Q = 0.7 \times 130 \times 5 = 455 \text{ m}^3\text{/hr} = 0.126 \text{ m}^3\text{/s}$$

**Design for 130 L/s capacity**

---

## 5. Summary

IDF curves relate rainfall intensity inversely to duration via extreme value statistics enabling design of hydraulic infrastructure. GEV distribution models annual maxima with return periods defining risk levels. Sherman and general IDF equations provide empirical relationships fitted to regional data. Applications span storm sewer sizing, culvert design, and flood risk assessment. Climate change modifying IDF relationships requiring updated design standards.

**Total: 68 essays**

---
