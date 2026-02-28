---
layout: essay
title: "Decomposition and Soil Carbon Turnover"
subtitle: "From litterfall to soil organic matter — the slow carbon cycle"
date: 2026-02-26
categories: [modeling]
series: computational-geography-environmental
series_order: 14
cluster: J
cluster_title: "Biogeochemical Cycles"
tags:
  - computational-geography
  - modeling
  - carbon-cycle
  - decomposition
  - soil-organic-matter
  - litter
  - respiration
math: true
viz: true
difficulty: 3
math_core: [exponential-decay, multi-pool-dynamics, turnover-rates, temperature-dependence]
spatial_reasoning: 1
dynamics: 3
computation: 3
domain: [ecology, soil-science, biogeochemistry, carbon-cycle]
excerpt: >
  Dead plant material doesn't disappear instantly—it decomposes over months to
  millennia, releasing CO₂ back to the atmosphere. This essay models decomposition
  as a multi-pool system with different decay rates, introduces temperature and
  moisture controls, and calculates soil carbon storage at steady state.
math_prerequisites: >
  Exponential decay (Essay 3). Carbon allocation (Essay 22). Multi-compartment
  models. We'll build a 3-pool litter and soil organic matter model.
---

## 1. The Question

Where does the carbon go after plants die?

Leaves fall, roots die, wood decays. This dead organic matter (litter) accumulates on and in the soil, where microbes and fungi break it down, releasing CO₂ through **heterotrophic respiration**.

The balance between litter inputs and decomposition outputs determines:
- **Soil carbon storage** — soils hold 2–3× more carbon than atmosphere
- **Net Ecosystem Productivity** (NEP = NPP - $R_h$)
- **Carbon sequestration potential** — can soils store more carbon?
- **Soil fertility** — decomposition releases nutrients

The mathematical question: How do we model the flow of carbon from litter to soil organic matter to CO₂, accounting for different decay rates and environmental controls?

---

## 2. The Conceptual Model

### Litter and Soil Carbon Pools

**Three pools** with different turnover times:

1. **Litter** (fast pool):
   - Fresh leaves, fine roots, woody debris
   - Turnover time: 1–5 years
   - Rapidly decomposed

2. **Soil Organic Matter - Active** (medium pool):
   - Partially decomposed material
   - Microbial biomass
   - Turnover time: 10–50 years

3. **Soil Organic Matter - Slow/Passive** (slow pool):
   - Humus, recalcitrant compounds
   - Stabilized on clay minerals
   - Turnover time: 100–1000+ years

### Decomposition as Exponential Decay

Each pool loses carbon through **first-order decay**:

$$\frac{dC}{dt} = I - k C$$

Where:
- $C$ = carbon in pool (kg C/m²)
- $I$ = input rate (kg C/m²/year)
- $k$ = decay constant (year⁻¹)

**Turnover time** ($\tau$):

$$\tau = \frac{1}{k}$$

**Example:** Litter with $k = 0.5$ year⁻¹ has $\tau = 2$ years (half decomposes each 2 years).

### Environmental Controls

**Temperature:** Decomposition rate increases exponentially with temperature.

**Q₁₀ rule:** Decomposition rate doubles per 10°C warming.

$$k(T) = k_{20} \times Q_{10}^{(T-20)/10}$$

Where:
- $k_{20}$ = decay rate at 20°C
- $Q_{10} \approx 2$ (typically 1.5–3)
- $T$ = soil temperature (°C)

**Moisture:** Decomposition maximized at moderate moisture.

$$f(W) = \begin{cases}
W/W_{\text{opt}} & \text{if } W < W_{\text{opt}} \\
1 & \text{if } W = W_{\text{opt}} \\
(1-W)/(1-W_{\text{opt}}) & \text{if } W > W_{\text{opt}}
\end{cases}$$

Where $W$ is relative soil moisture (0–1) and $W_{\text{opt}} \approx 0.6$.

### Heterotrophic Respiration

**Total heterotrophic respiration:**

$$R_h = k_L C_L + k_A C_A + k_S C_S$$

Where subscripts L, A, S denote litter, active SOM, slow SOM.

**Net Ecosystem Productivity:**

$$\text{NEP} = \text{NPP} - R_h$$

**Positive NEP:** Ecosystem is a carbon sink  
**Negative NEP:** Ecosystem is a carbon source

---

## 3. Building the Mathematical Model

### Three-Pool Decomposition Model

**State variables:**
- $C_L$ = litter carbon (kg C/m²)
- $C_A$ = active SOM carbon (kg C/m²)
- $C_S$ = slow SOM carbon (kg C/m²)

