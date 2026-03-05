---
layout: model
title: "Rock Weathering and Soil Formation"
subtitle: "Chemical kinetics, temperature dependence, and the slow arithmetic of landscape lowering"
date: 2026-03-05
categories: modelling
series: computational-geography-laboratory
series_order: 71
cluster: "AA — Weathering and Hillslope Processes"
cluster_order: 1
tags: [math, viz, essay]
math: true
viz: true
math_core:
  - exponential functions
  - differential equations
  - Arrhenius equation
  - reaction kinetics
spatial_reasoning: vertical gradients
dynamics: continuous
computation: numerical integration
domain: geomorphology
difficulty: 4
barnsley_chapter: 4
prerequisites:
  - A3
  - B5
notebook_url: https://github.com/waywardhouse/computational-geography-lab/tree/main/essays/AA1-weathering
excerpt: >
  Soil does not simply appear beneath our feet — it is manufactured, grain by grain,
  from the slow chemical attack on bedrock. This essay derives the kinetics of mineral
  dissolution, applies the Arrhenius equation to understand how temperature accelerates
  the process, and uses cosmogenic nuclide concentrations to read denudation rates
  written in stone.
math_prerequisites: >
  Exponential functions and logarithms (Essay A3). Basic differential equations
  (Essay B5). Familiarity with the concept of equilibrium is helpful but not required.
---

Somewhere beneath the soil horizon on every hillslope on Earth, bedrock is dissolving. The process is imperceptibly slow by human standards — a millimetre of granite may yield a millimetre of saprolite over ten thousand years — but integrated across a continent and across geological time, it is the engine that produces the thin skin of soil on which all terrestrial life depends.

Understanding weathering quantitatively means understanding chemistry: specifically, how fast minerals dissolve, how temperature changes that rate, and how we can read the cumulative history of landscape lowering from the atomic clocks embedded in quartz grains. These are not peripheral technical details. They are the foundation of every model of soil depth, slope form, and landscape evolution.

---

## 1. The Question

How fast does rock become soil, and what controls the rate? Can we derive a mathematical description of chemical weathering that connects molecular processes to landscape-scale denudation?

---

## 2. The Conceptual Model

We abstract the weathering system into three interacting components.

**The mineral surface.** Weathering is a surface reaction — it happens at the interface between mineral grains and the water film that coats them. The reaction rate therefore depends on the available surface area, not just the mass of rock present. A fine-grained rock weathers faster than a coarse-grained one of identical composition, because it presents more surface per unit volume.

**The reactive fluid.** Rainwater is not chemically neutral. It dissolves CO₂ from the atmosphere and soil gas to form carbonic acid (H₂CO₃), which dissociates to supply H⁺ ions. These protons attack mineral lattices, weakening bonds and releasing cations into solution. The fluid's pH — its H⁺ activity — is therefore a primary control on reaction rate.

**Temperature.** Chemical reactions proceed faster at higher temperatures. This is not a vague qualitative statement; it has a precise quantitative form given by the Arrhenius equation, which we will derive from first principles in §3.

What we discard: mineralogical heterogeneity within a single rock type, the role of biological acids, and lateral fluid flow across the hillslope. These are all real and important, but the first-order model captures the dominant controls.

---

## 3. Building the Mathematical Model

### 3.1 Dissolution Kinetics: The Rate Law

The dissolution rate of a mineral — the mass dissolved per unit surface area per unit time — follows a **rate law** of the general form:

$$r = k_{\text{eff}} \cdot a_{\text{H}^+}^n$$

where:
- $r$ is the dissolution rate [mol m⁻² s⁻¹]
- $k_{\text{eff}}$ is an effective rate constant [mol m⁻² s⁻¹]
- $a_{\text{H}^+}$ is the activity of hydrogen ions (dimensionless, approximately equal to molar concentration for dilute solutions)
- $n$ is a reaction order (dimensionless, typically 0.4–0.6 for silicate minerals)

Since pH = $-\log_{10}(a_{\text{H}^+})$, we can write $a_{\text{H}^+} = 10^{-\text{pH}}$, giving:

$$r = k_{\text{eff}} \cdot 10^{-n \cdot \text{pH}}$$

This tells us something immediately useful: each unit decrease in pH increases the dissolution rate by a factor of $10^n$. For $n = 0.5$, dropping from pH 6 to pH 5 (the approximate range of natural soil water) roughly triples the weathering rate.

### 3.2 Temperature Dependence: The Arrhenius Equation

Why does temperature accelerate chemical reactions? The kinetic interpretation is that molecules must possess a minimum energy — the **activation energy** $E_a$ [J mol⁻¹] — to react when they collide. The Boltzmann distribution tells us what fraction of molecules exceed this threshold at a given temperature $T$ [K]:

$$f(E > E_a) \propto \exp\!\left(-\frac{E_a}{RT}\right)$$

where $R = 8.314$ J mol⁻¹ K⁻¹ is the universal gas constant. If the rate constant is proportional to this fraction, then:

$$k_{\text{eff}}(T) = A \cdot \exp\!\left(-\frac{E_a}{RT}\right)$$

This is the **Arrhenius equation**, where $A$ is a pre-exponential factor with the same units as $k_{\text{eff}}$. Taking the ratio of rate constants at two temperatures $T_1$ and $T_2$:

$$\frac{k_{\text{eff}}(T_2)}{k_{\text{eff}}(T_1)} = \exp\!\left[\frac{E_a}{R}\left(\frac{1}{T_1} - \frac{1}{T_2}\right)\right]$$

For silicate minerals, $E_a \approx 60$–80 kJ mol⁻¹. Substituting $E_a = 70{,}000$ J mol⁻¹ and comparing $T_1 = 278$ K (5°C) to $T_2 = 298$ K (25°C):

$$\frac{k(298)}{k(278)} = \exp\!\left[\frac{70000}{8.314}\left(\frac{1}{278} - \frac{1}{298}\right)\right] \approx 5.8$$

A warming of 20°C nearly sextuples the weathering rate. This is why tropical weathering profiles extend tens of metres deep while arctic soils are often just centimetres thick.

### 3.3 Soil Profile Development

Let $W(z, t)$ be the degree of weathering at depth $z$ [m] below the surface at time $t$ [yr]. The simplest model treats weathering as an exponential decay with depth — a consequence of the fact that fresh water (and therefore reactive H⁺) decreases with depth as it equilibrates with the mineral matrix:

$$W(z) = W_0 \cdot e^{-z/h}$$

where $W_0$ is the weathering intensity at the surface and $h$ [m] is a characteristic length scale for fluid penetration, typically 0.5–2 m for most rock types.

The total mass weathered from a column of unit cross-section down to depth $z_{\max}$ is:

$$M = \int_0^{z_{\max}} \rho_r \cdot W(z) \, dz = \rho_r W_0 h \left(1 - e^{-z_{\max}/h}\right)$$

where $\rho_r$ [kg m⁻³] is the rock density.

### 3.4 Denudation Rates from Cosmogenic Nuclides

We can measure how fast rock has been eroding over geological timescales using **cosmogenic nuclides** — isotopes produced when cosmic rays penetrate rock. The most commonly used is ¹⁰Be (beryllium-10), produced in quartz grains by spallation reactions with oxygen nuclei.

The concentration of ¹⁰Be in a surface quartz sample, $N$ [atoms g⁻¹], reflects the balance between production and removal by erosion and radioactive decay:

$$\frac{dN}{dt} = P_0 \cdot e^{-z/\Lambda} - \lambda N - \frac{\varepsilon}{\Lambda} N$$

At steady state ($dN/dt = 0$), surface concentration ($z = 0$) gives:

$$N_{\text{surface}} = \frac{P_0}{\lambda + \varepsilon/\Lambda}$$

where:
- $P_0 \approx 4.5$ atoms g⁻¹ yr⁻¹ is the surface production rate (at sea level, high latitude)
- $\Lambda \approx 160$ g cm⁻² is the cosmic ray attenuation length
- $\lambda = \ln 2 / t_{1/2} = \ln 2 / (1.387 \times 10^6)$ yr⁻¹ is the ¹⁰Be decay constant
- $\varepsilon$ [g cm⁻² yr⁻¹] is the erosion rate

