---
layout: essay
title: "Hyperspectral Imaging"
subtitle: "Hundreds of spectral bands reveal material composition and biochemical properties"
date: 2026-02-27
categories: [modeling]
series: computational-geography-advanced-remote-sensing
series_order: 1
cluster: S
cluster_title: "Advanced Optical & Thermal"
tags:
  - computational-geography
  - modeling
  - remote-sensing
  - hyperspectral
  - spectroscopy
  - mineral-mapping
  - vegetation-analysis
math: true
viz: true
difficulty: 4
math_core: [spectroscopy, spectral-unmixing, dimensionality-reduction, absorption-features]
spatial_reasoning: 3
dynamics: 2
computation: 4
domain: [remote-sensing, geology, ecology, precision-agriculture]
excerpt: >
  What minerals compose this rock? What chemicals are in these plants? Hyperspectral
  imaging captures hundreds of narrow spectral bands, enabling material identification
  through spectral signatures. This essay derives absorption feature analysis,
  implements spectral unmixing algorithms, and shows how to map minerals, vegetation
  biochemistry, and water quality from hyperspectral data.
math_prerequisites: >
  Electromagnetic radiation basics. Remote sensing fundamentals (Essays 25, 39-41).
  Linear algebra (matrix operations). We'll introduce spectroscopy and imaging
  spectrometry from first principles.
---

## 1. The Question

Can we identify minerals from orbit using reflected sunlight?

**Hyperspectral imaging** captures continuous spectra across hundreds of narrow bands.

**Comparison:**

**Multispectral (Landsat, Sentinel-2):**
- 8-12 broad bands
- Band width: 50-200 nm
- Coarse spectral sampling

**Hyperspectral (AVIRIS, EnMAP, PRISMA):**
- 100-400+ narrow bands
- Band width: 5-10 nm
- Fine spectral sampling
- Continuous spectrum 400-2500 nm

**Key advantage:**

Narrow bands capture diagnostic absorption features that reveal:
- Mineral composition (geology)
- Vegetation biochemistry (chlorophyll, water, nitrogen)
- Water quality (sediment, algae, dissolved organic matter)
- Urban materials (roof types, pavement)

**Applications:**
- Mineral exploration (ore deposits)
- Precision agriculture (crop health, nutrient status)
- Environmental monitoring (water quality, invasive species)
- Geological mapping (lithology discrimination)

---

## 2. The Conceptual Model

### Spectral Signatures

**Reflectance spectrum:**

$$\rho(\lambda) = \frac{L_{\uparrow}(\lambda)}{L_{\downarrow}(\lambda)}$$

Where:
- $\rho(\lambda)$ = spectral reflectance (0-1)
- $\lambda$ = wavelength (nm)
- $L_{\uparrow}$ = upwelling radiance
- $L_{\downarrow}$ = downwelling irradiance

**Absorption features:**

Materials absorb specific wavelengths due to:
- Electronic transitions (UV-visible, 400-700 nm)
- Vibrational overtones (near-infrared, 700-1300 nm)
- Molecular vibrations (shortwave infrared, 1300-2500 nm)

**Example - vegetation:**
- 680 nm: Chlorophyll absorption (red)
- 750-900 nm: High reflectance (near-infrared plateau)
- 1400, 1900 nm: Water absorption
- 2200 nm: Cellulose/lignin absorption

**Example - minerals:**
- Iron oxides: Absorption 400-700 nm
- Hydroxyl minerals (clays): 1400, 2200 nm
- Carbonates: 2300-2350 nm

### Spectral Libraries

**Reference spectra** measured in laboratory:

**USGS Spectral Library:**
- 1400+ materials
- Minerals, rocks, soils
- Vegetation, water
- Measured at high resolution

**Use:** Compare image spectra to library for identification

### Imaging Spectrometer

**Data structure:**

**Hyperspectral cube:**
- x dimension: spatial (pixels across)
- y dimension: spatial (pixels down)
- z dimension: spectral (wavelengths)

**Data volume:**

1000 × 1000 pixels × 200 bands = 200 million values

**Each pixel = complete spectrum** (hundreds of measurements)

---

## 3. Building the Mathematical Model

### Spectral Unmixing

**Mixed pixel problem:**

Pixel contains multiple materials (vegetation + soil, multiple minerals)

**Linear mixing model:**

