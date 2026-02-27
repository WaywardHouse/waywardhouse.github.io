---
layout: essay
title: "Circular Orbits and Kepler's Third Law"
subtitle: "Deriving orbital mechanics from Newton's laws — why satellites stay up"
date: 2026-02-26
categories: [modeling]
series: computational-geography-lab
series_order: 13
cluster: F
cluster_title: "Orbital Mechanics"
tags:
  - computational-geography
  - modeling
  - orbital-mechanics
  - physics
  - satellites
  - keplers-laws
math: true
viz: true
difficulty: 4
math_core: [circular-motion, gravitation, keplers-third-law, orbital-velocity]
spatial_reasoning: 3
dynamics: 3
computation: 2
domain: [orbital-mechanics, remote-sensing, space-physics]
excerpt: >
  A satellite in orbit is in perpetual free fall, moving forward fast enough that
  it falls around the Earth rather than into it. This essay derives the relationship
  between orbital altitude, period, and velocity from Newton's laws. We'll prove
  Kepler's Third Law and calculate the magic altitude where satellites hover.
math_prerequisites: >
  Circular motion conceptually. Newton's laws (F=ma, gravity). Algebra and equation
  solving. We'll introduce centripetal acceleration from first principles.
---

## 1. The Question

Why doesn't a satellite fall down?

The International Space Station orbits at 400 km altitude, traveling at 7.7 km/s (27,600 km/h). It's moving so fast horizontally that as gravity pulls it downward, it falls around the curve of the Earth rather than into it.

**The balance:** Gravity pulls inward. The satellite's velocity carries it forward. The combination creates a circular path.

The mathematical question: What velocity is required for a circular orbit at a given altitude? How long does one orbit take?

---

## 2. The Conceptual Model

### Free Fall, Continuous

Imagine firing a cannonball horizontally from a mountaintop:
- Too slow: it arcs down and hits the ground nearby
- Faster: it travels farther before landing
- **Orbital velocity:** Fast enough that the ground curves away beneath it at the same rate it falls

**Key insight:** Orbit is not "escaping gravity." It's falling continuously but moving sideways fast enough to miss the Earth.

### Circular Motion Requires Centripetal Force

An object moving in a circle at constant speed is **accelerating** — its velocity vector constantly changes direction.

**Centripetal acceleration:**

$$a_c = \frac{v^2}{r}$$

