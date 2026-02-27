---
layout: essay
title: "Net Radiation and Albedo"
subtitle: "Surface energy balance — how much solar energy stays at the ground?"
date: 2026-02-26
categories: [modeling]
series: computational-geography-lab
series_order: 17
cluster: G
cluster_title: "Surface Energy Balance"
tags:
  - computational-geography
  - modeling
  - energy-balance
  - radiation
  - albedo
  - climate
math: true
viz: true
difficulty: 3
math_core: [energy-balance, radiative-transfer, conservation-of-energy]
spatial_reasoning: 2
dynamics: 1
computation: 2
domain: [climatology, physical-geography, environmental-modeling]
excerpt: >
  Not all incoming solar radiation stays at Earth's surface. Some reflects back
  to space (determined by albedo), some is absorbed and warms the ground. This
  essay builds the net radiation budget: incoming shortwave, reflected shortwave,
  incoming longwave, and outgoing longwave. The balance determines surface heating.
math_prerequisites: >
  Basic algebra. Conservation of energy conceptually. We'll introduce the Stefan-
  Boltzmann law and show how temperature and radiation are connected.
---

## 1. The Question

How much solar energy actually warms the ground?

Sunlight arrives at Earth's surface. Some bounces off (reflection). Some is absorbed and heats the surface. The surface also radiates energy back to the atmosphere as infrared heat.

**The net radiation** is the difference between energy absorbed and energy lost. This net radiation drives all surface processes:
- Heating the soil and air
- Evaporating water
- Melting snow
- Photosynthesis

The mathematical question: How do we calculate net radiation from incoming solar radiation, surface properties, and temperature?

---

## 2. The Conceptual Model

### Four Radiation Streams

At Earth's surface, four radiation streams matter:

1. **Incoming shortwave** ($S_{\downarrow}$): Direct and diffuse solar radiation from the sun (visible and near-infrared, 0.3–3 μm wavelength)

2. **Reflected shortwave** ($S_{\uparrow}$): Solar radiation bounced back by the surface (same wavelengths)

3. **Incoming longwave** ($L_{\downarrow}$): Infrared radiation emitted downward by the atmosphere (thermal radiation, 3–100 μm wavelength)

4. **Outgoing longwave** ($L_{\uparrow}$): Infrared radiation emitted upward by the surface (thermal radiation)

**Net radiation:**

$$R_n = (S_{\downarrow} - S_{\uparrow}) + (L_{\downarrow} - L_{\uparrow})$$

Or equivalently:

$$R_n = \text{Net shortwave} + \text{Net longwave}$$

### Shortwave vs. Longwave

**Shortwave (solar):**
- Originates from the sun (temperature ~5,800 K)
- Peak wavelength ~0.5 μm (green visible light)
- Intensity varies with time of day, season, cloudiness
- Measured in W/m² (watts per square meter)

