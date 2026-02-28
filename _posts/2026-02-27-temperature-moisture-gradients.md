---
layout: essay
title: "Temperature and Moisture Gradients"
subtitle: "Atmospheric stability, inversions, and the vertical structure of humidity"
date: 2026-02-26
categories: [modeling]
series: computational-geography-environmental
series_order: 12
cluster: I
cluster_title: "Atmospheric Interactions"
tags:
  - computational-geography
  - modeling
  - meteorology
  - lapse-rate
  - stability
  - inversion
  - humidity
  - dew-point
math: true
viz: true
difficulty: 3
math_core: [lapse-rate, stability-analysis, saturation, adiabatic-process]
spatial_reasoning: 2
dynamics: 2
computation: 2
domain: [meteorology, atmospheric-science, climatology]
excerpt: >
  Temperature normally decreases with height, but not always—inversions trap
  pollution and create fog. Moisture also varies vertically, controlling cloud
  formation and precipitation. This essay derives lapse rates, introduces stability
  concepts, and models how temperature and humidity profiles affect weather.
math_prerequisites: >
  Temperature concepts (Essay 17-19). Vapor pressure (Essay 18). Basic thermodynamics
  (heat capacity). We'll introduce adiabatic processes from first principles.
---

## 1. The Question

Why does temperature usually decrease with altitude, and when does it increase instead?

Climb a mountain and temperature drops—about 6–10°C per kilometer. But sometimes:
- **Nighttime inversions:** Temperature increases with height near the ground
- **Valley fog:** Cold air trapped below, warm air above
- **Smog episodes:** Pollution trapped under a warm lid

Similarly, **moisture** varies with height:
- Surface air may be humid
- Upper air often dry
- Cloud base marks where air saturates

The mathematical question: What determines the vertical gradient of temperature and moisture, and when is the atmosphere stable vs. unstable?

---

## 2. The Conceptual Model

### Environmental Lapse Rate

The **environmental lapse rate** ($\Gamma$) is the actual temperature decrease with height:

$$\Gamma = -\frac{dT}{dz}$$

**Sign convention:** Positive $\Gamma$ means temperature decreases upward (normal).

**Typical value:** $\Gamma \approx 6.5$ K/km (global average troposphere)

### Adiabatic Lapse Rates

**Adiabatic process:** No heat exchange with surroundings (air parcel moves too fast for heat transfer).

**Dry adiabatic lapse rate** ($\Gamma_d$):  
Rising unsaturated air cools by expansion.

$$\Gamma_d = \frac{g}{c_p} = 9.8 \text{ K/km}$$

Where:
- $g = 9.8$ m/s² (gravity)
- $c_p = 1005$ J/kg/K (specific heat of air at constant pressure)

**Saturated adiabatic lapse rate** ($\Gamma_s$):  
Rising saturated air cools slower because condensation releases latent heat.

$$\Gamma_s \approx 4{-}7 \text{ K/km}$$

(Varies with temperature; warmer air has more moisture, more latent heat release)

### Atmospheric Stability

Compare environmental lapse rate ($\Gamma$) to adiabatic rates:

**Absolutely unstable:** $\Gamma > \Gamma_d$  
- Environment cools faster than adiabatic
- Rising air parcel stays warmer than surroundings
- Buoyant → continues rising → convection

**Conditionally unstable:** $\Gamma_s < \Gamma < \Gamma_d$  
- Dry air stable, saturated air unstable
- Depends on moisture content

**Absolutely stable:** $\Gamma < \Gamma_s$  
- Environment cools slower than adiabatic (or warms with height)
- Rising parcel becomes cooler than surroundings
- Negatively buoyant → sinks back → stable

**Inversion:** $\Gamma < 0$ (temperature increases with height)  
- Extremely stable
- Suppresses vertical mixing
- Traps pollution

---

## 3. Building the Mathematical Model

### Dry Adiabatic Process

For an ideal gas, adiabatic expansion/compression follows:

$$T p^{-R/c_p} = \text{constant}$$

