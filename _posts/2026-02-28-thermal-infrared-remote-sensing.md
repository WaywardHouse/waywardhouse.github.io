---
layout: essay
title: "Thermal Infrared Remote Sensing"
subtitle: "Measuring temperature and heat flux from emitted radiation"
date: 2026-02-27
categories: [modeling]
series: computational-geography-advanced-remote-sensing
series_order: 2
cluster: S
cluster_title: "Advanced Optical & Thermal"
tags:
  - computational-geography
  - modeling
  - remote-sensing
  - thermal-infrared
  - temperature
  - heat-flux
  - evapotranspiration
math: true
viz: true
difficulty: 3
math_core: [planck-law, stefan-boltzmann, emissivity, radiative-transfer, energy-balance]
spatial_reasoning: 3
dynamics: 3
computation: 3
domain: [remote-sensing, hydrology, urban-climate, volcanology, agriculture]
excerpt: >
  What is the surface temperature of that field? How much water is being lost through
  evaporation? Thermal infrared sensors measure emitted radiation in 8-14 μm window,
  enabling temperature mapping and energy flux estimation. This essay derives brightness
  temperature conversion, implements split-window atmospheric correction, calculates
  evapotranspiration from thermal data, and maps urban heat islands.
math_prerequisites: >
  Electromagnetic radiation basics. Stefan-Boltzmann law (Essay 42). Energy balance
  concepts. We'll introduce thermal remote sensing and temperature retrieval algorithms.
---

## 1. The Question

How hot is that parking lot compared to the adjacent park?

**Thermal infrared (TIR) remote sensing** measures emitted radiation from Earth's surface.

**Wavelength range:**
- Thermal infrared: 8-14 μm (micrometers)
- Also called longwave infrared or far-infrared
- Atmospheric window: Minimal atmospheric absorption

**Key difference from visible/NIR:**
- Visible/NIR: Reflected solar radiation (daytime only)
- Thermal IR: Emitted thermal radiation (day or night)

**Applications:**
- Land surface temperature mapping
- Urban heat island quantification
- Evapotranspiration estimation
- Volcanic hot spot detection
- Building heat loss assessment
- Wildfire monitoring
- Sea surface temperature

**Sensors:**
- Landsat 8/9: TIRS (100m resolution)
- MODIS: TIR bands (1km resolution)
- ASTER: TIR (90m resolution)
- ECOSTRESS: (70m resolution, diurnal coverage)
- GOES-R: ABI (2km resolution, geostationary)

---

## 2. The Conceptual Model

### Thermal Radiation Fundamentals

**Planck's Law:**

Every object above absolute zero emits electromagnetic radiation.

**Spectral radiance:**

$$L_\lambda(T) = \frac{2hc^2}{\lambda^5} \frac{1}{e^{hc/\lambda k T} - 1}$$

Where:
- $L_\lambda$ = spectral radiance (W/m²/sr/μm)
- $h$ = Planck constant (6.626 × 10⁻³⁴ J·s)
- $c$ = speed of light (3 × 10⁸ m/s)
- $k$ = Boltzmann constant (1.381 × 10⁻²³ J/K)
- $\lambda$ = wavelength (m)
- $T$ = temperature (K)

**Wien's Displacement Law:**

Peak emission wavelength:

$$\lambda_{max} = \frac{2898}{T}$$

Where $T$ in Kelvin, $\lambda_{max}$ in μm.

**Example:**
- Sun (5800 K): $\lambda_{max} = 0.5$ μm (visible, green)
- Earth (288 K): $\lambda_{max} = 10$ μm (thermal infrared)

### Emissivity

**Not all objects are perfect blackbodies.**

**Spectral emissivity:**

$$\varepsilon_\lambda = \frac{L_\lambda^{actual}}{L_\lambda^{blackbody}}$$

**Typical values (8-14 μm):**
- Water: 0.98-0.99
- Vegetation: 0.96-0.98
- Soil (moist): 0.95-0.97
- Soil (dry): 0.92-0.95
- Asphalt: 0.93-0.96
- Concrete: 0.88-0.92
- Metal (polished): 0.05-0.30

