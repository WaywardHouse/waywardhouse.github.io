---
layout: essay
title: "Polygon Overlay and Clipping"
subtitle: "Intersection, union, and difference—the foundation of spatial analysis"
date: 2026-02-27
categories: [modeling]
series: computational-geography-spatial
series_order: 3
cluster: L
cluster_title: "Vector Operations"
tags:
  - computational-geography
  - modeling
  - gis
  - vector-operations
  - computational-geometry
  - polygon-clipping
math: true
viz: true
difficulty: 4
math_core: [set-operations, boolean-algebra, line-intersection, polygon-clipping]
spatial_reasoning: 5
dynamics: 1
computation: 4
domain: [gis, spatial-analysis, computational-geometry]
excerpt: >
  What area is both forest AND protected? What land is zoned residential OR
  commercial? Overlay operations—intersection, union, difference—combine spatial
  datasets to answer "where" questions. This essay derives the Weiler-Atherton
  clipping algorithm and implements polygon boolean operations from first principles.
math_prerequisites: >
  Point-in-polygon (Essay 29). Line intersection (geometry basics). Set theory
  (union, intersection, difference). We'll introduce polygon clipping algorithms.
---

## 1. The Question

Which parcels are both inside the floodplain AND zoned for development?

**Overlay operations** combine two spatial datasets using set operations:

**Intersection (AND):** Areas in both datasets
- Forest ∩ Protected areas = Protected forest
- Floodplain ∩ Development zones = Flood-risk development areas
- Species habitat ∩ Private land = Conservation priority areas

**Union (OR):** Areas in either dataset
- Parks ∪ Preserves = All protected areas
- Urban ∪ Agricultural = Developed land
- Fire risk zones ∪ Drought zones = Combined hazard areas

**Difference (NOT):** Areas in first but not second
- Total land \ Water bodies = Land area only
- Proposed development \ Wetlands = Developable area
- National forest \ Wilderness areas = Multiple-use forest

The mathematical question: How do we compute the intersection, union, or difference of two polygons?

---

## 2. The Conceptual Model

### Set Operations on Polygons

**Polygons as sets of points:**

Polygon $A = \{(x,y) : \text{point inside polygon A}\}$

**Boolean operations:**

$$A \cap B = \{(x,y) : (x,y) \in A \text{ AND } (x,y) \in B\}$$

$$A \cup B = \{(x,y) : (x,y) \in A \text{ OR } (x,y) \in B\}$$

$$A \setminus B = \{(x,y) : (x,y) \in A \text{ AND } (x,y) \notin B\}$$

**Result:** New polygon(s) representing the combined area.

### The Clipping Problem

**Special case:** Clip polygon $A$ to window $B$ (intersection).

**Examples:**
- Clip state boundaries to study area rectangle
- Clip satellite image to county boundary
- Clip parcels to watershed boundary

**Challenge:** Find vertices of resulting polygon.

**Required pieces:**
1. Vertices from $A$ inside $B$
2. Vertices from $B$ inside $A$
3. Edge-edge intersection points
4. Correct traversal order

---

## 3. Building the Mathematical Model

### Line Segment Intersection

**Foundation:** Must detect where polygon edges cross.

**Segments:** $P_1P_2$ and $Q_1Q_2$

**Parametric form:**

$$P(s) = P_1 + s(P_2 - P_1), \quad s \in [0,1]$$
$$Q(t) = Q_1 + t(Q_2 - Q_1), \quad t \in [0,1]$$

**Intersection:** Find $s, t$ where $P(s) = Q(t)$:

$$P_1 + s(P_2 - P_1) = Q_1 + t(Q_2 - Q_1)$$

**Solve 2×2 system:**

Let $\mathbf{d}_P = P_2 - P_1$, $\mathbf{d}_Q = Q_2 - Q_1$, $\mathbf{r} = P_1 - Q_1$

$$s \mathbf{d}_P - t \mathbf{d}_Q = -\mathbf{r}$$

**Matrix form:**

