---
layout: essay
title: "Change Detection in Satellite Imagery"
subtitle: "Finding what changed between two dates using multi-temporal analysis"
date: 2026-02-27
categories: [modeling]
series: computational-geography-spatial
series_order: 12
cluster: N
cluster_title: "Remote Sensing Applications"
tags:
  - computational-geography
  - modeling
  - gis
  - remote-sensing
  - change-detection
  - time-series
  - land-cover-change
  - deforestation
math: true
viz: true
difficulty: 3
math_core: [image-differencing, ratio-methods, change-vector-analysis, thresholding]
spatial_reasoning: 3
dynamics: 2
computation: 3
domain: [remote-sensing, environmental-monitoring, deforestation, urban-growth]
excerpt: >
  Where did deforestation occur? How much urban area expanded? What burned in the
  wildfire? Change detection compares satellite images from different dates to map
  what changed. This essay derives image differencing, NDVI change, change vector
  analysis, and post-classification comparison methods.
math_prerequisites: >
  Vegetation indices (Essay 25). Image classification (Essay 39). Basic statistics
  (mean, standard deviation). We'll introduce change detection algorithms.
---

## 1. The Question

How much forest was lost between 2010 and 2020?

**Change detection** identifies where and what type of change occurred:

**Applications:**
- **Deforestation:** Forest loss mapping
- **Urban growth:** City expansion tracking
- **Agriculture:** Crop rotation patterns
- **Disaster assessment:** Flood/fire damage extent
- **Coastal change:** Erosion, land reclamation
- **Mining:** Excavation monitoring

**Challenges:**
- **Phenology:** Seasonal vegetation differences (not real change)
- **Sensor differences:** Different satellites/settings
- **Atmospheric conditions:** Clouds, haze, sun angle
- **Registration:** Images must align precisely

The mathematical question: Given two co-registered images from different dates, how do we reliably identify actual change while minimizing false positives from natural variation?

---

## 2. The Conceptual Model

### Types of Change

**1. Land Cover Conversion**
- Forest → Urban (permanent)
- Cropland → Wetland (land use change)

**2. Condition Change**
- Healthy forest → Degraded forest (same class, different state)
- Dense vegetation → Sparse vegetation

**3. Temporary vs. Permanent**
- Snow cover (temporary)
- Deforestation (permanent)
- Crop harvest (seasonal)

### Change Detection Methods

**1. Image Differencing**

$$\Delta = \text{Image}_2 - \text{Image}_1$$

**Threshold** to identify significant change.

**2. Image Ratioing**

$$R = \frac{\text{Image}_2}{\text{Image}_1}$$

**Less sensitive to illumination** differences.

**3. NDVI Differencing**

$$\Delta\text{NDVI} = \text{NDVI}_2 - \text{NDVI}_1$$

**Negative** = vegetation loss  
**Positive** = vegetation gain

**4. Change Vector Analysis (CVA)**

Compute magnitude and direction of change in multi-dimensional space.

**5. Post-Classification Comparison**

Classify each image independently, then compare classes:

$$\text{Change} = (\text{Class}_1 \neq \text{Class}_2)$$

---

## 3. Building the Mathematical Model

### Image Differencing

**For band $i$:**

$$\Delta_i = DN_{i,t_2} - DN_{i,t_1}$$

Where $DN$ = digital number (pixel value).

**Change threshold:**

$$|\Delta_i| > T_i$$

**T can be:**
- **Fixed:** e.g., $T = 20$ (DN units)
- **Statistical:** $T = k\sigma$ where $\sigma$ = standard deviation of $\Delta_i$ over stable areas
- **Adaptive:** Vary spatially based on local variance

**Typical:** $T = 2\sigma$ or $3\sigma$ (95% or 99.7% confidence)

### NDVI Change Detection

**NDVI at time $t$:**

$$\text{NDVI}_t = \frac{\text{NIR}_t - \text{Red}_t}{\text{NIR}_t + \text{Red}_t}$$

**Change:**

$$\Delta\text{NDVI} = \text{NDVI}_{t_2} - \text{NDVI}_{t_1}$$

