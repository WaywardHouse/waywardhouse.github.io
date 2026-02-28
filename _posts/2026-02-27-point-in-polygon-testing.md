---
layout: essay
title: "Point-in-Polygon Testing"
subtitle: "The ray casting algorithm and spatial membership queries"
date: 2026-02-27
categories: [modeling]
series: computational-geography-spatial
series_order: 1
cluster: K
cluster_title: "Raster Foundations"
tags:
  - computational-geography
  - modeling
  - gis
  - vector-operations
  - algorithms
  - spatial-queries
math: true
viz: true
difficulty: 3
math_core: [ray-casting, computational-geometry, boolean-operations]
spatial_reasoning: 4
dynamics: 1
computation: 3
domain: [gis, spatial-analysis, computational-geometry]
excerpt: >
  Is a point inside a polygon? This seemingly simple question underlies countless
  GIS operations: habitat analysis, demographic queries, voting district assignment,
  and spatial joins. This essay derives the ray casting algorithm, shows why it
  works, and implements an efficient point-in-polygon test from first principles.
math_prerequisites: >
  Basic algebra and coordinate geometry. Understanding of line equations from
  Essay 2. We'll introduce computational geometry concepts from scratch.
---

## 1. The Question

Is this GPS coordinate inside the national park boundary?

This fundamental spatial query appears everywhere:
- **Wildlife ecology:** Is this animal location inside its territory?
- **Demographics:** Which census tract contains this address?
- **Politics:** Which congressional district is this voter in?
- **Emergency services:** Which fire station's coverage area is closest?
- **Retail:** Is this customer inside our delivery zone?

The mathematical question: Given a point $(x, y)$ and a polygon defined by vertices, is the point inside the polygon?

**Complications:**
- Polygons can be concave (not just rectangles)
- Polygons can have holes
- Edge cases: What if the point is exactly on the boundary?

---

## 2. The Conceptual Model

### Intuitive Approach

**Method:** Cast a ray from the point to infinity. Count how many polygon edges the ray crosses.

**Rule:**
- **Odd number of crossings** → Point is **inside**
- **Even number of crossings** → Point is **outside**

**Why it works:** 

Imagine walking from far outside the polygon toward the point:
- Each time you cross a polygon edge, you alternate between inside and outside
- If you cross an odd number of edges, you end up inside
- If you cross an even number, you end up outside

**Example:**

```
Point A: Ray crosses 1 edge → inside
Point B: Ray crosses 2 edges → outside
Point C: Ray crosses 3 edges → inside

    ┌──────────┐
    │    A●    │ ←── 1 crossing
────┼──────────┼──→
  B●│          │     2 crossings
    │        C●│ ←── 3 crossings
    └──────────┘
```

### Ray Direction Choice

**Simplification:** Cast ray horizontally to the right (positive x-direction).

**Why horizontal?**
- Reduces 2D problem to 1D (only need to check y-coordinates)
- Easier to implement
- Standard convention

**The test becomes:** Does the horizontal ray from $(x, y)$ cross each edge?

---

## 3. Building the Mathematical Model

### Edge Crossing Test

For each polygon edge from $(x_1, y_1)$ to $(x_2, y_2)$, determine if the ray from point $(x_p, y_p)$ crosses it.

**Conditions for crossing:**

1. **Y-coordinate check:** Point's y must be between edge's y-values

$$\min(y_1, y_2) \leq y_p < \max(y_1, y_2)$$

(Note: Use $<$ for one endpoint to avoid double-counting shared vertices)

2. **X-coordinate check:** Intersection point must be to the right of the point

First, find where the edge crosses the horizontal line $y = y_p$.

**Line equation for edge:**

$$x = x_1 + \frac{(y_p - y_1)(x_2 - x_1)}{y_2 - y_1}$$

This is the x-coordinate where the edge intersects the ray's horizontal line.

**Crossing occurs if:**

$$x_{\text{intersection}} > x_p$$

(Ray goes to the right, so intersection must be rightward of point)

### Complete Algorithm

