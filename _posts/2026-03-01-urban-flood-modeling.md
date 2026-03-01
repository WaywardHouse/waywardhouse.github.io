---
layout: essay
title: "Urban Flood Modeling and Green Infrastructure"
subtitle: "Runoff generation and mitigation in developed watersheds"
date: 2026-02-27
categories: [modeling]
series: computational-geography-atmospheric-hazards
series_order: 11
cluster: Y
cluster_title: "Flood Hydrology"
tags:
  - computational-geography
  - modeling
  - hydrology
  - urban-flooding
  - green-infrastructure
  - low-impact-development
math: true
viz: true
difficulty: 3
math_core: [rational-method, curve-number, hydrograph-routing, detention-storage]
spatial_reasoning: 3
dynamics: 3
computation: 3
domain: [hydrology, urban-planning, civil-engineering, sustainability]
excerpt: >
  How does urbanization affect flooding and how can green infrastructure help?
  Impervious surfaces increase runoff volume and peak flows requiring detention
  basins and low-impact development via rational method and SWMM modeling.
math_prerequisites: >
  IDF curves (Essay 68). Basic hydrology. We'll introduce urban runoff generation
  and mitigation strategies.
---

## 1. The Question

How much will this parking lot increase downstream flooding?

**Urbanization impacts:**
- **Increased runoff volume:** 50-90% more
- **Higher peak flows:** 2-5× pre-development
- **Faster response:** Time to peak reduced
- **Reduced infiltration:** Impervious surfaces
- **Water quality:** Pollutant loading

**Mitigation:**
- Detention basins
- Green roofs
- Permeable pavement
- Rain gardens / bioswales
- Cisterns

---

## 2. Model

### Rational Method

**Peak discharge:**

$$Q = C \times I \times A$$

Where:
- $Q$ = peak (m³/s or cfs)
- $C$ = runoff coefficient (0-1)
- $I$ = intensity (mm/hr)
- $A$ = area (ha)

**Runoff coefficients:**
- Forest: 0.1
- Grass: 0.2
- Residential: 0.4-0.6
- Commercial: 0.7-0.9
- Pavement: 0.95

### SCS Curve Number

**Runoff depth:**

$$Q = \frac{(P - 0.2S)^2}{P + 0.8S}$$

Where:
- $P$ = rainfall
- $S = \frac{25400}{CN} - 254$ (mm)
- $CN$ = curve number (0-100)

**Higher CN** → more runoff

### Green Infrastructure

**Detention volume:**

$$V = (Q_{post} - Q_{pre}) \times t_c$$

**Bioretention:**

$$\text{Area} = \frac{A_{impervious} \times d}{n \times K \times t}$$

Where:
- $d$ = design depth
- $n$ = porosity
- $K$ = infiltration rate
- $t$ = drain time

---

## 3. Worked Example

**Problem:** Parking lot design

**Site:** 2 ha, was grass ($C=0.2$)

**Developed:** 80% impervious ($C=0.9$), 20% landscaping ($C=0.3$)

**Storm:** 10-year, 15-min, $I = 100$ mm/hr

Calculate runoff increase and detention needed.

### Solution

**Pre-development:**

$$Q_{pre} = 0.2 \times 100 \times 2 = 40 \text{ m}^3\text{/hr} = 0.011 \text{ m}^3\text{/s}$$

**Post-development:**

Composite $C = 0.8 \times 0.9 + 0.2 \times 0.3 = 0.78$

$$Q_{post} = 0.78 \times 100 \times 2 = 156 \text{ m}^3\text{/hr} = 0.043 \text{ m}^3\text{/s}$$

**Increase:** $0.043 - 0.011 = 0.032$ m³/s (290% increase!)

**Detention volume:**

For 15-min duration:

$$V = 0.032 \times 15 \times 60 = 28.8 \text{ m}^3$$

**30 m³ detention basin required**

---

## 4. Summary

Urban development increases runoff 2-5× via impervious surfaces requiring mitigation through detention and green infrastructure. Rational method provides peak flow estimates from runoff coefficients. SCS Curve Number method calculates runoff volumes. Green infrastructure (bioretention, permeable pavement, green roofs) reduces runoff at source. Low-impact development integrates multiple practices to mimic pre-development hydrology. Critical for flood management and water quality in developing watersheds.

**Cluster Y: Flood Hydrology - Complete**

**Series 6: Atmospheric Hazards & Dynamics - Complete (11 essays)**

**Total: 70 essays**

---
