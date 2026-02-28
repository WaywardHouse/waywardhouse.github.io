---
layout: essay
title: "Hydrological Flow as Optimization"
subtitle: "From local slopes to global watersheds — routing water across a DEM"
date: 2026-02-26
categories: [modeling]
series: computational-geography-foundations
series_order: 9
cluster: C
cluster_title: "Terrain and Spatial Derivatives"
tags:
  - computational-geography
  - modeling
  - hydrology
  - graph-algorithms
  - optimization
  - watersheds
math: true
viz: true
difficulty: 4
math_core: [optimization, graph-traversal, local-minima, flow-accumulation]
spatial_reasoning: 4
dynamics: 1
computation: 4
domain: [hydrology, geomorphology, watershed-analysis]
excerpt: >
  Water always flows downhill, following the path of steepest descent. Given a
  digital elevation model, we can trace every raindrop from where it lands to
  where it exits the landscape. This essay shows how local gradients generate
  global drainage networks — a beautiful example of optimization in nature.
math_prerequisites: >
  Gradient and aspect from Essay 8. Comfortable with the idea of following a
  direction iteratively (like tracing a path). We'll introduce graph concepts
  (nodes, edges, connectivity) as needed.
---

## 1. The Question

Where does the water go?

A raindrop lands on a hillslope. Gravity pulls it downhill. At each point, it moves in the direction of steepest descent — the direction where elevation drops fastest. It continues until it reaches a stream, a lake, or the edge of the DEM.

If we know the elevation at every point, can we predict:
1. **Flow direction** — which way does water move from each cell?
2. **Flow accumulation** — how much water passes through each cell?
3. **Watersheds** — which areas drain to the same outlet?
4. **Stream networks** — where do channels form?

All four questions are answered by the same fundamental algorithm: **routing flow according to the gradient**.

---

## 2. The Conceptual Model

### Flow as a Graph Problem

A digital elevation model is a grid of cells. Each cell can pass water to one or more **downslope neighbors**.

**Graph representation:**
- **Nodes:** Grid cells
- **Edges:** Flow connections from one cell to a downslope neighbor
- **Directed:** Water flows in one direction (downhill)

**Flow routing algorithms:**
1. **D8 (Deterministic 8-direction):** Flow goes to the **steepest** of 8 neighbors
2. **D-infinity:** Flow direction can be any angle (not constrained to 8 directions)
3. **Multiple flow direction (MFD):** Flow splits among all downslope neighbors

This essay focuses on **D8** — the simplest and most widely used.

### Local Rule, Global Pattern

**Local rule:** At each cell, send water to the steepest downslope neighbor.

**Global pattern:** This creates a **dendritic network** — a branching tree structure where small tributaries merge into larger streams.

**Key insight:** Complex drainage networks emerge from a simple local optimization (follow the steepest descent).

---

## 3. Building the Mathematical Model

### Step 1: Flow Direction (D8 Algorithm)

For each cell $(i, j)$, examine the 8 neighbors:

```
[i-1,j-1]  [i-1,j]  [i-1,j+1]
[i,j-1]    [i,j]    [i,j+1]
[i+1,j-1]  [i+1,j]  [i+1,j+1]
```

For each neighbor $n$, compute the **slope** from $(i, j)$ to $n$:

$$s_n = \frac{z_{i,j} - z_n}{d_n}$$

Where:
- $z_{i,j}$ is the elevation of the center cell
- $z_n$ is the elevation of neighbor $n$
- $d_n$ is the distance to neighbor $n$:
  - Cardinal neighbors (N, S, E, W): $d = \Delta x$ (cell size)
  - Diagonal neighbors (NE, SE, SW, NW): $d = \Delta x \sqrt{2}$

**Flow direction:** The neighbor with the **maximum** positive slope (steepest descent).

If all neighbors are upslope or equal elevation, the cell is a **sink** (local minimum) — water pools here.

