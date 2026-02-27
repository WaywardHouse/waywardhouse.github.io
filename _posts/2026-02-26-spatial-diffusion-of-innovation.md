---
layout: essay
title: "Spatial Diffusion of Innovation"
subtitle: "How ideas, diseases, and technologies spread across networks over time"
date: 2026-02-26
categories: [modeling]
series: computational-geography-lab
series_order: 11
cluster: D
cluster_title: "Human Systems as Mathematical Systems"
tags:
  - computational-geography
  - modeling
  - diffusion
  - networks
  - discrete-time
  - human-geography
  - epidemiology
math: true
viz: true
difficulty: 4
math_core: [discrete-time-models, logistic-spread, network-adjacency, contagion]
spatial_reasoning: 3
dynamics: 3
computation: 3
domain: [human-geography, epidemiology, innovation-diffusion, networks]
excerpt: >
  A new technology emerges in one city and spreads to others. A disease outbreak
  starts locally and radiates outward. Both follow spatial diffusion processes —
  they spread through contact, and contact depends on proximity. This essay models
  diffusion as a discrete-time process on a spatial network.
math_prerequisites: >
  Logistic growth (Essay 4). Basic probability (the idea that something happens
  with probability p). Comfortable with iterative updates (next state depends on
  current state). We'll introduce network adjacency conceptually.
---

## 1. The Question

How do innovations spread through a population distributed across space?

A farmer in Iowa adopts hybrid corn in 1935. By 1940, neighboring counties have adopted it. By 1950, it's widespread across the Midwest. By 1960, it's standard practice nationwide.

**Why this pattern?**
1. **Hierarchical diffusion:** Large cities adopt first, then spread to smaller towns (down the urban hierarchy)
2. **Contagious diffusion:** Adoption spreads to nearby locations through social contact and observation

The mathematical question: Can we model both mechanisms — proximity-based contagion and size-based hierarchy — in a single framework?

---

## 2. The Conceptual Model

### Diffusion as a Two-Stage Process

**Stage 1: Who can adopt?**  
Only locations that have **heard about** the innovation can adopt it. Information spreads through:
- **Contact with adopters** (neighbors, trade partners)
- **Media coverage** (proportional to city size or existing adoption)

**Stage 2: Who actually adopts?**  
Among those aware, adoption depends on:
- **Benefits** (economic advantage, social status)
- **Costs** (upfront investment, risk, learning curve)
- **Social pressure** (more adopters → stronger influence)

This creates an **S-curve** (logistic) at each location, but the timing varies spatially.

### Network Structure

Represent locations as **nodes** in a network:
- **Edges** connect locations that can transmit the innovation
- Edge **weights** represent transmission probability (function of distance, trade volume, etc.)

**Adjacency matrix** $A$:
- $A_{ij} = 1$ if locations $i$ and $j$ are connected (neighbors)
- $A_{ij} = 0$ otherwise
- For weighted networks: $A_{ij} = w_{ij}$ (transmission strength)

---

## 3. Building the Mathematical Model

### Simple Contagion Model (SIS-style)

Divide each location's population into:
- **S:** Susceptible (not yet adopted)
- **I:** Adopters (have adopted the innovation)

At each time step $t$:

$$I_{i}(t+1) = I_{i}(t) + \beta \cdot S_{i}(t) \cdot \sum_{j} A_{ij} \frac{I_j(t)}{N_j}$$

Where:
- $I_i(t)$ is the number of adopters in location $i$ at time $t$
- $S_i(t) = N_i - I_i(t)$ is the number of susceptibles
- $N_i$ is the total population of location $i$
- $\beta$ is the **transmission rate** (probability of adoption upon contact)
- $A_{ij}$ is the adjacency weight (contact frequency between $i$ and $j$)

**Interpretation:**  
The change in adopters depends on:
1. How many susceptibles remain ($S_i(t)$)
2. The fraction of adopters in neighboring locations ($I_j(t) / N_j$)
3. How strongly connected the locations are ($A_{ij}$)

### Logistic Growth at Each Location

Once the innovation arrives, adoption within a location often follows a **logistic curve**:

$$\frac{dI_i}{dt} = r_i I_i \left(1 - \frac{I_i}{N_i}\right)$$

But the **start time** of the curve varies — late-arriving locations lag behind.