**Longwave (thermal infrared):**
- Originates from Earth's surface and atmosphere (temperature ~200–300 K)
- Peak wavelength ~10 μm (thermal infrared, invisible to the eye)
- Present day and night (doesn't require sunlight)
- Measured in W/m²

**Why separate them?** Different physics. Shortwave is controlled by **albedo** (surface color). Longwave is controlled by **temperature** (Stefan-Boltzmann law).

---

## 3. Building the Mathematical Model

### Net Shortwave Radiation

**Albedo** ($\alpha$) is the fraction of incoming solar radiation that is reflected:

$$\alpha = \frac{S_{\uparrow}}{S_{\downarrow}}$$

Albedo ranges from 0 (perfectly absorbing, black) to 1 (perfectly reflecting, mirror).

**Reflected shortwave:**

$$S_{\uparrow} = \alpha \cdot S_{\downarrow}$$

**Net shortwave** (absorbed):

$$S_{\text{net}} = S_{\downarrow} - S_{\uparrow} = S_{\downarrow}(1 - \alpha)$$

**Examples of albedo:**

| Surface | Albedo ($\alpha$) |
|---------|-------------------|
| Fresh snow | 0.80–0.95 |
| Old snow | 0.40–0.70 |
| Sea ice | 0.50–0.70 |
| Desert sand | 0.30–0.40 |
| Grassland | 0.15–0.25 |
| Deciduous forest | 0.15–0.20 |
| Conifer forest | 0.05–0.15 |
| Ocean | 0.06–0.10 |
| Asphalt | 0.05–0.10 |

**Key insight:** Dark surfaces (forests, oceans) absorb most solar radiation. Light surfaces (snow, ice) reflect most.

### Stefan-Boltzmann Law

The **Stefan-Boltzmann Law** relates temperature to thermal radiation emitted by a surface:

$$E = \sigma T^4$$

Where:
- $E$ is emitted radiation (W/m²)
- $\sigma = 5.67 \times 10^{-8}$ W/m²/K⁴ (Stefan-Boltzmann constant)
- $T$ is absolute temperature (Kelvin)

**Example:** A surface at 15°C = 288 K emits:

$$E = 5.67 \times 10^{-8} \times (288)^4 = 390 \text{ W/m}^2$$

**This is a LOT of energy** — comparable to incoming solar radiation!

### Emissivity Correction

Real surfaces are not perfect "blackbodies." They emit less than the theoretical maximum.

**Emissivity** ($\varepsilon$) is the ratio of actual emission to blackbody emission (0 ≤ ε ≤ 1).

**Actual emission:**

$$L_{\uparrow} = \varepsilon \sigma T_s^4$$

Where $T_s$ is the surface temperature.

**Typical emissivities:**
- Water: ε ≈ 0.95–0.98
- Vegetation: ε ≈ 0.95–0.99
- Soil: ε ≈ 0.90–0.95
- Snow: ε ≈ 0.98–0.99

Most natural surfaces have high emissivity (ε > 0.9) in the thermal infrared.

### Incoming Longwave from Atmosphere

The atmosphere emits downward infrared radiation. This depends on:
- **Air temperature** (warmer air emits more)
- **Water vapor content** (water vapor is a strong greenhouse gas)
- **Cloud cover** (clouds emit strongly; cloudy nights are warmer)

**Simple approximation (clear sky):**

$$L_{\downarrow} = \varepsilon_a \sigma T_a^4$$

Where:
- $\varepsilon_a$ is the **effective emissivity of the atmosphere** (typically 0.7–0.9)
- $T_a$ is air temperature (K)

**With clouds:** $L_{\downarrow}$ increases, approaching $\sigma T_a^4$ for complete overcast.

### Net Radiation Formula

Combining all four streams:

$$R_n = S_{\downarrow}(1 - \alpha) + L_{\downarrow} - \varepsilon \sigma T_s^4$$

**Interpretation:**
- First term: absorbed solar radiation
- Second term: atmospheric infrared warming
- Third term: surface infrared cooling

**Day vs. Night:**
- **Daytime:** $S_{\downarrow}$ large → $R_n$ typically positive (surface gains energy)
- **Nighttime:** $S_{\downarrow} = 0$ → $R_n = L_{\downarrow} - L_{\uparrow}$ typically negative (surface loses energy)

---

## 4. Worked Example by Hand

**Problem:** A grassland surface has:
- Albedo: $\alpha = 0.20$
- Emissivity: $\varepsilon = 0.96$
- Surface temperature: $T_s = 25°\text{C} = 298$ K
- Air temperature: $T_a = 20°\text{C} = 293$ K
- Atmospheric emissivity: $\varepsilon_a = 0.80$ (clear sky)
- Incoming solar radiation: $S_{\downarrow} = 800$ W/m² (midday sun)

Calculate the net radiation.

### Solution

**Net shortwave:**

$$S_{\text{net}} = S_{\downarrow}(1 - \alpha) = 800 \times (1 - 0.20) = 800 \times 0.80 = 640 \text{ W/m}^2$$

**Incoming longwave:**

$$L_{\downarrow} = \varepsilon_a \sigma T_a^4 = 0.80 \times 5.67 \times 10^{-8} \times (293)^4$$

$$= 0.80 \times 5.67 \times 10^{-8} \times 7.357 \times 10^9 = 334 \text{ W/m}^2$$

**Outgoing longwave:**

$$L_{\uparrow} = \varepsilon \sigma T_s^4 = 0.96 \times 5.67 \times 10^{-8} \times (298)^4$$

$$= 0.96 \times 5.67 \times 10^{-8} \times 7.880 \times 10^9 = 429 \text{ W/m}^2$$

**Net longwave:**

$$L_{\text{net}} = L_{\downarrow} - L_{\uparrow} = 334 - 429 = -95 \text{ W/m}^2$$

(Negative because surface radiates more than it receives from atmosphere)

**Total net radiation:**

$$R_n = S_{\text{net}} + L_{\text{net}} = 640 + (-95) = 545 \text{ W/m}^2$$

**Interpretation:** The surface gains 545 W/m² during midday. This energy heats the ground, the air, and drives evaporation.

---

## 5. Computational Implementation

Below is an interactive radiation balance calculator.

<div class="viz-container" id="radiation-viz">
  <div class="controls">
    <label>
      Surface type:
      <select id="surface-type">
        <option value="snow">Fresh Snow (α=0.85)</option>
        <option value="sand">Desert Sand (α=0.35)</option>
        <option value="grass" selected>Grassland (α=0.20)</option>
        <option value="forest">Conifer Forest (α=0.10)</option>
        <option value="ocean">Ocean (α=0.08)</option>
      </select>
    </label>
    <label>
      Solar radiation (W/m²):
      <input type="range" id="solar-slider" min="0" max="1200" step="50" value="800">
      <span id="solar-value">800</span> W/m²
    </label>
    <label>
      Surface temperature (°C):
      <input type="range" id="surf-temp-slider" min="-20" max="40" step="1" value="25">
      <span id="surf-temp-value">25</span> °C
    </label>
    <label>
      Air temperature (°C):
      <input type="range" id="air-temp-slider" min="-20" max="40" step="1" value="20">
      <span id="air-temp-value">20</span> °C
    </label>
    <label>
      Cloud cover:
      <input type="range" id="cloud-slider" min="0" max="1" step="0.1" value="0">
      <span id="cloud-value">0.0</span> (0=clear, 1=overcast)
    </label>
  </div>
  <div class="radiation-results">
    <h4>Energy Balance:</h4>
    <table>
      <tr>
        <td><strong>S↓ (incoming solar):</strong></td>
        <td><span id="s-down"></span> W/m²</td>
      </tr>
      <tr>
        <td><strong>S↑ (reflected):</strong></td>
        <td><span id="s-up"></span> W/m²</td>
      </tr>
      <tr style="border-top: 1px solid #ddd;">
        <td><strong>Net shortwave:</strong></td>
        <td><span id="s-net"></span> W/m²</td>
      </tr>
      <tr>
        <td><strong>L↓ (atmospheric IR):</strong></td>
        <td><span id="l-down"></span> W/m²</td>
      </tr>
      <tr>
        <td><strong>L↑ (surface IR):</strong></td>
        <td><span id="l-up"></span> W/m²</td>
      </tr>
      <tr style="border-top: 1px solid #ddd;">
        <td><strong>Net longwave:</strong></td>
        <td><span id="l-net"></span> W/m²</td>
      </tr>
      <tr style="border-top: 2px solid #333;">
        <td><strong>Net radiation (Rn):</strong></td>
        <td><span id="r-net" style="font-weight: bold;"></span> W/m²</td>
      </tr>
    </table>
  </div>
  <div id="radiation-chart" style="width: 100%; height: 400px;"></div>
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
  const chart = echarts.init(document.getElementById('radiation-chart'));
  
  const sigma = 5.67e-8; // W/m²/K⁴
  
  const surfaces = {
    snow: { albedo: 0.85, emissivity: 0.99, name: 'Fresh Snow' },
    sand: { albedo: 0.35, emissivity: 0.92, name: 'Desert Sand' },
    grass: { albedo: 0.20, emissivity: 0.96, name: 'Grassland' },
    forest: { albedo: 0.10, emissivity: 0.97, name: 'Conifer Forest' },
    ocean: { albedo: 0.08, emissivity: 0.96, name: 'Ocean' }
  };
  
  let surfaceType = 'grass';
  let solarRad = 800;
  let surfTemp = 25;
  let airTemp = 20;
  let cloudCover = 0;
  
  function updateCalculation() {
    const surface = surfaces[surfaceType];
    const alpha = surface.albedo;
    const epsilon = surface.emissivity;
    
    // Convert to Kelvin
    const Ts = surfTemp + 273.15;
    const Ta = airTemp + 273.15;
    
    // Shortwave
    const sDown = solarRad;
    const sUp = alpha * sDown;
    const sNet = sDown - sUp;
    
    // Longwave
    // Atmospheric emissivity increases with clouds (0.7 clear -> 1.0 overcast)
    const epsAtm = 0.70 + 0.30 * cloudCover;
    const lDown = epsAtm * sigma * Math.pow(Ta, 4);
    const lUp = epsilon * sigma * Math.pow(Ts, 4);
    const lNet = lDown - lUp;
    
    // Net radiation
    const rNet = sNet + lNet;
    
    // Update display
    document.getElementById('s-down').textContent = sDown.toFixed(0);
    document.getElementById('s-up').textContent = sUp.toFixed(0);
    document.getElementById('s-net').textContent = sNet.toFixed(0);
    document.getElementById('l-down').textContent = lDown.toFixed(0);
    document.getElementById('l-up').textContent = lUp.toFixed(0);
    document.getElementById('l-net').textContent = lNet.toFixed(0);
    
    const rNetElem = document.getElementById('r-net');
    rNetElem.textContent = rNet.toFixed(0);
    rNetElem.style.color = rNet > 0 ? 'green' : 'red';
    
    updateChart(sDown, sUp, lDown, lUp, rNet);
  }
  
  function updateChart(sDown, sUp, lDown, lUp, rNet) {
    const option = {
      title: {
        text: 'Radiation Balance',
        left: 'center'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' }
      },
      legend: {
        data: ['Incoming', 'Outgoing', 'Net'],
        top: 30
      },
      grid: {
        left: 80,
        right: 40,
        top: 80,
        bottom: 60
      },
      xAxis: {
        type: 'category',
        data: ['Shortwave', 'Longwave', 'Total']
      },
      yAxis: {
        type: 'value',
        name: 'Radiation (W/m²)',
        nameLocation: 'middle',
        nameGap: 50
      },
      series: [
        {
          name: 'Incoming',
          type: 'bar',
          data: [sDown, lDown, sDown + lDown],
          itemStyle: { color: '#F39C12' }
        },
        {
          name: 'Outgoing',
          type: 'bar',
          data: [-sUp, -lUp, -(sUp + lUp)],
          itemStyle: { color: '#3498DB' }
        },
        {
          name: 'Net',
          type: 'bar',
          data: [sDown - sUp, lDown - lUp, rNet],
          itemStyle: { color: '#2ECC71' }
        }
      ]
    };
    
    chart.setOption(option);
  }
  
  document.getElementById('surface-type').addEventListener('change', (e) => {
    surfaceType = e.target.value;
    updateCalculation();
  });
  
  document.getElementById('solar-slider').addEventListener('input', (e) => {
    solarRad = parseFloat(e.target.value);
    document.getElementById('solar-value').textContent = solarRad;
    updateCalculation();
  });
  
  document.getElementById('surf-temp-slider').addEventListener('input', (e) => {
    surfTemp = parseFloat(e.target.value);
    document.getElementById('surf-temp-value').textContent = surfTemp;
    updateCalculation();
  });
  
  document.getElementById('air-temp-slider').addEventListener('input', (e) => {
    airTemp = parseFloat(e.target.value);
    document.getElementById('air-temp-value').textContent = airTemp;
    updateCalculation();
  });
  
  document.getElementById('cloud-slider').addEventListener('input', (e) => {
    cloudCover = parseFloat(e.target.value);
    document.getElementById('cloud-value').textContent = cloudCover.toFixed(1);
    updateCalculation();
  });
  
  updateCalculation();
  
  window.addEventListener('resize', () => chart.resize());
})();
</script>

