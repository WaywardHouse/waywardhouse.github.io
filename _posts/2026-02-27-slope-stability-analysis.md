---
layout: essay
title: "Slope Stability Analysis"
subtitle: "When will this hillslope fail? Forces, failure planes, and landslide prediction"
date: 2026-02-27
categories: [modeling]
series: computational-geography-cryosphere
series_order: 8
cluster: R
cluster_title: "Mountain Hazards"
tags:
  - computational-geography
  - modeling
  - hazards
  - slope-stability
  - landslides
  - geotechnical
  - risk-assessment
math: true
viz: true
difficulty: 4
math_core: [force-balance, mohr-coulomb, factor-of-safety, limit-equilibrium]
spatial_reasoning: 4
dynamics: 2
computation: 3
domain: [geotechnical-engineering, hazards, terrain-analysis, civil-engineering]
excerpt: >
  Which slopes are stable, and which will fail? Slope stability analysis balances
  driving forces (gravity) against resisting forces (friction, cohesion). This essay
  derives the infinite slope model, implements factor of safety calculations, shows
  how water pressure and earthquakes reduce stability, and maps landslide susceptibility.
math_prerequisites: >
  Slope calculation (Essays 7-8). Basic physics (forces, moments). Trigonometry.
  We'll introduce geotechnical mechanics and failure criteria from scratch.
---

## 1. The Question

After heavy rain, which hillslopes will fail as landslides?

**Slope stability** determines whether soil/rock remains in place or slides downslope.

**Driving forces:**
- Gravity (weight component parallel to slope)
- Water pressure (reduces effective stress)
- Earthquakes (dynamic loading)
- External loads (buildings, traffic)

**Resisting forces:**
- Friction (depends on normal stress)
- Cohesion (soil/rock strength)
- Vegetation (root reinforcement)

**Critical question:** Does resistance exceed driving force?

**Applications:**
- Landslide hazard mapping
- Cut/fill slope design (roads, buildings)
- Dam stability
- Mine pit walls
- Post-earthquake assessment

---

## 2. The Conceptual Model

### Landslide Types

**By material:**
- **Rock slide:** Bedrock failure
- **Debris slide:** Soil + rock fragments
- **Earth slide:** Predominantly soil

**By mechanism:**
- **Rotational:** Curved failure surface
- **Translational:** Planar failure surface
- **Complex:** Multiple failure modes

**By movement:**
- **Slide:** Mass moves as coherent unit
- **Flow:** Fluid-like behavior
- **Fall:** Free-fall from cliff
- **Topple:** Forward rotation

### Mohr-Coulomb Failure Criterion

**Shear strength:**

$$\tau_f = c + \sigma' \tan\phi$$

Where:
- $\tau_f$ = shear strength (kPa)
- $c$ = cohesion (kPa)
- $\sigma'$ = effective normal stress (kPa)
- $\phi$ = friction angle (degrees)

**Effective stress:**

$$\sigma' = \sigma - u$$

Where:
- $\sigma$ = total stress
- $u$ = pore water pressure

**Key insight:** Water reduces effective stress → reduces shear strength!

### Factor of Safety

$$FS = \frac{\text{Resisting Forces}}{\text{Driving Forces}} = \frac{\tau_f}{\tau}$$

**Interpretation:**
- $FS > 1.5$: Stable (safe)
- $FS = 1.0-1.5$: Marginal (monitor)
- $FS < 1.0$: **Failure** (landslide occurs)

**Design criterion:** Typically require $FS > 1.5$ for permanent slopes.

---

## 3. Building the Mathematical Model

### Infinite Slope Model

**Assumptions:**
- Uniform slope angle $\theta$
- Failure parallel to surface
- Infinite extent (no edge effects)

**Forces on soil element:**

**Weight:** $W = \gamma z b L$

Where:
- $\gamma$ = unit weight of soil (kN/m³)
- $z$ = depth to failure plane (m)
- $b$ = width (m)
- $L$ = length along slope (m)

**Weight components:**

**Parallel to slope (driving):**

$$W_\parallel = W \sin\theta = \gamma z b L \sin\theta$$

**Perpendicular (normal):**

$$W_\perp = W \cos\theta = \gamma z b L \cos\theta$$

**Normal stress:**

$$\sigma = \frac{W_\perp}{b L / \cos\theta} = \gamma z \cos^2\theta$$

**Shear stress (driving):**

$$\tau = \frac{W_\parallel}{b L / \cos\theta} = \gamma z \sin\theta \cos\theta$$

**Shear strength (resisting):**

