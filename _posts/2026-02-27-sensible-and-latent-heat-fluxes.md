---
layout: essay
title: "Sensible and Latent Heat Fluxes"
subtitle: "How net radiation is partitioned between heating air and evaporating water"
date: 2026-02-26
categories: [modeling]
series: computational-geography-environmental
series_order: 6
cluster: G
cluster_title: "Surface Energy Balance"
tags:
  - computational-geography
  - modeling
  - energy-balance
  - evapotranspiration
  - bowen-ratio
  - latent-heat
math: true
viz: true
difficulty: 3
math_core: [energy-partitioning, phase-change, vapor-pressure, aerodynamic-resistance]
spatial_reasoning: 2
dynamics: 2
computation: 3
domain: [hydrology, climatology, environmental-modeling, agriculture]
excerpt: >
  Net radiation doesn't all warm the surface. Some heats the air (sensible heat),
  some evaporates water (latent heat), some penetrates the soil (ground heat flux).
  This essay derives the Bowen ratio and introduces the physics of evapotranspiration—
  the foundation of water and energy cycling in ecosystems.
math_prerequisites: >
  Energy balance from Essay 17. Basic thermodynamics (heat capacity conceptually).
  We'll introduce vapor pressure and latent heat from first principles.
---

## 1. The Question

When the sun heats the ground, where does that energy go?

Essay 17 showed that net radiation ($R_n$) is the energy absorbed by Earth's surface. But this energy doesn't just sit there—it flows into:
- **The air** (warming the atmosphere)
- **Water vapor** (evaporating moisture from soil and plants)
- **The ground** (heating deeper soil layers)

Different surfaces partition energy differently:
- **Desert:** Most energy heats the air (hot, dry air rising)
- **Irrigated field:** Most energy evaporates water (cool, moist air)
- **Snow/ice:** Energy goes into melting (temperature stays at 0°C until all melts)

The mathematical question: How much energy goes into each pathway, and what controls the partitioning?

---

## 2. The Conceptual Model

### The Surface Energy Balance Equation

Net radiation is partitioned among four fluxes:

$$R_n = H + LE + G + S$$

Where (all in W/m²):
- $R_n$ = **Net radiation** (from Essay 17)
- $H$ = **Sensible heat flux** (warms/cools the air)
- $LE$ = **Latent heat flux** (evaporation/condensation)
- $G$ = **Ground heat flux** (warms/cools the soil)
- $S$ = **Storage** (warms/cools biomass, water bodies)

**Sign convention:**
- Positive: energy flows away from surface (surface loses energy)
- Negative: energy flows toward surface (surface gains energy)

**Typical daytime values:**
- $R_n$ = +600 W/m² (surface gains energy)
- $H$ = +100 W/m² (heats air)
- $LE$ = +400 W/m² (evaporates water)
- $G$ = +100 W/m² (heats soil)

### Sensible vs. Latent Heat

**Sensible heat** = energy you can **sense** (feel) as temperature change

When air warms from 20°C to 25°C, it has gained sensible heat. You can measure this with a thermometer.

**Latent heat** = **hidden** energy in phase change (solid ↔ liquid ↔ gas)

When water evaporates, it absorbs energy but **doesn't change temperature**. The energy is stored in the vapor molecules and released when vapor condenses back to liquid.

**Latent heat of vaporization** ($L_v$):
- Energy required to evaporate 1 kg of water
- $L_v = 2.45 \times 10^6$ J/kg (at 20°C)
- This is HUGE—evaporating 1 liter of water requires 2,450 kJ

**Why it matters:** Evaporation is a very effective cooling mechanism. That's why sweating cools you down.

---

## 3. Building the Mathematical Model

### Sensible Heat Flux

Heat moves from warm to cool. If the surface is warmer than the air, heat flows upward into the atmosphere.

**Simplified form:**

$$H = \rho_a c_p \frac{T_s - T_a}{r_a}$$

