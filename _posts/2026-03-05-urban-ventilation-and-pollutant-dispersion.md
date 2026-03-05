---
layout: essay
title: "Urban Ventilation and Pollutant Dispersion"
subtitle: "Street canyon flow regimes, Gaussian plumes, and the geometry of urban air quality"
date: 2026-03-05
categories: modelling
series: computational-geography-laboratory
series_order: 96
cluster: "AJ — Urban Climate and Air Quality"
cluster_order: 2
tags: [math, viz, essay]
math: true
viz: true
math_core:
  - Gaussian distribution
  - dimensional analysis
  - logarithmic velocity profiles
  - flux balance
spatial_reasoning: 3D dispersion geometry
dynamics: turbulent diffusion
computation: Gaussian plume concentration
domain: urban meteorology / air quality
difficulty: 4
prerequisites:
  - AJ1
  - B6
notebook_url: https://github.com/waywardhouse/computational-geography-lab/tree/main/essays/AJ2-dispersion
excerpt: >
  A street canyon traps vehicle exhaust in a recirculating vortex. The depth of
  that trap depends on the ratio of building height to street width. The pedestrian-
  level concentration of NO₂ and PM₂.₅ depends on canyon geometry, traffic volume,
  and emission factors. This essay derives the street canyon flow regimes, applies
  the Gaussian plume model to urban dispersion, connects emission factors to
  roadside concentrations, and identifies the geometries that produce chronic
  air quality violations.
math_prerequisites: >
  The Gaussian distribution and its properties. Logarithmic wind profiles (Essay B6).
  Basic algebra. Urban boundary layer concepts from Essay AJ1 are helpful but not
  required.
---

On a winter morning on Marylebone Road in London, NO₂ concentrations routinely reach 300–400 μg m⁻³ — three to four times the World Health Organization annual guideline of 40 μg m⁻³. A few hundred metres away in Regent's Park, the concentration is below 30 μg m⁻³. Traffic volumes are comparable in both locations. The difference is geometry: Marylebone Road is flanked by tall buildings that trap exhaust at street level; the park disperses it into the full depth of the boundary layer.

Street canyon geometry is the dominant control on near-road air quality in dense urban environments. Understanding it requires fluid mechanics — specifically, how a turbulent flow separates and reattaches when it encounters a repeated obstacle array.

---

## 1. The Question

How does street canyon geometry control the flow regime and the pollutant concentration within it? How do we estimate roadside concentrations from traffic counts and emission factors? And how does the urban boundary layer determine the eventual fate of pollutants emitted at street level?

---

## 2. The Conceptual Model

A street canyon is two parallel rows of buildings with a street between them. The **aspect ratio** $H/W$ (building height divided by street width) determines which of three flow regimes applies when wind blows perpendicular to the street axis:

**Isolated roughness flow** ($H/W < 0.3$): buildings are spaced far enough apart that flow reattaches to the ground between them; each building behaves independently.

**Wake interference flow** ($0.3 < H/W < 0.7$): building wakes interact; flow is complex and highly three-dimensional.

**Skimming flow** ($H/W > 0.7$): the flow above rooftop level skims over the canyon; a stable, nearly two-dimensional recirculating vortex forms inside. Most traffic pollution is trapped in this vortex rather than ventilated upward.

The skimming regime is ubiquitous in dense city centres — a $H/W$ of 1.0–2.5 corresponds to a typical downtown canyon. It is in skimming flow that the worst air quality problems occur.

---

## 3. Building the Mathematical Model

### 3.1 Canyon Ventilation Velocity

In skimming flow, the canyon interior is coupled to the overlying flow primarily through turbulent exchange at roof level. The effective **canyon ventilation velocity** $u_c$ [m s⁻¹] scales with the friction velocity $u_*$ above the rooftops:

$$u_c \approx \frac{u_*}{(H/W)^{0.5}}$$

Deeper canyons ($H/W$ larger) have lower $u_c$ and therefore accumulate more pollution for the same emission rate. The friction velocity above rooftops relates to the reference wind speed $U_H$ at roof height $H$:

$$u_* = \frac{k_v \, U_H}{\ln(H/z_0)}$$

