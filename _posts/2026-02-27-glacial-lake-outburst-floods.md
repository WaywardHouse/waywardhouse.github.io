---
layout: essay
title: "Glacial Lake Outburst Floods (GLOFs)"
subtitle: "When ice dams fail—catastrophic flooding from glacial lakes"
date: 2026-02-27
categories: [modeling]
series: computational-geography-cryosphere
series_order: 7
cluster: Q
cluster_title: "Glacial Systems"
tags:
  - computational-geography
  - modeling
  - cryosphere
  - glaciers
  - hazards
  - floods
  - glof
  - outburst-floods
  - dam-breach
math: true
viz: true
difficulty: 4
math_core: [dam-breach-hydraulics, flood-routing, peak-discharge, energy-dissipation]
spatial_reasoning: 4
dynamics: 4
computation: 4
domain: [hazards, hydrology, glaciology, risk-assessment]
excerpt: >
  What happens when a glacial lake suddenly drains? GLOFs release millions of cubic
  meters of water in hours, devastating downstream communities. This essay derives
  dam breach equations, implements peak discharge prediction, models flood wave
  propagation, and shows how to assess GLOF hazards using remote sensing and DEMs.
math_prerequisites: >
  Hydrology basics (discharge, Manning equation). Glacier systems (Essays 46-47).
  Energy conservation. We'll introduce dam breach mechanics and flood hydraulics.
---

## 1. The Question

A glacial lake grows behind a moraine dam—when will it fail, and how big will the flood be?

**Glacial Lake Outburst Flood (GLOF):**

Sudden release of water from ice-dammed or moraine-dammed glacial lakes.

**Triggering mechanisms:**
- Ice dam flotation (buoyancy exceeds ice strength)
- Moraine dam overtopping (lake level rises)
- Earthquake (dam failure)
- Ice/rock avalanche into lake (displacement wave)
- Piping through dam (internal erosion)

**Characteristics:**
- Peak discharge: 100-100,000 m³/s (compared to normal flow 1-10 m³/s)
- Duration: Hours to days
- Sediment content: 30-70% by volume (hyperconcentrated flow)
- Highly destructive: Infrastructure, agriculture, lives

**Recent examples:**
- 2023: South Lhonak Lake, Sikkim (India) - 40+ deaths
- 2021: Chamoli disaster, India - 200+ deaths (rock avalanche → lake)
- 2013: Kedarnath, India - 5,000+ deaths
- 1941: Huaraz, Peru - 5,000+ deaths (Lake Palcacocha)

---

## 2. The Conceptual Model

### Lake Types

**1. Ice-dammed lakes:**
- Glacier blocks valley (tributary or main valley)
- Lake impounded against ice
- Drainage often subglacial (tunnel beneath ice)
- **Mechanism:** Ice dam floats when water pressure exceeds ice overburden

**2. Moraine-dammed lakes:**
- Terminal or lateral moraine forms natural dam
- Lake behind unconsolidated sediment/rock debris
- Drainage by overtopping or piping
- **Mechanism:** Dam overtops or erodes internally

**3. Bedrock-dammed lakes:**
- Stable, rarely fail
- GLOF only if overtopped by displacement wave

### Dam Breach Process

**Ice dam:**

**Phase 1 - Tunnel initiation:**
- Water pressure forces open cracks in ice
- Small tunnel grows by melt (frictional heat)

**Phase 2 - Tunnel enlargement:**
- Positive feedback: larger tunnel → more flow → more melt → larger tunnel
- Exponential growth

**Phase 3 - Peak discharge:**
- Tunnel diameter = 10s of meters
- Discharge peaks when lake lowered to tunnel level

**Phase 4 - Recession:**
- Lake empties, discharge declines
- Ice dam may re-seal for next cycle

**Moraine dam:**

**Phase 1 - Overtopping:**
- Water flows over dam crest
- Erosion begins

**Phase 2 - Breach initiation:**
- Channel incises into dam
- Headward erosion

**Phase 3 - Breach widening:**
- Rapid enlargement
- Dam material highly erodible

**Phase 4 - Peak discharge:**
- Full breach, maximum outflow

**Phase 5 - Stabilization:**
- Bedrock or resistant layer reached
- Discharge declines as lake drains

### Flood Wave Propagation

**Wave travels downstream:**

**Attenuation:**
- Peak discharge decreases with distance
- Flood duration increases (spreading)

**Channel effects:**
- Narrow valleys: Higher velocity, less attenuation
- Wide valleys: Lower velocity, more spreading
- Constrictions: Backwater, temporary storage

