---
layout: essay
title: "Longshore Sediment Transport and Coastal Budgets"
subtitle: "The CERC formula, littoral drift, and the arithmetic of beaches gained and lost"
date: 2026-03-05
categories: modeling
series: computational-geography-laboratory
series_order: 77
cluster: "AC — Coastal Processes"
cluster_order: 2
tags: [math, viz, essay]
math: true
viz: true
math_core:
  - power functions
  - flux divergence
  - budget accounting
  - dimensional analysis
spatial_reasoning: alongshore gradients
dynamics: sediment continuity
computation: budget closure
domain: coastal geomorphology
difficulty: 4
barnsley_chapter: 6
prerequisites:
  - AC1
  - AA2
notebook_url: https://github.com/waywardhouse/computational-geography-lab/tree/main/essays/AC2-longshore-transport
excerpt: >
  A beach is not a static feature — it is a temporary residence for sand that is
  perpetually moving alongshore, driven by the oblique approach of breaking waves.
  The CERC formula translates wave energy flux into a volumetric transport rate.
  A coastal sediment budget tracks every source and sink in the system. Together,
  they explain why building a harbour jetty starves the downdrift beach of sand,
  and how much material a nourishment project must place to compensate.
math_prerequisites: >
  Wave energy flux and the shoaling coefficient (Essay AC1). Basic algebra and
  dimensional analysis. The concept of a flux divergence (net gain or loss at a
  point) is introduced from scratch here.
---

In the summer of 1968, the town of Ocean City, Maryland, opened a new inlet to create a safer harbour entrance. Engineers placed two jetties to stabilise the channel. Within a decade, the downdrift beach to the south — Assateague Island — had retreated hundreds of metres. The jetties had interrupted the longshore transport of sand that had historically nourished Assateague, and the beach was consuming itself.

The same story has played out at hundreds of harbour inlets, groyne fields, and breakwaters around the world. The mechanism is always the same: an engineering structure interrupts the longshore conveyor belt of sediment. Updrift sand accumulates. Downdrift sand is starved. The physics is not subtle — it follows directly from a sediment budget in which transport must be continuous unless something intercepts it.

---

## 1. The Question

How much sediment moves along a coastline, and what drives it? What happens to a beach when that transport is intercepted? How do we quantify the volume of sand a beach has gained or lost, and how much nourishment is needed to compensate?

---

## 2. The Conceptual Model

Waves approaching a beach at an angle exert a net force in the alongshore direction — the longshore component of radiation stress. This force drives a current and, more importantly, keeps sediment in motion that the current then transports. The **littoral drift** — the net volumetric sediment flux along the coast — results from this wave-driven mechanism.

We model the coastline as a one-dimensional system: a line of beach with a sediment budget at each point. Transport enters from one side, leaves from the other, and the difference determines whether the beach accretes or erodes. Sources of sediment include river input, cliff erosion, and artificial nourishment. Sinks include offshore loss, aeolian transport inland, and engineering interception.

The budget framework is the coastal equivalent of the mass balance equation we used for soil erosion (Essay AA2) — here applied to a linear control volume along the shore rather than a hillslope area.

---

## 3. Building the Mathematical Model

### 3.1 Longshore Wave Energy Flux

From Essay AC1, the energy flux of breaking waves per unit length of crest is:

$$P = E C_g = \frac{1}{8}\rho_f g H^2 C_g$$

where $H$ is wave height and $C_g$ is group velocity. The **longshore component** of this flux depends on the angle $\alpha_b$ of wave approach at the breaker line:

$$P_\ell = P \sin\alpha_b \cos\alpha_b = \frac{P}{2}\sin(2\alpha_b)$$

where $\alpha_b$ is measured from the shore-normal. The factor $\sin\alpha_b$ extracts the alongshore component; the factor $\cos\alpha_b$ accounts for the fact that a wave approaching at a large angle has a longer crest length per unit shoreline.

