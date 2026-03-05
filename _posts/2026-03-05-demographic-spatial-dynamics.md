---
layout: essay
title: "Demographic Spatial Dynamics"
subtitle: "Cohort-component projection, migration flows, and the geography of ageing"
date: 2026-03-05
categories: modelling
series: computational-geography-laboratory
series_order: 101
cluster: "AL — Land Use and Demographic Dynamics"
cluster_order: 3
tags: [math, viz, essay]
math: true
viz: true
math_core:
  - matrix multiplication
  - Leslie matrix
  - probability (survival rates)
  - gravity models
spatial_reasoning: population redistribution
dynamics: cohort ageing and migration
computation: multi-region cohort-component model
domain: demography / population geography
difficulty: 4
prerequisites:
  - A3
  - D10
  - AL1
notebook_url: https://github.com/waywardhouse/computational-geography-lab/tree/main/essays/AL3-demographic-dynamics
excerpt: >
  A city that was growing in 1990 may be shrinking in 2025 — not because people
  are leaving, but because the cohorts that drove its growth have aged past
  childbearing, their children have moved elsewhere, and in-migration has slowed.
  Demographic change is not just a count — it is a structured process involving
  age-sex-specific fertility, mortality, and migration rates that compound over
  decades. This essay derives the cohort-component model, builds the Leslie matrix,
  applies the gravity model to migration flows, and examines the geography of
  population ageing and shrinking cities.
math_prerequisites: >
  Matrix multiplication (introduced here from scratch). Probability as a
  proportion. Exponential growth (Essay A3). The gravity model (Essay D10).
---

In 2022, for the first time in its recorded history, Japan's total population fell below 125 million — a milestone that demographers had been projecting for decades. Japan's fertility rate had been below replacement since 1974, but the demographic momentum of its large working-age population had sustained numerical growth for another 48 years. That momentum is now exhausted. Japan's population is projected to fall to 88 million by 2060, with a median age exceeding 55.

Japan is the leading edge of a global phenomenon. Germany, South Korea, Italy, and dozens of other countries face the same trajectory on a 10–30 year delay. Canada is not exempt: without immigration, its natural population growth rate would already be negative. The spatial expression of this transition — shrinking cities, ageing rural areas, concentrated growth in immigrant-receiving metros — is reshaping the geography of every country that has passed through the demographic transition.

Understanding it quantitatively requires the cohort-component model — the mathematical framework that projects population by age, sex, and location simultaneously.

---

## 1. The Question

How do age-structured demographic models project population forward in time? How does migration redistribute population spatially? What drives population ageing, and how do we model the spatial dynamics of shrinking cities?

---

## 2. The Conceptual Model

Population is not a single number — it is a distribution across ages, sexes, and geographic locations. The **cohort-component model** tracks this distribution over time by applying three demographic processes to each cohort (age-sex group) in each location:

1. **Mortality:** some fraction of each cohort dies in each period
2. **Fertility:** women in childbearing age groups produce children who enter the youngest cohort
3. **Migration:** some fraction of each cohort moves to a different location

The model is exact in the sense that it conserves population: every person either survives to the next period, dies, or moves — no one is created or destroyed except through birth and death.

---

## 3. Building the Mathematical Model

### 3.1 The Cohort-Component Model: Single Region

Divide the population into $n$ age groups (5-year intervals: 0–4, 5–9, ..., 80+). Let $N_i(t)$ be the population in age group $i$ at time $t$, with $i = 1$ for the youngest group.

**Survival:** Each age group $i$ has a survival rate $s_i$ — the probability of surviving through one 5-year period to enter age group $i+1$:

$$N_{i+1}(t+1) = s_i \cdot N_i(t)$$

Survival rates are computed from age-specific mortality rates $m_i$ [deaths per person per year]. For a 5-year interval:

$$s_i = e^{-5 m_i} \approx 1 - 5m_i \quad \text{(for small } m_i\text{)}$$

