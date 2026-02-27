---
layout: essay
title: "Vegetation Indices and Remote Sensing"
subtitle: "NDVI, EVI, and monitoring photosynthesis from space"
date: 2026-02-26
categories: [modeling]
series: computational-geography-lab
series_order: 25
cluster: I
cluster_title: "Atmospheric Interactions"
tags:
  - computational-geography
  - modeling
  - remote-sensing
  - ndvi
  - evi
  - spectral-reflectance
  - vegetation
  - earth-observation
math: true
viz: true
difficulty: 3
math_core: [spectral-indices, normalized-difference, reflectance, band-ratios]
spatial_reasoning: 3
dynamics: 1
computation: 2
domain: [remote-sensing, ecology, agriculture, earth-observation]
excerpt: >
  Vegetation reflects near-infrared light strongly but absorbs red light (for
  photosynthesis). This spectral signature enables satellites to map greenness
  globally. This essay derives NDVI and EVI, explains why they correlate with
  photosynthesis, and shows how to interpret vegetation index time series.
math_prerequisites: >
  Basic algebra. Ratios and normalization. Photosynthesis concepts (Essay 20).
  We'll introduce spectral reflectance and band combinations from scratch.
---

## 1. The Question

How do satellites measure plant health and productivity from space?

From 700 km overhead, satellites observe Earth in multiple wavelengths (colors). Healthy vegetation has a distinctive spectral signature:
- **Red light** (620–700 nm): Strongly absorbed by chlorophyll → low reflectance (~5–10%)
- **Near-infrared** (NIR, 780–900 nm): Strongly reflected by leaf structure → high reflectance (~40–50%)

This contrast creates **vegetation indices**—mathematical combinations of spectral bands that quantify "greenness" and correlate with:
- Leaf area index (LAI)
- Photosynthesis rate (GPP from Essay 20)
- Biomass
- Crop yield

The mathematical question: How do we combine red and NIR reflectance to create a robust vegetation index?

---

## 2. The Conceptual Model

### Spectral Reflectance

**Reflectance** ($\rho$) is the fraction of incident light reflected by a surface:

$$\rho_{\lambda} = \frac{E_{\text{reflected}}(\lambda)}{E_{\text{incident}}(\lambda)}$$

Where $\lambda$ is wavelength.

**Typical vegetation reflectance:**
- **Blue** (450–500 nm): Low (~5%, absorbed by chlorophyll)
- **Green** (500–580 nm): Moderate (~10%, why leaves look green)
- **Red** (620–700 nm): Very low (~5%, strong chlorophyll absorption)
- **NIR** (780–900 nm): High (~40–50%, internal leaf structure scattering)
- **SWIR** (1550–1750 nm): Low (~10–20%, water absorption)

### Why NIR is High for Vegetation

Leaf internal structure:
- **Spongy mesophyll:** Air-cell interfaces scatter light
- **Minimal absorption:** No chlorophyll in NIR
- Result: Multiple scattering → high reflectance

**Senescent leaves** (dying, autumn colors):
- Chlorophyll breaks down
- Red reflectance increases (~20–30%)
- NIR decreases (~30–40%)
- Red-NIR contrast weakens → lower vegetation index

### Soil Background

**Bare soil** has:
- Similar red and NIR (~15–25% both)
- Low red-NIR contrast
- Low vegetation index (as expected)

**Partial cover:** Mixture of vegetation and soil → intermediate index.

---

## 3. Building the Mathematical Model

### Normalized Difference Vegetation Index (NDVI)

The most widely used vegetation index:

$$\text{NDVI} = \frac{\rho_{\text{NIR}} - \rho_{\text{red}}}{\rho_{\text{NIR}} + \rho_{\text{red}}}$$

**Properties:**
- Range: −1 to +1
- **Dense vegetation:** NDVI ≈ 0.7–0.9 (high NIR, low red)
- **Sparse vegetation:** NDVI ≈ 0.2–0.5
- **Bare soil:** NDVI ≈ 0.05–0.2
- **Water:** NDVI ≈ −0.1 to 0 (NIR absorbed by water)
- **Clouds/snow:** NDVI ≈ 0 to 0.3 (both red and NIR high and similar)

**Why normalize?**
- Reduces effects of illumination angle
- Reduces atmospheric scattering
- Makes values comparable across scenes

### Enhanced Vegetation Index (EVI)

**EVI** reduces sensitivity to soil and atmosphere:

