---
layout: page
permalink: /series/9/
title: "Series 9: Biogeography and Ecosystem Dynamics"
subtitle: "Species distributions, population ecology, biome modeling, and disturbance regimes"
series_number: 9
total_essays: 8
difficulty_range: 2-4
estimated_hours: 30
prerequisites: [series-1, series-2-partial]
tags: [biogeography, ecology, species-distributions, population-dynamics, biomes, disturbance]
image: /assets/images/biogeography.png
---

## Series Overview

Why does a particular species live where it does? How do populations grow, crash, and recover? What determines the boundary between a forest and a grassland? This series develops quantitative models for the spatial and temporal dynamics of life — from individual species distributions to biome-scale vegetation patterns and disturbance regimes. The models are explicitly spatial: geography is not just context but a driver of ecological dynamics.

## Pedagogical Approach

**Niche as a mathematical object.** The fundamental niche is a region in environmental space. Species distribution models translate this concept into quantitative predictions: given a climate envelope, where should a species occur? We derive these models formally rather than treating software outputs as black boxes.

**Dynamics, not just patterns.** Static distributions are snapshots. The underlying processes are population growth, dispersal, competition, predation, and disturbance. We model the processes to explain the patterns.

**Scale dependence explicit.** Individual movements, population dynamics, and biome boundaries operate at very different spatial and temporal scales. We are explicit about which scale each model addresses and how they connect.

## Learning Objectives

1. **Construct species distribution models** from occurrence data and environmental predictors
2. **Analyze metapopulation dynamics** in fragmented landscapes using the Levins model
3. **Simulate dispersal** with random walk and correlated random walk models
4. **Model predator-prey oscillations** with Lotka-Volterra equations and phase space analysis
5. **Quantify competitive exclusion** and coexistence through resource ratio theory
6. **Calculate fire return intervals** and model post-fire succession
7. **Predict biome boundaries** from growing degree days and moisture availability
8. **Quantify vegetation-climate feedbacks** through albedo and evapotranspiration coupling

## Model Sequence

### Cluster AG: Species Distributions and Dispersal (Models 87–89)

**Model 87: Niche Theory and Species Distribution Models**
Hutchinson niche. Environmental envelopes and bioclimatic space. MaxEnt and the principle of maximum entropy. Habitat suitability mapping. Climate change range shifts. Model evaluation (AUC, TSS).

**Model 88: Metapopulation Dynamics and Habitat Fragmentation**
Levins patch occupancy model. Colonization-extinction balance. Incidence functions. Landscape connectivity metrics. Minimum viable metapopulation area. Corridor design principles.

**Model 89: Dispersal Kernels and Spatial Spread**
Random walk and diffusion equation. Correlated random walk. Fat-tailed dispersal kernels. Traveling wave solutions for invasive spread. Long-distance dispersal events. Resistance surfaces.

### Cluster AH: Population and Community Ecology (Models 90–91)

**Model 90: Predator-Prey Dynamics and Food Web Structure**
Lotka-Volterra equations. Phase plane analysis. Limit cycles and oscillations. Functional response types (Holling I, II, III). Trophic cascades. Food web stability and complexity.

**Model 91: Competition, Coexistence, and Community Assembly**
Resource ratio theory. Competitive exclusion principle. Coexistence mechanisms (niche partitioning, storage effect). Species-area relationships. Diversity-stability relationships. Neutral theory.

### Cluster AI: Biome Dynamics and Disturbance (Models 92–94)

**Model 92: Fire Ecology and Succession Modeling**
Fire return interval and fire rotation period. State-transition succession models. Post-fire recovery trajectories. Fire-vegetation feedbacks. Resilience and alternative stable states.

**Model 93: Biome Boundaries and Climate Envelopes**
Growing degree days and temperature sums. Drought indices and moisture balance. Holdridge life zones. Treeline dynamics. Biome boundary shifts under climate change. Phenological windows.

**Model 94: Vegetation-Climate Feedbacks**
Surface albedo change from vegetation cover. Evapotranspiration feedback on regional precipitation. Carbon-climate coupling (CO₂ fertilization vs. respiration). Vegetation-atmosphere energy balance perturbations.

## Mathematical Progression

**Species distributions:** Logistic regression, maximum entropy optimization, ROC analysis

**Metapopulations:** First-order ODEs, equilibrium analysis, incidence function fitting

**Dispersal:** Diffusion PDEs, traveling wave solutions, stochastic processes

**Community ecology:** Coupled ODEs, phase plane analysis, bifurcation theory

**Biome modeling:** Threshold functions, piecewise linear models, feedback loops

## Computational Skills Developed

- MaxEnt implementation and evaluation
- Metapopulation viability simulation
- Dispersal kernel fitting from mark-recapture data
- Lotka-Volterra numerical integration and phase portrait
- Species-area curve fitting
- State-transition model simulation
- Biome boundary mapping from climate indices

## Prerequisites

**Required:** Series 1 (differential equations, exponential functions, spatial models)

**Helpful:** Series 2 Models 22-28 (ecosystem processes, photosynthesis, carbon cycle)

**Not required:** Prior ecology or biology background

## Entry Points by Background

**Conservation biologists:** Start Model 87 (SDMs) and Model 88 (metapopulations). Core toolkit for reserve design.

**Ecologists with math gap:** Start Model 90 (predator-prey). Familiar phenomena; new mathematical language.

**Climate scientists:** Models 93-94 (biome boundaries, vegetation feedbacks) connect directly to Earth system modeling.

**GIS analysts:** Model 87 builds on Series 3 spatial methods to produce ecologically interpretable outputs.

## Key Insights

1. **Niche is not place.** The niche is defined in environmental space; the range is the geographic projection of the niche onto available habitat.

2. **Fragmentation matters beyond area.** Connectivity determines metapopulation viability as much as total patch area.

3. **Dispersal creates fat tails.** Rare long-distance events dominate range expansion and invasion spread. Gaussian dispersal models systematically underpredict spread rates.

4. **Predator-prey cycles are inherently unstable.** Real stability comes from spatial heterogeneity, refugia, and demographic structure — not Lotka-Volterra dynamics alone.

5. **Disturbance maintains diversity.** Intermediate disturbance frequency prevents competitive exclusion and creates habitat heterogeneity.

6. **Biome boundaries are not lines.** They are broad transition zones where multiple factors interact. Climate change is moving them.

7. **Vegetation is not passive.** Feedbacks from vegetation to climate through albedo, ET, and carbon can amplify or dampen warming signals.

## Applications

- Protected area design and reserve network planning
- Invasive species spread prediction and management
- Climate change vulnerability assessments for species
- Forest carbon stock mapping and change detection
- Fire management planning and prescribed burn scheduling
- Biome shift projections for agriculture and ecosystem services
- Rewilding planning (trophic restoration)

## Extensions

**For remote sensing:** Series 5 LiDAR (Model 54) provides canopy structure data for habitat assessment.

**For climate:** Series 14 (climate integration) includes biosphere feedbacks from Model 94 context.

**For spatial analysis:** Series 3 spatial statistics (Models 37-40) underpin SDM evaluation and clustering.

## Estimated Time

**Per model:** 3-4 hours

**Full series:** 26-34 hours

**Conservation focus (Models 87-88, 92):** 10-14 hours

---

**Prerequisites:** Complete Series 1. Series 2 Models 23-28 helpful for ecosystem process context.
