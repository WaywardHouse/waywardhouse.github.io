---
layout: essay
title: "Wind Profiles and Atmospheric Turbulence"
subtitle: "The logarithmic law and how roughness controls momentum transfer"
date: 2026-02-26
categories: [modeling]
series: computational-geography-environmental
series_order: 11
cluster: I
cluster_title: "Atmospheric Interactions"
tags:
  - computational-geography
  - modeling
  - meteorology
  - wind-profile
  - turbulence
  - surface-roughness
  - boundary-layer
math: true
viz: true
difficulty: 3
math_core: [logarithmic-profile, boundary-layer, shear-stress, turbulent-transport]
spatial_reasoning: 2
dynamics: 2
computation: 2
domain: [meteorology, atmospheric-science, micrometeorology]
excerpt: >
  Wind speed increases with height above the ground. Near the surface, turbulent
  eddies mix momentum downward, creating a logarithmic wind profile. Surface
  roughness controls the shape—forests slow wind more than grassland. This essay
  derives the log law and introduces roughness length and friction velocity.
math_prerequisites: >
  Logarithms (Essay 3). Basic calculus. We'll introduce the logarithmic function
  from first principles and show how it emerges from turbulent momentum transfer.
---

## 1. The Question

Why does wind speed increase with height, and why does the rate of increase depend on the surface?

Measure wind speed at multiple heights:
- **At ground level:** Nearly calm (friction with surface)
- **At 2 m:** Light breeze
- **At 10 m:** Moderate wind
- **At 100 m:** Strong wind

The shape of this **wind profile** depends on the surface:
- **Ocean:** Smooth → wind increases rapidly with height
- **Grassland:** Moderate roughness → intermediate profile
- **Forest:** Rough → wind increases slowly with height

The mathematical question: What is the equation for wind speed as a function of height, and how does surface roughness enter the model?

---

## 2. The Conceptual Model

### The Atmospheric Boundary Layer

The **atmospheric boundary layer** (ABL) is the lowest ~1 km of atmosphere where surface friction matters.

**Three sublayers:**

1. **Surface layer** (0–50 m):  
   - Wind profile dominated by surface friction
   - Logarithmic profile
   - Our focus

2. **Ekman layer** (50 m–1 km):  
   - Coriolis force matters
   - Wind turns with height
   - Beyond our scope

3. **Free atmosphere** (> 1 km):  
   - Friction negligible
   - Geostrophic balance

### Turbulent Momentum Transfer

Wind creates **turbulent eddies** that mix momentum downward.

**Shear stress** (momentum flux):

$$\tau = -\rho \overline{u'w'}$$

Where:
- $\tau$ = shear stress (N/m² or Pa)
- $\rho$ = air density (kg/m³)
- $\overline{u'w'}$ = covariance of horizontal and vertical wind fluctuations
- Overbar = time average, prime = fluctuation from mean

Near the surface, shear stress is approximately constant with height (constant stress layer).

**Friction velocity** ($u_*$):

$$u_* = \sqrt{\frac{\tau}{\rho}}$$

This is a velocity scale (m/s) characterizing turbulence intensity, **not the actual wind speed**.

### The Logarithmic Law

In the surface layer, wind speed increases logarithmically with height:

$$u(z) = \frac{u_*}{k} \ln\left(\frac{z}{z_0}\right)$$

Where:
- $u(z)$ = wind speed at height $z$ (m/s)
- $u_*$ = friction velocity (m/s)
- $k = 0.41$ = von Kármán constant (dimensionless)
- $z_0$ = **roughness length** (m)

**Roughness length** ($z_0$) is where the logarithmic profile extrapolates to zero wind speed.

---

## 3. Building the Mathematical Model

### Derivation from Mixing Length Theory

**Prandtl's mixing length hypothesis:**

Turbulent eddies have a characteristic size $\ell$ (mixing length). They transport momentum proportional to:

$$\tau \propto \rho \ell^2 \left(\frac{du}{dz}\right)^2$$

Near the surface, mixing length is proportional to height:

$$\ell = kz$$

Where $k$ is the von Kármán constant.

**Combine:**

