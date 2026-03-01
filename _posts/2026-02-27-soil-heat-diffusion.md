---
layout: essay
title: "Soil Heat Diffusion"
subtitle: "Temperature waves propagating into the ground — diurnal and seasonal cycles"
date: 2026-02-26
categories: [modeling]
series: computational-geography-environmental
series_order: 7
cluster: G
cluster_title: "Surface Energy Balance"
tags:
  - computational-geography
  - modeling
  - heat-diffusion
  - soil-temperature
  - thermal-diffusivity
  - partial-differential-equations
math: true
viz: true
difficulty: 4
math_core: [heat-equation, diffusion, damping-depth, phase-lag, fourier-analysis]
spatial_reasoning: 3
dynamics: 3
computation: 3
domain: [soil-science, climatology, environmental-modeling]
excerpt: >
  Surface temperature oscillates daily (day/night) and seasonally (summer/winter).
  These temperature waves propagate downward into the soil, getting weaker and
  more delayed with depth. This essay derives the heat diffusion equation and
  solves it for sinusoidal forcing to find damping depth and phase lag.
math_prerequisites: >
  Partial derivatives (Essay 8). Exponential functions (Essay 3). We'll introduce
  the heat equation and solve it for periodic boundary conditions.
---

## 1. The Question

Why does soil temperature lag behind air temperature, and why is the lag greater at depth?

Plant a thermometer at the surface and another at 1 meter depth. Watch them for 24 hours:
- **Surface:** Temperature swings wildly (10°C at night, 30°C at noon)
- **1 m depth:** Temperature barely changes (stays near 20°C all day)

The same pattern occurs seasonally:
- **Surface:** Cold in winter, hot in summer
- **10 m depth:** Constant year-round (permafrost boundary, wine cellars, geothermal)

The mathematical question: How do temperature oscillations at the surface propagate downward into the soil? How far do they penetrate, and how much are they delayed?

---

## 2. The Conceptual Model

### Heat Diffusion

Heat flows from warm to cool regions. In soil, this happens by **conduction** — molecular-scale energy transfer through collisions.

**Fick's law analogy (from diffusion):**  
Heat flux is proportional to the temperature gradient:

$$q = -k \frac{\partial T}{\partial z}$$

Where:
- $q$ = heat flux (W/m²), positive downward
- $k$ = thermal conductivity (W/m/K)
- $\frac{\partial T}{\partial z}$ = temperature gradient (K/m)

The negative sign means heat flows from hot to cold (down the gradient).

### Temperature Waves

The surface temperature oscillates:

$$T_{\text{surface}}(t) = T_{\text{mean}} + A \sin(\omega t)$$

Where:
- $T_{\text{mean}}$ = average temperature
- $A$ = amplitude of oscillation
- $\omega = 2\pi / P$ = angular frequency (rad/s)
- $P$ = period (86400 s for daily, ~31.5×10⁶ s for annual)

This oscillation propagates downward as a **damped, delayed wave**.

**Damping:** Amplitude decreases exponentially with depth  
**Delay:** Peak temperature occurs later at greater depths

---

## 3. Building the Mathematical Model

### The Heat Diffusion Equation

**Conservation of energy** in a thin soil layer:

$$\rho c \frac{\partial T}{\partial t} = \frac{\partial}{\partial z}\left(k \frac{\partial T}{\partial z}\right)$$

Where:
- $\rho$ = soil density (kg/m³)
- $c$ = specific heat capacity (J/kg/K)
- $k$ = thermal conductivity (W/m/K)

For **constant properties** (homogeneous soil):

$$\frac{\partial T}{\partial t} = \alpha \frac{\partial^2 T}{\partial z^2}$$

Where $\alpha = k / (\rho c)$ is the **thermal diffusivity** (m²/s).

**Physical interpretation:**
- Left side: Rate of temperature change
- Right side: Curvature of temperature profile (how "bent" the profile is)

If the profile is concave up ($\partial^2 T/\partial z^2 > 0$), temperature increases. If concave down, temperature decreases.

### Thermal Diffusivity

$$\alpha = \frac{k}{\rho c}$$

**Typical values:**

