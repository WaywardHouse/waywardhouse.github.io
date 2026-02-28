---
layout: essay
title: "Snow Accumulation and Melt Modeling"
subtitle: "Tracking snowpack evolution through the winter season"
date: 2026-02-27
categories: [modeling]
series: computational-geography-cryosphere
series_order: 2
cluster: P
cluster_title: "Snow Physics & Modeling"
tags:
  - computational-geography
  - modeling
  - cryosphere
  - snow
  - hydrology
  - water-resources
  - degree-day
  - swe
math: true
viz: true
difficulty: 3
math_core: [mass-balance, degree-day-integration, temporal-modeling, water-equivalent]
spatial_reasoning: 2
dynamics: 4
computation: 3
domain: [hydrology, water-resources, flood-forecasting, climate]
excerpt: >
  How much water is stored in the snowpack? When will melt begin? What's the peak
  runoff timing? Snow accumulation and melt models track snowpack mass balance
  through the season—accounting for precipitation, sublimation, and melt. This essay
  derives degree-day models, implements energy balance approaches, and introduces
  Snow Water Equivalent (SWE) as the key hydrological variable.
math_prerequisites: >
  Snowpack energy balance (Essay 42). Basic hydrology. Integration (accumulation
  over time). We'll introduce operational snow modeling methods from scratch.
---

## 1. The Question

How much water will this snowpack release during spring melt?

**Snow Water Equivalent (SWE)** is the key variable:

$$\text{SWE} = \rho_{\text{snow}} \times d_{\text{snow}} / \rho_{\text{water}}$$

Where:
- $\rho_{\text{snow}}$ = snow density (kg/m³)
- $d_{\text{snow}}$ = snow depth (m)
- $\rho_{\text{water}}$ = 1000 kg/m³

**Example:** 1 meter of snow at density 300 kg/m³:

$$\text{SWE} = \frac{300 \times 1.0}{1000} = 0.30 \text{ m} = 300 \text{ mm}$$

**This means:** If all snow melted instantly → 300 mm of water runoff!

**Applications:**
- **Water supply forecasting:** How much water in reservoir?
- **Flood prediction:** Peak flow timing and magnitude
- **Irrigation planning:** Allocate water to farmers
- **Hydropower:** Generation scheduling
- **Climate monitoring:** Trends in snow storage

The mathematical question: Given daily weather (precipitation, temperature), how do we model the evolution of SWE from fall through spring melt?

---

## 2. The Conceptual Model

### Mass Balance Equation

**Change in SWE over time:**

$$\frac{dS}{dt} = P_{\text{snow}} - M - E$$

Where:
- $S$ = SWE (mm or kg/m²)
- $P_{\text{snow}}$ = snowfall (mm/day)
- $M$ = melt (mm/day)
- $E$ = sublimation/evaporation (mm/day)

**Accumulation season (winter):**
- $P_{\text{snow}} > 0$, $M = 0$ → SWE increases
- Peak SWE typically late March-April (mid-latitudes)

**Melt season (spring):**
- $P_{\text{snow}} = 0$, $M > 0$ → SWE decreases
- SWE → 0 by May-June (lower elevations)

### Rain vs. Snow Partitioning

**Temperature threshold:**

$$P_{\text{snow}} = \begin{cases}
P & \text{if } T_{\text{air}} \leq T_{\text{threshold}} \\
0 & \text{if } T_{\text{air}} > T_{\text{threshold}}
\end{cases}$$

**Simple:** $T_{\text{threshold}} = 0°C$

**Refined:** Transition zone (-1°C to +3°C):

$$f_{\text{snow}} = 1 - \frac{T_{\text{air}} - T_{\min}}{T_{\max} - T_{\min}}$$

Where $f_{\text{snow}}$ = fraction falling as snow (0-1).

**Mixed precipitation:** Common near 0°C.

### Seasonal Cycle

**Typical mid-latitude mountain:**

```
Oct-Nov: First snowfall, shallow snowpack
Dec-Feb: Accumulation, cold temperatures, little melt
Mar: Peak SWE (maximum water storage)
Apr: Melt onset, SWE decreases
May: Rapid melt, major runoff
Jun: Snowpack depleted (lower elevations)
```