$$\tau_f = c + \sigma' \tan\phi = c + \gamma z \cos^2\theta \tan\phi$$

(Assuming dry slope: $\sigma' = \sigma$)

**Factor of Safety:**

$$FS = \frac{\tau_f}{\tau} = \frac{c + \gamma z \cos^2\theta \tan\phi}{\gamma z \sin\theta \cos\theta}$$

**Simplified:**

$$FS = \frac{c}{\gamma z \sin\theta \cos\theta} + \frac{\tan\phi}{\tan\theta}$$

**For cohesionless soil ($c = 0$):**

$$FS = \frac{\tan\phi}{\tan\theta}$$

**Critical slope angle:** $\theta_{\text{crit}} = \phi$ (where $FS = 1$)

### Effect of Water

**Saturated slope with seepage parallel to surface:**

**Pore pressure:** $u = \gamma_w z_w \cos^2\theta$

Where:
- $\gamma_w$ = unit weight of water (9.81 kN/m³)
- $z_w$ = depth to water table

**Effective stress:**

$$\sigma' = \gamma z \cos^2\theta - \gamma_w z_w \cos^2\theta$$

**If fully saturated ($z_w = z$):**

$$\sigma' = (\gamma - \gamma_w) z \cos^2\theta = \gamma' z \cos^2\theta$$

Where $\gamma' = \gamma - \gamma_w$ = buoyant unit weight

**Factor of Safety (saturated):**

$$FS = \frac{c}{\gamma z \sin\theta \cos\theta} + \frac{\gamma'}{\gamma} \frac{\tan\phi}{\tan\theta}$$

**Key result:** $\gamma'/\gamma \approx 0.5$ for typical soils → **FS reduced by ~50%** when saturated!

### Seismic Loading

**Earthquake adds horizontal force:**

**Pseudo-static approach:**

$$F_h = k_h W$$

Where $k_h$ = horizontal seismic coefficient (~0.1-0.3 for strong shaking)

**Modified driving stress:**

$$\tau_{\text{seismic}} = \gamma z (\sin\theta + k_h \cos\theta) \cos\theta$$

**Factor of Safety:**

$$FS_{\text{seismic}} = \frac{c + \gamma z \cos^2\theta \tan\phi}{\gamma z (\sin\theta + k_h \cos\theta) \cos\theta}$$

**Earthquake reduces FS** by increasing driving force.

---

## 4. Worked Example by Hand

**Problem:** Calculate factor of safety for hillslope.

**Slope conditions:**
- Angle: $\theta = 30°$
- Soil depth to bedrock: $z = 3$ m
- Unit weight: $\gamma = 18$ kN/m³
- Cohesion: $c = 5$ kPa
- Friction angle: $\phi = 35°$

**Calculate FS for:**
1. Dry slope
2. Fully saturated slope
3. Saturated slope with earthquake ($k_h = 0.15$)

### Solution

**Case 1: Dry slope**

$$\tau = \gamma z \sin\theta \cos\theta = 18 \times 3 \times \sin(30°) \times \cos(30°)$$

$$= 18 \times 3 \times 0.5 \times 0.866 = 23.4 \text{ kPa}$$

$$\sigma = \gamma z \cos^2\theta = 18 \times 3 \times (0.866)^2 = 40.5 \text{ kPa}$$

$$\tau_f = c + \sigma \tan\phi = 5 + 40.5 \times \tan(35°) = 5 + 40.5 \times 0.700 = 33.4 \text{ kPa}$$

$$FS = \frac{33.4}{23.4} = 1.43$$

**Marginal stability** (just below typical design criterion of 1.5)

**Case 2: Saturated slope**

Buoyant unit weight: $\gamma' = 18 - 9.81 = 8.19$ kN/m³

$$\sigma' = \gamma' z \cos^2\theta = 8.19 \times 3 \times 0.75 = 18.4 \text{ kPa}$$

$$\tau_f = 5 + 18.4 \times 0.700 = 17.9 \text{ kPa}$$

$$FS = \frac{17.9}{23.4} = 0.76$$

**FAILURE!** (FS < 1.0)

**Case 3: Saturated + earthquake**

$$\tau_{\text{eq}} = \gamma z (\sin\theta + k_h\cos\theta) \cos\theta$$

$$= 18 \times 3 \times (0.5 + 0.15 \times 0.866) \times 0.866$$

$$= 18 \times 3 \times (0.5 + 0.130) \times 0.866 = 29.4 \text{ kPa}$$

$$FS = \frac{17.9}{29.4} = 0.61$$

**Catastrophic failure** (FS well below 1.0)

**Summary:**
- Dry: FS = 1.43 (marginal)
- Saturated: FS = 0.76 (fails)
- Saturated + earthquake: FS = 0.61 (catastrophic)

**This explains why landslides often occur during/after heavy rain or earthquakes!**

---

## 5. Computational Implementation

Below is an interactive slope stability calculator.

<div class="viz-container" id="stability-viz">
  <div class="controls">
    <label>
      Slope angle (°):
      <input type="range" id="slope-angle" min="10" max="50" step="1" value="30">
      <span id="angle-val">30</span>°
    </label>
    <label>
      Friction angle φ (°):
      <input type="range" id="friction-angle" min="20" max="45" step="1" value="35">
      <span id="friction-val">35</span>°
    </label>
    <label>
      Cohesion (kPa):
      <input type="range" id="cohesion" min="0" max="20" step="1" value="5">
      <span id="cohesion-val">5</span>
    </label>
    <label>
      Water table depth (m):
      <input type="range" id="water-depth" min="0" max="3" step="0.5" value="3">
      <span id="water-val">3.0</span> (3m = dry)
    </label>
    <label>
      Seismic coefficient:
      <input type="range" id="seismic" min="0" max="0.3" step="0.05" value="0">
      <span id="seismic-val">0.00</span>
    </label>
    <div class="stability-info">
      <p><strong>Factor of Safety:</strong> <span id="fs-value">--</span></p>
      <p><strong>Status:</strong> <span id="stability-status">--</span></p>
      <p><strong>Driving stress:</strong> <span id="tau-drive">--</span> kPa</p>
      <p><strong>Resisting stress:</strong> <span id="tau-resist">--</span> kPa</p>
    </div>
  </div>
  <div id="stability-canvas-container">
    <canvas id="stability-canvas" width="700" height="400" style="border: 1px solid #ddd;"></canvas>
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
  const chart = echarts.init(document.getElementById('stability-canvas'));
  
  let slopeAngle = 30;
  let frictionAngle = 35;
  let cohesion = 5;
  let waterDepth = 3;
  let seismicCoef = 0;
  
  const z = 3; // depth to failure (m)
  const gamma = 18; // unit weight (kN/m³)
  const gammaW = 9.81; // water unit weight
  
  function calculateStability() {
    const thetaRad = slopeAngle * Math.PI / 180;
    const phiRad = frictionAngle * Math.PI / 180;
    
    const sinTheta = Math.sin(thetaRad);
    const cosTheta = Math.cos(thetaRad);
    const tanPhi = Math.tan(phiRad);
    
    // Effective stress
    let gammaPrime = gamma;
    if (waterDepth < z) {
      // Partially saturated
      const satFraction = (z - waterDepth) / z;
      gammaPrime = gamma - satFraction * gammaW;
    }
    
    const sigma = gammaPrime * z * cosTheta * cosTheta;
    
    // Driving stress
    const tauDrive = gamma * z * (sinTheta + seismicCoef * cosTheta) * cosTheta;
    
    // Resisting stress
    const tauResist = cohesion + sigma * tanPhi;
    
    // Factor of Safety
    const FS = tauResist / tauDrive;
    
    let status;
    if (FS > 1.5) status = 'Stable';
    else if (FS > 1.2) status = 'Marginally Stable';
    else if (FS > 1.0) status = 'Critical';
    else status = 'FAILURE';
    
    return {FS, status, tauDrive, tauResist, sigma};
  }
  
  function generateFSvsAngle() {
    const data = [];
    
    for (let angle = 10; angle <= 50; angle += 1) {
      slopeAngle = angle;
      const result = calculateStability();
      data.push([angle, result.FS]);
    }
    
    slopeAngle = parseFloat(document.getElementById('slope-angle').value);
    return data;
  }
  
  function render() {
    const result = calculateStability();
    
    document.getElementById('fs-value').textContent = result.FS.toFixed(2);
    document.getElementById('stability-status').textContent = result.status;
    document.getElementById('tau-drive').textContent = result.tauDrive.toFixed(1);
    document.getElementById('tau-resist').textContent = result.tauResist.toFixed(1);
    
    const statusEl = document.getElementById('stability-status');
    if (result.status === 'Stable') statusEl.style.color = '#2E7D32';
    else if (result.status.includes('Marginal')) statusEl.style.color = '#F57F17';
    else if (result.status === 'Critical') statusEl.style.color = '#E64A19';
    else statusEl.style.color = '#B71C1C';
    
    const fsData = generateFSvsAngle();
    
    const series = [
      {
        name: 'Factor of Safety',
        type: 'line',
        data: fsData,
        lineStyle: {color: '#1976D2', width: 3},
        areaStyle: {
          color: {
            type: 'linear',
            x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [
              {offset: 0, color: 'rgba(76, 175, 80, 0.3)'},
              {offset: 0.5, color: 'rgba(255, 193, 7, 0.3)'},
              {offset: 1, color: 'rgba(244, 67, 54, 0.3)'}
            ]
          }
        }
      },
      {
        name: 'FS = 1.0 (Failure)',
        type: 'line',
        data: [[10, 1.0], [50, 1.0]],
        lineStyle: {color: '#D32F2F', width: 2, type: 'dashed'},
        markLine: {
          silent: true,
          lineStyle: {color: '#D32F2F', width: 2, type: 'dashed'},
          data: [{yAxis: 1.0}],
          label: {formatter: 'Failure threshold', position: 'insideEndTop'}
        }
      },
      {
        name: 'FS = 1.5 (Design)',
        type: 'line',
        data: [[10, 1.5], [50, 1.5]],
        lineStyle: {color: '#FF9800', width: 2, type: 'dotted'},
        markLine: {
          silent: true,
          lineStyle: {color: '#FF9800', width: 2, type: 'dotted'},
          data: [{yAxis: 1.5}],
          label: {formatter: 'Design criterion', position: 'insideEndTop'}
        }
      },
      {
        name: 'Current Slope',
        type: 'scatter',
        data: [[slopeAngle, result.FS]],
        symbolSize: 15,
        itemStyle: {color: '#E91E63'},
        label: {
          show: true,
          formatter: `${slopeAngle}°`,
          position: 'top',
          color: '#E91E63',
          fontWeight: 'bold'
        }
      }
    ];
    
    const option = {
      title: {
        text: 'Factor of Safety vs Slope Angle',
        left: 'center'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {type: 'cross'}
      },
      legend: {
        data: ['Factor of Safety', 'FS = 1.0 (Failure)', 'FS = 1.5 (Design)', 'Current Slope'],
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
        name: 'Slope Angle (degrees)',
        nameLocation: 'middle',
        nameGap: 30,
        min: 10,
        max: 50
      },
      yAxis: {
        type: 'value',
        name: 'Factor of Safety',
        nameLocation: 'middle',
        nameGap: 50,
        min: 0,
        max: 3
      },
      series: series
    };
    
    chart.setOption(option, true);
  }
  
  document.getElementById('slope-angle').addEventListener('input', (e) => {
    slopeAngle = parseFloat(e.target.value);
    document.getElementById('angle-val').textContent = slopeAngle;
    render();
  });
  
  document.getElementById('friction-angle').addEventListener('input', (e) => {
    frictionAngle = parseFloat(e.target.value);
    document.getElementById('friction-val').textContent = frictionAngle;
    render();
  });
  
  document.getElementById('cohesion').addEventListener('input', (e) => {
    cohesion = parseFloat(e.target.value);
    document.getElementById('cohesion-val').textContent = cohesion;
    render();
  });
  
  document.getElementById('water-depth').addEventListener('input', (e) => {
    waterDepth = parseFloat(e.target.value);
    document.getElementById('water-val').textContent = waterDepth.toFixed(1);
    render();
  });
  
  document.getElementById('seismic').addEventListener('input', (e) => {
    seismicCoef = parseFloat(e.target.value);
    document.getElementById('seismic-val').textContent = seismicCoef.toFixed(2);
    render();
  });
  
  render();
  
  window.addEventListener('resize', () => chart.resize());
})();
</script>