The maximum longshore energy flux occurs at $\alpha_b = 45°$; the flux is zero for normal incidence ($\alpha_b = 0°$) and for shore-parallel waves ($\alpha_b = 90°$).

### 3.2 The CERC Formula

The **CERC formula** (Coastal Engineering Research Center, 1984) relates the immersed-weight longshore sediment transport rate $I_\ell$ to the longshore wave energy flux:

$$I_\ell = K P_\ell$$

where $K$ is an empirical coefficient (dimensionless). The value $K = 0.77$ is commonly used for natural beach sand; $K$ varies from about 0.4 for coarse sand to 1.2 for fine sand.

The immersed-weight transport rate $I_\ell$ [N s⁻¹] is related to the volumetric transport rate $Q_\ell$ [m³ s⁻¹] by:

$$Q_\ell = \frac{I_\ell}{(\rho_s - \rho_f)(1 - p)g}$$

where $p \approx 0.4$ is the sediment porosity. Substituting:

$$Q_\ell = \frac{K P_\ell}{(\rho_s - \rho_f)(1-p)g} = \frac{K \cdot \frac{1}{8}\rho_f g H_b^2 C_{gb} \sin(2\alpha_b)}{(\rho_s - \rho_f)(1-p)g}$$

In shallow water at breaking, $C_{gb} \approx C_b = \sqrt{g h_b}$ and $H_b = \gamma h_b$ (with $\gamma = 0.78$), so $h_b = H_b/0.78$ and:

$$C_{gb} = \sqrt{g H_b/0.78} = \sqrt{12.58 \, H_b}$$

A simplified but widely used form of CERC using only $H_b$ and $\alpha_b$:

$$Q_\ell = \frac{K \rho_f g^{3/2}}{16(\rho_s-\rho_f)(1-p)\gamma^{1/2}} H_b^{5/2} \sin(2\alpha_b)$$

For standard values ($K=0.77$, $\rho_f=1025$ kg m⁻³, $\rho_s=2650$ kg m⁻³, $p=0.4$, $\gamma=0.78$):

$$Q_\ell \approx 0.080 \, H_b^{5/2} \sin(2\alpha_b) \quad \text{[m}^3\text{ s}^{-1}\text{]}$$

Note the $H_b^{5/2}$ dependence: doubling wave height increases transport by a factor of $2^{2.5} = 5.66$. Longshore transport is extremely sensitive to wave height — large storms dominate the annual transport budget.

### 3.3 Net and Gross Transport

The CERC formula gives transport in one direction. Over a year, waves come from multiple directions, some driving transport northward (say, $Q^+$), some southward ($Q^-$). The **gross transport** is $Q_g = Q^+ + Q^-$ and the **net transport** is $Q_n = Q^+ - Q^-$. A beach can have large gross transport but small net transport if waves arrive from roughly symmetric directions — the sand moves back and forth but there is no persistent drift direction. The net transport determines whether structures cause asymmetric accretion/erosion.

### 3.4 The Coastal Sediment Budget

The coastal sediment budget applies mass conservation to a shoreline control volume of length $\Delta x$ [m] and active profile depth $D_c$ (the closure depth, below which sediment does not move appreciably, typically 5–15 m):

$$\frac{\partial y}{\partial t} = -\frac{1}{D_c}\frac{\partial Q_\ell}{\partial x} + \frac{q_{\text{source}} - q_{\text{sink}}}{D_c}$$

where $y$ [m] is the shoreline position (positive = seaward), $\partial Q_\ell/\partial x$ [m³ s⁻¹ m⁻¹] is the longshore transport divergence, and $q_{\text{source}}$, $q_{\text{sink}}$ are volumetric rates of sediment addition and removal per unit shoreline length [m³ m⁻¹ s⁻¹].

This is the **one-line model** of shoreline change — one of the most widely used models in coastal engineering. It treats the beach profile shape as fixed (the "one line" is the shoreline), and predicts how the shoreline position changes due to gradients in longshore transport.