**High elevations:** Snow persists year-round (permanent snowfields).

---

## 3. Building the Mathematical Model

### Degree-Day Melt Model

**Empirical relationship:**

$$M = \begin{cases}
a(T_{\text{air}} - T_{\text{melt}}) & \text{if } T_{\text{air}} > T_{\text{melt}} \\
0 & \text{otherwise}
\end{cases}$$

Where:
- $M$ = melt rate (mm/day)
- $a$ = degree-day factor (mm/(°C·day))
- $T_{\text{melt}}$ = melt threshold (typically 0°C)

**Typical values:**
- $a = 3$ mm/(°C·day) for open sites
- $a = 2$ mm/(°C·day) for forest
- $a = 4-6$ mm/(°C·day) for glaciers

**Daily time step:**

$$M_{\text{today}} = a \times \max(0, T_{\text{mean}} - 0)$$

### Positive Degree Days (PDD)

**Cumulative measure:**

$$\text{PDD} = \sum_{t=1}^{n} \max(0, T_{\text{mean},t})$$

**Total melt over period:**

$$M_{\text{total}} = a \times \text{PDD}$$

**Example:** Spring with temperatures 2, 4, 6, 8°C over 4 days:

$$\text{PDD} = 2 + 4 + 6 + 8 = 20 \text{ °C-days}$$

$$M_{\text{total}} = 3 \times 20 = 60 \text{ mm}$$

### Enhanced Degree-Day Model

**Add radiation term:**

$$M = a_T(T - T_{\text{melt}}) + a_R(1 - \alpha)Q_{\text{SW}}$$

Where:
- $a_R$ = radiation factor (mm·m²/(W·day))
- $\alpha$ = albedo
- $Q_{\text{SW}}$ = incoming shortwave (W/m²)

**Accounts for:** Sunny warm days melt more than cloudy warm days.

### Energy Balance Approach

**From Essay 42, net energy determines melt:**

$$M = \frac{Q_{\text{net}}}{L_f \rho_w}$$

**Requires:**
- Solar radiation
- Longwave radiation
- Air temperature
- Wind speed
- Humidity

**Advantages:** Physical basis, accurate  
**Disadvantages:** Data intensive, complex

**Operational use:** SNOTEL sites, research basins

### Snow Density Evolution

**Fresh snow:** $\rho \approx 50-100$ kg/m³

**Aged snow:** $\rho \approx 200-400$ kg/m³

**Late season:** $\rho \approx 400-500$ kg/m³

**Compaction over time:**

$$\frac{d\rho}{dt} = c_1 \rho + c_2$$

Where $c_1, c_2$ are empirical constants.

**Temperature-dependent:**

$$\rho(t) = \rho_0 + (\rho_{\max} - \rho_0)(1 - e^{-kt})$$

**Typical:** $\rho_{\max} = 500$ kg/m³, $k = 0.01$ day⁻¹

---

## 4. Worked Example by Hand

**Problem:** Model SWE evolution for November-May given daily temperature and precipitation.

**Data (simplified monthly averages):**

| Month | Precip (mm) | Temp (°C) | Days |
|-------|-------------|-----------|------|
| Nov   | 50          | -2        | 30   |
| Dec   | 80          | -5        | 31   |
| Jan   | 100         | -8        | 31   |
| Feb   | 90          | -6        | 28   |
| Mar   | 70          | -1        | 31   |
| Apr   | 40          | +4        | 30   |
| May   | 30          | +10       | 31   |

**Assumptions:**
- All precipitation falls as snow when T < 0°C
- Degree-day factor: $a = 3$ mm/(°C·day)
- No sublimation

### Solution

**November:**
- $T_{\text{mean}} = -2°C < 0$ → No melt
- Snowfall: 50 mm SWE
- **SWE = 0 + 50 = 50 mm**

**December:**
- $T_{\text{mean}} = -5°C$ → No melt
- Snowfall: 80 mm
- **SWE = 50 + 80 = 130 mm**

**January:**
- $T_{\text{mean}} = -8°C$ → No melt
- Snowfall: 100 mm
- **SWE = 130 + 100 = 230 mm**

