---
layout: model
title: "Accessibility and Travel Demand modelling"
subtitle: "Gravity models, floating catchment areas, and the paradox of induced demand"
date: 2026-03-05
categories: modelling
series: computational-geography-laboratory
series_order: 98
cluster: "AK — Transportation and Accessibility"
cluster_order: 2
tags: [math, viz, essay]
math: true
viz: true
math_core:
  - gravity models
  - logistic functions
  - network flow
  - game theory (Nash equilibrium)
spatial_reasoning: origin-destination flows
dynamics: equilibrium and induced demand
computation: 2SFCA accessibility index
domain: transport geography / urban planning
difficulty: 4
prerequisites:
  - AK1
  - D10
notebook_url: https://github.com/waywardhouse/computational-geography-lab/tree/main/essays/AK2-accessibility
excerpt: >
  Accessibility — the ease with which people can reach destinations — is the
  ultimate purpose of transportation infrastructure, but it is rarely measured
  directly in planning. This essay derives the gravity model for trip distribution,
  calibrates its decay function, applies the two-step floating catchment area method
  to healthcare access, quantifies spatial mismatch between jobs and affordable
  housing, and derives Braess's paradox — the counterintuitive result that adding
  a road can make every driver worse off.
math_prerequisites: >
  Gravity models (Essay D10). Logarithms and power functions. The concept of
  network equilibrium from Essay AK1. Basic differentiation for the decay function
  calibration.
---

In 2012, the city of Stuttgart closed the Sperrstraße — a central road that had been a key shortcut through the city — to reduce through traffic in residential areas. Congestion on the surrounding network did not worsen. In some measurements it improved. Commuters adapted, redistributed across parallel routes, and the system found a new equilibrium that was, on balance, no worse than the original.

This was not a fluke. It was an instance of **Braess's Paradox**: in a network at user equilibrium, removing a road can improve travel times for everyone. The reverse — adding a road — can make everyone worse off. The paradox is not a mathematical curiosity; it is a practical warning that infrastructure investment guided by naive shortest-path logic can produce the opposite of its intended effect.

Understanding why requires a model of how individual route choices aggregate into network flows — which requires the gravity model of trip distribution, the logit model of mode choice, and the concept of user equilibrium. This essay builds that chain.

---

## 1. The Question

How does gravity model calibration connect trip patterns to travel costs? How do we measure accessibility to services spatially? What is the spatial mismatch hypothesis, and how is it quantified? And why does Braess's Paradox arise from rational individual behaviour?

---

## 2. The Conceptual Model

People make travel decisions that depend on origin, destination, cost, and attractiveness. The **gravity model** formalises this by analogy with Newton's gravity: trip flow between two locations is proportional to the "mass" (population, employment) of each and inversely proportional to some function of the travel cost between them.

**Accessibility** is a composite measure of the ease of reaching opportunities — jobs, healthcare, education, parks. It integrates the number of opportunities at each destination with the travel cost to reach them.

**Spatial mismatch** occurs when the geography of jobs and the geography of affordable housing are misaligned — low-income workers cannot afford to live near the jobs available to them, and cannot efficiently access distant jobs due to inadequate transit.

**Braess's Paradox** emerges from the distinction between user-optimal and system-optimal route choices: individual rational behaviour does not guarantee the system optimum.

---

## 3. Building the Mathematical Model

### 3.1 The Gravity Model for Trip Distribution

The unconstrained gravity model predicts the number of trips $T_{ij}$ between origin zone $i$ and destination zone $j$:

$$T_{ij} = k \frac{O_i D_j}{f(c_{ij})}$$

where $O_i$ is the number of trips originating in $i$, $D_j$ is the attractiveness of destination $j$ (employment, retail floor area, population), $c_{ij}$ is the travel cost between $i$ and $j$, and $f(c)$ is the **deterrence function** (also called impedance function) that captures distance decay.

Common deterrence functions:

| Function | Formula | Parameter |
|---|---|---|
| Power law | $f(c) = c^\beta$ | $\beta > 0$ |
| Exponential | $f(c) = e^{\beta c}$ | $\beta > 0$ |
| Gamma | $f(c) = c^\alpha e^{-\beta c}$ | $\alpha, \beta > 0$ |