$$\text{EVI} = G \frac{\rho_{\text{NIR}} - \rho_{\text{red}}}{\rho_{\text{NIR}} + C_1 \rho_{\text{red}} - C_2 \rho_{\text{blue}} + L}$$

Where:
- $G = 2.5$ (gain factor)
- $C_1 = 6$, $C_2 = 7.5$ (coefficients for atmospheric correction)
- $L = 1$ (soil adjustment factor)

**Advantages over NDVI:**
- Less saturated at high LAI
- Better atmospheric correction
- Improved sensitivity in dense canopies

**MODIS EVI** uses these exact coefficients.

### Simple Ratio (SR)

The **simple ratio** predates NDVI:

$$\text{SR} = \frac{\rho_{\text{NIR}}}{\rho_{\text{red}}}$$

**Properties:**
- Range: 0 to ~30
- Dense vegetation: SR ≈ 8–15
- Bare soil: SR ≈ 1–2

**Relationship to NDVI:**

$$\text{NDVI} = \frac{\text{SR} - 1}{\text{SR} + 1}$$

SR has larger dynamic range but is more sensitive to noise.

### Connecting to Leaf Area Index

**Empirical relationship:**

$$\text{LAI} \approx a \times \text{NDVI}^b$$

Or approximately linear for moderate LAI:

$$\text{LAI} \approx 6 \times \text{NDVI}$$

**Saturation:** At high LAI (> 5), NDVI saturates (approaches 0.9 asymptotically). EVI remains more responsive.

### Connecting to Photosynthesis

**fPAR** (fraction of Photosynthetically Active Radiation absorbed):

$$\text{fPAR} \approx 1.24 \times \text{NDVI} - 0.168$$

(For NDVI between 0.15 and 0.9)

**GPP estimation:**

$$\text{GPP} \approx \varepsilon \times \text{fPAR} \times \text{PAR}$$

Where:
- $\varepsilon$ = light use efficiency (~1–2 g C/MJ PAR)
- PAR = photosynthetically active radiation (from solar radiation measurements)

This is the basis for **MODIS GPP** product.

---

## 4. Worked Example by Hand

**Problem:** A Landsat scene has the following reflectance values for a pixel:
- Red: $\rho_{\text{red}} = 0.08$
- NIR: $\rho_{\text{NIR}} = 0.42$
- Blue: $\rho_{\text{blue}} = 0.06$

Calculate:  
(a) NDVI  
(b) Simple Ratio (SR)  
(c) EVI  
(d) Estimated LAI

### Solution

**(a) NDVI**

$$\text{NDVI} = \frac{\rho_{\text{NIR}} - \rho_{\text{red}}}{\rho_{\text{NIR}} + \rho_{\text{red}}} = \frac{0.42 - 0.08}{0.42 + 0.08}$$

$$= \frac{0.34}{0.50} = 0.68$$

**(b) Simple Ratio**

$$\text{SR} = \frac{\rho_{\text{NIR}}}{\rho_{\text{red}}} = \frac{0.42}{0.08} = 5.25$$

**Check relationship:**

$$\text{NDVI} = \frac{SR - 1}{SR + 1} = \frac{5.25 - 1}{5.25 + 1} = \frac{4.25}{6.25} = 0.68$$ ✓

**(c) EVI**

$$\text{EVI} = 2.5 \frac{0.42 - 0.08}{0.42 + 6(0.08) - 7.5(0.06) + 1}$$

$$= 2.5 \frac{0.34}{0.42 + 0.48 - 0.45 + 1}$$

$$= 2.5 \frac{0.34}{1.45} = 2.5 \times 0.234 = 0.59$$

**(d) Estimated LAI**

$$\text{LAI} \approx 6 \times \text{NDVI} = 6 \times 0.68 = 4.08$$

**Interpretation:** NDVI = 0.68 indicates healthy, moderately dense vegetation (corn mid-season, temperate forest canopy). LAI ≈ 4 is typical for mature crops.

---

## 5. Computational Implementation

Below is an interactive vegetation index calculator with spectral reflectance curves.

