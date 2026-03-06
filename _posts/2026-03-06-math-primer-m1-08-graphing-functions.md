---
layout: essay
title: Graphing Functions
author: paul-hobson
date: 2026-03-06
categories:
  - maths
tags:
  - mathematics
  - tutorial
  - math-primer
series: "Math Primer M1: Numbers, Units, and Algebra"
series_order: 8
math: true
viz: true
excerpt: Graphs as visual representations of functional relationships.
permalink: /math/1/graphing-functions/
---

## Why this matters

Equations describe relationships.  
Graphs **show** them.

When we graph a function, we turn algebra into geometry.

Patterns that might be hidden in numbers become visible instantly.

---

## Coordinates

Graphs are drawn on coordinate axes.

The horizontal axis is usually

$$
x
$$

The vertical axis is

$$
y
$$

Each point on the graph corresponds to a pair

$$
(x,y)
$$

---

## Example

Consider

$$
y = 2x
$$

Points include

| x | y |
|---|---|
|1|2|
|2|4|
|3|6|

Plotting these points produces a straight line.

---

## Visualisation

```html
<div data-viz="echarts" style="height:320px" data-options='{
"xAxis":{"type":"value"},
"yAxis":{"type":"value"},
"series":[{"type":"line","data":[[0,0],[1,2],[2,4],[3,6]]}]
}'></div>
```

---

## Geography example

Hydrologists often graph river discharge through time.

A graph quickly shows:

- rising flood levels
- seasonal patterns
- drought periods

---

## Practice problems

1. Plot the points from $y = 3x$ for x = 1..4.
2. What shape does the graph form?
