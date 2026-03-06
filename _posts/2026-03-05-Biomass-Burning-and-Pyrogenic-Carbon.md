---
layout: essay
title: "Biomass Burning and Pyrogenic Carbon"
subtitle: "Combustion completeness, pyrogenic carbon partition, and fire carbon neutrality"
date: 2026-03-05
categories: modeling
series: computational-geography-laboratory
series_order: 116
cluster: "AM — Carbon Sources"
cluster_order: 2
tags: [math, viz, essay]
math: true
viz: true
math_core:
  - modified combustion efficiency (MCE)
  - emission ratios and emission factors
  - fire return interval and carbon neutrality
  - partitioning fractions summing to unity
spatial_reasoning: fire perimeter, area burned, fuel load maps
dynamics: combustion completeness and pyrogenic carbon fate
computation: emission calculation from area burned × fuel load × MCE
domain: biogeochemistry / atmospheric chemistry
difficulty: 3
prerequisites:
  - AM1
  - A3
notebook_url: https://github.com/waywardhouse/computational-geography-lab/tree/main/essays/AM2-biomass-burning
excerpt: >
  A boreal wildfire in northern Alberta may burn for weeks and consume millions
  of tonnes of organic matter — releasing carbon as CO₂, CO, CH₄, and pyrogenic
  black carbon simultaneously. Unlike fossil fuel combustion, biomass burning
  releases carbon that was recently drawn from the atmosphere by photosynthesis.
  Whether this makes it "carbon neutral" depends on the fire return interval and
  the fate of the pyrogenic carbon fraction. This essay derives the modified
  combustion efficiency, partitions the carbon among all pyrogenic products,
  calculates prescribed burn emissions, and examines the conditions under which
  fire is or is not carbon neutral.
math_prerequisites: >
  Combustion stoichiometry and the 44/12 ratio (Essay AM1). Fractions summing
  to one (conservation of mass). Exponential decay for carbon residence time
  (Essay A3).
---

On May 3, 2016, a wildfire ignited southwest of Fort McMurray, Alberta. Over the following two weeks it burned 590,000 hectares, releasing an estimated 570 million tonnes of CO₂ — more than the annual emissions of the entire United Kingdom. Yet this carbon had been drawn from the atmosphere over the preceding decades by boreal forest photosynthesis. In the long view, fire is part of the boreal carbon cycle, not an addition to it. Whether any particular fire represents a net carbon source depends on factors that span centuries: How much carbon was burned? How much char was produced and how long will it persist? When will the forest regrow to re-absorb the released carbon?

This essay provides the tools to answer these questions quantitatively.

---

## 1. The Question

How do we partition the carbon in burned biomass among CO₂, CO, CH₄, and char? What controls the efficiency of combustion in wildfires versus prescribed burns? Under what conditions is biomass burning carbon neutral?

---

## 2. The Conceptual Model

Biomass burning is chemically similar to fossil fuel combustion, but the carbon source is biogenic — recently fixed from the atmosphere — rather than geological. The fire chemistry determines how the carbon is partitioned: most goes to CO₂, but a significant fraction goes to CO (toxic, short atmospheric lifetime), CH₄ (potent greenhouse gas), and **pyrogenic black carbon** (BC/char) — a recalcitrant form of carbon that persists in soils for centuries to millennia.

The carbon neutrality question is a mass balance over time: if fire carbon is eventually replaced by regrowth, the system is neutral over the regrowth period. If the fire return interval is shorter than the regrowth period, or if the burned area converts to a different land cover, the system is a net source.

---

## 3. Building the Mathematical Model

### 3.1 Fuel Load and Area Burned

Total carbon available for combustion:

$$M_C = A \times \beta \times f_C$$

where:
- $A$ = area burned (ha or m²)
- $\beta$ = fuel load (kg dry mass m⁻², or t dry mass ha⁻¹)
- $f_C$ = carbon fraction of dry biomass (≈ 0.45–0.50 for most vegetation)

Typical fuel loads:

| Biome | Surface fuel (t ha⁻¹) | Total available (t ha⁻¹) |
|---|---|---|
| Boreal forest (mature) | 15–40 | 40–150 (includes duff/peat) |
| Temperate grassland | 2–6 | 2–6 |
| Tropical savanna | 3–8 | 3–8 |
| Mediterranean shrubland | 5–20 | 5–20 |
| Tropical deforestation | 100–400 | 100–400 |

**Combustion completeness** $\phi$: the fraction of available fuel that actually burns. Not all fuel in the fire perimeter is consumed — moisture, fuel arrangement, and fire intensity determine what burns.