$$\rho(\lambda) = \sum_{i=1}^{n} f_i \rho_i(\lambda) + \varepsilon(\lambda)$$

Where:
- $f_i$ = fractional abundance of endmember $i$
- $\rho_i(\lambda)$ = reflectance spectrum of pure endmember $i$
- $\varepsilon(\lambda)$ = residual error

**Constraints:**

$$\sum_{i=1}^{n} f_i = 1$$ (fractions sum to 1)

$$f_i \geq 0$$ (non-negative fractions)

**Matrix formulation:**

$$\mathbf{r} = \mathbf{E} \mathbf{f} + \boldsymbol{\varepsilon}$$

Where:
- $\mathbf{r}$ = measured spectrum (m × 1 vector, m bands)
- $\mathbf{E}$ = endmember matrix (m × n, n endmembers)
- $\mathbf{f}$ = abundance vector (n × 1)

**Solution (least squares):**

$$\mathbf{f} = (\mathbf{E}^T\mathbf{E})^{-1}\mathbf{E}^T\mathbf{r}$$

Subject to non-negativity and sum-to-one constraints.

### Absorption Feature Depth

**Continuum removal:**

1. Fit continuum (straight line or convex hull) to spectrum
2. Normalize spectrum by continuum
3. Measure absorption depth

**Continuum-removed reflectance:**

$$R_{CR}(\lambda) = \frac{\rho(\lambda)}{\rho_{continuum}(\lambda)}$$

**Absorption depth:**

$$D = 1 - \min(R_{CR}(\lambda))$$

**Example - 2200 nm clay feature:**

If minimum $R_{CR} = 0.75$, then $D = 0.25$ (25% absorption)

### Spectral Angle Mapper (SAM)

**Similarity metric** between spectra:

$$\alpha = \arccos\left(\frac{\mathbf{r}_1 \cdot \mathbf{r}_2}{||\mathbf{r}_1|| \cdot ||\mathbf{r}_2||}\right)$$

Where:
- $\alpha$ = spectral angle (radians or degrees)
- Small angle → similar spectra

**Classification:**

Compare pixel spectrum to reference library spectra, assign to closest match (smallest angle).

**Insensitive to illumination** (brightness variations) - measures shape, not magnitude.

### Principal Component Analysis (PCA)

**Dimensionality reduction:**

Transform 200 bands → 5-10 principal components capturing most variance.

**Covariance matrix:**

$$\mathbf{C} = \frac{1}{n-1}\mathbf{X}^T\mathbf{X}$$

**Eigenvalue decomposition:**

$$\mathbf{C}\mathbf{v}_i = \lambda_i\mathbf{v}_i$$

**Principal components:**

$$PC_i = \mathbf{X}\mathbf{v}_i$$

**Variance explained:**

$$\text{Variance}_i = \frac{\lambda_i}{\sum \lambda_i}$$

**First few PCs** typically capture >95% variance.

---

## 4. Worked Example by Hand

**Problem:** Unmix pixel containing vegetation and soil.

**Measured spectrum (simplified, 5 wavelengths):**

| λ (nm) | ρ_measured |
|--------|------------|
| 550    | 0.08       |
| 670    | 0.06       |
| 800    | 0.35       |
| 1600   | 0.25       |
| 2200   | 0.22       |

**Endmember spectra:**

**Vegetation:**

| λ (nm) | ρ_veg |
|--------|-------|
| 550    | 0.10  |
| 670    | 0.04  |
| 800    | 0.50  |
| 1600   | 0.35  |
| 2200   | 0.30  |

**Soil:**

| λ (nm) | ρ_soil |
|--------|--------|
| 550    | 0.06  |
| 670    | 0.08  |
| 800    | 0.20  |
| 1600   | 0.15  |
| 2200   | 0.14  |

Find fractional abundances $f_{\text{veg}}$ and $f_{\text{soil}}$.

### Solution

**Linear mixing model:**

$$\rho(\lambda) = f_{\text{veg}} \rho_{\text{veg}}(\lambda) + f_{\text{soil}} \rho_{\text{soil}}(\lambda)$$

With constraint: $f_{\text{veg}} + f_{\text{soil}} = 1$

**Substitute constraint:** $f_{\text{soil}} = 1 - f_{\text{veg}}$

$$\rho(\lambda) = f_{\text{veg}} \rho_{\text{veg}}(\lambda) + (1-f_{\text{veg}}) \rho_{\text{soil}}(\lambda)$$

