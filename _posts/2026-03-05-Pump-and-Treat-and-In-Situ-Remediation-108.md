---
layout: model
title: "Pump-and-Treat and In-Situ Remediation"
subtitle: "Capture zone analysis, Theis equation, and cost-benefit comparison of remediation approaches"
date: 2026-03-05
categories: modelling
series: computational-geography-laboratory
series_order: 108
cluster: "AT — Groundwater Contamination and Remediation"
cluster_order: 2
tags: [math, viz, essay]
math: true
viz: true
math_core:
  - radial flow equations
  - superposition of wells
  - stoichiometry
  - net present value (cost-benefit)
spatial_reasoning: capture zone geometry and well placement
dynamics: transient aquifer drawdown (Theis) and steady-state (Thiem)
computation: capture zone width, ISCO stoichiometry
domain: hydrogeology / environmental engineering
difficulty: 4
prerequisites:
  - AT1
  - AR1
notebook_url: https://github.com/waywardhouse/computational-geography-lab/tree/main/essays/AT2-remediation
excerpt: >
  Pump-and-treat is the standard remedial technology at groundwater contamination
  sites: pump contaminated groundwater to the surface, treat it, and either
  discharge it or reinfiltrate. Whether it works depends on the pumping well's
  capture zone — the upgradient area whose groundwater flows to the well. This
  essay derives capture zone geometry from Theis and steady-state well equations,
  calculates the minimum pumping rate to prevent plume escape, quantifies in-situ
  chemical oxidation reagent requirements stoichiometrically, defines monitored
  natural attenuation criteria, and compares remediation approaches economically
  using net present value.
math_prerequisites: >
  Logarithms and natural logarithms. The concept of radial flow symmetry.
  Darcy's law (Essay AT1). Basic economics for NPV calculation.
---

The largest pump-and-treat system in North America operates at the Rocky Mountain Arsenal near Denver, Colorado — a former chemical weapons manufacturing site contaminated with nerve agent precursors, pesticides, and aviation fuel. The system has been pumping and treating since 1982, handling up to 6,000 gallons per minute through a treatment train that includes air stripping, activated carbon adsorption, and biological treatment. After 40 years and hundreds of millions of dollars, it continues to operate — not because it has failed, but because the contamination was so severe and so deeply embedded in the aquifer that complete cleanup will take generations.

Pump-and-treat is not a silver bullet. It is a hydraulic containment technology that, in the best case, prevents plume migration to receptors while natural attenuation and time slowly reduce contaminant mass. Understanding its mathematics — capture zones, pumping rates, and the economics of operation over decades — is essential for realistic site management.

---

## 1. The Question

What pumping rate is required to capture a contaminant plume and prevent it from migrating to a receptor? How does a single pumping well affect the surrounding water table? What in-situ chemical treatment can destroy contaminant mass? And how do we compare remediation alternatives economically over a 30-year project life?

---

## 2. The Conceptual Model

A pumping well in an aquifer with regional groundwater flow creates a cone of depression — a radially symmetric drawdown zone that deflects the regional flow lines toward the well. The **capture zone** is the upgradient area whose flow lines converge on the well. Any contaminant within the capture zone will be pumped to the surface; any contaminant outside will continue to migrate downgradient.

The width of the capture zone at the well is determined by the pumping rate relative to the regional flow rate. Insufficient pumping allows the plume to pass between wells; excessive pumping wastes energy and treatment costs.

---

## 3. Building the Mathematical Model

### 3.1 Steady-State Radial Flow — Thiem Equation

For a single well pumping at rate $Q$ [m³ s⁻¹] in a confined aquifer at steady state, the drawdown $s = h_0 - h$ (where $h_0$ is undisturbed head) at distance $r$ [m] from the well is described by the **Thiem equation**:

$$s(r) = s(r_1) - \frac{Q}{2\pi T}\ln\!\left(\frac{r}{r_1}\right)$$

where $T = Kb$ [m² s⁻¹] is **transmissivity** (hydraulic conductivity × saturated thickness), and $r_1$ is a reference distance where head is known.

For an unconfined aquifer (water table), the equivalent is:

