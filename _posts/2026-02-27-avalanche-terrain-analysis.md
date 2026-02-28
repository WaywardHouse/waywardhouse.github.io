---
layout: essay
title: "Avalanche Terrain Analysis"
subtitle: "Identifying where and when avalanches are likely"
date: 2026-02-27
categories: [modeling]
series: computational-geography-cryosphere
series_order: 4
cluster: P
cluster_title: "Snow Physics & Modeling"
tags:
  - computational-geography
  - modeling
  - cryosphere
  - avalanche
  - slope-analysis
  - hazard-assessment
  - terrain
  - safety
math: true
viz: true
difficulty: 4
math_core: [slope-analysis, terrain-classification, hazard-modeling, probability]
spatial_reasoning: 5
dynamics: 2
computation: 3
domain: [avalanche-science, terrain-analysis, hazard-assessment, recreation]
excerpt: >
  Which slopes are dangerous? Where should backcountry routes go? Avalanche terrain
  analysis combines slope angle, aspect, elevation, and terrain shape to identify
  avalanche-prone areas. This essay derives slope thresholds, implements terrain
  classification systems (ATES), and shows how to map runout zones using DEM analysis.
math_prerequisites: >
  Terrain analysis (Essays 7-9, 36-38). Slope and aspect calculation. We'll introduce
  avalanche mechanics and terrain classification from safety perspectives.
---

## 1. The Question

Is this slope safe to ski, or will it avalanche?

**Avalanche terrain analysis** identifies hazardous areas based on:

**Terrain factors (unchanging):**
- Slope angle (30-45° = avalanche terrain)
- Aspect (wind loading, solar exposure)
- Elevation (snowpack depth/stability varies)
- Terrain shape (convex vs. concave)
- Anchors (trees, rocks that hold snow)

**Snowpack factors (time-varying):**
- Recent snowfall (loading)
- Wind (slab formation)
- Temperature (weak layer formation)
- Layer structure (buried weak layers)

**Human factors:**
- Route choice
- Group management
- Decision-making

The mathematical question: Given a DEM and snowpack conditions, how do we classify terrain by avalanche risk and predict where avalanches might run?

---

## 2. The Conceptual Model

### Critical Slope Angles

**Avalanche release zones:**

$$\theta_{\text{start}} = 30-45°$$

**Why this range?**

**Below 30°:** Snow doesn't slide (friction too high)  
**30-35°:** Common for wet loose avalanches  
**35-40°:** Peak slab avalanche frequency  
**40-45°:** Still avalanche, but less snow accumulates (sloughs off)  
**Above 50°:** Too steep to hold deep snowpack

**Most dangerous:** 38° (statistically most fatal avalanches)

### Avalanche Types

**1. Loose Snow Avalanche (Sluff)**
- Point release, fan-shaped
- Surface snow only
- Low danger unless terrain trap

**2. Slab Avalanche**
- Cohesive layer breaks as unit
- Wide fracture line
- **Most deadly** (accounts for 90% of fatalities)
- Requires weak layer beneath slab

**3. Wet Avalanche**
- Warm temperatures or rain
- Full-depth release (to ground)
- Heavy, destructive

### ATES Classification

**Avalanche Terrain Exposure Scale:**

**Simple:**
- Primarily < 30° slopes
- Some avalanche terrain nearby
- Multiple route options
- **Risk:** Low

**Challenging:**
- 30-35° slopes common
- Exposure to avalanche paths
- Limited route options
- **Risk:** Moderate

**Complex:**
- Multiple 35-45° slopes
- Overhead hazard (terrain traps below steep slopes)
- Few safe zones
- **Risk:** High

---

## 3. Building the Mathematical Model

### Slope Angle from DEM

**Gradient magnitude (from Essay 8):**

$$|\nabla z| = \sqrt{\left(\frac{\partial z}{\partial x}\right)^2 + \left(\frac{\partial z}{\partial y}\right)^2}$$

**Slope angle:**

$$\theta = \arctan(|\nabla z|)$$

**In degrees:**

$$\theta = \arctan(|\nabla z|) \times \frac{180}{\pi}$$

**Finite difference (3×3 window):**

$$\frac{\partial z}{\partial x} \approx \frac{(z_{i,j+1} - z_{i,j-1})}{2\Delta x}$$

$$\frac{\partial z}{\partial y} \approx \frac{(z_{i+1,j} - z_{i-1,j})}{2\Delta y}$$

### Avalanche Hazard Classification

**Based on slope angle:**

