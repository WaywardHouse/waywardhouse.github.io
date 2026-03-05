---
layout: essay
title: "Nutrient Dynamics and Lake Eutrophication"
subtitle: "Phosphorus loading, Vollenweider model, stratification, and TMDL frameworks"
date: 2026-03-05
categories: modeling
series: computational-geography-laboratory
series_order: 105
cluster: "AS — Water Quality and Eutrophication"
cluster_order: 2
tags: [math, viz, essay]
math: true
viz: true
math_core:
  - mass balance (lake phosphorus)
  - regression (Vollenweider model)
  - logarithms and power laws
  - stratification physics
spatial_reasoning: watershed loading and lake response
dynamics: nutrient cycling and seasonal stratification
computation: Vollenweider steady-state, TMDL allocation
domain: limnology / water quality management
difficulty: 3
prerequisites:
  - AS1
  - B5
notebook_url: https://github.com/waywardhouse/computational-geography-lab/tree/main/essays/AS2-eutrophication
excerpt: >
  Lake Winnipeg receives phosphorus from the entire southern Manitoba watershed
  — agriculture, cities, and atmospheric deposition — and has responded with
  expanding blue-green algae blooms that now cover thousands of square kilometres.
  This essay derives the Vollenweider phosphorus loading model, quantifies the
  phosphorus-chlorophyll relationship, explains how summer stratification creates
  hypolimnetic oxygen depletion, and builds the Total Maximum Daily Load framework
  that allocates loading reductions among point and nonpoint sources.
math_prerequisites: >
  Mass balance concepts (Essay B5 and AR1). Logarithms for the Vollenweider
  regression. Basic algebra throughout.
---

Lake Winnipeg is the world's tenth-largest freshwater lake by surface area. It is also one of the world's most rapidly eutrophying large lakes. Total phosphorus concentrations have increased more than 10-fold in the south basin since the 1960s, driven primarily by agricultural runoff from the Red River watershed and municipal discharges from Winnipeg's wastewater treatment plants. The response has been an explosion of Aphanizomenon and Dolichospermum (formerly Anabaena) cyanobacteria — blue-green algae that produce toxins dangerous to livestock, pets, and children.

The quantitative framework for understanding this transition from clear oligotrophic lake to turbid hypereutrophic system is the **Vollenweider model** — a mass balance approach that links watershed phosphorus loading to lake phosphorus concentration, and lake phosphorus concentration to algal biomass.

---

## 1. The Question

How does phosphorus enter a lake and what controls its steady-state concentration? How does phosphorus concentration predict algal biomass (chlorophyll-a)? Why does summer stratification create oxygen depletion at the bottom? And how does the TMDL framework allocate loading reductions among sources to meet a water quality target?

---

## 2. The Conceptual Model

Lakes receive phosphorus from their watersheds via streams (point and nonpoint sources), direct atmospheric deposition, and shoreline erosion. They lose phosphorus through the outlet and through sedimentation to the lake bed. At steady state, inputs equal outputs — the lake phosphorus concentration reflects this equilibrium.

Phosphorus is the primary limiting nutrient for algal growth in most freshwater lakes. More phosphorus → more algae. More algae → more organic matter sinking to the bottom. More organic matter decomposing at the bottom → less oxygen in the deep water. Less oxygen in deep water → release of phosphorus from sediments (internal loading) → even more phosphorus. This positive feedback loop, once triggered, is the mechanism of eutrophication.

---

## 3. Building the Mathematical Model

### 3.1 Lake Phosphorus Mass Balance

The Vollenweider model treats the lake as a completely mixed reactor. The mass of phosphorus $M_P$ [g] in the lake:

$$\frac{dM_P}{dt} = L_P - Q_{\text{out}} C_P - v_s A_s C_P$$

where $L_P$ [g yr⁻¹] is total phosphorus loading, $Q_{\text{out}}$ [m³ yr⁻¹] is outflow, $C_P$ [g m⁻³ = mg L⁻¹] is in-lake phosphorus concentration, $v_s$ [m yr⁻¹] is the apparent settling velocity of phosphorus (sedimentation), and $A_s$ [m²] is lake surface area.

