---
layout: series
title: "Series 1: Foundations of Computational Geography"
subtitle: "Building mathematical and computational literacy through spatial systems"
series_number: 1
total_essays: 12
difficulty_range: 1-4
estimated_hours: 40
tags: [foundations, modeling, mathematics, differential-equations]
---

## Series Overview

This foundational series reconstructs geography as a quantitative modeling discipline, introducing mathematical concepts through observable spatial phenomena. Rather than treating mathematics as prerequisite knowledge, we develop calculus, differential equations, and computational thinking through geographic problems that provide intuition and motivation.

## Pedagogical Philosophy

**Mathematics emerges from observation.** We begin with patterns visible in landscapes and human systems, then develop mathematical tools to describe and predict these patterns. This inverts the traditional pedagogy: instead of "learn math, then apply it," we pursue "observe phenomena, develop mathematics to understand it."

**Computational implementation follows derivation.** Every mathematical concept is implemented in code, demonstrating that equations are executable instructions. Students see that mathematical models are programs, bridging abstract notation and concrete computation.

## Learning Objectives

By completing this series, learners will be able to:

1. **Translate spatial phenomena into mathematical models** using variables, units, and functional relationships
2. **Derive and solve differential equations** for growth, decay, and equilibrium processes
3. **Implement numerical solutions** for systems without analytical solutions
4. **Interpret model behavior** through phase plots, stability analysis, and parameter sensitivity
5. **Apply vector calculus** to terrain analysis and spatial gradients
6. **Understand Earth's geometry** through spherical coordinates and rotational dynamics
7. **Model human spatial behavior** using gravity models and diffusion processes
8. **Critique model assumptions** and identify failure modes

## Mathematical Progression

The series builds mathematical sophistication systematically:

**Essays 1-4 (Cluster A):** Single-variable calculus
- Linear functions and rates of change
- Exponential and logarithmic functions
- First-order differential equations
- Stability and equilibrium concepts

**Essays 5-6 (Cluster B):** Applications of exponential processes
- Beer-Lambert law and vertical profiles
- Trigonometric functions for solar geometry
- Vector dot products

**Essays 7-9 (Cluster C):** Multivariable calculus and optimization
- Functions of two variables (terrain elevation)
- Partial derivatives and gradient vectors
- Graph theory and flow routing
- Local optimization

**Essays 10-11 (Cluster D):** Spatial interaction models
- Inverse power laws and distance decay
- Discrete-time dynamical systems
- Network diffusion processes

**Essay 12 (Cluster E):** Coordinate transformations
- Spherical coordinate systems
- Latitude/longitude to Cartesian
- Rotational kinematics

## Computational Skills Developed

- Function implementation and visualization
- Numerical integration (Euler, Runge-Kutta)
- Gradient calculation from raster data
- Graph algorithms (flow routing, shortest path)
- Interactive parameter exploration
- Vector field visualization

## Prerequisites

**Assumed:** Algebra I (linear equations, exponents, basic graphing)

**Not assumed:** Calculus, differential equations, programming (taught from scratch)

## Entry Points by Background

**High school students (advanced):** Start at Essay 1, work sequentially. Expect 3-4 hours per essay.

**Undergraduates (STEM):** Skim Essays 1-3 if calculus background. Focus on modeling perspective.

**Geography students (quantitative gap):** Start Essay 1. Series designed to build mathematical confidence.

**Engineering students (spatial gap):** Essays 7-9 (terrain analysis) and 10-11 (human systems) provide geographic context for familiar mathematics.

## Essay Sequence

### Cluster A: Modeling Change (Essays 1-4)

**Essay 1: What Is a Spatial Model?**
Introduction to variables, units, dimensional analysis. Scalar fields. First computational implementations.

**Essay 2: Linear Change and Rate**
Slope as rate of change. Linear functions in geographic contexts (elevation profiles, population growth). Introduction to derivatives.

**Essay 3: Exponential Growth and Logarithms**
Population growth, compound interest. First differential equation: dP/dt = rP. Analytical vs numerical solutions.

**Essay 4: Logistic Growth and Equilibrium**
Carrying capacity and saturation. Phase plots. Stability analysis. Numerical integration.

### Cluster B: Energy and Attenuation (Essays 5-6)

**Essay 5: Light Attenuation in a Canopy**
Beer-Lambert law. Exponential decay with depth. Vertical profiles in forests and water columns.

**Essay 6: Solar Geometry and Projection**
Trigonometry for solar angles. Dot product as geometric projection. Aspect and hillshade.

### Cluster C: Terrain and Spatial Derivatives (Essays 7-9)

**Essay 7: Digital Elevation Models as Functions**
Two-variable functions. Finite differences. Raster data structures as discretized continuous functions.

**Essay 8: Gradient, Aspect, and Direction of Steepest Descent**
Partial derivatives. Gradient vector magnitude and direction. Slope and aspect calculation.

**Essay 9: Hydrological Flow as Optimization**
Steepest descent as local optimization. Graph construction from DEMs. Flow accumulation and drainage networks.

### Cluster D: Human Systems as Mathematical Systems (Essays 10-11)

**Essay 10: Gravity Models of Trade and Migration**
Inverse square and power laws. Distance decay. Calibration and parameter estimation. Human mobility as physics analogy.

**Essay 11: Spatial Diffusion of Innovation**
Discrete-time models. Logistic curves in space and time. Network adjacency. Contagion processes.

### Cluster E: Observing the Earth (Essay 12)

**Essay 12: Earth as a Rotating Sphere**
Spherical coordinates. Angular velocity and rotational period. Coordinate transformations. Earth observation geometry foundation.

## Assessment Strategies

**Formative:**
- Interactive parameter manipulation (immediate feedback)
- Worked examples with detailed solutions
- "What Could Go Wrong?" sections for common errors

**Summative suggestions:**
- Derive model for novel geographic phenomenon
- Implement and validate numerical solution
- Sensitivity analysis on real dataset
- Critical evaluation of model assumptions

## Extensions and Pathways

**For mathematical depth:** Continue to Series 2 (energy balance, hydrology) for PDEs and conservation laws.

**For spatial analysis:** Jump to Series 3 (map algebra, interpolation, spatial statistics).

**For remote sensing:** Series 5 after completing Series 1 and basics of Series 2.

**For hazards:** Series 6 (atmospheric) requires Series 1 + selected Series 2 essays.

## Key Insights Students Gain

1. **Geography requires quantitative reasoning.** Spatial patterns demand mathematical description.

2. **Models are simplifications with purpose.** Perfect accuracy isn't the goal; insight is.

3. **Differential equations describe rates of change.** Most geographic processes are rate-driven.

4. **Numerical methods enable solutions.** Most real equations lack analytical solutions.

5. **Parameters control behavior.** Small parameter changes can produce qualitatively different outcomes.

6. **Human systems follow mathematical regularities.** Social phenomena exhibit quantitative patterns.

7. **Computation makes mathematics tangible.** Code reveals what equations mean operationally.

## Further Resources

All essays are self-contained with complete derivations. Additional resources:

- Interactive visualizations (ECharts/Canvas)
- Raspberry Pi compatible implementations
- Python/Julia code examples
- Dataset links for real-world applications

## Estimated Time Investment

**Per essay:** 2-4 hours (reading + working example + implementation)

**Full series:** 30-50 hours for thorough engagement

**Accelerated path:** 20-30 hours (skim familiar material)

---

**Next:** Proceed to Series 2 (Environmental Systems) for energy balance, hydrological processes, and ecosystem modeling. Or skip to Series 3 (Spatial Analysis) for GIS-oriented techniques.
