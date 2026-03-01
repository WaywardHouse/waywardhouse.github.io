---
layout: essay
title: "Logistic Growth and Equilibrium"
subtitle: "When growth slows as it approaches a limit — feedback, carrying capacity, and stability"
date: 2026-02-26
categories: [modeling]
series: computational-geography-foundations
series_order: 4
cluster: A
cluster_title: "Modeling Change"
tags:
  - computational-geography
  - modeling
  - mathematics
  - differential-equations
  - population-dynamics
  - equilibrium
math: true
viz: true
difficulty: 2
math_core: [nonlinear-functions, differential-equations, equilibrium, stability]
spatial_reasoning: 1
dynamics: 3
computation: 2
domain: [ecology, population-dynamics, human-geography]
excerpt: >
  Exponential growth can't last forever. Resources run out. Space fills up.
  Competition intensifies. The logistic equation captures this: growth slows
  as the population approaches a carrying capacity. This is our first model
  with feedback, equilibrium, and the concept of stability.
math_prerequisites: >
  Exponential functions and their derivatives (Essay 3). Comfort with the idea
  of a differential equation. We'll introduce equilibrium points and stability
  conceptually, with visualization rather than rigorous analysis.
---

## 1. The Question

What happens when exponential growth hits a limit?

A bacteria colony grows exponentially in a petri dish — until nutrients run out. A city expands rapidly — until housing, water, or infrastructure constrains it. An invasive species spreads unchecked — until predators, disease, or competition slow it down.

**The key insight:** In all these cases, the growth rate **decreases** as the population increases. When the population is small, there's plenty of room and resources — growth is nearly exponential. When the population is large, crowding and scarcity slow things down.

The mathematical question: How do we model growth that slows itself?

---

## 2. The Conceptual Model

### From Exponential to Logistic

In exponential growth, the rate is proportional to the population:

$$\frac{dN}{dt} = rN$$

The rate increases forever as $N$ increases.

In **logistic growth**, we add a **brake** — a term that reduces the growth rate as $N$ gets large:

$$\frac{dN}{dt} = rN\left(1 - \frac{N}{K}\right)$$

Where:
- $N$ is the population
- $r$ is the intrinsic growth rate (growth rate when $N$ is small)
- $K$ is the **carrying capacity** (maximum sustainable population)

**Interpretation of the term** $\left(1 - \frac{N}{K}\right)$:

| Population | $N/K$ | $1 - N/K$ | Growth |
|------------|-------|-----------|--------|
| $N \ll K$ (small) | ≈ 0 | ≈ 1 | Nearly exponential |
| $N = K/2$ | 0.5 | 0.5 | Half the max rate |
| $N = K$ | 1 | 0 | No growth |
| $N > K$ | > 1 | < 0 | **Decline** |

When $N$ is small, $1 - N/K \approx 1$, and we recover exponential growth.  
When $N = K$, the brake term becomes zero — growth stops.  
When $N > K$ (overshoot), the brake term is negative — the population declines back toward $K$.

---

## 3. Building the Mathematical Model

### The Logistic Differential Equation

$$\frac{dN}{dt} = rN\left(1 - \frac{N}{K}\right)$$

This is a **nonlinear** differential equation. The right side has an $N^2$ term when you expand it:

$$\frac{dN}{dt} = rN - \frac{r}{K}N^2$$

Unlike the exponential equation, this one doesn't have a simple algebraic trick to solve. We can find the solution, but it requires more advanced techniques (separation of variables with partial fractions).

### The Analytical Solution

The solution is:

$$N(t) = \frac{K}{1 + \left(\frac{K - N_0}{N_0}\right)e^{-rt}}$$

Where $N_0$ is the initial population at $t = 0$.

**Don't panic** if this looks complicated. The key features are:

1. **As** $t \to 0$: $N(t) \to N_0$ (starts at the initial value)
2. **As** $t \to \infty$: $N(t) \to K$ (approaches carrying capacity)
3. The curve is **S-shaped** (sigmoid)

We'll verify this solution numerically and explore its behavior visually.

---

## 4. Equilibrium Points

### Finding Equilibria

An **equilibrium** is a state where $\frac{dN}{dt} = 0$ — the population doesn't change.

Set the right side to zero:

$$rN\left(1 - \frac{N}{K}\right) = 0$$

This is zero when:
1. $N = 0$ (extinction equilibrium)
2. $1 - N/K = 0 \Rightarrow N = K$ (carrying capacity equilibrium)

**Two equilibrium points:** $N^* = 0$ and $N^* = K$.

### Stability Analysis (Conceptual)

An equilibrium is **stable** if small perturbations return to it.  
An equilibrium is **unstable** if small perturbations grow away from it.