Dividing by lake volume $V$ [m³]:

$$\frac{dC_P}{dt} = \frac{L_P}{V} - \frac{Q_{\text{out}}}{V} C_P - \frac{v_s A_s}{V} C_P$$

Define: **hydraulic flushing rate** $\rho = Q_{\text{out}}/V$ [yr⁻¹] (the inverse of hydraulic residence time $\tau_w = V/Q_{\text{out}}$), and write $v_s A_s/V = v_s/\bar{z}$ where $\bar{z} = V/A_s$ is mean depth [m].

At **steady state** ($dC_P/dt = 0$):

$$C_P^* = \frac{L_P/V}{\rho + v_s/\bar{z}} = \frac{L_P/A_s}{\bar{z}(\rho + v_s/\bar{z})} = \frac{[L_P]}{\bar{z}(\rho + v_s/\bar{z})}$$

where $[L_P] = L_P/A_s$ [g m⁻² yr⁻¹] is the **areal phosphorus loading**. Rearranging:

$$\boxed{C_P^* = \frac{[L_P]/\bar{z}}{\rho + v_s/\bar{z}} = \frac{[L_P]}{v_s + \rho\bar{z}}}$$

Vollenweider (1975) found empirically that $v_s \approx 10$ m yr⁻¹ for total phosphorus in most lakes. This gives the simple form:

$$C_P^* = \frac{[L_P]}{10 + \rho\bar{z}}$$

where $[L_P]$ is in mg m⁻² yr⁻¹ and $\bar{z}$ in m, giving $C_P^*$ in mg m⁻³ (= μg L⁻¹).

### 3.2 Phosphorus Loading Budget

The total areal loading $[L_P]$ is the sum of all sources divided by lake area:

$$[L_P] = \frac{1}{A_s}\left(\sum_i Q_i C_{P,i}^{\text{stream}} + L_P^{\text{atm}} A_s + L_P^{\text{internal}}\right)$$

where the terms represent tributary loads, atmospheric deposition (typically 10–50 mg m⁻² yr⁻¹ in temperate regions), and internal loading from sediment release.

**Export coefficients** estimate nonpoint source loading from land use:

| Land use | Phosphorus export coefficient |
|---|---|
| Natural forest | 5–15 mg m⁻² yr⁻¹ |
| Improved pasture | 30–80 mg m⁻² yr⁻¹ |
| Row crops (corn/wheat) | 40–150 mg m⁻² yr⁻¹ |
| Urban residential | 50–150 mg m⁻² yr⁻¹ |
| Urban commercial/industrial | 100–300 mg m⁻² yr⁻¹ |
| Feedlot/intensive livestock | 500–5000 mg m⁻² yr⁻¹ |

Total watershed nonpoint load:

$$L_P^{\text{NPS}} = \sum_k e_k A_k$$

where $e_k$ [mg m⁻² yr⁻¹] is the export coefficient and $A_k$ [m²] is the area of land use type $k$.

### 3.3 Phosphorus-Chlorophyll Relationship

In-lake phosphorus concentration predicts algal biomass (chlorophyll-a, $\text{Chl}_a$) through an empirical regression calibrated across hundreds of lakes (Dillon and Rigler 1974; OECD 1982):

$$\log_{10}(\text{Chl}_a) = a + b \log_{10}(C_P)$$

with typical values $a \approx -0.369$, $b \approx 0.876$ (Chl$_a$ in μg L⁻¹, $C_P$ in μg L⁻¹). Equivalently:

$$\text{Chl}_a = 0.427 \cdot C_P^{0.876}$$

Trophic state boundaries (OECD classification):

| Trophic state | $C_P$ (μg/L) | Chl$_a$ (μg/L) | Secchi depth |
|---|---|---|---|
| Oligotrophic | < 10 | < 2.5 | > 6 m |
| Mesotrophic | 10–35 | 2.5–8 | 3–6 m |
| Eutrophic | 35–100 | 8–25 | 1.5–3 m |
| Hypereutrophic | > 100 | > 25 | < 1.5 m |