The **singly-constrained** form fixes total origins: $\sum_j T_{ij} = O_i$, giving:

$$T_{ij} = O_i \cdot \frac{D_j f(c_{ij})^{-1}}{\sum_k D_k f(c_{ik})^{-1}}$$

The denominator is the **accessibility** of origin $i$ — it measures how easy it is to reach opportunities from $i$, weighted by their attractiveness and discounted by travel cost.

The **doubly-constrained** form additionally fixes total arrivals: $\sum_i T_{ij} = D_j$:

$$T_{ij} = A_i O_i B_j D_j f(c_{ij})^{-1}$$

where $A_i$ and $B_j$ are balancing factors found iteratively:

$$A_i = \left[\sum_j B_j D_j f(c_{ij})^{-1}\right]^{-1}, \quad B_j = \left[\sum_i A_i O_i f(c_{ij})^{-1}\right]^{-1}$$

This iterative proportional fitting (Furness algorithm) converges in 5–20 iterations for typical data.

### 3.2 Calibrating the Deterrence Function

The deterrence parameter $\beta$ is calibrated by matching model predictions to observed trip length distributions. If we observe the mean trip length $\bar{c}_{\text{obs}}$, the calibration condition (for exponential deterrence) is:

$$\bar{c}_{\text{model}} = \frac{\sum_{ij} T_{ij} c_{ij}}{\sum_{ij} T_{ij}} = \bar{c}_{\text{obs}}$$

For exponential deterrence, the mean trip cost satisfies:

$$\bar{c} = \frac{1}{\beta}$$

So $\beta = 1/\bar{c}_{\text{obs}}$. If observed mean travel time is 25 minutes: $\beta = 1/25 = 0.04$ min⁻¹.

For power-law deterrence, calibration is performed by linear regression on log-transformed observed trip length distributions:

$$\ln T_{ij} = \text{const} + \ln O_i + \ln D_j - \beta \ln c_{ij}$$

The slope of $\ln T$ against $\ln c$ (holding $O_i D_j$ constant) gives $-\beta$.

### 3.3 Transit Accessibility Metric

The **cumulative opportunities** accessibility measure counts the number of destinations reachable within a travel time threshold $T^*$:

$$A_i^{\text{cum}} = \sum_j D_j \cdot \mathbf{1}[c_{ij} \leq T^*]$$

Simple but insensitive to variation within the threshold. A 45-minute isochrone from a suburb with one bus connection contains far fewer opportunities than one from a transit hub with multiple lines, but they might have the same cumulative count if the destination distribution is similar.

The **gravity-based accessibility** measure (also called the Hansen index) is more sensitive:

$$A_i^{\text{grav}} = \sum_j D_j f(c_{ij})^{-1}$$

This is simply the denominator of the singly-constrained gravity model — the accessibility of origin $i$. It varies continuously with travel cost and properly weights close destinations more than distant ones.

For **transit** specifically, $c_{ij}$ includes walk time + wait time + in-vehicle time + transfer penalty, computed from a time-expanded network representation of the transit schedule.

### 3.4 Two-Step Floating Catchment Area (2SFCA)

The **2SFCA method** (Luo and Wang 2003) measures access to services (healthcare, grocery, parks) accounting for both supply and demand. For healthcare:

**Step 1** — For each supply location $j$ (hospital, clinic), compute the supply-to-demand ratio within a catchment:

$$R_j = \frac{S_j}{\sum_{k: c_{kj} \leq T^*} P_k}$$

where $S_j$ is supply (e.g., number of physicians) at location $j$, $P_k$ is population at zone $k$, and the sum is over all zones within travel time $T^*$ of $j$.

**Step 2** — For each demand location $i$ (population zone), sum the supply-demand ratios of all service locations within its catchment:

$$A_i^{2\text{SFCA}} = \sum_{j: c_{ij} \leq T^*} R_j$$

Interpretation: $A_i^{2\text{SFCA}}$ is the effective number of physicians per person in the catchment of $i$, accounting for competition from other residents using the same facilities. High values indicate good access; values below the regional average indicate underserved areas.

