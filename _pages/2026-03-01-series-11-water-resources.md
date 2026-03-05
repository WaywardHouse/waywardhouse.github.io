---
layout: page
permalink: /series/11/
title: "Series 11: Water Resources and Environmental Engineering"
subtitle: "Reservoir operations, water quality, contaminant transport, and groundwater"
series_number: 11
series_key: computational-geography-water-resources
total_essays: 7
difficulty_range: 3-5
estimated_hours: 30
prerequisites: [series-1, series-2]
tags: [water-quality, groundwater, reservoir, contaminant-transport, environmental-engineering]
image: /assets/images/water-resources.png
---

## Series Overview

Fresh water is a finite resource allocated across competing demands under physical, legal, and ecological constraints. This series develops the quantitative tools for water resources management and environmental engineering: reservoir operations under uncertainty, water quality prediction and regulation, contaminant transport in surface and groundwater, and the interface between engineering infrastructure and natural hydrological systems. The emphasis is on decision-relevant models — quantitative enough to inform real management choices.

## Pedagogical Approach

**Engineering and ecology coupled.** A reservoir is simultaneously a hydraulic structure, an aquatic ecosystem, and a unit in a regional water supply system. Water quality is determined by physical transport, chemical reactions, and biological processes. We model these jointly rather than treating engineering and ecology as separate disciplines.

**Uncertainty is not optional.** Streamflow, aquifer parameters, and contaminant source terms are all uncertain. Decision-relevant water resources models must quantify and propagate uncertainty explicitly, not pretend to false precision.

**Governance and physics together.** Prior appropriation, environmental flows, and water trading rules all interact with physical water availability. We connect hydraulic models to the institutional frameworks that determine who gets water and when.

## Learning Objectives

1. **Optimise reservoir operations** for competing objectives using mass balance and linear programming
2. **Calculate reservoir sedimentation** rates and design life from trap efficiency
3. **Model dissolved oxygen sag** in rivers downstream of point sources
4. **Apply the TMDL framework** to nutrient loading and eutrophication
5. **Simulate contaminant transport** in rivers using the advection-dispersion equation
6. **Model contaminant plumes** in groundwater using the Theis equation and dispersion
7. **Design subsurface remediation** systems using capture zone analysis

## Model Sequence

### Cluster AR: Reservoir Operations and Water Supply (Models 102–103)

**Model 102: Reservoir Operations and Mass Balance**
Storage-yield analysis. Sequent peak algorithm. Firm yield under drought conditions. Multi-purpose operating rules (flood control, irrigation, hydropower). Tradeoff curves between competing objectives. Reservoir sedimentation and design life (trap efficiency, Brune curve).

**Model 103: Stochastic Streamflow and Drought Risk**
Flow duration curves. Return period and exceedance probability. Synthetic streamflow generation (Thomas-Fiering model). Drought indices (SPI, PDSI). Reliability-resilience-vulnerability metrics for water supply.

### Cluster AS: Water Quality and Eutrophication (Models 104–106)

**Model 104: Dissolved Oxygen Dynamics and the Streeter-Phelps Model**
BOD exertion and deoxygenation. Reaeration coefficient. DO sag curve. Critical deficit location. Wastewater treatment effectiveness. NPDES permit calculations.

**Model 105: Nutrient Dynamics and Lake Eutrophication**
Phosphorus loading and Vollenweider model. Phosphorus-chlorophyll relationships. Stratification and hypolimnetic oxygen depletion. TMDL framework. Watershed nutrient budget. Agricultural nonpoint source loading.

**Model 106: Sediment and Contaminant Transport in Rivers**
Advection-dispersion equation. Longitudinal dispersion coefficient. Conservative tracer breakthrough curves. Reactive transport (first-order decay, sorption). Mixing lengths and zones.

### Cluster AT: Groundwater Contamination and Remediation (Models 107–108)

**Model 107: Groundwater Contaminant Plumes**
Advection-dispersion in porous media. Retardation factor. Mechanical and molecular dispersion. NAPL source zones and dissolution. Plume geometry and attenuation. Monitoring network design.