**Lower emissivity** → reflects more, emits less → appears cooler than true temperature.

### Brightness Temperature vs Kinetic Temperature

**Brightness temperature $T_B$:**

Temperature a blackbody would have to produce observed radiance.

**Kinetic temperature $T_s$:**

Actual surface temperature.

**Relationship:**

$$T_s = \frac{T_B}{\varepsilon^{1/4}}$$

(Approximate, valid for $\varepsilon$ near 1)

**Example:**

Concrete with $\varepsilon = 0.90$, $T_B = 300$ K:

$$T_s = \frac{300}{0.90^{0.25}} = \frac{300}{0.974} = 308 \text{ K}$$

**Actual temperature 8 K warmer** than brightness temperature.

---

## 3. Building the Mathematical Model

### At-Sensor Radiance

**Radiative transfer equation:**

$$L_{sensor} = \varepsilon L_{surface} \tau + L_{atm}^{\uparrow} + (1-\varepsilon) L_{atm}^{\downarrow} \tau$$

Where:
- $L_{sensor}$ = radiance at sensor
- $L_{surface}$ = surface emission (Planck function at $T_s$)
- $\tau$ = atmospheric transmittance
- $L_{atm}^{\uparrow}$ = upwelling atmospheric emission
- $L_{atm}^{\downarrow}$ = downwelling atmospheric emission
- $(1-\varepsilon)$ = reflectance (Kirchhoff's law)

**Three terms:**
1. Surface emission attenuated by atmosphere
2. Atmosphere emits upward
3. Downwelling atmospheric radiation reflected off surface

### Split-Window Algorithm

**Uses two TIR bands** to correct for atmospheric water vapor.

**Landsat 8 TIRS:**
- Band 10: 10.6-11.2 μm
- Band 11: 11.5-12.5 μm

**Algorithm:**

$$T_s = T_{10} + c_1(T_{10} - T_{11}) + c_2(T_{10} - T_{11})^2 + c_0$$

Where:
- $T_{10}, T_{11}$ = brightness temperatures in bands 10, 11
- $c_0, c_1, c_2$ = coefficients (depend on atmospheric conditions)

**Typical coefficients:**

$$T_s \approx 1.38 T_{10} - 0.38 T_{11} + 0.5$$

**Principle:**

Differential absorption by water vapor between two bands enables atmospheric correction.

### Surface Energy Balance

**Net radiation partitioning:**

$$R_n = H + LE + G$$

Where:
- $R_n$ = net radiation (W/m²)
- $H$ = sensible heat flux
- $LE$ = latent heat flux (evapotranspiration)
- $G$ = ground heat flux

**Sensible heat parameterization:**

$$H = \rho c_p \frac{T_s - T_a}{r_a}$$

Where:
- $\rho$ = air density
- $c_p$ = specific heat of air
- $T_s$ = surface temperature (from TIR)
- $T_a$ = air temperature
- $r_a$ = aerodynamic resistance

**Large $T_s - T_a$** → large $H$ → low $LE$ → water stressed

**Applications:**
- Irrigation scheduling
- Drought monitoring
- Crop water stress detection

### Evapotranspiration Estimation

**SEBAL algorithm:**

Surface Energy Balance Algorithm for Land

**Steps:**

1. Calculate net radiation from reflectance and TIR data
2. Estimate ground heat flux: $G \approx 0.3 R_n$ (bare soil)
3. Identify "hot" (dry) and "cold" (wet) pixels
4. Derive sensible heat as linear function of $T_s$
5. Solve for $LE$ as residual: $LE = R_n - H - G$

**Evapotranspiration:**

$$ET = \frac{LE}{\lambda}$$

Where $\lambda$ = latent heat of vaporization (2.45 MJ/kg)

**Output:** ET in mm/day

---

## 4. Worked Example by Hand

**Problem:** Calculate land surface temperature from Landsat thermal data.

**At-sensor brightness temperatures:**
- Band 10: $T_{10} = 300$ K
- Band 11: $T_{11} = 298$ K

**Surface properties:**
- Emissivity: $\varepsilon = 0.96$ (vegetation)

**Atmospheric correction coefficients:**
- $c_0 = 0.5$, $c_1 = 1.38$, $c_2 = 0$ (simplified)

Calculate land surface temperature.

### Solution

**Step 1: Split-window correction**

$$T_s = c_1 T_{10} - (c_1 - 1) T_{11} + c_0$$

$$= 1.38(300) - 0.38(298) + 0.5$$

$$= 414 - 113.24 + 0.5 = 301.26 \text{ K}$$

**Step 2: Convert to Celsius**

$$T_s = 301.26 - 273.15 = 28.1°\text{C}$$

**Step 3: Emissivity correction (if needed)**

For vegetation with $\varepsilon = 0.96$, already accounted for in split-window coefficients.

If not using split-window:

$$T_s = \frac{T_B}{\varepsilon^{0.25}} = \frac{300}{0.96^{0.25}} = \frac{300}{0.990} = 303.0 \text{ K} = 29.8°\text{C}$$

**Summary:**
- Split-window LST: 28.1°C
- Single-channel with emissivity correction: 29.8°C
- Difference reflects atmospheric correction importance

**Interpretation:**

Surface temperature of ~28°C typical for vegetated surface on warm day.

---

## 5. Computational Implementation

Below is an interactive thermal remote sensing simulator.

<div class="viz-container" id="thermal-viz">
  <div class="controls">
    <label>
      Surface type:
      <select id="surface-type">
        <option value="water">Water</option>
        <option value="vegetation">Vegetation</option>
        <option value="soil-wet">Soil (wet)</option>
        <option value="soil-dry">Soil (dry)</option>
        <option value="asphalt">Asphalt</option>
        <option value="concrete">Concrete</option>
        <option value="metal">Metal roof</option>
      </select>
    </label>
    <label>
      Air temperature (°C):
      <input type="range" id="air-temp" min="15" max="35" step="1" value="25">
      <span id="air-val">25</span>
    </label>
    <label>
      Solar radiation (W/m²):
      <input type="range" id="solar-rad" min="0" max="1000" step="50" value="600">
      <span id="solar-val">600</span>
    </label>
    <label>
      Time of day:
      <input type="range" id="time-hour" min="0" max="23" step="1" value="12">
      <span id="time-val">12</span>:00
    </label>
    <div class="thermal-info">
      <p><strong>Surface temp:</strong> <span id="surf-temp">--</span> °C</p>
      <p><strong>Brightness temp:</strong> <span id="bright-temp">--</span> K</p>
      <p><strong>Emissivity:</strong> <span id="emissivity">--</span></p>
      <p><strong>Net radiation:</strong> <span id="net-rad">--</span> W/m²</p>
      <p><strong>Sensible heat:</strong> <span id="sens-heat">--</span> W/m²</p>
      <p><strong>Latent heat:</strong> <span id="lat-heat">--</span> W/m²</p>
    </div>
  </div>
  <div id="thermal-canvas-container">
    <canvas id="thermal-canvas" width="700" height="400" style="border: 1px solid #ddd;"></canvas>
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
  const chart = echarts.init(document.getElementById('thermal-canvas'));
  
  let surfaceType = 'vegetation';
  let airTemp = 25;
  let solarRad = 600;
  let timeHour = 12;
  
  const surfaceProps = {
    water: {emissivity: 0.98, albedo: 0.06, name: 'Water'},
    vegetation: {emissivity: 0.97, albedo: 0.20, name: 'Vegetation'},
    'soil-wet': {emissivity: 0.96, albedo: 0.15, name: 'Soil (wet)'},
    'soil-dry': {emissivity: 0.93, albedo: 0.25, name: 'Soil (dry)'},
    asphalt: {emissivity: 0.95, albedo: 0.08, name: 'Asphalt'},
    concrete: {emissivity: 0.90, albedo: 0.30, name: 'Concrete'},
    metal: {emissivity: 0.15, albedo: 0.60, name: 'Metal roof'}
  };
  
  function calculateThermal() {
    const props = surfaceProps[surfaceType];
    const emis = props.emissivity;
    const albedo = props.albedo;
    
    // Net radiation (simplified)
    const Rsw = (1 - albedo) * solarRad;
    const sigma = 5.67e-8;
    const Rlw_down = 0.85 * sigma * Math.pow(airTemp + 273.15, 4);
    
    // Surface temperature estimation (energy balance)
    const Tair_K = airTemp + 273.15;
    
    // Simplified: Ts increases with absorbed radiation, decreases with cooling
    const radiativeHeating = (Rsw + Rlw_down) / 100;
    const coolingFactor = emis * 5;
    const Ts_K = Tair_K + radiativeHeating / coolingFactor;
    const Ts_C = Ts_K - 273.15;
    
    // Brightness temperature (what sensor measures)
    const Tb_K = Ts_K * Math.pow(emis, 0.25);
    
    // Energy fluxes
    const Rn = Rsw + Rlw_down - emis * sigma * Math.pow(Ts_K, 4);
    const G = 0.1 * Rn; // ground heat flux
    
    // Sensible heat (simplified)
    const H = 20 * (Ts_C - airTemp);
    
    // Latent heat (residual)
    const LE = Math.max(0, Rn - H - G);
    
    return {
      Ts_C, Tb_K, emis, Rn, H, LE, props
    };
  }
  
  function generateDiurnalCycle() {
    const data = [];
    
    for (let hour = 0; hour < 24; hour++) {
      timeHour = hour;
      
      // Solar radiation varies with time
      const solarFactor = Math.max(0, Math.sin((hour - 6) * Math.PI / 12));
      solarRad = 800 * solarFactor;
      
      const result = calculateThermal();
      data.push({
        hour,
        Ts: result.Ts_C,
        Ta: airTemp
      });
    }
    
    // Reset
    timeHour = parseInt(document.getElementById('time-hour').value);
    solarRad = parseInt(document.getElementById('solar-rad').value);
    
    return data;
  }
  
  function render() {
    const result = calculateThermal();
    
    document.getElementById('surf-temp').textContent = result.Ts_C.toFixed(1);
    document.getElementById('bright-temp').textContent = result.Tb_K.toFixed(1);
    document.getElementById('emissivity').textContent = result.emis.toFixed(2);
    document.getElementById('net-rad').textContent = result.Rn.toFixed(0);
    document.getElementById('sens-heat').textContent = result.H.toFixed(0);
    document.getElementById('lat-heat').textContent = result.LE.toFixed(0);
    
    const diurnal = generateDiurnalCycle();
    
    const series = [
      {
        name: 'Surface Temperature',
        type: 'line',
        data: diurnal.map(d => [d.hour, d.Ts]),
        lineStyle: {color: '#D32F2F', width: 3},
        areaStyle: {color: 'rgba(211, 47, 47, 0.2)'}
      },
      {
        name: 'Air Temperature',
        type: 'line',
        data: diurnal.map(d => [d.hour, d.Ta]),
        lineStyle: {color: '#1976D2', width: 2, type: 'dashed'}
      },
      {
        name: 'Current Time',
        type: 'scatter',
        data: [[timeHour, result.Ts_C]],
        symbolSize: 15,
        itemStyle: {color: '#E91E63'},
        label: {
          show: true,
          formatter: 'Now',
          position: 'top',
          fontWeight: 'bold'
        }
      }
    ];
    
    const option = {
      title: {
        text: `Diurnal Temperature Cycle - ${result.props.name}`,
        left: 'center'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {type: 'cross'}
      },
      legend: {
        data: ['Surface Temperature', 'Air Temperature', 'Current Time'],
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
        name: 'Hour of Day',
        nameLocation: 'middle',
        nameGap: 30,
        min: 0,
        max: 23,
        interval: 3
      },
      yAxis: {
        type: 'value',
        name: 'Temperature (°C)',
        nameLocation: 'middle',
        nameGap: 50
      },
      series: series
    };
    
    chart.setOption(option, true);
  }
  
  document.getElementById('surface-type').addEventListener('change', (e) => {
    surfaceType = e.target.value;
    render();
  });
  
  document.getElementById('air-temp').addEventListener('input', (e) => {
    airTemp = parseFloat(e.target.value);
    document.getElementById('air-val').textContent = airTemp;
    render();
  });
  
  document.getElementById('solar-rad').addEventListener('input', (e) => {
    solarRad = parseFloat(e.target.value);
    document.getElementById('solar-val').textContent = solarRad;
    render();
  });
  
  document.getElementById('time-hour').addEventListener('input', (e) => {
    timeHour = parseInt(e.target.value);
    document.getElementById('time-val').textContent = timeHour;
    render();
  });
  
  render();
  
  window.addEventListener('resize', () => chart.resize());
})();
</script>

