---
layout: essay
title: "Linear Change and Rate"
subtitle: "Slope as the fundamental measure of how things change through space and time"
date: 2026-02-26
categories: [modeling]
series: computational-geography-lab
series_order: 2
cluster: A
cluster_title: "Modeling Change"
tags:
  - computational-geography
  - modeling
  - mathematics
  - linear-functions
  - derivatives
math: true
viz: true
difficulty: 1
math_core: [linear-functions, slope, rate-of-change, units-of-rate]
spatial_reasoning: 2
dynamics: 1
computation: 2
domain: [physical-geography, human-geography]
excerpt: >
  The simplest non-trivial model is a straight line. When temperature drops
  with elevation, when population grows with time, when erosion deepens with
  distance from a ridge — these are all linear relationships. Understanding
  slope means understanding rate, and rate is the language of change.
math_prerequisites: >
  Plotting points on a graph. Basic algebra (solving for x). The concept of a
  function from Essay 1. We'll build the idea of slope from first principles.
---

## 1. The Question

How do we describe change that happens at a constant rate?

Temperature drops as you climb a mountain. Population grows year by year. A river's gradient flattens as it approaches the sea. Some of these relationships are approximately linear over the range we care about. Others are exactly linear by design (a road built at 6% grade, a tax that increases by $50 per bracket).

**The question is:** How do we write down a linear relationship mathematically? What does the equation tell us? What does the slope mean, and why do the units matter?

---

## 2. The Conceptual Model

A linear relationship is one where equal changes in input produce equal changes in output.

Walk up 100 meters in elevation → temperature drops 0.6°C  
Walk up another 100 meters → temperature drops another 0.6°C  

This is linearity: **constant rate of change**.

The general form is:

$$y = mx + b$$

Where:
- $y$ is the output (the thing that responds)
- $x$ is the input (the thing we control or observe changing)
- $m$ is the slope (the rate of change)
- $b$ is the intercept (the value of $y$ when $x = 0$)

**Slope is the engine of the model.** It tells you how much $y$ changes for each unit change in $x$.

---

## 3. Building the Mathematical Model

### Deriving Slope from Two Points

Suppose we measure temperature at two elevations:

| Elevation (m) | Temperature (°C) |
|---------------|------------------|
| 1000          | 15.0             |
| 1500          | 12.0             |

How do we find the rate of change?

**Change in temperature:**  
$$\Delta T = T_2 - T_1 = 12.0 - 15.0 = -3.0 \text{ °C}$$

**Change in elevation:**  
$$\Delta z = z_2 - z_1 = 1500 - 1000 = 500 \text{ m}$$

**Rate of change (slope):**  
$$m = \frac{\Delta T}{\Delta z} = \frac{-3.0 \text{ °C}}{500 \text{ m}} = -0.006 \text{ °C/m}$$

The negative sign tells us temperature **decreases** with elevation. The magnitude tells us **by how much per meter**.

### Writing the Full Equation

We know $m = -0.006$ °C/m. We need the intercept $b$.

Using the point $(z_1, T_1) = (1000, 15.0)$:

$$T = mz + b$$
$$15.0 = (-0.006)(1000) + b$$
$$15.0 = -6.0 + b$$
$$b = 21.0 \text{ °C}$$

**Full model:**  
$$T(z) = -0.006z + 21.0$$

**Interpretation:**  
- At sea level ($z = 0$), temperature would be 21.0°C  
- For every meter of elevation gained, temperature drops by 0.006°C  
- At 2000 m: $T = -0.006(2000) + 21.0 = 9.0$ °C  

---

## 4. Worked Example by Hand

**Problem:** A glacier is retreating. In 1990, its terminus was at 2400 m elevation. In 2020, it had retreated to 2700 m elevation. Assuming constant retreat rate:

(a) What is the rate of retreat in meters per year?  
(b) Write the equation for terminus elevation as a function of year.  
(c) When will the terminus reach 3000 m if the trend continues?

### Solution

**(a) Rate of retreat**

