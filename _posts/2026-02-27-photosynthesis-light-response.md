---
layout: essay
title: "Photosynthesis and Light Response"
subtitle: "Converting solar energy to chemical energy — the light response curve"
date: 2026-02-26
categories: [modeling]
series: computational-geography-environmental
series_order: 8
cluster: H
cluster_title: "Ecosystem Processes"
tags:
  - computational-geography
  - modeling
  - photosynthesis
  - primary-productivity
  - biochemistry
  - carbon-cycle
math: true
viz: true
difficulty: 3
math_core: [rectangular-hyperbola, saturation, quantum-efficiency, michaelis-menten]
spatial_reasoning: 1
dynamics: 2
computation: 2
domain: [ecology, biogeochemistry, plant-physiology, carbon-cycle]
excerpt: >
  Photosynthesis converts light energy into chemical energy (sugars). The rate
  increases with light intensity but saturates at high light—a classic rectangular
  hyperbola response. This essay derives the light response curve, introduces
  quantum efficiency and saturation, and connects photosynthesis to gross primary
  productivity.
math_prerequisites: >
  Exponential decay (Essay 5 for light attenuation). Saturation functions and
  asymptotes conceptually. We'll introduce the rectangular hyperbola from scratch.
---

## 1. The Question

How much carbon does a forest fix per day?

Photosynthesis is the process where plants use light energy to convert CO₂ and water into sugars and oxygen:

$$6\text{CO}_2 + 6\text{H}_2\text{O} + \text{light} \to \text{C}_6\text{H}_{12}\text{O}_6 + 6\text{O}_2$$

The rate depends on:
- **Light intensity** (more light → more photosynthesis, up to a point)
- **CO₂ concentration** (more CO₂ → more carbon fixed)
- **Temperature** (warmer → faster enzymes, but too hot damages proteins)
- **Water availability** (drought closes stomata, limiting CO₂ uptake)

The mathematical question: How do we model the relationship between light intensity and photosynthesis rate?

---

## 2. The Conceptual Model

### The Light Response Curve

Plot photosynthesis rate ($A$, μmol CO₂/m²/s) vs. light intensity ($I$, μmol photons/m²/s):

**Three regions:**

1. **Low light** (< 200 μmol/m²/s): Photosynthesis increases **linearly** with light
   - Light is limiting
   - Slope = quantum efficiency ($\phi$)

2. **Moderate light** (200–1000 μmol/m²/s): Photosynthesis increases but **sub-linearly**
   - Transition zone
   - Enzyme capacity becoming limiting

3. **High light** (> 1000 μmol/m²/s): Photosynthesis **saturates**
   - Asymptotes to maximum rate ($A_{\text{max}}$)
   - Light no longer limiting; enzymes at maximum capacity

**Shape:** Rectangular hyperbola (or variants).

### Key Parameters

**Light compensation point** ($I_c$):  
Light intensity where photosynthesis equals respiration ($A = 0$).  
Below this, plant loses more carbon through respiration than it gains through photosynthesis.

**Quantum efficiency** ($\phi$):  
Initial slope of the light response curve (μmol CO₂ per μmol photons).  
Typical value: $\phi \approx 0.05$ (20 photons needed per CO₂ fixed).

**Light saturation point** ($I_{\text{sat}}$):  
Light intensity where photosynthesis reaches ~90% of maximum.  
C3 plants: ~500–800 μmol/m²/s  
C4 plants: ~1500–2000 μmol/m²/s

**Maximum photosynthesis** ($A_{\text{max}}$):  
Asymptotic rate at very high light (limited by enzyme capacity, not light).  
C3 crops: ~20–30 μmol/m²/s  
C4 crops: ~40–60 μmol/m²/s

---

## 3. Building the Mathematical Model

### Rectangular Hyperbola

The **non-rectangular hyperbola** model fits photosynthesis data well:

$$\theta A^2 - (\phi I + A_{\text{max}})A + \phi I A_{\text{max}} = 0$$

