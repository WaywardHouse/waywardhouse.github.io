---
layout: essay
title: "Viewshed and Line-of-Sight Analysis"
subtitle: "What can you see from this location? Visibility analysis on terrain"
date: 2026-02-27
categories: [modeling]
series: computational-geography-spatial
series_order: 8
cluster: M
cluster_title: "Terrain Analysis"
tags:
  - computational-geography
  - modeling
  - gis
  - terrain-analysis
  - viewshed
  - visibility
  - line-of-sight
  - dem
math: true
viz: true
difficulty: 4
math_core: [ray-tracing, interpolation, geometric-visibility, algorithmic-geometry]
spatial_reasoning: 5
dynamics: 1
computation: 4
domain: [gis, terrain-analysis, telecommunications, military, urban-planning]
excerpt: >
  Where can a fire tower see? Which houses have ocean views? Can this cell tower
  reach that antenna? Viewshed analysis determines what terrain locations are
  visible from an observer point. This essay derives line-of-sight algorithms,
  implements efficient viewshed computation, and extends to applications.
math_prerequisites: >
  Digital elevation models (Essay 7-9). Raster interpolation (Essay 33). Slope
  and gradient concepts. We'll introduce ray-terrain intersection from scratch.
---

## 1. The Question

From the top of this mountain, which valleys can you see?

**Viewshed** (also called "intervisibility") determines visible areas from an observer location:

**Applications:**
- **Fire towers:** Where can rangers see smoke?
- **Cell towers:** Which areas have signal coverage?
- **Wind turbines:** Where will they be visible (visual impact)?
- **Real estate:** Which properties have ocean/mountain views?
- **Military:** Where can this position provide surveillance?
- **Solar farms:** Where will there be shadow/glint?

The mathematical question: Given an observer at position $(x_0, y_0, z_0)$ on a terrain, which cells in the DEM are visible (not blocked by intervening terrain)?

**Challenge:** Must test line-of-sight to potentially millions of cells efficiently.

---

## 2. The Conceptual Model

### Line-of-Sight (LOS)

**Two points have line-of-sight if:**

The straight line connecting them doesn't intersect terrain between them.

**Observer:** $O = (x_0, y_0, z_0)$  
**Target:** $T = (x_1, y_1, z_1)$

**Line-of-sight exists** if:

$$\forall t \in (0, 1): \quad z_{\text{line}}(t) > z_{\text{terrain}}(t)$$

Where:
- $z_{\text{line}}(t) = z_0 + t(z_1 - z_0)$ (elevation on sightline)
- $z_{\text{terrain}}(t)$ = terrain elevation at position $(x_0 + t(x_1 - x_0), y_0 + t(y_1 - y_0))$

**If line dips below terrain at any point → blocked!**

### Observer Height

**Total observer elevation:**

$$z_{\text{observer}} = z_{\text{ground}} + h_{\text{observer}}$$

**Examples:**
- Person: $h = 1.7$ m (eye level)
- Fire tower: $h = 20$ m (platform height)
- Cell antenna: $h = 30$ m (tower height)

**Similarly, target height:**

$$z_{\text{target}} = z_{\text{ground}} + h_{\text{target}}$$

**Person standing:** $h_{\text{target}} = 1.7$ m  
**Building:** $h_{\text{target}} = 10$ m (roof height)

### Viewshed Definition

**Binary viewshed:**

$$V(x, y) = \begin{cases}
1 & \text{if visible from observer} \\
0 & \text{if not visible}
\end{cases}$$

**Cumulative viewshed** (multiple observers):

$$V_{\text{total}}(x, y) = \sum_{i=1}^{n} V_i(x, y)$$

Counts how many observers can see each location.

---

## 3. Building the Mathematical Model

### Naive Algorithm (Too Slow)

**For each target cell:**
1. Sample points along line from observer to target
2. Interpolate terrain elevation at each sample point
3. Check if sightline passes above terrain
4. If all samples clear → visible

**Problem:** For $n \times n$ DEM, testing $n^2$ cells × $k$ samples per line = $O(n^2 k)$ complexity.

**Example:** 1000×1000 DEM, 100 samples per line = 100 million tests!

### Efficient Algorithm: Reference Plane

**Key insight:** Use **angle of elevation** instead of sampling.

**Elevation angle from observer to point $(x, y)$:**

$$\alpha(x, y) = \arctan\left(\frac{z(x,y) - z_0}{d(x,y)}\right)$$