Rearranging to solve for $\varepsilon$:

$$\varepsilon = \Lambda\left(\frac{P_0}{N_{\text{surface}}} - \lambda\right)$$

Measuring $N_{\text{surface}}$ in the laboratory gives us $\varepsilon$ — the long-term average erosion rate integrated over the timescale of nuclide accumulation (typically $10^3$–$10^6$ years).

---

## 4. Worked Example by Hand

**Setting:** A granitic catchment in the Canadian Rockies. Mean annual temperature 4°C (277 K). Soil water pH 5.2. We want to estimate the feldspar dissolution rate and compare it to a tropical analogue at 26°C (299 K).

**Given:**
- $k_{\text{eff}}$ at 25°C (298 K) = $1.5 \times 10^{-10}$ mol m⁻² s⁻¹ (for K-feldspar at pH 5)
- $n = 0.5$ (reaction order)
- $E_a = 65{,}000$ J mol⁻¹

**Step 1: Dissolution rate at reference temperature (25°C)**

$$r_{298} = k_{\text{eff}} \cdot 10^{-n \cdot \text{pH}} = 1.5 \times 10^{-10} \times 10^{-0.5 \times 5.2}$$

$$= 1.5 \times 10^{-10} \times 10^{-2.6} = 1.5 \times 10^{-10} \times 2.51 \times 10^{-3}$$

$$r_{298} = 3.77 \times 10^{-13} \text{ mol m}^{-2} \text{ s}^{-1}$$

**Step 2: Arrhenius correction to 4°C (277 K)**

$$\frac{k(277)}{k(298)} = \exp\!\left[\frac{65000}{8.314}\left(\frac{1}{298} - \frac{1}{277}\right)\right]$$

$$= \exp\!\left[7817 \times (-2.54 \times 10^{-4})\right] = \exp(-1.985) = 0.137$$

$$r_{277} = 0.137 \times 3.77 \times 10^{-13} = 5.16 \times 10^{-14} \text{ mol m}^{-2} \text{ s}^{-1}$$

**Step 3: Tropical analogue at 26°C (299 K)** — nearly identical temperature to reference, so $r_{299} \approx r_{298} = 3.77 \times 10^{-13}$ mol m⁻² s⁻¹.

**Ratio:** The tropical site weathers feldspar at $3.77 / 0.516 \approx 7.3\times$ the rate of the alpine site. Over a million years, this predicts a tropical soil column roughly 7 times deeper than the alpine equivalent, consistent with field observation.

**Step 4: ¹⁰Be denudation rate** — suppose a quartz sample from the alpine catchment contains $N = 2.4 \times 10^5$ atoms g⁻¹.

$$\lambda = \frac{\ln 2}{1.387 \times 10^6} = 4.998 \times 10^{-7} \text{ yr}^{-1}$$

$$\varepsilon = 160 \left(\frac{4.5}{2.4 \times 10^5} - 4.998 \times 10^{-7}\right) = 160 \times (1.875 \times 10^{-5} - 5.0 \times 10^{-7})$$

$$\varepsilon = 160 \times 1.825 \times 10^{-5} = 2.92 \times 10^{-3} \text{ g cm}^{-2} \text{ yr}^{-1}$$

Converting: with $\rho_r \approx 2.65$ g cm⁻³, this gives $\varepsilon / \rho_r \approx 1.1 \times 10^{-3}$ cm yr⁻¹ = **0.011 mm yr⁻¹** — a typical value for a tectonically quiescent alpine catchment.

---

## 5. Computational Implementation

The following pseudocode describes the weathering rate calculation:

```
function weathering_rate(T_K, pH, k_ref, T_ref_K, n, E_a):
    # Arrhenius correction
    R = 8.314
    k_T = k_ref * exp((E_a / R) * (1/T_ref_K - 1/T_K))
    # pH-dependent rate
    r = k_T * 10^(-n * pH)
    return r

function denudation_from_Be10(N_surface, P0=4.5, Lambda=160, t_half=1.387e6):
    lambda_decay = ln(2) / t_half
    epsilon = Lambda * (P0 / N_surface - lambda_decay)
    return epsilon  # g cm⁻² yr⁻¹
```