**Key insight:** The shoreline only erodes if transport diverges ($\partial Q_\ell / \partial x > 0$) — more sand leaving than arriving. If transport is spatially uniform, no erosion or deposition occurs even if transport rates are very high.

### 3.5 Updrift and Downdrift Effects of Structures

A coastal structure (groyne, jetty, breakwater) that completely blocks longshore transport creates a step-change in $Q_\ell$ at its location. Updrift, transport is intercepted and sand accumulates; downdrift, the transport that would have nourished the beach is absent and the beach erodes.

For a structure that blocks a fraction $f$ of the net longshore transport $Q_n$ [m³ yr⁻¹]:

**Updrift accretion rate** (volume per year per unit shoreline length):

$$\dot{V}_{\text{up}} = f Q_n / D_c \quad \text{[m yr}^{-1}\text{]}$$

**Downdrift erosion rate:**

$$\dot{V}_{\text{down}} = -f Q_n / D_c$$

These rates persist until the updrift fillet reaches the structure tip (bypassing begins) or until the downdrift beach reaches a new equilibrium through offshore supply. The time to reach downdrift equilibrium can be decades to centuries, depending on the magnitude of the deficit and the availability of offshore sediment.

### 3.6 Beach Nourishment Volume

Beach nourishment replaces sediment lost to erosion by placing dredged material on the beach. The required nourishment volume to advance a shoreline by $\Delta y$ [m] over a length $\ell$ [m] of coast, through an active profile of depth $D_c$, is:

$$V = \ell \cdot \Delta y \cdot D_c$$

However, nourishment sand is typically finer or coarser than the native beach sand. If the nourishment grain size $D_n$ differs from the native grain size $D_b$, the **overfill factor** $R_a$ adjusts the required volume:

$$R_a = \frac{\Phi_n}{\Phi_b}$$

where $\Phi_n$ and $\Phi_b$ are the proportions of nourishment and native sand above the threshold diameter. For nourishment sand finer than native: $R_a > 1$ (more must be placed because the excess fine material is quickly lost offshore). For coarser nourishment: $R_a < 1$ (less required, and the beach is more stable).

**Renourishment interval:** Nourishment sand is lost at a rate determined by the coastal sediment budget. If the natural erosion rate is $E_r$ [m yr⁻¹] and the nourishment advances the shoreline by $\Delta y$, the lifespan before renourishment is required is approximately:

$$T = \Delta y / E_r$$

For a beach eroding at 1.5 m yr⁻¹ that is nourished to advance 30 m: $T = 20$ yr. In practice, storm losses reduce this — the median nourishment lifespan for US East Coast projects is 3–6 years.

### 3.7 Erosion Hotspot Identification

A systematic approach to identifying erosion hotspots combines three datasets:

1. **Historic shoreline position change** $\dot{y}$ [m yr⁻¹] — from aerial photograph or satellite analysis
2. **Longshore transport gradients** $\partial Q_\ell / \partial x$ [m³ m⁻¹ yr⁻¹] — from wave hindcasts and CERC
3. **Source/sink terms** — river inputs, structures, offshore losses

An **erosion hotspot index** can be constructed as:

$$\text{EHI} = \dot{y} + \frac{1}{D_c}\frac{\partial Q_\ell}{\partial x} - \frac{q_{\text{source}}}{D_c}$$

Locations where EHI is most negative (most strongly erosional) after accounting for all known source and sink terms are residual hotspots — places where an unidentified sink or an underestimated gradient is driving observed retreat.

---

## 4. Worked Example by Hand

**Setting:** A 12 km stretch of open coastline on the British Columbia coast, facing southwest. We want to estimate annual longshore transport volume, the effect of a proposed harbour breakwater, and the nourishment volume required to compensate downdrift losses.

**Given:**
- Dominant wave climate: $H_b = 1.8$ m, $T = 10$ s, $\alpha_b = 15°$ from shore-normal
- Closure depth $D_c = 8$ m
- Native beach sand $D_{50} = 0.35$ mm (fine–medium sand)
- Current shoreline erosion rate: 0.8 m yr⁻¹ over the southern 4 km

