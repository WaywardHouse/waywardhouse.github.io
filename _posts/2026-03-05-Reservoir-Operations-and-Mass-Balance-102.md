---
layout: essay
title: "Reservoir Operations and Mass Balance"
subtitle: "Storage-yield analysis, sequent peak algorithm, and multi-purpose operating rules"
date: 2026-03-05
categories: modelling
series: computational-geography-laboratory
series_order: 102
cluster: "AR — Reservoir Operations and Water Supply"
cluster_order: 1
tags: [math, viz, essay]
math: true
viz: true
math_core:
  - mass balance
  - cumulative sums
  - optimisation (tradeoff curves)
  - dimensional analysis
spatial_reasoning: watershed storage geometry
dynamics: storage routing and depletion
computation: sequent peak algorithm
domain: water resources engineering
difficulty: 3
prerequisites:
  - B5
  - A3
notebook_url: https://github.com/waywardhouse/computational-geography-lab/tree/main/essays/AR1-reservoir-operations
excerpt: >
  A reservoir is a mass balance problem: inflows fill it, outflows drain it,
  evaporation removes it. The sequent peak algorithm finds the minimum storage
  capacity required to deliver a target yield through the worst drought on record.
  Multi-purpose reservoirs must balance flood control, irrigation, hydropower, and
  ecology simultaneously — objectives that conflict. This essay derives the
  storage-yield relationship, works the sequent peak algorithm by hand, constructs
  tradeoff curves between competing uses, and quantifies reservoir design life
  from sedimentation rates.
math_prerequisites: >
  Cumulative sums and running totals. Basic algebra. The concept of mass
  conservation. Logarithms for the sedimentation life calculation.
---

The W.A.C. Bennett Dam on the Peace River in British Columbia impounds 74 km³ of water — one of the largest reservoirs in the world by volume. It took seven years to fill after completion in 1968. Since then it has generated 2,730 MW of hydroelectric power, regulated spring floods downstream, and supplied irrigation water to the Peace River valley. It has also been accumulating sediment at rates that are gradually reducing its storage capacity, and its downstream flow regime has transformed the Peace-Athabasca Delta in ways that continue to be debated.

That package of outcomes — power, flood control, irrigation, ecological transformation, and eventual capacity loss — defines the multi-purpose reservoir problem. Understanding any one outcome quantitatively requires the mass balance framework that underlies all reservoir analysis.

---

## 1. The Question

How large must a reservoir be to guarantee delivery of a target water supply through the worst drought on record? How should storage be operated to balance competing demands — flood control, irrigation, power generation, and environmental flows? How much storage capacity is lost to sedimentation over the reservoir's design life?

---

## 2. The Conceptual Model

A reservoir is a bathtub with a time-varying faucet (inflow) and time-varying drain (release). The faucet is controlled by nature (streamflow); the drain is controlled by the operator (releases for downstream uses). The difference accumulates in storage. When storage is empty and inflow is insufficient to meet demand, there is a shortage. The design question is: how large a bathtub is needed to limit shortages to an acceptable frequency and severity?

The **sequent peak algorithm** answers this for a target constant yield: given the historical record of monthly streamflows, find the minimum storage capacity that allows the target yield to be met in every time step — including through the most severe drought in the record.

---

## 3. Building the Mathematical Model

### 3.1 Reservoir Mass Balance

The fundamental equation governing reservoir storage $S(t)$ [volume, e.g. Mm³]:

$$\frac{dS}{dt} = Q_{\text{in}}(t) - Q_{\text{out}}(t) - E(t) - L(t)$$

where $Q_{\text{in}}$ = inflow (natural streamflow), $Q_{\text{out}}$ = controlled release, $E$ = evaporation from reservoir surface, and $L$ = seepage losses. In discrete monthly form:

$$S(t+1) = S(t) + Q_{\text{in}}(t)\Delta t - Q_{\text{out}}(t)\Delta t - E(t)\Delta t$$