**Litter dynamics:**

$$\frac{dC_L}{dt} = I_L - k_L C_L$$

Where $I_L$ is litterfall from vegetation (from Essay 22: turnover of leaves/roots).

**Active SOM dynamics:**

$$\frac{dC_A}{dt} = f_{LA} k_L C_L - k_A C_A$$

Where $f_{LA}$ is fraction of decomposed litter entering active SOM (typically 0.3–0.5, rest respired).

**Slow SOM dynamics:**

$$\frac{dC_S}{dt} = f_{AS} k_A C_A - k_S C_S$$

Where $f_{AS}$ is fraction of decomposed active SOM entering slow SOM (typically 0.2–0.3).

### Decay Constants

**Typical values at 20°C, optimal moisture:**

| Pool | Decay rate ($k$, year⁻¹) | Turnover time ($\tau$, years) |
|------|--------------------------|-------------------------------|
| Litter | 0.5–2.0 | 0.5–2 |
| Active SOM | 0.05–0.20 | 5–20 |
| Slow SOM | 0.001–0.01 | 100–1000 |

**Variation by climate:**
- Tropical: High $k$ (warm, wet)
- Temperate: Moderate $k$
- Boreal: Low $k$ (cold)
- Arid: Very low $k$ (dry, limited decomposers)

### Steady State

At equilibrium:

$$C_L^* = \frac{I_L}{k_L}$$

$$C_A^* = \frac{f_{LA} k_L C_L^*}{k_A} = \frac{f_{LA} I_L}{k_A}$$

$$C_S^* = \frac{f_{AS} k_A C_A^*}{k_S} = \frac{f_{AS} f_{LA} I_L}{k_S}$$

**Total soil carbon:**

$$C_{\text{soil}}^* = C_L^* + C_A^* + C_S^*$$

**Key insight:** Slow pool dominates total carbon despite small input fraction, because $k_S \ll k_L$.

### Heterotrophic Respiration at Steady State

$$R_h^* = k_L C_L^* + k_A C_A^* + k_S C_S^*$$

Substituting steady-state values:

$$R_h^* = I_L + f_{LA} I_L + f_{AS} f_{LA} I_L$$

Wait, this doesn't equal $I_L$. Let me recalculate correctly.

Actually, at steady state, total inputs = total outputs:

$$R_h^* = (1 - f_{LA}) k_L C_L^* + (1 - f_{AS}) k_A C_A^* + k_S C_S^*$$

After all transfers, this sums to $I_L$ (conservation of carbon).

---

## 4. Worked Example by Hand

**Problem:** A temperate forest has:
- Litterfall: $I_L = 0.4$ kg C/m²/year (from leaf/root turnover)
- Litter decay rate: $k_L = 1.0$ year⁻¹
- Active SOM decay rate: $k_A = 0.1$ year⁻¹
- Slow SOM decay rate: $k_S = 0.005$ year⁻¹
- Transfer fractions: $f_{LA} = 0.4$, $f_{AS} = 0.3$

Calculate steady-state carbon in each pool.

### Solution

**Litter pool:**

$$C_L^* = \frac{I_L}{k_L} = \frac{0.4}{1.0} = 0.4 \text{ kg C/m}^2$$

**Active SOM:**

$$C_A^* = \frac{f_{LA} I_L}{k_A} = \frac{0.4 \times 0.4}{0.1} = \frac{0.16}{0.1} = 1.6 \text{ kg C/m}^2$$

**Slow SOM:**

$$C_S^* = \frac{f_{AS} f_{LA} I_L}{k_S} = \frac{0.3 \times 0.4 \times 0.4}{0.005}$$

$$= \frac{0.048}{0.005} = 9.6 \text{ kg C/m}^2$$

**Total soil carbon:**

$$C_{\text{soil}}^* = 0.4 + 1.6 + 9.6 = 11.6 \text{ kg C/m}^2$$

**Interpretation:**
- Slow SOM holds **83%** of total soil carbon (9.6 / 11.6)
- This matches observations: most soil carbon is old, stable material
- Total = 11.6 kg C/m² = 116 tonnes C/ha (typical for temperate forest soil)

**Heterotrophic respiration:**

At steady state, $R_h = I_L = 0.4$ kg C/m²/year (all inputs eventually respired).

---

## 5. Computational Implementation

Below is an interactive decomposition simulator.