```{pyodide}
import numpy as np

# Constants
R = 8.314  # J mol⁻¹ K⁻¹

def weathering_rate(T_K, pH, k_ref=1.5e-10, T_ref=298.0, n=0.5, Ea=65000.0):
    """Dissolution rate [mol m⁻² s⁻¹] via Arrhenius + pH rate law."""
    k_T = k_ref * np.exp((Ea / R) * (1/T_ref - 1/T_K))
    return k_T * 10**(-n * pH)

# Alpine vs tropical comparison
r_alpine  = weathering_rate(T_K=277, pH=5.2)
r_tropical = weathering_rate(T_K=299, pH=5.2)
print(f"Alpine  (4°C):   {r_alpine:.3e} mol m⁻² s⁻¹")
print(f"Tropical (26°C): {r_tropical:.3e} mol m⁻² s⁻¹")
print(f"Ratio:           {r_tropical/r_alpine:.1f}×")

# ¹⁰Be denudation
N = 2.4e5          # atoms g⁻¹
P0 = 4.5           # atoms g⁻¹ yr⁻¹
Lambda = 160       # g cm⁻²
lam = np.log(2) / 1.387e6
eps = Lambda * (P0/N - lam)
print(f"\n¹⁰Be denudation: {eps:.4e} g cm⁻² yr⁻¹")
print(f"  = {eps/2.65*10:.4f} mm yr⁻¹")
```

---

## 6. Visualization

<div data-viz="echarts" style="height:420px" data-options='{
  "title": {"text": "Feldspar Dissolution Rate vs Temperature and pH", "textStyle": {"fontSize": 14}},
  "tooltip": {"trigger": "axis"},
  "legend": {"data": ["pH 4.0", "pH 5.0", "pH 6.0"], "bottom": 0},
  "xAxis": {"name": "Temperature (°C)", "nameLocation": "middle", "nameGap": 30,
    "data": [0,5,10,15,20,25,30]},
  "yAxis": {"name": "Rate (×10⁻¹³ mol m⁻² s⁻¹)", "nameLocation": "middle", "nameGap": 50},
  "series": [
    {"name": "pH 4.0", "type": "line", "smooth": true,
     "data": [4.1, 5.5, 7.3, 9.7, 12.8, 16.8, 22.0]},
    {"name": "pH 5.0", "type": "line", "smooth": true,
     "data": [1.3, 1.7, 2.3, 3.1, 4.0, 5.3, 6.9]},
    {"name": "pH 6.0", "type": "line", "smooth": true,
     "data": [0.41, 0.55, 0.73, 0.97, 1.28, 1.68, 2.20]}
  ]
}'></div>

Each curve shows how the Arrhenius temperature dependence lifts dissolution rates as temperature increases, while the vertical spread between curves reflects the pH sensitivity of the rate law. The gap between pH 4 and pH 6 — roughly a factor of 10 — represents the effect of acid rain versus clean rainfall on mineral weathering.

---

## 7. Interpretation

The model predicts weathering rates that vary over several orders of magnitude across the Earth's climate zones. Cold, high-latitude environments weather at rates of $10^{-14}$–$10^{-13}$ mol m⁻² s⁻¹; hot, humid tropical environments approach $10^{-12}$–$10^{-11}$ mol m⁻² s⁻¹ for the same minerals.

This is not merely an academic result. It has direct consequences for:

- **Soil depth distributions.** The exponential profile model predicts metre-scale tropical soils and centimetre-scale arctic soils, broadly confirmed by global soil databases.
- **River chemistry.** Weathering supplies Ca²⁺, Mg²⁺, Na⁺, K⁺, and Si to rivers. The global silica flux from rivers can be estimated from the dissolution rate model applied to continental lithologies.
- **Carbon cycle.** Silicate weathering consumes CO₂ via the reaction: CaSiO₃ + CO₂ → CaCO₃ + SiO₂. The temperature sensitivity of weathering creates a geochemical thermostat — a warmer climate accelerates weathering, which draws down atmospheric CO₂, which cools the climate. This feedback operates on million-year timescales.

