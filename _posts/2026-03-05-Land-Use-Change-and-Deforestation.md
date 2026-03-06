---
layout: essay
title: "Land Use Change and Deforestation"
subtitle: "Carbon stocks, the stock-change method, and IPCC tier approaches"
date: 2026-03-05
categories: modeling
series: computational-geography-laboratory
series_order: 117
cluster: "AM — Carbon Sources"
cluster_order: 3
tags: [math, viz, essay]
math: true
viz: true
math_core:
  - stock-change method (difference of inventories)
  - carbon pool accounting
  - decay functions for dead wood and litter
  - uncertainty propagation (additive variance)
spatial_reasoning: spatial carbon stock mapping from forest inventories
dynamics: carbon release timescale after land conversion
computation: stock-change emission calculation
domain: land use science / carbon accounting
difficulty: 3
prerequisites:
  - AM1
  - A3
notebook_url: https://github.com/waywardhouse/computational-geography-lab/tree/main/essays/AM3-land-use-change
excerpt: >
  Deforestation releases carbon not just from burning but from the slow decay of
  roots, soil organic matter, and dead wood over years to decades following
  conversion. The stock-change method tracks carbon in five pools — aboveground
  biomass, belowground biomass, dead wood, litter, and soil organic carbon —
  before and after conversion, assigning the difference as an emission. This essay
  derives the stock-change calculation, discusses IPCC Tier 1, 2, and 3 approaches,
  and estimates the timescale over which deforestation emissions are realised.
math_prerequisites: >
  Mass fractions and the 44/12 CO₂ conversion (Essay AM1). Exponential decay
  for pool residence times (Essay A3). Subtraction and ratios for stock-change.
---

When a hectare of tropical forest is cleared for cattle pasture in Brazil, how much carbon is released and over what timescale? The answer depends on more than the fire. Even without burning, the roots decay over months to years, the soil organic carbon (SOC) mineralises over decades, and the dead wood decomposes over years to centuries. Only 30–50% of the forest carbon is typically released in the clearing event; the remainder is released slowly over the following years and decades.

National greenhouse gas inventories must account for all of these pools and timescales. The IPCC provides a hierarchical framework — Tier 1 through Tier 3 — that scales from simple default factors (Tier 1) to comprehensive model simulations (Tier 3), with accuracy increasing at each tier.

---

## 1. The Question

How do we calculate CO₂ emissions from deforestation, including all carbon pools? What are the characteristic timescales over which different pools release their carbon? How do IPCC tiers differ, and when is the extra complexity of higher tiers justified?

---

## 2. The Conceptual Model

A forest ecosystem holds carbon in five IPCC-defined pools:

1. **Aboveground biomass (AGB):** Trunks, branches, leaves — everything above the soil surface
2. **Belowground biomass (BGB):** Roots, typically ~20–25% of AGB
3. **Dead wood:** Standing dead trees, fallen logs — decays over years to decades
4. **Litter:** Freshly fallen leaves, fine roots — decays over months to years
5. **Soil organic carbon (SOC):** Mineral soil carbon — decays over decades to centuries

When land is converted, each pool undergoes a different fate: AGB may be burned, merchantable timber may be removed, roots decay in place, SOC responds to changed soil conditions over years to decades. The **stock-change method** calculates emissions as the difference in total carbon stocks before and after conversion.

---

## 3. Building the Mathematical Model

### 3.1 Carbon Stock Inventory

The carbon stock in a forest (t C ha⁻¹):

$$C_{\text{total}} = C_{\text{AGB}} + C_{\text{BGB}} + C_{\text{DW}} + C_{\text{L}} + C_{\text{SOC}}$$

For tropical moist forest (IPCC defaults):

| Pool | t C ha⁻¹ | % of total |
|---|---|---|
| AGB | 120–200 | 55–60% |
| BGB | 25–40 | 12–15% |
| Dead wood | 10–30 | 5–10% |
| Litter | 3–8 | 1–3% |
| SOC (0–30 cm) | 60–100 | 25–35% |
| **Total** | **220–380** | **100%** |

