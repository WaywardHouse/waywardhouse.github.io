---
layout: model
title: "Sediment and Contaminant Transport in Rivers"
subtitle: "Advection-dispersion equation, longitudinal dispersion, and reactive transport"
date: 2026-03-05
categories: modelling
series: computational-geography-laboratory
series_order: 106
cluster: "AS — Water Quality and Eutrophication"
cluster_order: 3
tags: [math, viz, essay]
math: true
viz: true
math_core:
  - partial differential equations (advection-dispersion)
  - Gaussian distributions
  - dimensional analysis
  - exponential decay (reactive transport)
spatial_reasoning: longitudinal mixing and plume evolution
dynamics: advection, dispersion, and decay
computation: ADE solution for slug and continuous sources
domain: fluvial geomorphology / water quality
difficulty: 4
prerequisites:
  - AS1
  - C8
  - A3
notebook_url: https://github.com/waywardhouse/computational-geography-lab/tree/main/essays/AS3-transport
excerpt: >
  A slug of dye injected into a river spreads into a Gaussian plume as it
  travels downstream — compressed in its leading edge, broadened by turbulent
  mixing. The advection-dispersion equation describes this spreading, predicts
  the peak concentration at any downstream location and time, and generalises
  to reactive contaminants that decay, sorb to sediment, or transform chemically.
  This essay derives the ADE from first principles, applies it to conservative
  tracer breakthrough curves, characterises the mixing length downstream of
  a discharge, and extends to reactive transport with first-order decay and
  linear sorption.
math_prerequisites: >
  Partial derivatives and the concept of a gradient (Essay C8). The Gaussian
  distribution. Exponential functions (Essay A3). Dimensional analysis.
---

On July 25, 2015, the Gold King Mine in Colorado blew out, releasing 11 million litres of acid mine drainage containing arsenic, lead, and cadmium into Cement Creek, a tributary of the Animas River. By August 9, the contamination plume had reached the San Juan River in New Mexico — 600 km downstream. Along the way, it arrived as a visible orange slug of sediment, peaked, and then declined as the pulse dispersed and diluted. By the time it reached the Colorado River, concentrations were elevated but below health-based action levels.

The shape of that plume — the orange slug growing broader and lower as it travelled — is exactly what the advection-dispersion equation (ADE) predicts. Understanding the ADE quantitatively allows emergency managers to answer the critical questions: when will the contamination arrive? what will the peak concentration be? how long until it passes?

---

## 1. The Question

How does a dissolved contaminant spread in a river? What is the concentration at any location and time after a spill? How far downstream does it take for a side-stream discharge to be fully mixed across the river? And how does chemical decay or sorption modify the transport?

---

## 2. The Conceptual Model

A dissolved substance in a river is simultaneously carried downstream by the mean flow (**advection**) and spread by the random velocity fluctuations of turbulence (**dispersion**). Advection moves the centre of mass at the mean flow velocity; dispersion spreads the distribution around that centre. The combination produces the characteristic Gaussian plume that broadens as the square root of travel time.

For reactive contaminants, additional processes modify the concentration: first-order decay (radioactive decay, biodegradation), linear sorption to suspended sediment, and volatilisation. Each process can be added to the ADE as a source or sink term.

---

## 3. Building the Mathematical Model

### 3.1 Derivation of the Advection-Dispersion Equation

Consider a control volume of length $\Delta x$, cross-sectional area $A$ [m²], in a river with mean velocity $U$ [m s⁻¹]. The mass $M$ [g] of solute in the control volume changes due to advective flux and dispersive flux:

**Advective flux in** at $x$: $F_{\text{adv}}^{\text{in}} = U C A$

**Advective flux out** at $x + \Delta x$: $F_{\text{adv}}^{\text{out}} = U C A + \frac{\partial(UCA)}{\partial x}\Delta x$

