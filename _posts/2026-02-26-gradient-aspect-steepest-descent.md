---
layout: essay
title: "Gradient, Aspect, and Direction of Steepest Descent"
subtitle: "Partial derivatives in action — calculating slope magnitude and direction from a DEM"
date: 2026-02-26
categories: [modeling]
series: computational-geography-lab
series_order: 8
cluster: C
cluster_title: "Terrain and Spatial Derivatives"
tags:
  - computational-geography
  - modeling
  - calculus
  - terrain-analysis
  - partial-derivatives
  - gradient
math: true
viz: true
difficulty: 4
math_core: [partial-derivatives, gradient-vector, vector-magnitude, finite-differences]
spatial_reasoning: 4
dynamics: 0
computation: 3
domain: [physical-geography, geomorphology, hydrology]
excerpt: >
  The gradient of a terrain surface tells you two things: how steep the slope is
  (magnitude) and which direction it faces (direction). This essay shows how to
  compute partial derivatives from a DEM using finite differences and combine
  them into the gradient vector — the foundation of slope, aspect, and flow routing.
math_prerequisites: >
  Functions of two variables (Essay 7). Basic derivatives conceptually. We'll
  introduce partial derivatives from scratch and show how finite differences
  approximate them numerically.
---

## 1. The Question

Given a digital elevation model, how do we calculate:
1. **Slope** — how steep is the terrain?
2. **Aspect** — which direction does the slope face?
3. **Flow direction** — which way would water flow?

All three questions have the same answer: **compute the gradient**.

The gradient is a vector pointing in the direction of steepest ascent, with magnitude equal to the rate of ascent. Water flows **opposite** the gradient (downhill). Slope is the gradient's magnitude. Aspect is the gradient's direction.

The mathematical question: How do we compute the gradient from a grid of elevation values?

---

## 2. The Conceptual Model

### Partial Derivatives: Slope in Each Direction

For a continuous surface $z = f(x, y)$, the **partial derivatives** measure how elevation changes when you move in one direction:

$$\frac{\partial z}{\partial x} = \text{rate of change in the east-west direction}$$

$$\frac{\partial z}{\partial y} = \text{rate of change in the north-south direction}$$

**Example:** If $\frac{\partial z}{\partial x} = 0.05$ (dimensionless, or m/m), then elevation increases by 0.05 meters for every meter you move eastward.

### The Gradient Vector

The **gradient** combines both partial derivatives into a vector:

$$\nabla z = \left(\frac{\partial z}{\partial x}, \frac{\partial z}{\partial y}\right)$$

**Properties:**
- **Direction:** Points in the direction of steepest **ascent**
- **Magnitude:** Rate of ascent in that direction (steepest slope)

### Slope and Aspect from the Gradient

**Slope** (steepness):

$$S = |\nabla z| = \sqrt{\left(\frac{\partial z}{\partial x}\right)^2 + \left(\frac{\partial z}{\partial y}\right)^2}$$

Units: dimensionless (rise/run) or degrees/percent

**Aspect** (direction the slope faces):

$$\theta = \arctan2\left(\frac{\partial z}{\partial y}, \frac{\partial z}{\partial x}\right)$$

Measured clockwise from north (geographic convention):
- 0° = north
- 90° = east
- 180° = south
- 270° = west

---

## 3. Building the Mathematical Model

### Finite Differences: Approximating Derivatives

A DEM gives us discrete elevation values $z_{i,j}$. We don't have a formula for $z(x, y)$, so we can't compute derivatives analytically.

**Solution:** Approximate derivatives using **finite differences** — the discrete analog of derivatives.

**Central difference (most accurate for interior cells):**

$$\frac{\partial z}{\partial x} \approx \frac{z_{i, j+1} - z_{i, j-1}}{2 \Delta x}$$

$$\frac{\partial z}{\partial y} \approx \frac{z_{i+1, j} - z_{i-1, j}}{2 \Delta y}$$

Where $\Delta x$ and $\Delta y$ are the cell sizes (often equal: $\Delta x = \Delta y = d$).

**Interpretation:** The derivative in the x-direction is approximated by the elevation difference between the cells to the east and west, divided by the distance between them.

### The 3×3 Neighborhood

For cell $(i, j)$, the central difference uses a 3×3 window:

```
z[i-1,j-1]   z[i-1,j]   z[i-1,j+1]
z[i,j-1]     z[i,j]     z[i,j+1]
z[i+1,j-1]   z[i+1,j]   z[i+1,j+1]
```

**Horn's method** (commonly used in GIS software) weights diagonal neighbors:

$$\frac{\partial z}{\partial x} = \frac{(z_{i-1,j+1} + 2z_{i,j+1} + z_{i+1,j+1}) - (z_{i-1,j-1} + 2z_{i,j-1} + z_{i+1,j-1})}{8 \Delta x}$$

