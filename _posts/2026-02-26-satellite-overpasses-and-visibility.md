---
layout: essay
title: "Satellite Overpasses and Visibility"
subtitle: "Predicting when and where satellites are visible from the ground"
date: 2026-02-26
categories: [modeling]
series: computational-geography-lab
series_order: 15
cluster: F
cluster_title: "Orbital Mechanics"
tags:
  - computational-geography
  - modeling
  - orbital-mechanics
  - satellite-tracking
  - line-of-sight
  - elevation-angle
math: true
viz: true
difficulty: 4
math_core: [3d-geometry, line-of-sight, elevation-angle, azimuth, vector-geometry]
spatial_reasoning: 4
dynamics: 2
computation: 3
domain: [orbital-mechanics, remote-sensing, satellite-tracking, ground-stations]
excerpt: >
  When is a satellite visible from your location? You need line of sight — the
  satellite must be above your horizon and not blocked by Earth itself. This essay
  derives the geometry of satellite visibility, calculates elevation and azimuth
  angles, and predicts overpass times for any ground station.
math_prerequisites: >
  Orbital mechanics (Essays 13-14). Spherical coordinates (Essay 12). Vector dot
  products (Essay 6). We'll build on 3D coordinate geometry to solve visibility.
---

## 1. The Question

When will the International Space Station pass over Denver?

A satellite orbits Earth in a known path. A ground observer at a specific latitude and longitude wants to know:
1. **When** is the satellite above my horizon?
2. **Where** in the sky should I look (elevation angle, compass direction)?
3. **How long** will it be visible?

The mathematical question: Given the satellite's position and the observer's position, calculate the line-of-sight geometry.

---

## 2. The Conceptual Model

### Line of Sight

The satellite is visible if:
1. **Above the local horizon:** Elevation angle > 0°
2. **Not blocked by Earth:** The straight line from observer to satellite doesn't intersect Earth's surface
3. **Sufficient elevation:** Practical visibility often requires elevation > 10° (atmospheric effects, obstructions)

### Horizon Range

Even if a satellite is "overhead" in terms of ground track, it may be **beyond the horizon** if it's too far away laterally.

**Maximum range to horizon** from altitude $h$:

$$d_{\text{max}} = \sqrt{2R_{\oplus}h + h^2}$$

For LEO satellites (~400 km), this is roughly **2300 km** surface distance.

### Elevation and Azimuth

From the observer's perspective:
- **Elevation angle** ($E$): Angle above the horizon (0° = horizon, 90° = zenith)
- **Azimuth** ($Az$): Compass bearing (0° = north, 90° = east, 180° = south, 270° = west)

These are the **look angles** — where to point your antenna or telescope.

---

## 3. Building the Mathematical Model

### Step 1: Position Vectors

**Observer position** (lat, lon, altitude ≈ 0):

$$\mathbf{r}_{\text{obs}} = R_{\oplus} \begin{pmatrix}
\cos(\text{lat}) \cos(\text{lon}) \\
\cos(\text{lat}) \sin(\text{lon}) \\
\sin(\text{lat})
\end{pmatrix}$$

**Satellite position** at time $t$:

$$\mathbf{r}_{\text{sat}}(t) = \begin{pmatrix} x_{\text{sat}}(t) \\ y_{\text{sat}}(t) \\ z_{\text{sat}}(t) \end{pmatrix}$$

(Calculated from orbital parameters using ground track methods from Essay 14)

**Range vector** (from observer to satellite):

$$\mathbf{\rho} = \mathbf{r}_{\text{sat}} - \mathbf{r}_{\text{obs}}$$

### Step 2: Local Horizon Frame

Define a coordinate system at the observer's location:
- **East** ($\mathbf{\hat{e}}$): Points east (tangent to latitude circle)
- **North** ($\mathbf{\hat{n}}$): Points north (tangent to meridian)
- **Up** ($\mathbf{\hat{u}}$): Points away from Earth's center (local vertical)

**Up direction** (unit radial vector):

$$\mathbf{\hat{u}} = \frac{\mathbf{r}_{\text{obs}}}{|\mathbf{r}_{\text{obs}}|} = \begin{pmatrix}
\cos(\text{lat}) \cos(\text{lon}) \\
\cos(\text{lat}) \sin(\text{lon}) \\
\sin(\text{lat})
\end{pmatrix}$$

**East direction:**

$$\mathbf{\hat{e}} = \begin{pmatrix}
-\sin(\text{lon}) \\
\cos(\text{lon}) \\
0
\end{pmatrix}$$

**North direction:**

$$\mathbf{\hat{n}} = \begin{pmatrix}
-\sin(\text{lat}) \cos(\text{lon}) \\
-\sin(\text{lat}) \sin(\text{lon}) \\
\cos(\text{lat})
\end{pmatrix}$$

These form an **orthonormal basis** (all unit length, all perpendicular).

### Step 3: Transform Range Vector to Local Frame

Project the range vector $\mathbf{\rho}$ onto the local East-North-Up frame:

$$\rho_e = \mathbf{\rho} \cdot \mathbf{\hat{e}}$$
$$\rho_n = \mathbf{\rho} \cdot \mathbf{\hat{n}}$$
$$\rho_u = \mathbf{\rho} \cdot \mathbf{\hat{u}}$$

These are the **topocentric coordinates** — position relative to the observer's local horizon.