$$M_C^{\text{burned}} = A \times \beta \times f_C \times \phi$$

$\phi$ ranges from 0.1–0.3 for damp grassland to 0.9–0.98 for intense crown fires and tropical deforestation burns.

### 3.2 Modified Combustion Efficiency (MCE)

The **modified combustion efficiency** measures how completely the burned carbon is oxidised to CO₂ (rather than CO):

$$\text{MCE} = \frac{\Delta[\text{CO}_2]}{\Delta[\text{CO}_2] + \Delta[\text{CO}]}$$

where $\Delta$ denotes the concentration enhancement above background in the fire plume. MCE is measured by airborne or ground-based sampling in smoke plumes.

MCE ranges from ~0.75 (smouldering peat fires, very incomplete) to ~0.98 (flaming grassland fires). Typical values:

| Fire type | MCE |
|---|---|
| Flaming tropical forest | 0.94–0.97 |
| Flaming savanna | 0.94–0.96 |
| Prescribed burn (flaming) | 0.92–0.95 |
| Boreal forest (mixed) | 0.90–0.94 |
| Smouldering peat | 0.75–0.85 |

**Relationship to combustion efficiency $\eta$:** MCE accounts only for the CO₂/CO partition; it does not include CH₄ or other species. Numerically, MCE ≈ $\eta_{\text{CO}_2}/(\eta_{\text{CO}_2} + \eta_{\text{CO}})$.

### 3.3 Pyrogenic Carbon Partition

The burned carbon $M_C^{\text{burned}}$ is distributed among four fate categories:

$$M_C^{\text{burned}} = M_C^{\text{CO}_2} + M_C^{\text{CO}} + M_C^{\text{CH}_4} + M_C^{\text{NMHC}} + M_C^{\text{BC}}$$

Expressing as fractions of burned carbon:

$$1 = \alpha_{\text{CO}_2} + \alpha_{\text{CO}} + \alpha_{\text{CH}_4} + \alpha_{\text{NMHC}} + \alpha_{\text{BC}}$$

**Emission factors relative to CO₂ (molar ratios, from plume measurements):**

Emission ratios ER = $\Delta X / \Delta\text{CO}_2$ (mol/mol). Converting to mass fractions using molecular weights:

For CO: $\alpha_{\text{CO}} = \text{ER}_{\text{CO}} \times \frac{M_{\text{CO}}}{M_{\text{CO}_2}} \times \frac{M_C^{\text{CO}}}{M_C^{\text{CO}_2}}$

In practice, emission factors (EF) are tabulated in g per kg dry matter burned, derived from plume measurements. Typical values for boreal forest fire:

| Species | EF (g/kg dry matter) | Equivalent $\alpha$ fraction |
|---|---|---|
| CO₂ | 1630 | 0.89 (as C) |
| CO | 127 | 0.065 |
| CH₄ | 5.8 | 0.004 |
| NMHC | 8.4 | 0.005 |
| BC | 0.56 | 0.0003 |
| OC | 9.1 | 0.006 |

The **pyrogenic black carbon fraction** $\alpha_{\text{BC}} \approx 0.01$–0.03 of burned carbon — small in mass but climatically and biogeochemically significant because of its millennial persistence.

### 3.4 Emissions Calculation

Total CO₂ from a fire:

$$E_{\text{CO}_2} = A \times \beta \times \phi \times \text{EF}_{\text{CO}_2} \times 10^{-3}$$

where $\text{EF}_{\text{CO}_2}$ is in g/kg and the factor $10^{-3}$ converts g to kg. In practice, emission factors are often expressed in t CO₂ per ha:

$$E_{\text{CO}_2} = A \times \beta \times \phi \times f_C \times \alpha_{\text{CO}_2} \times \frac{44}{12}$$

**CH₄ CO₂-equivalent:**

$$E_{\text{CH}_4,\,\text{CO}_2\text{-eq}} = A \times \beta \times \phi \times f_C \times \alpha_{\text{CH}_4} \times \frac{16}{12} \times \text{GWP}_{\text{CH}_4}$$

### 3.5 Fire Carbon Neutrality

Biomass burning releases carbon that was recently absorbed from the atmosphere. Whether the fire represents a permanent CO₂ source depends on the ecosystem carbon dynamics:

**Case 1 — Carbon-neutral fire:**
If the burned area regrows to the same carbon stock within the fire return interval $T_r$, the long-term net flux is zero. This requires:
- Sufficient time for regrowth: $T_r \gg T_{\text{regrowth}}$
- No land use change following the fire

