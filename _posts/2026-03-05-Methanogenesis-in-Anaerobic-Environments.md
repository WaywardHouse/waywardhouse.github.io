---
layout: essay
title: "Methanogenesis in Anaerobic Environments"
subtitle: "Anaerobic decomposition, CH₄:CO₂ ratio, wetland and rice paddy emissions"
date: 2026-03-05
categories: modeling
series: computational-geography-laboratory
series_order: 121
cluster: "AO — Methane Processes"
cluster_order: 1
tags: [math, viz, essay]
math: true
viz: true
math_core:
  - anaerobic decomposition stoichiometry
  - redox potential and terminal electron acceptors
  - CH4 to CO2 ratio under different substrates
  - environmental controls on methanogenesis
spatial_reasoning: wetland extent, water table depth
dynamics: substrate availability and redox control
computation: CH4 flux from temperature and water table
domain: wetland biogeochemistry / atmospheric chemistry
difficulty: 3
prerequisites:
  - AN3
  - AM1
notebook_url: https://github.com/waywardhouse/computational-geography-lab/tree/main/essays/AO1-methanogenesis
excerpt: >
  Boreal and subarctic wetlands are the largest natural source of atmospheric
  methane — a gas 80× more potent than CO₂ over 20 years. Methane is produced
  when organic matter decomposes in the complete absence of oxygen, and
  methanogenic archaea are the final step in an anaerobic decomposition chain.
  The rate is controlled by temperature, substrate availability, and water table
  depth. This essay derives the methanogenesis stoichiometry, maps out the
  anaerobic decomposition pathway, and models wetland CH₄ emissions.
math_prerequisites: >
  Stoichiometry and the 44/12, 16/12 ratios (Essay AM1). First-order decay
  and Q₁₀ temperature sensitivity (Essay AN3). Mass balance.
---

The Hudson Bay Lowlands, stretching across northern Ontario, Manitoba, and Quebec, contain the world's largest wetland complex outside Siberia — approximately 370,000 km² of peat bogs and fens. Every summer, as the permafrost thaws and water tables rise, these wetlands emit methane at rates of 10–100 mg CH₄ m⁻² d⁻¹. Integrated across the wetland area, this amounts to 20–30 million tonnes of CH₄ annually from Canada alone — about 10% of total global natural methane emissions.

---

## 1. The Question

How is methane produced from organic matter in the absence of oxygen? What controls the proportion of carbon that exits as CH₄ vs CO₂? What environmental factors regulate emission rates?

---

## 2. The Conceptual Model

In aerobic environments, oxygen is the terminal electron acceptor for organic matter decomposition, and the end products are CO₂ and H₂O. In waterlogged, oxygen-depleted environments, microorganisms use a cascade of alternative terminal electron acceptors — nitrate, manganese, iron, sulfate — in order of decreasing energy yield. When all of these are exhausted, only CO₂ reduction and acetate fermentation remain as electron acceptors, and these are carried out by **methanogenic archaea**, producing CH₄.

---

## 3. Building the Mathematical Model

### 3.1 The Anaerobic Decomposition Pathway

Terminal electron acceptor (TEA) cascade in order of energy yield (mV of redox potential):

| Condition | $E_h$ (mV) | Process | Product |
|---|---|---|---|
| Aerobic | +300 to +600 | O₂ reduction | CO₂ + H₂O |
| Facultative | +100 to +300 | NO₃⁻ reduction | N₂ + CO₂ |
| Anaerobic | –100 to +100 | Mn⁴⁺ reduction | Mn²⁺ + CO₂ |
| Anaerobic | –200 to –100 | Fe³⁺ reduction | Fe²⁺ + CO₂ |
| Strongly anaerobic | –200 to –150 | SO₄²⁻ reduction | H₂S + CO₂ |
| Methanogenic | < –200 | CO₂ reduction / acetoclastic | CH₄ |

Methanogens can only operate below $E_h \approx -200$ mV — conditions that require complete depletion of all higher-energy TEAs. This is why methanogenesis occurs only in persistently waterlogged environments where O₂, nitrate, and sulfate are depleted throughout the soil column.

### 3.2 Methanogenesis Stoichiometry

Two major pathways:

**Hydrogenotrophic (CO₂ reduction):**

$$\text{CO}_2 + 4\text{H}_2 \to \text{CH}_4 + 2\text{H}_2\text{O}$$

**Acetoclastic (acetate fermentation):**

$$\text{CH}_3\text{COOH} \to \text{CH}_4 + \text{CO}_2$$

The acetate pathway accounts for ~70% of global methane production; CO₂ reduction accounts for ~30%.

**Net stoichiometry for organic matter** (with formula approximated as $\text{C}_{10}\text{H}_{20}\text{O}_{10}$ for carbohydrate-like peat organic matter, simplified):

$$\text{C}_{10}\text{H}_{20}\text{O}_{10} \to 5\text{CH}_4 + 5\text{CO}_2$$

One mole of CH₄ is produced per mole of CO₂ — the theoretical **CH₄:CO₂ molar ratio = 1:1** for complete anaerobic decomposition of carbohydrates. In practice, observed ratios in peatland gases range from 0.3:1 to 0.9:1 because: aerobic decomposition at the peat surface produces CO₂ without CH₄; some CH₄ is oxidised before reaching the atmosphere.

**Carbon balance:** Of the carbon fixed into peat, under fully anaerobic conditions:
- 50% exits as CH₄ (12 g C per mole of CH₄)
- 50% exits as CO₂ (12 g C per mole of CO₂)

In mass terms: 1 kg of organic C → 0.5 kg C as CH₄ + 0.5 kg C as CO₂, or equivalently:

$$m_{\text{CH}_4} = m_C \times 0.5 \times \frac{16}{12} = m_C \times 0.667 \text{ kg CH}_4 / \text{kg C}$$

### 3.3 Environmental Controls

**Temperature:** Methanogenesis follows a $Q_{10} \approx 2$–3 relationship more strongly than aerobic decomposition, because methanogenic archaea are more temperature-limited at low temperatures:

$$F_{\text{CH}_4} = F_0 \times Q_{10}^{(T - T_{\text{ref}})/10}$$

At 0°C, methanogenesis is near zero; at 20°C, it may be 4–8× higher. This makes wetland methane emissions strongly seasonal in boreal regions.

**Water table depth ($z_{\text{wt}}$):** The CH₄ emission flux decreases with water table depth below the surface. An aerobic zone above the water table (the "acrotelm") allows CH₄ to be oxidised by methanotrophic bacteria before reaching the atmosphere:

$$F_{\text{CH}_4} = F_{\text{production}} \times e^{-\alpha |z_{\text{wt}}|}$$

where $\alpha \approx 0.1$–0.5 cm⁻¹ is an empirical oxidation factor.

**Substrate quality:** Labile substrates (fresh plant exudates, root-derived organic acids) support higher methanogenesis rates than recalcitrant peat. Graminoid-dominated fens emit more CH₄ than Sphagnum-dominated bogs because grasses supply labile root exudates that fuel methanogenesis.

### 3.4 Rice Paddy Emissions

Flooded rice paddies are managed anaerobic environments — they constitute ~20% of global agricultural CH₄ emissions. Key controls:

- **Soil organic matter:** Higher SOM → more substrate → more CH₄. Organic amendments (straw incorporation) increase paddy emissions significantly.
- **Water management:** Intermittent flooding (alternating wetting and drying, AWD) reduces anaerobic periods and can cut emissions by 30–70% with minimal yield loss.
- **Temperature:** Tropical paddies (year-round warm) emit more per season than temperate paddies (Japan, California).

**Rice emission factor (IPCC default):** 1.30 kg CH₄ ha⁻¹ d⁻¹ for continuously flooded paddies, scaled by seasonal fraction flooded and by SOM amendments.

---

## 4. Worked Example by Hand

**Setting:** Fen in the Hudson Bay Lowlands, July. Mean temperature = 18°C. Water table = −5 cm. Surface CH₄ emission rate at 10°C, $z_{wt} = 0$: $F_0 = 5$ mg m⁻² h⁻¹. Q₁₀ = 2.8, $\alpha = 0.15$ cm⁻¹.

**Temperature correction:**

$$F(T) = 5 \times 2.8^{(18-10)/10} = 5 \times 2.8^{0.8} = 5 \times 2.27 = 11.4 \text{ mg m}^{-2}\text{ h}^{-1}$$