### Step 4: Calculate Elevation Angle

The **elevation angle** is the angle above the horizontal plane:

$$E = \arcsin\left(\frac{\rho_u}{|\mathbf{\rho}|}\right)$$

Where $|\mathbf{\rho}| = \sqrt{\rho_e^2 + \rho_n^2 + \rho_u^2}$ is the slant range (direct distance from observer to satellite).

**Alternative form:**

$$E = \arctan\left(\frac{\rho_u}{\sqrt{\rho_e^2 + \rho_n^2}}\right)$$

**Visibility condition:** $E > 0°$ (satellite is above horizon)

### Step 5: Calculate Azimuth

The **azimuth** is the compass bearing in the horizontal plane:

$$Az = \arctan2(\rho_e, \rho_n)$$

(Note: `atan2(y, x)` gives the angle from the positive x-axis; here we use `atan2(east, north)` to measure clockwise from north)

**Converting to compass degrees:**
- 0° = North
- 90° = East
- 180° = South
- 270° = West

If the result from `atan2` is negative, add 360°.

---

## 4. Worked Example by Hand

**Problem:** An observer is at Denver (39.7°N, 105.0°W). A satellite is at position:

$$\mathbf{r}_{\text{sat}} = \begin{pmatrix} -2000 \\ 3000 \\ 5500 \end{pmatrix} \text{ km}$$

(a) Calculate the range vector $\mathbf{\rho}$.  
(b) Transform to local East-North-Up coordinates.  
(c) Calculate elevation angle and azimuth.  
(d) Is the satellite visible?

### Solution

**(a) Observer and range vector**

Denver position ($R_{\oplus} = 6371$ km):

$$\mathbf{r}_{\text{obs}} = 6371 \begin{pmatrix}
\cos(39.7°) \cos(-105.0°) \\
\cos(39.7°) \sin(-105.0°) \\
\sin(39.7°)
\end{pmatrix}$$

$$= 6371 \begin{pmatrix}
0.766 \times (-0.259) \\
0.766 \times (-0.966) \\
0.640
\end{pmatrix} = \begin{pmatrix}
-1264 \\
-4718 \\
4077
\end{pmatrix} \text{ km}$$

**Range vector:**

$$\mathbf{\rho} = \mathbf{r}_{\text{sat}} - \mathbf{r}_{\text{obs}} = \begin{pmatrix}
-2000 - (-1264) \\
3000 - (-4718) \\
5500 - 4077
\end{pmatrix} = \begin{pmatrix}
-736 \\
7718 \\
1423
\end{pmatrix} \text{ km}$$

**(b) Local frame basis vectors**

**Up:**

$$\mathbf{\hat{u}} = \begin{pmatrix}
\cos(39.7°) \cos(-105.0°) \\
\cos(39.7°) \sin(-105.0°) \\
\sin(39.7°)
\end{pmatrix} = \begin{pmatrix}
-0.198 \\
-0.740 \\
0.640
\end{pmatrix}$$

**East:**

$$\mathbf{\hat{e}} = \begin{pmatrix}
-\sin(-105.0°) \\
\cos(-105.0°) \\
0
\end{pmatrix} = \begin{pmatrix}
0.966 \\
-0.259 \\
0
\end{pmatrix}$$

**North:**

$$\mathbf{\hat{n}} = \begin{pmatrix}
-\sin(39.7°) \cos(-105.0°) \\
-\sin(39.7°) \sin(-105.0°) \\
\cos(39.7°)
\end{pmatrix} = \begin{pmatrix}
0.166 \\
0.618 \\
0.766
\end{pmatrix}$$

**Project range onto local frame:**

$$\rho_e = \mathbf{\rho} \cdot \mathbf{\hat{e}} = (-736)(0.966) + (7718)(-0.259) + (1423)(0) = -711 - 2000 = -2711 \text{ km}$$

$$\rho_n = \mathbf{\rho} \cdot \mathbf{\hat{n}} = (-736)(0.166) + (7718)(0.618) + (1423)(0.766) = -122 + 4770 + 1090 = 5738 \text{ km}$$

$$\rho_u = \mathbf{\rho} \cdot \mathbf{\hat{u}} = (-736)(-0.198) + (7718)(-0.740) + (1423)(0.640) = 146 - 5711 + 911 = -4654 \text{ km}$$

**(c) Elevation and azimuth**

Slant range:

$$|\mathbf{\rho}| = \sqrt{(-2711)^2 + (5738)^2 + (-4654)^2} = \sqrt{7.35 \times 10^6 + 3.29 \times 10^7 + 2.17 \times 10^7} = \sqrt{6.36 \times 10^7} = 7975 \text{ km}$$

**Elevation angle:**

$$E = \arcsin\left(\frac{-4654}{7975}\right) = \arcsin(-0.584) = -35.7°$$

**Azimuth:**

$$Az = \arctan2(-2711, 5738) = \arctan2(-2711, 5738) \times \frac{180}{\pi} \approx -25.3°$$

Convert to compass bearing: $-25.3° + 360° = 334.7°$ (NNW)

**(d) Visibility**

**Elevation angle is −35.7°** → Satellite is **below the horizon** (not visible).

The negative elevation means the satellite is on the opposite side of Earth from Denver.

---

## 5. Computational Implementation

Below is an interactive satellite visibility calculator.

