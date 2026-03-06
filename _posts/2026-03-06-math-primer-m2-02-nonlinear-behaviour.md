---
layout: essay
title: Nonlinear Behaviour
author: paul-hobson
date: 2026-03-06
categories: [maths]
tags: [math-primer, modelling, nonlinear]
series: "Math Primer M2: Mathematical Models"
series_order: 2
math: true
viz: true
excerpt: Nonlinear systems and why real environmental processes rarely follow simple straight-line relationships.
permalink: /math/2/nonlinear-behaviour/
---

## Why this matters

Many environmental systems behave in ways that **cannot be described by straight lines**.

Population growth accelerates.  
Flood discharge increases rapidly during storms.  
Chemical reactions can suddenly intensify.

These are examples of **nonlinear systems**.

In nonlinear systems, small changes in input can produce disproportionately large outputs.

---

## Mathematical form

Nonlinear relationships often involve powers or exponentials.

Examples:

$$
y = x^2
$$

$$
y = e^x
$$

$$
y = ax^b
$$

These relationships produce curves instead of straight lines.

---

## Worked example

Suppose sediment transport increases with the square of river velocity.

$$
S = kv^2
$$

If velocity doubles, sediment transport increases by four times.

---

## Visualization

```html
<div data-viz="echarts" style="height:360px" data-options='{
"xAxis":{"type":"value","name":"Velocity"},
"yAxis":{"type":"value","name":"Sediment Transport"},
"series":[{"type":"line","data":[[1,1],[2,4],[3,9],[4,16]]}]
}'></div>
```

---

## Geographic case study

During storms, river discharge increases rapidly once soil saturation occurs. This nonlinear response explains why small rainfall increases can produce extreme floods.

---

## Common mistakes

1. Assuming linearity everywhere.
2. Ignoring nonlinear thresholds.
3. Underestimating extreme outcomes.

---

## Practice

1. If $y = x^2$, what is $y$ when $x = 5$?
2. Why do nonlinear systems often produce extreme events?
