---
layout: essay
title: "Earth as a Rotating Sphere"
subtitle: "Spherical coordinates, angular velocity, and the geometry of our rotating planet"
date: 2026-02-26
categories: [modeling]
series: computational-geography-foundations
series_order: 12
cluster: E
cluster_title: "Observing the Earth"
tags:
  - computational-geography
  - modeling
  - spherical-coordinates
  - rotation
  - geodesy
  - coordinate-transforms
math: true
viz: true
difficulty: 3
math_core: [spherical-coordinates, angular-velocity, coordinate-transforms, trigonometry]
spatial_reasoning: 4
dynamics: 1
computation: 3
domain: [physical-geography, geodesy, remote-sensing, orbital-mechanics]
excerpt: >
  The Earth is a sphere rotating on an axis. Every point on the surface traces
  a circle once per day. To model Earth observation from space, we need to work
  in spherical coordinates and transform between latitude/longitude and Cartesian
  xyz. This essay builds that foundation.
math_prerequisites: >
  Trigonometry (sin, cos, tan) from Essay 6. The concept of angular measurement
  (degrees and radians). We'll introduce spherical coordinates geometrically and
  show how to convert to Cartesian coordinates.
---

## 1. The Question

How do we describe positions on a rotating sphere?

A satellite orbits Earth, passing over different latitudes and longitudes. A ground station needs to know: when will the satellite be overhead? What angle should the antenna point?

To answer these questions, we need:
1. A **coordinate system** for locations on Earth's surface
2. A way to **transform** between spherical and Cartesian coordinates
3. An understanding of Earth's **rotation** — how positions change with time

The mathematical question: How do we model the Earth as a geometric object and work with its coordinates?

---

## 2. The Conceptual Model

### Earth as a Sphere

**Simplification:** Treat Earth as a perfect sphere with radius $R = 6371$ km.

**Reality:** Earth is an **oblate spheroid** — slightly flattened at the poles (equatorial radius 6378 km, polar radius 6357 km). The difference is small (~0.3%) for many applications.

**Geographic coordinates:**
- **Latitude** (φ or lat): Angle north or south of the equator (−90° to +90°)
- **Longitude** (λ or lon): Angle east or west of the prime meridian (−180° to +180° or 0° to 360°)

**Convention:**
- North latitude is positive, south is negative
- East longitude is positive (0° to 180°), west is negative (0° to −180°)
- The prime meridian (0° longitude) passes through Greenwich, England

### Spherical Coordinates

