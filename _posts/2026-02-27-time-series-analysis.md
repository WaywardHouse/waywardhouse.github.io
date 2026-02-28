---
layout: essay
title: "Time Series Analysis of Satellite Data"
subtitle: "Extracting trends, seasonality, and phenology from multi-temporal imagery"
date: 2026-02-27
categories: [modeling]
series: computational-geography-spatial
series_order: 13
cluster: N
cluster_title: "Remote Sensing Applications"
tags:
  - computational-geography
  - modeling
  - gis
  - remote-sensing
  - time-series
  - phenology
  - trend-analysis
  - harmonic-analysis
  - ndvi
math: true
viz: true
difficulty: 4
math_core: [time-series-decomposition, fourier-analysis, trend-detection, smoothing]
spatial_reasoning: 2
dynamics: 4
computation: 4
domain: [remote-sensing, phenology, climate-analysis, vegetation-monitoring]
excerpt: >
  When does vegetation green-up each spring? Is there a long-term trend in productivity?
  How does drought affect growing seasons? Time series analysis of satellite data
  decomposes observations into trend, seasonality, and noise, enabling phenology
  extraction, anomaly detection, and climate change assessment. This essay derives
  harmonic analysis, implements smoothing filters, and extracts phenological metrics.
math_prerequisites: >
  NDVI and vegetation indices (Essay 25). Basic statistics (mean, variance). Sine/cosine
  functions. We'll introduce Fourier analysis and time series decomposition from scratch.
---

## 1. The Question

How has the growing season changed over the past 20 years?

**Time series analysis** examines sequences of observations through time:

**Satellite time series:**
- MODIS: 500m, 16-day composites, 2000-present
- Landsat: 30m, 16-day revisit, 1984-present
- Sentinel-2: 10m, 5-day revisit, 2015-present

**Applications:**
- **Phenology:** Timing of green-up, peak, senescence
- **Productivity trends:** Is vegetation increasing or decreasing?
- **Drought detection:** NDVI anomalies below normal
- **Crop monitoring:** Within-season growth patterns
- **Climate change:** Lengthening/shortening growing seasons
- **Forest health:** Detecting gradual decline vs. abrupt disturbance

The mathematical question: Given a noisy time series of NDVI values, how do we separate:
1. **Trend:** Long-term change
2. **Seasonality:** Repeating annual cycle
3. **Noise:** Random variation and clouds

---

## 2. The Conceptual Model

### Time Series Components

**Additive model:**

$$y(t) = T(t) + S(t) + \varepsilon(t)$$

Where:
- $y(t)$ = observed value at time $t$
- $T(t)$ = trend component
- $S(t)$ = seasonal component
- $\varepsilon(t)$ = noise/residual

**Example - NDVI time series:**
- **Trend:** Gradual greening (+0.001 NDVI/year)
- **Seasonal:** Spring green-up, summer peak, autumn senescence
- **Noise:** Clouds, atmospheric effects, sensor variations

### Phenological Metrics

**Key dates in annual cycle:**

1. **Start of Season (SOS):** When NDVI crosses threshold (spring green-up)
2. **Peak of Season (POS):** Maximum NDVI (summer)
3. **End of Season (EOS):** When NDVI falls below threshold (senescence)
4. **Growing Season Length (GSL):** EOS - SOS

**Amplitude:** Difference between peak and minimum NDVI

**Integrated NDVI:** Area under curve (proportional to productivity)

### Harmonic Analysis

**Model seasonal cycle with sine/cosine:**

$$S(t) = A \sin(2\pi t / P + \phi)$$

Where:
- $A$ = amplitude
- $P$ = period (365 days)
- $\phi$ = phase (timing of peak)

**Multiple harmonics** capture complex seasonal patterns:

$$S(t) = \sum_{k=1}^{n} \left[a_k \cos(2\pi k t / P) + b_k \sin(2\pi k t / P)\right]$$

**k=1:** Annual cycle  
**k=2:** Bi-annual (two peaks per year)  
**k=3:** Tri-annual, etc.

---

## 3. Building the Mathematical Model

### Moving Average Smoothing

**Simple moving average (window size $w$):**

$$\hat{y}_t = \frac{1}{w} \sum_{i=t-w/2}^{t+w/2} y_i$$