$$\text{Hazard} = \begin{cases}
\text{Non-avalanche} & \theta < 30° \\
\text{Low hazard} & 30° \leq \theta < 35° \\
\text{Moderate hazard} & 35° \leq \theta < 40° \\
\text{High hazard} & 40° \leq \theta < 45° \\
\text{Extreme steep} & \theta \geq 45°
\end{cases}$$

### Alpha Angle (Runout)

**Maximum runout distance:**

**Alpha angle** from avalanche start to stop:

$$\alpha = \arctan\left(\frac{z_{\text{start}} - z_{\text{stop}}}{d_{\text{horizontal}}}\right)$$

**Empirical:**
- Small avalanches: $\alpha \approx 28-30°$
- Medium avalanches: $\alpha \approx 25-27°$
- Large avalanches: $\alpha \approx 18-22°$

**Runout zone:** All terrain downslope from start zone where $\alpha > \alpha_{\text{threshold}}$

**Example:** Avalanche starts at 3000m elevation
- Alpha = 25°
- Stop when: $\arctan(\Delta z / d) = 25°$
- If horizontal distance 1000m: $\Delta z = 1000 \times \tan(25°) = 466$ m
- Stops at: 3000 - 466 = **2534m elevation**

### Terrain Traps

**Features that increase consequence:**

**Gullies/Couloirs:**
- Funneling effect (deep debris)
- Burial depth increases
- Hard to escape

**Cliffs:**
- Trauma risk
- Carried over cliff by avalanche

**Trees (dense):**
- Trauma from impact
- Difficult rescue

**Flat areas below steep slopes:**
- Appears safe but runout zone
- "Terrain trap"

**Risk multiplication:**

$$R_{\text{total}} = P_{\text{avalanche}} \times C_{\text{terrain trap}}$$

Where $C > 1$ for terrain traps (amplifies consequence).

---

## 4. Worked Example by Hand

**Problem:** Classify avalanche terrain for ski route planning.

**DEM elevations (meters, 30m cell size):**

```
      j=0   j=1   j=2   j=3   j=4
i=0  2900  2880  2850  2810  2760
i=1  2920  2900  2870  2820  2770
i=2  2940  2920  2890  2840  2790
i=3  2960  2940  2910  2860  2810
```

Calculate slope angle at cell (1,1).

### Solution

**Step 1: Finite differences**

At (1,1):

$$\frac{\partial z}{\partial x} \approx \frac{z[1,2] - z[1,0]}{2 \times 30} = \frac{2870 - 2920}{60} = \frac{-50}{60} = -0.833$$

$$\frac{\partial z}{\partial y} \approx \frac{z[2,1] - z[0,1]}{2 \times 30} = \frac{2920 - 2880}{60} = \frac{40}{60} = 0.667$$

**Step 2: Gradient magnitude**

$$|\nabla z| = \sqrt{(-0.833)^2 + (0.667)^2} = \sqrt{0.694 + 0.445} = \sqrt{1.139} = 1.067$$

**Step 3: Slope angle**

$$\theta = \arctan(1.067) = 46.9° \times \frac{180}{\pi} = 46.9°$$

**Wait, that's too high. Recalculate:**

$$\theta = \arctan(1.067) \text{ radians} = 0.818 \text{ rad}$$

$$\theta = 0.818 \times \frac{180}{\pi} = 46.9°$$

Actually this is correct! The slope is **46.9°** - **extremely steep, minimal snow accumulation**.

**Step 4: Classification**

$\theta = 46.9° > 45°$ → **Extreme steep**

**Interpretation:** This slope is:
- Too steep for most slab avalanches (snow sloughs off)
- Potential loose snow avalanches
- **Not** prime avalanche terrain (not enough snow accumulates)
- But dangerous for climbing/skiing (rockfall, sluffs)

**Step 5: Calculate for (2,2) as well**

$$\frac{\partial z}{\partial x} = \frac{2840 - 2940}{60} = -1.667$$

$$\frac{\partial z}{\partial y} = \frac{2910 - 2870}{60} = 0.667$$

$$|\nabla z| = \sqrt{2.778 + 0.445} = 1.796$$

$$\theta = \arctan(1.796) = 60.9°$$

**Extremely steep cliff!**

---

## 5. Computational Implementation

Below is an interactive avalanche terrain classifier.

