---
layout: essay
title: "Transportation Network Analysis"
subtitle: "Graph theory, shortest paths, and the mathematics of how cities move"
date: 2026-03-05
categories: modelling
series: computational-geography-laboratory
series_order: 97
cluster: "AK — Transportation and Accessibility"
cluster_order: 1
tags: [math, viz, essay]
math: true
viz: true
math_core:
  - graph theory
  - greedy algorithms
  - matrix operations
  - centrality measures
spatial_reasoning: network topology
dynamics: flow routing
computation: Dijkstra's algorithm
domain: transport geography
difficulty: 3
prerequisites:
  - A1
  - C9
notebook_url: https://github.com/waywardhouse/computational-geography-lab/tree/main/essays/AK1-network-analysis
excerpt: >
  A road network is a weighted graph. A bus route is a sequence of edges. A
  traffic jam is a capacity constraint. Once we translate the city's movement
  infrastructure into graph-theoretic language, we can compute shortest paths,
  identify which intersections are most critical to network function, and predict
  what happens when bridges fail. This essay builds the graph representation from
  first principles, derives Dijkstra's algorithm step by step, applies centrality
  measures to vulnerability analysis, and surveys the four-step transport model.
math_prerequisites: >
  Set notation and basic matrix concepts. The idea of minimisation. No prior graph
  theory is assumed — all definitions are built from scratch.
---

Every morning, hundreds of thousands of Calgarians implicitly solve an optimisation problem: which sequence of roads minimises their travel time to work? They do it by intuition, habit, and navigation apps — but beneath those apps is an algorithm, and beneath the algorithm is a mathematical structure called a graph. Euler invented graph theory in 1736 to solve the Königsberg bridge problem — can you walk through a city crossing each of seven bridges exactly once? That problem had nothing to do with transportation planning. But transportation networks are graphs in exactly the sense Euler defined, and his abstract toolkit turns out to be precisely what is needed to understand how people and goods move through cities.

---

## 1. The Question

How do we represent a transportation network mathematically? How does Dijkstra's algorithm find the shortest path efficiently? Which nodes and edges are most critical to network function? And how does graph theory connect to the larger framework of travel demand modelling?

---

## 2. The Conceptual Model

A transportation network is a **weighted directed graph** $G = (V, E, w)$:

- $V$ — **vertices** (nodes): intersections, transit stops, origins, destinations
- $E \subseteq V \times V$ — **edges**: road segments, transit links, pedestrian paths between pairs of nodes
- $w : E \to \mathbb{R}^+$ — **weights**: travel time, distance, or generalised cost on each edge

A one-way street is a directed edge from $u$ to $v$ but not $v$ to $u$. A two-way road is two directed edges. A pedestrian path with equal travel in both directions is an undirected edge, represented as a pair of equal-weight directed edges.

The **adjacency matrix** $\mathbf{A}$ [n × n] stores $A_{ij} = w(i,j)$ if edge $(i,j)$ exists, and $\infty$ otherwise. For undirected graphs, $\mathbf{A}$ is symmetric.

---

## 3. Building the Mathematical Model

### 3.1 Graph Representation

For a network with $|V| = n$ nodes and $|E| = m$ edges, two storage structures are common:

**Adjacency matrix:** $O(n^2)$ memory. Efficient to check if an edge exists (O(1) lookup). Wasteful for sparse graphs.

**Adjacency list:** Each node stores a list of (neighbour, weight) pairs. $O(n + m)$ memory. Efficient for traversal. City road networks are very sparse — $m \approx 2n$ rather than $m \approx n^2$ — making adjacency lists the standard choice.

A small example: 5-node network with edge weights representing travel times (minutes):

$$\mathbf{A} = \begin{pmatrix} 0 & 3 & \infty & 7 & \infty \\ 3 & 0 & 2 & \infty & \infty \\ \infty & 2 & 0 & 1 & 5 \\ 7 & \infty & 1 & 0 & 2 \\ \infty & \infty & 5 & 2 & 0 \end{pmatrix}$$

The shortest path from node 1 to node 5 is not immediately obvious — it requires finding the minimum-weight path through the network.

### 3.2 Dijkstra's Algorithm

Dijkstra's algorithm (1959) finds the shortest paths from a source node $s$ to all other nodes in a graph with **non-negative** edge weights. It maintains a set of tentative distances $d[v]$, initially $d[s] = 0$ and $d[v] = \infty$ for all $v \neq s$.