**Combined model:**  
The innovation spreads between locations via the network (contagion), and within each location via the logistic S-curve (internal diffusion).

### Discrete-Time Update Rule

For computational implementation:

$$I_i(t+1) = I_i(t) + \Delta I_{\text{internal}} + \Delta I_{\text{external}}$$

**Internal diffusion** (logistic within the location):

$$\Delta I_{\text{internal}} = r I_i(t) \left(1 - \frac{I_i(t)}{N_i}\right) \Delta t$$

**External diffusion** (contagion from neighbors):

$$\Delta I_{\text{external}} = \beta (N_i - I_i(t)) \sum_{j} A_{ij} \frac{I_j(t)}{N_j} \Delta t$$

**Constraint:** $I_i(t+1) \leq N_i$ (can't exceed total population)

---

## 4. Worked Example by Hand

**Problem:** Three cities with populations and adjacency:

| City | Population | Initial adopters |
|------|------------|------------------|
| A    | 1000       | 100              |
| B    | 500        | 0                |
| C    | 800        | 0                |

**Adjacency matrix** (binary, undirected):

$$A = \begin{pmatrix}
0 & 1 & 0 \\
1 & 0 & 1 \\
0 & 1 & 0
\end{pmatrix}$$

A is connected to B. B is connected to both A and C. C is connected to B.

Parameters: $\beta = 0.2$ (transmission rate), $r = 0.1$ (internal growth rate), $\Delta t = 1$ year.

Calculate $I_A(1)$, $I_B(1)$, $I_C(1)$ after one time step.

### Solution

**City A (t=1):**

Internal diffusion:

$$\Delta I_{\text{int}, A} = 0.1 \times 100 \times \left(1 - \frac{100}{1000}\right) = 10 \times 0.9 = 9$$

External diffusion (only neighbor is B, which has 0 adopters):

$$\Delta I_{\text{ext}, A} = 0.2 \times 900 \times \left(1 \times \frac{0}{500}\right) = 0$$

$$I_A(1) = 100 + 9 + 0 = 109$$

**City B (t=1):**

Internal diffusion (starts at 0):

$$\Delta I_{\text{int}, B} = 0.1 \times 0 \times \left(1 - \frac{0}{500}\right) = 0$$

External diffusion (neighbors: A with 100/1000, C with 0/800):

$$\Delta I_{\text{ext}, B} = 0.2 \times 500 \times \left(1 \times \frac{100}{1000} + 1 \times \frac{0}{800}\right)$$

$$= 100 \times (0.1 + 0) = 10$$

$$I_B(1) = 0 + 0 + 10 = 10$$

**City C (t=1):**

Internal diffusion:

$$\Delta I_{\text{int}, C} = 0$$

External diffusion (only neighbor is B with 0/500):

$$\Delta I_{\text{ext}, C} = 0.2 \times 800 \times \left(1 \times \frac{0}{500}\right) = 0$$

$$I_C(1) = 0$$

**Summary after 1 year:**
- City A: 109 adopters
- City B: 10 adopters (innovation has **jumped** to B)
- City C: 0 adopters (still waiting)

---

## 5. Computational Implementation

Below is an interactive spatial diffusion simulation.

<div class="viz-container" id="diffusion-viz">
  <div class="controls">
    <label>
      Network type:
      <select id="network-select">
        <option value="grid">Grid (nearest neighbors)</option>
        <option value="hub">Hub-and-spoke</option>
        <option value="random">Random network</option>
        <option value="distance">Distance-weighted</option>
      </select>
    </label>
    <label>
      Transmission rate (β):
      <input type="range" id="beta-slider" min="0.05" max="0.5" step="0.05" value="0.2">
      <span id="beta-value">0.20</span>
    </label>
    <label>
      Internal growth rate (r):
      <input type="range" id="r-diffusion-slider" min="0.05" max="0.3" step="0.05" value="0.1">
      <span id="r-diffusion-value">0.10</span>
    </label>
    <div class="button-group">
      <button id="step-btn">Step Forward</button>
      <button id="play-btn">Play</button>
      <button id="reset-btn">Reset</button>
    </div>
  </div>
  <div id="diffusion-chart" style="width: 100%; height: 500px;"></div>
  <div class="info-panel">
    <p id="diffusion-stats"></p>
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
  const chart = echarts.init(document.getElementById('diffusion-chart'));
  
  let networkType = 'grid';
  let beta = 0.2;
  let r = 0.1;
  let time = 0;
  let playing = false;
  let playInterval = null;
  
  let nodes = [];
  let edges = [];
  let adjacency = [];
  
  function generateNetwork(type) {
    const n = type === 'grid' ? 25 : 15;
    const nodeList = [];
    const edgeList = [];
    const adj = Array(n).fill(0).map(() => Array(n).fill(0));
    
    if (type === 'grid') {
      // 5x5 grid
      for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
          const idx = i * 5 + j;
          nodeList.push({
            name: `${idx}`,
            x: j * 100 + 50,
            y: i * 100 + 50,
            pop: 100,
            adopters: (i === 2 && j === 2) ? 50 : 0,
            category: 0
          });
          
          // Connect to neighbors
          if (j < 4) { // Right
            adj[idx][idx + 1] = 1;
            adj[idx + 1][idx] = 1;
          }
          if (i < 4) { // Down
            adj[idx][idx + 5] = 1;
            adj[idx + 5][idx] = 1;
          }
        }
      }
      
    } else if (type === 'hub') {
      // Hub and spoke
      nodeList.push({name: '0', x: 250, y: 250, pop: 500, adopters: 250, category: 1});
      
      for (let i = 1; i < n; i++) {
        const angle = (i - 1) * 2 * Math.PI / (n - 1);
        nodeList.push({
          name: `${i}`,
          x: 250 + 180 * Math.cos(angle),
          y: 250 + 180 * Math.sin(angle),
          pop: 100,
          adopters: 0,
          category: 0
        });
        adj[0][i] = 1;
        adj[i][0] = 1;
      }
      
    } else if (type === 'random') {
      for (let i = 0; i < n; i++) {
        nodeList.push({
          name: `${i}`,
          x: Math.random() * 450 + 25,
          y: Math.random() * 450 + 25,
          pop: Math.floor(Math.random() * 200) + 50,
          adopters: i === 0 ? 50 : 0,
          category: 0
        });
      }
      // Random edges
      for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
          if (Math.random() < 0.2) {
            adj[i][j] = 1;
            adj[j][i] = 1;
          }
        }
      }
      
    } else if (type === 'distance') {
      for (let i = 0; i < n; i++) {
        nodeList.push({
          name: `${i}`,
          x: Math.random() * 450 + 25,
          y: Math.random() * 450 + 25,
          pop: Math.floor(Math.random() * 200) + 50,
          adopters: i === 0 ? 50 : 0,
          category: 0
        });
      }
      // Distance-weighted edges
      for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
          const d = Math.sqrt((nodeList[i].x - nodeList[j].x)**2 + 
                              (nodeList[i].y - nodeList[j].y)**2);
          if (d < 150) {
            adj[i][j] = Math.max(0.1, 1 - d / 150);
            adj[j][i] = adj[i][j];
          }
        }
      }
    }
    
    // Build edge list for visualization
    for (let i = 0; i < n; i++) {
      for (let j = i + 1; j < n; j++) {
        if (adj[i][j] > 0) {
          edgeList.push({source: `${i}`, target: `${j}`});
        }
      }
    }
    
    return {nodes: nodeList, edges: edgeList, adjacency: adj};
  }
  
  function stepSimulation() {
    const n = nodes.length;
    const newAdopters = nodes.map(node => node.adopters);
    
    for (let i = 0; i < n; i++) {
      const I = nodes[i].adopters;
      const N = nodes[i].pop;
      const S = N - I;
      
      // Internal diffusion
      const deltaInternal = r * I * (1 - I / N);
      
      // External diffusion
      let externalPressure = 0;
      for (let j = 0; j < n; j++) {
        if (adjacency[i][j] > 0) {
          externalPressure += adjacency[i][j] * (nodes[j].adopters / nodes[j].pop);
        }
      }
      const deltaExternal = beta * S * externalPressure;
      
      newAdopters[i] = Math.min(N, I + deltaInternal + deltaExternal);
    }
    
    nodes.forEach((node, i) => {
      node.adopters = newAdopters[i];
      node.category = node.adopters / node.pop > 0.5 ? 1 : 0;
    });
    
    time++;
    updateChart();
  }
  
  function updateChart() {
    const totalPop = nodes.reduce((sum, n) => sum + n.pop, 0);
    const totalAdopters = nodes.reduce((sum, n) => sum + n.adopters, 0);
    const adoptionRate = (totalAdopters / totalPop * 100).toFixed(1);
    
    document.getElementById('diffusion-stats').innerHTML = 
      `<strong>Time step:</strong> ${time} | <strong>Adoption rate:</strong> ${adoptionRate}% | <strong>Adopters:</strong> ${Math.round(totalAdopters)} / ${totalPop}`;
    
    const option = {
      title: {
        text: `Spatial Diffusion (${networkType} network)`,
        left: 'center'
      },
      tooltip: {
        formatter: params => {
          if (params.dataType === 'node') {
            const node = nodes[parseInt(params.name)];
            return `Node ${params.name}<br/>Adopters: ${Math.round(node.adopters)} / ${node.pop}<br/>Rate: ${(node.adopters/node.pop*100).toFixed(1)}%`;
          }
          return '';
        }
      },
      series: [{
        type: 'graph',
        layout: 'none',
        data: nodes.map((n, i) => ({
          name: n.name,
          x: n.x,
          y: n.y,
          symbolSize: Math.sqrt(n.pop) * 2,
          value: n.adopters / n.pop,
          itemStyle: {
            color: `rgb(${255 * (1 - n.adopters/n.pop)}, ${100 + 155 * (n.adopters/n.pop)}, ${240 * (1 - n.adopters/n.pop)})`
          }
        })),
        links: edges,
        lineStyle: {
          color: '#ccc',
          width: 1,
          curveness: 0
        },
        label: {
          show: false
        },
        emphasis: {
          focus: 'adjacency',
          lineStyle: {
            width: 3
          }
        }
      }]
    };
    
    chart.setOption(option);
  }
  
  function reset() {
    const network = generateNetwork(networkType);
    nodes = network.nodes;
    edges = network.edges;
    adjacency = network.adjacency;
    time = 0;
    updateChart();
  }
  
  document.getElementById('network-select').addEventListener('change', (e) => {
    networkType = e.target.value;
    reset();
  });
  
  document.getElementById('beta-slider').addEventListener('input', (e) => {
    beta = parseFloat(e.target.value);
    document.getElementById('beta-value').textContent = beta.toFixed(2);
  });
  
  document.getElementById('r-diffusion-slider').addEventListener('input', (e) => {
    r = parseFloat(e.target.value);
    document.getElementById('r-diffusion-value').textContent = r.toFixed(2);
  });
  
  document.getElementById('step-btn').addEventListener('click', () => {
    stepSimulation();
  });
  
  document.getElementById('play-btn').addEventListener('click', (e) => {
    if (playing) {
      clearInterval(playInterval);
      e.target.textContent = 'Play';
      playing = false;
    } else {
      playInterval = setInterval(stepSimulation, 500);
      e.target.textContent = 'Pause';
      playing = true;
    }
  });
  
  document.getElementById('reset-btn').addEventListener('click', () => {
    if (playing) {
      clearInterval(playInterval);
      document.getElementById('play-btn').textContent = 'Play';
      playing = false;
    }
    reset();
  });
  
  reset();
  
  window.addEventListener('resize', () => chart.resize());
})();
</script>

