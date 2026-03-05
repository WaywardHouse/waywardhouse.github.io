---
layout: page
permalink: /series/7/
title: "Series 7: Geomorphology and Surface Processes"
subtitle: "Weathering, erosion, sediment transport, and coastal dynamics"
series_number: 7
total_essays: 8
difficulty_range: 3-5
estimated_hours: 32
prerequisites: [series-1, series-2-partial]
tags: [geomorphology, erosion, sediment, landslides, coastal-processes]
image: /assets/images/geomorphology.png
---

## Series Overview

Landscapes are not static — they are the cumulative record of energy dissipation across time. Weathering disaggregates rock, water and gravity move the debris, and the coast redistributes it through wave action. This series develops quantitative models of surface processes from thermodynamic and mechanical first principles, building the mathematical foundation for landscape evolution modeling, natural hazard assessment, and long-term environmental change.

## Pedagogical Approach

**Rates, not just forms.** Geomorphology has long been descriptive. This series insists on quantification: how fast does a hillslope erode? What shear stress initiates sediment motion? How much sediment reaches the sea? Forms are the integral of rates over time.

**Mass and energy balance.** Every surface process conserves mass. Weathering converts rock to sediment; transport redistributes it; deposition stores it. The continuity equation connects local rates to landscape evolution.

**Process coupling.** Weathering controls what is available for transport. Hydrology drives fluvial processes. Waves and tides shape coasts. Understanding each process requires understanding its inputs from the others.

## Learning Objectives

1. **Calculate chemical weathering rates** from dissolution kinetics and climate controls
2. **Apply the USLE and RUSLE** to estimate sheet erosion from hillslopes
3. **Assess shallow landslide hazard** using the infinite slope model and pore pressure
4. **Compute bedload and suspended load** from shear stress and sediment grain size
5. **Predict channel geometry** from hydraulic geometry relationships
6. **Model wave shoaling and breaking** across nearshore bathymetry
7. **Calculate longshore sediment transport** and coastal sediment budgets
8. **Evaluate coastal vulnerability** to sea level rise and storm erosion

## Model Sequence

### Cluster AA: Weathering and Hillslope Processes (Models 71–73)

**Model 71: Rock Weathering and Soil Formation**
Chemical weathering kinetics. Dissolution rates and pH. Arrhenius temperature dependence. Soil profile development. Denudation rates from cosmogenic nuclides.

**Model 72: Soil Erosion and the RUSLE**
Rainfall erosivity. Soil erodibility. Slope length and steepness factors. Cover and practice factors. Sediment delivery ratio. Conservation practice design.

**Model 73: Shallow Landslides and Slope Stability**
Infinite slope model. Factor of safety. Pore water pressure and saturation. Root reinforcement. Probabilistic hazard mapping. Critical rainfall thresholds.

### Cluster AB: Fluvial Geomorphology (Models 74–75)

**Model 74: Sediment Transport in Rivers**
Critical shear stress and the Shields parameter. Bedload transport (Meyer-Peter/Müller). Suspended sediment concentration profiles. Rating curves. Channel capacity and competence.

**Model 75: Channel Morphology and Hydraulic Geometry**
Width-discharge and depth-discharge power laws. Leopold-Maddock relations. Regime theory. Meander wavelength and curvature. Channel classification and equilibrium concepts.

### Cluster AC: Coastal Processes (Models 76–78)

**Model 76: Wave Dynamics and Nearshore Transformation**
Linear wave dispersion relation. Group velocity and energy flux. Shoaling coefficient. Wave breaking criteria. Radiation stress and wave setup.

**Model 77: Longshore Sediment Transport and Coastal Budgets**
Littoral drift and the CERC formula. Coastal sediment budget components. Updrift/downdrift effects of structures. Beach nourishment volumes. Erosion hotspot identification.

**Model 78: Sea Level, Storm Surge, and Coastal Morphodynamics**
Relative sea level components. Storm surge dynamics and wind setup. The Bruun Rule for shoreline retreat. Barrier island rollover. Coastal vulnerability index.

## Mathematical Progression

**Weathering:** First-order kinetics, Arrhenius equation, mass balance ODEs

**Hillslope:** Limit equilibrium (statics), factor of safety, probabilistic threshold models

**Fluvial:** Dimensional analysis, power laws, turbulence and shear stress

**Coastal:** Wave mechanics (linear theory), radiation stress tensors, sediment budget accounting

## Computational Skills Developed

- Cosmogenic nuclide age calculations
- RUSLE implementation on DEM grids
- Monte Carlo factor of safety distributions
- Sediment rating curve fitting and extrapolation
- Channel geometry scaling analysis
- Wave transformation across bathymetric profiles
- Coastal sediment budget spreadsheet models

## Prerequisites

**Required:** Series 1 (calculus, differential equations), Series 2 Models 17-20 (hydrology)

**Helpful:** Series 4 Models 43-45 (surface energy balance), basic chemistry (dissolution)

**Not required:** Prior geology or geomorphology background

## Entry Points by Background

**Physical geography students:** Start Model 71. Core material for understanding landscape dynamics.

**Civil/environmental engineers:** Models 72-73 (erosion, landslides) directly applicable to site assessment.

**Coastal managers:** Models 76-78 self-contained with Series 1 background.

**Hydrology focus:** Models 74-75 extend Series 2 hydrology to geomorphic channel dynamics.

## Key Insights

1. **Weathering is climate-dependent.** Temperature and precipitation control chemical reaction rates, linking tectonics to climate through denudation.

2. **Threshold behavior dominates.** Most geomorphic processes have critical thresholds (incipient motion, slope failure) below which nothing happens and above which change is rapid.

3. **Hillslopes and channels are coupled.** Sediment produced on hillslopes must transit the channel network. Disconnection between supply and transport determines landscape response time.

4. **Coastal systems are open and connected.** Sediment removed at one location appears at another. Interventions (seawalls, groins) shift problems rather than solving them.

5. **Scale determines dominant process.** Creep dominates millennial hillslope lowering; rare large events dominate geomorphic work at human timescales.

6. **Sea level rise accelerates coastal processes.** Even moderate rise dramatically increases erosion rates under the Bruun Rule.

7. **Models are time-integrated.** Present-day landforms reflect process rates integrated over decades to millennia, not just current conditions.

## Applications

- Landslide hazard mapping and early warning
- Reservoir sedimentation and design life estimation
- Stream restoration and channel stabilization
- Coastal erosion rates for infrastructure planning
- Watershed sediment yield for water quality assessment
- Beach nourishment design and monitoring
- Shoreline change projections under sea level rise

## Extensions

**For remote sensing:** Series 5 SAR and LiDAR (Models 56-57, 54) provide datasets for geomorphic change detection.

**For hydrology:** Series 2 Models 17-22 provide the hydrological forcing for fluvial geomorphology.

**For climate coupling:** Series 9 disturbance regime models connect vegetation change to erosion rates.

## Estimated Time

**Per model:** 3-5 hours (derivation + worked example + application)

**Full series:** 28-40 hours

**Hazard assessment focus (Models 72-73, 76-78):** 15-22 hours

---

**Prerequisites:** Complete Series 1. Series 2 Models 17-20 recommended before the fluvial cluster.