subject to $0 \leq S(t) \leq S_{\max}$. When $S(t+1) > S_{\max}$, the excess **spills**; when $S(t+1) < 0$, there is a **shortage** of magnitude $|S(t+1)|$.

### 3.2 The Sequent Peak Algorithm

The **sequent peak algorithm** (Rippl 1882) determines the minimum storage capacity $K$ required to deliver a constant target yield $D$ from a given inflow sequence $Q_1, Q_2, \ldots, Q_n$.

**Step 1:** Compute net surplus/deficit at each time step:

$$d_t = Q_t - D$$

**Step 2:** Compute cumulative departure:

$$X_t = \sum_{k=1}^{t} (Q_k - D)$$

**Step 3:** Find **sequent peaks** — local maxima in $X_t$ — and for each pair of consecutive peaks at times $t_1 < t_2$, compute the required storage:

$$K_{t_1,t_2} = X_{t_1} - \min_{t_1 \le t \le t_2}(X_t)$$

**Step 4:** The required capacity is:

$$K = \max_{t_1,t_2} K_{t_1,t_2}$$

The algorithm is applied to the inflow sequence repeated twice (length $2n$) to handle droughts that straddle the record's start/end boundary.

**Intuition:** $X_t$ rises during surplus periods (reservoir filling) and falls during deficits (reservoir draining). The maximum drop from any peak to its subsequent trough is exactly the storage needed to bridge that drought without running dry.

### 3.3 Storage-Yield Relationship

Running the sequent peak for a range of target yields $D$ produces the **storage-yield curve** $K(D)$ — the minimum capacity required to guarantee yield $D$ through the drought of record. This curve rises steeply near the mean annual flow: delivering near 100% of mean annual flow requires enormous storage to bridge multi-year droughts, while delivering 50–70% requires far less.

The **firm yield** $D_{\text{firm}}(K)$ is the maximum yield deliverable from a reservoir of capacity $K$, read directly from the storage-yield curve.

### 3.4 Multi-Purpose Operating Rules

Zone-based operating policies divide reservoir storage into vertical zones with different release rules:

| Zone | Storage level | Purpose |
|---|---|---|
| Flood control | Top pool | Empty space to absorb floods |
| Joint use | Upper conservation | Available for all uses |
| Conservation | Lower conservation | Water supply priority |
| Buffer (dead pool) | Minimum pool | Power intake minimum level |

The **hedging rule** begins reducing deliveries before the reservoir empties, spreading shortages over time:

$$Q_{\text{release}}(t) = \begin{cases} D & \text{if } S(t)/K \geq h \\ D \cdot S(t)/(hK) & \text{if } S(t)/K < h \end{cases}$$

where $h$ [0–1] is the hedging threshold. Below $h$, releases are proportionally reduced — avoiding abrupt total failure at the cost of modest continuous shortfalls.

### 3.5 Hydropower and Competing Objectives

Hydropower output depends on both head and flow:

$$P = \eta \rho g H Q \quad [\text{W}]$$

where $\eta \approx 0.87$ (efficiency), $\rho = 1000$ kg m⁻³, $g = 9.81$ m s⁻², $H$ [m] is water surface elevation above turbine outlet, and $Q$ [m³ s⁻¹] is turbine flow. High reservoir levels maximise $H$ and power; irrigation drawdown reduces both.

The fundamental conflict: flood control requires **empty** storage; water supply requires **full** storage; hydropower wants **high** water levels; environmental flows require **minimum releases** during low-flow periods. A **Pareto tradeoff frontier** maps the achievable combinations of any two objectives — no point inside the frontier is optimal, and no point outside it is feasible.

For flood control vs. water supply with total capacity $K_{\text{total}} = K_F + K_C$:

- Flood performance: peak outflow reduction $\propto K_F$
- Water supply reliability: $r = g(K_C, D)$ from the storage-yield curve

Plotting $(K_F, K_C)$ allocations traces the tradeoff frontier.

### 3.6 Reservoir Sedimentation and Design Life