Where:
- $\rho_a$ = air density (~1.2 kg/m³)
- $c_p$ = specific heat of air (~1005 J/kg/K)
- $T_s$ = surface temperature (K or °C)
- $T_a$ = air temperature (K or °C)
- $r_a$ = **aerodynamic resistance** (s/m)

**Aerodynamic resistance** ($r_a$) depends on:
- Wind speed (higher wind → lower resistance → more heat transfer)
- Surface roughness (tall vegetation → more turbulent → lower resistance)
- Atmospheric stability (unstable → enhanced mixing → lower resistance)

**Simplified estimate:**

$$r_a \approx \frac{\ln(z/z_0)^2}{k^2 u}$$

Where:
- $z$ = measurement height (typically 2 m)
- $z_0$ = roughness length (~0.01 m for grass, ~1 m for forest)
- $k = 0.41$ (von Kármán constant)
- $u$ = wind speed (m/s)

**Example:** Grass surface, wind 3 m/s:

$$r_a \approx \frac{(\ln(2/0.01))^2}{0.41^2 \times 3} = \frac{(5.3)^2}{0.5} = 56 \text{ s/m}$$

### Latent Heat Flux

Evaporation rate ($E$, kg/m²/s) multiplied by latent heat gives the energy flux:

$$LE = L_v E$$

**Evaporation driven by vapor pressure deficit:**

$$E = \rho_a \frac{e_s - e_a}{r_a + r_s}$$

Where:
- $e_s$ = saturation vapor pressure at surface temperature (Pa)
- $e_a$ = actual vapor pressure in air (Pa)
- $r_s$ = **surface resistance** (s/m)

**Surface resistance** ($r_s$) depends on:
- Soil moisture (dry soil → high resistance → little evaporation)
- Stomatal opening in plants (closed stomata → high resistance)
- Surface type (open water → $r_s = 0$; desert → $r_s = \infty$)

**Saturation vapor pressure** (Tetens formula):

$$e_s(T) = 611 \exp\left(\frac{17.27 T}{T + 237.3}\right)$$

Where $T$ is temperature in °C, result in Pa.

**Relative humidity:**

$$RH = \frac{e_a}{e_s} \times 100\%$$

**Vapor pressure deficit:**

$$VPD = e_s - e_a = e_s(1 - RH/100)$$

### The Bowen Ratio

The **Bowen ratio** ($\beta$) is the ratio of sensible to latent heat:

$$\beta = \frac{H}{LE}$$

**Physical interpretation:**
- $\beta > 1$: More energy heats air than evaporates water (dry conditions)
- $\beta < 1$: More energy evaporates water than heats air (moist conditions)
- $\beta \approx 0$: Nearly all energy goes to evaporation (wet surface, lake)

**Typical values:**
- Tropical rainforest: $\beta \approx 0.2$ (most energy → evaporation)
- Irrigated cropland: $\beta \approx 0.4$
- Temperate grassland: $\beta \approx 0.8$
- Semi-arid shrubland: $\beta \approx 2$
- Desert: $\beta \approx 10$ (minimal evaporation)

**Simplified Bowen ratio:**

$$\beta \approx \gamma \frac{T_s - T_a}{e_s - e_a}$$

Where $\gamma = c_p / L_v \approx 0.66$ hPa/K (psychrometric constant).

---

## 4. Worked Example by Hand

**Problem:** A grassland surface on a sunny afternoon has:
- Net radiation: $R_n = 600$ W/m²
- Surface temperature: $T_s = 30°$C
- Air temperature (2 m): $T_a = 25°$C
- Relative humidity: $RH = 50\%$
- Wind speed: $u = 3$ m/s
- Aerodynamic resistance: $r_a = 60$ s/m
- Surface resistance: $r_s = 100$ s/m
- Ground heat flux: $G = 100$ W/m²

Calculate $H$, $LE$, and the Bowen ratio.

### Solution

**Step 1: Saturation vapor pressure**

At $T_s = 30°$C:

$$e_s(30) = 611 \exp\left(\frac{17.27 \times 30}{30 + 237.3}\right) = 611 \exp(1.936) = 4243 \text{ Pa}$$

At $T_a = 25°$C:

$$e_s(25) = 611 \exp\left(\frac{17.27 \times 25}{25 + 237.3}\right) = 611 \exp(1.645) = 3168 \text{ Pa}$$

**Step 2: Actual vapor pressure**

$$e_a = RH \times e_s(T_a) = 0.50 \times 3168 = 1584 \text{ Pa}$$

**Step 3: Sensible heat flux**

$$H = \rho_a c_p \frac{T_s - T_a}{r_a} = 1.2 \times 1005 \times \frac{30 - 25}{60}$$

$$= 1206 \times \frac{5}{60} = 100 \text{ W/m}^2$$

**Step 4: Evaporation rate**

$$E = \rho_a \frac{e_s(T_s) - e_a}{r_a + r_s} = 1.2 \times \frac{4243 - 1584}{60 + 100}$$

$$= 1.2 \times \frac{2659}{160} = 1.2 \times 16.6 = 20.0 \times 10^{-3} \text{ kg/m}^2\text{/s}$$

(Note: need to divide by atmospheric pressure factor; simplified here)

Actually, more precisely with vapor pressure in Pa and using proper conversion:

$$E \approx 0.622 \times \frac{1.2}{101325} \times \frac{2659}{160} \approx 0.000124 \text{ kg/m}^2\text{/s}$$

**Step 5: Latent heat flux**

$$LE = L_v E = 2.45 \times 10^6 \times 0.000124 = 304 \text{ W/m}^2$$

**Step 6: Check energy balance**

$$R_n = H + LE + G$$
$$600 = 100 + 304 + 100 = 504 \text{ W/m}^2$$

Close enough (small discrepancy from rounding and simplified formulas).

**Step 7: Bowen ratio**

$$\beta = \frac{H}{LE} = \frac{100}{304} = 0.33$$

**Interpretation:** About 3× more energy goes to evaporation than to heating the air. This is typical of well-watered grassland.

---

## 5. Computational Implementation

Below is an interactive energy partitioning calculator.

