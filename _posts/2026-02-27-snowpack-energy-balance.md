---
layout: essay
title: "Snowpack Energy Balance"
subtitle: "How snow gains and loses energy—the foundation of melt modeling"
date: 2026-02-27
categories: [modeling]
series: computational-geography-cryosphere
series_order: 1
cluster: P
cluster_title: "Snow Physics & Modeling"
tags:
  - computational-geography
  - modeling
  - cryosphere
  - snow
  - energy-balance
  - hydrology
  - climate
math: true
viz: true
difficulty: 4
math_core: [energy-balance, radiation-transfer, heat-flux, phase-change]
spatial_reasoning: 2
dynamics: 3
computation: 3
domain: [hydrology, climatology, cryosphere, water-resources]
excerpt: >
  When does snow melt? How much water will the snowpack release? The snowpack energy
  balance governs accumulation, metamorphism, and melt. This essay derives the full
  energy budget—shortwave and longwave radiation, sensible and latent heat, ground
  heat flux, and phase change energy—showing how each component drives snow evolution.
math_prerequisites: >
  Surface energy balance (Essay 17). Solar geometry (Essay 6). Stefan-Boltzmann law.
  We'll introduce snow-specific physics: high albedo, metamorphism, and melt processes.
---

## 1. The Question

Why does snow melt faster on sunny spring days even when air temperature is below freezing?

**Snow is a dynamic system** that gains and loses energy through multiple pathways:

**Energy inputs:**
- ☀️ Shortwave radiation (solar)
- 🌥️ Longwave radiation (atmospheric/cloud)
- 🌡️ Sensible heat (warm air)
- 💧 Latent heat (condensation)
- 🌍 Ground heat flux (from soil below)

**Energy outputs:**
- ❄️ Longwave emission (snow surface)
- 🌡️ Sensible heat (to cold air)
- 💨 Latent heat (sublimation/evaporation)
- 💧 Melt (phase change requires 334 kJ/kg!)

The mathematical question: How do we quantify each energy flux and determine when the snowpack reaches 0°C and begins melting?

---

## 2. The Conceptual Model

### Energy Balance Equation

**At the snow surface:**

$$Q_{\text{net}} = Q_{\text{SW}}^{\downarrow} - Q_{\text{SW}}^{\uparrow} + Q_{\text{LW}}^{\downarrow} - Q_{\text{LW}}^{\uparrow} + Q_H + Q_E + Q_G$$

Where:
- $Q_{\text{SW}}^{\downarrow}$ = Incoming shortwave radiation (W/m²)
- $Q_{\text{SW}}^{\uparrow}$ = Reflected shortwave (high albedo!)
- $Q_{\text{LW}}^{\downarrow}$ = Incoming longwave (from atmosphere)
- $Q_{\text{LW}}^{\uparrow}$ = Outgoing longwave (snow emits strongly)
- $Q_H$ = Sensible heat flux (convection)
- $Q_E$ = Latent heat flux (sublimation/evaporation)
- $Q_G$ = Ground heat flux (from soil)

**Net energy determines:**
- $Q_{\text{net}} < 0$: Snowpack cools (energy loss)
- $Q_{\text{net}} > 0$ and $T_{\text{snow}} < 0°C$: Snowpack warms
- $Q_{\text{net}} > 0$ and $T_{\text{snow}} = 0°C$: **Melt occurs**

### Phase Change

**Melting requires latent heat of fusion:**

$$L_f = 334 \text{ kJ/kg} = 334,000 \text{ J/kg}$$

**Melt rate:**

$$M = \frac{Q_{\text{net}}}{L_f \rho_w}$$

Where:
- $M$ = melt rate (m/s)
- $\rho_w$ = density of water (1000 kg/m³)

**Example:** $Q_{\text{net}} = 200$ W/m² → $M = 200 / (334000 \times 1000) = 6 \times 10^{-7}$ m/s = **0.05 mm/hour**

### Snow Albedo

**Critical parameter:** Fresh snow reflects 80-95% of solar radiation!

$$\alpha = \frac{Q_{\text{SW}}^{\uparrow}}{Q_{\text{SW}}^{\downarrow}}$$