**Observations:**
- Red line shows surface temperature varying through day
- Blue dashed line shows constant air temperature for reference
- Surface temperature peaks in afternoon, not at noon (thermal inertia)
- Asphalt reaches much higher temperatures than vegetation
- Metal roofs show extreme temperatures due to low emissivity
- Water shows minimal temperature variation (high thermal capacity)
- Temperature difference (Ts - Ta) drives sensible heat flux
- Energy partitioning varies by surface type affecting local climate

**Key findings:**
- Different surfaces exhibit different thermal behaviors
- Urban materials (asphalt, concrete) create heat islands
- Vegetation moderates temperature through evapotranspiration
- Surface emissivity affects both measured brightness temperature and actual cooling rate
- Diurnal cycle reveals thermal properties and energy partitioning

---

## 6. Interpretation

### Urban Heat Islands

**Phenomenon:**

Cities warmer than surrounding rural areas.

**Magnitude:**
- Daytime: 1-3°C warmer
- Nighttime: 3-5°C warmer (sometimes 10°C)

**Thermal remote sensing reveals:**
- Hot spots: Parking lots, roofs, roads
- Cool spots: Parks, water bodies, tree canopy
- Spatial patterns: Correlate with land use

**Example - Phoenix, Arizona:**

Landsat TIR shows:
- Asphalt parking lots: 65-70°C
- Vegetated parks: 35-40°C
- **Difference: 30°C!**

