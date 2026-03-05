---
layout: essay
title: "Sediment Transport in Rivers"
subtitle: "Shields, Meyer-Peter, and the hydraulic threshold between a sleeping and a moving riverbed"
date: 2026-03-05
categories: modeling
series: computational-geography-laboratory
series_order: 74
cluster: "AB — Fluvial Geomorphology"
cluster_order: 1
tags: [math, viz, essay]
math: true
viz: true
math_core:
  - dimensional analysis
  - power functions
  - logarithmic profiles
  - threshold mechanics
spatial_reasoning: vertical and longitudinal gradients
dynamics: threshold / transport-limited
computation: rating curve regression
domain: fluvial geomorphology
difficulty: 4
barnsley_chapter: 5
prerequisites:
  - A1
  - C8
  - AA2
notebook_url: https://github.com/waywardhouse/computational-geography-lab/tree/main/essays/AB1-sediment-transport
excerpt: >
  A riverbed is not passive — it is a dynamic surface hovering near a mechanical
  threshold. When the hydraulic force the flow exerts on a grain exceeds the
  gravitational and frictional force holding it in place, the grain moves. This essay
  derives the Shields parameter from dimensional analysis, applies the Meyer-Peter
  and Müller bedload formula, builds the Rouse suspended sediment profile, and
  constructs the empirical rating curve that connects water discharge to sediment flux.
math_prerequisites: >
  Basic algebra. Familiarity with slope (Essay C8) and the RUSLE erosion concept
  (Essay AA2) is helpful context. Logarithms are used in the suspended sediment
  profile — the Math Refresher covers what is needed.
---

The Fraser River carries roughly 17 million tonnes of sediment to the Pacific Ocean every year. The Bow River, more modestly, transports several hundred thousand tonnes past Calgary annually — gravel and sand moved grain by grain along the riverbed, or suspended in the water column like dust in air. Every one of those grains was entrained, transported, and eventually deposited according to a balance of forces that we can write down precisely.

Sediment transport is where geomorphology becomes most explicitly mechanical. The river does not care about land use or political boundaries — it responds to the balance of fluid drag, grain weight, and bed friction. Understanding that balance gives us the tools to predict channel behaviour, design stable channels, estimate reservoir sedimentation rates, and understand what happens to river systems when we change their hydrology.

---

## 1. The Question

What determines whether a grain on a riverbed moves? How do we calculate the rate of sediment transport once motion begins? And how do we build a practical tool for estimating sediment flux from streamflow measurements?

---

## 2. The Conceptual Model

We consider a single grain of diameter $D$ [m] resting on a flat riverbed. The flow exerts a drag force on the grain's upstream face and a lift force on its upper surface. Gravity and the interlocking friction of neighbouring grains resist motion. Motion begins when the hydraulic forces exceed the resistive forces — the threshold condition.

Above the threshold, sediment moves in two modes:

**Bedload:** grains roll, slide, and saltate (bounce) along the bed, remaining in contact with or close to it. Bedload transport rate depends strongly on how far the flow exceeds the threshold.

**Suspended load:** fine grains are entrained into the water column and carried in suspension. Their vertical distribution is set by the balance between turbulent diffusion (mixing grains upward) and settling (pulling them down). The resulting concentration profile is a function of grain size, flow velocity, and depth.

---

## 3. Building the Mathematical Model

### 3.1 Dimensional Analysis and the Shields Parameter

The drag force per unit area exerted by a fluid flow on a bed grain scales as $\rho_f u_*^2$, where $\rho_f$ [kg m⁻³] is the fluid density and $u_*$ [m s⁻¹] is the **shear velocity** — the square root of bed shear stress divided by fluid density:

$$u_* = \sqrt{\frac{\tau_b}{\rho_f}}$$

The bed shear stress $\tau_b$ [Pa] for a uniform open channel flow is:

$$\tau_b = \rho_f g R_h S$$