**At $N^* = 0$:**  
- If you add a small population ($N > 0$), does it grow or shrink?
- When $N$ is small, $\frac{dN}{dt} = rN(1 - N/K) \approx rN > 0$
- The population **grows away** from zero
- **$N = 0$ is unstable**

**At $N^* = K$:**  
- If $N$ is slightly below $K$, then $1 - N/K > 0$, so $\frac{dN}{dt} > 0$ → population increases toward $K$
- If $N$ is slightly above $K$, then $1 - N/K < 0$, so $\frac{dN}{dt} < 0$ → population decreases toward $K$
- **$N = K$ is stable**

This is **negative feedback** — deviations from the equilibrium are self-correcting.

---

## 5. Worked Example by Hand

**Problem:** A deer population in a forest reserve has $K = 500$ deer and $r = 0.4$ per year. The initial population is $N_0 = 50$.

(a) Write the logistic model.  
(b) Estimate $N$ after 5 years using Euler's method with Δt = 1 year.  
(c) What is the growth rate $\frac{dN}{dt}$ when $N = 250$?

### Solution

**(a) Logistic model**

$$\frac{dN}{dt} = 0.4 N \left(1 - \frac{N}{500}\right)$$

**(b) Numerical solution with Euler's method**

Euler's method: $N_{i+1} = N_i + \frac{dN}{dt}\bigg|_{N_i} \cdot \Delta t$

| Year | $N$ | $\frac{dN}{dt} = 0.4N(1 - N/500)$ | $N + \frac{dN}{dt} \cdot 1$ |
|------|-----|----------------------------------|------------------------------|
| 0    | 50  | $0.4(50)(1 - 50/500) = 19.0$    | 69.0                        |
| 1    | 69  | $0.4(69)(1 - 69/500) = 23.7$    | 92.7                        |
| 2    | 92.7| $0.4(92.7)(1 - 92.7/500) = 30.2$| 122.9                       |
| 3    | 122.9| $0.4(122.9)(1 - 122.9/500) = 37.1$| 160.0                     |
| 4    | 160.0| $0.4(160.0)(1 - 160.0/500) = 43.5$| 203.5                     |
| 5    | 203.5| —                                | **203.5**                   |

After 5 years: **$N \approx 204$ deer**

(Using the analytical formula: $N(5) \approx 206$ deer — very close!)

**(c) Growth rate at $N = 250$**

$$\frac{dN}{dt} = 0.4(250)\left(1 - \frac{250}{500}\right) = 0.4(250)(0.5) = 50 \text{ deer/year}$$

At half the carrying capacity, the population grows at 50 deer per year — the **maximum growth rate** for this model.

---

## 6. Computational Implementation

Below is an interactive model with phase plot visualization.

<div class="viz-container" id="logistic-model-viz">
  <div class="controls">
    <label>
      Initial population ($N_0$):
      <input type="range" id="n0-logistic-slider" min="10" max="990" step="10" value="50">
      <span id="n0-logistic-value">50</span>
    </label>
    <label>
      Carrying capacity ($K$):
      <input type="range" id="k-slider" min="100" max="1000" step="50" value="500">
      <span id="k-value">500</span>
    </label>
    <label>
      Growth rate ($r$ per year):
      <input type="range" id="r-logistic-slider" min="0.1" max="1.0" step="0.05" value="0.4">
      <span id="r-logistic-value">0.40</span>
    </label>
  </div>
  <div id="logistic-chart" style="width: 100%; height: 500px;"></div>
  <div id="phase-chart" style="width: 100%; height: 400px; margin-top: 20px;"></div>
</div>

<script type="module">
// Wait for core.js to load ECharts
await new Promise(resolve => {
  const checkECharts = () => {
    if (typeof echarts !== 'undefined') resolve();
    else setTimeout(checkECharts, 50);
  };
  checkECharts();
});

