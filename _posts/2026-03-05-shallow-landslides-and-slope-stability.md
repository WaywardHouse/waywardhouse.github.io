---
layout: essay
title: "Shallow Landslides and Slope Stability"
subtitle: "The infinite slope model, pore pressure, and the arithmetic of failure"
date: 2026-03-05
categories: modelling
series: computational-geography-laboratory
series_order: 73
cluster: "AA — Weathering and Hillslope Processes"
cluster_order: 3
tags: [math, viz, essay]
math: true
viz: true
math_core:
  - force balance
  - trigonometry
  - probability distributions
  - dimensional analysis
spatial_reasoning: slope geometry
dynamics: threshold / failure
computation: Monte Carlo simulation
domain: geomorphology
difficulty: 4
barnsley_chapter: 4
prerequisites:
  - A1
  - B6
  - C8
  - AA1
notebook_url: https://github.com/waywardhouse/computational-geography-lab/tree/main/essays/AA3-slope-stability
excerpt: >
  A hillslope is a system in tension between gravity and resistance. Most slopes exist in
  a state of marginal stability — close enough to failure that a single wet season, a
  logged forest, or a saturated soil horizon can tip the balance. This essay derives the
  infinite slope model from first principles, introduces pore water pressure as the
  dominant triggering mechanism, and builds a probabilistic framework for mapping
  shallow landslide hazard.
math_prerequisites: >
  Trigonometry (sin, cos, tan) and the concept of force balance. Basic familiarity with
  probability and normal distributions is helpful for §3.4 but not essential — the section
  is self-contained.
---

On the morning of January 9, 2005, a shallow landslide on a steep forested hillslope above La Conchita, California, travelled 150 metres in about 30 seconds, killing ten people. Aerial photographs taken after the slide showed a clean, planar failure surface roughly parallel to the slope surface — a textbook example of what geomorphologists call a **translational** or **infinite-slope** failure.

The slide had been preceded by exceptionally heavy rainfall. The soil profile was saturated. Pore water pressure reduced the effective stress between soil particles, and a slope that had been stable for decades failed in minutes.

Understanding why requires a precise analysis of forces — and that analysis turns out to be surprisingly tractable. The infinite slope model is one of the most elegant and practically useful results in applied geomorphology.

---

## 1. The Question

What determines whether a hillslope is stable or unstable? What role does rainfall play? Can we quantify the effect of forest root reinforcement and derive critical rainfall thresholds for landslide initiation?

---

## 2. The Conceptual Model

We abstract the slope as an infinite uniform planar surface inclined at angle $\beta$ from the horizontal. The soil mantle is a layer of uniform thickness $z$ [m], with saturated hydraulic conductivity $K_s$ [m s⁻¹] and bulk density $\rho_s$ [kg m⁻³]. Bedrock lies at depth $z$ and is assumed impermeable.

The soil layer can fail along a plane parallel to the slope surface — the most common failure geometry for shallow translational slides. We analyse a unit block (1 m × 1 m plan area) of soil at the base of the soil column, sitting on the potential failure plane.

**Forces driving failure:** gravity, resolved as a shear stress parallel to the slope surface.

**Forces resisting failure:** Mohr-Coulomb shear strength, which depends on the normal stress on the failure plane, soil cohesion, the internal friction angle, and any additional strength from plant roots.

**The trigger:** water. Positive pore water pressure in a saturated or perched water table reduces the effective normal stress on the failure plane, reducing shear strength without changing the driving shear stress. If the ratio of driving to resisting forces exceeds 1, the slope fails.

---

## 3. Building the Mathematical Model

### 3.1 Force Balance on the Failure Plane

Consider a unit block of soil at depth $z$ with the failure plane at the base. The weight of the block per unit plan area is:

$$W = \rho_s g z$$

where $g = 9.81$ m s⁻². Resolving $W$ into components parallel and perpendicular to the slope:

$$\tau_d = \rho_s g z \sin\beta \quad \text{(driving shear stress)}$$

$$\sigma_n = \rho_s g z \cos\beta \quad \text{(normal stress on failure plane)}$$

### 3.2 Mohr-Coulomb Shear Strength

The shear strength of the soil along the failure plane is described by the **Mohr-Coulomb criterion**:

$$\tau_r = c' + (\sigma_n - u)\tan\phi'$$

where:
- $c'$ [Pa] is the effective cohesion (resistance independent of normal stress)
- $\phi'$ [degrees] is the effective friction angle
- $u$ [Pa] is the pore water pressure
- $(\sigma_n - u)$ is the **effective normal stress**

Substituting the normal stress:

$$\tau_r = c' + (\rho_s g z \cos\beta - u) \tan\phi'$$

### 3.3 The Factor of Safety

The **factor of safety** FS is the ratio of resisting to driving force:

$$FS = \frac{\tau_r}{\tau_d} = \frac{c' + (\rho_s g z \cos\beta - u)\tan\phi'}{\rho_s g z \sin\beta}$$

When FS > 1: stable. When FS = 1: at the verge of failure. When FS < 1: failure occurs.

**Dry slope (u = 0):** The factor of safety simplifies to:

$$FS_{\text{dry}} = \frac{c'}{\rho_s g z \sin\beta} + \frac{\tan\phi'}{\tan\beta}$$

For a purely frictional soil ($c' = 0$), the dry slope is stable whenever $\phi' > \beta$ — the slope is stable as long as its angle does not exceed the internal friction angle of the soil. The critical angle for a dry frictional slope is precisely $\phi'$.

### 3.4 Pore Water Pressure and Saturation

The pore water pressure at the base of the soil column depends on the depth of the water table above the failure plane. If the water table is at height $h_w$ [m] above the failure plane (measured perpendicular to the slope), then:

$$u = \rho_w g h_w \cos\beta$$

where $\rho_w = 1000$ kg m⁻³ is the density of water. Note the $\cos\beta$ term: pore pressure is the hydrostatic pressure perpendicular to the slope surface, not the vertical.

For a fully saturated profile ($h_w = z$):

$$u_{\text{sat}} = \rho_w g z \cos\beta$$

The factor of safety under full saturation becomes:

$$FS_{\text{sat}} = \frac{c'}{\rho_s g z \sin\beta} + \frac{(\rho_s - \rho_w)\cos\beta \tan\phi'}{\rho_s \sin\beta}$$

Defining the relative saturation $m = h_w / z$ (fraction of soil column that is saturated, $0 \leq m \leq 1$):

$$FS(m) = \frac{c'}{\rho_s g z \sin\beta} + \frac{[1 - m(\rho_w/\rho_s)]\cos\beta \tan\phi'}{\sin\beta}$$

This is the **infinite slope model** in its standard form. It predicts how FS declines as $m$ increases from 0 (dry) to 1 (fully saturated).

### 3.5 Root Reinforcement

Forest roots act as tensile reinforcement across the failure plane, adding an apparent cohesion $c_r$ [Pa] to the soil. The total effective cohesion becomes $c' + c_r$, and the factor of safety is:

$$FS_{\text{root}} = \frac{c' + c_r}{\rho_s g z \sin\beta} + \frac{[1-m(\rho_w/\rho_s)]\cos\beta \tan\phi'}{\sin\beta}$$

Root reinforcement values depend on species and root density. Conifers in the Pacific Northwest typically contribute $c_r = 2{,}000$–$10{,}000$ Pa; grasses contribute $500$–$2{,}000$ Pa; clearcut slopes within a few years of harvest have $c_r \approx 0$ (roots decay faster than new roots develop).

A 10,000 Pa root reinforcement on a slope with $\rho_s = 1,500$ kg m⁻³ and $z = 1.5$ m adds:

$$\Delta FS = \frac{10000}{1500 \times 9.81 \times 1.5 \times \sin\beta} = \frac{10000}{22072 \sin\beta}$$

At $\beta = 30°$, $\Delta FS = 10000 / 11036 = 0.91$ — forest roots add nearly a full unit to the factor of safety. This is why logged slopes are dramatically more susceptible to shallow landslides during the critical period (roughly 5–15 years) when root strength has decayed but new roots have not yet developed.

### 3.6 Critical Rainfall Threshold

Setting FS = 1 and solving for the critical saturation $m^*$:

$$1 = \frac{c' + c_r}{\rho_s g z \sin\beta} + \frac{[1-m^*(\rho_w/\rho_s)]\cos\beta \tan\phi'}{\sin\beta}$$

Rearranging:

$$m^* = \frac{\rho_s}{\rho_w}\left[1 - \frac{\tan\beta}{\tan\phi'} + \frac{(c'+c_r)\tan\beta}{\rho_s g z \sin\beta \tan\phi'} \right] \cdot \frac{\tan\phi'}{\tan\beta} \cdot \frac{1}{\cos\beta}\ldots$$

After careful algebra, the result simplifies to:

$$m^* = \frac{\rho_s}{\rho_w}\left(1 - \frac{\tan\beta}{\tan\phi'}\right) + \frac{(c' + c_r)}{\rho_w g z \cos\beta \tan\phi'}\cdot\frac{1}{\sin\beta/\tan\phi'\cdot\cos\beta}$$

A cleaner formulation sets $FS = 1$ directly and solves numerically — which is straightforward to implement and avoids algebraic error.

**Translating to rainfall:** The critical saturation $m^*$ corresponds to a critical water table height $h_w^* = m^* z$. For a given soil hydraulic conductivity $K_s$ and slope, the rainfall intensity required to produce this water table can be estimated from the steady-state perched water table model:

$$q^* = K_s \cdot m^* \cdot \cos\beta$$

where $q^*$ [m s⁻¹] is the critical rainfall rate that, sustained long enough to saturate the slope to $m^*$, triggers failure. Slopes with high $K_s$ (coarse soils) require higher rainfall intensities to reach the critical threshold; steep slopes with thin, low-permeability soils can fail at relatively modest rainfall totals.

### 3.7 Probabilistic Hazard Mapping

The factor of safety is a deterministic quantity — it uses single values for all parameters. But soil properties, depth, and saturation are spatially variable and uncertain. A probabilistic approach treats the inputs as distributions and asks: what is the probability that FS < 1?

If we treat the friction angle $\phi'$ as normally distributed with mean $\mu_{\phi}$ and standard deviation $\sigma_{\phi}$, and cohesion $c'$ as normally distributed with $\mu_c, \sigma_c$, then FS becomes a random variable. **Monte Carlo simulation** estimates $P(\text{FS} < 1)$ by:

1. Sample $N$ values of each uncertain parameter from its distribution
2. Compute FS for each sample
3. Count the fraction of samples where FS < 1

This fraction is the estimated probability of failure — the basis for probabilistic landslide hazard maps.

---

## 4. Worked Example by Hand

**Setting:** A forested hillslope above a rural road in the Coast Mountains of British Columbia. Recent clearcut logging. Soil properties measured in the field.

**Given:**
- $\beta = 32°$ (slope angle)
- $z = 1.2$ m (soil depth)
- $\rho_s = 1600$ kg m⁻³ (bulk density)
- $\phi' = 34°$ (friction angle from lab test)
- $c' = 500$ Pa (low cohesion, disturbed soil)
- $c_r = 8{,}000$ Pa (forested condition)
- $c_r = 0$ Pa (clearcut condition, roots decayed)
- $m = 0.8$ (80% saturation — after a heavy rain event)

**Step 1: Common terms**

$$\rho_s g z = 1600 \times 9.81 \times 1.2 = 18835 \text{ Pa}$$

$$\sin 32° = 0.5299, \quad \cos 32° = 0.8480, \quad \tan 32° = 0.6249, \quad \tan 34° = 0.6745$$

**Step 2: Driving shear stress**

$$\tau_d = \rho_s g z \sin\beta = 18835 \times 0.5299 = 9981 \text{ Pa}$$

**Step 3: Effective normal stress at m = 0.8**

$$u = m \rho_w g z \cos\beta = 0.8 \times 1000 \times 9.81 \times 1.2 \times 0.8480 = 7997 \text{ Pa}$$

$$\sigma_n - u = \rho_s g z \cos\beta - u = 18835 \times 0.8480 - 7997 = 15972 - 7997 = 7975 \text{ Pa}$$

**Step 4: FS — forested**

$$\tau_r = (500 + 8000) + 7975 \times 0.6745 = 8500 + 5379 = 13879 \text{ Pa}$$

$$FS_{\text{forested}} = 13879 / 9981 = \mathbf{1.39}$$

**Step 5: FS — clearcut**

$$\tau_r = 500 + 7975 \times 0.6745 = 500 + 5379 = 5879 \text{ Pa}$$

$$FS_{\text{clearcut}} = 5879 / 9981 = \mathbf{0.589}$$

**Interpretation:** The forested slope is stable (FS = 1.39) at 80% saturation. The clearcut slope is far below the failure threshold (FS = 0.59) at the same saturation — it would have already failed at a much lower saturation. Root reinforcement of 8,000 Pa is the difference between a stable slope and an actively failing one.

**Step 6: Critical saturation for clearcut slope**

Setting FS = 1 and solving iteratively for $m^*$:

At $m = 0$: $FS = (500 + 15972 \times 0.6745) / 9981 = (500 + 10776) / 9981 = 1.128$

So even at zero saturation, the clearcut slope has FS only marginally above 1. Any rainfall event produces failure. This is an inherently marginally stable slope — it is only the root reinforcement that kept it safe when forested.

---

## 5. Computational Implementation

```
function infinite_slope_FS(beta_deg, z, rho_s, phi_deg, c_eff, m, rho_w=1000):
    g = 9.81
    beta = radians(beta_deg)
    phi  = radians(phi_deg)
    W    = rho_s * g * z
    tau_d = W * sin(beta)
    sigma_n = W * cos(beta)
    u = m * rho_w * g * z * cos(beta)
    tau_r = c_eff + (sigma_n - u) * tan(phi)
    return tau_r / tau_d

function critical_saturation(beta_deg, z, rho_s, phi_deg, c_eff, rho_w=1000):
    # Binary search for m* where FS = 1
    lo, hi = 0.0, 1.0
    for i in range(50):
        mid = (lo + hi) / 2
        if infinite_slope_FS(beta_deg, z, rho_s, phi_deg, c_eff, mid) > 1:
            lo = mid
        else:
            hi = mid
    return (lo + hi) / 2
```

```{pyodide}
import numpy as np

def fs_infinite(beta_deg, z, rho_s, phi_deg, c_eff, m, rho_w=1000):
    g = 9.81
    b, p = np.radians(beta_deg), np.radians(phi_deg)
    W = rho_s * g * z
    tau_d = W * np.sin(b)
    u = m * rho_w * g * z * np.cos(b)
    tau_r = c_eff + (W * np.cos(b) - u) * np.tan(p)
    return tau_r / tau_d

# Worked example
params = dict(beta_deg=32, z=1.2, rho_s=1600, phi_deg=34, m=0.8)
fs_forest = fs_infinite(c_eff=8500, **params)
fs_clear  = fs_infinite(c_eff=500,  **params)
print(f"FS forested:  {fs_forest:.3f}")
print(f"FS clearcut:  {fs_clear:.3f}")

# FS vs saturation curve
m_vals = np.linspace(0, 1, 50)
fs_f = [fs_infinite(c_eff=8500, m=m, **{k:v for k,v in params.items() if k!='m'}) for m in m_vals]
fs_c = [fs_infinite(c_eff=500,  m=m, **{k:v for k,v in params.items() if k!='m'}) for m in m_vals]
print("\nSaturation at which clearcut FS = 1:")
crosses = [m_vals[i] for i in range(len(fs_c)) if fs_c[i] < 1]
print(f"  m* ≈ {crosses[0]:.2f}" if crosses else "  Never stable")
```

---

## 6. Visualization

<div data-viz="echarts" style="height:420px" data-options='{
  "title": {"text": "Factor of Safety vs Relative Saturation", "textStyle": {"fontSize": 14}},
  "tooltip": {"trigger": "axis", "formatter": "m = {b}: FS = {c}"},
  "legend": {"data": ["Forested (cr = 8000 Pa)", "Clearcut (cr = 0 Pa)"], "bottom": 0},
  "xAxis": {"name": "Relative Saturation m (h_w/z)", "nameLocation": "middle", "nameGap": 30,
    "data": [0.0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0]},
  "yAxis": {"name": "Factor of Safety (FS)", "nameLocation": "middle", "nameGap": 40,
    "min": 0, "max": 2.5,
    "axisLine": {},
    "splitLine": {}},
  "series": [
    {
      "name": "Forested (cr = 8000 Pa)", "type": "line", "smooth": true,
      "data": [2.21, 2.12, 2.03, 1.94, 1.85, 1.76, 1.57, 1.48, 1.39, 1.30, 1.21],
      "markLine": {"data": [{"yAxis": 1, "label": {"formatter": "FS = 1 (failure threshold"}}]}
    },
    {
      "name": "Clearcut (cr = 0 Pa)", "type": "line", "smooth": true,
      "data": [1.13, 1.07, 1.01, 0.95, 0.89, 0.83, 0.77, 0.71, 0.59, 0.53, 0.47],
      "markLine": {"data": [{"yAxis": 1}]}
    }
  ]
}'></div>

