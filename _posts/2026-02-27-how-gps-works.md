---
layout: essay
title: "How GPS Works"
subtitle: "Trilateration, clock bias, and the geometry of space-based positioning"
date: 2026-02-26
categories: [modeling]
series: computational-geography-lab
series_order: 16
cluster: F
cluster_title: "Orbital Mechanics"
tags:
  - computational-geography
  - modeling
  - geodesy
  - gps
  - gnss
  - trilateration
  - least-squares
  - positioning
math: true
viz: true
gl: true
difficulty: 4
math_core: [distance-formula, systems-of-equations, least-squares, linearization]
spatial_reasoning: 4
dynamics: 2
computation: 4
domain: [geodesy, navigation, satellite-systems]
excerpt: >
  A GPS receiver determines its position by measuring the time it takes for radio
  signals to arrive from satellites with known positions. This essay derives the
  mathematical model from first principles: distance from time, trilateration from
  multiple satellites, and why you need four satellites instead of three. We'll
  solve the nonlinear system and explore how satellite geometry affects accuracy.
math_prerequisites: >
  3D distance formula. Solving systems of equations. Basic vectors. We'll introduce
  linearization conceptually and show how iterative methods converge to a solution.
---

## 1. The Question

How does a handheld GPS receiver know where it is on Earth?

Your phone reports your location to within a few meters. It does this by listening to radio signals from satellites 20,000 km overhead. Each satellite broadcasts:
- Its position in space
- The exact time the signal was transmitted

Your receiver measures **when** the signal arrives. From time and the speed of light, you can calculate **distance**. Multiple satellites give multiple distances, which should intersect at your location.

The mathematical question: How do we solve for position from distance measurements? And why do we need four satellites instead of three?

---

## 2. The Conceptual Model

### Distance from Time

Radio signals travel at the speed of light: $c = 299,792,458$ m/s.

If a satellite transmits a signal at time $t_{\text{transmit}}$ and your receiver detects it at time $t_{\text{receive}}$, the signal traveled for:

$$\Delta t = t_{\text{receive}} - t_{\text{transmit}}$$

**Distance:**

$$d = c \cdot \Delta t$$

**Example:** If $\Delta t = 0.07$ seconds (70 milliseconds), then:

$$d = 299,792,458 \times 0.07 = 20,985,472 \text{ m} \approx 21,000 \text{ km}$$

This places you on a **sphere** of radius 21,000 km centered at the satellite.

### Trilateration (Not Triangulation)

With three satellites, you have three spheres. Your position is where all three intersect.

**Triangulation** (used in surveying): Measure angles to known points, solve for position using geometry of triangles.

**Trilateration** (used in GPS): Measure distances to known points, solve for position as the intersection of spheres.

**Difference:** GPS receivers measure **time** (which gives distance), not angles.

---

## 3. Building the Mathematical Model

### Known: Satellite Positions

GPS satellites broadcast their positions in **ECEF coordinates** (Earth-Centered, Earth-Fixed):
- Origin at Earth's center
- Z-axis through North Pole
- X-axis through (0° lat, 0° lon) — the intersection of equator and prime meridian
- Y-axis completes the right-handed system (through 0° lat, 90° E lon)

Satellite $i$ has position $(x_i, y_i, z_i)$ in ECEF.

### Unknown: Receiver Position

Receiver position: $(x, y, z)$ in ECEF.

**Distance from receiver to satellite $i$:**

$$r_i = \sqrt{(x - x_i)^2 + (y - y_i)^2 + (z - z_i)^2}$$

This is the **geometric range** — the straight-line distance through space.

### Measurement: Pseudorange

The **pseudorange** $\rho_i$ is the measured distance based on signal travel time:

$$\rho_i = c \cdot \Delta t_i$$

**In a perfect world:**

$$r_i = \rho_i$$

Each satellite gives one equation. Three satellites → three equations → solve for three unknowns $(x, y, z)$.

**But the world is not perfect.**

---

## 4. The Clock Bias Problem

### Why Three Satellites Aren't Enough

Your receiver's clock is **not atomic**. It's a cheap quartz oscillator that drifts.

Let $b$ = receiver clock error (seconds). If your clock is 0.001 seconds fast, you'll measure arrival times 0.001 seconds too early.

**Effect on pseudorange:**

