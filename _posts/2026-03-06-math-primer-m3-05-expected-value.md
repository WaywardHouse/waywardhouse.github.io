---
layout: essay
title: Expected Value and Risk
author: paul-hobson
date: 2026-03-06
categories: [maths]
tags: [math-primer, probability, modelling]
series: "Math Primer M3: Probability and Data"
series_order: 5
math: true
viz: true
excerpt: Expected value as the mathematical idea behind risk, averages, and decision-making under uncertainty.
permalink: /math/3/expected-value/
---

## Why this matters

Environmental decisions rarely involve certainty. Floods, droughts, and storms all involve uncertain outcomes.
Expected value provides a way to combine probabilities with outcomes to understand long‑term averages.

## Definition

For a discrete random variable

$$
E[X] = \sum_i x_i P(x_i)
$$

where x_i are outcomes and P(x_i) their probabilities.

## Worked example

| Damage ($M) | Probability |
|-------------|-------------|
|0|0.6|
|10|0.3|
|50|0.1|

Expected damage:

$$
E[X] = 0(0.6) + 10(0.3) + 50(0.1) = 8
$$

Expected annual damage = **$8M**.

## Geography example

Flood‑risk planning uses expected value to estimate long‑term infrastructure damage and determine whether protective measures are economically justified.