<div class="viz-container" id="vi-viz">
  <div class="controls">
    <label>
      Land cover type:
      <select id="landcover-type">
        <option value="dense-veg">Dense Vegetation</option>
        <option value="moderate-veg" selected>Moderate Vegetation</option>
        <option value="sparse-veg">Sparse Vegetation</option>
        <option value="bare-soil">Bare Soil</option>
        <option value="water">Water</option>
        <option value="snow">Snow</option>
      </select>
    </label>
    <label>
      Red reflectance:
      <input type="range" id="red-slider" min="0" max="0.5" step="0.01" value="0.08">
      <span id="red-value">0.08</span>
    </label>
    <label>
      NIR reflectance:
      <input type="range" id="nir-slider" min="0" max="0.6" step="0.01" value="0.42">
      <span id="nir-value">0.42</span>
    </label>
    <label>
      Blue reflectance:
      <input type="range" id="blue-slider" min="0" max="0.4" step="0.01" value="0.06">
      <span id="blue-value">0.06</span>
    </label>
  </div>
  <div class="vi-results">
    <p><strong>NDVI:</strong> <span id="ndvi-result"></span></p>
    <p><strong>EVI:</strong> <span id="evi-result"></span></p>
    <p><strong>Simple Ratio:</strong> <span id="sr-result"></span></p>
    <p><strong>Est. LAI:</strong> <span id="lai-result"></span></p>
    <p><strong>Classification:</strong> <span id="class-result"></span></p>
  </div>
  <div id="vi-chart" style="width: 100%; height: 450px;"></div>
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
  const chart = echarts.init(document.getElementById('vi-chart'));
  
  const landcovers = {
    'dense-veg': { red: 0.04, nir: 0.50, blue: 0.03, name: 'Dense Vegetation' },
    'moderate-veg': { red: 0.08, nir: 0.42, blue: 0.06, name: 'Moderate Vegetation' },
    'sparse-veg': { red: 0.15, nir: 0.30, blue: 0.10, name: 'Sparse Vegetation' },
    'bare-soil': { red: 0.20, nir: 0.25, blue: 0.15, name: 'Bare Soil' },
    'water': { red: 0.05, nir: 0.02, blue: 0.04, name: 'Water' },
    'snow': { red: 0.70, nir: 0.75, blue: 0.80, name: 'Snow' }
  };
  
  let red = 0.08;
  let nir = 0.42;
  let blue = 0.06;
  
  function calculateIndices() {
    const ndvi = (nir - red) / (nir + red);
    const evi = 2.5 * (nir - red) / (nir + 6*red - 7.5*blue + 1);
    const sr = nir / red;
    const lai = 6 * ndvi;
    
    let classification;
    if (ndvi < 0) classification = 'Water/Snow';
    else if (ndvi < 0.2) classification = 'Bare Soil';
    else if (ndvi < 0.4) classification = 'Sparse Vegetation';
    else if (ndvi < 0.7) classification = 'Moderate Vegetation';
    else classification = 'Dense Vegetation';
    
    document.getElementById('ndvi-result').textContent = ndvi.toFixed(3);
    document.getElementById('evi-result').textContent = evi.toFixed(3);
    document.getElementById('sr-result').textContent = sr.toFixed(2);
    document.getElementById('lai-result').textContent = lai > 0 ? lai.toFixed(1) : 'N/A';
    document.getElementById('class-result').textContent = classification;
    
    updateChart(ndvi, evi);
  }
  
  function updateChart(ndvi, evi) {
    // Generate spectral curve
    const wavelengths = [];
    const reflectances = [];
    
    // Simplified spectral curve (interpolated)
    const bands = [
      { wl: 450, refl: blue },
      { wl: 550, refl: blue * 1.5 }, // Green peak
      { wl: 670, refl: red },
      { wl: 850, refl: nir },
      { wl: 1650, refl: nir * 0.4 } // SWIR
    ];
    
    for (let wl = 400; wl <= 1700; wl += 20) {
      wavelengths.push(wl);
      // Linear interpolation between bands
      let refl = 0;
      for (let i = 0; i < bands.length - 1; i++) {
        if (wl >= bands[i].wl && wl <= bands[i+1].wl) {
          const t = (wl - bands[i].wl) / (bands[i+1].wl - bands[i].wl);
          refl = bands[i].refl + t * (bands[i+1].refl - bands[i].refl);
          break;
        }
      }
      reflectances.push(refl);
    }
    
    const option = {
      title: {
        text: 'Spectral Reflectance Curve',
        left: 'center'
      },
      tooltip: {
        trigger: 'axis',
        formatter: (params) => {
          return `Wavelength: ${params[0].value[0]} nm<br/>Reflectance: ${(params[0].value[1] * 100).toFixed(1)}%`;
        }
      },
      grid: {
        left: 80,
        right: 40,
        top: 60,
        bottom: 100
      },
      xAxis: {
        type: 'value',
        name: 'Wavelength (nm)',
        nameLocation: 'middle',
        nameGap: 30,
        min: 400,
        max: 1700
      },
      yAxis: {
        type: 'value',
        name: 'Reflectance',
        nameLocation: 'middle',
        nameGap: 50,
        min: 0,
        max: 1,
        axisLabel: {
          formatter: (val) => (val * 100).toFixed(0) + '%'
        }
      },
      series: [
        {
          type: 'line',
          data: wavelengths.map((wl, i) => [wl, reflectances[i]]),
          lineStyle: { color: '#2ECC71', width: 3 },
          showSymbol: false,
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: 'rgba(46, 204, 113, 0.3)' },
              { offset: 1, color: 'rgba(46, 204, 113, 0)' }
            ])
          },
          markArea: {
            silent: true,
            data: [
              [
                { name: 'Blue', xAxis: 450 },
                { xAxis: 500 }
              ],
              [
                { name: 'Red', xAxis: 620 },
                { xAxis: 700 }
              ],
              [
                { name: 'NIR', xAxis: 780 },
                { xAxis: 900 }
              ]
            ],
            itemStyle: {
              color: 'rgba(52, 152, 219, 0.1)'
            },
            label: {
              position: 'top'
            }
          },
          markPoint: {
            data: [
              { coord: [450, blue], symbol: 'circle', symbolSize: 10, 
                itemStyle: { color: '#3498DB' }, 
                label: { show: true, formatter: 'Blue', position: 'top' } },
              { coord: [670, red], symbol: 'circle', symbolSize: 10, 
                itemStyle: { color: '#E74C3C' }, 
                label: { show: true, formatter: 'Red', position: 'bottom' } },
              { coord: [850, nir], symbol: 'circle', symbolSize: 10, 
                itemStyle: { color: '#8B4513' }, 
                label: { show: true, formatter: 'NIR', position: 'top' } }
            ]
          }
        }
      ]
    };
    
    chart.setOption(option);
  }
  
  document.getElementById('landcover-type').addEventListener('change', (e) => {
    const lc = landcovers[e.target.value];
    red = lc.red;
    nir = lc.nir;
    blue = lc.blue;
    
    document.getElementById('red-slider').value = red;
    document.getElementById('red-value').textContent = red.toFixed(2);
    document.getElementById('nir-slider').value = nir;
    document.getElementById('nir-value').textContent = nir.toFixed(2);
    document.getElementById('blue-slider').value = blue;
    document.getElementById('blue-value').textContent = blue.toFixed(2);
    
    calculateIndices();
  });
  
  document.getElementById('red-slider').addEventListener('input', (e) => {
    red = parseFloat(e.target.value);
    document.getElementById('red-value').textContent = red.toFixed(2);
    calculateIndices();
  });
  
  document.getElementById('nir-slider').addEventListener('input', (e) => {
    nir = parseFloat(e.target.value);
    document.getElementById('nir-value').textContent = nir.toFixed(2);
    calculateIndices();
  });
  
  document.getElementById('blue-slider').addEventListener('input', (e) => {
    blue = parseFloat(e.target.value);
    document.getElementById('blue-value').textContent = blue.toFixed(2);
    calculateIndices();
  });
  
  calculateIndices();
  
  window.addEventListener('resize', () => chart.resize());
})();
</script>