Where $d(x,y) = \sqrt{(x - x_0)^2 + (y - y_0)^2}$ is horizontal distance.

**Visibility rule:**

Point is visible if its elevation angle **exceeds** maximum angle seen so far along that ray.

**Algorithm:**
1. For each radial direction from observer
2. March outward along ray
3. Track maximum elevation angle seen
4. If current point's angle > max → visible, update max
5. If current point's angle ≤ max → blocked

**Complexity:** $O(n^2)$ but with much lower constant (single pass per cell).

### Radial Sweep Algorithm

**Pseudocode:**

```
For each azimuth angle θ from 0° to 360°:
    max_angle = -∞
    
    For distance d from 0 to max_distance:
        x = x0 + d * cos(θ)
        y = y0 + d * sin(θ)
        
        z_terrain = interpolate(DEM, x, y)
        z_target = z_terrain + target_height
        
        angle = atan((z_target - z_observer) / d)
        
        if angle > max_angle:
            mark(x, y) as visible
            max_angle = angle
        else:
            mark(x, y) as not visible
```

**Key:** Maximum angle acts as "horizon" - anything below it is blocked.

### Wang's Algorithm (Efficient for Grids)

**Process cells in rings around observer:**

**Ring 0:** Observer cell (always visible)  
**Ring 1:** 8 neighbors  
**Ring 2:** 16 cells at distance 2  
...

**For each cell in ring $k$:**
- Compute elevation angle to cell
- Compare to maximum angle seen in that direction
- Update visibility and max angle

**Advantage:** Processes each cell exactly once, cache-friendly.

---

## 4. Worked Example by Hand

**Problem:** Determine viewshed from observer at (2, 2) with eye height 2m.

**DEM (meters):**

```
      j=0  j=1  j=2  j=3  j=4
i=0    10   12   14   16   18
i=1    12   14   16   18   20
i=2    14   16   18   20   22
i=3    12   14   16   18   20
i=4    10   12   14   16   18
```

Observer at (2, 2): ground elevation 18m, observer height 2m → total 20m

Check visibility of cells along row 2 (eastward from observer).

### Solution

**Cell (2,3):** 1 cell east

Ground elevation: 20m  
Horizontal distance: $d = 1$ cell = 30m (assume 30m cell size)  
Elevation difference: $20 - 20 = 0$ m  
Angle: $\alpha = \arctan(0/30) = 0°$

**Visible** (no obstruction yet)  
Max angle: $0°$

**Cell (2,4):** 2 cells east

Ground elevation: 22m  
Distance: $d = 2 \times 30 = 60$ m  
Elevation difference: $22 - 20 = 2$ m  
Angle: $\alpha = \arctan(2/60) = 1.91°$

**Compare to max angle:** $1.91° > 0°$ → **Visible**  
Update max angle: $1.91°$

**Cell (3,3):** 1 cell southeast

Ground elevation: 18m  
Distance: $d = \sqrt{30^2 + 30^2} = 42.4$ m  
Elevation difference: $18 - 20 = -2$ m  
Angle: $\alpha = \arctan(-2/42.4) = -2.70°$

**Compare to max in SE direction:** Assume max was $0°$ (flat)  
$-2.70° < 0°$ → **Not visible** (below horizon)

**Continue for all cells...**

**Result:** Cells at same or higher elevation with positive angles are visible. Lower cells may be blocked.

---

## 5. Computational Implementation

Below is an interactive viewshed simulator.

<div class="viz-container" id="viewshed-viz">
  <div class="controls">
    <label>
      Observer height (m):
      <input type="range" id="obs-height" min="0" max="20" step="1" value="5">
      <span id="obs-height-val">5</span> m
    </label>
    <label>
      Target height (m):
      <input type="range" id="target-height" min="0" max="5" step="0.5" value="1.7">
      <span id="target-height-val">1.7</span> m
    </label>
    <label>
      Show terrain:
      <input type="checkbox" id="show-terrain" checked>
    </label>
    <label>
      Show 3D profile:
      <input type="checkbox" id="show-profile">
    </label>
  </div>
  <div id="viewshed-canvas-container">
    <canvas id="viewshed-canvas" width="700" height="350" style="border: 1px solid #ddd;"></canvas>
  </div>
  <div class="viewshed-info">
    <p><strong>Visible cells:</strong> <span id="visible-count">--</span></p>
    <p><strong>Total cells:</strong> <span id="total-cells">--</span></p>
    <p><strong>Visibility:</strong> <span id="visibility-pct">--</span>%</p>
  </div>