$$\frac{\partial z}{\partial y} = \frac{(z_{i+1,j-1} + 2z_{i+1,j} + z_{i+1,j+1}) - (z_{i-1,j-1} + 2z_{i-1,j} + z_{i-1,j+1})}{8 \Delta y}$$

This is a **weighted average** that reduces noise.

### Computing Slope and Aspect

Once you have $\frac{\partial z}{\partial x}$ and $\frac{\partial z}{\partial y}$:

**Slope (in radians):**

$$S_{\text{rad}} = \arctan\left(\sqrt{\left(\frac{\partial z}{\partial x}\right)^2 + \left(\frac{\partial z}{\partial y}\right)^2}\right)$$

**Slope (in degrees):**

$$S_{\text{deg}} = S_{\text{rad}} \times \frac{180}{\pi}$$

**Slope (as percent):**

$$S_{\%} = \sqrt{\left(\frac{\partial z}{\partial x}\right)^2 + \left(\frac{\partial z}{\partial y}\right)^2} \times 100$$

**Aspect (in degrees from north):**

$$A = 90° - \arctan2\left(\frac{\partial z}{\partial y}, \frac{\partial z}{\partial x}\right) \times \frac{180}{\pi}$$

(Adjust to ensure $0° \leq A < 360°$)

---

## 4. Worked Example by Hand

**Problem:** A 3×3 DEM with cell size $d = 10$ m:

```
100  105  110
102  107  112
105  110  115
```

Calculate slope and aspect at the center cell $(i=1, j=1)$ using central differences.

### Solution

**Cell values:**
- $z_{0,0} = 100$, $z_{0,1} = 105$, $z_{0,2} = 110$
- $z_{1,0} = 102$, $z_{1,1} = 107$, $z_{1,2} = 112$
- $z_{2,0} = 105$, $z_{2,1} = 110$, $z_{2,2} = 115$

**Partial derivative in x (east-west):**

$$\frac{\partial z}{\partial x} = \frac{z_{1,2} - z_{1,0}}{2 \Delta x} = \frac{112 - 102}{2 \times 10} = \frac{10}{20} = 0.5$$

**Partial derivative in y (north-south):**

$$\frac{\partial z}{\partial y} = \frac{z_{2,1} - z_{0,1}}{2 \Delta y} = \frac{110 - 105}{2 \times 10} = \frac{5}{20} = 0.25$$

**Slope magnitude:**

$$S = \sqrt{(0.5)^2 + (0.25)^2} = \sqrt{0.25 + 0.0625} = \sqrt{0.3125} \approx 0.559$$

**Slope in degrees:**

$$S_{\text{deg}} = \arctan(0.559) \times \frac{180}{\pi} \approx 29.2°$$

**Aspect:**

$$\theta_{\text{raw}} = \arctan2(0.25, 0.5) \times \frac{180}{\pi} \approx 26.6°$$

Convert to geographic aspect (clockwise from north):

$$A = 90° - 26.6° = 63.4°$$

The slope is **29.2° steep** and faces **63.4° (ENE — slightly east of northeast)**.

---

## 5. Computational Implementation

Below is an interactive model computing slope and aspect from a synthetic DEM.