| Material | $\alpha$ (m²/s) |
|----------|-----------------|
| Dry sand | 0.3 × 10⁻⁶ |
| Moist sand | 0.6 × 10⁻⁶ |
| Clay (dry) | 0.25 × 10⁻⁶ |
| Clay (wet) | 0.5 × 10⁻⁶ |
| Peat | 0.1 × 10⁻⁶ |
| Rock | 1.0 × 10⁻⁶ |
| Water | 1.4 × 10⁻⁶ |
| Air | 20 × 10⁻⁶ |

**Key insight:** Moist soil has higher diffusivity than dry soil (water conducts heat better than air).

### Solution for Periodic Forcing

**Boundary condition** (surface oscillates):

$$T(z=0, t) = T_m + A_0 \sin(\omega t)$$

**Deep boundary** (constant temperature):

$$T(z \to \infty, t) = T_m$$

**Solution** (for $z > 0$):

$$T(z,t) = T_m + A_0 e^{-z/d} \sin\left(\omega t - \frac{z}{d}\right)$$

Where $d$ is the **damping depth** (or e-folding depth):

$$d = \sqrt{\frac{2\alpha}{\omega}}$$

**Two key features:**
1. **Amplitude decays exponentially:** $A(z) = A_0 e^{-z/d}$
2. **Phase lags linearly:** Phase lag = $z/d$ radians

### Damping Depth

The damping depth is where amplitude drops to $1/e \approx 37\%$ of surface value.

**Daily cycle** ($P = 86400$ s, $\omega = 7.27 \times 10^{-5}$ rad/s):

For typical soil ($\alpha = 0.5 \times 10^{-6}$ m²/s):

$$d_{\text{daily}} = \sqrt{\frac{2 \times 0.5 \times 10^{-6}}{7.27 \times 10^{-5}}} = 0.12 \text{ m}$$

**At depth $d = 12$ cm, daily temperature swing is 37% of surface swing.**

**Annual cycle** ($P = 365.25 \times 86400$ s, $\omega = 1.99 \times 10^{-7}$ rad/s):

$$d_{\text{annual}} = \sqrt{\frac{2 \times 0.5 \times 10^{-6}}{1.99 \times 10^{-7}}} = 2.2 \text{ m}$$

**Scaling rule:**

$$\frac{d_{\text{annual}}}{d_{\text{daily}}} = \sqrt{\frac{P_{\text{annual}}}{P_{\text{daily}}}} = \sqrt{365.25} \approx 19$$

Annual waves penetrate **~19 times deeper** than daily waves.

### Phase Lag

**Time delay** for temperature peak to reach depth $z$:

$$\Delta t = \frac{z}{d} \times \frac{P}{2\pi}$$

**Example:** Daily cycle, $z = 0.5$ m, $d = 0.12$ m:

$$\Delta t = \frac{0.5}{0.12} \times \frac{86400}{2\pi} = 4.17 \times 13750 = 57,300 \text{ s} \approx 16 \text{ hours}$$

**Surface peaks at noon → 0.5 m depth peaks at 4 AM the next day.**

---

## 4. Worked Example by Hand

**Problem:** A soil has thermal diffusivity $\alpha = 0.4 \times 10^{-6}$ m²/s. Surface temperature oscillates daily with mean 15°C and amplitude 10°C.

(a) What is the damping depth for the daily cycle?  
(b) What is the temperature amplitude at 20 cm depth?  
(c) When does the temperature peak at 20 cm if the surface peaks at noon?

### Solution

**(a) Damping depth**

Daily period: $P = 86400$ s

$$\omega = \frac{2\pi}{P} = \frac{2\pi}{86400} = 7.27 \times 10^{-5} \text{ rad/s}$$

$$d = \sqrt{\frac{2\alpha}{\omega}} = \sqrt{\frac{2 \times 0.4 \times 10^{-6}}{7.27 \times 10^{-5}}}$$

$$= \sqrt{\frac{0.8 \times 10^{-6}}{7.27 \times 10^{-5}}} = \sqrt{1.1 \times 10^{-2}} = 0.105 \text{ m} = 10.5 \text{ cm}$$

**(b) Amplitude at 20 cm**

$$A(z) = A_0 e^{-z/d} = 10 \times e^{-0.20/0.105}$$

$$= 10 \times e^{-1.90} = 10 \times 0.150 = 1.5°\text{C}$$

**Temperature swing at 20 cm depth is ±1.5°C (compared to ±10°C at surface).**

**(c) Phase lag**

