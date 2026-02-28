---
layout: essay
title: "Gravity Models of Trade and Migration"
subtitle: "Distance decay and inverse power laws in human geography"
date: 2026-02-26
categories: [modeling]
series: computational-geography-foundations
series_order: 10
cluster: D
cluster_title: "Human Systems as Mathematical Systems"
tags:
  - computational-geography
  - modeling
  - human-geography
  - spatial-interaction
  - distance-decay
  - inverse-power-laws
math: true
viz: true
difficulty: 3
math_core: [inverse-power-laws, distance-decay, parameter-estimation, sensitivity-analysis]
spatial_reasoning: 3
dynamics: 0
computation: 2
domain: [human-geography, economic-geography, migration, trade]
excerpt: >
  People interact more with nearby places than distant ones. Trade, migration,
  communication — all decay with distance. The gravity model captures this using
  an inverse power law borrowed from physics. This essay shows how mathematical
  patterns cross disciplinary boundaries.
math_prerequisites: >
  Exponential and power functions (Essays 3-4). Comfortable with the idea of
  proportionality. We'll introduce inverse power laws and show how the exponent
  controls the strength of distance decay.
---

## 1. The Question

Why do cities trade more with nearby cities than distant ones?

A person in Denver is more likely to:
- Shop in Boulder (40 km away) than in Phoenix (900 km)
- Migrate to Fort Collins (100 km) than to Seattle (2000 km)
- Commute to Aurora (20 km) than to Colorado Springs (110 km)

**Distance matters.** But how exactly?

The mathematical question: Can we write down a formula that predicts the strength of interaction between two places based on their sizes and the distance separating them?

---

## 2. The Conceptual Model

### The Gravity Analogy

In physics, Newton's law of gravitation states:

$$F = G \frac{m_1 m_2}{r^2}$$

**Gravitational force** is:
- Proportional to the **masses** of the two objects
- **Inversely proportional** to the **square** of the distance between them

**Human geography insight:** Maybe social and economic interactions follow a similar pattern?

**Gravity model of spatial interaction:**

$$I_{ij} = k \frac{P_i^\alpha P_j^\beta}{d_{ij}^\gamma}$$

Where:
- $I_{ij}$ is the **interaction** between place $i$ and place $j$ (migration flow, trade volume, phone calls, etc.)
- $P_i, P_j$ are the **populations** (or economic sizes) of the two places
- $d_{ij}$ is the **distance** between them
- $k$ is a **constant** (scaling factor)
- $\alpha, \beta, \gamma$ are **exponents** (often $\alpha = \beta = 1$, $\gamma \approx 1$–$2$)

### Distance Decay

The term $d_{ij}^{-\gamma}$ is called **distance decay**.

As distance increases, interaction **decreases** rapidly:
- If $\gamma = 1$: doubling distance halves interaction
- If $\gamma = 2$: doubling distance quarters interaction (like gravity)
- If $\gamma = 3$: doubling distance reduces interaction to 1/8

**Key insight:** The exponent $\gamma$ determines **how sensitive** interaction is to distance.

---

## 3. Building the Mathematical Model

### Simplest Form

Assume populations enter symmetrically ($\alpha = \beta = 1$) and distance decay follows an inverse square law ($\gamma = 2$):

$$I_{ij} = k \frac{P_i P_j}{d_{ij}^2}$$

**Interpretation:**
- **Numerator:** Larger populations → more interaction (more potential traders, migrants, commuters)
- **Denominator:** Greater distance → less interaction (higher travel cost, time, uncertainty)

### Calibrating the Exponent

Real data rarely fit $\gamma = 2$ exactly. The exponent depends on:
- **Type of interaction:** Commuting ($\gamma \approx 1.5$), migration ($\gamma \approx 1$–$2$), trade ($\gamma \approx 1.5$–$2.5$)
- **Transportation technology:** Better roads, cheaper flights → lower $\gamma$ (distance matters less)
- **Cultural/linguistic barriers:** Higher $\gamma$ across language boundaries

**Estimating $\gamma$:** Fit the model to observed data using regression.

Take logarithms:

$$\ln I_{ij} = \ln k + \ln P_i + \ln P_j - \gamma \ln d_{ij}$$