Where:
- $T$ = temperature (K)
- $p$ = pressure (Pa)
- $R = 287$ J/kg/K (gas constant for dry air)
- $c_p = 1005$ J/kg/K

**Potential temperature** ($\theta$):

$$\theta = T \left(\frac{p_0}{p}\right)^{R/c_p}$$

Where $p_0 = 100$ kPa (reference pressure, sea level).

**For adiabatic motion, $\theta$ is conserved.**

**Pressure decreases with height:**

$$\frac{dp}{dz} = -\rho g$$

For dry adiabatic process:

$$\frac{dT}{dz} = -\frac{g}{c_p} = -\Gamma_d$$

$$\Gamma_d = \frac{g}{c_p} = \frac{9.8}{1005} = 0.00975 \text{ K/m} = 9.75 \text{ K/km}$$

(Often rounded to 10 K/km)

### Saturated Adiabatic Process

When air is saturated, condensation releases latent heat:

$$\frac{dT}{dz} = -\frac{g}{c_p + L_v dq_s/dT}$$

Where:
- $L_v = 2.5 \times 10^6$ J/kg (latent heat of vaporization)
- $dq_s/dT$ = rate of change of saturation mixing ratio with temperature

**Result:** $\Gamma_s < \Gamma_d$ (saturated air cools slower).

At warm temperatures (30°C): $\Gamma_s \approx 4$ K/km  
At cold temperatures (-20°C): $\Gamma_s \approx 7$ K/km

### Relative Humidity Profile

**Mixing ratio** ($q$, kg water vapor per kg dry air) is approximately conserved for unsaturated air.

**Saturation mixing ratio** ($q_s$) decreases with height (colder → less moisture capacity).

**Relative humidity:**

$$RH = \frac{q}{q_s} \times 100\%$$

If $q$ is constant and $q_s$ decreases, **RH increases with height** until reaching 100% → cloud base.

### Dew Point and Lifting Condensation Level

**Dew point** ($T_d$): Temperature at which air becomes saturated (at constant pressure).

**Lifting Condensation Level (LCL):** Height at which rising air reaches saturation.

**Approximate formula:**

$$h_{\text{LCL}} = 125 (T - T_d)$$

Where:
- $h_{\text{LCL}}$ = cloud base height (m)
- $T$ = surface temperature (°C)
- $T_d$ = surface dew point (°C)

**Example:** $T = 25°$C, $T_d = 15°$C:

$$h_{\text{LCL}} = 125 \times (25 - 15) = 1250 \text{ m}$$

Cloud base at 1.25 km.

---

## 4. Worked Example by Hand

**Problem:** A weather sounding shows:
- Surface: $T = 30°$C, $T_d = 20°$C, $p = 1000$ hPa
- At 1 km: $T = 22°$C, $p = 900$ hPa
- At 2 km: $T = 16°$C, $p = 800$ hPa

(a) Calculate environmental lapse rate.  
(b) Is the atmosphere stable or unstable for dry air?  
(c) What is the cloud base height?

### Solution

**(a) Environmental lapse rate**

Between surface and 1 km:

$$\Gamma = -\frac{\Delta T}{\Delta z} = -\frac{22 - 30}{1000 - 0} = \frac{8}{1000} = 0.008 \text{ K/m} = 8 \text{ K/km}$$

Between 1 km and 2 km:

$$\Gamma = -\frac{16 - 22}{2000 - 1000} = \frac{6}{1000} = 6 \text{ K/km}$$

**Average:** $\Gamma \approx 7$ K/km

**(b) Stability**

$\Gamma_d = 9.8$ K/km (dry adiabatic)

Compare: $\Gamma = 7$ K/km $< \Gamma_d$

**Environment cools slower than dry adiabatic → stable for dry air.**

If air rises 1 km dry adiabatically:
- Parcel temperature: $30 - 9.8 = 20.2°$C
- Environment temperature at 1 km: $22°$C
- Parcel is **cooler** than environment → sinks back → stable

**(c) Cloud base**

$$h_{\text{LCL}} = 125(T - T_d) = 125(30 - 20) = 1250 \text{ m}$$

**Cloud base at 1.25 km.**

---