$$\phi = \frac{z}{d} = \frac{0.20}{0.105} = 1.90 \text{ radians}$$

Convert to time:

$$\Delta t = \phi \times \frac{P}{2\pi} = 1.90 \times \frac{86400}{2\pi} = 1.90 \times 13750 = 26,125 \text{ s} \approx 7.3 \text{ hours}$$

**Surface peaks at noon (12:00) → 20 cm depth peaks at 19:18 (7:18 PM).**

---

## 5. Computational Implementation

Below is an interactive soil temperature profile simulator.

<div class="viz-container" id="soil-temp-viz">
  <div class="controls">
    <label>
      Soil type:
      <select id="soil-type">
        <option value="dry-sand">Dry Sand (α=0.3)</option>
        <option value="moist-sand" selected>Moist Sand (α=0.6)</option>
        <option value="clay">Clay (α=0.4)</option>
        <option value="peat">Peat (α=0.1)</option>
      </select>
    </label>
    <label>
      Surface temperature amplitude (°C):
      <input type="range" id="amplitude-slider" min="5" max="20" step="1" value="10">
      <span id="amplitude-value">10</span> °C
    </label>
    <label>
      Mean temperature (°C):
      <input type="range" id="mean-temp-slider" min="5" max="25" step="1" value="15">
      <span id="mean-temp-value">15</span> °C
    </label>
    <label>
      Time of day (hours):
      <input type="range" id="time-slider" min="0" max="24" step="0.5" value="12">
      <span id="time-value">12.0</span> h
    </label>
    <div class="button-group">
      <button id="animate-toggle">Animate Daily Cycle</button>
    </div>
  </div>
  <div class="soil-info">
    <p><strong>Damping depth:</strong> <span id="damping-depth"></span> cm</p>
    <p><strong>Temperature at 50 cm:</strong> <span id="temp-50cm"></span> °C</p>
  </div>
  <div id="soil-temp-chart" style="width: 100%; height: 500px;"></div>
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
  const chart = echarts.init(document.getElementById('soil-temp-chart'));
  
  const soils = {
    'dry-sand': { alpha: 0.3e-6, name: 'Dry Sand' },
    'moist-sand': { alpha: 0.6e-6, name: 'Moist Sand' },
    'clay': { alpha: 0.4e-6, name: 'Clay' },
    'peat': { alpha: 0.1e-6, name: 'Peat' }
  };
  
  let soilType = 'moist-sand';
  let amplitude = 10;
  let meanTemp = 15;
  let timeOfDay = 12;
  let animating = false;
  let animationInterval = null;
  
  const P = 86400; // seconds (daily period)
  const omega = 2 * Math.PI / P;
  
  function dampingDepth(alpha) {
    return Math.sqrt(2 * alpha / omega);
  }
  
  function soilTemperature(z, t, alpha, Tm, A0) {
    const d = dampingDepth(alpha);
    const tSeconds = t * 3600; // convert hours to seconds
    const phase = omega * tSeconds - z / d;
    return Tm + A0 * Math.exp(-z / d) * Math.sin(phase);
  }
  
  function updateChart() {
    const alpha = soils[soilType].alpha;
    const d = dampingDepth(alpha);
    
    // Generate temperature profile
    const depths = [];
    const temps = [];
    
    for (let z = 0; z <= 2; z += 0.02) {
      depths.push(z);
      temps.push(soilTemperature(z, timeOfDay, alpha, meanTemp, amplitude));
    }
    
    // Temperature at 50 cm
    const temp50 = soilTemperature(0.5, timeOfDay, alpha, meanTemp, amplitude);
    
    document.getElementById('damping-depth').textContent = (d * 100).toFixed(1);
    document.getElementById('temp-50cm').textContent = temp50.toFixed(1);
    
    const option = {
      title: {
        text: `Soil Temperature Profile (${timeOfDay.toFixed(1)} hours)`,
        left: 'center'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'cross' }
      },
      grid: {
        left: 80,
        right: 40,
        top: 60,
        bottom: 60
      },
      xAxis: {
        type: 'value',
        name: 'Temperature (°C)',
        nameLocation: 'middle',
        nameGap: 30,
        min: meanTemp - amplitude - 2,
        max: meanTemp + amplitude + 2
      },
      yAxis: {
        type: 'value',
        name: 'Depth (m)',
        nameLocation: 'middle',
        nameGap: 50,
        inverse: true,
        min: 0,
        max: 2
      },
      series: [
        {
          type: 'line',
          data: temps.map((t, i) => [t, depths[i]]),
          lineStyle: {
            color: '#E74C3C',
            width: 3
          },
          showSymbol: false,
          markLine: {
            silent: true,
            symbol: 'none',
            data: [
              {
                xAxis: meanTemp,
                lineStyle: { type: 'dashed', color: '#95A5A6' },
                label: { formatter: 'Mean', position: 'end' }
              }
            ]
          },
          markPoint: {
            data: [
              {
                coord: [soilTemperature(0, timeOfDay, alpha, meanTemp, amplitude), 0],
                symbol: 'circle',
                symbolSize: 10,
                itemStyle: { color: '#F39C12' },
                label: { show: true, formatter: 'Surface', position: 'right' }
              },
              {
                coord: [temp50, 0.5],
                symbol: 'circle',
                symbolSize: 8,
                itemStyle: { color: '#3498DB' },
                label: { show: true, formatter: '50 cm', position: 'right' }
              }
            ]
          }
        }
      ]
    };
    
    chart.setOption(option);
  }
  
  document.getElementById('soil-type').addEventListener('change', (e) => {
    soilType = e.target.value;
    updateChart();
  });
  
  document.getElementById('amplitude-slider').addEventListener('input', (e) => {
    amplitude = parseFloat(e.target.value);
    document.getElementById('amplitude-value').textContent = amplitude;
    updateChart();
  });
  
  document.getElementById('mean-temp-slider').addEventListener('input', (e) => {
    meanTemp = parseFloat(e.target.value);
    document.getElementById('mean-temp-value').textContent = meanTemp;
    updateChart();
  });
  
  document.getElementById('time-slider').addEventListener('input', (e) => {
    timeOfDay = parseFloat(e.target.value);
    document.getElementById('time-value').textContent = timeOfDay.toFixed(1);
    updateChart();
  });
  
  document.getElementById('animate-toggle').addEventListener('click', (e) => {
    if (animating) {
      clearInterval(animationInterval);
      e.target.textContent = 'Animate Daily Cycle';
      animating = false;
    } else {
      animationInterval = setInterval(() => {
        timeOfDay = (timeOfDay + 0.25) % 24;
        document.getElementById('time-slider').value = timeOfDay;
        document.getElementById('time-value').textContent = timeOfDay.toFixed(1);
        updateChart();
      }, 100);
      e.target.textContent = 'Stop Animation';
      animating = true;
    }
  });
  
  updateChart();
  
  window.addEventListener('resize', () => chart.resize());
})();
</script>