**Step 1: Longshore transport rate (CERC)**

$$Q_\ell = 0.080 \times (1.8)^{5/2} \times \sin(2 \times 15°)$$

$$(1.8)^{5/2} = (1.8)^2 \times (1.8)^{0.5} = 3.24 \times 1.342 = 4.348$$

$$\sin(30°) = 0.500$$

$$Q_\ell = 0.080 \times 4.348 \times 0.500 = 0.1739 \text{ m}^3\text{s}^{-1}$$

Annual transport: $Q_n = 0.1739 \times 3.156 \times 10^7 = 5.49 \times 10^6$ m³ yr⁻¹

This is a very high transport rate — consistent with exposed northwest Pacific coastlines. For context, the entire Pacific Outer Coast of the US has estimated annual net longshore transport of $10^5$–$10^6$ m³ yr⁻¹ per reach.

**Step 2: Existing erosion budget**

Erosion rate = 0.8 m yr⁻¹ over 4 km = 4000 m:

$$\dot{V}_{\text{loss}} = 0.8 \times 4000 \times 8 = 25{,}600 \text{ m}^3\text{yr}^{-1}$$

As a fraction of throughgoing transport: $25{,}600 / 5{,}490{,}000 = 0.47\%$ — the beach is losing a very small fraction of throughgoing transport, likely due to a modest transport gradient (slight increase in $Q_\ell$ with $x$ in the southern reach, perhaps from a change in beach orientation).

**Step 3: Effect of proposed breakwater** blocking 40% of net transport

$$\dot{V}_{\text{up}} = 0.40 \times 5{,}490{,}000 / 8 = 274{,}500 \text{ m}^3\text{yr}^{-1}$$

This is the annual accretion rate at the breakwater updrift face — 274,500 m³ yr⁻¹ accumulating in the fillet.

Downdrift erosion matches this exactly:

$$\dot{V}_{\text{down}} = -274{,}500 \text{ m}^3\text{yr}^{-1}$$

Expressed as a shoreline retreat rate over 4 km:

$$\dot{y}_{\text{down}} = 274{,}500 / (4000 \times 8) = 8.6 \text{ m yr}^{-1}$$

This is an enormous erosion rate — more than 10× the pre-breakwater rate. The breakwater makes an already-eroding coast catastrophically worse.

**Step 4: Nourishment volume to restore downdrift beach**

To return the downdrift beach to its pre-breakwater position (i.e., hold the line against the additional 8.6 m yr⁻¹ retreat) over 4 km per year:

$$V_{\text{annual}} = 8.6 \times 4000 \times 8 = 275{,}200 \text{ m}^3\text{yr}^{-1}$$

At 2026 coastal dredging costs of approximately CAD 15–30 per m³, this represents CAD 4–8 million per year, indefinitely, as long as the breakwater stands. This is the hidden cost of coastal engineering that intercepts longshore transport.

---

## 5. Computational Implementation

```
function cerc_transport(H_b, alpha_b_deg, K=0.77, rho_f=1025, rho_s=2650, p=0.4, gamma=0.78):
    alpha_b = radians(alpha_b_deg)
    Pl = (1/16) * rho_f * g^(3/2) * H_b^(5/2) * sin(2*alpha_b) / gamma^0.5
    Ql = K * Pl / ((rho_s - rho_f) * (1-p) * g)
    return Ql  # m³ s⁻¹

function shoreline_change(Q_ell_array, dx, Dc, sources, sinks):
    dQdx = gradient(Q_ell_array, dx)   # finite differences
    dydt = (-dQdx + sources - sinks) / Dc
    return dydt

function nourishment_volume(delta_y, length, Dc, overfill=1.0):
    return delta_y * length * Dc * overfill
```