$$\rho_i = c(\Delta t_i + b)$$

The measured travel time includes both the true travel time **and** your clock error.

**This adds an unknown** — the clock bias $b$ — to the system.

**Four unknowns:** $(x, y, z, b)$  
**Four equations required:** Need signals from **four satellites** minimum.

### Why This Matters

A 1-microsecond clock error causes a 300-meter position error:

$$\text{Error} = c \cdot b = 299,792,458 \times 0.000001 = 300 \text{ m}$$

GPS timing is synchronized to nanoseconds (billionths of a second). A 1-nanosecond error = 30 cm.

**Satellite clocks are atomic** (rubidium or cesium) and synchronized to GPS time. Your phone's clock is not. So $b$ must be solved alongside position.

---

## 5. The Nonlinear System

### Equations

For each satellite $i$, we have:

$$\sqrt{(x - x_i)^2 + (y - y_i)^2 + (z - z_i)^2} + cb = \rho_i$$

Where:
- $(x, y, z)$ is the receiver position (unknown)
- $b$ is the clock bias in seconds (unknown)
- $(x_i, y_i, z_i)$ is satellite $i$'s position (known)
- $\rho_i$ is the measured pseudorange (observed)
- $c$ is the speed of light (known constant)

With $m$ satellites (typically 6–12 visible), we have $m$ equations and 4 unknowns. This is an **overdetermined system** — more equations than unknowns. We solve in a **least-squares** sense.

### Why It's Nonlinear

The square root makes this a **nonlinear system**. You can't just write it as a matrix equation $\mathbf{Ax} = \mathbf{b}$ and invert.

**Solution method:** Linearize around an initial guess, then iterate.

---

## 6. Linearization and Iterative Solution

### Step 1: Initial Guess

Start with a guess: $(x_0, y_0, z_0, b_0)$

A crude guess might be:
- $(x_0, y_0, z_0)$ = center of Earth (0, 0, 0) or the centroid of satellite positions
- $b_0 = 0$ (assume no clock bias initially)

### Step 2: Compute Residuals

At the current guess, compute:

**Predicted geometric range** to satellite $i$:

$$r_{i,0} = \sqrt{(x_0 - x_i)^2 + (y_0 - y_i)^2 + (z_0 - z_i)^2}$$

**Predicted pseudorange** (including clock bias):

$$\hat{\rho}_i = r_{i,0} + c b_0$$

**Residual** (difference between observed and predicted):

$$f_i = \hat{\rho}_i - \rho_i = (r_{i,0} + c b_0) - \rho_i$$

If the guess is perfect, all residuals are zero. Otherwise, we need to adjust the guess.

### Step 3: Linearize (Build the Jacobian)

Approximate each equation with a linear function near the guess.

The **Jacobian matrix** $\mathbf{H}$ has one row per satellite:

$$\mathbf{H}_i = \left[ \frac{\partial r_i}{\partial x}\bigg|_0, \; \frac{\partial r_i}{\partial y}\bigg|_0, \; \frac{\partial r_i}{\partial z}\bigg|_0, \; c \right]$$

**Partial derivatives:**

$$\frac{\partial r_i}{\partial x} = \frac{x_0 - x_i}{r_{i,0}}, \quad \frac{\partial r_i}{\partial y} = \frac{y_0 - y_i}{r_{i,0}}, \quad \frac{\partial r_i}{\partial z} = \frac{z_0 - z_i}{r_{i,0}}$$

**Interpretation:** These are the **direction cosines** — the components of the unit vector pointing from the satellite to the receiver.

The last column is $c$ because $\frac{\partial(cb)}{\partial b} = c$.

### Step 4: Solve for Update

We want to find $\Delta \mathbf{x} = (\Delta x, \Delta y, \Delta z, \Delta b)$ such that:

$$\mathbf{H} \Delta \mathbf{x} \approx -\mathbf{f}$$

This is a **linear least-squares problem**. If $\mathbf{H}$ has more rows than columns (more satellites than unknowns), solve:

$$\Delta \mathbf{x} = -(\mathbf{H}^T \mathbf{H})^{-1} \mathbf{H}^T \mathbf{f}$$

### Step 5: Update and Iterate

$$x_1 = x_0 + \Delta x$$
$$y_1 = y_0 + \Delta y$$
$$z_1 = z_0 + \Delta z$$
$$b_1 = b_0 + \Delta b$$

