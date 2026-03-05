---
layout: essay
title: "Land Use Change modelling"
subtitle: "Cellular automata, logistic regression, and the simulation of urban growth"
date: 2026-03-05
categories: modelling
series: computational-geography-laboratory
series_order: 99
cluster: "AL — Land Use and Demographic Dynamics"
cluster_order: 1
tags: [math, viz, essay]
math: true
viz: true
math_core:
  - logistic regression
  - cellular automata
  - probability and Markov chains
  - spatial neighbourhood functions
spatial_reasoning: raster grid transitions
dynamics: stochastic urban growth
computation: CA simulation
domain: urban geography / land change science
difficulty: 4
prerequisites:
  - A4
  - C7
  - D11
notebook_url: https://github.com/waywardhouse/computational-geography-lab/tree/main/essays/AL1-land-use-change
excerpt: >
  Cities grow by converting surrounding land — farmland, forest, grassland — cell
  by cell. The probability that any given cell converts in any given year depends
  on its neighbourhood, its physical suitability, its accessibility to roads and
  centres, and planning constraints. Cellular automata encode this rule structure
  into a spatially explicit simulation. This essay derives the logistic regression
  transition probability, defines the neighbourhood effect function, implements a
  basic CA urban growth model, and builds scenario projections validated against
  historical satellite data.
math_prerequisites: >
  The logistic function and probability (Essay A4). Raster as discretised spatial
  function (Essay C7). The concept of spatial diffusion (Essay D11). Basic matrix
  operations.
---

Between 1985 and 2015, the urbanised area of China increased by approximately 5.8 million hectares — an expansion of built-up land roughly the size of France in 30 years. That expansion did not occur randomly. It followed roads, spread outward from existing urban centres in concentric waves, leapfrogged in places where agricultural land was cheap, and concentrated along rivers and flat terrain. Its spatial pattern was the product of millions of individual decisions by landowners, developers, and planners — but those decisions shared common drivers that could, in principle, be modelled.

The **cellular automaton** (CA) approach treats the landscape as a grid of cells, each with a land use state, and simulates change by applying transition rules that depend on the cell's own state, its neighbourhood, and its attributes. It does not model the decisions of individual actors — it models the aggregate outcome of those decisions as a spatially explicit probability field.

---

## 1. The Question

How do we estimate the probability that a cell of agricultural land will convert to urban use in any given year? How does the spatial neighbourhood of a cell affect that probability? How do we validate a CA model against historical data, and how do we use it to project future land use under different scenarios?

---

## 2. The Conceptual Model

Land use change is a **stochastic spatial process**. At each time step, each undeveloped cell has some probability of transitioning to urban (or another developed state) that depends on:

- **Physical suitability:** slope, flood risk, soil quality — factors that determine the physical cost of development
- **Accessibility:** proximity to roads, city centres, transit — factors that determine the economic value of development
- **Neighbourhood effect:** the fraction of already-developed cells in the neighbourhood — urban growth tends to cluster spatially because infrastructure, services, and social networks extend from existing development
- **Policy constraints:** zoning, protected areas, agricultural land reserves — hard or soft limits on development

The **SLEUTH model** (Clarke et al. 1997) and the **FLUS model** (Liu et al. 2017) are the most widely used CA land change models. Both combine logistic-regression-calibrated transition probabilities with neighbourhood effect functions and stochastic selection to produce spatially realistic growth patterns.

---

## 3. Building the Mathematical Model

### 3.1 Logistic Regression for Transition Probability

The probability that cell $(r,c)$ transitions from non-urban to urban at time $t$ is modelled by logistic regression on a set of spatial predictor variables:

$$P_{r,c} = \frac{1}{1 + e^{-z_{r,c}}}$$

where $z_{r,c}$ is the linear predictor (logit):

$$z_{r,c} = \beta_0 + \beta_1 x_1 + \beta_2 x_2 + \ldots + \beta_k x_k$$

Common predictor variables $x_k$:

| Variable | Typical $\beta$ sign | Interpretation |
|---|---|---|
| Distance to city centre | negative | Farther = lower probability |
| Distance to nearest road | negative | Farther from roads = lower probability |
| Slope | negative | Steeper = lower probability |
| Elevation | negative (typically) | Higher = lower probability |
| Distance to existing urban | negative | Farther from built-up = lower probability |
| Soil quality rank | negative | Better farmland = lower probability (ALR protection) |
| Population density (nearby) | positive | More people nearby = higher probability |