```
function pointInPolygon(point, polygon):
    count = 0
    for each edge (v1, v2) in polygon:
        if (v1.y <= point.y < v2.y) or (v2.y <= point.y < v1.y):
            # Edge straddles horizontal ray
            x_intersect = v1.x + (point.y - v1.y) * (v2.x - v1.x) / (v2.y - v1.y)
            if x_intersect > point.x:
                count = count + 1
    
    return (count % 2 == 1)  # Odd = inside, Even = outside
```

### Edge Cases

**Point exactly on edge:**
- Mathematically: On boundary, could define as inside or outside
- Convention: Usually treated as **inside** for GIS applications
- Implementation: Check distance to edge separately if exactness matters

**Point on vertex:**
- Same as edge case
- Usually treated as inside

**Horizontal edges:**
- Edge with $y_1 = y_2$ (horizontal edge)
- Our algorithm skips these (both inequalities fail)
- Correct behavior: Horizontal edges don't affect inside/outside status

**Degenerate polygons:**
- Self-intersecting edges
- Zero-area polygons
- Require preprocessing or rejection

---

## 4. Worked Example by Hand

**Problem:** Is point $P = (3, 3)$ inside the quadrilateral with vertices:
- $A = (1, 1)$
- $B = (5, 2)$
- $C = (4, 5)$
- $D = (2, 4)$

Polygon edges: $A \to B \to C \to D \to A$

### Solution

**Edge 1: $A(1,1) \to B(5,2)$**

Y-check: Is $1 \leq 3 < 2$? **No** (3 is not less than 2)  
Skip this edge.

**Edge 2: $B(5,2) \to C(4,5)$**

Y-check: Is $2 \leq 3 < 5$? **Yes**

X-intersection:

$$x = 5 + \frac{(3-2)(4-5)}{5-2} = 5 + \frac{1 \times (-1)}{3} = 5 - 0.33 = 4.67$$

Is $4.67 > 3$? **Yes** → Count = 1

**Edge 3: $C(4,5) \to D(2,4)$**

Y-check: Is $4 \leq 3 < 5$? **No** (3 is not ≥ 4)  
Skip this edge.

**Edge 4: $D(2,4) \to A(1,1)$**

Y-check: Is $1 \leq 3 < 4$? **Yes**

X-intersection:

$$x = 2 + \frac{(3-4)(1-2)}{1-4} = 2 + \frac{(-1)(-1)}{-3} = 2 + \frac{1}{-3} = 2 - 0.33 = 1.67$$

Is $1.67 > 3$? **No** (intersection is to the left)  
Don't count.

**Final count: 1 (odd) → Point is INSIDE**

---

## 5. Computational Implementation

Below is an interactive point-in-polygon tester.

<div class="viz-container" id="pip-viz">
  <div class="controls">
    <label>
      Test shape:
      <select id="shape-select">
        <option value="square">Square</option>
        <option value="triangle">Triangle</option>
        <option value="concave" selected>Concave Polygon</option>
        <option value="star">Star (Concave)</option>
        <option value="complex">Complex Shape</option>
      </select>
    </label>
    <label>
      Show ray:
      <input type="checkbox" id="show-ray" checked>
    </label>
    <label>
      Show intersections:
      <input type="checkbox" id="show-intersections" checked>
    </label>
    <div class="pip-info">
      <p><strong>Click on the canvas to test points</strong></p>
      <p>Point: <span id="point-coords">(--, --)</span></p>
      <p>Ray crossings: <span id="crossing-count">--</span></p>
      <p>Result: <span id="pip-result">--</span></p>
    </div>
  </div>
  <div id="pip-canvas-container">
    <canvas id="pip-canvas" width="600" height="500" style="border: 1px solid #ddd; cursor: crosshair;"></canvas>
  </div>
</div>