**Sediment bulking:**
- GLOF erodes channel
- Sediment concentration increases
- Transforms to debris flow in steep terrain

---

## 3. Building the Mathematical Model

### Ice Dam Flotation Criterion

**Buoyancy condition:**

Ice floats when water pressure exceeds ice weight:

$$\rho_w g h_w > \rho_i g h_i$$

Where:
- $\rho_w$ = water density (1000 kg/m³)
- $\rho_i$ = ice density (900 kg/m³)
- $h_w$ = water depth
- $h_i$ = ice thickness

**Critical water depth:**

$$h_w^* = \frac{\rho_i}{\rho_w} h_i = 0.9 h_i$$

**Example:** Ice dam 100m thick floats when water ≥ 90m deep.

**Factor of safety:**

$$F = \frac{\rho_i h_i}{\rho_w h_w}$$

**Failure:** $F < 1$ (lake drains)  
**Stable:** $F > 1$ (lake grows)

### Peak Discharge (Clague-Mathews Relation)

**Empirical formula for ice-dammed lakes:**

$$Q_{\max} = 75 V^{0.67}$$

Where:
- $Q_{\max}$ = peak discharge (m³/s)
- $V$ = lake volume (10⁶ m³)

**Example:** Lake volume = 10 million m³

$$Q_{\max} = 75 \times 10^{0.67} = 75 \times 4.64 = 348 \text{ m}^3\text{/s}$$

**Uncertainty:** Factor of 2-3× (varies with tunnel geometry, ice properties)

### Dam Breach (Parametric Model)

**For moraine dams, breach geometry:**

**Breach width:**

$$B = k_w h_d^a$$

Where:
- $h_d$ = dam height (m)
- $k_w$ = width coefficient (~2-5)
- $a$ = exponent (~1.0-1.4)

**Typical:** $B \approx 3h_d$ (breach width 3× dam height)

**Breach formation time:**

$$t_f = \frac{V_d}{C}$$

Where:
- $V_d$ = volume of eroded dam material (m³)
- $C$ = erosion coefficient (m³/s)

**Peak discharge (broad-crested weir):**

$$Q_{\max} = C_d B h_b^{1.5}$$

Where:
- $C_d$ = discharge coefficient (~1.7)
- $B$ = breach width (m)
- $h_b$ = breach flow depth (m)

### Flood Routing (Kinematic Wave)

**Flood wave velocity:**

$$c = \frac{dQ}{dA} = \frac{5}{3} v$$

Where:
- $c$ = wave celerity (m/s)
- $v$ = flow velocity (m/s)
- 5/3 factor from Manning equation

**Travel time:**

$$t_{\text{travel}} = \int_0^L \frac{dx}{c(x)}$$

**Peak attenuation:**

$$Q_{\text{downstream}} = Q_{\text{upstream}} \times e^{-\alpha x}$$

Where $\alpha$ = attenuation coefficient (depends on channel geometry, roughness)

**Typical:** Peak reduces 30-50% per 10 km in mountain valleys.

---

## 4. Worked Example by Hand

**Problem:** Estimate GLOF peak discharge and travel time.

**Glacial lake:**
- Surface area: 0.5 km² = 500,000 m²
- Average depth: 50 m
- Volume: $V = 0.5 \times 10^6 \times 50 = 25 \times 10^6$ m³
- Ice dam thickness: 80 m
- Water depth at dam: 75 m

**Downstream:**
- Village 15 km downstream
- Channel slope: 0.05 (5%)
- Manning's n: 0.045 (boulder bed)

### Solution

**Step 1: Check flotation**

$$F = \frac{0.9 \times 80}{75} = \frac{72}{75} = 0.96 < 1$$

**Dam will float** (marginal stability, likely to fail)

**Step 2: Peak discharge (Clague-Mathews)**

$$Q_{\max} = 75 \times 25^{0.67} = 75 \times 8.55 = 641 \text{ m}^3\text{/s}$$

**Step 3: Flood velocity**

Using Manning equation for wide channel:

$$v = \frac{1}{n} R^{2/3} S^{1/2}$$

Assume depth $h = 5$ m (during peak):

$$R \approx h = 5 \text{ m}$$

$$v = \frac{1}{0.045} \times 5^{2/3} \times 0.05^{1/2} = 22.2 \times 2.92 \times 0.224 = 14.5 \text{ m/s}$$

**Step 4: Wave celerity**

$$c = \frac{5}{3} \times 14.5 = 24.2 \text{ m/s}$$

**Step 5: Travel time**

$$t = \frac{15000}{24.2} = 620 \text{ seconds} = 10.3 \text{ minutes}$$

