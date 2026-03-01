---
layout: essay
title: "Fire Emissions and Smoke Dispersion"
subtitle: "Quantifying pollutant release and atmospheric transport from wildfires"
date: 2026-02-27
categories: [modeling]
series: computational-geography-atmospheric-hazards
series_order: 3
cluster: V
cluster_title: "Fire Science"
tags:
  - computational-geography
  - modeling
  - fire
  - emissions
  - air-quality
  - smoke
  - atmospheric-dispersion
math: true
viz: true
difficulty: 4
math_core: [emission-factors, plume-rise, gaussian-dispersion, particulate-transport]
spatial_reasoning: 3
dynamics: 4
computation: 3
domain: [atmospheric-science, public-health, air-quality, fire-science]
excerpt: >
  How much pollution does a wildfire release, and where will the smoke go? Fire
  emissions depend on fuel consumption and combustion efficiency, while smoke
  dispersion follows atmospheric transport. This essay derives emission factor
  equations, implements plume rise models, demonstrates Gaussian dispersion, and
  maps air quality impacts from wildfire smoke.
math_prerequisites: >
  Fire spread (Essay 61). Atmospheric stability. Gaussian functions. We'll introduce
  combustion chemistry and atmospheric dispersion from first principles.
---

## 1. The Question

What is the air quality impact 50 km downwind from this wildfire?

**Fire emissions:**

Pollutants released during combustion.

**Major species:**
- CO₂ (carbon dioxide): ~1650 g/kg fuel
- CO (carbon monoxide): ~60-100 g/kg
- PM₂.₅ (fine particles): ~10-20 g/kg
- NOₓ (nitrogen oxides): ~1-3 g/kg
- VOCs (volatile organics): ~10-30 g/kg
- CH₄ (methane): ~5-10 g/kg

**Health impacts:**

PM₂.₅ primary concern:
- Respiratory issues
- Cardiovascular stress
- Premature mortality

**Air quality standards:**

EPA: 35 μg/m³ (24-hour PM₂.₅)

Wildfire smoke: 100-500 μg/m³ common, >1000 μg/m³ near fires

**Applications:**
- Air quality forecasting
- Evacuation decisions
- Health advisories
- Climate forcing calculations
- Carbon accounting

---

## 2. The Conceptual Model

### Emission Factors

**Mass of pollutant per mass of fuel:**

$$EF_i = \frac{m_i}{m_{\text{fuel}}}$$

Where:
- $EF_i$ = emission factor for species $i$ (g/kg)
- $m_i$ = mass of species emitted
- $m_{\text{fuel}}$ = dry fuel consumed

**Total emissions:**

$$E_i = A \times B \times C \times EF_i$$

Where:
- $A$ = area burned (ha)
- $B$ = fuel loading (kg/ha)
- $C$ = combustion completeness (fraction, 0-1)

**Modified combustion efficiency (MCE):**

$$MCE = \frac{\Delta CO_2}{\Delta CO_2 + \Delta CO}$$

**Flaming:** MCE > 0.95 (high efficiency, less PM)  
**Smoldering:** MCE < 0.85 (low efficiency, more PM, CO)

**PM₂.₅ increases as MCE decreases:**

$$EF_{PM_{2.5}} = a - b \times MCE$$

Typical: $a = 60$, $b = 50$ → flaming = 12.5 g/kg, smoldering = 17.5 g/kg

### Plume Rise

**Buoyancy-driven ascent:**

Hot emissions rise above fire.

**Final plume height:**

$$H = H_s + \frac{1.6 F^{1/3}}{U s^{1/3}}$$

Where:
- $H$ = plume top height (m)
- $H_s$ = stack (fire) height (m)
- $F$ = buoyancy flux (m⁴/s³)
- $U$ = wind speed (m/s)
- $s$ = stability parameter

**Buoyancy flux:**

$$F = g \frac{Q_H}{c_p T_a \rho_a}$$

Where:
- $g$ = 9.81 m/s²
- $Q_H$ = sensible heat flux (W)
- $c_p$ = 1005 J/kg/K
- $T_a$ = ambient temperature (K)
- $\rho_a$ = air density (kg/m³)

**Typical wildfire:**

$Q_H = 10^8$ W → plume rise 1000-3000 m

### Gaussian Dispersion

**Concentration downwind:**