Lake Winnipeg south basin: $C_P \approx 100$–200 μg/L → hypereutrophic, Chl$_a$ predicted at 25–50 μg/L → consistent with observed summer bloom conditions.

### 3.4 Thermal Stratification and Hypolimnetic Oxygen Depletion

In summer, solar heating creates a warm, less-dense surface layer (epilimnion) floating above cold, dense bottom water (hypolimnion), separated by the **thermocline**. Once stratified, vertical mixing between these layers is suppressed for weeks to months.

The hypolimnion is a closed system: no reaeration from the surface (too far away and stratification prevents mixing), and organic matter settling from the productive surface layer decomposes aerobically. The oxygen consumption rate in the hypolimnion:

$$\frac{dC_O}{dt} = -k_h \cdot \text{BOD}_{\text{settling}}$$

where $k_h$ [day⁻¹] is the hypolimnetic oxygen consumption rate, proportional to the organic matter flux settling from above. In eutrophic lakes, the hypolimnetic oxygen depletion rate $R$ [mg L⁻¹ day⁻¹] correlates with TP concentration:

$$R \approx 0.010 \cdot C_P^{0.7}$$

(empirical; $R$ in mg L⁻¹ day⁻¹, $C_P$ in μg L⁻¹). If the hypolimnion starts the stratified period with DO = 10 mg/L and stratification lasts 90 days:

$$C_O(90) = 10 - 90 R$$

For $C_P = 80$ μg/L: $R = 0.010 × 80^{0.7} = 0.010 × 27.1 = 0.271$ mg/L/day → $C_O(90) = 10 - 24.4 = -14.4$ mg/L — oxygen is exhausted after $10/0.271 = 37$ days of stratification.

**Internal loading:** When hypolimnetic DO drops to zero (anaerobic conditions), iron-bound phosphorus in sediments is released:

$$L_P^{\text{internal}} = r_{\text{int}} \cdot A_{\text{hypolimnion}} \cdot t_{\text{anoxia}}$$

Typical internal loading rates $r_{\text{int}} = 1$–$10$ mg m⁻² day⁻¹ during anoxic periods. Internal loading from sediments can equal or exceed the entire external loading — making lake recovery difficult even after external load reductions.

### 3.5 Total Maximum Daily Load (TMDL)

A **TMDL** is the maximum amount of a pollutant that a water body can receive while still meeting water quality standards. The TMDL framework (US Clean Water Act Section 303(d); similar Canadian frameworks) allocates loading among sources:

$$\text{TMDL} = \sum_i \text{WLA}_i + \sum_j \text{LA}_j + \text{MOS}$$

where WLA = Waste Load Allocations (point sources), LA = Load Allocations (nonpoint sources), and MOS = Margin of Safety (typically 10% of TMDL to account for uncertainty).

**Setting the TMDL:** Work backwards from the water quality target (e.g., Chl$_a \leq 10$ μg/L for mesotrophic classification):

1. From Chl$_a$ target → $C_P^*$ target (via Dillon-Rigler regression)
2. From $C_P^*$ → $[L_P]$ target (via Vollenweider equation)
3. From $[L_P]$ → $L_P^{\text{total}}$ target = $[L_P] \times A_s$
4. Current loading $L_P^{\text{current}}$ → Required reduction = $L_P^{\text{current}} - L_P^{\text{target}}$
5. Allocate reductions among point sources (WLA) and nonpoint sources (LA)

The allocation step involves both technical feasibility (what reduction is achievable from each source type?) and equity (who pays?). Point sources are regulated through permit limits; nonpoint sources through incentive programmes, best management practices (BMPs), and land use regulations.

---

## 4. Worked Example by Hand