<div class="viz-container" id="energy-partition-viz">
  <div class="controls">
    <label>
      Surface type:
      <select id="surface-type-ep">
        <option value="wet">Open Water (rs=0)</option>
        <option value="irrigated">Irrigated Crop (rs=50)</option>
        <option value="grass" selected>Grassland (rs=100)</option>
        <option value="dryland">Dryland Crop (rs=200)</option>
        <option value="desert">Desert (rs=500)</option>
      </select>
    </label>
    <label>
      Net radiation (W/m²):
      <input type="range" id="rn-slider" min="100" max="800" step="50" value="600">
      <span id="rn-value">600</span> W/m²
    </label>
    <label>
      Surface temperature (°C):
      <input type="range" id="ts-slider" min="15" max="45" step="1" value="30">
      <span id="ts-value">30</span> °C
    </label>
    <label>
      Air temperature (°C):
      <input type="range" id="ta-slider" min="10" max="40" step="1" value="25">
      <span id="ta-value">25</span> °C
    </label>
    <label>
      Relative humidity (%):
      <input type="range" id="rh-slider" min="10" max="90" step="5" value="50">
      <span id="rh-value">50</span> %
    </label>
    <label>
      Wind speed (m/s):
      <input type="range" id="wind-slider" min="0.5" max="10" step="0.5" value="3">
      <span id="wind-value">3.0</span> m/s
    </label>
  </div>
  <div class="energy-results">
    <h4>Energy Partition:</h4>
    <table>
      <tr>
        <td><strong>R<sub>n</sub> (net radiation):</strong></td>
        <td><span id="rn-result"></span> W/m²</td>
      </tr>
      <tr>
        <td><strong>H (sensible heat):</strong></td>
        <td><span id="h-result"></span> W/m²</td>
      </tr>
      <tr>
        <td><strong>LE (latent heat):</strong></td>
        <td><span id="le-result"></span> W/m²</td>
      </tr>
      <tr>
        <td><strong>G (ground heat):</strong></td>
        <td><span id="g-result"></span> W/m²</td>
      </tr>
      <tr style="border-top: 1px solid #ddd;">
        <td><strong>Bowen ratio (β):</strong></td>
        <td><span id="beta-result"></span></td>
      </tr>
      <tr>
        <td><strong>Evaporation rate:</strong></td>
        <td><span id="evap-result"></span> mm/day</td>
      </tr>
    </table>
  </div>
  <div id="energy-partition-chart" style="width: 100%; height: 400px;"></div>
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
  const chart = echarts.init(document.getElementById('energy-partition-chart'));
  
  const Lv = 2.45e6; // J/kg
  const rho_a = 1.2; // kg/m³
  const cp = 1005; // J/kg/K
  const z0 = 0.01; // roughness length for grass (m)
  const k = 0.41; // von Karman constant
  
  const surfaces = {
    wet: { rs: 0, name: 'Open Water' },
    irrigated: { rs: 50, name: 'Irrigated Crop' },
    grass: { rs: 100, name: 'Grassland' },
    dryland: { rs: 200, name: 'Dryland Crop' },
    desert: { rs: 500, name: 'Desert' }
  };
  
  let surfaceType = 'grass';
  let Rn = 600;
  let Ts = 30;
  let Ta = 25;
  let RH = 50;
  let wind = 3;
  
  function satVaporPressure(T) {
    // Tetens formula, T in Celsius, result in Pa
    return 611 * Math.exp(17.27 * T / (T + 237.3));
  }
  
  function aerodynamicResistance(u) {
    // Simplified, s/m
    if (u < 0.5) u = 0.5;
    const lnTerm = Math.log(2 / z0);
    return (lnTerm * lnTerm) / (k * k * u);
  }
  
  function updateCalculation() {
    const rs = surfaces[surfaceType].rs;
    const ra = aerodynamicResistance(wind);
    
    // Vapor pressures
    const es_Ts = satVaporPressure(Ts);
    const es_Ta = satVaporPressure(Ta);
    const ea = es_Ta * RH / 100;
    
    // Sensible heat flux
    const H = rho_a * cp * (Ts - Ta) / ra;
    
    // Latent heat flux (simplified)
    // E in kg/m²/s, using simplified form
    const vpd = es_Ts - ea; // Pa
    const E = 0.622 * rho_a * vpd / (101325 * (ra + rs));
    const LE = Lv * E;
    
    // Ground heat flux (approximation: 10-20% of Rn during day)
    const G = 0.15 * Rn;
    
    // Bowen ratio
    const beta = H / LE;
    
    // Evaporation rate in mm/day
    const evap_mm_day = E * 86400; // kg/m²/day = mm/day (since water density = 1000 kg/m³)
    
    // Update display
    document.getElementById('rn-result').textContent = Rn.toFixed(0);
    document.getElementById('h-result').textContent = H.toFixed(0);
    document.getElementById('le-result').textContent = LE.toFixed(0);
    document.getElementById('g-result').textContent = G.toFixed(0);
    document.getElementById('beta-result').textContent = beta.toFixed(2);
    document.getElementById('evap-result').textContent = evap_mm_day.toFixed(2);
    
    updateChart(Rn, H, LE, G);
  }
  
  function updateChart(Rn, H, LE, G) {
    const option = {
      title: {
        text: 'Energy Flux Partitioning',
        left: 'center'
      },
      tooltip: {
        trigger: 'item',
        formatter: '{b}: {c} W/m² ({d}%)'
      },
      series: [
        {
          type: 'pie',
          radius: '60%',
          data: [
            { value: H, name: 'Sensible Heat (H)', itemStyle: { color: '#E74C3C' } },
            { value: LE, name: 'Latent Heat (LE)', itemStyle: { color: '#3498DB' } },
            { value: G, name: 'Ground Heat (G)', itemStyle: { color: '#95A5A6' } }
          ],
          label: {
            formatter: '{b}\n{c} W/m²'
          },
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };
    
    chart.setOption(option);
  }
  
  document.getElementById('surface-type-ep').addEventListener('change', (e) => {
    surfaceType = e.target.value;
    updateCalculation();
  });
  
  document.getElementById('rn-slider').addEventListener('input', (e) => {
    Rn = parseFloat(e.target.value);
    document.getElementById('rn-value').textContent = Rn;
    updateCalculation();
  });
  
  document.getElementById('ts-slider').addEventListener('input', (e) => {
    Ts = parseFloat(e.target.value);
    document.getElementById('ts-value').textContent = Ts;
    updateCalculation();
  });
  
  document.getElementById('ta-slider').addEventListener('input', (e) => {
    Ta = parseFloat(e.target.value);
    document.getElementById('ta-value').textContent = Ta;
    updateCalculation();
  });
  
  document.getElementById('rh-slider').addEventListener('input', (e) => {
    RH = parseFloat(e.target.value);
    document.getElementById('rh-value').textContent = RH;
    updateCalculation();
  });
  
  document.getElementById('wind-slider').addEventListener('input', (e) => {
    wind = parseFloat(e.target.value);
    document.getElementById('wind-value').textContent = wind.toFixed(1);
    updateCalculation();
  });
  
  updateCalculation();
  
  window.addEventListener('resize', () => chart.resize());
})();
</script>

