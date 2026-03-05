---
layout: page
permalink: /series/6/
title: "Series 6: Atmospheric Hazards and Dynamics"
subtitle: "Fire, severe weather, wind, and flood modelling"
series_number: 6
series_key: computational-geography-atmospheric-hazards
total_essays: 11
difficulty_range: 3-5
estimated_hours: 45
prerequisites: [series-1, series-2-partial]
tags: [fire, severe-weather, meteorology, floods, hazards]
image: /assets/images/atmospheric-and-hazards.png
---

## Series Overview

Atmospheric hazards—wildfires, tornadoes, floods—kill thousands annually and cause billions in damages. This series develops predictive models from atmospheric physics and fluid dynamics, enabling forecasting, warning, and risk assessment. Emphasis on operational decision-making under uncertainty.

## Pedagogical Philosophy

**Lives depend on forecasts.** Unlike academic exercises, hazard predictions have immediate human consequences. We emphasize probabilistic forecasting, warning lead times, and false alarm rates.

**Coupling across scales.** Microscale (fire spread), mesoscale (thunderstorms), synoptic (derechos). Processes interact hierarchically.

**Observations constrain models.** Radar, satellites, surface stations provide real-time validation. Students compare predictions to observations.

## Learning Objectives

1. **Calculate fire danger indices** from meteorology and fuel conditions
2. **Model wildfire spread** using Rothermel equation and elliptical growth
3. **Estimate smoke dispersion** via Gaussian plume models
4. **Assess severe weather potential** from CAPE, shear, environmental parameters
5. **Predict tornado intensity** from damage indicators and radar signatures
6. **Forecast hail size** from updraft strength and growth processes
7. **Derive IDF curves** for rainfall intensity-duration-frequency
8. **Perform flood frequency analysis** via Log-Pearson Type III
9. **Design urban stormwater systems** with detention and green infrastructure
10. **Quantify forecast uncertainty** and communicate risk effectively

## Model Sequence

### Cluster V: Fire Science (Models 60-62)

**Model 60: Fire Weather and Ignition Potential**
Fuel moisture. Vapor pressure deficit. Fire Weather Index. Red flag criteria. Ignition probability.

**Model 61: Fire Spread modelling**
Rothermel equation. Elliptical growth. Slope/wind effects. Rate of spread. Fireline intensity.

**Model 62: Fire Emissions and Smoke Dispersion**
Emission factors. PM2.5 production. Plume rise. Gaussian dispersion. Air quality impacts.

### Cluster W: Severe Weather (Models 63-65)

**Model 63: Thunderstorm Dynamics and Severe Weather**
CAPE. Updraft velocity. Wind shear. Supercell structure. Severe weather parameters.

**Model 64: Tornado Formation and Intensity**
Vorticity. Mesocyclone. EF-Scale. Damage assessment. TVS detection. Warning verification.

**Model 65: Hail Formation and Forecasting**
Terminal velocity. Accretion. Wet vs dry growth. Maximum hail size. MESH radar product.

### Cluster X: Wind & Turbulence (Models 66-67)

**Model 66: Boundary Layer Turbulence and Wind Profiles**
Logarithmic profile. Friction velocity. Monin-Obukhov theory. Wind power applications.

**Model 67: Extreme Wind Events and Downbursts**
Downdraft dynamics. RIJ. Derechos. Microburst detection. Aviation hazards.

### Cluster Y: Flood Hydrology (Models 68-70)

**Model 68: Rainfall Intensity-Duration-Frequency**
IDF curves. Extreme value statistics. GEV distribution. Design storm selection.

**Model 69: Flood Frequency Analysis**
Log-Pearson Type III. Return periods. Confidence intervals. Regional regression.

**Model 70: Urban Flood modelling and Green Infrastructure**
Rational method. SCS Curve Number. Detention design. Bioretention. LID principles.

## Mathematical Progression

**Fire:** Exponential models, diffusion equations, wind fields

**Severe weather:** Thermodynamics, vorticity, buoyancy integrals

**Floods:** Probability distributions, extreme value theory, routing equations

## Computational Skills

- Fire spread algorithms (cellular automata, Huygens principle)
- Atmospheric sounding analysis
- Radar data processing (reflectivity, velocity)
- Statistical distribution fitting
- Hydrologic modelling (HEC-HMS concepts)
- Monte Carlo for probabilistic forecasts

## Prerequisites

**Required:** Series 1 (differential equations, statistics)

**Helpful:** Series 2 Models 13-16 (atmospheric energy balance)

## Entry Points

**Fire management:** Models 60-62 self-contained

**Meteorology students:** Models 63-67 (severe weather + wind)

**Hydrology/engineering:** Models 68-70 (flood analysis)

**Emergency management:** All clusters relevant; start with hazard of interest

## Key Insights

1. **Atmospheric instability quantifiable.** CAPE, shear, moisture indices predict severe weather objectively.

2. **Fire behavior exponentially sensitive.** Small weather changes produce dramatic spread rate changes.

3. **Tornadoes remain partially unpredictable.** Environmental parameters necessary but not sufficient.

4. **Return periods misunderstood.** 100-year flood has 1% annual chance, not "once per century."

5. **Urbanization amplifies flooding.** Impervious surfaces increase peaks 2-5×.

6. **Uncertainty communication critical.** Probabilities, not deterministic predictions.

7. **Warning lead time saves lives.** Doppler radar increased tornado warning time from 5 to 15 minutes.

## Applications

- Wildfire risk assessment and evacuation planning
- Severe thunderstorm warnings (NWS operations)
- Tornado damage surveys (EF-Scale rating)
- Hail suppression programs
- Wind energy resource assessment
- Culvert/bridge design (flood frequency)
- Stormwater management ordinances
- Flood insurance rate maps (FEMA)

## Operational Context

**National Weather Service:** CAPE/shear for convective outlooks, radar for warnings

**Fire agencies:** NFDRS, WFAS for resource pre-positioning

**USGS:** StreamStats for flood frequency, real-time streamgages

**FEMA:** Flood Insurance Studies use methods from Models 68-70

## Extensions

**For climate:** Hazard frequency changes under warming (future series)

**For risk analysis:** Loss estimation, cost-benefit (future)

## Estimated Time

**Per model:** 4-5 hours

**Full series:** 45-55 hours

**Fire sequence (60-62):** 12-15 hours

**Severe weather (63-65):** 12-15 hours

**Floods (68-70):** 12-15 hours

---

**Prerequisites:** Series 1 required. Series 2 helpful for atmospheric physics background.