$$\rho(\lambda) = f_{\text{veg}} (\rho_{\text{veg}}(\lambda) - \rho_{\text{soil}}(\lambda)) + \rho_{\text{soil}}(\lambda)$$

**Solve using one wavelength (800 nm):**

$$0.35 = f_{\text{veg}}(0.50 - 0.20) + 0.20$$

$$0.35 = 0.30 f_{\text{veg}} + 0.20$$

$$0.15 = 0.30 f_{\text{veg}}$$

$$f_{\text{veg}} = 0.50$$

$$f_{\text{soil}} = 0.50$$

**Verify at 670 nm:**

$$\rho_{pred} = 0.50(0.04) + 0.50(0.08) = 0.02 + 0.04 = 0.06$$ ✓

**Verify at 2200 nm:**

$$\rho_{pred} = 0.50(0.30) + 0.50(0.14) = 0.15 + 0.07 = 0.22$$ ✓

**Result:** Pixel is 50% vegetation, 50% soil.

**Note:** Using all bands simultaneously with least squares gives more robust estimate.

---

## 5. Computational Implementation

Below is an interactive hyperspectral analysis tool.

<div class="viz-container" id="hyper-viz">
  <div class="controls">
    <label>
      Vegetation fraction:
      <input type="range" id="veg-frac" min="0" max="100" step="5" value="50">
      <span id="veg-val">50</span>%
    </label>
    <label>
      Add noise:
      <input type="checkbox" id="add-noise">
    </label>
    <label>
      Show endmembers:
      <input type="checkbox" id="show-endmembers" checked>
    </label>
    <label>
      Analysis method:
      <select id="analysis-method">
        <option value="mixture">Linear unmixing</option>
        <option value="sam">Spectral Angle Mapper</option>
        <option value="absorption">Absorption features</option>
      </select>
    </label>
    <div class="hyper-info">
      <p><strong>Estimated vegetation:</strong> <span id="est-veg">--</span>%</p>
      <p><strong>Estimated soil:</strong> <span id="est-soil">--</span>%</p>
      <p><strong>RMSE:</strong> <span id="rmse">--</span></p>
      <p><strong>Classification:</strong> <span id="classification">--</span></p>
    </div>
  </div>
  <div id="hyper-canvas-container">
    <canvas id="hyper-canvas" width="700" height="400" style="border: 1px solid #ddd;"></canvas>
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
  const chart = echarts.init(document.getElementById('hyper-canvas'));
  
  let vegFrac = 0.5;
  let addNoise = false;
  let showEndmembers = true;
  let analysisMethod = 'mixture';
  
  // Spectral libraries (simplified)
  const wavelengths = [450, 550, 670, 750, 850, 1000, 1200, 1400, 1600, 1900, 2100, 2200, 2400];
  
  const vegSpectrum = [0.04, 0.10, 0.04, 0.15, 0.50, 0.48, 0.45, 0.30, 0.35, 0.20, 0.28, 0.30, 0.25];
  const soilSpectrum = [0.06, 0.08, 0.10, 0.12, 0.20, 0.22, 0.25, 0.23, 0.28, 0.24, 0.30, 0.32, 0.35];
  const waterSpectrum = [0.05, 0.04, 0.03, 0.02, 0.01, 0.01, 0.01, 0.005, 0.005, 0.003, 0.002, 0.002, 0.001];
  
  function generateMixedSpectrum(fVeg) {
    const fSoil = 1 - fVeg;
    const mixed = [];
    
    for (let i = 0; i < wavelengths.length; i++) {
      let val = fVeg * vegSpectrum[i] + fSoil * soilSpectrum[i];
      if (addNoise) {
        val += (Math.random() - 0.5) * 0.02;
      }
      mixed.push(Math.max(0, Math.min(1, val)));
    }
    
    return mixed;
  }
  
  function unmixSpectrum(mixed) {
    // Simple two-endmember unmixing using NIR band (850 nm, index 4)
    const idx = 4;
    const measNIR = mixed[idx];
    const vegNIR = vegSpectrum[idx];
    const soilNIR = soilSpectrum[idx];
    
    const fVegEst = (measNIR - soilNIR) / (vegNIR - soilNIR);
    const fVegClamped = Math.max(0, Math.min(1, fVegEst));
    
    return {
      vegFrac: fVegClamped,
      soilFrac: 1 - fVegClamped
    };
  }
  
  function spectralAngleMapper(mixed) {
    // Calculate angle with vegetation and soil spectra
    let dotVeg = 0, dotSoil = 0;
    let normMixed = 0, normVeg = 0, normSoil = 0;
    
    for (let i = 0; i < wavelengths.length; i++) {
      dotVeg += mixed[i] * vegSpectrum[i];
      dotSoil += mixed[i] * soilSpectrum[i];
      normMixed += mixed[i] * mixed[i];
      normVeg += vegSpectrum[i] * vegSpectrum[i];
      normSoil += soilSpectrum[i] * soilSpectrum[i];
    }
    
    normMixed = Math.sqrt(normMixed);
    normVeg = Math.sqrt(normVeg);
    normSoil = Math.sqrt(normSoil);
    
    const angleVeg = Math.acos(dotVeg / (normMixed * normVeg)) * 180 / Math.PI;
    const angleSoil = Math.acos(dotSoil / (normMixed * normSoil)) * 180 / Math.PI;
    
    return angleVeg < angleSoil ? 'Vegetation-dominated' : 'Soil-dominated';
  }
  
  function calculateRMSE(mixed, estimated) {
    const fVeg = estimated.vegFrac;
    const fSoil = estimated.soilFrac;
    
    let sumSqErr = 0;
    for (let i = 0; i < wavelengths.length; i++) {
      const pred = fVeg * vegSpectrum[i] + fSoil * soilSpectrum[i];
      sumSqErr += (mixed[i] - pred) ** 2;
    }
    
    return Math.sqrt(sumSqErr / wavelengths.length);
  }
  
  function render() {
    const mixed = generateMixedSpectrum(vegFrac);
    const estimated = unmixSpectrum(mixed);
    const rmse = calculateRMSE(mixed, estimated);
    const samClass = spectralAngleMapper(mixed);
    
    document.getElementById('est-veg').textContent = (estimated.vegFrac * 100).toFixed(1);
    document.getElementById('est-soil').textContent = (estimated.soilFrac * 100).toFixed(1);
    document.getElementById('rmse').textContent = rmse.toFixed(4);
    document.getElementById('classification').textContent = samClass;
    
    const series = [];
    
    if (showEndmembers) {
      series.push({
        name: 'Vegetation (pure)',
        type: 'line',
        data: wavelengths.map((w, i) => [w, vegSpectrum[i]]),
        lineStyle: {color: '#2E7D32', width: 2, type: 'dashed'},
        showSymbol: false
      });
      
      series.push({
        name: 'Soil (pure)',
        type: 'line',
        data: wavelengths.map((w, i) => [w, soilSpectrum[i]]),
        lineStyle: {color: '#8D6E63', width: 2, type: 'dashed'},
        showSymbol: false
      });
    }
    
    series.push({
      name: 'Measured spectrum',
      type: 'line',
      data: wavelengths.map((w, i) => [w, mixed[i]]),
      lineStyle: {color: '#1976D2', width: 3},
      symbolSize: 8,
      itemStyle: {color: '#1976D2'}
    });
    
    // Reconstructed spectrum
    const reconstructed = wavelengths.map((w, i) => {
      return [w, estimated.vegFrac * vegSpectrum[i] + estimated.soilFrac * soilSpectrum[i]];
    });
    
    series.push({
      name: 'Unmixed (reconstructed)',
      type: 'line',
      data: reconstructed,
      lineStyle: {color: '#E91E63', width: 2, type: 'dotted'},
      showSymbol: false
    });
    
    // Mark key absorption features
    series.push({
      name: 'Chlorophyll absorption',
      type: 'scatter',
      data: [[670, mixed[2]]],
      symbolSize: 15,
      itemStyle: {color: '#F44336'},
      label: {
        show: true,
        formatter: '670nm\nChl',
        position: 'top',
        fontSize: 10
      }
    });
    
    series.push({
      name: 'NIR plateau',
      type: 'scatter',
      data: [[850, mixed[4]]],
      symbolSize: 15,
      itemStyle: {color: '#4CAF50'},
      label: {
        show: true,
        formatter: '850nm\nNIR',
        position: 'top',
        fontSize: 10
      }
    });
    
    const option = {
      title: {
        text: 'Hyperspectral Reflectance Spectrum',
        left: 'center'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {type: 'cross'}
      },
      legend: {
        data: series.map(s => s.name),
        top: 30,
        type: 'scroll'
      },
      grid: {
        left: 80,
        right: 40,
        top: 80,
        bottom: 60
      },
      xAxis: {
        type: 'value',
        name: 'Wavelength (nm)',
        nameLocation: 'middle',
        nameGap: 30,
        min: 400,
        max: 2500
      },
      yAxis: {
        type: 'value',
        name: 'Reflectance',
        nameLocation: 'middle',
        nameGap: 50,
        min: 0,
        max: 0.6
      },
      series: series
    };
    
    chart.setOption(option, true);
  }
  
  document.getElementById('veg-frac').addEventListener('input', (e) => {
    vegFrac = parseFloat(e.target.value) / 100;
    document.getElementById('veg-val').textContent = e.target.value;
    render();
  });
  
  document.getElementById('add-noise').addEventListener('change', (e) => {
    addNoise = e.target.checked;
    render();
  });
  
  document.getElementById('show-endmembers').addEventListener('change', (e) => {
    showEndmembers = e.target.checked;
    render();
  });
  
  document.getElementById('analysis-method').addEventListener('change', (e) => {
    analysisMethod = e.target.value;
    render();
  });
  
  render();
  
  window.addEventListener('resize', () => chart.resize());
})();
</script>