**Dispersive flux** follows Fick's first law — net flux from high to low concentration: $F_{\text{disp}} = -D_L A \frac{\partial C}{\partial x}$

Mass balance over $\Delta x$ and $\Delta t$, dividing by $A\Delta x$:

$$\frac{\partial C}{\partial t} = -U\frac{\partial C}{\partial x} + D_L\frac{\partial^2 C}{\partial x^2}$$

This is the **one-dimensional advection-dispersion equation (ADE)**, where:
- $C(x,t)$ [mg L⁻¹] = concentration
- $U$ [m s⁻¹] = mean river velocity
- $D_L$ [m² s⁻¹] = longitudinal dispersion coefficient

The two terms on the right have opposite characters: advection ($-U\partial C/\partial x$) translates the distribution downstream without changing its shape; dispersion ($D_L\partial^2 C/\partial x^2$) spreads and flattens it.

### 3.2 Analytical Solution: Instantaneous Slug Release

For an instantaneous release of mass $M$ [g] into a stream of cross-sectional area $A$ at $x = 0$, $t = 0$, the solution is a **Gaussian plume** moving downstream:

$$C(x,t) = \frac{M}{A\sqrt{4\pi D_L t}} \exp\!\left(-\frac{(x-Ut)^2}{4D_L t}\right)$$

Key properties:
- Peak concentration: $C_{\max}(t) = M/(A\sqrt{4\pi D_L t})$ — falls as $t^{-1/2}$
- Peak location: $x_{\max}(t) = Ut$ — moves at mean velocity
- Plume width (standard deviation): $\sigma_x = \sqrt{2D_L t}$ — grows as $t^{1/2}$
- At any fixed downstream location $x_0$, the concentration peaks at time $t_{\max} \approx x_0/U$ and the **breakthrough curve** is approximately Gaussian in time with $\sigma_t \approx \sigma_x/U = \sqrt{2D_L x_0/U}/U$

### 3.3 Continuous Source Solution

For a continuous steady source of discharge rate $q_s$ [g s⁻¹] at $x = 0$, the steady-state upstream-downstream concentration profile:

For $x > 0$ (downstream):

$$C(x) = \frac{q_s}{UA}\exp\!\left(-\frac{U x}{2D_L}\right) \cdot 2\cosh\left(\frac{Ux}{2D_L}\right) \approx \frac{q_s}{UA}$$

For a far-field downstream source in a long river, the concentration at distance $x$ downstream from a continuous point source at the surface:

$$C(x) = \frac{q_s}{Q} \quad (x \gg D_L/U)$$

where $Q = UA$ is river discharge. This is simply dilution — for a well-mixed continuous source, the downstream concentration is source mass flux divided by river volumetric flux.

### 3.4 The Longitudinal Dispersion Coefficient

The dispersion coefficient $D_L$ is much larger than molecular diffusion — it represents the spreading caused by differential velocities across the channel cross-section (faster in the centre, slower near the banks). Fischer et al. (1979):

$$D_L = 0.011 \frac{U^2 W^2}{H u_*}$$

where $U$ = mean velocity [m s⁻¹], $W$ = channel width [m], $H$ = mean depth [m], and $u_* = \sqrt{gHS}$ = shear velocity with $S$ = channel slope.

For a typical Alberta river reach: $U = 0.8$ m/s, $W = 40$ m, $H = 1.5$ m, $S = 0.0005$:

$$u_* = \sqrt{9.81 \times 1.5 \times 0.0005} = \sqrt{0.00736} = 0.0858 \text{ m/s}$$

$$D_L = 0.011 \times \frac{0.8^2 \times 40^2}{1.5 \times 0.0858} = 0.011 \times \frac{1024}{0.1287} = 0.011 \times 7955 = 87.5 \text{ m}^2/\text{s}$$

This is approximately $10^5$ times larger than the molecular diffusion coefficient of ~$10^{-9}$ m² s⁻¹ — confirming that turbulent dispersion, not molecular diffusion, governs river mixing.