## 5. Computational Implementation

Below is an interactive atmospheric profile simulator.

<div class="viz-container" id="atmos-profile-viz">
  <div class="controls">
    <label>
      Surface temperature (°C):
      <input type="range" id="surf-t-slider" min="10" max="35" step="1" value="25">
      <span id="surf-t-value">25</span> °C
    </label>
    <label>
      Surface dew point (°C):
      <input type="range" id="dew-slider" min="5" max="30" step="1" value="15">
      <span id="dew-value">15</span> °C
    </label>
    <label>
      Environmental lapse rate (K/km):
      <input type="range" id="lapse-slider" min="2" max="15" step="0.5" value="6.5">
      <span id="lapse-value">6.5</span> K/km
    </label>
    <label>
      Time of day:
      <select id="time-of-day">
        <option value="day">Daytime (unstable)</option>
        <option value="neutral" selected>Neutral</option>
        <option value="night">Night (inversion)</option>
      </select>
    </label>
  </div>
  <div class="atmos-results">
    <p><strong>Cloud base (LCL):</strong> <span id="lcl-display"></span> m</p>
    <p><strong>Stability:</strong> <span id="stability-display"></span></p>
    <p><strong>Parcel at 1 km:</strong> <span id="parcel-1km"></span> °C</p>
  </div>
  <div id="atmos-profile-chart" style="width: 100%; height: 500px;"></div>
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
  const chart = echarts.init(document.getElementById('atmos-profile-chart'));
  
  let surfT = 25;
  let dewT = 15;
  let lapseRate = 6.5;
  let timeOfDay = 'neutral';
  
  const gamma_d = 9.8; // K/km
  const gamma_s = 6.0; // K/km (approximate)
  
  function updateCalculation() {
    // Adjust lapse rate for time of day
    let actualLapse = lapseRate;
    if (timeOfDay === 'day') {
      actualLapse = Math.min(lapseRate * 1.3, 12); // More unstable
    } else if (timeOfDay === 'night') {
      actualLapse = Math.max(lapseRate * 0.5, -2); // Inversion possible
    }
    
    // Cloud base (LCL)
    const lcl = 125 * (surfT - dewT);
    
    // Generate profiles
    const heights = [];
    const envTemps = [];
    const dryAdiabat = [];
    const satAdiabat = [];
    const dewPoints = [];
    
    for (let z = 0; z <= 5000; z += 50) {
      const zKm = z / 1000;
      heights.push(z);
      
      // Environmental temperature
      const Tenv = surfT - actualLapse * zKm;
      envTemps.push(Tenv);
      
      // Dry adiabat from surface
      const Tdry = surfT - gamma_d * zKm;
      dryAdiabat.push(Tdry);
      
      // Saturated adiabat from LCL
      if (z < lcl) {
        satAdiabat.push(null);
      } else {
        const T_lcl = surfT - gamma_d * (lcl / 1000);
        const Tsat = T_lcl - gamma_s * ((z - lcl) / 1000);
        satAdiabat.push(Tsat);
      }
      
      // Dew point (decreases with height, roughly 2 K/km)
      const Td = dewT - 2 * zKm;
      dewPoints.push(Td);
    }
    
    // Stability assessment
    let stability;
    if (actualLapse > gamma_d) {
      stability = 'Absolutely Unstable (Γ > Γd)';
    } else if (actualLapse > gamma_s) {
      stability = 'Conditionally Unstable (Γs < Γ < Γd)';
    } else if (actualLapse > 0) {
      stability = 'Stable (Γ < Γs)';
    } else {
      stability = 'Inversion (Γ < 0)';
    }
    
    const parcel1km = surfT - gamma_d * 1;
    
    document.getElementById('lcl-display').textContent = lcl > 0 ? lcl.toFixed(0) : 'N/A';
    document.getElementById('stability-display').textContent = stability;
    document.getElementById('parcel-1km').textContent = parcel1km.toFixed(1);
    
    updateChart(heights, envTemps, dryAdiabat, satAdiabat, dewPoints, lcl);
  }
  
  function updateChart(heights, env, dry, sat, dew, lcl) {
    const option = {
      title: {
        text: 'Atmospheric Temperature Profile',
        left: 'center'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'cross' }
      },
      legend: {
        data: ['Environment', 'Dry Adiabat', 'Sat Adiabat', 'Dew Point'],
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
        name: 'Temperature (°C)',
        nameLocation: 'middle',
        nameGap: 30,
        min: -10,
        max: 40
      },
      yAxis: {
        type: 'value',
        name: 'Height (m)',
        nameLocation: 'middle',
        nameGap: 50,
        min: 0,
        max: 5000
      },
      series: [
        {
          name: 'Environment',
          type: 'line',
          data: env.map((t, i) => [t, heights[i]]),
          lineStyle: { color: '#E74C3C', width: 3 },
          showSymbol: false
        },
        {
          name: 'Dry Adiabat',
          type: 'line',
          data: dry.map((t, i) => [t, heights[i]]),
          lineStyle: { color: '#3498DB', width: 2, type: 'dashed' },
          showSymbol: false
        },
        {
          name: 'Sat Adiabat',
          type: 'line',
          data: sat.map((t, i) => t !== null ? [t, heights[i]] : null).filter(x => x),
          lineStyle: { color: '#2ECC71', width: 2, type: 'dashed' },
          showSymbol: false
        },
        {
          name: 'Dew Point',
          type: 'line',
          data: dew.map((t, i) => [t, heights[i]]),
          lineStyle: { color: '#9B59B6', width: 2, type: 'dotted' },
          showSymbol: false,
          markLine: {
            silent: true,
            symbol: 'none',
            data: lcl > 0 ? [
              {
                yAxis: lcl,
                lineStyle: { type: 'solid', color: '#95A5A6' },
                label: { formatter: 'LCL (cloud base)', position: 'end' }
              }
            ] : []
          }
        }
      ]
    };
    
    chart.setOption(option);
  }
  
  document.getElementById('surf-t-slider').addEventListener('input', (e) => {
    surfT = parseFloat(e.target.value);
    document.getElementById('surf-t-value').textContent = surfT;
    updateCalculation();
  });
  
  document.getElementById('dew-slider').addEventListener('input', (e) => {
    dewT = parseFloat(e.target.value);
    document.getElementById('dew-value').textContent = dewT;
    updateCalculation();
  });
  
  document.getElementById('lapse-slider').addEventListener('input', (e) => {
    lapseRate = parseFloat(e.target.value);
    document.getElementById('lapse-value').textContent = lapseRate.toFixed(1);
    updateCalculation();
  });
  
  document.getElementById('time-of-day').addEventListener('change', (e) => {
    timeOfDay = e.target.value;
    updateCalculation();
  });
  
  updateCalculation();
  
  window.addEventListener('resize', () => chart.resize());
})();
</script>

