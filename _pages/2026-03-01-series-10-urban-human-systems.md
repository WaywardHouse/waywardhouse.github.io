---
layout: page
permalink: /series/10/
title: "Series 10: Urban and Human Systems"
subtitle: "Urban climate, transportation networks, land use change, and demographic dynamics"
series_number: 10
total_essays: 7
difficulty_range: 2-4
estimated_hours: 28
prerequisites: [series-1, series-3]
tags: [urban-climate, transportation, land-use, demography, spatial-economics]
image: /assets/images/urban-systems.png
---

## Series Overview

More than half of humanity lives in cities, and urbanization is the dominant land use transition of the 21st century. Cities create their own climates, generate traffic and pollution, reorganize land markets, and concentrate demographic change in space. This series develops quantitative models of human spatial systems — not as social science description but as dynamic spatial systems amenable to the same mathematical treatment as physical systems. Urban heat islands, transport networks, land use change models, and demographic projections are derived from first principles.

## Pedagogical Approach

**Human systems follow quantitative regularities.** City size distributions, traffic flows, land value gradients, and demographic transition all exhibit robust mathematical patterns. We derive these patterns from underlying behavioral and physical mechanisms rather than accepting them as empirical curiosities.

**Space is not neutral.** Location determines outcomes in human systems just as it does in physical ones. Accessibility, density, and connectivity are spatial properties that drive urban dynamics. We quantify them explicitly.

**Models expose assumptions.** Land use change models embed theories about how people make location decisions. Demographic models embed theories about fertility, mortality, and migration. Making these assumptions explicit through mathematical modeling reveals what we know and what we are guessing.

## Learning Objectives

1. **Calculate urban heat island intensity** from surface energy balance modifications
2. **Model urban ventilation** and pollutant dispersion in street canyons
3. **Analyse transportation network vulnerability** and accessibility using graph theory
4. **Apply gravity models** to estimate travel demand and transit ridership
5. **Implement land use change models** using cellular automata and logistic regression
6. **Derive urban scaling laws** and predict infrastructure costs from population
7. **Project demographic change** using cohort-component models with spatial migration

## Model Sequence

### Cluster AJ: Urban Climate and Air Quality (Models 95–96)

**Model 95: Urban Heat Island Dynamics**
Surface energy balance in urban vs. rural environments. Anthropogenic heat flux. Impervious surface albedo and thermal mass. Nocturnal cooling suppression. UHI intensity prediction. Green infrastructure mitigation (cool roofs, urban trees, parks).

**Model 96: Urban Ventilation and Pollutant Dispersion**
Street canyon flow regimes. Aspect ratio and recirculation. Urban boundary layer height. Gaussian plume in urban canopy. Traffic emission factors. NO₂ and PM₂.₅ concentration mapping.

### Cluster AK: Transportation and Accessibility (Models 97–98)

**Model 97: Transportation Network Analysis**
Graph-theoretic representation of road and transit networks. Shortest path algorithms (Dijkstra). Network centrality (betweenness, closeness). Vulnerability analysis (edge/node removal). Four-step transport model overview.

**Model 98: Accessibility and Travel Demand Modeling**
Gravity model calibration. Two-step floating catchment area for service access. Transit accessibility metrics. Spatial mismatch between jobs and housing. Induced demand and Braess's paradox.

### Cluster AL: Land Use and Demographic Dynamics (Models 99–101)

**Model 99: Land Use Change Modeling**
Cellular automata (CA) for urban growth. Logistic regression transition probabilities. Neighbourhood effect functions. FLUS/SLEUTH model concepts. Validation with historical data. Future scenario construction.

**Model 100: Urban Scaling Laws and City Structure**
Zipf's law for city sizes. Power laws for infrastructure (roads, utilities). Superlinear scaling of economic output and innovation. Sublinear scaling of infrastructure per capita. Von Thünen land rent gradient.

**Model 101: Demographic Spatial Dynamics**
Cohort-component model. Age-sex-specific fertility and mortality rates. Migration as spatial redistribution. Gravity model for migration flows. Population ageing geography. Shrinking city dynamics.

## Mathematical Progression

**Urban climate:** Energy balance equations, Gaussian dispersion, boundary layer theory

**Networks:** Graph theory (adjacency matrices, shortest paths), centrality metrics

**Accessibility:** Gravity model calibration, catchment area integration

**Land use change:** CA transition rules, logistic regression, Markov chains

**Demographics:** Matrix population models, differential equations for age structure

## Computational Skills Developed

- Surface energy balance calculation for urban pixels
- Gaussian plume model for street-level concentrations
- Shortest path and centrality calculation on road networks
- Gravity model fitting by regression
- Cellular automata implementation for land use
- Cohort-component projection in matrix form
- Migration flow estimation and mapping

## Prerequisites

**Required:** Series 1 (calculus, functions, graph algorithms from Model 9), Series 3 (spatial analysis basics)

**Helpful:** Series 2 Models 13-16 (energy balance for urban climate), Series 1 Models 10-11 (gravity models)

**Not required:** Prior urban planning, sociology, or economics background

## Entry Points by Background

**Urban planners and geographers:** Jump directly to Models 95-96 (climate) and 99 (land use change). Familiar problems; new quantitative framing.

**Transport engineers:** Model 97-98 (network analysis, travel demand) build mathematical depth behind familiar methods.

**Demographers:** Model 101 formalises cohort-component methods in spatial context.

**Environmental scientists:** Models 95-96 connect urban form to atmospheric physics developed in Series 2 and 6.

## Key Insights

1. **Cities are hotspots in the energy balance.** Impervious surfaces, reduced vegetation, and anthropogenic heat shift urban energy balances measurably — by 1-10°C in nocturnal temperatures.

2. **Networks have leverage points.** A small number of links carry most traffic. Removing them disproportionately disrupts connectivity — but over-designing them induces demand.

3. **Accessibility shapes land value.** Von Thünen's gradient from 1826 still describes contemporary land markets: proximity to centres creates rent, and density gradients follow from it.

4. **Urban growth follows rules.** Cellular automata capture the local neighbourhood logic of sprawl without requiring individual agent decisions. Simple rules generate complex patterns.

5. **Scaling laws expose constraints.** Cities cannot escape their own power-law constraints on infrastructure costs and economic output. Bigger is more efficient per capita for infrastructure; more productive per capita for ideas.

6. **Demographic momentum is real.** Age structure inherited from past fertility determines future population for decades, regardless of current fertility rates.

7. **Spatial mismatch matters.** Jobs located away from affordable housing increases transport costs and reduces labour market participation — a quantifiable spatial inequality.

## Applications

- Urban heat island mitigation planning (green roofs, urban forests)
- Air quality regulatory compliance and traffic management
- Public transit accessibility equity analysis
- Urban growth boundary and land supply policy
- Infrastructure investment prioritisation
- Population projection for school, hospital, and utility planning
- Shrinking city adaptation and land banking strategies

## Extensions

**For environmental modeling:** Series 2 and Series 6 provide the atmospheric physics that explains urban climate anomalies.

**For data assimilation:** Series 12 machine learning and ensemble methods apply directly to land use classification and urban change detection.

**For remote sensing:** Series 5 thermal infrared (Model 53) provides UHI observation data; LiDAR (Model 54) characterises urban morphology.

## Estimated Time

**Per model:** 3-4 hours

**Full series:** 22-32 hours

**Urban climate + transport core (Models 95-98):** 12-18 hours

---

**Prerequisites:** Series 1 required. Series 3 spatial analysis methods assumed. Series 2 Models 13-16 helpful for urban energy balance.