</div>

<script type="module">
(function() {
  const canvas = document.getElementById('viewshed-canvas');
  const ctx = canvas.getContext('2d');
  
  let obsHeight = 5;
  let targetHeight = 1.7;
  let showTerrain = true;
  let showProfile = false;
  
  const size = 30;
  const cellSize = 10; // pixels
  
  // Generate terrain with hill in center
  const terrain = [];
  for (let i = 0; i < size; i++) {
    const row = [];
    for (let j = 0; j < size; j++) {
      const cx = size / 2, cy = size / 2;
      const dist = Math.sqrt((i - cx) ** 2 + (j - cy) ** 2);
      const elevation = 50 + 30 * Math.exp(-dist / 8) - dist * 0.5;
      row.push(Math.max(0, elevation));
    }
    terrain.push(row);
  }
  
  const obsI = Math.floor(size / 2);
  const obsJ = Math.floor(size / 2);
  
  function lineOfSight(i0, j0, z0, i1, j1, z1) {
    const di = i1 - i0;
    const dj = j1 - j0;
    const steps = Math.max(Math.abs(di), Math.abs(dj));
    
    if (steps === 0) return true;
    
    for (let step = 1; step < steps; step++) {
      const t = step / steps;
      const i = Math.round(i0 + t * di);
      const j = Math.round(j0 + t * dj);
      
      if (i < 0 || i >= size || j < 0 || j >= size) continue;
      
      const zLine = z0 + t * (z1 - z0);
      const zTerrain = terrain[i][j];
      
      if (zLine < zTerrain) {
        return false; // Blocked
      }
    }
    
    return true;
  }
  
  function computeViewshed() {
    const viewshed = [];
    const zObs = terrain[obsI][obsJ] + obsHeight;
    
    let visibleCount = 0;
    
    for (let i = 0; i < size; i++) {
      const row = [];
      for (let j = 0; j < size; j++) {
        const zTarget = terrain[i][j] + targetHeight;
        const visible = lineOfSight(obsI, obsJ, zObs, i, j, zTarget);
        row.push(visible);
        if (visible) visibleCount++;
      }
      viewshed.push(row);
    }
    
    return {viewshed, visibleCount};
  }
  
  function drawTerrain(x, y, width, height) {
    const cellW = width / size;
    const cellH = height / size;
    
    let min = Infinity, max = -Infinity;
    for (let row of terrain) {
      for (let val of row) {
        min = Math.min(min, val);
        max = Math.max(max, val);
      }
    }
    
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        const normalized = (terrain[i][j] - min) / (max - min);
        const gray = Math.floor(100 + 155 * normalized);
        
        ctx.fillStyle = `rgb(${gray}, ${gray}, ${gray})`;
        ctx.fillRect(x + j * cellW, y + i * cellH, cellW, cellH);
      }
    }
  }
  
  function drawViewshed(viewshed, x, y, width, height) {
    const cellW = width / size;
    const cellH = height / size;
    
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        if (i === obsI && j === obsJ) {
          // Observer location
          ctx.fillStyle = '#E74C3C';
          ctx.fillRect(x + j * cellW, y + i * cellH, cellW, cellH);
          
          // Observer marker
          ctx.fillStyle = '#FFF';
          ctx.beginPath();
          ctx.arc(
            x + j * cellW + cellW/2,
            y + i * cellH + cellH/2,
            cellW/3, 0, 2 * Math.PI
          );
          ctx.fill();
        } else {
          const alpha = viewshed[i][j] ? 0.6 : 0.1;
          const color = viewshed[i][j] ? '46, 204, 113' : '52, 73, 94';
          ctx.fillStyle = `rgba(${color}, ${alpha})`;
          ctx.fillRect(x + j * cellW, y + i * cellH, cellW, cellH);
        }
      }
    }
  }
  
  function drawProfile(x, y, width, height) {
    // Draw elevation profile along east direction
    const profile = [];
    const zObs = terrain[obsI][obsJ] + obsHeight;
    
    for (let j = 0; j < size; j++) {
      profile.push({
        terrain: terrain[obsI][j],
        target: terrain[obsI][j] + targetHeight
      });
    }
    
    const min = 0;
    const max = Math.max(...profile.map(p => p.terrain)) + obsHeight;
    const xScale = width / size;
    const yScale = height / (max - min);
    
    // Draw terrain profile
    ctx.strokeStyle = '#8B4513';
    ctx.lineWidth = 2;
    ctx.beginPath();
    for (let j = 0; j < size; j++) {
      const px = x + j * xScale;
      const py = y + height - (profile[j].terrain - min) * yScale;
      if (j === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.stroke();
    
    // Draw sightlines
    ctx.strokeStyle = 'rgba(46, 204, 113, 0.3)';
    ctx.lineWidth = 1;
    for (let j = 0; j < size; j++) {
      if (j === obsJ) continue;
      
      const x0 = x + obsJ * xScale;
      const y0 = y + height - (zObs - min) * yScale;
      const x1 = x + j * xScale;
      const y1 = y + height - (profile[j].target - min) * yScale;
      
      ctx.beginPath();
      ctx.moveTo(x0, y0);
      ctx.lineTo(x1, y1);
      ctx.stroke();
    }
    
    // Observer point
    ctx.fillStyle = '#E74C3C';
    ctx.beginPath();
    ctx.arc(
      x + obsJ * xScale,
      y + height - (zObs - min) * yScale,
      5, 0, 2 * Math.PI
    );
    ctx.fill();
    
    // Label
    ctx.fillStyle = '#2C3E50';
    ctx.font = 'bold 12px sans-serif';
    ctx.fillText('Elevation Profile (East)', x + 5, y + 15);
  }
  
  function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const {viewshed, visibleCount} = computeViewshed();
    
    if (showTerrain) {
      drawTerrain(20, 20, 300, 300);
    }
    
    drawViewshed(viewshed, 20, 20, 300, 300);
    
    if (showProfile) {
      drawProfile(370, 50, 300, 250);
    }
    
    // Stats
    const totalCells = size * size;
    const pct = (visibleCount / totalCells * 100).toFixed(1);
    
    document.getElementById('visible-count').textContent = visibleCount;
    document.getElementById('total-cells').textContent = totalCells;
    document.getElementById('visibility-pct').textContent = pct;
  }
  
  document.getElementById('obs-height').addEventListener('input', (e) => {
    obsHeight = parseFloat(e.target.value);
    document.getElementById('obs-height-val').textContent = obsHeight;
    render();
  });
  
  document.getElementById('target-height').addEventListener('input', (e) => {
    targetHeight = parseFloat(e.target.value);
    document.getElementById('target-height-val').textContent = targetHeight;
    render();
  });
  
  document.getElementById('show-terrain').addEventListener('change', (e) => {
    showTerrain = e.target.checked;
    render();
  });
  
  document.getElementById('show-profile').addEventListener('change', (e) => {
    showProfile = e.target.checked;
    render();
  });
  
  render();
})();
</script>

