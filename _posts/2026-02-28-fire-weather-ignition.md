---
layout: essay
title: "Fire Weather and Ignition Potential"
subtitle: "Meteorological conditions that drive wildfire ignition and spread"
date: 2026-02-27
categories: [modeling]
series: computational-geography-atmospheric-hazards
series_order: 1
cluster: V
cluster_title: "Fire Science"
tags:
  - computational-geography
  - modeling
  - fire
  - meteorology
  - hazards
  - atmospheric-science
  - wildfire
math: true
viz: true
difficulty: 3
math_core: [fuel-moisture, vapor-pressure-deficit, fire-weather-indices, ignition-probability]
spatial_reasoning: 2
dynamics: 3
computation: 3
domain: [fire-science, meteorology, hazards, forestry]
excerpt: >
  What weather conditions create extreme wildfire risk? Fire weather combines
  temperature, humidity, wind, and fuel conditions to determine ignition potential
  and fire behavior. This essay derives fuel moisture equations, implements vapor
  pressure deficit calculations, demonstrates fire weather indices, and maps
  ignition probability across landscapes.
math_prerequisites: >
  Atmospheric moisture basics. Exponential decay. Heat transfer concepts. We'll
  introduce fire meteorology and fuel dynamics from first principles.
---

## 1. The Question

Will today's weather conditions trigger catastrophic wildfires?

**Fire weather:**

Meteorological conditions controlling fire ignition and spread.

**Critical factors:**

**Temperature:** Higher → drier fuels, more volatilization  
**Humidity:** Lower → drier fuels, faster spread  
**Wind:** Stronger → rapid spread, spot fires  
**Precipitation:** Recent rain → wet fuels, low risk

**Fire triangle:**
1. Fuel (vegetation)
2. Oxygen (atmosphere)
3. Heat (ignition source)

**Weather affects all three:**
- Fuel moisture content
- Wind supplies oxygen
- Temperature affects ignition threshold

**Applications:**
- Fire danger rating systems
- Red flag warnings
- Prescribed burn planning
- Firefighting resource allocation
- Evacuation decisions

**Indices:**
- Fire Weather Index (FWI, Canada)
- Keetch-Byram Drought Index (KBDI, USA)
- Haines Index (atmospheric instability)
- Hot-Dry-Windy Index (HDW)

---

## 2. The Conceptual Model

### Fuel Moisture Content

**Definition:**

$$MC = \frac{m_{\text{water}}}{m_{\text{dry}}} \times 100\%$$

Where:
- $MC$ = moisture content (%)
- $m_{\text{water}}$ = mass of water
- $m_{\text{dry}}$ = dry fuel mass

**Categories:**

**Fine fuels (1-hour):** Grasses, needles, <6mm diameter  
**Medium fuels (10-hour):** Twigs, 6-25mm  
**Heavy fuels (100-hour):** Branches, 25-75mm  
**Large fuels (1000-hour):** Logs, >75mm

**Equilibrium moisture content (EMC):**

$$EMC = 0.03 + 0.2626 \times RH^{0.935} - 0.00104 \times T$$

Where:
- $RH$ = relative humidity (%)
- $T$ = temperature (°C)

**Ignition thresholds:**
- Dead fuels: MC < 15% (flammable)
- Dead fuels: MC < 8% (extreme fire danger)
- Live fuels: MC < 80% (drought-stressed, flammable)

### Vapor Pressure Deficit

**Atmospheric drying power:**

$$VPD = e_s - e_a$$

Where:
- $e_s$ = saturation vapor pressure (kPa)
- $e_a$ = actual vapor pressure (kPa)

**Saturation vapor pressure (Tetens equation):**

$$e_s = 0.611 \exp\left(\frac{17.27 T}{T + 237.3}\right)$$

**Actual vapor pressure:**

$$e_a = \frac{RH}{100} \times e_s$$

**High VPD** (>3 kPa): Rapid fuel drying, plant stress

**Low VPD** (<1 kPa): Slow drying, less fire danger

### Wind Effects

**Rate of spread:**

$$ROS = ROS_0 (1 + C \times U^B)$$

Where:
- $ROS$ = rate of spread (m/min)
- $ROS_0$ = no-wind spread rate
- $U$ = wind speed (km/h)
- $C, B$ = empirical constants (fuel-dependent)

**Typical:** Wind doubles spread rate every 10 km/h increase

**Critical wind speeds:**
- 25 km/h: Moderate spread
- 40 km/h: Fast spread, difficulty controlling
- 60+ km/h: Extreme spread, spotting, ember storms

**Gustiness:** Variable winds → unpredictable fire behavior