<div class="viz-container" id="visibility-viz">
  <div class="controls">
    <label>
      Observer Latitude:
      <input type="range" id="obs-lat-slider" min="-90" max="90" step="1" value="40">
      <span id="obs-lat-value">40</span>°N
    </label>
    <label>
      Observer Longitude:
      <input type="range" id="obs-lon-slider" min="-180" max="180" step="1" value="-105">
      <span id="obs-lon-value">-105</span>°E
    </label>
    <label>
      Satellite Altitude (km):
      <input type="range" id="sat-alt-slider" min="200" max="1000" step="50" value="400">
      <span id="sat-alt-value">400</span> km
    </label>
    <label>
      Time (hours since epoch):
      <input type="range" id="time-slider" min="0" max="24" step="0.1" value="0">
      <span id="time-value">0.0</span> hours
    </label>
    <div class="button-group">
      <button id="animate-toggle">Animate Time</button>
      <button id="find-next-pass">Find Next Pass</button>
    </div>
  </div>
  <div class="visibility-info">
    <h4>Current Satellite Position:</h4>
    <p><strong>Latitude:</strong> <span id="sat-lat-display"></span></p>
    <p><strong>Longitude:</strong> <span id="sat-lon-display"></span></p>
    <p><strong>Slant Range:</strong> <span id="slant-range-display"></span> km</p>
    <p><strong>Elevation Angle:</strong> <span id="elevation-display"></span>°</p>
    <p><strong>Azimuth:</strong> <span id="azimuth-display"></span>° (<span id="direction-display"></span>)</p>
    <p><strong>Visibility:</strong> <span id="visibility-status"></span></p>
  </div>
  <div id="visibility-chart" style="width: 100%; height: 400px;"></div>
</div>

<script type="module">
while (!window.echarts) await new Promise(r => setTimeout(r, 50));

