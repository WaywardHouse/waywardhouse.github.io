---
layout: essay
title: "InSAR Deformation Monitoring"
subtitle: "Measuring millimeter-scale ground motion with radar interferometry"
date: 2026-02-27
categories: [modeling]
series: computational-geography-advanced-sensing
series_order: 6
cluster: T
cluster_title: "Active Ranging Systems"
tags:
  - computational-geography
  - remote-sensing
  - insar
  - interferometry
  - deformation
  - earthquakes
  - volcanoes
  - subsidence
math: true
viz: true
difficulty: 5
math_core: [phase-interferometry, unwrapping, coherence, baseline-geometry]
spatial_reasoning: 4
dynamics: 4
computation: 4
domain: [geophysics, hazards, infrastructure-monitoring, tectonics]
excerpt: >
  How do we measure ground deformation with millimeter precision from satellites?
  Interferometric SAR (InSAR) compares phase differences between radar images to
  detect surface motion. This essay derives interferometric phase equations,
  implements phase unwrapping algorithms, demonstrates coherence analysis, and
  shows applications from earthquake mapping to volcano monitoring.
math_prerequisites: >
  SAR principles (Essay 56). Complex numbers. Phase concepts. We'll introduce
  interferometry and differential processing from first principles.
---

## 1. The Question

How much did the ground move during this earthquake?

**InSAR (Interferometric Synthetic Aperture Radar):**

Compares phase between two SAR acquisitions to measure surface displacement.

**Phase sensitivity:**

One wavelength = 2π radians phase change

**C-band (λ = 5.6 cm):**

2.8 cm motion → π radians (half cycle)

**Detection limit:** ~1 mm with averaging

**Principle:**

$$\Delta \phi = \frac{4\pi}{\lambda} \Delta R$$

Where:
- $\Delta \phi$ = phase difference
- $\lambda$ = wavelength
- $\Delta R$ = range change (line-of-sight displacement)

**Applications:**
- Earthquake deformation mapping
- Volcano inflation/deflation
- Landslide motion
- Subsidence (groundwater, mining)
- Glacier flow
- Infrastructure monitoring (buildings, dams)

**Sensors:**
- Sentinel-1 (C-band, free/open)
- ALOS-2 (L-band, coherent in vegetation)
- NISAR (L+S band, launching 2024)
- TerraSAR-X (X-band, high resolution)

---

## 2. The Conceptual Model

### Interferometric Phase

**Complex SAR signal:**

$$s = A e^{i\phi}$$

Where:
- $A$ = amplitude (backscatter)
- $\phi$ = phase (range × 4π/λ)

**Two acquisitions:**

$$s_1 = A_1 e^{i\phi_1}$$
$$s_2 = A_2 e^{i\phi_2}$$

**Interferogram:**

$$s_1 s_2^* = A_1 A_2 e^{i(\phi_1 - \phi_2)} = A_{int} e^{i\Delta\phi}$$

**Phase difference components:**

$$\Delta \phi = \phi_{\text{topo}} + \phi_{\text{defo}} + \phi_{\text{atm}} + \phi_{\text{noise}}$$

**Topography:** Baseline-dependent (satellite separation)  
**Deformation:** Surface motion  
**Atmosphere:** Water vapor variation  
**Noise:** Temporal decorrelation

### Baseline Geometry

**Perpendicular baseline ($B_{\perp}$):**

Satellite separation perpendicular to look direction.

**Critical baseline:**

$$B_c = \frac{\lambda R \tan\theta}{2\delta_r}$$

Where:
- $R$ = range
- $\theta$ = incidence angle
- $\delta_r$ = range resolution

**Typical:** $B_c \approx 1-5$ km

**If $B_{\perp} > B_c$:** Decorrelation (no fringes)

**Optimal:** $B_{\perp} = 50-300$ m (topography sensitivity without decorrelation)

### Phase Unwrapping

**Interferometric phase wrapped** to [-π, π].

**True phase:** Multiples of 2π unknown.

$$\phi_{\text{unwrapped}} = \phi_{\text{wrapped}} + 2\pi n$$

Where $n$ = integer (fringe count).

**Challenge:** Determine $n$ spatially.

**Methods:**
- Path-following algorithms
- Minimum cost flow
- Statistical-cost network flow (SNAPHU)

**Ambiguities at:**
- Low coherence
- Phase discontinuities (faults, landslides)
- Decorrelated areas

---

## 3. Building the Mathematical Model

### Range Change to Phase

**Radar measures range:**