In spherical coordinates, a point is defined by:
- **Radial distance** $r$ from the origin (Earth's center)
- **Polar angle** $\theta$ (co-latitude, measured from the north pole: 0° to 180°)
- **Azimuthal angle** $\phi$ (longitude, measured from the prime meridian)

**Relationship to latitude:**

$$\theta = 90° - \text{latitude}$$

For a point on Earth's surface, $r = R$ (constant).

---

## 3. Building the Mathematical Model

### Converting Spherical to Cartesian Coordinates

Given latitude $\text{lat}$, longitude $\text{lon}$, and radius $R$:

**Cartesian coordinates** $(x, y, z)$:

$$x = R \cos(\text{lat}) \cos(\text{lon})$$

$$y = R \cos(\text{lat}) \sin(\text{lon})$$

$$z = R \sin(\text{lat})$$

**Coordinate system:**
- **x-axis:** Points from Earth's center through (lat=0°, lon=0°) — equator at prime meridian
- **y-axis:** Points from Earth's center through (lat=0°, lon=90°E) — equator at 90°E
- **z-axis:** Points from Earth's center through the North Pole (lat=90°)

**Units:** Use **radians** for trig functions:

$$\text{lat}_{\text{rad}} = \text{lat}_{\text{deg}} \times \frac{\pi}{180}$$

### Converting Cartesian to Spherical Coordinates

Given $(x, y, z)$:

$$r = \sqrt{x^2 + y^2 + z^2}$$

$$\text{lat} = \arcsin\left(\frac{z}{r}\right) \times \frac{180}{\pi}$$

$$\text{lon} = \arctan2(y, x) \times \frac{180}{\pi}$$

**Note:** Use `atan2(y, x)` (two-argument arctangent) to get the correct quadrant for longitude.

---

## 4. Earth's Rotation

### Angular Velocity

Earth rotates once every **sidereal day** = 23 hours, 56 minutes, 4 seconds ≈ 86164 seconds.

**Angular velocity:**

$$\omega = \frac{2\pi}{T} = \frac{2\pi}{86164} \approx 7.292 \times 10^{-5} \text{ rad/s}$$

**In degrees per second:**

$$\omega_{\text{deg}} = \frac{360°}{86164} \approx 0.00417°/\text{s} \approx 15.04°/\text{hour}$$

### Linear Velocity at the Equator

A point on the equator traces a circle of radius $R = 6371$ km.

**Circumference:**

$$C = 2\pi R = 2\pi \times 6371 \approx 40030 \text{ km}$$

**Linear velocity:**

$$v_{\text{eq}} = \frac{C}{T} = \frac{40030 \text{ km}}{86164 \text{ s}} \approx 0.465 \text{ km/s} = 465 \text{ m/s}$$

### Linear Velocity at Latitude φ

At latitude φ, the radius of the circular path is:

$$r_{\phi} = R \cos(\phi)$$

**Linear velocity:**

$$v(\phi) = \omega R \cos(\phi)$$

**Examples:**
- Equator (φ = 0°): $v = 465$ m/s
- 45° latitude: $v = 465 \times \cos(45°) = 329$ m/s
- North Pole (φ = 90°): $v = 0$ (just spins in place)

---

## 5. Worked Example by Hand

**Problem:** A point on Earth's surface is at latitude 30°N, longitude 120°E. Earth's radius is 6371 km.

(a) Convert to Cartesian coordinates (x, y, z).  
(b) What is the linear velocity of this point due to Earth's rotation?  
(c) After 6 hours, what is the new longitude? What are the new Cartesian coordinates?

### Solution

**(a) Cartesian coordinates**

Convert to radians:

$$\text{lat} = 30° \times \frac{\pi}{180} = 0.5236 \text{ rad}$$

$$\text{lon} = 120° \times \frac{\pi}{180} = 2.0944 \text{ rad}$$

Compute:

$$x = 6371 \times \cos(0.5236) \times \cos(2.0944)$$

$$= 6371 \times 0.866 \times (-0.5) = -2759 \text{ km}$$

$$y = 6371 \times \cos(0.5236) \times \sin(2.0944)$$

$$= 6371 \times 0.866 \times 0.866 = 4777 \text{ km}$$

$$z = 6371 \times \sin(0.5236) = 6371 \times 0.5 = 3186 \text{ km}$$

**Cartesian coordinates: (−2759, 4777, 3186) km**

**(b) Linear velocity**

$$v = \omega R \cos(\text{lat}) = 7.292 \times 10^{-5} \times 6371 \times \cos(30°)$$

$$= 7.292 \times 10^{-5} \times 6371 \times 0.866 \approx 0.402 \text{ km/s} = 402 \text{ m/s}$$

**(c) New longitude after 6 hours**

Earth rotates:

$$\Delta \text{lon} = 15.04° \times 6 = 90.24°$$

New longitude:

$$\text{lon}_{\text{new}} = 120° + 90.24° = 210.24°$$

(Or equivalently: −149.76°)

**New Cartesian coordinates:**

$$\text{lon}_{\text{rad}} = 210.24° \times \frac{\pi}{180} = 3.669 \text{ rad}$$

$$x = 6371 \times 0.866 \times \cos(3.669) = 6371 \times 0.866 \times (-0.866) = -4777 \text{ km}$$

$$y = 6371 \times 0.866 \times \sin(3.669) = 6371 \times 0.866 \times (-0.5) = -2759 \text{ km}$$

$$z = 3186 \text{ km}$$ (unchanged — latitude doesn't change due to rotation)

**New coordinates: (−4777, −2759, 3186) km**

---

## 6. Computational Implementation

Below is an interactive 3D visualization of Earth with controllable rotation.

<div class="viz-container" id="earth-viz">
  <div class="controls">
    <label>
      Latitude:
      <input type="range" id="lat-slider" min="-90" max="90" step="5" value="40">
      <span id="lat-value">40</span>°
    </label>
    <label>
      Longitude:
      <input type="range" id="lon-slider" min="-180" max="180" step="5" value="0">
      <span id="lon-value">0</span>°
    </label>
    <label>
      Rotation speed:
      <input type="range" id="rot-slider" min="0" max="5" step="0.5" value="1">
      <span id="rot-value">1.0</span>× real time
    </label>
    <div class="button-group">
      <button id="toggle-rotation">Pause Rotation</button>
      <button id="reset-view">Reset View</button>
    </div>
  </div>
  <div id="earth-3d-chart" style="width: 100%; height: 600px;"></div>
  <div class="info-panel">
    <p id="earth-coords"></p>
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
  const chart = echarts.init(document.getElementById('earth-3d-chart'));
  
  let lat = 40;
  let lon = 0;
  let rotSpeed = 1;
  let rotating = true;
  let currentRotation = 0;
  
  const R = 6371; // km
  
  function deg2rad(deg) { return deg * Math.PI / 180; }
  function rad2deg(rad) { return rad * 180 / Math.PI; }
  
  function latLonToCartesian(lat, lon, r) {
    const latRad = deg2rad(lat);
    const lonRad = deg2rad(lon);
    
    return {
      x: r * Math.cos(latRad) * Math.cos(lonRad),
      y: r * Math.cos(latRad) * Math.sin(lonRad),
      z: r * Math.sin(latRad)
    };
  }
  
  function generateSphere(res) {
    const data = [];
    
    for (let i = 0; i <= res; i++) {
      for (let j = 0; j <= res * 2; j++) {
        const lat = -90 + (i / res) * 180;
        const lon = -180 + (j / (res * 2)) * 360;
        const pos = latLonToCartesian(lat, lon, R);
        
        // Color based on latitude (simple blue gradient)
        const colorValue = (lat + 90) / 180;
        
        data.push({
          value: [pos.x, pos.y, pos.z],
          itemStyle: {
            color: `rgb(${100 * colorValue}, ${150 * colorValue}, ${200 + 55 * colorValue})`
          }
        });
      }
    }
    
    return data;
  }
  
  function generateGraticule() {
    const lines = [];
    
    // Meridians (lines of longitude)
    for (let lon = -180; lon <= 180; lon += 30) {
      const lineData = [];
      for (let lat = -90; lat <= 90; lat += 5) {
        const pos = latLonToCartesian(lat, lon + currentRotation, R * 1.01);
        lineData.push([pos.x, pos.y, pos.z]);
      }
      lines.push(lineData);
    }
    
    // Parallels (lines of latitude)
    for (let lat = -60; lat <= 60; lat += 30) {
      const lineData = [];
      for (let lon = -180; lon <= 180; lon += 5) {
        const pos = latLonToCartesian(lat, lon + currentRotation, R * 1.01);
        lineData.push([pos.x, pos.y, pos.z]);
      }
      lines.push(lineData);
    }
    
    return lines;
  }
  
  function updateChart() {
    const markerPos = latLonToCartesian(lat, lon + currentRotation, R * 1.05);
    const graticule = generateGraticule();
    
    const coords = latLonToCartesian(lat, lon + currentRotation, R);
    document.getElementById('earth-coords').innerHTML = 
      `<strong>Current position:</strong> (${lat}°, ${((lon + currentRotation) % 360).toFixed(1)}°) | ` +
      `<strong>Cartesian:</strong> (${coords.x.toFixed(0)}, ${coords.y.toFixed(0)}, ${coords.z.toFixed(0)}) km`;
    
    const option = {
      title: {
        text: 'Earth as a Rotating Sphere',
        left: 'center'
      },
      tooltip: {},
      xAxis3D: { type: 'value', min: -R * 1.5, max: R * 1.5, name: 'X (km)' },
      yAxis3D: { type: 'value', min: -R * 1.5, max: R * 1.5, name: 'Y (km)' },
      zAxis3D: { type: 'value', min: -R * 1.5, max: R * 1.5, name: 'Z (km)' },
      grid3D: {
        viewControl: {
          autoRotate: false,
          distance: 200
        },
        light: {
          main: {
            intensity: 1.2,
            shadow: true
          },
          ambient: {
            intensity: 0.5
          }
        }
      },
      series: [
        {
          type: 'scatter3D',
          data: generateSphere(20),
          symbolSize: 8,
          itemStyle: {
            opacity: 0.8
          }
        },
        {
          type: 'scatter3D',
          data: [[markerPos.x, markerPos.y, markerPos.z]],
          symbolSize: 20,
          itemStyle: {
            color: '#F0177A'
          },
          label: {
            show: true,
            formatter: `(${lat}°, ${lon}°)`,
            position: 'top',
            distance: 10,
            textStyle: {
              fontSize: 14,
              color: '#F0177A'
            }
          }
        },
        ...graticule.map(line => ({
          type: 'line3D',
          data: line,
          lineStyle: {
            color: '#888',
            width: 1,
            opacity: 0.3
          }
        }))
      ]
    };
    
    chart.setOption(option);
  }
  
  function rotateEarth() {
    if (rotating && rotSpeed > 0) {
      currentRotation += rotSpeed * 0.5;
      if (currentRotation >= 360) currentRotation -= 360;
      updateChart();
    }
  }
  
  setInterval(rotateEarth, 100);
  
  document.getElementById('lat-slider').addEventListener('input', (e) => {
    lat = parseFloat(e.target.value);
    document.getElementById('lat-value').textContent = lat;
    updateChart();
  });
  
  document.getElementById('lon-slider').addEventListener('input', (e) => {
    lon = parseFloat(e.target.value);
    document.getElementById('lon-value').textContent = lon;
    updateChart();
  });
  
  document.getElementById('rot-slider').addEventListener('input', (e) => {
    rotSpeed = parseFloat(e.target.value);
    document.getElementById('rot-value').textContent = rotSpeed.toFixed(1);
  });
  
  document.getElementById('toggle-rotation').addEventListener('click', (e) => {
    rotating = !rotating;
    e.target.textContent = rotating ? 'Pause Rotation' : 'Resume Rotation';
  });
  
  document.getElementById('reset-view').addEventListener('click', () => {
    currentRotation = 0;
    updateChart();
  });
  
  updateChart();
  
  window.addEventListener('resize', () => chart.resize());
})();
</script>