where $k_v = 0.41$ is the von Kármán constant and $z_0$ is the aerodynamic roughness length (0.5–2 m for urban surfaces).

### 3.2 The Box Model for Canyon Concentration

At steady state in a canyon of height $H$ [m] and width $W$ [m], the concentration of a pollutant from road traffic (emission rate $Q$ [μg m⁻¹ s⁻¹] per metre of road length) is determined by balancing emission against ventilation. The **box model** treats the canyon as a well-mixed volume:

$$\text{Rate in (emission)} = \text{Rate out (ventilation)}$$

$$Q = C_{\text{canyon}} \cdot u_c \cdot H$$

Solving for concentration:

$$\boxed{C_{\text{canyon}} = \frac{Q \cdot W}{H \cdot u_c \cdot W} = \frac{Q}{H \cdot u_c}}$$

Wait — the box model per unit street length: emission $Q$ [μg m⁻¹ s⁻¹] enters a box of cross-section $H \times W$ [m²] and is ventilated at rate $u_c H$ [m² s⁻¹]:

$$C_{\text{canyon}} = \frac{Q}{u_c \cdot H} \quad [\mu\text{g m}^{-3}]$$

**Key scaling relationships:**
- $C \propto Q$ (doubling traffic → doubling concentration)
- $C \propto 1/u_c \propto (H/W)^{0.5}$ (deeper canyons → higher concentration)
- $C \propto 1/H$ (taller buildings → greater dilution volume)
- $C \propto 1/U_H$ (stronger wind → better ventilation)

### 3.3 Leeward vs. Windward Wall Asymmetry

The recirculating vortex in skimming flow creates a systematic asymmetry: the **leeward wall** (on the upwind side of the canyon, where the vortex brings air downward from rooftop level to street) has higher concentrations than the **windward wall** (where the vortex moves air upward). For a road centred in the canyon, the leeward wall concentration is approximately 1.5–2× the canyon-average value.

This asymmetry matters for receptor placement: a school or hospital on the leeward side of a major road canyon experiences significantly worse air quality than the same building on the windward side — a consideration that has been neglected in most planning regulations.

### 3.4 Traffic Emission Factors

The emission rate $Q$ from a road segment is computed from traffic volume, emission factors, and vehicle speed:

$$Q = \frac{N}{3600} \cdot \text{EF} \cdot v \cdot \frac{1}{1000} \quad [\text{g s}^{-1}\text{m}^{-1}]$$

where $N$ [veh hr⁻¹] is hourly traffic count, EF [g km⁻¹ veh⁻¹] is the emission factor, and $v$ [km hr⁻¹] is speed. Converting g s⁻¹ m⁻¹ to μg s⁻¹ m⁻¹, multiply by $10^6$.

Representative Euro 6 real-world emission factors for NO$_x$:

| Vehicle type | NO$_x$ (g km⁻¹) | PM₂.₅ (g km⁻¹) |
|---|---|---|
| Petrol car | 0.06 | 0.001 |
| Diesel car | 0.50 | 0.003 |
| Petrol SUV | 0.08 | 0.002 |
| Diesel bus | 3.0  | 0.020 |
| Heavy truck | 4.5  | 0.035 |

Note: real-world diesel car NO$_x$ often exceeds Euro 6 certification by 3–7× under urban driving conditions. Using certification factors systematically underpredicts canyon concentrations.

**Mixed fleet emission factor** for a fleet with fractions $f_k$ of each vehicle type:

$$\text{EF}_{\text{fleet}} = \sum_k f_k \cdot \text{EF}_k$$

### 3.5 The Gaussian Plume Model

Beyond the immediate canyon, pollutants disperse into the urban boundary layer. For a continuous **line source** (a road) of emission rate $q$ [g m⁻¹ s⁻¹] (per unit road length), the time-averaged concentration at crosswind distance $y$ [m] and height $z = 0$ (ground level) is:

$$C(y, 0) = \frac{\sqrt{2} \, q}{\sqrt{\pi} \, \sigma_z \, \bar{u}} \exp\!\left(-\frac{y^2}{2\sigma_y^2}\right) \exp\!\left(-\frac{H_s^2}{2\sigma_z^2}\right)$$

