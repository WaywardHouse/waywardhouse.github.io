---
layout: essay
title: Proportional and Inverse Relationships
author: paul-hobson
date: 2026-03-06
categories:
  - maths
tags:
  - mathematics
  - tutorial
  - math-primer
series: "Math Primer M1: Numbers, Units, and Algebra"
series_order: 5
math: true
viz: true
excerpt: Direct and inverse proportionality as the mathematical language of scaling relationships in environmental systems.
permalink: /math/1/proportional-and-inverse-relationships/
---

## Why this matters

Many relationships in the physical world are not random. They follow patterns of *proportion*.

If rainfall doubles, runoff might double.
If distance doubles, travel time might double.
If the distance from a light source doubles, the brightness becomes much weaker.

These kinds of relationships appear constantly in environmental modelling, physics, economics, and geography.

Understanding proportional relationships lets you answer questions like:

- If a watershed is twice as large, how much more water might it produce?
- If a satellite moves twice as far away from Earth, how does gravity change?
- If wind speed doubles, how might erosion change?

These questions all rely on the same core idea: **scaling**.

This essay introduces the two most common scaling relationships:

1. **Direct proportionality**
2. **Inverse proportionality**

Once you understand these, many natural laws become easier to interpret.

---

## The main ideas

This essay covers three closely related ideas:

- Direct proportional relationships
- Inverse proportional relationships
- Log–log relationships as a preview of power laws

These ideas appear repeatedly in environmental models, especially when systems scale across different sizes.

---

## Direct proportionality

Two quantities are directly proportional if one increases in constant proportion to the other.

Mathematically, this relationship can be written as

$$
y = kx
$$

where

- $x$ is the independent variable
- $y$ is the dependent variable
- $k$ is the constant of proportionality

If $x$ doubles, $y$ also doubles.

### Example: river discharge

River discharge is defined as

$$
Q = Av
$$

where

- $Q$ = discharge
- $A$ = cross‑sectional area
- $v$ = velocity

If velocity remains constant, discharge is directly proportional to area.

Doubling the cross‑sectional area doubles the discharge.

---

## Visualising proportional relationships

A proportional relationship produces a straight line passing through the origin.

```html
<div data-viz="echarts" style="height:340px" data-options='{
"xAxis":{"type":"value","name":"Watershed Area"},
"yAxis":{"type":"value","name":"Runoff"},
"series":[{"type":"line","data":[[1,1],[2,2],[3,3],[4,4],[5,5]]}]
}'></div>
```

The straight line shows that every increase in $x$ produces a proportional increase in $y$.


---

## Inverse proportionality

Some relationships work in the opposite way.

As one quantity increases, the other decreases.

This is called **inverse proportionality**.

The mathematical form is

$$
y = \frac{k}{x}
$$

Here:

- increasing $x$ makes $y$ smaller
- decreasing $x$ makes $y$ larger

---

## Example: light intensity

Light intensity follows the **inverse square law**.

$$
I = \frac{k}{r^2}
$$

where

- $I$ = intensity
- $r$ = distance from the source

If you move twice as far away, brightness becomes

$$
\frac{1}{4}
$$

as strong.

This relationship appears in:

- gravity
- radiation
- sound intensity

---

## Worked example

Suppose sunlight intensity near the ground is

$$
1000 \; W/m^2
$$

at distance $r$.

If the distance from the source doubles:

$$
I_2 = \frac{1000}{2^2}
$$

$$
I_2 = 250 \; W/m^2
$$

The energy drops dramatically because of the squared distance term.

---

## Geography example — watershed scaling

Hydrologists often estimate discharge based on watershed area.

Suppose

$$
Q = kA
$$

If

- watershed A = 50 km²
- discharge = 20 m³/s

Then for a watershed twice the size:

$$
Q = 40 m^3/s
$$

assuming similar rainfall and terrain.

This simple scaling relationship forms the starting point for many flood models.

---

## Common mistakes

### Confusing proportional with linear

All proportional relationships are linear, but not all linear relationships are proportional.

A proportional relationship always passes through the origin.

### Ignoring the exponent

Inverse square relationships change much faster than simple inverse relationships.

### Forgetting the constant

The proportionality constant $k$ carries the physical meaning of the relationship.

---

## A compact checklist

When you see a scaling relationship:

1. Ask whether the variables increase together or opposite.
2. Identify the constant of proportionality.
3. Check whether the relationship is linear or inverse.
4. Inspect units to confirm the equation makes sense.

---

## Check your understanding

1. If $y = 3x$, what happens when $x$ doubles?
2. If $y = \frac{12}{x}$ and $x = 3$, what is $y$?
3. If gravity follows $g = \frac{k}{r^2}$, what happens when distance triples?

---

## Answer sketches

1. $y$ doubles.
2. $y = 4$.
3. Gravity becomes $\frac{1}{9}$ as strong.

---

## Where this goes next

Proportional relationships are the simplest scaling laws.

But many environmental systems involve **ranges of possible values rather than single numbers**.

To describe those ranges we need **inequalities and intervals**, which allow us to describe constraints such as:

- safe concentration limits
- flood thresholds
- temperature ranges

That is the subject of the next essay.