**Try this:**
- Watch the pink marker move as Earth rotates
- Change latitude: See how the z-coordinate changes
- Change longitude: Initial position in the x-y plane
- Set rotation speed to 0: Freeze the Earth
- The graticule (grid lines) shows meridians and parallels

**Key insight:** As Earth rotates, longitude changes but latitude remains constant. The Cartesian coordinates rotate around the z-axis.

---

## 7. Interpretation

### Great Circles and Geodesics

The **shortest path** between two points on a sphere is along a **great circle** — a circle whose center coincides with Earth's center.

**Examples:**
- All meridians (lines of longitude) are great circles
- The equator is a great circle
- Parallels (lines of latitude) are NOT great circles (except the equator)

**Flight paths:** Aircraft follow great circle routes to minimize distance.

**Calculation:** The great circle distance between two points $(lat_1, lon_1)$ and $(lat_2, lon_2)$:

$$d = R \cdot \arccos\left(\sin(lat_1) \sin(lat_2) + \cos(lat_1) \cos(lat_2) \cos(\Delta lon)\right)$$

Where $\Delta lon = |lon_2 - lon_1|$.

### Time Zones

Earth rotates 360° in 24 hours → 15° per hour.

**Time zones** are (roughly) 15° wide. When you cross 15° of longitude, local solar time changes by 1 hour.

