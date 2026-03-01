---
layout: essay
title: "Hail Formation and Forecasting"
subtitle: "Growth processes and prediction of damaging ice precipitation"
date: 2026-02-27
categories: [modeling]
series: computational-geography-atmospheric-hazards
series_order: 6
cluster: W
cluster_title: "Severe Weather"
tags:
  - computational-geography
  - modeling
  - meteorology
  - hail
  - severe-weather
  - microphysics
  - hazards
math: true
viz: true
difficulty: 4
math_core: [terminal-velocity, accretion-rate, wet-growth, hail-size-prediction]
spatial_reasoning: 2
dynamics: 4
computation: 3
domain: [meteorology, severe-weather, agriculture, insurance]
excerpt: >
  How large will the hail be and where will it fall? Hailstone growth depends on
  updraft strength, temperature profile, and liquid water content. This essay
  derives terminal velocity equations, implements accretion models, demonstrates
  wet vs dry growth regimes, and forecasts maximum hail size from storm parameters.
math_prerequisites: >
  Thunderstorm dynamics (Essay 63). Drag forces. Heat transfer basics. We'll
  introduce cloud microphysics and hail growth processes.
---

## 1. The Question

Will this supercell produce baseball-sized hail?

**Hail definition:**

Ice particles ≥5 mm diameter (pea-sized or larger).

**Damage thresholds:**

**Pea (6 mm):** Minimal crop damage  
**Quarter (25 mm, 1 inch):** **Severe criteria**, car dents  
**Golf ball (44 mm, 1.75 inch):** Car windshields broken  
**Baseball (70 mm, 2.75 inch):** Roof damage, vehicle totaled  
**Softball (114 mm, 4.5 inch):** Structural damage

**Record:** 8 inch (203 mm), Vivian SD 2010

**Annual losses (USA):** ~$1-2 billion

**Applications:**
- Agriculture (crop insurance)
- Aviation safety
- Severe weather warnings
- Building/vehicle damage assessment
- Climate studies

---

## 2. The Conceptual Model

### Terminal Velocity

**Balance drag and gravity:**

$$F_d = F_g$$

$$\frac{1}{2} \rho_a C_d A v_t^2 = m g$$

Where:
- $\rho_a$ = air density (kg/m³)
- $C_d$ = drag coefficient (~0.6 for sphere)
- $A$ = cross-sectional area (m²)
- $v_t$ = terminal velocity (m/s)
- $m$ = mass (kg)
- $g$ = 9.81 m/s²

**For sphere:**

$$A = \pi r^2, \quad m = \frac{4}{3}\pi r^3 \rho_h$$

**Solving:**

$$v_t = \sqrt{\frac{8 r g \rho_h}{3 C_d \rho_a}}$$

**Hail (ice density $\rho_h = 900$ kg/m³):**

$$v_t \approx 9 \sqrt{r}$$ (m/s, $r$ in meters)

**Example:** 5 cm diameter (r = 0.025 m)

$$v_t = 9 \sqrt{0.025} = 9 \times 0.158 = 1.42 \times 9 \approx 14 \text{ m/s}$$

**Updraft must exceed 14 m/s** to suspend this hailstone!

### Growth Regimes

**Dry growth:**

Temperature < -40°C or low liquid water content.

Collected droplets freeze instantly.

**Opaque ice** (trapped air bubbles).

**Wet growth:**

Warmer temperature (-10 to 0°C) or high liquid water content.

Droplets form liquid layer before freezing.

**Clear ice** (no air, denser).

**Transition:**

Depends on accretion rate vs heat removal rate.

**Spongy hail:**

Alternating dry/wet layers (trajectories through different cloud zones).

### Accretion Rate

**Mass growth:**

$$\frac{dm}{dt} = E \cdot A \cdot W \cdot v$$

Where:
- $E$ = collection efficiency (~0.8)
- $A$ = cross-sectional area
- $W$ = liquid water content (g/m³)
- $v$ = relative velocity (terminal fall + updraft)

**For suspended hailstone** ($v \approx$ updraft speed):