$$R = \frac{c \times t}{2}$$

**Phase proportional to range:**

$$\phi = \frac{4\pi R}{\lambda}$$

**Range change:**

$$\Delta R = R_2 - R_1$$

**Phase change:**

$$\Delta \phi = \frac{4\pi}{\lambda}(R_2 - R_1) = \frac{4\pi \Delta R}{\lambda}$$

**Factor 4π:** Two-way path (down and up)

**Line-of-sight displacement:**

$$d_{LOS} = \Delta R = \frac{\lambda \Delta \phi}{4\pi}$$

**Example:** C-band, $\Delta \phi = \pi$ radians

$$d_{LOS} = \frac{0.056 \times \pi}{4\pi} = 0.014 \text{ m} = 14 \text{ mm}$$

**Half wavelength** displacement = π phase.

### Topographic Phase Removal

**DEM-based correction:**

**Topographic phase:**

$$\phi_{\text{topo}} = \frac{4\pi B_{\perp}}{\lambda R \sin\theta} h$$

Where:
- $B_{\perp}$ = perpendicular baseline
- $h$ = elevation

**Simulate from DEM:**

Given external DEM (SRTM, etc.), calculate expected topographic phase.

**Subtract from interferogram:**

$$\phi_{\text{defo}} = \Delta \phi - \phi_{\text{topo}}$$

**Differential InSAR (DInSAR):**

Isolates deformation signal.

**Residual topography:**

If DEM error = 10 m, $B_{\perp} = 100$ m:

$$\Delta \phi_{\text{error}} = \frac{4\pi \times 100}{0.056 \times 800000 \times 0.574} \times 10 \approx 0.5 \text{ rad}$$

**Significant!** DEM accuracy critical.

### Coherence

**Measure of phase quality:**

$$\gamma = \frac{|\sum s_1 s_2^*|}{\sqrt{\sum |s_1|^2 \sum |s_2|^2}}$$

**Range:** 0 to 1

**$\gamma > 0.7$:** Good (reliable phase)  
**$\gamma = 0.3-0.7$:** Moderate (questionable)  
**$\gamma < 0.3$:** Poor (unusable)

**Decorrelation sources:**
- Temporal (vegetation motion, soil moisture)
- Geometric (baseline too large)
- Volume (penetration depth change)
- Thermal (instrument noise)

**L-band advantages:**

Less temporal decorrelation (deeper penetration, stable phase).

**Urban areas:**

High coherence (stable scatterers, little change).

---

## 4. Worked Example by Hand

**Problem:** Calculate displacement from interferometric phase.

**InSAR parameters:**
- Wavelength: 5.6 cm (C-band, Sentinel-1)
- Perpendicular baseline: 80 m
- Incidence angle: 39°
- DEM elevation: 450 m
- Range: 850 km

**Interferogram phase at pixel:** 2.5 radians

**After topographic correction:** 1.8 radians

Calculate line-of-sight displacement.

### Solution

**Step 1: Topographic phase (verify)**

$$\phi_{\text{topo}} = \frac{4\pi \times 80}{0.056 \times 850000 \times \sin(39°)} \times 450$$

$$= \frac{1005.3}{0.056 \times 850000 \times 0.629} \times 450$$

$$= \frac{1005.3}{29932} \times 450 = 0.0336 \times 450 = 15.1 \text{ rad}$$

Wait, this seems large. Let me recalculate more carefully:

$$\phi_{\text{topo}} = \frac{4\pi B_{\perp} h}{\lambda R \sin\theta}$$

$$= \frac{4 \times 3.14159 \times 80 \times 450}{0.056 \times 850000 \times 0.629}$$

$$= \frac{452389}{29932} = 15.1 \text{ rad}$$

This wraps to: $15.1 - 4(2\pi) = 15.1 - 25.1 = -10.0 \rightarrow$ wraps to $15.1 \mod 2\pi = 2.5$ rad

**Matches observed!** (Before correction)

**Step 2: After correction**

Residual phase = 1.8 rad (given after removing topography)

**This is deformation phase.**

**Step 3: Line-of-sight displacement**

$$d_{LOS} = \frac{\lambda \times \phi}{4\pi} = \frac{0.056 \times 1.8}{4\pi} = \frac{0.101}{12.566} = 0.008 \text{ m} = 8 \text{ mm}$$

**Step 4: Interpret**

8 mm displacement in line-of-sight (toward/away from satellite).

**Positive phase:** Motion away from satellite (subsidence if descending orbit)