$$h(r)^2 - h(r_1)^2 = \frac{Q}{\pi K}\ln\!\left(\frac{r}{r_1}\right)$$

### 3.2 Transient Response — Theis Equation

Before steady state is reached, drawdown evolves with time. The **Theis equation** (1935):

$$s(r,t) = \frac{Q}{4\pi T} W(u)$$

where $W(u) = -\text{Ei}(-u) = \int_u^\infty \frac{e^{-t}}{t}dt$ is the **well function** and:

$$u = \frac{r^2 S}{4Tt}$$

$S$ is the **storativity** (confined: 10⁻⁵–10⁻³; unconfined = specific yield $S_y \approx 0.1$–0.3), and $t$ is time.

**Cooper-Jacob approximation** (valid for $u < 0.05$, i.e., large $t$ or small $r$):

$$s(r,t) \approx \frac{Q}{4\pi T}\left[\ln\!\left(\frac{2.25Tt}{r^2 S}\right)\right] = \frac{2.303Q}{4\pi T}\log_{10}\!\left(\frac{2.25Tt}{r^2 S}\right)$$

For $Q = 0.01$ m³/s, $T = 0.002$ m²/s, $r = 50$ m, $S = 0.001$, $t = 24$ hours = 86,400 s:

$u = 50^2 \times 0.001 / (4 \times 0.002 \times 86400) = 2500 \times 0.001/691.2 = 0.00362$ (< 0.05 ✓)

$s = 0.01/(4\pi \times 0.002) \times \ln(2.25 \times 0.002 \times 86400/(2500 \times 0.001))$
$= 0.0398 \times \ln(155.52)$
$= 0.0398 \times 5.047 = 0.201$ m drawdown at 50 m after 24 hours.

### 3.3 Capture Zone Analysis

In a uniform regional flow field with Darcy flux $q_0 = K \cdot i$ [m/day], a pumping well of rate $Q$ [m³/day] creates a capture zone whose **maximum width** $y_{\max}$ at the well (the total width far upgradient) is:

$$y_{\max} = \frac{Q}{q_0 b}$$

where $b$ is aquifer saturated thickness. This is the width of the entire capture zone — the region whose groundwater is captured by the well.

The **stagnation point** — the upgradient point where the regional flow exactly balances the wellward flow — is at distance:

$$x_s = -\frac{Q}{2\pi T i \cdot b} = -\frac{Q}{2\pi q_0 b}$$

(negative = upgradient). Beyond this point, all groundwater flows toward the well.

The **capture zone boundary** is the streamline that divides captured from escaped flow. Its shape is:

$$y = \pm\frac{Q}{2q_0 b}\left(1 - \frac{x}{|x_s|}\right) \quad \text{(approximate, for large }x\text{)}$$

For complete capture of a plume of width $W_{\text{plume}}$: need $y_{\max} \geq W_{\text{plume}}$ → required pumping rate:

$$Q_{\min} = W_{\text{plume}} \cdot q_0 \cdot b$$

### 3.4 In-Situ Chemical Oxidation (ISCO)

ISCO destroys contaminants in the subsurface by injecting a strong oxidant — permanganate (KMnO₄), persulfate (Na₂S₂O₈), or Fenton's reagent (H₂O₂ + Fe²⁺). The stoichiometric requirement for each contaminant is derived from the balanced chemical equation.

**PCE destruction by permanganate:**

$$3\text{C}_2\text{Cl}_4 + 4\text{KMnO}_4 \rightarrow 6\text{CO}_2 + 4\text{KCl} + 4\text{MnO}_2 + 2\text{Cl}_2$$

Stoichiometric ratio: 4 mol KMnO₄ per 3 mol PCE.

Molar masses: PCE ($C_2Cl_4$) = 165.8 g/mol; KMnO₄ = 158.0 g/mol.

Mass ratio: $\frac{4 \times 158.0}{3 \times 165.8} = \frac{632}{497.4} = 1.27$ kg KMnO₄ per kg PCE.

**Practical demand:** The subsurface **natural oxidant demand (NOD)** — from naturally occurring reduced compounds (organic matter, Fe²⁺, Mn²⁺, sulfide) — typically requires 1–10× the theoretical ISCO demand. Total oxidant mass:

$$M_{\text{oxidant}} = (S_R \cdot M_{\text{contaminant}} + \text{NOD} \cdot V_{\text{treatment}}) \cdot \text{safety factor}$$

where $S_R$ is stoichiometric ratio, $M_{\text{contaminant}}$ is contaminant mass to destroy, $\text{NOD}$ is oxidant demand per unit aquifer volume, and the safety factor is typically 2–5 to ensure reaction completion.

### 3.5 Monitored Natural Attenuation Criteria

**Monitored natural attenuation (MNA)** is accepted as a remedial strategy when:

1. **Lines of evidence** demonstrate active biodegradation:
   - Decreasing concentrations along the flow path
   - Depletion of electron acceptors (O₂, NO₃⁻, SO₄²⁻) and accumulation of metabolic byproducts (Fe²⁺, Mn²⁺, CH₄)
   - Stable or shrinking plume footprint over time (at least 3–4 years of data)

2. **Plume stability** demonstrated: $L_{\text{plume}} < L_{\text{receptor}}$ (plume length does not reach nearest receptor)

3. **Risk-based** cleanup targets reachable within a reasonable timeframe (typically 30–50 years for residential use)

The **attenuation rate constant** $\lambda$ is estimated from the spatial decrease in concentration along the plume centreline:

$$\ln C(x) = \ln C_0 - \frac{\lambda}{v_c} x$$

If $\ln C$ vs. $x$ is linear, the slope gives $-\lambda/v_c$, and $\lambda = -\text{slope} \times v_c$.

### 3.6 Net Present Value Cost Comparison

Remediation costs extend over decades. **Net present value (NPV)** converts all future costs to present-day equivalents:

$$\text{NPV} = \sum_{t=0}^{T} \frac{C_t}{(1+r)^t}$$

where $C_t$ is cost in year $t$, $r$ is discount rate (typically 3–7% for public projects), and $T$ is project horizon.

For a pump-and-treat system with capital cost $C_0$ and annual O&M cost $C_{\text{OM}}$ for $T$ years:

$$\text{NPV}_{\text{P\&T}} = C_0 + C_{\text{OM}} \cdot \frac{1-(1+r)^{-T}}{r}$$

The factor $[1-(1+r)^{-T}]/r$ is the **present value annuity factor** (PVAF).

**Comparison example:** Three options for a PCE plume at $Q = 0.002$ m³/s pump rate:

| Option | Capital ($M) | Annual O&M ($M/yr) | Duration (yr) | NPV at 5% ($M) |
|---|---|---|---|---|
| Pump-and-treat | 2.0 | 0.4 | 30 | 2.0 + 0.4×15.37 = **8.15** |
| ISCO | 1.5 | 0.05 | 5 | 1.5 + 0.05×4.33 = **1.72** |
| MNA with monitoring | 0.1 | 0.08 | 30 | 0.1 + 0.08×15.37 = **1.33** |

PVAF (5%, 30yr) = $[1-(1.05)^{-30}]/0.05 = 15.37$; PVAF (5%, 5yr) = 4.33.

MNA has the lowest NPV if the site qualifies — but requires demonstrating regulatory criteria. ISCO has higher NPV than MNA but lower than P&T and achieves faster cleanup of source mass. P&T is by far the most expensive option over a 30-year horizon — yet it remains the most common technology at major sites because it provides immediate hydraulic containment and regulatory certainty.

---

## 4. Worked Example by Hand

**Setting:** A TCE plume at a Calgary industrial site. Aquifer: $K = 5\times10^{-4}$ m/s, $b = 12$ m, $i = 0.003$, $T = Kb = 6\times10^{-3}$ m²/s. Plume width at leading edge: 35 m. Design a capture well.

**Step 1: Regional Darcy flux**

$$q_0 = K \cdot i = 5\times10^{-4} \times 0.003 = 1.5\times10^{-6} \text{ m/s} = 0.130 \text{ m/day}$$

**Step 2: Minimum pumping rate for full capture**

