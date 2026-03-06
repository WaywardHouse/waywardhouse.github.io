---
layout: essay
title: "Fossil Fuel Combustion Chemistry"
subtitle: "Stoichiometry, carbon content, emission factors, and incomplete combustion"
date: 2026-03-05
categories: modeling
series: computational-geography-laboratory
series_order: 115
cluster: "AM — Carbon Sources"
cluster_order: 1
tags: [math, viz, essay]
math: true
viz: true
math_core:
  - stoichiometry and mole ratios
  - mass fraction and molecular weight
  - emission factors from first principles
  - incomplete combustion products
spatial_reasoning: spatial distribution of combustion emissions
dynamics: fuel carbon to atmospheric CO₂ — a one-way path
computation: emission factor calculation from fuel chemistry
domain: atmospheric chemistry / carbon cycle
difficulty: 2
prerequisites:
  - A3
notebook_url: https://github.com/waywardhouse/computational-geography-lab/tree/main/essays/AM1-combustion-chemistry
excerpt: >
  Every tonne of coal burned at the Genesee Power Plant west of Edmonton releases
  a calculable mass of CO₂ — not estimated, not approximated, but derived from
  the carbon content of the fuel and the stoichiometry of combustion. This essay
  derives CO₂ emission factors from first principles using nothing more than
  molecular weights and mass fractions, extends this to incomplete combustion
  producing CO and soot, and shows how emission inventories are constructed from
  fuel consumption statistics.
math_prerequisites: >
  Unit conversion and dimensional analysis. The concept of a ratio. Percentages
  as mass fractions. No calculus required.
---

The Genesee Generating Station, 70 km west of Edmonton, burns sub-bituminous coal to produce up to 1,370 MW of electrical power. In 2022 it emitted approximately 5.2 million tonnes of CO₂ — the largest single point source in Alberta. This number was not measured directly. No instrument can count CO₂ molecules as they leave a smokestack. Instead, it was calculated: fuel consumption (tonnes of coal) multiplied by an emission factor (tonnes of CO₂ per tonne of coal). That emission factor comes from chemistry — from the carbon content of the coal and the stoichiometry of its combustion.

The connection between fuel chemistry and atmospheric CO₂ is one of the most direct cause-and-effect relationships in Earth science: carbon in the fuel becomes carbon in the atmosphere, quantitatively, with no ambiguity. Understanding this connection from first principles is the foundation of every national greenhouse gas inventory.

---

## 1. The Question

Given the chemical composition of a fuel and the mass consumed, how much CO₂ is released? How does incomplete combustion change the accounting? Where do CO, CH₄, and black carbon fit in?

---

## 2. The Conceptual Model

Combustion is oxidation: carbon in the fuel combines with atmospheric oxygen to form carbon dioxide. The reaction is exothermic — it releases energy as heat and light. The carbon atoms do not disappear; they are transferred from a solid or liquid fuel into gaseous CO₂ in the atmosphere. Every carbon atom in the fuel produces exactly one CO₂ molecule. Mass is conserved; atoms are rearranged.

Complete combustion is the ideal case. Real combustion is always incomplete to some degree — some carbon escapes as CO, some as unburned hydrocarbons (VOCs), some as soot (black carbon, BC). Incomplete combustion reduces the CO₂ produced per unit carbon burned, but the remaining carbon is still in the atmosphere, and CO and CH₄ are eventually oxidised to CO₂ anyway.

---

## 3. Building the Mathematical Model

### 3.1 Combustion Stoichiometry

The complete combustion of a hydrocarbon with formula $\text{C}_x\text{H}_y$ in oxygen:

$$\text{C}_x\text{H}_y + \left(x + \frac{y}{4}\right)\text{O}_2 \to x\,\text{CO}_2 + \frac{y}{2}\,\text{H}_2\text{O}$$

For pure carbon ($y = 0$):

$$\text{C} + \text{O}_2 \to \text{CO}_2$$

Molecular weights: C = 12 g/mol, O = 16 g/mol, CO₂ = 44 g/mol. The **mass ratio**:

$$\frac{m_{\text{CO}_2}}{m_{\text{C}}} = \frac{44}{12} = 3.667$$

Every kilogram of pure carbon burned produces 3.667 kg of CO₂. This ratio — 44/12 — is the most important number in carbon accounting. It is exact, derived from atomic masses, and applies universally.

