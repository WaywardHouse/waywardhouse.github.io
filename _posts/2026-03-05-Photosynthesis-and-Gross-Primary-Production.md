---
layout: essay
title: "Photosynthesis and Gross Primary Production"
subtitle: "Light-use efficiency, GPP, NPP, NEP, and carbon use efficiency"
date: 2026-03-05
categories: modeling
series: computational-geography-laboratory
series_order: 118
cluster: "AN — Carbon Sinks"
cluster_order: 1
tags: [math, viz, essay]
math: true
viz: true
math_core:
  - photosynthesis stoichiometry
  - light-use efficiency model (LUE)
  - carbon flux budget (GPP → NPP → NEP)
  - seasonal integration
spatial_reasoning: NDVI and fAPAR as spatial GPP proxies
dynamics: diurnal and seasonal GPP variation
computation: Monteith LUE model
domain: biogeochemistry / plant ecology
difficulty: 2
prerequisites:
  - AM1
  - B5
notebook_url: https://github.com/waywardhouse/computational-geography-lab/tree/main/essays/AN1-photosynthesis-gpp
excerpt: >
  Terrestrial vegetation absorbs roughly 120 billion tonnes of CO₂ from the
  atmosphere each year through photosynthesis — more than three times the annual
  fossil fuel emission. Half of this is returned immediately by plant respiration.
  The net uptake, and its sensitivity to temperature, moisture, and light, is the
  largest single uncertainty in the global carbon budget. This essay derives the
  photosynthesis equation, models gross primary production using the Monteith
  light-use efficiency framework, defines GPP, NPP, NEP, and CUE, and quantifies
  seasonal variation across Alberta's biomes.
math_prerequisites: >
  Basic unit conversions (g to mol, W to J). Proportionality and ratios.
  The concept of a flux (quantity per unit area per unit time). Familiarity
  with NDVI (Essay E series).
---

Every summer morning, as the sun rises over the aspen parkland north of Edmonton, chloroplasts in millions of trembling aspen leaves begin absorbing carbon dioxide and converting it to sugar. By noon, on a warm clear August day, an aspen stand may be absorbing 8–12 g of CO₂ per square metre per day. By September, the leaves yellow; by October, photosynthesis effectively stops. The annual integral of this process — gross primary production — is the largest natural carbon flux on Earth.

---

## 1. The Question

How much CO₂ does vegetation absorb per unit area per year? How does this depend on light, temperature, and water availability? How much of the fixed carbon remains as net ecosystem carbon gain after plant and microbial respiration?

---

## 2. The Conceptual Model

Photosynthesis fixes atmospheric CO₂ into organic matter using light energy. The gross rate of this fixation — **Gross Primary Production (GPP)** — is the total carbon flux from atmosphere to vegetation. Plants immediately respire a fraction of this for their own metabolic needs (**autotrophic respiration, $R_a$**), leaving **Net Primary Production (NPP)** — the carbon available for growth, roots, and reproductive structures. Decomposers in the soil respire some of the dead organic matter (**heterotrophic respiration, $R_h$**), leaving **Net Ecosystem Production (NEP)** — the net carbon sink or source of the whole ecosystem.

---

## 3. Building the Mathematical Model

### 3.1 The Photosynthesis Equation

The idealised net photosynthesis equation:

$$6\,\text{CO}_2 + 6\,\text{H}_2\text{O} + \text{light energy} \to \text{C}_6\text{H}_{12}\text{O}_6 + 6\,\text{O}_2$$

One mole of glucose (180 g) is produced from 6 moles of CO₂ (6 × 44 = 264 g). Carbon mass ratio:

$$\frac{m_C \text{ fixed}}{m_{\text{CO}_2} \text{ absorbed}} = \frac{6 \times 12}{6 \times 44} = \frac{72}{264} = \frac{12}{44} = 0.2727$$

GPP is typically reported in units of g C m⁻² d⁻¹ or t C ha⁻¹ yr⁻¹. Converting observed CO₂ fluxes to carbon: multiply by 12/44.

The thermodynamic minimum energy requirement is 2870 kJ mol⁻¹ of glucose, but real photosynthesis requires about 8 moles of photons per mole of CO₂ fixed (quantum yield). The maximum theoretical quantum yield is thus 1/8 mol CO₂ per mole of photons = 0.125 mol/mol.

