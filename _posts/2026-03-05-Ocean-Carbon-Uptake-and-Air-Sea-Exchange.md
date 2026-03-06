---
layout: essay
title: "Ocean Carbon Uptake and Air-Sea Exchange"
subtitle: "Henry's Law, solubility pump, biological pump, and gas exchange velocity"
date: 2026-03-05
categories: modeling
series: computational-geography-laboratory
series_order: 119
cluster: "AN — Carbon Sinks"
cluster_order: 2
tags: [math, viz, essay]
math: true
viz: true
math_core:
  - Henry's Law and gas solubility
  - piston velocity and gas exchange
  - ocean carbon chemistry (DIC, alkalinity)
  - temperature dependence of solubility
spatial_reasoning: spatial patterns of ocean CO₂ uptake
dynamics: solubility pump and biological pump — two mechanisms
computation: air-sea CO₂ flux calculation
domain: ocean biogeochemistry / carbon cycle
difficulty: 3
prerequisites:
  - A3
  - B5
notebook_url: https://github.com/waywardhouse/computational-geography-lab/tree/main/essays/AN2-ocean-carbon
excerpt: >
  The ocean has absorbed approximately 28% of all anthropogenic CO₂ emissions
  since industrialisation — about 170 billion tonnes of carbon. Without this
  buffering, atmospheric CO₂ would be ~60 ppm higher today. The ocean's uptake
  capacity is governed by physical chemistry (Henry's Law and carbonate buffering),
  physical transport (the solubility pump), and biological production (the
  biological pump). This essay derives the air-sea CO₂ flux from Henry's Law,
  explains why warm oceans outgas and cold oceans absorb, and quantifies the
  temperature sensitivity of ocean uptake capacity.
math_prerequisites: >
  Proportionality and ratios. Exponential relationships. The concept of
  concentration and partial pressure. Equation A3 (exponential decay).
---

At latitude 60°N in the North Atlantic, surface ocean water is cold — around 5–8°C. Cold water dissolves more CO₂ than warm water, and as water cools while drifting poleward, it absorbs CO₂ from the atmosphere. It then sinks — dense, cold, CO₂-rich water descends to the deep ocean in the North Atlantic Deep Water formation, carrying that carbon into storage for centuries. In the tropics, the reverse occurs: upwelled deep water warms at the surface, CO₂ becomes less soluble, and the ocean outgasses. The net of these processes constitutes the **ocean carbon sink** — roughly 10 Gt CO₂ yr⁻¹ in recent decades.

---

## 1. The Question

How much CO₂ does the ocean absorb from the atmosphere, and what controls this? How does temperature affect the ocean's capacity to hold dissolved carbon? What are the solubility pump and biological pump, and how much do they each contribute?

---

## 2. The Conceptual Model

CO₂ exchange at the ocean surface is driven by the difference between atmospheric CO₂ partial pressure ($p\text{CO}_{2,\text{atm}}$) and oceanic surface CO₂ partial pressure ($p\text{CO}_{2,\text{sw}}$). When $p\text{CO}_{2,\text{atm}} > p\text{CO}_{2,\text{sw}}$, the ocean absorbs CO₂. The rate depends on the partial pressure difference and a gas exchange velocity $k_w$ that depends on wind speed and sea surface conditions.

---

## 3. Building the Mathematical Model

### 3.1 Henry's Law and CO₂ Solubility

The dissolution of CO₂ in seawater follows Henry's Law:

$$[\text{CO}_2]_{\text{aq}} = K_H \times p\text{CO}_2$$

where $K_H$ is Henry's volatility constant [mol L⁻¹ atm⁻¹] and $p\text{CO}_2$ is the partial pressure of CO₂ in the gas phase [atm]. For CO₂ in seawater at 20°C, $K_H \approx 0.034$ mol L⁻¹ atm⁻¹.

**Temperature dependence** — CO₂ solubility decreases strongly with temperature:

$$K_H(T) = K_H^0 \exp\!\left[-\frac{\Delta H_{\text{sol}}}{R}\left(\frac{1}{T} - \frac{1}{T_0}\right)\right]$$

where $\Delta H_{\text{sol}} \approx -20$ kJ mol⁻¹ is the enthalpy of solution (negative: dissolving is exothermic), $R = 8.314$ J mol⁻¹ K⁻¹, and temperatures are in Kelvin.

Approximate empirical rule: **CO₂ solubility decreases by ~4% per °C warming.** This is critical: as the ocean warms, it can hold less dissolved CO₂ and will take up less of future anthropogenic emissions.

**Example:** At 2°C (polar oceans): $K_H \approx 0.059$ mol L⁻¹ atm⁻¹; at 25°C (tropical oceans): $K_H \approx 0.029$ mol L⁻¹ atm⁻¹. The polar ocean can dissolve twice as much CO₂ per unit partial pressure.

### 3.2 Ocean Carbon Chemistry — The Buffer Factor

CO₂ in seawater does not simply dissolve as molecular CO₂ (aq) — it reacts:

$$\text{CO}_2 + \text{H}_2\text{O} \rightleftharpoons \text{H}_2\text{CO}_3 \rightleftharpoons \text{HCO}_3^- + \text{H}^+ \rightleftharpoons \text{CO}_3^{2-} + 2\text{H}^+$$

The total **dissolved inorganic carbon (DIC)** is the sum of all forms:

$$\text{DIC} = [\text{CO}_{2(\text{aq})}] + [\text{H}_2\text{CO}_3] + [\text{HCO}_3^-] + [\text{CO}_3^{2-}]$$

At typical ocean pH (~8.1), DIC is dominated by $\text{HCO}_3^-$ (~88%) and $\text{CO}_3^{2-}$ (~11%), with molecular $\text{CO}_2$ only ~1%. This chemistry dramatically increases the ocean's effective CO₂ storage capacity relative to a simple solubility calculation.

The **Revelle buffer factor** (or Revelle factor) $\gamma$:

$$\gamma = \frac{\Delta p\text{CO}_2 / p\text{CO}_2}{\Delta\text{DIC}/\text{DIC}} \approx 10\text{–}15$$

For every 1% increase in atmospheric CO₂, DIC increases by only ~1/10 to 1/15 of 1%. The ocean buffers CO₂ but inefficiently — the fraction of added CO₂ that the ocean can absorb decreases as DIC increases and the buffer capacity is consumed. **As the ocean absorbs more CO₂, its ability to absorb future CO₂ decreases.** This is the chemical basis for the ocean sink weakening as atmospheric CO₂ rises.

### 3.3 Air-Sea Gas Exchange Flux

The net CO₂ flux from atmosphere to ocean:

$$F = k_w \times K_H \times (p\text{CO}_{2,\text{atm}} - p\text{CO}_{2,\text{sw}})$$

where:
- $F$ = net flux [mol m⁻² s⁻¹ or g C m⁻² yr⁻¹] (positive = ocean uptake)
- $k_w$ = piston velocity (or transfer velocity) [m s⁻¹]
- $K_H$ = Henry's solubility [mol m⁻³ Pa⁻¹]
- $\Delta p\text{CO}_2 = p\text{CO}_{2,\text{atm}} - p\text{CO}_{2,\text{sw}}$ = surface partial pressure difference [µatm or Pa]

**Piston velocity** $k_w$ depends primarily on wind speed:

$$k_w = a \times U_{10}^2 \times \left(\frac{\text{Sc}}{660}\right)^{-0.5}$$

where $U_{10}$ is wind speed at 10 m (m s⁻¹), Sc is the Schmidt number (kinematic viscosity divided by CO₂ molecular diffusivity), and $a \approx 0.26$ cm h⁻¹ m⁻² s² (Wanninkhof 1992). At $U_{10} = 7$ m s⁻¹ (global mean): $k_w \approx 13$ cm h⁻¹ ≈ 14 m d⁻¹ (a "piston" that sweeps CO₂ out of a 14 m deep layer per day under those winds).

### 3.4 The Solubility Pump

The **solubility pump** is the physical mechanism by which ocean circulation transfers DIC to the deep ocean:

1. Cold surface water in polar regions has high CO₂ solubility → absorbs CO₂ from atmosphere
2. Thermohaline circulation sinks this dense, CO₂-rich water (North Atlantic Deep Water, Antarctic Bottom Water)
3. Water sequestered in the deep ocean for 200–1,000 years
4. Upwelling in tropics/subtropics brings CO₂-poor (older deep) water to surface, which warms → outgasses CO₂

Without thermohaline circulation, atmospheric CO₂ would be ~150–200 ppm higher (pre-industrial level of 280 ppm would be 430–480 ppm).

### 3.5 The Biological Pump

The **biological pump** sequesters carbon through biology:

1. Phytoplankton in the sunlit surface layer fix CO₂ into organic matter via photosynthesis
2. A fraction of this particulate organic carbon (POC) sinks before being remineralised: the "export production"
3. Bacteria in the mesopelagic zone (100–1000 m) remineralise ~90% of sinking POC back to DIC — but 100–1000 m below the surface, isolated from the atmosphere on century timescales
4. ~1% reaches the seafloor and is buried in sediments — permanently sequestered on geological timescales

**Export efficiency:** The fraction of net primary production (NPP) that sinks below the mixed layer as POC is called the **export ratio** or **e-ratio**:

$$e = \frac{\text{Export production}}{\text{NPP}} \approx 0.05\text{–}0.30$$

High e-ratios in cold, nutrient-rich waters (subpolar seas, upwelling zones); low e-ratios in warm, stratified, nutrient-poor waters (subtropical gyres).

**Biological pump magnitude:** Global POC export below 100 m ≈ 4–12 Gt C yr⁻¹. Of this, ~0.1–0.2 Gt C yr⁻¹ reaches permanent burial. The biological pump is approximately 10× larger than the permanent burial flux — most sinking carbon is recycled in the mesopelagic before burial.

### 3.6 Temperature Effect on Uptake Capacity

Global ocean warming of 1°C reduces CO₂ solubility by ~4%, reducing ocean uptake capacity:

$$\Delta F \approx -0.04 \times F \times \Delta T$$

For a current ocean uptake of ~10 Gt CO₂ yr⁻¹: a 2°C warming → loss of 0.8 Gt CO₂ yr⁻¹ of uptake capacity — equivalent to adding ~2.5% to the net atmospheric CO₂ growth rate. This is a positive feedback (warming → less ocean uptake → more CO₂ → more warming).

Ocean stratification also increases with warming: a warmer, more buoyant surface layer forms a stronger barrier to mixing with nutrient-rich deep water → less primary production → weaker biological pump. Model projections suggest 10–20% reduction in POC export by 2100 under high-emission scenarios.

---

## 4. Worked Example by Hand

**Setting:** North Atlantic subpolar gyre, autumn. Sea surface temperature: 12°C. Atmospheric CO₂: 420 µatm. Ocean surface $p\text{CO}_2$: 380 µatm. Wind speed $U_{10}$ = 9 m s⁻¹.

**Step 1: Piston velocity**

$$k_w = 0.26 \times 9^2 \times \left(\frac{600}{660}\right)^{-0.5} = 0.26 \times 81 \times 1.048 = 22.1 \text{ cm h}^{-1}$$

**Step 2: Convert to SI** ($k_w = 22.1/100/3600 = 6.14 \times 10^{-5}$ m s⁻¹)

**Step 3: Solubility at 12°C** ($K_H \approx 0.046$ mol L⁻¹ atm⁻¹ = 46 mmol L⁻¹ atm⁻¹)

**Step 4: ΔpCO₂** = 420 − 380 = 40 µatm = $40 \times 10^{-6}$ atm

**Step 5: Net flux**

$$F = k_w \times K_H \times \Delta p\text{CO}_2$$

Converting consistently: $K_H = 0.046$ mol L⁻¹ atm⁻¹ = 46 mol m⁻³ atm⁻¹.

$$F = 6.14 \times 10^{-5} \text{ m s}^{-1} \times 46 \text{ mol m}^{-3}\text{ atm}^{-1} \times 40 \times 10^{-6} \text{ atm}$$

$$= 6.14 \times 10^{-5} \times 46 \times 40 \times 10^{-6} = 1.13 \times 10^{-7} \text{ mol m}^{-2}\text{ s}^{-1}$$

**Convert to annual flux:**

$$F = 1.13 \times 10^{-7} \times 12 \times 3600 \times 365 = 42.8 \text{ mmol m}^{-2}\text{ d}^{-1} \times 365 = 15.6 \text{ mol m}^{-2}\text{ yr}^{-1}$$

$$= 15.6 \times 44 = 687 \text{ mmol CO}_2 \text{ m}^{-2}\text{ yr}^{-1} = 187 \text{ g CO}_2 \text{ m}^{-2}\text{ yr}^{-1} \approx 1.9 \text{ t CO}_2 \text{ ha}^{-1}\text{ yr}^{-1}$$

This is a strong uptake flux — the North Atlantic subpolar gyre is one of the most intense CO₂ sink regions in the global ocean.

---

## 5. Computational Implementation

```
function henry_constant(T_C):
    T_K = T_C + 273.15
    T0_K = 298.15   # 25°C reference
    dH_sol = -20000  # J/mol (enthalpy of solution)
    R = 8.314
    K0 = 0.034  # mol/L/atm at 25°C
    return K0 * exp(-dH_sol / R * (1/T_K - 1/T0_K))

function piston_velocity(U10, Sc=600):
    # Wanninkhof 1992
    return 0.26 * U10**2 * (Sc/660)**(-0.5)  # cm/hr

function air_sea_flux(dpCO2_uatm, T_C, U10):
    K_H = henry_constant(T_C)  # mol/L/atm
    k_w = piston_velocity(U10) / 100 / 3600  # m/s
    K_H_SI = K_H * 1000  # mol/m3/atm
    dpCO2_atm = dpCO2_uatm * 1e-6
    flux_mol_m2_s = k_w * K_H_SI * dpCO2_atm
    flux_g_C_m2_yr = flux_mol_m2_s * 12 * 3600 * 24 * 365
    return flux_g_C_m2_yr
```

```{pyodide}
import numpy as np

def henry_K(T_C):
    """Henry's Law constant for CO2 in seawater, mol/L/atm"""
    T_K = T_C + 273.15
    K0 = 0.034  # at 25°C
    dH = -20000  # J/mol
    R = 8.314
    return K0 * np.exp(-dH/R * (1/T_K - 1/298.15))

def piston_v(U10, Sc=600):
    """Wanninkhof 1992 piston velocity, m/s"""
    k_cm_hr = 0.26 * U10**2 * (Sc/660)**(-0.5)
    return k_cm_hr / 100 / 3600

def air_sea_flux(dpCO2_uatm, T_C, U10):
    """Net CO2 flux, g C m-2 yr-1. Positive = ocean uptake."""
    K_H = henry_K(T_C) * 1000  # mol/m3/atm
    kw = piston_v(U10)
    dpCO2 = dpCO2_uatm * 1e-6  # atm
    flux_mol = kw * K_H * dpCO2
    return flux_mol * 12 * 3600 * 24 * 365

print("Temperature effect on CO₂ solubility:")
print(f"{'T (°C)':>8} {'K_H (mol/L/atm)':>18} {'Relative solubility':>20}")
T_ref = henry_K(0)
for T in [0, 5, 10, 15, 20, 25, 30]:
    K = henry_K(T)
    print(f"{T:>8}  {K:>18.4f}  {K/T_ref*100:>18.1f}%")

print("\nAir-sea CO₂ flux by region (ΔpCO₂ = +40 µatm, U10 = 8 m/s):")
print(f"{'Region':>25} {'T (°C)':>8} {'Flux (g C/m²/yr)':>18}")
regions = [('N Atlantic subpolar', 10), ('Temperate ocean', 15),
           ('Subtropical', 22), ('Tropical', 28)]
for name, T in regions:
    F = air_sea_flux(40, T, 8)
    print(f"{name:>25} {T:>8}  {F:>16.1f}")

print("\nWind speed sensitivity (T=15°C, ΔpCO₂=40 µatm):")
for U in [3, 5, 7, 9, 11, 13]:
    F = air_sea_flux(40, 15, U)
    print(f"  U10={U:2d} m/s: k_w={piston_v(U)*100*3600:.1f} cm/h  →  F={F:.1f} g C/m²/yr")
```

---

## 6. Visualization

<div data-viz="echarts" style="height:420px" data-options='{
  "title": {"text": "Ocean CO₂ Uptake: Solubility vs Temperature and Wind Speed", "textStyle": {"fontSize": 14}},
  "tooltip": {"trigger": "axis"},
  "legend": {"data": ["Uptake flux at U10=8 m/s (g C/m²/yr)", "CO₂ solubility K_H (relative, %)"], "bottom": 0},
  "xAxis": {"name": "Sea surface temperature (°C)", "nameLocation": "middle", "nameGap": 30,
    "data": [0,3,6,9,12,15,18,21,24,27,30]},
  "yAxis": [
    {"name": "Flux (g C m⁻² yr⁻¹, ΔpCO₂=40µatm)", "nameLocation": "middle", "nameGap": 60},
    {"name": "Relative solubility (%)", "nameLocation": "middle", "nameGap": 50, "position": "right", "min": 50, "max": 130}
  ],
  "series": [
    {"name": "Uptake flux at U10=8 m/s (g C/m²/yr)", "type": "bar",
     "itemStyle": {"color": "#1565C0"},
     "data": [35.8, 31.4, 27.6, 24.4, 21.6, 19.2, 17.1, 15.3, 13.7, 12.4, 11.2]},
    {"name": "CO₂ solubility K_H (relative, %)", "type": "line", "smooth": true,
     "yAxisIndex": 1,
     "itemStyle": {"color": "#C62828"},
     "data": [126, 116, 107, 99, 92, 85, 79, 74, 69, 64, 60]}
  ]
}'></div>