For a **point source** at height $H_s$ and emission rate $Q$ [g s⁻¹], the ground-level centreline ($y=0$) concentration at downwind distance $x$:

$$C(x, 0, 0) = \frac{Q}{\pi \sigma_y \sigma_z \bar{u}} \exp\!\left(-\frac{H_s^2}{2\sigma_z^2}\right)$$

The dispersion coefficients $\sigma_y(x)$ and $\sigma_z(x)$ depend on downwind distance and atmospheric stability (Pasquill-Gifford classes A–F, from convective unstable to strongly stable). For **urban neutral** conditions (class D):

$$\sigma_y = 0.22 \, x \, (1 + 0.0001x)^{-1/2}$$
$$\sigma_z = 0.16 \, x \, (1 + 0.0001x)^{-1/2}$$

(with $x$ in metres). For **urban unstable** (class B, sunny afternoon with surface heating):

$$\sigma_y = 0.16 \, x \, (1 + 0.0001x)^{-1/2}$$
$$\sigma_z = 0.12 \, x$$

Unstable conditions have larger $\sigma_z$ — faster vertical mixing — giving lower ground-level concentrations at any given distance. **Stable conditions** (class F, calm clear nights) produce the highest ground-level concentrations because vertical mixing is suppressed.

The centreline concentration at distance $x$ scales approximately as:

$$C(x, 0, 0) \propto \frac{Q}{\sigma_y \sigma_z \bar{u}} \propto \frac{Q}{\bar{u} x^2}$$

— a strong inverse-square decrease with distance that explains why doubling setback distance from a road reduces concentration by approximately 4×.

### 3.6 Urban Boundary Layer Height

The **urban boundary layer** (UBL) depth $h_{\text{UBL}}$ grows downwind over the city as turbulence and heat from the urban surface modify the atmosphere above:

$$h_{\text{UBL}} \approx 0.4\sqrt{\frac{u_* x}{f_c}}$$

where $f_c \approx 10^{-4}$ s⁻¹ is the Coriolis parameter and $x$ is fetch over the city. For $u_* = 0.5$ m s⁻¹ and $x = 10$ km:

$$h_{\text{UBL}} = 0.4\sqrt{\frac{0.5 \times 10{,}000}{10^{-4}}} = 0.4\sqrt{5 \times 10^7} = 0.4 \times 7071 = 2828 \text{ m}$$

The daytime UBL extends 2–3 km above the urban surface. Pollutants emitted at street level are eventually mixed through this layer — at the top of the UBL, urban-rural concentration contrasts are much smaller than at street level. The nighttime UBL is much shallower (100–500 m), which is why nighttime stable-atmosphere conditions produce maximum near-surface concentrations despite lower traffic volumes.

### 3.7 NO₂ Chemistry: Primary vs. Secondary

Vehicles emit primarily NO (nitric oxide), which is rapidly oxidised to NO₂ in the presence of ozone:

$$\text{NO} + \text{O}_3 \to \text{NO}_2 + \text{O}_2$$

In the photostationary state, the NO₂/NO ratio is:

$$\frac{[\text{NO}_2]}{[\text{NO}]} = \frac{k_1[\text{O}_3]}{J_{\text{NO}_2}}$$

where $J_{\text{NO}_2} \approx 7 \times 10^{-3}$ s⁻¹ is the daytime photolysis rate and $k_1[\text{O}_3] \approx 2 \times 10^{-3}$ s⁻¹ for $[\text{O}_3] = 40$ μg m⁻³. This gives $[\text{NO}_2]/[\text{NO}] \approx 0.3$ in daylight — about 23% of NO$_x$ is NO₂.

At night, $J_{\text{NO}_2} = 0$ and all NO is eventually converted to NO₂, which is not photolysed back. Combined with stable nocturnal mixing, nighttime NO₂ concentrations in canyons can exceed daytime values despite lower traffic.

---

## 4. Worked Example by Hand

**Setting:** A downtown Calgary street canyon. $H = 35$ m, $W = 18$ m ($H/W = 1.94$, deep skimming flow). Morning peak hour traffic.

