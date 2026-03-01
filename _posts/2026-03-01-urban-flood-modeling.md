---
layout: essay
title: "Urban Flood Modeling and Green Infrastructure"
subtitle: "Runoff generation and mitigation in developed watersheds"
date: 2026-02-27
categories: [modeling]
series: computational-geography-atmospheric-hazards
series_order: 11
cluster: Y
cluster_title: "Flood Hydrology"
tags:
  - computational-geography
  - modeling
  - hydrology
  - urban-flooding
  - green-infrastructure
  - low-impact-development
math: true
viz: true
difficulty: 3
math_core: [rational-method, curve-number, hydrograph-routing, detention-storage]
spatial_reasoning: 3
dynamics: 3
computation: 3
domain: [hydrology, urban-planning, civil-engineering, sustainability]
excerpt: >
  How does urbanization affect flooding and how can green infrastructure help?
  Impervious surfaces increase runoff volume and peak flows requiring detention
  basins and low-impact development. This essay derives rational method equations,
  implements SCS Curve Number analysis, demonstrates detention design, and evaluates
  green infrastructure effectiveness for urban stormwater management.
math_prerequisites: >
  IDF curves (Essay 68). Basic hydrology. Conservation of mass. We'll introduce
  urban runoff generation and mitigation strategies from first principles.
---

## 1. The Question

How much will this parking lot increase downstream flooding?

**Urban development problem:**

Natural landscapes → impervious surfaces

**Consequences:**
- **Increased runoff volume:** 50-90% more water reaches streams
- **Higher peak flows:** 2-5× pre-development magnitudes
- **Faster response:** Time to peak reduced from hours to minutes
- **Reduced infiltration:** Groundwater recharge eliminated
- **Water quality degradation:** Pollutant loading (oil, nutrients, sediment)
- **Stream erosion:** Channel incision from increased energy

**Before development (forest/grassland):**
- Rainfall → Infiltration (60-80%)
- Interception by vegetation (10-20%)
- Runoff (10-30%)

**After development (urban):**
- Rainfall → Infiltration (5-15%)
- Runoff (70-90%)
- Direct conveyance to streams

**Regulatory requirement:**

**Zero-increase standard:** Post-development peak ≤ pre-development peak

Achieved through:
- **Detention basins** (temporary storage)
- **Retention basins** (permanent storage + infiltration)
- **Green infrastructure** (distributed controls)

**Applications:**
- Site development permits
- Stormwater management plans
- Municipal separate storm sewer systems (MS4)
- Total Maximum Daily Load (TMDL) compliance
- Green building certification (LEED)

---

## 2. The Conceptual Model

### Rational Method

**Peak discharge estimation:**

$$Q = C \times I \times A$$

Where:
- $Q$ = peak discharge (m³/s or cfs)
- $C$ = dimensionless runoff coefficient (0-1)
- $I$ = rainfall intensity (mm/hr or in/hr)
- $A$ = drainage area (ha or acres)

**Unit conversion (SI):**

$$Q \text{ (m}^3\text{/s)} = \frac{C \times I \text{ (mm/hr)} \times A \text{ (ha)}}{360}$$

**Runoff coefficient $C$:**

Represents fraction of rainfall that becomes runoff.

**Physical meaning:**

$C = 0.1$: 10% runoff, 90% infiltrates (forest)  
$C = 0.9$: 90% runoff, 10% infiltrates (pavement)

**Typical values:**

| Land use | C range |
|----------|---------|
| Forest | 0.05-0.15 |
| Grass/meadow | 0.10-0.25 |
| Residential (1/4 acre lots) | 0.30-0.50 |
| Residential (apartments) | 0.50-0.70 |
| Commercial | 0.70-0.95 |
| Industrial | 0.50-0.90 |
| Asphalt/concrete | 0.90-0.95 |
| Roofs | 0.90-0.95 |

**Composite $C$:**

For mixed land use:

$$C_{composite} = \frac{\sum C_i A_i}{\sum A_i}$$

**Intensity $I$:**

From IDF curves (Essay 68) at duration = time of concentration.

**Time of concentration ($t_c$):**

Time for runoff from most distant point to reach outlet.

**Kirpich equation:**

$$t_c = 0.0078 L^{0.77} S^{-0.385}$$