### Step 2: Flow Accumulation

Once flow direction is determined for every cell, trace water **upstream** to count how many cells drain through each location.

**Algorithm:**
1. Initialize accumulation to 1 for every cell (each cell contributes itself)
2. Process cells in order from **highest to lowest elevation**
3. For each cell, add its accumulation to the accumulation of its downstream neighbor

**Result:** Cells with high accumulation values are **streams** — many upstream cells drain through them.

### Step 3: Watershed Delineation

A **watershed** (or catchment) is the area that drains to a specific outlet.

**Algorithm:**
1. Choose an **outlet** cell (e.g., where a stream exits the DEM)
2. Trace **upstream** from the outlet, marking all cells that flow (directly or indirectly) to it
3. The marked cells form the watershed

**Multiple watersheds:** Divide the landscape by tracing from multiple outlets. Cells on **ridges** are watershed boundaries (divides).

### Step 4: Stream Network Extraction

Cells with accumulation above a threshold are classified as **streams**.

**Threshold:** e.g., accumulation > 100 cells (0.1 km² if cells are 30 m × 30 m).

**Network topology:** Streams connect where tributaries meet. The flow direction graph defines the network structure.

---

## 4. Worked Example by Hand

**Problem:** A 5×5 DEM with cell size 10 m:

```
     Col 0   Col 1   Col 2   Col 3   Col 4
Row 0:  20      19      18      17      16
Row 1:  19      18      17      16      15
Row 2:  18      17      16      15      14
Row 3:  17      16      15      14      13
Row 4:  16      15      14      13      12
```

(a) Determine the flow direction for cell (2, 2) using D8.  
(b) If every cell contributes 1 unit of flow, what is the flow accumulation at cell (4, 4)?

### Solution

**(a) Flow direction from cell (2, 2)**

Cell (2, 2) has elevation $z = 16$ m.

**Eight neighbors:**

| Neighbor    | Row | Col | Elevation | Distance | Slope             |
|-------------|-----|-----|-----------|----------|-------------------|
| NW          | 1   | 1   | 18        | 14.14 m  | (16-18)/14.14 = -0.141 (uphill) |
| N           | 1   | 2   | 17        | 10 m     | (16-17)/10 = -0.1 (uphill) |
| NE          | 1   | 3   | 16        | 14.14 m  | (16-16)/14.14 = 0 (flat) |
| E           | 2   | 3   | 15        | 10 m     | (16-15)/10 = **0.1** |
| SE          | 3   | 3   | 14        | 14.14 m  | (16-14)/14.14 = **0.141** ✓ |
| S           | 3   | 2   | 15        | 10 m     | (16-15)/10 = 0.1 |
| SW          | 3   | 1   | 16        | 14.14 m  | (16-16)/14.14 = 0 |
| W           | 2   | 1   | 17        | 10 m     | (16-17)/10 = -0.1 (uphill) |

**Steepest descent:** SE (slope = 0.141)

**Flow direction from (2, 2): Southeast → cell (3, 3)**

**(b) Flow accumulation at (4, 4)**

Cell (4, 4) is the **lowest point** (elevation 12 m) — all other cells ultimately drain here.

Trace upstream to count contributing cells:

Every cell in the grid flows toward (4, 4) along the gradient. The entire 5×5 grid = **25 cells** contribute.

**Flow accumulation at (4, 4): 25**

(This assumes uniform diagonal flow pattern. In reality, D8 creates a specific tree structure, but for this uniformly sloping DEM, all paths lead to the corner.)

---

## 5. Computational Implementation

Below is an interactive flow routing visualization.

