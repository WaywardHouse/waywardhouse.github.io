---
layout: essay
title: "What Is a Spatial Model?"
subtitle: "Variables, units, and the discipline of thinking in fields"
date: 2025-01-01
last_modified_at: 2025-01-01
author: Paul-Hobson
categories: modeling
series: computational-geography-laboratory
series_order: 1
cluster: "A — Modeling Change"
tags: [variables, units, scalar-fields, proportional-reasoning, modeling]
math: true
viz: false

math_core: ["variables", "units", "proportional reasoning", "scalar fields"]
spatial_reasoning: 1
dynamics: 0
computation: 1
domain: ["physical geography", "human geography"]
difficulty: 1

tags:
  - computational-geography
  - modeling
  - mathematics
  - spatial-thinking

excerpt: >
  Before we can model anything — a forest, a city, a watershed — we need to
  understand what a model actually is. This essay builds that foundation:
  variables, units, proportional reasoning, and the idea of a scalar field.
  No calculus required. Just careful thinking about what we choose to measure
  and why.

math_prerequisites: >
  Basic arithmetic. Familiarity with the idea of a variable (a letter that
  stands for a number). That is all. Everything else is introduced here.

math: true
viz: true
---

Geography has a measurement problem.

Not a shortage of data — we have more of that than ever, more sensors, more satellites, more census tables, more logged coordinates than any previous generation of geographers could have imagined. The problem is interpretive. We collect quantities without always asking: *what kind of thing is this number? What does it mean for it to change? What other quantities does it depend on? And by how much?*

These are the questions a model forces you to answer. A model is not a metaphor and it is not a map. It is a precise claim about relationships between measurable quantities — a claim specific enough to be tested, refined, or discarded.

This essay builds the foundation. We start with the most elementary ideas: what a variable is, why units matter more than most people think, what proportional reasoning actually means, and what it means to think of a geographic quantity as a *field* spread across space. None of this requires calculus. It requires only care.

---

## 1. The Question

Here is a deceptively simple question: **does a city's population determine how much green space it has?**

You might have an intuition. Larger cities are denser, perhaps greener space is crowded out. Or perhaps wealthier larger cities invest more in parks. The intuition alone is not useful. To make it useful, we need to:

1. Decide what we mean by "population" — total count? per km²? 
2. Decide what we mean by "green space" — total area? fraction of city area? per capita?
3. Decide what kind of relationship we expect — linear? diminishing?
4. Measure both quantities in multiple cities
5. Ask whether the data supports the claimed relationship

Each of those steps is part of building a model. The mathematics, when we get to it, is just a language for making the relationships precise enough to test.

---

## 2. The Conceptual Model

A **model** is a simplification of reality that preserves the relationships we care about and discards the rest.

When a geographer builds a model, she is making a series of explicit choices:

- **What to include** — which quantities matter for the question at hand
- **What to exclude** — which quantities are irrelevant, or too complex, or out of scope
- **What relationships to assert** — how the included quantities depend on each other

This sounds obvious until you try it. Most students, asked to model something, want to include everything. But a model that includes everything is just reality again, and just as hard to understand.

The discipline of modeling is the discipline of *justified omission*.

Consider a simple example. We want to model how population density varies across a city. We might decide:

- **Include:** location (x, y coordinates), population count per unit area
- **Exclude:** age structure, income, ethnicity, building height, historical land use
- **Assert:** density varies smoothly with location and can be represented as a continuous surface

That last assertion is what makes this a *spatial* model. We are claiming that the quantity of interest — density — has a value at every point in space. Mathematically, we are treating density as a *function of location*.

---

## 3. Building the Mathematical Model

### Variables

A **variable** is a quantity that can take different values. We give it a letter so we can write relationships compactly.

In geography we commonly work with:

- **Spatial variables:** location, usually written as $(x, y)$ in a flat projection, or $(\lambda, \phi)$ for longitude and latitude on a sphere
- **Attribute variables:** the thing being measured at each location — temperature $T$, elevation $z$, population density $\rho$, rainfall $P$