**Setting:** A small Alberta lake, 4 km²  surface area, mean depth 8 m, residence time $\tau_w = 3$ years ($\rho = 0.333$ yr⁻¹). Current areal loading $[L_P] = 3.2$ g m⁻² yr⁻¹ = 3200 mg m⁻² yr⁻¹. Target: mesotrophic (Chl$_a \leq 8$ μg/L).

**Step 1: Current steady-state phosphorus**

$$C_P^* = \frac{3200}{10 + 0.333 \times 8} = \frac{3200}{10 + 2.67} = \frac{3200}{12.67} = 252 \text{ μg/L}$$

Hypereutrophic — consistent with observed conditions.

**Step 2: Target phosphorus from Chl target**

From Chl$_a = 8$ μg/L → $C_P = (8/0.427)^{1/0.876} = (18.74)^{1.142}$:

$\ln C_P = 1.142 \ln(18.74) = 1.142 × 2.931 = 3.347$ → $C_P = e^{3.347} = 28.4$ μg/L ≈ 28 μg/L (mesotrophic boundary ✓)

**Step 3: Target areal loading**

$$[L_P]^{\text{target}} = C_P^{\text{target}} \times (10 + \rho\bar{z}) = 28 \times 12.67 = 355 \text{ mg m}^{-2}\text{yr}^{-1}$$

**Step 4: Required reduction**

$$\Delta[L_P] = 3200 - 355 = 2845 \text{ mg m}^{-2}\text{yr}^{-1} = 89\% \text{ reduction required}$$

This 89% reduction is a severe but realistic result for heavily loaded agricultural lakes in the Prairies. The dominant source — non-point agricultural runoff — cannot be reduced by 89% through incremental BMPs alone; it requires fundamental changes to watershed land management.

---

## 5. Computational Implementation

```
function vollenweider_Cp(L_areal_mg_m2_yr, z_bar_m, rho_yr, vs=10):
    return L_areal_mg_m2_yr / (vs + rho_yr * z_bar_m)

function dillon_rigler(Cp_ug_L):
    return 0.427 * Cp_ug_L**0.876

function trophic_state(Cp_ug_L):
    if Cp_ug_L < 10:   return "Oligotrophic"
    if Cp_ug_L < 35:   return "Mesotrophic"
    if Cp_ug_L < 100:  return "Eutrophic"
    return "Hypereutrophic"

function tmdl_target_loading(chl_target, z_bar, rho, vs=10):
    # Invert Dillon-Rigler
    Cp_target = (chl_target / 0.427)**(1/0.876)
    L_target = Cp_target * (vs + rho * z_bar)
    return L_target, Cp_target

function hypo_oxygen_depletion(Cp_ug_L, days_stratified, DO_initial=10):
    R = 0.010 * Cp_ug_L**0.7  # mg/L/day
    days_to_anoxia = DO_initial / R
    final_DO = max(0, DO_initial - R * days_stratified)
    return final_DO, days_to_anoxia
```

```{pyodide}
import numpy as np

def vollenweider(L, z, rho, vs=10):
    return L / (vs + rho * z)

def dillon_rigler(Cp):
    return 0.427 * Cp**0.876

def trophic_state(Cp):
    if Cp < 10:   return "Oligotrophic"
    elif Cp < 35: return "Mesotrophic"
    elif Cp < 100: return "Eutrophic"
    else:         return "Hypereutrophic"

def tmdl_loading(chl_target, z, rho, vs=10):
    Cp = (chl_target / 0.427)**(1/0.876)
    return Cp * (vs + rho * z), Cp

def hypo_depletion(Cp, days, DO0=10):
    R = 0.010 * Cp**0.7
    anoxia_day = DO0 / R
    final_DO = max(0, DO0 - R * days)
    return R, anoxia_day, final_DO

# Alberta lake example
z, rho = 8.0, 0.333
L_current = 3200.0   # mg/m²/yr

Cp = vollenweider(L_current, z, rho)
chl = dillon_rigler(Cp)
print(f"Current state:")
print(f"  Cp* = {Cp:.0f} μg/L → {trophic_state(Cp)}")
print(f"  Predicted Chl-a = {chl:.1f} μg/L")

L_target, Cp_target = tmdl_loading(8.0, z, rho)
print(f"\nTMDL for Chl ≤ 8 μg/L:")
print(f"  Target Cp = {Cp_target:.1f} μg/L")
print(f"  Target loading = {L_target:.0f} mg/m²/yr")
print(f"  Reduction needed = {100*(L_current-L_target)/L_current:.0f}%")

print("\nHypolimnetic oxygen depletion (90-day stratification):")
for Cp_test in [20, 50, 80, 150]:
    R, td, DO_final = hypo_depletion(Cp_test, 90)
    print(f"  Cp={Cp_test:3d} μg/L: R={R:.3f} mg/L/d, anoxia in {td:.0f} d, DO_final={DO_final:.1f} mg/L")
```