The **enhanced 2SFCA** replaces the binary threshold with a continuous weight function $w(c_{ij})$ (Gaussian or exponential decay), producing smoother accessibility surfaces without the sharp edge effect at $T^*$.

### 3.5 Spatial Mismatch

The **spatial mismatch hypothesis** (Kain 1968) proposes that residential segregation concentrates low-income workers in areas distant from job growth, creating chronic unemployment and underemployment that cannot be attributed to individual characteristics alone.

Quantification uses the **job-housing balance ratio** for zone $i$:

$$\text{JHB}_i = \frac{E_i}{P_{i,\text{working-age}}}$$

where $E_i$ is employment in zone $i$ and $P_{i,\text{working-age}}$ is the working-age population. $\text{JHB} > 1$ indicates a job surplus (commuters travel in); $\text{JHB} < 1$ indicates a housing surplus (residents commute out).

Spatial mismatch occurs when $\text{JHB}$ is systematically low in low-income neighbourhoods and high in high-income suburban employment centres, and when transit access between them is poor. A quantitative test computes:

$$\text{Mismatch}(i) = \bar{c}_{i,\text{low-income}} - \bar{c}_{i,\text{high-income}}$$

where $\bar{c}_{i,k}$ is the income-group-specific mean travel time to employment. Spatial mismatch is confirmed if $\text{Mismatch}(i) > 0$ systematically in areas with high poverty rates.

Edmonton's Métis and First Nations populations living in inner-city neighbourhoods with poor transit connections to suburban industrial employment zones exemplify spatial mismatch in the Canadian context — a pattern documented across every major Canadian city.

### 3.6 Induced Demand

**Induced demand** is the increase in vehicle kilometres travelled (VKT) that results from capacity addition. Expanding highway capacity reduces travel time, which attracts new trips that would otherwise not have occurred (latent demand) and shifts trips from other modes or times of day. The **fundamental law of road congestion** (Duranton and Turner 2011) states that VKT increases approximately proportionally to lane-kilometres of road:

$$\text{VKT} \propto \text{Capacity}^{\beta_{\text{ind}}}, \quad \beta_{\text{ind}} \approx 1.0$$

An elasticity near 1 means that a 10% increase in highway capacity produces a 10% increase in VKT — roughly fully offsetting the added capacity within 5–10 years. This has been empirically documented for US interstate highways, urban expressways, and major arterials in multiple countries.

The mechanism operates through three channels:
1. **Short-run:** existing drivers divert from parallel routes onto the expanded road, increasing frequency of non-work trips, and choosing more distant destinations
2. **Medium-run:** modal shift from transit to driving as travel times improve relative to transit
3. **Long-run:** land use change as employment and housing relocate to exploit reduced access costs

### 3.7 Braess's Paradox

The classic Braess (1968) network has four nodes: origin $O$, destination $D$, and two intermediate nodes $A$ and $B$. There are three edges: $O \to A$ (cost $x/100$ where $x$ is flow), $O \to B$ (cost 45), $A \to D$ (cost 45), $B \to D$ (cost $x/100$), and in the extended network, an additional edge $A \to B$ (cost 0).

**Without $A \to B$:** Each of the 4000 travellers (assuming 4000 vehicles) either takes route $O \to A \to D$ or $O \to B \to D$. At user equilibrium, both routes have equal cost:

$$\frac{2000}{100} + 45 = 45 + \frac{2000}{100} = 65 \text{ minutes}$$

Each traveller takes 65 minutes.

**With $A \to B$ (zero cost):** Now travellers can use route $O \to A \to B \to D$. At the new equilibrium, all 4000 travellers use this route (since the $A \to B$ edge has zero cost and the $A \to D$ and $O \to B$ edges have constant cost 45):

- Route $O \to A \to B \to D$: $\frac{4000}{100} + 0 + \frac{4000}{100} = 40 + 0 + 40 = 80$ minutes

Adding the zero-cost road made everyone 15 minutes worse off. The paradox arises because the selfish individually-optimal route ($A \to B$) is also collectively suboptimal.

The **social optimum** (system optimum, not user equilibrium) with the extra road would split traffic 2000 per route and achieve 65 minutes — but no individual would voluntarily choose routes $O \to A \to D$ or $O \to B \to D$ when the apparently better $O \to A \to B \to D$ exists, even though taking it makes everyone worse off.