**Try this:**
- **Switch to snow:** Albedo jumps to 0.85 → most solar radiation reflects → low net shortwave
- **Set solar to 0 (nighttime):** Net radiation goes negative (surface cools by IR emission)
- **Add clouds:** Incoming longwave increases → net radiation less negative at night
- **Ocean vs. forest:** Dark surfaces absorb more solar → higher net radiation

**Key insight:** Albedo dominates daytime energy balance. Temperature dominates nighttime balance.

---

## 6. Interpretation

### Daytime Energy Gain

During the day, $S_{\downarrow}$ is large. For most surfaces:

$$R_n \approx S_{\downarrow}(1 - \alpha) + (L_{\downarrow} - L_{\uparrow})$$

**Net radiation is positive** → surface warms.

**Example:** Grassland at solar noon ($S_{\downarrow} = 1000$ W/m², $\alpha = 0.20$):

$$S_{\text{net}} = 1000 \times 0.80 = 800 \text{ W/m}^2$$

Even with longwave cooling (−100 W/m²), net radiation is ~700 W/m².

### Nighttime Energy Loss

At night, $S_{\downarrow} = 0$. Net radiation simplifies to:

$$R_n = L_{\downarrow} - L_{\uparrow}$$

**Typically negative** (surface cools).

**Clear night** (low $L_{\downarrow}$): Strong cooling → frost possible  
**Cloudy night** (high $L_{\downarrow}$): Weak cooling → warmer