**Water table correction:**

$$F = 11.4 \times e^{-0.15 \times 5} = 11.4 \times e^{-0.75} = 11.4 \times 0.472 = 5.4 \text{ mg m}^{-2}\text{ h}^{-1}$$

**Daily flux:**

$$F_{\text{day}} = 5.4 \times 24 = 129 \text{ mg CH}_4 \text{ m}^{-2}\text{ d}^{-1}$$

**Annual flux** (150-day season, average flux 60 mg m⁻² d⁻¹):

$$F_{\text{annual}} = 60 \times 150 / 1000 = 9 \text{ g CH}_4 \text{ m}^{-2}\text{ yr}^{-1} = 90 \text{ kg CH}_4 \text{ ha}^{-1}\text{ yr}^{-1}$$

$$= 90 \times 30 = 2,700 \text{ kg CO}_2\text{-eq ha}^{-1}\text{ yr}^{-1} = 2.7 \text{ t CO}_2\text{-eq ha}^{-1}\text{ yr}^{-1}$$

---

## 5. Computational Implementation

```
function wetland_CH4_flux(T_C, z_wt_cm, F0, Q10=2.5, alpha=0.15):
    fT = Q10**((T_C - 10) / 10)
    fW = exp(-alpha * abs(z_wt_cm))
    return F0 * fT * fW  # mg CH4 m-2 h-1

function annual_CH4_budget(area_ha, season_days, mean_daily_flux_mg_m2_d, GWP=30):
    flux_kg_ha = mean_daily_flux_mg_m2_d * season_days * 10000 / 1e6  # kg/ha
    total_CH4 = area_ha * flux_kg_ha / 1000  # t CH4
    total_CO2eq = total_CH4 * GWP
    return total_CH4, total_CO2eq
```

```{pyodide}
import numpy as np

def ch4_flux(T, z_wt, F0=5, Q10=2.5, alpha=0.15):
    """CH4 emission flux, mg m-2 h-1"""
    return F0 * Q10**((T-10)/10) * np.exp(-alpha * abs(z_wt))

# Seasonal variation at a boreal fen
months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
T_month = [-20,-18,-10,0, 8, 14, 18, 17, 10, 3, -8,-16]
wt_month = [-30,-25,-20,-10,-5,  0,  -3,-5, -8,-12,-20,-28]  # cm
days     = [31, 28, 31, 30, 31, 30,  31, 31, 30,  31,  30,  31]

print(f"{'Month':>5} {'T(°C)':>7} {'WT(cm)':>8} {'Flux mg/m²/h':>14} {'Monthly kg/ha':>15}")
print("-"*55)
total_annual = 0
for i, m in enumerate(months):
    F = ch4_flux(T_month[i], wt_month[i])
    F_kg_ha_mo = F * 24 * days[i] * 10000 / 1e6
    total_annual += F_kg_ha_mo
    print(f"{m:>5} {T_month[i]:>7} {wt_month[i]:>8} {F:>14.2f} {F_kg_ha_mo:>15.1f}")

print(f"\nAnnual CH4: {total_annual:.0f} kg/ha/yr = {total_annual*30/1000:.1f} t CO2-eq/ha/yr")

# TEA cascade: fraction of C as CH4 vs CO2 under different conditions
print("\nAnaerobic decomposition - carbon partitioning:")
print(f"{'Condition':>20} {'CH4 (mol/mol C)':>18} {'CO2 (mol/mol C)':>18} {'CH4:CO2':>10}")
conditions = [
    ('Fully anaerobic', 0.50, 0.50),
    ('Partial oxidation', 0.30, 0.70),
    ('Methanotrophy 30%', 0.35, 0.65),
    ('Sphagnum bog', 0.25, 0.75),
]
for name, f_ch4, f_co2 in conditions:
    ratio = f_ch4/f_co2
    print(f"{name:>20} {f_ch4:>18.2f} {f_co2:>18.2f} {ratio:>10.2f}")
```

---

## 6. Visualization