**Observations:**
- Green dashed line shows pure vegetation spectrum with strong NIR reflectance
- Brown dashed line shows pure soil spectrum with more uniform response
- Blue line with points is measured mixed spectrum
- Pink dotted line is reconstructed spectrum from unmixing
- Red marker at 670 nm shows chlorophyll absorption feature
- Green marker at 850 nm shows NIR plateau characteristic of vegetation
- Unmixing algorithm estimates component fractions from spectral shape
- Adding noise degrades unmixing accuracy but algorithm remains robust
- RMSE quantifies reconstruction quality

**Key insights:**
- Vegetation has distinctive spectral signature with red absorption and NIR reflectance
- Mixed pixels can be decomposed into constituent materials
- Narrow bands enable precise absorption feature measurement
- Spectral libraries provide reference signatures for identification

---

## 6. Interpretation

### Mineral Mapping

**Example - Cuprite, Nevada mining district:**

AVIRIS hyperspectral data identified:
- Kaolinite (2200 nm absorption)
- Alunite (2165 nm absorption)
- Buddingtonite (2125 nm absorption)
- Iron oxides (500-600 nm absorption)

**Economic value:**

Mapping alteration minerals indicates hydrothermal systems associated with ore deposits.

**Advantage over field mapping:**

- Cover large areas rapidly
- Access remote/dangerous terrain
- Objective, repeatable
- Subsurface minerals exposed at surface

