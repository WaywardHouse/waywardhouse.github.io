---
layout: essay
title: "Boundary Layer Turbulence and Wind Profiles"
subtitle: "Near-surface atmospheric dynamics and turbulent transport"
date: 2026-02-27
categories: [modeling]
series: computational-geography-atmospheric-hazards
series_order: 7
cluster: X
cluster_title: "Wind & Turbulence"
tags:
  - computational-geography
  - modeling
  - meteorology
  - boundary-layer
  - turbulence
  - wind-energy
  - dispersion
math: true
viz: true
difficulty: 4
math_core: [logarithmic-wind-profile, friction-velocity, monin-obukhov, turbulent-kinetic-energy]
spatial_reasoning: 2
dynamics: 4
computation: 3
domain: [meteorology, wind-energy, air-quality, micrometeorology]
excerpt: >
  How does wind speed change with height and how strong is turbulent mixing? The
  atmospheric boundary layer exhibits logarithmic wind profiles and turbulent
  transport driven by surface friction and buoyancy. This essay derives surface
  layer equations, implements Monin-Obukhov similarity theory, demonstrates
  turbulent kinetic energy calculations, and applications to wind power and dispersion.
math_prerequisites: >
  Fluid dynamics basics. Reynolds decomposition. Shear stress concepts. We'll
  introduce boundary layer meteorology and turbulence theory from first principles.
---

## 1. The Question

How much wind power is available at 100 m hub height given surface observations?

**Atmospheric Boundary Layer (ABL):**

Lowest 1-2 km of atmosphere directly influenced by surface.

**Characteristics:**
- Wind shear (speed increases with height)
- Turbulence (eddies mix momentum, heat, moisture)
- Diurnal cycle (day/night differences)

**Surface layer:**

Lowest 10% of ABL (~50-100 m).

**Constant flux layer:** Momentum, heat fluxes approximately constant.

**Applications:**
- Wind energy (turbine siting)
- Air quality (pollution dispersion)
- Aviation (turbulence, windshear)
- Agriculture (evapotranspiration)
- Building design (wind loads)

---

## 2. The Conceptual Model

### Logarithmic Wind Profile

**Neutral conditions** (no buoyancy):

$$u(z) = \frac{u_*}{\kappa} \ln\left(\frac{z}{z_0}\right)$$

Where:
- $u(z)$ = wind speed at height $z$ (m/s)
- $u_*$ = friction velocity (m/s)
- $\kappa$ = von Kármán constant (0.4)
- $z_0$ = roughness length (m)

**Friction velocity:**

$$u_* = \sqrt{\frac{\tau_0}{\rho}}$$

Where:
- $\tau_0$ = surface shear stress (Pa)
- $\rho$ = air density (kg/m³)

**Roughness length:**

Depends on surface:
- Water (smooth): $z_0 = 0.0001$ m
- Grass: $z_0 = 0.01-0.05$ m
- Crops: $z_0 = 0.1-0.2$ m
- Forest: $z_0 = 0.5-2 m
- Urban: $z_0 = 1-3 m

### Power Law (Simplified)

**Empirical approximation:**

$$\frac{u(z)}{u_{ref}} = \left(\frac{z}{z_{ref}}\right)^\alpha$$

Where:
- $u_{ref}$ = wind at reference height $z_{ref}$
- $\alpha$ = power law exponent (~0.14-0.43)

**Typical:** $\alpha = 1/7$ (seventh-root law)

**Example:** $u(10m) = 5$ m/s, find $u(100m)$

$$u(100) = 5 \times \left(\frac{100}{10}\right)^{1/7} = 5 \times 10^{0.143} = 5 \times 1.39 = 6.95 \text{ m/s}$$

**40% increase** from 10 to 100 m!

### Stability Effects

**Buoyancy modifies profile:**

**Unstable (daytime, surface warmer):**
- Enhanced turbulence
- More mixing
- Winds increase less rapidly with height

**Stable (nighttime, surface cooler):**
- Suppressed turbulence
- Less mixing  
- Strong wind shear (jet formation possible)