Where:
- $t_c$ = time (min)
- $L$ = longest flow path (m)
- $S$ = slope (m/m)

**Limitations:**
- Assumes uniform rainfall
- Peak-only (no hydrograph)
- Small watersheds (<80 ha typical)
- Steady-state flow

### SCS Curve Number Method

**Runoff depth from rainfall depth:**

$$Q = \frac{(P - I_a)^2}{P - I_a + S}$$

Where:
- $Q$ = runoff depth (mm)
- $P$ = rainfall depth (mm)
- $I_a$ = initial abstraction (interception, depression storage)
- $S$ = potential maximum retention (mm)

**Standard assumption:**

$$I_a = 0.2S$$

**Simplified equation:**

$$Q = \frac{(P - 0.2S)^2}{P + 0.8S}$$

**Curve Number ($CN$):**

$$S = \frac{25400}{CN} - 254$$ (mm)

Or: $S = \frac{1000}{CN} - 10$ (inches)

**CN ranges:** 0 to 100

**CN = 100:** Impervious (S = 0, all rainfall becomes runoff)  
**CN = 0:** Infinite retention (Q = 0, no runoff)

**Typical values:**

| Land use | Hydrologic soil group | | | |
|----------|----------|----------|----------|----------|
| | A (sand) | B (silt) | C (clay loam) | D (clay) |
| Forest (good) | 25-30 | 55-60 | 70-75 | 77-83 |
| Pasture | 39-49 | 61-69 | 74-79 | 80-84 |
| Residential (1/4 acre) | 51-61 | 68-75 | 79-83 | 84-87 |
| Commercial/business | 85-89 | 89-92 | 92-94 | 93-95 |
| Paved parking | 98 | 98 | 98 | 98 |

**Composite CN:**

$$CN_{composite} = \frac{\sum CN_i A_i}{\sum A_i}$$

**Advantages over Rational:**
- Runoff volume (not just peak)
- Accounts for soil type
- Antecedent moisture conditions

### Unit Hydrograph Theory

**Discharge over time** (not just peak):

**Unit hydrograph:** Response to 1 unit (1 cm, 1 inch) of effective rainfall

**SCS Dimensionless Unit Hydrograph:**

Peak occurs at:

$$t_p = \frac{\Delta t}{2} + t_{lag}$$

Where:
- $\Delta t$ = rainfall duration
- $t_{lag} = 0.6 \times t_c$

**Peak discharge:**

$$q_p = \frac{C \times A}{t_p}$$

Where $C$ = 2.08 (SI units)

**Hydrograph shape:** Triangular or curvilinear (SCS dimensionless)

---

## 3. Building the Mathematical Model

### Detention Basin Sizing

**Objective:**

Reduce post-development peak to ≤ pre-development peak.

**Continuity equation:**

$$\text{Inflow} - \text{Outflow} = \frac{dS}{dt}$$

Where $S$ = storage volume

**Simplified design:**

$$V_{required} = (Q_{in} - Q_{out}) \times t_d$$

Where:
- $Q_{in}$ = post-development peak
- $Q_{out}$ = allowable release rate (= $Q_{pre}$)
- $t_d$ = detention time (typically $2-3 \times t_c$)

**More accurate (routing):**

Solve modified Puls method:

$$\frac{2S_2}{\Delta t} + O_2 = \frac{2S_1}{\Delta t} - O_1 + I_1 + I_2$$

Where:
- $S$ = storage
- $O$ = outflow
- $I$ = inflow
- Subscripts 1, 2 = time steps

**Stage-storage relationship:**

$$V = A_{surface} \times d + \frac{1}{3}(A_{surface} - A_{bottom}) \times d$$

(Approximate basin as truncated pyramid)

**Stage-discharge (orifice):**

$$Q = C_d A_{orifice} \sqrt{2gh}$$

Where:
- $C_d \approx 0.6$ (discharge coefficient)
- $A_{orifice}$ = outlet area (m²)
- $h$ = head (m)

### Green Infrastructure Performance

**Bioretention (rain garden):**

**Design equation:**

$$A_{bio} = \frac{A_{imperv} \times P \times (1 - C)}{n \times d}$$

Where:
- $A_{imperv}$ = contributing impervious area
- $P$ = design storm depth
- $C$ = runoff coefficient of impervious area
- $n$ = media porosity (0.25-0.40)
- $d$ = media depth (typically 0.6-1.2 m)

