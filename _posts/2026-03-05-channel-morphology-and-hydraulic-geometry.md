---
layout: essay
title: "Channel Morphology and Hydraulic Geometry"
subtitle: "Power laws, regime theory, and the self-organised geometry of rivers"
date: 2026-03-05
categories: modeling
series: computational-geography-laboratory
series_order: 75
cluster: "AB — Fluvial Geomorphology"
cluster_order: 2
tags: [math, viz, essay]
math: true
viz: true
math_core:
  - power functions
  - logarithmic regression
  - scaling laws
  - dimensional analysis
spatial_reasoning: planform and cross-section
dynamics: equilibrium / regime
computation: log-log regression
domain: fluvial geomorphology
difficulty: 3
barnsley_chapter: 5
prerequisites:
  - A2
  - A3
  - AB1
notebook_url: https://github.com/waywardhouse/computational-geography-lab/tree/main/essays/AB2-hydraulic-geometry
excerpt: >
  Rivers are self-organising systems: given enough time and a steady sediment and
  water supply, a channel will carve its own width, depth, and slope to efficiently
  transport both. Leopold and Maddock showed in 1953 that these dimensions follow
  precise power laws with discharge. This essay derives those relationships, connects
  them to regime theory, and shows how meander wavelength emerges from the same
  hydraulic logic.
math_prerequisites: >
  Power functions and their logarithms (Essay A3). Basic familiarity with linear
  regression is helpful for the rating-curve section but not essential.
---

Stand at the bank of any river and you are looking at a self-portrait. The channel's width, depth, and planform are not accidents of history — they are the outcome of a long conversation between the flow and the boundary it is cutting through. Change the flow and the channel eventually changes its dimensions to match. Change the sediment supply and the channel responds in kind. The river is, in a precise sense, a system in dynamic equilibrium.

This equilibrium has mathematical content. In 1953, Luna Leopold and Thomas Maddock published their landmark study of hydraulic geometry — the empirical finding that channel dimensions scale as power laws with discharge, with exponents that are remarkably consistent across rivers worldwide. Explaining why those exponents take the values they do is one of the more elegant problems in geomorphology.

---

## 1. The Question

How do channel width, depth, velocity, and slope scale with discharge? What do those scaling relationships tell us about how rivers maintain equilibrium? And how does meander wavelength relate to channel geometry?

---

## 2. The Conceptual Model

We consider a channel in **regime** — a state of dynamic equilibrium where the channel dimensions are adjusted so that the sediment supplied from upstream is transported through the reach without net erosion or deposition. The channel is neither degrading nor aggrading; it is transporting a steady sediment load in a stable cross-section.

The channel has three degrees of freedom to adjust: width $W$, depth $d$, and slope $S$ (it can also adjust roughness, but we hold that approximately constant here). These three adjustments must simultaneously satisfy three constraints: discharge continuity, a sediment transport condition, and a bank stability condition. Three equations, three unknowns — a determinate system.

In practice, we access the regime relationships empirically: measure width, depth, velocity, and sediment load across many rivers and discharges, and fit the resulting power laws.

---

## 3. Building the Mathematical Model

### 3.1 At-a-Station Hydraulic Geometry

At a single cross-section, as discharge $Q$ [m³ s⁻¹] increases during a flood, width, mean depth, and mean velocity all increase as power laws. This is the **at-a-station** hydraulic geometry of Leopold and Maddock (1953):

$$W = a Q^b$$
$$d = c Q^f$$
$$\bar{u} = k Q^m$$

where $a, c, k$ are coefficients and $b, f, m$ are exponents. Since $Q = W \cdot d \cdot \bar{u}$, we require:

$$ack = 1 \quad \text{and} \quad b + f + m = 1$$

Typical at-a-station exponents for natural channels: $b \approx 0.26$, $f \approx 0.40$, $m \approx 0.34$.

These values tell us something immediate: depth increases faster than width as discharge rises ($f > b$). The channel fills vertically before it spreads laterally — sensible for confined channels with cohesive banks.

### 3.2 Downstream Hydraulic Geometry