**Typical values:**
- Fresh snow: $\alpha = 0.80-0.95$
- Old snow: $\alpha = 0.60-0.75$
- Dirty snow: $\alpha = 0.40-0.60$
- Wet snow: $\alpha = 0.50-0.70$

**Albedo decay:**

$$\alpha(t) = \alpha_{\min} + (\alpha_0 - \alpha_{\min})e^{-kt}$$

Where $k \approx 0.01-0.05$ day⁻¹ (aging rate).

**Temperature effect:**

$$\alpha = \alpha_{\text{cold}} - 0.008 \times T_{\text{surface}} \quad \text{(when } T > -10°C\text{)}$$

---

## 3. Building the Mathematical Model

### Shortwave Radiation Balance

**Incoming at surface:**

$$Q_{\text{SW}}^{\downarrow} = I_0 \cos(\theta_z) \tau_{\text{atm}}$$

Where:
- $I_0$ = Solar constant (1361 W/m²)
- $\theta_z$ = Solar zenith angle
- $\tau_{\text{atm}}$ = Atmospheric transmissivity (~0.7)

**Reflected:**

$$Q_{\text{SW}}^{\uparrow} = \alpha \times Q_{\text{SW}}^{\downarrow}$$

**Net shortwave (absorbed):**

$$Q_{\text{SW,net}} = (1 - \alpha) Q_{\text{SW}}^{\downarrow}$$

**Key insight:** High albedo means most solar energy reflected → slow daytime melt.

### Longwave Radiation Balance

**Incoming from atmosphere:**

$$Q_{\text{LW}}^{\downarrow} = \varepsilon_{\text{atm}} \sigma T_{\text{air}}^4$$

**Atmospheric emissivity** (clear sky):

$$\varepsilon_{\text{atm}} = 0.605 + 0.048\sqrt{e_a}$$

Where $e_a$ = vapor pressure (Pa).

**Cloud effect:**

$$\varepsilon_{\text{cloudy}} = \varepsilon_{\text{clear}} + 0.26 \times C$$

Where $C$ = cloud fraction (0-1).

**Outgoing from snow:**

$$Q_{\text{LW}}^{\uparrow} = \varepsilon_{\text{snow}} \sigma T_{\text{surface}}^4$$

Where $\varepsilon_{\text{snow}} \approx 0.97-0.99$ (snow is nearly a blackbody emitter!).

**Net longwave:**

$$Q_{\text{LW,net}} = Q_{\text{LW}}^{\downarrow} - Q_{\text{LW}}^{\uparrow}$$

**Typically:** $Q_{\text{LW,net}} < 0$ at night (snow radiates energy, cools).

### Sensible Heat Flux

**Turbulent heat transfer** from air to snow:

$$Q_H = \rho_{\text{air}} c_p C_H u (T_{\text{air}} - T_{\text{surface}})$$

Where:
- $\rho_{\text{air}}$ = air density (1.25 kg/m³)
- $c_p$ = specific heat of air (1005 J/(kg·K))
- $C_H$ = bulk transfer coefficient (~0.002)
- $u$ = wind speed (m/s)
- $T_{\text{air}} - T_{\text{surface}}$ = temperature gradient

**Positive when:** Air warmer than snow → energy input  
**Negative when:** Air colder than snow → energy loss

**Wind effect:** Higher wind → stronger turbulent transfer.

### Latent Heat Flux

**Phase change energy:**

$$Q_E = \rho_{\text{air}} L_v C_E u (q_{\text{air}} - q_{\text{surface}})$$

Where:
- $L_v$ = latent heat of vaporization/sublimation (2.5 MJ/kg)
- $C_E$ = moisture transfer coefficient (~0.002)
- $q$ = specific humidity (kg/kg)

**Sublimation** (solid → vapor): Requires $L_s = 2.834$ MJ/kg

**Evaporation** (liquid → vapor): Requires $L_v = 2.5$ MJ/kg

**Condensation:** $Q_E > 0$ (energy input when moist air condenses on snow)  
**Sublimation:** $Q_E < 0$ (energy loss, snow mass lost to atmosphere)

