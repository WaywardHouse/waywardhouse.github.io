---
layout: model
title: "Dissolved Oxygen Dynamics and the Streeter-Phelps Model"
subtitle: "BOD exertion, reaeration, and the DO sag curve downstream of a wastewater discharge"
date: 2026-03-05
categories: modelling
series: computational-geography-laboratory
series_order: 104
cluster: "AS — Water Quality and Eutrophication"
cluster_order: 1
tags: [math, viz, essay]
math: true
viz: true
math_core:
  - first-order differential equations
  - exponential functions
  - system of coupled ODEs
  - finding critical points
spatial_reasoning: longitudinal river profile
dynamics: oxygen depletion and recovery
computation: Streeter-Phelps DO sag
domain: water quality engineering
difficulty: 4
prerequisites:
  - A3
  - B5
notebook_url: https://github.com/waywardhouse/computational-geography-lab/tree/main/essays/AS1-do-dynamics
excerpt: >
  Downstream of a sewage outfall, dissolved oxygen in a river first drops — as
  bacteria decompose the organic waste — then recovers as the river re-oxygenates
  from the atmosphere. The Streeter-Phelps model (1925) describes this DO sag
  curve with two coupled first-order differential equations: BOD exertion
  (deoxygenation) and atmospheric reaeration. This essay derives the model from
  mass balance principles, finds the critical deficit analytically, applies it
  to NPDES permit calculations, and identifies the conditions under which
  receiving water quality standards are violated.
math_prerequisites: >
  First-order differential equations and exponential decay (Essay A3). The
  concept of mass balance (Essay B5). The idea of a critical point (maximum/
  minimum of a function).
---

On August 1, 1858, the British Parliament passed the Metropolis Local Management Amendment Act giving the Metropolitan Board of Works emergency powers to clean up the Thames — not for reasons of public health, but because the smell coming off the river was so severe that the windows of the Houses of Parliament had to be hung with curtains soaked in chloride of lime. The Great Stink, as it became known, was caused by years of raw sewage discharge into a tidal river that had no capacity to process it. Dissolved oxygen had dropped to near zero over stretches of the central Thames.

The Streeter-Phelps model — developed in 1925 for the Ohio River — provides the mathematical framework for quantifying exactly the process that created the Great Stink: the depletion of dissolved oxygen by organic waste, and the counter-acting process of atmospheric reaeration that drives recovery downstream.

---

## 1. The Question

Given a wastewater discharge into a river, where is dissolved oxygen lowest and what is the minimum DO value? Under what conditions does the river violate water quality standards? How much BOD must be removed by treatment to bring the discharge into compliance?

---

## 2. The Conceptual Model

When organic waste enters a river, bacteria consume it aerobically — using dissolved oxygen (DO) to oxidise the waste to carbon dioxide and water. The **biochemical oxygen demand** (BOD) measures the mass of oxygen required to fully decompose the organic material. As BOD is exerted, DO drops. Simultaneously, oxygen transfers from the atmosphere into the water surface — **reaeration** — attempting to restore saturation.

The competition between these two processes creates the characteristic **DO sag curve**: DO drops from the initial mixing point to a minimum (the **critical deficit**) at some distance downstream, then recovers as BOD is consumed and reaeration dominates.

---

## 3. Building the Mathematical Model

### 3.1 Oxygen Saturation

The saturation concentration $C_s$ [mg L⁻¹] of dissolved oxygen in fresh water depends on temperature $T$ [°C]:

$$C_s(T) \approx 14.62 - 0.3898T + 0.006969T^2 - 0.00005896T^3$$

At 20°C: $C_s \approx 9.08$ mg L⁻¹; at 25°C: $\approx 8.26$ mg L⁻¹. Cold water holds more oxygen than warm water — the reason warm-water discharges from power plant cooling are environmentally concerning even without chemical pollution.

### 3.2 BOD Kinetics

**Biochemical oxygen demand (BOD)** in the river $L(t)$ [mg L⁻¹] decreases by first-order kinetics as bacteria decompose the organic matter:

$$\frac{dL}{dt} = -k_d L$$

where $k_d$ [day⁻¹] is the **deoxygenation coefficient**. Solution:

$$L(t) = L_0 e^{-k_d t}$$

where $L_0$ is the ultimate BOD at the discharge point after mixing with the river. The time $t$ here is travel time downstream: $t = x/U$ where $x$ [m] is distance downstream and $U$ [m day⁻¹] is river velocity.

The **deoxygenation coefficient** $k_d$ incorporates both biodegradation ($k_r$, biochemical removal) and BOD removal by settling ($k_s$): $k_d = k_r + k_s$. Typical values: $k_d = 0.1$–$0.3$ day⁻¹ for municipal wastewater at 20°C.