**Interpretation:**
- $\Delta\text{NDVI} < -0.2$: Significant vegetation loss (deforestation, fire)
- $-0.2 \leq \Delta\text{NDVI} < -0.1$: Moderate degradation
- $-0.1 \leq \Delta\text{NDVI} \leq 0.1$: No change (stable)
- $\Delta\text{NDVI} > 0.1$: Vegetation increase (regrowth, greening)

**Advantages:**
- Normalized (reduces illumination effects)
- Directly interpretable (vegetation change)
- Works across sensors

### Change Vector Analysis (CVA)

**Multi-band approach:** Treat each pixel as vector in $n$-dimensional space.

**Change vector:**

$$\Delta\mathbf{x} = \mathbf{x}_{t_2} - \mathbf{x}_{t_1}$$

Where $\mathbf{x} = (B_1, B_2, \ldots, B_n)$ is spectral vector.

**Change magnitude:**

$$M = ||\Delta\mathbf{x}|| = \sqrt{\sum_{i=1}^{n} (B_{i,t_2} - B_{i,t_1})^2}$$

**Change direction:**

$$\theta = \arctan\left(\frac{\Delta B_2}{\Delta B_1}\right)$$

(For 2D case; generalizes to $n$ dimensions)

**Interpretation:**
- **Magnitude:** How much changed
- **Direction:** Type of change (e.g., vegetation loss vs. urban growth have different spectral trajectories)

### Post-Classification Comparison

**Algorithm:**

```
1. Classify Image_t1 → Map_t1
2. Classify Image_t2 → Map_t2
3. Create change matrix:
   
   For each pixel (i, j):
       if Map_t1[i,j] != Map_t2[i,j]:
           Change[i,j] = type of transition
       else:
           Change[i,j] = no change
```

**Change matrix (transition table):**

|            | Forest_t2 | Urban_t2 | Water_t2 |
|------------|-----------|----------|----------|
| Forest_t1  | 8500      | 450      | 50       |
| Urban_t1   | 20        | 1200     | 0        |
| Water_t1   | 5         | 10       | 285      |

**Analysis:**
- Diagonal: No change (stable)
- Off-diagonal: Change
- 450 pixels: Forest → Urban (deforestation + urbanization)

**Advantage:** Provides "from-to" information

**Disadvantage:** Errors in both classifications compound

---

## 4. Worked Example by Hand

**Problem:** Detect forest loss using NDVI differencing.

**Pixel values:**

**Date 1 (2015):**
- Red = 0.08, NIR = 0.42

**Date 2 (2020):**
- Red = 0.25, NIR = 0.28

### Solution

**Step 1: Calculate NDVI for each date**

**Date 1:**

$$\text{NDVI}_1 = \frac{0.42 - 0.08}{0.42 + 0.08} = \frac{0.34}{0.50} = 0.68$$

**Date 2:**

$$\text{NDVI}_2 = \frac{0.28 - 0.25}{0.28 + 0.25} = \frac{0.03}{0.53} = 0.057$$

**Step 2: Calculate NDVI change**

$$\Delta\text{NDVI} = 0.057 - 0.68 = -0.623$$

**Step 3: Interpret**

**Large negative change** ($< -0.2$) → **Significant vegetation loss**

**Likely:** Deforestation or land clearing occurred between 2015 and 2020.

**Original pixel:** Dense vegetation (NDVI = 0.68, healthy forest)  
**New pixel:** Bare soil or sparse vegetation (NDVI = 0.057)

**Conclusion:** Forest loss detected.

---

## 5. Computational Implementation

Below is an interactive change detection demo.

<div class="viz-container" id="change-viz">
  <div class="controls">
    <label>
      Change detection method:
      <select id="change-method">
        <option value="ndvi-diff" selected>NDVI Differencing</option>
        <option value="image-diff">Image Differencing (NIR)</option>
        <option value="cva">Change Vector Analysis</option>
      </select>
    </label>
    <label>
      Change threshold:
      <input type="range" id="change-threshold" min="0.1" max="0.5" step="0.05" value="0.2">
      <span id="threshold-value">0.20</span>
    </label>
    <label>
      Show change areas only:
      <input type="checkbox" id="show-change-only">
    </label>
    <div class="change-info">
      <p><strong>Total pixels:</strong> <span id="total-pixels">--</span></p>
      <p><strong>Changed pixels:</strong> <span id="changed-pixels">--</span></p>
      <p><strong>Change rate:</strong> <span id="change-rate">--</span>%</p>
    </div>
  </div>
  <div id="change-canvas-container">
    <canvas id="change-canvas" width="700" height="350" style="border: 1px solid #ddd;"></canvas>
  </div>