$$C(x,y,z) = \frac{Q}{2\pi U \sigma_y \sigma_z} \exp\left(-\frac{y^2}{2\sigma_y^2}\right) \left[\exp\left(-\frac{(z-H)^2}{2\sigma_z^2}\right) + \exp\left(-\frac{(z+H)^2}{2\sigma_z^2}\right)\right]$$

Where:
- $C$ = concentration (μg/m³)
- $Q$ = emission rate (μg/s)
- $U$ = wind speed (m/s)
- $\sigma_y, \sigma_z$ = dispersion parameters (m)
- $H$ = effective release height (m)
- Second exponential = ground reflection

**Dispersion parameters:**

Power-law with distance:

$$\sigma_y = a x^b$$
$$\sigma_z = c x^d$$

Constants depend on atmospheric stability class.

**Ground-level concentration (z=0):**

$$C(x,y,0) = \frac{Q}{\pi U \sigma_y \sigma_z} \exp\left(-\frac{y^2}{2\sigma_y^2}\right) \exp\left(-\frac{H^2}{2\sigma_z^2}\right)$$

---

## 3. Building the Mathematical Model

### Total Emissions Calculation

**Fuel consumption:**

$$FC = A \times FL \times CC$$

Where:
- $FC$ = fuel consumed (kg)
- $A$ = burned area (m²)
- $FL$ = fuel loading (kg/m²)
- $CC$ = combustion completeness

**Species emission:**

$$E_i = FC \times EF_i \times 10^{-6}$$ (tonnes)

**Example:**

Area = 1000 ha = 10⁷ m²  
Fuel loading = 1.5 kg/m² (forest)  
CC = 0.9  
$EF_{PM_{2.5}}$ = 15 g/kg

$$FC = 10^7 \times 1.5 \times 0.9 = 1.35 \times 10^7 \text{ kg}$$

$$E_{PM_{2.5}} = 1.35 \times 10^7 \times 15 \times 10^{-6} = 202.5 \text{ tonnes}$$

**Over 200 tonnes of PM₂.₅!**

### Emission Rate

**Temporal distribution:**

Fire burns over time $T$ (hours/days).

**Emission rate:**

$$Q(t) = \frac{E_i}{T} \times f(t)$$

Where $f(t)$ = temporal distribution (peak during active burning).

**Simplified:** Assume constant during active burning period.

$$Q = \frac{E_i}{T \times 3600}$$ (g/s)

### Stability Class

**Pasquill-Gifford classes:**

A: Extremely unstable (strong solar heating, light winds)  
B: Moderately unstable  
C: Slightly unstable  
D: Neutral  
E: Slightly stable  
F: Moderately stable (clear night, light winds)

**Affects dispersion:**

Unstable (A-C): Rapid vertical mixing, lower ground concentrations  
Stable (E-F): Limited mixing, concentrated plume

**Wildfire context:**

Heat from fire creates instability → often class C-D even at night.

---

## 4. Worked Example by Hand

**Problem:** Calculate PM₂.₅ emissions and downwind concentration.

**Fire characteristics:**
- Burned area: 500 ha
- Fuel type: Conifer forest
- Fuel loading: 2.0 kg/m²
- Combustion completeness: 85%
- Burn duration: 8 hours

**Meteorology:**
- Wind speed: 5 m/s
- Stability: Class C (slightly unstable)
- Plume height: 800 m

**Location of interest:**
- Downwind distance: 20 km
- Lateral offset: 2 km

Calculate total PM₂.₅ and ground-level concentration.

### Solution

**Step 1: Fuel consumed**

$$A = 500 \times 10^4 = 5 \times 10^6 \text{ m}^2$$

$$FC = 5 \times 10^6 \times 2.0 \times 0.85 = 8.5 \times 10^6 \text{ kg}$$

**Step 2: PM₂.₅ emission**

$EF_{PM_{2.5}} = 15$ g/kg (typical conifer)

$$E_{PM_{2.5}} = 8.5 \times 10^6 \times 15 = 1.275 \times 10^8 \text{ g} = 127.5 \text{ tonnes}$$

**Step 3: Emission rate**

$$Q = \frac{1.275 \times 10^8}{8 \times 3600} = \frac{1.275 \times 10^8}{28800} = 4427 \text{ g/s}$$

**Step 4: Dispersion parameters (Class C, x=20 km)**

From standard tables:

$$\sigma_y = 0.20 \times 20000^{0.894} = 0.20 \times 8913 = 1783 \text{ m}$$

$$\sigma_z = 0.14 \times 20000^{0.885} = 0.14 \times 8318 = 1164 \text{ m}$$