where $R_h$ [m] is the hydraulic radius (approximately equal to mean depth $h$ for wide channels) and $S$ is the channel slope [m m⁻¹].

The submerged weight of a grain scales as $(\rho_s - \rho_f) g D$, where $\rho_s$ [kg m⁻³] is sediment density. The ratio of driving (fluid) force to resisting (gravitational) force is the **Shields parameter**:

$$\tau^* = \frac{\tau_b}{(\rho_s - \rho_f) g D} = \frac{\rho_f g R_h S}{(\rho_s - \rho_f) g D}$$

The Shields parameter is dimensionless — it is the fundamental similarity parameter for sediment entrainment. Empirical measurements show that sediment motion begins at a critical value $\tau^*_c$ that depends weakly on the grain Reynolds number $Re_* = u_* D / \nu$ (where $\nu$ is kinematic viscosity):

For coarse sand and gravel in turbulent flow (the usual river condition):

$$\tau^*_c \approx 0.045 \text{ to } 0.06$$

We use $\tau^*_c = 0.047$ as a representative value (the Shields threshold). Motion begins when $\tau^* > \tau^*_c$.

### 3.2 Critical Shear Stress and Grain Size

The critical bed shear stress for entrainment of a grain of diameter $D$ is:

$$\tau_c = \tau^*_c (\rho_s - \rho_f) g D$$

For quartz grains in water ($\rho_s = 2650$ kg m⁻³, $\rho_f = 1000$ kg m⁻³, $\tau^*_c = 0.047$):

$$\tau_c = 0.047 \times (2650 - 1000) \times 9.81 \times D = 0.047 \times 16189 \times D = 761 D \text{ [Pa]}$$

where $D$ is in metres. A 10 mm pebble has $\tau_c = 7.61$ Pa; a 1 mm sand grain has $\tau_c = 0.761$ Pa; a 0.1 mm fine sand grain has $\tau_c = 0.076$ Pa.

The flow depth required to entrain a grain of size $D$ on a slope $S$:

$$h_c = \frac{\tau_c}{\rho_f g S} = \frac{761 D}{\rho_f g S} = \frac{761 D}{1000 \times 9.81 \times S} = \frac{0.0776 D}{S}$$

On a steep mountain stream ($S = 0.01$), the critical depth for a 50 mm cobble is $h_c = 0.0776 \times 0.05 / 0.01 = 0.388$ m — a moderate flood depth. On a gentle alluvial plain ($S = 0.0002$), the same cobble requires $h_c = 19.4$ m — effectively immovable, which is why cobbles deposited by glacial floods persist on valley floors long after the rivers have shrunk to their current sizes.

### 3.3 Bedload Transport: Meyer-Peter and Müller

The **Meyer-Peter and Müller** (MPM) formula (1948) relates bedload transport rate to excess shear stress — how far the flow is above the critical threshold:

$$q_b^* = 8 (\tau^* - \tau^*_c)^{3/2}$$

where $q_b^*$ is the dimensionless bedload transport rate (Einstein number):

$$q_b^* = \frac{q_b}{\sqrt{(s-1)g D^3}}$$

and $q_b$ [m² s⁻¹] is bedload transport per unit channel width, $s = \rho_s/\rho_f = 2.65$ is the relative density of sediment. Rearranging to get dimensional bedload flux:

$$q_b = 8 (\tau^* - \tau^*_c)^{3/2} \sqrt{(s-1)g D^3}$$

The $(3/2)$ exponent in the MPM formula arises from the physics: transport rate scales with both the number of grains in motion (proportional to $\tau^* - \tau^*_c$) and the velocity of those grains (also proportional to $\tau^* - \tau^*_c$, raised to the $1/2$). Their product gives the $3/2$ power.

Total bedload discharge [m³ s⁻¹] for a channel of width $W$ is $Q_b = q_b \times W$, or in mass units [kg s⁻¹]: $\dot{M}_b = \rho_s q_b W$.

### 3.4 Suspended Sediment: The Rouse Profile