**Root-to-shoot ratio:** BGB is typically estimated from AGB using IPCC default ratios:

$$C_{\text{BGB}} = C_{\text{AGB}} \times R$$

where $R$ ranges from 0.18 (tropical forest, large AGB) to 0.40 (boreal forest, small AGB). For tropical forest with AGB = 150 t C ha⁻¹: $C_{\text{BGB}} = 150 \times 0.20 = 30$ t C ha⁻¹.

**Above-ground biomass from volume:** Forest inventories often report timber volume $V$ (m³ ha⁻¹). Converting to carbon:

$$C_{\text{AGB}} = V \times \rho_{\text{wood}} \times BEF \times f_C$$

where $\rho_{\text{wood}}$ is wood basic density (kg m⁻³), BEF is the **biomass expansion factor** (ratio of total AGB to merchantable volume, accounting for branches and bark), and $f_C \approx 0.47$ for wood.

### 3.2 The Stock-Change Method

**Annual CO₂ emissions** from land use change in area $A$ (ha yr⁻¹) converting from land type 1 (forest) to land type 2 (pasture):

$$E = \frac{(C_1 - C_2) \times A \times 44/12}{\Delta t}$$

where $C_1$ = carbon stock in forest (t C ha⁻¹), $C_2$ = carbon stock in new land use (t C ha⁻¹), and $\Delta t$ = time period over which the change occurs (usually 1 year for annual inventories).

In practice, the emission is not instantaneous — it is distributed over multiple years as different pools decay:

$$E(t) = \sum_{\text{pools}} \frac{dC_{\text{pool}}}{dt}(t) \times \frac{44}{12}$$

**Immediate emissions** (combustion of cleared AGB in burning):

$$E_{\text{burn}} = C_{\text{AGB}} \times \phi \times \frac{44}{12}$$

where $\phi$ is combustion completeness (0.7–0.9 for tropical clearing fires).

**Delayed emissions** (decay of unburned biomass and roots):

$$E_{\text{decay}}(t) = C_{\text{remaining}} \times k \times e^{-kt} \times \frac{44}{12}$$

where $k$ is the pool-specific decay rate constant (yr⁻¹):

| Pool | $k$ (yr⁻¹) | Mean residence time (yr) |
|---|---|---|
| Leaves/fine litter | 0.5–2.0 | 0.5–2 |
| Fine roots | 0.3–1.0 | 1–3 |
| Coarse roots | 0.05–0.15 | 7–20 |
| Dead wood | 0.03–0.20 | 5–30 |
| Stable SOC | 0.005–0.02 | 50–200 |
| Passive SOC | 0.001–0.005 | 200–1000 |

### 3.3 Timescale of Emissions Realisation

The fraction of total conversion emissions released within time $t$ after clearing:

$$F(t) = 1 - \sum_i w_i e^{-k_i t}$$

where $w_i$ is the carbon weight fraction in pool $i$. For a typical tropical deforestation event with burning:

- Year 0: ~50% of AGB carbon released immediately (burning + litter)
- Year 1–5: coarse roots and dead wood decay adds ~15%
- Year 5–20: soil organic carbon loss adds ~10%
- Year 20–100: slow SOC mineralisation adds remaining ~5–10%

The "carbon debt" is fully realised only over 50–100 years, which has implications for policy: carbon credits from avoided deforestation must be maintained over this timescale to be valid.

### 3.4 IPCC Tier Approaches

**Tier 1 — Activity data × default emission factors:**

$$E = A_{\text{deforested}} \times \text{EF}_{\text{default}}$$

$\text{EF}_{\text{default}}$ from IPCC 2006 tables (e.g., tropical forest = 240 t C ha⁻¹, temperate forest = 100 t C ha⁻¹). No country-specific data required. Uncertainty: ±50%.

**Tier 2 — Country-specific carbon stock data:**