**Given:**
- Traffic: 1400 veh hr⁻¹; fleet mix 55% petrol car, 35% diesel car, 10% diesel bus
- Speed: 25 km hr⁻¹
- Wind at roof level: $U_H = 4$ m s⁻¹, $z_0 = 1$ m
- Background NO₂: 20 μg m⁻³

**Step 1: Fleet-averaged NO$_x$ emission factor**

$$\text{EF}_{\text{fleet}} = 0.55(0.06) + 0.35(0.50) + 0.10(3.0) = 0.033 + 0.175 + 0.300 = 0.508 \text{ g km}^{-1}$$

**Step 2: Emission rate per metre of road**

$$Q = \frac{1400}{3600} \times 0.508 \times \frac{25}{1000} \times 10^6 = 0.3889 \times 0.508 \times 0.025 \times 10^6 = 4943 \text{ μg s}^{-1}\text{m}^{-1}$$

**Step 3: Friction velocity and canyon ventilation**

$$u_* = \frac{0.41 \times 4}{\ln(35/1)} = \frac{1.64}{\ln(35)} = \frac{1.64}{3.555} = 0.461 \text{ m s}^{-1}$$

$$u_c = \frac{0.461}{(1.94)^{0.5}} = \frac{0.461}{1.393} = 0.331 \text{ m s}^{-1}$$

**Step 4: Box model NO$_x$ concentration**

$$C_{\text{NO}_x} = \frac{Q}{H \cdot u_c} = \frac{4943}{35 \times 0.331} = \frac{4943}{11.59} = 426 \text{ μg m}^{-3}$$

**Step 5: NO₂ fraction**

Daytime: primary NO₂ fraction ≈ 0.10 from direct diesel emissions; secondary conversion of NO to NO₂ brings total to ~25–30% of NO$_x$ at photostationary state:

$$C_{\text{NO}_2} = 0.27 \times 426 + 20 = 115 + 20 = 135 \text{ μg m}^{-3}$$

This exceeds the WHO 1-hour guideline of 100 μg m⁻³ and approaches the old EU hourly limit of 200 μg m⁻³. It is not atypical for deep diesel-traffic canyons in Canadian cities during peak hour.

**Step 6: Effect of widening the street** (reduce $H/W$ from 1.94 to 0.8)

New $W = 35/0.8 = 43.75$ m — nearly 2.5× wider. This is usually not feasible in a built-up city centre.

$$u_c' = \frac{0.461}{(0.8)^{0.5}} = \frac{0.461}{0.894} = 0.516 \text{ m s}^{-1}$$

$$C' = \frac{4943}{35 \times 0.516} = \frac{4943}{18.06} = 274 \text{ μg m}^{-3} \quad \Rightarrow C_{\text{NO}_2}' \approx 94 \text{ μg m}^{-3}$$

Below the WHO guideline — but at the cost of a 25 m street widening that would require demolishing the building frontage.

---

## 5. Computational Implementation

```
function canyon_box(Q_ug_s_m, H, W, U_H, z0=1.0):
    u_star = 0.41 * U_H / log(H / z0)
    u_c    = u_star / sqrt(H / W)
    C      = Q_ug_s_m / (H * u_c)
    return C, u_c

function emission_rate(N_veh_hr, ef_g_km, speed_kph):
    # Returns μg/s/m
    return (N_veh_hr / 3600) * ef_g_km * (speed_kph / 1000) * 1e6

function gaussian_centreline(Q_g_s, x, H_s, u_bar):
    sigma_y = 0.22 * x * (1 + 0.0001*x)**(-0.5)
    sigma_z = 0.16 * x * (1 + 0.0001*x)**(-0.5)
    C = Q_g_s / (pi * sigma_y * sigma_z * u_bar)
    C *= exp(-H_s**2 / (2 * sigma_z**2))
    return C * 1e6  # to μg/m³
```

