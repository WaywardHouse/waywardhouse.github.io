---
layout: essay
title: "Ground Tracks and Orbital Geometry"
subtitle: "Mapping satellite paths on Earth's surface as the planet rotates beneath"
date: 2026-02-26
categories: [modeling]
series: computational-geography-lab
series_order: 14
cluster: F
cluster_title: "Orbital Mechanics"
tags:
  - computational-geography
  - modeling
  - orbital-mechanics
  - ground-tracks
  - satellites
  - coordinate-systems
math: true
viz: true
difficulty: 4
math_core: [coordinate-transforms, orbital-geometry, ground-track-calculation]
spatial_reasoning: 4
dynamics: 2
computation: 3
domain: [orbital-mechanics, remote-sensing, satellite-tracking]
excerpt: >
  A satellite orbits in a fixed plane while Earth rotates beneath it. The ground
  track—the satellite's path plotted on Earth's surface—shifts westward with each
  orbit. This essay shows how to calculate ground tracks by combining orbital motion
  with Earth's rotation, enabling prediction of when satellites pass overhead.
math_prerequisites: >
  Circular orbits (Essay 13). Spherical coordinates (Essay 12). Coordinate
  transformations. We'll combine orbital mechanics with Earth's rotation geometry.
---

## 1. The Question

Where on Earth is a satellite at any given time?

A satellite orbits in a fixed plane through space. But Earth rotates beneath it, so the **ground track** — the point directly below the satellite — traces a path across the surface.

**Key observations:**
- The satellite's orbital plane is fixed (relative to the stars)
- Earth rotates eastward at 15.04°/hour
- Each successive orbit crosses the equator farther **west** than the previous one

The mathematical question: Given a satellite's orbital parameters and the current time, where is the sub-satellite point on Earth's surface?

---

## 2. The Conceptual Model

### Orbital Plane vs. Rotating Earth

**In an inertial (non-rotating) frame:**
- The satellite orbits in a fixed plane
- The orbital plane is defined by its **inclination** $i$ (angle relative to the equator)

**In Earth's rotating frame:**
- The satellite appears to trace a sinusoidal path across the surface
- The maximum latitude reached is ±$i$ (the inclination)
- The ground track shifts westward by $\Delta\lambda$ degrees per orbit

### Westward Shift Per Orbit

During one orbital period $T$, Earth rotates through angle:

$$\Delta\lambda = 360° \times \frac{T}{T_{\text{Earth}}}$$

Where $T_{\text{Earth}} = 86164$ s (sidereal day).

**Example:** For a 90-minute orbit ($T = 5400$ s):

$$\Delta\lambda = 360° \times \frac{5400}{86164} = 22.5°$$

Each orbit's ground track is **22.5° west** of the previous one.

---

## 3. Building the Mathematical Model

### Step 1: Satellite Position in Orbital Frame