Fine sediment carried in suspension is distributed vertically according to the **Rouse profile**, derived from the balance between upward turbulent diffusion and downward gravitational settling.

The turbulent diffusion coefficient at height $z$ above the bed in a logarithmic boundary layer is:

$$\varepsilon_s = \kappa u_* z \left(1 - \frac{z}{h}\right)$$

where $\kappa = 0.41$ is the von Kármán constant. The steady-state balance between diffusion and settling gives:

$$\frac{dC}{dz} = -\frac{w_s}{\varepsilon_s} C$$

where $w_s$ [m s⁻¹] is the grain settling velocity and $C$ [kg m⁻³] is sediment concentration. This first-order ODE has the solution:

$$\frac{C(z)}{C_a} = \left(\frac{a(h-z)}{z(h-a)}\right)^Z$$

where:
- $C_a$ is the reference concentration at reference height $a$ above the bed (typically $a = 0.05h$)
- $Z = w_s / (\kappa u_*)$ is the **Rouse number** (dimensionless)
- $h$ is flow depth

The Rouse number controls the shape of the profile:
- $Z > 2.5$: sediment essentially all in bedload, negligible suspension
- $1.2 < Z < 2.5$: mixed transport, grains near bed
- $0.8 < Z < 1.2$: graded suspension, concentration decreases upward
- $Z < 0.2$: near-uniform distribution, fine washload

### 3.5 Settling Velocity

The settling velocity of a grain in quiescent water is needed for the Rouse number. For a sphere, it is found from the balance of drag and submerged weight. A convenient approximation (valid for 0.1 mm < D < 2 mm) is:

$$w_s = \frac{(s-1)g D^2}{18\nu} \quad \text{(Stokes, valid for } Re_p < 1 \text{)}$$

$$w_s = \sqrt{\frac{4(s-1)gD}{3 C_D}} \quad \text{(turbulent, valid for larger grains)}$$

A practical unified formula (Dietrich, 1982) spans the full range, but for our purposes the Stokes formula works for fine sand ($D < 0.2$ mm) and the turbulent formula for gravel ($D > 2$ mm).

### 3.6 Sediment Rating Curves

Continuous measurement of suspended sediment concentration is expensive. The standard approach is to measure sediment concentration at a range of discharge levels and fit a power-law **rating curve**:

$$Q_s = a Q^b$$

where $Q_s$ [kg s⁻¹] is the suspended sediment discharge, $Q$ [m³ s⁻¹] is water discharge, and $a$, $b$ are empirically fitted constants. Typical values: $b \approx 1.5$–$2.5$.

In log-log space, the rating curve is linear:

$$\log Q_s = \log a + b \log Q$$

This is fitted by ordinary least squares on log-transformed data. A key caution: rating curves have large scatter and can underestimate total sediment flux if high-flow events are under-sampled.

### 3.7 Channel Capacity and Competence

**Channel capacity** is the maximum discharge the channel can convey without overtopping — a function of channel geometry and roughness, described by the Manning equation:

$$Q = \frac{1}{n} A R_h^{2/3} S^{1/2}$$

where $A$ [m²] is cross-sectional area, $n$ is Manning's roughness coefficient, $R_h$ is hydraulic radius, and $S$ is slope.

**Channel competence** is the maximum grain size the flow can transport at a given discharge — found by solving $\tau^* = \tau^*_c$ for $D$:

$$D_{\max} = \frac{\tau_b}{\tau^*_c (\rho_s - \rho_f) g} = \frac{\rho_f g R_h S}{\tau^*_c (\rho_s - \rho_f) g}$$

For quartz grains: $D_{\max} = R_h S / (\tau^*_c \times 1.65) = R_h S / 0.0775$.

A river with $R_h = 1.5$ m and $S = 0.001$ has competence $D_{\max} = 0.0194$ m = 19 mm — capable of moving small gravel but not cobbles. This is the basis for reading ancient flood magnitudes from the maximum grain size in a gravel deposit.