The forested curve remains above FS = 1 across the full saturation range under these conditions. The clearcut curve crosses FS = 1 at approximately m = 0.2 — 20% saturation. This means that even modest rainfall on the clearcut slope will produce failure conditions.

---

## 7. Interpretation

The model reveals three distinct stability regimes defined by the relationship between slope angle and friction angle:

**Unconditionally stable:** $\tan\beta < (\rho_s - \rho_w)\cos\beta\tan\phi' / (\rho_s\sin\beta)$ even under full saturation and zero cohesion. These slopes cannot fail by the infinite slope mechanism regardless of rainfall.

**Conditionally stable:** The dry slope is stable (FS > 1 at m = 0) but the saturated slope is unstable (FS < 1 at m = 1). Rainfall can trigger failure. Most natural hillslopes in humid-temperate and humid-tropical environments occupy this regime.

**Unconditionally unstable:** Even the dry slope has FS < 1. Cohesion or root reinforcement may temporarily stabilise such slopes, but any reduction in cohesive strength (weathering, root decay, disturbance) produces failure.

Alberta's forested hillslopes, particularly in the foothills and eastern Rocky Mountain front ranges, occupy the conditional stability zone. The frequent association between logging, road construction, and elevated landslide rates in these areas is a direct consequence of the model: reducing $c_r$ to zero by harvesting, or creating a local saturation lens at the base of a disturbed zone, is sufficient to trigger failures that had not occurred in decades of preceding natural conditions.

