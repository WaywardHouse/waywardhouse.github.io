---
layout: essay
title: "Solar Geometry and Projection"
subtitle: "Trigonometry and the dot product — how surface orientation affects energy receipt"
date: 2026-02-26
categories: [modeling]
series: computational-geography-foundations
series_order: 6
cluster: B
cluster_title: "Energy and Attenuation"
tags:
  - computational-geography
  - modeling
  - trigonometry
  - vectors
  - solar-radiation
  - physical-geography
math: true
viz: true
difficulty: 3
math_core: [trigonometry, vectors, dot-product, projection]
spatial_reasoning: 3
dynamics: 0
computation: 2
domain: [physical-geography, energy-balance, climatology]
excerpt: >
  A south-facing slope receives more solar energy than a north-facing slope at
  the same latitude. Why? Because the angle between the sun's rays and the
  surface normal determines the energy per unit area. This essay introduces
  trigonometry and vector geometry to model solar radiation on tilted surfaces.
math_prerequisites: >
  Right triangles and basic trigonometry (sin, cos, tan). The concept of angles
  in degrees and radians. We'll introduce vectors geometrically and build up to
  the dot product without assuming prior knowledge.
---

## 1. The Question

Why does the same incoming solar radiation produce different heating rates on slopes of different orientations?

A horizontal surface in Denver receives a certain amount of solar energy per square meter. A south-facing slope (tilted toward the equator) receives **more** energy per unit area. A north-facing slope receives **less**. The total radiation from the sun hasn't changed — but the **effective area** intercepting the light has.

This is a **projection effect**, and it's fundamental to:
- Topographic climate (microclimates in mountainous terrain)
- Seasonal energy balance (why summer is warmer than winter)
- Solar panel placement (tilt angle matters)
- Glacier mass balance (north vs. south aspects)

The mathematical question: How do we quantify the relationship between surface orientation and energy receipt?

---

## 2. The Conceptual Model

### Projection: The Core Idea

Imagine a flashlight shining on a wall:
- When the flashlight is perpendicular to the wall, the beam creates a small, bright circle.
- When you tilt the flashlight, the beam spreads out into an ellipse — **same total light, larger area, lower intensity**.

The **intensity** (energy per unit area) depends on the angle between the light direction and the surface orientation.

**Key principle:** Energy flux is maximized when the light hits the surface **perpendicularly** and decreases as the angle becomes more oblique.

### Surface Normal Vector

To describe surface orientation, we use the **normal vector** — a unit vector pointing **perpendicular** to the surface, away from it.

**Examples:**
- Horizontal surface: normal points straight up (0, 0, 1)
- Vertical wall facing east: normal points east (1, 0, 0)
- 30° south-facing slope: normal tilts south and up

The angle between the **sun's direction** and the **surface normal** determines the projection factor.

---

## 3. Building the Mathematical Model

### Trigonometry of Projection

Consider a surface tilted at angle $\beta$ from horizontal, receiving light from an angle $\theta$ from the surface normal.

The **effective area** intercepting the light is:

$$A_{\text{eff}} = A \cos \theta$$

Where:
- $A$ is the physical area of the surface (m²)
- $\theta$ is the **angle of incidence** (angle between light direction and surface normal)

**Energy flux density** (W/m² on the surface):

$$S = S_0 \cos \theta$$