</div>

<script type="module">
(function() {
  const canvas = document.getElementById('change-canvas');
  const ctx = canvas.getContext('2d');
  
  let method = 'ndvi-diff';
  let threshold = 0.2;
  let showChangeOnly = false;
  
  const size = 50;
  const cellSize = 7;
  
  // Generate synthetic bi-temporal imagery
  const time1 = {red: [], nir: []};
  const time2 = {red: [], nir: []};
  
  // Create forest with clearcut region
  for (let i = 0; i < size; i++) {
    const rowRed1 = [], rowNIR1 = [];
    const rowRed2 = [], rowNIR2 = [];
    
    for (let j = 0; j < size; j++) {
      // Time 1: All forest
      const base = 0.05 + Math.random() * 0.03;
      rowRed1.push(base);
      rowNIR1.push(0.40 + Math.random() * 0.05);
      
      // Time 2: Clearcut in specific region
      const inClearcut = (i > 15 && i < 35 && j > 20 && j < 40);
      
      if (inClearcut) {
        // Deforested: high red, low NIR
        rowRed2.push(0.25 + Math.random() * 0.05);
        rowNIR2.push(0.15 + Math.random() * 0.05);
      } else {
        // Stable forest
        rowRed2.push(base);
        rowNIR2.push(0.40 + Math.random() * 0.05);
      }
    }
    
    time1.red.push(rowRed1);
    time1.nir.push(rowNIR1);
    time2.red.push(rowRed2);
    time2.nir.push(rowNIR2);
  }
  
  function computeNDVI(red, nir) {
    const ndvi = [];
    for (let i = 0; i < size; i++) {
      const row = [];
      for (let j = 0; j < size; j++) {
        const val = (nir[i][j] - red[i][j]) / (nir[i][j] + red[i][j]);
        row.push(val);
      }
      ndvi.push(row);
    }
    return ndvi;
  }
  
  function detectChangeNDVI(thresh) {
    const ndvi1 = computeNDVI(time1.red, time1.nir);
    const ndvi2 = computeNDVI(time2.red, time2.nir);
    
    const change = [];
    let changedCount = 0;
    
    for (let i = 0; i < size; i++) {
      const row = [];
      for (let j = 0; j < size; j++) {
        const diff = ndvi2[i][j] - ndvi1[i][j];
        const changed = Math.abs(diff) > thresh;
        row.push({changed, magnitude: diff});
        if (changed) changedCount++;
      }
      change.push(row);
    }
    
    return {change, changedCount};
  }
  
  function detectChangeImageDiff(thresh) {
    const change = [];
    let changedCount = 0;
    
    for (let i = 0; i < size; i++) {
      const row = [];
      for (let j = 0; j < size; j++) {
        const diff = time2.nir[i][j] - time1.nir[i][j];
        const changed = Math.abs(diff) > thresh;
        row.push({changed, magnitude: diff});
        if (changed) changedCount++;
      }
      change.push(row);
    }
    
    return {change, changedCount};
  }
  
  function detectChangeCVA(thresh) {
    const change = [];
    let changedCount = 0;
    
    for (let i = 0; i < size; i++) {
      const row = [];
      for (let j = 0; j < size; j++) {
        const dRed = time2.red[i][j] - time1.red[i][j];
        const dNIR = time2.nir[i][j] - time1.nir[i][j];
        const magnitude = Math.sqrt(dRed**2 + dNIR**2);
        const changed = magnitude > thresh;
        row.push({changed, magnitude});
        if (changed) changedCount++;
      }
      change.push(row);
    }
    
    return {change, changedCount};
  }
  
  function drawImage(data, x, y, title) {
    const ndvi = computeNDVI(data.red, data.nir);
    
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        const val = ndvi[i][j];
        const green = Math.floor(255 * val);
        ctx.fillStyle = `rgb(100, ${green}, 100)`;
        ctx.fillRect(x + j * cellSize, y + i * cellSize, cellSize, cellSize);
      }
    }
    
    // Title
    ctx.fillStyle = '#2C3E50';
    ctx.font = 'bold 12px sans-serif';
    ctx.fillText(title, x + 5, y - 5);
  }
  
  function drawChange(changeData, x, y, title) {
    const {change, changedCount} = changeData;
    
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        if (showChangeOnly && !change[i][j].changed) {
          ctx.fillStyle = '#FFFFFF';
        } else if (change[i][j].changed) {
          // Color by magnitude
          const mag = change[i][j].magnitude;
          if (mag < 0) {
            // Loss (red)
            const intensity = Math.min(255, Math.floor(Math.abs(mag) * 400));
            ctx.fillStyle = `rgb(${intensity}, 0, 0)`;
          } else {
            // Gain (green)
            const intensity = Math.min(255, Math.floor(mag * 400));
            ctx.fillStyle = `rgb(0, ${intensity}, 0)`;
          }
        } else {
          // No change (gray)
          ctx.fillStyle = '#CCCCCC';
        }
        
        ctx.fillRect(x + j * cellSize, y + i * cellSize, cellSize, cellSize);
      }
    }
    
    // Stats
    const totalPixels = size * size;
    const changeRate = (changedCount / totalPixels * 100).toFixed(1);
    
    document.getElementById('total-pixels').textContent = totalPixels;
    document.getElementById('changed-pixels').textContent = changedCount;
    document.getElementById('change-rate').textContent = changeRate;
    
    // Title
    ctx.fillStyle = '#2C3E50';
    ctx.font = 'bold 12px sans-serif';
    ctx.fillText(title, x + 5, y - 5);
  }
  
  function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Top row: Time 1 and Time 2
    drawImage(time1, 10, 30, 'Time 1 (2015)');
    drawImage(time2, 10 + size * cellSize + 20, 30, 'Time 2 (2020)');
    
    // Bottom row: Change detection
    let changeData;
    if (method === 'ndvi-diff') {
      changeData = detectChangeNDVI(threshold);
    } else if (method === 'image-diff') {
      changeData = detectChangeImageDiff(threshold);
    } else {
      changeData = detectChangeCVA(threshold);
    }
    
    drawChange(changeData, 10 + (size * cellSize + 20) * 2, 30, 
               `Change Map (${method})`);
    
    // Legend
    ctx.fillStyle = '#2C3E50';
    ctx.font = '11px sans-serif';
    ctx.fillText('Red = Loss | Green = Gain | Gray = No change', 10, 20);
  }
  
  document.getElementById('change-method').addEventListener('change', (e) => {
    method = e.target.value;
    render();
  });
  
  document.getElementById('change-threshold').addEventListener('input', (e) => {
    threshold = parseFloat(e.target.value);
    document.getElementById('threshold-value').textContent = threshold.toFixed(2);
    render();
  });
  
  document.getElementById('show-change-only').addEventListener('change', (e) => {
    showChangeOnly = e.target.checked;
    render();
  });
  
  render();
})();
</script>

