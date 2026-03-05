---
layout: essay
title: "Groundwater Contaminant Plumes"
subtitle: "Advection-dispersion in porous media, retardation, NAPL source zones, and plume geometry"
date: 2026-03-05
categories: modelling
series: computational-geography-laboratory
series_order: 107
cluster: "AT — Groundwater Contamination and Remediation"
cluster_order: 1
tags: [math, viz, essay]
math: true
viz: true
math_core:
  - advection-dispersion in porous media
  - retardation factor
  - Darcy velocity and pore velocity
  - sorption equilibrium
spatial_reasoning: 3D plume geometry in aquifer
dynamics: contaminant migration and attenuation
computation: plume length and breakthrough
domain: hydrogeology / environmental engineering
difficulty: 4
prerequisites:
  - AS3
  - C8
notebook_url: https://github.com/waywardhouse/computational-geography-lab/tree/main/essays/AT1-contaminant-plumes
excerpt: >
  A leaking underground fuel tank creates a dissolved-phase plume that migrates
  downgradient through the aquifer, spreading by mechanical dispersion and molecular
  diffusion, retarded by sorption onto aquifer solids, and attenuated by
  biodegradation. The plume geometry — length, width, and depth — determines
  which wells are at risk. This essay derives the advection-dispersion equation
  for porous media, quantifies retardation from the distribution coefficient,
  characterises NAPL source zones and their dissolution rates, and designs a
  monitoring network to delineate the plume boundary.
math_prerequisites: >
  Darcy's law and hydraulic gradient (introduced here). The advection-dispersion
  equation concept (Essay AS3). Exponential functions for decay. Sorption
  equilibrium as a partition coefficient.
---

On a single block of industrial land in Calgary's Nose Creek watershed, 47 underground storage tanks have been decommissioned over the past 30 years — each one a potential source of petroleum hydrocarbon contamination to the shallow sand and gravel aquifer beneath. The plumes from these leaks have reached Nose Creek in at least three documented cases, contributing dissolved benzene and toluene to a system that serves as habitat for the endangered Athabasca rainbow trout downstream.

Every province in Canada has hundreds or thousands of similar sites — leaking gas stations, dry cleaners, and industrial facilities where organic solvents and fuels have migrated from the surface through the soil, encountered the water table, and begun migrating downgradient as dissolved or separate-phase contaminant plumes. Understanding the geometry and behaviour of these plumes is the prerequisite for designing effective monitoring and remediation.

---

## 1. The Question

What controls the velocity and geometry of a groundwater contaminant plume? How does sorption retard contaminant migration relative to groundwater flow? What is a NAPL source zone and how does it sustain a dissolved-phase plume? How do we determine where to place monitoring wells to adequately characterise a plume?

---

## 2. The Conceptual Model

Groundwater flows through the pore spaces of an aquifer in the direction of decreasing hydraulic head, at a rate governed by Darcy's law. A contaminant introduced at the water table is carried downgradient by advection (mean groundwater flow), spread laterally and longitudinally by mechanical dispersion (velocity variations at the pore scale), and dispersed by molecular diffusion. If the contaminant sorbs onto aquifer solids, its effective transport velocity is reduced below the groundwater velocity.

**NAPL** (non-aqueous phase liquid) — fuel oil, chlorinated solvents — is liquid contaminant that does not mix with water. Dense NAPL (DNAPL, e.g., TCE, PCE) sinks to the bottom of the aquifer; light NAPL (LNAPL, e.g., gasoline) floats near the water table. Both slowly dissolve into the groundwater, creating a long-term dissolved-phase plume downgradient. The NAPL source zone can sustain a plume for decades to centuries.

---

## 3. Building the Mathematical Model

### 3.1 Darcy Velocity and Pore Velocity

Groundwater flow follows **Darcy's law**:

$$q = -K \frac{dh}{dx}$$

where $q$ [m s⁻¹] is the **Darcy flux** (also called Darcy velocity or specific discharge), $K$ [m s⁻¹] is hydraulic conductivity, and $dh/dx$ is the hydraulic gradient (slope of the water table or potentiometric surface).