$$\tau = \rho (kz)^2 \left(\frac{du}{dz}\right)^2$$

In the constant stress layer, $\tau$ is constant. Define $u_*^2 = \tau/\rho$:

$$u_*^2 = (kz)^2 \left(\frac{du}{dz}\right)^2$$

$$\frac{du}{dz} = \frac{u_*}{kz}$$

**Integrate:**

$$u(z) = \frac{u_*}{k} \ln(z) + C$$

**Boundary condition:** At $z = z_0$, $u = 0$ (roughness length is where wind extrapolates to zero).

$$0 = \frac{u_*}{k} \ln(z_0) + C \implies C = -\frac{u_*}{k}\ln(z_0)$$

**Final form:**

$$u(z) = \frac{u_*}{k} \left[\ln(z) - \ln(z_0)\right] = \frac{u_*}{k} \ln\left(\frac{z}{z_0}\right)$$

This is the **logarithmic wind profile** or **log law**.

### Roughness Length

**Physical meaning:** Height where the logarithmic profile extrapolates to zero wind.

**Typical values:**

| Surface Type | $z_0$ (m) |
|--------------|-----------|
| Open ocean, ice | 0.0001–0.001 |
| Snow surface | 0.001–0.005 |
| Bare soil, sand | 0.001–0.01 |
| Short grass | 0.01–0.05 |
| Crops | 0.05–0.15 |
| Shrubland | 0.1–0.3 |
| Deciduous forest | 0.5–2.0 |
| Conifer forest | 1.0–3.0 |
| Urban areas | 0.5–2.0 |

**Rule of thumb:** $z_0 \approx 0.1 h$, where $h$ is vegetation height.

### Calculating Friction Velocity

If wind speed is known at two heights, solve for $u_*$:

$$u_2 - u_1 = \frac{u_*}{k} \ln\left(\frac{z_2}{z_1}\right)$$

$$u_* = \frac{k(u_2 - u_1)}{\ln(z_2/z_1)}$$

**Example:** $u(2\text{ m}) = 3$ m/s, $u(10\text{ m}) = 5$ m/s:

$$u_* = \frac{0.41 \times (5 - 3)}{\ln(10/2)} = \frac{0.82}{1.61} = 0.51 \text{ m/s}$$

### Zero-Plane Displacement

For **tall, dense vegetation** (forests, crops), wind appears to originate from a height $d$ above the ground (zero-plane displacement).

**Modified log law:**

$$u(z) = \frac{u_*}{k} \ln\left(\frac{z - d}{z_0}\right)$$

**Typical values:**
- $d \approx 0.7h$ (where $h$ is canopy height)
- $z_0 \approx 0.1h$

**Example:** 20 m forest:
- $d = 14$ m
- $z_0 = 2$ m

---

## 4. Worked Example by Hand

**Problem:** A grassland has roughness length $z_0 = 0.03$ m. Wind speed at 10 m height is 8 m/s.

(a) Calculate friction velocity $u_*$.  
(b) Predict wind speed at 2 m height.  
(c) At what height is wind speed 12 m/s?

### Solution

**(a) Friction velocity**

From log law:

$$u(10) = \frac{u_*}{k} \ln\left(\frac{10}{z_0}\right)$$

$$8 = \frac{u_*}{0.41} \ln\left(\frac{10}{0.03}\right)$$

$$8 = \frac{u_*}{0.41} \ln(333.3)$$

$$8 = \frac{u_*}{0.41} \times 5.81$$

$$u_* = \frac{8 \times 0.41}{5.81} = 0.565 \text{ m/s}$$

**(b) Wind speed at 2 m**

$$u(2) = \frac{0.565}{0.41} \ln\left(\frac{2}{0.03}\right)$$

$$= 1.378 \times \ln(66.7)$$

$$= 1.378 \times 4.20 = 5.79 \text{ m/s}$$

**(c) Height for 12 m/s**

$$12 = \frac{0.565}{0.41} \ln\left(\frac{z}{0.03}\right)$$

$$12 = 1.378 \ln\left(\frac{z}{0.03}\right)$$

$$\ln\left(\frac{z}{0.03}\right) = \frac{12}{1.378} = 8.71$$