**Try this:**
- **Animate the daily cycle:** Watch the temperature wave propagate downward
- **Switch to peat:** Low diffusivity → shallow damping depth → surface insulation
- **Switch to moist sand:** Higher diffusivity → deeper penetration
- **Observe phase lag:** Surface peaks at noon, but 50 cm peaks hours later
- **Notice damping:** Temperature swing decreases rapidly with depth

**Key insight:** The ground acts as a **low-pass filter** — high-frequency oscillations (daily) are filtered out quickly, while low-frequency (annual) penetrate deep.

---

## 6. Interpretation

### Why Basements Stay Cool in Summer

At 2–3 meters depth, **daily temperature oscillations are negligible** (amplitude < 1% of surface).

**Annual oscillations** still penetrate:
- Summer surface temperature: 30°C
- 3 m depth: Lags by ~3 months → peaks in fall
- Result: Basement cool in summer, relatively warm in winter

### Permafrost and Active Layer

In Arctic regions, soil can be:
- **Active layer** (top ~0.5–2 m): Thaws in summer, freezes in winter
- **Permafrost** (below): Permanently frozen

**Active layer thickness** is approximately where annual temperature wave amplitude drops below the freezing point.

Climate warming → deeper summer thaw → thicker active layer → permafrost degradation.

### Thermal Inertia and Climate

**Ocean** has very high thermal inertia (high $c$, high $\rho$):
- Slow to warm in spring
- Slow to cool in fall
- Moderates coastal climates

**Desert soil** (dry) has low thermal inertia:
- Heats quickly during day
- Cools quickly at night
- Large diurnal temperature range

### Frost Penetration