**Fertility:** Age-specific fertility rates $f_i$ [births per woman per year] for female cohorts in ages 15–49 (groups $i = 4, 5, ..., 10$ in 5-year age groups starting at 0). The number of births in one 5-year period:

$$B(t) = 5 \sum_{i=4}^{10} f_i \cdot N_i^F(t)$$

where $N_i^F$ is the female population in age group $i$. Births are allocated to the youngest age group at $t+1$, split by sex ratio at birth ($\approx 1.05$ males per female):

$$N_1^M(t+1) = B(t) \times \frac{1.05}{2.05} \times s_0^M, \quad N_1^F(t+1) = B(t) \times \frac{1}{2.05} \times s_0^F$$

**Total Fertility Rate (TFR)** — the average number of children a woman would have over her lifetime at current age-specific rates:

$$\text{TFR} = 5 \sum_{i=4}^{10} f_i$$

Replacement-level TFR in most countries: $\approx 2.1$ (slightly above 2 to account for childhood mortality and sex ratio). Canada's TFR in 2023: $\approx 1.44$.

### 3.2 The Leslie Matrix

The cohort-component model can be written compactly as a **matrix equation**. The **Leslie matrix** $\mathbf{L}$ collects all the demographic rates:

$$\mathbf{N}(t+1) = \mathbf{L} \cdot \mathbf{N}(t)$$

For a simple 5-age-group model (ages 0–4, 5–9, 10–14, 15–19, 20+), the Leslie matrix has:
- Survival rates $s_i$ on the **subdiagonal** (ageing from group $i$ to $i+1$)
- Fertility rates in the **first row** (births from each fertile group enter the youngest group)

$$\mathbf{L} = \begin{pmatrix} 0 & 0 & F_3 & F_4 & 0 \\ s_1 & 0 & 0 & 0 & 0 \\ 0 & s_2 & 0 & 0 & 0 \\ 0 & 0 & s_3 & 0 & 0 \\ 0 & 0 & 0 & s_4 & s_5 \end{pmatrix}$$

where $F_i = 5 f_i s_0 / 2$ (adjusted for sex ratio and infant survival). The last element $s_5$ in the corner represents survival within the open-ended oldest age group.

**The dominant eigenvalue $\lambda_1$ of $\mathbf{L}$** determines long-run population growth rate: if $\lambda_1 > 1$, the population eventually grows geometrically at rate $\lambda_1$ per period; if $\lambda_1 < 1$, it eventually declines. The corresponding eigenvector is the **stable age distribution** — the age structure that the population converges to regardless of its initial structure.

For Canada in 2023: $\lambda_1 \approx 0.98$ (ignoring immigration) — natural population decline of $\approx 2\%$ per 5-year period, or $\approx 0.4\%$ per year.

### 3.3 Multi-Region Extension and Migration

In the multi-region cohort-component model, the population vector $\mathbf{N}$ has $n \times r$ elements — $n$ age groups across $r$ regions. Migration rates $m_{ij,k}$ [per person per year] express the probability that a person in age group $k$ moves from region $i$ to region $j$ in one period.

The migration component updates each region:

$$N_j^{k}(t+1)_{\text{after migration}} = N_j^k(t+1)_{\text{before migration}} + \sum_{i \neq j} m_{ij,k} N_i^k(t) - \sum_{i \neq j} m_{ji,k} N_j^k(t)$$

The net in-migration to region $j$ for age group $k$: $\sum_i m_{ij,k} N_i^k - m_{j \cdot, k} N_j^k$ where $m_{j\cdot,k} = \sum_{i \neq j} m_{ji,k}$ is the out-migration rate.

### 3.4 Gravity Model for Migration Flows

Migration flows between regions follow the gravity model (Essay D10):

$$M_{ij} = k \frac{O_i D_j}{d_{ij}^\beta}$$