The cosmogenic nuclide constraint is particularly powerful: it gives us a direct, integrative measurement of erosion rate that bypasses the need to observe the process in real time. A single quartz sample, processed correctly, reveals the average erosion rate over the last $10^4$–$10^6$ years.

---

## 8. What Could Go Wrong?

**The steady-state assumption for ¹⁰Be.** The denudation equation assumes the landscape is in steady state — that erosion rate has been constant over the nuclide accumulation period. Glaciated catchments violate this assumption dramatically: glacial erosion is episodic and can exceed interglacial rates by orders of magnitude. Using the steady-state equation in a recently deglaciated landscape gives apparent denudation rates that are meaningless.

**Surface area estimation.** The rate law uses mineral surface area, but we measure mass. The specific surface area of crushed minerals depends on grain size and can vary by a factor of 1000 for the same lithology prepared differently. Laboratory-measured rate constants often cannot be applied directly to field systems without a correction factor of 2–5 orders of magnitude.

**Single-mineral simplification.** Real rocks contain multiple minerals with different solubilities and rate constants. Plagioclase dissolves faster than quartz by 4–6 orders of magnitude at the same pH. Using a single effective rate constant is a deliberate approximation that hides this heterogeneity.

**pH as a proxy for fluid chemistry.** The rate law uses pH as a surrogate for the full speciation of the fluid. In practice, organic acids (from decaying vegetation), dissolved Al³⁺ (which inhibits feldspar dissolution), and ionic strength all modify rates in ways the simple model ignores.

---

## 9. Summary

The rate at which rock becomes soil is governed by two interacting controls: the acidity of percolating water (described by a power-law pH dependence) and temperature (described by the Arrhenius equation). Together they predict that tropical weathering rates exceed those in arctic or alpine environments by 5–10×, a pattern confirmed both by soil profile depths and by river geochemistry.

The cosmogenic nuclide method offers a complementary perspective: rather than predicting rates from chemistry, it reads the integrated erosion history directly from atomic concentrations in quartz. The two approaches — kinetic modelling from the bottom up, nuclide inversion from the top down — triangulate toward the same quantity.

**Key equations:**

$$r = k_{\text{eff}}(T) \cdot 10^{-n \cdot \text{pH}} \quad \text{[dissolution rate]}$$

$$k_{\text{eff}}(T) = A \exp\!\left(-\frac{E_a}{RT}\right) \quad \text{[Arrhenius]}$$

$$\varepsilon = \Lambda\!\left(\frac{P_0}{N} - \lambda\right) \quad \text{[denudation from }{}^{10}\text{Be]}$$

---

## Math Refresher

**Exponential and logarithm review.** The expression $10^{-n \cdot \text{pH}}$ uses the fact that $\log_{10}(a_{\text{H}^+}) = -\text{pH}$, so $a_{\text{H}^+} = 10^{-\text{pH}}$. Raising both sides to the power $n$: $a_{\text{H}^+}^n = 10^{-n \cdot \text{pH}}$. This is just the rule $(a^m)^n = a^{mn}$ applied to base 10.

**Arrhenius linearisation.** Taking the natural log of $k = A e^{-E_a/RT}$ gives $\ln k = \ln A - E_a/(RT)$. A plot of $\ln k$ versus $1/T$ is therefore a straight line with slope $-E_a/R$. This is how activation energies are measured experimentally: run the reaction at several temperatures, plot $\ln k$ vs $1/T$, and read the slope.

**Units in the denudation equation.** The production rate $P_0$ [atoms g⁻¹ yr⁻¹], concentration $N$ [atoms g⁻¹], and attenuation length $\Lambda$ [g cm⁻²] must be dimensionally consistent. The erosion rate $\varepsilon = \Lambda(P_0/N - \lambda)$ has units g cm⁻² yr⁻¹ because $P_0/N$ has units yr⁻¹ and $\Lambda$ has units g cm⁻². To convert to mm yr⁻¹: divide by rock density $\rho_r$ [g cm⁻³] and multiply by 10 (cm → mm).