$$Q_{\min} = W_{\text{plume}} \cdot q_0 \cdot b = 35 \times 1.5\times10^{-6} \times 12 = 6.3\times10^{-4} \text{ m}^3/\text{s} = 54.4 \text{ m}^3/\text{day}$$

**Step 3: Stagnation point location**

$$x_s = -\frac{Q_{\min}}{2\pi q_0 b} = -\frac{6.3\times10^{-4}}{2\pi \times 1.5\times10^{-6} \times 12} = -\frac{6.3\times10^{-4}}{1.131\times10^{-4}} = -5.57 \text{ m}$$

The stagnation point is 5.6 m upgradient of the well — a relatively small capture zone for this plume width, meaning the well is positioned close to the leading edge.

**Step 4: ISCO requirement** (TCE source mass = 80 kg)

TCE + permanganate: $2\text{KMnO}_4 + \text{C}_2\text{HCl}_3 \rightarrow 2\text{CO}_2 + 2\text{MnO}_2 + 2\text{KCl} + \text{HCl}$

Stoichiometric ratio: $(2 \times 158.0)/(131.4) = 316/131.4 = 2.41$ kg KMnO₄/kg TCE

$M_{\text{KMnO}_4,\text{stoic}} = 2.41 \times 80 = 193$ kg

With NOD of 3 g/kg aquifer solids and treatment volume 1000 m³ at bulk density 1800 kg/m³:

$\text{NOD mass} = 3 \times 10^{-3} \times 1800 \times 1000 = 5400$ kg

$M_{\text{total}} = (193 + 5400) \times 2 \text{ (safety factor)} = 11{,}186$ kg KMnO₄

At $\$1.50$/kg, reagent cost ≈ $\$16{,}800.

---

## 5. Computational Implementation

```
function theis_drawdown(r, t, Q, T, S):
    u = r**2 * S / (4 * T * t)
    W_u = well_function(u)  # -Ei(-u)
    return Q / (4 * pi * T) * W_u

function capture_width(Q, q0, b):
    return Q / (q0 * b)

function stagnation_x(Q, q0, b):
    return -Q / (2 * pi * q0 * b)

function npv(capital, annual_om, years, rate):
    pvaf = (1 - (1 + rate)**(-years)) / rate
    return capital + annual_om * pvaf

function isco_mass(contaminant_mass_kg, stoic_ratio, NOD_g_kg,
                   V_treatment_m3, rho_b_kg_m3, safety=2):
    theoretical = stoic_ratio * contaminant_mass_kg
    nod_demand = NOD_g_kg/1000 * rho_b_kg_m3 * V_treatment_m3
    return (theoretical + nod_demand) * safety
```

```{pyodide}
import numpy as np
from scipy.special import exp1

def well_function(u):
    return exp1(u)  # -Ei(-u) = E1(u)

def theis(r, t, Q, T, S):
    u = r**2 * S / (4*T*t)
    return Q / (4*np.pi*T) * well_function(u)

def cooper_jacob(r, t, Q, T, S):
    u = r**2 * S / (4*T*t)
    if u > 0.05: return np.nan  # approximation invalid
    return Q/(4*np.pi*T) * np.log(2.25*T*t/(r**2*S))

def capture_analysis(Q, K, b, i):
    q0 = K * i
    width = Q / (q0 * b)
    xs = -Q / (2*np.pi*q0*b)
    return q0, width, xs

def npv_cost(capital, annual_om, years, r=0.05):
    pvaf = (1-(1+r)**(-years))/r
    return capital + annual_om * pvaf

# Calgary TCE site
K, b, i = 5e-4, 12.0, 0.003
T = K * b
W_plume = 35.0
Q_min = W_plume * K * i * b
print(f"Minimum pumping rate: {Q_min*86400:.1f} m³/day = {Q_min*1000:.2f} L/s")

q0, cap_w, xs = capture_analysis(Q_min, K, b, i)
print(f"Capture zone width: {cap_w:.1f} m")
print(f"Stagnation point: {xs:.1f} m upgradient")

# Theis drawdown at various distances after 7 days
S = 0.0002
t7 = 7*86400
print(f"\nTheis drawdown after 7 days (Q={Q_min:.2e} m³/s, T={T:.3e} m²/s):")
for r in [1, 5, 10, 25, 50, 100]:
    s = theis(r, t7, Q_min, T, S)
    print(f"  r={r:4d}m: s={s:.3f} m")

# NPV comparison
print("\nNPV comparison (5% discount rate, r in million $):")
for name, cap, om, yrs in [
    ("Pump-and-treat", 2.0, 0.40, 30),
    ("ISCO",           1.5, 0.05,  5),
    ("MNA + monitoring",0.1, 0.08, 30)]:
    nv = npv_cost(cap, om, yrs)
    print(f"  {name:25s}: NPV = ${nv:.2f}M")
```