**February:**
- $T_{\text{mean}} = -6°C$ → No melt
- Snowfall: 90 mm
- **SWE = 230 + 90 = 320 mm**

**March:**
- $T_{\text{mean}} = -1°C$ → No melt
- Snowfall: 70 mm
- **SWE = 320 + 70 = 390 mm** ← **Peak SWE**

**April:**
- $T_{\text{mean}} = +4°C$ → Melt!
- Melt: $M = 3 \times 4 \times 30 = 360$ mm
- Precip: 40 mm (rain, T > 0)
- **SWE = 390 - 360 = 30 mm**

**May:**
- $T_{\text{mean}} = +10°C$ → Strong melt
- Melt: $M = 3 \times 10 \times 31 = 930$ mm
- Available SWE: 30 mm
- **SWE depleted:** 30 mm melts, 900 mm "potential melt" unused
- **SWE = 0 mm** (snow gone by mid-May)

**Summary:**
- Peak SWE: 390 mm (end of March)
- Melt onset: April
- Snow-free: Mid-May
- Total melt: 390 mm water released

**Runoff timing:** Major pulse in April-May as snowpack melts.

---

## 5. Computational Implementation

Below is an interactive snow accumulation/melt simulator.

<div class="viz-container" id="snow-sim-viz">
  <div class="controls">
    <label>
      Degree-day factor (mm/°C/day):
      <input type="range" id="ddf" min="1" max="6" step="0.5" value="3">
      <span id="ddf-val">3.0</span>
    </label>
    <label>
      Elevation (m):
      <input type="range" id="elevation" min="1000" max="3000" step="200" value="2000">
      <span id="elev-val">2000</span>
    </label>
    <label>
      Winter precipitation (%):
      <input type="range" id="winter-precip" min="50" max="150" step="10" value="100">
      <span id="precip-val">100</span>%
    </label>
    <label>
      Show components:
      <input type="checkbox" id="show-precip" checked> Precipitation
      <input type="checkbox" id="show-melt" checked> Melt
    </label>
  </div>
  <div id="snow-sim-canvas-container">
    <canvas id="snow-sim-canvas" width="700" height="400" style="border: 1px solid #ddd;"></canvas>
  </div>
  <div class="snow-sim-info">
    <p><strong>Peak SWE:</strong> <span id="peak-swe">--</span> mm</p>
    <p><strong>Peak date:</strong> <span id="peak-date">--</span></p>
    <p><strong>Snow-free date:</strong> <span id="snow-free">--</span></p>
    <p><strong>Total melt:</strong> <span id="total-melt">--</span> mm</p>
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
  const chart = echarts.init(document.getElementById('snow-sim-canvas'));
  
  let ddf = 3.0;
  let elevation = 2000;
  let precipScale = 1.0;
  let showPrecip = true;
  let showMelt = true;
  
  function generateWeatherData(elev, precip) {
    // Temperature lapse rate: -6.5°C per 1000m
    const baseTempOffset = (elev - 1500) / 1000 * (-6.5);
    
    // Monthly climate (Oct-Sep)
    const months = [
      {name: 'Oct', days: 31, baseTemp: 8, basePrecip: 40},
      {name: 'Nov', days: 30, baseTemp: 2, basePrecip: 60},
      {name: 'Dec', days: 31, baseTemp: -3, basePrecip: 90},
      {name: 'Jan', days: 31, baseTemp: -6, basePrecip: 100},
      {name: 'Feb', days: 28, baseTemp: -4, basePrecip: 90},
      {name: 'Mar', days: 31, baseTemp: 0, basePrecip: 70},
      {name: 'Apr', days: 30, baseTemp: 5, basePrecip: 50},
      {name: 'May', days: 31, baseTemp: 10, basePrecip: 40},
      {name: 'Jun', days: 30, baseTemp: 15, basePrecip: 30},
      {name: 'Jul', days: 31, baseTemp: 18, basePrecip: 20},
      {name: 'Aug', days: 31, baseTemp: 17, basePrecip: 25},
      {name: 'Sep', days: 30, baseTemp: 12, basePrecip: 35}
    ];
    
    const daily = [];
    let doy = 0;
    
    for (let month of months) {
      const temp = month.baseTemp + baseTempOffset;
      const precipPerDay = (month.basePrecip * precip) / month.days;
      
      for (let day = 0; day < month.days; day++) {
        // Add daily variation
        const tempVar = (Math.random() - 0.5) * 6;
        const precipVar = Math.random() < 0.3 ? precipPerDay * 2 : precipPerDay * 0.5;
        
        daily.push({
          doy: doy,
          month: month.name,
          temp: temp + tempVar,
          precip: precipVar
        });
        
        doy++;
      }
    }
    
    return daily;
  }
  
  function simulateSWE(weather, degreeDay) {
    let swe = 0;
    const results = [];
    let peakSWE = 0;
    let peakDate = '';
    let snowFreeDate = '';
    let totalMelt = 0;
    
    for (let i = 0; i < weather.length; i++) {
      const day = weather[i];
      
      // Precipitation
      let snowfall = 0;
      if (day.temp <= 0) {
        snowfall = day.precip;
      }
      
      // Melt
      let melt = 0;
      if (day.temp > 0 && swe > 0) {
        melt = degreeDay * day.temp;
        melt = Math.min(melt, swe); // Can't melt more than available
        totalMelt += melt;
      }
      
      // Update SWE
      swe = swe + snowfall - melt;
      
      // Track peak
      if (swe > peakSWE) {
        peakSWE = swe;
        peakDate = `${day.month} ${day.doy % 30 + 1}`;
      }
      
      // Track snow-free
      if (swe === 0 && peakSWE > 0 && !snowFreeDate && i > 180) {
        snowFreeDate = `${day.month} ${day.doy % 30 + 1}`;
      }
      
      results.push({
        doy: day.doy,
        month: day.month,
        swe: swe,
        snowfall: snowfall,
        melt: melt,
        temp: day.temp
      });
    }
    
    return {results, peakSWE, peakDate, snowFreeDate, totalMelt};
  }
  
  function render() {
    const weather = generateWeatherData(elevation, precipScale);
    const {results, peakSWE, peakDate, snowFreeDate, totalMelt} = simulateSWE(weather, ddf);
    
    // Update stats
    document.getElementById('peak-swe').textContent = peakSWE.toFixed(0);
    document.getElementById('peak-date').textContent = peakDate;
    document.getElementById('snow-free').textContent = snowFreeDate || 'Snow persists';
    document.getElementById('total-melt').textContent = totalMelt.toFixed(0);
    
    // Prepare series
    const series = [];
    
    // SWE
    series.push({
      name: 'SWE',
      type: 'line',
      data: results.map(d => [d.doy, d.swe]),
      areaStyle: {color: 'rgba(224, 242, 254, 0.8)'},
      lineStyle: {color: '#1976D2', width: 2},
      smooth: true
    });
    
    if (showPrecip) {
      series.push({
        name: 'Snowfall',
        type: 'bar',
        data: results.map(d => [d.doy, d.snowfall]),
        itemStyle: {color: '#90CAF9'},
        barWidth: 2,
        yAxisIndex: 1
      });
    }
    
    if (showMelt) {
      series.push({
        name: 'Melt',
        type: 'bar',
        data: results.map(d => [d.doy, -d.melt]),
        itemStyle: {color: '#FFAB91'},
        barWidth: 2,
        yAxisIndex: 1
      });
    }
    
    // Temperature (right axis)
    series.push({
      name: 'Temperature',
      type: 'line',
      data: results.map(d => [d.doy, d.temp]),
      lineStyle: {color: '#F44336', width: 1, type: 'dashed'},
      yAxisIndex: 2,
      showSymbol: false
    });
    
    const option = {
      title: {
        text: 'Snow Accumulation & Melt Simulation',
        left: 'center'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {type: 'cross'}
      },
      legend: {
        data: series.map(s => s.name),
        top: 30
      },
      grid: {
        left: 80,
        right: 80,
        top: 80,
        bottom: 60
      },
      xAxis: {
        type: 'value',
        name: 'Day of Water Year (Oct 1 = 0)',
        nameLocation: 'middle',
        nameGap: 30,
        min: 0,
        max: 365
      },
      yAxis: [
        {
          type: 'value',
          name: 'SWE (mm)',
          nameLocation: 'middle',
          nameGap: 50,
          min: 0
        },
        {
          type: 'value',
          name: 'Precip/Melt (mm/day)',
          nameLocation: 'middle',
          nameGap: 50,
          position: 'left',
          offset: 60
        },
        {
          type: 'value',
          name: 'Temperature (°C)',
          nameLocation: 'middle',
          nameGap: 50,
          position: 'right'
        }
      ],
      series: series
    };
    
    chart.setOption(option, true);
  }
  
  document.getElementById('ddf').addEventListener('input', (e) => {
    ddf = parseFloat(e.target.value);
    document.getElementById('ddf-val').textContent = ddf.toFixed(1);
    render();
  });
  
  document.getElementById('elevation').addEventListener('input', (e) => {
    elevation = parseFloat(e.target.value);
    document.getElementById('elev-val').textContent = elevation;
    render();
  });
  
  document.getElementById('winter-precip').addEventListener('input', (e) => {
    precipScale = parseFloat(e.target.value) / 100;
    document.getElementById('precip-val').textContent = e.target.value;
    render();
  });
  
  document.getElementById('show-precip').addEventListener('change', (e) => {
    showPrecip = e.target.checked;
    render();
  });
  
  document.getElementById('show-melt').addEventListener('change', (e) => {
    showMelt = e.target.checked;
    render();
  });
  
  render();
  
  window.addEventListener('resize', () => chart.resize());
})();
</script>