(function() {
  const chart = window.echarts.init(document.getElementById('visibility-chart'));
  
  const R_earth = 6371; // km
  const mu = 398600; // km^3/s^2
  const omega_earth = 2 * Math.PI / 86164; // rad/s
  
  let obsLat = 40;
  let obsLon = -105;
  let satAlt = 400;
  let time = 0; // hours
  let animating = false;
  let animationInterval = null;
  
  // Fixed satellite orbit parameters (simplified polar orbit)
  const inclination = 51.6; // degrees (ISS-like)
  
  function deg2rad(deg) { return deg * Math.PI / 180; }
  function rad2deg(rad) { return rad * 180 / Math.PI; }
  
  function satellitePosition(t_hours, alt, inc) {
    const r = R_earth + alt;
    const T = 2 * Math.PI * Math.sqrt(r**3 / mu); // orbital period in seconds
    const t = t_hours * 3600; // convert to seconds
    
    const nu = (2 * Math.PI / T) * t; // true anomaly
    const inc_rad = deg2rad(inc);
    
    // Position in orbital plane
    const x_orb = r * Math.cos(nu);
    const y_orb = r * Math.sin(nu);
    
    // Rotate by inclination
    const x_eq = x_orb;
    const y_eq = y_orb * Math.cos(inc_rad);
    const z_eq = y_orb * Math.sin(inc_rad);
    
    // Account for Earth's rotation
    const theta = -omega_earth * t;
    const x = x_eq * Math.cos(theta) - y_eq * Math.sin(theta);
    const y = x_eq * Math.sin(theta) + y_eq * Math.cos(theta);
    const z = z_eq;
    
    return {x, y, z, r};
  }
  
  function observerPosition(lat, lon) {
    const lat_rad = deg2rad(lat);
    const lon_rad = deg2rad(lon);
    
    return {
      x: R_earth * Math.cos(lat_rad) * Math.cos(lon_rad),
      y: R_earth * Math.cos(lat_rad) * Math.sin(lon_rad),
      z: R_earth * Math.sin(lat_rad)
    };
  }
  
  function calculateVisibility(obs, sat) {
    // Range vector
    const rho_x = sat.x - obs.x;
    const rho_y = sat.y - obs.y;
    const rho_z = sat.z - obs.z;
    
    // Local frame basis vectors
    const lat_rad = deg2rad(obsLat);
    const lon_rad = deg2rad(obsLon);
    
    const u_x = Math.cos(lat_rad) * Math.cos(lon_rad);
    const u_y = Math.cos(lat_rad) * Math.sin(lon_rad);
    const u_z = Math.sin(lat_rad);
    
    const e_x = -Math.sin(lon_rad);
    const e_y = Math.cos(lon_rad);
    const e_z = 0;
    
    const n_x = -Math.sin(lat_rad) * Math.cos(lon_rad);
    const n_y = -Math.sin(lat_rad) * Math.sin(lon_rad);
    const n_z = Math.cos(lat_rad);
    
    // Project range onto local frame
    const rho_e = rho_x * e_x + rho_y * e_y + rho_z * e_z;
    const rho_n = rho_x * n_x + rho_y * n_y + rho_z * n_z;
    const rho_u = rho_x * u_x + rho_y * u_y + rho_z * u_z;
    
    const slantRange = Math.sqrt(rho_x**2 + rho_y**2 + rho_z**2);
    const elevation = rad2deg(Math.asin(rho_u / slantRange));
    let azimuth = rad2deg(Math.atan2(rho_e, rho_n));
    if (azimuth < 0) azimuth += 360;
    
    // Satellite lat/lon
    const sat_lat = rad2deg(Math.asin(sat.z / sat.r));
    const sat_lon = rad2deg(Math.atan2(sat.y, sat.x));
    
    return {
      slantRange,
      elevation,
      azimuth,
      sat_lat,
      sat_lon,
      visible: elevation > 0
    };
  }
  
  function getDirection(azimuth) {
    const dirs = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 
                  'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
    const idx = Math.round(azimuth / 22.5) % 16;
    return dirs[idx];
  }
  
  function updateDisplay() {
    const obs = observerPosition(obsLat, obsLon);
    const sat = satellitePosition(time, satAlt, inclination);
    const vis = calculateVisibility(obs, sat);
    
    document.getElementById('sat-lat-display').textContent = vis.sat_lat.toFixed(2) + '°';
    document.getElementById('sat-lon-display').textContent = vis.sat_lon.toFixed(2) + '°';
    document.getElementById('slant-range-display').textContent = vis.slantRange.toFixed(0);
    document.getElementById('elevation-display').textContent = vis.elevation.toFixed(1);
    document.getElementById('azimuth-display').textContent = vis.azimuth.toFixed(1);
    document.getElementById('direction-display').textContent = getDirection(vis.azimuth);
    document.getElementById('visibility-status').innerHTML = vis.visible ? 
      '<strong style="color: green;">VISIBLE</strong>' : 
      '<strong style="color: red;">NOT VISIBLE</strong>';
    
    updateChart(vis);
  }
  
  function updateChart(vis) {
    // Generate 24-hour visibility trace
    const elevationData = [];
    for (let t = 0; t <= 24; t += 0.1) {
      const obs = observerPosition(obsLat, obsLon);
      const sat = satellitePosition(t, satAlt, inclination);
      const v = calculateVisibility(obs, sat);
      elevationData.push([t, v.elevation]);
    }
    
    const option = {
      title: {
        text: 'Elevation Angle Over 24 Hours',
        left: 'center'
      },
      tooltip: {
        trigger: 'axis',
        formatter: params => {
          return `Time: ${params[0].value[0].toFixed(1)} hr<br/>Elevation: ${params[0].value[1].toFixed(1)}°`;
        }
      },
      grid: {
        left: 60,
        right: 40,
        top: 60,
        bottom: 60
      },
      xAxis: {
        type: 'value',
        name: 'Time (hours)',
        nameLocation: 'middle',
        nameGap: 30,
        min: 0,
        max: 24
      },
      yAxis: {
        type: 'value',
        name: 'Elevation Angle (°)',
        nameLocation: 'middle',
        nameGap: 40,
        min: -90,
        max: 90
      },
      series: [
        {
          type: 'line',
          data: elevationData,
          lineStyle: {
            color: '#4A90E2',
            width: 2
          },
          showSymbol: false,
          markLine: {
            silent: true,
            symbol: 'none',
            lineStyle: {
              color: '#999',
              type: 'dashed'
            },
            data: [
              {yAxis: 0, label: {formatter: 'Horizon'}},
              {yAxis: 10, label: {formatter: '10° (min useful)'}}
            ]
          },
          markPoint: {
            data: [{
              coord: [time, vis.elevation],
              symbol: 'circle',
              symbolSize: 10,
              itemStyle: {
                color: vis.visible ? 'green' : 'red'
              },
              label: {
                show: true,
                formatter: 'Now',
                position: 'top'
              }
            }]
          },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {offset: 0, color: 'rgba(74, 144, 226, 0.3)'},
              {offset: 1, color: 'rgba(74, 144, 226, 0)'}
            ])
          }
        }
      ]
    };
    
    chart.setOption(option);
  }
  
  document.getElementById('obs-lat-slider').addEventListener('input', (e) => {
    obsLat = parseFloat(e.target.value);
    document.getElementById('obs-lat-value').textContent = obsLat;
    updateDisplay();
  });
  
  document.getElementById('obs-lon-slider').addEventListener('input', (e) => {
    obsLon = parseFloat(e.target.value);
    document.getElementById('obs-lon-value').textContent = obsLon;
    updateDisplay();
  });
  
  document.getElementById('sat-alt-slider').addEventListener('input', (e) => {
    satAlt = parseFloat(e.target.value);
    document.getElementById('sat-alt-value').textContent = satAlt;
    updateDisplay();
  });
  
  document.getElementById('time-slider').addEventListener('input', (e) => {
    time = parseFloat(e.target.value);
    document.getElementById('time-value').textContent = time.toFixed(1);
    updateDisplay();
  });
  
  document.getElementById('animate-toggle').addEventListener('click', (e) => {
    if (animating) {
      clearInterval(animationInterval);
      e.target.textContent = 'Animate Time';
      animating = false;
    } else {
      animationInterval = setInterval(() => {
        time = (time + 0.05) % 24;
        document.getElementById('time-slider').value = time;
        document.getElementById('time-value').textContent = time.toFixed(1);
        updateDisplay();
      }, 100);
      e.target.textContent = 'Stop Animation';
      animating = true;
    }
  });
  
  document.getElementById('find-next-pass').addEventListener('click', () => {
    // Find next time elevation > 10°
    let t = time;
    for (let i = 0; i < 240; i++) { // Check next 24 hours in 6-min increments
      t = (t + 0.1) % 24;
      const obs = observerPosition(obsLat, obsLon);
      const sat = satellitePosition(t, satAlt, inclination);
      const vis = calculateVisibility(obs, sat);
      
      if (vis.elevation > 10) {
        time = t;
        document.getElementById('time-slider').value = time;
        document.getElementById('time-value').textContent = time.toFixed(1);
        updateDisplay();
        alert(`Next pass found at ${time.toFixed(1)} hours\nElevation: ${vis.elevation.toFixed(1)}°\nAzimuth: ${vis.azimuth.toFixed(1)}° (${getDirection(vis.azimuth)})`);
        return;
      }
    }
    alert('No pass with elevation > 10° found in next 24 hours');
  });
  
  updateDisplay();
  
  window.addEventListener('resize', () => chart.resize());
})();
</script>

