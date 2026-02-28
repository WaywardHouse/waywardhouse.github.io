---
layout: essay
title: "Map Algebra and Focal Operations"
subtitle: "Cell-by-cell calculations and neighborhood analysis on rasters"
date: 2026-02-27
categories: [modeling]
series: computational-geography-spatial
series_order: 6
cluster: K
cluster_title: "Raster Foundations"
tags:
  - computational-geography
  - modeling
  - gis
  - raster-operations
  - map-algebra
  - focal-operations
  - convolution
math: true
viz: true
difficulty: 3
math_core: [matrix-operations, convolution, weighted-averaging, kernel-operations]
spatial_reasoning: 4
dynamics: 1
computation: 3
domain: [gis, image-processing, terrain-analysis, remote-sensing]
excerpt: >
  How do you add two rasters? Smooth noisy elevation data? Calculate slope from
  a DEM? Map algebra defines mathematical operations on rasters—local (cell-by-cell),
  focal (neighborhood), zonal (by region), and global. This essay derives convolution,
  implements common kernels, and shows how raster math powers spatial analysis.
math_prerequisites: >
  Raster concepts (Essay 7, 33). Matrix operations (basic). We'll introduce
  convolution and kernel operations from first principles.
---

## 1. The Question

How do you find suitable land that is both flat AND near water?

**Map algebra** treats rasters as mathematical objects that can be added, multiplied, and combined with logical operations:

**Examples:**
- **Suitability modeling:** Combine slope, distance, and land cover grids
- **Change detection:** Subtract two dates: `change = image2 - image1`
- **NDVI calculation:** `(NIR - Red) / (NIR + Red)` (from Essay 25)
- **Terrain smoothing:** Average each cell with its neighbors
- **Slope calculation:** Gradient from elevation differences

The mathematical question: What operations can we perform on raster grids, and how do we implement neighborhood analysis efficiently?

---

## 2. The Conceptual Model

### Four Classes of Map Algebra

**1. Local Operations (Cell-by-Cell)**

Output value depends only on value(s) at same position in input(s).

$$z_{\text{out}}[i,j] = f(z_1[i,j], z_2[i,j], \ldots)$$

**Examples:**
- Add: `elevation_change = dem_2020 - dem_2010`
- Multiply: `suitable = slope_ok * soil_ok * zoning_ok`
- Reclassify: `if z > 100 then 1 else 0`

**2. Focal Operations (Neighborhood)**

Output depends on value and its neighbors (moving window).

$$z_{\text{out}}[i,j] = f(z[i-k:i+k, j-k:j+k])$$

**Examples:**
- Mean filter: Average 3×3 neighborhood
- Gaussian blur: Weighted average
- Edge detection: Gradient computation

**3. Zonal Operations (Regional)**

Output depends on all cells in a zone (region).

$$z_{\text{out}}[i,j] = f(\{z[m,n] : \text{zone}[m,n] = \text{zone}[i,j]\})$$

**Examples:**
- Mean elevation per watershed
- Total area per land cover class
- Maximum temperature per county

**4. Global Operations (Entire Raster)**

Output depends on all cells.

$$z_{\text{out}}[i,j] = f(\text{all } z[m,n])$$

**Examples:**
- Euclidean distance transform
- Cost-distance analysis
- Viewshed computation

---

## 3. Building the Mathematical Model

### Local Operations

**Unary (single input):**

$$z_{\text{out}}[i,j] = f(z_{\text{in}}[i,j])$$

**Examples:**
- Square root: $\sqrt{z}$
- Threshold: $z > 100$
- Reclassify: Map values to classes

**Binary (two inputs):**

$$z_{\text{out}}[i,j] = f(z_1[i,j], z_2[i,j])$$

**Examples:**
- Sum: $z_1 + z_2$
- Difference: $z_1 - z_2$
- Ratio: $z_1 / z_2$
- Logical AND: $z_1 \land z_2$

**Multi-input:**

$$z_{\text{out}}[i,j] = f(z_1[i,j], z_2[i,j], \ldots, z_n[i,j])$$