Where:
- $A$ = photosynthesis rate (μmol CO₂/m²/s)
- $I$ = light intensity (μmol photons/m²/s)
- $\phi$ = quantum efficiency (dimensionless)
- $A_{\text{max}}$ = maximum photosynthesis rate
- $\theta$ = curvature parameter (0 ≤ θ ≤ 1)

**Solving for $A$** (using quadratic formula):

$$A = \frac{(\phi I + A_{\text{max}}) - \sqrt{(\phi I + A_{\text{max}})^2 - 4\theta \phi I A_{\text{max}}}}{2\theta}$$

**Special case: θ = 0** (rectangular hyperbola):

$$A = \frac{\phi I A_{\text{max}}}{\phi I + A_{\text{max}}}$$

This is the **Michaelis-Menten form** (common in enzyme kinetics).

### Including Dark Respiration

Plants respire continuously (burning sugars for energy). **Dark respiration** ($R_d$) occurs day and night.

**Net photosynthesis** (observable rate):

$$A_{\text{net}} = A_{\text{gross}} - R_d$$

**Light response with respiration:**

$$A_{\text{net}}(I) = \frac{\phi I A_{\text{max}}}{\phi I + A_{\text{max}}} - R_d$$

At **zero light** ($I = 0$):

$$A_{\text{net}}(0) = -R_d$$

(Plant loses carbon through respiration)

**Light compensation point** ($I_c$): Where $A_{\text{net}} = 0$:

$$\frac{\phi I_c A_{\text{max}}}{\phi I_c + A_{\text{max}}} = R_d$$

Solve for $I_c$:

$$I_c = \frac{R_d A_{\text{max}}}{\phi(A_{\text{max}} - R_d)}$$

**Typical value:** $I_c \approx 20$–$50$ μmol/m²/s (dim indoor light).

### From Leaf to Canopy

**Leaf-level photosynthesis** is measured in growth chambers under controlled light.