Parameters $\beta_k$ are estimated by maximum likelihood on a training sample of observed transitions from historical land use maps (typically comparing land use at two time points, 10–20 years apart). The log-likelihood to maximise:

$$\mathcal{L}(\boldsymbol{\beta}) = \sum_i [y_i \ln P_i + (1 - y_i)\ln(1 - P_i)]$$

where $y_i = 1$ if cell $i$ transitioned and $y_i = 0$ if it did not.

### 3.2 The Neighbourhood Effect Function

The neighbourhood effect $\Omega_{r,c}$ captures urban spread dynamics — the tendency for development to cluster around existing urban areas:

$$\Omega_{r,c}(t) = \frac{\sum_{(r',c') \in \mathcal{N}(r,c)} \mathbf{1}[\text{urban at } t]}{|\mathcal{N}(r,c)|}$$

where $\mathcal{N}(r,c)$ is the Moore neighbourhood (8 surrounding cells) or an extended neighbourhood (up to 5-cell radius). $\Omega_{r,c}$ is the fraction of neighbourhood cells already urbanised — ranging from 0 (isolated cell, no urban neighbours) to 1 (surrounded by urban cells).

The combined transition probability incorporating the neighbourhood effect:

$$P_{r,c}^{\text{combined}} = P_{r,c}^{\text{logistic}} \cdot \left[\alpha + (1-\alpha) \cdot g(\Omega_{r,c})\right]$$

where $\alpha \in [0,1]$ controls the relative weight of the inherent probability vs. neighbourhood influence, and $g(\Omega)$ is a monotonically increasing function of $\Omega$, such as:

$$g(\Omega) = 1 - (1 - \Omega)^\gamma$$

For $\gamma > 1$, growth is initially slow when neighbours are sparse and accelerates as the neighbourhood fills — an S-shaped neighbourhood response. For $\gamma = 1$: $g(\Omega) = \Omega$ (linear).

### 3.3 Demand Allocation and the Stochastic CA Rule

At each time step, the model must convert a specified number of cells $N_t$ (the demand, derived from population projections) from non-urban to urban. The allocation proceeds:

1. Compute $P_{r,c}^{\text{combined}}$ for all eligible non-urban cells
2. Sample a uniform random number $U_{r,c} \sim \text{Uniform}(0,1)$ for each cell
3. Compute a combined score: $\text{Score}_{r,c} = P_{r,c}^{\text{combined}} - U_{r,c}$
4. Rank cells by Score; convert the top $N_t$ cells

This procedure ensures: (a) cells with high probability are most likely selected, but (b) some randomness allows lower-probability cells to occasionally be chosen, producing realistic spatial irregularity. The stochastic component mimics the idiosyncratic decisions of individual developers and landowners that aggregate into the observed noisy spatial pattern.

The demand $N_t$ is typically derived from a demographic model: if zone population grows by $\Delta P$ persons and the residential density is $\delta$ persons per hectare and the average cell size is $A_{\text{cell}}$ hectares:

$$N_t = \frac{\Delta P}{\delta \cdot A_{\text{cell}} \cdot \text{cells per hectare}}$$

### 3.4 FLUS Model: Suitability and Competition

The FLUS (Future Land Use Simulation) model extends the basic CA by handling multiple land use types simultaneously, incorporating competition between land use types for each cell:

$$P_{r,c,k}^{\text{FLUS}} = \frac{P_{r,c,k}^{\text{ANN}} \cdot \Omega_{r,c,k} \cdot sc_{r,c,k}}{\sum_{l} P_{r,c,l}^{\text{ANN}} \cdot \Omega_{r,c,l} \cdot sc_{r,c,l}}$$

where:
- $P_{r,c,k}^{\text{ANN}}$ is the suitability probability for land use $k$ from a neural network (or logistic regression)
- $\Omega_{r,c,k}$ is the neighbourhood effect for type $k$
- $sc_{r,c,k}$ is a competition factor — if type $k$ is in high demand globally, it wins more local competitions

FLUS simultaneously simulates urban expansion, cropland conversion, forest loss, and wetland change — a necessary capability when land use change is not one-way but involves complex multi-type competition across the landscape.

### 3.5 Validation: Figure of Merit

The **Figure of Merit** (FOM) is the standard validation metric for land change models (Pontius et al. 2008):

$$\text{FOM} = \frac{C}{A + B + C + D}$$

where, comparing the simulated change map to the observed change map:
- $A$ = observed change, simulated as no change (missed transitions)
- $B$ = observed no change, simulated as change (false alarms)
- $C$ = observed change, simulated as change, correct location (hits)
- $D$ = observed change, simulated as change, wrong location (location error)