### Ground Heat Flux

**Conduction from soil:**

$$Q_G = -k_{\text{soil}} \frac{\partial T}{\partial z}$$

Where $k_{\text{soil}} \approx 0.5-2$ W/(m·K).

**Typical magnitude:** 5-20 W/m² (small compared to radiation).

**Direction:**
- Early winter: Warm soil → energy input to snowpack
- Late winter: Cold soil → energy loss from base

---

## 4. Worked Example by Hand

**Problem:** Calculate net energy balance for snowpack on sunny spring day.

**Conditions:**
- Solar radiation: $Q_{\text{SW}}^{\downarrow} = 600$ W/m²
- Snow albedo: $\alpha = 0.75$ (old snow)
- Air temperature: $T_{\text{air}} = 5°C = 278$ K
- Snow surface temperature: $T_{\text{surface}} = 0°C = 273$ K
- Wind speed: $u = 3$ m/s
- Relative humidity: 60%
- Cloud cover: 20%
- Ground heat flux: $Q_G = 10$ W/m²

Calculate: Is snow melting? If so, how fast?

### Solution

**Step 1: Shortwave balance**

$$Q_{\text{SW,net}} = (1 - 0.75) \times 600 = 0.25 \times 600 = 150 \text{ W/m}^2$$

**Step 2: Longwave balance**

Vapor pressure (approximate): $e_a \approx 850$ Pa (60% RH at 5°C)

$$\varepsilon_{\text{clear}} = 0.605 + 0.048\sqrt{850} = 0.605 + 1.40 = 0.756$$

$$\varepsilon_{\text{cloudy}} = 0.756 + 0.26 \times 0.2 = 0.808$$

$$Q_{\text{LW}}^{\downarrow} = 0.808 \times 5.67 \times 10^{-8} \times 278^4 = 305 \text{ W/m}^2$$

$$Q_{\text{LW}}^{\uparrow} = 0.98 \times 5.67 \times 10^{-8} \times 273^4 = 315 \text{ W/m}^2$$

$$Q_{\text{LW,net}} = 305 - 315 = -10 \text{ W/m}^2$$

**Step 3: Sensible heat**

$$Q_H = 1.25 \times 1005 \times 0.002 \times 3 \times (278 - 273)$$

$$= 1.25 \times 1005 \times 0.002 \times 3 \times 5 = 37.7 \text{ W/m}^2$$

**Step 4: Latent heat** (assume negligible for simplicity)

$$Q_E \approx 0 \text{ W/m}^2$$

**Step 5: Net energy**

$$Q_{\text{net}} = 150 + (-10) + 37.7 + 0 + 10 = 187.7 \text{ W/m}^2$$

**Step 6: Melt rate**

$$M = \frac{187.7}{334000 \times 1000} = 5.6 \times 10^{-7} \text{ m/s}$$

$$M = 5.6 \times 10^{-7} \times 3600 = 0.002 \text{ m/hour} = 2 \text{ mm/hour}$$

**Conclusion:** Snow **IS melting** at 2 mm/hour.

**Energy breakdown:**
- Absorbed solar: 150 W/m² (80% of total)
- Sensible heat: 38 W/m² (20%)
- Net longwave: -10 W/m² (radiative cooling)
- Ground heat: 10 W/m²

**Key insight:** Even though air is only 5°C, strong solar absorption drives melt!

---

## 5. Computational Implementation

Below is an interactive snowpack energy balance calculator.