**Example - Weighted sum:**

$$z = w_1 z_1 + w_2 z_2 + \cdots + w_n z_n$$

Where $\sum w_i = 1$ (weights sum to 1).

### Focal Operations: Convolution

**Kernel (filter):** Small matrix of weights $K$ (typically 3×3, 5×5, or 7×7).

**Convolution:**

$$z_{\text{out}}[i,j] = \sum_{m=-k}^{k} \sum_{n=-k}^{k} z[i+m, j+n] \cdot K[m,n]$$

Where kernel size is $(2k+1) \times (2k+1)$.

**Example - 3×3 mean filter:**

$$K = \frac{1}{9}\begin{bmatrix} 
1 & 1 & 1 \\
1 & 1 & 1 \\
1 & 1 & 1
\end{bmatrix}$$

**Each output cell** = weighted average of input cell and its 8 neighbors.

**Properties:**
- **Linear:** Convolution is a linear operation
- **Translation invariant:** Same operation everywhere
- **Separable:** Some kernels can be split into 1D operations (faster)

### Common Kernels

**1. Box Filter (Mean)**

$$K_{\text{box}} = \frac{1}{9}\begin{bmatrix} 
1 & 1 & 1 \\
1 & 1 & 1 \\
1 & 1 & 1
\end{bmatrix}$$

**Effect:** Smooths image, reduces noise, blurs edges.

**2. Gaussian Filter**

$$K_{\text{gauss}} = \frac{1}{16}\begin{bmatrix} 
1 & 2 & 1 \\
2 & 4 & 2 \\
1 & 2 & 1
\end{bmatrix}$$

**Effect:** Smooth but preserves edges better than box filter.

**Formula:** $K[m,n] = \frac{1}{2\pi\sigma^2} e^{-(m^2+n^2)/(2\sigma^2)}$

**3. Sobel Filter (Edge Detection)**

**Horizontal edges:**

$$K_x = \begin{bmatrix} 
-1 & 0 & 1 \\
-2 & 0 & 2 \\
-1 & 0 & 1
\end{bmatrix}$$

**Vertical edges:**

$$K_y = \begin{bmatrix} 
-1 & -2 & -1 \\
0 & 0 & 0 \\
1 & 2 & 1
\end{bmatrix}$$

**Gradient magnitude:**

$$|\nabla z| = \sqrt{(K_x * z)^2 + (K_y * z)^2}$$

**4. Laplacian (Second Derivative)**

$$K_{\text{laplacian}} = \begin{bmatrix} 
0 & 1 & 0 \\
1 & -4 & 1 \\
0 & 1 & 0
\end{bmatrix}$$

**Effect:** Detects regions of rapid intensity change.

### Edge Handling

**Problem:** Kernel extends beyond raster boundary at edges.

**Strategies:**

1. **Ignore (NoData):** Output is NoData at edges
2. **Reflect:** Mirror pixel values across boundary
3. **Wrap:** Treat as toroidal (opposite edges connect)
4. **Constant:** Assume fixed value (often 0) beyond edge
5. **Extend:** Replicate edge pixel values

**Most common:** Reflect or constant padding.

---

## 4. Worked Example by Hand

**Problem:** Apply 3×3 mean filter to this elevation grid.

**Input (meters):**

```
    j=0  j=1  j=2  j=3
i=0  10   12   14   16
i=1  11   13   15   17
i=2  12   14   16   18
i=3  13   15   17   19
```

Calculate output at position `[1,1]`.

### Solution

**Kernel (mean filter):**

$$K = \frac{1}{9}\begin{bmatrix} 
1 & 1 & 1 \\
1 & 1 & 1 \\
1 & 1 & 1
\end{bmatrix}$$

**Position [1,1] neighborhood:**

```
10  12  14
11  13  15
12  14  16
```

**Convolution:**

$$z_{\text{out}}[1,1] = \frac{1}{9}(10 + 12 + 14 + 11 + 13 + 15 + 12 + 14 + 16)$$

