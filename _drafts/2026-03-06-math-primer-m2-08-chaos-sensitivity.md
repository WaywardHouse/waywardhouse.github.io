---
layout: essay
title: Chaos and Sensitivity
author: paul-hobson
date: 2026-03-06
categories: [maths]
tags: [math-primer, chaos, nonlinear]
series: "Math Primer M2: Mathematical Models"
series_order: 8
math: true
viz: true
excerpt: Chaos theory and sensitivity to initial conditions in nonlinear environmental systems.
permalink: /math/2/chaos/
---

## Why this matters

Some systems behave in ways that appear random even though they follow deterministic rules.

This phenomenon is called **chaos**.

Chaotic systems are extremely sensitive to initial conditions.

A tiny difference at the start can produce dramatically different outcomes later.

---

## Sensitive dependence

A classic example is the **Lorenz system**, originally developed for atmospheric convection.

Small rounding differences in the initial state produced entirely different weather predictions.

This led to the famous idea of the **butterfly effect**.

---

## Logistic map

Chaos can appear even in simple equations.

The logistic map:

$$
x_{t+1} = r x_t (1 - x_t)
$$

For certain values of $r$, the system becomes chaotic.

---

## Visualization

```html
<div data-viz="echarts" style="height:360px" data-options='{
"xAxis":{"type":"category","data":["1","2","3","4","5","6","7","8"]},
"yAxis":{"type":"value","name":"State"},
"series":[{"type":"line","data":[0.4,0.8,0.6,0.9,0.3,0.7,0.2,0.8]}]
}'></div>
```

---

## Geographic case study

Atmospheric systems are chaotic. This is why long‑term weather forecasting is fundamentally limited even with powerful computational models.

Climate prediction relies instead on statistical patterns and ensemble modelling.

---

## Practice

1. What is meant by sensitive dependence on initial conditions?
2. Why does chaos limit long‑term prediction?