As we move **downstream** from headwaters to lowlands, discharge increases (from tributary inputs) and channel dimensions change in a systematic way. This is **downstream hydraulic geometry** — fitted by measuring many cross-sections along a river system at bankfull discharge $Q_{bf}$:

$$W_{bf} = a_w Q_{bf}^{b_w}$$
$$d_{bf} = a_d Q_{bf}^{f_d}$$
$$\bar{u}_{bf} = a_u Q_{bf}^{m_u}$$

For gravel-bed rivers, typical downstream exponents: $b_w \approx 0.50$, $f_d \approx 0.37$, $m_u \approx 0.13$.

For sand-bed rivers: $b_w \approx 0.53$, $f_d \approx 0.33$, $m_u \approx 0.14$.

The downstream exponents differ from the at-a-station exponents because the two situations involve different physics: at-a-station, bank resistance is fixed and the channel fills; downstream, bank material becomes finer and easier to erode, allowing width to increase more rapidly.

**Coefficient values for gravel-bed rivers** (after Bray, 1982, Alberta rivers):

$$W_{bf} = 3.8 \, Q_{bf}^{0.50}$$
$$d_{bf} = 0.33 \, Q_{bf}^{0.37}$$

So a reach with $Q_{bf} = 100$ m³ s⁻¹ has $W_{bf} = 38$ m and $d_{bf} = 1.52$ m; a reach with $Q_{bf} = 1000$ m³ s⁻¹ has $W_{bf} = 120$ m and $d_{bf} = 3.61$ m.

### 3.3 Why Power Laws? A Partial Derivation

Can we derive the exponents rather than just observe them? A simplified argument proceeds as follows.

**Width:** Bank erosion and deposition are controlled by the bankfull shear stress relative to a threshold. If we require bankfull shear stress $\tau_{bf}$ to equal the bank critical shear stress $\tau_c$ (a regime condition), and if $\tau_{bf} = \rho_f g d S$ while slope $S$ decreases downstream as $S \propto Q^{-\alpha}$ for some $\alpha$, then we can derive width scaling from the combination of mass conservation and the shear-stress threshold.

For the simpler case of constant slope and constant roughness, mass conservation alone gives:

$$Q = W d \bar{u} = W d \frac{1}{n} d^{2/3} S^{1/2}$$

Setting $d = W/\text{aspect ratio}$ (fixed width-to-depth ratio) and solving for $W$ in terms of $Q$:

$$W \propto Q^{3/5} = Q^{0.6}$$

The observed exponent $b_w \approx 0.50$ is slightly below this, reflecting the fact that depth increases faster than width in real channels (their aspect ratio is not fixed).

### 3.4 Regime Theory and Channel Equilibrium

Regime theory, developed by British irrigation engineers in India (Kennedy, 1895; Lacey, 1930), asks: for a channel carrying a given discharge and sediment load in a given material, what width, depth, and slope are stable?

The Lacey regime equations for sand-bed channels:

$$P = 4.75 \sqrt{Q} \quad \text{(wetted perimeter, m; Q in m³ s⁻¹)}$$

$$R_h = 0.47 (Q/f_L)^{1/3} \quad \text{(hydraulic radius, m)}$$

$$S = \frac{0.0003 f_L^{5/3}}{Q^{1/6}} \quad \text{(channel slope)}$$

where $f_L$ is Lacey's silt factor: $f_L = 1.76 \sqrt{D_{50}}$ (D in mm).

For a sand channel with $Q = 50$ m³ s⁻¹ and $D_{50} = 0.3$ mm:

$$f_L = 1.76\sqrt{0.3} = 0.964$$

$$P = 4.75\sqrt{50} = 33.6 \text{ m}$$

$$S = \frac{0.0003 \times (0.964)^{5/3}}{50^{1/6}} = \frac{0.000286}{1.884} = 1.52 \times 10^{-4}$$

The Lacey equations are purely empirical but encode something real: channels in cohesionless material organise their geometry to a consistent relationship between width, depth, slope, and grain size.