<div class="viz-container" id="gradient-viz">
  <div class="controls">
    <label>
      Terrain type:
      <select id="terrain-gradient-select">
        <option value="plane">Tilted plane</option>
        <option value="cone">Cone</option>
        <option value="ridge">Ridge</option>
        <option value="valley">Valley</option>
        <option value="saddle">Saddle</option>
      </select>
    </label>
    <label>
      Grid resolution:
      <input type="range" id="res-gradient-slider" min="20" max="60" step="10" value="40">
      <span id="res-gradient-value">40</span> cells
    </label>
    <label>
      Display:
      <select id="display-select">
        <option value="slope">Slope (degrees)</option>
        <option value="aspect">Aspect (degrees from N)</option>
        <option value="vectors">Gradient vectors</option>
      </select>
    </label>
  </div>
  <div id="gradient-chart" style="width: 100%; height: 600px;"></div>
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
  const chart = echarts.init(document.getElementById('gradient-chart'));
  
  let terrainType = 'plane';
  let resolution = 40;
  let displayMode = 'slope';
  
  function generateTerrain(type, res) {
    const z = [];
    const extent = 100;
    const step = extent / res;
    
    for (let i = 0; i < res; i++) {
      z[i] = [];
      for (let j = 0; j < res; j++) {
        const x = (j - res/2) * step;
        const y = (i - res/2) * step;
        
        switch(type) {
          case 'plane':
            z[i][j] = 10 + x * 0.3 + y * 0.2;
            break;
          case 'cone':
            z[i][j] = 50 - Math.sqrt(x*x + y*y) * 0.5;
            break;
          case 'ridge':
            z[i][j] = 30 - Math.abs(x) * 0.3;
            break;
          case 'valley':
            z[i][j] = Math.abs(y) * 0.3;
            break;
          case 'saddle':
            z[i][j] = (x*x - y*y) * 0.01;
            break;
        }
      }
    }
    
    return z;
  }
  
  function computeGradient(z, cellSize) {
    const res = z.length;
    const dzdx = [];
    const dzdy = [];
    const slope = [];
    const aspect = [];
    
    for (let i = 1; i < res - 1; i++) {
      dzdx[i] = [];
      dzdy[i] = [];
      slope[i] = [];
      aspect[i] = [];
      
      for (let j = 1; j < res - 1; j++) {
        // Central differences
        const dx = (z[i][j+1] - z[i][j-1]) / (2 * cellSize);
        const dy = (z[i+1][j] - z[i-1][j]) / (2 * cellSize);
        
        dzdx[i][j] = dx;
        dzdy[i][j] = dy;
        
        const slopeMag = Math.sqrt(dx*dx + dy*dy);
        slope[i][j] = Math.atan(slopeMag) * 180 / Math.PI;
        
        // Aspect (0° = N, 90° = E, 180° = S, 270° = W)
        let asp = 90 - Math.atan2(dy, dx) * 180 / Math.PI;
        if (asp < 0) asp += 360;
        aspect[i][j] = asp;
      }
    }
    
    return {dzdx, dzdy, slope, aspect};
  }
  
  function updateChart() {
    const z = generateTerrain(terrainType, resolution);
    const cellSize = 100 / resolution;
    const grad = computeGradient(z, cellSize);
    
    let data = [];
    let title = '';
    let colorScale = [];
    
    if (displayMode === 'slope') {
      for (let i = 1; i < resolution - 1; i++) {
        for (let j = 1; j < resolution - 1; j++) {
          data.push([j, i, grad.slope[i][j]]);
        }
      }
      title = 'Slope (degrees)';
      colorScale = ['#f7fbff', '#deebf7', '#c6dbef', '#9ecae1', '#6baed6', 
                    '#4292c6', '#2171b5', '#08519c', '#08306b'];
      
    } else if (displayMode === 'aspect') {
      for (let i = 1; i < resolution - 1; i++) {
        for (let j = 1; j < resolution - 1; j++) {
          data.push([j, i, grad.aspect[i][j]]);
        }
      }
      title = 'Aspect (degrees from North)';
      colorScale = ['#d7191c', '#fdae61', '#ffffbf', '#abd9e9', '#2c7bb6',
                    '#d7191c']; // Circular color scale
    }
    
    const option = {
      title: {
        text: `${title}: ${terrainType}`,
        left: 'center'
      },
      tooltip: {
        position: 'top',
        formatter: function(params) {
          if (displayMode === 'slope') {
            return `Slope: ${params.value[2].toFixed(1)}°`;
          } else if (displayMode === 'aspect') {
            const dirs = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW', 'N'];
            const idx = Math.round(params.value[2] / 45);
            return `Aspect: ${params.value[2].toFixed(1)}° (${dirs[idx]})`;
          }
        }
      },
      grid: {
        left: 60,
        right: 60,
        top: 60,
        bottom: 60
      },
      xAxis: {
        type: 'category',
        show: false
      },
      yAxis: {
        type: 'category',
        show: false
      },
      visualMap: {
        min: displayMode === 'slope' ? 0 : 0,
        max: displayMode === 'slope' ? 
          Math.max(...data.map(d => d[2])) : 360,
        calculable: true,
        orient: 'horizontal',
        left: 'center',
        bottom: 10,
        inRange: {
          color: colorScale
        }
      },
      series: [{
        type: 'heatmap',
        data: data,
        label: {
          show: false
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }]
    };
    
    chart.setOption(option);
  }
  
  document.getElementById('terrain-gradient-select').addEventListener('change', (e) => {
    terrainType = e.target.value;
    updateChart();
  });
  
  document.getElementById('res-gradient-slider').addEventListener('input', (e) => {
    resolution = parseInt(e.target.value);
    document.getElementById('res-gradient-value').textContent = resolution;
    updateChart();
  });
  
  document.getElementById('display-select').addEventListener('change', (e) => {
    displayMode = e.target.value;
    updateChart();
  });
  
  updateChart();
  
  window.addEventListener('resize', () => chart.resize());
})();
</script>

**Try this:**
- **Plane:** Uniform slope and aspect (constant gradient everywhere)
- **Cone:** Slope increases toward the peak; aspect radiates outward
- **Ridge:** High slope along the ridge flanks; aspect points away from the ridgeline
- **Valley:** Aspect points toward the valley axis
- **Saddle:** Aspect flips 180° across the saddle point