**Regrowth timescale $T_{\text{regrowth}}$:** The time for forest biomass to recover to pre-fire levels follows a logistic-like curve. For boreal forests, full recovery requires 80–150 years; for temperate forests, 50–80 years; for tropical forests, 20–40 years (if allowed to recover). If the mean fire return interval equals the recovery time, the long-term carbon balance is zero.

**Case 2 — Net source:**
If $T_r < T_{\text{regrowth}}$: the system is not fully recovered before the next fire — net carbon is lost to the atmosphere over time.

**Formal analysis:** Consider a forest that holds equilibrium carbon stock $C_0$ (t C ha⁻¹). After a fire releasing fraction $\phi$ of the carbon, regrowth follows:

$$C(t) = C_0\left[1 - \phi e^{-t/\tau}\right]$$

where $\tau$ is the regrowth time constant. The mean carbon stock over a fire return interval $T_r$ is:

$$\bar{C} = C_0\left[1 - \frac{\phi\tau}{T_r}(1 - e^{-T_r/\tau})\right]$$

For $T_r \gg \tau$: $\bar{C} \to C_0$ — carbon neutral. For $T_r \ll \tau$: $\bar{C} \to C_0(1-\phi)$ — persistent reduction.

**Pyrogenic carbon exception:** The BC/char fraction ($\alpha_{\text{BC}}$) is not re-released in subsequent fires on century timescales — it accumulates in soil with a mean residence time of 500–5,000 years. Over long timescales, repeated fires may actually **increase** soil BC stocks while reducing aboveground carbon stocks.

---

## 4. Worked Example by Hand

**Setting:** Prescribed burn in boreal forest, Saskatchewan. Area = 2,000 ha. Surface fuel load = 12 t ha⁻¹ dry matter. Combustion completeness $\phi = 0.80$. MCE = 0.93. $f_C = 0.47$.

**Step 1: Total carbon input**

$$M_C = 2000 \times 12 \times 0.47 = 11,280 \text{ t C}$$

**Step 2: Carbon burned**

$$M_C^{\text{burned}} = 11,280 \times 0.80 = 9,024 \text{ t C}$$

**Step 3: CO₂ emission** (using EF = 1,630 g/kg dry matter for boreal forest):

$$E_{\text{CO}_2} = 2000 \times 12 \times 0.80 \times 1630 \times 10^{-6} = 31,296 \text{ t CO}_2$$

**Cross-check via stoichiometry** ($\alpha_{\text{CO}_2} = 0.89$ as C fraction, MCE correction):
$$E_{\text{CO}_2} = 9,024 \times 0.89 \times 3.667 = 29,448 \text{ t CO}_2 \quad \checkmark$$

(Small difference from MCE approximation vs. EF table — both approaches yield the same order of magnitude.)

**Step 4: CH₄ emission** (EF = 5.8 g/kg):

$$E_{\text{CH}_4} = 2000 \times 12 \times 0.80 \times 5.8 \times 10^{-6} = 111.4 \text{ t CH}_4 \times 30 = 3,342 \text{ t CO}_2\text{-eq}$$

**Step 5: Total CO₂-eq**

$$E_{\text{total}} \approx 31,296 + 3,342 = 34,638 \text{ t CO}_2\text{-eq}$$

**Carbon neutrality check:** Boreal forest NPP ≈ 2 t C ha⁻¹ yr⁻¹. Time to re-sequester $9,024$ t C:

$$t_{\text{reseq}} = \frac{9,024}{2000 \times 2} = 2.3 \text{ years} \quad \text{(for surface fuels)}$$

For the full ecosystem recovery (including soil carbon): 50–100 years. Prescribed fire every 10–20 years = carbon-neutral at the surface fuel level.

---

## 5. Computational Implementation

```
function fire_emissions(area_ha, fuel_load_t_ha, phi, f_C, MCE,
                        EF_CO2=1630, EF_CO=127, EF_CH4=5.8,
                        EF_BC=0.56, GWP_CH4=30):
    # area_ha: burned area (ha)
    # fuel_load_t_ha: dry matter fuel load (t ha^-1)
    # phi: combustion completeness (0-1)
    # EF_X: emission factor (g / kg dry matter burned)
    dm_burned = area_ha * fuel_load_t_ha * phi * 1000  # kg
    CO2  = dm_burned * EF_CO2 / 1e6   # t CO2
    CO   = dm_burned * EF_CO  / 1e6   # t CO
    CH4  = dm_burned * EF_CH4 / 1e6   # t CH4
    BC   = dm_burned * EF_BC  / 1e6   # t BC
    CO2eq = CO2 + CH4 * GWP_CH4
    return {'CO2': CO2, 'CO': CO, 'CH4': CH4, 'BC': BC, 'CO2eq': CO2eq}

function carbon_neutrality_timescale(C_burned, NPP_t_C_ha, area_ha):
    return C_burned / (NPP_t_C_ha * area_ha)  # years
```