**This is why frost forms on clear nights!** Clouds act like a blanket, re-radiating surface heat back down.

### Albedo Feedback

**Snow-albedo feedback** is a major climate amplifier:

1. Warming melts snow
2. Dark ground exposed (lower albedo)
3. More solar absorption
4. More warming
5. More melting (positive feedback loop)

**Arctic amplification:** Polar regions warm faster than tropics partly due to this feedback.

### Global Energy Balance

**Earth's average albedo:** $\alpha \approx 0.30$ (clouds 0.50, oceans 0.08, land ~0.15 average)

**Incoming solar** (top of atmosphere): ~1361 W/m²  
**After reflection:** $1361 \times 0.70 = 953$ W/m² absorbed

This absorbed energy must be balanced by outgoing longwave radiation to maintain stable temperature.

**Greenhouse effect:** Atmosphere absorbs some $L_{\uparrow}$, emits $L_{\downarrow}$ back → surface warmer than it would be without an atmosphere.

---

## 7. What Could Go Wrong?

### Confusing Albedo and Emissivity

**Albedo** ($\alpha$) applies to **shortwave** (solar) radiation (0.3–3 μm).  
**Emissivity** ($\varepsilon$) applies to **longwave** (thermal IR) radiation (3–100 μm).

A surface can have **low albedo** (dark, absorbs solar) but **high emissivity** (efficient IR radiator).