<div class="viz-container" id="decomp-viz">
  <div class="controls">
    <label>
      Ecosystem type:
      <select id="ecosystem-decomp">
        <option value="tropical">Tropical Forest</option>
        <option value="temperate" selected>Temperate Forest</option>
        <option value="boreal">Boreal Forest</option>
        <option value="grassland">Grassland</option>
        <option value="desert">Desert</option>
      </select>
    </label>
    <label>
      Litterfall rate (kg C/m²/year):
      <input type="range" id="litterfall-slider" min="0.1" max="1.0" step="0.05" value="0.4">
      <span id="litterfall-value">0.4</span>
    </label>
    <label>
      Temperature (°C):
      <input type="range" id="temp-decomp-slider" min="0" max="30" step="1" value="15">
      <span id="temp-decomp-value">15</span> °C
    </label>
    <label>
      Soil moisture (0-1):
      <input type="range" id="moisture-slider" min="0" max="1" step="0.05" value="0.6">
      <span id="moisture-value">0.6</span>
    </label>
    <label>
      Simulation years:
      <input type="range" id="years-decomp-slider" min="50" max="500" step="50" value="200">
      <span id="years-decomp-value">200</span> years
    </label>
    <div class="button-group">
      <button id="run-decomp-sim">Run Simulation</button>
    </div>
  </div>
  <div class="decomp-results">
    <p><strong>Total soil C:</strong> <span id="total-soil-c"></span> kg C/m²</p>
    <p><strong>Slow SOM fraction:</strong> <span id="slow-fraction"></span>%</p>
    <p><strong>R<sub>h</sub>:</strong> <span id="rh-result"></span> kg C/m²/year</p>
    <p><strong>Mean residence time:</strong> <span id="mrt-result"></span> years</p>
  </div>
  <div id="decomp-chart" style="width: 100%; height: 500px;"></div>
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
  const chart = echarts.init(document.getElementById('decomp-chart'));
  
  const ecosystems = {
    tropical: { kL: 2.0, kA: 0.20, kS: 0.01, fLA: 0.3, fAS: 0.2, temp: 25 },
    temperate: { kL: 1.0, kA: 0.10, kS: 0.005, fLA: 0.4, fAS: 0.3, temp: 15 },
    boreal: { kL: 0.3, kA: 0.05, kS: 0.002, fLA: 0.5, fAS: 0.4, temp: 5 },
    grassland: { kL: 1.5, kA: 0.15, kS: 0.008, fLA: 0.35, fAS: 0.25, temp: 18 },
    desert: { kL: 0.1, kA: 0.02, kS: 0.001, fLA: 0.3, fAS: 0.2, temp: 22 }
  };
  
  let ecoType = 'temperate';
  let litterfall = 0.4;
  let temperature = 15;
  let moisture = 0.6;
  let years = 200;
  
  const Q10 = 2.0;
  const Wopt = 0.6;
  
  function temperatureFactor(T) {
    return Math.pow(Q10, (T - 20) / 10);
  }
  
  function moistureFactor(W) {
    if (W < Wopt) {
      return W / Wopt;
    } else if (W <= 1.0) {
      return (1 - W) / (1 - Wopt);
    }
    return 0;
  }
  
  function runDecompSim() {
    const eco = ecosystems[ecoType];
    
    // Adjust decay rates for temperature and moisture
    const Tfactor = temperatureFactor(temperature);
    const Wfactor = moistureFactor(moisture);
    const envFactor = Tfactor * Wfactor;
    
    const kL = eco.kL * envFactor;
    const kA = eco.kA * envFactor;
    const kS = eco.kS * envFactor;
    
    // Initialize pools
    let CL = 0.1;
    let CA = 0.1;
    let CS = 0.1;
    
    const timeData = [];
    const litterData = [];
    const activeData = [];
    const slowData = [];
    const totalData = [];
    
    const dt = 0.5;
    
    for (let t = 0; t <= years; t += dt) {
      if (t % 5 < dt) {
        timeData.push(t);
        litterData.push(CL);
        activeData.push(CA);
        slowData.push(CS);
        totalData.push(CL + CA + CS);
      }
      
      // Update pools
      const dCL = litterfall - kL * CL;
      const dCA = eco.fLA * kL * CL - kA * CA;
      const dCS = eco.fAS * kA * CA - kS * CS;
      
      CL += dCL * dt;
      CA += dCA * dt;
      CS += dCS * dt;
      
      CL = Math.max(0, CL);
      CA = Math.max(0, CA);
      CS = Math.max(0, CS);
    }
    
    const totalC = CL + CA + CS;
    const slowFrac = (CS / totalC) * 100;
    const Rh = kL * CL + kA * CA + kS * CS;
    const MRT = totalC / litterfall; // Mean residence time
    
    document.getElementById('total-soil-c').textContent = totalC.toFixed(1);
    document.getElementById('slow-fraction').textContent = slowFrac.toFixed(0);
    document.getElementById('rh-result').textContent = Rh.toFixed(2);
    document.getElementById('mrt-result').textContent = MRT.toFixed(0);
    
    updateChart(timeData, litterData, activeData, slowData, totalData);
  }
  
  function updateChart(time, litter, active, slow, total) {
    const option = {
      title: {
        text: 'Soil Carbon Pool Dynamics',
        left: 'center'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'cross' }
      },
      legend: {
        data: ['Litter', 'Active SOM', 'Slow SOM', 'Total'],
        top: 30
      },
      grid: {
        left: 80,
        right: 40,
        top: 80,
        bottom: 60
      },
      xAxis: {
        type: 'value',
        name: 'Time (years)',
        nameLocation: 'middle',
        nameGap: 30
      },
      yAxis: {
        type: 'value',
        name: 'Carbon (kg C/m²)',
        nameLocation: 'middle',
        nameGap: 50
      },
      series: [
        {
          name: 'Litter',
          type: 'line',
          data: time.map((t, i) => [t, litter[i]]),
          lineStyle: { color: '#F39C12', width: 2 },
          showSymbol: false
        },
        {
          name: 'Active SOM',
          type: 'line',
          data: time.map((t, i) => [t, active[i]]),
          lineStyle: { color: '#E67E22', width: 2 },
          showSymbol: false
        },
        {
          name: 'Slow SOM',
          type: 'line',
          data: time.map((t, i) => [t, slow[i]]),
          lineStyle: { color: '#8B4513', width: 2 },
          showSymbol: false
        },
        {
          name: 'Total',
          type: 'line',
          data: time.map((t, i) => [t, total[i]]),
          lineStyle: { color: '#2C3E50', width: 3, type: 'dashed' },
          showSymbol: false
        }
      ]
    };
    
    chart.setOption(option);
  }
  
  document.getElementById('ecosystem-decomp').addEventListener('change', (e) => {
    ecoType = e.target.value;
    temperature = ecosystems[ecoType].temp;
    document.getElementById('temp-decomp-slider').value = temperature;
    document.getElementById('temp-decomp-value').textContent = temperature;
  });
  
  document.getElementById('litterfall-slider').addEventListener('input', (e) => {
    litterfall = parseFloat(e.target.value);
    document.getElementById('litterfall-value').textContent = litterfall.toFixed(2);
  });
  
  document.getElementById('temp-decomp-slider').addEventListener('input', (e) => {
    temperature = parseFloat(e.target.value);
    document.getElementById('temp-decomp-value').textContent = temperature;
  });
  
  document.getElementById('moisture-slider').addEventListener('input', (e) => {
    moisture = parseFloat(e.target.value);
    document.getElementById('moisture-value').textContent = moisture.toFixed(2);
  });
  
  document.getElementById('years-decomp-slider').addEventListener('input', (e) => {
    years = parseInt(e.target.value);
    document.getElementById('years-decomp-value').textContent = years;
  });
  
  document.getElementById('run-decomp-sim').addEventListener('click', () => {
    runDecompSim();
  });
  
  runDecompSim();
  
  window.addEventListener('resize', () => chart.resize());
})();
</script>

