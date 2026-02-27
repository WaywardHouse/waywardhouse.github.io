---
layout: essay
title: "Light Attenuation in a Canopy"
subtitle: "Exponential decay through space — modeling vertical gradients in forest light"
date: 2026-02-26
categories: [modeling]
series: computational-geography-lab
series_order: 5
cluster: B
cluster_title: "Energy and Attenuation"
tags:
  - computational-geography
  - modeling
  - differential-equations
  - physical-geography
  - ecology
math: true
viz: true
difficulty: 3
math_core: [differential-equations, exponential-decay, vertical-gradients]
spatial_reasoning: 2
dynamics: 1
computation: 2
domain: [physical-geography, ecology, micrometeorology]
excerpt: >
  Sunlight entering a forest canopy dims as it passes through leaves. Each layer
  absorbs a fraction of the light reaching it. This is exponential decay, but
  in space rather than time. We'll derive Beer's Law and explore how leaf area
  index controls the vertical light profile.
math_prerequisites: >
  Exponential functions and their derivatives (Essay 3). Differential equations
  conceptually. We'll work in the vertical dimension (height z) rather than time,
  but the mathematics is identical in structure.
---

## 1. The Question

How does light intensity change as you descend through a forest canopy?

Stand at the top of a rainforest and measure light intensity: 100% of incoming solar radiation. Drop down 10 meters into the canopy: maybe 60% remains. Another 10 meters: 35%. At the forest floor: perhaps 2%.

**Why does this happen?** Each leaf intercepts and absorbs some fraction of the light hitting it. The cumulative effect of many layers creates an exponential decline.

The mathematical question: Can we predict light intensity at any height, given the density of leaves above?

---

## 2. The Conceptual Model

### Light as a Vertical Cascade

Imagine sunlight as a stream of photons raining down from above. As the stream passes through each infinitesimal layer of leaves:
- Some photons are absorbed (photosynthesis, heat)
- Some are scattered (reflected, transmitted through gaps)
- The remainder continues downward

The **rate of loss** is proportional to:
1. The light intensity at that height (more light → more absorption)
2. The leaf density at that height (more leaves → more interception)

This is exactly the structure of exponential decay — but in the **vertical dimension** rather than time.

### Leaf Area Index (LAI)

**Leaf Area Index** is the total one-sided leaf area per unit ground area.

**Units:** $\text{m}^2$ (leaf) / $\text{m}^2$ (ground) = dimensionless

**Example:** An LAI of 5 means there are 5 square meters of leaf area above every square meter of ground.

For a canopy of height $H$ with uniform leaf density:

$$\text{LAI} = \text{leaf area density} \times H$$

---

## 3. Building the Mathematical Model

### Deriving Beer's Law

Let:
- $I(z)$ = light intensity at height $z$ (units: W/m² or μmol photons/m²/s)
- $z$ = height above ground (m)
- $k$ = extinction coefficient (dimensionless)
- $L(z)$ = cumulative leaf area index above height $z$

The rate of light loss with decreasing height:

$$\frac{dI}{dz} = -k \cdot I(z)$$

**Negative sign:** Light decreases as $z$ decreases (moving down through the canopy).

**This is identical in form to radioactive decay** — but the independent variable is height, not time.

### Solving the Differential Equation

Separation of variables:

$$\frac{1}{I} \frac{dI}{dz} = -k$$

Integrate:

$$\int \frac{1}{I} dI = \int -k \, dz$$

$$\ln I = -kz + C$$

Exponentiate:

$$I(z) = e^{-kz + C} = e^C \cdot e^{-kz}$$

At the top of the canopy ($z = H$), let $I(H) = I_0$ (incoming radiation):

$$I_0 = e^C \cdot e^{-kH}$$

$$e^C = I_0 e^{kH}$$

Substitute back:

$$I(z) = I_0 e^{kH} \cdot e^{-kz} = I_0 e^{-k(z - H)}$$

Or, measuring from the top of the canopy with $z' = H - z$ (depth into canopy):

$$I(z') = I_0 e^{-kz'}$$

**This is Beer's Law** (also called the Beer-Lambert Law or Beer-Bouguer Law).

### Relating to Cumulative LAI

If leaf area density is uniform, the cumulative LAI from the top to depth $z'$ is:

$$L = \text{LAI}_{\text{total}} \times \frac{z'}{H}$$

Then:

$$I = I_0 e^{-kL}$$

This form is more commonly used in ecology: light depends on cumulative leaf area, not just height.

---

## 4. Worked Example by Hand

**Problem:** A forest canopy has total LAI = 6, extinction coefficient $k = 0.5$, and incoming light $I_0 = 1000$ μmol/m²/s.

(a) What is the light intensity at the forest floor (where cumulative LAI = 6)?  
(b) At what cumulative LAI is light reduced to 10% of incoming?  
(c) What fraction of light penetrates the canopy?

### Solution

**(a) Light at forest floor**

$$I = I_0 e^{-kL} = 1000 \cdot e^{-0.5 \times 6} = 1000 \cdot e^{-3}$$

$$e^{-3} \approx 0.0498$$

$$I \approx 1000 \times 0.0498 = 49.8 \text{ μmol/m²/s}$$

About **5%** of incoming light reaches the forest floor.

**(b) Depth where $I = 0.1 I_0$**

$$0.1 I_0 = I_0 e^{-kL}$$

$$0.1 = e^{-0.5L}$$

Take natural log:

$$\ln(0.1) = -0.5L$$

$$-2.303 = -0.5L$$

$$L = \frac{2.303}{0.5} = 4.61$$

Light drops to 10% at cumulative LAI of **4.6** (about 77% of the way through the canopy).

**(c) Fraction penetrating**

From part (a): $I_{\text{floor}} / I_0 = 0.0498 \approx 5\%$

**5% penetrates** to the ground.

---

## 5. Computational Implementation

Below is an interactive model showing vertical light profiles.

<div class="viz-container" id="light-attenuation-viz">
  <div class="controls">
    <label>
      Total LAI:
      <input type="range" id="lai-slider" min="1" max="10" step="0.5" value="6">
      <span id="lai-value">6.0</span>
    </label>
    <label>
      Extinction coefficient (k):
      <input type="range" id="k-slider" min="0.2" max="1.0" step="0.05" value="0.5">
      <span id="k-value">0.50</span>
    </label>
    <label>
      Incoming light (I₀):
      <input type="range" id="i0-slider" min="500" max="2000" step="100" value="1000">
      <span id="i0-value">1000</span> μmol/m²/s
    </label>
  </div>
  <div id="light-profile-chart" style="width: 100%; height: 500px;"></div>
  <div class="info-panel">
    <p id="floor-light"></p>
    <p><strong>Biological context:</strong> Shade-tolerant species can photosynthesize at 1-2% of full sun. Sun-adapted species typically need >10%.</p>
  </div>
</div>

<script type="module">
await new Promise(resolve => {
  const checkECharts = () => {
    if (typeof echarts !== 'undefined') resolve();
    else setTimeout(checkECharts, 50);
  };
  checkECharts();
});

(function() {
  const chart = echarts.init(document.getElementById('light-profile-chart'));
  
  let LAI = 6;
  let k = 0.5;
  let I0 = 1000;
  
  function updateChart() {
    const profileData = [];
    const nSteps = 100;
    
    for (let i = 0; i <= nSteps; i++) {
      const L = (LAI / nSteps) * i; // Cumulative LAI from top
      const I = I0 * Math.exp(-k * L);
      const relativeHeight = 1 - (i / nSteps); // 1 = top, 0 = bottom
      profileData.push([I, relativeHeight]);
    }
    
    const floorLight = I0 * Math.exp(-k * LAI);
    const floorPercent = (floorLight / I0 * 100).toFixed(1);
    
    document.getElementById('floor-light').innerHTML = 
      `<strong>Forest floor light:</strong> ${floorLight.toFixed(1)} μmol/m²/s (${floorPercent}% of incoming)`;
    
    const option = {
      title: {
        text: `Vertical Light Profile: LAI = ${LAI}, k = ${k.toFixed(2)}`,
        left: 'center'
      },
      tooltip: {
        trigger: 'axis',
        formatter: params => {
          const relHeight = params[0].value[1];
          const light = params[0].value[0];
          const percent = (light / I0 * 100).toFixed(1);
          return `Relative height: ${(relHeight * 100).toFixed(0)}%<br/>Light: ${light.toFixed(1)} μmol/m²/s (${percent}%)`;
        }
      },
      grid: {
        left: 80,
        right: 40,
        top: 60,
        bottom: 60
      },
      xAxis: {
        type: 'value',
        name: 'Light Intensity (μmol/m²/s)',
        nameLocation: 'middle',
        nameGap: 30,
        min: 0,
        max: Math.max(I0 * 1.1, 100)
      },
      yAxis: {
        type: 'value',
        name: 'Relative Height (1 = top, 0 = floor)',
        nameLocation: 'middle',
        nameGap: 60,
        min: 0,
        max: 1,
        axisLabel: {
          formatter: '{value}'
        }
      },
      series: [
        {
          data: profileData,
          type: 'line',
          smooth: true,
          lineStyle: {
            color: '#F0177A',
            width: 3
          },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
              { offset: 0, color: 'rgba(240, 23, 122, 0.3)' },
              { offset: 1, color: 'rgba(240, 23, 122, 0.05)' }
            ])
          },
          showSymbol: false
        }
      ]
    };
    
    chart.setOption(option);
  }
  
  document.getElementById('lai-slider').addEventListener('input', (e) => {
    LAI = parseFloat(e.target.value);
    document.getElementById('lai-value').textContent = LAI.toFixed(1);
    updateChart();
  });
  
  document.getElementById('k-slider').addEventListener('input', (e) => {
    k = parseFloat(e.target.value);
    document.getElementById('k-value').textContent = k.toFixed(2);
    updateChart();
  });
  
  document.getElementById('i0-slider').addEventListener('input', (e) => {
    I0 = parseFloat(e.target.value);
    document.getElementById('i0-value').textContent = I0;
    updateChart();
  });
  
  updateChart();
  
  window.addEventListener('resize', () => chart.resize());
})();
</script>