**Coordinated Universal Time (UTC):** Reference time at the prime meridian (0° longitude).

**Local time:**

$$\text{Local time} = \text{UTC} + \frac{\text{longitude}}{15°}$$

(East is +, west is −, adjusted for daylight saving and political boundaries)

### Centrifugal and Coriolis Effects

Earth's rotation creates **fictitious forces** in the rotating reference frame:

**Centrifugal force:** Pulls objects away from the rotation axis
- Strongest at the equator
- Contributes to Earth's equatorial bulge

**Coriolis force:** Deflects moving objects
- Rightward in the Northern Hemisphere, leftward in the Southern Hemisphere
- Causes large-scale wind patterns (trade winds, westerlies)
- Essential for understanding cyclones, ocean currents, and projectile trajectories

---

## 8. What Could Go Wrong?

### Mixing Up Latitude Conventions

**Geographic latitude** (used here): Angle from the equator (−90° to +90°).

**Co-latitude** (polar angle θ in physics): Angle from the North Pole (0° to 180°).

$$\theta = 90° - \text{lat}$$

Always check which convention your formulas use.

### Degrees vs. Radians

Trig functions in most programming languages expect **radians**, not degrees.

**Always convert:**

$$\text{radians} = \text{degrees} \times \frac{\pi}{180}$$