**Reduces noise** but blurs edges.

**Typical:** $w = 3$ (adjacent observations)

### Savitzky-Golay Filter

**Fits polynomial** to local window, evaluates at center.

**Preserves peaks better** than moving average.

**Algorithm:** For each point, fit polynomial of degree $d$ to $w$ neighbors, use fitted value.

**Typical:** $w = 5$, $d = 2$ (quadratic)

### Trend Extraction

**Linear trend:**

$$T(t) = \beta_0 + \beta_1 t$$

**Fit via least squares:**

$$\beta_1 = \frac{\sum (t_i - \bar{t})(y_i - \bar{y})}{\sum (t_i - \bar{t})^2}$$

$$\beta_0 = \bar{y} - \beta_1 \bar{t}$$

**Interpretation:**
- $\beta_1 > 0$: Increasing trend (greening)
- $\beta_1 < 0$: Decreasing trend (browning)
- $\beta_1 = 0$: No trend

**Mann-Kendall test:** Non-parametric trend significance test.

### Harmonic Regression

**Fit annual cycle:**

$$y(t) = \beta_0 + a_1\cos(\omega t) + b_1\sin(\omega t) + \varepsilon(t)$$

Where $\omega = 2\pi / 365$ (radians/day).

**Amplitude:**

$$A = \sqrt{a_1^2 + b_1^2}$$

**Phase (peak timing):**

$$\phi = \arctan(b_1 / a_1)$$

**Day of year for peak:**

$$\text{DOY}_{\text{peak}} = \phi \times \frac{365}{2\pi}$$

**Add trend:**

$$y(t) = \beta_0 + \beta_1 t + a_1\cos(\omega t) + b_1\sin(\omega t)$$

### Phenology Extraction

**Threshold method:**

**Start of Season:** First day when $\text{NDVI} > T_{\text{green}}$

**End of Season:** Last day when $\text{NDVI} > T_{\text{green}}$

**Typical threshold:** $T_{\text{green}} = 0.3$ or $T_{\text{green}} = \text{NDVI}_{\min} + 0.2(\text{NDVI}_{\max} - \text{NDVI}_{\min})$

**Derivative method:**

**SOS:** Maximum rate of increase

$$\frac{d\text{NDVI}}{dt} = \max$$

**EOS:** Maximum rate of decrease

$$\frac{d\text{NDVI}}{dt} = \min$$

---

## 4. Worked Example by Hand

**Problem:** Extract phenology from simplified annual NDVI time series.

**Monthly NDVI values (2023):**

| Month | DOY | NDVI |
|-------|-----|------|
| Jan   | 15  | 0.25 |
| Feb   | 45  | 0.28 |
| Mar   | 75  | 0.35 |
| Apr   | 105 | 0.50 |
| May   | 135 | 0.68 |
| Jun   | 165 | 0.75 |
| Jul   | 195 | 0.72 |
| Aug   | 225 | 0.65 |
| Sep   | 255 | 0.50 |
| Oct   | 285 | 0.35 |
| Nov   | 315 | 0.28 |
| Dec   | 345 | 0.25 |

Find: SOS, POS, EOS, GSL using threshold $T = 0.4$

### Solution

**Step 1: Find Start of Season**

First month when NDVI > 0.4:
- Jan: 0.25 < 0.4
- Feb: 0.28 < 0.4
- Mar: 0.35 < 0.4
- Apr: 0.50 > 0.4 ✓

**SOS ≈ DOY 105 (mid-April)**

**Step 2: Find Peak of Season**

Maximum NDVI:
- Max = 0.75 in June

**POS = DOY 165 (mid-June)**

**Step 3: Find End of Season**

Last month when NDVI > 0.4:
- Sep: 0.50 > 0.4 ✓
- Oct: 0.35 < 0.4

**EOS ≈ DOY 255 (mid-September)**

**Step 4: Growing Season Length**

$$\text{GSL} = \text{EOS} - \text{SOS} = 255 - 105 = 150 \text{ days}$$

**Step 5: Integrated NDVI (productivity)**

**Trapezoidal integration** (approximate area under curve):