**Try this:**
- **Increase slope angle:** FS drops (steeper = less stable)
- **Lower water table (0m = saturated):** FS drops dramatically!
- **Add seismic loading:** FS drops further
- **Increase friction angle:** Higher FS (stronger soil)
- **Add cohesion:** Raises FS curve (especially at steep angles)
- **Green area:** Stable (FS > 1.5)
- **Yellow area:** Marginal (FS 1.0-1.5)
- **Red area:** Failure (FS < 1.0)
- **Pink dot:** Current slope condition
- Watch FS cross failure threshold!

**Key insight:** Water + earthquakes = catastrophic combination for slope stability!

---

## 6. Interpretation

### Rainfall-Induced Landslides

**Mechanism:**
1. Rain infiltrates soil
2. Water table rises
3. Pore pressure increases
4. Effective stress decreases
5. Shear strength drops
6. **Failure** when FS < 1.0

**Threshold rainfall:**
- Short duration, high intensity: Shallow slides
- Long duration, moderate intensity: Deep-seated slides

**Example - Pacific Northwest:**
- Threshold: ~200mm in 3 days
- Thousands of landslides triggered

### Earthquake-Induced Landslides

**Case study - 2015 Nepal:**
- Magnitude 7.8 earthquake
- 25,000+ landslides triggered
- Some on slopes previously stable (FS > 1.5 dry)
- Liquefaction in saturated soils