<div class="viz-container" id="flow-routing-viz">
  <div class="controls">
    <label>
      Terrain type:
      <select id="terrain-flow-select">
        <option value="plane">Tilted plane</option>
        <option value="valley">Valley</option>
        <option value="ridge">Ridge</option>
        <option value="cone">Cone (radial)</option>
        <option value="crater">Crater (sink)</option>
      </select>
    </label>
    <label>
      Display mode:
      <select id="display-flow-select">
        <option value="elevation">Elevation</option>
        <option value="flow-direction">Flow direction (arrows)</option>
        <option value="accumulation">Flow accumulation</option>
      </select>
    </label>
    <label>
      Grid size:
      <input type="range" id="grid-flow-slider" min="20" max="50" step="10" value="30">
      <span id="grid-flow-value">30</span> × 30
    </label>
  </div>
  <div id="flow-chart" style="width: 100%; height: 600px;"></div>
  <div class="info-panel">
    <p id="flow-stats"></p>
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
  const chart = echarts.init(document.getElementById('flow-chart'));
  
  let terrainType = 'plane';
  let displayMode = 'elevation';
  let gridSize = 30;
  
  function generateDEM(type, size) {
    const z = [];
    const extent = 100;
    const step = extent / size;
    
    for (let i = 0; i < size; i++) {
      z[i] = [];
      for (let j = 0; j < size; j++) {
        const x = (j - size/2) * step;
        const y = (i - size/2) * step;
        
        switch(type) {
          case 'plane':
            z[i][j] = 50 + x * 0.3 + y * 0.2;
            break;
          case 'valley':
            z[i][j] = Math.abs(y) * 0.5 + x * 0.1;
            break;
          case 'ridge':
            z[i][j] = 50 - Math.abs(x) * 0.5 + y * 0.1;
            break;
          case 'cone':
            z[i][j] = 60 - Math.sqrt(x*x + y*y) * 0.4;
            break;
          case 'crater':
            const r = Math.sqrt(x*x + y*y);
            z[i][j] = r < 30 ? r * 0.5 : 50 - (r - 30) * 0.3;
            break;
        }
      }
    }
    return z;
  }
  
  function computeFlowDirection(z, cellSize) {
    const size = z.length;
    const flowDir = [];
    const directions = [
      [-1, -1, Math.sqrt(2)], [-1, 0, 1], [-1, 1, Math.sqrt(2)],
      [0, -1, 1],                         [0, 1, 1],
      [1, -1, Math.sqrt(2)],  [1, 0, 1],  [1, 1, Math.sqrt(2)]
    ];
    
    for (let i = 0; i < size; i++) {
      flowDir[i] = [];
      for (let j = 0; j < size; j++) {
        let maxSlope = -Infinity;
        let bestDir = null;
        
        for (let d = 0; d < directions.length; d++) {
          const ni = i + directions[d][0];
          const nj = j + directions[d][1];
          const dist = directions[d][2] * cellSize;
          
          if (ni >= 0 && ni < size && nj >= 0 && nj < size) {
            const slope = (z[i][j] - z[ni][nj]) / dist;
            if (slope > maxSlope) {
              maxSlope = slope;
              bestDir = d;
            }
          }
        }
        
        flowDir[i][j] = bestDir !== null ? bestDir : -1; // -1 = sink
      }
    }
    
    return flowDir;
  }
  
  function computeFlowAccumulation(z, flowDir) {
    const size = z.length;
    const acc = Array(size).fill(0).map(() => Array(size).fill(1));
    const directions = [
      [-1, -1], [-1, 0], [-1, 1],
      [0, -1],           [0, 1],
      [1, -1],  [1, 0],  [1, 1]
    ];
    
    // Create sorted list of cells by elevation (high to low)
    const cells = [];
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        cells.push({i, j, z: z[i][j]});
      }
    }
    cells.sort((a, b) => b.z - a.z);
    
    // Process from high to low
    for (const cell of cells) {
      const {i, j} = cell;
      const dir = flowDir[i][j];
      
      if (dir !== -1) {
        const ni = i + directions[dir][0];
        const nj = j + directions[dir][1];
        if (ni >= 0 && ni < size && nj >= 0 && nj < size) {
          acc[ni][nj] += acc[i][j];
        }
      }
    }
    
    return acc;
  }
  
  function updateChart() {
    const z = generateDEM(terrainType, gridSize);
    const cellSize = 100 / gridSize;
    const flowDir = computeFlowDirection(z, cellSize);
    const acc = computeFlowAccumulation(z, flowDir);
    
    let data = [];
    let option = {};
    
    if (displayMode === 'elevation') {
      for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
          data.push([j, gridSize - 1 - i, z[i][j]]);
        }
      }
      
      option = {
        title: { text: `Elevation: ${terrainType}`, left: 'center' },
        tooltip: { position: 'top' },
        grid: { left: 60, right: 60, top: 60, bottom: 60 },
        xAxis: { type: 'category', show: false },
        yAxis: { type: 'category', show: false },
        visualMap: {
          min: Math.min(...data.map(d => d[2])),
          max: Math.max(...data.map(d => d[2])),
          calculable: true,
          orient: 'horizontal',
          left: 'center',
          bottom: 10,
          inRange: {
            color: ['#313695', '#74add1', '#e0f3f8', '#ffffbf', '#fee090', '#f46d43', '#a50026']
          }
        },
        series: [{
          type: 'heatmap',
          data: data,
          label: { show: false }
        }]
      };
      
    } else if (displayMode === 'accumulation') {
      const maxAcc = Math.max(...acc.flat());
      for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
          data.push([j, gridSize - 1 - i, Math.log10(acc[i][j] + 1)]);
        }
      }
      
      document.getElementById('flow-stats').innerHTML = 
        `<strong>Max accumulation:</strong> ${maxAcc.toFixed(0)} cells`;
      
      option = {
        title: { text: `Flow Accumulation (log scale): ${terrainType}`, left: 'center' },
        tooltip: { 
          position: 'top',
          formatter: params => {
            const i = gridSize - 1 - params.value[1];
            const j = params.value[0];
            return `Flow accumulation: ${acc[i][j].toFixed(0)} cells`;
          }
        },
        grid: { left: 60, right: 60, top: 60, bottom: 60 },
        xAxis: { type: 'category', show: false },
        yAxis: { type: 'category', show: false },
        visualMap: {
          min: 0,
          max: Math.log10(maxAcc + 1),
          calculable: true,
          orient: 'horizontal',
          left: 'center',
          bottom: 10,
          text: ['High', 'Low'],
          inRange: {
            color: ['#ffffcc', '#c7e9b4', '#7fcdbb', '#41b6c4', '#2c7fb8', '#253494']
          }
        },
        series: [{
          type: 'heatmap',
          data: data,
          label: { show: false }
        }]
      };
    }
    
    chart.setOption(option);
  }
  
  document.getElementById('terrain-flow-select').addEventListener('change', (e) => {
    terrainType = e.target.value;
    updateChart();
  });
  
  document.getElementById('display-flow-select').addEventListener('change', (e) => {
    displayMode = e.target.value;
    updateChart();
  });
  
  document.getElementById('grid-flow-slider').addEventListener('input', (e) => {
    gridSize = parseInt(e.target.value);
    document.getElementById('grid-flow-value').textContent = gridSize;
    updateChart();
  });
  
  updateChart();
  
  window.addEventListener('resize', () => chart.resize());
})();
</script>