### 3.5 Mixing Lengths and Transverse Mixing

A continuous discharge from one bank requires a **mixing length** $L_M$ [m] to achieve complete lateral mixing across the channel width $W$ [m]:

$$L_M \approx \frac{0.4 W^2 U}{D_T}$$

where $D_T$ [m² s⁻¹] is the transverse dispersion coefficient. The transverse coefficient is much smaller than the longitudinal:

$$D_T \approx 0.15 H u_*$$

For the Alberta river above: $D_T = 0.15 \times 1.5 \times 0.0858 = 0.019$ m² s⁻¹.

$$L_M = \frac{0.4 \times 40^2 \times 0.8}{0.019} = \frac{512}{0.019} = 26,900 \text{ m} \approx 27 \text{ km}$$

The discharge needs 27 km to mix fully across a 40 m wide channel. Before that, the ADE predictions using fully mixed concentrations overestimate the dilution available close to the bank on the opposite side.

### 3.6 Reactive Transport: First-Order Decay

For a contaminant that decays by first-order kinetics (radioactive decay, biodegradation, photolysis) with rate constant $\lambda$ [s⁻¹]:

$$\frac{\partial C}{\partial t} = -U\frac{\partial C}{\partial x} + D_L\frac{\partial^2 C}{\partial x^2} - \lambda C$$

Solution for instantaneous slug:

$$C(x,t) = \frac{M}{A\sqrt{4\pi D_L t}} \exp\!\left(-\frac{(x-Ut)^2}{4D_L t} - \lambda t\right)$$

The decay factor $e^{-\lambda t}$ reduces the total mass in the water column. For conservative tracers ($\lambda = 0$), total mass is conserved as the plume disperses.

### 3.7 Sorption and Retardation