where $M_{ij}$ is the number of migrants from $i$ to $j$, $O_i$ is the sending population of $i$, $D_j$ is the attractiveness of $j$ (employment rate, wage level, housing cost), and $d_{ij}$ is distance. The exponent $\beta \approx 1.5$–$2.0$ for interprovincial migration in Canada.

The **push-pull framework** decomposes migration probability into:
- **Push factors** in origin $i$: unemployment, low wages, high cost of living, natural disasters
- **Pull factors** in destination $j$: job opportunities, family networks, amenities
- **Distance friction:** cost and disruption of moving

The migration-calibrated gravity model requires balancing observed in- and out-flows, typically using the same doubly-constrained Furness algorithm as the trip distribution model (Essay AK2).

**Age selectivity of migration.** Migration rates are highly age-selective:
- Peak migration ages: 20–30 (young adults pursuing education and first employment)
- Secondary peaks: childhood (moving with parents)
- Trough: 30–50 (established households, children in school)
- Very low: 60+ (retirement migration is real but smaller than young-adult flows)

The age-migration schedule $m(a)$ typically follows a Rogers-Castro model with a dominant working-age peak and a minor retirement peak.

### 3.5 Population Ageing and the Dependency Ratio

The **old-age dependency ratio** (OADR) measures the burden of supporting elderly populations:

$$\text{OADR} = \frac{N_{65+}}{N_{15-64}}$$

As TFR falls below replacement and life expectancy rises, OADR increases. Canada's OADR was $0.21$ in 2000, $0.31$ in 2020, and is projected at $0.45$–$0.50$ by 2040 (assuming continued immigration).

The **demographic dividend** occurs when the working-age population is large relative to both young and old dependents — a transitional phase when fertility has fallen but the large cohort born during the high-fertility period has not yet aged into the elderly group. Countries in the demographic dividend experience rapid economic growth potential from a large, productive workforce with low dependency. East Asian economic growth from 1965–1995 was partly attributable to this dividend; Sub-Saharan Africa is currently entering it.

### 3.6 Shrinking Cities

A **shrinking city** experiences sustained population loss driven by natural decrease (deaths > births), out-migration, or both. Demographic shrinkage has distinctive spatial consequences:

**Selective out-migration:** Young educated adults leave first, leaving behind an older, less mobile population with lower average income. This reduces the tax base while increasing demand for elderly services — a fiscal trap.

**Vacancy cascades:** As housing demand falls, property values decline, which encourages remaining residents to leave rather than invest in property maintenance. Vacancy rates above approximately 7–10% are associated with neighbourhood tipping toward rapid decline.

The **vacancy rate dynamics** can be modelled as:

$$\frac{dV}{dt} = \alpha(V_{\text{eq}} - V) + \beta \frac{dN}{dt}$$

where $V$ is the vacancy rate, $V_{\text{eq}}$ is the natural vacancy rate (the frictional rate in a healthy market, $\approx 3$–$5\%$), and $dN/dt$ is the population change rate. Population decline ($dN/dt < 0$) pushes vacancy above equilibrium; the market adjustment rate $\alpha$ determines how quickly demolition and conversion respond.

For a city losing 1% of population per year ($dN/dt = -0.01 N$), the excess vacancy rate accumulates at $\beta \times 0.01$ per year — generating vacancy concentrations that, if not managed through demolition and land bank programmes, create persistent derelict landscapes.

---

## 4. Worked Example by Hand

**Setting:** A simplified cohort-component projection for a small northern Alberta community (pop. 5,000) facing out-migration of young adults.

**Given (initial population by 5-year age group):**

| Age | $N$ | $s$ (5-yr) | $f$ (annual, women) |
|---|---|---|---|
| 0–4 | 350 | 0.9978 | — |
| 5–14 | 700 | 0.9985 | — |
| 15–24 | 600 | 0.9970 | 0.032 |
| 25–34 | 900 | 0.9940 | 0.065 |
| 35–44 | 850 | 0.9890 | 0.025 |
| 45–54 | 750 | 0.9780 | — |
| 55–64 | 500 | 0.9540 | — |
| 65+ | 350 | 0.8000 | — |

