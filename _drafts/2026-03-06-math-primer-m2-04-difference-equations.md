---
layout: essay
title: Difference Equations
author: paul-hobson
date: 2026-03-06
categories: [maths]
tags: [math-primer, modelling, difference-equations]
series: "Math Primer M2: Mathematical Models"
series_order: 4
math: true
viz: true
excerpt: Difference equations as models of change through discrete time steps.
permalink: /math/2/difference-equations/
---

## Why this matters

Environmental data is often collected at discrete intervals.

Examples include:

- annual wildlife populations
- monthly rainfall totals
- yearly economic indicators

Difference equations describe how systems change from one time step to the next.

---

## Basic structure

A simple difference equation is

$$
x_{t+1} = x_t + r x_t
$$

where

- $x_t$ is the current value
- $r$ is the growth rate

---

## Worked example

If population grows by 10% per year

$$
x_{t+1} = 1.1 x_t
$$

Starting with 100 individuals:

Year 1:

$$
110
$$

Year 2:

$$
121
$$

---

## Visualization

```html
<div data-viz="echarts" style="height:360px" data-options='{
"xAxis":{"type":"category","data":["Year0","Year1","Year2","Year3"]},
"yAxis":{"type":"value","name":"Population"},
"series":[{"type":"line","data":[100,110,121,133]}
]}'></div>
```

---

## Geographic case study

Wildlife populations are often modelled with difference equations because reproduction cycles occur annually.

---

## Practice

1. If $x_0 = 50$ and $x_{t+1} = 1.2 x_t$, find $x_1$.
2. Why are difference equations useful for ecological models?