When a contaminant sorbs onto suspended sediment or bed material, the effective transport velocity is reduced. For linear instantaneous sorption (Henry's law):

$$q = K_d C$$

where $q$ [mg kg⁻¹] is contaminant concentration in sediment and $K_d$ [L kg⁻¹] is the distribution coefficient. The sorbed phase moves with the sediment, which in suspended transport moves at approximately the flow velocity but in bed load moves more slowly.

For mobile (dissolved + suspended sediment) transport, the **retardation factor** $R_f$:

$$R_f = 1 + \frac{\rho_b K_d}{n}$$

where $\rho_b$ [kg L⁻¹] is bulk sediment density and $n$ is porosity (for porous media; in river transport, use suspended sediment concentration $C_s$ [kg m⁻³] and modify accordingly). The effective velocity is $U/R_f < U$ — strongly sorbing compounds move slower than the water.

For highly hydrophobic organic compounds (PCBs, PAHs, dioxins), $K_d$ can be $10^4$–$10^6$ L kg⁻¹ — these compounds are essentially immobile in river sediments, sorbing within hours of entering the system and remaining in bed sediments for decades to centuries.

---

## 4. Worked Example by Hand

**Setting:** A tanker spills 500 kg of a water-soluble chemical into the Bow River near Calgary. River properties: $U = 0.9$ m s⁻¹ = 77.8 km day⁻¹, $A = 80$ m² (depth 2 m, width 40 m), $D_L = 50$ m² s⁻¹.

**Mass input:** $M = 500$ kg = $5 \times 10^8$ mg

**Peak concentration vs. time at $x = 50$ km downstream:**

Travel time to 50 km: $t^* \approx 50{,}000/0.9 = 55{,}556$ s ≈ 15.4 hours

$$C_{\max}(t^*) = \frac{M}{A\sqrt{4\pi D_L t^*}} = \frac{5\times10^8}{80\sqrt{4\pi \times 50 \times 55{,}556}}$$

$$= \frac{5\times10^8}{80\sqrt{34{,}906{,}585}} = \frac{5\times10^8}{80 \times 5908} = \frac{5\times10^8}{472{,}640} = 1057 \text{ mg m}^{-3} = 1.06 \text{ mg L}^{-1}$$

**Plume width at 50 km:** $\sigma_x = \sqrt{2D_L t^*} = \sqrt{2 \times 50 \times 55{,}556} = \sqrt{5.56\times10^6} = 2357$ m ≈ 2.4 km

The 95% of mass is within ±2$\sigma_x$ = ±4.7 km of the peak at the time it passes 50 km.

**Arrival time window:** The plume passes a monitoring station at 50 km from $t = t^* - 2\sigma_t$ to $t = t^* + 2\sigma_t$, where $\sigma_t = \sigma_x/U = 2357/0.9 = 2619$ s ≈ 44 min. The main pulse passes in about 1.5 hours — consistent with emergency response timescales.

**If the chemical has decay rate $\lambda = 0.5$ day⁻¹ = $5.79 \times 10^{-6}$ s⁻¹:**

$$C_{\max}^{\text{reactive}}(t^*) = C_{\max}^{\text{conservative}} \times e^{-\lambda t^*} = 1057 \times e^{-5.79\times10^{-6} \times 55{,}556} = 1057 \times e^{-0.322} = 1057 \times 0.724 = 765 \text{ mg/m}^3$$

Decay reduces peak concentration by 28% at 50 km — significant but not dominant for this moderate decay rate.

---

## 5. Computational Implementation

```
function ade_slug(x_array, t, M, A, U, D_L, decay=0):
    # Instantaneous slug ADE solution
    sigma_sq = 2 * D_L * t
    peak_pos = U * t
    C = M / (A * sqrt(4 * pi * D_L * t))
    C *= exp(-(x_array - peak_pos)**2 / (2 * sigma_sq))
    C *= exp(-decay * t)
    return C

function breakthrough_curve(x0, t_array, M, A, U, D_L, decay=0):
    C = []
    for t in t_array:
        if t <= 0: C.append(0); continue
        sigma_sq = 2 * D_L * t
        c = M / (A * sqrt(4*pi*D_L*t))
        c *= exp(-(x0 - U*t)**2 / sigma_sq)
        c *= exp(-decay * t)
        C.append(c)
    return C

function dispersion_coefficient(U, W, H, S):
    u_star = sqrt(9.81 * H * S)
    return 0.011 * U**2 * W**2 / (H * u_star)
```

```{pyodide}
import numpy as np

def ade_slug(x, t, M, A, U, DL, lam=0):
    if t <= 0: return np.zeros_like(x, dtype=float)
    factor = M / (A * np.sqrt(4*np.pi*DL*t))
    return factor * np.exp(-(x - U*t)**2 / (4*DL*t) - lam*t)

def breakthrough(x0, t_arr, M, A, U, DL, lam=0):
    return np.array([ade_slug(np.array([x0]), t, M, A, U, DL, lam)[0]
                     for t in t_arr])

def DL_fischer(U, W, H, S):
    u_star = np.sqrt(9.81 * H * S)
    return 0.011 * U**2 * W**2 / (H * u_star)

# Bow River spill
M = 5e8   # mg (500 kg)
A = 80.0  # m²
U = 0.9   # m/s
DL = DL_fischer(0.9, 40, 2.0, 0.0005)
print(f"Longitudinal dispersion coefficient: {DL:.1f} m²/s")

# Peak at 50 km downstream
x0 = 50_000
t_star = x0 / U
sigma_x = np.sqrt(2*DL*t_star)
C_peak = M / (A * np.sqrt(4*np.pi*DL*t_star))
print(f"\nAt x = {x0/1000:.0f} km:")
print(f"  Travel time: {t_star/3600:.1f} hours")
print(f"  Peak conc (conservative): {C_peak:.1f} mg/m³ = {C_peak/1000:.4f} mg/L")
print(f"  Plume σ: {sigma_x/1000:.1f} km")

# With decay (λ = 0.5/day)
lam = 0.5 / 86400
C_reactive = C_peak * np.exp(-lam * t_star)
print(f"  Peak conc (λ=0.5/d): {C_reactive:.1f} mg/m³  (reduction: {100*(1-C_reactive/C_peak):.0f}%)")

# Breakthrough at multiple stations
t_arr = np.linspace(1000, 300_000, 500)
stations = [20_000, 50_000, 100_000]
print(f"\nBreakthrough times and peaks:")
for xs in stations:
    bt = breakthrough(xs, t_arr, M, A, U, DL)
    tmax = t_arr[np.argmax(bt)]
    print(f"  x={xs/1000:.0f}km: peak at t={tmax/3600:.1f}h, C_peak={bt.max():.0f} mg/m³")
```

---

## 6. Visualization

<div data-viz="echarts" style="height:420px" data-options='{
  "title": {"text": "Conservative Tracer Breakthrough Curves at Downstream Monitoring Stations", "textStyle": {"fontSize": 14}},
  "tooltip": {"trigger": "axis"},
  "legend": {"data": ["x = 20 km", "x = 50 km", "x = 100 km"], "bottom": 0},
  "xAxis": {"name": "Time after spill (hours)", "nameLocation": "middle", "nameGap": 30,
    "data": [0,2,4,6,8,10,12,14,16,18,20,22,24,28,32,38,46,56,70,90]},
  "yAxis": {"name": "Concentration (mg m⁻³)", "nameLocation": "middle", "nameGap": 55},
  "series": [
    {"name": "x = 20 km", "type": "line", "smooth": true,
     "itemStyle": {"color": "#C62828"},
     "data": [0,0,0,820,3200,4100,2800,1400,550,190,55,14,3,0,0,0,0,0,0,0]},
    {"name": "x = 50 km", "type": "line", "smooth": true,
     "itemStyle": {"color": "#1565C0"},
     "data": [0,0,0,0,0,0,60,320,780,1050,980,720,460,180,55,10,2,0,0,0]},
    {"name": "x = 100 km", "type": "line", "smooth": true,
     "itemStyle": {"color": "#2E7D32"},
     "data": [0,0,0,0,0,0,0,0,5,35,110,280,480,680,700,560,360,190,80,25]}
  ]
}'></div>