### 3.2 The Monteith Light-Use Efficiency Model

**Gross Primary Production** can be modelled with the **Monteith (1972, 1977) LUE model**:

$$\text{GPP} = \varepsilon \times \text{fAPAR} \times \text{APAR}_0 \times f(T) \times f(W)$$

where:
- $\varepsilon$ = maximum light-use efficiency [g C mol$_{\text{photon}}^{-1}$ or g C MJ$_{\text{PAR}}^{-1}$]
- fAPAR = fraction of absorbed photosynthetically active radiation (0–1)
- $\text{APAR}_0$ = incident PAR [MJ m⁻² d⁻¹ or mol$_{\text{photon}}$ m⁻² d⁻¹]
- $f(T)$ = temperature scalar (0–1), reducing $\varepsilon$ below optimum
- $f(W)$ = water stress scalar (0–1), reducing $\varepsilon$ under drought

**fAPAR** is directly related to NDVI (from satellite): $\text{fAPAR} \approx (1.14 \times \text{NDVI} - 0.03)$, clipped to [0, 1]. This makes satellite NDVI a spatial proxy for GPP.

**Temperature scalar** (simple form):

$$f(T) = \frac{(T - T_{\min})(T - T_{\max})}{(T - T_{\min})(T - T_{\max}) - (T - T_{\text{opt}})^2}$$

with typical values: $T_{\min} = 0°$C, $T_{\max} = 40°$C, $T_{\text{opt}} = 20°$C for temperate vegetation.

**Light response (rectangular hyperbola):** At the leaf level, photosynthesis saturates at high light:

$$A = A_{\max}\frac{\alpha_q I}{A_{\max} + \alpha_q I}$$

where $I$ = photon flux density, $\alpha_q$ = initial quantum yield, $A_{\max}$ = light-saturated rate. At ecosystem scale, this saturation is less pronounced because different leaf layers are illuminated at different intensities — the LUE model approximates the ecosystem-scale relationship as nearly linear.

### 3.3 The Carbon Flux Budget

$$\text{GPP} = \text{Total carbon fixed by photosynthesis}$$

$$\text{NPP} = \text{GPP} - R_a \quad \text{[Net Primary Production]}$$

$$\text{NEP} = \text{NPP} - R_h = \text{GPP} - R_a - R_h \quad \text{[Net Ecosystem Production]}$$

$$\text{NBP} = \text{NEP} - \text{Disturbances} \quad \text{[Net Biome Production]}$$

**Carbon Use Efficiency (CUE):**

$$\text{CUE} = \frac{\text{NPP}}{\text{GPP}} = 1 - \frac{R_a}{\text{GPP}}$$

A long-standing paradigm (Gifford 1994) proposed CUE ≈ 0.50 universally — half of GPP is used by plant respiration. More recent synthesis shows CUE varies from 0.30–0.70 depending on growth form and climate:

| Vegetation type | Typical CUE |
|---|---|
| Tropical rainforest | 0.30–0.40 |
| Temperate deciduous | 0.40–0.55 |
| Boreal forest | 0.45–0.55 |
| Temperate grassland | 0.55–0.65 |
| Agricultural crops | 0.45–0.60 |
| Tundra | 0.50–0.65 |

**Heterotrophic respiration and NEP sign convention:**

- NEP > 0: ecosystem is a carbon sink (more uptake than release)
- NEP < 0: ecosystem is a carbon source (more release than uptake)

Young, regrowing forests after disturbance typically have NEP < 0 (high $R_h$ from decomposing legacy carbon). Mature forests have NEP near zero or slightly positive. Young fast-growing forests have NEP > 0.

### 3.4 Annual GPP and Seasonal Integration

Annual GPP integrates the daily rates over the growing season:

$$\text{GPP}_{\text{annual}} = \sum_{d=1}^{365} \text{GPP}_d = \sum_{d=1}^{365} \varepsilon \times \text{fAPAR}(d) \times \text{PAR}(d) \times f(T_d) \times f(W_d)$$

For Alberta biomes:

| Biome | GPP (g C m⁻² yr⁻¹) | NPP (g C m⁻² yr⁻¹) | NEP (g C m⁻² yr⁻¹) |
|---|---|---|---|
| Boreal forest | 600–900 | 300–450 | −50 to +100 |
| Aspen parkland | 700–1000 | 380–550 | 0 to +150 |
| Prairie/grassland | 300–600 | 180–360 | −50 to +80 |
| Crop (wheat) | 500–700 | 250–350 | −200 to 0 (harvested) |
| Wetland/fen | 400–600 | 200–300 | +50 to +200 (peat accumulation) |