FOM ranges from 0 (no correct predictions) to 1 (perfect). Values of 0.15–0.40 are considered good for urban land change models — the inherent unpredictability of individual cell decisions means FOM rarely exceeds 0.5 even for excellent models.

### 3.6 Scenario Construction

Land change scenarios vary the **demand**, **spatial allocation rules**, and **policy constraints**:

**Business as usual (BAU):** historical growth rate continues; current zoning maintained

**Compact growth:** demand allocated preferentially to infill (cells within existing urban area) and transit corridors; reduced greenfield development

**Sprawl:** higher demand (faster population growth assumption); relaxed edge restrictions; highway extensions increase accessibility to fringe areas

**Conservation:** protected area buffers expanded; agricultural land reserve boundaries tightened; demand concentrated in designated growth zones

For each scenario, run the CA forward 20–40 years and compute outcome metrics: total developed area, loss of agricultural land, infrastructure cost per capita, mean commute time to city centre, biodiversity habitat fragmentation index.

---

## 4. Worked Example by Hand

**Setting:** A 5×5 cell grid representing the fringe of a mid-size Alberta city. Cells are 500 m × 500 m (25 ha each). We want to apply one iteration of the CA to determine which cells convert to urban.

**Existing urban cells (value = 1 in the grid):**

```
0 0 0 0 0
0 0 1 0 0
0 1 1 1 0
0 0 1 0 0
0 0 0 0 0
```

**Logistic transition probabilities $P^{\text{log}}$ (pre-computed from distance and slope data):**

```
0.05 0.08 0.12 0.08 0.05
0.10 0.18 [1]  0.18 0.10
0.12 [1]  [1]  [1]  0.12
0.10 0.18 [1]  0.18 0.10
0.05 0.08 0.12 0.08 0.05
```

**Step 1: Compute neighbourhood fraction $\Omega$ for non-urban cells**

For cell $(1,1)$ (row 1, col 1, 0-indexed): neighbours in Moore neighbourhood are $(0,0),(0,1),(0,2),(1,0),(1,2),(2,0),(2,1),(2,2)$. Urban neighbours: $(1,2),(2,1),(2,2)$ = 3 urban out of 8 neighbours. $\Omega_{1,1} = 3/8 = 0.375$.

For cell $(0,2)$ (top middle): 3 urban neighbours out of 5 valid neighbours = 0.60.

**Step 2: Combined probability** (using $g(\Omega) = \Omega$, $\alpha = 0.3$)

$$P^{\text{comb}}_{1,1} = 0.18 \times [0.3 + 0.7 \times 0.375] = 0.18 \times 0.563 = 0.101$$

$$P^{\text{comb}}_{0,2} = 0.12 \times [0.3 + 0.7 \times 0.60] = 0.12 \times 0.720 = 0.086$$

**Step 3: Sample random numbers** (example for 4 cells):

| Cell | $P^{\text{comb}}$ | $U$ (random) | Score = P - U |
|---|---|---|---|
| (1,1) | 0.101 | 0.42 | -0.319 |
| (1,3) | 0.101 | 0.08 | **+0.021** |
| (0,2) | 0.086 | 0.15 | **-0.064** |
| (2,4) | 0.072 | 0.91 | -0.838 |

If demand $N_t = 1$ cell, convert cell $(1,3)$ — the only positive score. If demand = 0.5 cells on average (stochastic rounding), run the selection with a probability: no cells convert this step, but the scores update for the next.

---

## 5. Computational Implementation

```
function logistic_probability(X, beta):
    z = beta[0] + sum(beta[k] * X[k] for k in 1..K)
    return 1 / (1 + exp(-z))

function neighbourhood_fraction(grid, r, c, radius=1):
    count, total = 0, 0
    for dr in -radius..radius:
        for dc in -radius..radius:
            if (dr,dc) != (0,0) and valid_cell(r+dr, c+dc):
                total += 1
                count += grid[r+dr, c+dc] == URBAN
    return count / total

function ca_step(grid, P_log, alpha, gamma, N_demand):
    candidates = [(r,c) for (r,c) where grid[r,c] != URBAN]
    scores = []
    for (r,c) in candidates:
        omega = neighbourhood_fraction(grid, r, c)
        g_omega = 1 - (1 - omega)**gamma
        P_comb = P_log[r,c] * (alpha + (1-alpha) * g_omega)
        U = random_uniform(0, 1)
        scores.append((P_comb - U, r, c))
    sort scores descending
    convert top N_demand cells to URBAN
    return updated grid
```