**Try this:**
- **Higher elevation:** Colder temps, later melt, more peak SWE
- **Lower elevation:** Earlier melt, less accumulation
- **Higher DDF:** Faster melt (more sensitive to temperature)
- **More precipitation:** Higher peak SWE, more water stored
- **Blue area:** SWE accumulation through season
- **Light blue bars:** Snowfall events
- **Orange bars (downward):** Daily melt
- **Red dashed line:** Temperature (when > 0°C, melt occurs)
- Notice: Peak SWE in March/April, rapid melt in May!

**Key insight:** Snowpack is a natural reservoir—stores winter precipitation, releases during spring melt when plants need water!

---

## 6. Interpretation

### Water Supply Forecasting

**April 1 SWE** predicts summer streamflow:

$$Q_{\text{summer}} = \alpha \times \text{SWE}_{\text{Apr1}} + \beta \times P_{\text{Apr-Jul}}$$

Where:
- $Q$ = seasonal flow volume
- $\alpha$ = coefficient (~0.6-0.8)
- $P$ = spring/summer precipitation

**Regression model** calibrated to basin.

**Example:** Sierra Nevada
- SWE = 800 mm on April 1
- Predicted runoff: ~500 mm (60-70% efficiency)

**Water allocation** based on this forecast.

### Flood Forecasting