```{pyodide}
import numpy as np

g = 9.81

def cerc(H_b, alpha_deg, K=0.77, rho_f=1025, rho_s=2650, p=0.4, gamma=0.78):
    a = np.radians(alpha_deg)
    Pl = (rho_f * g**1.5 * H_b**2.5 * np.sin(2*a)) / (16 * gamma**0.5)
    Ql = K * Pl / ((rho_s - rho_f) * (1-p) * g)
    return Ql  # m³ s⁻¹

Ql = cerc(1.8, 15)
Qn_annual = Ql * 365.25 * 24 * 3600
print(f"Longshore transport: {Ql:.4f} m³/s  =  {Qn_annual/1e6:.2f} × 10⁶ m³/yr")

# Sensitivity to wave height
print("\nTransport sensitivity to H_b (alpha=15°):")
for H in [0.5, 1.0, 1.5, 2.0, 2.5, 3.0]:
    Q = cerc(H, 15) * 3.156e7 / 1e6
    print(f"  H_b = {H:.1f}m  →  Q = {Q:.2f} × 10⁶ m³/yr")

# Downdrift erosion from breakwater blocking 40%
f, Dc, length = 0.40, 8, 4000
V_down = f * Qn_annual
rate = V_down / (length * Dc)
print(f"\nDowndrift erosion rate: {rate:.1f} m/yr")
print(f"Annual nourishment needed: {V_down/1e3:.0f} × 10³ m³/yr")
```

---

## 6. Visualization

<div data-viz="echarts" style="height:420px" data-options='{
  "title": {"text": "CERC Longshore Transport vs Wave Angle and Height", "textStyle": {"fontSize": 14}},
  "tooltip": {"trigger": "axis"},
  "legend": {"data": ["H_b = 1.0m", "H_b = 1.5m", "H_b = 2.0m", "H_b = 2.5m"], "bottom": 0},
  "xAxis": {"name": "Wave Approach Angle α_b (degrees from shore-normal)", "nameLocation": "middle", "nameGap": 35,
    "data": [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60]},
  "yAxis": {"name": "Annual Transport (10³ m³ yr⁻¹)", "nameLocation": "middle", "nameGap": 55},
  "series": [
    {"name": "H_b = 1.0m", "type": "line", "smooth": true,
     "data": [38, 74, 107, 136, 161, 180, 193, 199, 198, 191, 178, 160]},
    {"name": "H_b = 1.5m", "type": "line", "smooth": true,
     "data": [132, 256, 370, 472, 558, 624, 671, 691, 686, 662, 617, 554]},
    {"name": "H_b = 2.0m", "type": "line", "smooth": true,
     "data": [314, 610, 882, 1124, 1328, 1484, 1596, 1643, 1631, 1574, 1469, 1318]},
    {"name": "H_b = 2.5m", "type": "line", "smooth": true,
     "data": [617, 1198, 1732, 2208, 2609, 2916, 3135, 3228, 3204, 3090, 2884, 2589]}
  ]
}'></div>

Transport peaks at 45° approach angle for all wave heights, following the $\sin(2\alpha_b)$ term. The vertical spacing between curves grows nonlinearly — the $H_b^{5/2}$ dependence means doubling wave height increases transport by 5.7×, not 2×. Storm waves dominate the annual transport budget.

---

## 7. Interpretation

The CERC formula and the one-line model together produce a powerful framework for coastal management. Their most important joint implication is the **sediment continuity principle**: sediment that accumulates somewhere must have come from somewhere else. An eroding beach is not simply losing sand to the ocean — it is most often losing sand to a downdrift accumulation zone, an offshore sink, or a structure that has intercepted the flow.

The Ocean City–Assateague example illustrates this perfectly. The jetties did not destroy sand; they redirected it. Assateague's retreat is precisely mirrored by updrift accumulation in the Ocean City Inlet fillet — a closed budget in which one beach's loss is another's gain.

The $H_b^{5/2}$ sensitivity of CERC transport also has a policy implication: annual transport budgets are dominated by a small number of large storm events. A beach that appears stable for most of the year may have its entire annual budget reshuffled in a single week-long storm. Management based on mean wave conditions will systematically underestimate both transport rates and the storm-scale variability that matters most for erosion hotspot identification.