---

## 4. Worked Example by Hand

**Setting:** A gravel-bed reach of the Oldman River, Alberta, during a moderate flood event.

**Given:**
- Mean depth $h = 1.8$ m, width $W = 45$ m
- Channel slope $S = 0.0018$
- Median bed grain size $D_{50} = 32$ mm (0.032 m), $D_{90} = 65$ mm
- $\rho_s = 2650$ kg m⁻³, $\rho_f = 1000$ kg m⁻³, $\nu = 1.0 \times 10^{-6}$ m² s⁻¹

**Step 1: Bed shear stress**

$$\tau_b = \rho_f g h S = 1000 \times 9.81 \times 1.8 \times 0.0018 = 31.77 \text{ Pa}$$

**Step 2: Shields parameter**

$$\tau^* = \frac{\tau_b}{(\rho_s - \rho_f)g D_{50}} = \frac{31.77}{1650 \times 9.81 \times 0.032} = \frac{31.77}{517.9} = 0.0613$$

Since $\tau^* = 0.0613 > \tau^*_c = 0.047$: **bedload transport is occurring**.

**Step 3: Excess Shields parameter**

$$\tau^* - \tau^*_c = 0.0613 - 0.0470 = 0.0143$$

**Step 4: Dimensionless bedload transport**

$$q_b^* = 8 \times (0.0143)^{3/2} = 8 \times 0.001709 = 0.01367$$

**Step 5: Dimensional bedload transport rate**

$$s - 1 = 1.65, \quad D^3 = (0.032)^3 = 3.277 \times 10^{-5} \text{ m}^3$$

$$\sqrt{(s-1)g D^3} = \sqrt{1.65 \times 9.81 \times 3.277 \times 10^{-5}} = \sqrt{5.302 \times 10^{-4}} = 0.02303 \text{ m}^2\text{s}^{-1}$$

Wait — this has units m² s⁻¹ only if we treat $D^3$ carefully. Let's restate:

$$\sqrt{(s-1)gD^3} = \sqrt{1.65 \times 9.81 \times (0.032)^3} = \sqrt{1.6537 \times 10^{-4}} = 0.01286 \text{ m}^{1.5}\text{s}^{-1}$$

Actually the correct units check: $(s-1)g$ has units m s⁻², $D^3$ has units m³, so the product has units m⁴ s⁻². The square root has units m² s⁻¹, which is $q_b$ [m² s⁻¹] — correct.

$$\sqrt{1.65 \times 9.81 \times (0.032)^3} = \sqrt{1.65 \times 9.81 \times 3.277 \times 10^{-5}}$$

$$= \sqrt{5.302 \times 10^{-4}} = 0.02303 \text{ m}^2\text{s}^{-1}$$

$$q_b = 0.01367 \times 0.02303 = 3.148 \times 10^{-4} \text{ m}^2\text{s}^{-1}$$

**Step 6: Total bedload discharge**

$$Q_b = q_b \times W = 3.148 \times 10^{-4} \times 45 = 0.01417 \text{ m}^3\text{s}^{-1}$$

$$\dot{M}_b = \rho_s Q_b = 2650 \times 0.01417 = 37.5 \text{ kg s}^{-1} = 135 \text{ t hr}^{-1}$$

**Step 7: Channel competence**

$$D_{\max} = \frac{\tau_b}{\tau^*_c (\rho_s - \rho_f)g} = \frac{31.77}{0.047 \times 1650 \times 9.81} = \frac{31.77}{760.6} = 0.0418 \text{ m} = 42 \text{ mm}$$

The flow is competent to move grains up to 42 mm — it is transporting most of the $D_{50}$ (32 mm) but not the $D_{90}$ (65 mm). This is a partial mobility regime, typical of natural gravel-bed rivers at moderate flood stages.

---

## 5. Computational Implementation