**Step 5: Concentration at (x=20 km, y=2 km, z=0)**

$$C = \frac{4427}{\pi \times 5 \times 1783 \times 1164} \exp\left(-\frac{2000^2}{2 \times 1783^2}\right) \exp\left(-\frac{800^2}{2 \times 1164^2}\right)$$

$$= \frac{4427}{32.5 \times 10^6} \times \exp(-0.63) \times \exp(-0.24)$$

$$= 1.36 \times 10^{-4} \times 0.533 \times 0.787$$

$$= 5.7 \times 10^{-5} \text{ g/m}^3 = 57 \text{ μg/m}^3$$

**Step 6: Interpret**

57 μg/m³ **exceeds EPA standard** (35 μg/m³)

Health advisory warranted at this location.

**Directly downwind (y=0):** Concentration would be ~107 μg/m³ (worse)

---

## 5. Computational Implementation

Below is an interactive smoke dispersion simulator.

<div class="viz-container" id="smoke-viz">
  <div class="controls">
    <label>
      Burned area (ha):
      <input type="range" id="burned-area" min="100" max="5000" step="100" value="1000">
      <span id="area-val">1000</span>
    </label>
    <label>
      Wind speed (m/s):
      <input type="range" id="wind" min="2" max="15" step="1" value="5">
      <span id="wind-val">5</span>
    </label>
    <label>
      Plume height (m):
      <input type="range" id="plume-height" min="200" max="2000" step="100" value="800">
      <span id="height-val">800</span>
    </label>
    <label>
      Stability class:
      <select id="stability">
        <option value="A">A (Very unstable)</option>
        <option value="B">B (Unstable)</option>
        <option value="C" selected>C (Slightly unstable)</option>
        <option value="D">D (Neutral)</option>
        <option value="E">E (Slightly stable)</option>
      </select>
    </label>
    <div class="smoke-info">
      <p><strong>Total PM₂.₅:</strong> <span id="total-pm">--</span> tonnes</p>
      <p><strong>Max concentration:</strong> <span id="max-conc">--</span> μg/m³</p>
      <p><strong>Distance to standard:</strong> <span id="dist-standard">--</span> km</p>
    </div>
  </div>
  <div id="smoke-canvas-container">
    <canvas id="smoke-canvas" width="700" height="400" style="border: 1px solid #ddd;"></canvas>
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
  const chart = echarts.init(document.getElementById('smoke-canvas'));
  
  let burnedArea = 1000;
  let windSpeed = 5;
  let plumeHeight = 800;
  let stabilityClass = 'C';
  
  const stabilityParams = {
    'A': {a: 0.22, b: 0.894, c: 0.20, d: 0.894},
    'B': {a: 0.16, b: 0.894, c: 0.12, d: 0.894},
    'C': {a: 0.11, b: 0.894, c: 0.08, d: 0.894},
    'D': {a: 0.08, b: 0.894, c: 0.06, d: 0.894},
    'E': {a: 0.06, b: 0.894, c: 0.03, d: 0.894}
  };
  
  function calculateEmissions() {
    const fuelLoading = 1.5; // kg/m²
    const CC = 0.85;
    const EF_PM25 = 15; // g/kg
    
    const area = burnedArea * 10000; // m²
    const FC = area * fuelLoading * CC;
    const totalPM = FC * EF_PM25 / 1e6; // tonnes
    
    const Q = FC * EF_PM25 / (8 * 3600); // g/s (8 hour burn)
    
    return {totalPM, Q};
  }
  
  function calculateConcentration(x, y) {
    const {Q} = calculateEmissions();
    const params = stabilityParams[stabilityClass];
    
    const sigmaY = params.a * Math.pow(x, params.b);
    const sigmaZ = params.c * Math.pow(x, params.d);
    
    const H = plumeHeight;
    
    const C = (Q / (Math.PI * windSpeed * sigmaY * sigmaZ)) *
              Math.exp(-Math.pow(y, 2) / (2 * Math.pow(sigmaY, 2))) *
              Math.exp(-Math.pow(H, 2) / (2 * Math.pow(sigmaZ, 2)));
    
    return C; // μg/m³
  }
  
  function generatePlume() {
    const data = [];
    const maxDist = 50000; // 50 km
    
    for (let x = 1000; x <= maxDist; x += 1000) {
      const C = calculateConcentration(x, 0); // centerline
      data.push([x/1000, C]);
    }
    
    return data;
  }
  
  function findDistanceToStandard() {
    const standard = 35; // μg/m³
    
    for (let x = 1000; x <= 100000; x += 500) {
      const C = calculateConcentration(x, 0);
      if (C < standard) {
        return x / 1000;
      }
    }
    
    return '>100';
  }
  
  function render() {
    const {totalPM} = calculateEmissions();
    const plumeData = generatePlume();
    
    const maxConc = Math.max(...plumeData.map(d => d[1]));
    const distStandard = findDistanceToStandard();
    
    document.getElementById('total-pm').textContent = totalPM.toFixed(0);
    document.getElementById('max-conc').textContent = maxConc.toFixed(0);
    document.getElementById('dist-standard').textContent = 
      typeof distStandard === 'number' ? distStandard.toFixed(0) : distStandard;
    
    const series = [
      {
        name: 'PM₂.₅ Concentration',
        type: 'line',
        data: plumeData,
        lineStyle: {color: '#F44336', width: 3},
        areaStyle: {color: 'rgba(244, 67, 54, 0.3)'}
      },
      {
        name: 'EPA Standard (35 μg/m³)',
        type: 'line',
        data: [[0, 35], [50, 35]],
        lineStyle: {color: '#FF9800', width: 2, type: 'dashed'},
        markLine: {
          silent: true,
          label: {formatter: 'EPA 24-hr standard'}
        }
      },
      {
        name: 'Unhealthy (55 μg/m³)',
        type: 'line',
        data: [[0, 55], [50, 55]],
        lineStyle: {color: '#F57F17', width: 2, type: 'dotted'}
      }
    ];
    
    const option = {
      title: {
        text: 'Smoke Concentration vs Distance',
        left: 'center'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {type: 'cross'}
      },
      legend: {
        data: series.map(s => s.name),
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
        name: 'Distance Downwind (km)',
        nameLocation: 'middle',
        nameGap: 30,
        min: 0,
        max: 50
      },
      yAxis: {
        type: 'value',
        name: 'PM₂.₅ (μg/m³)',
        nameLocation: 'middle',
        nameGap: 50,
        min: 0
      },
      series: series
    };
    
    chart.setOption(option, true);
  }
  
  document.getElementById('burned-area').addEventListener('input', (e) => {
    burnedArea = parseFloat(e.target.value);
    document.getElementById('area-val').textContent = burnedArea;
    render();
  });
  
  document.getElementById('wind').addEventListener('input', (e) => {
    windSpeed = parseFloat(e.target.value);
    document.getElementById('wind-val').textContent = windSpeed;
    render();
  });
  
  document.getElementById('plume-height').addEventListener('input', (e) => {
    plumeHeight = parseFloat(e.target.value);
    document.getElementById('height-val').textContent = plumeHeight;
    render();
  });
  
  document.getElementById('stability').addEventListener('change', (e) => {
    stabilityClass = e.target.value;
    render();
  });
  
  render();
  
  window.addEventListener('resize', () => chart.resize());
})();
</script>