**Try this:**
- **Nighttime inversion:** Temperature increases with height → extremely stable
- **Daytime unstable:** High lapse rate (> 10 K/km) → dry adiabat to left of environment → rising parcel stays warmer
- **Dew point spread:** When temperature curve crosses dew point → cloud forms
- **LCL marker:** Shows cloud base height
- Notice: Saturated adiabat (green) has gentler slope than dry adiabat (latent heat release)

**Key insight:** Stability depends on the **slope** of the environmental profile relative to adiabatic rates.

---

## 6. Interpretation

### Inversion Types

**Radiation inversion** (nighttime):
- Surface cools by IR emission
- Ground-based inversion (0–200 m)
- Breaks up after sunrise

**Subsidence inversion** (high pressure):
- Descending air warms adiabatically
- Elevated inversion (500–2000 m)
- Persistent (days)
- Traps pollution

**Frontal inversion:**
- Warm air overrides cold air
- Associated with weather fronts

### Convective Boundary Layer

**Daytime over land:**
- Surface heated by sun
- Lapse rate approaches dry adiabatic ($\Gamma \approx \Gamma_d$)
- **Mixed layer:** Well-mixed by convection (temperature nearly constant with height)
- Inversion cap at top (typically 1–2 km)

### Cloud Formation

Clouds form when:
1. Air rises to LCL (cooling by expansion)
2. Reaches saturation
3. Continued lift produces condensation