$$\int \text{NDVI} \, dt \approx \sum_{i=1}^{n-1} \frac{\text{NDVI}_i + \text{NDVI}_{i+1}}{2} \times \Delta t$$

$$\approx \frac{0.25+0.28}{2}\times30 + \frac{0.28+0.35}{2}\times30 + \cdots$$

$$\approx 30 \times (0.265 + 0.315 + 0.425 + 0.590 + 0.715 + 0.735 + 0.685 + 0.575 + 0.425 + 0.315 + 0.265)$$

$$\approx 30 \times 5.31 = 159.3 \text{ NDVI-days}$$

**Summary:**
- SOS: DOY 105
- POS: DOY 165  
- EOS: DOY 255
- GSL: 150 days
- Integrated NDVI: ~159 (productivity proxy)

---

## 5. Computational Implementation

Below is an interactive time series analyzer.

<div class="viz-container" id="timeseries-viz">
  <div class="controls">
    <label>
      Location type:
      <select id="location-type">
        <option value="temperate" selected>Temperate Forest</option>
        <option value="grassland">Grassland</option>
        <option value="tropical">Tropical (Evergreen)</option>
        <option value="cropland">Cropland (Double-crop)</option>
      </select>
    </label>
    <label>
      Show components:
      <input type="checkbox" id="show-trend" checked> Trend
      <input type="checkbox" id="show-seasonal" checked> Seasonal
      <input type="checkbox" id="show-smoothed"> Smoothed
    </label>
    <label>
      Phenology threshold:
      <input type="range" id="pheno-threshold" min="0.2" max="0.6" step="0.05" value="0.4">
      <span id="pheno-threshold-val">0.40</span>
    </label>
    <div class="timeseries-info">
      <p><strong>Start of Season:</strong> <span id="sos-doy">--</span></p>
      <p><strong>Peak of Season:</strong> <span id="pos-doy">--</span></p>
      <p><strong>End of Season:</strong> <span id="eos-doy">--</span></p>
      <p><strong>Growing Season Length:</strong> <span id="gsl-days">--</span> days</p>
      <p><strong>Trend:</strong> <span id="trend-value">--</span> NDVI/year</p>
    </div>
  </div>
  <div id="timeseries-canvas-container">
    <canvas id="timeseries-canvas" width="700" height="400" style="border: 1px solid #ddd;"></canvas>
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
  const chart = echarts.init(document.getElementById('timeseries-canvas'));
  
  let locationType = 'temperate';
  let showTrend = true;
  let showSeasonal = true;
  let showSmoothed = false;
  let phenoThreshold = 0.4;
  
  function generateTimeSeries(type, years = 3) {
    const data = [];
    const doy = [];
    
    for (let year = 0; year < years; year++) {
      for (let day = 1; day <= 365; day += 16) { // 16-day composites
        const t = year * 365 + day;
        const yearFrac = (day / 365);
        
        let seasonal, trend, noise, amplitude, phase;
        
        if (type === 'temperate') {
          // Single peak, strong seasonality
          amplitude = 0.35;
          phase = 0.4; // Peak in summer
          trend = 0.0005 * t / 365; // Slight greening
          seasonal = amplitude * Math.sin(2 * Math.PI * yearFrac + phase);
          noise = (Math.random() - 0.5) * 0.05;
          
        } else if (type === 'grassland') {
          // Single peak, moderate amplitude
          amplitude = 0.25;
          phase = 0.3;
          trend = -0.0002 * t / 365; // Slight browning
          seasonal = amplitude * Math.sin(2 * Math.PI * yearFrac + phase);
          noise = (Math.random() - 0.5) * 0.08;
          
        } else if (type === 'tropical') {
          // Evergreen, minimal seasonality
          amplitude = 0.08;
          phase = 0;
          trend = 0;
          seasonal = amplitude * Math.sin(2 * Math.PI * yearFrac + phase);
          noise = (Math.random() - 0.5) * 0.03;
          
        } else { // cropland
          // Double-crop, two peaks per year
          amplitude = 0.30;
          phase = 0.2;
          trend = 0.0003 * t / 365;
          seasonal = amplitude * (Math.sin(2 * Math.PI * yearFrac + phase) + 
                                  0.5 * Math.sin(4 * Math.PI * yearFrac + 0.5));
          noise = (Math.random() - 0.5) * 0.06;
        }
        
        const baseline = 0.45;
        const ndvi = baseline + trend + seasonal + noise;
        
        data.push({
          t: t,
          doy: day,
          year: year,
          ndvi: Math.max(0, Math.min(1, ndvi)),
          trend: baseline + trend,
          seasonal: seasonal,
          noise: noise
        });
        doy.push(day);
      }
    }
    
    return data;
  }
  
  function extractPhenology(data, threshold) {
    // Use last complete year
    const lastYear = Math.max(...data.map(d => d.year));
    const yearData = data.filter(d => d.year === lastYear);
    
    if (yearData.length === 0) return null;
    
    // Find SOS (first crossing above threshold)
    let sos = null;
    for (let i = 0; i < yearData.length; i++) {
      if (yearData[i].ndvi > threshold) {
        sos = yearData[i].doy;
        break;
      }
    }
    
    // Find POS (maximum NDVI)
    let maxNDVI = -Infinity;
    let pos = null;
    for (let d of yearData) {
      if (d.ndvi > maxNDVI) {
        maxNDVI = d.ndvi;
        pos = d.doy;
      }
    }
    
    // Find EOS (last crossing above threshold)
    let eos = null;
    for (let i = yearData.length - 1; i >= 0; i--) {
      if (yearData[i].ndvi > threshold) {
        eos = yearData[i].doy;
        break;
      }
    }
    
    const gsl = (sos && eos) ? (eos - sos) : null;
    
    return {sos, pos, eos, gsl};
  }
  
  function computeTrend(data) {
    const n = data.length;
    const meanT = data.reduce((s, d) => s + d.t, 0) / n;
    const meanY = data.reduce((s, d) => s + d.ndvi, 0) / n;
    
    let num = 0, den = 0;
    for (let d of data) {
      num += (d.t - meanT) * (d.ndvi - meanY);
      den += (d.t - meanT) ** 2;
    }
    
    const slope = num / den;
    // Convert to NDVI/year
    const slopePerYear = slope * 365;
    
    return slopePerYear;
  }
  
  function movingAverage(data, window = 3) {
    const smoothed = [];
    const half = Math.floor(window / 2);
    
    for (let i = 0; i < data.length; i++) {
      let sum = 0, count = 0;
      for (let j = Math.max(0, i - half); j <= Math.min(data.length - 1, i + half); j++) {
        sum += data[j].ndvi;
        count++;
      }
      smoothed.push(sum / count);
    }
    
    return smoothed;
  }
  
  function render() {
    const data = generateTimeSeries(locationType, 3);
    const smoothed = movingAverage(data, 3);
    
    const pheno = extractPhenology(data, phenoThreshold);
    const trendSlope = computeTrend(data);
    
    // Update display
    document.getElementById('sos-doy').textContent = pheno.sos || '--';
    document.getElementById('pos-doy').textContent = pheno.pos || '--';
    document.getElementById('eos-doy').textContent = pheno.eos || '--';
    document.getElementById('gsl-days').textContent = pheno.gsl || '--';
    document.getElementById('trend-value').textContent = trendSlope.toFixed(4);
    
    // Prepare series
    const series = [];
    
    // Observed NDVI
    series.push({
      name: 'Observed NDVI',
      type: 'scatter',
      data: data.map(d => [d.t, d.ndvi]),
      symbolSize: 4,
      itemStyle: {color: '#95A5A6'}
    });
    
    if (showSmoothed) {
      series.push({
        name: 'Smoothed',
        type: 'line',
        data: data.map((d, i) => [d.t, smoothed[i]]),
        lineStyle: {color: '#3498DB', width: 2},
        showSymbol: false
      });
    }
    
    if (showTrend) {
      series.push({
        name: 'Trend',
        type: 'line',
        data: data.map(d => [d.t, d.trend]),
        lineStyle: {color: '#E74C3C', width: 2, type: 'dashed'},
        showSymbol: false
      });
    }
    
    if (showSeasonal) {
      series.push({
        name: 'Seasonal Component',
        type: 'line',
        data: data.map(d => [d.t, d.trend + d.seasonal]),
        lineStyle: {color: '#2ECC71', width: 2},
        showSymbol: false
      });
    }
    
    // Threshold line
    series.push({
      name: 'Phenology Threshold',
      type: 'line',
      data: [[0, phenoThreshold], [data[data.length-1].t, phenoThreshold]],
      lineStyle: {color: '#F39C12', width: 1, type: 'dotted'},
      showSymbol: false
    });
    
    // Mark phenology points (last year)
    if (pheno.sos) {
      const lastYear = Math.max(...data.map(d => d.year));
      const sosPoint = data.find(d => d.year === lastYear && d.doy >= pheno.sos);
      const posPoint = data.find(d => d.year === lastYear && d.doy >= pheno.pos);
      const eosPoint = data.find(d => d.year === lastYear && d.doy >= pheno.eos);
      
      if (sosPoint) {
        series.push({
          name: 'SOS',
          type: 'scatter',
          data: [[sosPoint.t, sosPoint.ndvi]],
          symbolSize: 10,
          itemStyle: {color: '#27AE60'},
          label: {show: true, formatter: 'SOS', position: 'top'}
        });
      }
      
      if (posPoint) {
        series.push({
          name: 'POS',
          type: 'scatter',
          data: [[posPoint.t, posPoint.ndvi]],
          symbolSize: 10,
          itemStyle: {color: '#8E44AD'},
          label: {show: true, formatter: 'POS', position: 'top'}
        });
      }
      
      if (eosPoint) {
        series.push({
          name: 'EOS',
          type: 'scatter',
          data: [[eosPoint.t, eosPoint.ndvi]],
          symbolSize: 10,
          itemStyle: {color: '#E67E22'},
          label: {show: true, formatter: 'EOS', position: 'top'}
        });
      }
    }
    
    const option = {
      title: {
        text: `NDVI Time Series (${locationType})`,
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
        name: 'Days from start',
        nameLocation: 'middle',
        nameGap: 30
      },
      yAxis: {
        type: 'value',
        name: 'NDVI',
        nameLocation: 'middle',
        nameGap: 50,
        min: 0,
        max: 1
      },
      series: series
    };
    
    chart.setOption(option, true);
  }
  
  document.getElementById('location-type').addEventListener('change', (e) => {
    locationType = e.target.value;
    render();
  });
  
  document.getElementById('show-trend').addEventListener('change', (e) => {
    showTrend = e.target.checked;
    render();
  });
  
  document.getElementById('show-seasonal').addEventListener('change', (e) => {
    showSeasonal = e.target.checked;
    render();
  });
  
  document.getElementById('show-smoothed').addEventListener('change', (e) => {
    showSmoothed = e.target.checked;
    render();
  });
  
  document.getElementById('pheno-threshold').addEventListener('input', (e) => {
    phenoThreshold = parseFloat(e.target.value);
    document.getElementById('pheno-threshold-val').textContent = phenoThreshold.toFixed(2);
    render();
  });
  
  render();
  
  window.addEventListener('resize', () => chart.resize());
})();
</script>