The Darcy flux is an average over the full cross-sectional area (including solids). The actual average velocity through the pore spaces is the **seepage velocity** (pore velocity):

$$v_s = \frac{q}{n_e}$$

where $n_e$ is the **effective porosity** (the connected pore space through which flow actually occurs; typically 0.25–0.35 for sands and gravels). A Darcy flux of $q = 10^{-5}$ m s⁻¹ with $n_e = 0.30$ gives $v_s = 3.3 \times 10^{-5}$ m s⁻¹ = 1.0 m day⁻¹ — a typical groundwater velocity in a shallow alluvial aquifer.

### 3.2 Advection-Dispersion in Porous Media

The ADE for a conservative (non-sorbing, non-decaying) tracer in 1D:

$$n_e \frac{\partial C}{\partial t} = D_h \frac{\partial^2 C}{\partial x^2} - q \frac{\partial C}{\partial x}$$

or equivalently in terms of pore velocity:

$$\frac{\partial C}{\partial t} = D_L \frac{\partial^2 C}{\partial x^2} - v_s \frac{\partial C}{\partial x}$$

The **hydrodynamic dispersion coefficient** $D_h$ [m² s⁻¹] combines:
1. **Mechanical dispersion:** $\alpha_L v_s$ (mixing due to velocity variations at pore scale)
2. **Molecular diffusion:** $D^*/\tau$ (molecular diffusion through the porous medium, with tortuosity $\tau$)

$$D_L = \alpha_L v_s + D^*/\tau$$

The **longitudinal dispersivity** $\alpha_L$ [m] scales with travel distance:
- Laboratory columns: $\alpha_L \approx 0.01$–$0.1$ m
- Field scale (10s of metres): $\alpha_L \approx 0.1$–$1$ m
- Regional scale (100s of metres): $\alpha_L \approx 1$–$10$ m

This **scale dependence of dispersivity** (Gelhar 1986) arises because heterogeneity at larger scales introduces additional velocity variations. Using a laboratory-scale dispersivity at field scale underestimates spreading; using a regional-scale dispersivity for a small-scale problem overestimates it.

Transverse dispersivities: $\alpha_T \approx \alpha_L/10$ (horizontal transverse) and $\alpha_{TV} \approx \alpha_L/100$ (vertical transverse).

### 3.3 Retardation Factor

