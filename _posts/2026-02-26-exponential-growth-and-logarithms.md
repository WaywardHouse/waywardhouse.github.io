---
layout: essay
title: "Exponential Growth and Logarithms"
subtitle: "When the rate of change depends on how much you already have"
date: 2026-02-26
categories: [modeling]
series: computational-geography-foundations
series_order: 3
cluster: A
cluster_title: "Modeling Change"
tags:
  - computational-geography
  - modeling
  - mathematics
  - exponential-functions
  - differential-equations
math: true
viz: true
difficulty: 2
math_core: [exponential-functions, logarithms, differential-equations, doubling-time]
spatial_reasoning: 1
dynamics: 2
computation: 2
domain: [physical-geography, human-geography, population-dynamics]
excerpt: >
  Linear growth adds the same amount each period. Exponential growth multiplies
  by the same factor. When populations grow, when bank accounts compound, when
  epidemics spread — the rate depends on the current size. This is our first
  differential equation, and it changes everything.
math_prerequisites: >
  Exponents (what $2^3$ means). The concept of rate from Essay 2. Comfort with
  algebraic manipulation. We'll introduce logarithms from scratch and show why
  they're the inverse of exponentials.
---

## 1. The Question

What happens when the rate of growth is **proportional to the current amount**?

A city grows by 2% per year. The population next year depends on the population **this** year. A forest fire spreads faster when the burning perimeter is longer. Radioactive decay happens faster when more atoms remain.

**This is different from linear growth.** In linear growth, you add the same amount each period (100 people per year, 5 meters per day). In exponential growth, you multiply by the same factor (1.02× per year, 2× per day).

The mathematical question: How do we model this? What does the solution look like? And how do we work backwards — if we know the final size, how do we find the time it took to get there?

---

## 2. The Conceptual Model

### The Difference Between Linear and Exponential