### 3.5 Meander Wavelength and Curvature

One of the most striking regularities in fluvial geomorphology is that **meander wavelength scales linearly with channel width**:

$$\lambda = 10 W \quad \text{to} \quad 14 W$$

This relationship holds across rivers spanning six orders of magnitude in discharge — from glacial meltwater streams to the Amazon. The near-constant ratio suggests that meander geometry is set by a process intrinsic to the flow rather than by external factors.

The physical argument: a meandering river can be modelled as a series of alternating bends. The radius of curvature $r_c$ of a bend tends to be 2–3 times the channel width:

$$r_c \approx 2.3 W$$

The meander wavelength is related to radius of curvature by geometry. For a sine-generated curve (Langbein and Leopold's model), the wavelength is:

$$\lambda = 2\pi r_c \sin(\theta_0)$$

where $\theta_0$ is the maximum deflection angle (typically 70°–110° for active meandering). With $r_c = 2.3W$ and $\theta_0 = 90°$:

$$\lambda = 2\pi \times 2.3 W \times \sin(90°) = 14.4 W$$

This matches the empirical upper bound. The sinuosity $P$ (ratio of channel length to valley length) and the wavelength together determine the channel pattern.

**Meander wavelength from discharge:** Since $W \propto Q^{0.5}$:

$$\lambda \propto Q^{0.5}$$

Leopold and Wolman (1960) give $\lambda = 6.1 Q^{0.5}$ [m] for $Q$ in m³ s⁻¹ at bankfull. A stream with $Q_{bf} = 100$ m³ s⁻¹ has $\lambda \approx 61$ m; one with $Q_{bf} = 10{,}000$ m³ s⁻¹ has $\lambda \approx 610$ m.

### 3.6 Channel Classification: Discriminant Functions

Leopold and Wolman (1957) showed that the transition between straight, meandering, and braided channels can be predicted from a slope–discharge discriminant:

$$S_{\text{transition}} = 0.0125 Q^{-0.44}$$

Channels plotting above this line in slope-discharge space tend to be braided; those below it tend to meander. The physical interpretation: at high slopes and discharges, the stream power exceeds what a single-thread channel can convey, and the channel responds by developing multiple threads (braiding).

---

## 4. Worked Example by Hand

**Setting:** Two reaches of the Red Deer River, Alberta — an upstream mountain reach and a downstream plains reach. We want to predict channel dimensions and meander wavelength at each.

**Given:**
- Upstream: $Q_{bf} = 80$ m³ s⁻¹, $D_{50} = 45$ mm (gravel)
- Downstream: $Q_{bf} = 350$ m³ s⁻¹, $D_{50} = 0.35$ mm (sand)

**Using Bray (1982) gravel relations for upstream:**

$$W_{bf} = 3.8 \times 80^{0.50} = 3.8 \times 8.944 = 34.0 \text{ m}$$

$$d_{bf} = 0.33 \times 80^{0.37} = 0.33 \times 5.762 = 1.90 \text{ m}$$

$$\lambda = 10 W = 340 \text{ m}$$

**Check slope for braiding:**

$$S_{\text{transition}} = 0.0125 \times 80^{-0.44} = 0.0125 \times 0.159 = 0.00199$$

If the actual slope is above 0.002, this reach may be braided; if below, meandering. A mountain gravel reach at 0.003 slope would plot above the line — expect braiding or wandering.

**Using Lacey regime equations for downstream (sand):**

$$f_L = 1.76\sqrt{0.35} = 1.042$$

$$P = 4.75\sqrt{350} = 88.9 \text{ m} \approx W_{bf}$$

$$R_h = 0.47 \times (350/1.042)^{1/3} = 0.47 \times (336)^{1/3} = 0.47 \times 6.957 = 3.27 \text{ m}$$

$$S = \frac{0.0003 \times (1.042)^{5/3}}{350^{1/6}} = \frac{0.000316}{2.638} = 1.20 \times 10^{-4}$$

$$\lambda = 6.1 \times 350^{0.5} = 6.1 \times 18.71 = 114 \text{ m}$$

The downstream sand-bed reach is wider (89 m vs 34 m), deeper (3.27 m vs 1.90 m), and on a much lower slope (0.00012 vs ~0.003). The meander wavelength is shorter than the upstream reach — a consequence of the sand channel being narrower relative to its discharge than the gravel channel.

---

## 5. Computational Implementation

```
function bankfull_geometry(Q, substrate="gravel"):
    if substrate == "gravel":
        W = 3.8 * Q^0.50
        d = 0.33 * Q^0.37
    elif substrate == "sand":
        W = 4.75 * sqrt(Q)    # Lacey
        d = 0.47 * (Q/f_L)^(1/3)
    lambda = 10 * W
    return W, d, lambda

function braiding_threshold(Q):
    return 0.0125 * Q^(-0.44)
```

```{pyodide}
import numpy as np

def gravel_geometry(Q):
    W = 3.8 * Q**0.50
    d = 0.33 * Q**0.37
    lam = 10 * W
    return W, d, lam

def braiding_threshold(Q):
    return 0.0125 * Q**(-0.44)

def lacey_geometry(Q, D50_mm):
    fL = 1.76 * D50_mm**0.5
    W = 4.75 * Q**0.5
    Rh = 0.47 * (Q/fL)**(1/3)
    S = 0.0003 * fL**(5/3) / Q**(1/6)
    lam = 6.1 * Q**0.5
    return W, Rh, S, lam

W_up, d_up, lam_up = gravel_geometry(80)
print(f"Upstream (gravel, Q=80):  W={W_up:.1f}m  d={d_up:.2f}m  λ={lam_up:.0f}m")
print(f"  Braiding threshold S = {braiding_threshold(80):.4f}")

W_dn, Rh_dn, S_dn, lam_dn = lacey_geometry(350, 0.35)
print(f"Downstream (sand, Q=350): W={W_dn:.1f}m  Rh={Rh_dn:.2f}m  S={S_dn:.2e}  λ={lam_dn:.0f}m")
```

---

## 6. Visualization

<div data-viz="echarts" style="height:420px" data-options='{
  "title": {"text": "Bankfull Width vs Discharge — Downstream Hydraulic Geometry", "textStyle": {"fontSize": 14}},
  "tooltip": {"trigger": "axis"},
  "legend": {"data": ["Gravel-bed (Bray 1982)", "Sand-bed (Lacey)", "Braiding threshold width"], "bottom": 0},
  "xAxis": {"type": "log", "name": "Bankfull Discharge Q (m³ s⁻¹)", "nameLocation": "middle", "nameGap": 35,
    "data": [1, 5, 10, 50, 100, 500, 1000, 5000, 10000]},
  "yAxis": {"type": "log", "name": "Width W (m)", "nameLocation": "middle", "nameGap": 45},
  "series": [
    {"name": "Gravel-bed (Bray 1982)", "type": "line", "smooth": false,
     "data": [3.8, 8.5, 12.0, 26.9, 38.0, 85.0, 120.2, 268.7, 380.0]},
    {"name": "Sand-bed (Lacey)", "type": "line", "smooth": false,
     "data": [4.75, 10.6, 15.0, 33.6, 47.5, 106.2, 150.2, 335.7, 475.0]},
    {"name": "Braiding threshold width", "type": "line", "smooth": false, "lineStyle": {"type": "dashed"},
     "data": [null, null, null, null, null, null, null, null, null]}
  ]
}'></div>