**Try this:**
- **NDVI differencing:** Most sensitive to vegetation change
- **Image differencing:** Simple NIR band comparison
- **Change vector analysis:** Uses both Red and NIR together
- **Adjust threshold:** Higher = only major changes detected
- **Show change only:** Isolates just the changed areas (red/green)
- **Time 1:** All forest (uniformly green)
- **Time 2:** Clearcut region visible (less green)
- **Change map:** Red shows deforestation area clearly!

**Key insight:** Change detection reveals WHERE and HOW MUCH changed—critical for monitoring deforestation, urbanization, and disasters!

---

## 6. Interpretation

### Global Forest Change

**Hansen et al. (2013)** Global Forest Change dataset:
- 30m resolution, 2000-2023
- Annual forest loss maps
- Based on Landsat time series
- Free, publicly available

**Method:** NDVI-based change detection + classification

**Findings:**
- ~1.5 million km² forest lost 2000-2012
- Brazil, Indonesia, Canada largest losses
- Tropics most dynamic

### Urban Growth Monitoring

**Nighttime lights** change detection:
- VIIRS/DMSP satellite data
- Increase in lights = urbanization
- Independent of weather/season

**NDVI decrease + impervious surface increase** = urban expansion

### Disaster Assessment

**Rapid mapping after events:**