**Try this:**
- **Tropical forest:** High temperature → fast decomposition → low soil carbon accumulation
- **Boreal forest:** Low temperature → slow decomposition → huge soil carbon stores (peat)
- **Desert:** Dry conditions (low moisture) → very slow decomposition
- **Increase temperature:** Speeds all decay rates → reduces equilibrium carbon
- **Increase litterfall:** More inputs → higher steady-state carbon
- Notice: Slow SOM takes centuries to equilibrate, dominates total carbon

**Key insight:** Cold/wet environments accumulate soil carbon because decomposition is slower than production. This is why peatlands and permafrost soils are massive carbon stores.

---

## 6. Interpretation

### Global Soil Carbon Distribution

**Largest soil carbon stores:**
1. **Boreal forests & tundra:** Cold → slow decomposition
2. **Peatlands:** Waterlogged → anaerobic, very slow decay
3. **Grasslands:** Deep roots, moderate climate

**Smallest stores:**
1. **Tropical forests:** Fast turnover (hot, wet)
2. **Deserts:** Low productivity + dry conditions

**Paradox:** Tropical forests have low soil C despite high productivity (fast decomposition balances high input).

### Climate Change Feedbacks

**Warming accelerates decomposition:**

If temperature increases 5°C and Q₁₀ = 2:

$$k_{\text{new}} = k_{\text{old}} \times 2^{5/10} = k_{\text{old}} \times 1.41$$

**41% faster decomposition** → releases soil carbon → positive feedback.

**Permafrost thaw:**
- Frozen organic matter begins decomposing
- Releases CO₂ and CH₄
- Major climate concern (~1000 Pg C in permafrost)

### Soil Carbon Sequestration

**Practices to increase soil C:**
1. **No-till agriculture:** Reduces disturbance → less decomposition
2. **Cover crops:** More inputs to soil
3. **Biochar:** Very slow decay ($k \approx 0.0001$ year⁻¹)
4. **Organic amendments:** Compost, manure

**Saturation:** Soil can only hold so much carbon (determined by clay content, climate).

---

## 7. What Could Go Wrong?

### Assuming Single Decay Rate

Real litter has **multiple components:**
- Soluble sugars: $k \approx 10$ year⁻¹ (days to decompose)
- Cellulose: $k \approx 1$ year⁻¹ (months)
- Lignin: $k \approx 0.1$ year⁻¹ (years)

**Better model:** Multiple litter pools with different decay rates.

### Ignoring Priming Effects

**Priming:** Fresh litter addition stimulates decomposition of old SOM.

**Mechanism:** New carbon provides energy for microbes → they also decompose stable SOM.

**Effect:** Non-linear interactions between pools.

### Constant Transfer Fractions

Real $f_{LA}$, $f_{AS}$ vary with:
- **Litter quality:** High lignin → less transfer to SOM
- **Soil clay content:** More clay → more stabilization
- **Oxygen availability:** Anaerobic → more SOM formation

### Neglecting Nutrient Limitation

Decomposition requires **nitrogen** (microbes need C:N ~10:1).

**Low N litter** (wood, C:N > 100):
- Slow decomposition
- Microbes immobilize N from soil
- Net N immobilization

**High N litter** (legumes, C:N < 20):
- Fast decomposition
- Net N mineralization

**Our model is carbon-only.** Full model couples C and N cycles.

---

## 8. Extension: Century Model

The **Century model** (Parton et al., 1987) is the classic soil C model:

**Five pools:**
1. Structural litter (slow decay)
2. Metabolic litter (fast decay)
3. Active SOM (fast)
4. Slow SOM (medium)
5. Passive SOM (very slow)

**Climate modifiers:**
- Temperature (Q₁₀)
- Moisture (optimal curve)
- Soil texture (clay slows decay)

**Lignin effects:**
- High lignin → more to structural litter
- Affects decay rates

**Widely used** in ecosystem models (CASA, TEM, BIOME-BGC).

---

## 9. Math Refresher: First-Order Decay

### General Solution

For $\frac{dC}{dt} = I - kC$ with constant input $I$:

**Steady state:**

$$C^* = \frac{I}{k}$$

**Approach to steady state:**

$$C(t) = C^* + (C_0 - C^*) e^{-kt}$$

Where $C_0$ is initial value.

**Time to 95% of equilibrium:**

$$t_{95} = \frac{-\ln(0.05)}{k} = \frac{3}{k}$$

**Example:** If $k = 0.1$ year⁻¹:

$$t_{95} = \frac{3}{0.1} = 30 \text{ years}$$

Takes **30 years** to reach 95% of equilibrium.

**For slow pool** ($k = 0.005$ year⁻¹):

$$t_{95} = \frac{3}{0.005} = 600 \text{ years}$$

This is why soil carbon responds slowly to land use change.

---

## Summary

- **Decomposition** converts dead organic matter to CO₂ via heterotrophic respiration
- **Three pools:** Litter (fast, τ ~ 1 year), Active SOM (medium, τ ~ 10 years), Slow SOM (slow, τ ~ 100+ years)
- **First-order decay:** $dC/dt = I - kC$, steady state $C^* = I/k$
- **Temperature control:** Q₁₀ rule, decomposition doubles per 10°C
- **Moisture optimum:** Too dry or too wet slows decomposition
- Slow pool dominates total soil carbon (long turnover time)
- **Mean residence time:** Total C / Input rate
- **NEP = NPP - R_h** determines if ecosystem is carbon sink or source
- Cold/wet environments accumulate large soil carbon stores
- Climate warming accelerates decomposition → carbon release

**Next:** In Essay 27, we explore **nitrogen cycling**—how N limitation controls productivity, and the processes of mineralization, nitrification, and plant uptake.

---