**Monin-Obukhov length:**

$$L = -\frac{u_*^3 T}{\kappa g \overline{w'\theta'}}$$

Where:
- $T$ = temperature (K)
- $g$ = 9.81 m/s²
- $\overline{w'\theta'}$ = kinematic heat flux (K·m/s)

**$L > 0$:** Stable  
**$L < 0$:** Unstable  
**$|L| \to \infty$:** Neutral

---

## 3. Building the Mathematical Model

### Wind Extrapolation

**From reference height to hub height:**

**Given:** $u(z_1)$, want $u(z_2)$

**Log profile:**

$$\frac{u(z_2)}{u(z_1)} = \frac{\ln(z_2/z_0)}{\ln(z_1/z_0)}$$

**Need $z_0$!**

**Estimate from measurements at two heights:**

$$z_0 = z_1 \exp\left(-\frac{\kappa u_1}{u_*}\right)$$

**Or assume typical $z_0$ for terrain.**

**Power law (simpler):**

$$u(z_2) = u(z_1) \left(\frac{z_2}{z_1}\right)^\alpha$$

### Wind Power Density

**Available power in wind:**

$$P = \frac{1}{2} \rho A u^3$$

Where:
- $P$ = power (W)
- $A$ = rotor swept area (m²)
- $u$ = wind speed (m/s)

**Cube law:** Power ∝ $u^3$

**Example:** 5 m/s → 7 m/s

$$\frac{P_2}{P_1} = \left(\frac{7}{5}\right)^3 = 1.4^3 = 2.74$$

**2.7× more power** from 40% wind increase!

**Wind power density:**

$$\frac{P}{A} = \frac{1}{2} \rho u^3$$ (W/m²)

**For $\rho = 1.2$ kg/m³, $u = 7$ m/s:**

$$\frac{P}{A} = 0.6 \times 343 = 206 \text{ W/m}^2$$

**Turbine efficiency:** Betz limit = 59% maximum

**Actual:** 35-45% typical

### Turbulent Kinetic Energy (TKE)

**Per unit mass:**