**Peak flow timing:**

Snowmelt contribution:

$$Q_{\text{melt}}(t) = \frac{M(t) \times A}{86400}$$

Where:
- $Q$ = discharge (m³/s)
- $M$ = melt rate (mm/day)
- $A$ = basin area (m²)
- 86400 = seconds/day

**Combined:** Rain + snowmelt = compounded runoff.

**Example:** 100 km² basin, 50 mm/day melt:

$$Q = \frac{50 \times 10^{-3} \times 100 \times 10^6}{86400} = 57.9 \text{ m}^3\text{/s}$$

**Plus rain:** Could exceed channel capacity → flooding.

### Climate Change Impacts

**Observed trends:**
- Earlier snowmelt (1-2 weeks)
- Lower peak SWE (20-30% reduction in some regions)
- Shorter snow-covered season
- More rain vs. snow (elevation threshold rising)

**Implications:**
- Earlier peak flows (March vs. April)
- Less summer baseflow (less storage)
- Increased winter flooding
- Reduced water availability for irrigation

### Drought Detection

**SWE anomaly:**

$$A = \frac{\text{SWE}_{\text{current}} - \text{SWE}_{\text{climatology}}}{\sigma_{\text{climatology}}}$$

**Drought:** $A < -1.5$ (SWE far below normal)

**Example:** 2015 California drought
- April 1 SWE: 5% of normal (95% deficit!)
- Severe water shortages

---