**For methane** (natural gas, $\text{CH}_4$, $x=1$, $y=4$):

$$\text{CH}_4 + 2\text{O}_2 \to \text{CO}_2 + 2\text{H}_2\text{O}$$

Molecular weight of CH₄ = 16. CO₂ produced per kg of CH₄:

$$\frac{44}{16} = 2.750 \text{ kg CO}_2/\text{kg CH}_4$$

**For octane** ($\text{C}_8\text{H}_{18}$, representative of petrol):

$$\text{C}_8\text{H}_{18} + 12.5\,\text{O}_2 \to 8\,\text{CO}_2 + 9\,\text{H}_2\text{O}$$

Molecular weight of C₈H₁₈ = 114. CO₂ produced per kg of octane:

$$\frac{8 \times 44}{114} = \frac{352}{114} = 3.088 \text{ kg CO}_2/\text{kg fuel}$$

### 3.2 Carbon Content and the Emission Factor

Real fuels are mixtures, not pure chemicals. The **carbon fraction** $f_C$ (mass fraction of carbon in the fuel, dimensionless) is measured by elemental analysis.

Typical values:

| Fuel | Carbon fraction $f_C$ | H fraction | O fraction |
|---|---|---|---|
| Anthracite coal | 0.90–0.95 | 0.02–0.03 | 0.02–0.05 |
| Bituminous coal | 0.75–0.85 | 0.05–0.06 | 0.05–0.10 |
| Sub-bituminous coal | 0.65–0.75 | 0.05 | 0.15–0.20 |
| Lignite | 0.40–0.65 | 0.04–0.06 | 0.20–0.35 |
| Heavy fuel oil | 0.86 | 0.12 | 0.01 |
| Diesel/kerosene | 0.87 | 0.13 | 0 |
| Petrol (gasoline) | 0.85 | 0.15 | 0 |
| Natural gas (CH₄-rich) | 0.73 | 0.23 | 0 |
| Liquefied petroleum gas | 0.82 | 0.18 | 0 |

**Complete combustion emission factor:**

$$\text{EF}_{\text{CO}_2} = f_C \times \frac{44}{12} = f_C \times 3.667 \quad \left[\text{kg CO}_2 / \text{kg fuel}\right]$$

This is the Tier 1 IPCC approach: measure fuel consumption, multiply by emission factor, report CO₂.

### 3.3 Carbon Mass Balance

For a combustion process burning mass $m_{\text{fuel}}$ of fuel with carbon fraction $f_C$:

$$m_C = m_{\text{fuel}} \times f_C \quad \text{[total carbon input, kg]}$$

In complete combustion, all carbon exits as CO₂:

$$m_{\text{CO}_2} = m_C \times \frac{44}{12} = m_{\text{fuel}} \times f_C \times 3.667$$

**Example:** Genesee Unit 1 burns 1.8 million tonnes yr⁻¹ of sub-bituminous coal, $f_C = 0.67$.

$$m_C = 1.8 \times 10^6 \times 0.67 = 1.206 \times 10^6 \text{ t C yr}^{-1}$$

$$m_{\text{CO}_2} = 1.206 \times 10^6 \times 3.667 = 4.42 \times 10^6 \text{ t CO}_2 \text{ yr}^{-1}$$

Note the unit: Mt CO₂. The IPCC reports emissions in Gt CO₂ yr⁻¹ (global) or Mt CO₂ yr⁻¹ (national). A common error is confusing tonnes of carbon (t C) with tonnes of CO₂ (t CO₂) — they differ by the 44/12 = 3.667 factor.

### 3.4 Incomplete Combustion

Real combustion is never 100% complete. The **combustion efficiency** $\eta$ represents the fraction of fuel carbon that is fully oxidised to CO₂:

$$\eta = \frac{m_C \text{ oxidised to CO}_2}{m_C \text{ total}}$$

The remaining carbon is distributed among:
- **CO** (carbon monoxide): $\eta_{\text{CO}}$ fraction
- **CH₄** (methane): $\eta_{\text{CH}_4}$ fraction
- **VOC** (non-methane hydrocarbons): $\eta_{\text{NMHC}}$ fraction
- **BC** (black carbon, soot): $\eta_{\text{BC}}$ fraction