**Algorithm (pseudocode):**

```
d[s] = 0;  d[v] = ∞ for all v ≠ s
prev[v] = undefined for all v
Q = priority queue of all nodes, keyed by d[v]

while Q is not empty:
    u = extract_minimum(Q)          # node with smallest d[u]
    for each neighbour v of u:
        alt = d[u] + w(u, v)
        if alt < d[v]:
            d[v] = alt              # relax the edge
            prev[v] = u
            decrease_key(Q, v, alt)
```

When the algorithm terminates, $d[v]$ is the shortest distance from $s$ to $v$, and the shortest path is reconstructed by following `prev[]` backwards from $v$ to $s$.

**Why it works:** At each step, the node $u$ extracted from the queue has the smallest tentative distance. Since all edge weights are non-negative, no future path through $u$ could have been shorter — $d[u]$ is already final. This greedy property is the key to correctness.

**Complexity:** With a binary heap: $O((n + m) \log n)$. For a city of 100,000 intersections and 200,000 road segments: $\approx 5 \times 10^6$ operations — under 1 second on modern hardware.

**Worked trace** on the 5-node example (source = node 1, 1-indexed):

| Step | Visited | d[1] | d[2] | d[3] | d[4] | d[5] |
|---|---|---|---|---|---|---|
| Initialise | {} | **0** | ∞ | ∞ | ∞ | ∞ |
| Process node 1 | {1} | 0 | **3** | ∞ | **7** | ∞ |
| Process node 2 | {1,2} | 0 | 3 | **5** | 7 | ∞ |
| Process node 3 | {1,2,3} | 0 | 3 | 5 | **6** | **10** |
| Process node 4 | {1,2,3,4} | 0 | 3 | 5 | 6 | **8** |
| Process node 5 | {1,2,3,4,5} | 0 | 3 | 5 | 6 | 8 |

Shortest path 1→5: cost = 8 min, route = 1 → 2 → 3 → 4 → 5.

### 3.3 Network Centrality

Centrality measures identify which nodes (or edges) are most important to network function.

**Degree centrality** — normalised count of connections:

$$C_D(v) = \frac{\deg(v)}{n - 1}$$

Simple and local. High degree = many direct connections. Major highway interchanges typically have highest degree centrality.

**Closeness centrality** — how quickly can a node reach all others:

$$C_C(v) = \frac{n - 1}{\sum_{u \neq v} d(v, u)}$$

High closeness = short average travel time to all destinations. Central transit hubs have highest closeness. The reciprocal means the formula equals the inverse of the mean distance — a node with closeness 0.1 is on average 10 travel-time units from any destination.

**Betweenness centrality** — fraction of all shortest paths passing through a node:

$$C_B(v) = \frac{2}{(n-1)(n-2)} \sum_{s \neq v \neq t} \frac{\sigma_{st}(v)}{\sigma_{st}}$$

where $\sigma_{st}$ is the count of shortest paths from $s$ to $t$, and $\sigma_{st}(v)$ is the count passing through $v$. The normalisation by $2/[(n-1)(n-2)]$ gives values in $[0, 1]$.

Betweenness identifies **bottleneck nodes**: bridges, tunnels, and interchange ramps that carry a disproportionate share of cross-network flows. Removing a high-betweenness node forces many origin-destination pairs to use longer detours, degrading system-wide performance.

**Edge betweenness** applies the same logic to edges rather than nodes, identifying which road segments most frequently appear on shortest paths.

### 3.4 Shortest Path Trees and Isochrones

Running Dijkstra from a single source $s$ produces the **shortest path tree** — the union of all shortest paths from $s$ to every other node. When rendered geographically, this tree shows the fastest route from one location to every other location in the network.

A family of shortest path trees with travel time thresholds $t_1 < t_2 < t_3$ produces nested **isochrones** — contours of equal travel time from the source. The area enclosed by the 15-minute isochrone is the set of all locations reachable within 15 minutes.

Isochrones are the fundamental unit of accessibility measurement (Essay AK2). Their shape reveals network anisotropy: along a highway, the isochrone extends far; perpendicular to a river with few bridges, it contracts sharply.

### 3.5 Network Vulnerability Analysis

Vulnerability analysis quantifies how much network performance degrades when nodes or edges are removed — by flooding, earthquake, construction, or deliberate attack.

**Network efficiency** $E$ measures the harmonic mean of shortest-path distances across all pairs:

$$E(G) = \frac{1}{n(n-1)} \sum_{i \neq j} \frac{1}{d(i,j)}$$

where $d(i,j) = \infty$ (contributing 0) for disconnected pairs. $E = 1$ for a complete graph with unit weights; $E = 0$ for a completely disconnected graph.

**Node criticality** — the efficiency loss from removing node $v$:

$$\Delta E(v) = E(G) - E(G \setminus \{v\})$$

where $G \setminus \{v\}$ is the graph with $v$ and all its incident edges removed. Ranking nodes by $\Delta E(v)$ identifies the single most damaging removals — typically high-betweenness bridges and interchange nodes.

**Cascading failure** occurs when removing one node overloads adjacent links (which now carry diverted traffic), causing those to fail too. The 1994 Northridge earthquake demonstrated this: a few key overpasses collapsed and the resulting rerouting overloaded surface streets beyond their capacity, effectively blocking large sections of the Los Angeles freeway network for months.

### 3.6 The Four-Step Transport Model

The **four-step model** is the dominant framework for regional travel demand forecasting. Each step produces inputs for the next, and each has graph-theoretic components.

**Step 1 — Trip Generation:** How many trips originate from and are attracted to each traffic analysis zone (TAZ)? Regression on socio-economic variables:

$$O_i = a_0 + a_1 H_i + a_2 I_i + a_3 E_i$$

where $H_i$, $I_i$, $E_i$ are household count, income, and employment in zone $i$.

**Step 2 — Trip Distribution:** Which zone does each trip go to? The doubly-constrained gravity model (Essay AK2):

$$T_{ij} = A_i O_i \cdot B_j D_j \cdot f(c_{ij})$$

**Step 3 — Mode Choice:** Which travel mode is used? Multinomial logit model:

$$P_k = \frac{e^{V_k}}{\sum_\ell e^{V_\ell}}$$

where $V_k$ is the utility of mode $k$ — a linear combination of in-vehicle time, walk time, wait time, cost, and reliability.

**Step 4 — Route Assignment:** Which routes do the trips take? **User equilibrium assignment** (Wardrop 1952): at equilibrium, no traveller can reduce their travel time by unilaterally switching routes:

$$\text{If } f_{rs} > 0 \Rightarrow c_{rs} = \mu_{rs} \quad \text{(used routes have minimum cost)}$$
$$\text{If } f_{rs} = 0 \Rightarrow c_{rs} \geq \mu_{rs} \quad \text{(unused routes are at least as costly)}$$

where $f_{rs}$ is flow on route $r$ between OD pair $s$, $c_{rs}$ is route cost, and $\mu_{rs}$ is the minimum cost. This is found iteratively using the Frank-Wolfe algorithm applied to the Beckmann objective function.

---

## 4. Worked Example by Hand

**Setting:** A 6-node transit network — simplified Edmonton CTrain + key bus connections. Find the shortest path from Node 1 (Northeast suburb) to Node 6 (University), identify the most critical node, and assess the impact of its removal.

**Edge weights (minutes):**
(1,2)=12, (2,3)=8, (3,4)=6, (4,5)=9, (5,6)=7, (2,4)=15, (3,5)=11, (4,6)=18, (1,4)=28

**Dijkstra from Node 1:**

Init: d = [0, ∞, ∞, ∞, ∞, ∞]

Process 1 (d=0): update d[2]=12, d[4]=28

Process 2 (d=12): update d[3]=20, d[4]=min(28,27)=27

Process 3 (d=20): update d[4]=min(27,26)=26, d[5]=31

Process 4 (d=26): update d[5]=min(31,35) stays 31, d[6]=44

Process 5 (d=31): update d[6]=min(44,38)=38

**Shortest path: 1→2→3→4→5→6 = 42 min** via 12+8+6+9+7

Wait — recompute: 1→2→3→5→6 = 12+8+11+7 = 38 min ✓ (this is the correct minimum from step 5)

**Remove Node 3 (the central CTrain transfer station):**

Without Node 3, remaining paths 1→6:
- 1→2→4→5→6 = 12+15+9+7 = 43 min
- 1→4→5→6 = 28+9+7 = 44 min

Travel time increases by 43−38 = 5 min (13%). In a real transit network where Node 3 is a major transfer station, many more origin-destination pairs would be affected, and some (those with no alternative path to their destination) would be completely cut off — a much larger efficiency loss than this simplified example suggests.

---

## 5. Computational Implementation

