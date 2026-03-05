---
layout: model
title: "Urban Scaling Laws and City Structure"
subtitle: "Zipf's law, power laws for infrastructure, superlinear creativity, and the von Thünen rent gradient"
date: 2026-03-05
categories: modelling
series: computational-geography-laboratory
series_order: 100
cluster: "AL — Land Use and Demographic Dynamics"
cluster_order: 2
tags: [math, viz, essay]
math: true
viz: true
math_core:
  - power laws
  - log-log regression
  - optimisation (rent gradient)
  - dimensional analysis
spatial_reasoning: city-scale patterns
dynamics: scaling and self-similarity
computation: rank-size analysis
domain: urban economics / complexity science
difficulty: 3
prerequisites:
  - A3
  - D10
notebook_url: https://github.com/waywardhouse/computational-geography-lab/tree/main/essays/AL2-scaling-laws
excerpt: >
  Double the population of a city and its GDP grows by more than double, its road
  network by less than double, and the number of patent applications by even more.
  These superlinear and sublinear scaling relationships — power laws relating urban
  quantities to city size — appear to be universal across countries, historical
  periods, and continents. This essay derives the scaling exponents, explains why
  they arise from network geometry, applies Zipf's law to the rank-size distribution
  of cities, and derives the von Thünen land rent gradient that explains the spatial
  structure of land use within a city.
math_prerequisites: >
  Logarithms and power functions (Essay A3). The concept of proportional
  reasoning and dimensional analysis. Basic calculus (differentiation) for the
  rent gradient derivation.
---

In 1949, George Kingsley Zipf noticed something strange about the cities of the United States. If you ranked them by population — New York first, Los Angeles second, Chicago third, and so on — and plotted rank against population on a log-log graph, the data fell almost perfectly on a straight line with slope −1. This meant that the second-largest city had roughly half the population of the largest, the third-largest roughly one-third, and so on. The same pattern appeared for cities in every country with sufficient data, and for words in texts, and for earthquake magnitudes, and for firm sizes.

Zipf's law is an example of a **power law** — a relationship where one quantity varies as a fixed power of another. Cities exhibit power laws not just in their size distribution but in their internal structure: roads, patents, crime, restaurants, and walking speed all scale with city population as power laws, with exponents that cluster around 1.15 for socioeconomic quantities (superlinear) and 0.85 for infrastructure (sublinear).

---

## 1. The Question

What is Zipf's law and why does the city size distribution follow it? What do scaling exponents for infrastructure and economic output reveal about the nature of cities? And how does the von Thünen model explain the concentric ring structure of land use within a city?

---

## 2. The Conceptual Model

Cities are not random collections of people — they are networks where proximity enables interaction, and interaction generates economic value. The scaling laws emerge from the geometry of these networks.

The **sublinear scaling** of infrastructure (roads, water pipes, electrical wires) arises because a larger city allows these networks to serve more people with proportionally less total length — a geometric efficiency gain that scales as $N^{2/3}$ for a network embedded in 2D space.

The **superlinear scaling** of socioeconomic quantities (GDP, patents, crime, disease) arises because the number of possible pairwise interactions in a city of $N$ people scales as $N^2$, but the interaction rate is also enhanced by denser, better-connected urban networks — producing an effective scaling exponent above 1.

The **von Thünen land rent gradient** explains the internal spatial organisation of a city: land closest to the centre commands the highest rent because the time and cost of commuting to the centre is lowest. Different land uses have different rent gradients (slopes), and the city's ring structure emerges from the competition among them.

---

## 3. Building the Mathematical Model

### 3.1 Power Laws and Log-Log Analysis

A power law relationship between city quantity $Y$ (e.g., GDP) and population $N$ takes the form:

$$Y = Y_0 \cdot N^\beta$$

where $\beta$ is the **scaling exponent**. Taking logarithms of both sides:

$$\ln Y = \ln Y_0 + \beta \ln N$$