**Example:** Vegetation is dark (α ~ 0.15) but radiates efficiently (ε ~ 0.97).

### Neglecting Spectral Variation

Real albedo varies with **wavelength**. Snow reflects visible light (appears white) but absorbs some near-infrared.

**Broadband albedo** (used here) is the average over all solar wavelengths. More sophisticated models use **spectral albedo** (albedo as a function of wavelength).

### Assuming Constant Albedo

Albedo changes with:
- **Sun angle:** Ocean albedo increases when sun is low (more glint reflection)
- **Moisture:** Wet soil is darker than dry soil
- **Snow age:** Fresh snow (α = 0.9) → old snow (α = 0.5) as it compacts and collects dirt
- **Vegetation state:** Green leaves (α ~ 0.20) → dry leaves (α ~ 0.30)

### Ignoring 3D Geometry

Our model assumes a **flat, horizontal surface**. Real terrain has:
- **Slopes:** Affect solar angle (Essay 6 covered this)
- **Shading:** Mountains cast shadows
- **Multiple reflections:** Light bounces between surfaces (canyon walls, forest canopy)

### Forgetting Units

Temperature must be in **Kelvin** for Stefan-Boltzmann:

$$L_{\uparrow} = \varepsilon \sigma T^4$$

If you use Celsius, you'll get nonsense results!