```{pyodide}
def fire_emissions(area_ha, fuel_t_ha, phi, f_C=0.47, MCE=0.93,
                   EF_CO2=1630, EF_CO=127, EF_CH4=5.8, EF_BC=0.56, GWP_CH4=30):
    dm_burned_kg = area_ha * fuel_t_ha * phi * 1000  # kg dry matter
    result = {
        'Area (ha)': area_ha,
        'DM burned (t)': dm_burned_kg/1000,
        'C burned (t)': dm_burned_kg/1000 * f_C,
        'CO2 (t)': dm_burned_kg * EF_CO2 / 1e6,
        'CO (t)': dm_burned_kg * EF_CO / 1e6,
        'CH4 (t)': dm_burned_kg * EF_CH4 / 1e6,
        'BC (t)': dm_burned_kg * EF_BC / 1e6,
    }
    result['CO2eq (t)'] = result['CO2 (t)'] + result['CH4 (t)'] * GWP_CH4
    return result

scenarios = {
    'Boreal wildfire (100,000 ha)':  (100000, 20, 0.75),
    'Prescribed burn (2,000 ha)':    (2000,   12, 0.80),
    'Tropical deforestation (5 ha)': (5,      200, 0.90),
    'Grassland fire (10,000 ha)':    (10000,  4,  0.85),
}

print(f"{'Scenario':<35} {'CO2 (kt)':>10} {'CH4 (t)':>9} {'BC (t)':>8} {'CO2eq (kt)':>12}")
print("-"*77)
for name, (area, fuel, phi) in scenarios.items():
    e = fire_emissions(area, fuel, phi)
    print(f"{name:<35} {e['CO2 (t)']/1000:>10.1f} {e['CH4 (t)']:>9.0f} "
          f"{e['BC (t)']:>8.1f} {e['CO2eq (t)']/1000:>12.1f}")

# MCE sensitivity
print("\nMCE sensitivity — CO2 vs CO partition (boreal wildfire, 100 kt C burned):")
print(f"{'MCE':>6} {'CO2 (t)':>10} {'CO (t)':>10} {'CO2/(CO2+CO)':>14}")
for MCE in [0.75, 0.80, 0.85, 0.90, 0.93, 0.96, 0.99]:
    C_burned = 100_000  # t C
    C_CO2 = C_burned * MCE
    C_CO  = C_burned * (1 - MCE) * 0.8  # ~80% of non-CO2 goes to CO
    m_CO2 = C_CO2 * 44/12
    m_CO  = C_CO * 28/12
    check_MCE = m_CO2 / (m_CO2 + m_CO) if (m_CO2+m_CO) > 0 else 0
    print(f"{MCE:>6.2f} {m_CO2:>10,.0f} {m_CO:>10,.0f} {check_MCE:>14.3f}")
```

---

## 6. Visualization

<div data-viz="echarts" style="height:420px" data-options='{
  "title": {"text": "Pyrogenic Carbon Partition by Fire Type (%  of burned carbon by fate)", "textStyle": {"fontSize": 14}},
  "tooltip": {"trigger": "axis", "axisPointer": {"type": "shadow"}},
  "legend": {"data": ["CO₂","CO","CH₄","NMHC + other","BC/char"], "bottom": 0},
  "xAxis": {"type": "category",
    "data": ["Tropical forest", "Savanna", "Boreal forest", "Prescribed burn", "Smouldering peat"]},
  "yAxis": {"name": "% of burned carbon", "nameLocation": "middle", "nameGap": 45, "max": 100},
  "series": [
    {"name": "CO₂",        "type": "bar", "stack": "total", "itemStyle": {"color": "#B71C1C"}, "data": [92.5,91.5,88.0,86.0,70.0]},
    {"name": "CO",         "type": "bar", "stack": "total", "itemStyle": {"color": "#F57F17"}, "data": [4.0, 5.5, 7.5, 9.0, 20.0]},
    {"name": "CH₄",        "type": "bar", "stack": "total", "itemStyle": {"color": "#F9A825"}, "data": [0.8, 0.8, 1.2, 1.5, 4.5]},
    {"name": "NMHC + other","type":"bar", "stack": "total", "itemStyle": {"color": "#90A4AE"}, "data": [2.2, 1.7, 2.3, 2.5, 4.5]},
    {"name": "BC/char",    "type": "bar", "stack": "total", "itemStyle": {"color": "#212121"}, "data": [0.5, 0.5, 1.0, 1.0, 1.0]}
  ]
}'></div>