**Newmark displacement:**
- Permanent downslope movement during shaking
- Depends on: Peak acceleration, critical acceleration, duration

### Cut Slope Design

**Road construction:**

**Typical criterion:** FS > 1.5 for permanent cuts

**Design strategies:**
- Flatten slope (reduce $\theta$)
- Improve drainage (keep dry)
- Soil nails/anchors (add resistance)
- Retaining walls

**Cost trade-off:**
- Steeper → less excavation → cheaper
- BUT steeper → lower FS → higher failure risk

---

## 7. What Could Go Wrong?

### Assuming Homogeneous Soil

**Reality:** Soil has layers with different properties.

**Weak layer** controls failure (lowest strength).

**Example:**
- Strong surface soil (c=10 kPa, φ=40°)
- Weak clay layer at depth (c=2 kPa, φ=25°)
- **Failure occurs along clay**

**Solution:** Multilayer analysis, find critical surface.

### Ignoring Time-Dependent Strength

**Creep:** Slow downslope movement

**Residual strength:** After movement starts, strength drops to residual value (< peak).

**Progressive failure:** Small movements → strength reduction → more movement

**Solution:** Use residual strength for long-term stability.

### 2D vs 3D Effects

**Infinite slope = 2D** (no edge effects)

**Real slopes:** 3D geometry matters
- Converging topography (gullies) → less stable
- Diverging topography (ridges) → more stable