**Floods:**
- Water extent change (NIR differencing)
- Pre-flood vs. during flood

**Wildfires:**
- NDVI drop in burned areas
- Burn severity mapping (dNBR)

**Earthquakes:**
- Building collapse (texture change)
- Landslides (slope failure)

### Agricultural Monitoring

**Crop rotation:**
- Annual land cover change
- Corn-soybean patterns

**Irrigation expansion:**
- NDVI increase in arid regions
- Water use monitoring

---

## 7. What Could Go Wrong?

### Phenological Differences

**Images from different seasons:**

```
Time 1: July (peak green)
Time 2: November (senescence)

Result: ΔNDVI < 0 everywhere (false change!)
```

**Solution:**
- Use anniversary dates (same month/season)
- Or normalize for phenology using time series
- Multi-year baseline to understand natural variation

### Atmospheric Differences

**Haze, clouds, sun angle** affect reflectance.

**Apparent change** from atmospheric conditions, not land cover.

**Solution:**
- Atmospheric correction (essential!)
- Cloud masking
- Surface reflectance products (pre-corrected)

### Registration Errors

**Images misaligned by 1-2 pixels:**

**Edge pixels** show false change.

**Solution:**
- Co-registration (align precisely)
- Sub-pixel accuracy (<0.5 pixel)
- Buffer stable features to avoid edges

### Classification Error Propagation

**Post-classification comparison:**

If each classification is 90% accurate:

**Overall accuracy** of change detection ≈ $0.9 \times 0.9 = 81\%$

**Errors compound!**

**Solution:**
- Use direct change detection (differencing) when possible
- Improve individual classifications first

---

## 8. Extension: Continuous Change Detection

**Traditional:** Compare two dates (binary change/no-change)

**Time series approach:** Continuous monitoring

**BFAST (Breaks For Additive Season and Trend):**

Decomposes time series into:
- Trend (long-term change)
- Seasonal (phenology)
- Remainder (noise + abrupt changes)

**Detects:**
- Gradual change (forest degradation)
- Abrupt change (clearcut)
- Timing of change (when it occurred)

**LandTrendr (Landsat-based Detection of Trends in Disturbance and Recovery):**

Fits segmented trajectories to NDVI time series:
- Growth (reforestation)
- Decline (degradation)
- Stable (no change)

**Advantage:** Richer information than two-date comparison

---

## 9. Math Refresher: Statistical Thresholding

### Normal Distribution Assumption

If $\Delta$ values for "no change" pixels follow normal distribution:

$$\Delta \sim N(0, \sigma^2)$$

**Change threshold:**

$$T = \mu + k\sigma$$

Where:
- $\mu$ = mean (ideally 0 for radiometric correction)
- $\sigma$ = standard deviation
- $k$ = 2 (95% confidence) or 3 (99.7% confidence)

### Estimating σ from Data

**Use stable areas** (known no-change):

```
1. Identify stable regions (water, urban cores)
2. Calculate Δ for these pixels
3. Estimate σ = std(Δ_stable)
4. Set T = k*σ
```

### ROC Analysis

**Receiver Operating Characteristic:**

Plot True Positive Rate vs. False Positive Rate for different thresholds.

**Optimal threshold:** Maximize TPR while minimizing FPR

**Area Under Curve (AUC):** Measure of classifier quality
- AUC = 1.0: Perfect
- AUC = 0.5: Random

---

## Summary

- **Change detection** identifies where land cover changed between two dates
- **Image differencing:** Simple subtraction, threshold for significant change
- **NDVI differencing:** Normalized, reduces illumination effects, vegetation-specific
- **Change vector analysis (CVA):** Multi-band magnitude and direction
- **Post-classification comparison:** Provides from-to change matrix
- **Threshold selection:** 2-3 standard deviations from stable area variation
- **Applications:** Deforestation, urban growth, disaster assessment, agriculture
- **Challenges:** Phenology, atmosphere, registration errors, classification error propagation
- **Time series methods:** BFAST, LandTrendr for continuous monitoring
- Critical for environmental monitoring and reporting (e.g., REDD+, SDG indicators)

**FINAL ESSAY COMING UP!** Essay 41: Time Series Analysis - then Series 3 is COMPLETE! 🎯

---
