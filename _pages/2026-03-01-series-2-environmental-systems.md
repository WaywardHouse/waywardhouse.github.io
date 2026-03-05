---
layout: page
permalink: /series/2/
title: "Series 2: Environmental Systems modelling"
subtitle: "Energy balance, hydrology, and ecosystem processes"
series_number: 2
series_key: computational-geography-environmental
total_essays: 16
difficulty_range: 2-4
estimated_hours: 55
prerequisites: [series-1]
tags: [energy-balance, hydrology, ecosystems, process-models]
image: /assets/images/energy-fluxes.png
---

## Series Overview

Environmental systems operate through conservation laws—mass, energy, momentum. This series develops process-based models from first principles: radiation balance, heat transfer, water movement, biogeochemical cycling. Students learn to construct predictive models of environmental dynamics rather than merely describing patterns.

## Pedagogical Philosophy

**Conservation laws as organizing principles.** Every environmental process conserves something. We derive models by writing balance equations: inputs minus outputs equals change in storage. This provides conceptual unity across disparate phenomena.

**Dimensional analysis as verification.** Units must balance. Every term in every equation checked for dimensional consistency. This builds physical intuition and catches errors.

**Process models predict, not just describe.** Unlike statistical models, these equations encode mechanisms. Parameters have physical meaning. Models generalize beyond calibration conditions.

## Learning Objectives

1. **Derive energy balance equations** for surfaces, canopies, water bodies
2. **Calculate radiative, sensible, and latent heat fluxes**
3. **Model water movement** through infiltration, runoff, groundwater flow
4. **Quantify evapotranspiration** via energy- and resistance-based methods
5. **Simulate biogeochemical cycles** (carbon, nitrogen, phosphorus)
6. **Apply conservation principles** to novel environmental systems
7. **Parameterize models** from field measurements
8. **Validate predictions** against observations

## Model Sequence

### Cluster F: Energy Balance (Models 13-16)

**Model 13: Net Radiation and Surface Energy Balance**
Shortwave/longwave radiation. Albedo. Emissivity. Stefan-Boltzmann law. Surface temperature prediction.

**Model 14: Soil Heat Flux and Thermal Properties**
Heat conduction. Thermal diffusivity. Diurnal temperature waves. Depth of penetration.

**Model 15: Sensible Heat Transfer**
Temperature gradients. Aerodynamic resistance. Bulk transfer coefficients. Bowen ratio.

**Model 16: Latent Heat and Evapotranspiration**
Phase change energy. Penman equation. Penman-Monteith model. Stomatal resistance.

### Cluster G: Hydrological Processes (Models 17-22)

**Model 17: Infiltration and Green-Ampt Model**
Soil moisture movement. Capillary action. Wetting front propagation. Time to saturation.

**Model 18: Runoff Generation Mechanisms**
Infiltration-excess vs saturation-excess. Variable source area. Hydrograph components.

**Model 19: Groundwater Flow (Darcy's Law)**
Hydraulic conductivity. Gradient. Aquifer properties. Well drawdown equations.

**Model 20: Streamflow Routing**
Continuity equation. Manning equation. Kinematic wave approximation. Flood wave propagation.

**Model 21: Snowmelt Processes**
Energy balance for snow. Degree-day models. Rain-on-snow events.

**Model 22: Evapotranspiration Partitioning**
Soil evaporation vs transpiration. Crop coefficients. Root water uptake.

### Cluster H: Ecosystem Processes (Models 23-28)

**Model 23: Photosynthesis and Primary Production**
Light response curves. CO₂ fixation. Gross vs net primary production. Carbon balance.

**Model 24: Respiration and Decomposition**
Temperature dependence (Q₁₀). Michaelis-Menten kinetics. Litter decomposition rates.

**Model 25: Nitrogen Cycling**
Mineralization. Nitrification. Denitrification. N₂O emissions. Mass balance models.

**Model 26: Carbon Cycle Dynamics**
Pools and fluxes. Residence times. Steady-state vs transient behavior.

**Model 27: Leaf Area Index and Canopy Structure**
Beer's law in canopies. Light interception. LAI measurement methods.

**Model 28: Ecosystem Water Use Efficiency**
Carbon gain per water lost. Intrinsic vs integrated WUE. Climate change implications.

## Mathematical Progression

**Energy balance:** Algebraic equations (fluxes), first-order ODEs (temperature change)

**Hydrology:** PDEs (diffusion equation), coupled ODEs (reservoir routing)

**Ecosystems:** Coupled nonlinear ODEs (biogeochemistry), optimization (resource allocation)

## Computational Skills

- ODE solvers (explicit Euler, RK4)
- PDE discretization (finite differences)
- Mass balance accounting
- Parameter optimization (least squares)
- Sensitivity analysis
- Monte Carlo uncertainty propagation

## Prerequisites

**Required:** Series 1 (differential equations, exponential functions)

**Helpful:** Basic physics (energy concepts), chemistry (moles, reactions)

## Entry Points by Background

**Environmental science:** Start Model 13. Core material for major.

**Hydrology focus:** Models 17-22 self-contained after Series 1.

**Ecology students:** Models 23-28 after completing 13-16 (energy background).

**Engineering (environmental):** Familiar physics; focus on spatial/ecosystem applications.

## Key Insights

1. **Energy drives hydrological processes.** Evaporation, snowmelt, soil thawing all require energy budget.

2. **Water couples energy and carbon cycles.** Transpiration links photosynthesis to energy balance.

3. **Nonlinearity everywhere.** Exponential temperature dependence. Threshold behaviors. Positive feedbacks.

4. **Parameters vary in space and time.** Soil properties, vegetation characteristics, weather forcing all heterogeneous.

5. **Scale matters.** Plot-scale vs watershed-scale processes differ fundamentally.

6. **Closure assumptions necessary.** More unknowns than equations; must parameterize subgrid processes.

## Applications Covered

- Irrigation scheduling (ET estimation)
- Flood forecasting (runoff generation + routing)
- Carbon accounting (NEE calculation)
- Drought prediction (soil moisture modelling)
- Snowmelt runoff timing
- Agricultural emissions (N₂O from fertilizer)
- Lake/reservoir thermal structure

## Extensions

**For climate:** Energy balance models foundational for climate dynamics (future series).

**For cryosphere:** Series 4 extends energy/water concepts to frozen systems.

**For remote sensing validation:** Series 5 uses these process models for ground truth.

## Estimated Time

**Per model:** 3-4 hours

**Full series:** 50-65 hours

**Core energy-water sequence (13-16, 17-18, 20, 22):** 25-35 hours

---

**Prerequisites:** Complete Series 1. Models 13-16 provide foundation for rest of series.