$$\Delta z = 2700 - 2400 = 300 \text{ m}$$
$$\Delta t = 2020 - 1990 = 30 \text{ years}$$
$$\text{rate} = \frac{300 \text{ m}}{30 \text{ yr}} = 10 \text{ m/yr}$$

The glacier terminus is moving upslope at 10 m/yr.

**(b) Equation**

Let $z(t)$ be elevation, $t$ be year.

$$z(t) = mt + b$$

We know $m = 10$ m/yr. Using the point $(1990, 2400)$:

$$2400 = 10(1990) + b$$
$$b = 2400 - 19900 = -17500$$

**Model:**  
$$z(t) = 10t - 17500$$

Check: $z(2020) = 10(2020) - 17500 = 20200 - 17500 = 2700$ ✓

**(c) When will $z = 3000$?**

$$3000 = 10t - 17500$$
$$10t = 20500$$
$$t = 2050$$

If the linear trend holds, the terminus will reach 3000 m in **2050**.

---

## 5. Computational Implementation

Below is a simple interactive model. Adjust the parameters and watch the line respond.

<div class="viz-container" id="linear-model-viz">
  <div class="controls">
    <label>
      Slope (m):
      <input type="range" id="slope-slider" min="-2" max="2" step="0.1" value="0.5">
      <span id="slope-value">0.5</span>
    </label>
    <label>
      Intercept (b):
      <input type="range" id="intercept-slider" min="-10" max="10" step="0.5" value="2">
      <span id="intercept-value">2</span>
    </label>
  </div>
  <div id="linear-chart" style="width: 100%; height: 400px;"></div>
</div>

<script type="module">
// Wait for core.js to load ECharts (triggered by viz: true in front matter)
while (!window.echarts) await new Promise(r => setTimeout(r, 50));

const chart = window.echarts.init(document.getElementById('linear-chart'));

let m = 0.5;
let b = 2;

function updateChart() {
  const xData = [];
  const yData = [];

  for (let x = -10; x <= 10; x += 0.5) {
    xData.push(x);
    yData.push(m * x + b);
  }

  chart.setOption({
    title: {
      text: `y = ${m.toFixed(2)}x + ${b.toFixed(2)}`,
      left: 'center'
    },
    grid: { left: 60, right: 40, top: 60, bottom: 60 },
    xAxis: {
      type: 'value', name: 'x', nameLocation: 'middle', nameGap: 30,
      min: -10, max: 10
    },
    yAxis: {
      type: 'value', name: 'y', nameLocation: 'middle', nameGap: 40,
      min: -20, max: 20
    },
    series: [{
      data: xData.map((x, i) => [x, yData[i]]),
      type: 'line',
      smooth: false,
      lineStyle: { color: '#F0177A', width: 3 },
      showSymbol: false
    }]
  });
}

document.getElementById('slope-slider').addEventListener('input', (e) => {
  m = parseFloat(e.target.value);
  document.getElementById('slope-value').textContent = m.toFixed(2);
  updateChart();
});

document.getElementById('intercept-slider').addEventListener('input', (e) => {
  b = parseFloat(e.target.value);
  document.getElementById('intercept-value').textContent = b.toFixed(2);
  updateChart();
});

updateChart();

window.addEventListener('resize', () => chart.resize());
</script>

**Try this:**
- Set $m = 0$. What happens? (A horizontal line — no change with $x$)
- Set $m = 1$ and $b = 0$. The line passes through the origin at 45°.
- Set $m = -1$. The line tilts the other way.
- Set $m = 2$ and $b = -5$. Where does the line cross the x-axis? (Solve $0 = 2x - 5 \Rightarrow x = 2.5$)

---

## 6. Interpretation

### What Slope Means Physically

The slope $m$ is not just a number. It is a **ratio of two physical quantities**, and its units tell you what it measures.

**Examples:**