**Solution:** 3D limit equilibrium or FEM analysis.

### Vegetation Effects

**Roots:** Add tensile strength (resistance)

**But:** Trees add weight (driving force) + wind loading

**Net effect:** Usually stabilizing for shallow slides, destabilizing for deep slides

**Deforestation:** Increases landslide risk (roots decay in 2-5 years)

---

## 8. Extension: Landslide Susceptibility Mapping

**Combine factors spatially:**

**From DEM:**
- Slope angle
- Aspect (wetness)
- Curvature (convergent topography)
- Upslope contributing area (water accumulation)

**From soils:**
- Soil type (strength parameters)
- Depth to bedrock

**From land cover:**
- Vegetation (root strength)
- Land use

**Statistical model (logistic regression):**

$$P(\text{landslide}) = \frac{1}{1 + e^{-(\beta_0 + \beta_1 \theta + \beta_2 c + \cdots)}}$$

**Or physically-based (SHALSTAB, SINMAP):**

Apply infinite slope model to every pixel, calculate FS.

**Output:** Landslide susceptibility map (high/medium/low)

---

## 9. Math Refresher: Free Body Diagrams

### Force Resolution

**Vector components:**

Force $F$ at angle $\alpha$:

$$F_x = F \cos\alpha$$
$$F_y = F \sin\alpha$$

### Equilibrium Conditions

**Translational equilibrium:**

$$\sum F_x = 0$$
$$\sum F_y = 0$$

**Rotational equilibrium:**

$$\sum M = 0$$

(Sum of moments about any point)

### Slope Forces

**Weight $W$ on slope angle $\theta$:**

**Parallel to slope:**

$$W_\parallel = W \sin\theta$$

**Normal to slope:**

$$W_\perp = W \cos\theta$$

**These satisfy:** $W_\parallel^2 + W_\perp^2 = W^2$

---

## Summary

- **Slope stability:** Balance of driving forces (gravity) vs resisting forces (friction + cohesion)
- **Mohr-Coulomb criterion:** $\tau_f = c + \sigma' \tan\phi$ (shear strength)
- **Factor of Safety:** FS = resisting/driving, failure when FS < 1.0
- **Infinite slope model:** Simplified analysis for uniform slopes
- **Water effect:** Reduces effective stress by ~50%, can drop FS from 1.5 to 0.75
- **Earthquake effect:** Adds horizontal force, further reduces FS
- **Critical slope angle:** $\theta_{crit} = \phi$ for cohesionless soils
- **Applications:** Landslide hazard, road cuts, dam stability, earthquake response
- **Challenges:** Heterogeneous soils, 3D geometry, time-dependent strength
- **Susceptibility mapping:** Combine DEM + soils + vegetation for spatial risk
- Foundation for understanding when and where landslides occur