<div class="viz-container" id="ava-terrain-viz">
  <div class="controls">
    <label>
      Terrain complexity:
      <select id="terrain-type">
        <option value="simple">Simple (rolling terrain)</option>
        <option value="moderate" selected>Moderate (varied slopes)</option>
        <option value="complex">Complex (steep alpine)</option>
      </select>
    </label>
    <label>
      Show hazard zones only:
      <input type="checkbox" id="show-hazard-only">
    </label>
    <label>
      Show aspect:
      <input type="checkbox" id="show-aspect">
    </label>
    <div class="ava-info">
      <p><strong>Hazard distribution:</strong></p>
      <p>Non-avalanche: <span id="pct-safe">--</span>%</p>
      <p>Avalanche terrain: <span id="pct-hazard">--</span>%</p>
      <p>Extreme steep: <span id="pct-extreme">--</span>%</p>
    </div>
  </div>
  <div id="ava-terrain-canvas-container">
    <canvas id="ava-terrain-canvas" width="700" height="350" style="border: 1px solid #ddd;"></canvas>
  </div>
  <div class="legend">
    <p><strong>Colors:</strong> 
      <span style="color: #2E7D32">■ Safe (&lt;30°)</span>
      <span style="color: #F57F17">■ Low (30-35°)</span>
      <span style="color: #E64A19">■ Moderate (35-40°)</span>
      <span style="color: #B71C1C">■ High (40-45°)</span>
      <span style="color: #4A148C">■ Extreme (&gt;45°)</span>
    </p>
  </div>
</div>

<script type="module">
(function() {
  const canvas = document.getElementById('ava-terrain-canvas');
  const ctx = canvas.getContext('2d');
  
  let terrainType = 'moderate';
  let showHazardOnly = false;
  let showAspect = false;
  
  const size = 50;
  const cellSize = 7;
  
  function generateTerrain(type) {
    const dem = [];
    
    for (let i = 0; i < size; i++) {
      const row = [];
      for (let j = 0; j < size; j++) {
        let elev;
        
        if (type === 'simple') {
          // Gentle rolling terrain
          elev = 2500 - i * 5 + Math.sin(j / 8) * 50;
        } else if (type === 'moderate') {
          // Ridge with gullies
          const ridgeEffect = Math.abs(j - size/2) < 10 ? 200 : 0;
          elev = 2800 - i * 10 + ridgeEffect + Math.sin(j / 5) * 80;
        } else {
          // Complex alpine
          const peakDist = Math.sqrt((i - size/3)**2 + (j - size/2)**2);
          elev = 3000 - peakDist * 8 + Math.cos(i / 3) * 100;
        }
        
        row.push(elev);
      }
      dem.push(row);
    }
    
    return dem;
  }
  
  function calculateSlope(dem, i, j) {
    if (i === 0 || i === size-1 || j === 0 || j === size-1) {
      return 0; // Edge cells
    }
    
    const dzdx = (dem[i][j+1] - dem[i][j-1]) / (2 * cellSize);
    const dzdy = (dem[i+1][j] - dem[i-1][j]) / (2 * cellSize);
    
    const gradient = Math.sqrt(dzdx**2 + dzdy**2);
    const slopeDeg = Math.atan(gradient) * 180 / Math.PI;
    
    return slopeDeg;
  }
  
  function calculateAspect(dem, i, j) {
    if (i === 0 || i === size-1 || j === 0 || j === size-1) {
      return 0;
    }
    
    const dzdx = (dem[i][j+1] - dem[i][j-1]) / (2 * cellSize);
    const dzdy = (dem[i+1][j] - dem[i-1][j]) / (2 * cellSize);
    
    let aspect = Math.atan2(dzdy, -dzdx) * 180 / Math.PI;
    if (aspect < 0) aspect += 360;
    
    return aspect;
  }
  
  function classifyHazard(slope) {
    if (slope < 30) return 0;
    if (slope < 35) return 1;
    if (slope < 40) return 2;
    if (slope < 45) return 3;
    return 4;
  }
  
  function getHazardColor(hazard) {
    const colors = [
      '#2E7D32', // Safe
      '#F57F17', // Low
      '#E64A19', // Moderate
      '#B71C1C', // High
      '#4A148C'  // Extreme
    ];
    return colors[hazard];
  }
  
  function getAspectColor(aspect) {
    // North = blue, South = red, East/West = yellow/green
    const hue = aspect;
    return `hsl(${hue}, 70%, 50%)`;
  }
  
  function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const dem = generateTerrain(terrainType);
    
    let counts = [0, 0, 0, 0, 0];
    
    // Left panel: Slope/Hazard
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        const slope = calculateSlope(dem, i, j);
        const hazard = classifyHazard(slope);
        
        counts[hazard]++;
        
        if (showHazardOnly && hazard === 0) {
          ctx.fillStyle = '#EEEEEE';
        } else {
          ctx.fillStyle = getHazardColor(hazard);
        }
        
        ctx.fillRect(10 + j * cellSize, 10 + i * cellSize, cellSize, cellSize);
      }
    }
    
    // Right panel: Aspect (if enabled)
    if (showAspect) {
      for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
          const aspect = calculateAspect(dem, i, j);
          const slope = calculateSlope(dem, i, j);
          
          if (slope >= 30) {
            ctx.fillStyle = getAspectColor(aspect);
          } else {
            ctx.fillStyle = '#BDBDBD';
          }
          
          ctx.fillRect(10 + size * cellSize + 20 + j * cellSize, 
                      10 + i * cellSize, cellSize, cellSize);
        }
      }
      
      // Label
      ctx.fillStyle = '#2C3E50';
      ctx.font = 'bold 12px sans-serif';
      ctx.fillText('Slope Hazard', 15, size * cellSize + 30);
      ctx.fillText('Aspect (>30°)', 10 + size * cellSize + 25, size * cellSize + 30);
    } else {
      ctx.fillStyle = '#2C3E50';
      ctx.font = 'bold 12px sans-serif';
      ctx.fillText('Avalanche Terrain Classification', 15, size * cellSize + 30);
    }
    
    // Statistics
    const total = counts.reduce((a, b) => a + b, 0);
    const pctSafe = (counts[0] / total * 100).toFixed(1);
    const pctHazard = ((counts[1] + counts[2] + counts[3]) / total * 100).toFixed(1);
    const pctExtreme = (counts[4] / total * 100).toFixed(1);
    
    document.getElementById('pct-safe').textContent = pctSafe;
    document.getElementById('pct-hazard').textContent = pctHazard;
    document.getElementById('pct-extreme').textContent = pctExtreme;
  }
  
  document.getElementById('terrain-type').addEventListener('change', (e) => {
    terrainType = e.target.value;
    render();
  });
  
  document.getElementById('show-hazard-only').addEventListener('change', (e) => {
    showHazardOnly = e.target.checked;
    render();
  });
  
  document.getElementById('show-aspect').addEventListener('change', (e) => {
    showAspect = e.target.checked;
    render();
  });
  
  render();
})();
</script>