---

## 3. Building the Mathematical Model

### Time-Lag Fuel Moisture

**Exponential approach to equilibrium:**

$$MC(t) = EMC + (MC_0 - EMC) e^{-t/\tau}$$

Where:
- $MC(t)$ = moisture at time $t$
- $MC_0$ = initial moisture
- $EMC$ = equilibrium moisture content
- $\tau$ = time lag (hours)

**Time lags:**
- 1-hour: $\tau = 1$ h (fine fuels)
- 10-hour: $\tau = 10$ h
- 100-hour: $\tau = 100$ h
- 1000-hour: $\tau = 1000$ h

**Example:**

Initial MC = 20%, EMC = 8%, after 3 hours (1-hour fuel):

$$MC(3) = 8 + (20 - 8) e^{-3/1} = 8 + 12 \times 0.050 = 8.6\%$$

**Rapid drying in 3 hours!**

### Fire Weather Index (FWI)

**Canadian FWI System:**

**Fine Fuel Moisture Code (FFMC):**

Moisture in litter/fine fuels (0-101 scale).

$$FFMC_{\text{new}} = 59.5 \times \frac{250 - MC}{147.2 + MC}$$

High FFMC (>90): Very dry, high ignition potential

**Duff Moisture Code (DMC):**

Moderate duff/humus moisture.

**Drought Code (DC):**

Deep organic layer moisture (cumulative dryness).

**Initial Spread Index (ISI):**

$$ISI = 0.208 \times FFMC \times \left(1 + \frac{U}{10}\right)$$

Combines fuel moisture and wind.

**Fire Weather Index:**

$$FWI = 0.05 \times ISI \times \sqrt{BUI}$$

Where $BUI$ = buildup index (from DMC, DC).

**Interpretation:**
- FWI < 5: Low danger
- FWI 5-10: Moderate
- FWI 10-20: High
- FWI 20-30: Very high
- FWI > 30: Extreme

### Keetch-Byram Drought Index

**Cumulative moisture deficit:**

$$KBDI_{\text{new}} = KBDI_{\text{old}} + \Delta KBDI - P_{\text{eff}}$$

**Drought factor:**

$$\Delta KBDI = \frac{(800 - KBDI) \times (0.968 \times e^{0.0486T} - 8.3)}{1 + 10.88 e^{-0.001736 \times MAP}}$$

Where:
- $T$ = temperature (°C)
- $MAP$ = mean annual precipitation (mm)
- $P_{\text{eff}}$ = effective precipitation (mm)

**Scale:** 0-800
- 0-200: Soil/fuel moisture adequate
- 200-400: Soil moisture declining
- 400-600: Drought affecting fire potential
- 600-800: Severe drought, extreme fire danger

---

## 4. Worked Example by Hand

**Problem:** Calculate fire danger indices for given weather.

**Weather conditions:**
- Temperature: 35°C
- Relative humidity: 20%
- Wind speed: 30 km/h
- No precipitation last 7 days

**Fuel state:**
- Initial 1-hour fuel MC: 18%
- Initial FFMC: 85

Calculate EMC, VPD, updated FFMC, ISI, and fire danger level.

### Solution

**Step 1: Equilibrium Moisture Content**

$$EMC = 0.03 + 0.2626 \times 20^{0.935} - 0.00104 \times 35$$

$$= 0.03 + 0.2626 \times 15.2 - 0.036$$

$$= 0.03 + 3.99 - 0.036 = 3.98\%$$

**Very dry equilibrium!**

**Step 2: Vapor Pressure Deficit**

$$e_s = 0.611 \exp\left(\frac{17.27 \times 35}{35 + 237.3}\right)$$

$$= 0.611 \exp\left(\frac{604.45}{272.3}\right) = 0.611 \times e^{2.22} = 0.611 \times 9.21 = 5.63 \text{ kPa}$$

$$e_a = \frac{20}{100} \times 5.63 = 1.13 \text{ kPa}$$

$$VPD = 5.63 - 1.13 = 4.50 \text{ kPa}$$

**Very high VPD** (extreme drying)

**Step 3: 1-hour fuel moisture after 3 hours**

$$MC(3) = 3.98 + (18 - 3.98) e^{-3/1}$$

$$= 3.98 + 14.02 \times 0.050 = 3.98 + 0.70 = 4.68\%$$

**Approaching equilibrium, very dry**

**Step 4: Updated FFMC**

$$FFMC = 59.5 \times \frac{250 - 4.68}{147.2 + 4.68}$$

$$= 59.5 \times \frac{245.32}{151.88} = 59.5 \times 1.615 = 96.1$$

