---
layout: essay
title: Differential Equations
author: paul-hobson
date: 2026-03-06
categories:
  - maths
tags:
  - mathematics
  - modelling
  - differential-equations
series: "Math Primer M2: Mathematical Models"
series_order: 9
math: true
viz: true
excerpt: Differential equations as the mathematical language of change in physical and environmental systems.
permalink: /math/2/differential-equations/
---

## Why this matters

Many natural systems are defined by **rates of change**.

Examples include:

- temperature changing through time
- water flowing through a watershed
- atmospheric pressure evolving in storms
- populations growing or shrinking

To describe these systems mathematically we use **differential equations**.

A differential equation relates a quantity to the rate at which that quantity changes.

---

## Basic structure

A differential equation often looks like

$$
\frac{dx}{dt} = f(x)
$$

This expression means:

the rate of change of x with respect to time equals some function of x.

---

## Example: exponential growth

One of the simplest differential equations is

$$
\frac{dN}{dt} = rN
$$

where

- N = population
- r = growth rate

The solution is

$$
N(t) = N_0 e^{rt}
$$

This describes exponential growth.

---

## Geography example

Groundwater recharge in aquifers is often modelled using differential equations describing water flow through porous rock.

---

## Practice

1. What does the derivative \(dx/dt\) represent?
2. Why are differential equations useful in modelling physical systems?
