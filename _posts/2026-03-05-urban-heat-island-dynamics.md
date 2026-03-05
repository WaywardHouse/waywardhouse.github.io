---
layout: essay
title: "Urban Heat Island Dynamics"
subtitle: "Surface energy balance, anthropogenic heat, and the thermal penalty of the built environment"
date: 2026-03-05
categories: modelling
series: computational-geography-laboratory
series_order: 95
cluster: "AJ — Urban Climate and Air Quality"
cluster_order: 1
tags: [math, viz, essay]
math: true
viz: true
math_core:
  - energy balance
  - Stefan-Boltzmann law
  - exponential decay
  - dimensional analysis
spatial_reasoning: surface energy partitioning
dynamics: diurnal thermal cycling
computation: UHI intensity prediction
domain: urban climatology
difficulty: 3
prerequisites:
  - B5
  - B6
notebook_url: https://github.com/waywardhouse/computational-geography-lab/tree/main/essays/AJ1-uhi
excerpt: >
  Cities are warmer than the countryside that surrounds them — by 2–8°C on calm,
  clear nights in large metropolitan areas. That temperature difference, the urban
  heat island, is not incidental: it is the thermodynamic consequence of replacing
  vegetation with impervious surfaces, suppressing evaporation, trapping longwave
  radiation, and releasing anthropogenic heat. This essay derives the urban surface
  energy balance, quantifies each mechanism, and evaluates the physics of mitigation
  strategies from cool roofs to urban forests.
math_prerequisites: >
  The concept of energy flux (W m⁻²) and the surface energy balance. Basic algebra.
  The Stefan-Boltzmann law is introduced from scratch. Exponential functions from
  Essay A3.
---

On a calm summer night in Phoenix, Arizona, the city centre is routinely 8–10°C warmer than the desert 30 km away. The same phenomenon plays out at smaller magnitude in every city on Earth — a 1°C difference in a small prairie town, 6°C in Tokyo, 3–5°C in Calgary or Edmonton on the coldest January nights when furnaces run full tilt. The urban heat island (UHI) is not a curiosity. It is a public health hazard: during the August 2003 European heat wave, excess mortality was concentrated in Paris's densest arrondissements, where the UHI amplified synoptic heat stress by several critical degrees.

Understanding the UHI quantitatively means understanding the surface energy balance. A city is not simply a hot version of the surrounding countryside — it is a fundamentally different thermodynamic system that absorbs, stores, and releases energy on a different schedule.

---

## 1. The Question

Why are cities warmer than their surroundings? Which physical mechanisms contribute, and in what proportion? How can we predict UHI intensity from measurable urban properties, and which mitigation strategies have the strongest physical basis?

---

## 2. The Conceptual Model

The surface energy balance describes how incoming radiation is partitioned among sensible heat (warming the air), latent heat (evaporation), ground storage, and longwave emission. Cities alter every term:

- **Albedo reduction:** dark roofs and asphalt absorb more solar radiation than vegetated surfaces
- **Evaporation suppression:** impervious surfaces prevent evaporation, forcing absorbed energy into sensible heat
- **Thermal mass increase:** dense building materials store heat by day and release it at night, suppressing nocturnal cooling
- **Anthropogenic heat:** combustion and electricity add heat with no rural counterpart
- **Sky view factor reduction:** buildings trap longwave radiation that would otherwise escape to space
- **Roughness increase:** buildings enhance turbulent mixing but reduce street-level wind speeds

These six mechanisms interact. Their relative importance varies by climate, season, and city form.

---

## 3. Building the Mathematical Model

### 3.1 The Surface Energy Balance

At any surface, net radiation $Q^*$ [W m⁻²] must balance the available heat pathways:

$$Q^* = Q_H + Q_E + \Delta Q_S + Q_F$$

where $Q_H$ is sensible heat flux to the atmosphere, $Q_E$ is latent heat flux (evaporation), $\Delta Q_S$ is net heat storage in the urban fabric, and $Q_F$ is anthropogenic heat release. Net radiation is:

$$Q^* = (1 - \alpha)K_\downarrow + L_\downarrow - L_\uparrow$$