---

## 4. Worked Example by Hand

**Setting:** A mixed-wood boreal stand near Hinton, Alberta (53°N). July conditions:
- Incident PAR: 18 MJ m⁻² d⁻¹
- NDVI (from Landsat): 0.72 → fAPAR = 1.14 × 0.72 − 0.03 = 0.79
- Mean temperature: 16°C (near optimum), $f(T) = 0.92$
- No drought, $f(W) = 1.0$
- Maximum LUE for boreal deciduous: $\varepsilon = 1.0$ g C MJ$_{\text{PAR}}^{-1}$

**GPP (July day):**

$$\text{GPP} = 1.0 \times 0.79 \times 18 \times 0.92 \times 1.0 = 13.1 \text{ g C m}^{-2} \text{ d}^{-1}$$

**NPP** (CUE = 0.50):

$$\text{NPP} = 13.1 \times 0.50 = 6.55 \text{ g C m}^{-2} \text{ d}^{-1}$$

**Annual scaling** (assuming 140-day growing season with average $\text{GPP}_d = 6.0$ g C m⁻² d⁻¹):

$$\text{GPP}_{\text{annual}} = 140 \times 6.0 = 840 \text{ g C m}^{-2} \text{ yr}^{-1} = 8.4 \text{ t C ha}^{-1} \text{ yr}^{-1}$$

**NEP** assuming $R_h = 360$ g C m⁻² yr⁻¹ (soil respiration):

$$\text{NEP} = \text{GPP} - R_a - R_h = 840 - 420 - 360 = 60 \text{ g C m}^{-2} \text{ yr}^{-1}$$

This stand is a modest carbon sink: sequestering ~0.6 t C ha⁻¹ yr⁻¹, consistent with eddy covariance measurements at the nearby Boreas study sites.

---

## 5. Computational Implementation

```
function lue_gpp(par_mj, ndvi, T_mean, VPD_kPa, eps_max=1.0,
                 T_min=0, T_max=40, T_opt=20, VPD_max=3.0):
    fAPAR = clip(1.14 * ndvi - 0.03, 0, 1)
    
    # Temperature scalar
    if T_min < T_mean < T_max:
        fT = (T_mean-T_min)*(T_mean-T_max) / ((T_mean-T_min)*(T_mean-T_max) - (T_mean-T_opt)**2)
    else:
        fT = 0.0
    
    # Water/VPD scalar (linear from 1 at VPD=0 to 0 at VPD_max)
    fW = max(0, 1 - VPD_kPa / VPD_max)
    
    gpp = eps_max * fAPAR * par_mj * fT * fW
    return {'GPP': gpp, 'fAPAR': fAPAR, 'fT': fT, 'fW': fW}

function annual_carbon_budget(daily_gpp_array, CUE=0.5, Rh=360):
    GPP_annual = sum(daily_gpp_array)
    NPP_annual = GPP_annual * CUE
    NEP_annual = NPP_annual - Rh
    return GPP_annual, NPP_annual, NEP_annual
```