```
function dijkstra(adj_list, source, n):
    d = array of infinity, length n; d[source] = 0
    prev = array of -1, length n
    pq = min-heap with (0, source)
    while pq not empty:
        (dist, u) = pop_min(pq)
        if dist > d[u]: continue      # stale entry
        for (v, w) in adj_list[u]:
            if d[u] + w < d[v]:
                d[v] = d[u] + w
                prev[v] = u
                push(pq, (d[v], v))
    return d, prev

function network_efficiency(adj_list, n):
    total = 0
    for s in range(n):
        d = dijkstra(adj_list, s, n)[0]
        total += sum(1/d[t] for t in range(n) if t != s and d[t] < infinity)
    return total / (n * (n-1))

function betweenness_centrality(adj_list, n):
    C = zeros(n)
    for s in 0..n-1:
        run BFS/Dijkstra to get shortest paths and counts from s
        accumulate fraction of paths through each intermediate node
    return C / ((n-1)*(n-2)/2)     # normalise
```

```{pyodide}
import heapq
import numpy as np

def dijkstra(adj, n, src):
    d = [float('inf')] * n
    d[src] = 0
    prev = [-1] * n
    pq = [(0, src)]
    while pq:
        du, u = heapq.heappop(pq)
        if du > d[u]: continue
        for v, w in adj.get(u, []):
            if d[u] + w < d[v]:
                d[v] = d[u] + w
                prev[v] = u
                heapq.heappush(pq, (d[v], v))
    return d, prev

def network_efficiency(adj, n):
    total = 0
    for s in range(n):
        d, _ = dijkstra(adj, n, s)
        total += sum(1/d[t] for t in range(n) if t != s and d[t] < float('inf'))
    return total / (n*(n-1))

# 6-node transit network (0-indexed)
adj = {
    0: [(1,12),(3,28)],
    1: [(0,12),(2,8),(3,15)],
    2: [(1,8),(3,6),(4,11)],
    3: [(2,6),(1,15),(4,9),(5,18),(0,28)],
    4: [(3,9),(2,11),(5,7)],
    5: [(4,7),(3,18)]
}
n = 6

d, prev = dijkstra(adj, n, 0)
# Reconstruct path 1→6
path, node = [], 5
while node != -1: path.append(node+1); node = prev[node]
path.reverse()
print(f"Shortest path 1→6: {' → '.join(map(str,path))} = {d[5]} min")
print(f"Network efficiency (full): {network_efficiency(adj, n):.4f}")

# Remove node 3 (index 2)
adj_no3 = {k:[(v,w) for v,w in vs if v!=2] for k,vs in adj.items() if k!=2}
E_no3 = network_efficiency(adj_no3, n)
d2, _ = dijkstra(adj_no3, n, 0)
print(f"Shortest 1→6 without node 3: {d2[5]} min (+{d2[5]-d[5]} min)")
print(f"Network efficiency without node 3: {E_no3:.4f}")
```

---

## 6. Visualization

<div data-viz="echarts" style="height:420px" data-options='{
  "title": {"text": "Node Betweenness Centrality — Hypothetical Urban Transit Network", "textStyle": {"fontSize": 14}},
  "tooltip": {"trigger": "axis"},
  "xAxis": {"type": "category",
    "data": ["Suburban A", "Branch B", "Hub C", "Hub D", "Branch E", "Terminal F"],
    "axisLabel": {"rotate": 12}},
  "yAxis": {"name": "Normalised betweenness centrality", "nameLocation": "middle", "nameGap": 50, "min": 0, "max": 1},
  "series": [{
    "name": "Betweenness",
    "type": "bar",
    "itemStyle": {"color": "#1565C0"},
    "data": [
      {"value": 0.03, "itemStyle": {"color": "#90CAF9"}},
      {"value": 0.18, "itemStyle": {"color": "#42A5F5"}},
      {"value": 0.74, "itemStyle": {"color": "#C62828"}},
      {"value": 0.68, "itemStyle": {"color": "#E53935"}},
      {"value": 0.15, "itemStyle": {"color": "#42A5F5"}},
      {"value": 0.04, "itemStyle": {"color": "#90CAF9"}}
    ],
    "label": {"show": true, "position": "top", "formatter": "{c}"}
  }]
}'></div>

Hub nodes C and D carry betweenness centrality 4–5× higher than branch nodes B and E, and 20× higher than terminal nodes. Their removal would force ~70% of all origin-destination pairs to use longer detours. This concentration of criticality in a small number of nodes is characteristic of real transit networks — it is the price of efficiency: the same hub structure that minimises average travel time also creates the network's most catastrophic single points of failure.