**Try this:**
- **Temperate forest:** Strong seasonal cycle, single peak
- **Grassland:** Similar but smaller amplitude
- **Tropical evergreen:** Minimal seasonality (always green)
- **Cropland:** Double-crop pattern (two peaks per year!)
- **Show trend:** Red dashed line (long-term change)
- **Show seasonal:** Green line (trend + seasonality)
- **Show smoothed:** Blue line (noise reduced)
- **Adjust threshold:** Changes SOS/EOS detection
- **Phenology markers:** Green (SOS), Purple (POS), Orange (EOS)

**Key insight:** Time series decomposition separates long-term trends from seasonal cycles, enabling climate change detection and phenology monitoring!

---

## 6. Interpretation

### Climate Change Signals

**Global greening trend:**
- NDVI increased ~0.001-0.002/year (1982-2015)
- Reasons: CO₂ fertilization, warmer temperatures, longer growing seasons
- Arctic: Strongest greening (shrub expansion)

**Growing season extension:**
- SOS earlier (1-2 weeks in 40 years)
- EOS later (1 week)
- Net: +10-20 days GSL in northern latitudes

### Drought Monitoring

**NDVI anomaly:**

$$A(t) = \text{NDVI}(t) - \text{NDVI}_{\text{climatology}}(t)$$