**Linear growth:**
- Add a constant amount each period
- $y = mx + b$
- Graph is a straight line
- Doubling time gets **longer** as you grow (because you're adding the same amount to a larger base)

**Exponential growth:**
- Multiply by a constant factor each period
- $y = y_0 e^{rt}$ (we'll derive this)
- Graph is a curve that gets steeper
- Doubling time is **constant** (the same percentage growth always takes the same time)

**Example:**

| Year | Linear (+100/yr) | Exponential (×1.1/yr) |
|------|------------------|-----------------------|
| 0    | 1000            | 1000                  |
| 1    | 1100            | 1100                  |
| 2    | 1200            | 1210                  |
| 3    | 1300            | 1331                  |
| 10   | 2000            | 2594                  |
| 20   | 3000            | 6727                  |

After 20 years, the exponential model is more than **twice** the linear model, even though they started the same.

---

## 3. Building the Mathematical Model

### Starting from the Differential Equation

The defining property of exponential growth:

> The rate of change is proportional to the current amount.

In symbols:

$$\frac{dN}{dt} = rN$$

Where:
- $N$ is the quantity (population, mass, money)
- $t$ is time
- $r$ is the **growth rate** (a constant, units: 1/time)

This is a **differential equation** — an equation involving a derivative. It says: "the bigger $N$ gets, the faster it grows."

### Solving the Differential Equation

We want to find $N(t)$ — a function that satisfies this equation.

**Separation of variables:**

$$\frac{dN}{dt} = rN$$

Divide both sides by $N$:

$$\frac{1}{N} \frac{dN}{dt} = r$$

Multiply both sides by $dt$:

$$\frac{1}{N} dN = r \, dt$$

Integrate both sides:

$$\int \frac{1}{N} dN = \int r \, dt$$

$$\ln N = rt + C$$

Where $C$ is the constant of integration.

Exponentiate both sides:

$$N = e^{rt + C} = e^C \cdot e^{rt}$$

Let $N_0 = e^C$ (the initial population at $t = 0$):

$$N(t) = N_0 e^{rt}$$

**This is the solution.** Exponential growth.

---

## 4. Understanding the Parameters

### The Growth Rate $r$

- $r > 0$: exponential **growth** (population increases)
- $r < 0$: exponential **decay** (radioactive atoms disappear)
- $r$ has units of **1/time** (per year, per day, per second)

**Example:** If $r = 0.03$ per year, the population grows by 3% per year.

### The Base of the Exponential: Why $e$?

We could write exponential growth as:

$$N(t) = N_0 \cdot 2^{kt}$$

or

$$N(t) = N_0 \cdot 10^{mt}$$

These are all equivalent. We use $e$ because **it makes the calculus clean.** The derivative of $e^{rt}$ is $r e^{rt}$. The derivative of $2^{kt}$ involves an extra factor of $\ln 2$.

The number $e \approx 2.71828$ is the **natural base** — the one where the exponential function is its own derivative (up to a constant).

### Converting Between Bases

If you're given a growth rate as "doubles every 5 years," you can find $r$:

$$N(t) = N_0 \cdot 2^{t/5}$$

Rewrite using $2 = e^{\ln 2}$:

$$N(t) = N_0 \cdot \left(e^{\ln 2}\right)^{t/5} = N_0 e^{(\ln 2 / 5) t}$$

So:

$$r = \frac{\ln 2}{T_{\text{double}}} = \frac{0.693}{5} = 0.139 \text{ per year}$$

---

## 5. Logarithms: The Inverse Operation

### What Is a Logarithm?

If $y = e^x$, then $x = \ln y$.

The logarithm **undoes** the exponential. It answers the question: "What power do I raise $e$ to in order to get $y$?"

**Examples:**
- $e^2 \approx 7.39$, so $\ln(7.39) = 2$
- $e^0 = 1$, so $\ln(1) = 0$
- $e^{-1} \approx 0.368$, so $\ln(0.368) = -1$

### Properties of Logarithms

$$\ln(ab) = \ln a + \ln b$$

$$\ln(a/b) = \ln a - \ln b$$

$$\ln(a^b) = b \ln a$$

These make logarithms powerful tools for multiplication → addition conversions.

### Using Logarithms to Solve for Time

**Problem:** A population starts at $N_0 = 1000$ and grows at $r = 0.05$ per year. When does it reach $N = 5000$?

**Model:**

$$N(t) = 1000 e^{0.05t}$$

**Solve for $t$ when $N = 5000$:**

$$5000 = 1000 e^{0.05t}$$

Divide both sides by 1000:

$$5 = e^{0.05t}$$

Take the natural logarithm of both sides:

$$\ln 5 = \ln(e^{0.05t}) = 0.05t$$

$$t = \frac{\ln 5}{0.05} = \frac{1.609}{0.05} = 32.2 \text{ years}$$

The population reaches 5000 after **32.2 years**.

---

## 6. Worked Example by Hand

**Problem:** A radioactive isotope has a half-life of 12 years. You start with 80 grams.

(a) Write the exponential decay model.  
(b) How much remains after 30 years?  
(c) When will only 10 grams remain?

### Solution

**(a) Decay model**

Half-life $T_{1/2} = 12$ years means the mass multiplies by 0.5 every 12 years.

The decay rate:

$$r = \frac{\ln(0.5)}{T_{1/2}} = \frac{-0.693}{12} = -0.0578 \text{ per year}$$

(Negative because it's decay.)

**Model:**

$$M(t) = 80 e^{-0.0578t}$$

Check: at $t = 12$,

$$M(12) = 80 e^{-0.0578 \times 12} = 80 e^{-0.693} = 80 \times 0.5 = 40 \text{ g}$$ ✓

**(b) Mass after 30 years**

$$M(30) = 80 e^{-0.0578 \times 30} = 80 e^{-1.734} = 80 \times 0.177 = 14.1 \text{ g}$$

**(c) When does $M = 10$ g?**

$$10 = 80 e^{-0.0578t}$$

$$0.125 = e^{-0.0578t}$$

$$\ln(0.125) = -0.0578t$$

$$-2.079 = -0.0578t$$

$$t = \frac{2.079}{0.0578} = 36.0 \text{ years}$$

Only 10 grams remain after **36 years**.

---

## 7. Computational Implementation

Below is an interactive model comparing **analytical** (exact formula) vs. **numerical** (step-by-step simulation) solutions.

<div class="viz-container" id="exponential-model-viz">
  <div class="controls">
    <label>
      Initial value ($N_0$):
      <input type="range" id="n0-slider" min="10" max="200" step="10" value="100">
      <span id="n0-value">100</span>
    </label>
    <label>
      Growth rate ($r$ per year):
      <input type="range" id="r-slider" min="-0.2" max="0.2" step="0.01" value="0.05">
      <span id="r-value">0.05</span>
    </label>
    <label>
      Time step (Δt):
      <input type="range" id="dt-slider" min="0.1" max="2" step="0.1" value="0.5">
      <span id="dt-value">0.5</span> years
    </label>
  </div>
  <div id="exponential-chart" style="width: 100%; height: 500px;"></div>
  <div class="info-panel">
    <p><strong>Analytical solution:</strong> $N(t) = N_0 e^{rt}$ (smooth curve)</p>
    <p><strong>Numerical solution:</strong> $N_{i+1} = N_i + r N_i \Delta t$ (stepped)</p>
    <p>As Δt → 0, the numerical solution converges to the analytical one.</p>
  </div>
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

// Exponential growth visualization
(function() {
  const chart = echarts.init(document.getElementById('exponential-chart'));
  
  let N0 = 100;
  let r = 0.05;
  let dt = 0.5;
  const tMax = 50;
  
  function analytical(t, N0, r) {
    return N0 * Math.exp(r * t);
  }
  
  function numerical(N0, r, dt, tMax) {
    const result = [{t: 0, N: N0}];
    let N = N0;
    let t = 0;
    
    while (t < tMax) {
      t += dt;
      N = N + r * N * dt;
      result.push({t, N});
    }
    
    return result;
  }
  
  function updateChart() {
    // Analytical solution
    const analyticalData = [];
    for (let t = 0; t <= tMax; t += 0.5) {
      analyticalData.push([t, analytical(t, N0, r)]);
    }
    
    // Numerical solution
    const numericalResult = numerical(N0, r, dt, tMax);
    const numericalData = numericalResult.map(pt => [pt.t, pt.N]);
    
    const option = {
      title: {
        text: `Exponential ${r >= 0 ? 'Growth' : 'Decay'}: N₀ = ${N0}, r = ${r.toFixed(3)}/yr`,
        left: 'center'
      },
      tooltip: {
        trigger: 'axis',
        formatter: function(params) {
          let result = `t = ${params[0].value[0].toFixed(1)} years<br/>`;
          params.forEach(param => {
            result += `${param.seriesName}: ${param.value[1].toFixed(2)}<br/>`;
          });
          return result;
        }
      },
      legend: {
        data: ['Analytical', 'Numerical (Δt=' + dt + ')'],
        top: 30
      },
      grid: {
        left: 60,
        right: 40,
        top: 80,
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
        name: 'N(t)',
        nameLocation: 'middle',
        nameGap: 50,
        min: 0
      },
      series: [
        {
          name: 'Analytical',
          data: analyticalData,
          type: 'line',
          smooth: false,
          lineStyle: {
            color: '#F0177A',
            width: 3
          },
          showSymbol: false
        },
        {
          name: 'Numerical (Δt=' + dt + ')',
          data: numericalData,
          type: 'line',
          smooth: false,
          lineStyle: {
            color: '#00A8E8',
            width: 2,
            type: 'dashed'
          },
          symbol: 'circle',
          symbolSize: 4
        }
      ]
    };
    
    chart.setOption(option);
  }
  
  document.getElementById('n0-slider').addEventListener('input', (e) => {
    N0 = parseFloat(e.target.value);
    document.getElementById('n0-value').textContent = N0;
    updateChart();
  });
  
  document.getElementById('r-slider').addEventListener('input', (e) => {
    r = parseFloat(e.target.value);
    document.getElementById('r-value').textContent = r.toFixed(3);
    updateChart();
  });
  
  document.getElementById('dt-slider').addEventListener('input', (e) => {
    dt = parseFloat(e.target.value);
    document.getElementById('dt-value').textContent = dt.toFixed(1);
    updateChart();
  });
  
  updateChart();
  
  window.addEventListener('resize', () => chart.resize());
})();
</script>

**Try this:**
- Set $r = 0.1$ (10% growth). Watch the curve steepen.
- Set $r = -0.1$ (decay). The curve drops toward zero but never quite reaches it.
- Reduce Δt to 0.1. The numerical solution gets closer to the analytical curve.
- Set $r = 0$ (no growth). Both solutions are flat lines.

**Key insight:** The analytical solution is **exact**. The numerical solution is an **approximation**, but it converges to the exact answer as the time step shrinks.

---

## 8. Interpretation

### Doubling Time and Half-Life

For exponential growth, the **doubling time** is:

$$T_{\text{double}} = \frac{\ln 2}{r} \approx \frac{0.693}{r}$$

For exponential decay, the **half-life** is:

$$T_{1/2} = \frac{\ln 2}{|r|} \approx \frac{0.693}{|r|}$$

**Example:** If a population grows at $r = 0.035$ per year (3.5% annual growth):

$$T_{\text{double}} = \frac{0.693}{0.035} = 19.8 \text{ years}$$

The population doubles roughly every 20 years.

### The Rule of 70

A useful approximation:

$$T_{\text{double}} \approx \frac{70}{\text{percent growth rate}}$$

If a city grows at 3% per year:

$$T_{\text{double}} \approx \frac{70}{3} = 23.3 \text{ years}$$

(Exact: $\frac{69.3}{3} = 23.1$ years.)

The rule of 70 works because $\ln 2 \approx 0.693 \approx 70/100$.

### Why Exponentials Get Big So Fast

Because **the rate depends on the size**, exponential growth is self-reinforcing. A 5% increase when you're at 100 is small. A 5% increase when you're at 10,000 is enormous.

**This is why:**
- Pandemics spread rapidly before intervention
- Compound interest outpaces simple interest
- Invasive species are hard to eradicate once established
- Climate feedback loops accelerate warming

---

## 9. What Could Go Wrong?

### Exponentials Don't Grow Forever

In the real world, **nothing grows exponentially forever.** Resources run out. Space fills up. Predators respond. Exponential growth is a **local model** — valid over short timescales before constraints kick in.

The next essay introduces **logistic growth**, where the growth rate itself slows as the population approaches a limit.

### Confusing Growth Rate and Doubling Time

If someone says "the population doubles every 10 years," that is **not** the growth rate. The growth rate is:

$$r = \frac{\ln 2}{10} = 0.0693 \text{ per year}$$

Don't confuse the two.

### Logarithms of Negative Numbers

You cannot take the logarithm of a negative number (in the real number system). If you're solving $e^{rt} = -5$, there is no solution. Exponentials are always positive.

### Numerical Instability with Large Time Steps

In the numerical simulation, if Δt is too large, the approximation breaks down. The error compounds at each step, and the numerical solution diverges from the analytical one.

**Rule of thumb:** Use Δt small enough that the solution doesn't change much when you halve it again.

---

## 10. Math Refresher: Working with Exponents and Logs

### Exponent Rules

$$e^a \cdot e^b = e^{a+b}$$

$$\frac{e^a}{e^b} = e^{a-b}$$

$$(e^a)^b = e^{ab}$$

$$e^0 = 1$$

$$e^{-a} = \frac{1}{e^a}$$

### Logarithm Rules

$$\ln(e^x) = x$$

$$e^{\ln x} = x$$

$$\ln(ab) = \ln a + \ln b$$

$$\ln(a/b) = \ln a - \ln b$$

$$\ln(a^b) = b \ln a$$

$$\ln 1 = 0$$

### Change of Base

If you have $\log_{10} x$ (common logarithm) and need $\ln x$ (natural logarithm):

$$\ln x = \ln 10 \cdot \log_{10} x \approx 2.303 \cdot \log_{10} x$$

---

## Summary

- Exponential growth: $\frac{dN}{dt} = rN$
- Solution: $N(t) = N_0 e^{rt}$
- $r > 0$: growth; $r < 0$: decay
- Doubling time: $T_{\text{double}} = \frac{\ln 2}{r}$
- Logarithms invert exponentials: $\ln(e^x) = x$
- Analytical solutions are exact; numerical solutions approximate by stepping forward in time
- Exponential growth cannot continue forever — real systems hit limits