On a log-log plot, both power laws plot as straight lines — the signature of a power-law relationship. The sand-bed curve plots above the gravel-bed curve at every discharge, reflecting the fact that cohesionless sand banks erode more easily and produce wider, shallower channels than gravel banks.

---

## 7. Interpretation

The downstream exponents encode the physics of how rivers transport sediment more efficiently as they grow. The width exponent near 0.5 means that doubling discharge increases width by about 41% — width grows, but not as fast as discharge. The depth exponent near 0.37 means depth grows more slowly still. The velocity exponent (about 0.13) is the smallest: downstream, velocity barely changes between headwater streams and lowland rivers. What changes dramatically is channel size.

This near-constant velocity result surprises many people — surely great lowland rivers are faster than mountain streams? In fact, mean velocity changes less than an order of magnitude across rivers that vary in discharge by five orders of magnitude. The primary adjustment to increased discharge is cross-sectional area, not velocity.

The meander wavelength scaling $\lambda \propto Q^{0.5}$ is particularly elegant: it follows directly from the hydraulic geometry width relationship $W \propto Q^{0.5}$ and the empirical proportionality $\lambda \approx 11W$. The meander geometry is a downstream shadow of the width geometry.

---

## 8. What Could Go Wrong?

**Transient adjustment.** The hydraulic geometry relations describe equilibrium channels. A river recently perturbed by a dam, a land use change, or a major flood may be far from equilibrium. Applying regime equations to a degrading or aggrading channel will predict incorrect dimensions.