**Drawdown time:**

$$t = \frac{n \times d}{K}$$

Where $K$ = infiltration rate (typically 25-150 mm/hr)

**Design criteria:** $t < 48$ hours (mosquito breeding)

**Permeable pavement:**

**Infiltration capacity:**

Must exceed design storm intensity:

$$K_{pavement} > I_{design}$$

Typical: $K = 200-1000$ mm/hr (vs $I_{10yr} = 50-100$ mm/hr)

**Void ratio:** 15-40% (aggregate base)

**Green roofs:**

**Retention capacity:**

$$R = d_{media} \times n \times \rho_w$$

Where:
- $d_{media}$ = 50-200 mm
- $n$ = 0.30-0.45
- Results: 15-75 mm retention

**Peak reduction:** 50-90% for small storms (<25 mm)

---

## 4. Worked Example by Hand

**Problem:** Shopping center development and stormwater management

**Site characteristics:**

**Pre-development:**
- Area: 5 hectares
- Land use: Grass/pasture
- Soil: Hydrologic group B (silty loam)
- Slope: 2%
- Longest flow path: 350 m

**Post-development:**
- Building: 1.5 ha (30%)
- Parking: 2.5 ha (50%)
- Landscaping: 1.0 ha (20%)

**Design storm:** 10-year, IDF equation: $I = \frac{1200 T^{0.2}}{(D+10)^{0.8}}$ (mm/hr)

**Calculate:**
1. Pre-development peak discharge
2. Post-development peak discharge
3. Required detention volume
4. Bioretention area needed

### Solution

**Step 1: Time of concentration (pre-development)**

Kirpich equation:

$$t_c = 0.0078 \times 350^{0.77} \times 0.02^{-0.385}$$

$$= 0.0078 \times 54.1 \times 6.54 = 2.76 \text{ min}$$

Round up: $t_c = 5$ min (minimum practical)

**Step 2: Design intensity (10-year, 5-min)**

$$I = \frac{1200 \times 10^{0.2}}{(5+10)^{0.8}} = \frac{1200 \times 1.585}{15^{0.8}} = \frac{1902}{10.1} = 188 \text{ mm/hr}$$

**Step 3: Pre-development peak (Rational Method)**

Grass/pasture, soil B: $C = 0.20$

$$Q_{pre} = \frac{0.20 \times 188 \times 5}{360} = \frac{188}{360} = 0.522 \text{ m}^3\text{/s}$$

**Step 4: Post-development composite $C$**

Buildings (roof): $C = 0.95$  
Parking (asphalt): $C = 0.95$  
Landscaping: $C = 0.25$

$$C_{comp} = \frac{0.95 \times 1.5 + 0.95 \times 2.5 + 0.25 \times 1.0}{5}$$

$$= \frac{1.425 + 2.375 + 0.25}{5} = \frac{4.05}{5} = 0.81$$

**Step 5: Post-development time of concentration**

Paved surfaces reduce $t_c$:

Assume $t_c = 8$ min (sheet flow on pavement + pipe flow)

**New intensity:**

$$I = \frac{1200 \times 1.585}{(8+10)^{0.8}} = \frac{1902}{12.7} = 150 \text{ mm/hr}$$

**Step 6: Post-development peak**

$$Q_{post} = \frac{0.81 \times 150 \times 5}{360} = \frac{608}{360} = 1.69 \text{ m}^3\text{/s}$$

**Step 7: Peak increase**

$$\Delta Q = 1.69 - 0.52 = 1.17 \text{ m}^3\text{/s}$$

**224% increase!**

**Step 8: Detention volume required**

Detention time: $t_d = 30$ min (approximate, routing required for exactness)

$$V = (Q_{post} - Q_{pre}) \times t_d$$

$$V = (1.69 - 0.52) \times 30 \times 60 = 1.17 \times 1800 = 2106 \text{ m}^3$$

**Required storage: 2100 m³**

**Basin dimensions (example):**

Depth: 1.5 m  
Bottom area: $\frac{2100}{1.5 \times 1.5} = 933$ m² (30 × 31 m)  
Top area (with 3:1 side slopes): ~1200 m² (35 × 35 m)

**Step 9: Bioretention alternative**

Design to capture first 25 mm (water quality storm):