```{pyodide}
import numpy as np

def canyon_box(Q, H, U_H, HW_ratio, z0=1.0):
    u_star = 0.41 * U_H / np.log(H / z0)
    u_c = u_star / np.sqrt(HW_ratio)
    return Q / (H * u_c), u_c

def emission_rate(N, ef, v):
    return (N / 3600) * ef * (v / 1000) * 1e6  # μg/s/m

def gaussian_cl(Q_g_s, x, Hs, u):
    sy = 0.22 * x * (1 + 0.0001*x)**(-0.5)
    sz = 0.16 * x * (1 + 0.0001*x)**(-0.5)
    return Q_g_s / (np.pi * sy * sz * u) * np.exp(-Hs**2/(2*sz**2)) * 1e6

# Calgary canyon
ef_fleet = 0.55*0.06 + 0.35*0.50 + 0.10*3.0
Q = emission_rate(1400, ef_fleet, 25)
C, uc = canyon_box(Q, H=35, U_H=4, HW_ratio=1.94)
C_NO2 = 0.27 * C + 20
print(f"Fleet EF: {ef_fleet:.3f} g/km")
print(f"Emission rate Q: {Q:.0f} μg/s/m")
print(f"Canyon NOₓ: {C:.0f} μg/m³")
print(f"Canyon NO₂: {C_NO2:.0f} μg/m³  (WHO 1-hr: 100 μg/m³)")

# Gaussian plume downwind
print("\nGaussian plume centreline (1 g/s source, u=3m/s, Hs=3m):")
for x in [50, 100, 200, 500, 1000, 2000]:
    c = gaussian_cl(1.0, x, 3, 3)
    print(f"  x={x:5d}m: {c:.1f} μg/m³")
```

---

## 6. Visualization

<div data-viz="echarts" style="height:420px" data-options='{
  "title": {"text": "Canyon NO₂ Concentration vs Aspect Ratio and Wind Speed", "textStyle": {"fontSize": 14}},
  "tooltip": {"trigger": "axis"},
  "legend": {"data": ["U_H = 2 m/s", "U_H = 4 m/s", "U_H = 6 m/s"], "bottom": 0},
  "xAxis": {"name": "Aspect ratio H/W", "nameLocation": "middle", "nameGap": 30,
    "data": [0.3, 0.5, 0.7, 1.0, 1.5, 2.0, 2.5, 3.0]},
  "yAxis": {"name": "Canyon NO₂ (μg m⁻³, above background)", "nameLocation": "middle", "nameGap": 55},
  "series": [
    {"name": "U_H = 2 m/s", "type": "line", "smooth": true,
     "data": [28, 42, 55, 75, 105, 135, 162, 188]},
    {"name": "U_H = 4 m/s", "type": "line", "smooth": true,
     "data": [14, 21, 27, 37, 52, 67, 81, 94]},
    {"name": "U_H = 6 m/s", "type": "line", "smooth": true,
     "data": [9, 14, 18, 25, 35, 45, 54, 63]}
  ]
}'></div>

Both deeper canyons (higher $H/W$) and lower wind speeds increase canyon concentrations. The $H/W$ effect is the square-root of the ratio — going from $H/W = 0.3$ (wide street) to $H/W = 3.0$ (deep canyon) increases concentration by $\sqrt{3.0/0.3} = \sqrt{10} = 3.16\times$. The wind speed effect is linear: halving wind speed doubles concentration. On calm days, both effects compound to produce the most severe air quality episodes.

---

## 7. Interpretation

The box model reveals a simple and powerful hierarchy of interventions:

**Reduce $Q$ (reduce emissions):** Low-emission zones, electric vehicle mandates, congestion pricing. Each 10% reduction in fleet emission factor produces a 10% reduction in concentration — the most direct intervention.

**Increase $u_c$ (increase ventilation):** Street widening, building setbacks, creating gaps in building frontages. The $\sqrt{H/W}$ dependence means that doubling street width ($H/W \to H/2W$) increases $u_c$ by $\sqrt{2} \approx 1.41\times$ and reduces concentration by the same factor. Street widening is expensive and land-consuming; building setbacks are more achievable at the planning stage.

**Increase $H$ (increase dilution volume):** Taller buildings at the same street width increase the canyon volume, diluting emissions. However, taller buildings also reduce sky view factor, worsening nocturnal cooling (Essay AJ1) — a trade-off that city planners routinely underweight.