<div data-viz="echarts" style="height:420px" data-options='{
  "title": {"text": "Wetland CH₄ Flux: Temperature and Water Table Sensitivity", "textStyle": {"fontSize": 14}},
  "tooltip": {"trigger": "axis"},
  "legend": {"data": ["WT = 0 cm","WT = −5 cm","WT = −15 cm","WT = −30 cm"], "bottom": 0},
  "xAxis": {"name": "Temperature (°C)", "nameLocation": "middle", "nameGap": 30,
    "data": [0,4,8,12,16,20,24,28,32]},
  "yAxis": {"name": "CH₄ flux (mg m⁻² h⁻¹)", "nameLocation": "middle", "nameGap": 50, "min": 0},
  "series": [
    {"name": "WT = 0 cm",   "type": "line", "smooth": true, "itemStyle": {"color": "#C62828"},
     "data": [0.9,1.5,2.5,4.1,6.7,11.1,18.3,30.2,49.7]},
    {"name": "WT = −5 cm",  "type": "line", "smooth": true, "itemStyle": {"color": "#F57F17"},
     "data": [0.4,0.7,1.2,1.9,3.1,5.2,8.5,14.0,23.1]},
    {"name": "WT = −15 cm", "type": "line", "smooth": true, "itemStyle": {"color": "#1565C0"},
     "data": [0.1,0.2,0.3,0.5,0.8,1.4,2.3,3.7,6.1]},
    {"name": "WT = −30 cm", "type": "line", "smooth": true, "itemStyle": {"color": "#90A4AE"},
     "data": [0.0,0.1,0.1,0.1,0.2,0.3,0.5,0.8,1.3]}
  ]
}'></div>

At 20°C with the water table at the surface (WT = 0), flux is ~11× higher than at WT = −30 cm — demonstrating that water table management is a more powerful lever than temperature for controlling wetland methane. This is the basis for the "keep it wet" conservation strategy for northern peatlands: drainage releases both stored peat carbon and increases flux from previously waterlogged layers.

---

## 7. Interpretation

The redox cascade has a critical implication for climate feedbacks: as permafrost thaws and Arctic wetlands expand under warming, the question is whether the newly exposed organic matter decomposes aerobically (releasing CO₂) or anaerobically (releasing CH₄). This depends on whether the thawed soil becomes waterlogged (CH₄-dominated) or dries and oxidises (CO₂-dominated). The geographic distribution of permafrost thaw lakes (thermokarst) vs. drained upland tundra will determine which pathway dominates — and CH₄'s higher GWP means the thermokarst pathway represents a much larger warming impact per mole of carbon released.

---

## 8. What Could Go Wrong?

**Ebullition (bubble flux) is underestimated by chamber measurements.** Most field measurements use opaque chambers placed over the wetland surface, capturing diffusive flux through the water column and plants. However, a significant fraction of CH₄ (10–50% in some settings) is released as bubbles that bypass the slow diffusive pathway and oxidation zone entirely. Ebullition is spatially patchy and temporally episodic (triggered by pressure changes), making it difficult to sample representatively. Studies using automated chambers show ebullition bursts correlated with diurnal pressure changes and storm fronts.

---

## 9. Summary

Methanogenesis is the terminal step in anaerobic decomposition, occurring only at $E_h < -200$ mV after depletion of O₂, NO₃⁻, Mn⁴⁺, Fe³⁺, and SO₄²⁻. Stoichiometry: $\text{CH}_3\text{COOH} \to \text{CH}_4 + \text{CO}_2$ (acetoclastic, 70%) and $\text{CO}_2 + 4\text{H}_2 \to \text{CH}_4 + 2\text{H}_2\text{O}$ (hydrogenotrophic, 30%). Theoretical CH₄:CO₂ ratio = 1:1 for complete anaerobic decomposition; observed 0.3–0.9 due to aerobic oxidation.

Emission flux: $F = F_0 \times Q_{10}^{(T-T_{\text{ref}})/10} \times e^{-\alpha|z_{\text{wt}}|}$. Temperature Q₁₀ ≈ 2.5–3.0; water table depth is the most powerful control via aerobic oxidation in the unsaturated zone. Boreal fens emit 30–150 kg CH₄ ha⁻¹ yr⁻¹ (0.9–4.5 t CO₂-eq ha⁻¹ yr⁻¹).
