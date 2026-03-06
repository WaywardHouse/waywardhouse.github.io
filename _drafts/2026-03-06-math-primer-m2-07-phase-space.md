---
layout: essay
title: Phase Space
author: paul-hobson
date: 2026-03-06
categories: [maths]
tags: [math-primer, dynamical-systems]
series: "Math Primer M2: Mathematical Models"
series_order: 7
math: true
viz: true
excerpt: Phase space as a geometric method for visualizing the behaviour of dynamical systems.
permalink: /math/2/phase-space/
---

## Why this matters

Rather than examining systems purely through equations, we can visualize their behaviour geometrically.

A **phase space** represents all possible states of a system.

Each point in phase space corresponds to a specific configuration of variables.

This approach is widely used in:

- physics
- ecology
- climate modelling
- orbital mechanics

---

## Two‑variable systems

If a system contains two variables, the phase space becomes a two‑dimensional plane.

For example:

- predator population
- prey population

Each point represents a specific pair of values.

---

## Predator–prey example

The Lotka–Volterra equations describe predator–prey interactions.

$$
\frac{dx}{dt} = ax - bxy
$$

$$
\frac{dy}{dt} = -cy + dxy
$$

Phase plots reveal oscillating population cycles.

---

## Visualization

```html
<div data-viz="echarts" style="height:360px" data-options='{
"xAxis":{"type":"value","name":"Prey"},
"yAxis":{"type":"value","name":"Predator"},
"series":[{"type":"line","data":[[30,4],[40,6],[50,9],[40,12],[30,9],[20,6],[30,4]]}]
}'></div>
```

---

## Geographic case study

Fisheries scientists use phase‑space analysis to understand predator‑prey dynamics between fish species and marine ecosystems.

Such models help identify sustainable harvest levels.

---

## Practice

1. What does a point in phase space represent?
2. Why are phase diagrams useful for nonlinear systems?