<script type="module">
(function() {
  const canvas = document.getElementById('pip-canvas');
  const ctx = canvas.getContext('2d');
  
  const shapes = {
    square: [
      {x: 100, y: 100}, {x: 400, y: 100}, 
      {x: 400, y: 400}, {x: 100, y: 400}
    ],
    triangle: [
      {x: 300, y: 50}, {x: 500, y: 400}, {x: 100, y: 400}
    ],
    concave: [
      {x: 100, y: 100}, {x: 300, y: 100}, {x: 300, y: 250},
      {x: 200, y: 250}, {x: 200, y: 400}, {x: 100, y: 400}
    ],
    star: [
      {x: 300, y: 50}, {x: 350, y: 200}, {x: 500, y: 200},
      {x: 380, y: 300}, {x: 450, y: 450}, {x: 300, y: 350},
      {x: 150, y: 450}, {x: 220, y: 300}, {x: 100, y: 200},
      {x: 250, y: 200}
    ],
    complex: [
      {x: 100, y: 150}, {x: 200, y: 100}, {x: 350, y: 150},
      {x: 400, y: 100}, {x: 500, y: 200}, {x: 450, y: 350},
      {x: 350, y: 400}, {x: 250, y: 350}, {x: 200, y: 450},
      {x: 100, y: 350}, {x: 150, y: 250}
    ]
  };
  
  let currentShape = 'concave';
  let testPoint = null;
  let showRay = true;
  let showIntersections = true;
  
  function pointInPolygon(point, polygon) {
    let count = 0;
    const intersections = [];
    
    for (let i = 0; i < polygon.length; i++) {
      const v1 = polygon[i];
      const v2 = polygon[(i + 1) % polygon.length];
      
      // Check if edge straddles horizontal ray
      if ((v1.y <= point.y && point.y < v2.y) ||
          (v2.y <= point.y && point.y < v1.y)) {
        
        // Calculate x-coordinate of intersection
        const x_intersect = v1.x + (point.y - v1.y) * (v2.x - v1.x) / (v2.y - v1.y);
        
        if (x_intersect > point.x) {
          count++;
          intersections.push({x: x_intersect, y: point.y});
        }
      }
    }
    
    return {
      inside: (count % 2 === 1),
      crossings: count,
      intersections: intersections
    };
  }
  
  function drawPolygon(polygon) {
    ctx.strokeStyle = '#2C3E50';
    ctx.lineWidth = 2;
    ctx.fillStyle = 'rgba(52, 152, 219, 0.1)';
    
    ctx.beginPath();
    ctx.moveTo(polygon[0].x, polygon[0].y);
    for (let i = 1; i < polygon.length; i++) {
      ctx.lineTo(polygon[i].x, polygon[i].y);
    }
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    
    // Draw vertices
    ctx.fillStyle = '#2C3E50';
    for (let vertex of polygon) {
      ctx.beginPath();
      ctx.arc(vertex.x, vertex.y, 4, 0, 2 * Math.PI);
      ctx.fill();
    }
  }
  
  function drawTestPoint(point, result) {
    // Draw ray
    if (showRay) {
      ctx.strokeStyle = result.inside ? '#27AE60' : '#E74C3C';
      ctx.lineWidth = 1;
      ctx.setLineDash([5, 5]);
      ctx.beginPath();
      ctx.moveTo(point.x, point.y);
      ctx.lineTo(canvas.width, point.y);
      ctx.stroke();
      ctx.setLineDash([]);
    }
    
    // Draw intersections
    if (showIntersections) {
      ctx.fillStyle = '#F39C12';
      for (let inter of result.intersections) {
        ctx.beginPath();
        ctx.arc(inter.x, inter.y, 6, 0, 2 * Math.PI);
        ctx.fill();
        
        // Draw X mark
        ctx.strokeStyle = '#FFF';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(inter.x - 4, inter.y - 4);
        ctx.lineTo(inter.x + 4, inter.y + 4);
        ctx.moveTo(inter.x + 4, inter.y - 4);
        ctx.lineTo(inter.x - 4, inter.y + 4);
        ctx.stroke();
      }
    }
    
    // Draw test point
    ctx.fillStyle = result.inside ? '#27AE60' : '#E74C3C';
    ctx.beginPath();
    ctx.arc(point.x, point.y, 8, 0, 2 * Math.PI);
    ctx.fill();
    
    ctx.strokeStyle = '#FFF';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(point.x, point.y, 8, 0, 2 * Math.PI);
    ctx.stroke();
  }
  
  function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const polygon = shapes[currentShape];
    drawPolygon(polygon);
    
    if (testPoint) {
      const result = pointInPolygon(testPoint, polygon);
      drawTestPoint(testPoint, result);
      
      document.getElementById('point-coords').textContent = 
        `(${testPoint.x}, ${testPoint.y})`;
      document.getElementById('crossing-count').textContent = result.crossings;
      document.getElementById('pip-result').textContent = 
        result.inside ? 'INSIDE' : 'OUTSIDE';
      document.getElementById('pip-result').style.color = 
        result.inside ? '#27AE60' : '#E74C3C';
      document.getElementById('pip-result').style.fontWeight = 'bold';
    }
  }
  
  canvas.addEventListener('click', (e) => {
    const rect = canvas.getBoundingClientRect();
    testPoint = {
      x: Math.round(e.clientX - rect.left),
      y: Math.round(e.clientY - rect.top)
    };
    render();
  });
  
  document.getElementById('shape-select').addEventListener('change', (e) => {
    currentShape = e.target.value;
    testPoint = null;
    document.getElementById('point-coords').textContent = '(--, --)';
    document.getElementById('crossing-count').textContent = '--';
    document.getElementById('pip-result').textContent = '--';
    render();
  });
  
  document.getElementById('show-ray').addEventListener('change', (e) => {
    showRay = e.target.checked;
    render();
  });
  
  document.getElementById('show-intersections').addEventListener('change', (e) => {
    showIntersections = e.target.checked;
    render();
  });
  
  render();
})();
</script>