with $\eta + \eta_{\text{CO}} + \eta_{\text{CH}_4} + \eta_{\text{NMHC}} + \eta_{\text{BC}} = 1$.

**CO₂ from incomplete combustion:**

$$m_{\text{CO}_2} = m_C \times \eta \times \frac{44}{12}$$

**CO produced:**

$$m_{\text{CO}} = m_C \times \eta_{\text{CO}} \times \frac{28}{12}$$

(Molecular weight of CO = 28.)

**CO emission factor** in kg CO per kg fuel:

$$\text{EF}_{\text{CO}} = f_C \times \eta_{\text{CO}} \times \frac{28}{12} = f_C \times \eta_{\text{CO}} \times 2.333$$

Typical combustion efficiencies:

| Source | $\eta$ (CO₂) | $\eta_{\text{CO}}$ | $\eta_{\text{BC}}$ |
|---|---|---|---|
| Modern power plant | 0.999 | 0.001 | <0.001 |
| Natural gas boiler | 0.998 | 0.001 | ~0 |
| Vehicle petrol engine | 0.990 | 0.008 | 0.002 |
| Old diesel engine | 0.975 | 0.010 | 0.015 |
| Wood stove | 0.920 | 0.060 | 0.010 |
| Open burning (field) | 0.850 | 0.100 | 0.020 |

### 3.5 The CO₂-Equivalent Emission Factor

A complete emission factor reports emissions of all species, converted to CO₂-equivalent using Global Warming Potentials (GWP100):

| Gas | GWP100 |
|---|---|
| CO₂ | 1 |
| CH₄ | 28–34 |
| N₂O | 265–298 |
| BC (short-lived) | ~900 (forcing-based) |

$$\text{EF}_{\text{CO}_2\text{-eq}} = \text{EF}_{\text{CO}_2} + \text{EF}_{\text{CH}_4} \times \text{GWP}_{\text{CH}_4} + \ldots$$

For coal-fired power plants, CO₂ dominates overwhelmingly (>99.9% of total GWP impact). For open burning and cookstoves, CH₄ and BC can be climatically significant additions.

---

## 4. Worked Example by Hand

**Setting:** A grain farmer near Lethbridge, Alberta burns 50 hectares of cereal stubble in the autumn. The stubble biomass density is 3 t ha⁻¹ (dry matter), carbon fraction $f_C = 0.45$, combustion efficiency $\eta = 0.85$.

**Total carbon input:**

$$m_C = 50 \text{ ha} \times 3 \text{ t ha}^{-1} \times 0.45 = 67.5 \text{ t C}$$

**CO₂ released** ($\eta = 0.85$):

$$m_{\text{CO}_2} = 67.5 \times 0.85 \times \frac{44}{12} = 67.5 \times 0.85 \times 3.667 = 210.3 \text{ t CO}_2$$

**CO released** ($\eta_{\text{CO}} = 0.10$):

$$m_{\text{CO}} = 67.5 \times 0.10 \times \frac{28}{12} = 15.75 \text{ t CO}$$

**CH₄ released** ($\eta_{\text{CH}_4} = 0.005$):

$$m_{\text{CH}_4} = 67.5 \times 0.005 \times \frac{16}{12} = 0.45 \text{ t CH}_4 \equiv 0.45 \times 30 = 13.5 \text{ t CO}_2\text{-eq}$$

**BC released** ($\eta_{\text{BC}} = 0.01$, stays as carbon):

$$m_{\text{BC}} = 67.5 \times 0.01 = 0.675 \text{ t BC}$$

**Carbon balance check:** $0.85 + 0.10 + 0.005 + 0.01 + \text{other} = 0.965$; remaining 3.5% as NMHC and ash.

Total CO₂-equivalent: 210.3 + 13.5 + (BC climate forcing equivalent) ≈ 225 t CO₂-eq for 50 ha.

---

## 5. Computational Implementation