Assume a circular orbit with:
- **Orbital radius** $r$
- **Inclination** $i$ (angle between orbital plane and equator)
- **True anomaly** $\nu$ (satellite's angular position in its orbit, measured from ascending node)

**Position in orbital plane** (2D coordinates):

$$x_{\text{orb}} = r\cos\nu$$
$$y_{\text{orb}} = r\sin\nu$$

**Ascending node:** The point where the satellite crosses the equator going northward.

### Step 2: Rotate to Equatorial Frame

The orbital plane is tilted at inclination $i$. Rotate the position vector:

**In 3D (equatorial frame):**

$$x_{\text{eq}} = x_{\text{orb}} = r\cos\nu$$

$$y_{\text{eq}} = y_{\text{orb}}\cos i = r\sin\nu\cos i$$

$$z_{\text{eq}} = y_{\text{orb}}\sin i = r\sin\nu\sin i$$

This assumes the ascending node is at longitude 0° at time $t=0$.

### Step 3: Account for Earth's Rotation

The ascending node's longitude at time $t$:

$$\lambda_{\text{node}}(t) = \lambda_0 - \omega_{\oplus} t$$

Where:
- $\lambda_0$ is the ascending node longitude at $t=0$
- $\omega_{\oplus} = 360°/86164 \approx 0.004178°/\text{s}$ is Earth's rotation rate

**Rotate the satellite position by** $-\lambda_{\text{node}}(t)$ to get Earth-fixed coordinates.

### Step 4: Convert to Latitude/Longitude

From Cartesian $(x, y, z)$ in the Earth-fixed frame:

$$\text{latitude} = \arcsin\left(\frac{z}{r}\right)$$

$$\text{longitude} = \arctan2(y, x)$$

Where $r = \sqrt{x^2 + y^2 + z^2}$ (should equal orbital radius).

---

## 4. Worked Example by Hand

**Problem:** A satellite has:
- Altitude: 600 km → $r = 6971$ km
- Inclination: $i = 45°$
- At $t=0$, satellite is at ascending node ($\nu = 0°$, longitude = 0°)

Calculate the ground track position after 15 minutes ($t = 900$ s).

### Solution

**Step 1: Satellite's position in orbit**

First, find how far the satellite has moved in its orbit.

Orbital period (from Essay 13):

$$T = 2\pi\sqrt{\frac{r^3}{\mu}} = 2\pi\sqrt{\frac{(6971)^3}{398600}} \approx 5820 \text{ s}$$

Angular velocity in orbit:

$$\omega_{\text{orb}} = \frac{2\pi}{T} = \frac{2\pi}{5820} = 0.001079 \text{ rad/s}$$

True anomaly after 900 s:

$$\nu = \omega_{\text{orb}} \times 900 = 0.001079 \times 900 = 0.9713 \text{ rad} = 55.6°$$

**Satellite position in orbital plane:**

$$x_{\text{orb}} = 6971 \cos(55.6°) = 6971 \times 0.564 = 3931 \text{ km}$$

$$y_{\text{orb}} = 6971 \sin(55.6°) = 6971 \times 0.826 = 5758 \text{ km}$$

**Step 2: Convert to equatorial frame**

$$x_{\text{eq}} = 3931 \text{ km}$$

$$y_{\text{eq}} = 5758 \times \cos(45°) = 5758 \times 0.707 = 4071 \text{ km}$$

$$z_{\text{eq}} = 5758 \times \sin(45°) = 5758 \times 0.707 = 4071 \text{ km}$$

**Step 3: Account for Earth's rotation**

Earth has rotated through:

$$\Delta\lambda_{\text{Earth}} = 0.004178°/\text{s} \times 900\text{ s} = 3.76°$$

The ascending node (initially at 0°) is now at:

$$\lambda_{\text{node}} = 0° - 3.76° = -3.76°$$

**Rotate the satellite's position by** $-\lambda_{\text{node}} = 3.76°$ eastward.

This is a rotation around the z-axis:

$$x' = x\cos(3.76°) - y\sin(3.76°) = 3931 \times 0.9978 - 4071 \times 0.0656 = 3657 \text{ km}$$

$$y' = x\sin(3.76°) + y\cos(3.76°) = 3931 \times 0.0656 + 4071 \times 0.9978 = 4320 \text{ km}$$

$$z' = z = 4071 \text{ km}$$

**Step 4: Convert to lat/lon**

$$\text{latitude} = \arcsin\left(\frac{4071}{6971}\right) = \arcsin(0.584) = 35.7°\text{N}$$

$$\text{longitude} = \arctan2(4320, 3657) = 49.8°\text{E}$$

**Ground track position after 15 minutes: (35.7°N, 49.8°E)**

---

## 5. Computational Implementation

Below is an interactive ground track simulator.

<div class="viz-container" id="groundtrack-viz">
  <div class="controls">
    <label>
      Altitude (km):
      <input type="range" id="alt-gt-slider" min="200" max="1500" step="50" value="600">
      <span id="alt-gt-value">600</span> km
    </label>
    <label>
      Inclination (degrees):
      <input type="range" id="inc-slider" min="0" max="98" step="1" value="51">
      <span id="inc-value">51</span>°
    </label>
    <label>
      Number of orbits to show:
      <input type="range" id="orbits-slider" min="1" max="16" step="1" value="4">
      <span id="orbits-value">4</span>
    </label>
    <div class="button-group">
      <button id="preset-iss">ISS (400 km, 51.6°)</button>
      <button id="preset-polar">Polar (800 km, 90°)</button>
      <button id="preset-sso">SSO (800 km, 98°)</button>
    </div>
  </div>
  <div id="groundtrack-chart" style="width: 100%; height: 600px;"></div>
  <div class="info-panel">
    <p id="gt-info"></p>
  </div>
</div>

<script type="module">
while (!window.echarts) await new Promise(r => setTimeout(r, 50));

(function() {
  const chart = window.echarts.init(document.getElementById('groundtrack-chart'));
  
  const R_earth = 6371; // km
  const mu = 398600; // km^3/s^2
  const omega_earth = 360 / 86164; // deg/s
  
  let altitude = 600;
  let inclination = 51;
  let numOrbits = 4;
  
  function deg2rad(deg) { return deg * Math.PI / 180; }
  function rad2deg(rad) { return rad * 180 / Math.PI; }
  
  function calculateGroundTrack(h, inc, nOrbits) {
    const r = R_earth + h;
    const T = 2 * Math.PI * Math.sqrt(r**3 / mu); // seconds
    
    const tracks = [];
    const inc_rad = deg2rad(inc);
    const dt = T / 100; // 100 points per orbit
    
    for (let orbit = 0; orbit < nOrbits; orbit++) {
      const track = [];
      
      for (let step = 0; step <= 100; step++) {
        const t = orbit * T + step * dt;
        const nu = (2 * Math.PI / T) * t; // true anomaly
        
        // Position in orbital plane
        const x_orb = r * Math.cos(nu);
        const y_orb = r * Math.sin(nu);
        
        // Convert to equatorial frame (inclination rotation)
        const x_eq = x_orb;
        const y_eq = y_orb * Math.cos(inc_rad);
        const z_eq = y_orb * Math.sin(inc_rad);
        
        // Account for Earth's rotation (ascending node regresses)
        const lambda_node = -omega_earth * t; // degrees
        const lambda_rad = deg2rad(lambda_node);
        
        // Rotate around z-axis
        const x_rot = x_eq * Math.cos(lambda_rad) - y_eq * Math.sin(lambda_rad);
        const y_rot = x_eq * Math.sin(lambda_rad) + y_eq * Math.cos(lambda_rad);
        const z_rot = z_eq;
        
        // Convert to lat/lon
        const lat = rad2deg(Math.asin(z_rot / r));
        const lon = rad2deg(Math.atan2(y_rot, x_rot));
        
        track.push([lon, lat]);
      }
      
      tracks.push(track);
    }
    
    return {tracks, period: T};
  }
  
  function updateChart() {
    const result = calculateGroundTrack(altitude, inclination, numOrbits);
    const westwardShift = 360 * (result.period / 86164);
    
    document.getElementById('gt-info').innerHTML = 
      `<strong>Period:</strong> ${(result.period/60).toFixed(1)} min | ` +
      `<strong>Westward shift:</strong> ${westwardShift.toFixed(1)}° per orbit | ` +
      `<strong>Max latitude:</strong> ±${inclination}°`;
    
    const series = result.tracks.map((track, i) => ({
      type: 'line',
      data: track,
      lineStyle: {
        color: `hsl(${320 + i * 20}, 100%, ${60 - i * 5}%)`,
        width: 2
      },
      showSymbol: false,
      silent: true
    }));

    // Reference lines: equator and ±inclination latitude bounds
    const markLines = {
      silent: true,
      symbol: 'none',
      lineStyle: { type: 'dashed', color: '#aaa', width: 1 },
      data: [
        { yAxis: 0, name: 'Equator' },
        { yAxis:  inclination, name: `+${inclination}° (coverage limit)` },
        { yAxis: -inclination, name: `-${inclination}°` }
      ]
    };
    if (series.length > 0) series[0].markLine = markLines;

    const option = {
      title: {
        text: `Ground Track: ${altitude} km, ${inclination}° inclination`,
        left: 'center'
      },
      grid: { top: 50, bottom: 60, left: 65, right: 20 },
      xAxis: {
        type: 'value',
        name: 'Longitude (°)',
        nameLocation: 'middle',
        nameGap: 28,
        min: -180,
        max: 180,
        interval: 60,
        axisLabel: { formatter: (v) => `${v}°` }
      },
      yAxis: {
        type: 'value',
        name: 'Latitude (°)',
        nameLocation: 'middle',
        nameGap: 45,
        min: -90,
        max: 90,
        interval: 30,
        axisLabel: { formatter: (v) => `${v}°` }
      },
      series: series
    };
    
    chart.setOption(option);
  }
  
  document.getElementById('alt-gt-slider').addEventListener('input', (e) => {
    altitude = parseFloat(e.target.value);
    document.getElementById('alt-gt-value').textContent = altitude;
    updateChart();
  });
  
  document.getElementById('inc-slider').addEventListener('input', (e) => {
    inclination = parseFloat(e.target.value);
    document.getElementById('inc-value').textContent = inclination;
    updateChart();
  });
  
  document.getElementById('orbits-slider').addEventListener('input', (e) => {
    numOrbits = parseInt(e.target.value);
    document.getElementById('orbits-value').textContent = numOrbits;
    updateChart();
  });
  
  document.getElementById('preset-iss').addEventListener('click', () => {
    altitude = 400;
    inclination = 51.6;
    numOrbits = 4;
    document.getElementById('alt-gt-slider').value = 400;
    document.getElementById('alt-gt-value').textContent = 400;
    document.getElementById('inc-slider').value = 51.6;
    document.getElementById('inc-value').textContent = 51.6;
    document.getElementById('orbits-slider').value = 4;
    document.getElementById('orbits-value').textContent = 4;
    updateChart();
  });
  
  document.getElementById('preset-polar').addEventListener('click', () => {
    altitude = 800;
    inclination = 90;
    numOrbits = 8;
    document.getElementById('alt-gt-slider').value = 800;
    document.getElementById('alt-gt-value').textContent = 800;
    document.getElementById('inc-slider').value = 90;
    document.getElementById('inc-value').textContent = 90;
    document.getElementById('orbits-slider').value = 8;
    document.getElementById('orbits-value').textContent = 8;
    updateChart();
  });
  
  document.getElementById('preset-sso').addEventListener('click', () => {
    altitude = 800;
    inclination = 98;
    numOrbits = 8;
    document.getElementById('alt-gt-slider').value = 800;
    document.getElementById('alt-gt-value').textContent = 800;
    document.getElementById('inc-slider').value = 98;
    document.getElementById('inc-value').textContent = 98;
    document.getElementById('orbits-slider').value = 8;
    document.getElementById('orbits-value').textContent = 8;
    updateChart();
  });
  
  updateChart();
  
  window.addEventListener('resize', () => chart.resize());
})();
</script>

**Try this:**
- **ISS preset:** 51.6° inclination means it reaches ±51.6° latitude (no polar coverage)
- **Polar preset:** 90° inclination gives global coverage, passes over both poles
- **SSO preset:** 98° inclination (retrograde) — ground track repeats after ~14 orbits
- Increase number of orbits: See the westward shift accumulate
- Notice: Lower inclinations create tighter sinusoidal patterns

**Key insight:** The westward shift per orbit combined with the sinusoidal path creates the characteristic ground track pattern.

---

## 6. Interpretation

### Inclination Determines Coverage

**Equatorial orbit** ($i = 0°$): Only observes equatorial latitudes

**Mid-latitude orbit** ($i = 51.6°$, like ISS): Coverage from 51.6°S to 51.6°N  
- Most of Earth's population lives in this band
- Optimizes for human observation and rendezvous

**Polar orbit** ($i = 90°$): Global coverage including poles  
- Essential for Earth observation missions
- Weather satellites, reconnaissance

**Sun-synchronous** ($i \approx 98°$, retrograde): Crosses equator at the same local time  
- Consistent lighting for optical imagery
- Orbital plane precesses at ~1°/day to match Earth's orbit around Sun

### Repeat Ground Tracks

Some satellites are placed in **repeat ground track** orbits where the ground track pattern repeats exactly after $N$ orbits.

**Condition:**

$$\frac{N \times T}{T_{\text{Earth}}} = \text{integer}$$

**Example:** Landsat 8 at 705 km altitude has $T = 98.9$ minutes. After 233 orbits (16 days), the ground track repeats exactly.

**Why useful:** Allows direct comparison of images from the same orbital geometry.

---

## 7. What Could Go Wrong?

### Forgetting the Sign of Earth's Rotation

Earth rotates **eastward** (west to east). The ground track shifts **westward** (in the opposite direction).

If you add instead of subtract the Earth rotation angle, the ground track will spiral eastward instead of westward.

### Mixing Up Inclination and Latitude

**Inclination** is the angle between the orbital plane and the equator (0°–180°).

**Maximum latitude** reached is ±inclination (for $i \leq 90°$).

**Retrograde orbits** have $i > 90°$. For example, $i = 98°$ is 82° retrograde and reaches ±82° latitude.

### Assuming Ground Track Longitude is Satellite's Longitude

The **sub-satellite point** (ground track) is directly below the satellite. But the satellite itself is at altitude $h$, not on the surface.

**Line-of-sight** calculations (can the satellite see a ground station?) require 3D geometry, not just lat/lon matching.

### Neglecting Orbital Perturbations

Real satellites experience:
- **Atmospheric drag** (LEO): Orbit decays, period shortens
- **J2 perturbation** (Earth's oblateness): Ascending node precesses, argument of perigee changes
- **Solar/lunar gravity**: Small perturbations

For long-term predictions (days/weeks), these matter.

---

## 8. Extension: Ascending Node Longitude

The **longitude of the ascending node** ($\Omega$, capital omega) specifies where the satellite crosses the equator going northward.

**How it changes:**

For polar orbits, $\Omega$ remains nearly constant (in inertial space).

For inclined orbits, **J2 perturbation** causes $\Omega$ to precess:

$$\frac{d\Omega}{dt} = -\frac{3}{2} \frac{J_2 R_{\oplus}^2 n}{(a(1-e^2))^2} \cos i$$

Where:
- $J_2 = 1.0826 \times 10^{-3}$ (Earth's oblateness coefficient)
- $n$ is mean motion (radians per second)
- $a$ is semi-major axis
- $e$ is eccentricity (= 0 for circular)
- $i$ is inclination

For **sun-synchronous orbits**, this precession is set to match Earth's orbital motion around the Sun (~0.9856°/day).

---

## 9. Math Refresher: Rotation Matrices

### Rotation Around the Z-Axis

To rotate a point $(x, y, z)$ by angle $\theta$ around the z-axis:

$$\begin{pmatrix} x' \\ y' \\ z' \end{pmatrix} = \begin{pmatrix}
\cos\theta & -\sin\theta & 0 \\
\sin\theta & \cos\theta & 0 \\
0 & 0 & 1
\end{pmatrix} \begin{pmatrix} x \\ y \\ z \end{pmatrix}$$

**Result:**

$$x' = x\cos\theta - y\sin\theta$$
$$y' = x\sin\theta + y\cos\theta$$
$$z' = z$$

### Rotation Around the X-Axis (Inclination)

To rotate by inclination $i$ around the x-axis:

$$\begin{pmatrix} x' \\ y' \\ z' \end{pmatrix} = \begin{pmatrix}
1 & 0 & 0 \\
0 & \cos i & -\sin i \\
0 & \sin i & \cos i
\end{pmatrix} \begin{pmatrix} x \\ y \\ z \end{pmatrix}$$

**Ground track calculations combine multiple rotations:**
1. Position in orbital plane
2. Rotate by inclination (tilt the plane)
3. Rotate by longitude of ascending node (orient in space)
4. Rotate by Earth's rotation (convert to Earth-fixed frame)

---

## Summary

- **Ground track:** Path traced by the sub-satellite point on Earth's surface
- **Westward shift:** Each orbit crosses the equator ~$360° \times T/86164$ west of the previous
- **Inclination** determines maximum latitude reached (±$i$)
- **Polar orbits** ($i = 90°$) provide global coverage
- **Sun-synchronous orbits** ($i \approx 98°$) maintain constant local solar time
- Ground track calculation combines orbital geometry with Earth's rotation
- Repeat ground tracks require specific altitude/period relationships

**Next:** In Essay 15, we calculate **satellite overpasses** — when and where a satellite is visible from a specific ground location. This requires 3D line-of-sight geometry.

---