$$\frac{dm}{dt} = 0.8 \cdot \pi r^2 \cdot W \cdot w$$

**Typical:** $W = 1-5$ g/m³, $w = 20-50$ m/s

**Example:** $r = 0.02$ m, $W = 3$ g/m³, $w = 30$ m/s

$$\frac{dm}{dt} = 0.8 \times 3.14 \times 0.02^2 \times 3 \times 30 = 0.091 \text{ g/s}$$

**Residence time in updraft:** 5 minutes = 300 s

$$\Delta m = 0.091 \times 300 = 27.3 \text{ g}$$

**Final mass:** ~50-100 g (golf ball to baseball)

---

## 3. Building the Mathematical Model

### Maximum Hail Size

**Balance condition:**

Hailstone suspended when $v_t = w$ (updraft).

**From terminal velocity:**

$$r_{max} = \frac{w^2}{81 g}$$

(Using $v_t = 9\sqrt{r}$, solved for $r$)

**Simplified:**

$$r_{max} = \frac{w^2}{800}$$ (m, $w$ in m/s)

**Example:** $w = 40$ m/s

$$r_{max} = \frac{1600}{800} = 2 \text{ cm} = 20 \text{ mm diameter}$$

**Quarter-sized hail** (severe threshold)

**For softball (57 mm radius):**

$$w = \sqrt{800 \times 0.057} = \sqrt{45.6} = 67.5 \text{ m/s}$$

**Extreme updrafts required!**

### MESH (Maximum Expected Size of Hail)

**Radar-based estimate:**

Uses vertically integrated reflectivity.

$$MESH = 2.54 \times W^{0.5}$$

Where $W$ = integrated reflectivity (g/m²).

**Severe Hail Index (SHI):**

$$SHI = 0.1 \int_{H_0}^{H_{-20}} (Z - Z_0) \, dh$$

Where integration from freezing level to -20°C level.

**MESH from SHI:**

$$MESH = 2.54 \times SHI^{0.5}$$

**MESH = 25 mm:** Severe hail likely  
**MESH = 50 mm:** Very large hail  
**MESH > 75 mm:** Giant hail (baseball+)

### Hail Swath

**Falling trajectory:**

Hail falls from updraft maximum.

**Lateral displacement:**

$$\Delta x = \frac{v_t}{w} \times H \times \frac{U}{w}$$

Where:
- $H$ = fall distance
- $U$ = storm-relative wind

**Typical:** 5-20 km downwind of updraft maximum

**Swath width:** 1-10 km (updraft width + spread)

---

## 4. Worked Example by Hand

**Problem:** Predict maximum hail size and swath location.

**Storm parameters:**
- Maximum updraft: 45 m/s
- Updraft top: 12 km
- Freezing level: 4 km
- Storm motion: 240° at 15 m/s
- Environmental wind at 6 km: 270° at 20 m/s

**Radar:**
- Peak reflectivity: 65 dBZ
- Reflectivity top: 14 km
- SHI: 150

Calculate maximum hail size and impact location relative to updraft.

### Solution

**Step 1: Maximum suspended hail**

$$r_{max} = \frac{w^2}{800} = \frac{45^2}{800} = \frac{2025}{800} = 2.53 \text{ cm}$$

**Diameter:** 5.06 cm = **2 inch (golf ball)**

**Step 2: MESH from radar**

$$MESH = 2.54 \times 150^{0.5} = 2.54 \times 12.25 = 31.1 \text{ mm}$$

**1.25 inch** (between quarter and golf ball)

**Slightly lower than maximum** (radar underestimates largest stones)

**Step 3: Terminal velocity for 2-inch hail**

$$v_t = 9 \sqrt{0.0253} = 9 \times 0.159 = 14.3 \text{ m/s}$$

**Step 4: Fall time**

From updraft top (12 km) to ground:

Assume average updraft weakens: 30 m/s upper, 20 m/s lower

**Ascent slowed but falls eventually.**

Fall distance after release: 12 - 4 = 8 km (below freezing)