Use national forest inventory data to estimate $C_1$ and $C_2$ for each forest type. Apply Equation (stock change) with actual carbon stock measurements. Uncertainty: ±30%.

**Tier 3 — Full process model:**

Simulate carbon dynamics in all pools using process models (e.g., RothC for soil, CENTURY, CBM-CFS3 for Canadian forests). Track year-by-year pool changes. Requires large datasets and model validation. Uncertainty: ±15–20%.

**The Canadian Forest Carbon Budget Model (CBM-CFS3)** is the Tier 3 approach used in Canada's National Inventory Report, tracking carbon in six pools across all forest management types.

### 3.5 Emission Factors for Key Conversions

Typical emissions from major land use change events (t CO₂ ha⁻¹, all pools, 20-year horizon):

| Conversion | Immediate | Delayed (yr 1–20) | Total |
|---|---|---|---|
| Tropical forest → cropland | 220–280 | 80–140 | 300–420 |
| Tropical forest → pasture | 200–260 | 60–120 | 260–380 |
| Temperate forest → cropland | 80–120 | 40–80 | 120–200 |
| Boreal forest → cropland | 50–80 | 80–150 | 130–230 |
| Boreal wetland → cropland | 100–200 | 200–800 | 300–1000 |

Boreal wetland conversion has the highest potential emissions because peat soils contain 500–3000 t C ha⁻¹ in the soil pool — far exceeding any other pool.

---

## 4. Worked Example by Hand

**Setting:** 500 ha of boreal forest in Alberta is cleared for agriculture. Forest carbon stocks: AGB = 70 t C ha⁻¹, BGB = 25 t C ha⁻¹, dead wood = 15 t C ha⁻¹, litter = 5 t C ha⁻¹, SOC = 90 t C ha⁻¹. After conversion, pasture holds: AGB = 2, BGB = 2, DW = 0, L = 0.5, SOC = 55 t C ha⁻¹.

**Step 1: Stock change per hectare**

$$\Delta C = (70+25+15+5+90) - (2+2+0+0.5+55) = 205 - 59.5 = 145.5 \text{ t C ha}^{-1}$$

**Step 2: Total stock change**

$$\Delta C_{\text{total}} = 145.5 \times 500 = 72,750 \text{ t C}$$

**Step 3: CO₂ equivalent**

$$E = 72,750 \times \frac{44}{12} = 266,750 \text{ t CO}_2 = 266.8 \text{ kt CO}_2$$

**Step 4: Emission timing**

| Timeframe | Pool | Carbon released (t C) | CO₂ (t) |
|---|---|---|---|
| Year 0 (burning) | 70% AGB | 24,500 | 89,833 |
| Year 1–5 | Roots + litter | 15,000 | 55,000 |
| Year 5–20 | Dead wood + fast SOC | 12,000 | 44,000 |
| Year 20–50 | Slow SOC | 21,250 | 77,917 |
| **Total** | | **72,750** | **266,750** |

---

## 5. Computational Implementation

```
function stock_change_emissions(area_ha, stocks_before, stocks_after):
    # stocks: dict with keys AGB, BGB, DW, Litter, SOC (t C ha-1)
    delta_C = sum(stocks_before.values()) - sum(stocks_after.values())
    delta_C_total = delta_C * area_ha
    CO2 = delta_C_total * 44/12
    return {'delta_C_per_ha': delta_C, 'total_C': delta_C_total, 'CO2_t': CO2}

function decay_emissions(C_pool, k_decay, t_max, f_C_to_CO2=0.9):
    # Time series of CO2 emissions from decaying pool
    t = arange(0, t_max)
    E_CO2 = C_pool * k_decay * exp(-k_decay * t) * f_C_to_CO2 * 44/12
    return t, E_CO2

function cumulative_fraction_realised(t, pools):
    # pools: list of (weight_fraction, k_decay)
    total = sum(w for w, k in pools)
    cum = sum(w * (1 - exp(-k * t)) for w, k in pools)
    return cum / total
```