**Step 5: Uncertainty**

If coherence = 0.8, phase std dev ≈ 0.3 rad:

$$\sigma_{LOS} = \frac{0.056 \times 0.3}{4\pi} = 1.3 \text{ mm}$$

**Result: 8 ± 1 mm displacement**

---

## 5. Computational Implementation

Below is an interactive InSAR simulator.

<div class="viz-container" id="insar-viz">
  <div class="controls">
    <label>
      Deformation type:
      <select id="defo-type">
        <option value="earthquake" selected>Earthquake (dip-slip)</option>
        <option value="volcano">Volcano (inflation)</option>
        <option value="subsidence">Subsidence (linear)</option>
        <option value="landslide">Landslide</option>
      </select>
    </label>
    <label>
      Magnitude:
      <input type="range" id="magnitude" min="1" max="10" step="1" value="5">
      <span id="mag-val">5</span> cm
    </label>
    <label>
      Temporal baseline (days):
      <input type="range" id="temporal-baseline" min="12" max="365" step="12" value="24">
      <span id="temporal-val">24</span>
    </label>
    <div class="insar-info">
      <p><strong>Max phase change:</strong> <span id="max-phase">--</span> rad</p>
      <p><strong>Fringe count:</strong> <span id="fringe-count">--</span></p>
      <p><strong>Coherence:</strong> <span id="coherence">--</span></p>
      <p><strong>Usable area:</strong> <span id="usable-area">--</span>%</p>
    </div>
  </div>
  <div id="insar-canvas-container">
    <canvas id="insar-canvas" width="700" height="400" style="border: 1px solid #ddd;"></canvas>
  </div>
</div>