| Context | $y$ | $x$ | Slope $m$ | Units | Meaning |
|---------|-----|-----|-----------|-------|---------|
| Elevation profile | elevation | horizontal distance | $\frac{\Delta z}{\Delta x}$ | m/m or % | gradient |
| Temperature lapse | temperature | elevation | $\frac{\Delta T}{\Delta z}$ | °C/m | lapse rate |
| Population growth | population | time | $\frac{\Delta P}{\Delta t}$ | people/year | growth rate |
| Cost function | total cost | quantity | $\frac{\Delta C}{\Delta q}$ | $/unit | marginal cost |

**Units are not decorative.** They encode what the model means.

### Positive vs. Negative Slope

- $m > 0$: $y$ increases as $x$ increases (uphill, warming, growth)
- $m < 0$: $y$ decreases as $x$ increases (downhill, cooling, retreat)
- $m = 0$: no change (flat, constant, equilibrium)

### Steepness

The absolute value $|m|$ measures how **fast** the change happens:
- $|m|$ small: gradual change (prairie, slow warming, stable population)
- $|m|$ large: rapid change (cliff, thermal inversion, population boom)

---

## 7. What Could Go Wrong?

### Assuming Linearity Beyond the Data Range

Our glacier model predicted the terminus would reach 3000 m in 2050. But what if:
- The glacier disappears entirely before then?
- Climate policy reduces warming, slowing retreat?
- A cold decade causes temporary advance?

**Linear models are local approximations.** They work well over the range where you measured them. Extrapolation is prediction, and prediction requires caution.

### Ignoring Units

A common student error:

> "The slope is 0.006."  

**Wrong.** The slope is $-0.006$ °C/m. Without units, you don't know if you're talking about temperature change, population change, or the cost of bananas.

### Confusing Slope with Intercept

The intercept $b$ tells you where the line crosses the $y$-axis. It is often physically meaningful (sea-level temperature, initial population, fixed cost), but it is **not** the rate of change. That's the slope's job.

### Mixing Up Dependent and Independent Variables

In $T = -0.006z + 21$, temperature **depends on** elevation. You don't choose the temperature and look up the elevation. The convention is:
- **Independent variable** (the one you control or measure): on the x-axis
- **Dependent variable** (the one that responds): on the y-axis

Flipping these gives you a different slope. $\frac{\Delta z}{\Delta T}$ is the **inverse** of $\frac{\Delta T}{\Delta z}$.

---

## 8. Extension: From Lines to Gradients

In the next essay, we'll ask: what happens when the rate of change itself changes? When growth accelerates or slows? When temperature doesn't drop at a constant rate, but follows an exponential curve?

But before we get there, notice this: **the slope of a line is the simplest possible derivative.**

If $y = mx + b$, then:

$$\frac{dy}{dx} = m$$

The derivative is the rate of change. For a line, the rate is constant. For curves, it varies. That's where calculus begins.

But you don't need calculus to understand that **slope is rate**, and **rate is how we measure change**.

---

## Summary

- A linear model has the form $y = mx + b$
- Slope $m = \frac{\Delta y}{\Delta x}$ measures the rate of change
- Units of slope are (units of $y$) / (units of $x$)
- Positive slope: increasing; negative slope: decreasing; zero slope: constant
- Linear models are local approximations — valid over the range you measured
- The derivative of a linear function is its slope

**Next:** In Essay 3, we'll relax the assumption of constant rate and introduce **exponential growth** — the foundation of population models, radioactive decay, and compounding change.

---

## Math Refresher: Solving for x

If you're rusty on algebra, here's the pattern:

**Given:** $y = mx + b$, and you know $y$, $m$, $b$ — solve for $x$.

**Steps:**
1. Subtract $b$ from both sides: $y - b = mx$
2. Divide both sides by $m$: $x = \frac{y - b}{m}$

**Example:** When does $T = -0.006z + 21$ reach $T = 10$°C?

$$10 = -0.006z + 21$$
$$-11 = -0.006z$$
$$z = \frac{-11}{-0.006} = 1833.3 \text{ m}$$

At 1833 meters elevation, temperature would be 10°C.