$$\frac{z}{0.03} = e^{8.71} = 6063$$

$$z = 0.03 \times 6063 = 182 \text{ m}$$

**Wind speed reaches 12 m/s at 182 m height.**

---

## 5. Computational Implementation

Below is an interactive wind profile simulator.

<div class="viz-container" id="wind-profile-viz">
  <div class="controls">
    <label>
      Surface type:
      <select id="surface-type-wind">
        <option value="ocean">Open Ocean (z₀=0.0002 m)</option>
        <option value="snow">Snow (z₀=0.003 m)</option>
        <option value="grass" selected>Grassland (z₀=0.03 m)</option>
        <option value="crops">Crops (z₀=0.10 m)</option>
        <option value="forest">Forest (z₀=1.5 m)</option>
      </select>
    </label>
    <label>
      Wind speed at 10 m (m/s):
      <input type="range" id="wind-ref-slider" min="2" max="20" step="1" value="8">
      <span id="wind-ref-value">8</span> m/s
    </label>
    <label>
      Custom roughness length (m):
      <input type="range" id="z0-slider" min="-4" max="0.5" step="0.1" value="-1.52">
      <span id="z0-value">0.03</span> m
    </label>
    <div class="button-group">
      <button id="toggle-log-scale">Toggle Log Scale</button>
    </div>
  </div>
  <div class="wind-results">
    <p><strong>Friction velocity (u*):</strong> <span id="ustar-display"></span> m/s</p>
    <p><strong>Wind at 2 m:</strong> <span id="wind-2m"></span> m/s</p>
    <p><strong>Wind at 50 m:</strong> <span id="wind-50m"></span> m/s</p>
    <p><strong>10m/2m ratio:</strong> <span id="wind-ratio"></span></p>
  </div>
  <div id="wind-profile-chart" style="width: 100%; height: 500px;"></div>
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
  const chart = echarts.init(document.getElementById('wind-profile-chart'));
  
  const surfaces = {
    ocean: { z0: 0.0002, name: 'Open Ocean' },
    snow: { z0: 0.003, name: 'Snow' },
    grass: { z0: 0.03, name: 'Grassland' },
    crops: { z0: 0.10, name: 'Crops' },
    forest: { z0: 1.5, name: 'Forest' }
  };
  
  let surfaceType = 'grass';
  let u10 = 8;
  let z0 = 0.03;
  let logScale = false;
  
  const k = 0.41; // von Karman constant
  
  function windSpeed(z, ustar, z0) {
    if (z <= z0) return 0;
    return (ustar / k) * Math.log(z / z0);
  }
  
  function frictionVelocity(u_ref, z_ref, z0) {
    return (k * u_ref) / Math.log(z_ref / z0);
  }
  
  function updateCalculation() {
    const ustar = frictionVelocity(u10, 10, z0);
    const u2m = windSpeed(2, ustar, z0);
    const u50m = windSpeed(50, ustar, z0);
    const ratio = u10 / u2m;
    
    document.getElementById('ustar-display').textContent = ustar.toFixed(2);
    document.getElementById('wind-2m').textContent = u2m.toFixed(1);
    document.getElementById('wind-50m').textContent = u50m.toFixed(1);
    document.getElementById('wind-ratio').textContent = ratio.toFixed(2);
    
    updateChart(ustar);
  }
  
  function updateChart(ustar) {
    // Generate wind profile
    const heights = [];
    const winds = [];
    
    const minHeight = Math.max(z0 * 1.1, 0.1);
    const maxHeight = 100;
    const nPoints = 100;
    
    for (let i = 0; i < nPoints; i++) {
      const z = minHeight * Math.pow(maxHeight / minHeight, i / (nPoints - 1));
      heights.push(z);
      winds.push(windSpeed(z, ustar, z0));
    }
    
    const option = {
      title: {
        text: 'Wind Profile (Logarithmic Law)',
        left: 'center'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'cross' },
        formatter: (params) => {
          const z = params[0].value[1];
          const u = params[0].value[0];
          return `Height: ${z.toFixed(1)} m<br/>Wind: ${u.toFixed(2)} m/s`;
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
        name: 'Wind Speed (m/s)',
        nameLocation: 'middle',
        nameGap: 30,
        min: 0
      },
      yAxis: {
        type: logScale ? 'log' : 'value',
        name: 'Height (m)',
        nameLocation: 'middle',
        nameGap: 50,
        min: logScale ? minHeight : 0,
        max: maxHeight
      },
      series: [
        {
          type: 'line',
          data: winds.map((u, i) => [u, heights[i]]),
          lineStyle: {
            color: '#3498DB',
            width: 3
          },
          showSymbol: false,
          markPoint: {
            data: [
              {
                coord: [u10, 10],
                symbol: 'circle',
                symbolSize: 10,
                itemStyle: { color: '#E74C3C' },
                label: { show: true, formatter: '10 m ref', position: 'right' }
              },
              {
                coord: [windSpeed(2, ustar, z0), 2],
                symbol: 'circle',
                symbolSize: 8,
                itemStyle: { color: '#F39C12' },
                label: { show: true, formatter: '2 m', position: 'right' }
              },
              {
                coord: [0, z0],
                symbol: 'circle',
                symbolSize: 8,
                itemStyle: { color: '#2ECC71' },
                label: { show: true, formatter: 'z₀', position: 'right' }
              }
            ]
          },
          markLine: {
            silent: true,
            symbol: 'none',
            data: [
              {
                yAxis: z0,
                lineStyle: { type: 'dashed', color: '#2ECC71' },
                label: { formatter: 'Roughness length' }
              }
            ]
          }
        }
      ]
    };
    
    chart.setOption(option);
  }
  
  document.getElementById('surface-type-wind').addEventListener('change', (e) => {
    surfaceType = e.target.value;
    z0 = surfaces[surfaceType].z0;
    document.getElementById('z0-slider').value = Math.log10(z0);
    document.getElementById('z0-value').textContent = z0.toFixed(4);
    updateCalculation();
  });
  
  document.getElementById('wind-ref-slider').addEventListener('input', (e) => {
    u10 = parseFloat(e.target.value);
    document.getElementById('wind-ref-value').textContent = u10;
    updateCalculation();
  });
  
  document.getElementById('z0-slider').addEventListener('input', (e) => {
    z0 = Math.pow(10, parseFloat(e.target.value));
    document.getElementById('z0-value').textContent = z0.toFixed(4);
    updateCalculation();
  });
  
  document.getElementById('toggle-log-scale').addEventListener('click', () => {
    logScale = !logScale;
    updateCalculation();
  });
  
  updateCalculation();
  
  window.addEventListener('resize', () => chart.resize());
})();
</script>