Impervious area: $1.5 + 2.5 = 4$ ha

$$A_{bio} = \frac{40000 \times 0.025 \times 0.9}{0.35 \times 0.9}$$

$$= \frac{900}{0.315} = 2857 \text{ m}^2$$

**Bioretention area: 2860 m² (6% of impervious area)**

Typically distributed as:
- Parking lot islands: 1200 m²
- Perimeter gardens: 1000 m²
- Roof runoff planters: 660 m²

**Step 10: Combined approach**

Bioretention handles frequent storms (<25 mm).

Detention handles rare storms (10-year design).

**Reduced detention:** With bioretention pre-treatment, detention can be 20-30% smaller.

---

## 5. Computational Implementation

Below is an interactive urban hydrology calculator.

<div class="viz-container" id="urban-hydro-viz">
  <div class="controls">
    <label>
      Site area (ha):
      <input type="range" id="site-area" min="1" max="20" step="1" value="5">
      <span id="area-val">5</span>
    </label>
    <label>
      Imperviousness (%):
      <input type="range" id="imperv" min="10" max="95" step="5" value="70">
      <span id="imperv-val">70</span>
    </label>
    <label>
      Design storm (years):
      <input type="range" id="return-period" min="2" max="100" step="1" value="10">
      <span id="rp-val">10</span>
    </label>
    <label>
      Green infrastructure:
      <select id="gi-type">
        <option value="none">None</option>
        <option value="bioretention">Bioretention</option>
        <option value="permeable">Permeable pavement</option>
        <option value="greenroof">Green roof</option>
      </select>
    </label>
    <div class="hydro-info">
      <p><strong>Pre-dev Q:</strong> <span id="q-pre">--</span> m³/s</p>
      <p><strong>Post-dev Q:</strong> <span id="q-post">--</span> m³/s</p>
      <p><strong>Increase:</strong> <span id="increase">--</span>%</p>
      <p><strong>Detention volume:</strong> <span id="detention">--</span> m³</p>
    </div>
  </div>
  <div id="hydro-canvas" style="height: 400px;"></div>
</div>

<script type="module">
await new Promise(r => {
  const c = () => typeof echarts !== 'undefined' ? r() : setTimeout(c, 50);
  c();
});

(function() {
  const chart = echarts.init(document.getElementById('hydro-canvas'));
  let area = 5, imperv = 70, returnPeriod = 10, giType = 'none';
  
  function calcIntensity(T, D) {
    return (1200 * Math.pow(T, 0.2)) / Math.pow(D + 10, 0.8);
  }
  
  function render() {
    const tcPre = 5; // min, natural
    const tcPost = 8; // min, developed
    
    const iPre = calcIntensity(returnPeriod, tcPre);
    const iPost = calcIntensity(returnPeriod, tcPost);
    
    const cPre = 0.20; // grass
    let cPost = 0.15 * (1 - imperv/100) + 0.95 * (imperv/100);
    
    // Green infrastructure adjustments
    if (giType === 'bioretention') {
      cPost *= 0.85; // 15% reduction
    } else if (giType === 'permeable') {
      cPost *= 0.70; // 30% reduction
    } else if (giType === 'greenroof') {
      cPost *= 0.90; // 10% reduction
    }
    
    const qPre = (cPre * iPre * area) / 360;
    const qPost = (cPost * iPost * area) / 360;
    const increase = ((qPost - qPre) / qPre * 100);
    const detention = Math.max(0, (qPost - qPre) * 30 * 60);
    
    document.getElementById('q-pre').textContent = qPre.toFixed(2);
    document.getElementById('q-post').textContent = qPost.toFixed(2);
    document.getElementById('increase').textContent = increase.toFixed(0);
    document.getElementById('detention').textContent = detention.toFixed(0);
    
    // Generate hydrographs
    const times = [];
    const preDev = [];
    const postDev = [];
    
    for (let t = 0; t <= 120; t += 2) {
      times.push(t);
      
      // Triangular hydrograph approximation
      const tpPre = tcPre + 5;
      const tpPost = tcPost + 3;
      
      let qPreT, qPostT;
      
      if (t < tpPre) {
        qPreT = qPre * (t / tpPre);
      } else {
        qPreT = qPre * Math.max(0, 1 - (t - tpPre) / 30);
      }
      
      if (t < tpPost) {
        qPostT = qPost * (t / tpPost);
      } else {
        qPostT = qPost * Math.max(0, 1 - (t - tpPost) / 20);
      }
      
      preDev.push(qPreT);
      postDev.push(qPostT);
    }
    
    chart.setOption({
      title: {text: 'Development Impact on Runoff Hydrograph', left: 'center'},
      tooltip: {trigger: 'axis'},
      legend: {data: ['Pre-development', 'Post-development'], top: 30},
      grid: {left: 80, right: 40, top: 70, bottom: 60},
      xAxis: {
        type: 'category',
        data: times,
        name: 'Time (minutes)',
        nameLocation: 'middle',
        nameGap: 30
      },
      yAxis: {
        type: 'value',
        name: 'Discharge (m³/s)',
        nameLocation: 'middle',
        nameGap: 50
      },
      series: [
        {
          name: 'Pre-development',
          type: 'line',
          data: preDev,
          lineStyle: {color: '#66BB6A', width: 3},
          areaStyle: {color: 'rgba(102, 187, 106, 0.3)'}
        },
        {
          name: 'Post-development',
          type: 'line',
          data: postDev,
          lineStyle: {color: '#F44336', width: 3},
          areaStyle: {color: 'rgba(244, 67, 54, 0.3)'}
        }
      ]
    });
  }
  
  ['site-area', 'imperv', 'return-period'].forEach(id => {
    document.getElementById(id).addEventListener('input', e => {
      const val = +e.target.value;
      if (id === 'site-area') {
        area = val;
        document.getElementById('area-val').textContent = val;
      } else if (id === 'imperv') {
        imperv = val;
        document.getElementById('imperv-val').textContent = val;
      } else {
        returnPeriod = val;
        document.getElementById('rp-val').textContent = val;
      }
      render();
    });
  });
  
  document.getElementById('gi-type').addEventListener('change', e => {
    giType = e.target.value;
    render();
  });
  
  render();
})();
</script>