```{pyodide}
import numpy as np

def stock_change(area_ha, before, after):
    """before/after: dicts with pool carbon in t C/ha"""
    dC_ha = sum(before.values()) - sum(after.values())
    total_C = dC_ha * area_ha
    return {'dC_per_ha': dC_ha, 'total_C_t': total_C, 'CO2_t': total_C * 44/12}

def multi_pool_decay(pools, t_years):
    """pools: [(C_pool_t, k_yr, description)]
    Returns cumulative fraction of total C released by time t"""
    total = sum(C for C, k, _ in pools)
    cum = np.zeros(len(t_years))
    for C, k, name in pools:
        cum += C * (1 - np.exp(-k * np.array(t_years)))
    return cum / total

# Alberta boreal conversion example
before = {'AGB': 70, 'BGB': 25, 'DW': 15, 'Litter': 5, 'SOC': 90}
after  = {'AGB': 2,  'BGB': 2,  'DW': 0,  'Litter': 0.5, 'SOC': 55}
result = stock_change(500, before, after)

print("Stock-change emission calculation:")
for k, v in result.items():
    print(f"  {k}: {v:,.0f}")

# IPCC Tier comparison
tier1_EF = 150  # t C/ha (IPCC default, boreal)
tier1_E = 500 * tier1_EF * 44/12
print(f"\nTier 1 estimate: {tier1_E:,.0f} t CO2 (±50%)")
print(f"Tier 2 estimate: {result['CO2_t']:,.0f} t CO2 (±30%)")

# Multi-pool decay timescale
# Pools (C per ha × 500 ha = t C, k yr⁻¹)
area = 500
pools = [
    (70*area*0.7, 5.0,  'AGB-burned immediate'),
    (70*area*0.3, 0.15, 'AGB-unburned decay'),
    (25*area,     0.08, 'Coarse roots'),
    (5*area,      1.0,  'Litter'),
    (15*area,     0.10, 'Dead wood'),
    (35*area,     0.02, 'Fast SOC'),  # 35 t C/ha out of 90 lost
]

t = list(range(0, 51))
frac = multi_pool_decay(pools, t)

print(f"\nCumulative % of total emissions realised over time:")
for yr in [0, 1, 5, 10, 20, 30, 50]:
    idx = t.index(yr)
    print(f"  Year {yr:2d}: {frac[idx]*100:.1f}%")
```

---

## 6. Visualization

<div data-viz="echarts" style="height:420px" data-options='{
  "title": {"text": "Cumulative Fraction of Deforestation Emissions Realised Over Time", "textStyle": {"fontSize": 14}},
  "tooltip": {"trigger": "axis"},
  "legend": {"data": ["Tropical forest conversion","Boreal forest conversion"], "bottom": 0},
  "xAxis": {"name": "Years after conversion", "nameLocation": "middle", "nameGap": 30,
    "data": [0,1,2,3,5,7,10,15,20,25,30,40,50]},
  "yAxis": {"name": "% of total emissions realised", "nameLocation": "middle", "nameGap": 50, "min": 0, "max": 100},
  "series": [
    {"name": "Tropical forest conversion", "type": "line", "smooth": true,
     "itemStyle": {"color": "#2E7D32"},
     "data": [42, 52, 59, 64, 72, 77, 82, 88, 91, 93, 95, 97, 98]},
    {"name": "Boreal forest conversion", "type": "line", "smooth": true,
     "itemStyle": {"color": "#1565C0"},
     "data": [32, 38, 43, 47, 54, 60, 66, 73, 78, 82, 85, 89, 92]}
  ]
}'></div>

Tropical deforestation releases emissions faster — higher soil temperatures accelerate decomposition, root systems are shallower, and burning is more complete. Boreal conversion shows a slower release pattern, particularly from cold, waterlogged soils with slow microbial decomposition. For carbon accounting, a boreal-to-cropland conversion today will not realise its full emissions until 2050 and beyond.