**Key insight:** The gradient captures both the **magnitude** (slope steepness) and **direction** (aspect) of the terrain's tilt at every point.

---

## 6. Interpretation

### Slope Units

**Rise/run (dimensionless):** $\frac{\Delta z}{\Delta x} = 0.1$ means 0.1 m rise per 1 m horizontal distance.

**Degrees:** $\arctan(0.1) \approx 5.7°$

**Percent:** $0.1 \times 100 = 10\%$

**Conversion:**
- Gentle: <5° or <9%
- Moderate: 5–15° or 9–27%
- Steep: 15–30° or 27–58%
- Very steep: >30° or >58%

### Aspect and Solar Radiation

Aspect determines **insolation** (solar radiation received):
- **Equator-facing slopes** (south in N. Hemisphere, north in S. Hemisphere): maximum energy
- **Pole-facing slopes**: minimum energy
- **East/west slopes**: intermediate

This creates **microclimates** — different vegetation, soil moisture, snow persistence.

### Flow Direction

Water flows **downhill** — opposite the gradient direction.

If $\nabla z = (0.5, 0.25)$ (pointing ENE uphill), then flow direction is $(-0.5, -0.25)$ (pointing WSW downhill).

**Next essay (Essay 9)** will use this to route water across a DEM.

---

## 7. What Could Go Wrong?

### Edge Effects

Cells on the edge of a DEM have no neighbors beyond the boundary. Central differences require neighbors on both sides.

**Solutions:**
- Mark edge cells as "no data"
- Use **forward/backward differences** at edges (less accurate)
- Extend the DEM artificially (mirror, clamp values)

### Noisy DEMs

Real DEMs contain measurement errors. Small errors can produce large swings in slope when differencing nearby cells.

**Solutions:**
- **Smooth** the DEM first (e.g., Gaussian filter)
- Use weighted finite differences (Horn's method)
- Increase cell size (aggregate to coarser resolution)

### Coordinate System Issues

If $\Delta x \neq \Delta y$ (non-square cells), use separate cell sizes in the x and y derivatives.

If using **geographic coordinates** (lat/lon), the distance per degree varies with latitude. Convert to a projected coordinate system first.

### Flat Areas

If $\frac{\partial z}{\partial x} = \frac{\partial z}{\partial y} = 0$, the gradient is zero:
- Slope is 0°
- Aspect is **undefined** (no preferred direction)

GIS software often assigns flat areas an aspect of -1 or 360°.

---

## 8. Extension: The Gradient as a Vector Field

The gradient $\nabla z$ assigns a **vector** to every point in the plane. This is a **vector field**.

**Visualization:** At each grid point, draw an arrow:
- **Direction:** Points uphill (steepest ascent)
- **Length:** Proportional to slope magnitude

**Properties:**
- Gradient vectors are **perpendicular to contour lines** (level curves of constant elevation)
- Water flows along **streamlines** — curves tangent to the negative gradient

This geometric view connects calculus, vector analysis, and physical flow.

---

## 9. Math Refresher: Partial Derivatives

### Notation

For $z = f(x, y)$:

$$\frac{\partial z}{\partial x} = \frac{\partial f}{\partial x} = f_x$$

**Read as:** "the partial derivative of z with respect to x."

### How to Compute (Analytically)

Treat $y$ as a constant, differentiate with respect to $x$:

**Example:** $z = x^2 + 3xy + y^2$

$$\frac{\partial z}{\partial x} = 2x + 3y$$

$$\frac{\partial z}{\partial y} = 3x + 2y$$

### Geometric Interpretation

$\frac{\partial z}{\partial x}$ is the slope of the surface in the x-direction (holding y constant).

Imagine slicing the surface with a vertical plane parallel to the x-axis — the cross-section is a curve, and $\frac{\partial z}{\partial x}$ is its slope.

---

## Summary

- The **gradient** $\nabla z = \left(\frac{\partial z}{\partial x}, \frac{\partial z}{\partial y}\right)$ points in the direction of steepest ascent
- **Slope** is the magnitude: $S = |\nabla z|$
- **Aspect** is the direction: $A = \arctan2\left(\frac{\partial z}{\partial y}, \frac{\partial z}{\partial x}\right)$
- **Finite differences** approximate partial derivatives from a DEM
- Central differences: $\frac{\partial z}{\partial x} \approx \frac{z_{i,j+1} - z_{i,j-1}}{2\Delta x}$
- Water flows **downhill** — opposite the gradient
- Aspect creates microclimates; slope affects erosion, stability, and runoff

**Next:** In Essay 9, we use the gradient to **route water** across a DEM. We'll introduce the concept of flow accumulation, watersheds, and stream networks — all derived from local slope and aspect.

---