Where $S_0$ is the incoming solar flux density (W/m² perpendicular to the sun's rays).

**Special cases:**
- $\theta = 0°$ (sun perpendicular to surface): $\cos 0° = 1$ → full intensity
- $\theta = 45°$: $\cos 45° = 0.707$ → 70.7% of perpendicular intensity
- $\theta = 90°$ (sun parallel to surface): $\cos 90° = 0$ → no energy received

### The Dot Product

We can express $\cos \theta$ using the **dot product** of two unit vectors:

$$\cos \theta = \hat{\mathbf{n}} \cdot \hat{\mathbf{s}}$$

Where:
- $\hat{\mathbf{n}}$ is the unit normal vector to the surface
- $\hat{\mathbf{s}}$ is the unit vector pointing toward the sun

**The dot product** of two vectors $\mathbf{a} = (a_x, a_y, a_z)$ and $\mathbf{b} = (b_x, b_y, b_z)$ is:

$$\mathbf{a} \cdot \mathbf{b} = a_x b_x + a_y b_y + a_z b_z$$

**Geometric interpretation:**

$$\mathbf{a} \cdot \mathbf{b} = |\mathbf{a}| |\mathbf{b}| \cos \theta$$

For **unit vectors** ($|\hat{\mathbf{a}}| = |\hat{\mathbf{b}}| = 1$):

$$\hat{\mathbf{a}} \cdot \hat{\mathbf{b}} = \cos \theta$$

The dot product directly gives us the cosine of the angle between the vectors!

---

## 4. Worked Example by Hand

**Problem:** A solar panel is tilted 35° from horizontal, facing due south. At solar noon on the equinox, the sun is at an elevation angle of 50° above the horizon (also due south).

(a) What is the angle of incidence $\theta$ (angle between sun and surface normal)?  
(b) If incoming solar radiation is $S_0 = 1000$ W/m², what is the effective flux on the panel?

### Solution

**(a) Angle of incidence**

**Surface normal:** The panel tilts 35° from horizontal toward the south. The normal tilts 35° from vertical toward the south.

In spherical coordinates (measuring from vertical):
- Normal elevation from horizontal: $90° - 35° = 55°$

**Sun direction:** Elevation 50° above horizon, so zenith angle $= 90° - 50° = 40°$

Both the sun and the surface normal are in the **same vertical plane** (the north-south meridian). The angle between them is:

$$\theta = |55° - 40°| = 15°$$

**(b) Effective flux**

$$S = S_0 \cos \theta = 1000 \times \cos(15°)$$

$$\cos(15°) \approx 0.966$$

$$S \approx 966 \text{ W/m}^2$$

The panel receives **96.6%** of the perpendicular solar flux — very nearly optimal!

**Note:** If the panel were horizontal, the flux would be:

$$S_{\text{horiz}} = 1000 \times \cos(40°) = 1000 \times 0.766 = 766 \text{ W/m}^2$$

The tilted panel receives **26% more energy** than a horizontal surface.

---

## 5. Vector Calculation Example

**Problem:** A surface has normal vector $\mathbf{n} = (0.5, 0, 0.866)$ (pointing northeast and upward). The sun direction is $\mathbf{s} = (0.3, 0.3, 0.9)$ (pointing slightly south and upward). Both are unit vectors.

(a) Compute the angle of incidence.  
(b) If $S_0 = 1200$ W/m², what is the flux on the surface?

### Solution

**(a) Angle of incidence**

$$\cos \theta = \mathbf{n} \cdot \mathbf{s} = (0.5)(0.3) + (0)(0.3) + (0.866)(0.9)$$

$$= 0.15 + 0 + 0.779 = 0.929$$

$$\theta = \arccos(0.929) \approx 21.6°$$

**(b) Effective flux**

$$S = 1200 \times 0.929 = 1115 \text{ W/m}^2$$

---

## 6. Computational Implementation

Below is an interactive model showing solar flux on a tilted surface.

<div class="viz-container" id="solar-geometry-viz">
  <div class="controls">
    <label>
      Surface slope (β):
      <input type="range" id="slope-slider" min="0" max="60" step="5" value="30">
      <span id="slope-value">30</span>°
    </label>
    <label>
      Surface aspect (0° = N, 90° = E, 180° = S, 270° = W):
      <input type="range" id="aspect-slider" min="0" max="360" step="15" value="180">
      <span id="aspect-value">180</span>° (S)
    </label>
    <label>
      Solar elevation:
      <input type="range" id="elevation-slider" min="10" max="90" step="5" value="45">
      <span id="elevation-value">45</span>°
    </label>
    <label>
      Solar azimuth (0° = N, 90° = E, 180° = S):
      <input type="range" id="azimuth-slider" min="0" max="360" step="15" value="180">
      <span id="azimuth-value">180</span>° (S)
    </label>
    <label>
      Incoming flux (S₀):
      <input type="range" id="flux-slider" min="500" max="1200" step="50" value="1000">
      <span id="flux-value">1000</span> W/m²
    </label>
  </div>
  <div class="results-panel">
    <p id="incidence-angle"></p>
    <p id="effective-flux"></p>
    <p id="comparison"></p>
  </div>
  <div id="solar-diagram" style="width: 100%; height: 500px;"></div>
</div>

<script type="module">
while (!window.echarts) await new Promise(r => setTimeout(r, 50));

const chart = window.echarts.init(document.getElementById('solar-diagram'));

let slope = 30;
let aspect = 180;
let solarElev = 45;
let solarAz = 180;
let S0 = 1000;

function deg2rad(deg) { return deg * Math.PI / 180; }
function rad2deg(rad) { return rad * 180 / Math.PI; }

function sphericalToCartesian(elevation, azimuth) {
  const elev_rad = deg2rad(elevation);
  const az_rad = deg2rad(azimuth);
  return {
    x: Math.cos(elev_rad) * Math.sin(az_rad),
    y: Math.cos(elev_rad) * Math.cos(az_rad),
    z: Math.sin(elev_rad)
  };
}

function surfaceNormal(slope_deg, aspect_deg) {
  const slope_rad = deg2rad(slope_deg);
  const aspect_rad = deg2rad(aspect_deg);
  return {
    x: Math.sin(slope_rad) * Math.sin(aspect_rad),
    y: Math.sin(slope_rad) * Math.cos(aspect_rad),
    z: Math.cos(slope_rad)
  };
}

function dotProduct(a, b) {
  return a.x * b.x + a.y * b.y + a.z * b.z;
}

function updateCalculation() {
  const sunVec = sphericalToCartesian(solarElev, solarAz);
  const normalVec = surfaceNormal(slope, aspect);

  const cosTheta = dotProduct(sunVec, normalVec);
  const theta = rad2deg(Math.acos(Math.max(0, Math.min(1, cosTheta))));
  const effectiveFlux = Math.max(0, S0 * cosTheta);

  const horizontalCos = Math.sin(deg2rad(solarElev));
  const horizontalFlux = S0 * horizontalCos;
  const percentDiff = ((effectiveFlux - horizontalFlux) / horizontalFlux * 100).toFixed(1);

  document.getElementById('incidence-angle').innerHTML =
    `<strong>Angle of incidence:</strong> ${theta.toFixed(1)}°`;
  document.getElementById('effective-flux').innerHTML =
    `<strong>Effective flux on surface:</strong> ${effectiveFlux.toFixed(1)} W/m²`;
  document.getElementById('comparison').innerHTML =
    `<strong>Compared to horizontal:</strong> ${percentDiff > 0 ? '+' : ''}${percentDiff}% (${horizontalFlux.toFixed(1)} W/m² on horizontal surface)`;

  updateChart();
}

function updateChart() {
  const polarData = [];
  const aspectValues = [];

  for (let asp = 0; asp <= 360; asp += 10) {
    const normalVec = surfaceNormal(slope, asp);
    const sunVec = sphericalToCartesian(solarElev, solarAz);
    const cosTheta = dotProduct(sunVec, normalVec);
    aspectValues.push(asp);
    polarData.push(Math.max(0, S0 * cosTheta));
  }

  const option = {
    title: {
      text: `Solar Flux vs. Aspect (slope = ${slope}°, sun elev = ${solarElev}°)`,
      left: 'center'
    },
    polar: { radius: '70%' },
    angleAxis: {
      type: 'value',
      startAngle: 90,
      min: 0,
      max: 360,
      interval: 45,
      axisLabel: {
        formatter: value => {
          const dirs = {0: 'N', 45: 'NE', 90: 'E', 135: 'SE', 180: 'S', 225: 'SW', 270: 'W', 315: 'NW'};
          return dirs[value] || value + '°';
        }
      }
    },
    radiusAxis: {
      min: 0,
      max: S0,
      axisLabel: { formatter: '{value} W/m²' }
    },
    series: [{
      type: 'line',
      data: polarData.map((flux, i) => [aspectValues[i], flux]),
      coordinateSystem: 'polar',
      lineStyle: { color: '#F0177A', width: 3 },
      areaStyle: { color: 'rgba(240, 23, 122, 0.2)' },
      markPoint: {
        data: [{
          coord: [aspect, Math.max(0, S0 * dotProduct(
            sphericalToCartesian(solarElev, solarAz),
            surfaceNormal(slope, aspect)
          ))],
          symbol: 'circle',
          symbolSize: 12,
          itemStyle: { color: '#00A8E8' },
          label: { show: true, formatter: 'Current', position: 'top' }
        }]
      }
    }]
  };

  chart.setOption(option);
}

document.getElementById('slope-slider').addEventListener('input', e => {
  slope = parseFloat(e.target.value);
  document.getElementById('slope-value').textContent = slope;
  updateCalculation();
});

document.getElementById('aspect-slider').addEventListener('input', e => {
  aspect = parseFloat(e.target.value);
  const dir = {0: 'N', 90: 'E', 180: 'S', 270: 'W'}[aspect] || '';
  document.getElementById('aspect-value').textContent = `${aspect}° ${dir ? '(' + dir + ')' : ''}`;
  updateCalculation();
});

document.getElementById('elevation-slider').addEventListener('input', e => {
  solarElev = parseFloat(e.target.value);
  document.getElementById('elevation-value').textContent = solarElev;
  updateCalculation();
});

document.getElementById('azimuth-slider').addEventListener('input', e => {
  solarAz = parseFloat(e.target.value);
  const dir = {0: 'N', 90: 'E', 180: 'S', 270: 'W'}[solarAz] || '';
  document.getElementById('azimuth-value').textContent = `${solarAz}° ${dir ? '(' + dir + ')' : ''}`;
  updateCalculation();
});

document.getElementById('flux-slider').addEventListener('input', e => {
  S0 = parseFloat(e.target.value);
  document.getElementById('flux-value').textContent = S0;
  updateCalculation();
});

updateCalculation();
window.addEventListener('resize', () => chart.resize());
</script>

**Try this:**
- Default (30° south-facing slope, sun at 45° elevation due south): Near-optimal alignment, high flux
- Change aspect to 0° (north-facing): Flux drops dramatically
- Set slope to 0° (horizontal): See how flux varies only with sun angle, not aspect
- Solar elevation to 90° (sun directly overhead): Horizontal surface receives maximum; all slopes receive equal flux
- Explore the polar plot: shows how flux varies with aspect for the current slope and sun position

---

## 7. Interpretation

### Why South-Facing Slopes Are Warmer (Northern Hemisphere)

In the Northern Hemisphere:
- The sun is always in the southern part of the sky at midday
- South-facing slopes tilt **toward** the sun → smaller angle of incidence → more energy
- North-facing slopes tilt **away** from the sun → larger angle of incidence → less energy

This creates **topoclimate** effects:
- South-facing slopes: warmer, drier, different vegetation (e.g., grassland vs. forest)
- North-facing slopes: cooler, moister, more shade-tolerant species
- Snowpack persists longer on north-facing slopes

### Seasonal Variation

The sun's elevation changes with season:
- **Summer solstice:** High solar elevation → even horizontal surfaces receive high energy
- **Winter solstice:** Low solar elevation → south-facing slopes receive much more than horizontal surfaces

This is why **winter heating** in buildings benefits more from south-facing windows than summer cooling suffers from them.

### Optimal Solar Panel Tilt

For maximum **annual** energy collection at latitude $\phi$:
- Tilt angle $\approx \phi$ (equal to latitude)
- Face south (Northern Hemisphere) or north (Southern Hemisphere)

For maximum **winter** energy (heating season):
- Tilt angle $\approx \phi + 15°$

For maximum **summer** energy (if needed):
- Tilt angle $\approx \phi - 15°$

---

## 8. What Could Go Wrong?

### Confusing Slope and Aspect

**Slope** is how steep the surface is (0° = flat, 90° = vertical).  
**Aspect** is which direction the surface faces (0° = north, 180° = south).

A 30° north-facing slope and a 30° south-facing slope have the same slope but **opposite** energy receipts.

### Forgetting the Cosine Can Be Negative

If $\theta > 90°$, then $\cos \theta < 0$. This means the surface is tilted **away** from the sun (backside).

In reality, a backside surface receives zero direct solar radiation. The model should set negative values to zero:

$$S = S_0 \max(0, \cos \theta)$$

### Ignoring Diffuse Radiation

Our model assumes all radiation is **direct** (straight from the sun). In reality:
- **Diffuse radiation** (scattered by atmosphere and clouds) comes from all directions
- On cloudy days, diffuse radiation dominates (50–100% of total)
- Diffuse radiation is less sensitive to surface orientation

Full solar models separate direct and diffuse components.

### Neglecting Terrain Shading

A slope may be oriented toward the sun but still in shadow due to adjacent ridges or peaks. This requires **viewshed analysis** (Essay 9 previews this).

---

## 9. Math Refresher: Trigonometry and Vectors

### Right Triangle Trigonometry

For a right triangle with angle $\theta$:

$$\sin \theta = \frac{\text{opposite}}{\text{hypotenuse}}$$

$$\cos \theta = \frac{\text{adjacent}}{\text{hypotenuse}}$$

$$\tan \theta = \frac{\text{opposite}}{\text{adjacent}}$$

### Unit Circle

On the unit circle (radius = 1):
- $\cos \theta$ is the x-coordinate
- $\sin \theta$ is the y-coordinate
- $\theta$ is measured counterclockwise from the positive x-axis

### Dot Product Properties

$$\mathbf{a} \cdot \mathbf{b} = \mathbf{b} \cdot \mathbf{a}$$ (commutative)

$$\mathbf{a} \cdot (\mathbf{b} + \mathbf{c}) = \mathbf{a} \cdot \mathbf{b} + \mathbf{a} \cdot \mathbf{c}$$ (distributive)

$$\mathbf{a} \cdot \mathbf{a} = |\mathbf{a}|^2$$ (magnitude squared)

If $\mathbf{a} \cdot \mathbf{b} = 0$, the vectors are **perpendicular**.

---

## Summary

- Solar flux on a surface: $S = S_0 \cos \theta$, where $\theta$ is the angle of incidence
- $\theta$ is the angle between the sun direction and the surface normal
- The dot product $\hat{\mathbf{n}} \cdot \hat{\mathbf{s}} = \cos \theta$ gives us the projection factor
- South-facing slopes receive more energy than north-facing slopes (Northern Hemisphere)
- Optimal solar panel tilt ≈ latitude for annual energy maximization
- Real surfaces also receive diffuse radiation and may be shaded by terrain

**Next:** In Essay 7, we transition to **terrain modeling**. We'll represent elevation as a function of two variables, introduce raster grids as discretized functions, and begin working with **digital elevation models** (DEMs).

---