### Assuming a Perfect Sphere

Earth is an **oblate spheroid**. For precision geodesy (GPS, surveying), use the **WGS84 ellipsoid**:
- Equatorial radius: 6378.137 km
- Polar radius: 6356.752 km
- Flattening: $f = 1/298.257$

For satellite orbits and large-scale modeling, the difference matters.

### Longitude Wraparound

Longitude wraps at ±180°. When computing differences:

$$\Delta lon = lon_2 - lon_1$$

If $|\Delta lon| > 180°$, subtract 360° to get the short way around.

---

## 9. Extension: Satellite Ground Tracks

A satellite in orbit traces a **ground track** — the path of the point directly below it on Earth's surface.

**For a satellite at altitude $h$ above the equator:**
- Orbital period: $T_{\text{orbit}}$
- Earth rotation period: $T_{\text{Earth}} = 86164$ s

**Ground track shift per orbit:**

$$\Delta lon = 360° \times \frac{T_{\text{orbit}}}{T_{\text{Earth}}}$$

**Example:** Low Earth orbit satellite with $T_{\text{orbit}} = 90$ minutes:

$$\Delta lon = 360° \times \frac{5400}{86164} \approx 22.5°$$

After one orbit, the ground track is 22.5° west of the starting point (Earth rotated eastward underneath).

**Phase II essays** will derive orbital mechanics and predict when satellites pass overhead.

---

## 10. Math Refresher: Spherical Coordinates

### Definition

In 3D, a point can be described by:
- **Cartesian** $(x, y, z)$: Rectangular coordinates
- **Spherical** $(r, \theta, \phi)$: Radial distance, polar angle, azimuthal angle

**Conversion spherical → Cartesian:**

$$x = r \sin\theta \cos\phi$$

$$y = r \sin\theta \sin\phi$$

$$z = r \cos\theta$$

(This is the **physics convention** with θ from the z-axis.)

**Conversion Cartesian → spherical:**

$$r = \sqrt{x^2 + y^2 + z^2}$$

$$\theta = \arccos\left(\frac{z}{r}\right)$$

$$\phi = \arctan2(y, x)$$

### Geographic vs. Physics Convention

**Geography:** Uses latitude (from equator) and longitude.

**Physics:** Uses co-latitude (from pole) and azimuth.

Both describe the same geometry — just different angle conventions.

---

## Summary

- Earth is modeled as a sphere with radius $R = 6371$ km
- **Latitude** φ and **longitude** λ define positions on the surface
- **Spherical to Cartesian:** $x = R \cos(lat) \cos(lon)$, etc.
- Earth rotates at $\omega = 7.292 \times 10^{-5}$ rad/s
- **Linear velocity** at the equator: 465 m/s, decreases with latitude as $v = \omega R \cos(lat)$
- **Great circles** are the shortest paths on a sphere
- Coordinate transforms are essential for satellite tracking and Earth observation

**Phase II Preview:** The next phase will introduce **orbital mechanics** — how satellites move, how to predict their positions, and how to calculate when they pass overhead. We'll derive Kepler's laws, compute ground tracks, and model satellite swaths.

---

**End of Phase I**

You've completed the first 12 essays of the Computational Geography Laboratory. You've learned:
- How to build mathematical models of change (linear, exponential, logistic)
- How light and energy attenuate through space
- How to represent and analyze terrain using DEMs and gradients
- How water flows and networks emerge from local rules
- How human interactions follow gravity models and diffusion processes
- How to work with spherical coordinates on a rotating planet

These are the **mathematical foundations of spatial thinking**. In Phase II, we'll extend these ideas into orbital mechanics, remote sensing geometry, and Earth observation systems.

---