---

## 8. What Could Go Wrong?

**The infinite slope assumption.** Real landslides have upslope and downslope boundary effects — the failure mass is not infinite. For shallow, wide failures relative to their length, the infinite slope approximation is reasonable. For deeper, narrower failures, or failures where a distinct headscarp develops, a three-dimensional or wedge-failure analysis is needed.

**Uniform soil depth and properties.** Real hillslopes have variable soil depth (thicker in concavities, thinner on convexities), layered stratigraphy, and spatial variation in friction angle and cohesion. A deterministic model using single representative values will misclassify stability at specific locations with unusual soil conditions.

**Hydrostatic pore pressure assumption.** The model assumes the water table is parallel to the slope and that pore pressure equals $\rho_w g h_w \cos\beta$. In practice, transient perching above a low-permeability layer can produce pore pressures exceeding the hydrostatic value — a phenomenon called **excess pore pressure** — which makes the slope more unstable than the model predicts.

**Root reinforcement dynamics.** The model treats $c_r$ as a static parameter, but root strength changes continuously after harvest — declining over 3–7 years as roots decay, then recovering over 15–30 years as new roots develop. The most hazardous period is the window from approximately year 5 to year 15 post-harvest, when decay has peaked and regrowth is not yet substantial.

**Triggering vs. conditioning.** The infinite slope model identifies which slopes are susceptible to failure under a given set of conditions. It does not model the dynamic triggering process — the specific rainfall event, earthquake, or erosion of the slope toe that actually initiates motion. Hazard mapping must combine susceptibility (from the stability model) with exposure (from rainfall climatology or seismic hazard) to produce a complete risk assessment.