For a contaminant that sorbs linearly and reversibly onto aquifer solids (Henry's law sorption):

$$q_s = K_d C_w$$

where $q_s$ [mg kg⁻¹] is mass sorbed per mass of solid and $K_d$ [L kg⁻¹] is the distribution coefficient. The retarded transport equation:

$$R_f \frac{\partial C}{\partial t} = D_L \frac{\partial^2 C}{\partial x^2} - v_s \frac{\partial C}{\partial x}$$

where the **retardation factor**:

$$\boxed{R_f = 1 + \frac{\rho_b K_d}{n_e}}$$

with $\rho_b$ [kg L⁻¹] ≈ 1.7–1.9 for dry aquifer material. The contaminant moves at velocity $v_c = v_s/R_f$ — retarded relative to the groundwater.

**Estimating $K_d$ from $f_{oc}$:** For organic contaminants, $K_d$ scales with the organic carbon content of the aquifer solids:

$$K_d = K_{oc} \times f_{oc}$$

where $K_{oc}$ [L kg⁻¹] is the organic carbon-normalised partition coefficient (tabulated for each compound) and $f_{oc}$ is the mass fraction of organic carbon in the aquifer solids.

| Compound | $\log K_{ow}$ | $\log K_{oc}$ | Mobility |
|---|---|---|---|
| Benzene | 2.13 | 1.58 | Highly mobile |
| Toluene | 2.73 | 2.13 | Mobile |
| PCE | 3.40 | 2.85 | Moderately mobile |
| Benzo[a]pyrene | 6.04 | 5.49 | Essentially immobile |

Benzene in an aquifer with $f_{oc} = 0.001$ (0.1% organic carbon): $K_d = 10^{1.58} \times 0.001 = 38 \times 0.001 = 0.038$ L/kg. With $\rho_b = 1.8$, $n_e = 0.30$: $R_f = 1 + 1.8 \times 0.038/0.30 = 1 + 0.228 = 1.23$. Benzene moves at 81% of groundwater velocity — nearly conservative.

PCE in the same aquifer: $K_d = 10^{2.85} \times 0.001 = 708 \times 0.001 = 0.708$ L/kg. $R_f = 1 + 1.8 \times 0.708/0.30 = 1 + 4.25 = 5.25$. PCE moves at 19% of groundwater velocity — significantly retarded.

### 3.4 NAPL Source Zones and Effective Solubility

NAPL persists in the source zone as a separate phase until it has fully dissolved. For a pure NAPL, the dissolution rate into groundwater creates an upgradient source concentration at the **solubility limit** $C_s$ of the compound:

| Compound | Aqueous solubility $C_s$ (mg/L) | DNAPL/LNAPL |
|---|---|---|
| Benzene | 1,790 | LNAPL |
| PCE (tetrachloroethylene) | 150 | DNAPL |
| TCE (trichloroethylene) | 1,100 | DNAPL |
| Vinyl chloride | 2,670 | DNAPL |

For a multi-component NAPL (e.g., gasoline with many compounds), the **effective solubility** of each component is reduced by its mole fraction in the NAPL mixture:

$$C_{\text{eff},i} = x_i \cdot C_{s,i} \cdot \gamma_i$$

where $x_i$ is mole fraction and $\gamma_i \approx 1$–$2$ is the activity coefficient. Benzene constitutes ~1% of gasoline by mole fraction, giving $C_{\text{eff,benzene}} = 0.01 \times 1790 \times 1 = 17.9$ mg/L — still far above the drinking water MCL of 0.005 mg/L.

### 3.5 Plume Length at Steady State

A NAPL source zone continues dissolving until either the NAPL is exhausted or a steady-state plume is established. At steady state, the rate of contaminant input at the source equals the rate of loss within the plume (by biodegradation, dilution, or sorption-assisted retardation):

For a first-order biodegradation rate $\lambda$ [day⁻¹] along the plume:

$$L_{\text{plume}} \approx \frac{v_s}{\lambda R_f} \ln\!\left(\frac{C_0}{C_{\text{threshold}}}\right)$$

where $C_0$ is source concentration (effective solubility) and $C_{\text{threshold}}$ is the regulatory threshold (e.g., MCL). For benzene in a petroleum plume: $v_s = 0.3$ m/day, $R_f = 1.2$, $\lambda = 0.01$ day⁻¹, $C_0 = 1.8$ mg/L, MCL = 0.005 mg/L:

$$L_{\text{plume}} = \frac{0.3}{0.01 \times 1.2}\ln\!\left(\frac{1.8}{0.005}\right) = 25 \times \ln(360) = 25 \times 5.89 = 147 \text{ m}$$

This 147 m plume length is typical of petroleum benzene plumes, which rarely extend beyond 100–300 m from their source due to robust natural attenuation by indigenous aerobic and anaerobic bacteria.

### 3.6 Monitoring Network Design

A plume characterisation monitoring network must: (1) determine plume boundaries, (2) assess migration rate and direction, and (3) confirm that the plume is not reaching receptors.

**Minimum monitoring network** for a simple 2D plume:
- 1 background well upgradient of the source
- 2–3 wells at the source to characterise source concentration
- 2–3 transects perpendicular to flow at increasing distances
- 1 compliance point well at the downgradient property boundary

Well spacing within each transect must capture the plume width: wells should be spaced at $\leq \sigma_y$ (transverse dispersion width) to ensure the plume centreline is intercepted.

The transverse dispersion width $\sigma_y$ at distance $x$ downgradient:

$$\sigma_y = \sqrt{2\alpha_T x}$$

For $\alpha_T = 0.1$ m (1/10 of $\alpha_L = 1$ m) at $x = 100$ m: $\sigma_y = \sqrt{2 \times 0.1 \times 100} = \sqrt{20} = 4.5$ m. A plume that is only 4.5 m (one standard deviation) wide at 100 m requires monitoring wells every 5–10 m to reliably detect it — fine-scale spacing that is expensive to install.

---

## 4. Worked Example by Hand

**Setting:** A leaking UST at a Calgary gas station. Benzene source zone detected at water table. Aquifer properties: $K = 2 \times 10^{-4}$ m/s, hydraulic gradient $i = 0.004$ m/m, $n_e = 0.28$, $\rho_b = 1.75$ kg/L, $f_{oc} = 0.0008$.

**Step 1: Darcy flux and pore velocity**

$$q = K \cdot i = 2\times10^{-4} \times 0.004 = 8\times10^{-7} \text{ m/s} = 0.069 \text{ m/day}$$

$$v_s = q/n_e = 0.069/0.28 = 0.247 \text{ m/day}$$

**Step 2: Retardation of benzene**

$K_{oc} = 10^{1.58} = 38$ L/kg. $K_d = 38 \times 0.0008 = 0.030$ L/kg.

$$R_f = 1 + \frac{1.75 \times 0.030}{0.28} = 1 + 0.188 = 1.19$$

Benzene velocity: $v_c = 0.247/1.19 = 0.208$ m/day. After 1 year: $x = 0.208 \times 365 = 76$ m.

**Step 3: Plume length at steady state** (assuming $\lambda = 0.008$ day⁻¹ for benzene under mixed aerobic/anaerobic conditions)

$$L_{\text{plume}} = \frac{0.247}{0.008 \times 1.19}\ln\!\left(\frac{17.9}{0.005}\right) = \frac{0.247}{0.0095}\times 8.19 = 26 \times 8.19 = 213 \text{ m}$$

A 213 m plume — typical for a gas station in a shallow alluvial aquifer. If there is a water supply well within 213 m downgradient, it is potentially at risk and requires monitoring.

---

## 5. Computational Implementation

```
function darcy_velocity(K, dh_dx):
    return -K * dh_dx  # positive in flow direction if dh_dx is -|gradient|

function pore_velocity(q, n_e):
    return q / n_e

function retardation(rho_b, Kd, n_e):
    return 1 + rho_b * Kd / n_e

function plume_length(vs, lambda_bio, Rf, C0, C_threshold):
    return vs / (lambda_bio * Rf) * log(C0 / C_threshold)

function ade_porous_1d(x_array, t, C0, vs, DL, Rf, lam=0):
    # Analytical 1D solution with retardation
    vc = vs / Rf
    DL_eff = DL / Rf   # effective dispersion with retardation
    lam_eff = lam
    sigma_sq = 2 * DL_eff * t
    C = C0/2 * erfc((x_array - vc*t)/sqrt(sigma_sq))
    C *= exp(-lam_eff * t)
    return C
```

```{pyodide}
import numpy as np
from scipy.special import erfc

def pore_vel(K, i, ne):
    return K * i / ne

def retardation(rho_b, Kd, ne):
    return 1 + rho_b * Kd / ne

def Kd_from_foc(log_Koc, foc):
    return 10**log_Koc * foc

def plume_length(vs, lam, Rf, C0, C_MCL):
    return vs / (lam * Rf) * np.log(C0 / C_MCL)

def ade_1d_step(x, t, vs, DL, Rf, C0_conc=1.0, lam=0):
    vc = vs / Rf
    DL_e = DL / Rf
    if t <= 0: return np.zeros_like(x)
    sigma = np.sqrt(2 * DL_e * t)
    return 0.5 * C0_conc * erfc((x - vc*t)/sigma) * np.exp(-lam*t)

# Calgary UST example
K, i, ne = 2e-4, 0.004, 0.28
rho_b, foc = 1.75, 0.0008

vs = pore_vel(K, i, ne)
Kd_benz = Kd_from_foc(1.58, foc)   # benzene
Kd_pce  = Kd_from_foc(2.85, foc)   # PCE
Rf_benz = retardation(rho_b, Kd_benz, ne)
Rf_pce  = retardation(rho_b, Kd_pce, ne)

print(f"Pore velocity: {vs:.3f} m/day")
print(f"\nBenzene:  Kd={Kd_benz:.4f} L/kg, Rf={Rf_benz:.2f}, vc={vs/Rf_benz:.3f} m/day")
print(f"PCE:      Kd={Kd_pce:.3f} L/kg,  Rf={Rf_pce:.2f}, vc={vs/Rf_pce:.3f} m/day")

lam_benz = 0.008  # /day biodegradation
C0_benz = 17.9    # effective solubility
L_benz = plume_length(vs, lam_benz, Rf_benz, C0_benz, 0.005)
print(f"\nSteady-state benzene plume length: {L_benz:.0f} m")

# 1-year migration
for compound, vs_c, Rf in [("Benzene", vs/Rf_benz, Rf_benz), ("PCE", vs/Rf_pce, Rf_pce)]:
    dist_1yr = vs_c * 365
    print(f"{compound}: {dist_1yr:.0f} m in 1 year (Rf={Rf:.1f})")
```

---

## 6. Visualization

<div data-viz="echarts" style="height:420px" data-options='{
  "title": {"text": "Contaminant Plume Relative Concentration vs Distance — Conservative vs Retarded", "textStyle": {"fontSize": 14}},
  "tooltip": {"trigger": "axis"},
  "legend": {"data": ["Conservative tracer (Rf=1)", "Benzene (Rf=1.2)", "PCE (Rf=5)", "MCL threshold"], "bottom": 0},
  "xAxis": {"name": "Distance downgradient (m)", "nameLocation": "middle", "nameGap": 30,
    "data": [0,20,40,60,80,100,120,140,160,180,200,250,300]},
  "yAxis": {"name": "Relative concentration C/C₀", "nameLocation": "middle", "nameGap": 55, "min": 0, "max": 1},
  "series": [
    {"name": "Conservative tracer (Rf=1)", "type": "line", "smooth": true,
     "itemStyle": {"color": "#1565C0"},
     "data": [1.0,0.92,0.80,0.65,0.50,0.38,0.28,0.20,0.14,0.10,0.07,0.03,0.01]},
    {"name": "Benzene (Rf=1.2)", "type": "line", "smooth": true,
     "itemStyle": {"color": "#F57F17"},
     "data": [1.0,0.88,0.73,0.57,0.42,0.30,0.21,0.14,0.09,0.06,0.04,0.01,0.005]},
    {"name": "PCE (Rf=5)", "type": "line", "smooth": true,
     "itemStyle": {"color": "#C62828"},
     "data": [1.0,0.72,0.50,0.34,0.22,0.14,0.09,0.06,0.035,0.022,0.014,0.004,0.001]},
    {"name": "MCL threshold", "type": "line",
     "lineStyle": {"type": "dashed", "color": "#555"},
     "data": [0.0003,0.0003,0.0003,0.0003,0.0003,0.0003,0.0003,0.0003,0.0003,0.0003,0.0003,0.0003,0.0003]}
  ]
}'></div>