This is **linear in the logs**. Regress $\ln I_{ij}$ on $\ln P_i$, $\ln P_j$, and $\ln d_{ij}$ to estimate $\gamma$.

### Competing Destinations

If person in city $i$ is choosing where to migrate among multiple destinations, the **probability** of choosing destination $j$ is:

$$\text{Prob}(j | i) = \frac{P_j / d_{ij}^\gamma}{\sum_{k} P_k / d_{ik}^\gamma}$$

This is a **discrete choice model** — the denominator normalizes so probabilities sum to 1.

**Interpretation:** Larger, closer cities are more attractive destinations.

---

## 4. Worked Example by Hand

**Problem:** Three cities with populations and distances:

| City | Population | Distance from A |
|------|------------|-----------------|
| A    | 100,000    | 0               |
| B    | 50,000     | 100 km          |
| C    | 200,000    | 200 km          |

Using the gravity model $I_{ij} = k \frac{P_i P_j}{d_{ij}^2}$ with $k = 1$:

(a) What is the interaction $I_{AB}$ (A ↔ B)?  
(b) What is the interaction $I_{AC}$ (A ↔ C)?  
(c) Which city does A interact more with?

### Solution

**(a) Interaction A ↔ B**

$$I_{AB} = \frac{100000 \times 50000}{100^2} = \frac{5 \times 10^9}{10000} = 500000$$

**(b) Interaction A ↔ C**

$$I_{AC} = \frac{100000 \times 200000}{200^2} = \frac{2 \times 10^{10}}{40000} = 500000$$

**(c) Comparison**

$I_{AB} = I_{AC} = 500000$

**A interacts equally with B and C.**

**Why?** City C is twice as far (200 km vs. 100 km) but has **four times** the population (200,000 vs. 50,000). With $\gamma = 2$, these effects exactly cancel:

$$\frac{200000}{200^2} = \frac{50000}{100^2}$$

If $\gamma$ were larger (stronger distance decay), A would interact more with B. If $\gamma$ were smaller (weaker distance decay), A would interact more with C.

---

## 5. Computational Implementation

Below is an interactive gravity model with adjustable parameters.