```
function combustion_emissions(m_fuel_t, carbon_fraction, eta_CO2,
                               eta_CO=0, eta_CH4=0, eta_BC=0):
    m_C = m_fuel_t * carbon_fraction
    emissions = {
        'CO2':  m_C * eta_CO2 * 44/12,    # t CO2
        'CO':   m_C * eta_CO  * 28/12,    # t CO
        'CH4':  m_C * eta_CH4 * 16/12,    # t CH4
        'BC':   m_C * eta_BC              # t BC (remains carbon)
    }
    return emissions

function emission_factor(carbon_fraction, eta=1.0):
    return carbon_fraction * eta * 44/12  # kg CO2 / kg fuel

# IPCC Tier 1 inventory
function fuel_inventory_CO2(fuel_dict):
    # fuel_dict: {fuel_type: {'consumption_t': x, 'carbon_frac': y, 'eta': z}}
    total_CO2 = 0
    for fuel, params in fuel_dict.items():
        EF = emission_factor(params['carbon_frac'], params['eta'])
        CO2 = params['consumption_t'] * EF
        total_CO2 += CO2
    return total_CO2
```

```{pyodide}
# Emission factor calculator from first principles

def combustion_emissions(m_fuel, f_C, eta_CO2, eta_CO=0.0, eta_CH4=0.0, eta_BC=0.0):
    """
    m_fuel: tonnes of fuel burned
    f_C: carbon fraction (mass fraction)
    eta_X: fraction of carbon emitted as species X
    Returns: dict of emissions in tonnes
    """
    m_C = m_fuel * f_C
    return {
        'CO2_t':  m_C * eta_CO2 * 44/12,
        'CO_t':   m_C * eta_CO  * 28/12,
        'CH4_t':  m_C * eta_CH4 * 16/12,
        'BC_t':   m_C * eta_BC,
        'C_total_t': m_C
    }

# Alberta fuels: emission factors
fuels = {
    'Sub-bituminous coal':  {'f_C': 0.67, 'eta': 0.999},
    'Natural gas':          {'f_C': 0.73, 'eta': 0.998},
    'Diesel':               {'f_C': 0.87, 'eta': 0.990},
    'Petrol (gasoline)':    {'f_C': 0.85, 'eta': 0.990},
    'Wood (residential)':   {'f_C': 0.50, 'eta': 0.920},
}

print(f"{'Fuel':<25} {'f_C':>5} {'η':>6} {'EF (kg CO₂/kg fuel)':>22}")
print("-"*62)
for name, p in fuels.items():
    EF = p['f_C'] * p['eta'] * 44/12
    print(f"{name:<25} {p['f_C']:>5.2f} {p['eta']:>6.3f} {EF:>22.3f}")

# Stubble burning example
print("\nStubble burning (50 ha, 3 t/ha, f_C=0.45):")
e = combustion_emissions(50*3, 0.45, eta_CO2=0.85, eta_CO=0.10,
                         eta_CH4=0.005, eta_BC=0.010)
for k, v in e.items():
    print(f"  {k}: {v:.2f} t")

# CO2-equivalent (CH4 GWP = 30)
CO2eq = e['CO2_t'] + e['CH4_t'] * 30
print(f"  Total CO2-eq (excl. BC): {CO2eq:.1f} t")

# Cross-check: carbon balance
emitted_C = e['CO2_t']*12/44 + e['CO_t']*12/28 + e['CH4_t']*12/16 + e['BC_t']
print(f"  Carbon balance: {emitted_C:.1f} / {e['C_total_t']:.1f} t C accounted")
```

---

## 6. Visualization

<div data-viz="echarts" style="height:420px" data-options='{
  "title": {"text": "CO₂ Emission Factors by Fuel Type (kg CO₂ per kg fuel)", "textStyle": {"fontSize": 14}},
  "tooltip": {"trigger": "axis", "axisPointer": {"type": "shadow"}},
  "xAxis": {"type": "category",
    "data": ["Anthracite coal","Bituminous coal","Sub-bit. coal","Lignite","Heavy fuel oil","Diesel","Petrol","Natural gas","LPG","Wood"]},
  "yAxis": {"name": "kg CO₂ per kg fuel", "nameLocation": "middle", "nameGap": 50},
  "series": [{
    "type": "bar",
    "data": [3.30,2.94,2.39,1.76,3.16,3.16,3.12,2.68,3.01,1.65],
    "itemStyle": {"color": "#B71C1C"},
    "label": {"show": true, "position": "top", "fontSize": 11}
  }]
}'></div>

Coal is the most carbon-intensive fuel per unit mass, but natural gas has the highest carbon intensity per unit **energy** relative to coal? No — natural gas has lower carbon intensity per unit energy (~54 kg CO₂/GJ vs ~96 for coal) because its high hydrogen content provides more heat per carbon atom. The chart shows mass-based emission factors; energy-based factors require dividing by the fuel's energy density (heating value).