Where climatology = long-term average for that time of year.

**Negative anomaly** = drought stress

**Example:** 2012 US drought
- NDVI anomaly < -0.15 across Corn Belt
- Early warning of crop failure

### Agricultural Phenology

**Crop calendars from satellites:**
- SOS = planting date
- POS = peak vegetative growth
- EOS = harvest date

**Applications:**
- Yield forecasting (early prediction)
- Insurance claims (verify timing)
- Double-cropping detection

---

## 7. What Could Go Wrong?

### Cloud Contamination

**Clouds reduce NDVI** (appear as low values).

**Spurious phenology:**
- Cloudy spring → delayed SOS (false)
- Need cloud masking

**Solutions:**
- Composite images (maximum NDVI in period)
- Cloud screening (quality flags)
- Gap-filling interpolation

### Missing Data

**Landsat:** 16-day repeat but clouds may leave gaps.

**Irregular time series** → difficult to analyze.

**Solutions:**
- Interpolation (linear, spline)
- Harmonic fitting (smooth through gaps)
- Data fusion (combine Landsat + Sentinel)

### Sensor Drift

**Long-term sensors** (AVHRR, MODIS) degrade over time.

**Calibration drift** → false trend.

**Solution:**
- Cross-calibration between sensors
- Atmospheric correction updates
- Use surface reflectance products