<div class="viz-container" id="gravity-model-viz">
  <div class="controls">
    <label>
      Distance decay exponent (γ):
      <input type="range" id="gamma-slider" min="0.5" max="3.0" step="0.1" value="2.0">
      <span id="gamma-value">2.0</span>
    </label>
    <label>
      Number of cities:
      <input type="range" id="ncities-slider" min="3" max="10" step="1" value="5">
      <span id="ncities-value">5</span>
    </label>
    <label>
      Origin city:
      <select id="origin-select"></select>
    </label>
  </div>
  <div id="gravity-chart" style="width: 100%; height: 500px;"></div>
  <div class="info-panel">
    <p id="gravity-info"></p>
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
  const chart = echarts.init(document.getElementById('gravity-chart'));
  
  let gamma = 2.0;
  let nCities = 5;
  let originIndex = 0;
  let cities = [];
  
  function generateCities(n) {
    const cityList = [];
    const cityNames = ['Alpha', 'Beta', 'Gamma', 'Delta', 'Epsilon', 'Zeta', 'Eta', 'Theta', 'Iota', 'Kappa'];
    
    for (let i = 0; i < n; i++) {
      cityList.push({
        name: cityNames[i],
        x: Math.random() * 400 + 50,
        y: Math.random() * 300 + 50,
        pop: Math.floor(Math.random() * 400000) + 50000
      });
    }
    
    return cityList;
  }
  
  function distance(c1, c2) {
    return Math.sqrt((c1.x - c2.x)**2 + (c1.y - c2.y)**2);
  }
  
  function gravityInteraction(c1, c2, gamma) {
    const d = distance(c1, c2);
    if (d < 1) return 0; // Avoid division by zero
    return (c1.pop * c2.pop) / Math.pow(d, gamma);
  }
  
  function updateOriginSelect() {
    const select = document.getElementById('origin-select');
    select.innerHTML = '';
    cities.forEach((city, i) => {
      const option = document.createElement('option');
      option.value = i;
      option.textContent = city.name;
      select.appendChild(option);
    });
    select.value = originIndex;
  }
  
  function updateChart() {
    const origin = cities[originIndex];
    
    // Compute interactions
    const interactions = cities.map((dest, i) => {
      if (i === originIndex) return {city: dest, interaction: 0, distance: 0};
      const d = distance(origin, dest);
      const I = gravityInteraction(origin, dest, gamma);
      return {city: dest, interaction: I, distance: d};
    }).filter(item => item.interaction > 0);
    
    interactions.sort((a, b) => b.interaction - a.interaction);
    
    const maxInteraction = Math.max(...interactions.map(item => item.interaction));
    
    // Bar chart data
    const barData = interactions.map(item => ({
      name: item.city.name,
      value: item.interaction,
      distance: item.distance.toFixed(0),
      pop: item.city.pop
    }));
    
    const option = {
      title: {
        text: `Interaction from ${origin.name} (Pop: ${origin.pop.toLocaleString()})`,
        subtext: `Distance decay exponent γ = ${gamma.toFixed(1)}`,
        left: 'center'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' },
        formatter: params => {
          const item = params[0];
          const idx = interactions.findIndex(i => i.city.name === item.name);
          const info = barData[idx];
          return `${item.name}<br/>Interaction: ${item.value.toFixed(0)}<br/>Distance: ${info.distance} km<br/>Population: ${info.pop.toLocaleString()}`;
        }
      },
      grid: {
        left: 100,
        right: 40,
        top: 80,
        bottom: 60
      },
      xAxis: {
        type: 'value',
        name: 'Interaction Strength',
        nameLocation: 'middle',
        nameGap: 30
      },
      yAxis: {
        type: 'category',
        data: barData.map(item => item.name),
        name: 'Destination City'
      },
      series: [{
        type: 'bar',
        data: barData.map(item => item.value),
        itemStyle: {
          color: '#F0177A'
        },
        label: {
          show: false
        }
      }]
    };
    
    chart.setOption(option);
    
    document.getElementById('gravity-info').innerHTML = 
      `<strong>Total destinations:</strong> ${interactions.length} | <strong>Strongest interaction:</strong> ${interactions[0].city.name} (${interactions[0].interaction.toFixed(0)})`;
  }
  
  document.getElementById('gamma-slider').addEventListener('input', (e) => {
    gamma = parseFloat(e.target.value);
    document.getElementById('gamma-value').textContent = gamma.toFixed(1);
    updateChart();
  });
  
  document.getElementById('ncities-slider').addEventListener('input', (e) => {
    nCities = parseInt(e.target.value);
    document.getElementById('ncities-value').textContent = nCities;
    cities = generateCities(nCities);
    originIndex = 0;
    updateOriginSelect();
    updateChart();
  });
  
  document.getElementById('origin-select').addEventListener('change', (e) => {
    originIndex = parseInt(e.target.value);
    updateChart();
  });
  
  // Initialize
  cities = generateCities(nCities);
  updateOriginSelect();
  updateChart();
  
  window.addEventListener('resize', () => chart.resize());
})();
</script>

**Try this:**
- Set $\gamma = 0.5$ (weak distance decay): Large distant cities dominate
- Set $\gamma = 3.0$ (strong distance decay): Only nearby cities matter
- Change origin city: See how interaction patterns shift
- Increase number of cities: More competing destinations

**Key insight:** The exponent $\gamma$ is a **behavioral parameter** — it controls how much people care about distance vs. destination size.

---

## 6. Interpretation

### Why Distance Decay Exists

**Costs increase with distance:**
- **Time:** Longer travel takes more hours (lost productivity, fatigue)
- **Money:** Fuel, tickets, shipping fees scale with distance
- **Uncertainty:** Information about distant places is less reliable
- **Social ties:** Harder to maintain relationships across long distances

**Result:** The **friction of distance** reduces interaction.

### Cultural and Technological Shifts

**Historical change:**
- **1800s:** $\gamma \approx 3$–$4$ (horse-drawn transport, poor roads)
- **1950s:** $\gamma \approx 2$ (cars, highways, telephones)
- **2020s:** $\gamma \approx 1$–$1.5$ (air travel, internet, remote work)

**Interpretation:** Globalization = declining $\gamma$.

### Borders and Barriers