**Step 6: Attenuation**

Assume $\alpha = 0.03$ km⁻¹:

$$Q_{15\text{km}} = 641 \times e^{-0.03 \times 15} = 641 \times e^{-0.45} = 641 \times 0.64 = 410 \text{ m}^3\text{/s}$$

**Summary:**
- Peak discharge at source: **641 m³/s**
- Peak discharge at village: **410 m³/s** (36% reduction)
- Travel time: **10 minutes** (very little warning!)
- Flow depth: **5 m** (catastrophic)

**Hazard assessment:** EXTREME - village would be destroyed with <15 min warning.

---

## 5. Computational Implementation

Below is an interactive GLOF simulator.

<div class="viz-container" id="glof-viz">
  <div class="controls">
    <label>
      Lake volume (million m³):
      <input type="range" id="lake-vol" min="1" max="100" step="5" value="25">
      <span id="vol-val">25</span>
    </label>
    <label>
      Ice dam thickness (m):
      <input type="range" id="ice-thick" min="50" max="200" step="10" value="80">
      <span id="ice-val">80</span>
    </label>
    <label>
      Water depth (m):
      <input type="range" id="water-depth" min="30" max="150" step="5" value="75">
      <span id="depth-val">75</span>
    </label>
    <label>
      Distance downstream (km):
      <input type="range" id="distance" min="5" max="50" step="5" value="15">
      <span id="dist-val">15</span>
    </label>
    <div class="glof-info">
      <p><strong>Safety factor:</strong> <span id="safety-factor">--</span></p>
      <p><strong>Peak discharge:</strong> <span id="peak-q">--</span> m³/s</p>
      <p><strong>Travel time:</strong> <span id="travel-time">--</span> min</p>
      <p><strong>Downstream peak:</strong> <span id="down-q">--</span> m³/s</p>
      <p><strong>Hazard:</strong> <span id="hazard-level">--</span></p>
    </div>
  </div>
  <div id="glof-canvas-container">
    <canvas id="glof-canvas" width="700" height="400" style="border: 1px solid #ddd;"></canvas>
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
  const chart = echarts.init(document.getElementById('glof-canvas'));
  
  let lakeVol = 25;
  let iceThick = 80;
  let waterDepth = 75;
  let distance = 15;
  
  function calculateGLOF() {
    // Safety factor
    const F = (0.9 * iceThick) / waterDepth;
    
    // Peak discharge (Clague-Mathews)
    const Qmax = 75 * Math.pow(lakeVol, 0.67);
    
    // Wave velocity (simplified)
    const slope = 0.05;
    const n = 0.045;
    const h = 5; // assumed depth
    const v = (1/n) * Math.pow(h, 2/3) * Math.pow(slope, 0.5);
    const c = 5/3 * v;
    
    // Travel time
    const travelTime = (distance * 1000 / c) / 60; // minutes
    
    // Attenuation
    const alpha = 0.03; // per km
    const Qdown = Qmax * Math.exp(-alpha * distance);
    
    // Hazard level
    let hazard;
    if (F > 1.2) hazard = 'Low (stable)';
    else if (F > 1.0) hazard = 'Moderate (marginal)';
    else if (Qdown < 100) hazard = 'High';
    else if (Qdown < 500) hazard = 'Very High';
    else hazard = 'Extreme';
    
    return {F, Qmax, travelTime, Qdown, hazard, c, v};
  }
  
  function generateHydrograph() {
    const result = calculateGLOF();
    const Qmax = result.Qmax;
    
    // Simple triangular hydrograph
    const tPeak = 2; // hours
    const tBase = 8; // hours
    
    const hydro = [];
    const nPoints = 100;
    
    for (let i = 0; i <= nPoints; i++) {
      const t = i * tBase / nPoints;
      let Q;
      
      if (t < tPeak) {
        Q = Qmax * (t / tPeak);
      } else {
        Q = Qmax * (tBase - t) / (tBase - tPeak);
      }
      
      Q = Math.max(0, Q);
      hydro.push([t, Q]);
    }
    
    return hydro;
  }
  
  function generateDownstreamHydro() {
    const result = calculateGLOF();
    const hydro = generateHydrograph();
    const attenFactor = result.Qdown / result.Qmax;
    const lagTime = result.travelTime / 60; // hours
    
    return hydro.map(([t, Q]) => [t + lagTime, Q * attenFactor]);
  }
  
  function render() {
    const result = calculateGLOF();
    
    document.getElementById('safety-factor').textContent = result.F.toFixed(2);
    document.getElementById('peak-q').textContent = result.Qmax.toFixed(0);
    document.getElementById('travel-time').textContent = result.travelTime.toFixed(1);
    document.getElementById('down-q').textContent = result.Qdown.toFixed(0);
    document.getElementById('hazard-level').textContent = result.hazard;
    
    const hazardEl = document.getElementById('hazard-level');
    if (result.hazard.includes('Low')) hazardEl.style.color = '#2E7D32';
    else if (result.hazard.includes('Moderate')) hazardEl.style.color = '#F57F17';
    else if (result.hazard.includes('High')) hazardEl.style.color = '#E64A19';
    else hazardEl.style.color = '#B71C1C';
    
    const sourceHydro = generateHydrograph();
    const downHydro = generateDownstreamHydro();
    
    const series = [
      {
        name: 'Source (lake)',
        type: 'line',
        data: sourceHydro,
        lineStyle: {color: '#D32F2F', width: 3},
        areaStyle: {color: 'rgba(211, 47, 47, 0.3)'}
      },
      {
        name: `${distance} km downstream`,
        type: 'line',
        data: downHydro,
        lineStyle: {color: '#1976D2', width: 3},
        areaStyle: {color: 'rgba(25, 118, 210, 0.3)'}
      }
    ];
    
    const option = {
      title: {
        text: 'GLOF Hydrograph',
        left: 'center'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {type: 'cross'}
      },
      legend: {
        data: ['Source (lake)', `${distance} km downstream`],
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
        name: 'Time (hours)',
        nameLocation: 'middle',
        nameGap: 30,
        min: 0,
        max: 12
      },
      yAxis: {
        type: 'value',
        name: 'Discharge (m³/s)',
        nameLocation: 'middle',
        nameGap: 50,
        min: 0
      },
      series: series
    };
    
    chart.setOption(option, true);
  }
  
  document.getElementById('lake-vol').addEventListener('input', (e) => {
    lakeVol = parseFloat(e.target.value);
    document.getElementById('vol-val').textContent = lakeVol;
    render();
  });
  
  document.getElementById('ice-thick').addEventListener('input', (e) => {
    iceThick = parseFloat(e.target.value);
    document.getElementById('ice-val').textContent = iceThick;
    render();
  });
  
  document.getElementById('water-depth').addEventListener('input', (e) => {
    waterDepth = parseFloat(e.target.value);
    document.getElementById('depth-val').textContent = waterDepth;
    render();
  });
  
  document.getElementById('distance').addEventListener('input', (e) => {
    distance = parseFloat(e.target.value);
    document.getElementById('dist-val').textContent = distance;
    render();
  });
  
  render();
  
  window.addEventListener('resize', () => chart.resize());
})();
</script>