where $\alpha$ is surface albedo, $K_\downarrow$ is incoming shortwave [W m⁻²], $L_\downarrow$ is incoming atmospheric longwave, and $L_\uparrow$ is outgoing longwave emission from the surface:

$$L_\uparrow = \varepsilon_s \sigma T_s^4$$

Here $\varepsilon_s \approx 0.95$–$0.98$ is surface emissivity, $\sigma = 5.67 \times 10^{-8}$ W m⁻² K⁻⁴ is the Stefan-Boltzmann constant, and $T_s$ is surface temperature in Kelvin.

Typical midday values in summer:

| Term | Rural | Urban dense |
|---|---|---|
| $\alpha$ | 0.18–0.25 | 0.10–0.18 |
| $Q^*$ (W m⁻²) | 420–480 | 460–540 |
| $Q_H / Q^*$ | 0.25–0.35 | 0.55–0.75 |
| $Q_E / Q^*$ | 0.45–0.60 | 0.10–0.20 |
| $\Delta Q_S / Q^*$ | 0.10–0.15 | 0.20–0.35 |

### 3.2 The Bowen Ratio and Evaporation Suppression

The **Bowen ratio** $\beta = Q_H / Q_E$ summarises the sensible-to-latent partition. For vegetated rural surfaces in summer, $\beta \approx 0.3$–$0.6$. For dense impervious urban surfaces, $\beta \approx 3$–$10$.

If the latent heat pathway is suppressed by impervious fraction $f_i$, the increase in sensible heat flux is approximately:

$$\Delta Q_H \approx f_i \cdot Q_{E,\text{rural}}$$

For $f_i = 0.65$ and $Q_{E,\text{rural}} = 180$ W m⁻²: $\Delta Q_H \approx 117$ W m⁻². This extra 117 W m⁻² of sensible heat must warm the air — and does so by raising the surface and near-surface temperature. This single mechanism accounts for roughly half of the typical daytime UHI forcing in temperate cities.

### 3.3 Anthropogenic Heat Flux

Anthropogenic heat $Q_F$ is the energy released by all human activities per unit city area. It is estimated from energy consumption statistics:

$$Q_F = \frac{E_{\text{fuel}} + E_{\text{electricity}}}{A_{\text{city}}}$$

Representative values:

| City | Season | $Q_F$ (W m⁻²) |
|---|---|---|
| Manhattan | Annual | 100–300 |
| Tokyo | Summer | 50–90 |
| London | Annual | 15–40 |
| Edmonton | Winter | 40–80 |
| Phoenix | Summer | 20–45 |

Edmonton's winter $Q_F$ deserves attention: at 40–80 W m⁻² from space heating, it rivals or exceeds the net solar radiation in January. Edmonton's UHI is therefore **strongest in winter** — the opposite of most sunbelt cities. This counterintuitive result follows directly from the energy balance: when $K_\downarrow$ is small and $Q_F$ is large, the UHI is anthropogenic heat-dominated.

The spatial distribution of $Q_F$ is strongly heterogeneous. Dense commercial cores and industrial districts show $Q_F$ an order of magnitude above residential suburbs. Traffic corridors generate linear filaments of elevated $Q_F$ proportional to vehicle counts and fuel consumption rates.

### 3.4 Sky View Factor and Nocturnal Cooling Suppression

The **sky view factor** $\psi_s$ [0–1] is the fraction of the upper hemisphere visible as sky from a point at street level. An open rural surface has $\psi_s = 1$; a narrow street canyon may have $\psi_s = 0.2$–$0.4$.

Nocturnal cooling occurs by longwave radiation to the sky. Net longwave loss from the surface:

$$L_{\text{net}} = \psi_s \varepsilon_s \sigma (T_s^4 - T_{\text{sky}}^4)$$

A surface with $\psi_s = 0.3$ loses only 30% of the longwave radiation that the same surface in an open field would emit. The remaining 70% is absorbed and re-emitted by surrounding buildings, staying within the urban system rather than escaping to space.

The nocturnal cooling rate for the surface obeys:

$$\frac{dT_s}{dt} = -\frac{\psi_s \varepsilon_s \sigma \cdot 4\bar{T}^3}{\rho c_p d_{\text{eff}}} (T_s - T_{\text{sky}}) \equiv -\frac{T_s - T_{\text{sky}}}{\tau_{\text{cool}}}$$