**Try this:**
- **Click inside the polygon:** Ray crosses odd number of edges → Green point (INSIDE)
- **Click outside:** Ray crosses even number (including 0) → Red point (OUTSIDE)
- **Star shape:** Tests concave polygon handling
- **Complex shape:** Shows algorithm works for any simple polygon
- **Count crossings:** Orange X marks show where ray intersects edges
- Notice: Algorithm works regardless of polygon complexity

**Key insight:** The parity (odd/even) of crossings determines inside/outside, making the test robust for any polygon shape.

---

## 6. Interpretation

### Why Ray Casting Works

**Topological argument:**

A polygon divides the plane into two regions: inside and outside. Any path from infinity to a point must cross the boundary an odd number of times if the point is inside, even number if outside.

**Mathematical proof sketch:**

1. Start far outside (e.g., $x = +\infty$) → definitely outside
2. Each boundary crossing toggles inside ↔ outside state
3. Count crossings along path to point
4. Odd count → ended inside; Even count → ended outside

**This is Jordan Curve Theorem** (simple closed curve divides plane into two regions).

### Computational Complexity

**Time complexity:** $O(n)$ where $n$ is number of polygon vertices

**Why:** Must check every edge once

**Cannot do better:** Must examine every edge (counterexample: polygon could have narrow corridor)

**Optimization:** For many points in same polygon, precompute bounding box:
- Quick rejection: If point outside bounding box → definitely outside polygon
- Reduces unnecessary edge checks

### Applications

**Spatial joins:**

Given 10,000 points and 500 polygons, assign each point to its containing polygon:

```
for each point:
    for each polygon:
        if pointInPolygon(point, polygon):
            assign point to polygon
            break
```

**Optimization:** Use spatial indexing (R-tree, quadtree) to avoid testing all polygons.

**Zonal statistics:**

Calculate average temperature within each climate zone:

```
for each temperature measurement point:
    for each zone polygon:
        if pointInPolygon(point, zone):
            add temperature to zone's sum
            
for each zone:
    average = sum / count
```

**Ecological habitat analysis:**

Which GPS-collared animal locations fall inside protected areas?

```
protected_locations = []
for each GPS fix:
    if pointInPolygon(fix, park_boundary):
        protected_locations.append(fix)

percent_protected = len(protected_locations) / total_fixes * 100
```

---

## 7. What Could Go Wrong?

### Numerical Precision Issues

**Floating-point arithmetic** can cause problems:

```
# Edge from (0, 0) to (10, 10)
# Point at (5, 5.0000000001)

Is point exactly on edge? No (numerically)
Result: Might be classified as outside when visually "on" edge
```

**Solution:** Use **tolerance** for boundary tests:

```
if abs(distance_to_edge) < epsilon:
    treat as "on boundary" (typically: inside)
```

### Polygon with Holes

**Standard ray casting doesn't handle holes.**

**Example:** Donut-shaped polygon (outer ring + inner hole)

**Solution:** Track polygon as multiple rings:
- Outer ring: clockwise vertices
- Holes: counter-clockwise vertices