**Canopy photosynthesis** integrates over:
- All leaves (sunlit and shaded)
- Vertical light gradient (Beer's law from Essay 5)
- Leaf area index (total leaf area per ground area)

**Simplified canopy GPP:**

$$\text{GPP} = \int_0^{LAI} A_{\text{leaf}}(I(L)) \, dL$$

Where $I(L) = I_0 e^{-k L}$ is light at cumulative leaf area $L$ (from Essay 5).

---

## 4. Worked Example by Hand

**Problem:** A crop leaf has:
- Quantum efficiency: $\phi = 0.05$
- Maximum photosynthesis: $A_{\text{max}} = 30$ μmol/m²/s
- Dark respiration: $R_d = 2$ μmol/m²/s

Calculate net photosynthesis at light intensities:  
(a) $I = 100$ μmol/m²/s  
(b) $I = 500$ μmol/m²/s  
(c) $I = 2000$ μmol/m²/s

### Solution

**Using the rectangular hyperbola model:**

$$A_{\text{gross}} = \frac{\phi I A_{\text{max}}}{\phi I + A_{\text{max}}}$$

$$A_{\text{net}} = A_{\text{gross}} - R_d$$

**(a) I = 100 μmol/m²/s**

$$A_{\text{gross}} = \frac{0.05 \times 100 \times 30}{0.05 \times 100 + 30} = \frac{150}{5 + 30} = \frac{150}{35} = 4.29 \text{ μmol/m}^2\text{/s}$$

$$A_{\text{net}} = 4.29 - 2 = 2.29 \text{ μmol/m}^2\text{/s}$$

**(b) I = 500 μmol/m²/s**

$$A_{\text{gross}} = \frac{0.05 \times 500 \times 30}{0.05 \times 500 + 30} = \frac{750}{25 + 30} = \frac{750}{55} = 13.6 \text{ μmol/m}^2\text{/s}$$

$$A_{\text{net}} = 13.6 - 2 = 11.6 \text{ μmol/m}^2\text{/s}$$

**(c) I = 2000 μmol/m²/s**

$$A_{\text{gross}} = \frac{0.05 \times 2000 \times 30}{0.05 \times 2000 + 30} = \frac{3000}{100 + 30} = \frac{3000}{130} = 23.1 \text{ μmol/m}^2\text{/s}$$

$$A_{\text{net}} = 23.1 - 2 = 21.1 \text{ μmol/m}^2\text{/s}$$

**Light compensation point:**

$$I_c = \frac{R_d A_{\text{max}}}{\phi(A_{\text{max}} - R_d)} = \frac{2 \times 30}{0.05 \times (30 - 2)} = \frac{60}{0.05 \times 28} = \frac{60}{1.4} = 42.9 \text{ μmol/m}^2\text{/s}$$

**Interpretation:**
- At low light (100), photosynthesis is ~4× respiration → modest net gain
- At moderate light (500), approaching half of maximum
- At high light (2000), near saturation (~77% of max)

---

## 5. Computational Implementation

Below is an interactive photosynthesis simulator.

<div class="viz-container" id="photosynthesis-viz">
  <div class="controls">
    <label>
      Plant type:
      <select id="plant-type">
        <option value="c3-crop" selected>C3 Crop</option>
        <option value="c4-crop">C4 Crop</option>
        <option value="tree">Temperate Tree</option>
        <option value="shade">Shade Plant</option>
      </select>
    </label>
    <label>
      Quantum efficiency (φ):
      <input type="range" id="phi-slider" min="0.02" max="0.08" step="0.01" value="0.05">
      <span id="phi-value">0.05</span>
    </label>
    <label>
      Max photosynthesis (A<sub>max</sub>, μmol/m²/s):
      <input type="range" id="amax-slider" min="10" max="60" step="5" value="30">
      <span id="amax-value">30</span>
    </label>
    <label>
      Dark respiration (R<sub>d</sub>, μmol/m²/s):
      <input type="range" id="rd-slider" min="0.5" max="5" step="0.5" value="2">
      <span id="rd-value">2.0</span>
    </label>
    <label>
      Current light (μmol/m²/s):
      <input type="range" id="light-current-slider" min="0" max="2000" step="50" value="500">
      <span id="light-current-value">500</span>
    </label>
  </div>
  <div class="photo-results">
    <h4>At Current Light Level:</h4>
    <p><strong>Gross photosynthesis:</strong> <span id="a-gross"></span> μmol CO₂/m²/s</p>
    <p><strong>Net photosynthesis:</strong> <span id="a-net"></span> μmol CO₂/m²/s</p>
    <p><strong>Light compensation:</strong> <span id="light-comp"></span> μmol/m²/s</p>
    <p><strong>Light saturation (90%):</strong> <span id="light-sat"></span> μmol/m²/s</p>
  </div>
  <div id="photosynthesis-chart" style="width: 100%; height: 450px;"></div>
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
  const chart = echarts.init(document.getElementById('photosynthesis-chart'));
  
  const plantTypes = {
    'c3-crop': { phi: 0.05, Amax: 30, Rd: 2, name: 'C3 Crop' },
    'c4-crop': { phi: 0.06, Amax: 50, Rd: 1.5, name: 'C4 Crop' },
    'tree': { phi: 0.04, Amax: 20, Rd: 1, name: 'Temperate Tree' },
    'shade': { phi: 0.07, Amax: 10, Rd: 0.8, name: 'Shade Plant' }
  };
  
  let plantType = 'c3-crop';
  let phi = 0.05;
  let Amax = 30;
  let Rd = 2;
  let currentLight = 500;
  
  function photosynthesisGross(I, phi, Amax) {
    return (phi * I * Amax) / (phi * I + Amax);
  }
  
  function photosynthesisNet(I, phi, Amax, Rd) {
    return photosynthesisGross(I, phi, Amax) - Rd;
  }
  
  function lightCompensation(phi, Amax, Rd) {
    return (Rd * Amax) / (phi * (Amax - Rd));
  }
  
  function lightSaturation(phi, Amax, Rd) {
    // Find I where A_net = 0.9 * (Amax - Rd)
    const target = 0.9 * (Amax - Rd);
    // Solve: (phi * I * Amax) / (phi * I + Amax) - Rd = target
    // phi * I * Amax = (target + Rd) * (phi * I + Amax)
    // phi * I * Amax = (target + Rd) * phi * I + (target + Rd) * Amax
    // phi * I * Amax - (target + Rd) * phi * I = (target + Rd) * Amax
    // phi * I * (Amax - target - Rd) = (target + Rd) * Amax
    const I_sat = ((target + Rd) * Amax) / (phi * (Amax - target - Rd));
    return I_sat;
  }
  
  function updateCalculation() {
    const Ic = lightCompensation(phi, Amax, Rd);
    const Isat = lightSaturation(phi, Amax, Rd);
    const Agross = photosynthesisGross(currentLight, phi, Amax);
    const Anet = photosynthesisNet(currentLight, phi, Amax, Rd);
    
    document.getElementById('a-gross').textContent = Agross.toFixed(2);
    document.getElementById('a-net').textContent = Anet.toFixed(2);
    document.getElementById('light-comp').textContent = Ic.toFixed(0);
    document.getElementById('light-sat').textContent = Isat.toFixed(0);
    
    updateChart(Ic, Isat);
  }
  
  function updateChart(Ic, Isat) {
    // Generate light response curve
    const lightValues = [];
    const grossValues = [];
    const netValues = [];
    
    for (let I = 0; I <= 2000; I += 20) {
      lightValues.push(I);
      grossValues.push(photosynthesisGross(I, phi, Amax));
      netValues.push(photosynthesisNet(I, phi, Amax, Rd));
    }
    
    const Agross_current = photosynthesisGross(currentLight, phi, Amax);
    const Anet_current = photosynthesisNet(currentLight, phi, Amax, Rd);
    
    const option = {
      title: {
        text: 'Photosynthesis Light Response Curve',
        left: 'center'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'cross' }
      },
      legend: {
        data: ['Gross Photosynthesis', 'Net Photosynthesis'],
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
        name: 'Light Intensity (μmol photons/m²/s)',
        nameLocation: 'middle',
        nameGap: 30,
        min: 0,
        max: 2000
      },
      yAxis: {
        type: 'value',
        name: 'Photosynthesis (μmol CO₂/m²/s)',
        nameLocation: 'middle',
        nameGap: 50
      },
      series: [
        {
          name: 'Gross Photosynthesis',
          type: 'line',
          data: lightValues.map((I, i) => [I, grossValues[i]]),
          lineStyle: { color: '#2ECC71', width: 2 },
          showSymbol: false
        },
        {
          name: 'Net Photosynthesis',
          type: 'line',
          data: lightValues.map((I, i) => [I, netValues[i]]),
          lineStyle: { color: '#3498DB', width: 2 },
          showSymbol: false,
          markLine: {
            silent: true,
            symbol: 'none',
            data: [
              { yAxis: 0, lineStyle: { type: 'dashed', color: '#95A5A6' }, label: { formatter: 'Zero' } },
              { yAxis: Amax - Rd, lineStyle: { type: 'dashed', color: '#E74C3C' }, label: { formatter: 'Max Net' } }
            ]
          },
          markPoint: {
            data: [
              {
                coord: [Ic, 0],
                symbol: 'circle',
                symbolSize: 8,
                itemStyle: { color: '#F39C12' },
                label: { show: true, formatter: 'Ic', position: 'top' }
              },
              {
                coord: [Isat, 0.9 * (Amax - Rd)],
                symbol: 'circle',
                symbolSize: 8,
                itemStyle: { color: '#9B59B6' },
                label: { show: true, formatter: 'Isat', position: 'top' }
              },
              {
                coord: [currentLight, Anet_current],
                symbol: 'pin',
                symbolSize: 50,
                itemStyle: { color: '#E74C3C' },
                label: { show: true, formatter: 'Current', position: 'top' }
              }
            ]
          }
        }
      ]
    };
    
    chart.setOption(option);
  }
  
  document.getElementById('plant-type').addEventListener('change', (e) => {
    plantType = e.target.value;
    const params = plantTypes[plantType];
    phi = params.phi;
    Amax = params.Amax;
    Rd = params.Rd;
    
    document.getElementById('phi-slider').value = phi;
    document.getElementById('phi-value').textContent = phi.toFixed(2);
    document.getElementById('amax-slider').value = Amax;
    document.getElementById('amax-value').textContent = Amax;
    document.getElementById('rd-slider').value = Rd;
    document.getElementById('rd-value').textContent = Rd.toFixed(1);
    
    updateCalculation();
  });
  
  document.getElementById('phi-slider').addEventListener('input', (e) => {
    phi = parseFloat(e.target.value);
    document.getElementById('phi-value').textContent = phi.toFixed(2);
    updateCalculation();
  });
  
  document.getElementById('amax-slider').addEventListener('input', (e) => {
    Amax = parseFloat(e.target.value);
    document.getElementById('amax-value').textContent = Amax;
    updateCalculation();
  });
  
  document.getElementById('rd-slider').addEventListener('input', (e) => {
    Rd = parseFloat(e.target.value);
    document.getElementById('rd-value').textContent = Rd.toFixed(1);
    updateCalculation();
  });
  
  document.getElementById('light-current-slider').addEventListener('input', (e) => {
    currentLight = parseFloat(e.target.value);
    document.getElementById('light-current-value').textContent = currentLight;
    updateCalculation();
  });
  
  updateCalculation();
  
  window.addEventListener('resize', () => chart.resize());
})();
</script>