**Frost depth** in winter depends on:
- Duration of freezing temperatures (how long the "cold wave" lasts)
- Soil thermal properties
- Snow cover (insulation)

**Simplified estimate:** Frost penetrates to depth where soil temperature stays above 0°C.

---

## 7. What Could Go Wrong?

### Assuming Homogeneous Soil

Real soil has **layers** with different thermal properties:
- Organic litter (low diffusivity)
- Topsoil (medium)
- Subsoil (higher)
- Rock (high)

**Boundary conditions** at each interface complicate the solution.

### Ignoring Latent Heat Effects

When soil freezes, **latent heat of fusion** is released:

$$L_f = 3.34 \times 10^5 \text{ J/kg}$$

This slows the freezing front (energy must be extracted before temperature drops further).

**Phase change** creates a **nonlinear problem** — $\alpha$ changes abruptly at the freezing front.

### Neglecting Water Movement

Moisture moves in soil (evaporation, drainage, capillary rise). Water carries heat (**advection**).

**Our model assumes no water movement** — pure conduction only.

In reality, evaporation at the surface **cools** the soil (latent heat), and infiltrating rainfall **heats or cools** deeper layers.

### Forgetting Time Scale

The solution assumes **sinusoidal forcing has been running for many periods** (steady periodic state).

After a **sudden change** (e.g., tillage, snow removal), soil takes time to adjust (transient response, not covered by our periodic solution).

---

## 8. Extension: Annual Cycle and Superposition

**Real soil temperature** is a superposition of multiple cycles:

$$T(z,t) = T_m + A_d e^{-z/d_d} \sin(\omega_d t - z/d_d) + A_a e^{-z/d_a} \sin(\omega_a t - z/d_a)$$

Where subscript $d$ = daily, $a$ = annual.

**Daily component:** Damping depth ~10 cm, negligible below 50 cm  
**Annual component:** Damping depth ~2 m, significant to 10 m

**Superposition works** because the heat equation is **linear**.

---

## 9. Math Refresher: The Heat Equation

### Derivation from Energy Conservation

Consider a thin layer of soil from depth $z$ to $z + \Delta z$.

**Energy in:**  
Heat flux entering from above: $q(z)$

**Energy out:**  
Heat flux leaving through bottom: $q(z + \Delta z)$

**Storage:**  
Energy stored in the layer: $\rho c \Delta z \frac{\partial T}{\partial t}$

**Balance:**

$$q(z) - q(z + \Delta z) = \rho c \Delta z \frac{\partial T}{\partial t}$$

Divide by $\Delta z$ and take limit $\Delta z \to 0$:

$$-\frac{\partial q}{\partial z} = \rho c \frac{\partial T}{\partial t}$$

Substitute Fourier's law $q = -k \frac{\partial T}{\partial z}$:

$$\frac{\partial}{\partial z}\left(k \frac{\partial T}{\partial z}\right) = \rho c \frac{\partial T}{\partial t}$$

For constant $k$:

$$\frac{\partial T}{\partial t} = \alpha \frac{\partial^2 T}{\partial z^2}$$

This is the **diffusion equation** (or heat equation).

### Connection to Other Diffusion Processes

Same equation governs:
- **Moisture diffusion** in soil
- **Chemical diffusion** in fluids
- **Pollutant spreading** in groundwater
- **Population spread** in ecology

**Universal form:**

$$\frac{\partial \phi}{\partial t} = D \frac{\partial^2 \phi}{\partial z^2}$$

Where $\phi$ is the diffusing quantity and $D$ is the diffusion coefficient.

---

## Summary

- **Heat diffusion equation:** $\frac{\partial T}{\partial t} = \alpha \frac{\partial^2 T}{\partial z^2}$
- **Thermal diffusivity:** $\alpha = k / (\rho c)$, typical values 0.1–1.0 × 10⁻⁶ m²/s
- **Damping depth:** $d = \sqrt{2\alpha / \omega}$, where $\omega = 2\pi / P$
- **Daily cycle:** Damping depth ~10 cm (temperature swing reduced to 37% at this depth)
- **Annual cycle:** Damping depth ~2 m (penetrates ~19× deeper than daily)
- **Phase lag:** Temperature peak delayed by time $\Delta t = (z/d) \times (P/2\pi)$
- Temperature amplitude decays exponentially: $A(z) = A_0 e^{-z/d}$
- Moist soil has higher diffusivity than dry soil