**Try this:**
- **Switch to ocean:** Very smooth → wind increases rapidly with height
- **Switch to forest:** Very rough → wind increases slowly, high z₀
- **Toggle log scale:** On log-height axis, profile becomes a straight line (proof it's logarithmic)
- **Increase reference wind:** Friction velocity increases proportionally
- Notice: Rougher surfaces have lower wind speeds at all heights for same reference wind

**Key insight:** The logarithmic profile is universal — only $u_*$ and $z_0$ change between surfaces.

---

## 6. Interpretation

### Why Logarithmic?

The log profile emerges from:
1. **Turbulent mixing** dominates (not molecular viscosity)
2. **Constant stress** with height near surface
3. **Mixing length proportional to height** ($\ell = kz$)

These three assumptions lead uniquely to the logarithmic form.

### Roughness and Drag

**Surface drag** is parameterized by $z_0$:
- Large $z_0$ → strong drag → more turbulence → slower wind near surface
- Small $z_0$ → weak drag → less turbulence → faster wind near surface

**Momentum flux to surface:**

$$\tau = \rho u_*^2$$

Higher $u_*$ (stronger wind or rougher surface) → more momentum transferred to ground.

### Wind Energy

**Wind power** increases with cube of wind speed:

$$P = \frac{1}{2}\rho A u^3$$

**Why turbines are tall:** At 100 m vs. 10 m:

For grassland ($z_0 = 0.03$ m), if $u(10) = 8$ m/s:

$$u(100) = \frac{u_*}{k}\ln(100/0.03) = \frac{0.565}{0.41}\times 8.11 = 11.2 \text{ m/s}$$

$$\frac{P(100)}{P(10)} = \left(\frac{11.2}{8}\right)^3 = 2.2$$

**2.2× more power** at 100 m!

### Urban Heat Island

Cities have large $z_0$ (buildings) → more turbulent mixing → enhanced heat/moisture transport from surface to atmosphere → affects local climate.

---

## 7. What Could Go Wrong?

### Assuming Neutral Stability

Our log law assumes **neutral stability** (no buoyancy effects).

**Unstable** (convective, daytime):
- Warm surface → rising air
- Enhanced mixing
- Wind profile steeper than log law

**Stable** (nighttime, inversion):
- Cool surface → suppressed turbulence
- Reduced mixing
- Wind profile less steep

**Monin-Obukhov similarity theory** corrects for stability.

### Applying Below Canopy

The log law applies **above** vegetation, not within it.

**Inside a canopy:**
- Wind decreases exponentially with depth
- Different profile shape
- Multiple length scales

### Ignoring Atmospheric Pressure Gradients

The log law assumes **horizontally uniform** flow.

Real atmosphere has:
- **Pressure gradients** → acceleration
- **Terrain variation** → flow separation, channeling
- **Thermal effects** → local circulations

### Constant Roughness

Real surfaces have **heterogeneous roughness**:
- Patchy vegetation
- Urban/rural transitions
- Fetch effects (distance upwind to equilibrium)

**Internal boundary layers** form at roughness transitions.

---

## 8. Extension: Heat and Moisture Profiles

The same turbulent eddies that transport momentum also transport **heat** and **moisture**.

**Temperature profile** (analog to wind):

$$T(z) - T_s = \frac{H}{\rho c_p u_* k} \ln\left(\frac{z}{z_h}\right)$$

Where:
- $H$ = sensible heat flux (from Essay 18)
- $z_h$ = roughness length for heat (typically $z_h < z_0$)

**Moisture profile:**

$$q(z) - q_s = \frac{LE}{L_v \rho u_* k} \ln\left(\frac{z}{z_q}\right)$$

Where:
- $q$ = specific humidity
- $z_q$ = roughness length for moisture

**These profiles enable bulk transfer formulas** used in climate models to calculate surface fluxes from atmospheric conditions.

---

## 9. Math Refresher: The Natural Logarithm

### Definition

The natural logarithm is the inverse of the exponential function:

$$y = e^x \iff x = \ln(y)$$

Where $e = 2.71828...$ (Euler's number).

### Properties

$$\ln(ab) = \ln(a) + \ln(b)$$

$$\ln(a/b) = \ln(a) - \ln(b)$$

$$\ln(a^b) = b\ln(a)$$

$$\ln(1) = 0, \quad \ln(e) = 1$$

### Why It Appears in Wind Profiles

The differential equation:

$$\frac{du}{dz} = \frac{u_*}{kz}$$

Has solution:

$$u = \frac{u_*}{k}\ln(z) + C$$

**Separating variables:**

$$du = \frac{u_*}{k}\frac{dz}{z}$$

**Integrate:**

$$\int du = \int \frac{u_*}{k}\frac{dz}{z}$$

$$u = \frac{u_*}{k}\ln(z) + C$$

The $1/z$ term on the right forces a logarithm on the left.

---

## Summary

- **Logarithmic wind profile:** $u(z) = \frac{u_*}{k}\ln(z/z_0)$
- **Friction velocity** ($u_*$): Characterizes turbulence intensity
- **von Kármán constant:** $k = 0.41$ (universal)
- **Roughness length** ($z_0$): Where profile extrapolates to zero wind
- Ocean: $z_0 \sim 0.0002$ m; Grassland: $z_0 \sim 0.03$ m; Forest: $z_0 \sim 1.5$ m
- Rougher surfaces → slower wind at all heights
- Log law emerges from turbulent mixing with mixing length $\ell = kz$
- Wind increases as $\ln(z)$ — very rapid increase near surface, slower aloft
- Same principles apply to heat and moisture transport

---