```{pyodide}
import numpy as np

def lue_gpp(par_mj, ndvi, T, eps_max=1.0, T_min=0, T_max=40, T_opt=20, VPD=1.0, VPD_max=3.0):
    fAPAR = np.clip(1.14 * ndvi - 0.03, 0, 1)
    # Temperature scalar
    if T_min < T < T_max:
        fT = (T-T_min)*(T-T_max) / ((T-T_min)*(T-T_max) - (T-T_opt)**2)
    else:
        fT = 0.0
    fW = max(0, 1 - VPD/VPD_max)
    return eps_max * fAPAR * par_mj * fT * fW, fAPAR, fT, fW

# Seasonal GPP for boreal Alberta (53°N)
# Simplified monthly PAR, temperature, NDVI, VPD
months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
par_monthly = [2, 4, 9, 14, 18, 21, 20, 17, 11, 6, 2, 1]    # MJ/m2/d
T_monthly   = [-15,-12,-5, 3,  11, 15, 17, 16, 10, 3, -7,-13]  # °C
ndvi_monthly= [0.20,0.20,0.22,0.30,0.62,0.72,0.76,0.72,0.60,0.38,0.24,0.20]
vpd_monthly = [0.2, 0.2, 0.4, 0.6, 0.9, 1.4, 1.6, 1.5, 1.0, 0.5, 0.3, 0.2]
days_per_month = [31,28,31,30,31,30,31,31,30,31,30,31]

print(f"{'Month':>5} {'PAR':>6} {'T(°C)':>7} {'NDVI':>6} {'fAPAR':>7} {'fT':>5} {'GPP':>8} {'GPP_mo':>9}")
print(f"{'':>5} {'MJ/d':>6} {'':>7} {'':>6} {'':>7} {'':>5} {'gC/m2/d':>8} {'gC/m2/mo':>9}")
print("-"*65)

annual_gpp = 0
for i, m in enumerate(months):
    gpp_d, fAPAR, fT, fW = lue_gpp(par_monthly[i], ndvi_monthly[i], T_monthly[i], vpd=vpd_monthly[i])
    gpp_mo = gpp_d * days_per_month[i]
    annual_gpp += gpp_mo
    print(f"{m:>5} {par_monthly[i]:>6.0f} {T_monthly[i]:>7.0f} {ndvi_monthly[i]:>6.2f} "
          f"{fAPAR:>7.2f} {fT:>5.2f} {gpp_d:>8.2f} {gpp_mo:>9.1f}")

print(f"\nAnnual GPP: {annual_gpp:.0f} g C m⁻² yr⁻¹ = {annual_gpp/100:.2f} t C ha⁻¹ yr⁻¹")

CUE = 0.50
Rh  = 350  # g C/m2/yr (soil + microbial respiration)
NPP = annual_gpp * CUE
NEP = NPP - Rh
print(f"NPP (CUE={CUE}): {NPP:.0f} g C m⁻² yr⁻¹")
print(f"NEP: {NEP:.0f} g C m⁻² yr⁻¹  ({'sink' if NEP>0 else 'source'})")
```

---

## 6. Visualization

<div data-viz="echarts" style="height:420px" data-options='{
  "title": {"text": "Seasonal GPP, NPP, and Ecosystem Respiration — Boreal Alberta (53°N)", "textStyle": {"fontSize": 14}},
  "tooltip": {"trigger": "axis"},
  "legend": {"data": ["GPP (g C/m²/d)","Ra (g C/m²/d)","Rh (g C/m²/d)","NEP (g C/m²/d)"], "bottom": 0},
  "xAxis": {"data": ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]},
  "yAxis": {"name": "g C m⁻² d⁻¹", "nameLocation": "middle", "nameGap": 45},
  "series": [
    {"name": "GPP (g C/m²/d)", "type": "bar",
     "itemStyle": {"color": "#2E7D32"},
     "data": [0.0, 0.0, 0.5, 2.5, 6.5, 9.5, 10.5, 9.0, 5.0, 1.5, 0.1, 0.0]},
    {"name": "Ra (g C/m²/d)", "type": "bar", "stack": "resp",
     "itemStyle": {"color": "#F57F17"},
     "data": [0.3, 0.3, 0.5, 1.2, 3.2, 4.8, 5.3, 4.5, 2.5, 0.8, 0.4, 0.3]},
    {"name": "Rh (g C/m²/d)", "type": "bar", "stack": "resp",
     "itemStyle": {"color": "#B71C1C"},
     "data": [0.3, 0.3, 0.4, 0.7, 1.0, 1.2, 1.3, 1.2, 1.0, 0.7, 0.4, 0.3]},
    {"name": "NEP (g C/m²/d)", "type": "line",
     "itemStyle": {"color": "#1565C0"},
     "data": [-0.6,-0.6,-0.4,0.6,2.3,3.5,3.9,3.3,1.5,0.0,-0.7,-0.6]}
  ]
}'></div>

The boreal forest is a carbon source (NEP < 0) from November through March when ecosystem respiration exceeds GPP. The ecosystem switches to a sink in April–May as photosynthesis accelerates faster than respiration (photosynthesis has a stronger temperature response at low temperatures). Peak sink activity occurs in June–August; the growing season lasts approximately May–September.

---

## 7. Interpretation

