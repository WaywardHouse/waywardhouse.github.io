---
layout: essay
title: "Phenology and Growing Season Dynamics"
subtitle: "Temperature, photoperiod, and the timing of leaf emergence and senescence"
date: 2026-02-26
categories: [modeling]
series: computational-geography-environmental
series_order: 16
cluster: J
cluster_title: "Biogeochemical Cycles"
tags:
  - computational-geography
  - modeling
  - phenology
  - growing-degree-days
  - photoperiod
  - seasonality
  - leaf-area-index
math: true
viz: true
difficulty: 3
math_core: [thermal-time, accumulation, threshold-response, seasonal-dynamics]
spatial_reasoning: 2
dynamics: 3
computation: 2
domain: [ecology, agriculture, climatology, remote-sensing]
excerpt: >
  When do leaves emerge in spring? When do crops mature? Phenology—the timing of
  biological events—is controlled by temperature accumulation (growing degree days)
  and day length (photoperiod). This essay models bud break, leaf expansion, flowering,
  and senescence, and shows how phenology affects annual productivity.
math_prerequisites: >
  Seasonal cycles conceptually. Integration/accumulation (growing degree days are
  integrals of temperature). Photosynthesis and LAI (Essay 20). We'll introduce
  thermal time from first principles.
---

## 1. The Question

Why do trees in Minnesota leaf out in May, while trees in Florida leaf out in February?

**Phenology** is the study of seasonal timing in organisms:
- **Bud break:** When buds open and leaves emerge
- **Flowering:** When plants produce flowers
- **Senescence:** When leaves die and fall
- **Migration:** When animals move (birds, butterflies)

These events are triggered by **environmental cues:**
- **Temperature:** Accumulated warmth (thermal time)
- **Photoperiod:** Day length
- **Chilling:** Cold exposure needed for dormancy break

The mathematical question: How do we model phenological timing from weather data, and how does phenology affect ecosystem productivity?

---

## 2. The Conceptual Model

### Growing Degree Days (GDD)

**Thermal time:** Plants accumulate heat above a base temperature.

$$\text{GDD} = \sum_{t=1}^{n} \max(0, T_{\text{avg}}(t) - T_{\text{base}})$$

Where:
- $T_{\text{avg}}$ = daily average temperature (°C)
- $T_{\text{base}}$ = base temperature (typically 5–10°C)
- Sum over days

**Example:** Day with $T_{\text{avg}} = 15°$C, $T_{\text{base}} = 5°$C:

$$\text{GDD} = 15 - 5 = 10 \text{ degree-days}$$

**Threshold for bud break:** Typically 100–300 GDD accumulated since spring.

### Photoperiod

**Day length** varies with latitude and day of year.

**Approximation:**

$$D = 12 + 2 \arcsin(\tan \phi \tan \delta) \times \frac{24}{2\pi}$$

Where:
- $D$ = day length (hours)
- $\phi$ = latitude (radians)
- $\delta$ = solar declination (function of day of year)

**Solar declination:**

$$\delta = 23.45° \sin\left(\frac{360}{365}(d - 81)\right)$$

Where $d$ is day of year (1 = Jan 1).

**Critical photoperiod:** Some plants require day length > threshold to flower.
- **Long-day plants:** Flower when days exceed ~14 hours (wheat, spinach)
- **Short-day plants:** Flower when days fall below ~12 hours (soybeans, rice)
- **Day-neutral plants:** Flower independent of photoperiod (tomatoes, corn)

### Chilling Requirement

**Dormancy:** Many temperate plants require cold exposure before they can respond to spring warmth.

**Chilling units:** Days with temperature 0–7°C.

**Example:** Apple trees need ~1000 chilling hours (42 days at 0–7°C) before bud break.

**Problem in warming climate:** Insufficient winter chilling can delay spring phenology.

---

## 3. Building the Mathematical Model

### Spring Phenology Model

**Bud break timing:**

1. **Start date:** January 1 (or after chilling requirement met)
2. **Accumulate GDD:** Sum daily degree-days
3. **Trigger:** When $\sum \text{GDD} > \text{GDD}_{\text{crit}}$

**GDD threshold** varies by species:
- Early species (willow): 100 GDD
- Mid-season (oak): 200 GDD
- Late species (ash): 300 GDD

### Leaf Area Index Dynamics

