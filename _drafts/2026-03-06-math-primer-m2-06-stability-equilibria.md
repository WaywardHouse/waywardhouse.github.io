---
layout: essay
title: Stability and Equilibria
author: paul-hobson
date: 2026-03-06
categories: [maths]
tags: [math-primer, modelling, dynamical-systems]
series: "Math Primer M2: Mathematical Models"
series_order: 6
math: true
viz: true
excerpt: Equilibrium states and stability as central ideas in dynamical systems and environmental modelling.
permalink: /math/2/stability/
---

## Why this matters

Many systems naturally move toward stable states.

Examples include:

- lakes stabilizing at certain nutrient levels
- atmospheric temperature balances
- wildlife populations fluctuating around sustainable levels

These stable conditions are called **equilibria**.

Understanding stability tells us whether a system returns to equilibrium after disturbance — or diverges toward instability.

---

## Equilibrium points

An equilibrium occurs when the system stops changing.

Mathematically this occurs when

$$
\frac{dx}{dt} = 0
$$

At equilibrium, the rate of change is zero.

---

## Logistic example

From the logistic model:

$$
\frac{dN}{dt} = rN \left(1 - \frac{N}{K} \right)
$$

Setting the derivative to zero gives

$$
N = 0
$$

or

$$
N = K
$$

These are the equilibrium points.

---

## Stability analysis

Small perturbations determine stability.

- If the system returns to equilibrium → **stable**
- If it diverges away → **unstable**

In the logistic model:

- $N=0$ is unstable
- $N=K$ is stable

---

## Visualization

```html
<div data-viz="echarts" style="height:340px" data-options='{
"xAxis":{"type":"value","name":"Population"},
"yAxis":{"type":"value","name":"Growth rate"},
"series":[{"type":"line","data":[[0,0],[200,120],[500,250],[800,120],[1000,0]]}]
}'></div>
```

---

## Geographic case study

Shallow lakes often display **two stable states**:

1. Clear water with aquatic vegetation
2. Turbid water dominated by algae

A disturbance such as nutrient runoff can shift the system from one equilibrium to another — a phenomenon known as a **regime shift**.

---

## Practice

1. Define equilibrium in a dynamical system.
2. Why is $N=0$ unstable in logistic growth?
3. Give a real environmental system that may have multiple stable states.