**Try this:**
- **Animate Time:** Watch the satellite rise and set
- **Find Next Pass:** Jump to the next time the satellite is above 10° elevation
- Move the observer's location: Different latitudes see different passes
- Notice: Peaks in the elevation plot correspond to satellite overpasses
- The chart shows when the satellite is visible (elevation > 0°) and when it's usefully above the horizon (>10°)

**Key insight:** Visibility is periodic — the satellite passes overhead multiple times per day at predictable intervals determined by the orbital period and Earth's rotation.

---

## 6. Polar Overpass Diagram

Below is a polar plot showing satellite passes from the observer's perspective — a **local sky map** with zenith at center and horizon at the perimeter.

<div class="viz-container" id="polar-viz">
  <div class="controls">
    <label>
      Observer Latitude:
      <input type="range" id="polar-obs-lat" min="-90" max="90" step="5" value="40">
      <span id="polar-obs-lat-val">40</span>°N
    </label>
    <label>
      Satellite Altitude (km):
      <input type="range" id="polar-sat-alt" min="400" max="800" step="100" value="600">
      <span id="polar-sat-alt-val">600</span> km
    </label>
    <label>
      Sensor Swath Width (km):
      <input type="range" id="swath-slider" min="0" max="500" step="50" value="185">
      <span id="swath-value">185</span> km
    </label>
    <label>
      Time Window (hours):
      <input type="range" id="window-slider" min="6" max="48" step="6" value="24">
      <span id="window-value">24</span> hours
    </label>
    <div class="button-group">
      <button id="toggle-swath">Toggle Swath</button>
    </div>
  </div>
  <div id="polar-chart" style="width: 100%; height: 700px;"></div>
  <div class="info-panel">
    <p id="polar-info"></p>
    <p><strong>Reading the plot:</strong> Center = zenith (directly overhead), outer ring = horizon. Each colored arc is one satellite pass. Wider bands show sensor swath coverage.</p>
  </div>
</div>

<script type="module">
while (!window.echarts) await new Promise(r => setTimeout(r, 50));