**Try this:**
- **Increase water depth:** Safety factor drops below 1.0 → dam fails!
- **Larger lake:** Higher peak discharge (exponential relationship)
- **Increase distance:** Peak attenuates, delayed arrival
- **Red hydrograph:** At source (lake breach)
- **Blue hydrograph:** Downstream (lower peak, delayed, wider)
- **Safety factor < 1.0:** Dam flotation imminent
- Watch hazard level change from Low → Extreme
- Notice: Even 15 km away, travel time < 20 minutes!

**Key insight:** GLOFs give minimal warning time—early detection and evacuation planning critical!

---

## 6. Interpretation

### Early Warning Systems

**Remote sensing monitoring:**

**Satellite optical (Landsat, Sentinel-2):**
- Lake area change (monthly)
- Ice dam position
- Freeboard (water to dam crest)

**SAR (Sentinel-1, ALOS-2):**
- All-weather monitoring
- Dam deformation (InSAR)

**On-site monitoring:**
- Water level sensors
- Seismometers (ice cracking, dam failure)
- Discharge gauges downstream
- Automated cameras

**Warning threshold:**

Lake level rising + dam deformation → evacuate!

**Case study - Tsho Rolpa, Nepal:**
- 1990s: Lake expanded rapidly
- 2000: Dam lowering project (-3m lake level)
- Ongoing monitoring
- Evacuation plan for 10,000 people downstream

### Risk Reduction

**Engineering solutions:**

**1. Lake lowering:**
- Pump water out
- Construct outlet channel
- Reduces volume → reduces potential discharge

**2. Dam reinforcement:**
- Add rock fill
- Armoring (concrete blocks)
- Improve drainage

**3. Early warning:**
- Sensor networks
- Sirens
- Communication systems

**Cost-benefit:**
- Lake lowering: $1-10 million
- Lives saved: 100s-1000s
- Infrastructure protected: $10s-100s millions