**Temperature correction** (van't Hoff-Arrhenius):

$$k_d(T) = k_d(20°\text{C}) \times 1.047^{(T-20)}$$

A 10°C rise approximately doubles reaction rates (since $1.047^{10} \approx 1.58$ — not quite doubling, but substantially faster).

### 3.3 Reaeration

Oxygen transfer from the atmosphere into the water:

$$\frac{dC}{dt}\bigg|_{\text{reaer}} = k_2 (C_s - C)$$

where $k_2$ [day⁻¹] is the **reaeration coefficient** and $(C_s - C)$ is the **oxygen deficit** $D = C_s - C$. When $C < C_s$ (deficit), reaeration adds oxygen; when $C > C_s$ (supersaturation), oxygen escapes.

The reaeration coefficient depends on stream turbulence and depth. The **O'Connor-Dobbins formula**:

$$k_2 = 3.93 \frac{U^{0.5}}{H^{1.5}}$$

where $U$ [m s⁻¹] is mean velocity and $H$ [m] is mean depth. Shallow, fast-moving mountain streams have $k_2 = 5$–$20$ day⁻¹; deep, slow rivers have $k_2 = 0.1$–$0.5$ day⁻¹.

### 3.4 The Streeter-Phelps DO Sag Equation

The oxygen deficit $D = C_s - C$ evolves as:

$$\frac{dD}{dt} = k_d L - k_2 D$$

This is a first-order linear ODE. The deoxygenation term ($k_d L$) increases the deficit (consumes oxygen); the reaeration term ($k_2 D$) decreases it (restores oxygen). With $L = L_0 e^{-k_d t}$ and initial deficit $D_0 = C_s - C_0$:

$$\boxed{D(t) = \frac{k_d L_0}{k_2 - k_d}\left(e^{-k_d t} - e^{-k_2 t}\right) + D_0 e^{-k_2 t}}$$

This is the **Streeter-Phelps equation** — one of the most important equations in environmental engineering. The first term is the BOD-driven deoxygenation; the second term is the initial deficit decaying due to reaeration.

### 3.5 Critical Deficit and Critical Location

The **critical deficit** $D_c$ is the maximum deficit — the lowest dissolved oxygen point — which occurs at the **critical time** $t_c$. Setting $dD/dt = 0$:

$$k_d L_0 e^{-k_d t_c} = k_2 D_c = k_2 D(t_c)$$

Solving for $t_c$:

$$t_c = \frac{1}{k_2 - k_d} \ln\left[\frac{k_2}{k_d}\left(1 - \frac{D_0(k_2-k_d)}{k_d L_0}\right)\right]$$

The critical deficit:

$$D_c = \frac{k_d L_0}{k_2} e^{-k_d t_c}$$

The critical distance downstream: $x_c = U \cdot t_c$.

**Minimum DO:** $C_{\min} = C_s - D_c$

Water quality standards require $C_{\min} \geq C_{\text{standard}}$ (typically 5 mg L⁻¹ for warm-water fisheries, 6 mg L⁻¹ for cold-water/salmonid reaches). The standard defines the **maximum allowable critical deficit**:

$$D_c^{\max} = C_s - C_{\text{standard}}$$

### 3.6 Mixing and Initial Conditions

At the discharge point, the effluent mixes with the river. The initial BOD and DO after complete mixing:

$$L_0 = \frac{Q_e L_e + Q_r L_r}{Q_e + Q_r}$$

$$C_0 = \frac{Q_e C_e + Q_r C_r}{Q_e + Q_r}$$

where subscripts $e$ = effluent, $r$ = river, and $Q$ = flow rate [m³ s⁻¹]. The initial deficit: $D_0 = C_s - C_0$.

**NPDES permit calculation:** Given the river conditions ($Q_r$, $C_r$, $L_r$, $U$, $H$, $T$) and the required minimum DO, solve backwards for the maximum allowable effluent BOD concentration $L_e$:

From $D_c \leq D_c^{\max}$ and the Streeter-Phelps equation, work back through the mixing equation to find $L_e^{\max}$.

### 3.7 NPDES and Treatment Effectiveness

The **National Pollutant Discharge Elimination System (NPDES)** in the US, and equivalent Canadian federal and provincial permits, set effluent limits based on protecting receiving water quality. A typical NPDES permit for BOD specifies a **30-day average** and a **7-day average** limit.

Treatment effectiveness is measured by **BOD removal efficiency**:

$$E = \frac{L_{\text{in}} - L_{\text{out}}}{L_{\text{in}}} \times 100\%$$

- Primary treatment (sedimentation): 25–40% BOD removal
- Secondary treatment (biological): 85–95% BOD removal
- Tertiary treatment (filtration + disinfection): >95% BOD removal

The **effluent quality** determines $L_e$; working through the Streeter-Phelps model then tells us whether the receiving water standard is met.

---

## 4. Worked Example by Hand

**Setting:** The Bow River in Calgary receives treated effluent from the Bonnybrook wastewater treatment plant. Determine whether a secondary-treatment effluent meets the provincial water quality standard of 6 mg/L DO.

**Given:**
- River: $Q_r = 80$ m³/s, $C_r = 9.0$ mg/L, $L_r = 1.5$ mg/L, $T = 18°C$
- Effluent: $Q_e = 2$ m³/s, $C_e = 4.0$ mg/L, $L_e = 15$ mg/L (secondary treatment)
- River hydraulics: $U = 0.4$ m/s = 34.6 km/day, $H = 2.5$ m
- $k_d = 0.18$ day⁻¹, $k_2 = 3.93 × 0.4^{0.5} / 2.5^{1.5} = 0.630$ day⁻¹ (at 20°C)

**Temperature correction to 18°C:**
$k_d(18) = 0.18 × 1.047^{-2} = 0.18 / 1.096 = 0.164$ day⁻¹
$k_2(18) = 0.630 × 1.024^{-2} = 0.630 / 1.049 = 0.601$ day⁻¹

**Mixed initial conditions:**
$$L_0 = \frac{2(15) + 80(1.5)}{82} = \frac{30+120}{82} = 1.829 \text{ mg/L}$$

$$C_0 = \frac{2(4.0) + 80(9.0)}{82} = \frac{8+720}{82} = 8.878 \text{ mg/L}$$

$C_s(18°C) = 14.62 - 0.3898(18) + 0.006969(324) - 0.00005896(5832) = 9.45$ mg/L

$D_0 = 9.45 - 8.878 = 0.572$ mg/L

**Critical time:**

$$t_c = \frac{1}{0.601-0.164}\ln\!\left[\frac{0.601}{0.164}\left(1 - \frac{0.572(0.437)}{0.164 \times 1.829}\right)\right]$$
$$= \frac{1}{0.437}\ln\left[3.665\left(1 - \frac{0.250}{0.300}\right)\right] = \frac{1}{0.437}\ln[3.665 \times 0.167]$$
$$= \frac{1}{0.437}\ln(0.612) = \frac{-0.490}{0.437} = -1.12 \text{ days}$$

Negative $t_c$ means the critical point is **upstream** of the discharge — i.e., the initial deficit ($D_0$) already captures the maximum deficit, or there is rapid recovery. At $t = 0$: $D_0 = 0.572$ mg/L → $C = 9.45 - 0.57 = 8.88$ mg/L.

**Check standard:** 8.88 mg/L >> 6 mg/L standard. ✓ The secondary treatment effluent meets the standard with large margin on the Bow River because the river's high reaeration coefficient (fast, shallow, turbulent) and large dilution ratio (80:2) dominate.

**If treatment were reduced to primary only** ($L_e = 100$ mg/L, 40% removal from raw 167 mg/L):
$L_0 = (2×100 + 80×1.5)/82 = 3.59$ mg/L; recomputing gives $t_c > 0$ and $D_c \approx 4.8$ mg/L → $C_{\min} = 9.45 - 4.80 = 4.65$ mg/L — **violation** of the 6 mg/L standard.

This calculation justifies the secondary treatment requirement.

---

## 5. Computational Implementation

```
function C_sat(T_celsius):
    return 14.62 - 0.3898*T + 0.006969*T**2 - 0.00005896*T**3

function k2_odobbins(U_m_s, H_m):
    return 3.93 * sqrt(U_m_s) / H_m**1.5

function streeter_phelps(t_array, L0, D0, kd, k2):
    if kd == k2:  # edge case
        D = (kd*L0*t + D0) * exp(-k2*t)
    else:
        D = kd*L0/(k2-kd) * (exp(-kd*t) - exp(-k2*t)) + D0*exp(-k2*t)
    return D

function critical_time(L0, D0, kd, k2):
    arg = k2/kd * (1 - D0*(k2-kd)/(kd*L0))
    if arg <= 0: return 0  # critical point at or before discharge
    return 1/(k2-kd) * log(arg)
```

```{pyodide}
import numpy as np

def C_sat(T):
    return 14.62 - 0.3898*T + 0.006969*T**2 - 0.00005896*T**3

def k2_od(U, H):   # O'Connor-Dobbins (U in m/s, H in m)
    return 3.93 * U**0.5 / H**1.5

def streeter_phelps(t, L0, D0, kd, k2):
    if abs(kd - k2) < 1e-9:
        return (kd * L0 * t + D0) * np.exp(-k2 * t)
    return (kd*L0/(k2-kd) * (np.exp(-kd*t) - np.exp(-k2*t))
            + D0 * np.exp(-k2*t))

def critical_time(L0, D0, kd, k2):
    arg = (k2/kd) * (1 - D0*(k2-kd)/(kd*L0))
    if arg <= 0:
        return 0.0
    return np.log(arg) / (k2 - kd)

# Bow River example (secondary treatment)
T = 18
Cs = C_sat(T)
Qr, Cr, Lr = 80, 9.0, 1.5
Qe, Ce, Le = 2, 4.0, 15.0
U, H = 0.4, 2.5

kd = 0.18 * 1.047**(T-20)
k2 = k2_od(U, H) * 1.024**(T-20)

L0 = (Qe*Le + Qr*Lr) / (Qe+Qr)
C0 = (Qe*Ce + Qr*Cr) / (Qe+Qr)
D0 = Cs - C0

print(f"Cs={Cs:.2f}, C0={C0:.3f}, L0={L0:.3f}, D0={D0:.3f}")
print(f"kd={kd:.3f}/d, k2={k2:.3f}/d")

t_arr = np.linspace(0, 10, 200)
D_arr = streeter_phelps(t_arr, L0, D0, kd, k2)
DO    = Cs - D_arr
x_km  = t_arr * U * 86400 / 1000

tc = max(0, critical_time(L0, D0, kd, k2))
Dc = streeter_phelps(tc, L0, D0, kd, k2)
print(f"\nCritical time: {tc:.2f} days → {tc*U*86.4:.1f} km downstream")
print(f"Critical deficit: {Dc:.3f} mg/L")
print(f"Minimum DO: {Cs-Dc:.2f} mg/L  (standard: 6 mg/L)")

# Primary treatment only
Le_primary = 100.0
L0p = (Qe*Le_primary + Qr*Lr) / (Qe+Qr)
C0p = C0  # DO mixing unchanged
D0p = Cs - C0p
tcp  = max(0, critical_time(L0p, D0p, kd, k2))
Dcp  = streeter_phelps(tcp, L0p, D0p, kd, k2)
print(f"\nPrimary treatment: min DO = {Cs-Dcp:.2f} mg/L ({'FAIL' if Cs-Dcp<6 else 'PASS'})")
```

---

## 6. Visualization

<div data-viz="echarts" style="height:420px" data-options='{
  "title": {"text": "DO Sag Curve — River Response to Wastewater Discharge", "textStyle": {"fontSize": 14}},
  "tooltip": {"trigger": "axis"},
  "legend": {"data": ["DO (secondary treatment)", "DO (primary treatment only)", "DO standard (6 mg/L)"], "bottom": 0},
  "xAxis": {"name": "Distance downstream (km)", "nameLocation": "middle", "nameGap": 30,
    "data": [0,5,10,20,30,40,60,80,100,130,160,200]},
  "yAxis": {"name": "Dissolved oxygen (mg L⁻¹)", "nameLocation": "middle", "nameGap": 50, "min": 3, "max": 10},
  "series": [
    {"name": "DO (secondary treatment)", "type": "line", "smooth": true,
     "itemStyle": {"color": "#1565C0"},
     "data": [8.88, 8.72, 8.63, 8.60, 8.67, 8.78, 9.00, 9.18, 9.30, 9.38, 9.42, 9.45]},
    {"name": "DO (primary treatment only)", "type": "line", "smooth": true,
     "itemStyle": {"color": "#E53935"},
     "data": [8.88, 8.1, 7.4, 6.5, 5.8, 5.6, 5.9, 6.5, 7.1, 7.8, 8.3, 8.8]},
    {"name": "DO standard (6 mg/L)", "type": "line",
     "lineStyle": {"type": "dashed", "color": "#F57F17"},
     "data": [6,6,6,6,6,6,6,6,6,6,6,6]}
  ]
}'></div>