(function() {
  const chart = window.echarts.init(document.getElementById('polar-chart'));
  
  const R_earth = 6371;
  const mu = 398600;
  const omega_earth = 2 * Math.PI / 86164;
  
  let obsLat = 40;
  let satAlt = 600;
  let swathWidth = 185;
  let timeWindow = 24;
  let showSwath = true;
  
  const inclination = 98; // SSO-like
  
  function deg2rad(deg) { return deg * Math.PI / 180; }
  function rad2deg(rad) { return rad * 180 / Math.PI; }
  
  function satellitePosition(t_hours, alt, inc) {
    const r = R_earth + alt;
    const T = 2 * Math.PI * Math.sqrt(r**3 / mu);
    const t = t_hours * 3600;
    
    const nu = (2 * Math.PI / T) * t;
    const inc_rad = deg2rad(inc);
    
    const x_orb = r * Math.cos(nu);
    const y_orb = r * Math.sin(nu);
    
    const x_eq = x_orb;
    const y_eq = y_orb * Math.cos(inc_rad);
    const z_eq = y_orb * Math.sin(inc_rad);
    
    const theta = -omega_earth * t;
    const x = x_eq * Math.cos(theta) - y_eq * Math.sin(theta);
    const y = x_eq * Math.sin(theta) + y_eq * Math.cos(theta);
    const z = z_eq;
    
    return {x, y, z, r};
  }
  
  function observerPosition(lat) {
    const lat_rad = deg2rad(lat);
    const lon_rad = 0; // Fixed at 0 for simplicity
    
    return {
      x: R_earth * Math.cos(lat_rad) * Math.cos(lon_rad),
      y: R_earth * Math.cos(lat_rad) * Math.sin(lon_rad),
      z: R_earth * Math.sin(lat_rad),
      lat_rad,
      lon_rad
    };
  }
  
  function calculateLookAngles(obs, sat) {
    const rho_x = sat.x - obs.x;
    const rho_y = sat.y - obs.y;
    const rho_z = sat.z - obs.z;
    
    const lat_rad = obs.lat_rad;
    const lon_rad = obs.lon_rad;
    
    const u_x = Math.cos(lat_rad) * Math.cos(lon_rad);
    const u_y = Math.cos(lat_rad) * Math.sin(lon_rad);
    const u_z = Math.sin(lat_rad);
    
    const e_x = -Math.sin(lon_rad);
    const e_y = Math.cos(lon_rad);
    const e_z = 0;
    
    const n_x = -Math.sin(lat_rad) * Math.cos(lon_rad);
    const n_y = -Math.sin(lat_rad) * Math.sin(lon_rad);
    const n_z = Math.cos(lat_rad);
    
    const rho_e = rho_x * e_x + rho_y * e_y + rho_z * e_z;
    const rho_n = rho_x * n_x + rho_y * n_y + rho_z * n_z;
    const rho_u = rho_x * u_x + rho_y * u_y + rho_z * u_z;
    
    const slantRange = Math.sqrt(rho_x**2 + rho_y**2 + rho_z**2);
    const elevation = rad2deg(Math.asin(rho_u / slantRange));
    let azimuth = rad2deg(Math.atan2(rho_e, rho_n));
    if (azimuth < 0) azimuth += 360;
    
    return {elevation, azimuth, slantRange};
  }
  
  function swathHalfAngle(swathKm, altitude) {
    // Ground swath to look angle (simplified)
    // For nadir-pointing sensor: swath width on ground relates to look angle
    const Re = R_earth;
    const h = altitude;
    // Approximation: half-swath angle from nadir
    const halfSwathGround = swathKm / 2;
    const angularHalfSwath = Math.atan(halfSwathGround / (Re + h));
    return rad2deg(angularHalfSwath);
  }
  
  function generatePasses(obsLat, satAlt, hours) {
    const passes = [];
    const obs = observerPosition(obsLat);
    const dt = 0.05; // 3 minutes
    
    let currentPass = null;
    let passId = 0;
    
    for (let t = 0; t <= hours; t += dt) {
      const sat = satellitePosition(t, satAlt, inclination);
      const look = calculateLookAngles(obs, sat);
      
      if (look.elevation > 0) {
        // Satellite is visible
        if (!currentPass) {
          // Start of new pass
          currentPass = {
            id: passId++,
            points: [],
            maxElev: look.elevation,
            maxElevTime: t
          };
        }
        
        currentPass.points.push({
          azimuth: look.azimuth,
          zenithAngle: 90 - look.elevation, // Convert to zenith angle for polar plot
          elevation: look.elevation,
          time: t
        });
        
        if (look.elevation > currentPass.maxElev) {
          currentPass.maxElev = look.elevation;
          currentPass.maxElevTime = t;
        }
        
      } else if (currentPass) {
        // End of pass
        if (currentPass.points.length > 1) {
          passes.push(currentPass);
        }
        currentPass = null;
      }
    }
    
    // Add last pass if still active
    if (currentPass && currentPass.points.length > 1) {
      passes.push(currentPass);
    }
    
    return passes;
  }
  
  function updateChart() {
    const passes = generatePasses(obsLat, satAlt, timeWindow);
    const swathAngle = swathHalfAngle(swathWidth, satAlt);
    
    document.getElementById('polar-info').innerHTML = 
      `<strong>Passes found:</strong> ${passes.length} | ` +
      `<strong>Swath half-angle:</strong> ${swathAngle.toFixed(2)}° from nadir`;
    
    const series = [];
    
    // Add each pass as a line
    passes.forEach((pass, idx) => {
      const color = `hsl(${(idx * 360 / passes.length)}, 70%, 50%)`;
      
      // Main pass line
      series.push({
        type: 'line',
        coordinateSystem: 'polar',
        data: pass.points.map(p => [p.azimuth, p.zenithAngle]),
        lineStyle: {
          color: color,
          width: 3
        },
        showSymbol: false,
        name: `Pass ${idx + 1}`,
        animation: false
      });
      
      // Swath coverage (if enabled)
      if (showSwath && swathWidth > 0) {
        // Upper swath edge
        series.push({
          type: 'line',
          coordinateSystem: 'polar',
          data: pass.points.map(p => [p.azimuth, Math.max(0, p.zenithAngle - swathAngle)]),
          lineStyle: {
            color: color,
            width: 1,
            type: 'dashed',
            opacity: 0.5
          },
          showSymbol: false,
          silent: true,
          animation: false
        });
        
        // Lower swath edge
        series.push({
          type: 'line',
          coordinateSystem: 'polar',
          data: pass.points.map(p => [p.azimuth, Math.min(90, p.zenithAngle + swathAngle)]),
          lineStyle: {
            color: color,
            width: 1,
            type: 'dashed',
            opacity: 0.5
          },
          showSymbol: false,
          silent: true,
          animation: false
        });
        
        // Fill swath area (simplified - just shade the band)
        const swathFill = [];
        pass.points.forEach(p => {
          swathFill.push([p.azimuth, p.zenithAngle - swathAngle]);
        });
        for (let i = pass.points.length - 1; i >= 0; i--) {
          swathFill.push([pass.points[i].azimuth, pass.points[i].zenithAngle + swathAngle]);
        }
        
        // Note: ECharts polar doesn't have great polygon support, using line approximation
      }
      
      // Mark maximum elevation point
      const maxPoint = pass.points.find(p => Math.abs(p.elevation - pass.maxElev) < 0.1);
      if (maxPoint) {
        series.push({
          type: 'scatter',
          coordinateSystem: 'polar',
          data: [[maxPoint.azimuth, maxPoint.zenithAngle]],
          symbolSize: 8,
          itemStyle: {
            color: color,
            borderColor: '#fff',
            borderWidth: 2
          },
          silent: true,
          animation: false
        });
      }
    });
    
    const option = {
      title: {
        text: `Satellite Passes: ${obsLat}°N, ${timeWindow}h window`,
        left: 'center'
      },
      tooltip: {
        trigger: 'item'
      },
      polar: {
        radius: '75%',
        center: ['50%', '52%']
      },
      angleAxis: {
        type: 'value',
        startAngle: 90,
        min: 0,
        max: 360,
        interval: 45,
        axisLabel: {
          formatter: function(value) {
            const dirs = {0: 'N', 45: 'NE', 90: 'E', 135: 'SE', 
                         180: 'S', 225: 'SW', 270: 'W', 315: 'NW'};
            return dirs[value] || '';
          }
        }
      },
      radiusAxis: {
        type: 'value',
        min: 0,
        max: 90,
        inverse: true, // Zenith at center
        axisLabel: {
          formatter: function(value) {
            return (90 - value) + '°'; // Show as elevation
          }
        },
        axisLine: {
          lineStyle: {
            color: '#999'
          }
        },
        splitLine: {
          lineStyle: {
            color: '#ddd'
          }
        }
      },
      series: series
    };
    
    chart.setOption(option);
  }
  
  document.getElementById('polar-obs-lat').addEventListener('input', (e) => {
    obsLat = parseFloat(e.target.value);
    document.getElementById('polar-obs-lat-val').textContent = obsLat;
    updateChart();
  });
  
  document.getElementById('polar-sat-alt').addEventListener('input', (e) => {
    satAlt = parseFloat(e.target.value);
    document.getElementById('polar-sat-alt-val').textContent = satAlt;
    updateChart();
  });
  
  document.getElementById('swath-slider').addEventListener('input', (e) => {
    swathWidth = parseFloat(e.target.value);
    document.getElementById('swath-value').textContent = swathWidth;
    updateChart();
  });
  
  document.getElementById('window-slider').addEventListener('input', (e) => {
    timeWindow = parseFloat(e.target.value);
    document.getElementById('window-value').textContent = timeWindow;
    updateChart();
  });
  
  document.getElementById('toggle-swath').addEventListener('click', () => {
    showSwath = !showSwath;
    updateChart();
  });
  
  updateChart();
  
  window.addEventListener('resize', () => chart.resize());
})();
</script>