---

## 6. Visualization

<div data-viz="echarts" style="height:420px" data-options='{
  "title": {"text": "Vollenweider Diagram — Phosphorus Loading vs Lake Trophic State", "textStyle": {"fontSize": 14}},
  "tooltip": {"trigger": "axis"},
  "legend": {"data": ["Predicted Chl-a (μg/L)", "Eutrophic threshold (Chl=8)", "Hypereutrophic threshold (Chl=25)"], "bottom": 0},
  "xAxis": {"name": "Areal phosphorus loading (mg m⁻² yr⁻¹)", "nameLocation": "middle", "nameGap": 30,
    "data": [50, 100, 200, 400, 800, 1200, 1600, 2400, 3200]},
  "yAxis": {"name": "Predicted chlorophyll-a (μg L⁻¹)", "nameLocation": "middle", "nameGap": 55},
  "series": [
    {"name": "Predicted Chl-a (μg/L)", "type": "line", "smooth": true,
     "itemStyle": {"color": "#2E7D32"},
     "data": [1.5, 3.1, 6.5, 13.8, 29.4, 44.6, 59.8, 91.0, 122.0]},
    {"name": "Eutrophic threshold (Chl=8)", "type": "line",
     "lineStyle": {"type": "dashed", "color": "#F57F17"},
     "data": [8,8,8,8,8,8,8,8,8]},
    {"name": "Hypereutrophic threshold (Chl=25)", "type": "line",
     "lineStyle": {"type": "dashed", "color": "#C62828"},
     "data": [25,25,25,25,25,25,25,25,25]}
  ]
}'></div>

The transition from mesotrophic to eutrophic occurs at ~200 mg m⁻² yr⁻¹ loading for this lake, and to hypereutrophic at ~900 mg m⁻² yr⁻¹. The Alberta lake in the worked example receives 3200 mg m⁻² yr⁻¹ — well into hypereutrophic territory. The steep slope of the curve at high loadings means that large reductions in loading produce relatively modest improvements in trophic state until loading falls below the eutrophic threshold.

---

## 7. Interpretation

The Vollenweider model gives water quality managers a precise answer to a policy question: how much must we reduce phosphorus loading to achieve a target water quality? The 89% reduction required for the Alberta lake is sobering but honest — incremental BMPs typically achieve 20–40% reductions, and meeting the 89% target requires fundamental changes to agricultural practice or watershed land use.

The internal loading problem makes lake recovery slower than watershed recovery. Even after external loads are reduced to target levels, legacy phosphorus in bottom sediments continues to release during summer anoxia, potentially maintaining eutrophic conditions for years to decades. This is why passive management (reducing external loads and waiting) often requires supplementation with active measures: alum treatment of the water column to bind phosphorus, hypolimnetic aeration to prevent sediment release, or even dredging to remove the phosphorus-rich surface sediment layer.

Lake Winnipeg illustrates the international dimension: approximately 50% of its phosphorus loading originates in the United States (Minnesota and North Dakota via the Red River). No Canadian water quality regulation can address this load directly — it requires international agreements under the Boundary Waters Treaty, analogous to the Great Lakes agreements that achieved remarkable water quality improvements in Lakes Erie and Ontario in the 1970s–1990s through the International Joint Commission framework.