where $\tau_{\text{cool}} = \rho c_p d_{\text{eff}} / (4\psi_s \varepsilon_s \sigma \bar{T}^3)$ is the cooling time constant. As $\psi_s$ decreases, $\tau_{\text{cool}}$ increases — urban surfaces cool more slowly, maintaining higher temperatures through the night. This is the dominant mechanism for **nocturnal UHI intensity**: calm, clear nights produce maximum UHI because they maximise radiative cooling potential, which the urban surface cannot realise due to building obstruction of the sky.

The UHI is systematically strongest on calm, clear nights and weakest on windy, cloudy days — a pattern observed in every city on Earth, and a direct consequence of this sky view factor mechanism.

### 3.5 Thermal Mass and Heat Storage

Urban materials store more daytime heat per unit plan area than rural soils, releasing it after sunset to maintain elevated night temperatures.

| Material | $\rho c_p$ (MJ m⁻³ K⁻¹) | $\kappa = k/\rho c_p$ (10⁻⁷ m² s⁻¹) |
|---|---|---|
| Concrete | 2.11 | 7.2 |
| Asphalt | 1.94 | 3.9 |
| Dry soil | 1.00 | 3.0 |
| Moist soil | 2.50 | 6.0 |

The **diurnal skin depth** — how deep a diurnal temperature wave penetrates — is:

$$z_d = \sqrt{\frac{2\kappa}{\omega}}$$

where $\omega = 2\pi / 86400 = 7.27 \times 10^{-5}$ rad s⁻¹. For concrete ($\kappa = 7.2 \times 10^{-7}$ m² s⁻¹):

$$z_d = \sqrt{\frac{2 \times 7.2 \times 10^{-7}}{7.27 \times 10^{-5}}} = \sqrt{0.0198} = 0.141 \text{ m}$$

The heat stored in the top 14 cm of concrete per unit area per day is $\Delta Q_S = \rho c_p z_d \Delta T_{\text{surface}} \approx 2.11 \times 10^6 \times 0.141 \times 10 = 2.97 \text{ MJ m}^{-2}$. Averaged over the 12-hour night, this releases $\approx 69$ W m⁻² — a substantial heat source that prevents the urban surface from cooling as rapidly as rural soil.

### 3.6 UHI Intensity Prediction

**Oke (1973) empirical formula** for maximum UHI intensity $\Delta T_{u-r}$ in mid-latitude cities:

$$\Delta T_{u-r,\max} = 2.01 \log_{10} P - 4.06 \quad [°\text{C}]$$

where $P$ is city population. This captures the bulk effect of increasing urban density with population.

A more physically grounded predictor uses sky view factor and impervious fraction:

$$\Delta T_{u-r} \approx A(1 - \psi_s) + B f_i + C \frac{Q_F}{Q^*}$$

Typical North American coefficients: $A \approx 3°\text{C}$, $B \approx 2°\text{C}$, $C \approx 2°\text{C}$ per unit ratio. The three terms represent the sky-view, evaporation-suppression, and anthropogenic mechanisms respectively.

### 3.7 Green Infrastructure Mitigation

**Cool roofs** increase albedo from $\alpha \approx 0.10$ (dark) to $\alpha \approx 0.65$–$0.80$ (white). Reduction in absorbed solar radiation per unit roof area:

$$\Delta Q_{\text{cool roof}} = \Delta\alpha \cdot K_\downarrow$$

For $\Delta\alpha = 0.55$ and summer noon $K_\downarrow = 600$ W m⁻²: $\Delta Q = 330$ W m⁻². City-scale effect depends on roof fraction of plan area (typically 20–35%). A city with 25% roof coverage achieves $0.25 \times 330 = 82.5$ W m⁻² average reduction in absorbed radiation — comparable to removing a large fraction of the UHI forcing.

Cool roofs are **less effective in cold climates**: in winter, dark roofs usefully absorb solar radiation for space heating. A Canadian analysis must account for the seasonal sign reversal.

**Urban trees** cool through two pathways: shading (blocking $K_\downarrow$ from reaching the surface) and evapotranspiration (converting $Q_H$ to $Q_E$). A mature deciduous tree transpires 100–400 L day⁻¹. Converting to heat flux over the canopy projection area $A_{\text{canopy}}$:

$$Q_E^{\text{tree}} = \frac{\dot{m}_{ET} L_v}{A_{\text{canopy}}}$$

For $\dot{m} = 200$ L day⁻¹ = $2.31 \times 10^{-3}$ kg s⁻¹, $L_v = 2.45 \times 10^6$ J kg⁻¹, $A_{\text{canopy}} = 25$ m²:

$$Q_E^{\text{tree}} = \frac{2.31 \times 10^{-3} \times 2.45 \times 10^6}{25} = 226 \text{ W m}^{-2}$$

Under-canopy temperatures are typically 2–5°C cooler than adjacent sun-exposed surfaces.

**Park cool island** — the cooling effect extends beyond the park boundary, decaying approximately exponentially with distance:

$$\Delta T_{\text{park}}(d) = \Delta T_{\max} e^{-d/d_0}$$

where $\Delta T_{\max} \approx 1$–$4$°C at the park edge and $d_0 \approx 100$–$400$ m is the e-folding decay distance. Parks larger than 1 ha typically produce measurable cooling; parks larger than 10 ha produce city-scale microclimate effects extending hundreds of metres into surrounding streets.

---

## 4. Worked Example by Hand

**Setting:** Edmonton, Alberta (pop. ~1 million). Estimate maximum nocturnal UHI intensity and evaluate a cool roof programme covering 25% of plan area.

**Given:**
- $f_i = 0.55$, $\psi_s = 0.55$, $Q_F = 55$ W m⁻² (winter average)
- $K_\downarrow = 130$ W m⁻² (winter average), $Q^* \approx 70$ W m⁻² (winter net radiation)
- Population: 1,000,000

**Step 1: Oke empirical UHI maximum**

$$\Delta T_{\max} = 2.01 \times \log_{10}(10^6) - 4.06 = 2.01 \times 6 - 4.06 = 12.06 - 4.06 = 8.0°\text{C}$$

This is the theoretical maximum on the calmest, clearest night.

**Step 2: Physical estimate (winter)**

$$\Delta T \approx 3(1 - 0.55) + 2(0.55) + 2\left(\frac{55}{70}\right)$$
$$= 1.35 + 1.10 + 1.57 = 4.0°\text{C}$$

The anthropogenic heat term ($C \cdot Q_F/Q^* = 1.57°\text{C}$) is the largest single contributor in winter — reflecting Edmonton's heating-dominated climate.

**Step 3: Cool roof benefit (summer)**

Summer: $K_\downarrow = 480$ W m⁻², $\Delta\alpha = 0.50$, roof fraction = 0.25:

$$\Delta Q_{\text{city}} = 0.25 \times 0.50 \times 480 = 60 \text{ W m}^{-2}$$

UHI forcing (summer) $\approx Q_F + \Delta Q_H \approx 25 + 90 = 115$ W m⁻²

Reduction: $60/115 = 52\%$ of UHI forcing — but this analysis ignores the winter heating penalty. For Edmonton, the net annual benefit of cool roofs is substantially lower than the summer benefit alone.

---

## 5. Computational Implementation

```
function Q_net(alpha, K_down, L_down, T_s, eps=0.95):
    sigma = 5.67e-8
    L_up = eps * sigma * T_s**4
    return (1 - alpha) * K_down + L_down - L_up

function uhi_predict(f_i, psi_s, Q_F, Q_star, A=3, B=2, C=2):
    return A * (1 - psi_s) + B * f_i + C * (Q_F / Q_star)

function oke_uhi(population):
    return max(0, 2.01 * log10(population) - 4.06)

function park_cooling(d, dT_max, d0):
    return dT_max * exp(-d / d0)

function cool_roof_forcing(delta_alpha, roof_fraction, K_down):
    return delta_alpha * roof_fraction * K_down
```