**Try this:**
- **Change latitude:** Higher latitudes see more polar orbit passes (inclination 98°)
- **Adjust swath width:** Set to 185 km (Landsat), 290 km (Sentinel-2), or 500 km (MODIS)
- **Time window:** 24 hours shows daily coverage pattern; 48 hours reveals repeat geometry
- **Toggle swath:** Turn off swath display to see just the satellite ground tracks
- Notice how passes at different azimuths provide multi-directional coverage

**Key insight:** The polar plot reveals the **viewing geometry** from the observer's perspective. Multiple passes from different directions provide stereoscopic potential and reduce shadow/illumination bias in imagery.

---

## 7. Interpretation

### Reading the Polar Plot

The polar overpass diagram is a **local sky map** from the observer's viewpoint:
- **Center:** Zenith (directly overhead, 90° elevation)
- **Outer ring:** Horizon (0° elevation)
- **Radial distance:** Zenith angle (90° - elevation)
- **Angular position:** Azimuth (compass bearing)

**Each colored arc** represents one satellite pass. The arc shows the satellite's path across the sky as seen from the ground station.

**Swath coverage:** The dashed lines flanking each pass show the sensor's **ground coverage footprint**. Points on the ground within this swath are imaged during the pass.

**Applications:**
- **Mission planning:** Which passes provide coverage of a target area?
- **Stereo imaging:** Passes from different azimuths enable 3D reconstruction
- **Illumination analysis:** Morning passes (eastern azimuths) vs. evening passes (western azimuths) have different sun angles
- **Antenna scheduling:** Determine optimal times for data downlink based on elevation angle

### Swath Width and Coverage

The **sensor swath** is the width of the strip of Earth's surface imaged in a single pass.

**Wide swath** (e.g., MODIS 2330 km):
- Fewer passes needed for global coverage
- Lower spatial resolution (250 m–1 km)
- Daily global coverage possible

**Narrow swath** (e.g., Landsat 185 km):
- Many passes needed for global coverage
- Higher spatial resolution (15–30 m)
- 16-day revisit cycle for exact repeat

**Swath geometry depends on:**
1. **Sensor field of view** (FOV): Angular width of detector array
2. **Pointing capability:** Can the sensor look sideways (off-nadir)?
3. **Altitude:** Higher satellites see wider swaths but with coarser resolution

**Look angle from swath width:**

For a nadir-pointing sensor at altitude $h$ with ground swath width $W$:

$$\text{Half-swath angle} \approx \arctan\left(\frac{W/2}{R_{\oplus} + h}\right)$$

This is the angular extent from the satellite's perspective.

### Coverage Gaps and Overlaps

From the polar plot, you can identify:
- **Gaps:** Regions of sky with no passes (equatorial zones for polar orbits from high latitudes)
- **Overlap:** Multiple passes covering the same area from different angles
- **Coverage uniformity:** Are passes evenly distributed in azimuth?

**Example:** At 40°N with a sun-synchronous orbit (98° inclination):
- Passes cluster in north-south directions
- East-west coverage comes from orbital precession over days
- No truly equatorial passes (inclination limits)