```{pyodide}
import numpy as np

def logistic_p(distances_to_road, distances_to_urban, slopes,
               b0=-2.5, b_road=-0.02, b_urban=-0.03, b_slope=-0.05):
    z = (b0 + b_road*distances_to_road + 
         b_urban*distances_to_urban + b_slope*slopes)
    return 1 / (1 + np.exp(-z))

def neighbourhood_omega(grid, r, c):
    rows, cols = grid.shape
    total = urban = 0
    for dr in [-1, 0, 1]:
        for dc in [-1, 0, 1]:
            if dr == 0 and dc == 0: continue
            nr, nc = r+dr, c+dc
            if 0 <= nr < rows and 0 <= nc < cols:
                total += 1
                urban += int(grid[nr, nc])
    return urban / total if total > 0 else 0

def ca_step(grid, P_log, alpha=0.3, gamma=1.5, N_demand=3, rng=None):
    if rng is None: rng = np.random.default_rng(42)
    rows, cols = grid.shape
    scores = []
    for r in range(rows):
        for c in range(cols):
            if grid[r, c] == 0:
                omega = neighbourhood_omega(grid, r, c)
                g_omega = 1 - (1 - omega)**gamma
                P_comb = P_log[r, c] * (alpha + (1-alpha)*g_omega)
                U = rng.uniform()
                scores.append((P_comb - U, r, c))
    scores.sort(reverse=True)
    new_grid = grid.copy()
    for i in range(min(N_demand, len(scores))):
        _, r, c = scores[i]
        new_grid[r, c] = 1
    return new_grid

# 5x5 example
grid = np.array([
    [0,0,0,0,0],
    [0,0,1,0,0],
    [0,1,1,1,0],
    [0,0,1,0,0],
    [0,0,0,0,0]], dtype=float)

P_log = np.array([
    [0.05,0.08,0.12,0.08,0.05],
    [0.10,0.18,0.00,0.18,0.10],
    [0.12,0.00,0.00,0.00,0.12],
    [0.10,0.18,0.00,0.18,0.10],
    [0.05,0.08,0.12,0.08,0.05]])

new_grid = ca_step(grid, P_log, N_demand=2)
print("Urban cells before:", int(grid.sum()))
print("Urban cells after: ", int(new_grid.sum()))
print("\nUpdated grid:\n", new_grid.astype(int))
```

---

## 6. Visualization

<div data-viz="echarts" style="height:420px" data-options='{
  "title": {"text": "CA Urban Growth: Simulated Developed Area vs Year (Three Scenarios)", "textStyle": {"fontSize": 14}},
  "tooltip": {"trigger": "axis"},
  "legend": {"data": ["Sprawl", "Business as usual", "Compact growth"], "bottom": 0},
  "xAxis": {"name": "Year", "nameLocation": "middle", "nameGap": 30,
    "data": [2025, 2030, 2035, 2040, 2045, 2050, 2055, 2060]},
  "yAxis": {"name": "Developed area (km²)", "nameLocation": "middle", "nameGap": 55, "min": 100},
  "series": [
    {"name": "Sprawl", "type": "line", "smooth": true,
     "data": [120, 148, 183, 224, 272, 328, 392, 465]},
    {"name": "Business as usual", "type": "line", "smooth": true,
     "data": [120, 140, 163, 190, 220, 254, 291, 333]},
    {"name": "Compact growth", "type": "line", "smooth": true,
     "data": [120, 132, 146, 161, 177, 195, 215, 236]}
  ]
}'></div>

By 2060, the sprawl scenario produces nearly 2× the developed area of the compact growth scenario for the same population growth. The difference — approximately 230 km² of agricultural and natural land — represents the land use consequence of policy choices made over the next 35 years. The compact scenario achieves the same population accommodation in half the footprint through infill and density intensification, reducing infrastructure costs per capita and preserving agricultural land.

---

## 7. Interpretation

The CA model captures the self-reinforcing spatial dynamics of urban growth: once a cluster of urban cells forms, it increases the neighbourhood effect $\Omega$ for surrounding cells, raising their transition probability and making further growth more likely. This positive feedback produces the characteristic urban fringe pattern — not a uniform expansion outward, but a fingered, irregular boundary that advances most rapidly along roads and transport corridors where logistic suitability probability is highest.

The model also reveals the **path dependence** of urban form. A single large development in a previously empty area becomes a seed for future growth around it, even if the initial development was driven by a one-time subsidy or developer decision that would not have been rational in a different planning context. This means that current development decisions constrain the spatial options available to planners 20–30 years hence — a powerful argument for early, proactive planning of growth boundaries rather than reactive management of existing patterns.