---

## 8. What Could Go Wrong?

**K is highly uncertain.** The CERC coefficient $K$ is fitted to field data with scatter spanning an order of magnitude. Values of $K = 0.4$–$1.2$ are all physically defensible depending on grain size, wave steepness, and measurement method. Transport estimates from CERC should be treated as accurate to a factor of 2–3 at best.

**Obliquity correction at large angles.** The $\sin(2\alpha_b)\cos(\alpha_b)$ derivation assumes small-to-moderate approach angles. At angles above 45°, the formula becomes unreliable — in practice, most longshore transport occurs at angles of 5°–30°, so this is rarely a problem in the field but worth knowing.

**The one-line model ignores cross-shore processes.** Storm waves can push sediment offshore beyond the closure depth, removing it from the longshore system permanently (on engineering timescales). The one-line model treats $D_c$ as fixed and ignores this pathway — it may significantly underestimate erosion during storms.

**Budget closure failures.** Coastal sediment budgets rarely close perfectly because some terms (submarine groundwater discharge transporting fine sediment, wind-blown sand losses to dunes, biological carbonate production on carbonate coasts) are difficult to measure. Residuals in a budget closure should not be attributed to modelling error without first accounting for all measurable terms.

---

## 9. Summary

Longshore sediment transport — the littoral drift — is driven by the longshore component of wave energy flux. The CERC formula $Q_\ell \propto H_b^{5/2}\sin(2\alpha_b)$ translates that flux into a volumetric transport rate. The one-line model applies sediment continuity to the shoreline: erosion requires a divergence of transport (more sand leaving than arriving).

Coastal structures that intercept this transport create paired responses — updrift accretion and downdrift erosion — that can exceed natural erosion rates by an order of magnitude. Beach nourishment can compensate for these deficits but must be repeated on timescales set by the magnitude of the transport deficit and the storm climate.

**Key equations:**

$$Q_\ell = 0.080 \, H_b^{5/2} \sin(2\alpha_b) \quad \text{[m}^3\text{ s}^{-1}\text{, CERC]}$$

$$\frac{\partial y}{\partial t} = -\frac{1}{D_c}\frac{\partial Q_\ell}{\partial x} + \frac{q_{\text{source}} - q_{\text{sink}}}{D_c} \quad \text{[one-line model]}$$

$$V_{\text{nourish}} = \Delta y \cdot \ell \cdot D_c \cdot R_a \quad \text{[nourishment volume]}$$

---

## Math Refresher

**Flux divergence.** The term $\partial Q_\ell / \partial x$ is the spatial gradient (derivative) of the longshore transport rate. If transport increases with $x$ (the downdrift direction), more sand is leaving a given section than arriving — divergence is positive, and the shoreline retreats. If transport decreases with $x$, more is arriving than leaving — divergence is negative, and the shoreline advances. This is the central operation of the one-line model: converting a transport field into a rate-of-change field by taking its spatial derivative.

**The $H^{5/2}$ exponent.** The CERC formula has $H_b^{5/2}$ because it is the product of wave energy density ($\propto H^2$) and group velocity at breaking ($\propto H^{1/2}$ via $C_g = \sqrt{gh_b}$ and $h_b = H/\gamma$). The $\sin(2\alpha_b)$ term is the product of $\sin\alpha_b$ (alongshore component) and $\cos\alpha_b$ (crest-length factor), using the double-angle identity $2\sin\theta\cos\theta = \sin(2\theta)$.

**Annual vs instantaneous transport.** CERC gives transport in m³ s⁻¹. To convert to annual: multiply by the number of seconds in a year ($3.156 \times 10^7$ s yr⁻¹). For a real wave climate, compute $Q_\ell$ for each sea state (defined by $H_s$, $T_p$, $\alpha$, and occurrence frequency) and sum the contributions. The result is the annual net or gross transport depending on whether opposite directions are subtracted or added.
