---
layout: essay
title: Logistic Growth
author: paul-hobson
date: 2026-03-06
categories: [maths]
tags: [math-primer, modelling, population]
series: "Math Primer M2: Mathematical Models"
series_order: 5
math: true
viz: true
excerpt: Logistic growth as the simplest model describing populations that grow rapidly before stabilizing at environmental limits.
permalink: /math/2/logistic-growth/
---

## Why this matters

Many natural systems grow rapidly at first and then slow down as resources become limited.

Examples include:

- wildlife populations in ecosystems
- bacterial growth in laboratory cultures
- urban population expansion
- spread of invasive species

Early growth may appear exponential, but unlimited exponential growth is unrealistic. Eventually resources such as food, space, or energy constrain the system.

The **logistic growth model** captures this behavior.

It is one of the most important models in ecology, environmental science, and even machine learning.

---

## Exponential growth revisited

The simplest population model is exponential growth:

$$
\frac{dN}{dt} = rN
$$

where

- $N$ is population size
- $r$ is the growth rate

The solution is

$$
N(t) = N_0 e^{rt}
$$

This predicts unlimited growth.

But in real environments, growth slows as population size approaches environmental limits.

---

## Introducing carrying capacity

The logistic model introduces a maximum sustainable population called the **carrying capacity**.

The differential equation becomes

$$
\frac{dN}{dt} = rN \left(1 - \frac{N}{K} \right)
$$

where

- $K$ is carrying capacity

When $N$ is small relative to $K$, growth is nearly exponential.

When $N$ approaches $K$, growth slows.

---

## Worked example

Suppose

- $r = 0.3$
- $K = 1000$
- $N_0 = 50$

The system initially grows quickly but eventually stabilizes near 1000 individuals.

This behaviour produces the classic **S‑shaped growth curve**.

---

## Visualization

```html
<div data-viz="echarts" style="height:360px" data-options='{
"xAxis":{"type":"value","name":"Time"},
"yAxis":{"type":"value","name":"Population"},
"series":[{"type":"line","data":[[0,50],[1,80],[2,140],[3,260],[4,420],[5,600],[6,750],[7,860],[8,930],[9,970]]}]
}'></div>
```

---

## Geographic case study

The recovery of the **Yellowstone wolf population** after reintroduction followed a pattern resembling logistic growth.

Initial population growth was rapid due to abundant prey and limited competition. Over time the population stabilized as ecological limits were reached.

This example illustrates how logistic models can capture real ecological dynamics.

---

## Common mistakes

**Mistake 1:** Assuming exponential growth continues forever.

**Mistake 2:** Treating carrying capacity as fixed. In reality, environmental limits can change due to climate, human activity, or ecological interactions.

**Mistake 3:** Ignoring stochastic variation. Real populations fluctuate around equilibrium.

---

## Concept checklist

Before applying a logistic model:

1. Identify the growth rate $r$.
2. Estimate the carrying capacity $K$.
3. Determine the initial population $N_0$.
4. Examine whether the system plausibly follows logistic dynamics.

---

## Practice problems

1. If $K = 500$ and $N = 250$, what fraction of the maximum growth rate occurs?
2. Why does growth slow when $N$ approaches $K$?
3. Give an environmental example where logistic growth might apply.

---

## Where this goes next

Logistic models introduce the idea of **equilibria** — states where systems stop changing. Understanding equilibrium behaviour leads us directly to the study of **stability**.