<div class="viz-container" id="snowpack-viz">
  <div class="controls">
    <label>
      Solar radiation (W/m²):
      <input type="range" id="solar-rad" min="0" max="1000" step="50" value="600">
      <span id="solar-val">600</span>
    </label>
    <label>
      Snow albedo:
      <input type="range" id="albedo" min="0.4" max="0.95" step="0.05" value="0.75">
      <span id="albedo-val">0.75</span>
    </label>
    <label>
      Air temperature (°C):
      <input type="range" id="air-temp" min="-20" max="15" step="1" value="5">
      <span id="air-temp-val">5</span>
    </label>
    <label>
      Wind speed (m/s):
      <input type="range" id="wind-speed" min="0" max="10" step="0.5" value="3">
      <span id="wind-val">3.0</span>
    </label>
    <label>
      Cloud cover (%):
      <input type="range" id="cloud-cover" min="0" max="100" step="10" value="20">
      <span id="cloud-val">20</span>
    </label>
  </div>
  <div id="snowpack-canvas-container">
    <canvas id="snowpack-canvas" width="700" height="400" style="border: 1px solid #ddd;"></canvas>
  </div>
  <div class="snowpack-info">
    <p><strong>Net energy:</strong> <span id="net-energy">--</span> W/m²</p>
    <p><strong>Melt rate:</strong> <span id="melt-rate">--</span> mm/hour</p>
    <p><strong>Status:</strong> <span id="snow-status">--</span></p>
  </div>
</div>