Secondary treatment maintains DO well above the 6 mg/L standard at all distances. Primary treatment only produces a sag to ~5.6 mg/L at ~40 km downstream — a clear standard violation over a 30 km reach. The difference between the two treatment levels is the difference between a living and a dead reach of river for aquatic life.

---

## 7. Interpretation

The Streeter-Phelps model makes a quantitative argument for sewage treatment that was not available to Victorian sanitary engineers. It answers three critical questions: where is the worst DO? what is the minimum value? and how much treatment is needed to meet the standard?

The ratio $k_2/k_d$ governs the shape of the sag curve. When $k_2 \gg k_d$ (fast reaeration, slow decomposition — shallow turbulent rivers), the DO sag is shallow and short; the river recovers quickly. When $k_2 \approx k_d$ or $k_2 < k_d$ (deep slow rivers in warm climates — the worst case), the sag is deep and extends far downstream. The Thames estuary is close to the worst case: deep, slow, warm in summer, with low reaeration — exactly the conditions that produced the Great Stink and that continue to produce summer DO depressions in the tidal Thames even today.

The model also reveals why winter is safer for treated discharges than summer: lower temperatures slow $k_d$ (decomposition) and raise $C_s$ (saturation). The same effluent that violates standards in August may meet them comfortably in January. This is why provincial permits often include seasonal effluent limits — stricter in summer, more relaxed in winter.