**Observations:**
- Concentration decreases with distance as plume disperses
- Higher plume rise reduces ground-level concentrations
- Unstable atmosphere promotes mixing (lower peak concentrations)
- EPA standard often exceeded 10-30 km downwind
- Larger fires produce proportionally more emissions
- Wind speed dilutes concentrations but transports farther

**Key insights:**
- Smoke impacts extend far beyond fire perimeter
- Atmospheric stability critically affects dispersion
- PM₂.₅ health risks significant at large distances
- Multiple factors determine air quality impacts

---

## 6. Interpretation

### Health Impacts

**PM₂.₅ exposure effects:**

**Short-term (hours-days):**
- Respiratory irritation
- Asthma attacks
- Reduced lung function

**Long-term (weeks-months):**
- Cardiovascular events
- Premature mortality
- Chronic conditions

**Vulnerable populations:**
- Children
- Elderly
- Respiratory disease
- Cardiovascular disease

**2020 California fires:**

Estimated 1200-3000 premature deaths from smoke exposure.

**Economic impact:** $10-80 billion (health costs).

### Air Quality Forecasting

**BlueSky framework:**

1. **Fuel consumption:** From fire progression models
2. **Emissions:** Apply emission factors
3. **Dispersion:** HYSPLIT or CALPUFF models
4. **Forecast:** 1-3 day PM₂.₅ predictions

**Operational use:**

NOAA Smoke Forecasting System (daily products).

**Applications:**
- Public health advisories
- School closures
- Outdoor event cancellations
- Hospital preparedness