This is a linear relationship between $\ln Y$ and $\ln N$ — the signature of a power law is a straight line on a log-log plot. The slope is the scaling exponent $\beta$.

Three regimes:
- $\beta < 1$: **sublinear scaling** — the quantity grows slower than city size (infrastructure: roads, power lines)
- $\beta = 1$: **linear scaling** — the quantity grows proportionally with city size (housing units, employment)
- $\beta > 1$: **superlinear scaling** — the quantity grows faster than city size (GDP, patents, crime, restaurants, wages)

Empirically documented scaling exponents (Bettencourt et al. 2007, West 2017):

| Quantity | Exponent $\beta$ | Interpretation |
|---|---|---|
| Road surface area | 0.83 | Sublinear: larger cities need less road per person |
| Electrical cable length | 0.87 | Sublinear: infrastructure economies of scale |
| Housing units | 1.00 | Linear: one unit per household regardless of size |
| Employment | 1.00 | Linear |
| GDP | 1.13 | Superlinear: +13% per doubling |
| Patent applications | 1.27 | Superlinear: innovation accelerates |
| Wages | 1.12 | Superlinear |
| Crime incidence | 1.16 | Superlinear: same mechanism as innovation |
| New AIDS cases | 1.23 | Superlinear: disease spread is also a network phenomenon |

The same network mechanism that accelerates innovation also accelerates disease and crime — superlinear scaling of interaction has no inherent moral valence.

**Calibration by OLS on log-transformed data:**

Given observations $(N_i, Y_i)$ for a sample of cities, estimate $\beta$ by ordinary least squares on the log-log regression:

$$\hat{\beta} = \frac{\sum_i (\ln N_i - \overline{\ln N})(\ln Y_i - \overline{\ln Y})}{\sum_i (\ln N_i - \overline{\ln N})^2}$$

### 3.2 Zipf's Law for City Size Distribution

**Zipf's law** (or the rank-size rule) states that the population $P(r)$ of the city with rank $r$ follows:

$$P(r) = \frac{P_1}{r^\alpha}$$

where $P_1$ is the population of the largest city and $\alpha \approx 1$ for most national city systems. Taking logs:

$$\ln P(r) = \ln P_1 - \alpha \ln r$$

A log-log plot of population against rank gives a straight line with slope $-\alpha$.

Zipf's law is equivalent to saying city sizes follow a **Pareto distribution** with shape parameter $\alpha$. The probability that a randomly chosen city has population greater than $P$ is:

$$\Pr(\text{pop} > P) = \left(\frac{P_{\min}}{P}\right)^\alpha$$

**Why does $\alpha \approx 1$?** Several mechanisms produce Zipf's law, including: random proportional growth (Gibrat's rule — cities grow at random rates proportional to current size), maximum entropy subject to constraints, and self-organised criticality in settlement systems. No single mechanism is universally accepted; Zipf's law is empirically robust but theoretically contested.

**Canadian city sizes:** For Canada's Census Metropolitan Areas, the rank-size rule applies approximately with $\alpha \approx 0.95$: Toronto (~6.2M), Montreal (~4.3M), Vancouver (~2.7M), Ottawa-Gatineau (~1.4M), Calgary (~1.3M). The ratio between ranks 1 and 5 is $6.2/1.3 = 4.8 \approx 5^{0.95}$, confirming near-Zipf behaviour.

### 3.3 Infrastructure Scaling and the 2D Network Geometry Argument

Why does road length scale sublinearly with population? Consider a city as a circular area of radius $R$ with population density $\rho$ (persons per unit area), so total population $N = \pi R^2 \rho$. Assume the road network provides access within walking distance $\ell$ of every resident. The total road length needed to cover the city area with spacing $\ell$ is:

$$L_{\text{road}} \sim \frac{\pi R^2}{\ell} = \frac{N}{\rho \ell}$$