**Try this:**
- **Grid network:** Diffusion spreads outward in waves from the center
- **Hub network:** Central city infects all spokes rapidly, then they spread internally
- **Random network:** Irregular diffusion pattern, depends on network structure
- **Distance-weighted:** Closer neighbors exert stronger influence
- Increase β: Faster spatial spread
- Increase r: Faster internal adoption once innovation arrives

**Key insight:** Network structure determines diffusion speed and pattern. A well-connected hub accelerates spread; isolated nodes lag behind.

---

## 6. Interpretation

### Diffusion Curves at Different Locations

**Early adopters** (large cities, well-connected nodes):
- Innovation arrives early
- S-curve starts sooner
- High adoption by time T

**Late adopters** (small towns, peripheral nodes):
- Innovation arrives late
- S-curve starts later
- Low adoption by time T

**Result:** At any snapshot in time, locations are at **different stages** of the adoption curve.

### Barriers to Diffusion

**Physical barriers:**
- Mountains, oceans → low adjacency weights
- Poor roads → slow transmission

**Social barriers:**
- Language differences
- Cultural resistance
- Incompatible infrastructure (e.g., technology standards)

**Economic barriers:**
- High cost → only wealthy locations adopt
- Network externalities → need critical mass

### Policy Implications

**To accelerate diffusion:**
1. **Seed innovation in hubs** (large, central cities)
2. **Subsidize early adoption** (reduce cost barrier)
3. **Improve connectivity** (roads, communication networks)
4. **Demonstrate benefits** (pilot programs in visible locations)