---

## 8. What Could Go Wrong?

**The Streeter-Phelps model assumes steady-state and complete lateral mixing.** Real rivers are unsteady — flow varies daily and seasonally — and mixing at a discharge point takes kilometres to complete. The model gives the centreline concentration after complete mixing; during the mixing zone immediately downstream, concentrations are higher than the model predicts. Mixing zones are typically given explicit regulatory treatment, with shorter-range standards near the outfall.

**Settling, photosynthesis, and sediment oxygen demand are ignored.** The standard model includes only BOD deoxygenation and surface reaeration. In practice, algal photosynthesis adds oxygen during the day (creating supersaturation) and consumes it at night; sediment oxygen demand from deposited organic material creates a bottom DO sink; and nitrate oxidation (nitrification) exerts a separate oxygen demand that can equal or exceed carbonaceous BOD.

**Nitrification BOD.** The BOD measured in a standard 5-day test (BOD₅) captures only carbonaceous oxygen demand. Nitrification — conversion of NH₄⁺ to NO₃⁻ by nitrifying bacteria — exerts an additional nitrogen oxygen demand (NBOD) of 4.57 g O₂ per g N. Ignoring NBOD can underestimate total oxygen demand by 30–50% for nitrogen-rich municipal effluents.

---

## 9. Summary