<script type="module">
(function() {
  const canvas = document.getElementById('snowpack-canvas');
  const ctx = canvas.getContext('2d');
  
  let solarRad = 600;
  let albedo = 0.75;
  let airTemp = 5;
  let windSpeed = 3.0;
  let cloudCover = 0.2;
  
  const sigma = 5.67e-8; // Stefan-Boltzmann
  const Lf = 334000; // Latent heat of fusion (J/kg)
  const rhoWater = 1000; // Water density (kg/m³)
  
  function calculateEnergyBalance() {
    const Tsurface = 273.15; // Snow at 0°C
    const Tair = airTemp + 273.15;
    
    // Shortwave
    const QswDown = solarRad;
    const QswUp = albedo * QswDown;
    const QswNet = QswDown - QswUp;
    
    // Longwave
    const vaporPressure = 611 * Math.exp(17.27 * airTemp / (airTemp + 237.3));
    const epsAtmClear = 0.605 + 0.048 * Math.sqrt(vaporPressure);
    const epsAtm = epsAtmClear + 0.26 * cloudCover;
    
    const QlwDown = epsAtm * sigma * Math.pow(Tair, 4);
    const QlwUp = 0.98 * sigma * Math.pow(Tsurface, 4);
    const QlwNet = QlwDown - QlwUp;
    
    // Sensible heat
    const rhoAir = 1.25;
    const cp = 1005;
    const CH = 0.002;
    const QH = rhoAir * cp * CH * windSpeed * (Tair - Tsurface);
    
    // Latent heat (simplified, assume small)
    const QE = 0;
    
    // Ground heat (assume constant small input)
    const QG = 10;
    
    // Net energy
    const Qnet = QswNet + QlwNet + QH + QE + QG;
    
    // Melt rate
    let meltRate = 0;
    let status = '';
    
    if (Qnet > 0) {
      meltRate = (Qnet / (Lf * rhoWater)) * 3600 * 1000; // mm/hour
      status = 'MELTING';
    } else if (Qnet < 0) {
      status = 'Cooling/Refreezing';
    } else {
      status = 'Stable at 0°C';
    }
    
    return {
      QswNet, QlwNet, QH, QE, QG, Qnet,
      QswDown, QswUp, QlwDown, QlwUp,
      meltRate, status
    };
  }
  
  function drawEnergyFluxes(result) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const centerX = 350;
    const centerY = 200;
    const snowWidth = 200;
    const snowHeight = 40;
    
    // Draw snow surface
    ctx.fillStyle = '#ECEFF1';
    ctx.strokeStyle = '#90A4AE';
    ctx.lineWidth = 2;
    ctx.fillRect(centerX - snowWidth/2, centerY - snowHeight/2, 
                 snowWidth, snowHeight);
    ctx.strokeRect(centerX - snowWidth/2, centerY - snowHeight/2, 
                   snowWidth, snowHeight);
    
    // Label
    ctx.fillStyle = '#37474F';
    ctx.font = 'bold 14px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Snow Surface (0°C)', centerX, centerY + 5);
    
    // Draw energy fluxes as arrows
    const arrowY = centerY - snowHeight/2;
    const scale = 0.3; // pixels per W/m²
    
    // Shortwave down (yellow)
    drawArrow(centerX - 120, arrowY - 80, centerX - 120, arrowY, 
              '#FDD835', result.QswDown, 'SW↓');
    
    // Shortwave up (yellow dashed)
    drawArrow(centerX - 60, arrowY, centerX - 60, arrowY - 50, 
              '#FDD835', result.QswUp, 'SW↑', true);
    
    // Longwave down (orange)
    drawArrow(centerX, arrowY - 80, centerX, arrowY, 
              '#FF6F00', result.QlwDown, 'LW↓');
    
    // Longwave up (orange dashed)
    drawArrow(centerX + 60, arrowY, centerX + 60, arrowY - 70, 
              '#FF6F00', result.QlwUp, 'LW↑', true);
    
    // Sensible heat
    if (result.QH > 0) {
      drawArrow(centerX + 120, arrowY - 40, centerX + 120, arrowY, 
                '#E53935', result.QH, 'QH');
    } else {
      drawArrow(centerX + 120, arrowY, centerX + 120, arrowY - 40, 
                '#1E88E5', Math.abs(result.QH), 'QH', true);
    }
    
    // Ground heat (from below)
    drawArrow(centerX - 120, centerY + snowHeight/2 + 40, 
              centerX - 120, centerY + snowHeight/2, 
              '#8D6E63', result.QG, 'QG');
    
    // Net energy display
    const netX = 50;
    const netY = 350;
    
    ctx.fillStyle = '#263238';
    ctx.font = '12px sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText(`SW net: ${result.QswNet.toFixed(0)} W/m²`, netX, netY);
    ctx.fillText(`LW net: ${result.QlwNet.toFixed(0)} W/m²`, netX, netY + 20);
    ctx.fillText(`Sensible: ${result.QH.toFixed(0)} W/m²`, netX, netY + 40);
    ctx.fillText(`Ground: ${result.QG.toFixed(0)} W/m²`, netX, netY + 60);
    
    ctx.font = 'bold 14px sans-serif';
    const netColor = result.Qnet > 0 ? '#D32F2F' : '#1976D2';
    ctx.fillStyle = netColor;
    ctx.fillText(`NET: ${result.Qnet.toFixed(0)} W/m²`, netX, netY + 90);
  }
  
  function drawArrow(x1, y1, x2, y2, color, magnitude, label, dashed = false) {
    const length = Math.abs(y2 - y1);
    const maxLength = 100;
    const scaledLength = Math.min(length, Math.abs(magnitude) * 0.15);
    
    if (y2 < y1) {
      y2 = y1 - scaledLength;
    } else {
      y2 = y1 + scaledLength;
    }
    
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.lineWidth = 3;
    
    if (dashed) {
      ctx.setLineDash([5, 5]);
    } else {
      ctx.setLineDash([]);
    }
    
    // Arrow shaft
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    
    // Arrow head
    const headSize = 8;
    const angle = Math.atan2(y2 - y1, x2 - x1);
    
    ctx.beginPath();
    ctx.moveTo(x2, y2);
    ctx.lineTo(x2 - headSize * Math.cos(angle - Math.PI/6),
               y2 - headSize * Math.sin(angle - Math.PI/6));
    ctx.lineTo(x2 - headSize * Math.cos(angle + Math.PI/6),
               y2 - headSize * Math.sin(angle + Math.PI/6));
    ctx.closePath();
    ctx.fill();
    
    ctx.setLineDash([]);
    
    // Label
    ctx.fillStyle = '#263238';
    ctx.font = '11px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(label, x1, y1 - 10);
    ctx.fillText(`${Math.abs(magnitude).toFixed(0)}`, x1, y1 + (y2 > y1 ? scaledLength + 20 : -5));
  }
  
  function render() {
    const result = calculateEnergyBalance();
    
    drawEnergyFluxes(result);
    
    document.getElementById('net-energy').textContent = result.Qnet.toFixed(1);
    document.getElementById('melt-rate').textContent = 
      result.meltRate > 0 ? result.meltRate.toFixed(2) : '0.00';
    document.getElementById('snow-status').textContent = result.status;
    
    const statusEl = document.getElementById('snow-status');
    statusEl.style.color = result.Qnet > 0 ? '#D32F2F' : '#1976D2';
    statusEl.style.fontWeight = 'bold';
  }
  
  document.getElementById('solar-rad').addEventListener('input', (e) => {
    solarRad = parseFloat(e.target.value);
    document.getElementById('solar-val').textContent = solarRad;
    render();
  });
  
  document.getElementById('albedo').addEventListener('input', (e) => {
    albedo = parseFloat(e.target.value);
    document.getElementById('albedo-val').textContent = albedo.toFixed(2);
    render();
  });
  
  document.getElementById('air-temp').addEventListener('input', (e) => {
    airTemp = parseFloat(e.target.value);
    document.getElementById('air-temp-val').textContent = airTemp;
    render();
  });
  
  document.getElementById('wind-speed').addEventListener('input', (e) => {
    windSpeed = parseFloat(e.target.value);
    document.getElementById('wind-val').textContent = windSpeed.toFixed(1);
    render();
  });
  
  document.getElementById('cloud-cover').addEventListener('input', (e) => {
    cloudCover = parseFloat(e.target.value) / 100;
    document.getElementById('cloud-val').textContent = (cloudCover * 100).toFixed(0);
    render();
  });
  
  render();
})();
</script>