**Step 1: Births (5-year period, assuming female population ≈ 50% of age group)**

$$B = 5 \times [(0.032)(600/2) + (0.065)(900/2) + (0.025)(850/2)]$$
$$= 5 \times [9.6 + 29.25 + 10.625] = 5 \times 49.475 = 247.4 \approx 247 \text{ births}$$

$$\text{TFR} = 5(0.032 + 0.065 + 0.025) = 5 \times 0.122 = 0.61$$

This TFR of 0.61 is extremely low — characteristic of a young-adult out-migration community where most women in prime childbearing years have left for urban centres. With only the women who stayed behind contributing to fertility, the effective rate is a fraction of a woman's potential lifetime fertility.

**Step 2: Natural population change (5-year period)**

Deaths $\approx \sum (1-s_i) N_i \approx (1-0.9978)(350) + ... \approx$ roughly 180 deaths over 5 years.

Natural increase = 247 − 180 = +67 persons over 5 years.

**Step 3: Net migration (young adult out-migration)**

Assume 15% of 15–24 year olds leave in 5 years (net out-migration): $0.15 \times 600 = 90$ persons.

**Net population change:** $+67 - 90 = -23$ persons → community is shrinking slightly.

Over 20 years (4 periods) with the same rates, the 15–24 cohort continuously depletes, reducing both labour force and future fertility. The community enters a demographic spiral: fewer young adults → fewer births → smaller young adult cohort in the next generation → even fewer births.

---

## 5. Computational Implementation

```
function leslie_matrix(survival_rates, fertility_rates, sex_ratio=1.05):
    n = len(survival_rates)
    L = zeros(n, n)
    # Subdiagonal: survival
    for i in 0..n-2:
        L[i+1, i] = survival_rates[i]
    # Open last age group:
    L[n-1, n-1] = survival_rates[n-1]
    # First row: effective fertility (accounting for 5-year period)
    for i in fertile_ages:
        L[0, i] = 5 * fertility_rates[i] * survival_rates[0] / 2
    return L

function project_population(N0, L, n_periods):
    N = N0.copy()
    trajectory = [N.copy()]
    for t in range(n_periods):
        N = L @ N
        trajectory.append(N.copy())
    return trajectory

function migration_update(N, out_rates, in_flows):
    # out_rates[i]: fraction leaving region per period by age group i
    # in_flows[i]: persons arriving to region in age group i
    N_after = N * (1 - out_rates) + in_flows
    return N_after
```

```{pyodide}
import numpy as np

def leslie_project(N0, s, f_ages, f_rates, n_periods=4):
    """
    N0: initial pop by age group (all genders combined)
    s: survival rates (same length as N0)
    f_ages: indices of fertile age groups
    f_rates: annual fertility rates for those groups
    """
    n = len(N0)
    L = np.zeros((n, n))
    for i in range(n-1):
        L[i+1, i] = s[i]
    L[n-1, n-1] = s[-1]  # open last group
    for idx, age in enumerate(f_ages):
        # births per 5-year period, 50% female, times infant survival
        L[0, age] += 5 * f_rates[idx] * s[0] / 2
    
    N = N0.copy()
    traj = [N.copy()]
    for _ in range(n_periods):
        N = L @ N
        traj.append(N.copy())
    return np.array(traj), L

# Northern Alberta community (8 age groups)
N0 = np.array([350,700,600,900,850,750,500,350], dtype=float)
s  = np.array([0.9978,0.9985,0.9970,0.9940,0.9890,0.9780,0.9540,0.8000])
f_ages = [2, 3, 4]      # age groups 15-24, 25-34, 35-44
f_rates = [0.032, 0.065, 0.025]

traj, L = leslie_project(N0, s, f_ages, f_rates)
lam = np.max(np.abs(np.linalg.eigvals(L)))
labels = ['0-4','5-14','15-24','25-34','35-44','45-54','55-64','65+']

print(f"Dominant eigenvalue λ₁ = {lam:.4f} (per 5-year period)")
print(f"Annual growth rate = {(lam**(0.2)-1)*100:.2f}% per year (natural, no migration)")
print("\nPopulation trajectory (natural change only):")
for t, N in enumerate(traj):
    print(f"  t+{t*5:2d}yr: total={N.sum():,.0f}  median age≈{sum(i*N[i] for i in range(8))/N.sum()*5+2:.1f}yrs")
```