**Algorithm modification:**

```
count = 0
for each ring in polygon:
    crossings = ray_cast(point, ring)
    if ring is outer:
        count += crossings
    else:  # hole
        count -= crossings

return (count % 2 == 1)
```

### Self-Intersecting Polygons

**Example:** Figure-8 or bowtie shape

**Ray casting still works** but definition of "inside" becomes ambiguous.

**Typical behavior:** Uses **winding number** (how many times polygon winds around point).

**Our algorithm:** Treats each crossing independently (may not match visual intuition for complex self-intersections).

### Degenerate Cases

**Zero-area polygons:**
- All vertices collinear → no interior
- Treat all points as outside

**Duplicate vertices:**
- Clean up polygon beforehand
- Remove consecutive duplicate points

**Nearly-horizontal edges:**

If edge has $y_1 \approx y_2$:

$$\frac{(x_2 - x_1)}{(y_2 - y_1)} \to \text{very large or undefined}$$

**Solution:** Skip edges with $|y_2 - y_1| < \varepsilon$ (effectively horizontal).

---

## 8. Extension: Winding Number Algorithm

**Alternative approach:** Count signed crossings (direction matters).

**Winding number** = net number of times polygon winds counter-clockwise around point.

**Formula:**

$$w = \frac{1}{2\pi} \oint_{\partial P} d\theta$$

Where $\theta$ is angle from point to polygon boundary.

**Discrete version:**

For each edge, calculate change in angle from point to edge:

```
winding_number = 0
for each edge (v1, v2):
    angle1 = atan2(v1.y - point.y, v1.x - point.x)
    angle2 = atan2(v2.y - point.y, v2.x - point.x)
    winding_number += angle_difference(angle1, angle2)

return (winding_number != 0)
```

**Advantages:**
- Handles self-intersecting polygons better
- More geometrically meaningful

**Disadvantages:**
- Slower (requires trigonometric functions)
- More complex implementation

**Ray casting is standard** for simple polygons (faster, simpler).

---

## 9. Math Refresher: Line Intersection

### Finding X-Coordinate of Intersection

Given edge from $(x_1, y_1)$ to $(x_2, y_2)$ and horizontal line $y = y_p$:

**Line equation (parametric form):**

$$x(t) = x_1 + t(x_2 - x_1)$$
$$y(t) = y_1 + t(y_2 - y_1)$$

Where $t \in [0, 1]$ (on edge).

**Find $t$ where $y(t) = y_p$:**

$$y_1 + t(y_2 - y_1) = y_p$$

$$t = \frac{y_p - y_1}{y_2 - y_1}$$

**Substitute into x equation:**

$$x = x_1 + \frac{y_p - y_1}{y_2 - y_1}(x_2 - x_1)$$

**This is the intersection x-coordinate used in the algorithm.**

### Why Use $<$ Instead of $\leq$?

**Edge from $(0, 0)$ to $(0, 10)$:**

Two edges meet at $(0, 10)$.

If we use $\leq$ for both endpoints:
- First edge: $0 \leq y_p \leq 10$ → counts crossing at $y_p = 10$
- Second edge: $10 \leq y_p \leq 20$ → counts crossing at $y_p = 10$

**Double counting!** Same vertex counted twice.

**Solution:** Use $y_1 \leq y_p < y_2$ (include lower, exclude upper).

**Result:** Shared vertices counted exactly once.

---

## Summary

- **Point-in-polygon test** determines if point is inside polygon boundary
- **Ray casting algorithm:** Cast ray to infinity, count edge crossings
- **Odd crossings** → inside; **Even crossings** → outside
- **Complexity:** $O(n)$ where $n$ = number of polygon vertices
- **Implementation:** Check y-range, calculate x-intersection, count if right of point
- Works for **any simple polygon** (convex or concave)
- **Edge cases:** Handle boundaries, holes, and degenerate polygons carefully
- **Applications:** Spatial joins, zonal statistics, habitat analysis, demographic queries
- **Alternative:** Winding number algorithm for self-intersecting polygons

**Next:** In Essay 30, we build on this foundation with **buffer operations**—creating distance zones around points, lines, and polygons using Euclidean distance fields.

---