**Very high FFMC** (>90 = extreme)

**Step 5: Initial Spread Index**

$$ISI = 0.208 \times 96.1 \times \left(1 + \frac{30}{10}\right)$$

$$= 19.99 \times 4 = 80.0$$

**Extremely high ISI**

**Step 6: Fire danger assessment**

- FFMC = 96.1: Extreme
- VPD = 4.5 kPa: Extreme drying
- Wind = 30 km/h: Moderate-high
- ISI = 80: Extreme

**Overall: EXTREME FIRE DANGER**

**Red flag warning criteria met.** Any ignition likely to become rapidly spreading, uncontrollable fire.

---

## 5. Computational Implementation

Below is an interactive fire weather simulator.

<div class="viz-container" id="fire-viz">
  <div class="controls">
    <label>
      Temperature (°C):
      <input type="range" id="temperature" min="15" max="45" step="1" value="30">
      <span id="temp-val">30</span>
    </label>
    <label>
      Relative Humidity (%):
      <input type="range" id="humidity" min="10" max="80" step="5" value="30">
      <span id="humid-val">30</span>
    </label>
    <label>
      Wind Speed (km/h):
      <input type="range" id="wind-speed" min="0" max="60" step="5" value="20">
      <span id="wind-val">20</span>
    </label>
    <label>
      Days since rain:
      <input type="range" id="days-dry" min="0" max="30" step="1" value="7">
      <span id="dry-val">7</span>
    </label>
    <div class="fire-info">
      <p><strong>VPD:</strong> <span id="vpd">--</span> kPa</p>
      <p><strong>1-hr fuel MC:</strong> <span id="fuel-mc">--</span>%</p>
      <p><strong>FFMC:</strong> <span id="ffmc">--</span></p>
      <p><strong>Fire danger:</strong> <span id="danger-level">--</span></p>
    </div>
  </div>
  <div id="fire-canvas-container">
    <canvas id="fire-canvas" width="700" height="400" style="border: 1px solid #ddd;"></canvas>
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
  const chart = echarts.init(document.getElementById('fire-canvas'));
  
  let temperature = 30;
  let humidity = 30;
  let windSpeed = 20;
  let daysDry = 7;
  
  function calculateFireWeather() {
    // EMC
    const EMC = 0.03 + 0.2626 * Math.pow(humidity, 0.935) - 0.00104 * temperature;
    
    // VPD
    const es = 0.611 * Math.exp((17.27 * temperature) / (temperature + 237.3));
    const ea = (humidity / 100) * es;
    const VPD = es - ea;
    
    // 1-hour fuel moisture (starting at 15%, approach EMC over days)
    const initialMC = 15;
    const tau = 1; // 1-hour fuel
    const hours = daysDry * 24;
    const fuelMC = EMC + (initialMC - EMC) * Math.exp(-hours / tau);
    
    // FFMC
    const FFMC = 59.5 * (250 - fuelMC) / (147.2 + fuelMC);
    
    // ISI
    const ISI = 0.208 * FFMC * (1 + windSpeed / 10);
    
    // Danger level
    let dangerLevel, dangerColor;
    if (FFMC > 92 && VPD > 3.5 && windSpeed > 25) {
      dangerLevel = 'EXTREME';
      dangerColor = '#B71C1C';
    } else if (FFMC > 88 || VPD > 3) {
      dangerLevel = 'Very High';
      dangerColor = '#E64A19';
    } else if (FFMC > 84 || VPD > 2) {
      dangerLevel = 'High';
      dangerColor = '#F57F17';
    } else if (FFMC > 80) {
      dangerLevel = 'Moderate';
      dangerColor = '#FFA726';
    } else {
      dangerLevel = 'Low';
      dangerColor = '#66BB6A';
    }
    
    return {EMC, VPD, fuelMC, FFMC, ISI, dangerLevel, dangerColor};
  }
  
  function generateDiurnalCycle() {
    const data = [];
    
    for (let hour = 0; hour < 24; hour++) {
      // Diurnal temperature variation
      const T = temperature + 8 * Math.sin((hour - 6) * Math.PI / 12);
      
      // Diurnal humidity variation (inverse of temp)
      const H = humidity + 20 * Math.sin((hour - 18) * Math.PI / 12);
      
      // Calculate VPD for this hour
      const es = 0.611 * Math.exp((17.27 * T) / (T + 237.3));
      const ea = (H / 100) * es;
      const VPD = es - ea;
      
      // Calculate EMC
      const EMC = 0.03 + 0.2626 * Math.pow(H, 0.935) - 0.00104 * T;
      
      data.push({hour, T, H, VPD, EMC});
    }
    
    return data;
  }
  
  function render() {
    const result = calculateFireWeather();
    
    document.getElementById('vpd').textContent = result.VPD.toFixed(2);
    document.getElementById('fuel-mc').textContent = result.fuelMC.toFixed(1);
    document.getElementById('ffmc').textContent = result.FFMC.toFixed(0);
    document.getElementById('danger-level').textContent = result.dangerLevel;
    document.getElementById('danger-level').style.color = result.dangerColor;
    
    const diurnalData = generateDiurnalCycle();
    
    const series = [
      {
        name: 'VPD (kPa)',
        type: 'line',
        data: diurnalData.map(d => [d.hour, d.VPD]),
        lineStyle: {color: '#F44336', width: 3},
        yAxisIndex: 0
      },
      {
        name: 'Fuel MC (%)',
        type: 'line',
        data: diurnalData.map(d => [d.hour, d.EMC]),
        lineStyle: {color: '#2196F3', width: 3},
        yAxisIndex: 1
      },
      {
        name: 'Current Time',
        type: 'line',
        data: [[14, 0], [14, 8]],
        lineStyle: {color: '#4CAF50', width: 2, type: 'dashed'},
        markLine: {
          silent: true,
          data: [{xAxis: 14}],
          label: {formatter: 'Peak danger', position: 'insideEndTop'}
        },
        yAxisIndex: 0
      }
    ];
    
    const option = {
      title: {
        text: 'Fire Weather Diurnal Cycle',
        left: 'center'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {type: 'cross'}
      },
      legend: {
        data: ['VPD (kPa)', 'Fuel MC (%)', 'Current Time'],
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
        name: 'Hour of Day',
        nameLocation: 'middle',
        nameGap: 30,
        min: 0,
        max: 23,
        interval: 3
      },
      yAxis: [
        {
          type: 'value',
          name: 'VPD (kPa)',
          nameLocation: 'middle',
          nameGap: 50,
          min: 0,
          max: 8
        },
        {
          type: 'value',
          name: 'Fuel MC (%)',
          nameLocation: 'middle',
          nameGap: 50,
          position: 'right',
          min: 0,
          max: 20
        }
      ],
      series: series
    };
    
    chart.setOption(option, true);
  }
  
  document.getElementById('temperature').addEventListener('input', (e) => {
    temperature = parseFloat(e.target.value);
    document.getElementById('temp-val').textContent = temperature;
    render();
  });
  
  document.getElementById('humidity').addEventListener('input', (e) => {
    humidity = parseFloat(e.target.value);
    document.getElementById('humid-val').textContent = humidity;
    render();
  });
  
  document.getElementById('wind-speed').addEventListener('input', (e) => {
    windSpeed = parseFloat(e.target.value);
    document.getElementById('wind-val').textContent = windSpeed;
    render();
  });
  
  document.getElementById('days-dry').addEventListener('input', (e) => {
    daysDry = parseFloat(e.target.value);
    document.getElementById('dry-val').textContent = daysDry;
    render();
  });
  
  render();
  
  window.addEventListener('resize', () => chart.resize());
})();
</script>