**Try this:**
- **Increase observer height:** See more terrain (taller tower = bigger viewshed)
- **Increase target height:** People standing visible farther than ground
- **Show 3D profile:** See elevation cross-section with sightlines
- **Green areas:** Visible from observer (red dot)
- **Dark areas:** Blocked by intervening terrain
- Notice: Higher observer = exponentially more visibility

**Key insight:** Small height changes dramatically affect viewshed—why towers are tall!

---

## 6. Interpretation

### Communication Networks

**Cell tower placement:**

```
1. Compute viewshed from potential tower location
2. Visible area = potential coverage
3. Optimize tower locations to maximize coverage
4. Account for signal attenuation with distance
```

**Coverage gaps** = areas not visible from any tower.

**Overlap** = redundant coverage (good for reliability).

### Visual Impact Assessment

**Wind turbine visibility:**

```
For each turbine location:
    Compute viewshed to distance 10 km
    Count houses/roads in viewshed
    Assess visual impact score
```

**High impact:** Visible from many populated areas  
**Low impact:** Visible only from remote locations

### Fire Detection

**Optimal fire tower placement:**

```
Goal: Maximize forest visibility with minimum towers

1. Compute viewshed from each candidate location
2. Solve set cover problem:
   - Select minimum towers to cover all forest
3. Account for atmospheric visibility limits
```

**Typical:** 20-30 km visibility in clear conditions.

### Military Applications

**Surveillance and targeting:**

- **Sniper positions:** High viewshed = good overwatch
- **Defensive positions:** What approaches are visible?
- **Dead zones:** Areas not visible (infiltration routes)