**Try this:**
- **Simple terrain:** Mostly green (safe slopes)
- **Moderate terrain:** Mix of safe and hazard zones
- **Complex alpine:** More red/purple (steep avalanche terrain)
- **Show hazard only:** Gray out safe terrain, highlight danger zones
- **Show aspect:** Right panel shows slope direction (N=blue, S=red, E=yellow)
- **Color code:** Green=safe, Yellow/Orange/Red=avalanche terrain, Purple=extreme
- Notice: Most avalanche terrain clusters in gullies and ridge flanks!

**Key insight:** Terrain classification enables route planning—stay in green zones, minimize time in red zones, avoid terrain traps!

---

## 6. Interpretation

### Route Planning

**Decision matrix:**

| Terrain | Hazard Level | Action |
|---------|--------------|--------|
| Simple (<30°) | Low | Safe travel |
| Challenging (30-35°) | Moderate | Assess snowpack, spacing |
| Complex (35-45°) | High | Expert only, stability tests |
| Extreme (>45°) | Variable | Sluff risk, limited accumulation |

**Spacing:**
- Simple: Group together
- Challenging: 50m spacing
- Complex: One at a time, safe zones

### Aspect Considerations

**North aspects (0-45°, 315-360°):**
- Cold, persistent weak layers
- Longer avalanche season
- **Higher danger** in cold climates

**South aspects (135-225°):**
- Warm, quicker stabilization
- Wet avalanches in spring
- **Lower danger** in winter, **higher** in spring

**East/West (45-135°, 225-315°):**
- Moderate
- Wind effects important

**Lee slopes (downwind):**
- Wind-loaded slabs
- **Very dangerous**

### Avalanche Bulletin Integration

**Danger scale:**
1. Low
2. Moderate
3. Considerable
4. High
5. Extreme

**Terrain selection by danger:**

| Danger | Terrain |
|--------|---------|
| Low | All terrain OK (with normal caution) |
| Moderate | Avoid wind-loaded slopes >35° |
| Considerable | Simple terrain only |
| High | Avoid all avalanche terrain |
| Extreme | Stay home |

---

## 7. What Could Go Wrong?

### DEM Resolution Issues

**Coarse DEM (30m):**
- Misses small gullies (terrain traps)
- Smooths cliffs
- Underestimates slope on convex features