Cold polar waters (0–5°C) absorb 3× more CO₂ per unit ΔpCO₂ than tropical waters (28–30°C) under the same wind conditions. This explains the observed geographic pattern of ocean CO₂ uptake: the North Atlantic and Southern Ocean are strong sinks; the equatorial Pacific and Indian Ocean are sources or near-neutral.

---

## 7. Interpretation

The ocean's role as a carbon sink is thermodynamically constrained in two ways. First, solubility decreases with temperature — warming reduces uptake capacity. Second, the Revelle buffer factor means the carbonate chemistry becomes less efficient at absorbing CO₂ as DIC increases — the more CO₂ the ocean has already absorbed, the harder it is for it to absorb the next tonne.

Both effects are observable in the historical record: the fraction of anthropogenic CO₂ absorbed by the ocean has remained roughly constant (about 26–28%) despite accelerating emissions, because the buffer capacity loss and warming are approximately compensated by the larger ΔpCO₂ gradient. Whether this fraction remains constant, increases (if sink efficiency improves), or decreases (if ocean warming and stratification dominate) is one of the largest uncertainties in 21st-century carbon projections.

---

## 8. What Could Go Wrong?

**Undersampling of ΔpCO₂.** The global ocean surface $p\text{CO}_{2,\text{sw}}$ is mapped from discrete ship-based measurements compiled in the SOCAT database (~30 million observations since 1970, but heavily biased toward well-travelled shipping lanes). Remote ocean regions — particularly the Southern Ocean — are severely undersampled. Interpolated annual flux maps carry ±1 Gt CO₂ yr⁻¹ uncertainty from this spatial coverage problem.