**Try this:**
- **High solar + low albedo:** Fast melt (dirty/old snow)
- **High albedo:** Most solar reflected, slow melt (fresh snow)
- **Increase clouds:** More longwave input → warmer conditions
- **Increase wind:** Stronger sensible heat transfer
- **Cold air temp:** Can still melt with strong solar!
- Watch arrows scale with energy magnitude
- Solid arrows = energy input, Dashed arrows = energy output

**Key insight:** Albedo is CRITICAL—fresh snow (α=0.9) reflects 90% of solar, while dirty snow (α=0.5) absorbs 50%!

---

## 6. Interpretation

### Spring Melt Timing

**Energy balance controls melt onset:**

**Early spring:**
- Solar angle low → less SW radiation
- Cold air → negative sensible heat
- Clear nights → strong LW cooling
- **Net:** Diurnal melt/refreeze cycles

**Late spring:**
- Solar angle high → strong SW radiation
- Warm air → positive sensible heat
- Albedo decreasing (aging snow)
- **Net:** Sustained melt, rapid snowpack depletion

### Rain-on-Snow Events

**Liquid precipitation adds energy:**

$$Q_{\text{rain}} = \rho_w c_w T_{\text{rain}} P$$

Where:
- $c_w$ = specific heat of water (4186 J/(kg·K))
- $T_{\text{rain}}$ = temperature above 0°C
- $P$ = precipitation rate (kg/(m²·s))

**Example:** 10mm/hour rain at 5°C:

$$Q_{\text{rain}} = 1000 \times 4186 \times 5 \times (10/3600000) = 58 \text{ W/m}^2$$

**Combined with:** Warm air, clouds (high LW), wind → **Extreme melt rates!**

**Flood risk:** Rain + rapid snowmelt = compounded runoff.

### Forest Canopy Effects

**Under trees:**
- Reduced SW↓ (40-60% intercepted by canopy)
- Increased LW↓ (trees emit longwave)
- Reduced wind → lower turbulent fluxes
- Snow lasts longer in dense forest

**Clearings:**
- Full solar exposure
- Higher wind
- Earlier melt

### Elevation Gradients

**Lapse rate:** Temperature decreases ~6.5°C per 1000m.

**Higher elevations:**
- Colder air → less sensible heat input
- More precipitation as snow
- Longer snow cover duration

**Critical elevation:** Snowline rises ~150m per 1°C warming.

---

## 7. What Could Go Wrong?

### Ignoring Albedo Evolution

**Fresh snow:** α = 0.85  
**After 7 days:** α = 0.65  
**Absorbed solar:** 150 W/m² vs. 350 W/m² (2.3× difference!)

**Solution:** Model albedo decay with age and temperature.

### Assuming Constant Surface Temperature

**Reality:** Surface temperature varies diurnally.
- Day: Warms toward 0°C (melt limit)
- Night: Cools below 0°C (refreezing)