**Example:** 30m DEM shows 35° slope, reality is 42° rollover.

**Solution:** Use highest resolution DEM (1-3m LiDAR ideal).

### Wind Effects Not Captured

**Terrain alone insufficient:**

Wind loads lee slopes with thick slabs.

**Example:**
- West aspect, 38° slope
- Westerly winds → **not** wind-loaded (windward)
- **Lower danger** than expected from slope alone

**vs:**

- East aspect, 38° slope
- Westerly winds → **heavily** wind-loaded (leeward)
- **Higher danger** than expected

**Solution:** Wind models, weather data, field observation.

### Human Factor

**Most avalanche fatalities:**

Victim or group member triggered avalanche (90%+).

**Terrain selection just first step.**

**Also need:**
- Snowpack assessment
- Decision-making skills
- Communication
- Rescue skills

**Terrain analysis ≠ safety guarantee.**

### False Sense of Security

**Green zones below steep slopes = terrain traps.**

**Example:**
- Flat bench at 2500m (10° slope, "safe")
- Above: 600m vertical of 38° terrain
- Runout zone extends to bench
- **Extremely dangerous** despite being "safe" slope angle

**Solution:** Alpha angle runout modeling.

---

## 8. Extension: Avalanche.ca Terrain Ratings

**Canadian system:**

**Simple (Green):**
- Exposure to low-angle or primarily forested terrain
- Some forest openings may involve steeper terrain
- Many options for route finding with overhead hazard minimal
- Avalanche terrain is avoidable

**Challenging (Blue):**
- Exposure to well-defined avalanche paths, starting zones, or terrain traps
- Options exist to reduce or eliminate exposure with careful route finding
- Requires knowledge of avalanche terrain and winter travel skills

**Complex (Black):**
- Exposure to multiple overlapping avalanche paths or large expanses of steep, open terrain
- Multiple avalanche starting zones and terrain traps below
- Minimal options to reduce exposure
- Requires extensive avalanche knowledge and winter travel skills

**Implementation:** Requires expert judgment + terrain analysis.

---

## 9. Math Refresher: Slope Stability

### Mohr-Coulomb Failure

**Shear stress vs. shear strength:**

$$\tau = c + \sigma \tan\phi$$

Where:
- $\tau$ = shear strength
- $c$ = cohesion
- $\sigma$ = normal stress
- $\phi$ = internal friction angle

**On a slope:**

**Driving stress (downslope):**

$$\tau_d = \rho g h \sin\theta$$

**Resisting stress:**

$$\tau_r = c + \rho g h \cos\theta \tan\phi$$

**Failure when:** $\tau_d > \tau_r$

**Factor of safety:**

$$FS = \frac{\tau_r}{\tau_d} = \frac{c + \rho g h \cos\theta \tan\phi}{\rho g h \sin\theta}$$

**Stable:** $FS > 1$  
**Failure:** $FS < 1$

### Critical Slope Angle

**For cohesionless material ($c = 0$):**

$$FS = \frac{\tan\phi}{\tan\theta}$$

**Failure when:** $\theta > \phi$

**Dry snow:** $\phi \approx 30-40°$ → slopes >40° unstable  
**Wet snow:** $\phi \approx 20-30°$ → slopes >30° unstable

**This explains** why avalanches occur on 30-45° slopes!

---

## Summary

- **Avalanche terrain:** 30-45° slopes most dangerous (slab avalanches)
- **ATES classification:** Simple/Challenging/Complex based on exposure and options
- **Slope angle from DEM:** Calculate gradient, convert to degrees via arctan
- **Aspect matters:** North (cold, persistent), South (warm, wet avalanches)
- **Alpha angle:** Predicts runout distance (typically 18-30° from start to stop)
- **Terrain traps:** Gullies, cliffs, trees amplify consequences
- **Route selection:** Minimize time in hazard zones, use safe travel protocols
- **Limitations:** DEM resolution, wind effects, human factors all critical
- **Applications:** Backcountry skiing, snowmobiling, forecasting, infrastructure
- **Multi-factor:** Terrain + snowpack + weather + human = avalanche risk
- Foundation for avalanche safety and terrain-based decision making

---

🎉 **CLUSTER P: SNOW PHYSICS & MODELING - COMPLETE!** 🎉

**Essays 42-45:**
- Snowpack Energy Balance
- Snow Accumulation & Melt Modeling  
- SWE Estimation Methods
- Avalanche Terrain Analysis

**Series 4 Progress: 4 of 10 essays complete!**

---