// Logistic growth visualization
(function() {
  const timeChart = echarts.init(document.getElementById('logistic-chart'));
  const phaseChart = echarts.init(document.getElementById('phase-chart'));
  
  let N0 = 50;
  let K = 500;
  let r = 0.4;
  const tMax = 30;
  const dt = 0.1;
  
  function logisticDerivative(N, r, K) {
    return r * N * (1 - N / K);
  }
  
  function numericalSolution(N0, r, K, dt, tMax) {
    const result = [{t: 0, N: N0}];
    let N = N0;
    let t = 0;
    
    while (t < tMax) {
      const dNdt = logisticDerivative(N, r, K);
      N = N + dNdt * dt;
      t += dt;
      
      if (t % 1 < dt) { // Store every 1 year
        result.push({t: Math.round(t), N});
      }
    }
    
    return result;
  }
  
  function updateCharts() {
    // Time series
    const timeSeries = numericalSolution(N0, r, K, dt, tMax);
    const timeData = timeSeries.map(pt => [pt.t, pt.N]);
    
    const timeOption = {
      title: {
        text: `Logistic Growth: N₀ = ${N0}, K = ${K}, r = ${r.toFixed(2)}`,
        left: 'center'
      },
      tooltip: {
        trigger: 'axis',
        formatter: params => {
          return `Year ${params[0].value[0]}<br/>N = ${params[0].value[1].toFixed(1)}`;
        }
      },
      grid: {
        left: 60,
        right: 40,
        top: 60,
        bottom: 60
      },
      xAxis: {
        type: 'value',
        name: 'Time (years)',
        nameLocation: 'middle',
        nameGap: 30,
        min: 0,
        max: tMax
      },
      yAxis: {
        type: 'value',
        name: 'Population N(t)',
        nameLocation: 'middle',
        nameGap: 50,
        min: 0,
        max: Math.max(K * 1.2, N0 * 1.2)
      },
      series: [
        {
          data: timeData,
          type: 'line',
          smooth: true,
          lineStyle: {
            color: '#F0177A',
            width: 3
          },
          showSymbol: false,
          markLine: {
            silent: true,
            symbol: 'none',
            lineStyle: {
              color: '#666',
              type: 'dashed'
            },
            data: [
              {yAxis: K, label: {formatter: 'K = ' + K, position: 'end'}}
            ]
          }
        }
      ]
    };
    
    // Phase plot: dN/dt vs N
    const phaseData = [];
    for (let N = 0; N <= K * 1.2; N += 5) {
      const dNdt = logisticDerivative(N, r, K);
      phaseData.push([N, dNdt]);
    }
    
    const currentRate = logisticDerivative(N0, r, K);
    
    const phaseOption = {
      title: {
        text: 'Phase Plot: Growth Rate vs. Population',
        left: 'center'
      },
      tooltip: {
        trigger: 'axis',
        formatter: params => {
          return `N = ${params[0].value[0].toFixed(0)}<br/>dN/dt = ${params[0].value[1].toFixed(2)}`;
        }
      },
      grid: {
        left: 60,
        right: 40,
        top: 60,
        bottom: 80
      },
      xAxis: {
        type: 'value',
        name: 'Population (N)',
        nameLocation: 'middle',
        nameGap: 30,
        min: 0,
        max: K * 1.2
      },
      yAxis: {
        type: 'value',
        name: 'Growth Rate (dN/dt)',
        nameLocation: 'middle',
        nameGap: 50
      },
      series: [
        {
          data: phaseData,
          type: 'line',
          smooth: false,
          lineStyle: {
            color: '#00A8E8',
            width: 3
          },
          showSymbol: false,
          markPoint: {
            symbol: 'circle',
            symbolSize: 10,
            itemStyle: {
              color: '#F0177A'
            },
            data: [
              {coord: [N0, currentRate], label: {formatter: 'N₀', position: 'top'}}
            ]
          },
          markLine: {
            silent: true,
            symbol: 'none',
            lineStyle: {
              color: '#666',
              type: 'dashed'
            },
            data: [
              {xAxis: K, label: {formatter: 'K', position: 'end'}},
              {xAxis: 0, label: {formatter: 'N=0', position: 'start'}},
              {yAxis: 0}
            ]
          }
        }
      ]
    };
    
    timeChart.setOption(timeOption);
    phaseChart.setOption(phaseOption);
  }
  
  document.getElementById('n0-logistic-slider').addEventListener('input', (e) => {
    N0 = parseFloat(e.target.value);
    document.getElementById('n0-logistic-value').textContent = N0;
    updateCharts();
  });
  
  document.getElementById('k-slider').addEventListener('input', (e) => {
    K = parseFloat(e.target.value);
    document.getElementById('k-value').textContent = K;
    updateCharts();
  });
  
  document.getElementById('r-logistic-slider').addEventListener('input', (e) => {
    r = parseFloat(e.target.value);
    document.getElementById('r-logistic-value').textContent = r.toFixed(2);
    updateCharts();
  });
  
  updateCharts();
  
  window.addEventListener('resize', () => {
    timeChart.resize();
    phaseChart.resize();
  });
})();
</script>

**Try this:**

**Top panel (time series):**
- Start with $N_0 = 50$, $K = 500$, $r = 0.4$. Watch the S-curve approach $K$.
- Set $N_0 = 600$ (above carrying capacity). The population **declines** to $K$.
- Increase $r$ to 0.8. The approach to equilibrium is faster.
- Decrease $r$ to 0.2. The approach is slower.

**Bottom panel (phase plot):**
- The curve shows $\frac{dN}{dt}$ as a function of $N$.
- Growth rate is **zero** at $N = 0$ and $N = K$ (the equilibria).
- Growth rate is **maximum** at $N = K/2$ (halfway to carrying capacity).
- The pink dot shows where the current $N_0$ sits on this curve.