If density $\rho$ and walking distance $\ell$ are approximately constant across city sizes, then $L_{\text{road}} \sim N$ — linear scaling. But if, as cities grow, density increases (taller buildings, more compact land use) as $\rho \sim N^{1/3}$, then:

$$L_{\text{road}} \sim N / N^{1/3} = N^{2/3}$$

Sublinear scaling with exponent $2/3 \approx 0.67$. The empirical exponent $\beta \approx 0.83$ is between $2/3$ and 1, consistent with partial density increase — cities do get denser as they grow, but not as fast as the idealised 2D geometric argument predicts.

### 3.4 Superlinear Scaling and Social Interactions

The superlinear scaling of economic and social outputs arises from interaction rates. In a city of $N$ people, the number of possible pairwise interactions is $N(N-1)/2 \approx N^2/2$. If output per interaction is constant, total output scales as $N^2$ — superlinear.

But not all $N^2$ pairs interact; interaction rate falls with distance. The **social interaction integral** for a city of density $\rho$ and radius $R$:

$$I = \int_0^R \int_0^R \rho^2 f(d_{ij}) \cdot 2\pi r \, dr \, dr'$$

where $f(d_{ij})$ is the probability of interaction at distance $d_{ij}$. If $f(d) \propto d^{-\mu}$ (power-law decay), the total interaction scales as $N^\beta$ with $\beta > 1$ — the exact exponent depending on the geometry, density profile, and distance decay.

Bettencourt (2013) shows analytically that the scaling exponent $\beta = (D+1)/D$ where $D$ is the effective spatial dimension of the urban interaction network. For $D = 2$ (planar city): $\beta = 3/2$. For $D$ between 2 and 3 (accounting for 3D building structure): $\beta \approx 1.1$–$1.2$, consistent with observed exponents.

### 3.5 The Von Thünen Land Rent Gradient

The **von Thünen model** (1826, updated for urban economics by Alonso 1964) explains the spatial structure of land use within a city as the outcome of competition for central land. Each land use has a **bid rent** — the maximum rent it can pay at each distance from the centre while still covering its costs.

For a firm that needs floor area at the centre to conduct business, the profit is:

$$\pi = \text{Revenue} - \text{Production costs} - \text{Commuting/transport costs} - \text{Rent}$$

Setting $\pi = \pi^*$ (equilibrium profit level) and solving for bid rent $R(d)$ at distance $d$:

$$R(d) = \frac{\text{Revenue} - \text{Production costs} - t \cdot d - \pi^*}{q}$$

where $t$ is the transport cost per unit distance and $q$ is floor area demanded. This is a **linear rent gradient** — rent declines linearly with distance from the centre at rate $t/q$.

Different land uses have different gradients:

- **Commercial/retail:** high revenue density, low floor area demand → steep rent gradient (high intercept, falls rapidly)
- **Residential:** moderate income, moderate commuting cost → intermediate gradient
- **Industrial:** low revenue density, large space requirements → shallow gradient (low intercept, falls slowly)
- **Agriculture:** lowest productivity in urban context → nearly flat gradient

The **envelope** of all bid rent curves determines which land use occupies each zone: the use with the highest bid rent at each distance wins the competition for land. The result is **concentric rings** — commercial core, residential ring, industrial fringe — the classic structure of the monocentric city.

**Mathematical formulation:** Let commercial bid rent be $R_c(d) = a_c - b_c d$ and residential bid rent be $R_r(d) = a_r - b_r d$, with $a_c > a_r$ (commercial has higher central bid) and $b_c > b_r$ (commercial rent falls faster). The transition from commercial to residential occurs at the crossover distance:

$$d^* = \frac{a_c - a_r}{b_c - b_r}$$

At distances $d < d^*$: commercial rent exceeds residential, so commercial use prevails. At $d > d^*$: residential prevails. This crossover defines the edge of the Central Business District (CBD).

**Exponential rent gradient:** Empirically, urban land rent often follows an exponential rather than linear decline:

$$R(d) = R_0 e^{-\gamma d}$$

where $R_0$ is the central land rent and $\gamma$ [km⁻¹] is the rent gradient. Taking logs: $\ln R(d) = \ln R_0 - \gamma d$ — a semilog linear relationship. Typical values: $\gamma \approx 0.1$–$0.3$ km⁻¹ for North American cities, meaning rent declines by $10$–$30\%$ per kilometre from the CBD.

---

## 4. Worked Example by Hand

**Setting:** Calibrate scaling exponents for three Canadian city metrics and verify Zipf's law.

**Scaling calibration (log-log OLS)** — 5 Canadian CMAs:

| City | Pop $N$ (M) | Road km $L$ | Patents $P$ | $\ln N$ | $\ln L$ | $\ln P$ |
|---|---|---|---|---|---|---|
| Toronto | 6.20 | 15,400 | 5,200 | 1.825 | 9.641 | 8.556 |
| Montreal | 4.29 | 10,800 | 2,100 | 1.456 | 9.287 | 7.650 |
| Vancouver | 2.74 | 7,600 | 1,400 | 1.008 | 8.936 | 7.244 |
| Calgary | 1.34 | 4,100 | 580 | 0.293 | 8.319 | 6.363 |
| Edmonton | 1.30 | 3,900 | 520 | 0.262 | 8.268 | 6.254 |

**Road length scaling** (OLS slope of $\ln L$ on $\ln N$):

$$\hat{\beta}_L = \frac{\text{Cov}(\ln N, \ln L)}{\text{Var}(\ln N)} \approx 0.87$$

**Patent scaling:**

$$\hat{\beta}_P \approx 1.22$$

Road infrastructure scales sublinearly (economies of scale: larger cities need proportionally less road per resident). Patent output scales superlinearly (innovation clusters: doubling population more than doubles invention).

**Von Thünen crossover:**

Commercial: $R_c(d) = 4800 - 320d$ $/m²/yr; Residential: $R_r(d) = 1200 - 80d$

$$d^* = \frac{4800 - 1200}{320 - 80} = \frac{3600}{240} = 15 \text{ km}$$

The CBD extends approximately 15 km from the city centre — at this distance, commercial and residential land compete equally, and beyond it, residential use outbids commercial for land.

---

## 5. Computational Implementation

```
function fit_scaling_exponent(N_array, Y_array):
    ln_N = log(N_array)
    ln_Y = log(Y_array)
    beta = covariance(ln_N, ln_Y) / variance(ln_N)
    ln_Y0 = mean(ln_Y) - beta * mean(ln_N)
    return beta, exp(ln_Y0)

function zipf_exponent(populations):
    ranks = argsort(argsort(-populations)) + 1   # rank 1 = largest
    ln_r = log(ranks)
    ln_P = log(populations)
    alpha = -covariance(ln_r, ln_P) / variance(ln_r)
    return alpha

function bid_rent(d_km, a, b):
    return max(0, a - b*d_km)

function cbd_radius(a_comm, b_comm, a_res, b_res):
    return (a_comm - a_res) / (b_comm - b_res)
```