```{pyodide}
import numpy as np

sigma = 5.67e-8

def oke_uhi(pop):
    return max(0, 2.01 * np.log10(pop) - 4.06)

def uhi_physical(fi, psi, QF, Qs, A=3, B=2, C=2):
    return A*(1-psi) + B*fi + C*(QF/Qs)

def park_cooling(d, dT_max=2.5, d0=200):
    return dT_max * np.exp(-d/d0)

# Edmonton UHI
print("Edmonton UHI estimates:")
print(f"  Oke (1973) max: {oke_uhi(1e6):.1f}°C")
print(f"  Physical (winter): {uhi_physical(0.55, 0.55, 55, 70):.1f}°C")
print(f"  Physical (summer): {uhi_physical(0.55, 0.55, 25, 200):.1f}°C")

# Cool roof
cr = 0.25 * 0.50 * 480
print(f"\nCool roof city forcing (summer): {cr:.0f} W/m²")

# Oke UHI vs city size
print("\nUHI max by city size (Oke 1973):")
for pop in [10_000, 100_000, 500_000, 1_000_000, 5_000_000]:
    print(f"  {pop:>9,.0f} people: {oke_uhi(pop):.1f}°C")

# Park cooling
print("\nPark cool island extent:")
for d in [0, 100, 200, 400, 800]:
    print(f"  {d:4d}m from park: {park_cooling(d):.2f}°C")
```

---

## 6. Visualization

<div data-viz="echarts" style="height:420px" data-options='{
  "title": {"text": "Surface Energy Balance: Rural vs Urban (summer midday)", "textStyle": {"fontSize": 14}},
  "tooltip": {"trigger": "axis"},
  "legend": {"data": ["Rural vegetated", "Urban dense"], "bottom": 0},
  "xAxis": {"type": "category",
    "data": ["Net radiation Q*", "Sensible QH", "Latent QE", "Storage ΔQS", "Anthropogenic QF"],
    "axisLabel": {"rotate": 12}},
  "yAxis": {"name": "Energy flux (W m⁻²)", "nameLocation": "middle", "nameGap": 50, "min": 0, "max": 580},
  "series": [
    {"name": "Rural vegetated", "type": "bar",
     "data": [
       {"value": 445, "itemStyle": {"color": "#FFC107"}},
       {"value": 133, "itemStyle": {"color": "#FF7043"}},
       {"value": 267, "itemStyle": {"color": "#42A5F5"}},
       {"value": 45,  "itemStyle": {"color": "#8D6E63"}},
       {"value": 2,   "itemStyle": {"color": "#BDBDBD"}}
     ]},
    {"name": "Urban dense", "type": "bar",
     "data": [
       {"value": 510, "itemStyle": {"color": "#FFA000"}},
       {"value": 357, "itemStyle": {"color": "#E53935"}},
       {"value": 51,  "itemStyle": {"color": "#1E88E5"}},
       {"value": 42,  "itemStyle": {"color": "#5D4037"}},
       {"value": 60,  "itemStyle": {"color": "#757575"}}
     ]}
  ]
}'></div>

The energy balance shift from rural to urban is primarily the collapse of $Q_E$ (latent heat) and the corresponding rise in $Q_H$ (sensible heat). Rural areas route ~60% of net radiation into evaporation; dense urban areas route less than 10%. That additional ~200 W m⁻² of sensible heat directly warms the urban atmosphere. The anthropogenic term adds a further 60 W m⁻² with no rural analogue.

---

## 7. Interpretation

The UHI is not a single phenomenon — it is the superposition of six mechanisms operating on different timescales. During the day, impervious surface albedo and suppressed evaporation dominate. At night, sky view factor and thermal mass release dominate. On the annual scale in cold climates, anthropogenic heat dominates in winter. Effective UHI management requires identifying which mechanism dominates in a given city and targeting interventions accordingly.

This mechanistic understanding has important policy implications. Cool roofs are the correct intervention in sun-rich, warm climates (Phoenix, Los Angeles, Singapore) but may increase winter heating demand in cold climates (Edmonton, Helsinki) if applied to buildings that currently benefit from passive solar gain. Urban tree planting is most effective in warm, humid climates where ET rates are high; in arid cities, the water demand for irrigation may offset the climate benefit. Sky view factor improvements through setback requirements and building height limits have the strongest effect in dense canyon-like city centres.

The public health dimension is direct. During heat waves, the UHI adds to synoptic heat stress. The 2003 Paris heat wave killed approximately 14,000 people in France; the 2021 Pacific Northwest heat dome killed 619 in British Columbia, with deaths concentrated in dense urban neighbourhoods without air conditioning. Under climate projections, the combination of background warming and UHI means that cities will experience heat stress conditions that would historically have been fatal with increasing frequency — making UHI mitigation a public health intervention as much as a climate one.