**Cold content:** Energy required to warm snowpack to 0°C before melt:

$$Q_{\text{cold}} = \rho_{\text{snow}} c_{\text{ice}} d |T_{\text{snow}}|$$

Where:
- $c_{\text{ice}}$ = 2100 J/(kg·K)
- $d$ = snow depth
- $T_{\text{snow}}$ = average temperature (< 0°C)

**Must warm cold snowpack** before melt occurs!

### Neglecting Internal Energy

**Solar penetration:** SW radiation penetrates snow (especially thin/clean).

**Subsurface warming:** Energy absorbed below surface → internal melt.

**Solution:** Multi-layer snowpack model.

### Ignoring Snowpack Structure

**Layering:**
- Fresh snow on old snow
- Ice layers from refreeze
- Depth hoar (weak layer)

**Each layer:** Different density, albedo, thermal properties.

**Simple models:** Single-layer bulk properties (acceptable for water balance, not avalanche).

---

## 8. Extension: Degree-Day Method

**Simplified melt model** (empirical):

$$M = f \times (T_{\text{air}} - T_{\text{threshold}}) \quad \text{when } T_{\text{air}} > T_{\text{threshold}}$$

Where:
- $M$ = melt (mm/day)
- $f$ = degree-day factor (2-6 mm/(°C·day))
- $T_{\text{threshold}}$ = 0°C

**Example:** Air temp = 5°C, $f = 3$ mm/(°C·day)

$$M = 3 \times (5 - 0) = 15 \text{ mm/day}$$

**Advantages:**
- Simple (only needs air temperature)
- Calibrate $f$ to observations

**Disadvantages:**
- No physics (black box)
- Fails when: Sunny + cold air (still melts) or cloudy + warm (less melt)
- No albedo effect

**Use:** Quick estimates, ungauged basins.

---

## 9. Math Refresher: Stefan-Boltzmann Law

### Blackbody Radiation

**All objects emit electromagnetic radiation** based on temperature.

**Stefan-Boltzmann Law:**

$$Q = \varepsilon \sigma T^4$$

Where:
- $Q$ = radiant flux (W/m²)
- $\varepsilon$ = emissivity (0-1, dimensionless)
- $\sigma$ = Stefan-Boltzmann constant = 5.67 × 10⁻⁸ W/(m²·K⁴)
- $T$ = absolute temperature (K)

**Blackbody:** $\varepsilon = 1$ (perfect emitter/absorber)

**Snow:** $\varepsilon \approx 0.98$ (nearly blackbody in longwave!)

### Temperature Effect

**Small temperature changes → large emission changes:**

At 273 K (0°C):

$$Q = 0.98 \times 5.67 \times 10^{-8} \times 273^4 = 315 \text{ W/m}^2$$

At 263 K (-10°C):

$$Q = 0.98 \times 5.67 \times 10^{-8} \times 263^4 = 283 \text{ W/m}^2$$

**Difference:** 32 W/m² for 10°C change.

**Why $T^4$:** Fourth power makes emission very sensitive to temperature.

---

## Summary

- **Snowpack energy balance** determines warming, cooling, and melt
- **Five major fluxes:** Shortwave, longwave, sensible, latent, ground heat
- **Albedo is critical:** Fresh snow (α=0.9) reflects 90% of solar radiation
- **Melt requires 334 kJ/kg:** Latent heat of fusion is large (slow process)
- **Net energy > 0 at 0°C:** Snow melts at rate proportional to energy input
- **Longwave radiation:** Snow is nearly a blackbody (ε≈0.98), strong nighttime cooling
- **Sensible heat:** Wind and temperature gradient drive turbulent transfer
- **Applications:** Flood forecasting, water supply, avalanche prediction, climate change
- **Challenges:** Albedo evolution, cold content, internal energy, layering
- **Simplified models:** Degree-day methods use only temperature (empirical)
- Foundation for understanding snowmelt timing and water release

**Next:** In Essay 43, we build on energy balance to model **snow accumulation and melt** through entire winter seasons, tracking snowpack evolution day by day!

---