**Observations:**
- Post-development hydrograph peaks higher and faster
- Green area (pre-dev) shows gradual response
- Red area (post-dev) shows flashy response
- Time to peak reduced by 30-50%
- Total runoff volume increased significantly
- Green infrastructure reduces both peak and volume
- Detention storage needs proportional to shaded area between curves

**Key insights:**
- Imperviousness directly controls runoff coefficient
- Higher return periods amplify differences
- Green infrastructure provides meaningful mitigation
- Combined strategies most effective

---

## 6. Interpretation

### Stream Channel Impacts

**Geomorphic consequences:**

**Effective discharge** (2-year flood) increased 2-5×.

**Channel response:**
- Incision (downcutting)
- Bank erosion
- Bed coarsening (fines washed out)
- Loss of pool-riffle structure

**Timeline:** Years to decades for equilibrium

**Mitigation insufficient:**

Traditional detention controls peaks but not duration.

**Stream still receives** elevated flows for longer periods.

**Solution:** Volume control + peak control

### Water Quality Trading

**Total Maximum Daily Load (TMDL):**

Regulatory limit on pollutant loading.

**Urban runoff major contributor:**
- Nutrients (N, P)
- Sediment
- Bacteria
- Metals (Zn, Cu from brake pads)
- Hydrocarbons

**Green infrastructure provides treatment:**

**Bioretention removal:**
- Suspended solids: 80-90%
- Phosphorus: 50-80%
- Nitrogen: 30-60%
- Metals: 60-90%

**Permeable pavement:**
- Suspended solids: 70-95%
- Metals: 50-80%

**Cost comparison:**

Traditional detention: $50-150/m³ storage  
Bioretention: $200-400/m²  
Permeable pavement: $25-75/m² premium over conventional

**Benefits beyond storage:**
- Water quality treatment
- Groundwater recharge
- Urban heat island reduction
- Aesthetics

### Regulatory Evolution

**Traditional approach (1980s-2000s):**

Peak rate control only (Q_post ≤ Q_pre for design storm).

**Modern approach (2010s+):**

**Multi-objective:**
1. Peak rate control (flooding)
2. Volume reduction (stream protection)
3. Water quality treatment (pollution)
4. Groundwater recharge (base flow)

**Performance standards:**

Retain first 25 mm on-site (runoff reduction).

Treat 90% of average annual rainfall.