**Try this:**
- **Switch to C4 crop:** Higher $A_{\text{max}}$ and light saturation → more productive
- **Switch to shade plant:** Lower $A_{\text{max}}$ but higher $\phi$ → efficient at low light
- **Increase respiration:** Light compensation point rises → need more light to break even
- **Move current light slider:** Watch how net photosynthesis changes
- **Low light (< 100):** Linear increase (quantum-limited)
- **High light (> 1000):** Saturates (enzyme-limited)

**Key insight:** The rectangular hyperbola captures the transition from light-limited to enzyme-limited photosynthesis.

---

## 6. Interpretation

### C3 vs. C4 Photosynthesis

**C3 plants** (wheat, rice, trees):
- Lower $A_{\text{max}}$ (~20–30 μmol/m²/s)
- Saturate at moderate light (~500–800 μmol/m²/s)
- Photorespiration at high temperature reduces efficiency

**C4 plants** (corn, sugarcane, millet):
- Higher $A_{\text{max}}$ (~40–60 μmol/m²/s)
- Saturate at high light (~1500–2000 μmol/m²/s)
- CO₂ concentrating mechanism suppresses photorespiration

**In full sunlight** (2000 μmol/m²/s):
- C3 plant: Photosynthesis ~25 μmol/m²/s (saturated)
- C4 plant: Photosynthesis ~50 μmol/m²/s (still increasing)