Braess's Paradox has been empirically documented in Seoul (after dismantling an elevated highway, traffic improved), Stuttgart (Sperrstraße closure), and New York (closing Broadway in Times Square improved nearby traffic flow).

---

## 4. Worked Example by Hand

**Setting:** Estimate 2SFCA healthcare accessibility for two Edmonton zones — a dense inner-city neighbourhood (Zone I) and a suburban area (Zone S).

**Given:**
- Catchment threshold: $T^* = 30$ min by transit
- Clinic A (downtown, 8 physicians) accessible from Zone I (1200 people, 20 min) and Zone S (500 people, 28 min); also from Zone X (800 people, 15 min)
- Clinic B (suburban, 3 physicians) accessible from Zone S (500 people, 10 min) and Zone Y (300 people, 20 min) only

**Step 1: Supply-demand ratios**

$$R_A = \frac{8}{1200 + 500 + 800} = \frac{8}{2500} = 0.0032 \text{ physicians/person}$$

$$R_B = \frac{3}{500 + 300} = \frac{3}{800} = 0.00375 \text{ physicians/person}$$

**Step 2: Accessibility scores**

Zone I is within 30 min of Clinic A only: $A_I = R_A = 0.0032$

Zone S is within 30 min of both clinics: $A_S = R_A + R_B = 0.0032 + 0.00375 = 0.00695$

**Interpretation:** Zone S has 2.2× better healthcare accessibility than Zone I, despite Zone I being urban and Zone S suburban. The explanation: Clinic B serves a smaller catchment population (800 vs 2500), so Zone S residents face less competition for suburban physicians. Zone I residents must share Clinic A with 1200 other inner-city residents plus 800 more from Zone X.

This counterintuitive result — suburban areas with better healthcare access despite lower density — is a common finding in 2SFCA studies of Canadian cities, and reflects the historical pattern of hospital and clinic location following middle-class residential development rather than concentrations of need.

---

## 5. Computational Implementation

```
function doubly_constrained_gravity(O, D, C, beta, max_iter=50):
    # O[i]: trip origins, D[j]: destinations, C[i,j]: costs
    n, m = len(O), len(D)
    f = exp(-beta * C)            # deterrence matrix
    A = ones(n); B = ones(m)
    for _ in range(max_iter):
        A = 1 / (f @ (B * D))    # row balancing
        B = 1 / (f.T @ (A * O))  # column balancing
    T = outer(A*O, B*D) * f
    return T

function accessibility_2sfca(S, P, C, T_star):
    n_supply, n_demand = len(S), len(P)
    R = zeros(n_supply)
    for j in range(n_supply):
        denom = sum(P[k] for k in range(n_demand) if C[k,j] <= T_star)
        R[j] = S[j] / denom if denom > 0 else 0
    A = zeros(n_demand)
    for i in range(n_demand):
        A[i] = sum(R[j] for j in range(n_supply) if C[i,j] <= T_star)
    return A

function braess_equilibrium(flow_total, has_ab_edge):
    # Returns equilibrium travel time
    if not has_ab_edge:
        return flow_total/2 / 100 + 45   # = 65 for 4000 vehicles
    else:
        return flow_total / 100 + flow_total / 100  # = 80 for 4000
```