---

## 7. What Could Go Wrong?

### Assuming Homogeneous Populations

The model treats all individuals within a location as identical. In reality:
- Some people are **innovators** (adopt early regardless of neighbors)
- Others are **laggards** (resist even with high social pressure)

**Solution:** Divide population into categories with different adoption thresholds.

### Ignoring Hierarchical Effects

The model emphasizes **contagious diffusion** (neighbor-to-neighbor). Real diffusion often includes:
- **Hierarchical jumps** (New York → Los Angeles, skipping intermediate towns)
- **Media influence** (independent of spatial proximity)

**Solution:** Add long-range connections weighted by city size.

### Forgetting that Innovations Can Fail

Not all innovations succeed. Some spread initially but then **reverse** (CB radios, fax machines, MySpace).

The logistic model assumes monotonic growth. Reversals require a **decline phase** after saturation.

### Assuming Static Networks

Networks evolve:
- New roads are built
- Cities grow or shrink
- Trade patterns shift

**Dynamic networks** require updating adjacency $A(t)$ over time.

---

## 8. Extension: Epidemic Models (SIR)

The same framework models disease spread:

**S → I → R**
- **S:** Susceptible (not infected)
- **I:** Infected (can transmit disease)
- **R:** Recovered (immune, removed from transmission)