**Observations:**
- VPD peaks in afternoon when temperature highest and humidity lowest
- Fuel moisture content reaches minimum in afternoon
- Fire danger typically greatest 2-4 PM
- Extended dry periods drive fuel moisture to dangerous levels
- Red line (VPD): Atmospheric drying power
- Blue line (Fuel MC): Equilibrium moisture content
- Green dashed: Peak danger period

**Key insights:**
- Hot, dry, windy conditions create extreme fire danger
- Diurnal cycle important for fire behavior prediction
- Multi-day drying cumulative effect critical
- Combined indices provide comprehensive fire danger assessment

---

## 6. Interpretation

### Red Flag Warnings

**National Weather Service criteria (USA):**

**Combination of:**
- RH ≤ 15%
- Wind ≥ 25 mph (40 km/h)
- Unstable atmosphere (Haines Index)

**During red flag:**
- No outdoor burning
- Heightened firefighting readiness
- Public awareness campaigns
- Prescribed burns cancelled

**Example - California 2020:**

Labor Day heat wave:
- T = 45°C, RH = 8%, winds 50 km/h
- Multiple megafires ignited
- 4+ million acres burned (record)

### Prescribed Burn Windows

**Safe conditions required:**

- Fuel MC: 10-18% (will burn but controllable)
- Wind: 8-25 km/h (enough spread, not too fast)
- RH: 30-60% (moderate)
- Atmospheric stability (smoke dispersal)