### Climate Change Impacts

**Glacier retreat:**
- More lakes forming (number increased 50% since 1990)
- Larger lakes (less ice to stabilize)
- Higher lakes (closer to steep terrain)

**Permafrost thaw:**
- Moraine dams less stable
- Increased piping potential

**Extreme precipitation:**
- Overtopping events more frequent
- Displacement waves from landslides

**Projection:** GLOF risk increasing 2-3×  by 2050 in many regions.

---

## 7. What Could Go Wrong?

### Underestimating Peak Discharge

**Clague-Mathews empirical:**

Derived from ~20 events, mostly small lakes.

**Large lakes (>50 million m³):** May exceed formula by 2-5×

**Moraine dams:** Often higher peaks than ice dams (sudden full breach vs. gradual tunnel growth)

**Solution:** Use multiple methods, uncertainty ranges, worst-case scenarios.

### Ignoring Sediment Bulking

**GLOF erodes channel:**

Entrains sediment → increases volume by 30-70%

**Debris flow transformation:**

In steep channels (>10% slope), GLOF becomes debris flow:
- Higher velocity
- Greater impact forces
- Overtops bends
- Deposits thick debris fans

**Solution:** Model sediment entrainment, debris flow mechanics.

### Cascade Effects

**GLOF triggers downstream GLOFs:**

**Example - Chamoli 2021:**
1. Rock avalanche into lake
2. GLOF released
3. Eroded valley
4. Triggered secondary failures
5. Compound flood wave

**Modeling challenge:** Must simulate entire cascade.

### False Alarms

**Lake level fluctuates naturally:**

Seasonal melt, rainfall

**Dam deformation:** Gradual vs. pre-failure

**Balance:** Sensitivity (detect real events) vs. specificity (avoid false alarms)

**Solution:** Multi-parameter thresholds, expert review.

---

## 8. Extension: GLOF Hazard Mapping

**Combine:**

**1. Lake inventory:**
- Satellite mapping of all glacial lakes
- Size, growth rate, dam type

**2. Susceptibility assessment:**

For each lake:

$$S = w_1 V + w_2 F + w_3 G + w_4 D$$

Where:
- $V$ = volume score
- $F$ = flotation/freeboard score
- $G$ = growth rate score
- $D$ = dam condition score
- $w_i$ = weights

**3. Downstream vulnerability:**

- Population density
- Infrastructure value
- Evacuation capacity

**4. Flood modeling:**

HEC-RAS or similar:
- Dam breach → hydrograph
- Route through DEM
- Inundation mapping

**Output:** GLOF hazard map (high/medium/low risk zones)

---

## 9. Math Refresher: Dam Breach Hydraulics

### Broad-Crested Weir Flow

**Critical flow over weir:**

$$Q = C_d B h^{3/2} \sqrt{2g}$$

Where:
- $C_d$ = discharge coefficient (~0.5-0.6)
- $B$ = breach width (m)
- $h$ = flow depth above weir crest (m)
- $g$ = 9.81 m/s²

**Simplified:** $Q \approx 1.7 B h^{1.5}$

### Energy Conservation

**Total energy (Bernoulli):**

$$H = z + \frac{v^2}{2g} + \frac{p}{\rho g}$$

Where:
- $z$ = elevation
- $v$ = velocity
- $p$ = pressure

**For free surface:** $p = p_{\text{atm}}$ (gauge pressure = 0)

$$H = z + \frac{v^2}{2g}$$

**Energy loss (friction):**

$$\Delta H = f \frac{L}{D} \frac{v^2}{2g}$$

Where $f$ = Darcy-Weisbach friction factor.

---

## Summary

- **GLOFs:** Catastrophic floods from sudden glacial lake drainage
- **Triggers:** Ice flotation, dam overtopping, avalanches, earthquakes, piping
- **Ice dam flotation:** Occurs when water pressure > ice weight (F < 1.0)
- **Peak discharge:** Clague-Mathews $Q_{max} = 75V^{0.67}$ for ice-dammed lakes
- **Travel time:** Minutes to hours in steep terrain (minimal warning)
- **Attenuation:** Peak reduces 30-50% per 10 km but still catastrophic
- **Moraine dams:** Often fail more suddenly than ice dams (full breach)
- **Climate change:** GLOF risk increasing (more lakes, less stable dams)
- **Mitigation:** Lake lowering, dam reinforcement, early warning systems
- **Monitoring:** Satellite remote sensing + ground sensors + flood modeling
- Critical for mountain communities in Peru, Nepal, Bhutan, Pakistan, China

---