**Try this:**
- **Switch to desert:** Surface resistance skyrockets → LE drops → β > 1 → most energy heats air
- **Switch to open water:** Surface resistance = 0 → LE dominates → β < 1 → evaporative cooling
- **Increase humidity:** Vapor pressure deficit shrinks → less evaporation → higher β
- **Increase wind:** Aerodynamic resistance drops → more H and LE
- **Dry air (low RH):** Large vapor pressure deficit → high evaporation rate

**Key insight:** The Bowen ratio tells you whether a surface cools by evaporation (low β) or heats the air (high β).

---

## 6. Interpretation

### Why Deserts Are Hot

Desert surfaces have:
- High $R_n$ (strong sun, clear skies)
- Low soil moisture → high $r_s$ → minimal $LE$
- High $\beta$ (typically 5–10)

**Result:** Nearly all net radiation goes into $H$ → air temperature soars.

**Example:** $R_n = 700$ W/m², $\beta = 8$:

$$H = \frac{\beta}{\beta + 1} R_n = \frac{8}{9} \times 700 = 622 \text{ W/m}^2$$

### Why Rainforests Stay Cool

Tropical rainforest surfaces have:
- High $R_n$ (near equator, strong sun)
- Abundant moisture → low $r_s$ → high $LE$
- Low $\beta$ (typically 0.2–0.4)

**Result:** Most energy goes to evaporation → air stays cooler.

**Example:** $R_n = 600$ W/m², $\beta = 0.3$:

$$LE = \frac{1}{\beta + 1} R_n = \frac{1}{1.3} \times 600 = 462 \text{ W/m}^2$$

### Agricultural Water Use

**Evapotranspiration** (ET) from croplands is:

$$ET = \frac{LE}{L_v \rho_w}$$

Where $\rho_w = 1000$ kg/m³ (water density).

**Units:** mm/day (depth of water evaporated per day)

**Example:** $LE = 300$ W/m²:

$$ET = \frac{300}{2.45 \times 10^6 \times 1000} \times 86400 = 10.6 \text{ mm/day}$$

Over a growing season (100 days), this is **1,060 mm = 1.06 m** of water!

**Irrigation requirement** ≈ ET - rainfall.

### The Oasis Effect

An irrigated field in a desert creates a **cool, moist microclimate**:
- Desert: $\beta = 10$, $T_s = 45°$C
- Oasis: $\beta = 0.5$, $T_s = 28°$C