PCE concentrations decline more steeply with distance than benzene because its higher retardation factor (Rf=5) gives attenuation mechanisms more time to act per unit of downgradient travel. However, both compounds remain well above the MCL (0.03% of source concentration) for hundreds of metres — confirming why groundwater contamination from NAPL source zones requires active remediation rather than passive monitoring alone in many settings.

---

## 7. Interpretation

The retardation factor $R_f = 1 + \rho_b K_d/n_e$ shows that sorption is beneficial from a plume geometry perspective — it slows migration and gives biodegradation more time to degrade the contaminant before it reaches a receptor. However, sorption also creates a long-term reservoir: once PCE (Rf = 5) has migrated into an aquifer, the sorbed phase represents 4× the dissolved-phase mass. Even after the dissolved-phase source is removed, desorption from this reservoir maintains dissolved concentrations and prolongs cleanup timescales — sometimes by decades.

The steady-state plume length formula $L = v_s/(\lambda R_f)\ln(C_0/C_{\text{threshold}})$ is used in the Monitored Natural Attenuation (MNA) framework to demonstrate that natural biodegradation will prevent plume migration beyond a defined boundary. If the calculated plume length falls short of the nearest receptor (a well or surface water), MNA can be accepted as the remedial strategy. If not, active remediation (pump-and-treat, in-situ treatment) is required.