---

## 6. Visualization

<div data-viz="echarts" style="height:420px" data-options='{
  "title": {"text": "Age Pyramid Shift: Northern Alberta Community (2025 vs 2045 projection)", "textStyle": {"fontSize": 14}},
  "tooltip": {"trigger": "axis"},
  "legend": {"data": ["2025 population", "2045 projected"], "bottom": 0},
  "xAxis": {"name": "Population count", "nameLocation": "middle", "nameGap": 30},
  "yAxis": {"type": "category",
    "data": ["0–4","5–14","15–24","25–34","35–44","45–54","55–64","65+"]},
  "series": [
    {"name": "2025 population", "type": "bar", "barGap": "-100%",
     "data": [350,700,600,900,850,750,500,350],
     "itemStyle": {"color": "#42A5F5", "opacity": 0.8}},
    {"name": "2045 projected", "type": "bar",
     "data": [210,440,340,560,700,780,620,520],
     "itemStyle": {"color": "#EF5350", "opacity": 0.8}}
  ]
}'></div>

The 2045 projection shows population decline concentrated in the young adult (15–44) and child (0–14) age groups, while older cohorts grow as the 2025 middle-age population ages in place. This is the classic shrinking-city demographic signature: an hourglass shape, pinched in the middle where young adults have out-migrated, expanding at the top as an ageing population accumulates. The community's tax base shrinks while its elderly service demand grows — the fiscal trap of demographic decline.

---

## 7. Interpretation

The Leslie matrix is more than a computational device — it encodes the demographic structure of a population and reveals the long-run trajectory encoded in current vital rates. The dominant eigenvalue $\lambda_1 < 1$ for the Alberta community reflects not the current year's growth rate but the long-run trajectory implied by the age-specific rates: if nothing changes, the community's age structure will converge to the stable distribution and decline at rate $1 - \lambda_1$ per period.

The spatial dimension adds critical complexity. National-level demographic decline is a slow, reversible process with policy levers (immigration, pronatalist incentives). Local decline, driven by selective out-migration, is faster and harder to reverse: the young adults who leave take their future fertility, productivity, and tax payments with them. Their departure reduces the services and social vibrancy that might have attracted others, accelerating the spiral.

Canadian municipal policy has begun to grapple with this. The Alberta government's Regional Municipality Act requires municipalities to produce long-range demographic projections for infrastructure and service planning. The challenge is that most planning tools project linear extrapolations of current trends — they miss the demographic momentum effects (existing age structures propagating into the future) that the cohort-component model captures. A municipality that plans for stable population based on last year's growth rate may find that demographic momentum has already locked in 15 years of decline.

---

## 8. What Could Go Wrong?

**Cohort-component models are not forecasts.** They project populations conditional on assumed rates of fertility, mortality, and migration. These rates are observed in the recent past and may not persist. A single large employer opening or closing can reverse a decade of migration trends within two years. The model produces demographically consistent trajectories, not probabilistic forecasts with confidence intervals — a distinction that is frequently lost when projections are used in planning documents.

**Migration is the hardest component to model.** Fertility and mortality rates change slowly and are well-measured by vital statistics systems. Migration rates change rapidly (in response to labour markets, housing prices, policy changes) and are measured with more error (particularly internal migration between census periods). The gravity model calibrated on historical flows may miss structural shifts in migration patterns driven by remote work, housing affordability crises, or climate displacement.