The Agricultural Land Reserve (ALR) in British Columbia and the similar Farmland Identification Program in Alberta represent policy implementations of the conservation scenario — hard constraints on the logistic probability field that prevent high-probability fringe cells from converting regardless of market signals. The CA model allows us to quantify exactly how much agricultural land is saved under different ALR boundary configurations.

---

## 8. What Could Go Wrong?

**Equifinality: many parameter sets produce similar outcomes.** Logistic regression on historical data identifies one set of $\beta$ coefficients, but different parameter combinations may produce equally good fits to the training data and very different projections. Sensitivity analysis across plausible parameter ranges should accompany any scenario projection.

**Non-stationarity of calibrated parameters.** The transition probabilities calibrated on 1990–2010 data may not apply to 2025–2060 projections if the relationship between accessibility, suitability, and development probability has changed. Remote work trends, changing preferences for density, and autonomous vehicles could substantially alter the spatial drivers of development.

**The model does not simulate prices.** Land values, development costs, and regulatory costs are implicit in the historical patterns used to calibrate the model. If carbon pricing, infrastructure levies, or zoning changes alter development economics, the calibrated model will not correctly predict the response. An economic equilibrium model (e.g., urban land use and transport interaction, LUTI) is needed for policy experiments that change relative costs.

**FOM validation is necessary but not sufficient.** A model can achieve a high FOM on the training period and still project poorly 30 years out if the underlying spatial drivers shift. Multi-period cross-validation (calibrate on 1990–2005, validate on 2005–2020) provides more robust assessment than single-period validation.

---

## 9. Summary

Land use change modelling with cellular automata combines a logistic-regression transition probability (capturing physical suitability and accessibility) with a neighbourhood effect function (capturing spatial clustering dynamics) and stochastic allocation (capturing individual decision variability) to simulate urban expansion over decadal timescales.

Model parameters are calibrated from historical land use change observations and validated against withheld data using the Figure of Merit. Scenario projections vary demand trajectories and policy constraints to produce conditional forecasts that inform planning decisions — particularly about agricultural land conservation, infrastructure investment, and the spatial distribution of population growth.

**Key equations:**

$$P_{r,c} = \frac{1}{1+e^{-(\beta_0 + \sum_k \beta_k x_k)}} \quad \text{[logistic transition probability]}$$

$$\Omega_{r,c} = \frac{1}{|\mathcal{N}|}\sum_{(r',c')\in\mathcal{N}} \mathbf{1}[\text{urban}] \quad \text{[neighbourhood fraction]}$$

$$P^{\text{comb}} = P^{\text{log}} \cdot [\alpha + (1-\alpha)(1 - (1-\Omega)^\gamma)]$$

$$\text{FOM} = C/(A+B+C+D) \quad \text{[Figure of Merit]}$$

---

## Math Refresher

**The logistic function and binary classification.** The logistic function $\sigma(z) = 1/(1+e^{-z})$ maps any real number $z$ to the interval $(0,1)$ — making it natural for probabilities. It is the inverse of the logit: $z = \ln[p/(1-p)]$. The logit of a probability is the log-odds. Logistic regression models the log-odds as a linear function of predictors. The coefficient $\beta_k$ means: a unit increase in $x_k$ multiplies the odds of the event by $e^{\beta_k}$. For small probabilities, this is approximately a $\beta_k \times 100\%$ change in probability.

**Cellular automata as discrete dynamical systems.** A CA is a dynamical system on a lattice: state at time $t+1$ depends on state at $t$ through a local rule applied identically to each cell. The mathematics of CA convergence, fixed points, and pattern formation has been studied since von Neumann's work in the 1950s. Urban CA models are stochastic (random elements) and heterogeneous (rules vary by cell attributes) — generalisations of the classical deterministic, homogeneous CA framework, but sharing the same core property of local interactions generating global patterns.

**Maximum likelihood estimation.** Given binary outcomes $y_i \in \{0,1\}$ and predicted probabilities $P_i$, the log-likelihood is $\mathcal{L} = \sum_i [y_i \ln P_i + (1-y_i)\ln(1-P_i)]$. Maximising $\mathcal{L}$ over $\boldsymbol{\beta}$ gives the maximum likelihood estimates — the parameter values that make the observed data most probable under the model. This is equivalent to minimising the **binary cross-entropy loss**, which is the standard loss function for neural network classifiers, establishing a direct connection between logistic regression and deep learning.