**Cumulus clouds:** Thermal updrafts from warm surface  
**Stratus clouds:** Layered lifting (fronts, topography)

---

## 7. What Could Go Wrong?

### Assuming Dry Adiabatic Always

Once air saturates, **saturated adiabatic** applies. The transition occurs at LCL.

**Parcels rise:**
- Below LCL: Cool at $\Gamma_d = 9.8$ K/km
- Above LCL: Cool at $\Gamma_s \approx 6$ K/km

### Ignoring Moisture

Stability analysis without moisture misses **conditional instability**.

**Example:** $\Gamma = 8$ K/km
- Dry air: Stable ($\Gamma < \Gamma_d$)
- Saturated air: Unstable ($\Gamma > \Gamma_s$)

**Trigger:** If you can force saturation (lifting over mountain), convection explodes.

### Constant Lapse Rate

Real atmosphere has **layers**:
- Surface mixed layer
- Inversion layers
- Free troposphere
- Stratosphere (temperature increases with height always)

**Sounding:** Vertical profile measured by weather balloon.

### Forgetting Adiabatic Assumption

Adiabatic only if air moves **faster than heat diffuses**.

**Slow processes** (large-scale subsidence): Diabatic (radiative heating/cooling matters).

---

## 8. Extension: Convective Available Potential Energy (CAPE)

**CAPE** quantifies thunderstorm potential:

$$\text{CAPE} = \int_{LFC}^{EL} g \frac{T_{\text{parcel}} - T_{\text{env}}}{T_{\text{env}}} dz$$

Where:
- LFC = Level of Free Convection (where parcel becomes warmer than environment)
- EL = Equilibrium Level (where parcel becomes cooler again)

**Units:** J/kg (energy per unit mass)

**Interpretation:**
- CAPE < 1000 J/kg: Weak convection
- 1000–2500 J/kg: Moderate storms
- CAPE > 2500 J/kg: Severe thunderstorms, tornadoes

**Next essay** will connect atmospheric profiles to remote sensing—how satellites measure temperature and moisture from space using spectral absorption.

---

## 9. Math Refresher: Derivatives and Gradients

### Lapse Rate as Gradient

The lapse rate is the **vertical gradient** of temperature:

$$\Gamma = -\frac{dT}{dz}$$

**Negative sign:** By convention, positive $\Gamma$ means temperature decreases upward.

**Typical value:** $\Gamma = 6.5$ K/km = 0.0065 K/m

### Stability from Second Derivative

Stability can also be expressed using **potential temperature**:

**Stable:** $\frac{d\theta}{dz} > 0$ (potential temperature increases with height)  
**Unstable:** $\frac{d\theta}{dz} < 0$ (potential temperature decreases with height)  
**Neutral:** $\frac{d\theta}{dz} = 0$ (potential temperature constant)

For adiabatic motion, $\theta$ is conserved, so $d\theta/dz = 0$ defines neutral.

---

## Summary

- **Environmental lapse rate** ($\Gamma$): Actual temperature decrease with height
- **Dry adiabatic:** $\Gamma_d = 9.8$ K/km (unsaturated rising air)
- **Saturated adiabatic:** $\Gamma_s \approx 6$ K/km (condensation releases latent heat)
- **Stability:**
  - $\Gamma > \Gamma_d$: Unstable (convection)
  - $\Gamma_s < \Gamma < \Gamma_d$: Conditionally unstable
  - $\Gamma < \Gamma_s$: Stable
  - $\Gamma < 0$: Inversion (very stable)
- **LCL (cloud base):** $h \approx 125(T - T_d)$ meters
- **Inversions** trap pollution and suppress mixing
- Daytime: Convective mixing → near-adiabatic lapse rate
- Nighttime: Radiative cooling → ground-based inversion

**Next:** In Essay 25, we explore **remote sensing vegetation indices** (NDVI, EVI) and how satellites use spectral reflectance to monitor photosynthesis and ecosystem productivity from space.

---