$$TKE = \frac{1}{2}(\overline{u'^2} + \overline{v'^2} + \overline{w'^2})$$

Where primes denote turbulent fluctuations.

**Typical surface layer:**

$TKE \approx 2.5 u_*^2$ (neutral)

**TKE controls:**
- Dispersion rates
- Turbulence intensity (important for turbines)
- Aviation hazards

**Turbulence intensity:**

$$TI = \frac{\sigma_u}{\bar{u}}$$

Where $\sigma_u = \sqrt{\overline{u'^2}}$

**Low turbulence (<10%):** Smooth flow, less turbine stress  
**High turbulence (>20%):** Gusty, higher fatigue loads

---

## 4. Worked Example by Hand

**Problem:** Extrapolate wind for turbine siting.

**Measurements:**
- $u(10m) = 6$ m/s (anemometer)
- Surface: Agricultural (crops)
- Conditions: Neutral (midday, moderate wind)

**Turbine specifications:**
- Hub height: 80 m
- Rotor diameter: 90 m
- Cut-in speed: 3 m/s
- Rated speed: 12 m/s

Calculate hub height wind and power density.

### Solution

**Step 1: Estimate roughness length**

Crops: $z_0 \approx 0.15$ m (typical)

**Step 2: Friction velocity**

From log profile:

$$u(10) = \frac{u_*}{0.4} \ln\left(\frac{10}{0.15}\right)$$

$$6 = \frac{u_*}{0.4} \ln(66.7) = \frac{u_*}{0.4} \times 4.20$$

$$6 = 10.5 u_*$$

$$u_* = 0.571 \text{ m/s}$$

**Step 3: Hub height wind (log profile)**

$$u(80) = \frac{0.571}{0.4} \ln\left(\frac{80}{0.15}\right)$$

$$= 1.43 \times \ln(533) = 1.43 \times 6.28 = 8.98 \text{ m/s}$$

**Hub wind: ~9 m/s**

**Step 4: Verification with power law**

$$u(80) = 6 \times \left(\frac{80}{10}\right)^{1/7} = 6 \times 8^{0.143} = 6 \times 1.35 = 8.1 \text{ m/s}$$

**Similar result** (power law slightly underestimates)

**Step 5: Wind power density**

$$\frac{P}{A} = 0.6 \times 9^3 = 0.6 \times 729 = 437 \text{ W/m}^2$$

**Step 6: Turbine power**

Rotor area:

$$A = \pi r^2 = \pi \times 45^2 = 6362 \text{ m}^2$$

Available power:

$$P_{avail} = 437 \times 6362 = 2.78 \text{ MW}$$

**Actual power** (40% efficiency):

$$P_{actual} = 0.40 \times 2.78 = 1.11 \text{ MW}$$

**Step 7: Assessment**

9 m/s < 12 m/s (rated) → **Below rated power**

9 m/s > 3 m/s (cut-in) → **Turbine operational**

**Good site** (average 9 m/s excellent for wind energy)

---

## 5. Computational Implementation

Below is an interactive boundary layer wind profile simulator.

<div class="viz-container" id="wind-viz">
  <div class="controls">
    <label>
      10m wind speed (m/s):
      <input type="range" id="wind-10m" min="2" max="15" step="0.5" value="6">
      <span id="wind-val">6</span>
    </label>
    <label>
      Surface roughness:
      <select id="roughness">
        <option value="0.0001">Water (smooth)</option>
        <option value="0.03">Grass/farmland</option>
        <option value="0.15" selected>Crops</option>
        <option value="1.0">Forest</option>
        <option value="2.0">Urban</option>
      </select>
    </label>
    <label>
      Stability:
      <select id="stability">
        <option value="unstable">Unstable (day)</option>
        <option value="neutral" selected>Neutral</option>
        <option value="stable">Stable (night)</option>
      </select>
    </label>
    <div class="wind-info">
      <p><strong>80m hub wind:</strong> <span id="hub-wind">--</span> m/s</p>
      <p><strong>Friction velocity:</strong> <span id="friction-vel">--</span> m/s</p>
      <p><strong>Power density (80m):</strong> <span id="power-density">--</span> W/m²</p>
      <p><strong>Wind class:</strong> <span id="wind-class">--</span></p>
    </div>
  </div>
  <div id="wind-canvas-container">
    <canvas id="wind-canvas" width="700" height="400" style="border: 1px solid #ddd;"></canvas>
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
  const chart = echarts.init(document.getElementById('wind-canvas'));
  
  let wind10m = 6;
  let z0 = 0.15;
  let stability = 'neutral';
  
  function calculateProfile() {
    const kappa = 0.4;
    
    // Friction velocity from 10m observation
    const uStar = (wind10m * kappa) / Math.log(10 / z0);
    
    const heights = [];
    const speeds = [];
    
    for (let z = 1; z <= 200; z += 2) {
      if (z < z0) continue;
      
      let u;
      
      if (stability === 'neutral') {
        u = (uStar / kappa) * Math.log(z / z0);
      } else if (stability === 'unstable') {
        // Simplified: Enhanced mixing, more gradual profile
        const L = -50; // Negative for unstable
        const psi = 2 * Math.log((1 + 1 - z/L) / 2);
        u = (uStar / kappa) * (Math.log(z / z0) - psi);
      } else { // stable
        // Suppressed mixing, steeper profile
        const L = 50; // Positive for stable
        const psi = -5 * z / L;
        u = (uStar / kappa) * (Math.log(z / z0) - psi);
      }
      
      heights.push(z);
      speeds.push(u);
    }
    
    return {heights, speeds, uStar};
  }
  
  function getWindClass(avgSpeed) {
    if (avgSpeed >= 9.5) return {class: 'Class 7 (Superb)', color: '#1B5E20'};
    if (avgSpeed >= 8.5) return {class: 'Class 6 (Excellent)', color: '#388E3C'};
    if (avgSpeed >= 7.5) return {class: 'Class 5 (Excellent)', color: '#66BB6A'};
    if (avgSpeed >= 6.5) return {class: 'Class 4 (Good)', color: '#9CCC65'};
    if (avgSpeed >= 5.5) return {class: 'Class 3 (Fair)', color: '#FDD835'};
    if (avgSpeed >= 4.5) return {class: 'Class 2 (Marginal)', color: '#FFB74D'};
    return {class: 'Class 1 (Poor)', color: '#E57373'};
  }
  
  function render() {
    const {heights, speeds, uStar} = calculateProfile();
    
    // Hub height wind (80m)
    const idx80 = heights.findIndex(h => h >= 80);
    const hubWind = speeds[idx80];
    
    // Power density
    const powerDensity = 0.5 * 1.2 * Math.pow(hubWind, 3);
    
    const windClass = getWindClass(hubWind);
    
    document.getElementById('hub-wind').textContent = hubWind.toFixed(1);
    document.getElementById('friction-vel').textContent = uStar.toFixed(2);
    document.getElementById('power-density').textContent = powerDensity.toFixed(0);
    document.getElementById('wind-class').textContent = windClass.class;
    document.getElementById('wind-class').style.color = windClass.color;
    
    const profileData = heights.map((h, i) => [speeds[i], h]);
    
    const series = [
      {
        name: 'Wind Profile',
        type: 'line',
        data: profileData,
        lineStyle: {color: '#2196F3', width: 3},
        smooth: false
      },
      {
        name: 'Hub Height (80m)',
        type: 'line',
        data: [[0, 80], [15, 80]],
        lineStyle: {color: '#F44336', width: 2, type: 'dashed'},
        markLine: {
          silent: true,
          label: {formatter: 'Turbine hub'}
        }
      },
      {
        name: '10m Measurement',
        type: 'scatter',
        data: [[wind10m, 10]],
        symbolSize: 12,
        itemStyle: {color: '#4CAF50'}
      }
    ];
    
    const option = {
      title: {
        text: 'Atmospheric Boundary Layer Wind Profile',
        left: 'center'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {type: 'cross'},
        formatter: (params) => {
          if (params[0]) {
            return `Wind: ${params[0].value[0].toFixed(1)} m/s<br/>Height: ${params[0].value[1].toFixed(0)} m`;
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
        name: 'Wind Speed (m/s)',
        nameLocation: 'middle',
        nameGap: 30,
        min: 0,
        max: 15
      },
      yAxis: {
        type: 'value',
        name: 'Height (m)',
        nameLocation: 'middle',
        nameGap: 50,
        min: 0,
        max: 200
      },
      series: series
    };
    
    chart.setOption(option, true);
  }
  
  document.getElementById('wind-10m').addEventListener('input', (e) => {
    wind10m = parseFloat(e.target.value);
    document.getElementById('wind-val').textContent = wind10m;
    render();
  });
  
  document.getElementById('roughness').addEventListener('change', (e) => {
    z0 = parseFloat(e.target.value);
    render();
  });
  
  document.getElementById('stability').addEventListener('change', (e) => {
    stability = e.target.value;
    render();
  });
  
  render();
  
  window.addEventListener('resize', () => chart.resize());
})();
</script>

**Observations:**
- Logarithmic increase of wind with height
- Rougher surfaces show steeper wind shear
- Unstable conditions show more gradual profiles
- Stable conditions show stronger wind shear
- Hub height winds 30-50% higher than 10m
- Power density increases dramatically with height (cube law)

**Key insights:**
- Wind power highly sensitive to hub height
- Surface roughness critically affects available wind
- Atmospheric stability modifies wind profiles
- 80m hub height standard balances power and cost

---

## 6. Interpretation

### Wind Energy Siting

**Site assessment:**

1. **Measure:** 10m anemometer, 1 year minimum
2. **Extrapolate:** To hub height (log profile or power law)
3. **Calculate:** Average wind, power density
4. **Classify:** Wind resource class

**Economic viability:**

Class 4+ (>6.5 m/s @ 80m) generally viable

Class 6-7: Excellent returns

**Capacity factor:**

Fraction of time producing rated power.

Typical: 25-45%

### Atmospheric Dispersion

**Pollution transport:**

**Unstable:** Rapid vertical mixing, dilutes pollutants quickly

**Stable:** Limited mixing, pollutants concentrate near surface

**Inversion:** Extreme stability, traps pollutants (smog events)

**Gaussian plume model:**

Uses $u_*$, $L$ to determine dispersion parameters.

**Critical for:**
- Stack design
- Emergency response
- Air quality forecasts

### Aviation

**Low-level windshear:**

Wind change <1000 ft altitude.

**Microburst:** Extreme case (downdraft)

**Boundary layer effects:**

Strong shear during stable conditions (night, early morning)

**Affects:**
- Takeoff/landing performance
- Turbulence encounters

---

## 7. What Could Go Wrong?

### Complex Terrain

**Hills/mountains violate** flat terrain assumption.

**Speedup over ridges:** 20-50% local acceleration

**Valley channeling:** Flows decouple from geostrophic wind

**Solution:** CFD models (WRF, WINDNINJA) or mesoscale models

### Low-Level Jets

**Nocturnal acceleration:** Winds peak 100-500m at night

**Profile inverted:** Maximum wind aloft, not at surface

**Example - Great Plains:**

Jets 20-30 m/s common (500 mb)

**Implications:**
- Enhanced turbine production overnight
- But also increased turbulence
- Fatigue loads

### Forest Edge Effects

**Transition zones:** Abrupt roughness changes

**Internal boundary layer:** New ABL grows downwind

**Typically 10-20× roughness transition distance**

Forest edge $z_0 = 1$ m → fetch = 10-20 m for adjustment

### Icing

**Wind turbines in cold climates:**

Icing on blades reduces efficiency, adds weight

**Detection:** Power curve degradation

**Mitigation:** Heated blades (expensive), shutdown protocols

---

## 8. Extension: Large Eddy Simulation

**LES resolves large turbulent eddies** directly.

**Grid:** 1-10 m resolution

**Subgrid:** Parameterized (small eddies)

**Applications:**
- Wind farm optimization (wake effects)
- Urban meteorology (heat islands)
- Complex terrain wind assessment

**Computational cost:** High (supercomputers)

**Example - Wind farm wake:**

Downstream turbines: 10-40% power reduction from upstream wakes

LES optimizes spacing: 5-7× rotor diameter typical

---

## 9. Math Refresher: Reynolds Decomposition

### Turbulent Flow

**Instantaneous value:**

$$u = \bar{u} + u'$$

Where:
- $\bar{u}$ = time-averaged (mean)
- $u'$ = fluctuation (turbulent)

**Properties:**

$$\overline{u'} = 0$$ (by definition)

$$\overline{u'^2} > 0$$ (variance)

### Reynolds Stress

**Momentum flux from turbulence:**

$$\tau = -\rho \overline{u'w'}$$

Where $w'$ = vertical velocity fluctuation.

**Surface layer:** $\tau \approx \rho u_*^2$

**Controls:** Wind profile shape

---

## Summary

- Logarithmic wind profile describes speed increase with height in neutral boundary layer
- Friction velocity u_* characterizes surface stress and turbulent momentum flux
- Roughness length z_0 varies from 0.0001m (water) to 2m (urban/forest)
- Power law provides simplified extrapolation with exponent typically 1/7
- Wind power density proportional to velocity cubed making hub height critical
- Monin-Obukhov theory incorporates stability effects modifying wind profiles
- Atmospheric stability controls turbulent mixing and dispersion rates
- Wind resource Class 4+ (>6.5 m/s @ 80m) required for economic viability
- Applications span wind energy, pollution dispersion, aviation safety
- Complex terrain and low-level jets violate flat-surface assumptions requiring advanced modeling

**Series 6 progress: 6 of 13 essays**
**Total corpus: 66 essays**

---