Fall time:

$$t = \frac{8000}{14.3} = 560 \text{ seconds} \approx 9 \text{ minutes}$$

**Step 5: Storm-relative wind**

At 6 km: 270° at 20 m/s  
Storm: 240° at 15 m/s

**Relative:** ~15 m/s from west (simplified)

**Step 6: Lateral displacement**

$$\Delta x = 15 \times 560 = 8400 \text{ m} = 8.4 \text{ km}$$

**Hail falls 8-9 km east** of updraft maximum

**Step 7: Impact assessment**

Golf ball hail expected:
- Car windshields broken
- Roof damage possible
- Crop total loss

**Swath:** 8-10 km east of storm core, width 2-3 km

**Warning:** Large hail imminent, take shelter

---

## 5. Computational Implementation

Below is an interactive hail growth simulator.

<div class="viz-container" id="hail-viz">
  <div class="controls">
    <label>
      Max updraft (m/s):
      <input type="range" id="updraft" min="15" max="70" step="5" value="40">
      <span id="updraft-val">40</span>
    </label>
    <label>
      Liquid water content (g/m³):
      <input type="range" id="lwc" min="1" max="6" step="0.5" value="3">
      <span id="lwc-val">3</span>
    </label>
    <label>
      Updraft residence time (min):
      <input type="range" id="residence" min="2" max="10" step="1" value="5">
      <span id="res-val">5</span>
    </label>
    <div class="hail-info">
      <p><strong>Max hail diameter:</strong> <span id="max-diameter">--</span> mm</p>
      <p><strong>Hail category:</strong> <span id="category">--</span></p>
      <p><strong>Terminal velocity:</strong> <span id="terminal-vel">--</span> m/s</p>
      <p><strong>Damage potential:</strong> <span id="damage">--</span></p>
    </div>
  </div>
  <div id="hail-canvas-container">
    <canvas id="hail-canvas" width="700" height="400" style="border: 1px solid #ddd;"></canvas>
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
  const chart = echarts.init(document.getElementById('hail-canvas'));
  
  let updraft = 40;
  let lwc = 3;
  let residence = 5;
  
  function getHailCategory(diameter) {
    if (diameter >= 114) return {name: 'Softball', damage: 'Extreme - Structural', color: '#8B0000'};
    if (diameter >= 70) return {name: 'Baseball', damage: 'Severe - Roof/vehicle total', color: '#B71C1C'};
    if (diameter >= 44) return {name: 'Golf ball', damage: 'Major - Windshields broken', color: '#E64A19'};
    if (diameter >= 25) return {name: 'Quarter', damage: 'Significant - Car dents', color: '#F57F17'};
    if (diameter >= 13) return {name: 'Dime', damage: 'Moderate - Crop/vegetation', color: '#FFA726'};
    if (diameter >= 6) return {name: 'Pea', damage: 'Minor - Minimal', color: '#FFB74D'};
    return {name: 'Sub-severe', damage: 'Negligible', color: '#66BB6A'};
  }
  
  function simulateGrowth() {
    const data = [];
    const dt = 10; // seconds
    const totalTime = residence * 60; // convert to seconds
    
    let mass = 0.001; // g (start with small embryo)
    
    for (let t = 0; t <= totalTime; t += dt) {
      const radius = Math.pow(3 * mass / (4 * Math.PI * 0.9), 1/3) * 100; // cm, ice density 0.9 g/cm³
      
      // Collection efficiency
      const E = 0.8;
      
      // Relative velocity (updraft speed - terminal velocity)
      const vt = 9 * Math.sqrt(radius / 100); // terminal vel in m/s
      const relVel = Math.max(5, updraft - vt);
      
      // Accretion rate
      const dmdt = E * Math.PI * Math.pow(radius / 100, 2) * lwc * relVel; // g/s
      
      mass += dmdt * dt;
      
      const diameter = radius * 2 * 10; // mm
      data.push([t / 60, diameter]);
    }
    
    return data;
  }
  
  function render() {
    const growthData = simulateGrowth();
    const finalDiameter = growthData[growthData.length - 1][1];
    
    // Max size from updraft capacity
    const rMax = updraft * updraft / 800; // meters
    const dMax = rMax * 2000; // mm
    
    const category = getHailCategory(finalDiameter);
    
    // Terminal velocity
    const vt = 9 * Math.sqrt(finalDiameter / 2000);
    
    document.getElementById('max-diameter').textContent = Math.min(finalDiameter, dMax).toFixed(0);
    document.getElementById('category').textContent = category.name;
    document.getElementById('category').style.color = category.color;
    document.getElementById('terminal-vel').textContent = vt.toFixed(1);
    document.getElementById('damage').textContent = category.damage;
    
    const series = [
      {
        name: 'Hail Growth',
        type: 'line',
        data: growthData,
        lineStyle: {color: category.color, width: 3},
        areaStyle: {
          color: {
            type: 'linear',
            x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [
              {offset: 0, color: category.color + 'AA'},
              {offset: 1, color: category.color + '22'}
            ]
          }
        }
      },
      {
        name: 'Severe Threshold (25mm)',
        type: 'line',
        data: [[0, 25], [residence, 25]],
        lineStyle: {color: '#FF9800', width: 2, type: 'dashed'}
      }
    ];
    
    const option = {
      title: {
        text: `Hailstone Growth (${category.name})`,
        left: 'center'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {type: 'cross'},
        formatter: (params) => {
          if (params[0]) {
            return `Time: ${params[0].value[0].toFixed(1)} min<br/>Diameter: ${params[0].value[1].toFixed(0)} mm`;
          }
        }
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
        name: 'Time in Updraft (minutes)',
        nameLocation: 'middle',
        nameGap: 30,
        min: 0,
        max: residence
      },
      yAxis: {
        type: 'value',
        name: 'Hail Diameter (mm)',
        nameLocation: 'middle',
        nameGap: 50,
        min: 0
      },
      series: series
    };
    
    chart.setOption(option, true);
  }
  
  document.getElementById('updraft').addEventListener('input', (e) => {
    updraft = parseFloat(e.target.value);
    document.getElementById('updraft-val').textContent = updraft;
    render();
  });
  
  document.getElementById('lwc').addEventListener('input', (e) => {
    lwc = parseFloat(e.target.value);
    document.getElementById('lwc-val').textContent = lwc;
    render();
  });
  
  document.getElementById('residence').addEventListener('input', (e) => {
    residence = parseFloat(e.target.value);
    document.getElementById('res-val').textContent = residence;
    render();
  });
  
  render();
  
  window.addEventListener('resize', () => chart.resize());
})();
</script>