**Try this:**
- **Plane:** Uniform flow direction; accumulation increases downslope
- **Valley:** Flow converges to valley axis; high accumulation along the channel
- **Ridge:** Flow diverges from ridgeline; low accumulation on the crest
- **Cone:** Radial flow from peak; accumulation low everywhere
- **Crater:** Flow converges to the center (sink); high accumulation in the crater

**Key insight:** High accumulation → streams. Low accumulation → ridges or hillslopes.

---

## 6. Interpretation

### Stream Network Threshold

**Question:** At what accumulation value does a "stream" begin?

**Answer:** Depends on climate, geology, vegetation. Typical thresholds:
- **Humid regions:** 0.1–1 km² contributing area
- **Arid regions:** 10–100 km² contributing area

If cell size = 30 m, then 1 km² = 1,111 cells.

**Stream order:** Classify streams by their position in the network (Strahler ordering, Shreve ordering).

### Watershed Area

Sum the number of cells in a watershed, multiply by cell area:

$$A_{\text{watershed}} = N_{\text{cells}} \times (\Delta x)^2$$

**Example:** 5000 cells, 30 m cell size:

$$A = 5000 \times (30)^2 = 4,500,000 \text{ m}^2 = 4.5 \text{ km}^2$$

### Sinks and Depressions