Repeat steps 2–5 until $|\Delta \mathbf{x}|$ is smaller than some threshold (e.g., 1 cm for position, 1 ns for time).

**Typically converges in 3–5 iterations.**

---

## 7. Worked Example by Hand (2D Simplified)

A full 3D GPS calculation is tedious by hand. Here's a 2D analogue to show the mechanics.

### Setup

Assume signal speed $c = 1$ (toy units).

**Three transmitters** at known positions:
- $S_1 = (0, 0)$
- $S_2 = (10, 0)$
- $S_3 = (0, 10)$

**True receiver position:** $(x, y) = (2, 3)$ with clock bias $b = 0.5$.

**Measured pseudoranges:**

Calculate true ranges:
- $r_1 = \sqrt{2^2 + 3^2} = \sqrt{13} = 3.606$
- $r_2 = \sqrt{(2-10)^2 + 3^2} = \sqrt{73} = 8.544$
- $r_3 = \sqrt{2^2 + (3-10)^2} = \sqrt{53} = 7.280$

Add clock bias ($c = 1$):
- $\rho_1 = 3.606 + 0.5 = 4.106$
- $\rho_2 = 8.544 + 0.5 = 9.044$
- $\rho_3 = 7.280 + 0.5 = 7.780$

### Iteration 1

**Initial guess:** $(x_0, y_0, b_0) = (1, 1, 0)$

**Predicted ranges:**
- $r_{1,0} = \sqrt{1^2 + 1^2} = 1.414$
- $r_{2,0} = \sqrt{(1-10)^2 + 1^2} = \sqrt{82} = 9.055$
- $r_{3,0} = \sqrt{1^2 + (1-10)^2} = \sqrt{82} = 9.055$

**Predicted pseudoranges** (with $b_0 = 0$):
- $\hat{\rho}_1 = 1.414$
- $\hat{\rho}_2 = 9.055$
- $\hat{\rho}_3 = 9.055$

**Residuals:**
- $f_1 = 1.414 - 4.106 = -2.692$
- $f_2 = 9.055 - 9.044 = 0.011$
- $f_3 = 9.055 - 7.780 = 1.275$

**Jacobian rows:**

For $S_1 = (0, 0)$:
$$\left[ \frac{1-0}{1.414}, \frac{1-0}{1.414}, 1 \right] = [0.707, 0.707, 1]$$

For $S_2 = (10, 0)$:
$$\left[ \frac{1-10}{9.055}, \frac{1-0}{9.055}, 1 \right] = [-0.994, 0.110, 1]$$

For $S_3 = (0, 10)$:
$$\left[ \frac{1-0}{9.055}, \frac{1-10}{9.055}, 1 \right] = [0.110, -0.994, 1]$$

$$\mathbf{H} = \begin{bmatrix}
0.707 & 0.707 & 1 \\
-0.994 & 0.110 & 1 \\
0.110 & -0.994 & 1
\end{bmatrix}, \quad
\mathbf{f} = \begin{bmatrix}
-2.692 \\
0.011 \\
1.275
\end{bmatrix}$$

Solve $\mathbf{H} \Delta \mathbf{x} = -\mathbf{f}$ (using least squares or matrix inversion for the square case):

$$\Delta \mathbf{x} \approx \begin{bmatrix} 1.0 \\ 2.0 \\ 0.5 \end{bmatrix}$$

**Updated guess:**
$$(x_1, y_1, b_1) = (1, 1, 0) + (1.0, 2.0, 0.5) = (2.0, 3.0, 0.5)$$

**This is the true solution!** In practice, you'd verify by computing residuals again (they should be near zero).

---

## 8. Computational Implementation

Below is an interactive GPS solver.