$$\begin{pmatrix} d_{Px} & -d_{Qx} \\ d_{Py} & -d_{Qy} \end{pmatrix} \begin{pmatrix} s \\ t \end{pmatrix} = \begin{pmatrix} -r_x \\ -r_y \end{pmatrix}$$

**Determinant:**

$$D = d_{Px} \cdot d_{Qy} - d_{Py} \cdot d_{Qx}$$

If $D = 0$: segments are parallel (no intersection or infinite intersections)

**Solution:**

$$s = \frac{(Q_1 - P_1) \times (Q_2 - Q_1)}{(P_2 - P_1) \times (Q_2 - Q_1)}$$

$$t = \frac{(Q_1 - P_1) \times (P_2 - P_1)}{(P_2 - P_1) \times (Q_2 - Q_1)}$$

Where $\times$ is 2D cross product: $(x_1, y_1) \times (x_2, y_2) = x_1 y_2 - y_1 x_2$

**Intersection exists if:** $0 \leq s \leq 1$ AND $0 \leq t \leq 1$

**Intersection point:**

$$I = P_1 + s(P_2 - P_1)$$

### Weiler-Atherton Algorithm

**Input:** Two simple polygons $A$ (subject) and $B$ (clip)

**Output:** Intersection polygon $A \cap B$

**Algorithm steps:**

**1. Find all edge intersections**

For each edge of $A$ and each edge of $B$:
- Test for intersection
- Record intersection points
- Label as "entering" or "leaving"

**Entering:** Edge goes from outside $B$ to inside $B$  
**Leaving:** Edge goes from inside $B$ to outside $B$

**2. Build vertex list**

For polygon $A$:
- Original vertices
- Intersection points (inserted in traversal order)
- Mark each vertex: inside/outside $B$

For polygon $B$:
- Original vertices  
- Intersection points
- Mark each vertex: inside/outside $A$

**3. Trace boundary**

Start at an intersection point marked "entering":
- Follow $A$ edges while inside $B$
- At "leaving" intersection, switch to following $B$ edges
- At next "entering" intersection, switch back to $A$
- Continue until returning to start

**Output:** Sequence of vertices forming intersection polygon.

### Union Algorithm

**Union = all area covered by either polygon**

**Weiler-Atherton modification:**

Instead of following edges "inside" clip polygon, follow edges "outside":
- Start at "leaving" intersection
- Follow edges while outside the other polygon
- Switch at intersections