**Equations:**

$$\frac{dS_i}{dt} = -\beta S_i \sum_j A_{ij} \frac{I_j}{N_j}$$

$$\frac{dI_i}{dt} = \beta S_i \sum_j A_{ij} \frac{I_j}{N_j} - \gamma I_i$$

$$\frac{dR_i}{dt} = \gamma I_i$$

Where $\gamma$ is the recovery rate.

**Key parameter:** **Basic reproduction number** $R_0 = \beta / \gamma$
- $R_0 > 1$: epidemic spreads
- $R_0 < 1$: epidemic dies out

Spatial structure affects $R_0$ — clustered networks slow spread; well-mixed networks accelerate it.

---

## 9. Math Refresher: Discrete-Time Dynamics

### Difference Equations

A **discrete-time model** updates state at fixed intervals:

$$x(t+1) = f(x(t))$$

**Example:** $x(t+1) = 2x(t)$ (doubling each step)

**Solution:** $x(t) = x(0) \cdot 2^t$ (exponential growth)

### Stability

An equilibrium $x^*$ is **stable** if small perturbations decay:

$$|f(x^* + \epsilon) - x^*| < |\epsilon|$$

**Graphical method:** Plot $x(t+1)$ vs. $x(t)$. Equilibria are where the curve crosses the diagonal. Stable if slope $< 1$ at the crossing.

### Coupled Systems

When multiple locations interact:

$$\mathbf{x}(t+1) = \mathbf{A} \mathbf{x}(t) + \mathbf{b}$$

Where $\mathbf{x}$ is a vector of states, $\mathbf{A}$ is the adjacency/interaction matrix.

**Eigenvalues** of $\mathbf{A}$ determine long-term behavior (growth, decay, oscillation).

---

## Summary

- **Spatial diffusion:** Innovations spread through networks via contact
- **Two mechanisms:** Internal (logistic within a location), external (contagion between locations)
- **Network structure** determines diffusion speed: hubs accelerate, periphery lags
- **Transmission rate** β and growth rate r control dynamics
- **Adjacency matrix** $A_{ij}$ encodes who can transmit to whom
- Applications: technology adoption, disease spread, cultural diffusion, information flow
- Real diffusion involves hierarchical jumps, barriers, and heterogeneous populations

**Next:** In Essay 12, we transition to **observing the Earth** from space. We'll model the Earth as a rotating sphere, introduce spherical coordinates, and visualize lat/lon to Cartesian transformations — the foundation for orbital mechanics in Phase II.

---