---

## 7. Interpretation

The stock-change method is conceptually simple — subtract final from initial stocks — but operationally challenging because measuring soil organic carbon across large areas with sufficient precision is expensive. The dominant source of uncertainty in national LULUCF (Land Use, Land Use Change and Forestry) inventories is not the calculation method but the uncertainty in carbon stock measurements: ±30–50% for forest biomass estimates, ±50–100% for soil carbon estimates.

The IPCC tier system allocates analytical effort to emission categories that matter most for national totals. Canada's boreal forests and peatlands represent enormous carbon stocks; even small uncertainties in these stock estimates translate to large absolute uncertainty in national inventories. Canada therefore applies Tier 3 (CBM-CFS3 process model) to managed forests and Tier 2 to unmanaged forests — concentrating detailed methods where they have the most impact.

---

## 8. What Could Go Wrong?

**Permanence and leakage in carbon markets.** When a forest carbon credit is sold (avoiding deforestation of 100 ha), that credit assumes the forest carbon remains stored permanently. If the forest later burns or is cleared, the credit is "reversed" — but tracking and enforcement over 100-year timescales is practically difficult. The REDD+ mechanism attempts to address permanence through buffer pools and monitoring requirements.

**The permanence of soil carbon is often overstated.** Soil carbon models assign passive SOC pools with residence times of 200–1000 years, implying near-permanence. But these residence times are calibrated under historical climate and land management. Under warming (+2–4°C), soil decomposition rates increase by 10–20% per degree (the Q₁₀ relationship, Essay AN3), which could release substantial fractions of currently-stable SOC over this century — a positive feedback not captured in current stock-change accounting.

**Spatial boundaries and leakage.** Protecting a specific forest parcel from deforestation may simply displace deforestation pressure to an adjacent unprotected area — "leakage." National-scale accounting frameworks capture this if the displaced deforestation still occurs within the country's inventory boundary; sub-national or project-level accounting does not.

---

## 9. Summary

Deforestation emissions are calculated by the stock-change method: $E = (C_{\text{before}} - C_{\text{after}}) \times A \times 44/12$, summing over five carbon pools (AGB, BGB, dead wood, litter, SOC). Emissions are not instantaneous — they are distributed over 5–50 years as different pools decay at characteristic rates ranging from $k = 2$ yr⁻¹ (litter) to $k = 0.005$ yr⁻¹ (passive SOC).

IPCC Tier 1 uses default emission factors (uncertainty ±50%). Tier 2 uses country-specific carbon stock data (±30%). Tier 3 uses process models tracking all pools annually (±15–20%). Tier choice depends on the significance of the source category to national totals.

**Key equations:**

$$E = (C_{\text{before}} - C_{\text{after}}) \times A \times \frac{44}{12}$$

$$C_{\text{BGB}} = C_{\text{AGB}} \times R, \quad R \approx 0.20\text{–}0.40$$

$$E_{\text{decay}}(t) = C_0 \times k \times e^{-kt} \times \frac{44}{12}$$

$$F(t) = 1 - \sum_i w_i e^{-k_i t} \quad\text{[cumulative emission fraction]}$$

---

## Math Refresher

**Exponential decay for carbon pools.** If a carbon pool contains $C_0$ tonnes of carbon at time zero and decays at rate $k$ yr⁻¹, then $C(t) = C_0 e^{-kt}$ and the annual emission is $-dC/dt = C_0 k e^{-kt}$. The mean residence time is $\tau = 1/k$: the time it takes for the pool to fall to $C_0/e \approx 37\%$ of its initial value. A pool with $k = 0.10$ yr⁻¹ has a mean residence time of 10 years; $k = 0.005$ yr⁻¹ gives $\tau = 200$ years (passive SOC). The cumulative fraction released by time $t$ is $1 - e^{-kt}$. For a system with multiple pools, the total release is a sum of these exponentials, each weighted by its initial mass fraction — producing the curves in the visualization above.