The **trap efficiency** $\eta_T$ — fraction of incoming sediment retained — depends on the capacity-to-inflow ratio $C_v = K/Q_{\text{annual}}$ via the empirical **Brune (1953) curve**:

$$\eta_T \approx 1 - \frac{0.05}{0.05 + C_v}$$

(simplified approximation; the full curve is read graphically). Large reservoirs ($C_v > 0.5$) trap >94% of incoming sediment; small run-of-river structures ($C_v < 0.05$) trap <70%.

Annual storage loss:

$$\Delta K = \frac{\eta_T \cdot Q_{s,\text{annual}}}{\rho_b}$$

where $Q_{s,\text{annual}}$ [t yr⁻¹] is annual sediment load and $\rho_b$ [t m⁻³] ≈ 1.1–1.4 is deposited sediment bulk density. Design life to 50% capacity loss:

$$T_{50} = \frac{0.5 \, K_0}{\Delta K}$$

For South Asian and Andean reservoirs with high erosion rates, $T_{50}$ can be as short as 20–40 years. Management options include periodic flushing (lowering reservoir to scour deposits), turbidity current venting, and upstream sediment retention structures.

---

## 4. Worked Example by Hand

**Setting:** Reservoir design for a tributary of the North Saskatchewan River, Alberta. Target yield $D = 15$ Mm³/month. Monthly inflows over a critical drought sequence (Mm³):

| Month | $Q_t$ | $d_t = Q_t - 15$ | $X_t$ |
|---|---|---|---|
| Jan | 8 | −7 | −7 |
| Feb | 6 | −9 | −16 |
| Mar | 10 | −5 | −21 |
| Apr | 25 | +10 | −11 |
| May | 40 | +25 | +14 |
| Jun | 50 | +35 | +49 |
| **Jul** | 30 | +15 | **+64 ← peak** |
| Aug | 12 | −3 | +61 |
| Sep | 8 | −7 | +54 |
| Oct | 5 | −10 | +44 |
| Nov | 4 | −11 | +33 |
| Dec | 3 | −12 | +21 |
| Jan+1 | 4 | −11 | +10 |
| Feb+1 | 6 | −9 | +1 |
| **Mar+1** | 10 | −5 | **−4 ← trough** |
| Apr+1 | 22 | +7 | +3 ← sequent peak |

**Required storage:** $K = X_{\text{peak}} - X_{\text{trough}} = 64 - (-4) = \boxed{68 \text{ Mm}^3}$

**Sedimentation:**
$C_v = 68 / (16.5 \times 12) = 0.34$, $\eta_T \approx 1 - 0.05/0.40 = 0.875$

Annual sediment load = 500,000 t yr⁻¹, $\rho_b = 1.2$ t m⁻³:

$$\Delta K = \frac{0.875 \times 500{,}000}{1.2 \times 10^6} = 0.365 \text{ Mm}^3/\text{yr}$$

$$T_{50} = \frac{0.5 \times 68}{0.365} = 93 \text{ years}$$

Adequate for a 100-year design life, but marginal — sediment management provisions warranted.

---

## 5. Computational Implementation

```
function sequent_peak(Q_array, D_target):
    d = Q_array - D_target
    X = cumsum(d)
    X2 = concatenate([X, X])   # double for wrap-around
    K = 0
    for t1 in range(len(X2) - 1):
        if is_local_maximum(X2, t1):
            trough = min(X2[t1 : t1 + len(Q_array)])
            K = max(K, X2[t1] - trough)
    return K

function simulate(Q, D, K_max):
    S = 0; storage=[]; shortage=[]; spill=[]
    for q, d in zip(Q, D):
        S_new = S + q - d
        sp = max(0, S_new - K_max); S_new = min(S_new, K_max)
        sh = max(0, -S_new);        S_new = max(0, S_new)
        storage.append(S_new); shortage.append(sh); spill.append(sp)
        S = S_new
    return storage, shortage, spill

function brune(Cv):
    return 1 - 0.05 / (0.05 + Cv)
```