<div class="viz-container" id="gps-viz">
  <div class="controls">
    <label>
      Number of satellites:
      <input type="range" id="num-sats-slider" min="4" max="12" step="1" value="6">
      <span id="num-sats-value">6</span>
    </label>
    <label>
      Measurement noise (meters):
      <input type="range" id="noise-slider" min="0" max="20" step="1" value="5">
      <span id="noise-value">5</span> m
    </label>
    <label>
      Clock bias (nanoseconds):
      <input type="range" id="bias-slider" min="-100" max="100" step="10" value="50">
      <span id="bias-value">50</span> ns
    </label>
    <div class="button-group">
      <button id="solve-gps">Solve Position</button>
      <button id="randomize-sats">Randomize Satellites</button>
    </div>
  </div>
  <div class="gps-results">
    <h4>Solution:</h4>
    <p><strong>True position:</strong> <span id="true-pos"></span></p>
    <p><strong>Estimated position:</strong> <span id="est-pos"></span></p>
    <p><strong>Position error:</strong> <span id="pos-error"></span> m</p>
    <p><strong>True clock bias:</strong> <span id="true-bias"></span> ns</p>
    <p><strong>Estimated clock bias:</strong> <span id="est-bias"></span> ns</p>
    <p><strong>Iterations:</strong> <span id="iterations"></span></p>
    <p><strong>PDOP:</strong> <span id="pdop-value"></span></p>
  </div>
  <div id="gps-chart" style="width: 100%; height: 500px;"></div>
</div>

<script type="module">
while (!window.echarts) await new Promise(r => setTimeout(r, 50));