---

## 8. What Could Go Wrong?

**Heterogeneity dominates plume behaviour at field scale.** The analytical models assume homogeneous aquifer properties. Real aquifers have stratified hydraulic conductivity varying by orders of magnitude over centimetres to metres. High-conductivity zones carry most of the contaminant; low-conductivity zones (silts, clays) act as reservoirs that slowly release back-diffused contaminant after the main plume has passed — creating very long tails that persist long after the source is removed. This **matrix diffusion** effect is the primary reason why pump-and-treat systems routinely fail to achieve cleanup goals within projected timescales.

**Biodegradation is not guaranteed.** The first-order decay rate $\lambda$ used in the plume length formula assumes active biodegradation maintained by sufficient electron acceptors (O₂, NO₃⁻, SO₄²⁻, Fe³⁺) and the appropriate microbial community. In aquifers with limited electron acceptor supply, degradation rates can be near zero, and plumes migrate as conservative tracers. Site-specific assessment of biodegradation is required before accepting natural attenuation as a remedy.

**DNAPL pooling creates persistent, hard-to-find sources.** Dense NAPL sinks through the aquifer until it reaches a low-permeability layer, then pools horizontally. The pool can be very thin (millimetres) and widely spread, making it nearly impossible to locate and remove completely. Even after pump-and-treat removes most of the dissolved plume, the residual DNAPL pool continues to dissolve, recreating the plume. This is the fundamental reason why many chlorinated solvent sites have been under remediation for 20–30 years without achieving cleanup goals.