**Spring green-up:**

$$\frac{d\text{LAI}}{dt} = r_g \times (T - T_{\text{base}}) \times (LAI_{\text{max}} - \text{LAI})$$

Where:
- $r_g$ = growth rate parameter
- LAI asymptotes to $LAI_{\text{max}}$ (maximum leaf area)

**Autumn senescence:**

Triggered by:
- Decreasing photoperiod (day length < threshold)
- Frost events (temperature < 0°C)
- Age (days since leaf emergence > 150)

$$\frac{d\text{LAI}}{dt} = -r_s \times \text{LAI}$$

Where $r_s$ is senescence rate (day⁻¹).

### Growing Season Length

**Start of season (SOS):** When LAI > 0.5 or NDVI > 0.3

**End of season (EOS):** When LAI < 0.5 or NDVI < 0.3

**Growing season length:**

$$\text{GSL} = \text{EOS} - \text{SOS}$$

**Typical values:**
- Tropics: GSL = 365 days (year-round)
- Temperate: GSL = 150–200 days
- Boreal: GSL = 90–120 days
- Tundra: GSL = 60–90 days

### Frost Risk

**Last spring frost:** Latest date with $T_{\min} < 0°$C

**First fall frost:** Earliest date with $T_{\min} < 0°$C

**Frost-free period:** Time between last spring and first fall frost.

**Agricultural importance:** Crops must mature within frost-free period.

**Example:** Corn needs 120–140 GDD from planting to maturity. In short-season climates, must plant as soon as last frost passes.

---

## 4. Worked Example by Hand

**Problem:** A deciduous tree at 45°N has:
- Base temperature: $T_{\text{base}} = 5°$C
- GDD requirement for bud break: 200 degree-days
- Chilling requirement met by April 1

Temperature record (daily average):
- April 1–10: 10°C
- April 11–20: 12°C
- April 21–30: 15°C

When does bud break occur?

### Solution

**GDD accumulation:**

**April 1–10** (10 days at 10°C):

$$\text{GDD} = 10 \times (10 - 5) = 10 \times 5 = 50 \text{ degree-days}$$

**Cumulative:** 50

**April 11–20** (10 days at 12°C):

$$\text{GDD} = 10 \times (12 - 5) = 10 \times 7 = 70 \text{ degree-days}$$

**Cumulative:** 50 + 70 = 120

**April 21–30** (10 days at 15°C):

$$\text{GDD} = 10 \times (15 - 5) = 10 \times 10 = 100 \text{ degree-days}$$

**Cumulative:** 120 + 100 = 220

**Bud break** occurs when cumulative GDD reaches 200.

**Within April 21–30:**

Need 200 - 120 = 80 more degree-days.

At 10 degree-days per day: 80 / 10 = 8 days.

**Bud break date:** April 21 + 8 = **April 29**

---

## 5. Computational Implementation

Below is an interactive phenology simulator.