**Try this:**
- **Dense vegetation:** High NIR peak (~850 nm), low red trough → high NDVI
- **Bare soil:** Similar red and NIR → low NDVI (~0.1–0.2)
- **Water:** Very low NIR absorption → negative NDVI
- **Snow:** High reflectance across all bands → NDVI near zero
- Notice: The "red edge" (sharp increase 700–750 nm) is characteristic of vegetation

**Key insight:** The red-NIR contrast uniquely identifies photosynthetically active vegetation.

---

## 6. Interpretation

### Seasonal Patterns

**NDVI time series** tracks growing season:
- **Spring:** NDVI rises (green-up, leaf emergence)
- **Summer:** NDVI peaks (maximum LAI)
- **Autumn:** NDVI declines (senescence, leaf fall)
- **Winter:** NDVI low (dormancy, snow cover)

**Example:** Temperate deciduous forest:
- January: NDVI ≈ 0.2 (bare branches)
- July: NDVI ≈ 0.8 (full canopy)

### Drought Detection

**Water stress** reduces:
- Leaf area (wilting, leaf drop)
- Chlorophyll content
- NIR reflectance (leaf structure degrades)

**Result:** NDVI declines during drought.

**Agricultural monitoring:** Compare current NDVI to historical average → detect crop stress.

### Global Patterns