---

## 7. Interpretation

### The S-Curve (Sigmoid Growth)

The logistic model produces an **S-shaped curve**:
1. **Exponential phase** (small $N$): slow at first because the population is small
2. **Rapid growth phase** (intermediate $N$): fastest growth around $N = K/2$
3. **Saturation phase** (large $N$): growth slows as $N \to K$

This pattern appears in:
- Technology adoption curves
- Epidemic spread (before intervention)
- Language learning (word acquisition)
- Market saturation

### Maximum Growth Rate at $N = K/2$

The growth rate $\frac{dN}{dt} = rN(1 - N/K)$ is a parabola when plotted against $N$.

To find the maximum, take the derivative with respect to $N$ and set it to zero:

$$\frac{d}{dN}\left[rN\left(1 - \frac{N}{K}\right)\right] = r\left(1 - \frac{2N}{K}\right) = 0$$

$$1 - \frac{2N}{K} = 0 \Rightarrow N = \frac{K}{2}$$

The population grows **fastest** at half the carrying capacity.

**Ecological interpretation:** When the population is small, there are few individuals to reproduce. When the population is large, competition slows things down. Maximum growth happens at the sweet spot in between.

### Overshoot and Correction

If $N > K$ (overshoot), then:

$$1 - \frac{N}{K} < 0 \Rightarrow \frac{dN}{dt} < 0$$

The population **declines** back toward $K$. This is the stabilizing feedback.

---

## 8. What Could Go Wrong?

### Carrying Capacity Is Not Constant

In real systems, $K$ changes over time:
- Climate change alters habitat quality
- Human development reduces available land
- Resource management changes sustainable yield

A **time-varying** $K$ requires a more complex model.

### Allee Effects (Growth Fails at Low $N$)

Some populations need a **minimum viable population** to survive:
- Pollination requires sufficient bee density
- Social species need group coordination
- Genetic diversity requires a breeding pool

The logistic model assumes positive growth for any $N > 0$. This isn't always true.

### Overshoot and Collapse

If the population grows **faster than resources can regenerate**, you can get overshoot followed by **collapse** below $K$ — or even extinction.

The logistic model assumes smooth adjustment. Real populations can oscillate or crash.

### Time Lags

If there's a delay between population size and resource limitation (e.g., predator-prey systems, where predators respond with a lag), the system can **oscillate** around $K$ rather than smoothly approaching it.

This requires a **delay differential equation** — beyond the scope of this essay.

---

## 9. Extensions and Connections

### Verhulst and the Origins of the Logistic Equation

The logistic equation was introduced by Belgian mathematician **Pierre-François Verhulst** in 1838 to model human population growth. He called it the "logistic curve" from the French *logistique* (related to reasoning and calculation).

It remains one of the most important models in ecology, epidemiology, and social science.

### The Logistic Map (Discrete Version)

If we model population in discrete time steps (generations):

$$N_{t+1} = N_t + rN_t\left(1 - \frac{N_t}{K}\right)$$

This is the **logistic map**, which exhibits chaotic behavior for large $r$. A topic for future study.

### Generalizations

The logistic model is a special case of more general growth equations:

**Theta-logistic:**

$$\frac{dN}{dt} = rN\left(1 - \left(\frac{N}{K}\right)^\theta\right)$$

Allows for different shapes of density dependence.

**Gompertz growth:**

$$\frac{dN}{dt} = rN \ln\left(\frac{K}{N}\right)$$

Used for tumor growth models.

---

## 10. Math Refresher: Phase Plots

A **phase plot** shows the rate of change on the y-axis and the state variable on the x-axis.

For the logistic equation:
- x-axis: $N$ (population)
- y-axis: $\frac{dN}{dt}$ (growth rate)

**How to read it:**
- Where the curve crosses the x-axis ($\frac{dN}{dt} = 0$), you have equilibria
- Where the curve is **above** the x-axis, $N$ is **increasing**
- Where the curve is **below** the x-axis, $N$ is **decreasing**
- The slope of the curve tells you how the growth rate responds to changes in $N$

Phase plots are powerful tools for understanding dynamical systems without solving equations analytically.

---

## Summary

- Logistic growth: $\frac{dN}{dt} = rN\left(1 - \frac{N}{K}\right)$
- Two equilibria: $N^* = 0$ (unstable) and $N^* = K$ (stable)
- Growth is S-shaped (sigmoid): exponential → rapid → saturation
- Maximum growth rate occurs at $N = K/2$
- Negative feedback stabilizes the system
- Phase plots visualize dynamics without solving equations
- Real systems may have time lags, Allee effects, or variable carrying capacity


---