**C4 advantage** in hot, bright environments (tropics, summer crops).

### Shade Tolerance

**Shade-tolerant** plants (forest understory):
- High $\phi$ (efficient at low light)
- Low $A_{\text{max}}$ (don't need high capacity)
- Low $I_c$ (can survive deep shade)

**Sun plants** (crops, early successional):
- Lower $\phi$ (less efficient per photon)
- High $A_{\text{max}}$ (capitalize on full sun)
- High $I_c$ (need more light to break even)

### Gross Primary Productivity (GPP)

**Daily GPP** at canopy scale:

$$\text{GPP} = \int_{\text{day}} \sum_{\text{leaves}} A_{\text{net}}(I, T, ...) \, dt$$

**Typical values:**
- Tropical rainforest: 6–8 g C/m²/day
- Temperate forest: 3–5 g C/m²/day
- Cropland: 4–10 g C/m²/day (depends on irrigation, fertilizer)
- Grassland: 2–4 g C/m²/day
- Desert: < 1 g C/m²/day

**Annual global GPP:** ~120 Pg C/year (120 billion tons of carbon fixed by photosynthesis annually).

---

## 7. What Could Go Wrong?

### Assuming Light is Always Limiting

At **low CO₂** or **high temperature**, photosynthesis can be limited by:
- **Rubisco capacity** (CO₂ fixation enzyme)
- **RuBP regeneration** (electron transport chain capacity)
- **Stomatal conductance** (CO₂ diffusion into leaf)

**Light saturation** means light is no longer the limiting factor.

### Ignoring Acclimation

Plants **acclimate** to their light environment:
- Shade leaves: thin, high chlorophyll per mass → high $\phi$
- Sun leaves: thick, more enzymes → high $A_{\text{max}}$

**Same plant in different conditions** has different parameters.

### Forgetting Temperature Effects

**Respiration** increases exponentially with temperature (Q₁₀ ~ 2):

$$R_d(T) = R_d(20°\text{C}) \times 2^{(T-20)/10}$$

At high temperature:
- Respiration increases faster than photosynthesis
- Net productivity decreases
- Heat stress can damage enzymes

### Neglecting Water Stress

Drought → stomata close → CO₂ limited → photosynthesis drops even at high light.

**Water-stressed plants** have:
- Lower $A_{\text{max}}$ (stomatal limitation)
- Higher $I_c$ (respiration continues, photosynthesis suppressed)

---

## 8. Extension: Scaling to Ecosystems

**Net Primary Productivity (NPP):**

$$\text{NPP} = \text{GPP} - R_{\text{auto}}$$

Where $R_{\text{auto}}$ is **autotrophic respiration** (plant respiration from roots, stems, leaves at all times).

**Net Ecosystem Productivity (NEP):**

$$\text{NEP} = \text{NPP} - R_{\text{hetero}}$$

Where $R_{\text{hetero}}$ is **heterotrophic respiration** (decomposers breaking down dead organic matter).

**Positive NEP:** Ecosystem sequesters carbon (carbon sink)  
**Negative NEP:** Ecosystem releases carbon (carbon source)

**Next essay** will model soil moisture dynamics—how water availability controls transpiration and photosynthesis.

---

## 9. Math Refresher: The Rectangular Hyperbola

### Form

$$y = \frac{ax}{b + x}$$

**Asymptotes:**
- As $x \to 0$: $y \to 0$ (passes through origin)
- As $x \to \infty$: $y \to a$ (horizontal asymptote)

**Initial slope:**

$$\frac{dy}{dx}\bigg|_{x=0} = \frac{a}{b}$$

### Connection to Enzyme Kinetics

The **Michaelis-Menten equation** in biochemistry:

$$v = \frac{V_{\text{max}} [S]}{K_m + [S]}$$

Where:
- $v$ = reaction rate
- $V_{\text{max}}$ = maximum rate
- $[S]$ = substrate concentration
- $K_m$ = Michaelis constant (concentration at half-maximum rate)

**Same mathematical form** as photosynthesis light response!

### Saturation

At $x = b$:

$$y = \frac{ab}{b + b} = \frac{a}{2}$$

Half-maximum rate occurs when $x = b$.

For photosynthesis: Half-saturation light $I_{1/2} = A_{\text{max}} / \phi$.

---

## Summary

- **Photosynthesis** converts light → chemical energy (CO₂ + H₂O → sugars + O₂)
- **Light response curve:** Rectangular hyperbola shape
- **Low light:** Linear increase (slope = quantum efficiency $\phi$)
- **High light:** Saturates at $A_{\text{max}}$ (enzyme-limited)
- **Light compensation point** ($I_c$): Where photosynthesis = respiration
- **Quantum efficiency:** Typically $\phi \approx 0.05$ (20 photons per CO₂)
- **C4 plants** have higher $A_{\text{max}}$ and light saturation than C3 plants
- **Gross Primary Productivity** (GPP): Total carbon fixed by photosynthesis
- **Net Primary Productivity** (NPP) = GPP - plant respiration

**Next:** In Essay 21, we explore **soil moisture dynamics**—how water moves through soil, how plants extract it, and how drought stress limits photosynthesis and transpiration.

---