**Sex and age disaggregation is incomplete.** The model treats each age-sex cohort as homogeneous, but migration and fertility behaviour vary enormously within cohorts by education, ethnicity, income, and immigration status. A 25–34 age group that is 60% recent immigrants will have very different fertility and migration rates than one that is 60% Canadian-born. Disaggregated models (by country of birth, educational attainment) are more accurate but require more data and are harder to communicate.

**The vacancy cascade is non-linear.** The simple differential equation model of vacancy dynamics misses the threshold effects and neighbourhood tipping points that characterise actual shrinking city dynamics. When vacancy exceeds roughly 10–15%, social disorder increases, property insurance becomes expensive or unavailable, and anchor institutions (grocery stores, banks, pharmacies) close — creating step changes in residential desirability that the linear model cannot represent.

---

## 9. Summary

The cohort-component model projects population by applying age-sex-specific survival rates, fertility rates, and migration rates to each cohort. The Leslie matrix formulation expresses this as a matrix multiplication $\mathbf{N}(t+1) = \mathbf{L}\mathbf{N}(t)$, whose dominant eigenvalue determines the long-run growth rate and whose eigenvector gives the stable age distribution.

Multi-region extension adds migration flows calibrated via the gravity model, distributing population change across space. Selective out-migration of young adults drives shrinking cities into demographic spirals: declining fertility, ageing population, rising dependency ratios, and fiscal stress. Understanding these dynamics at the local scale — not just the national scale — is essential for infrastructure planning, service delivery, and housing market assessment in every Canadian municipality.

**Key equations:**

$$N_{i+1}(t+1) = s_i N_i(t) \quad \text{[cohort survival]}$$

$$\text{TFR} = 5\sum_i f_i \quad \text{[total fertility rate]}$$

$$\mathbf{N}(t+1) = \mathbf{L}\mathbf{N}(t) \quad \text{[Leslie matrix projection]}$$

$$\text{OADR} = N_{65+}/N_{15-64} \quad \text{[old-age dependency ratio]}$$

$$M_{ij} = k O_i D_j d_{ij}^{-\beta} \quad \text{[gravity migration model]}$$

---

## Math Refresher

**Matrix multiplication review.** The product $\mathbf{y} = \mathbf{L}\mathbf{x}$ computes each element as $y_i = \sum_j L_{ij} x_j$ — a weighted sum of all input elements. For the Leslie matrix, $y_1 = \sum_j L_{1j} x_j = \sum_j F_j x_j$ (total births from all fertile age groups), and $y_{i+1} = L_{i+1,i} x_i = s_i x_i$ (survivors from age group $i$ enter group $i+1$). Applied repeatedly, the matrix "ages" the population forward by one period with each multiplication.

**Eigenvalues and long-run growth.** The eigenvalue $\lambda$ of a matrix $\mathbf{L}$ satisfies $\mathbf{L}\mathbf{v} = \lambda\mathbf{v}$ — the matrix scales the eigenvector $\mathbf{v}$ without changing its direction. Applied repeatedly: $\mathbf{L}^t\mathbf{v} = \lambda^t\mathbf{v}$. For a population starting near the stable age distribution (the dominant eigenvector), the population grows by a factor $\lambda^t$ after $t$ periods. $\lambda > 1$ means growth; $\lambda < 1$ means decline; $\lambda = 1$ means stationarity. The time to double (or halve) the population is $T = \ln 2 / |\ln \lambda|$ periods.

**Demographic momentum.** A population with $\lambda_1 < 1$ (sub-replacement fertility) does not immediately start declining if it has a young age structure. The large young cohorts continue producing more births than deaths for decades, maintaining positive natural growth even as the underlying rates imply eventual decline. This is demographic momentum: the inertia of an age structure shaped by past high fertility. Japan's population grew until 2008 despite sub-replacement fertility since 1974 — 34 years of momentum. Canada's population would continue growing for another 10–15 years even if immigration stopped and fertility stayed constant.