---

## 8. What Could Go Wrong?

**The Vollenweider model assumes complete mixing.** Many lakes are poorly mixed: shallow embayments experience higher phosphorus concentrations than the main basin; stratified lakes have very different epilimnetic and hypolimnetic concentrations. Applying the completely-mixed model to a stratified lake overestimates dilution and underestimates the local algal response.

**Export coefficients are highly uncertain.** The range of values for row crops (40–150 mg m⁻² yr⁻¹) spans nearly a factor of 4. Actual export depends on soil type, tillage practice, drainage tile density, proximity to watercourses, and weather. Using mid-range export coefficients can produce loading estimates that are off by a factor of 2–3 — sufficient to change the TMDL target allocation significantly.

**Internal loading is often underestimated.** The simple empirical formula $R = 0.010 C_P^{0.7}$ gives the lake-average depletion rate, but sediment phosphorus release is spatially heterogeneous and time-dependent. Newly deposited organic-rich sediments have much higher release rates than well-oxidised mineral sediments. After external load reductions, the hypolimnion may remain anoxic for years as legacy sediment phosphorus is gradually depleted.

**The phosphorus-chlorophyll regression has wide scatter.** The Dillon-Rigler regression has an $r^2$ of approximately 0.7 — a 30-unit $C_P$ difference does not reliably translate to the predicted chlorophyll change. Individual lakes deviate substantially from the regression line due to differences in light availability, nitrogen limitation, grazing pressure, and species composition. The regression should be used for order-of-magnitude planning, not precise prediction.

---

## 9. Summary

The Vollenweider phosphorus mass balance model relates areal phosphorus loading $[L_P]$ to steady-state in-lake concentration $C_P^* = [L_P]/(v_s + \rho\bar{z})$, where $v_s \approx 10$ m yr⁻¹ is the apparent sedimentation velocity and $\rho = 1/\tau_w$ is the hydraulic flushing rate. The Dillon-Rigler regression $\text{Chl}_a = 0.427 C_P^{0.876}$ predicts algal biomass from phosphorus concentration.

Summer stratification seals the hypolimnion from reaeration; organic matter decomposition exhausts hypolimnetic oxygen within weeks to months in eutrophic lakes, triggering anaerobic phosphorus release from sediments (internal loading). The TMDL framework works backwards from a water quality target through the phosphorus-chlorophyll regression and Vollenweider equation to derive a loading target, then allocates reductions among point (WLA) and nonpoint (LA) sources.

**Key equations:**

$$C_P^* = \frac{[L_P]}{v_s + \rho\bar{z}}, \quad v_s \approx 10 \text{ m yr}^{-1}$$

$$\text{Chl}_a = 0.427\, C_P^{0.876}$$

$$\text{TMDL} = \Sigma\text{WLA} + \Sigma\text{LA} + \text{MOS}$$

---

## Math Refresher

**The log-log regression.** The Dillon-Rigler relationship $\text{Chl}_a = 0.427 C_P^{0.876}$ is a power law — it appears as a straight line on a log-log plot. Taking logarithms: $\log(\text{Chl}_a) = \log(0.427) + 0.876 \log(C_P)$. The slope 0.876 is the scaling exponent — a 10% increase in $C_P$ produces a $1.10^{0.876} - 1 = 8.7\%$ increase in chlorophyll (slightly sublinear). Inverting the equation to find $C_P$ from a Chl target: $C_P = (\text{Chl}_a / 0.427)^{1/0.876}$.

**Residence time and flushing.** The hydraulic residence time $\tau_w = V/Q_{\text{out}}$ is the average time a water molecule spends in the lake. A lake with $\tau_w = 10$ years is flushed once per decade — it responds slowly to changes in loading. A lake with $\tau_w = 3$ months responds quickly. The flushing rate $\rho = 1/\tau_w$ appears in the Vollenweider denominator: fast-flushing lakes (high $\rho$) have lower $C_P^*$ for the same loading because they export phosphorus through the outlet more rapidly before it settles.