```
function shields_parameter(tau_b, rho_s, rho_f, D):
    return tau_b / ((rho_s - rho_f) * g * D)

function mpm_bedload(tau_star, tau_star_c, rho_s, rho_f, D):
    if tau_star <= tau_star_c: return 0
    s = rho_s / rho_f
    q_b_star = 8 * (tau_star - tau_star_c)^1.5
    return q_b_star * sqrt((s-1) * g * D^3)

function rouse_profile(z_values, C_a, a, h, w_s, u_star):
    kappa = 0.41
    Z = w_s / (kappa * u_star)
    return C_a * ((a*(h - z_values)) / (z_values * (h-a)))^Z
```

```{pyodide}
import numpy as np

g = 9.81

def shields(h, S, D, rho_s=2650, rho_f=1000):
    tau_b = rho_f * g * h * S
    return tau_b / ((rho_s - rho_f) * g * D), tau_b

def mpm(tau_star, tau_star_c=0.047, rho_s=2650, rho_f=1000, D=0.032):
    if tau_star <= tau_star_c:
        return 0.0
    s = rho_s / rho_f
    qb_star = 8 * (tau_star - tau_star_c) ** 1.5
    return qb_star * np.sqrt((s-1) * g * D**3)

tau_s, tau_b = shields(h=1.8, S=0.0018, D=0.032)
qb = mpm(tau_s)
print(f"Shields τ*  = {tau_s:.4f}  (threshold = 0.047)")
print(f"Bedload q_b = {qb:.4e} m² s⁻¹")
print(f"Total Qb    = {qb*45:.4f} m³ s⁻¹  ({qb*45*2650:.1f} kg s⁻¹)")

D_max = tau_b / (0.047 * (2650-1000) * g)
print(f"Competence D_max = {D_max*1000:.1f} mm")
```

---

## 6. Visualization

<div data-viz="echarts" style="height:420px" data-options='{
  "title": {"text": "Dimensionless Bedload Transport Rate (MPM) vs Shields Parameter", "textStyle": {"fontSize": 14}},
  "tooltip": {"trigger": "axis"},
  "xAxis": {"name": "Shields parameter τ*", "nameLocation": "middle", "nameGap": 30,
    "data": ["0.047","0.06","0.07","0.08","0.10","0.12","0.15","0.20","0.25","0.30"]},
  "yAxis": {"name": "q* (dimensionless bedload rate)", "nameLocation": "middle", "nameGap": 50},
  "series": [{
    "name": "MPM formula",
    "type": "line",
    "smooth": false,
    "markLine": {"data": [{"xAxis": "0.047", "label": {"formatter": "threshold τ*c"}}]},
    "data": [0, 0.0137, 0.0400, 0.0726, 0.1697, 0.3082, 0.5657, 1.219, 2.057, 3.079]
  }]
}'></div>

The rapid rise above the threshold reflects the $(3/2)$ power: transport is near-zero just below the threshold and escalates steeply above it. This nonlinearity means that the small fraction of high-discharge events in a river's flow regime carries a disproportionate share of the annual sediment load.

---

## 7. Interpretation

The Shields parameter framework reveals an important asymmetry in river systems: **competence increases faster than discharge**. When discharge doubles (raising both $h$ and $u_*$), bed shear stress roughly doubles, but sediment transport rate — proportional to $(\tau^* - \tau^*_c)^{3/2}$ — more than doubles. The few highest flows of the year typically transport more sediment than all the moderate flows combined.

This has a direct implication for dam operation and flow regulation. A dam that eliminates the annual flood but passes the base flow may reduce peak discharge by 50% but reduce annual sediment transport by 80–90%. The river downstream is starved of sediment; it responds by incising its bed (degradation) in search of equilibrium. This is why gravel-bed rivers below large dams typically deepen and coarsen over decades — the system is adjusting its geometry to restore the competence–supply balance.

The partial mobility condition we found in the worked example — $D_{50}$ moving but $D_{90}$ stationary — is the normal state of gravel-bed rivers. It creates an armour layer: the static coarse fraction protects the finer sediment underneath, and erosion only penetrates when flows are extreme enough to move the armour.