<div class="viz-container" id="phenology-viz">
  <div class="controls">
    <label>
      Latitude:
      <input type="range" id="latitude-slider" min="30" max="60" step="5" value="45">
      <span id="latitude-value">45</span>°N
    </label>
    <label>
      Species type:
      <select id="species-type">
        <option value="early">Early (willow, 100 GDD)</option>
        <option value="mid" selected>Mid-season (oak, 200 GDD)</option>
        <option value="late">Late (ash, 300 GDD)</option>
      </select>
    </label>
    <label>
      Climate scenario:
      <select id="climate-scenario">
        <option value="current">Current Climate</option>
        <option value="warm2c" selected>+2°C Warming</option>
        <option value="warm4c">+4°C Warming</option>
      </select>
    </label>
    <div class="button-group">
      <button id="run-phenology-sim">Run Year</button>
    </div>
  </div>
  <div class="phenology-results">
    <p><strong>Bud break (SOS):</strong> <span id="bud-break-date"></span></p>
    <p><strong>Peak LAI date:</strong> <span id="peak-lai-date"></span></p>
    <p><strong>Senescence start (EOS):</strong> <span id="senescence-date"></span></p>
    <p><strong>Growing season length:</strong> <span id="gsl-result"></span> days</p>
    <p><strong>Annual GPP:</strong> <span id="annual-gpp"></span> kg C/m²</p>
  </div>
  <div id="phenology-chart" style="width: 100%; height: 500px;"></div>
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
  const chart = echarts.init(document.getElementById('phenology-chart'));
  
  const species = {
    early: { gddReq: 100, maxLAI: 4.5, name: 'Early (willow)' },
    mid: { gddReq: 200, maxLAI: 5.0, name: 'Mid-season (oak)' },
    late: { gddReq: 300, maxLAI: 4.0, name: 'Late (ash)' }
  };
  
  let latitude = 45;
  let speciesType = 'mid';
  let warming = 2;
  
  function dayOfYear(month, day) {
    const daysInMonth = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    let doy = day;
    for (let m = 1; m < month; m++) {
      doy += daysInMonth[m];
    }
    return doy;
  }
  
  function dateFromDOY(doy) {
    const daysInMonth = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    let month = 1;
    let remaining = doy;
    while (remaining > daysInMonth[month]) {
      remaining -= daysInMonth[month];
      month++;
    }
    const monthNames = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
                        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${monthNames[month]} ${remaining}`;
  }
  
  function temperatureModel(doy, lat, warming) {
    // Sinusoidal temperature model
    const Tmean = 10 + warming; // Base mean temperature
    const Tampl = 15; // Amplitude
    const phase = lat / 90 * 30; // Latitude-dependent phase shift (days)
    return Tmean + Tampl * Math.sin(2 * Math.PI * (doy - 80 - phase) / 365);
  }
  
  function photoperiod(doy, lat) {
    // Simplified day length calculation
    const latRad = lat * Math.PI / 180;
    const declination = 23.45 * Math.sin(2 * Math.PI * (doy - 81) / 365) * Math.PI / 180;
    const cosH = -Math.tan(latRad) * Math.tan(declination);
    if (cosH > 1) return 0;
    if (cosH < -1) return 24;
    const H = Math.acos(cosH);
    return 2 * H * 12 / Math.PI;
  }
  
  function runPhenologySim() {
    const sp = species[speciesType];
    const Tbase = 5;
    
    let gdd = 0;
    let LAI = 0;
    let budBreakDOY = null;
    let peakLAIDOY = null;
    let senescenceDOY = null;
    let maxLAI = 0;
    
    const doyData = [];
    const laiData = [];
    const tempData = [];
    const photoData = [];
    const gddData = [];
    
    // Start from day 60 (early March)
    for (let doy = 60; doy <= 365; doy++) {
      const T = temperatureModel(doy, latitude, warming);
      const photo = photoperiod(doy, latitude);
      
      // Accumulate GDD
      if (T > Tbase && budBreakDOY === null) {
        gdd += (T - Tbase);
      }
      
      // Bud break
      if (gdd > sp.gddReq && budBreakDOY === null) {
        budBreakDOY = doy;
      }
      
      // LAI growth (after bud break, while warm)
      if (budBreakDOY !== null && T > Tbase && senescenceDOY === null) {
        const growth = 0.05 * (T - Tbase) * (sp.maxLAI - LAI);
        LAI += growth;
        LAI = Math.min(LAI, sp.maxLAI);
      }
      
      // Track peak
      if (LAI > maxLAI) {
        maxLAI = LAI;
        peakLAIDOY = doy;
      }
      
      // Senescence triggers (day length < 12 hrs or cold)
      if (photo < 12 && senescenceDOY === null && doy > 200) {
        senescenceDOY = doy;
      }
      
      // LAI decline
      if (senescenceDOY !== null) {
        LAI -= 0.05 * LAI;
        LAI = Math.max(0, LAI);
      }
      
      doyData.push(doy);
      laiData.push(LAI);
      tempData.push(T);
      photoData.push(photo);
      gddData.push(gdd);
    }
    
    const GSL = (senescenceDOY || 300) - (budBreakDOY || 100);
    
    // Annual GPP (simplified: proportional to LAI and growing season)
    const avgLAI = laiData.reduce((a, b) => a + b, 0) / laiData.length;
    const annualGPP = avgLAI * 0.5; // Very simplified
    
    document.getElementById('bud-break-date').textContent = 
      budBreakDOY ? dateFromDOY(budBreakDOY) : 'N/A';
    document.getElementById('peak-lai-date').textContent = 
      peakLAIDOY ? dateFromDOY(peakLAIDOY) : 'N/A';
    document.getElementById('senescence-date').textContent = 
      senescenceDOY ? dateFromDOY(senescenceDOY) : 'N/A';
    document.getElementById('gsl-result').textContent = GSL;
    document.getElementById('annual-gpp').textContent = annualGPP.toFixed(2);
    
    updateChart(doyData, laiData, tempData, photoData, budBreakDOY, senescenceDOY);
  }
  
  function updateChart(doy, lai, temp, photo, budBreak, senescence) {
    const option = {
      title: {
        text: 'Seasonal Phenology',
        left: 'center'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'cross' }
      },
      legend: {
        data: ['LAI', 'Temperature', 'Photoperiod'],
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
        name: 'Day of Year',
        nameLocation: 'middle',
        nameGap: 30,
        min: 60,
        max: 365
      },
      yAxis: [
        {
          type: 'value',
          name: 'LAI (m²/m²)',
          nameLocation: 'middle',
          nameGap: 50,
          min: 0,
          max: 6
        },
        {
          type: 'value',
          name: 'Temp (°C) / Photo (hr)',
          nameLocation: 'middle',
          nameGap: 50,
          position: 'right',
          min: -10,
          max: 30
        }
      ],
      series: [
        {
          name: 'LAI',
          type: 'line',
          data: doy.map((d, i) => [d, lai[i]]),
          lineStyle: { color: '#2ECC71', width: 3 },
          showSymbol: false,
          yAxisIndex: 0,
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: 'rgba(46, 204, 113, 0.3)' },
              { offset: 1, color: 'rgba(46, 204, 113, 0)' }
            ])
          },
          markLine: {
            silent: true,
            symbol: 'none',
            data: [
              budBreak ? { xAxis: budBreak, label: { formatter: 'Bud Break' }, lineStyle: { color: '#F39C12' } } : null,
              senescence ? { xAxis: senescence, label: { formatter: 'Senescence' }, lineStyle: { color: '#E74C3C' } } : null
            ].filter(x => x)
          }
        },
        {
          name: 'Temperature',
          type: 'line',
          data: doy.map((d, i) => [d, temp[i]]),
          lineStyle: { color: '#E74C3C', width: 2, type: 'dashed' },
          showSymbol: false,
          yAxisIndex: 1
        },
        {
          name: 'Photoperiod',
          type: 'line',
          data: doy.map((d, i) => [d, photo[i]]),
          lineStyle: { color: '#3498DB', width: 2, type: 'dotted' },
          showSymbol: false,
          yAxisIndex: 1
        }
      ]
    };
    
    chart.setOption(option);
  }
  
  document.getElementById('latitude-slider').addEventListener('input', (e) => {
    latitude = parseFloat(e.target.value);
    document.getElementById('latitude-value').textContent = latitude;
  });
  
  document.getElementById('species-type').addEventListener('change', (e) => {
    speciesType = e.target.value;
  });
  
  document.getElementById('climate-scenario').addEventListener('change', (e) => {
    const scenario = e.target.value;
    warming = scenario === 'current' ? 0 : (scenario === 'warm2c' ? 2 : 4);
  });
  
  document.getElementById('run-phenology-sim').addEventListener('click', () => {
    runPhenologySim();
  });
  
  runPhenologySim();
  
  window.addEventListener('resize', () => chart.resize());
})();
</script>

**Try this:**
- **Higher latitude:** Later bud break (cooler spring), shorter growing season
- **Warming scenarios:** Earlier bud break, longer growing season, higher annual GPP
- **Early species:** Lower GDD requirement → earlier green-up
- **Late species:** Higher GDD requirement → later green-up but avoid late frosts
- Notice: Photoperiod (blue dotted) triggers senescence in autumn (falls below 12 hours)

**Key insight:** Climate warming extends growing season by triggering earlier spring phenology and delaying autumn senescence.

---

## 6. Interpretation

### Climate Change Impacts

**Observations:**
- **Earlier spring:** Bud break 2–3 weeks earlier than 50 years ago
- **Later autumn:** Leaf fall 1–2 weeks later
- **Longer growing season:** +10 to +20 days in temperate zones

**Consequences:**
- **Increased NPP:** Longer photosynthesis season
- **Water demand:** Earlier spring → earlier drought stress
- **Frost risk:** Early bud break → vulnerable to late frosts
- **Phenological mismatch:** Plants and pollinators/herbivores out of sync

### Agricultural Applications

**Crop maturity:**

$$\text{Days to maturity} = \frac{\text{GDD}_{\text{required}}}{\text{Daily GDD average}}$$

**Example:** Corn requiring 1400 GDD in climate with 12 GDD/day average:

$$\text{Days} = \frac{1400}{12} = 117 \text{ days}$$

**Planting date optimization:**
- Too early → frost risk
- Too late → insufficient GDD before first fall frost

**Variety selection:**
- Short-season varieties for high latitudes
- Long-season varieties for warm climates

### Remote Sensing Phenology

**NDVI time series** (from Essay 25) tracks phenology:
- **Green-up date:** When NDVI increases rapidly
- **Peak NDVI:** Maximum LAI
- **Brown-down date:** When NDVI decreases

**Applications:**
- Crop monitoring (planting, harvest dates)
- Forest health
- Climate change detection

---

## 7. What Could Go Wrong?

### Using Only Temperature

**Photoperiod matters** for:
- Senescence timing (day length < 12 hours)
- Flowering in long/short-day plants
- Prevents false spring (warm January day doesn't trigger growth)

**Better models:** Combine GDD + photoperiod thresholds.

### Ignoring Chilling Requirement

**Insufficient winter chill:**
- Delays or prevents bud break
- Problem in warming climates (California cherries, wine grapes)
- May require "chill hours" below 7°C, not just cumulative cold

### Constant GDD Threshold

Real plants have **dynamic thresholds:**
- Varies with chilling received
- Varies with water stress
- Genetics (cultivar differences)

### Assuming Instantaneous Response

**Actual phenology:**
- Bud break takes days to weeks
- LAI increases gradually (not step function)
- Senescence is progressive, not sudden

**Better models:** Use sigmoid curves for smooth transitions.

---

## 8. Extension: Frost Hardiness

**Freeze tolerance** varies with season:

**Autumn:** Plants acclimate as temperatures drop
- Harden tissues
- Accumulate sugars (antifreeze)
- Tolerate −20 to −40°C

**Spring:** De-acclimate as warmth returns
- Tissues more vulnerable
- Tolerate only −2 to −5°C

**Critical period:** Early spring after de-acclimation.

**Frost damage function:**

$$D = \begin{cases}
0 & \text{if } T > T_{\text{kill}} \\
1 - \frac{T}{T_{\text{kill}}} & \text{if } T < T_{\text{kill}}
\end{cases}$$

Where $T_{\text{kill}}$ is killing temperature (depends on acclimation state).

---

## 9. Math Refresher: Accumulation and Thresholds

### GDD as Integral

**Continuous form:**

$$\text{GDD}(t) = \int_0^t \max(0, T(\tau) - T_{\text{base}}) \, d\tau$$

**Discrete (daily) approximation:**

$$\text{GDD}(n) = \sum_{i=1}^n \max(0, T_i - T_{\text{base}})$$

### Threshold Detection

**Event occurs when cumulative variable crosses threshold:**

$$t^* = \min\{t : \text{GDD}(t) > \text{GDD}_{\text{crit}}\}$$

**Example:** Find day when cumulative GDD exceeds 200:

Check daily until condition met.

### Sigmoid Response

**Gradual transition** instead of step function:

$$\text{Response} = \frac{1}{1 + e^{-k(x - x_0)}}$$

Where:
- $x_0$ = threshold
- $k$ = steepness parameter

**For LAI:** Smooth green-up instead of instant jump.

---

## Summary

- **Phenology** = timing of biological events (bud break, flowering, senescence)
- **Growing Degree Days (GDD):** Accumulated heat above base temperature
- **Bud break** occurs after threshold GDD accumulation (100–300 degree-days)
- **Photoperiod** (day length) triggers senescence and flowering in some species
- **Chilling requirement:** Winter cold needed before spring response
- **Growing season length:** Time between spring green-up and autumn senescence
- Climate warming → earlier spring, later autumn, longer growing season
- **GDD used** for crop maturity prediction and variety selection
- NDVI time series from satellites track phenology globally
- Phenological shifts affect productivity, water use, frost risk, and species interactions

**This completes Cluster J (Biogeochemical Cycles) and the entire Computational Geography Laboratory series — 28 essays total!**

---