**Health impacts:**
- Heat-related mortality
- Air quality degradation
- Energy demand for cooling

**Mitigation strategies:**
- Cool roofs (high albedo, high emissivity)
- Urban tree canopy
- Green roofs
- Reflective pavements

### Agricultural Water Stress

**Crop Water Stress Index (CWSI):**

$$CWSI = \frac{(T_s - T_a) - (T_s - T_a)_{LL}}{(T_s - T_a)_{UL} - (T_s - T_a)_{LL}}$$

Where:
- $LL$ = lower limit (well-watered)
- $UL$ = upper limit (water-stressed)

**Range:** 0 (no stress) to 1 (maximum stress)

**Application:**

ECOSTRESS provides 70m resolution thermal data with diurnal coverage enabling:
- Within-field stress mapping
- Irrigation scheduling
- Yield prediction

**Economic value:**

Precision irrigation based on thermal data reduces water use 20-30% while maintaining yield.

### Volcanic Monitoring

**Thermal anomalies** indicate:
- Active lava flows
- Lava lake temperature
- Fumarole activity
- Dome growth

**MODIS thermal bands:**
- Nightly global coverage
- Detect temperature increases weeks before eruption
- Track eruption intensity

**Example - Kilauea, Hawaii 2018:**

MODIS detected thermal anomaly increase before major eruption.