**NDVI maps** reveal:
- **Tropical rainforests:** NDVI > 0.8 year-round
- **Savannas:** Seasonal variation (0.3–0.7)
- **Deserts:** NDVI < 0.2
- **Tundra:** Brief summer peak (0.3–0.5)
- **Croplands:** Strong seasonal cycle

**MODIS NDVI** (500 m resolution, 16-day) is the standard global product.

---

## 7. What Could Go Wrong?

### Atmospheric Contamination

**Aerosols and water vapor** scatter blue/red more than NIR:
- Increases apparent NIR
- Decreases apparent red
- Inflates NDVI

**Mitigation:**
- Atmospheric correction (6S model, dark object subtraction)
- EVI includes blue band for correction
- Use imagery from clear days

### Soil Background

In **sparse vegetation**, soil dominates signal:
- Bright soil → high reflectance in all bands
- Dark soil → low reflectance

**Soil-Adjusted Vegetation Index (SAVI):**

$$\text{SAVI} = \frac{(1 + L)(\rho_{\text{NIR}} - \rho_{\text{red}})}{\rho_{\text{NIR}} + \rho_{\text{red}} + L}$$

Where $L = 0.5$ for moderate cover (adjust 0–1 based on density).

### Saturation at High LAI

NDVI saturates when LAI > 5:
- Forest canopies (LAI = 6–8) all have NDVI ≈ 0.85–0.90
- Cannot distinguish between mature forest and very dense forest

**Solution:** Use EVI (less saturation) or NIRv (NIR × NDVI).

### Confusing NDVI with Biomass

**NDVI ∝ LAI** (leaf area), not total biomass.

A grassland with LAI = 4 has similar NDVI to a forest with LAI = 4, but the forest has 100× more biomass (wood).

**For biomass:** Use SAR (Synthetic Aperture Radar) or LiDAR.

---

## 8. Extension: Other Vegetation Indices

**Normalized Difference Water Index (NDWI):**

$$\text{NDWI} = \frac{\rho_{\text{NIR}} - \rho_{\text{SWIR}}}{\rho_{\text{NIR}} + \rho_{\text{SWIR}}}$$

Sensitive to water content in vegetation (drought stress).

**Chlorophyll Indices:**
- Use red edge (705–750 nm) for chlorophyll content
- More sensitive to plant health than NDVI

**Photochemical Reflectance Index (PRI):**

$$\text{PRI} = \frac{\rho_{531} - \rho_{570}}{\rho_{531} + \rho_{570}}$$

Tracks xanthophyll cycle → photosynthetic light use efficiency.

---

## 9. Math Refresher: Normalization and Indices

### Why Normalize?

**Problem:** Reflectance values change with:
- Illumination angle (sun elevation)
- Atmospheric conditions
- Sensor calibration

**Solution:** Normalize by forming ratios.

**Example:** Instead of $\rho_{\text{NIR}} - \rho_{\text{red}}$, use:

$$\text{NDVI} = \frac{\rho_{\text{NIR}} - \rho_{\text{red}}}{\rho_{\text{NIR}} + \rho_{\text{red}}}$$

**Effect:**
- Range: Always −1 to +1
- Insensitive to uniform brightness changes
- Comparable across scenes

### Index Properties

**Symmetric indices:**  
$f(a, b) = -f(b, a)$

Example: NDVI$(b, a) = -$NDVI$(a, b)$

**Bounded:**  
Output constrained to known range (e.g., −1 to 1)

**Monotonic:**  
Increases with target variable (e.g., NDVI increases with LAI)

---

## Summary

- **NDVI** = $(NIR - Red) / (NIR + Red)$: Most common vegetation index
- Range: −1 (water) to +1 (dense vegetation)
- Dense vegetation: NDVI ≈ 0.7–0.9 (high NIR, low red)
- Bare soil: NDVI ≈ 0.1–0.2 (similar red and NIR)
- **EVI** improves on NDVI for dense canopies and atmospheric effects
- **Simple Ratio** (NIR/Red) has larger dynamic range but more noise
- NDVI correlates with LAI, fPAR, and GPP
- Seasonal NDVI tracks growing season (green-up, peak, senescence)
- Red edge (700–750 nm) is diagnostic of healthy vegetation
- Vegetation indices enable global monitoring of photosynthesis from space

**This completes Phase II** — we've now covered orbital mechanics (Cluster F), surface energy balance (Cluster G), ecosystem processes (Cluster H), and atmospheric interactions (Cluster I). The series provides a complete foundation in computational environmental modeling!

---