## 7. What Could Go Wrong?

### Temperature-Only Models

**Degree-day limitation:** Ignores radiation, wind, humidity.

**Fails when:**
- Clear cold nights: Strong radiation cooling, no melt despite positive Tmean
- Cloudy warm days: Less solar, slower melt than predicted
- Shaded vs. sunny slopes: Same temperature, different melt

**Solution:** Enhanced degree-day with radiation term, or full energy balance.

### Rain-Snow Threshold

**Fixed 0°C threshold** misses:
- Mixed precipitation zone (-1 to +3°C)
- Humidity effects (wet bulb vs. dry bulb temp)
- Elevation gradients in precipitation phase

**Better:** Logistic transition function or wet-bulb temperature.

### Sublimation Ignored

**Dry, windy conditions:** Significant mass loss without melt.

**Example:** High plains, winter Chinook winds
- Sublimation: 1-2 mm/day
- Over season: 50-100 mm loss

**Should include:** Sublimation in mass balance (especially arid regions).

### Spatial Variability

**Point model vs. distributed:**

Within-basin variation:
- North vs. south slopes (radiation)
- Elevation bands (temperature)
- Forest vs. clearing (radiation, wind)

**Solution:** Divide basin into elevation zones or grid cells, model each separately.

---

## 8. Extension: Utah Energy Balance (UEB) Model

**Physically-based multi-layer model:**

**Layers:**
1. Surface layer (energy exchange)
2. Upper layer (recent snow)
3. Lower layer (old snow)

**Each layer tracks:**
- Temperature
- Density
- Liquid water content
- Ice content

**Energy balance at surface:**
- Shortwave radiation (with penetration)
- Longwave radiation
- Sensible heat
- Latent heat
- Ground heat
- Advected heat (rain)

**Internal processes:**
- Percolation (liquid water movement)
- Refreezing (cold content)
- Compaction (density change)

**Output:**
- SWE evolution
- Runoff timing and magnitude
- Internal energy state

**Used:** Research, detailed forecasting, calibrated basins.

---

## 9. Math Refresher: Integration & Accumulation

### Definite Integral

**Accumulation over time:**

$$S(t) = S_0 + \int_{t_0}^{t} \left(\frac{dS}{dt}\right) dt$$

**For SWE:**

$$S(t) = S_0 + \int_{t_0}^{t} (P_{\text{snow}} - M - E) \, dt$$

**Discrete (daily time steps):**

$$S_{t+1} = S_t + (P_{\text{snow},t} - M_t - E_t) \Delta t$$

Where $\Delta t = 1$ day.

### Numerical Integration

**Trapezoidal rule:**

$$\int_a^b f(x) \, dx \approx \sum_{i=1}^{n} \frac{f(x_{i-1}) + f(x_i)}{2} \Delta x$$

**For total melt:**

$$M_{\text{total}} = \sum_{i=1}^{n} M_i \times 1 \text{ day}$$

**Example:** Daily melt: 0, 0, 5, 10, 15, 20 mm

$$M_{\text{total}} = 0 + 0 + 5 + 10 + 15 + 20 = 50 \text{ mm}$$

---

## Summary

- **Snow Water Equivalent (SWE)** quantifies water stored in snowpack
- **Mass balance:** SWE change = snowfall - melt - sublimation
- **Degree-day models:** Empirical melt based on temperature ($M = a(T - T_{melt})$)
- **Typical DDF:** 2-6 mm/(°C·day) depending on exposure and cover
- **Seasonal cycle:** Accumulation (Oct-Mar), peak SWE (Apr), melt (Apr-Jun)
- **Rain-snow threshold:** Temperature determines precipitation phase (~0°C)
- **Applications:** Water supply forecasting, flood prediction, drought monitoring
- **Climate change:** Earlier melt, lower peak SWE, more rain vs. snow
- **Advanced models:** Energy balance (UEB, SNOBAL) for detailed physics
- **Spatial variation:** Elevation, aspect, canopy coverage affect accumulation and melt
- Foundation for understanding mountain water resources and seasonal streamflow

**Next:** In Essay 44, we explore **Snow Water Equivalent Estimation** from remote sensing and ground observations—how do we actually measure what we just modeled?

---