---

## 8. What Could Go Wrong?

**The Oke formula is empirical and context-dependent.** Calibrated on mid-latitude North American and European cities, it overestimates UHI in coastal cities (sea breezes suppress the effect) and in cities with high rural Bowen ratios (arid surroundings already have low evaporation, reducing the rural-urban contrast). It should be treated as a first approximation, not a prediction.

**Cool roofs have a winter heating penalty in cold climates.** The analysis above calculates only the summer benefit. In Edmonton, a cool roof that saves 60 W m⁻² of cooling energy in July also costs roughly 30–40 W m⁻² of heating energy in January. Net annual energy balance and net carbon balance depend on the grid electricity source and the heating fuel mix.

**Urban trees require water.** Evapotranspirative cooling requires available soil moisture. In drought conditions or on fully paved surfaces with no infiltration opportunity, trees transpire at a fraction of their potential rate and the cooling benefit is reduced to shading alone (~30–50% of the full benefit). Urban irrigation of street trees in arid cities may consume more water than the climate benefit justifies.

**The sky view factor varies enormously within a city.** A city-average $\psi_s = 0.55$ masks values ranging from 0.15 in dense downtown canyons to 0.95 in suburban cul-de-sacs. The UHI is not spatially uniform — it is a field with strong gradients that concentrates heat in exactly the dense, low-income neighbourhoods that are least likely to have air conditioning and most vulnerable to heat stress.

---

## 9. Summary

The urban heat island arises from four interacting modifications to the surface energy balance: increased net radiation absorption (lower albedo, reduced sky view factor); suppressed evaporation (impervious surfaces); elevated thermal mass (dense building materials); and added anthropogenic heat (combustion, electricity). Together these raise urban temperatures 2–8°C above rural surroundings, with maximum intensity on calm, clear nights when radiative cooling is most strongly suppressed by building geometry.

Mitigation strategies target specific mechanisms: cool roofs reduce absorbed solar; urban trees restore the evapotranspiration pathway; parks create decaying cool islands extending hundreds of metres; building setbacks and sky view factor preservation reduce nocturnal trapping. Strategy selection must be matched to the dominant local mechanism and the seasonal climate context.

**Key equations:**

$$Q^* = (1-\alpha)K_\downarrow + L_\downarrow - \varepsilon_s\sigma T_s^4$$

$$Q^* = Q_H + Q_E + \Delta Q_S + Q_F$$

$$\Delta T_{u-r,\max} = 2.01\log_{10}P - 4.06 \quad \text{[Oke 1973]}$$

$$z_d = \sqrt{2\kappa/\omega} \quad \text{[diurnal skin depth]}$$

$$\Delta T_{\text{park}}(d) = \Delta T_{\max} e^{-d/d_0}$$

---

## Math Refresher

**The Stefan-Boltzmann law.** Every object above absolute zero emits electromagnetic radiation. The total power per unit area is $L = \varepsilon\sigma T^4$, with $\sigma = 5.67 \times 10^{-8}$ W m⁻² K⁻⁴ and $T$ in Kelvin. The $T^4$ dependence makes emission very sensitive to temperature: increasing $T$ from 280 K to 300 K (a 7% rise) increases emission by $(300/280)^4 - 1 = 32\%$. The key practical implication: a warm urban surface emits substantially more longwave radiation than the cool rural surface it replaced, but this extra emission is partially re-absorbed by surrounding buildings if $\psi_s$ is small — the building canyon recirculates longwave energy rather than allowing it to escape.

**Bowen ratio and energy partitioning.** If $Q^*$ is fixed and $\beta = Q_H/Q_E$, then $Q_H = \beta Q^*/(\beta+1)$ and $Q_E = Q^*/(\beta+1)$. As $\beta \to \infty$ (dry impervious surface), all net radiation goes to sensible heat. As $\beta \to 0$ (open water), all goes to evaporation. The Bowen ratio is a single dimensionless number that summarises the entire heat partition — a powerful compression of complex land surface physics into one measurable parameter.