**Ocean acidification feedback.** As the ocean absorbs CO₂, it acidifies: $\text{CO}_2 + \text{H}_2\text{O} \to \text{H}^+ + \text{HCO}_3^-$ drives pH down. Since pre-industrial times, surface ocean pH has fallen from ~8.18 to ~8.08 — a 26% increase in hydrogen ion concentration. Lower pH consumes $\text{CO}_3^{2-}$ ions, reducing the Revelle buffer capacity and further limiting future uptake. Calcifying organisms (corals, pteropods, coccolithophores) are also affected, potentially weakening the biological pump.

**Interannual variability from ENSO.** El Niño events warm the tropical Pacific, suppress upwelling of CO₂-rich water, and reduce the equatorial outgassing source. This makes the global ocean temporarily absorb more CO₂ during El Niño than La Niña years. The 2015–16 El Niño reduced outgassing by ~0.5 Gt CO₂ yr⁻¹. Year-to-year variability in ocean uptake (±0.5–1.5 Gt CO₂ yr⁻¹) makes it difficult to detect long-term trends from annual snapshots.

---

## 9. Summary

The ocean absorbs CO₂ according to Henry's Law: $[\text{CO}_2] = K_H \times p\text{CO}_2$, with $K_H$ decreasing ~4% per °C. The net air-sea flux is:

$$F = k_w \times K_H \times (p\text{CO}_{2,\text{atm}} - p\text{CO}_{2,\text{sw}})$$

where the piston velocity $k_w \propto U_{10}^2$. The solubility pump exports CO₂-rich cold water to the deep via thermohaline circulation; the biological pump exports particulate organic carbon via sinking, remineralising 90% in the mesopelagic. The Revelle buffer factor (~10–15) limits chemical uptake efficiency.

Ocean uptake (~26–28% of anthropogenic emissions, ~10 Gt CO₂ yr⁻¹) decreases per unit CO₂ as temperature rises and buffer capacity is consumed.

**Key equations:**

$$[\text{CO}_2]_{\text{aq}} = K_H \times p\text{CO}_2$$

$$F = k_w K_H \Delta p\text{CO}_2, \quad k_w \propto U_{10}^2$$

$$\gamma = \frac{\Delta p\text{CO}_2/p\text{CO}_2}{\Delta\text{DIC}/\text{DIC}} \approx 10\text{–}15 \quad\text{[Revelle factor]}$$

---

## Math Refresher

**Partial pressure and concentration.** A gas mixture at total pressure $P_{\text{total}}$ contains CO₂ at mole fraction $x_{\text{CO}_2}$. The partial pressure of CO₂ is $p\text{CO}_2 = x_{\text{CO}_2} \times P_{\text{total}}$. Current atmospheric CO₂ is 420 ppm by mole = 420 µmol/mol = $420 \times 10^{-6}$ mole fraction. At standard pressure (1 atm): $p\text{CO}_2 = 420 \times 10^{-6}$ atm = 420 µatm. Henry's Law says dissolved concentration is proportional to partial pressure: twice the $p\text{CO}_2$ → twice as much dissolved. This direct proportionality breaks down for CO₂ in seawater because of the carbonate chemistry — additional dissolved CO₂ is "consumed" by reaction with carbonate ions, so the effective solubility is much higher than Henry's Law alone predicts.