CO₂ dominates in flaming combustion (>88%); CO rises sharply as combustion efficiency falls (smouldering peat reaches 20% CO). The BC/char fraction (~0.5–1%) appears small but represents a persistent soil carbon addition — one of the few cases where fire may contribute to long-term carbon storage.

---

## 7. Interpretation

The MCE is the single most diagnostic quantity for a fire's atmospheric chemistry: high MCE = predominantly flaming combustion = mostly CO₂ + heat; low MCE = smouldering = significant CO, CH₄, and organic aerosol. From a climate perspective, a smouldering peat fire in the Hudson Bay Lowlands (low MCE, slow peat regrowth over centuries) is far more concerning than a flaming grassland fire in southern Alberta (high MCE, annual grass regrowth).

The carbon neutrality analysis reveals that boreal wildfires are neutral over forest-length timescales (80–150 years) only if fire return intervals remain longer than regrowth times. Under climate warming, if fire return intervals shorten (more frequent fires) while regrowth rates remain unchanged, the boreal forest transitions from a long-term carbon reservoir to a net source — a positive feedback on atmospheric CO₂.

---

## 8. What Could Go Wrong?

**Double-counting in national inventories.** If a country reports both biomass burning emissions (under Agriculture, Forestry and Land Use, AFOLU) and forest carbon stock changes, the same carbon may be counted twice. IPCC guidelines prevent this by treating biomass burning as a stock-change event: the emission appears in the AFOLU sector, and the regrowth appears as a negative emission (sink) in subsequent years. Separate-sector accounting without coordination leads to double-counting or gap-missing.

**Peat fires are not carbon neutral on any practical timescale.** The analysis above applies to aboveground biomass. Peat is fossilised organic carbon accumulated over thousands of years; a peat fire releases this ancient carbon in weeks. Peat fires in Indonesia, Russia, and Canada are treated as long-term carbon sources in all accounting frameworks. The combustion completeness for deep peat can be 50–90% by mass, releasing enormous quantities of CO₂ and CO from ecosystem carbon pools that will not recover for millennia.

**Emission factors depend strongly on fire type.** The EF values (1,630 g CO₂/kg for boreal forest) are averages from plume measurements; individual fires range from 1,200 to 2,000 g/kg depending on fuel composition, moisture content, and fire intensity. Applying a single EF to a heterogeneous burned area introduces ±20% uncertainty in emission estimates — much larger than the analytical precision of the stoichiometric calculations.

---

## 9. Summary

Total CO₂ from biomass burning: $E_{\text{CO}_2} = A \times \beta \times \phi \times \text{EF}_{\text{CO}_2}$, where $\text{EF}_{\text{CO}_2} \approx 1,600$–1,800 g/kg dry matter for forest fires. MCE = $\Delta[\text{CO}_2]/(\Delta[\text{CO}_2] + \Delta[\text{CO}])$ measures flaming vs. smouldering dominance; values from 0.75 (peat) to 0.98 (flaming grassland).

Carbon is partitioned among CO₂ (~88–93%), CO (~5–8%), CH₄ (~1–2%), and BC/char (~0.5–1%) for typical forest fires. The BC fraction has millennial persistence; CO and CH₄ are eventually oxidised to CO₂.

Fire carbon neutrality requires $T_r > T_{\text{regrowth}}$. For boreal forests (regrowth ~80–150 years) with historical fire return intervals of 100–200 years, the balance is approximately neutral. Shortening fire return intervals under climate warming, or peat combustion, shifts the balance toward a persistent source.

---

## Math Refresher

**Conservation of mass in a partition.** When carbon exits a fire as multiple products, the fractions must sum to exactly one: $\alpha_{\text{CO}_2} + \alpha_{\text{CO}} + \alpha_{\text{CH}_4} + \alpha_{\text{NMHC}} + \alpha_{\text{BC}} = 1$. This is a mass balance — carbon atoms cannot be created or destroyed. Fractions are expressed as mass of carbon in each product per mass of carbon burned (not mass of product per mass of fuel). The conversion requires the 44/12, 28/12, 16/12 molecular weight ratios from Essay AM1. MCE is a special case: it partitions only between CO₂ and CO, ignoring all other products — so MCE slightly overestimates the true fraction of carbon going to CO₂ by treating the CO₂+CO denominator as the total.