**Model 108: Pump-and-Treat and In-Situ Remediation**
Capture zone analysis. Pumping well equations (Theis, steady state). Capture zone width and depth. In-situ chemical oxidation stoichiometry. Monitored natural attenuation criteria. Cost-benefit comparison of remediation approaches.

## Mathematical Progression

**Reservoir operations:** Mass balance ODEs, linear programming, stochastic simulation

**Water quality:** First-order ODEs (BOD-DO), steady-state models, nutrient budget accounting

**Contaminant transport:** Advection-dispersion PDE, analytical solutions, moment analysis

**Groundwater:** Potential flow (Darcy), superposition of well solutions, capture zone geometry

## Computational Skills Developed

- Sequent peak reservoir yield analysis
- Synthetic flow sequence generation
- Streeter-Phelps DO sag calculation
- Vollenweider eutrophication model
- 1D ADE numerical solution (finite difference)
- Theis equation and drawdown mapping
- Capture zone delineation for pump-and-treat design

## Prerequisites

**Required:** Series 1 (differential equations, integration), Series 2 Models 17-22 (hydrology, infiltration, groundwater Darcy's law)

**Helpful:** Series 6 Models 68-70 (flood frequency, urban stormwater)

**Not required:** Prior water resources or environmental engineering background

## Entry Points by Background

**Environmental engineers:** Jump to Models 104-106 (water quality) or 107-108 (groundwater). Core professional toolkit.

**Hydrologists:** Model 102-103 extends Series 2 hydrology to operations and decision-making under uncertainty.

**Environmental scientists:** Models 104-105 (dissolved oxygen, eutrophication) connect to familiar ecological outcomes.

**Regulators and planners:** Model 103 (drought risk metrics) and Model 105 (TMDL) provide the quantitative basis for regulatory frameworks.

## Key Insights

1. **Reservoir yield depends on variability, not just volume.** A reservoir in a variable climate must be much larger than one in a stable climate to deliver the same firm yield.

2. **Oxygen depletion is predictable.** The Streeter-Phelps model transforms a qualitative problem (river health downstream of a discharge) into a quantifiable engineering constraint.

3. **Phosphorus controls lake eutrophication.** Even when nitrogen is limiting short-term, phosphorus loading determines long-run trophic state. Watershed-scale controls are necessary.

4. **Contaminants spread faster than intuition suggests.** Dispersion in rivers and aquifers creates plumes that reach receptors faster than advection alone would predict.

5. **Pump-and-treat has fundamental limits.** Source zone NAPL dissolution limits asymptotic cleanup concentration regardless of pumping rate or duration.

6. **Drought risk compounds over time.** The probability of experiencing at least one critical drought over a 50-year project life is far higher than the annual exceedance probability implies.

7. **Water quality and quantity are inseparable.** Low flows concentrate pollutants; high flows flush them. Allocation decisions have water quality consequences.

## Applications

- Municipal water supply reliability analysis
- Reservoir sedimentation management and dredging decisions
- NPDES effluent limit derivation
- Agricultural nonpoint source pollution reduction planning
- TMDL development for impaired water bodies
- Superfund remedial investigation and feasibility studies
- Groundwater wellhead protection area delineation

## Extensions

**For climate:** Stochastic streamflow models in Series 11 connect directly to Series 14 climate projection scenarios.

**For hydrology:** Series 2 hydrological processes provide the input to reservoir operations and water quality models.

**For spatial analysis:** Series 3 zonal statistics and watershed characterisation support nutrient budget calculation.

## Estimated Time

**Per model:** 3-5 hours

**Full series:** 24-38 hours

**Water quality focus (Models 104-106):** 10-16 hours

**Groundwater focus (Models 107-108):** 8-12 hours

---

**Prerequisites:** Series 1 and Series 2 required. Series 2 Model 19 (Darcy's Law) is essential for the groundwater cluster.