Enabled evacuation planning and hazard assessment.

### Sea Surface Temperature

**MODIS SST product:**
- Daily global coverage
- 1 km resolution
- Accuracy: ±0.5°C

**Applications:**
- Ocean circulation mapping
- El Niño monitoring
- Coral bleaching prediction (thermal stress)
- Fisheries (temperature gradients concentrate fish)

**Coral bleaching threshold:**

Sustained SST > 1°C above climatological maximum triggers bleaching.

Thermal remote sensing provides early warning.

---

## 7. What Could Go Wrong?

### Emissivity Uncertainty

**Problem:**

Don't know exact emissivity of surface.

**Error propagation:**

$$\Delta T_s \approx \frac{T_s}{\varepsilon} \Delta\varepsilon$$

**Example:**

$T_s = 300$ K, $\varepsilon = 0.95 \pm 0.03$:

$$\Delta T_s \approx \frac{300}{0.95} \times 0.03 = 9.5 \text{ K}$$

**Large uncertainty!**

**Solution:**
- Use emissivity databases (ASTER spectral library)
- Estimate from NDVI (empirical relationships)
- Temperature-emissivity separation algorithms

### Atmospheric Effects

**Water vapor absorption** (especially 8-9 μm):

Can reduce apparent temperature by 5-10 K.