**Inverse viewshed:** From which locations is this point visible? (exposure analysis)

---

## 7. What Could Go Wrong?

### Earth Curvature

**For long distances, Earth curves away.**

**Horizon distance** (for observer at height $h$):

$$d_{\text{horizon}} = \sqrt{2Rh}$$

Where $R = 6371$ km (Earth radius).

**Example:** Observer at 100m height:

$$d = \sqrt{2 \times 6371000 \times 100} = 35.7 \text{ km}$$

**Beyond 36 km:** Target below horizon even on flat terrain.

**Solution:** Adjust terrain elevation for curvature:

$$z_{\text{adjusted}} = z_{\text{DEM}} - \frac{d^2}{2R}$$

### Atmospheric Refraction

**Light bends in atmosphere** (increases visible distance).

**Effective Earth radius:** $R_{\text{eff}} = \frac{4}{3}R$

**Refraction extends horizon ~7%.**

**Solution:** Use adjusted radius in curvature calculations.

### DEM Resolution

**Coarse DEM misses small obstructions:**

- Buildings
- Trees
- Terrain micro-relief

**30m DEM:** Can't represent 2m wall.

**Solution:** 
- Use high-resolution DEM (1m LiDAR)
- Add separate obstruction layer (buildings, vegetation)

### Computational Cost

**Full viewshed for large DEM:**

1000×1000 DEM → 1 million line-of-sight tests

**Each test:** ~100 samples → 100 million operations

**Solution:**
- Limit search radius
- Use hierarchical algorithms
- GPU acceleration
- Approximate methods (sector-based)

---

## 8. Extension: Cumulative Viewshed

**Multiple observers:** Which areas are visible from ≥ k observers?

**Applications:**
- **Surveillance networks:** Ensure double coverage
- **Tourism:** Scenic viewpoints (visible from multiple spots)
- **Privacy:** Areas visible from many locations (lack privacy)

**Algorithm:**

```
cumulative_viewshed = zeros(rows, cols)

for each observer location:
    viewshed = compute_viewshed(observer)
    cumulative_viewshed += viewshed

# Result: count of observers that can see each cell
```

**Query:** Find cells visible from ≥ 3 observers:

```
high_visibility = (cumulative_viewshed >= 3)
```

---

## 9. Math Refresher: Ray-Plane Intersection

### Parametric Ray

**Ray from point $O$ in direction $\mathbf{d}$:**

$$\mathbf{r}(t) = O + t\mathbf{d}, \quad t \geq 0$$

**Components:**

$$x(t) = x_0 + t d_x$$
$$y(t) = y_0 + t d_y$$
$$z(t) = z_0 + t d_z$$

### Intersection with Terrain

**Terrain surface:** $z = f(x, y)$ (DEM function)

**Intersection:** Solve $z(t) = f(x(t), y(t))$

**For simple case (linear terrain segment):**

$$z_0 + t(z_1 - z_0) = z_{\text{terrain}}$$

$$t = \frac{z_{\text{terrain}} - z_0}{z_1 - z_0}$$

**If $0 < t < 1$:** Ray intersects terrain → blocked  
**If $t < 0$ or $t > 1$:** No intersection → clear

### Elevation Angle

**From observer $O$ at height $z_0$ to target at distance $d$ and height $z_1$:**

$$\alpha = \arctan\left(\frac{z_1 - z_0}{d}\right)$$

**Positive angle:** Target above observer  
**Negative angle:** Target below observer  
**Zero angle:** Same elevation

---

## Summary

- **Viewshed** determines which terrain cells are visible from an observer
- **Line-of-sight** exists if sightline doesn't intersect intervening terrain
- **Observer/target height** added to ground elevation for total elevation
- **Efficient algorithm** uses elevation angles and horizon tracking (O(n²))
- **Radial sweep** processes cells outward, tracking maximum angle in each direction
- **Applications:** Cell towers, fire detection, visual impact, military surveillance
- **Challenges:** Earth curvature, atmospheric refraction, DEM resolution, computation cost
- **Cumulative viewshed** combines multiple observers to find coverage/overlap
- Small height differences (tower height) dramatically affect visibility
- Critical for telecommunications, emergency response, and spatial planning

**Next:** In Essay 37, we build on terrain analysis with **cost-distance and least-cost paths**—finding optimal routes across variable terrain using accumulated cost surfaces!

---