### Carbon Accounting

**CO₂ emissions:**

$$E_{CO_2} = FC \times 1650 \text{ g/kg}$$

**Example:** 10 million hectares burned globally (annual average)

Fuel loading ~1.5 kg/m², CC = 0.9:

$$FC = 10^{10} \times 1.5 \times 0.9 = 1.35 \times 10^{10} \text{ kg}$$

$$E_{CO_2} = 1.35 \times 10^{10} \times 1650 \times 10^{-12} = 22.3 \text{ Gt CO}_2$$

**~5% of global fossil fuel emissions!**

---

## 7. What Could Go Wrong?

### Injection Height Uncertain

**Plume rise depends** on fire intensity, atmospheric stability.

**Under-prediction:**

Plume rises higher than modeled → lower ground concentrations (false alarm).

**Over-prediction:**

Plume doesn't rise → higher ground concentrations (missed hazard).

**Example - 2003 Canberra:**

Pyrocumulonimbus (fire-generated thunderstorm) injected smoke to 15 km (vs predicted 3 km).

**Solution:** Real-time satellite observations (GOES, MODIS).

### Complex Terrain

**Gaussian model assumes** flat terrain, uniform meteorology.

**Mountains:**
- Channeled flows (valleys)
- Slope winds
- Thermal circulations

**Result:** Smoke pooling in valleys, unpredicted transport.

**Solution:** CALPUFF (puff model) or WRF-Chem (3D meteorology + chemistry).

### Chemistry Ignored

**Simple models:** Transport PM₂.₅ as inert tracer.

**Reality:**

Photochemical aging:
- VOCs + NOₓ → ozone, secondary PM
- PM₂.₅ mass increases downwind
- Composition changes

**Solution:** Chemical transport models (CMAQ, WRF-Chem).

### Background PM Not Considered

**Model predicts** fire contribution only.

**Total exposure:**

$$PM_{total} = PM_{background} + PM_{fire}$$

**Urban areas:**

$PM_{background}$ = 10-20 μg/m³ (normal)

Fire adds 30 μg/m³ → total = 40-50 μg/m³

**Exceeds standard** even though fire alone wouldn't.

---

## 8. Extension: Satellite-Based Emissions

**Bottom-up (models):**

Fire area × fuel × EF (this essay's approach).

**Top-down (satellites):**

Directly observe emissions from space.

**Fire radiative power (FRP):**

Thermal emission from fire (MW).

**FRP to emissions:**

$$E_i = FRP \times CE_i$$

Where $CE_i$ = conversion efficiency (g/MJ).

**Advantages:**
- Near real-time
- No fuel data needed
- Global coverage

**Sensors:**
- MODIS: 1 km, 4× daily
- VIIRS: 375 m, 2× daily
- GOES: 2 km, 5-15 min

**Example - GFAS (Global Fire Assimilation System):**

Copernicus service, daily global fire emissions.

---

## 9. Math Refresher: Gaussian Function

### Standard Form

$$f(x) = \frac{1}{\sigma\sqrt{2\pi}} \exp\left(-\frac{(x-\mu)^2}{2\sigma^2}\right)$$

Where:
- $\mu$ = mean
- $\sigma$ = standard deviation

**Properties:**
- Symmetric around $\mu$
- Total area = 1 (probability distribution)
- 68% within ±σ, 95% within ±2σ

### Two-Dimensional

$$f(x,y) = \frac{1}{2\pi\sigma_x\sigma_y} \exp\left(-\frac{x^2}{2\sigma_x^2} - \frac{y^2}{2\sigma_y^2}\right)$$

**Dispersion plume:**

Concentration follows Gaussian in crosswind (y) and vertical (z).

**Peak concentration:** On centerline (y=0, z=H).

---

## Summary

- Fire emissions quantified using emission factors relating pollutant mass to fuel consumed
- PM₂.₅ primary health concern with emission factors 10-20 g/kg fuel varying by fire type
- Plume rise driven by buoyancy determines effective release height for dispersion
- Gaussian dispersion model predicts ground-level concentrations based on meteorology
- Atmospheric stability critically affects smoke dispersion and ground concentrations
- Applications span air quality forecasting, health advisories, carbon accounting
- 2020 California fires estimated 1200-3000 premature deaths from smoke exposure
- Challenges include injection height uncertainty, complex terrain, atmospheric chemistry
- Satellite observations provide real-time emissions estimates via fire radiative power
- Critical tool for public health protection during wildfire events