```{pyodide}
import numpy as np

def sequent_peak(Q, D):
    d = Q - D
    X = np.cumsum(d)
    X2 = np.concatenate([X, X])
    K = 0
    n = len(Q)
    for t1 in range(n):
        trough = np.min(X2[t1:t1+n])
        K = max(K, X2[t1] - trough)
    return K

def simulate(Q, D_array, K_max):
    S = 0; storage=[]; shortage=[]; spill=[]
    for q, d in zip(Q, D_array):
        S_new = S + q - d
        sp = max(0, S_new - K_max); S_new = min(S_new, K_max)
        sh = max(0, -S_new);        S_new = max(0, S_new)
        storage.append(S_new); shortage.append(sh); spill.append(sp)
        S = S_new
    return np.array(storage), np.array(shortage), np.array(spill)

def brune(Cv):
    return 1 - 0.05 / (0.05 + Cv)

Q = np.array([8,6,10,25,40,50,30,12,8,5,4,3,4,6,10,22], dtype=float)
D = 15.0
K = sequent_peak(Q, D)
print(f"Required capacity: {K:.1f} Mm³")

# Simulate with this reservoir
Darray = np.full(len(Q), D)
storage, shortage, spill = simulate(Q, Darray, K)
print(f"Total shortage in period: {shortage.sum():.1f} Mm³")
print(f"Total spill:              {spill.sum():.1f} Mm³")

# Storage-yield curve
yields = np.arange(6, 19, 1.5)
K_req  = [sequent_peak(np.tile(Q[:12], 3), d) for d in yields]
print(f"\nStorage-yield curve:")
for d, k in zip(yields, K_req):
    print(f"  D = {d:4.1f} Mm³/mo  →  K = {k:6.1f} Mm³")

# Sedimentation
Cv = K / (Q[:12].mean() * 12)
eta = brune(Cv)
dK = eta * 500_000 / 1.2e6
T50 = 0.5 * K / dK
print(f"\nCv={Cv:.2f}, η_T={eta:.3f}, ΔK={dK:.3f} Mm³/yr, T_50={T50:.0f} yr")
```

---

## 6. Visualization

<div data-viz="echarts" style="height:420px" data-options='{
  "title": {"text": "Sequent Peak — Cumulative Departure and Required Storage", "textStyle": {"fontSize": 14}},
  "tooltip": {"trigger": "axis"},
  "legend": {"data": ["Cumulative departure X(t)", "Required storage K = 68"], "bottom": 0},
  "xAxis": {"type": "category", "name": "Month", "nameLocation": "middle", "nameGap": 28,
    "data": ["J","F","M","A","M","J","J","A","S","O","N","D","J+1","F+1","M+1","A+1"]},
  "yAxis": {"name": "Departure from yield (Mm³)", "nameLocation": "middle", "nameGap": 55},
  "series": [
    {"name": "Cumulative departure X(t)", "type": "line", "smooth": false,
     "itemStyle": {"color": "#1565C0"},
     "data": [-7,-16,-21,-11,14,49,64,61,54,44,33,21,10,1,-4,3]},
    {"name": "Required storage K = 68", "type": "line",
     "lineStyle": {"type": "dashed", "color": "#C62828"},
     "data": [68,68,68,68,68,68,68,68,68,68,68,68,68,68,68,68]}
  ]
}'></div>

The cumulative departure falls 68 Mm³ from the July peak (+64) to the March trough (−4). Any reservoir smaller than 68 Mm³ would run dry between July and the following spring. The recovery in April+1 represents the next snowmelt freshet that refills storage.

---

## 7. Interpretation

The sequent peak algorithm is deterministic: it guarantees delivery through the exact historical drought sequence, nothing more. If the future contains a worse drought — plausible under climate projections for western Canada — the reservoir will fail. Risk-based design (Essay AR2) extends this to probabilistic statements by generating synthetic flow sequences longer than the historical record.