The distinction between "where" and "what" is fundamental. Most geographic modeling is about expressing the *what* as a function of the *where*.

### Units

Every variable has **units** — the standard quantity against which we measure it. Units are not decorative. They are part of the meaning of a number.

Consider population density. The number 5000 means nothing without units. It could be:

- 5000 people per km² — a very dense urban neighbourhood
- 5000 people per 100 km² — a small town in a sparse rural region
- 5000 people per m² — physically impossible; no city has this density

A unit analysis is a powerful error-checking tool. When you multiply or divide quantities, the units multiply and divide too. If the units of the result are wrong, the calculation is wrong.

**Example:** We want to know the total population $N$ in a region of area $A$, given a uniform density $\rho$.

$$N = \rho \times A$$

Checking units: 

$$\text{people} = \frac{\text{people}}{\text{km}^2} \times \text{km}^2$$

The km² cancels, leaving people. The units work out. This is a good sign — not a guarantee of correctness, but a necessary condition.

If instead we had written $N = \rho / A$, the units would give:

$$\frac{\text{people}/\text{km}^2}{\text{km}^2} = \frac{\text{people}}{\text{km}^4}$$

That is not a meaningful quantity. The unit check catches the error before we ever plug in numbers.

> **Unit-checking habit:** before evaluating any formula, write out the units of every variable and verify that the right-hand side simplifies to the units of the left-hand side.

### Proportional Reasoning

**Proportional reasoning** is the skill of asking: if one quantity changes by some factor, what happens to another?

Suppose population density $\rho$ is uniform across a circular city of radius $r$. The area of the city is:

$$A = \pi r^2$$

And total population is:

$$N = \rho \times \pi r^2$$

Now: if the city doubles its radius, what happens to its population?

We replace $r$ with $2r$:

$$N' = \rho \times \pi (2r)^2 = \rho \times \pi \times 4r^2 = 4N$$

Doubling the radius quadruples the population. This is a non-obvious result that falls directly out of proportional reasoning. The city's footprint grows faster than its linear dimension, because area scales as the *square* of length.

This kind of reasoning — tracking how outcomes scale with inputs — is one of the most useful skills in applied geography, and in any quantitative field.

### Scalar Fields

A **scalar field** is a function that assigns a single number (a scalar) to every point in space.

Formally, if space is two-dimensional with coordinates $(x, y)$, a scalar field $f$ is:

$$f : (x, y) \mapsto \mathbb{R}$$

That notation means: given any location $(x, y)$, $f$ returns a real number.

Examples of geographic scalar fields:

| Field | Symbol | Units |
|---|---|---|
| Elevation | $z(x, y)$ | metres above sea level |
| Mean annual temperature | $T(x, y)$ | °C |
| Population density | $\rho(x, y)$ | people / km² |
| Annual precipitation | $P(x, y)$ | mm / year |
| Soil organic carbon | $C(x, y)$ | kg / m² |

When we plot a scalar field as a map — a topographic contour map, an isotherm map, a choropleth — we are drawing the surface $f(x, y)$, either exactly (as a continuous surface in 3D) or through level-set contours (lines of constant value).

The scalar field concept is the mathematical foundation of most of physical geography. The entire apparatus of gradient, slope, flow routing, and terrain analysis that we will build through this series rests on this single idea: that geographic quantities vary continuously across space and can be treated as functions.

---

## 4. Worked Example by Hand

**Problem.** A field survey of a rectangular study area 10 km × 8 km records the following average tree cover fractions at five sample points:

| Location | $x$ (km) | $y$ (km) | Tree cover fraction $f$ |
|---|---|---|---|
| A | 1 | 1 | 0.72 |
| B | 5 | 1 | 0.55 |
| C | 9 | 1 | 0.41 |
| D | 3 | 6 | 0.68 |
| E | 7 | 6 | 0.48 |

We want to estimate:
1. The mean tree cover fraction across the study area
2. Total forested area (km²) implied by the mean

**Step 1 — Mean fraction.**