(function() {
  const chart = window.echarts.init(document.getElementById('gps-chart'));
  
  const c = 299792458; // m/s
  const R_earth = 6371000; // m
  const R_gps = 26571000; // m (GPS orbit radius)
  
  let numSats = 6;
  let noise = 5;
  let clockBias = 50e-9; // seconds
  
  // True receiver position (on Earth's surface)
  let truePos = {
    x: R_earth * 0.7,
    y: R_earth * 0.5,
    z: R_earth * 0.5
  };
  
  let satellites = [];
  
  function randomizeSatellites() {
    satellites = [];
    for (let i = 0; i < numSats; i++) {
      // Random point on GPS orbit sphere
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(2 * Math.random() - 1);
      
      satellites.push({
        x: R_gps * Math.sin(phi) * Math.cos(theta),
        y: R_gps * Math.sin(phi) * Math.sin(theta),
        z: R_gps * Math.cos(phi)
      });
    }
  }
  
  function distance(p1, p2) {
    return Math.sqrt(
      (p1.x - p2.x)**2 + 
      (p1.y - p2.y)**2 + 
      (p1.z - p2.z)**2
    );
  }
  
  function solveGPS() {
    // Generate pseudoranges with noise
    const pseudoranges = satellites.map(sat => {
      const trueRange = distance(truePos, sat);
      const noiseValue = (Math.random() - 0.5) * 2 * noise;
      return trueRange + c * clockBias + noiseValue;
    });
    
    // Iterative least squares
    let x = 0, y = 0, z = 0, b = 0;
    let iterations = 0;
    const maxIter = 20;
    
    for (let iter = 0; iter < maxIter; iter++) {
      iterations++;
      
      // Compute residuals and Jacobian
      const H = [];
      const f = [];
      
      satellites.forEach((sat, i) => {
        const dx = x - sat.x;
        const dy = y - sat.y;
        const dz = z - sat.z;
        const r = Math.sqrt(dx*dx + dy*dy + dz*dz);
        
        if (r < 1) continue; // Skip if too close (shouldn't happen)
        
        const predicted = r + c * b;
        const residual = predicted - pseudoranges[i];
        
        H.push([dx/r, dy/r, dz/r, c]);
        f.push(residual);
      });
      
      // Solve H * dx = -f using normal equations
      // dx = -(H^T H)^-1 H^T f
      
      const HT = transpose(H);
      const HTH = matmul(HT, H);
      const HTf = matvec(HT, f);
      
      try {
        const HTH_inv = invert4x4(HTH);
        const dx = matvec(HTH_inv, HTf.map(v => -v));
        
        x += dx[0];
        y += dx[1];
        z += dx[2];
        b += dx[3];
        
        // Check convergence
        const norm = Math.sqrt(dx[0]**2 + dx[1]**2 + dx[2]**2 + dx[3]**2);
        if (norm < 1e-3) break;
        
      } catch(e) {
        console.error('Matrix inversion failed:', e);
        break;
      }
    }
    
    // Compute PDOP
    const H = [];
    satellites.forEach(sat => {
      const dx = x - sat.x;
      const dy = y - sat.y;
      const dz = z - sat.z;
      const r = Math.sqrt(dx*dx + dy*dy + dz*dz);
      if (r > 1) {
        H.push([dx/r, dy/r, dz/r, c]);
      }
    });
    
    let pdop = 0;
    try {
      const HT = transpose(H);
      const HTH = matmul(HT, H);
      const Q = invert4x4(HTH);
      pdop = Math.sqrt(Q[0][0] + Q[1][1] + Q[2][2]);
    } catch(e) {
      pdop = -1;
    }
    
    const estPos = {x, y, z};
    const posError = distance(estPos, truePos);
    
    return {estPos, b, iterations, posError, pdop};
  }
  
  function transpose(matrix) {
    const rows = matrix.length;
    const cols = matrix[0].length;
    const result = [];
    for (let j = 0; j < cols; j++) {
      result[j] = [];
      for (let i = 0; i < rows; i++) {
        result[j][i] = matrix[i][j];
      }
    }
    return result;
  }
  
  function matmul(A, B) {
    const rowsA = A.length;
    const colsA = A[0].length;
    const colsB = B[0].length;
    const result = [];
    
    for (let i = 0; i < rowsA; i++) {
      result[i] = [];
      for (let j = 0; j < colsB; j++) {
        let sum = 0;
        for (let k = 0; k < colsA; k++) {
          sum += A[i][k] * B[k][j];
        }
        result[i][j] = sum;
      }
    }
    return result;
  }
  
  function matvec(A, v) {
    return A.map(row => row.reduce((sum, val, i) => sum + val * v[i], 0));
  }
  
  function invert4x4(m) {
    // Simplified 4x4 matrix inversion (using cofactor method)
    // For production, use a proper linear algebra library
    const det = determinant4x4(m);
    if (Math.abs(det) < 1e-10) throw new Error('Singular matrix');
    
    const inv = [];
    for (let i = 0; i < 4; i++) {
      inv[i] = [];
      for (let j = 0; j < 4; j++) {
        const minor = getMinor(m, i, j);
        inv[i][j] = ((-1)**(i+j)) * determinant3x3(minor) / det;
      }
    }
    return transpose(inv);
  }
  
  function determinant4x4(m) {
    let det = 0;
    for (let j = 0; j < 4; j++) {
      const minor = getMinor(m, 0, j);
      det += ((-1)**j) * m[0][j] * determinant3x3(minor);
    }
    return det;
  }
  
  function determinant3x3(m) {
    return m[0][0]*(m[1][1]*m[2][2] - m[1][2]*m[2][1]) -
           m[0][1]*(m[1][0]*m[2][2] - m[1][2]*m[2][0]) +
           m[0][2]*(m[1][0]*m[2][1] - m[1][1]*m[2][0]);
  }
  
  function getMinor(m, row, col) {
    const minor = [];
    for (let i = 0; i < 4; i++) {
      if (i === row) continue;
      const newRow = [];
      for (let j = 0; j < 4; j++) {
        if (j === col) continue;
        newRow.push(m[i][j]);
      }
      minor.push(newRow);
    }
    return minor;
  }
  
  function updateDisplay() {
    const solution = solveGPS();
    
    document.getElementById('true-pos').textContent = 
      `(${(truePos.x/1000).toFixed(1)}, ${(truePos.y/1000).toFixed(1)}, ${(truePos.z/1000).toFixed(1)}) km`;
    document.getElementById('est-pos').textContent = 
      `(${(solution.estPos.x/1000).toFixed(1)}, ${(solution.estPos.y/1000).toFixed(1)}, ${(solution.estPos.z/1000).toFixed(1)}) km`;
    document.getElementById('pos-error').textContent = solution.posError.toFixed(1);
    document.getElementById('true-bias').textContent = (clockBias * 1e9).toFixed(1);
    document.getElementById('est-bias').textContent = (solution.b * 1e9).toFixed(1);
    document.getElementById('iterations').textContent = solution.iterations;
    document.getElementById('pdop-value').textContent = solution.pdop > 0 ? solution.pdop.toFixed(2) : 'N/A';
    
    updateChart(solution);
  }
  
  function updateChart(solution) {
    const satData = satellites.map((sat, i) => ({
      value: [sat.x/1000, sat.y/1000, sat.z/1000],
      name: `Sat ${i+1}`,
      symbolSize: 8,
      itemStyle: { color: '#4A90E2' }
    }));
    
    const option = {
      title: {
        text: `GPS Trilateration (${numSats} satellites)`,
        left: 'center'
      },
      tooltip: {},
      legend: {
        data: ['Satellites', 'True Position', 'Estimated'],
        top: 30
      },
      xAxis3D: { type: 'value', name: 'X (km)', min: -30000, max: 30000 },
      yAxis3D: { type: 'value', name: 'Y (km)', min: -30000, max: 30000 },
      zAxis3D: { type: 'value', name: 'Z (km)', min: -30000, max: 30000 },
      grid3D: {
        viewControl: {
          distance: 250
        }
      },
      series: [
        {
          name: 'Satellites',
          type: 'scatter3D',
          data: satData,
          itemStyle: { color: '#4A90E2' }
        },
        {
          name: 'True Position',
          type: 'scatter3D',
          data: [{
            value: [truePos.x/1000, truePos.y/1000, truePos.z/1000],
            symbolSize: 15,
            itemStyle: { color: '#2ECC71' }
          }]
        },
        {
          name: 'Estimated',
          type: 'scatter3D',
          data: [{
            value: [solution.estPos.x/1000, solution.estPos.y/1000, solution.estPos.z/1000],
            symbolSize: 12,
            itemStyle: { color: '#F0177A' }
          }]
        }
      ]
    };
    
    chart.setOption(option);
  }
  
  document.getElementById('num-sats-slider').addEventListener('input', (e) => {
    numSats = parseInt(e.target.value);
    document.getElementById('num-sats-value').textContent = numSats;
    randomizeSatellites();
    updateDisplay();
  });
  
  document.getElementById('noise-slider').addEventListener('input', (e) => {
    noise = parseFloat(e.target.value);
    document.getElementById('noise-value').textContent = noise;
  });
  
  document.getElementById('bias-slider').addEventListener('input', (e) => {
    clockBias = parseFloat(e.target.value) * 1e-9;
    document.getElementById('bias-value').textContent = e.target.value;
  });
  
  document.getElementById('solve-gps').addEventListener('click', () => {
    updateDisplay();
  });
  
  document.getElementById('randomize-sats').addEventListener('click', () => {
    randomizeSatellites();
    updateDisplay();
  });
  
  randomizeSatellites();
  updateDisplay();
  
  window.addEventListener('resize', () => chart.resize());
})();
</script>