### Precision Agriculture

**Crop biochemistry from spectra:**

**Chlorophyll content:**
- Red edge position (700-750 nm)
- Chlorophyll indices using 550, 670, 750 nm

**Water stress:**
- Water absorption at 1400, 1900 nm
- Normalized difference water index

**Nitrogen status:**
- Correlation with chlorophyll
- Red edge shifts with N availability

**Disease detection:**
- Early stress signatures before visual symptoms
- Spectral changes in stressed tissue

**Application:**

Variable-rate fertilizer/pesticide application based on hyperspectral maps.

### Water Quality

**Optically active constituents:**

**Chlorophyll-a (algae):**
- Absorption at 440, 675 nm
- Fluorescence peak at 685 nm

**Suspended sediment:**
- Scattering increases reflectance across all bands
- Particularly strong in red/NIR

**Dissolved organic matter (DOM):**
- Absorption in blue/green
- "Yellow substance"

**Example - Lake Erie harmful algal blooms:**

Hyperspectral imaging from aircraft detects:
- Bloom extent
- Chlorophyll concentration
- Cyanobacteria vs green algae discrimination

**Public health application:**

Toxic cyanobacteria produce microcystin - early detection enables beach closures.

---

## 7. What Could Go Wrong?

### Atmospheric Interference

**Problem:**

Atmosphere absorbs and scatters light.

**Water vapor absorption bands:**
- 1400 nm
- 1900 nm
- 2500+ nm

**In these bands:** Surface reflectance unmeasurable from aircraft/satellite.