---

## 7. Interpretation

The 44/12 ratio is invariant across all fossil fuels — it is atomic mass, not chemistry. What varies between fuels is the carbon fraction $f_C$. Coal is nearly pure carbon; natural gas is largely hydrogen; wood contains substantial oxygen (already partially oxidised). This is why natural gas produces roughly half the CO₂ per unit energy compared to coal: not because it burns more cleanly in the stoichiometric sense, but because a substantial fraction of its energy comes from the combustion of hydrogen to water vapour, which produces no CO₂.

The incomplete combustion terms — CO, CH₄, BC — matter most for small, diffuse sources: residential wood burning, agricultural field fires, traditional cookstoves. For modern industrial sources (power plants, large boilers), combustion efficiency exceeds 99.9% and the CO₂ term overwhelmingly dominates.

---

## 8. What Could Go Wrong?

**Confusing t C with t CO₂.** The factor of 3.667 is frequently misapplied. Global carbon cycle literature reports in Gt C (or Pg C); climate policy literature reports in Gt CO₂. Converting between them: 1 Gt C = 3.667 Gt CO₂. Misinterpreting a headline figure requires checking the units carefully — a "1.5 Gt" figure in a news article almost certainly means Gt CO₂, while a "1.5 Pg C" figure in a journal article means Pg of carbon atoms.

**Assuming complete combustion for emission inventories.** For regulatory compliance and climate reporting, using $\eta = 1$ is generally acceptable for large stationary sources (power plants, cement kilns) where monitoring data confirm high combustion efficiency. For mobile sources, residential combustion, and waste burning, assuming complete combustion will underestimate total CO₂-eq by 5–20% and drastically underestimate co-pollutants (CO, BC, VOCs) that have separate air quality significance.

**Ignoring the carbon in ash.** In coal combustion, a fraction of carbon is retained in fly ash and bottom ash without oxidising. This unburned carbon (loss-on-ignition, LOI) reduces the effective CO₂ per tonne of coal and represents energy loss. Modern plants minimise LOI to improve efficiency; older plants can have LOI of 5–15%, meaningfully affecting emission factor calculations.

---

## 9. Summary

The fundamental equation of combustion emission accounting:

$$m_{\text{CO}_2} = m_{\text{fuel}} \times f_C \times \eta \times \frac{44}{12}$$

For complete combustion of a fuel with carbon fraction $f_C$: every kilogram of carbon produces $44/12 = 3.667$ kg of CO₂. This ratio is derived from atomic masses and is invariant. The carbon fraction is fuel-specific: ~0.75 for bituminous coal, ~0.73 for natural gas, ~0.85 for liquid petroleum products, ~0.45–0.50 for biomass.

Incomplete combustion partitions the remaining carbon into CO ($\times 28/12$), CH₄ ($\times 16/12$), NMHC, and black carbon. For industrial sources, combustion efficiency exceeds 99.9%; for open burning, 80–90%.

**Key equations:**

$$\text{EF}_{\text{CO}_2} = f_C \times \frac{44}{12} \quad [\text{kg CO}_2/\text{kg fuel, complete combustion}]$$

$$m_{\text{CO}_2} = m_{\text{fuel}} \times f_C \times \eta_{\text{CO}_2} \times \frac{44}{12}$$

$$m_{\text{CO}} = m_{\text{fuel}} \times f_C \times \eta_{\text{CO}} \times \frac{28}{12}$$

---

## Math Refresher

**Molar mass and stoichiometry.** A mole is $6.022 \times 10^{23}$ atoms or molecules — Avogadro's number. The molar mass (molecular weight) of a molecule is the sum of its constituent atomic masses in grams per mole: CO₂ has one C (12 g/mol) and two O (16 g/mol each), giving 44 g/mol. A balanced equation like $\text{C} + \text{O}_2 \to \text{CO}_2$ says one mole of carbon produces one mole of CO₂. In mass terms: 12 g of C produces 44 g of CO₂ — the 44/12 ratio. Mass fractions are dimensionless ratios: a fuel with $f_C = 0.75$ contains 750 g of carbon per kg of fuel. All emission factor calculations reduce to tracking this mass of carbon through the stoichiometric ratio to its final molecular form.