$$= \frac{1}{9}(117) = 13.0 \text{ m}$$

**Verification:** Central value is 13, neighbors average to 13, so mean is 13 ✓

**Position [1,2]** (next to the right):

**Neighborhood:**

```
12  14  16
13  15  17
14  16  18
```

$$z_{\text{out}}[1,2] = \frac{1}{9}(12 + 14 + 16 + 13 + 15 + 17 + 14 + 16 + 18)$$

$$= \frac{1}{9}(135) = 15.0 \text{ m}$$

**Notice:** Smooth gradient preserved (values increase uniformly → mean filter doesn't change them much).

---

## 5. Computational Implementation

Below is an interactive map algebra demonstration.

<div class="viz-container" id="mapalgebra-viz">
  <div class="controls">
    <label>
      Operation type:
      <select id="operation-type">
        <option value="local">Local (Cell-by-Cell)</option>
        <option value="focal" selected>Focal (Neighborhood)</option>
      </select>
    </label>
    <label id="local-op-label" style="display:none;">
      Local operation:
      <select id="local-operation">
        <option value="add">Add (A + B)</option>
        <option value="subtract">Subtract (A - B)</option>
        <option value="multiply">Multiply (A × B)</option>
        <option value="ndvi">NDVI-like ((A - B) / (A + B))</option>
      </select>
    </label>
    <label id="focal-op-label">
      Focal kernel:
      <select id="focal-kernel">
        <option value="mean" selected>Mean (3×3)</option>
        <option value="gaussian">Gaussian (3×3)</option>
        <option value="sobel">Sobel Edge Detection</option>
        <option value="laplacian">Laplacian</option>
      </select>
    </label>
    <label>
      Show kernel weights:
      <input type="checkbox" id="show-kernel">
    </label>
  </div>
  <div class="mapalgebra-display">
    <div id="kernel-display" style="display:none; margin: 10px 0; font-family: monospace; white-space: pre;"></div>
  </div>
  <div id="mapalgebra-canvas-container">
    <canvas id="mapalgebra-canvas" width="700" height="350" style="border: 1px solid #ddd;"></canvas>
  </div>
</div>

<script type="module">
(function() {
  const canvas = document.getElementById('mapalgebra-canvas');
  const ctx = canvas.getContext('2d');
  
  let opType = 'focal';
  let localOp = 'add';
  let focalKernel = 'mean';
  let showKernel = false;
  
  const size = 20;
  
  // Generate test rasters
  const rasterA = [];
  const rasterB = [];
  for (let i = 0; i < size; i++) {
    const rowA = [];
    const rowB = [];
    for (let j = 0; j < size; j++) {
      // Gradient pattern for A
      rowA.push(100 + i * 5 + j * 3 + Math.random() * 20 - 10);
      // Different pattern for B
      rowB.push(50 + Math.sin(i / 3) * 30 + Math.cos(j / 3) * 30);
    }
    rasterA.push(rowA);
    rasterB.push(rowB);
  }
  
  const kernels = {
    mean: [
      [1/9, 1/9, 1/9],
      [1/9, 1/9, 1/9],
      [1/9, 1/9, 1/9]
    ],
    gaussian: [
      [1/16, 2/16, 1/16],
      [2/16, 4/16, 2/16],
      [1/16, 2/16, 1/16]
    ],
    sobel: [ // Returns magnitude
      [-1, 0, 1],
      [-2, 0, 2],
      [-1, 0, 1]
    ],
    laplacian: [
      [0, 1, 0],
      [1, -4, 1],
      [0, 1, 0]
    ]
  };
  
  function convolve(data, kernel) {
    const result = [];
    const ksize = Math.floor(kernel.length / 2);
    
    for (let i = 0; i < data.length; i++) {
      const row = [];
      for (let j = 0; j < data[0].length; j++) {
        let sum = 0;
        let count = 0;
        
        for (let ki = -ksize; ki <= ksize; ki++) {
          for (let kj = -ksize; kj <= ksize; kj++) {
            const ii = i + ki;
            const jj = j + kj;
            
            if (ii >= 0 && ii < data.length && jj >= 0 && jj < data[0].length) {
              sum += data[ii][jj] * kernel[ki + ksize][kj + ksize];
              count++;
            }
          }
        }
        
        row.push(sum);
      }
      result.push(row);
    }
    
    return result;
  }
  
  function sobelMagnitude(data) {
    const kx = [[-1, 0, 1], [-2, 0, 2], [-1, 0, 1]];
    const ky = [[-1, -2, -1], [0, 0, 0], [1, 2, 1]];
    
    const gx = convolve(data, kx);
    const gy = convolve(data, ky);
    
    const result = [];
    for (let i = 0; i < gx.length; i++) {
      const row = [];
      for (let j = 0; j < gx[0].length; j++) {
        row.push(Math.sqrt(gx[i][j] ** 2 + gy[i][j] ** 2));
      }
      result.push(row);
    }
    
    return result;
  }
  
  function localOperation(dataA, dataB, op) {
    const result = [];
    for (let i = 0; i < dataA.length; i++) {
      const row = [];
      for (let j = 0; j < dataA[0].length; j++) {
        const a = dataA[i][j];
        const b = dataB[i][j];
        
        let value;
        if (op === 'add') value = a + b;
        else if (op === 'subtract') value = a - b;
        else if (op === 'multiply') value = a * b;
        else if (op === 'ndvi') value = (a - b) / (a + b);
        
        row.push(value);
      }
      result.push(row);
    }
    return result;
  }
  
  function drawRaster(data, x, y, width, height, title) {
    const cellW = width / data[0].length;
    const cellH = height / data.length;
    
    // Find min/max
    let min = Infinity, max = -Infinity;
    for (let row of data) {
      for (let val of row) {
        if (isFinite(val)) {
          min = Math.min(min, val);
          max = Math.max(max, val);
        }
      }
    }
    
    // Draw cells
    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < data[0].length; j++) {
        const value = data[i][j];
        if (!isFinite(value)) continue;
        
        const normalized = (value - min) / (max - min);
        const gray = Math.floor(255 * normalized);
        
        ctx.fillStyle = `rgb(${gray}, ${gray}, ${gray})`;
        ctx.fillRect(x + j * cellW, y + i * cellH, cellW, cellH);
      }
    }
    
    // Title
    ctx.fillStyle = '#2C3E50';
    ctx.font = 'bold 12px sans-serif';
    ctx.fillText(title, x + 5, y - 5);
  }
  
  function displayKernel(kernel) {
    let text = 'Kernel:\n';
    for (let row of kernel) {
      text += row.map(v => v.toFixed(3).padStart(7)).join(' ') + '\n';
    }
    document.getElementById('kernel-display').textContent = text;
  }
  
  function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    let result;
    
    if (opType === 'local') {
      result = localOperation(rasterA, rasterB, localOp);
      drawRaster(rasterA, 20, 40, 150, 150, 'Input A');
      drawRaster(rasterB, 190, 40, 150, 150, 'Input B');
      drawRaster(result, 360, 40, 150, 150, 'Result');
    } else {
      // Focal operation
      if (focalKernel === 'sobel') {
        result = sobelMagnitude(rasterA);
      } else {
        result = convolve(rasterA, kernels[focalKernel]);
      }
      
      drawRaster(rasterA, 50, 40, 250, 250, 'Input');
      drawRaster(result, 350, 40, 250, 250, 
                  `Output (${focalKernel})`);
      
      if (showKernel && kernels[focalKernel]) {
        displayKernel(kernels[focalKernel]);
        document.getElementById('kernel-display').style.display = 'block';
      } else {
        document.getElementById('kernel-display').style.display = 'none';
      }
    }
  }
  
  document.getElementById('operation-type').addEventListener('change', (e) => {
    opType = e.target.value;
    if (opType === 'local') {
      document.getElementById('local-op-label').style.display = 'block';
      document.getElementById('focal-op-label').style.display = 'none';
    } else {
      document.getElementById('local-op-label').style.display = 'none';
      document.getElementById('focal-op-label').style.display = 'block';
    }
    render();
  });
  
  document.getElementById('local-operation').addEventListener('change', (e) => {
    localOp = e.target.value;
    render();
  });
  
  document.getElementById('focal-kernel').addEventListener('change', (e) => {
    focalKernel = e.target.value;
    render();
  });
  
  document.getElementById('show-kernel').addEventListener('change', (e) => {
    showKernel = e.target.checked;
    render();
  });
  
  render();
})();
</script>