**Narrow windows:**

Spring/fall often best (temperature moderate, some moisture).

**Example - Florida:**

Winter burns common (cooler, higher humidity baseline).

### Seasonal Fire Danger

**Mediterranean climate (California):**

Peak danger: Late summer-fall (hot, dry, Santa Ana winds)

**Monsoonal (Southwest USA):**

Peak: May-June (pre-monsoon drought)  
Relief: July-September (monsoon rains)

**Temperate forest (PNW):**

Peak: July-August (summer drought)  
Low: October-May (wet season)

---

## 7. What Could Go Wrong?

### Haines Index Ignored

**Atmospheric instability** amplifies fire behavior.

**Haines Index:**

Combines:
- Stability (temperature lapse rate)
- Moisture (dew point depression aloft)

**High Haines (5-6):**

Extreme fire behavior potential:
- Plume-driven spread
- Erratic winds
- Rapid fire growth

**2003 Canberra fires:**

Moderate FFMC but high Haines → catastrophic fire behavior.

**Lesson:** Surface indices insufficient alone.

### Fuel Load Not Considered

**FFMC measures moisture,** not quantity.

**Heavy fuel load:**

Years of accumulation (fire suppression) → more available energy.

**Light fuel load:**

Recent fire or minimal vegetation → less fire spread even if dry.

**Solution:** Integrate fuel maps (biomass, fuel type).

### Topography Effects

**Slope increases spread:**

$$ROS_{\text{slope}} = ROS_{\text{flat}} \times e^{k \times \text{slope}}$$

Where $k \approx 0.05-0.1$ (per degree slope).

**Chimneys/canyons:**

Funneled winds, preheating → extreme spread.

**Aspect:**

South-facing slopes (northern hemisphere): Hotter, drier → more flammable.

**Solution:** Incorporate terrain into fire danger mapping.

### Spotting Not Predicted

**Ember transport** downwind.

**Distance:** 0.5-5 km typical, up to 30 km in extreme conditions.

**Creates new fires** ahead of main front.

**Example - 2009 Black Saturday (Australia):**

Spotting from eucalyptus bark ignited fires 20+ km ahead.

**Unpredictable** with standard fire weather indices.

---

## 8. Extension: Lightning Fire Prediction

**Dry lightning:**

Thunderstorms with minimal rain → fire ignition.

**Prediction:**

**Lifted Index (LI):**

$$LI = T_{500} - T_{\text{parcel,500}}$$

Where $T_{500}$ = environment temperature at 500 mb.

**Negative LI:** Unstable, thunderstorms likely

**Precipitation efficiency:**

Low = dry lightning.

**Combined model:**

$$P_{\text{ignition}} = P_{\text{lightning}} \times (1 - P_{\text{rain}}) \times f(MC)$$

Where:
- $P_{\text{lightning}}$ from convective indices
- $P_{\text{rain}}$ from precipitation forecast
- $f(MC)$ = fuel moisture ignitability

---

## 9. Math Refresher: Exponential Decay

### General Form

$$y(t) = y_{\infty} + (y_0 - y_{\infty}) e^{-t/\tau}$$

Where:
- $y(t)$ = value at time $t$
- $y_0$ = initial value
- $y_{\infty}$ = equilibrium value
- $\tau$ = time constant

**Half-life:**

$$t_{1/2} = \tau \ln 2 \approx 0.693 \tau$$

**Time to 90% equilibrium:**

$$t_{90\%} = \tau \ln 10 \approx 2.3 \tau$$

### Application to Fuel Moisture

Fuel approaches EMC exponentially.

**Time lag** = $\tau$

1-hour fuel: 63% to EMC in 1 hour, 90% in 2.3 hours.

100-hour fuel: Takes 230 hours (9.6 days) to reach 90% of EMC.

---

## Summary

- Fire weather combines temperature, humidity, wind, and precipitation to determine fire danger
- Fuel moisture content critical threshold below 15% for ignition, below 8% for extreme danger
- Vapor pressure deficit quantifies atmospheric drying power affecting fuel and vegetation
- Fire Weather Index integrates fuel moisture, wind, and cumulative dryness into single metric
- Equilibrium moisture content derived from temperature and relative humidity relationships
- Time-lag fuels respond at different rates from hours to weeks
- Red flag warnings issued when RH ≤15%, wind ≥40 km/h, and unstable atmosphere
- Applications span prescribed burn planning, firefighting readiness, public warnings
- Challenges include atmospheric instability effects, topographic modifications, spotting
- Critical tool for wildfire risk assessment and fire management operations