**Observations:**
- Hail growth accelerates (larger stones collect more droplets)
- Updraft strength limits maximum size
- High liquid water content accelerates growth
- Longer residence time produces larger hail
- Terminal velocity increases with square root of diameter
- Severe threshold (25mm) reached in strong updrafts

**Key insights:**
- Extreme updrafts (>60 m/s) required for softball hail
- Growth rate nonlinear (larger stones grow faster)
- Minutes in updraft sufficient for destructive hail
- Terminal velocity determines suspension requirement

---

## 6. Interpretation

### Crop Damage Assessment

**Hail impact on agriculture:**

**Pea-sized (6-13 mm):**
- Leaf damage, some defoliation
- 10-30% yield loss

**Dime-quarter (13-25 mm):**
- Stem breakage, severe defoliation
- 30-60% loss

**Golf ball+ (>44 mm):**
- Total crop destruction
- 80-100% loss

**Economic:**

2017 Colorado hailstorm: $2.2 billion crop damage (corn, wheat)

**Insurance:**

Crop insurance covers hail explicitly (common peril).

Payouts based on damage assessment (percentage loss).

### Hail Suppression

**Cloud seeding:**

Inject silver iodide or other nuclei.

**Theory:** Increase ice particles → compete for water → smaller hail

**Evidence:** Mixed/inconclusive