<script type="module">
(function() {
  const canvas = document.getElementById('insar-canvas');
  const ctx = canvas.getContext('2d');
  
  let defoType = 'earthquake';
  let magnitude = 5; // cm
  let temporalBaseline = 24; // days
  
  const wavelength = 0.056; // m (C-band)
  
  function generateDeformation(type, mag) {
    const width = 200;
    const height = 150;
    const defo = [];
    
    for (let y = 0; y < height; y++) {
      const row = [];
      for (let x = 0; x < width; x++) {
        let d = 0; // meters
        
        if (type === 'earthquake') {
          // Fault at x=100, dip-slip
          const dist = Math.abs(x - 100);
          if (x < 100) {
            d = -mag/100 * Math.exp(-dist/30);
          } else {
            d = mag/100 * Math.exp(-dist/30);
          }
          
        } else if (type === 'volcano') {
          // Mogi source at center
          const dx = x - width/2;
          const dy = y - height/2;
          const r = Math.sqrt(dx*dx + dy*dy);
          d = mag/100 * Math.exp(-r/40);
          
        } else if (type === 'subsidence') {
          // Uniform subsidence in center
          const dx = x - width/2;
          const dy = y - height/2;
          const r = Math.sqrt(dx*dx + dy*dy);
          if (r < 50) {
            d = -mag/100 * (1 - r/50);
          }
          
        } else if (type === 'landslide') {
          // Downslope motion
          if (y > 50 && y < 100 && x > 80 && x < 120) {
            d = -mag/100 * (y - 50) / 50;
          }
        }
        
        row.push(d);
      }
      defo.push(row);
    }
    
    return defo;
  }
  
  function deformationToPhase(defo) {
    return defo.map(row => 
      row.map(d => (4 * Math.PI * d) / wavelength)
    );
  }
  
  function wrapPhase(phase) {
    // Wrap to [-π, π]
    while (phase > Math.PI) phase -= 2 * Math.PI;
    while (phase < -Math.PI) phase += 2 * Math.PI;
    return phase;
  }
  
  function calculateCoherence(temporalDays) {
    // Simplified coherence decay
    const decay = 0.002 * temporalDays; // 0.002/day
    return Math.max(0.3, 1.0 - decay);
  }
  
  function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const defo = generateDeformation(defoType, magnitude);
    const phase = deformationToPhase(defo);
    
    // Calculate statistics
    let maxPhase = 0;
    for (let row of phase) {
      for (let p of row) {
        maxPhase = Math.max(maxPhase, Math.abs(p));
      }
    }
    
    const fringeCount = Math.floor(maxPhase / (2 * Math.PI));
    const coherence = calculateCoherence(temporalBaseline);
    const usableArea = coherence > 0.5 ? 85 : coherence > 0.3 ? 60 : 30;
    
    document.getElementById('max-phase').textContent = maxPhase.toFixed(1);
    document.getElementById('fringe-count').textContent = fringeCount;
    document.getElementById('coherence').textContent = coherence.toFixed(2);
    document.getElementById('usable-area').textContent = usableArea;
    
    // Draw interferogram (wrapped phase)
    const scale = 3;
    
    for (let y = 0; y < phase.length; y++) {
      for (let x = 0; x < phase[y].length; x++) {
        const p = wrapPhase(phase[y][x]);
        
        // Add coherence noise
        const noisePhase = coherence > 0.5 ? p : p + (Math.random() - 0.5) * Math.PI * (1 - coherence);
        
        // Color mapping: phase to HSV
        const hue = ((noisePhase + Math.PI) / (2 * Math.PI)) * 360;
        const sat = coherence * 100;
        const val = 80;
        
        ctx.fillStyle = `hsl(${hue}, ${sat}%, ${val}%)`;
        ctx.fillRect(x * scale, y * scale, scale, scale);
      }
    }
    
    // Color wheel legend
    const legendX = 620;
    const legendY = 50;
    const legendR = 30;
    
    for (let angle = 0; angle < 360; angle += 2) {
      const rad = angle * Math.PI / 180;
      const x1 = legendX + Math.cos(rad) * legendR;
      const y1 = legendY + Math.sin(rad) * legendR;
      const x2 = legendX + Math.cos(rad) * (legendR + 10);
      const y2 = legendY + Math.sin(rad) * (legendR + 10);
      
      ctx.strokeStyle = `hsl(${angle}, 80%, 70%)`;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    }
    
    ctx.fillStyle = '#263238';
    ctx.font = '11px sans-serif';
    ctx.fillText('+π', legendX + legendR + 15, legendY + 5);
    ctx.fillText('-π', legendX - legendR - 25, legendY + 5);
    ctx.fillText('0', legendX + 5, legendY - legendR - 5);
    ctx.fillText('Phase', legendX - 15, legendY + legendR + 20);
    
    // Labels
    ctx.font = 'bold 14px sans-serif';
    ctx.fillText('Wrapped Interferogram', 10, 20);
    ctx.font = '12px sans-serif';
    ctx.fillText('Each color cycle = one fringe (λ/2)', 10, 460);
  }
  
  document.getElementById('defo-type').addEventListener('change', (e) => {
    defoType = e.target.value;
    render();
  });
  
  document.getElementById('magnitude').addEventListener('input', (e) => {
    magnitude = parseFloat(e.target.value);
    document.getElementById('mag-val').textContent = magnitude;
    render();
  });
  
  document.getElementById('temporal-baseline').addEventListener('input', (e) => {
    temporalBaseline = parseFloat(e.target.value);
    document.getElementById('temporal-val').textContent = temporalBaseline;
    render();
  });
  
  render();
})();
</script>

**Observations:**
- Each color cycle represents one fringe (half wavelength displacement)
- Earthquake shows characteristic fault offset pattern
- Volcano displays concentric fringes (radial deformation)
- Longer temporal baseline reduces coherence
- Low coherence adds phase noise (color speckle)
- Fringe density indicates displacement gradient

**Key insights:**
- Interferometric phase directly measures ground motion
- Color fringes visualize deformation field
- Coherence critical for phase quality
- Unwrapping required to convert fringes to absolute displacement

---

## 6. Interpretation

### Earthquake Deformation

**2019 Ridgecrest, California (M7.1):**

InSAR captured:
- 150 km fault rupture extent
- Up to 5 m slip
- Distributed deformation pattern
- Off-fault deformation

**Advantages over field measurements:**
- Complete spatial coverage
- Rapid (hours after quake)
- No ground access needed
- Archives pre-event images

**Slip inversion:**

Constrain fault geometry and slip distribution:
- Input: InSAR displacement field
- Model: Elastic dislocation (Okada)
- Invert for: Fault depth, dip, strike, slip

**Accuracy:** ±5-10 cm displacement, ±1 km fault location

### Volcano Monitoring

**Kilauea, Hawaii:**

Continuous InSAR monitoring:
- Magma chamber inflation (cm/year)
- Eruption precursors (accelerated deformation)
- Post-eruption deflation
- Rift zone opening

**Mogi model:**

Point pressure source:

$$u_r = \frac{\Delta V}{4\pi} \frac{R - d}{(R^2 + d^2)^{3/2}}$$

Where:
- $u_r$ = radial displacement
- $\Delta V$ = volume change
- $d$ = source depth
- $R$ = radial distance