**Try this:**
- **Mean filter:** Smooths the noisy gradient pattern
- **Gaussian:** Smoother than mean, better edge preservation
- **Sobel:** Highlights edges (bright = steep gradient)
- **Laplacian:** Detects rapid changes (edges appear as white/black pairs)
- **Local operations:** Try different combinations of inputs
- **Show kernel:** See the actual weight matrices

**Key insight:** Convolution is just weighted averaging—different kernels extract different spatial features.

---

## 6. Interpretation

### Suitability Modeling

**Problem:** Find land suitable for solar farm.

**Criteria:**
1. Slope < 5° (flat land)
2. Within 2km of roads
3. Not in protected areas
4. South-facing aspect

**Map algebra solution:**

```
slope_ok = (slope < 5)              # Binary: 1 if true, 0 if false
road_ok = (road_distance < 2000)    # Within 2km
protected_ok = (protected == 0)     # Not protected (0 = no)
aspect_ok = (aspect > 135) AND (aspect < 225)  # South-facing

suitable = slope_ok * road_ok * protected_ok * aspect_ok
```

**Result:** Raster where 1 = suitable, 0 = not suitable.

**Count suitable cells:**

```
suitable_area = sum(suitable) * cell_area
```

### Terrain Analysis

**Slope from DEM** using focal operations:

**Finite difference approximation:**

$$\frac{\partial z}{\partial x} \approx \frac{z[i,j+1] - z[i,j-1]}{2\Delta x}$$

$$\frac{\partial z}{\partial y} \approx \frac{z[i+1,j] - z[i-1,j]}{2\Delta y}$$

**Slope angle:**

$$\text{slope} = \arctan\sqrt{\left(\frac{\partial z}{\partial x}\right)^2 + \left(\frac{\partial z}{\partial y}\right)^2}$$

**This is Sobel-like kernel operation!**

### Change Detection

**Detect forest loss** from NDVI time series:

```
ndvi_2010 = (nir_2010 - red_2010) / (nir_2010 + red_2010)
ndvi_2020 = (nir_2020 - red_2020) / (nir_2020 + red_2020)

change = ndvi_2020 - ndvi_2010

# Forest loss where NDVI decreased significantly
forest_loss = (change < -0.2) AND (ndvi_2010 > 0.6)
```

### Image Enhancement

**Contrast stretch** (local operation):

```
min_val = global_minimum(image)
max_val = global_maximum(image)

stretched = 255 * (image - min_val) / (max_val - min_val)
```

**Unsharp masking** (focal operation):

```
blurred = gaussian_filter(image)
edges = image - blurred
enhanced = image + alpha * edges
```

Where $\alpha$ controls enhancement strength.

---

## 7. What Could Go Wrong?

### Division by Zero

**NDVI calculation:**

```
ndvi = (nir - red) / (nir + red)
```

**Problem:** If NIR + Red = 0, division by zero.

**Solution:** Mask or set NoData where denominator ≈ 0:

```
denominator = nir + red
ndvi = WHERE(denominator > epsilon, (nir - red) / denominator, NoData)
```

### Type Overflow

**Multiplying large integers:**

```
area = count * cell_size  # If count and cell_size are int32
```

**Problem:** Result may exceed int32 range (2.1 billion).

**Solution:** Cast to float or int64 before operation.

### Edge Artifacts

**Kernels create NoData ring around edge.**

**3×3 kernel:** 1-pixel ring  
**5×5 kernel:** 2-pixel ring

**Problem:** Successive operations shrink valid area.