### Maximum Elevation Angle

The **highest point** in the sky the satellite reaches depends on:
1. **How close the ground track passes to the observer**
2. **Satellite altitude** (higher satellites appear lower in the sky from the same ground track distance)

**Zenith pass** ($E = 90°$): Satellite directly overhead — ground track passes through observer's location.

**Low pass** ($E < 30°$): Satellite is near the horizon — ground track is far from observer.

### Visibility Duration

**For LEO satellites:**
- Typical pass duration: 5–10 minutes
- Maximum elevation depends on orbital geometry
- Number of visible passes per day: varies with inclination

**For geostationary satellites:**
- Continuously visible from the same location (if above horizon)
- Elevation angle is constant
- Only visible from latitudes within ~±81° of equator

### Antenna Tracking

Ground stations with directional antennas must **track** the satellite:
- Azimuth changes as satellite moves across the sky
- Elevation changes from rise to set
- Tracking systems use predicted ephemerides (orbital predictions) to point the antenna

**Two-line element sets (TLEs):** Standard format for distributing orbital parameters. Used to generate predictions.

---

## 7. What Could Go Wrong?

### Forgetting to Check Both Conditions

A satellite can be:
- Above the horizon from your location but **behind Earth** (blocked by the planet)
- Close in slant range but **below the horizon** (on the other side of Earth)

**Always check:** elevation angle > 0° AND not blocked by Earth's sphere.

### Assuming Visibility = Ground Track Proximity

The satellite's **ground track** is where it's directly overhead. But you can see satellites whose ground track is hundreds of kilometers away — they just appear lower in the sky.

**Horizon distance** for 400 km altitude satellite: ~2300 km surface distance.

### Neglecting Atmospheric Refraction

Near the horizon, Earth's atmosphere **bends** light rays, making satellites appear slightly higher than their geometric position.

**Refraction correction:** ~0.5° at horizon, negligible above 10° elevation.

### Mixing Up Azimuth Conventions

**Mathematical convention:** Angle from positive x-axis, counterclockwise.  
**Compass convention:** Angle from north, clockwise.

Always use `atan2(east, north)` for compass azimuth, not `atan2(north, east)`.

---

## 8. Extension: Access Time and Revisit Frequency

**Access time:** Total time per day a satellite is visible above a minimum elevation (e.g., 10°).

**For a polar orbit at 800 km:**
- Each pass: ~10 minutes above 10° elevation
- Passes per day: ~14
- Total access time: ~140 minutes/day (if all passes are visible)

**Revisit frequency:** How often a satellite can image the same ground location.

**Factors:**
- Orbital period
- Swath width (sensor coverage width)
- Off-nadir pointing capability (can the satellite look sideways?)

**Example:** Landsat 8 has a 16-day **exact repeat cycle** (same ground track every 16 days) but can image any location every ~8 days due to overlapping swaths.

---

## 9. Math Refresher: Dot Product for Projections

### Projecting a Vector onto a Direction

Given vector $\mathbf{v}$ and unit vector $\mathbf{\hat{u}}$, the **component** of $\mathbf{v}$ in the direction of $\mathbf{\hat{u}}$ is:

$$v_{\parallel} = \mathbf{v} \cdot \mathbf{\hat{u}}$$

**Geometric meaning:** The length of $\mathbf{v}$'s shadow when projected onto $\mathbf{\hat{u}}$.

**Example:** Range vector $\mathbf{\rho}$ projected onto "up" direction gives the vertical component (used to compute elevation angle).

### Orthonormal Basis

Three unit vectors $\mathbf{\hat{e}}$, $\mathbf{\hat{n}}$, $\mathbf{\hat{u}}$ form an **orthonormal basis** if:
1. Each has length 1: $|\mathbf{\hat{e}}| = |\mathbf{\hat{n}}| = |\mathbf{\hat{u}}| = 1$
2. All are perpendicular: $\mathbf{\hat{e}} \cdot \mathbf{\hat{n}} = 0$, etc.

**Any vector** can be expressed as:

$$\mathbf{v} = (v \cdot \mathbf{\hat{e}})\mathbf{\hat{e}} + (v \cdot \mathbf{\hat{n}})\mathbf{\hat{n}} + (v \cdot \mathbf{\hat{u}})\mathbf{\hat{u}}$$

This is what we do when converting the range vector to topocentric (East-North-Up) coordinates.

---

## Summary

- **Visibility** requires satellite above local horizon: elevation angle $E > 0°$
- **Elevation angle:** $E = \arcsin(\rho_u / |\mathbf{\rho}|)$ where $\rho_u$ is vertical component
- **Azimuth:** $Az = \arctan2(\rho_e, \rho_n)$ compass bearing (0° = N, 90° = E)
- **Local horizon frame:** East-North-Up basis vectors at observer's location
- **Maximum slant range** for LEO satellites: ~2000–2500 km
- Pass duration: typically 5–10 minutes for LEO
- Multiple passes per day, predictable from orbital parameters
- Geostationary satellites appear fixed in the sky

**Phase II Complete:** Essays 13–15 provide the foundation for orbital mechanics and satellite tracking. Future extensions could cover:
- Sensor swath geometry and coverage calculations
- Off-nadir pointing and agile satellites
- Constellation design for continuous coverage
- Doppler shift and radio tracking
- Two-line element set interpretation

---