**Invert InSAR:**

Estimate depth and volume change.

**Early warning:**

Accelerating deformation → eruption within days/weeks.

### Urban Subsidence

**Mexico City:**

InSAR reveals:
- 30 cm/year subsidence (groundwater extraction)
- Spatial variability (clay layer thickness)
- Infrastructure damage correlation
- Temporal evolution

**Persistent Scatterers (PS-InSAR):**

Track individual stable points (buildings, monuments):
- Millimeter precision
- Multi-year time series
- Hundreds of acquisitions

**Applications:**
- Building stability
- Dam deformation
- Bridge monitoring
- Mining subsidence

---

## 7. What Could Go Wrong?

### Atmospheric Artifacts

**Water vapor delays:**

Wet atmosphere → slower radar propagation

**Phase delay:**

$$\Delta \phi_{\text{atm}} = \frac{4\pi}{\lambda} \Delta R_{\text{atm}}$$

Where $\Delta R_{\text{atm}} \approx 10$ cm (typical)

**C-band:** $\Delta \phi \approx 22$ rad (3.5 fringes!)

**Mitigation:**
- Weather models (ERA5, ECMWF)
- GPS tropospheric corrections
- Stacking (average many pairs)
- Generic Atmospheric Correction (GACOS)

**Residual:** ±5-10 mm after correction

### Unwrapping Errors

**Phase discontinuities:**

Faults, landslides, decorrelated areas.

**Algorithm fails:**

Introduces 2π jumps (wrong by λ/2).

**Detection:**

Loop closure: Sum of phases around loop ≠ 0

**Solutions:**
- Manual editing
- Mask low coherence before unwrapping
- 3D unwrapping (temporal consistency)

### Orbital Errors

**Satellite position uncertainty:**

±5-10 cm → phase ramps in interferogram

**Appears as:**

Long-wavelength tilt across scene

**Removal:**

Fit polynomial, subtract (if deformation signal distinct).

**Risk:** Remove real long-wavelength deformation!

### Decorrelation

**Vegetation:**

C-band: 12-24 day coherence in crops  
L-band: 46 days in forest

**Snow:**

Wet snow completely decorrelates

**Solutions:**
- Shorter temporal baselines
- Longer wavelength (L-band)
- Identify stable scatterers (PS-InSAR)

---

## 8. Extension: Time Series InSAR

**Small Baseline Subset (SBAS):**

**Concept:**

Stack many interferograms with small baselines.

**Solve for:**

Displacement time series at each pixel.

**Advantages:**
- Millimeter precision
- Separate linear trends from seasonal
- Detect acceleration

**Persistent Scatterers (PSI):**

**Identify stable points:**

Low amplitude dispersion, high coherence.

**Track only PS pixels:**

Urban: 100-500 PS/km²  
Rural: 1-10 PS/km²

**Precision:** ±1-2 mm/year velocity

**Applications:**
- Infrastructure monitoring
- Landslide early warning
- Aquifer compaction
- Tectonic strain accumulation

---

## 9. Math Refresher: Complex Numbers

### Representation

**Rectangular:**

$$z = a + ib$$

**Polar:**

$$z = r e^{i\theta} = r(\cos\theta + i\sin\theta)$$

Where:
- $r = |z| = \sqrt{a^2 + b^2}$ (magnitude)
- $\theta = \arg(z) = \arctan(b/a)$ (phase)

### Conjugate

$$z^* = a - ib = r e^{-i\theta}$$

**Product with conjugate:**

$$z z^* = r^2$$

(Real, positive)

### Interferogram

$$s_1 s_2^* = r_1 r_2 e^{i(\theta_1 - \theta_2)}$$

**Phase difference:** $\theta_1 - \theta_2$

**Magnitude:** $r_1 r_2$ (related to coherence)

---

## Summary

- InSAR measures ground deformation by comparing radar phase between acquisitions
- Phase sensitivity enables millimeter-scale displacement detection
- Line-of-sight displacement derived from phase using d = λΔφ/(4π)
- Topographic phase must be removed using DEM for differential interferometry
- Coherence indicates phase reliability with values 0-1
- Phase unwrapping converts wrapped fringes to continuous displacement
- Applications span earthquake mapping, volcano monitoring, subsidence tracking
- Atmospheric water vapor represents primary error source requiring correction
- Time series methods (SBAS, PSI) achieve millimeter/year precision
- Critical tool for geophysical monitoring and infrastructure safety assessment