---

## 6. Visualization

<div data-viz="echarts" style="height:420px" data-options='{
  "title": {"text": "Capture Zone Width vs Pumping Rate — Various Aquifer Conditions", "textStyle": {"fontSize": 14}},
  "tooltip": {"trigger": "axis"},
  "legend": {"data": ["q₀b = 0.002 m²/day (slow)", "q₀b = 0.01 m²/day (medium)", "q₀b = 0.05 m²/day (fast)"], "bottom": 0},
  "xAxis": {"name": "Pumping rate Q (m³/day)", "nameLocation": "middle", "nameGap": 30,
    "data": [10,25,50,75,100,150,200,300,400,500]},
  "yAxis": {"name": "Maximum capture zone width (m)", "nameLocation": "middle", "nameGap": 60},
  "series": [
    {"name": "q₀b = 0.002 m²/day (slow)", "type": "line", "smooth": false,
     "data": [5000,12500,25000,37500,50000,75000,100000,150000,200000,250000]},
    {"name": "q₀b = 0.01 m²/day (medium)", "type": "line", "smooth": false,
     "data": [1000,2500,5000,7500,10000,15000,20000,30000,40000,50000]},
    {"name": "q₀b = 0.05 m²/day (fast)", "type": "line", "smooth": false,
     "data": [200,500,1000,1500,2000,3000,4000,6000,8000,10000]}
  ]
}'></div>

Capture zone width scales linearly with pumping rate and inversely with the product $q_0 b$ (natural groundwater flux × saturated thickness). A fast aquifer (high $q_0 b$) requires much higher pumping to capture the same plume width. This explains why pump-and-treat is economically challenging in high-transmissivity aquifers: the energy cost of pumping against a large regional flux is prohibitive, and the required pumping rate may exceed practical limits.

---

## 7. Interpretation

The capture zone analysis reveals a fundamental constraint on pump-and-treat: the pumping rate must exceed the natural groundwater flux through the entire plume cross-section. In a transmissive aquifer with a 50 m wide plume and $q_0 b = 0.05$ m²/day: $Q_{\min} = 50 \times 0.05 = 2.5$ m³/day. This is achievable at modest cost. But in a highly transmissive alluvial aquifer with $q_0 b = 0.5$ m²/day: $Q_{\min} = 25$ m³/day — still manageable. The challenge becomes acute when the plume is large (hundreds of metres wide) in a fast aquifer.

The NPV comparison shows that pump-and-treat is economically justified primarily when containment is legally required (imminent receptor risk) or when the site generates ongoing income that offsets remediation cost. For sites where receptor risk is manageable and MNA criteria are met, monitored natural attenuation is typically 5–10× less expensive in present value terms. The regulatory decision between these alternatives is therefore not purely technical — it involves risk tolerance, timeline commitments, and institutional trust in models that predict future concentrations.

---

## 8. What Could Go Wrong?

**Pump-and-treat asymptotically approaches but never achieves the cleanup goal.** Aquifer heterogeneity creates high-concentration residuals in low-permeability zones that slowly diffuse back into the pumped water. The characteristic **"tail" behaviour** — rapid initial concentration decline, followed by extremely slow decline toward the cleanup standard — has been observed at virtually every long-running P&T site. Cost projections based on initial concentration decline rates consistently underestimate the total project cost.