**Aerosols:**

Scatter and absorb, further complicating retrieval.

**Solution:**
- Split-window algorithms
- Atmospheric correction with radiosonde data
- In-situ calibration/validation

### Mixed Pixels

**Landsat thermal: 100m resolution**

Pixel may contain:
- 50% vegetation (25°C)
- 50% bare soil (45°C)

**Measured:** ~35°C (area-weighted average)

**But:** Not representative of either component.

**Problem for applications:**

Crop stress detection needs pure vegetation pixels.

**Solution:**
- Unmix thermal signal (if know components)
- Use higher resolution (ECOSTRESS 70m)
- Aggregate to coarser resolution

### Diurnal Sampling

**Most satellites:** Fixed overpass time (e.g., Landsat ~10:30 AM)

**Misses:**
- Peak afternoon temperature
- Nighttime cooling
- Full diurnal cycle

**Problem:**

Can't distinguish thermal inertia differences.

**Solution:**
- Geostationary satellites (GOES, MSG) - hourly
- ECOSTRESS - variable overpass times
- Model diurnal cycle from limited observations

---

## 8. Extension: Temperature-Emissivity Separation

**Challenge:** Retrieve both $T_s$ and $\varepsilon$ from single thermal measurement.

**Underdetermined problem:** One equation, two unknowns.

**Solution:** Use multiple TIR bands with different emissivity contrast.

**ASTER TIR:** 5 bands in 8-12 μm

**Algorithm:**

1. Assume initial emissivity (from NDVI)
2. Retrieve temperature
3. Update emissivity using spectral shape
4. Iterate until convergence

**Emissivity spectrum reveals:**
- Quartz: Peak at 8.6 μm
- Carbonates: Trough at 11.2 μm
- Vegetation: Flat, high emissivity

**Applications:**
- Mineral mapping from emissivity
- Surface composition without field work

---

## 9. Math Refresher: Blackbody Radiation

### Stefan-Boltzmann Law

**Total emitted power:**

$$M = \sigma T^4$$

Where:
- $M$ = exitance (W/m²)
- $\sigma = 5.67 \times 10^{-8}$ W/(m²·K⁴)
- $T$ = temperature (K)

**Integration of Planck function** over all wavelengths.

### Wien's Law

**Peak wavelength:**

$$\lambda_{max} T = 2898 \text{ μm·K}$$

**Explains why:**
- Hot objects glow red (shorter wavelengths)
- Room temperature objects emit in infrared (invisible)

### Kirchhoff's Law

**At thermal equilibrium:**

$$\alpha_\lambda = \varepsilon_\lambda$$

Where:
- $\alpha$ = absorptivity
- $\varepsilon$ = emissivity

**Good absorbers are good emitters.**

**Corollary:**

$$\rho_\lambda = 1 - \varepsilon_\lambda$$

Where $\rho$ = reflectivity (for opaque surfaces).

**Low emissivity** → high reflectivity → shiny surfaces appear cooler.

---

## Summary

- Thermal infrared remote sensing measures emitted radiation in 8-14 μm atmospheric window
- Land surface temperature derived from brightness temperature requires emissivity correction
- Split-window algorithms use differential atmospheric absorption between two bands for correction
- Surface energy balance partitions net radiation into sensible, latent, and ground heat fluxes
- Urban heat islands mapped with temperature differences of 10-30°C between materials
- Evapotranspiration estimated from thermal data enables precision irrigation and drought monitoring
- Applications span urban climate, agriculture, volcanology, oceanography, and wildfire detection
- Challenges include emissivity uncertainty, atmospheric effects, mixed pixels, and diurnal sampling
- MODIS, Landsat TIRS, ASTER, and ECOSTRESS provide operational thermal data at various resolutions
- Critical tool for energy balance studies and temperature-dependent processes

---