---

## 7. Interpretation

Betweenness centrality is the most policy-relevant centrality measure for transportation because it directly quantifies vulnerability. The nodes with highest betweenness are exactly the bridges, tunnels, and interchange ramps whose closure causes maximum network-wide disruption. In British Columbia, this analysis has been applied to identify which mountain pass roads, if blocked by landslides, would most severely cut off coastal communities — a literally life-or-death application in a province where many communities have only one road access route.

The four-step model's route assignment step (user equilibrium) shows that real traffic networks do not necessarily use shortest paths in the graph sense: when a road is congested, its effective travel time increases and drivers divert to uncongested alternatives. The equilibrium condition is not minimum distance — it is equal cost across all used routes. This distinction is critical for infrastructure investment: adding capacity where the shortest-path model predicts maximum flow may simply attract more traffic (induced demand), not reduce congestion — a phenomenon explored in Essay AK2.

---

## 8. What Could Go Wrong?

**Wardrop equilibrium assumes perfect information and rational choice.** Real drivers do not perfectly optimise and do not have complete network information. Navigation apps (Waze, Google Maps) approach the information assumption but also create their own equilibrium problems: when all drivers follow the same routing algorithm, they can be simultaneously directed to the same route, creating new congestion that the algorithm did not predict.

**Static shortest paths ignore time-varying conditions.** A shortest path computed on a static network with fixed travel times does not account for congestion that builds during peak hours, incidents that close routes, or transit schedules that determine when connections are available. Time-expanded networks (where each node is a (location, time) pair) handle these dynamics at the cost of enormous graph size.

**Disconnected components.** If a node or edge removal disconnects the graph, $d(i,j) = \infty$ for the affected pairs, contributing 0 to network efficiency. A single bridge removal that cuts a community off from the rest of the network produces $\Delta E$ that is large but does not capture the qualitative severity — zero accessibility is not just "lower efficiency," it is a different kind of failure that pure efficiency metrics underrepresent.

---

## 9. Summary

Transportation networks are weighted directed graphs. Dijkstra's algorithm finds all shortest paths from a source in $O((n+m)\log n)$, enabling travel time computation, isochrone mapping, and route assignment across city-scale networks. Betweenness centrality identifies the critical bottleneck nodes and edges whose removal most degrades network-wide performance — the targets for resilience investment and seismic retrofitting.

The four-step transport model (generation, distribution, mode choice, assignment) embeds graph-theoretic shortest paths within a larger demand forecasting framework. User equilibrium assignment produces the realistic traffic loading that accounts for congestion effects — a more accurate but computationally demanding alternative to simple shortest-path routing.

**Key equations:**

$$C_B(v) = \frac{2}{(n-1)(n-2)}\sum_{s \neq v \neq t}\frac{\sigma_{st}(v)}{\sigma_{st}}$$

$$E(G) = \frac{1}{n(n-1)}\sum_{i \neq j}\frac{1}{d(i,j)}$$

$$\text{Dijkstra relaxation: } d[v] \leftarrow \min(d[v],\; d[u] + w(u,v))$$

---

## Math Refresher

**Why non-negative weights matter for Dijkstra.** The algorithm's greedy correctness relies on: once a node is extracted with distance $d[u]$, no shorter path to $u$ can be discovered later. This holds only if all future edges have non-negative weight — then all future paths through $u$ are at least as long as $d[u]$. A negative edge could create a shortcut that Dijkstra already passed. For graphs with negative edges, Bellman-Ford (which relaxes all edges $n-1$ times) is needed, at $O(nm)$ cost.

**The triangle inequality.** Shortest path distances satisfy $d(s,t) \leq d(s,u) + d(u,t)$ for all $u$ — the path via any intermediate node is no shorter than the direct path. This is the generalisation of the Euclidean triangle inequality to arbitrary graphs. It underpins the correctness of many distance-based algorithms and the structure of the network efficiency formula.

**Sparse vs. dense graphs.** A complete graph has $m = n(n-1)/2$ edges — every node connected to every other. A path graph has $m = n-1$ edges. Real road networks fall between: each intersection connects to 3–4 others on average, giving $m \approx 3n/2$. This sparsity is what makes Dijkstra tractable on city-scale networks: $O(m \log n) \approx O(n \log n)$ rather than the $O(n^2)$ that a dense graph would require.