**Solution:** Pad raster before operation, crop after.

### Inappropriate Kernel for Data

**Mean filter on categorical data:**

```
land_cover = [1, 1, 2, 2]  # 1=forest, 2=urban
mean = (1 + 1 + 2 + 2) / 4 = 1.5
```

**Problem:** Class 1.5 doesn't exist!

**Solution:** Use **modal filter** (most common value) for categorical data.

---

## 8. Extension: Separable Filters

**Many 2D filters can be decomposed into 1D operations.**

**Example - 2D Gaussian:**

$$G_{2D}(x, y) = \frac{1}{2\pi\sigma^2} e^{-(x^2+y^2)/(2\sigma^2)}$$

**Separable:**

$$G_{2D}(x, y) = G_{1D}(x) \times G_{1D}(y)$$

Where:

$$G_{1D}(x) = \frac{1}{\sqrt{2\pi}\sigma} e^{-x^2/(2\sigma^2)}$$

**Computational advantage:**

**2D convolution:** $O(n^2 \times k^2)$ where $k$ = kernel size  
**Separable (two 1D):** $O(n^2 \times 2k)$

**For 5×5 kernel:**
- 2D: 25 multiplications per pixel
- Separable: 10 multiplications per pixel
- **2.5× speedup**

**Implementation:**

```
# Instead of one 2D convolution:
result = convolve_2d(image, kernel_2d)

# Do two 1D convolutions:
temp = convolve_1d(image, kernel_x, axis=0)  # Rows
result = convolve_1d(temp, kernel_y, axis=1)  # Columns
```

---

## 9. Math Refresher: Convolution

### 1D Convolution

**Signal:** $f[n]$  
**Kernel:** $g[m]$

**Convolution:**

$$(f * g)[n] = \sum_{m=-\infty}^{\infty} f[m] \cdot g[n-m]$$

**Interpretation:** Flip kernel, slide across signal, multiply and sum.

**Example:**

```
f = [1, 2, 3, 4, 5]
g = [0.25, 0.5, 0.25]  # Simple smoothing

(f * g)[2] = 0.25*f[1] + 0.5*f[2] + 0.25*f[3]
           = 0.25*2 + 0.5*3 + 0.25*4
           = 0.5 + 1.5 + 1.0 = 3.0
```

### 2D Convolution

**Image:** $I[i,j]$  
**Kernel:** $K[m,n]$

**Convolution:**

$$(I * K)[i,j] = \sum_m \sum_n I[i-m, j-n] \cdot K[m,n]$$

**For 3×3 kernel centered at origin:**

$$= K[-1,-1]I[i+1,j+1] + K[0,-1]I[i,j+1] + \cdots + K[1,1]I[i-1,j-1]$$

**Note:** Kernel is flipped. For symmetric kernels (most common), flipping has no effect.

### Properties

**Commutativity:** $f * g = g * f$  
**Associativity:** $(f * g) * h = f * (g * h)$  
**Distributivity:** $f * (g + h) = f * g + f * h$  
**Identity:** $f * \delta = f$ (where $\delta$ is impulse: 1 at origin, 0 elsewhere)

---

## Summary

- **Map algebra** defines mathematical operations on rasters
- **Four types:** Local (cell-by-cell), Focal (neighborhood), Zonal (regional), Global (entire raster)
- **Local operations:** Arithmetic, logical, reclassification—independent cells
- **Focal operations:** Convolution with kernels—neighborhood analysis
- **Common kernels:** Mean (smooth), Gaussian (better smooth), Sobel (edges), Laplacian (change)
- **Convolution** = weighted sum of neighbors using kernel weights
- **Applications:** Suitability modeling, terrain analysis, change detection, image enhancement
- **Challenges:** Division by zero, type overflow, edge artifacts, inappropriate kernels
- **Optimization:** Separable filters reduce computation 2-3×
- Map algebra enables complex spatial analysis from simple operations

**Next:** In Essay 35, we build on raster operations with **raster classification**—converting continuous values to discrete categories using thresholds and decision rules.

---