```{pyodide}
import numpy as np

def fit_scaling(N, Y):
    lnN, lnY = np.log(N), np.log(Y)
    beta = np.cov(lnN, lnY)[0,1] / np.var(lnN)
    lnY0 = np.mean(lnY) - beta * np.mean(lnN)
    return beta, np.exp(lnY0)

# Canadian CMA data
N = np.array([6.20, 4.29, 2.74, 1.34, 1.30]) * 1e6
L = np.array([15400, 10800, 7600, 4100, 3900])  # road km
P = np.array([5200, 2100, 1400, 580, 520])       # patents

beta_L, _ = fit_scaling(N, L)
beta_P, _ = fit_scaling(N, P)
print(f"Road length scaling exponent β = {beta_L:.3f} (sublinear, < 1)")
print(f"Patent scaling exponent β = {beta_P:.3f} (superlinear, > 1)")

# Zipf's law check
ranks = np.argsort(np.argsort(-N)) + 1
cities = ['Toronto','Montreal','Vancouver','Calgary','Edmonton']
print("\nZipf rank-size check (α ≈ 1):")
P1 = N[0]  # Toronto
for i, (city, n, r) in enumerate(zip(cities, N, ranks)):
    zipf_pred = P1 / r
    print(f"  Rank {r}: {city:10s}  obs={n/1e6:.2f}M  Zipf pred={zipf_pred/1e6:.2f}M")

# Von Thünen crossover
a_c, b_c = 4800, 320  # commercial rent gradient
a_r, b_r = 1200, 80   # residential rent gradient
d_star = (a_c - a_r) / (b_c - b_r)
print(f"\nVon Thünen CBD radius: {d_star:.1f} km")

# Show rent at various distances
print("Land rent by distance:")
for d in [0, 5, 10, 15, 20, 25, 30]:
    Rc = max(0, a_c - b_c*d)
    Rr = max(0, a_r - b_r*d)
    dominant = "commercial" if Rc > Rr else "residential"
    print(f"  {d:3d}km: commercial=${Rc}, residential=${Rr} → {dominant}")
```

---

## 6. Visualization

<div data-viz="echarts" style="height:420px" data-options='{
  "title": {"text": "Von Thünen Bid Rent Gradients — Land Use Competition by Distance", "textStyle": {"fontSize": 14}},
  "tooltip": {"trigger": "axis"},
  "legend": {"data": ["Commercial/Retail", "Residential", "Industrial", "Agriculture"], "bottom": 0},
  "xAxis": {"name": "Distance from city centre (km)", "nameLocation": "middle", "nameGap": 30,
    "data": [0, 5, 10, 15, 20, 25, 30, 40, 50]},
  "yAxis": {"name": "Bid rent ($ m⁻² yr⁻¹)", "nameLocation": "middle", "nameGap": 60},
  "series": [
    {"name": "Commercial/Retail", "type": "line", "smooth": false,
     "data": [4800, 3200, 1600, 0, 0, 0, 0, 0, 0]},
    {"name": "Residential", "type": "line", "smooth": false,
     "data": [1200, 1000, 800, 600, 400, 200, 0, 0, 0]},
    {"name": "Industrial", "type": "line", "smooth": false,
     "data": [600, 570, 540, 510, 480, 450, 420, 360, 300]},
    {"name": "Agriculture", "type": "line", "smooth": false,
     "data": [200, 195, 190, 185, 180, 175, 170, 160, 150]}
  ]
}'></div>

The dominant land use at each distance is determined by the highest bid rent. Commercial wins the CBD (0–15 km here); residential wins the inner suburbs (15–30 km); industrial wins the outer fringe; agriculture dominates the rural-urban interface. The crossover distances define the boundaries between urban zones — which in this stylised model appear as concentric rings, matching the classical monocentric city structure observed in many mid-20th century North American cities.

---

## 7. Interpretation

The power law scaling results carry a profound policy implication: **cities are not just large towns**. They are qualitatively different social and economic environments where per-capita economic output, innovation, crime, and disease all exceed the linear sum of their residents' individual contributions. This superlinear scaling is the economic argument for cities — the reason why urbanisation has historically been the most reliable pathway to rising living standards.

The sublinear infrastructure scaling is equally important: it means that larger cities are more resource-efficient per capita, not less. The highway lane-miles, water mains, and electrical cables needed to serve one million people in a single dense city are less than those needed to serve the same million in ten small cities of 100,000. This directly contradicts the intuition that urban density creates inefficiency — at the infrastructure level, density is efficiency.

The von Thünen model predicts a monocentric city with concentric land use rings. Real cities are polycentric — multiple employment centres create multiple bid rent peaks that deform the simple gradient into a complex surface. The model remains useful as a baseline: the deviations from monocentricity tell us where subcentres have formed, where transportation improvements have flattened the gradient, and where zoning has overridden market rent signals.