**Conversion:** $T_K = T_C + 273.15$

---

## 8. Extension: Surface Energy Partitioning

Net radiation doesn't all go into warming the ground. It's partitioned among:

$$R_n = H + LE + G + S$$

Where:
- $H$ = **Sensible heat flux** (heating the air)
- $LE$ = **Latent heat flux** (evaporating water; $E$ is evaporation rate, $L$ is latent heat)
- $G$ = **Ground heat flux** (heating the soil)
- $S$ = **Storage** (heating biomass, water bodies)

**Next essay** will explore how $R_n$ is partitioned between sensible and latent heat — the foundation of evapotranspiration modeling.

---

## 9. Math Refresher: Fourth Powers

### Why T⁴?

The Stefan-Boltzmann law comes from **Planck's law** integrated over all wavelengths.

**Physical origin:** Hotter objects emit:
- More total energy (T⁴ dependence)
- At shorter wavelengths (peak shifts to blue for hot objects, red for cool)

**Wien's displacement law:** Peak wavelength $\lambda_{\text{max}} \propto 1/T$

**Sun** (T ≈ 5800 K): peaks at 0.5 μm (green visible light)  
**Earth** (T ≈ 288 K): peaks at 10 μm (thermal infrared)

### Computing Fourth Powers

$$288^4 = 288 \times 288 \times 288 \times 288$$

Easier method:

$$288^4 = (288^2)^2 = (82944)^2 = 6,879,707,136$$

Then multiply by $\sigma = 5.67 \times 10^{-8}$:

$$E = 5.67 \times 10^{-8} \times 6.88 \times 10^9 = 390 \text{ W/m}^2$$

### Small Temperature Changes

For a small change $\Delta T$ around temperature $T$:

$$\Delta E \approx 4\sigma T^3 \Delta T$$

**Example:** At T = 288 K, a 1 K increase:

$$\Delta E = 4 \times 5.67 \times 10^{-8} \times (288)^3 \times 1 = 5.4 \text{ W/m}^2$$

Surface emission increases by 5.4 W/m² per degree warming.

---

## Summary

- **Net radiation:** $R_n = (S_{\downarrow} - S_{\uparrow}) + (L_{\downarrow} - L_{\uparrow})$
- **Albedo** ($\alpha$): Fraction of solar radiation reflected (0.05 for forests, 0.90 for fresh snow)
- **Stefan-Boltzmann law:** $E = \varepsilon \sigma T^4$ relates temperature to thermal emission
- **Daytime:** Net radiation usually positive (surface gains energy)
- **Nighttime:** Net radiation usually negative (surface cools by IR emission)
- **Clouds increase** $L_{\downarrow}$ → reduce nighttime cooling
- Net radiation drives all surface energy processes (heating, evaporation, photosynthesis)

**Next:** In Essay 18, we partition net radiation into sensible and latent heat fluxes — the **Bowen ratio** and the physics of evapotranspiration.

---