**Green infrastructure mandates:**

Some jurisdictions require GI for all new development.

Philadelphia: Green City, Clean Waters ($2 billion GI program)

---

## 7. What Could Go Wrong?

### Detention Basin Failures

**Outlet clogging:**

Debris, sediment, ice block orifice.

**Consequence:** Overtopping, dam failure

**Solution:**
- Trash racks
- Multiple outlets (redundancy)
- Regular maintenance

**Improper sizing:**

Used wrong storm (5-year vs 10-year).

Used wrong IDF curve (outdated).

**Consequence:** Insufficient storage, downstream flooding

**Solution:** Third-party peer review, as-built verification

### Green Infrastructure Challenges

**Soil clogging:**

Bioretention media clogs over time (5-15 years).

**Infiltration rate degrades:** 50-90% reduction

**Consequence:** Ponding, bypassing, failure

**Solution:**
- Pretreatment (grass filter, forebay)
- Mulch replacement (annual)
- Media replacement (every 10-20 years)

**Winter performance:**

Frozen soil reduces infiltration.

Snowmelt + frozen ground = maximum runoff.

**Underdrains freeze.**

**Solution:**
- Deep frost-free outlets
- Salt management (reduces freezing but damages plants)

### Maintenance Neglect

**Sediment accumulation:**

Detention basins fill with sediment.

**Volume reduced:** 20-50% after 10 years (if unmaintained)

**Solution:**
- Annual inspection
- Sediment removal (5-10 year cycle)
- Erosion control in watershed

**Vegetation overgrowth:**

Bioretention becomes overgrown, channelized.

**Solution:**
- Annual weeding
- Mulch refreshing
- Plant replacement

---

## 8. Extension: Low Impact Development

**Paradigm shift:**

From "manage runoff" to "prevent runoff generation"

**Principles:**
1. Minimize impervious area
2. Maximize infiltration
3. Distribute controls throughout site
4. Mimic pre-development hydrology

**Techniques:**

**Narrower streets:** 6 m vs 9 m (40% less impervious)

**Bioretention in parking islands:** Treat runoff at source

**Rain gardens:** Residential-scale bioretention

**Cisterns:** Harvest roof runoff for irrigation (volume reduction)

**Disconnected impervious:** Route roof runoff to lawn (not street)

**Performance:**

Well-designed LID can achieve:
- 80-95% runoff volume reduction (small storms)
- 50-70% peak flow reduction
- Near pre-development hydrology

**Case study - Village Homes (Davis, CA):**

Built 1975 with integrated LID.

40 years later: No downstream flooding, despite upstream urbanization.

---

## 9. Math Refresher: Mass Balance

### Continuity Equation

**Conservation of mass:**

$$\text{Inflow} - \text{Outflow} = \frac{d(\text{Storage})}{dt}$$

**Detention basin application:**

$$I(t) - O(t) = \frac{dS}{dt}$$

**Integrated over time step $\Delta t$:**

$$\frac{I_1 + I_2}{2} \Delta t - \frac{O_1 + O_2}{2} \Delta t = S_2 - S_1$$

**Rearranged (Modified Puls):**

$$\frac{2S_2}{\Delta t} + O_2 = \left(\frac{2S_1}{\Delta t} - O_1\right) + (I_1 + I_2)$$

**Solution procedure:**

1. Known: $S_1, O_1, I_1, I_2$
2. Compute right side
3. Use stage-storage-discharge curves
4. Solve for $S_2, O_2$
5. Advance time step, repeat

---

## Summary

Urban development increases runoff 2-5× through impervious surfaces requiring stormwater management via detention and green infrastructure. Rational method estimates peak discharge from runoff coefficient intensity and area with coefficients ranging 0.1 (forest) to 0.95 (pavement). SCS Curve Number method calculates runoff volume from rainfall via CN values 25-98 depending on land use and soil type. Detention basins sized to reduce post-development peaks to pre-development levels typically requiring 1000-5000 m³ for commercial sites. Green infrastructure including bioretention permeable pavement and green roofs provides distributed volume reduction and water quality treatment with 50-90% pollutant removal. Low-impact development principles minimize impervious area and maximize infiltration achieving near pre-development hydrology. Critical for flood mitigation stream protection and water quality compliance in urbanizing watersheds requiring integrated multi-objective design.


---