**ISCO can mobilise contaminants.** Injecting oxidant into a NAPL source zone can increase contaminant concentrations downgradient during and after treatment by: (1) temporarily increasing NAPL dissolution rate (the oxidant creates a concentration gradient that drives faster dissolution), and (2) oxidant propagation beyond the target zone destroying monitored natural attenuation capacity (e.g., eliminating electron donor supply needed by reductive dechlorinators). ISCO should not be applied without careful assessment of downgradient receptor risk during the treatment period.

**MNA requires long-term institutional memory.** A 30-year MNA programme requires maintaining monitoring wells, records, and institutional knowledge across multiple ownership and regulatory transitions. Sites that were accepted for MNA in the 1990s have in some cases lost their monitoring programmes, been redeveloped without proper assessment, and created new exposure pathways. MNA is not a "walk away" strategy — it requires sustained commitment that many organisations and regulatory agencies are poorly equipped to maintain.

**Discount rates systematically underweight future costs.** A 5% discount rate reduces a $1M cost in year 30 to $231K present value — an 77% reduction. This means long-duration remediation (pump-and-treat for 50 years) appears less expensive in NPV terms than it actually is in undiscounted terms. The choice of discount rate is not politically neutral: lower rates favour long-duration approaches; higher rates favour front-loaded capital investment (like ISCO). For projects with environmental and public health consequences, zero or near-zero discount rates for benefit and harm are defensible in principle, even if unconventional in practice.

---

## 9. Summary

Pump-and-treat hydraulic containment requires a minimum pumping rate $Q_{\min} = W_{\text{plume}} \cdot q_0 \cdot b$ to capture a plume of width $W_{\text{plume}}$ in an aquifer with Darcy flux $q_0$ and saturated thickness $b$. The Theis equation $s = QW(u)/(4\pi T)$ describes transient drawdown around a pumping well; the Cooper-Jacob approximation simplifies this for $u < 0.05$.

ISCO stoichiometry determines oxidant reagent mass from balanced chemical equations, adjusted upward for natural oxidant demand and safety factors. MNA is accepted when spatial concentration decline demonstrates active biodegradation and plume stability. NPV cost comparison discounts all future cash flows: $\text{NPV} = C_0 + C_{\text{OM}} \cdot [(1-(1+r)^{-T})/r]$. Over 30-year horizons, pump-and-treat typically costs 5–10× more than MNA in NPV terms.

**Key equations:**

$$Q_{\min} = W_{\text{plume}} \cdot q_0 \cdot b$$

$$y_{\max} = Q/(q_0 b), \quad x_s = -Q/(2\pi q_0 b)$$

$$s(r,t) = \frac{Q}{4\pi T}W(u), \quad u = \frac{r^2 S}{4Tt}$$

$$\text{NPV} = C_0 + C_{\text{OM}}\cdot\frac{1-(1+r)^{-T}}{r}$$

---

## Math Refresher

**The well function $W(u)$.** The Theis well function is $W(u) = \int_u^\infty e^{-t}/t\,dt$ — the exponential integral $E_1(u)$. For small $u$ ($u < 0.05$), the approximation $W(u) \approx -\gamma - \ln u \approx -0.5772 - \ln u$ works well (the Cooper-Jacob simplification). Plotted against $\log u$, $W(u)$ decreases from large values at small $u$ to near zero at large $u$ — large $u$ corresponds to short times or large distances where drawdown has not yet propagated. The Theis type curve is used in aquifer pump tests to estimate $T$ and $S$ by matching observed drawdown data to the theoretical $W(u)$ curve.

**Present value and the annuity factor.** The present value of a stream of equal annual payments $C$ for $T$ years at discount rate $r$ is $C \times [(1-(1+r)^{-T})/r]$. This annuity factor equals the number of years $T$ when $r = 0$ (no discounting); it is less than $T$ for $r > 0$ because future payments are worth less. For $r = 5\%$ and $T = 30$, the factor is 15.37 — equivalent to 15.4 years of payments in present value terms, even though 30 actual payments will be made. This compression of future costs into a smaller present value is the fundamental reason why long-duration liabilities appear more manageable in economic analyses than they do to communities that must actually live with them for 30 years.