**Try this:**
- **Increase satellites:** More satellites reduce error and improve PDOP
- **Add noise:** See how measurement errors affect position accuracy
- **Change clock bias:** Even large biases (100 ns) are solved correctly
- **Randomize satellites:** Different geometries produce different PDOP values
- Notice: The estimated position (pink) converges to true position (green) despite clock bias

**Key insight:** The fourth unknown (clock bias) is why GPS needs four satellites minimum. The system simultaneously solves for position and time.

---

## 9. Interpretation

### Why the Clock Bias Trick Works

The receiver doesn't need an atomic clock because:
1. All satellites share the same time reference (GPS time)
2. The clock bias affects **all** pseudoranges equally (adds the same error to each)
3. This creates a geometric constraint that can be solved

**Analogy:** If four people tell you distances to a landmark, but your measuring tape is miscalibrated by the same amount for all measurements, you can still figure out both:
- Where the landmark is
- How miscalibrated your tape is

### Dilution of Precision (PDOP)

**Position Dilution of Precision** quantifies how satellite geometry affects accuracy.

**Good geometry** (low PDOP < 3):
- Satellites spread out in all directions
- Some high in sky, some near horizon
- Measured distances intersect at steep angles

**Bad geometry** (high PDOP > 6):
- Satellites clustered in one part of sky
- All at similar elevations
- Measured distances intersect at shallow angles

**Formula:** PDOP relates measurement error to position error:

$$\sigma_{\text{position}} = \text{PDOP} \times \sigma_{\text{range}}$$

**Example:** If ranging error is 5 m and PDOP = 2:

$$\sigma_{\text{position}} = 2 \times 5 = 10 \text{ m}$$

### GPS Constellation Design

The 31 satellites in the GPS constellation are arranged so that:
- 6 orbital planes at 55° inclination
- 4–5 satellites per plane
- At least 4 satellites visible from anywhere on Earth (usually 6–12)

This ensures **good PDOP globally** at all times.

---

## 10. What Could Go Wrong?

### Atmospheric Delay