$$\bar{f} = \frac{0.72 + 0.55 + 0.41 + 0.68 + 0.48}{5} = \frac{2.84}{5} = 0.568$$

**Step 2 — Total area of the study region.**

$$A = 10 \text{ km} \times 8 \text{ km} = 80 \text{ km}^2$$

**Step 3 — Estimated forested area.**

$$A_{\text{forest}} = \bar{f} \times A = 0.568 \times 80 \text{ km}^2 = 45.4 \text{ km}^2$$

**Step 4 — Unit check.**

$$\text{km}^2 = [\text{dimensionless}] \times \text{km}^2 \checkmark$$

Tree cover fraction is dimensionless (a ratio of area to area). Multiplying by area gives area. ✓

**What we haven't done:** we treated the study area as if it had the mean fraction everywhere. That is an assumption — and a strong one. Points on the eastern edge have lower cover (0.41 and 0.48) than points on the west (0.72 and 0.68). The real field is not uniform; it has spatial structure. A better estimate would weight the sample points by the area they represent, or fit a smooth surface to them. Those techniques come in later essays. For now, note the assumption and its limitation.

---

## 5. Computational Implementation

A scalar field defined by sample points can be represented in several ways computationally. The simplest is a flat table.

```python
import numpy as np

# Sample data: (x_km, y_km, tree_cover_fraction)
samples = np.array([
    [1, 1, 0.72],
    [5, 1, 0.55],
    [9, 1, 0.41],
    [3, 6, 0.68],
    [7, 6, 0.48],
])

x = samples[:, 0]   # km
y = samples[:, 1]   # km
f = samples[:, 2]   # dimensionless

# Study area
width_km  = 10.0
height_km = 8.0
area_km2  = width_km * height_km

# Mean tree cover (simple average over sample points)
f_mean = np.mean(f)

# Estimated forested area
forest_km2 = f_mean * area_km2

print(f"Mean tree cover fraction : {f_mean:.3f}")
print(f"Study area               : {area_km2:.1f} km²")
print(f"Estimated forested area  : {forest_km2:.1f} km²")
```

**Output:**
```
Mean tree cover fraction : 0.568
Study area               : 80.0 km²
Estimated forested area  : 45.4 km²
```

This matches our by-hand result exactly — a useful cross-check. In production work, you would want to use spatial interpolation (inverse-distance weighting, or kriging) to produce a continuous surface estimate rather than a single mean. Those methods treat the field as a function of $(x, y)$ and make predictions at unsampled locations. They are the subject of later essays in this series.

---

## 6. Visualization

The five sample points, plotted in their spatial locations and shaded by tree cover fraction, give the simplest possible scalar field visualization: a dot map with a colour dimension.

```
y (km)
  8 |                                    
  6 |      D(0.68)           E(0.48)    
  4 |                                    
  2 |                                    
  1 |  A(0.72)   B(0.55)       C(0.41) 
  0 +----+----+----+----+----+----+----+
    0    2    4    6    8   10      x (km)
```

Even this simple diagram reveals spatial structure. Cover is high in the west (A, D) and declines toward the east (C, E). A linear gradient from west to east is a plausible hypothesis — and a hypothesis we could test by fitting a linear function $f(x) = a - bx$ to the data.

In a later essay we will render this as an interactive D3 surface, with interpolation between sample points and a colour scale. For now, the key perceptual point is enough: spatial data has structure, and that structure is the signal we are trying to model.

---

## 7. Interpretation

What have we actually done here?

We started with a practical question (how much of this study area is forested?) and produced an answer (about 45 km², or 57% of the total area). But more importantly, we:

- Named the quantity we cared about as a **variable** ($f$, tree cover fraction)
- Tracked its **units** (dimensionless — which itself is a unit)
- Used **proportional reasoning** to multiply correctly (fraction × area = area)
- Recognized that our sample points are observations of an underlying **scalar field** $f(x, y)$

That last recognition is what makes this a spatial model rather than just an average. It opens the door to asking spatial questions: where is cover highest? Does it follow a gradient? Is there a boundary? Does it correlate with elevation, rainfall, or proximity to roads? All of those questions treat $f$ as a function of location — and that is the core of computational geography.