---

## 8. What Could Go Wrong?

**Zipf's law fails for small cities and for countries with primate city systems.** In France, Paris (12M) is vastly larger than Lyon (2M) — a Zipf ratio of 6 compared to the expected 2 for a rank-2 city. France is a "primate city" system where historical centralisation of government and culture concentrated population in one city far beyond the Zipf prediction. The law is best tested on systems where growth was relatively unconstrained.

**Scaling exponents vary by country and time period.** The exponents reported by Bettencourt and West are averages across US cities in the 2000s. European cities, Asian cities, and cities in the Global South have different exponents — particularly for infrastructure, where political economy of investment, not just geometric efficiency, determines road length per capita.

**The von Thünen model assumes a monocentric city with a featureless plain.** Real cities have topography, historical industrial sites, rivers, highways, and zoning that create land use patterns that bear little resemblance to concentric rings. The model is best understood as a theory of the forces that generate spatial structure, not a prediction of observed structure — deviations from the model are evidence of other forces (history, topography, policy) operating alongside market rent competition.

**Scaling laws are correlation, not causation.** The superlinear scaling of GDP with city size does not prove that making cities larger causes GDP to grow. Reverse causation (richer cities attract more migrants, growing larger) and omitted variable bias (coastal cities are both larger and more connected to global trade) could generate the same pattern without any causal urban agglomeration effect.

---

## 9. Summary

Cities exhibit systematic power law scaling relationships between size and urban quantities. Infrastructure scales sublinearly ($\beta \approx 0.85$) — larger cities provide infrastructure more efficiently per capita. Socioeconomic outputs (GDP, patents, wages) scale superlinearly ($\beta \approx 1.1$–$1.3$) — larger cities generate disproportionately more economic and social activity through denser interaction networks.

Zipf's law states that the rank-size distribution of cities follows a power law with exponent near 1, producing a straight line on a log-log rank-population plot. The von Thünen model explains the internal spatial structure of the city: land uses with steep bid rent gradients (commercial) occupy the centre; those with shallow gradients (industrial, agricultural) are pushed to the periphery. The CBD boundary occurs where the commercial and residential bid rent curves cross.

**Key equations:**

$$Y = Y_0 N^\beta \quad \Leftrightarrow \quad \ln Y = \ln Y_0 + \beta \ln N$$

$$P(r) = P_1 / r^\alpha \quad \text{[Zipf's law]}$$

$$R(d) = R_0 e^{-\gamma d} \quad \text{[exponential rent gradient]}$$

$$d^* = (a_c - a_r)/(b_c - b_r) \quad \text{[CBD boundary]}$$

---

## Math Refresher

**Power laws and log-log plots.** If $Y = Y_0 N^\beta$, then $\log Y = \log Y_0 + \beta \log N$ — a straight line on a log-log plot. The slope is the exponent $\beta$ and the intercept is $\log Y_0$. This is why log-log plots are the diagnostic tool for power laws: any deviation from a straight line on a log-log plot indicates a departure from power-law behaviour. In particular, an exponential relationship $Y = Y_0 e^{\lambda N}$ would appear as a curve curving upward on a log-log plot (since $\log Y = \log Y_0 + \lambda N / \ln 10$ is linear in $N$, not $\log N$).

**The difference between superlinear scaling and exponential growth.** A superlinear power law $Y \sim N^{1.15}$ says larger cities are proportionally more productive — but the ratio $Y/N \sim N^{0.15}$ grows only slowly with city size. Doubling city size increases per-capita output by $2^{0.15} - 1 = 11\%$. This is modest but cumulative: a city 10× larger produces $10^{0.15} - 1 = 41\%$ more per capita. Exponential growth in time would imply no saturation — cities that grow forever become arbitrarily productive. The power law implies a steady scaling advantage of size but not unbounded acceleration.