**Increase background dispersion:** The Gaussian plume analysis shows that receptor distance matters enormously. Moving a school from 50 m to 200 m from a major road reduces concentration by approximately $(200/50)^2 = 16\times$ under typical conditions — the simplest and most effective mitigation when it can be achieved at the planning stage.

---

## 8. What Could Go Wrong?

**The box model ignores along-canyon variation.** Real canyons have intersections, varying traffic, and wind directions that are rarely exactly perpendicular. Concentrations near intersections (where vehicles idle and accelerate) are 2–4× higher than mid-block. The box model produces a block-average; point measurements at intersections will exceed it.

**Emission factors are highly uncertain.** Real-world diesel NO$_x$ emissions frequently exceed certification by 3–7× in urban stop-start driving. Using Euro 6 certification factors can underpredict canyon NO$_x$ by a factor of 2–4. This is not a modelling failure — it is a regulatory failure in emissions certification that has only recently been acknowledged and is still not fully corrected.

**Gaussian plume assumes flat, homogeneous terrain.** Buildings create wakes, recirculation zones, and channelling effects that the Gaussian formula cannot represent. In the near field (within 1–2 building heights), building downwash can carry stack emissions directly to street level at concentrations orders of magnitude above the Gaussian prediction. Computational fluid dynamics (CFD) is required for accurate near-field assessment.

**Secondary PM₂.₅ formation.** Primary exhaust PM₂.₅ is only part of the urban particulate burden. Secondary PM₂.₅ forms downwind through gas-to-particle conversion of NO$_x$, SO₂, and volatile organic compounds — a process that takes hours to days and scales with regional rather than local sources. Box models that consider only primary emissions miss this contribution, which can dominate total PM₂.₅ in clean-air cities with low primary emissions.

---

## 9. Summary

Street canyon flow in the skimming regime ($H/W > 0.7$) traps vehicle exhaust in a recirculating vortex. The box model concentration $C = Q/(H \cdot u_c)$ reveals the three controllable parameters: emission rate $Q$, canyon height $H$, and ventilation velocity $u_c \propto u_* (H/W)^{-0.5}$. Deep canyons with high-diesel traffic at low wind speed produce NO₂ concentrations that routinely exceed WHO guidelines by factors of 2–5.

The Gaussian plume model extends the analysis beyond the canyon, showing that concentrations fall roughly as $x^{-2}$ with downwind distance — a strong argument for minimum setback distances between sensitive receptors and major roads. Stable nocturnal atmospheres suppress vertical mixing and produce maximum concentrations despite lower traffic volumes; this is why the worst air quality episodes typically occur on calm, cold winter nights rather than during morning rush hour.

**Key equations:**

$$u_c = u_* (H/W)^{-1/2}, \quad u_* = k_v U_H / \ln(H/z_0)$$

$$C_{\text{canyon}} = Q / (H \cdot u_c) \quad \text{[box model]}$$

$$C(x,0,0) = \frac{Q}{\pi\sigma_y\sigma_z\bar{u}} \exp\!\left(-\frac{H_s^2}{2\sigma_z^2}\right) \quad \text{[Gaussian plume]}$$

---

## Math Refresher

**The Gaussian distribution in dispersion.** Pollutant particles in turbulent flow undergo many independent small random displacements — up/down and left/right — as they travel downwind. By the central limit theorem, the sum of many independent random steps converges to a Gaussian distribution. The standard deviations $\sigma_y$ and $\sigma_z$ measure how wide the plume has spread; both grow with distance as turbulence accumulates more random displacements. The result: the Gaussian plume formula is not an empirical fit — it is the theoretical steady-state solution of the turbulent diffusion equation with constant wind and constant diffusivity.

**Box model as flux balance.** The box model equates the mass flux into the canyon (emission $Q$ μg s⁻¹ m⁻¹) with the mass flux out (ventilation $C \cdot u_c \cdot H$ μg m⁻³ × m s⁻¹ × m = μg s⁻¹ m⁻¹). At steady state these balance, giving $C = Q/(u_c H)$. This is the same structure as every other flux-balance model in the curriculum: residence time × input rate = steady-state reservoir size. The canyon residence time is $\tau = H/u_c$ — the time to flush the canyon volume — and $C = Q \tau / H$.