The gravity model often **underpredicts** cross-border flows because:
- Language differences
- Currency and trade regulations
- Cultural distance (not just spatial distance)

**Modified model:** Add a **border effect** term:

$$I_{ij} = k \frac{P_i P_j}{d_{ij}^\gamma} \times e^{-\delta B_{ij}}$$

Where $B_{ij} = 1$ if $i$ and $j$ are in different countries, 0 otherwise.

---

## 7. What Could Go Wrong?

### Assuming Symmetry

The model assumes $I_{ij} = I_{ji}$ (symmetric flows). In reality:
- **Migration:** More people move from rural to urban areas than the reverse
- **Trade:** Exports from A to B ≠ imports from B to A

**Solution:** Use **origin-constrained** or **destination-constrained** models that fix row or column totals.

### Measuring Distance

**Euclidean distance** (straight-line) is simple but unrealistic.

**Alternatives:**
- **Road network distance** (actual travel routes)
- **Travel time** (accounts for speed limits, congestion)
- **Economic distance** (cost of transport)

For air travel, straight-line distance is reasonable. For road freight, network distance matters.

### Omitting Intervening Opportunities

If city C lies between A and B, people from A may stop in C rather than continuing to B — even if B is larger.

The gravity model doesn't capture this **spatial competition** effect.

**Solution:** **Intervening opportunities model** — interaction decreases with the number of opportunities passed en route.

### Aggregation Bias

The model uses city-level populations. In reality, individuals vary:
- Some people are highly mobile (frequent travelers)
- Others are tied to place (elderly, families, low income)

**Aggregate models obscure individual heterogeneity.**

---

## 8. Extension: Retail Gravity Models

A shopper choosing between two stores follows the same logic:

$$\text{Prob}(\text{Store } j) = \frac{S_j / d_j^\gamma}{\sum_k S_k / d_k^\gamma}$$

Where $S_j$ is the **size** (floor area, product variety) of store $j$.

**Application:** Retailers use this to predict market share and choose store locations.

**Reilly's Law of Retail Gravitation (1931):** The **breaking point** between two competing cities A and B is:

$$d_A = \frac{d_{AB}}{1 + \sqrt{P_B / P_A}}$$

Where $d_{AB}$ is the distance between A and B. Customers closer than $d_A$ to city A will shop in A; those farther will shop in B.

---

## 9. Math Refresher: Power Laws vs. Exponentials

### Power Law

$$y = ax^{-\gamma}$$

- Straight line on **log-log** plot: $\ln y = \ln a - \gamma \ln x$
- **No characteristic scale** — the ratio $y(2x) / y(x)$ is constant regardless of $x$
- **Heavy tails** — large values occur more often than in exponential distributions

**Examples:** Gravity model, city size distributions (Zipf's law), earthquake magnitudes

### Exponential Decay

$$y = ae^{-\lambda x}$$

- Straight line on **semi-log** plot: $\ln y = \ln a - \lambda x$
- **Characteristic scale:** $1/\lambda$ is the distance where $y$ drops to $1/e \approx 37\%$
- **Light tails** — extreme values are rare

**Examples:** Radioactive decay, light attenuation, population density with distance from city center

### Which Fits Better?

**Empirical finding:** Many spatial interactions fit power laws better than exponentials over most distance ranges.

**Why?** Power laws lack a characteristic scale — interaction decays gradually at all distances, rather than dropping sharply beyond a threshold.

---

## Summary

- The **gravity model** predicts spatial interaction: $I_{ij} = k \frac{P_i P_j}{d_{ij}^\gamma}$
- **Distance decay** exponent $\gamma$ controls sensitivity to distance ($\gamma \approx 1$–$3$)
- Larger $\gamma$ → stronger distance decay (local interactions dominate)
- Smaller $\gamma$ → weaker distance decay (globalized interactions)
- The model applies to migration, trade, commuting, phone calls, retail choice
- Real flows require calibration and may need corrections for borders, intervening opportunities
- Power laws (gravity) vs. exponentials (attenuation) — different tail behaviors

**Next:** In Essay 11, we extend spatial interaction to **diffusion processes** — how innovations, diseases, or ideas spread across a network over time. This introduces discrete-time dynamics and network adjacency.

---