The mean we computed is a zeroth-order model of the field: it says the field is constant everywhere, equal to its average. It is wrong in detail but useful as a baseline. Every refinement — interpolation, regression, kriging, machine learning — is a more sophisticated answer to the same question: how does this quantity vary across space, and why?

---

## 8. What Could Go Wrong?

**Biased sampling.** Our five points are not randomly distributed. Three are along the southern edge ($y = 1$), two along the northern edge ($y = 6$). No points fall in the middle of the study area. If tree cover in the middle differs systematically from the edges — say, because a river runs through it — our mean is biased.

**The units trap.** If one field crew recorded cover in percent (72, 55, 41...) and another in fraction (0.68, 0.48...) and you averaged them without noticing, your mean would be numerically meaningless. Always verify units before combining data from different sources.

**Conflating the model with the field.** Our model gives a single number for "mean tree cover." The actual field has spatial variation, edges, patches, gradients. When we report 45.4 km² of forest, we are reporting a model output, not a measured fact. The uncertainty in that number — which depends on sample size, spatial autocorrelation, and the validity of our averaging approach — is at least as important as the number itself.

**Inappropriate precision.** We reported 45.4 km². Given five sample points covering 80 km², the precision implied by that decimal place is not warranted. A more honest report: approximately 45 km², with uncertainty of perhaps ±10 km² depending on spatial variability. Precision without accuracy is misleading.

---

## 9. Math Refresher

### Variables and Functions

A **variable** is a symbol (usually a letter) that represents a quantity that can take different values. A **function** is a rule that assigns exactly one output value to each input value.

We write $f(x)$ to mean "the value of function $f$ when the input is $x$." For a scalar field in two dimensions, we write $f(x, y)$ — the value of the field at location $(x, y)$.

### Arithmetic with Units

When you multiply two quantities, you multiply both the numbers and the units:

$$3 \text{ km} \times 4 \text{ km} = 12 \text{ km}^2$$

When you divide, units divide too:

$$\frac{100 \text{ people}}{4 \text{ km}^2} = 25 \text{ people/km}^2$$

When you add or subtract, units must match:

$$3 \text{ km} + 500 \text{ m} = 3 \text{ km} + 0.5 \text{ km} = 3.5 \text{ km}$$

You cannot add 3 km to 500 m without converting first.

### Proportional Reasoning

If $y = kx$ for some constant $k$, then $y$ is **directly proportional** to $x$. Doubling $x$ doubles $y$.

If $y = k/x$, then $y$ is **inversely proportional** to $x$. Doubling $x$ halves $y$.

If $y = kx^2$, then $y$ is proportional to the **square** of $x$. Doubling $x$ quadruples $y$.

Proportional reasoning means asking: what is the relationship between $x$ and $y$, and what does a change in $x$ imply for $y$? It is one of the most transferable skills in quantitative thinking.

---

## Where Next?

This essay introduced the vocabulary of spatial modeling: variables, units, proportional reasoning, and scalar fields. These ideas will appear in every essay that follows.

The next essay — **Linear Change and Rate** — takes the scalar field idea one step further. If a quantity changes linearly across space, the *rate of change* (the slope) is itself a meaningful geographic quantity. We will build linear functions, interpret their parameters, and use them to make predictions.

**In this series:**
- → [Linear Change and Rate](#) *(next)*
- [Exponential Growth and Logarithms](#)
- [Logistic Growth and Equilibrium](#)

**If you want to go deeper now:**
- The concept of a scalar field is a special case of a *tensor field*. In later essays we will encounter vector fields (which assign a direction as well as a magnitude to each point) when we study terrain gradients and wind.
- The spatial sampling problem touched on in §8 is the subject of *geostatistics*, particularly the branch concerned with optimal interpolation (kriging). A readable introduction is Cressie's *Statistics for Spatial Data* (1993).

---

*Cluster A — Modeling Change · Essay 1 of 4 · Difficulty: 1*

*Math prerequisites: arithmetic, the concept of a variable.*