The global terrestrial GPP of ~120 Gt CO₂ yr⁻¹ (33 Gt C yr⁻¹) dwarfs fossil fuel emissions (~37 Gt CO₂ yr⁻¹). The atmosphere does not net accumulate this enormous photosynthetic uptake because terrestrial respiration ($R_a + R_h$) returns nearly the same amount — the terrestrial biosphere is approximately in balance, with a small net sink of ~3 Gt CO₂ yr⁻¹ (the residual "land sink" in the global carbon budget). Small changes in the balance between photosynthesis and respiration — driven by temperature, moisture, or land use change — can have CO₂ consequences comparable to human emissions.

The MODIS MOD17 product provides global 8-day GPP at 500 m resolution by applying the Monteith LUE model with NDVI-derived fAPAR and meteorological forcings from NASA's Global Modelling and Assimilation Office. It is the most widely used global GPP dataset, validated against ~150 eddy covariance towers worldwide, including several in Alberta's boreal zone (BERMS network).

---

## 8. What Could Go Wrong?

**Eddy covariance gap-filling errors accumulate.** Net Ecosystem Exchange (NEE, the measured quantity, equivalent to −NEP) is measured continuously by eddy covariance towers. Gaps (fog, rain, instrument failure) require statistical gap-filling — typically with look-up tables or neural networks trained on daytime data. Annual sums are sensitive to how nighttime gaps are filled; different gap-filling methods can produce NEP estimates differing by ±20–30 g C m⁻² yr⁻¹ — similar in magnitude to the annual NEP itself for near-neutral ecosystems.

**LUE $\varepsilon$ is not constant.** The Monteith model treats $\varepsilon_{\max}$ as a species- or biome-specific constant. In reality, $\varepsilon$ varies with nitrogen content (fertilised crops have higher $\varepsilon$), leaf age (older leaves have lower $\varepsilon$), and atmospheric CO₂ concentration (elevated CO₂ can increase $\varepsilon$ under certain conditions). Applying a fixed $\varepsilon$ for mixed-age, mixed-species landscapes introduces systematic biases.

**CUE is not universally 0.50.** The assumption CUE = 0.50 is useful for global estimates but masks large variation. Tropical forests under water stress may have CUE < 0.35 because maintenance respiration of large biomass is high. Young fast-growing crops may have CUE > 0.60. Using the universal value for specific ecosystem types introduces errors of 10–40% in NPP estimates.

---

## 9. Summary

The photosynthesis equation $6\text{CO}_2 + 6\text{H}_2\text{O} \to \text{C}_6\text{H}_{12}\text{O}_6 + 6\text{O}_2$ fixes 12/44 = 0.273 g C per g CO₂ absorbed. The Monteith LUE model expresses GPP as:

$$\text{GPP} = \varepsilon \times \text{fAPAR} \times \text{PAR} \times f(T) \times f(W)$$

where fAPAR links to satellite NDVI. Carbon flux hierarchy: GPP → NPP (= GPP × CUE) → NEP (= NPP − $R_h$). CUE ≈ 0.50 for many ecosystems; NEP > 0 = sink, NEP < 0 = source.

Boreal Alberta forests are carbon sinks in summer (May–September) and sources in winter; annual GPP ≈ 700–900 g C m⁻² yr⁻¹, with NEP of −50 to +150 g C m⁻² yr⁻¹ depending on stand age, disturbance history, and climate.

---

## Math Refresher

**Fluxes and their units.** A carbon flux is a rate of transfer: grams of carbon per unit area per unit time. Common units in ecosystem science are g C m⁻² d⁻¹ (daily tower measurement), g C m⁻² yr⁻¹ (annual budget), or t C ha⁻¹ yr⁻¹ (land management scale). Converting between them: 1 g m⁻² yr⁻¹ = 0.01 t ha⁻¹ yr⁻¹ (because 1 ha = 10,000 m² and 1 t = 10⁶ g, so the ratio is 10⁶/10⁴ = 100 — divide g/m² by 100 to get t/ha). The annual integral of daily fluxes sums over 365 days: $\text{Annual} = \sum_{d=1}^{365} \text{GPP}_d \approx \bar{\text{GPP}} \times N_{\text{growing days}}$. Global totals use Pg C yr⁻¹ (= 10¹⁵ g C yr⁻¹): 33 Pg C yr⁻¹ = 33 × 10¹⁵ g C yr⁻¹ = 33 Gt C yr⁻¹.