```{pyodide}
import numpy as np

def gravity_singly(O, D_j, C, beta):
    """Singly-constrained gravity model."""
    f = np.exp(-beta * C)  # shape (n_orig, n_dest)
    denom = f @ D_j        # accessibility denominator
    T = np.outer(O / denom, D_j) * f
    return T

def accessibility_2sfca(S, P, C, T_star):
    R = np.array([S[j] / np.sum(P[C[:, j] <= T_star])
                  for j in range(len(S))])
    A = np.array([np.sum(R[C[i, :] <= T_star])
                  for i in range(len(P))])
    return A

# Simple 3-origin, 3-destination example
beta = 0.04  # calibrated to mean trip time 25 min
O = np.array([500, 800, 300])
D = np.array([600, 400, 700])
C = np.array([[10, 25, 40], [20, 15, 30], [35, 28, 12]])
T = gravity_singly(O, D, C, beta)
print("Gravity model trip distribution T[i,j]:")
print(np.round(T, 1))

# 2SFCA
S = np.array([8, 3])
P = np.array([1200, 500, 800])
C_hp = np.array([[20, 99], [28, 10], [15, 99]])  # 99=not within threshold
A = accessibility_2sfca(S, P, C_hp, T_star=30)
print(f"\n2SFCA accessibility scores:")
for i, a in enumerate(A):
    print(f"  Zone {i+1}: {a:.5f} physicians/person")

# Braess paradox
print("\nBraess Paradox:")
N = 4000
print(f"  Without A→B edge: {N/2/100 + 45:.0f} min (user equilibrium)")
print(f"  With A→B edge:    {N/100 + N/100:.0f} min (Braess equilibrium)")
print(f"  Social optimum:   {N/2/100 + 45:.0f} min (same as without edge)")
```

---

## 6. Visualization

<div data-viz="echarts" style="height:420px" data-options='{
  "title": {"text": "Gravity Model Distance Decay Functions (normalised)", "textStyle": {"fontSize": 14}},
  "tooltip": {"trigger": "axis"},
  "legend": {"data": ["Power β=1.5", "Power β=2.0", "Exponential β=0.04", "Exponential β=0.08"], "bottom": 0},
  "xAxis": {"name": "Travel time (minutes)", "nameLocation": "middle", "nameGap": 30,
    "data": [5, 10, 15, 20, 25, 30, 40, 50, 60]},
  "yAxis": {"name": "Deterrence f(c) — normalised to f(5)=1", "nameLocation": "middle", "nameGap": 55},
  "series": [
    {"name": "Power β=1.5", "type": "line", "smooth": true,
     "data": [1.0, 0.354, 0.171, 0.099, 0.063, 0.043, 0.022, 0.013, 0.009]},
    {"name": "Power β=2.0", "type": "line", "smooth": true,
     "data": [1.0, 0.25, 0.111, 0.063, 0.04, 0.028, 0.016, 0.01, 0.007]},
    {"name": "Exponential β=0.04", "type": "line", "smooth": true,
     "data": [1.0, 0.819, 0.670, 0.549, 0.449, 0.368, 0.247, 0.165, 0.111]},
    {"name": "Exponential β=0.08", "type": "line", "smooth": true,
     "data": [1.0, 0.670, 0.449, 0.301, 0.202, 0.135, 0.061, 0.027, 0.012]}
  ]
}'></div>

Power-law deterrence drops steeply for short trips (strongly penalising any distance) then levels off. Exponential decay falls at a constant proportional rate — every 10-minute increase in travel time multiplies the deterrence by the same factor ($e^{-\beta \times 10}$). Choice of functional form changes the predicted spatial structure of trips: power-law calibration overpredicts local trips and underpredicts long-distance travel compared to exponential. Calibration to observed trip length distributions selects the form and parameter appropriate to each city and trip purpose.

---

## 7. Interpretation

The 2SFCA result — that suburban zones can have higher healthcare accessibility than inner-city zones despite lower density — illustrates a general principle: accessibility depends not just on proximity to facilities, but on competition for those facilities. Dense neighbourhoods have many nearby residents competing for the same doctors, emergency departments, and specialists. Low-density suburbs may have fewer facilities but also fewer competing users.

This has direct policy implications. Equity-focused healthcare planning should allocate new facilities to areas with lowest 2SFCA scores, not simply lowest facility density — these can be different places. In Edmonton, the inner-city neighbourhoods near Commonwealth Stadium and Boyle Street have among the lowest healthcare accessibility in the metro area, despite being geographically central, because the catchment population is large and competition for limited inner-city clinic capacity is intense.

Braess's Paradox reinforces the central lesson: transportation systems are not simple linear machines where more capacity always means better performance. They are networks of strategic actors whose collective equilibrium behaviour can diverge sharply from any individual's intent. The practical implication for infrastructure planning is that demand modelling must use equilibrium-consistent methods — not naive shortest-path assignment — and must explicitly account for induced demand in capacity expansion scenarios.

---

## 8. What Could Go Wrong?

