---
layout: essay
title: Linear Models in Environmental Systems
author: paul-hobson
date: 2026-03-06
categories: [maths]
tags: [math-primer, modelling, linear-models]
series: "Math Primer M2: Mathematical Models"
series_order: 1
math: true
viz: true
excerpt: Linear models as the simplest mathematical descriptions of change in environmental systems.
permalink: /math/2/linear-models/
---

## Why this matters

The first useful model scientists usually build is a **linear model**.

Linear models are not perfect representations of nature. The real world is messy, nonlinear, and full of feedbacks. But linear models are incredibly valuable because they give us a **first approximation** of how a system behaves.

Hydrologists use linear models to estimate river discharge from rainfall.  
Atmospheric scientists use linear approximations to describe temperature change with altitude.  
Economists use linear models to estimate how energy demand changes with price.

Linear models are powerful because they are:

- easy to compute
- easy to interpret
- often surprisingly accurate for small changes

Understanding them is the gateway to almost every other modelling technique.

---

## The structure of a linear model

A linear model takes the form

$$
y = ax + b
$$

where

- $x$ is the independent variable
- $y$ is the dependent variable
- $a$ is the slope
- $b$ is the intercept

The slope represents the **rate of change** between variables.

If $a = 3$, then every increase of one unit in $x$ increases $y$ by three units.

---

## Understanding the slope

The slope is often the most important part of a linear model.

Mathematically:

$$
a = \frac{\Delta y}{\Delta x}
$$

This represents the change in $y$ for a given change in $x$.

For example, suppose temperature decreases by 6.5°C for every kilometre increase in altitude.

The slope would be

$$
a = -6.5
$$

---

## Worked example

Suppose river discharge depends on rainfall according to

$$
Q = 2R + 5
$$

where

- $Q$ is discharge in m³/s
- $R$ is rainfall in mm/hr

If rainfall is 10 mm/hr:

$$
Q = 2(10) + 5 = 25
$$

The predicted discharge is **25 m³/s**.

---

## Visualization

```html
<div data-viz="echarts" style="height:360px" data-options='{
"xAxis":{"type":"value","name":"Rainfall (mm/hr)"},
"yAxis":{"type":"value","name":"Discharge (m³/s)"},
"series":[{"type":"line","data":[[0,5],[5,15],[10,25],[15,35]]}]
}'></div>
```

This graph illustrates a linear relationship between rainfall and discharge.

---

## Geographic case study: temperature lapse rate

Temperature typically decreases with altitude according to the **environmental lapse rate**.

A simplified model is

$$
T = 15 - 0.0065h
$$

where

- $T$ is temperature in °C
- $h$ is altitude in metres

At 2000 m elevation:

$$
T = 15 - (0.0065)(2000)
$$

$$
T = 2°C
$$

This linear approximation works well within the lower atmosphere.

---

## Common mistakes

**Mistake 1: assuming all relationships are linear**

Many relationships are linear only within limited ranges.

**Mistake 2: ignoring units**

Slope always carries units.

**Mistake 3: extrapolating too far**

Linear models break down outside the range of observed data.

---

## Concept checklist

Before using a linear model:

1. Identify the independent variable.
2. Identify the dependent variable.
3. Determine the slope.
4. Check units carefully.
5. Ensure the relationship is approximately linear.

---

## Practice problems

1. If $y = 4x + 2$, what is $y$ when $x = 6$?
2. A model states $Q = 3R + 4$. What is discharge when rainfall is 8 mm/hr?
3. What does the slope represent physically in a linear model?

---

## Answer sketches

1. $y = 26$
2. $Q = 28$
3. The slope represents the rate of change between variables.

---

## Where this goes next

Linear models are powerful, but many environmental systems behave in more complex ways. The next essay explores **nonlinear behaviour**, where relationships curve rather than forming straight lines.