---

## 9. Summary

Groundwater contaminant transport is governed by the advection-dispersion equation with retardation: $R_f\,\partial C/\partial t = D_L\,\partial^2 C/\partial x^2 - v_s\,\partial C/\partial x$. The retardation factor $R_f = 1 + \rho_b K_d/n_e$ slows contaminant transport relative to groundwater in proportion to sorption affinity ($K_d$). Organic compound $K_d$ is estimated from $K_{oc}\times f_{oc}$ — highly hydrophobic compounds are strongly retarded and essentially immobile in organic-carbon-rich aquifers.

NAPL source zones dissolve into groundwater at concentrations up to the effective solubility, sustaining dissolved-phase plumes for decades. Plume steady-state length is $L = v_s/(\lambda R_f)\ln(C_0/C_{\text{MCL}})$ — longer for faster groundwater, weaker biodegradation, and lower retardation. Monitoring network design targets the plume boundary using transverse dispersion estimates to determine well spacing.

**Key equations:**

$$v_s = q/n_e = Ki/(n_e)$$

$$R_f = 1 + \rho_b K_d / n_e, \quad K_d = K_{oc} \times f_{oc}$$

$$L_{\text{plume}} = \frac{v_s}{\lambda R_f}\ln\!\left(\frac{C_0}{C_{\text{threshold}}}\right)$$

$$\sigma_y = \sqrt{2\alpha_T x}, \quad \sigma_z = \sqrt{2\alpha_{TV}x}$$

---

## Math Refresher

**Darcy's law as a linear flux-gradient relationship.** Darcy's law $q = -K\,dh/dx$ says flow is proportional to the hydraulic head gradient — water flows from high head to low head, proportionally to the slope of the potentiometric surface, at a rate governed by the hydraulic conductivity $K$. This has exactly the same mathematical form as Fourier's law of heat conduction ($q_h = -\kappa\,dT/dx$) and Fick's first law of diffusion ($J = -D\,dC/dx$). These are all gradient-flux laws — a unified mathematical principle governing transport in continua.

**The complementary error function (erfc).** The step-input ADE solution involves $\text{erfc}(z) = 1 - \text{erf}(z) = (2/\sqrt\pi)\int_z^\infty e^{-u^2}du$. It ranges from 2 at $z = -\infty$ to 0 at $z = +\infty$, passing through 1 at $z = 0$. At $z = 0$ (exactly at the advective front): $C/C_0 = 0.5$. At $z \gg 0$ (far ahead of the front): $C/C_0 \approx 0$. At $z \ll 0$ (far behind the front): $C/C_0 \approx 1$. The erfc gives the sigmoid-shaped breakthrough curve that characterises contaminant arrival at a monitoring well.