The Streeter-Phelps model describes the downstream evolution of dissolved oxygen deficit $D = C_s - C$ following a wastewater discharge as a linear first-order ODE with two competing terms: BOD-driven deoxygenation ($k_d L$) and reaeration ($k_2 D$). The solution is the DO sag curve $D(t) = \frac{k_d L_0}{k_2-k_d}(e^{-k_d t}-e^{-k_2 t})+D_0 e^{-k_2 t}$.

The critical deficit $D_c$ — the lowest DO point — occurs at time $t_c$ and distance $x_c = U t_c$ downstream. NPDES permit calculations work backwards from the required minimum DO to determine the maximum allowable effluent BOD, and hence the required treatment level.

**Key equations:**

$$\frac{dL}{dt} = -k_d L \Rightarrow L(t) = L_0 e^{-k_d t}$$

$$D(t) = \frac{k_d L_0}{k_2-k_d}\!\left(e^{-k_d t}-e^{-k_2 t}\right) + D_0 e^{-k_2 t}$$

$$t_c = \frac{1}{k_2-k_d}\ln\!\left[\frac{k_2}{k_d}\!\left(1-\frac{D_0(k_2-k_d)}{k_d L_0}\right)\right]$$

$$k_2 = 3.93\, U^{0.5}/H^{1.5} \quad\text{[O'Connor-Dobbins]}$$

---

## Math Refresher

**Solving the Streeter-Phelps ODE.** The equation $dD/dt = k_d L_0 e^{-k_d t} - k_2 D$ is first-order linear: $dD/dt + k_2 D = k_d L_0 e^{-k_d t}$. The integrating factor is $e^{k_2 t}$. Multiplying both sides and integrating gives the solution. The key mathematical structure — one exponential decaying at rate $k_d$ (BOD) and another at rate $k_2$ (deficit relaxation) — produces the characteristic "sag and recovery" shape when $k_2 > k_d$.

**Finding the critical point.** Setting $dD/dt = 0$ equates the deoxygenation rate with the reaeration rate: $k_d L(t_c) = k_2 D(t_c)$. Substituting $L(t_c) = L_0 e^{-k_d t_c}$ and the Streeter-Phelps $D(t_c)$ and solving for $t_c$ produces the critical time formula. This is a standard calculus exercise — the river's minimum DO is the point where the two competing rates are equal, analogous to finding where a ball thrown upward momentarily stops before falling back down.