Three characteristic features of ADE breakthrough curves: the peak arrives approximately at $t = x/U$; the peak concentration falls proportionally to $1/\sqrt{x}$ as the plume spreads; and the curves become increasingly asymmetric (right-tailed) at greater distances due to the time-domain stretching of the Gaussian. The emergency manager can read directly when contamination will arrive and how long it will last.

---

## 7. Interpretation

The ADE result that peak concentration falls as $M/(A\sqrt{4\pi D_L t}) \propto x^{-1/2}$ has profound implications for emergency response. Doubling the distance from the spill does not halve the peak — it reduces it by only $\sqrt{2} \approx 1.41\times$. Contamination from a large spill remains detectable far downstream. Conversely, for a continuous source (as in the Gold King Mine case), the downstream concentration at steady state is simply $q_s/Q$ — pure dilution, with no spatial gradient beyond the mixing length.

The mixing length result (27 km for a 40 m wide river) is important for permit design: a regulatory monitor placed 1 km downstream of a lateral discharge would measure bank-side concentrations much higher than the whole-river average, potentially triggering violations that would not occur further downstream. Standard practice places whole-river monitoring stations beyond the mixing length for this reason.

The sorption result — strongly hydrophobic compounds become essentially immobilised in bed sediments — explains why contaminated sediment cleanup is so difficult and expensive. Dredging removes the contaminated sediment but disturbs adjacent material, temporarily releasing contaminants to the water column. Capping (covering the contaminated sediment with clean material) prevents release but does not remove the contamination. Natural recovery through burial by cleaner sediment may take decades in low-energy depositional environments.

---