The sedimentation result forces a design revision: a reservoir sized for today's yield will be undersized in 50 years as sediment accumulates. Conservative design increases initial capacity to account for the 50-year capacity loss, accepting higher upfront cost to maintain performance through the design life.

The multi-objective conflict is irreducible. Flood control wants empty storage available before storms; water supply wants full storage available during droughts. In the same month, both cannot be optimally satisfied. Formal multi-criteria decision analysis provides a structured framework for negotiating this conflict among stakeholders — but cannot make the physical trade-off disappear.

---

## 8. What Could Go Wrong?

**The drought of record understates risk.** Instrumental records rarely exceed 100 years. Paleoclimate evidence (tree rings, lake sediments) in the Canadian Rockies documents multi-decadal droughts far more severe than any 20th-century event. Designing to the historical record provides a false sense of security.

**Climate change is altering inflow timing.** Glacially-fed rivers in the Rockies are experiencing earlier, lower peak flows as glaciers retreat. The summer baseflows that historically supported water supply — sustained by glacier melt — are declining. The historical inflow record is a progressively less reliable predictor of future conditions.

**Evaporation from large reservoirs is significant.** At 1.5 m yr⁻¹ evaporation over a 50 km² reservoir surface, annual evaporative loss is 75 Mm³ — comparable to the reservoir's conservation storage. Omitting this from the mass balance overestimates firm yield by 15–30%.

**Sediment flushing harms downstream ecology.** Pulse releases of turbid water during flushing events can kill fish, smother spawning beds, and violate downstream water quality permits. Sediment management must therefore be integrated with environmental flow requirements — constraining the operational flexibility that makes flushing most effective.

---

## 9. Summary

The reservoir mass balance $S(t+1) = S(t) + Q_{\text{in}} - Q_{\text{out}} - E$ links inflow, release, and storage. The sequent peak algorithm finds the minimum capacity $K$ to deliver target yield $D$ through the historical drought, computed as the maximum cumulative deficit in the inflow series. The storage-yield curve $K(D)$ rises steeply near mean annual flow, reflecting the large storage needed to bridge multi-year droughts.

Multi-purpose reservoirs face irreducible tradeoffs between flood control (empty storage), water supply (full storage), and hydropower (high head). Zone-based operating rules and hedging strategies manage these conflicts. Sedimentation reduces capacity at rate $\Delta K = \eta_T Q_s / \rho_b$; design life to 50% capacity loss is $T_{50} = 0.5 K_0 / \Delta K$, typically 50–200 years for large reservoirs.

**Key equations:**

$$S(t+1) = S(t) + Q_{\text{in}} - Q_{\text{out}} - E$$

$$K = \max[X_{t_1} - \min_{t_1\le t\le t_2} X_t], \quad X_t = \sum_{k=1}^t (Q_k - D)$$

$$P = \eta\rho g H Q \quad\text{[hydropower]}$$

$$\Delta K = \eta_T Q_{s,\text{annual}}/\rho_b, \quad T_{50} = 0.5K_0/\Delta K$$

---

## Math Refresher

**Cumulative sums and the Rippl diagram.** The cumulative departure $X_t = \sum_{k=1}^t(Q_k - D)$ is a running total of how far ahead or behind the inflow is relative to demand. Rising = surplus (reservoir filling); falling = deficit (reservoir draining). The maximum drop from any peak to the next trough is the storage needed to bridge that drought — geometrically, the largest vertical descent in the $X_t$ curve. This insight (Rippl 1882) predates digital computing by 80 years.

**Dimensional consistency in hydropower.** $P = \eta\rho g H Q$: units are [dimensionless × kg m⁻³ × m s⁻² × m × m³ s⁻¹] = [kg m² s⁻³] = [W]. The product $\rho g H$ is pressure [Pa = N m⁻²]; multiplied by flow rate [m³ s⁻¹] gives power [N m s⁻¹ = W]. Annual energy in kWh: $E = P \times 8760 / 1000$.