**Solution:**
- Atmospheric correction (ATREM, FLAASH algorithms)
- Use bands outside absorption features
- Ground-based measurements for validation

### Endmember Variability

**Assumption:** Pure endmembers have fixed spectra.

**Reality:**
- Vegetation spectra vary with species, health, phenology
- Soil spectra vary with moisture, texture, mineralogy
- Shadows, topography affect apparent spectra

**Problem:**

Using library spectra from different location/time introduces error.

**Solution:**
- Image-derived endmembers (select from actual scene)
- Multiple endmember spectral mixture analysis (MESMA)
- Account for variability in library

### Dimensionality Curse

**High dimensionality** (200+ bands) causes statistical problems:

**Hughes phenomenon:**
- Classification accuracy decreases with too many features
- Need exponentially more training samples

**Multicollinearity:**
- Adjacent bands highly correlated
- Redundant information

**Solution:**
- Dimensionality reduction (PCA, MNF)
- Band selection (choose optimal subset)
- Feature extraction (spectral indices)

### Non-Linear Mixing

**Linear model assumes:**

Photons interact with one material before sensor.

**Reality - multiple scattering:**
- Canopy: Photons bounce between leaves, soil
- Mineral mixtures: Intimate vs areal mixing behave differently

**Non-linear effects** especially strong in:
- Dense vegetation
- Rough surfaces
- Multiple scattering media

**Solution:**
- Non-linear unmixing models
- Radiative transfer modeling
- Acknowledge limitation in interpretation

---

## 8. Extension: Derivative Spectroscopy

**Spectral derivatives** enhance subtle features.

**First derivative:**

$$\frac{d\rho}{d\lambda} \approx \frac{\rho(\lambda_{i+1}) - \rho(\lambda_{i-1})}{2\Delta\lambda}$$

**Second derivative:**

$$\frac{d^2\rho}{d\lambda^2} \approx \frac{\rho(\lambda_{i+1}) - 2\rho(\lambda_i) + \rho(\lambda_{i-1})}{\Delta\lambda^2}$$

**Advantages:**
- Remove background (continuum)
- Enhance narrow absorption features
- Less sensitive to illumination variations

**Red edge derivative:**

First derivative peak position indicates chlorophyll content and plant stress.

**Mineral identification:**

Second derivative reveals overlapping absorption features invisible in original spectrum.

**Challenge:**

Derivatives amplify noise - require smoothing.

---

## 9. Math Refresher: Vector Spaces and Similarity

### Dot Product

**Definition:**

$$\mathbf{a} \cdot \mathbf{b} = \sum_{i=1}^{n} a_i b_i = ||\mathbf{a}|| \cdot ||\mathbf{b}|| \cos\theta$$

Where $\theta$ = angle between vectors.

### Cosine Similarity

**Normalized dot product:**

$$\text{similarity} = \frac{\mathbf{a} \cdot \mathbf{b}}{||\mathbf{a}|| \cdot ||\mathbf{b}||} = \cos\theta$$

**Range:** -1 to +1
- +1: Identical direction
- 0: Orthogonal
- -1: Opposite direction

**Spectral Angle Mapper uses this:**

Angle $\alpha = \arccos(\text{similarity})$

Small angle → high similarity

### Euclidean Distance

$$d = ||\mathbf{a} - \mathbf{b}|| = \sqrt{\sum_{i=1}^{n} (a_i - b_i)^2}$$

**Sensitive to magnitude** - bright and dark versions of same material have large distance.

**Spectral angle insensitive to magnitude** - better for reflectance spectra.

---

## Summary

- Hyperspectral imaging captures hundreds of narrow spectral bands enabling material identification
- Key advantage over multispectral is fine sampling of absorption features diagnostic of composition
- Linear spectral unmixing decomposes mixed pixels into fractional abundances of pure materials
- Spectral Angle Mapper classifies by comparing spectrum shape to reference library
- Applications span mineral exploration, precision agriculture, water quality, and environmental monitoring
- Continuum removal and derivative spectroscopy enhance subtle absorption features
- Principal Component Analysis reduces dimensionality while preserving most variance
- Challenges include atmospheric correction, endmember variability, and non-linear mixing effects
- AVIRIS, EnMAP, PRISMA provide operational hyperspectral data from airborne and spaceborne platforms
- Critical tool for biochemical and mineralogical mapping from remote platforms

---