**Scatter in the power laws.** The $R^2$ values for hydraulic geometry regressions are typically 0.85–0.95 in log-log space, which sounds impressive but translates to a factor of 2–3 uncertainty in width or depth at any given discharge. These are statistical relationships, not physical laws.

**Bankfull discharge identification.** The hydraulic geometry exponents depend critically on which discharge is used as the independent variable. Bankfull discharge is conceptually the "channel-forming" flow, but it is difficult to identify objectively in gauging data. Different criteria (1.5-year return period, breakpoint in the rating curve, floodplain inundation elevation) give different results.

**Single-thread assumption.** The relations are calibrated on single-thread channels. Braided reaches — which violate the single-thread assumption — produce different scaling, and applying these equations to braided systems significantly underestimates channel width and overestimates depth.

---

## 9. Summary

Channel dimensions are not random: they are the equilibrium response of a self-organising system to its discharge and sediment supply. The Leopold-Maddock hydraulic geometry power laws — $W \propto Q^{0.5}$, $d \propto Q^{0.37}$ — capture this equilibrium across rivers worldwide. Meander wavelength follows from the same logic, scaling as $\lambda \approx 11W \propto Q^{0.5}$. The transition between meandering and braiding is predictable from a slope-discharge discriminant.

The deepest result is not any single equation but the concept they express: rivers are dynamically optimised systems that adjust their geometry to transport their imposed loads. Change the inputs — discharge, sediment supply, base level — and the channel will reorganise, over timescales of years to centuries, until a new equilibrium is reached.

**Key equations:**

$$W_{bf} = a_w Q_{bf}^{0.50}, \quad d_{bf} = a_d Q_{bf}^{0.37} \quad \text{[downstream hydraulic geometry]}$$

$$\lambda \approx 11 W_{bf} \approx 6.1 Q_{bf}^{0.5} \quad \text{[meander wavelength]}$$

$$S_{\text{transition}} = 0.0125 Q^{-0.44} \quad \text{[braiding threshold]}$$

---

## Math Refresher

**Power laws and log-log plots.** If $W = a Q^b$, then $\log W = \log a + b \log Q$. This is linear in log-log space: a straight line with slope $b$ (the exponent) and intercept $\log a$ (the coefficient). Fitting a power law to data is equivalent to fitting a straight line to the log-transformed data — this is why log-log plots are so useful for identifying power-law scaling.

**The exponents sum to one.** At-a-station exponents $b + f + m = 1$ is a mathematical constraint from continuity: $Q = W d \bar{u}$. If $W = aQ^b$, $d = cQ^f$, $\bar{u} = kQ^m$, then $Q = ackQ^{b+f+m}$, so $ack = 1$ and $b+f+m = 1$. This is a useful check when fitting hydraulic geometry data: if your fitted exponents do not sum to 1, there is an error in the fitting procedure.

**Regime theory as a system of equations.** Regime theory solves for three unknowns ($W$, $d$, $S$) from three constraints (continuity, sediment transport threshold, bank stability). Counting equations and unknowns is the first step in any regime problem: if you have more unknowns than equations, the system is underdetermined and additional assumptions are needed.