Alberta Hail Project (1956-1985): 15-20% reduction claimed

Recent studies: No significant effect detected

**Operational:** Some programs continue (insurance-funded)

### Vehicle/Property Damage

**Hail damage costs (USA):**

$1-2 billion annually

**Golf ball hail:**
- Car windshields: $300-800 replacement
- Body damage: $1,000-5,000 repair
- Total vehicle loss: Possible with repeated impacts

**Roof damage:**
- Asphalt shingles: Severe damage >44 mm
- Metal roofs: Denting >25 mm
- Solar panels: Crack/break risk

**Building codes:**

Some regions require hail-resistant roofing (impact-rated).

---

## 7. What Could Go Wrong?

### Giant Hail Not Detected

**Radar MESH underestimates** largest stones.

**Reasons:**
- Hail concentration in small area
- Beam averaging
- Attenuation

**Example - 2010 Vivian SD:**

8-inch hailstone (record), but radar MESH ~75 mm (3 inches)

**4× underestimate!**

**Solution:** Spotter reports, damage surveys verify

### Wet Hail Misidentified

**Wet growth hail** (clear ice) has higher density.

**Radar reflectivity similar** to smaller dry hail.

**Can be more damaging** (heavier, denser) than radar suggests.

### Hail-Rain Confusion

**Large raindrops** can produce moderate reflectivity.

**Without dual-pol:** Hard to distinguish

**Dual-polarization:** ZDR, ρHV differentiate

**ZDR:**
- Rain: +2 to +4 dB (oblate drops)
- Hail: 0 to -2 dB (tumbling, irregular)

**ρHV:**
- Rain: >0.98
- Hail: 0.90-0.95 (mixed shapes)

### Hail Melting

**Long fall distance** (high cloud tops) → melting

**Surface reports:** Rain, but hail aloft

**Melting level critical:**

Low (2-3 km): Hail reaches surface  
High (4+ km): Melts before impact

**Wet-bulb zero height** better predictor than simple 0°C level

---

## 8. Extension: Hail Climatology

**Geographic distribution:**

**Hail Alley (USA):** Wyoming, Colorado, Nebraska

**Argentina Pampas:** World's highest hail frequency

**Northern India:** Large hail events

**Factors:**
- High terrain (orographic lift)
- Strong CAPE
- Dry air aloft (promotes supercells)

**Seasonal:**

Spring-early summer peak (transitional seasons, strong shear + instability)

**Trends:**

Some evidence of:
- Fewer hail days
- But more extreme events (larger stones)
- Difficult to detect trends (sparse observations)

**Satellite potential:**

GOES-16 Overshooting Top detection correlates with large hail

---

## 9. Math Refresher: Drag Force

### Stokes vs Newton Drag

**Stokes (laminar, small Re):**

$$F_d = 6 \pi \mu r v$$

**Newton (turbulent, large Re):**

$$F_d = \frac{1}{2} \rho C_d A v^2$$

**Reynolds number:**

$$Re = \frac{\rho v D}{\mu}$$

**Hail:** Re ~ 10⁴-10⁵ → Newton drag applies

**Sphere drag coefficient:**

$C_d \approx 0.4-0.6$ (depends on surface roughness)

---

## Summary

- Hail growth requires strong updrafts exceeding terminal velocity of growing stones
- Maximum hail size scales with updraft velocity squared via r_max = w²/800 formula
- Terminal velocity increases as square root of radius for ice spheres
- Wet growth produces clear dense ice while dry growth creates opaque spongy hail
- MESH radar product estimates hail size from integrated reflectivity
- Severe hail threshold 25mm (1 inch) causes significant crop and property damage
- Golf ball hail (44mm) breaks windshields requiring 35+ m/s updrafts
- Record 8-inch hail required extreme updrafts exceeding 70 m/s
- Dual-polarization radar improves hail detection via ZDR and correlation coefficient
- Annual agricultural and property losses exceed $1-2 billion in USA alone

**Cluster W: Severe Weather - Complete (4 essays)**

Moving to next cluster...

---