Radio signals slow down in the ionosphere (charged particles) and troposphere (water vapor).

**Effect:** Signals take longer than expected → pseudoranges are too large → position error.

**Mitigation:**
- **Dual-frequency receivers:** Use two frequencies (L1 and L2) to estimate ionospheric delay
- **Atmospheric models:** Predict tropospheric delay from temperature/pressure
- **Differential GPS:** Use corrections from a nearby base station

### Multipath

Signals bounce off buildings, terrain, or water before reaching the antenna.

**Effect:** Reflected signals travel farther → pseudoranges too large → position error (typically 5–10 m in urban areas).

**Mitigation:**
- **Antenna design:** Reject signals from below (likely reflected)
- **Signal processing:** Correlate to detect direct vs. reflected signals
- **Carrier phase tracking:** More resistant to multipath than code phase

### Poor Satellite Geometry

If all visible satellites are in one part of the sky (high PDOP):
- Position error is amplified
- Vertical accuracy suffers most (satellites overhead improve HDOP but not VDOP)

**Mitigation:** Wait for better satellite configuration, or use multi-GNSS (GPS + GLONASS + Galileo + BeiDou).

### Relativistic Effects

Satellites are moving at 3.9 km/s in weaker gravity than Earth's surface.

**Special relativity:** Moving clocks run slower (−7 μs/day)  
**General relativity:** Clocks in weaker gravity run faster (+45 μs/day)  
**Net effect:** Satellite clocks run fast by +38 μs/day

Without correction, this would cause **10 km/day** position error!

**Solution:** Satellite clocks are pre-adjusted to run at 10.22999999543 MHz instead of 10.23 MHz exactly.

---

## 11. Extension: RTK and Carrier Phase

**Standard GPS** uses **code phase** (timing of pseudorandom noise pattern) → 1–5 m accuracy.

**RTK (Real-Time Kinematic)** uses **carrier phase** (actual radio wave oscillations) → 1–2 cm accuracy.

**Carrier phase ambiguity:**

The carrier phase measurement is:

$$\Phi_i = \frac{1}{\lambda}(r_i + cb) + N_i$$

Where:
- $\lambda$ is the carrier wavelength (19 cm for GPS L1)
- $N_i$ is an integer number of full wavelengths (ambiguity)

**Challenge:** Solve for both position and integer ambiguities simultaneously.

**Method:** Use a nearby base station with known position to form **differential measurements** that eliminate common errors, then resolve integer ambiguities using statistical methods (LAMBDA algorithm).

---

## 12. Math Refresher: Least Squares

### Why Least Squares?

With more equations than unknowns ($m > 4$), the system is **overdetermined**. There's no exact solution that satisfies all equations perfectly (due to measurement noise).

**Least squares** finds the solution that minimizes the sum of squared residuals:

$$\min_{\mathbf{x}} \sum_{i=1}^{m} f_i^2(\mathbf{x})$$

### Matrix Form

For linear system $\mathbf{Hx} = \mathbf{b}$, the least-squares solution is:

$$\mathbf{x} = (\mathbf{H}^T \mathbf{H})^{-1} \mathbf{H}^T \mathbf{b}$$

This minimizes $\|\mathbf{Hx} - \mathbf{b}\|^2$.

**Covariance:** If measurement errors have variance $\sigma^2$, then:

$$\text{Cov}(\mathbf{x}) = \sigma^2 (\mathbf{H}^T \mathbf{H})^{-1}$$

The diagonal elements are the variances of $x$, $y$, $z$, and $b$.

---

## Summary

- GPS determines position by measuring **signal travel time** from satellites
- **Trilateration:** Each satellite measurement places you on a sphere
- **Four satellites** needed: 3 for position (x, y, z) + 1 for clock bias (b)
- **Clock bias** is solved alongside position — no atomic clock required in receiver
- **Nonlinear system** solved by linearization and iteration
- **PDOP** quantifies how satellite geometry affects accuracy
- Real GPS corrects for atmospheric delay, relativistic effects, and multipath
- **RTK** uses carrier phase for centimeter-level accuracy

**Next steps:** Further exploration of this subject could include:
- Differential GPS and SBAS (Satellite-Based Augmentation Systems)
- Kalman filtering for continuous position tracking
- Integration with INS (Inertial Navigation Systems)
- Multi-GNSS constellation usage

---