## 8. What Could Go Wrong?

**The ADE assumes Fickian (Gaussian) dispersion.** In heterogeneous rivers — with dead zones behind boulders, hyporheic exchange with the streambed, vegetated margins — transport is non-Fickian: tails are heavier than Gaussian, and breakthrough curves show double peaks or very long recession limbs. The CTRW (continuous time random walk) framework generalises the ADE to non-Fickian transport but at significantly greater mathematical complexity.

**Transverse mixing is critical near the source.** The ADE assumption of complete lateral mixing is violated in the near-field mixing zone. For a bank discharge of a toxic compound, the concentration at the near bank remains much higher than the ADE whole-river average until the mixing length is reached. Acute aquatic toxicity effects (fish kills) can occur within the mixing zone even when whole-river concentrations meet standards.

**Bed sediment acts as a long-term secondary source.** For contaminants with high $K_d$, the river bed becomes a reservoir that slowly releases contamination back to the water column over years to decades after the primary source is removed. This was observed on the Hudson River (PCBs from GE capacitor plants) and the Athabasca River (PAHs from natural bitumen deposits and oil sands processing areas) — rivers that continue to show elevated contaminant concentrations long after regulatory action addressed the primary sources.

---

## 9. Summary

The advection-dispersion equation $\partial C/\partial t = -U\partial C/\partial x + D_L\partial^2 C/\partial x^2$ describes the downstream transport and spreading of dissolved contaminants. For an instantaneous slug release, the solution is a Gaussian plume with peak concentration $\propto (D_L t)^{-1/2}$ and width $\sigma_x = \sqrt{2D_L t}$. The longitudinal dispersion coefficient is estimated by Fischer's formula $D_L = 0.011 U^2 W^2/(Hu_*)$.

First-order decay (biodegradation, radioactive decay) adds an exponential damping factor $e^{-\lambda t}$. Linear sorption retards transport by factor $R_f = 1 + \rho_b K_d/n$. Lateral mixing requires a distance $L_M \approx 0.4W^2U/D_T$ before a bank-edge discharge is fully mixed across the channel — typically tens of kilometres for rivers wider than 20 m.

**Key equations:**

$$\frac{\partial C}{\partial t} = -U\frac{\partial C}{\partial x} + D_L\frac{\partial^2 C}{\partial x^2} - \lambda C$$

$$C(x,t) = \frac{M}{A\sqrt{4\pi D_L t}}\exp\!\left(-\frac{(x-Ut)^2}{4D_L t}-\lambda t\right)$$

$$D_L = 0.011\frac{U^2 W^2}{H u_*}, \quad u_* = \sqrt{gHS}$$

$$L_M \approx 0.4W^2U/D_T, \quad D_T \approx 0.15 H u_*$$

---

## Math Refresher

**The Gaussian and the diffusion equation.** The ADE without advection reduces to $\partial C/\partial t = D_L \partial^2 C/\partial x^2$ — the diffusion equation. Its fundamental solution is the Gaussian: $C(x,t) = C_0/\sqrt{4\pi D_L t} \exp(-x^2/4D_L t)$. Adding advection at velocity $U$ simply shifts the Gaussian downstream: replace $x$ with $x - Ut$. This is the mathematical expression of a simple physical fact: the mean current carries the plume, and diffusion spreads it symmetrically around the moving centre.

**Dimensional analysis for $D_L$.** The dispersion coefficient has units [m² s⁻¹] = [length² / time]. Fischer's formula $D_L \propto U^2 W^2 / (H u_*)$ is dimensionally consistent: $[m/s]^2 [m]^2 / ([m][m/s]) = [m^4/s^2] / [m^2/s] = [m^2/s]$. The physical interpretation: larger channels ($W$ larger), faster flow ($U$ larger), and smoother beds (lower $u_*$) all increase dispersion — because the velocity gradient across the wide, fast, smooth channel is larger, creating more differential advection and hence more spreading.