---

## 9. Summary

The infinite slope model reduces slope stability to a competition between two stress components: the gravitational shear stress driving failure, and the Mohr-Coulomb shear strength resisting it. The factor of safety FS quantifies this competition — FS > 1 means stable, FS < 1 means failure.

Pore water pressure is the dominant triggering mechanism: by reducing effective normal stress, it reduces shear resistance without changing driving stress. Rainfall that saturates the soil column to even a fraction of its depth can reduce FS from comfortably stable to below 1 — particularly on slopes where root reinforcement has been removed by logging.

A probabilistic extension — treating soil parameters as distributions and computing $P(\text{FS} < 1)$ via Monte Carlo simulation — produces maps of failure probability that are more honest about uncertainty than single-value FS maps, and more useful for land-use planning and hazard communication.

**Key equations:**

$$FS = \frac{c' + c_r + (\rho_s g z \cos\beta - u)\tan\phi'}{\rho_s g z \sin\beta}$$

$$u = m \rho_w g z \cos\beta \quad \text{(pore pressure at relative saturation } m \text{)}$$

$$q^* = K_s \cdot m^* \cos\beta \quad \text{(critical rainfall for failure)}$$

---

## Math Refresher

**Resolving forces on an inclined plane.** If a weight $W$ acts vertically downward on a surface inclined at angle $\beta$, the component parallel to the surface is $W\sin\beta$ (the shear component, which drives sliding) and the component perpendicular to the surface is $W\cos\beta$ (the normal component, which is the basis of frictional resistance). This is the fundamental trigonometric decomposition that appears throughout structural mechanics, soil mechanics, and glaciology.

**Effective stress.** The Terzaghi effective stress principle states that the mechanical behaviour of a saturated porous medium is governed not by total stress $\sigma$ but by effective stress $\sigma' = \sigma - u$, where $u$ is pore water pressure. Physically: water cannot sustain shear, so the frictional resistance of a soil depends only on how hard the mineral grains press against each other — the total normal load minus the pressure the water exerts on the pore walls.

**Factor of safety and probability of failure.** FS is a deterministic quantity. Probability of failure $P_f$ requires a probabilistic analysis. As a rough heuristic: FS = 1.5 corresponds to $P_f < 5\%$ for typical soil variability; FS = 1.0 corresponds to $P_f \approx 50\%$; FS < 1.0 means failure has already occurred (or is occurring) in the deterministic model, though actual probability depends on the uncertainty in the parameters.