**Try this:**
- Increase LAI to 10 (dense tropical forest). Floor light drops below 1%.
- Decrease k to 0.3 (sparse leaves, less absorption per unit LAI). More light penetrates.
- Increase k to 0.8 (dense clumped leaves). Light drops off faster.
- Set LAI = 2 (savanna woodland). Significant light reaches the understory.

---

## 6. Interpretation

### What the Extinction Coefficient Means

The extinction coefficient $k$ depends on:
1. **Leaf angle distribution** — horizontal leaves ($k \approx 1$) block more light than vertical leaves ($k \approx 0.3$)
2. **Leaf optical properties** — dark leaves absorb more than shiny leaves
3. **Canopy clumping** — clumped foliage increases $k$ (gaps let light through, but dense clumps block heavily)

**Typical values:**
- Grasslands, crops: $k \approx 0.4$–$0.5$
- Temperate deciduous forests: $k \approx 0.5$–$0.6$
- Tropical rainforests: $k \approx 0.6$–$0.8$
- Conifer forests: $k \approx 0.4$–$0.5$ (needle geometry)

### Understorey Adaptation

Plants adapted to deep shade (ferns, mosses, shade-tolerant tree seedlings) can photosynthesize efficiently at 1–5% of full sun. They have:
- High chlorophyll concentration
- Larger, thinner leaves (more light capture per unit mass)
- Lower light compensation point

This allows stratification: tall sun-adapted trees above, shade-tolerant species below.

### Seasonal Variation

In temperate deciduous forests, LAI varies dramatically:
- **Summer:** LAI = 5–6, floor light 2–5%
- **Spring (pre-leaf-out):** LAI = 0, floor light 100%

This creates a spring **ephemeral** window: wildflowers bloom before the canopy closes.

---

## 7. What Could Go Wrong?

### Assuming Uniform Leaf Distribution

Real canopies are **clumped** — leaves cluster around branches, creating gaps. Beer's Law assumes a random, homogeneous distribution.

**Correction:** Use an effective LAI or apply a clumping factor to $k$.

### Ignoring Scattering and Reflection

Beer's Law treats light as purely absorbed. In reality:
- Some light is **scattered** by leaves (diffuse radiation)
- Some is **reflected** from leaf surfaces
- Some is **transmitted** through leaves (especially green light)

A more complete model tracks **direct** vs. **diffuse** radiation separately.

### Neglecting Sun Angle

The derivation assumes vertical light rays. In reality, the sun's angle changes throughout the day.

When sunlight is oblique, the effective path length through the canopy increases, so light attenuation is stronger.

**Correction:** Replace $k$ with $k / \cos(\theta)$, where $\theta$ is the solar zenith angle.

### Confusing LAI with Leaf Density

LAI is **cumulative** (total leaf area above you). Leaf area **density** is LAI per unit height (m² leaf / m² ground / m height).

---

## 8. Extension: From Vertical to Horizontal

Beer's Law applies to **any** direction where absorbing material is distributed. 

**Examples:**
- **Atmosphere:** Pressure decreases exponentially with altitude
- **Ocean:** Light attenuates exponentially with depth (coastal waters: ~10 m penetration; open ocean: ~100 m)
- **Soil:** Water infiltration follows exponential profiles in some cases
- **Beer (yes, the beverage):** Light absorption through a liquid — the original application by August Beer (1852)

The mathematical structure is always the same:

$$\frac{dI}{dx} = -\alpha I$$

where $\alpha$ is the attenuation coefficient and $x$ is the distance through the medium.

---

## 9. Math Refresher: Derivatives in Space vs. Time

In Essay 3, we saw:

$$\frac{dN}{dt} = rN \quad \Rightarrow \quad N(t) = N_0 e^{rt}$$

Here, the independent variable was **time**.

In this essay:

$$\frac{dI}{dz} = -kI \quad \Rightarrow \quad I(z) = I_0 e^{-kz}$$

The independent variable is **height** (or depth).

**The mathematics is identical.** Differential equations don't care whether you're moving through time or space. The structure of the equation determines the solution.

This insight — that spatial and temporal processes can obey the same equations — is foundational to **mathematical physics** and **physical geography**.

---

## Summary

- Light intensity in a canopy follows Beer's Law: $I = I_0 e^{-kL}$
- $k$ is the extinction coefficient (depends on leaf angle, clumping, optical properties)
- $L$ is cumulative leaf area index above the point of interest
- This is exponential decay in the **vertical dimension**
- Typical forest floor light: 1–5% of incoming radiation
- The math is identical to radioactive decay — but in space, not time
- Real canopies are clumped, scattered, and vary with sun angle

**Next:** In Essay 6, we'll explore how the **angle** of sunlight affects surface energy balance. We'll introduce trigonometry and the dot product to model solar geometry and projection effects.

---