### Mixed Land Cover

**Pixel contains multiple types** (e.g., 50% forest, 50% grass).

**Phenology represents blend** → hard to interpret.

**Solution:**
- Use finer resolution
- Classify first, then analyze per class
- Sub-pixel unmixing

---

## 8. Extension: TIMESAT

**Software package** for time series processing.

**Functions:**
- Gap-filling (interpolation)
- Smoothing (Savitzky-Golay, asymmetric Gaussian)
- Phenology extraction (multiple methods)
- Visualization

**Three fitting methods:**
1. **Asymmetric Gaussian:** Separate rise/fall curves
2. **Double logistic:** S-curves for green-up/senescence
3. **Savitzky-Golay filter:** Polynomial smoothing

**Outputs:**
- Start/end of season
- Length of season
- Base/peak/amplitude
- Small/large integrals (productivity metrics)

**Widely used** in operational phenology monitoring.

---

## 9. Math Refresher: Fourier Series

### Periodic Function Decomposition

**Any periodic function** with period $P$ can be represented as:

$$f(t) = a_0 + \sum_{k=1}^{\infty} \left[a_k\cos(k\omega t) + b_k\sin(k\omega t)\right]$$

Where $\omega = 2\pi / P$ (fundamental frequency).

**Coefficients:**

$$a_0 = \frac{1}{P}\int_0^P f(t)\,dt$$

$$a_k = \frac{2}{P}\int_0^P f(t)\cos(k\omega t)\,dt$$

$$b_k = \frac{2}{P}\int_0^P f(t)\sin(k\omega t)\,dt$$

### Application to NDVI

**For annual cycle ($P = 365$ days):**

**First harmonic (k=1):** Annual component

**Second harmonic (k=2):** Bi-annual (captures double-cropping)

**Typically:** 1-3 harmonics sufficient for most vegetation.

**Amplitude of harmonic k:**

$$A_k = \sqrt{a_k^2 + b_k^2}$$

**Phase (timing of peak):**

$$\phi_k = \arctan(b_k / a_k)$$

---

## Summary

- **Time series analysis** decomposes observations into trend, seasonality, and noise
- **Phenological metrics:** Start of season (SOS), peak (POS), end (EOS), growing season length (GSL)
- **Harmonic analysis:** Models seasonality using sine/cosine functions
- **Trend extraction:** Linear regression to detect long-term change
- **Smoothing filters:** Moving average or Savitzky-Golay to reduce noise
- **Applications:** Climate change detection, drought monitoring, crop calendars, forest health
- **Challenges:** Clouds, missing data, sensor drift, mixed pixels
- **TIMESAT:** Standard software for operational phenology extraction
- **Global observations:** Growing season lengthening, Arctic greening, NDVI anomalies indicate drought
- Critical for understanding vegetation dynamics and climate change impacts

---