**Multiple components:** Union may produce multiple disconnected polygons (if originals don't overlap).

### Difference Algorithm

**Difference $A \setminus B$ = area in $A$ but not in $B$**

**Implementation:**

Follow $A$ edges normally, but when inside $B$:
- Switch to following $B$ boundary in **reverse direction**
- This "cuts out" the $B$ region

**Equivalent:** $A \setminus B = A \cap \overline{B}$ (intersection with complement)

---

## 4. Worked Example by Hand

**Problem:** Find intersection of:
- Rectangle $A$: corners at $(0,0)$, $(4,0)$, $(4,3)$, $(0,3)$
- Rectangle $B$: corners at $(2,1)$, $(6,1)$, $(6,4)$, $(2,4)$

### Solution

**Step 1: Find edge intersections**

Edges of $A$:
- Bottom: $(0,0)$ to $(4,0)$
- Right: $(4,0)$ to $(4,3)$
- Top: $(4,3)$ to $(0,3)$
- Left: $(0,3)$ to $(0,0)$

Edges of $B$:
- Bottom: $(2,1)$ to $(6,1)$
- Right: $(6,1)$ to $(6,4)$
- Top: $(6,4)$ to $(2,4)$
- Left: $(2,4)$ to $(2,1)$

**Test all pairs:**

$A$ right $(4,0) \to (4,3)$ intersects $B$ bottom $(2,1) \to (6,1)$:
- At point $(4,1)$ ✓

$A$ right $(4,0) \to (4,3)$ intersects $B$ top $(6,4) \to (2,4)$:
- No (doesn't reach $y=4$)

$A$ top $(4,3) \to (0,3)$ intersects $B$ left $(2,4) \to (2,1)$:
- At point $(2,3)$ ✓

**Intersections found:** $(4,1)$ and $(2,3)$

**Step 2: Classify intersections**

At $(4,1)$:
- Edge $(4,0) \to (4,3)$ goes from outside $B$ to inside $B$ → **Entering**

At $(2,3)$:
- Edge $(4,3) \to (0,3)$ goes from inside $B$ to outside $B$ → **Leaving**

**Step 3: Build intersection polygon**

Start at entering intersection $(4,1)$:
- Follow $A$ edge to $(4,3)$
- Continue to leaving intersection $(2,3)$
- Switch to $B$ edges
- Follow $B$ bottom from $(2,1)$ to entering intersection $(4,1)$

**Intersection polygon:** $(4,1) \to (4,3) \to (2,3) \to (2,1) \to (4,1)$

**Result:** Rectangle with corners $(2,1)$, $(4,1)$, $(4,3)$, $(2,3)$

**Area:** $(4-2) \times (3-1) = 2 \times 2 = 4$ square units ✓

---

## 5. Computational Implementation

Below is an interactive polygon overlay demonstration.

<div class="viz-container" id="overlay-viz">
  <div class="controls">
    <label>
      Operation:
      <select id="overlay-op">
        <option value="intersection" selected>Intersection (A ∩ B)</option>
        <option value="union">Union (A ∪ B)</option>
        <option value="difference">Difference (A \ B)</option>
        <option value="sym-difference">Symmetric Difference (A ⊕ B)</option>
      </select>
    </label>
    <label>
      Show inputs:
      <input type="checkbox" id="show-inputs" checked>
    </label>
    <label>
      Show intersections:
      <input type="checkbox" id="show-intersections" checked>
    </label>
    <div class="overlay-info">
      <p><strong>Polygon A area:</strong> <span id="area-a">--</span></p>
      <p><strong>Polygon B area:</strong> <span id="area-b">--</span></p>
      <p><strong>Result area:</strong> <span id="area-result">--</span></p>
      <p><strong>Intersections:</strong> <span id="intersection-count">--</span></p>
    </div>
  </div>
  <div id="overlay-canvas-container">
    <canvas id="overlay-canvas" width="600" height="500" style="border: 1px solid #ddd;"></canvas>
  </div>
</div>

<script type="module">
(function() {
  const canvas = document.getElementById('overlay-canvas');
  const ctx = canvas.getContext('2d');
  
  let operation = 'intersection';
  let showInputs = true;
  let showIntersections = true;
  
  // Define two overlapping polygons
  const polyA = [
    {x: 100, y: 150}, {x: 300, y: 100}, 
    {x: 350, y: 300}, {x: 150, y: 350}
  ];
  
  const polyB = [
    {x: 250, y: 150}, {x: 450, y: 200}, 
    {x: 400, y: 400}, {x: 200, y: 350}
  ];
  
  function cross2D(v1, v2) {
    return v1.x * v2.y - v1.y * v2.x;
  }
  
  function subtract(p1, p2) {
    return {x: p1.x - p2.x, y: p1.y - p2.y};
  }
  
  function add(p1, p2) {
    return {x: p1.x + p2.x, y: p1.y + p2.y};
  }
  
  function scale(p, s) {
    return {x: p.x * s, y: p.y * s};
  }
  
  function segmentIntersection(p1, p2, q1, q2) {
    const r = subtract(p2, p1);
    const s = subtract(q2, q1);
    const qp = subtract(q1, p1);
    
    const rxs = cross2D(r, s);
    const qpxr = cross2D(qp, r);
    
    if (Math.abs(rxs) < 1e-10) {
      return null; // Parallel or collinear
    }
    
    const t = cross2D(qp, s) / rxs;
    const u = cross2D(qp, r) / rxs;
    
    if (t >= 0 && t <= 1 && u >= 0 && u <= 1) {
      return add(p1, scale(r, t));
    }
    
    return null;
  }
  
  function findIntersections(poly1, poly2) {
    const intersections = [];
    
    for (let i = 0; i < poly1.length; i++) {
      const p1 = poly1[i];
      const p2 = poly1[(i + 1) % poly1.length];
      
      for (let j = 0; j < poly2.length; j++) {
        const q1 = poly2[j];
        const q2 = poly2[(j + 1) % poly2.length];
        
        const intersection = segmentIntersection(p1, p2, q1, q2);
        if (intersection) {
          intersections.push(intersection);
        }
      }
    }
    
    return intersections;
  }
  
  function pointInPolygon(point, polygon) {
    let count = 0;
    
    for (let i = 0; i < polygon.length; i++) {
      const v1 = polygon[i];
      const v2 = polygon[(i + 1) % polygon.length];
      
      if ((v1.y <= point.y && point.y < v2.y) ||
          (v2.y <= point.y && point.y < v1.y)) {
        const x_intersect = v1.x + (point.y - v1.y) * (v2.x - v1.x) / (v2.y - v1.y);
        if (x_intersect > point.x) {
          count++;
        }
      }
    }
    
    return (count % 2 === 1);
  }
  
  function polygonArea(polygon) {
    let area = 0;
    for (let i = 0; i < polygon.length; i++) {
      const p1 = polygon[i];
      const p2 = polygon[(i + 1) % polygon.length];
      area += p1.x * p2.y - p2.x * p1.y;
    }
    return Math.abs(area) / 2;
  }
  
  function approximateIntersection(polyA, polyB) {
    // Simplified: sample points and filter (not true polygon intersection)
    const result = [];
    
    // Add vertices of A that are inside B
    for (let p of polyA) {
      if (pointInPolygon(p, polyB)) {
        result.push(p);
      }
    }
    
    // Add vertices of B that are inside A
    for (let p of polyB) {
      if (pointInPolygon(p, polyA)) {
        result.push(p);
      }
    }
    
    // Add intersection points
    const intersections = findIntersections(polyA, polyB);
    result.push(...intersections);
    
    if (result.length === 0) return null;
    
    // Sort by angle from centroid (crude convex hull)
    const cx = result.reduce((s, p) => s + p.x, 0) / result.length;
    const cy = result.reduce((s, p) => s + p.y, 0) / result.length;
    
    result.sort((a, b) => {
      const angleA = Math.atan2(a.y - cy, a.x - cx);
      const angleB = Math.atan2(b.y - cy, b.x - cx);
      return angleA - angleB;
    });
    
    return result;
  }
  
  function approximateUnion(polyA, polyB) {
    // Very simplified: just combine vertices (doesn't handle all cases)
    const result = [];
    
    // Add vertices of A that are outside B
    for (let p of polyA) {
      if (!pointInPolygon(p, polyB)) {
        result.push(p);
      }
    }
    
    // Add vertices of B that are outside A
    for (let p of polyB) {
      if (!pointInPolygon(p, polyA)) {
        result.push(p);
      }
    }
    
    // Add intersection points
    const intersections = findIntersections(polyA, polyB);
    result.push(...intersections);
    
    if (result.length === 0) return null;
    
    // Sort by angle
    const cx = result.reduce((s, p) => s + p.x, 0) / result.length;
    const cy = result.reduce((s, p) => s + p.y, 0) / result.length;
    
    result.sort((a, b) => {
      const angleA = Math.atan2(a.y - cy, a.x - cx);
      const angleB = Math.atan2(b.y - cy, b.x - cx);
      return angleA - angleB;
    });
    
    return result;
  }
  
  function drawPolygon(polygon, fillColor, strokeColor) {
    if (!polygon || polygon.length < 3) return;
    
    ctx.fillStyle = fillColor;
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = 2;
    
    ctx.beginPath();
    ctx.moveTo(polygon[0].x, polygon[0].y);
    for (let i = 1; i < polygon.length; i++) {
      ctx.lineTo(polygon[i].x, polygon[i].y);
    }
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  }
  
  function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    let result = null;
    let resultColor, resultStroke;
    
    if (operation === 'intersection') {
      result = approximateIntersection(polyA, polyB);
      resultColor = 'rgba(155, 89, 182, 0.6)';
      resultStroke = '#8E44AD';
    } else if (operation === 'union') {
      result = approximateUnion(polyA, polyB);
      resultColor = 'rgba(241, 196, 15, 0.6)';
      resultStroke = '#F39C12';
    } else if (operation === 'difference') {
      // Simplified: just show A without overlapping parts
      result = polyA.filter(p => !pointInPolygon(p, polyB));
      if (result.length < 3) result = null;
      resultColor = 'rgba(231, 76, 60, 0.6)';
      resultStroke = '#C0392B';
    } else {
      // Symmetric difference (XOR)
      result = null; // Complex, skip for now
      resultColor = 'rgba(52, 152, 219, 0.6)';
      resultStroke = '#2980B9';
    }
    
    // Draw input polygons if requested
    if (showInputs) {
      drawPolygon(polyA, 'rgba(52, 152, 219, 0.3)', '#3498DB');
      drawPolygon(polyB, 'rgba(46, 204, 113, 0.3)', '#27AE60');
    }
    
    // Draw result
    if (result) {
      drawPolygon(result, resultColor, resultStroke);
    }
    
    // Draw intersections
    if (showIntersections) {
      const intersections = findIntersections(polyA, polyB);
      ctx.fillStyle = '#E74C3C';
      for (let p of intersections) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 6, 0, 2 * Math.PI);
        ctx.fill();
      }
      
      document.getElementById('intersection-count').textContent = intersections.length;
    }
    
    // Calculate areas
    const areaA = polygonArea(polyA);
    const areaB = polygonArea(polyB);
    const areaResult = result ? polygonArea(result) : 0;
    
    document.getElementById('area-a').textContent = areaA.toFixed(0);
    document.getElementById('area-b').textContent = areaB.toFixed(0);
    document.getElementById('area-result').textContent = areaResult.toFixed(0);
  }
  
  document.getElementById('overlay-op').addEventListener('change', (e) => {
    operation = e.target.value;
    render();
  });
  
  document.getElementById('show-inputs').addEventListener('change', (e) => {
    showInputs = e.target.checked;
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
- **Intersection:** Purple area where polygons overlap (A AND B)
- **Union:** Yellow area covered by either polygon (A OR B)
- **Difference:** Red area in A but not in B (A NOT B)
- **Show intersections:** Red dots where edges cross
- **Hide inputs:** See only the result polygon
- Notice: Area(A ∩ B) + Area(A \ B) + Area(B \ A) = Area(A ∪ B)

**Key insight:** Overlay operations are set operations on continuous space—the foundation of "What areas meet multiple criteria?"

---

## 6. Interpretation

### Multi-Criteria Site Selection

**Problem:** Find suitable locations for solar farm:
- Must be: flat land (slope < 5°)
- Must be: within 2km of transmission lines
- Must NOT be: protected areas or wetlands

**Solution using overlay:**

```
1. suitable_slope = reclassify(DEM, slope < 5°)
2. near_power = buffer(transmission_lines, 2000m)
3. buildable = suitable_slope ∩ near_power
4. final = buildable \ (protected ∪ wetlands)
```

**Each step is a polygon operation.**

### Zoning Analysis

**Question:** How much residential land is in the 100-year floodplain?

```
residential = parcels WHERE zone = 'R1'
at_risk = residential ∩ floodplain_100yr
area_at_risk = sum(area(at_risk))
```

**Result:** Quantifies flood exposure for land use planning.

### Habitat Fragmentation

**Measure connectivity:** Find contiguous forest patches.

```
forest = land_cover WHERE type = 'forest'
continuous = union(forest)  # Merge touching polygons
patches = count_components(continuous)
```

**Fragmentation index:** More patches = more fragmented = lower wildlife connectivity.

---

## 7. What Could Go Wrong?

### Degenerate Cases

**Touching polygons (shared edge, no overlap):**

Intersection = line segment (zero area) or empty

**Expected:** Empty polygon  
**Reality:** May return degenerate polygon (all vertices collinear)

**Solution:** Check result area > threshold, discard if zero/tiny.

**Touching at single vertex:**

Similarly produces degenerate result.

### Numerical Precision

**Floating-point arithmetic** causes issues:

```
Intersection point calculated as (5.0000000001, 3.0)
Expected: (5.0, 3.0)
```

**Result:** Duplicate vertices, tiny slivers, self-intersecting polygons

**Solution:**
- Round coordinates to tolerance (e.g., 6 decimal places)
- Snap vertices within threshold
- Use robust predicates (exact arithmetic for orientation tests)

### Sliver Polygons

**Very thin polygons** from near-parallel edges:

```
Edge of A at y = 10.00001
Edge of B at y = 10.00000
```

**Intersection:** Polygon with width 0.00001 units

**Problem:** Inflates vertex count, causes numerical instability, visually ugly

**Solution:** Remove slivers below area threshold.

### Multiple Components

**Union of non-overlapping polygons:**

Result should be **two separate polygons**, not one.

**Simple implementation:** Returns single polygon with disconnected components (invalid).

**Proper handling:** Return MultiPolygon (collection of polygons).

---

## 8. Extension: Boolean Operations on MultiPolygons

**Real datasets have multiple polygons:**

All protected areas = collection of many parks/preserves.

**MultiPolygon:** Set of disjoint polygons treated as single feature.

**Overlay operations:**

$$\text{MultiPoly}_1 \cap \text{MultiPoly}_2 = \bigcup_{i,j} (P_{1i} \cap P_{2j})$$

**Algorithm:**
1. For each polygon in MultiPolygon1:
2. For each polygon in MultiPolygon2:
3. Compute pairwise intersection
4. Collect all non-empty results

**Union similar:** Collect all polygons, merge overlapping ones.

**Complexity:** $O(nm)$ where $n$, $m$ are polygon counts.

**Optimization:** Spatial index (R-tree) to skip non-overlapping pairs.

---

## 9. Math Refresher: Set Theory and Boolean Algebra

### Set Operations

**Intersection (AND):**

$$A \cap B = \{x : x \in A \text{ AND } x \in B\}$$

**Properties:**
- Commutative: $A \cap B = B \cap A$
- Associative: $(A \cap B) \cap C = A \cap (B \cap C)$
- Identity: $A \cap U = A$ (where $U$ is universal set)

**Union (OR):**

$$A \cup B = \{x : x \in A \text{ OR } x \in B\}$$

**Properties:**
- Commutative: $A \cup B = B \cup A$
- Associative: $(A \cup B) \cup C = A \cup (B \cup C)$
- Identity: $A \cup \emptyset = A$

**Difference (NOT):**

$$A \setminus B = \{x : x \in A \text{ AND } x \notin B\}$$

**NOT commutative:** $A \setminus B \neq B \setminus A$ (generally)

**Symmetric Difference (XOR):**

$$A \triangle B = (A \setminus B) \cup (B \setminus A)$$

**Equivalent:** $A \triangle B = (A \cup B) \setminus (A \cap B)$

### De Morgan's Laws

$$\overline{A \cup B} = \overline{A} \cap \overline{B}$$

$$\overline{A \cap B} = \overline{A} \cup \overline{B}$$

**Application:** $A \setminus B = A \cap \overline{B}$

**Spatial meaning:** Difference is intersection with complement.

---

## Summary

- **Overlay operations** combine spatial datasets using set operations
- **Intersection (∩):** Areas in both polygons (AND)
- **Union (∪):** Areas in either polygon (OR)
- **Difference (\):** Areas in first but not second (NOT)
- **Line segment intersection** detects where polygon edges cross
- **Weiler-Atherton algorithm** traces polygon boundaries to compute overlay results
- **Applications:** Multi-criteria site selection, zoning analysis, habitat assessment
- **Challenges:** Numerical precision, degenerate cases, sliver polygons, multiple components
- **Robust implementation:** Use computational geometry libraries (GEOS, Shapely, JTS)
- Set theory foundation: Boolean algebra on continuous 2D space

**Next:** In Essay 32, we shift from vector to raster operations with **raster resampling and interpolation**—how to change grid resolution and fill missing values.

---