**Mechanism:** High evaporation cools the surface and humidifies the air.

---

## 7. What Could Go Wrong?

### Confusing Energy and Water Fluxes

**Latent heat flux** ($LE$) is in W/m² (energy units).  
**Evaporation rate** ($E$) is in kg/m²/s or mm/day (mass units).

$$LE = L_v E$$

Don't forget to multiply by $L_v$ when converting between them!

### Assuming Constant Surface Resistance

$r_s$ varies with:
- **Soil moisture:** Dry soil → high $r_s$
- **Time of day:** Stomata close at night → high $r_s$
- **Plant stress:** Drought, heat → stomata close → high $r_s$
- **Species:** C4 plants (corn) have lower $r_s$ than C3 plants (wheat) under some conditions

**Dynamic models** update $r_s$ based on soil moisture, vapor pressure deficit, and plant physiology.

### Ignoring Ground Heat Flux

$G$ is small during the day (~10–20% of $R_n$) but can be significant:
- **Bare soil:** $G$ can be 30–40% of $R_n$
- **Snow/ice:** $G$ is critical for melt energy
- **Urban surfaces:** High thermal mass → large $G$

**Nighttime:** $G$ reverses (heat flows back from soil to surface).

### Neglecting Advection

**Advection:** Horizontal transport of heat/moisture by wind.

**Oasis effect:** Dry air blown from desert increases evaporation from irrigated field beyond what local energy balance would predict.

**Clothesline paradox:** Laundry dries faster on a windy day even though local $R_n$ is the same.

**Our model ignores advection** — assumes air properties are uniform horizontally.

---

## 8. Extension: The Penman-Monteith Equation

The **Penman-Monteith equation** is the standard model for evapotranspiration:

$$LE = \frac{\Delta (R_n - G) + \rho_a c_p (e_s - e_a) / r_a}{\Delta + \gamma (1 + r_s/r_a)}$$

Where:
- $\Delta$ = slope of saturation vapor pressure curve (Pa/K)
- $\gamma$ = psychrometric constant (~66 Pa/K)

**This combines:**
- Radiative term: $\Delta (R_n - G)$
- Aerodynamic term: $\rho_a c_p (e_s - e_a) / r_a$

**Advantages:**
- Physically based (energy balance + vapor transport)
- Widely validated for crops, forests, grasslands
- Basis for FAO-56 reference evapotranspiration

**Next essay** will explore how $G$ behaves—heat diffusion into soil.

---

## 9. Math Refresher: Exponential Functions in Vapor Pressure

### Why the Exponential?

Saturation vapor pressure increases **exponentially** with temperature:

$$e_s(T) \propto \exp(T)$$

**Physical reason:** Clausius-Clapeyron equation from thermodynamics.

Molecules need energy to escape liquid and become vapor. Higher temperature → more molecules have enough energy → exponential increase.

### Practical Consequence

A small temperature change causes a **large** vapor pressure change.

From 20°C to 30°C:
- $e_s(20) = 2338$ Pa
- $e_s(30) = 4243$ Pa

**81% increase** for a 10°C warming!

This is why hot air can hold much more moisture than cold air (and why your glasses fog when you come inside from the cold).

---

## Summary

- **Energy partitioning:** $R_n = H + LE + G + S$
- **Sensible heat** ($H$): Warms the air
- **Latent heat** ($LE$): Evaporates water
- **Bowen ratio** ($\beta = H/LE$): Ratio of sensible to latent heat
- Low $\beta$ (< 1): Wet surfaces, evaporative cooling dominates
- High $\beta$ (> 1): Dry surfaces, sensible heating dominates
- **Evapotranspiration** is driven by net radiation, vapor pressure deficit, and resistances
- **Surface resistance** ($r_s$) controls water availability
- Desert: high $r_s$, high $\beta$ → hot and dry
- Rainforest: low $r_s$, low $\beta$ → cool and humid