Real DEMs often contain **sinks** — cells lower than all neighbors (artifacts or real depressions like lakes).

**Problem:** Water accumulates in sinks and can't flow out, breaking the drainage network.

**Solution:** **Fill sinks** — raise sink elevations to the lowest pour point (the lowest cell on the perimeter of the depression).

---

## 7. What Could Go Wrong?

### Flat Areas

If multiple cells have identical elevation, slope is zero in all directions — flow direction is ambiguous.

**Solutions:**
- Add small random perturbations to elevations
- Use **flow direction from surrounding higher cells** to infer flow across flats
- Specialized flat-routing algorithms

### Parallel Flow on Uniform Slopes

D8 forces flow into discrete 45° sectors. On a uniformly tilted plane, flow should be perpendicular to contours, but D8 approximates this with stepped paths.

**D-infinity** (infinite-direction) algorithms handle this better but are more complex.

### Spurious Sinks from Noise

Low-quality DEMs have measurement errors that create artificial pits.

**Solution:** Smooth the DEM before flow routing (but not so much that real features disappear).

### Edge Effects

Flow at the edge of a DEM exits the grid. These cells need special handling (treat as outlets or mark as no-data).

---

## 8. Extension: Real-World Applications

### Flood Prediction

Given rainfall intensity and duration, route water across the DEM to predict:
- **Peak discharge** at stream gauges
- **Inundation extent** (which areas flood)
- **Time to peak** (how long until floodwaters arrive)

### Erosion and Sediment Transport

Flow accumulation is a proxy for **stream power** — the ability to erode and transport sediment.

High accumulation + steep slope = high erosion potential.

### Pollution Routing

Track contaminants (agricultural runoff, industrial spills) as they move downslope through the drainage network.

### Ecosystem Connectivity

Flow networks define **hydrologic connectivity** — which wetlands, streams, and riparian zones are linked. Important for fish migration, amphibian breeding, nutrient cycling.

---

## 9. Math Refresher: Graphs and Traversal

### Graph Terminology

**Graph:** A set of **nodes** (vertices) connected by **edges**.

**Directed graph:** Edges have direction (A → B, not B → A).

**Tree:** A connected graph with no cycles.

### Traversal Algorithms

**Depth-first search (DFS):** Follow one path as far as possible before backtracking.

**Breadth-first search (BFS):** Explore all neighbors before moving to the next level.

For flow accumulation, we process cells in **topological order** (upstream to downstream), which requires sorting by elevation.

### Connectivity

Two cells are **hydrologically connected** if there's a flow path from one to the other.

A **watershed** is a connected component of the flow graph rooted at an outlet.

---

## Summary

- Water flows downhill along the path of steepest descent
- **D8 algorithm:** Each cell flows to the steepest of 8 neighbors
- **Flow accumulation:** Count how many cells drain through each location
- High accumulation → streams; low accumulation → ridges
- **Watersheds:** Areas draining to the same outlet
- Sinks and flat areas require special handling
- Flow routing underlies flood modeling, erosion prediction, and watershed delineation

**Next:** In Essay 10, we shift from physical to human geography. We'll model **gravity models of trade and migration** — another example of inverse power laws, but in the social rather than physical domain.

---