---

## 8. What Could Go Wrong?

**The MPM formula was calibrated on laboratory flumes.** The original MPM dataset used uniform, rounded, well-sorted gravel in straight flumes. Natural rivers have size-selective transport, irregular bed forms, bank effects, and variable width — all of which reduce measured transport below MPM predictions by a factor of 2–10. Field applications of MPM should be treated as order-of-magnitude estimates.

**Rating curve hysteresis.** Suspended sediment concentration at a given discharge is often higher on the rising limb of a flood hydrograph than the falling limb — a phenomenon called hysteresis. During the rising limb, fresh sediment is available from hillslopes and banks; by the falling limb, the supply is depleted. A single rating curve fitted to mixed rising and falling limb data will underestimate peak flux.

**The wide-channel approximation.** We used $R_h \approx h$. For channels with width-to-depth ratios below about 10, this introduces non-trivial error — the boundary shear is shared with the banks, and the bed shear stress is lower than $\rho_f g h S$ would predict.

**Bedform roughness.** At high transport stages, sand-bed rivers develop dunes whose form drag can consume 50–80% of the total bed shear stress. Only the skin friction component (the remaining 20–50%) acts on individual grains. Using total bed shear stress in the Shields parameter dramatically overpredicts transport in dune-bedded channels.

---

## 9. Summary

Sediment transport in rivers is governed by the balance between hydraulic driving force (bed shear stress $\tau_b$) and gravitational resistance (scaled by grain size and submerged weight). The Shields parameter $\tau^*$ normalises this balance into a dimensionless threshold: motion begins at $\tau^*_c \approx 0.047$ for typical river gravels. Above the threshold, the Meyer-Peter and Müller formula relates bedload transport rate to excess shear stress via a $(3/2)$ power law. Fine sediment in suspension is distributed vertically by the Rouse profile, with the Rouse number $Z = w_s / \kappa u_*$ controlling the concentration gradient.

The strong nonlinearity of transport — steep power-law dependence on flow — means that annual sediment budgets are dominated by infrequent large events, a fact with profound implications for dam design, channel management, and landscape sensitivity to climate change.

**Key equations:**

$$\tau^* = \frac{\rho_f g h S}{(\rho_s - \rho_f) g D} \quad \text{[Shields parameter]}$$

$$q_b = 8(\tau^* - \tau^*_c)^{3/2} \sqrt{(s-1)gD^3} \quad \text{[MPM bedload]}$$

$$\frac{C(z)}{C_a} = \left(\frac{a(h-z)}{z(h-a)}\right)^{w_s/\kappa u_*} \quad \text{[Rouse profile]}$$

---

## Math Refresher

**Dimensional analysis and dimensionless numbers.** The Shields parameter is derived by identifying the two force scales (drag $\propto \rho_f u_*^2$ and weight $\propto (\rho_s - \rho_f)gD$) and forming their ratio. Any physical threshold condition can be expressed as a critical value of the appropriate dimensionless parameter — this is Buckingham's Pi theorem in action.

**The $(3/2)$ power.** The exponent in MPM is not arbitrary: it reflects the product of two linear dependences on excess shear stress (number of mobile grains × grain velocity). When two quantities both scale as $(\tau^* - \tau^*_c)^1$, their product scales as $(\tau^* - \tau^*_c)^2$. The $(3/2)$ is an empirical compromise between these contributions. The steepness of the power law is the key point: transport is far more sensitive to flow magnitude than to, say, grain size.

**Logarithmic profiles.** The Rouse profile involves a ratio raised to a power, which in log-log space becomes a linear function. Plotting $\log(C/C_a)$ vs $\log[(a(h-z))/(z(h-a))]$ gives a straight line with slope $Z$. This is the same log-linear structure that appears in atmospheric boundary layers (Essay B6) — the mathematical form is universal for turbulent shear flows above a rough surface.