**The gravity model assumes spatial stationarity.** The same deterrence function applies everywhere and to all trip purposes. In reality, commute trips have different distance decay than shopping trips; trips in transit-rich areas have different patterns than car-dependent suburbs. Separate calibration by trip purpose and area type is standard practice but rarely achieves the spatial resolution needed to capture neighbourhood-level variation.

**2SFCA ignores within-catchment spatial variation.** All destinations within the threshold $T^*$ are treated equally (binary weight). A facility at 5 minutes is not functionally equivalent to one at 28 minutes for a 30-minute threshold. The enhanced 2SFCA addresses this with continuous weight functions but requires choosing a decay function shape — which may introduce as much uncertainty as the binary threshold it replaces.

**Induced demand estimates are long-run elasticities.** The $\beta_{\text{ind}} \approx 1.0$ estimate from Duranton and Turner applies over 5–10 year periods as land use adapts. In the short run (1–2 years), induced demand is lower — perhaps 0.3–0.5 elasticity. Infrastructure cost-benefit analyses that use short-run demand estimates and long project lifetimes systematically overstate net benefits.

**Braess's Paradox requires specific network topology.** Not every road addition creates the paradox. It requires a specific configuration where the added link provides a route that is individually attractive but collectively suboptimal — a condition that is more common than intuition suggests but is not universal. Network models must be checked for Braess configurations before dismissing counterintuitive capacity addition results as model errors.

---

## 9. Summary

The gravity model of trip distribution captures how travel flows between zones depend on origin and destination sizes and the deterrence of travel cost, calibrated to observed trip length distributions through the deterrence parameter $\beta$. The doubly-constrained variant ensures row and column sums match observed totals through iterative balancing.

The 2SFCA method measures service accessibility accounting for both proximity to supply and competition from surrounding demand, producing an interpretable supply-per-person metric that correctly identifies underserved areas even when facilities are nearby. Spatial mismatch — the misalignment of job and housing geography by income — is quantified through job-housing balance ratios and differential travel times.

Braess's Paradox demonstrates that user equilibrium traffic assignment is not system-optimal: selfish individual route choices can make everyone worse off when a new road creates a dominant but collectively harmful strategy. The empirical law of induced demand shows that highway capacity expansion attracts new traffic with an elasticity near 1 — approximately fully offsetting the added capacity within a decade.

**Key equations:**

$$T_{ij} = A_i O_i B_j D_j f(c_{ij})^{-1} \quad \text{[doubly-constrained gravity]}$$

$$R_j = \frac{S_j}{\sum_{k:\, c_{kj} \leq T^*} P_k}, \quad A_i^{2\text{SFCA}} = \sum_{j:\, c_{ij} \leq T^*} R_j$$

$$A_i^{\text{grav}} = \sum_j D_j f(c_{ij})^{-1} \quad \text{[Hansen accessibility]}$$

---

## Math Refresher

**Iterative proportional fitting (Furness algorithm).** The doubly-constrained gravity model balancing factors $A_i$ and $B_j$ are found by alternately normalising rows and columns of the trip matrix until both marginal sums match observed totals. Each iteration reduces the imbalance by a constant factor — the algorithm converges geometrically. This is the same mathematical structure as the EM algorithm in statistics and the Sinkhorn algorithm in optimal transport.

**User equilibrium as a Nash equilibrium.** Wardrop's user equilibrium condition is equivalent to a Nash equilibrium in a non-cooperative game where each driver chooses a route to minimise their own travel time. No driver can unilaterally improve by switching routes. Braess's Paradox arises because the Nash equilibrium (user optimum) differs from the social optimum — a classic illustration of the price of anarchy: the ratio of Nash equilibrium cost to social optimum cost, which can exceed 1 whenever selfish choices externally impose costs on others.

**Distance decay and the decay constant.** For exponential deterrence $f(c) = e^{-\beta c}$, the mean trip length satisfies $\bar{c} = 1/\beta$ — the same relationship as the mean of an exponential distribution. This means the deterrence parameter has a direct physical interpretation: $\beta = 0.04$ min⁻¹ corresponds to a mean trip time of 25 minutes. Doubling $\beta$ halves the predicted mean trip length — a prediction that can be directly tested against observed data to assess model fit.