Where:
- $v$ is the orbital velocity (m/s)
- $r$ is the orbital radius (distance from Earth's center, not altitude)

This acceleration points **toward the center** of the circle (inward, toward Earth).

**Newton's Second Law:**

$$F = ma_c = m\frac{v^2}{r}$$

For a circular orbit, gravity provides exactly this centripetal force.

---

## 3. Building the Mathematical Model

### Newton's Law of Gravitation

The gravitational force between two masses is:

$$F_g = G\frac{M m}{r^2}$$

Where:
- $G = 6.674 \times 10^{-11}$ N·m²/kg² (gravitational constant)
- $M = 5.972 \times 10^{24}$ kg (Earth's mass)
- $m$ is the satellite's mass (kg)
- $r$ is the distance between centers (m)

For an orbit at altitude $h$ above Earth's surface:

$$r = R_{\oplus} + h$$

Where $R_{\oplus} = 6.371 \times 10^6$ m (Earth's radius).

### Setting Gravity Equal to Centripetal Force

For a circular orbit:

$$F_g = F_c$$

$$G\frac{Mm}{r^2} = m\frac{v^2}{r}$$

**Satellite mass cancels:**

$$G\frac{M}{r^2} = \frac{v^2}{r}$$

Multiply both sides by $r$:

$$G\frac{M}{r} = v^2$$

**Orbital velocity:**

$$v = \sqrt{\frac{GM}{r}}$$

**Key result:** Orbital velocity depends only on Earth's mass and the orbital radius — **not** on the satellite's mass.

### Orbital Period

The satellite travels a circular path of circumference $2\pi r$ at velocity $v$.

**Period** (time for one orbit):

$$T = \frac{2\pi r}{v}$$

Substitute $v = \sqrt{GM/r}$:

$$T = \frac{2\pi r}{\sqrt{GM/r}} = 2\pi r \sqrt{\frac{1}{GM/r}} = 2\pi r \sqrt{\frac{r}{GM}}$$

$$T = 2\pi \sqrt{\frac{r^3}{GM}}$$

**This is Kepler's Third Law** (for circular orbits):

$$T^2 = \frac{4\pi^2}{GM} r^3$$

**In words:** The square of the orbital period is proportional to the cube of the orbital radius.

### Standard Gravitational Parameter

Define:

$$\mu = GM = 3.986 \times 10^{14} \text{ m}^3/\text{s}^2$$

Then:

$$v = \sqrt{\frac{\mu}{r}}, \quad T = 2\pi\sqrt{\frac{r^3}{\mu}}$$

---

## 4. Worked Example by Hand

**Problem:** A satellite orbits at altitude $h = 500$ km above Earth's surface.

(a) What is the orbital radius $r$?  
(b) What is the orbital velocity $v$?  
(c) What is the orbital period $T$?  
(d) How many times does it orbit per day?

### Solution

**(a) Orbital radius**

$$r = R_{\oplus} + h = 6.371 \times 10^6 + 0.5 \times 10^6 = 6.871 \times 10^6 \text{ m}$$

**(b) Orbital velocity**

$$v = \sqrt{\frac{\mu}{r}} = \sqrt{\frac{3.986 \times 10^{14}}{6.871 \times 10^6}}$$

$$= \sqrt{5.800 \times 10^7} = 7615 \text{ m/s} \approx 7.6 \text{ km/s}$$

**(c) Orbital period**

$$T = 2\pi\sqrt{\frac{r^3}{\mu}} = 2\pi\sqrt{\frac{(6.871 \times 10^6)^3}{3.986 \times 10^{14}}}$$

$$= 2\pi\sqrt{\frac{3.244 \times 10^{20}}{3.986 \times 10^{14}}} = 2\pi\sqrt{8.139 \times 10^5}$$

$$= 2\pi \times 902.2 = 5668 \text{ s} \approx 94.5 \text{ minutes}$$

**(d) Orbits per day**

$$N = \frac{86400 \text{ s/day}}{5668 \text{ s/orbit}} \approx 15.2 \text{ orbits/day}$$

The satellite completes about **15 orbits per day**.

---

## 5. Special Orbits

### Low Earth Orbit (LEO)

**Altitude:** 200–2000 km  
**Period:** 90–130 minutes  
**Examples:** ISS (400 km), Hubble (540 km), most Earth observation satellites

**Applications:** High-resolution imaging, atmospheric science, human spaceflight

### Geostationary Orbit (GEO)

**Goal:** Match Earth's rotation period (24 hours) so the satellite appears stationary above a fixed point on the equator.

**Required period:** $T = 86400$ s (one sidereal day ≈ 86164 s for precision)

Solve for $r$:

$$T = 2\pi\sqrt{\frac{r^3}{\mu}}$$

$$r^3 = \frac{\mu T^2}{4\pi^2}$$

$$r = \left(\frac{\mu T^2}{4\pi^2}\right)^{1/3}$$

Substitute $T = 86164$ s:

$$r = \left(\frac{3.986 \times 10^{14} \times (86164)^2}{4\pi^2}\right)^{1/3}$$

$$r = (7.496 \times 10^{22})^{1/3} = 4.214 \times 10^7 \text{ m}$$

**Altitude:**

$$h = r - R_{\oplus} = 42140 - 6371 = 35769 \text{ km}$$

**Geostationary altitude: 35,786 km** (often rounded to 36,000 km)

**Orbital velocity:**

$$v = \sqrt{\frac{\mu}{r}} = \sqrt{\frac{3.986 \times 10^{14}}{4.214 \times 10^7}} = 3075 \text{ m/s} \approx 3.1 \text{ km/s}$$

**Applications:** Communication satellites, weather satellites (GOES, Meteosat), broadcast TV

### Sun-Synchronous Orbit (SSO)

**Goal:** The orbital plane precesses at the same rate Earth orbits the Sun (~1°/day), so the satellite crosses the equator at the same local solar time each day.

**Typical altitude:** 600–800 km  
**Inclination:** 98°–99° (near-polar, retrograde)

**Why it matters:** Consistent lighting for optical imagery (always 10:30 AM local time, for example).

**Examples:** Landsat, Sentinel-2, most polar-orbiting weather satellites

---

## 6. Computational Implementation

Below is an interactive orbit calculator.

<div class="viz-container" id="orbit-viz">
  <div class="controls">
    <label>
      Altitude (km):
      <input type="range" id="altitude-slider" min="200" max="40000" step="100" value="500">
      <span id="altitude-value">500</span> km
    </label>
    <div class="button-group">
      <button id="set-leo">ISS (400 km)</button>
      <button id="set-geo">GEO (35,786 km)</button>
      <button id="set-sso">SSO (800 km)</button>
    </div>
  </div>
  <div class="orbit-params">
    <p><strong>Orbital radius:</strong> <span id="radius-display"></span> km</p>
    <p><strong>Orbital velocity:</strong> <span id="velocity-display"></span> km/s</p>
    <p><strong>Orbital period:</strong> <span id="period-display"></span></p>
    <p><strong>Orbits per day:</strong> <span id="orbits-day-display"></span></p>
  </div>
  <div id="orbit-chart" style="width: 100%; height: 500px;"></div>
</div>

<script type="module">
while (!window.echarts) await new Promise(r => setTimeout(r, 50));

(function() {
  const chart = window.echarts.init(document.getElementById('orbit-chart'));
  
  const R_earth = 6371; // km
  const mu = 398600; // km^3/s^2
  
  let altitude = 500; // km
  
  function calculateOrbit(h) {
    const r = R_earth + h;
    const v = Math.sqrt(mu / r);
    const T = 2 * Math.PI * Math.sqrt(r**3 / mu);
    const orbitsPerDay = 86400 / T;
    
    return {r, v, T, orbitsPerDay};
  }
  
  function formatTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    } else {
      return `${minutes}m ${secs}s`;
    }
  }
  
  function updateDisplay() {
    const orbit = calculateOrbit(altitude);
    
    document.getElementById('radius-display').textContent = orbit.r.toFixed(0);
    document.getElementById('velocity-display').textContent = orbit.v.toFixed(2);
    document.getElementById('period-display').textContent = formatTime(orbit.T);
    document.getElementById('orbits-day-display').textContent = orbit.orbitsPerDay.toFixed(2);
    
    updateChart();
  }
  
  function updateChart() {
    const orbit = calculateOrbit(altitude);
    
    // Generate orbit path
    const orbitPath = [];
    for (let theta = 0; theta <= 2 * Math.PI; theta += 0.05) {
      orbitPath.push([
        orbit.r * Math.cos(theta),
        orbit.r * Math.sin(theta)
      ]);
    }
    
    // Earth circle
    const earthPath = [];
    for (let theta = 0; theta <= 2 * Math.PI; theta += 0.05) {
      earthPath.push([
        R_earth * Math.cos(theta),
        R_earth * Math.sin(theta)
      ]);
    }
    
    // GEO reference orbit
    const geoR = 42164;
    const geoPath = [];
    for (let theta = 0; theta <= 2 * Math.PI; theta += 0.1) {
      geoPath.push([
        geoR * Math.cos(theta),
        geoR * Math.sin(theta)
      ]);
    }
    
    const maxR = Math.max(orbit.r, geoR) * 1.2;
    
    const option = {
      title: {
        text: `Circular Orbit at ${altitude} km altitude`,
        left: 'center'
      },
      tooltip: {
        trigger: 'item'
      },
      xAxis: {
        type: 'value',
        min: -maxR,
        max: maxR,
        axisLabel: { formatter: '{value} km' }
      },
      yAxis: {
        type: 'value',
        min: -maxR,
        max: maxR,
        axisLabel: { formatter: '{value} km' }
      },
      series: [
        {
          name: 'Earth',
          type: 'line',
          data: earthPath,
          lineStyle: { color: '#4A90E2', width: 3 },
          showSymbol: false,
          animation: false
        },
        {
          name: 'Current Orbit',
          type: 'line',
          data: orbitPath,
          lineStyle: { color: '#F0177A', width: 2 },
          showSymbol: false,
          animation: false
        },
        {
          name: 'GEO Reference',
          type: 'line',
          data: geoPath,
          lineStyle: { color: '#888', width: 1, type: 'dashed' },
          showSymbol: false,
          animation: false
        },
        {
          name: 'Satellite',
          type: 'scatter',
          data: [[orbit.r, 0]],
          symbolSize: 12,
          itemStyle: { color: '#F0177A' },
          label: {
            show: true,
            formatter: `${altitude} km`,
            position: 'right'
          }
        }
      ]
    };
    
    chart.setOption(option);
  }
  
  document.getElementById('altitude-slider').addEventListener('input', (e) => {
    altitude = parseFloat(e.target.value);
    document.getElementById('altitude-value').textContent = altitude;
    updateDisplay();
  });
  
  document.getElementById('set-leo').addEventListener('click', () => {
    altitude = 400;
    document.getElementById('altitude-slider').value = 400;
    document.getElementById('altitude-value').textContent = 400;
    updateDisplay();
  });
  
  document.getElementById('set-geo').addEventListener('click', () => {
    altitude = 35786;
    document.getElementById('altitude-slider').value = 35786;
    document.getElementById('altitude-value').textContent = 35786;
    updateDisplay();
  });
  
  document.getElementById('set-sso').addEventListener('click', () => {
    altitude = 800;
    document.getElementById('altitude-slider').value = 800;
    document.getElementById('altitude-value').textContent = 800;
    updateDisplay();
  });
  
  updateDisplay();
  
  window.addEventListener('resize', () => chart.resize());
})();
</script>

**Try this:**
- Slide to LEO altitudes (200–800 km): High velocity, short periods, many orbits/day
- Click "GEO": The magic altitude where period = 24 hours
- Notice: Velocity **decreases** with altitude (gravity weakens faster than radius increases)
- The dashed gray circle shows GEO for reference

**Key insight:** Lower orbits are faster but have shorter periods. Higher orbits are slower but take longer to complete.

---

## 7. Interpretation

### Why Satellites Don't Need Fuel to Stay Up

Once in orbit, a satellite **coasts**. Gravity provides exactly the centripetal force needed for circular motion.

**No fuel required** to maintain altitude (in the absence of drag).

**Fuel is needed for:**
- Reaching orbit initially (launch)
- Correcting for atmospheric drag (LEO only)
- Changing orbits (maneuvers)
- De-orbiting at end of life

### Atmospheric Drag in LEO

Below ~800 km, Earth's atmosphere still has measurable density.

**Drag force:**

$$F_d \propto \rho v^2 A$$

Where $\rho$ is atmospheric density, $v$ is velocity, $A$ is cross-sectional area.

**Effect:** Satellite slowly spirals inward, eventually re-entering and burning up.

**ISS altitude maintenance:** Requires periodic "reboost" maneuvers (small thruster burns to raise orbit). Without these, it would de-orbit in ~2 years.

### The Kessler Syndrome

**Problem:** Debris from dead satellites and collisions creates more collisions in a cascading effect.

**LEO is already crowded:**
- ~5000 active satellites
- ~30,000 tracked debris objects >10 cm
- ~1 million objects 1–10 cm (too small to track, large enough to damage)

**Mitigation:** Satellites are designed to de-orbit within 25 years after end of mission (drag in LEO, controlled burns for higher orbits).

---

## 8. What Could Go Wrong?

### Confusing Radius and Altitude

**Orbital radius** $r$ is measured from **Earth's center**.  
**Altitude** $h$ is measured from **Earth's surface**.

$$r = R_{\oplus} + h$$

**Don't plug altitude into the orbital velocity formula!**

### Forgetting That Satellite Mass Cancels

In the derivation, $m$ appears on both sides and cancels. **Orbital parameters don't depend on satellite mass** (for circular orbits around a much more massive body).

A 1 kg CubeSat and a 400,000 kg ISS at the same altitude have the same orbital velocity and period.

### Assuming Circular Orbits Are Always Possible

Real orbits are **ellipses** (Kepler's First Law). Circular orbits are a special case where eccentricity $e = 0$.

**Transfer orbits** (e.g., Hohmann transfer) are elliptical and use the difference in velocity at periapsis and apoapsis to change altitude.

### Neglecting Earth's Oblateness

Earth's equatorial bulge causes **orbital precession** — the orbital plane slowly rotates.

This effect is **intentionally used** for sun-synchronous orbits (the precession matches Earth's orbit around the Sun).

For precision calculations, use the **J2 perturbation** term.

---

## 9. Extension: Escape Velocity

**Question:** How fast must you go to escape Earth's gravity entirely?

At escape velocity, the satellite has enough kinetic energy to reach infinity with zero residual velocity.

**Energy balance:**

$$\frac{1}{2}mv_e^2 - \frac{GMm}{r} = 0$$

(Kinetic energy equals the magnitude of gravitational potential energy)

$$v_e = \sqrt{\frac{2GM}{r}} = \sqrt{2} \cdot v_{\text{orbital}}$$

**At Earth's surface:**

$$v_e = \sqrt{\frac{2 \times 3.986 \times 10^{14}}{6.371 \times 10^6}} = 11,180 \text{ m/s} \approx 11.2 \text{ km/s}$$

**Escape velocity is** $\sqrt{2} \approx 1.41$ **times the orbital velocity at the same altitude.**

---

## 10. Math Refresher: Circular Motion

### Centripetal Acceleration

An object moving at constant speed $v$ in a circle of radius $r$ has acceleration toward the center:

$$a_c = \frac{v^2}{r} = \omega^2 r$$

Where $\omega = v/r$ is the angular velocity (rad/s).

**Why?** The velocity vector is constantly changing direction. The rate of change of velocity is acceleration.

### Period and Frequency

**Period** $T$: Time for one complete revolution (seconds)

**Frequency** $f$: Revolutions per unit time (Hz = 1/s)

$$f = \frac{1}{T}$$

**Angular velocity:**

$$\omega = \frac{2\pi}{T} = 2\pi f$$

**Linear velocity:**

$$v = \frac{2\pi r}{T} = \omega r$$

---

## Summary

- **Orbital velocity:** $v = \sqrt{\mu / r}$ (decreases with altitude)
- **Orbital period:** $T = 2\pi\sqrt{r^3 / \mu}$ (increases with altitude)
- **Kepler's Third Law:** $T^2 \propto r^3$
- **Geostationary orbit:** 35,786 km altitude, 24-hour period
- **LEO:** 200–2000 km, 90–130 minute periods, 10–16 orbits/day
- Satellite mass does not affect orbital parameters
- Orbit is continuous free fall — gravity provides centripetal force
- Lower orbits are faster but have shorter periods

**Next:** In Essay 14, we calculate **ground tracks** — the path a satellite traces on Earth's surface as the planet rotates beneath it. This combines orbital motion with Earth's rotation.

---
