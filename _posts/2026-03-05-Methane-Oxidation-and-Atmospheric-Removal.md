---
layout: essay
title: "Methane Oxidation and Atmospheric Removal"
subtitle: "Tropospheric OH oxidation, atmospheric lifetime, and the CH₄-OH feedback"
date: 2026-03-05
categories: modeling
series: computational-geography-laboratory
series_order: 122
cluster: "AO — Methane Processes"
cluster_order: 2
tags: [math, viz, essay]
math: true
viz: true
math_core:
  - first-order atmospheric loss
  - atmospheric lifetime from burden and flux
  - second-order reaction kinetics (rate = k[CH4][OH])
  - CH4-OH feedback factor
spatial_reasoning: global distribution of OH radical
dynamics: feedback: CH4 increase → OH depletion → longer lifetime
computation: lifetime, burden, feedback factor calculation
domain: atmospheric chemistry
difficulty: 4
prerequisites:
  - AO1
  - A3
notebook_url: https://github.com/waywardhouse/computational-geography-lab/tree/main/essays/AO2-methane-oxidation
excerpt: >
  Methane persists in the troposphere for about 9 years before being destroyed
  by the hydroxyl radical (OH) — the "detergent of the atmosphere." This
  lifetime is not fixed: as methane concentration increases, it depletes OH,
  which in turn lengthens the methane lifetime, allowing even more methane to
  accumulate. This positive feedback amplifies methane's warming impact and
  means the effective radiative forcing from methane increases nonlinearly
  with concentration. This essay derives atmospheric lifetime from burden and
  flux, models the second-order OH oxidation kinetics, and quantifies the
  CH₄-OH feedback factor.
math_prerequisites: >
  First-order decay and residence time (Essays A3, AN3). The concept of
  a chemical reaction rate. Basic algebra for rearranging rate equations.
---

In the stratosphere, ozone absorbs ultraviolet radiation and generates oxygen radicals; these react with water vapour to produce the hydroxyl radical OH. In the troposphere, this same radical — produced by the photolysis of ozone and subsequent reaction with water vapour — is the primary oxidant for hundreds of trace gases: methane, carbon monoxide, volatile organic compounds, and many others. The OH radical is so reactive that its tropospheric concentration is only ~10⁶ molecules cm⁻³ — about 10 trillion times lower than molecular oxygen — yet it determines the atmospheric lifetime of most greenhouse gases and air pollutants.

---

## 1. The Question

How long does methane remain in the atmosphere before being destroyed? What controls this lifetime? Why does increasing methane concentration lead to a longer methane lifetime, and by how much?

---

## 2. The Conceptual Model

Methane's primary atmospheric sink is reaction with the hydroxyl radical OH in the troposphere. The reaction is bimolecular: its rate is proportional to both [CH₄] and [OH]. OH is produced photochemically and consumed by reaction with many competing gases (CO, non-methane VOCs, and CH₄ itself). When CH₄ concentration increases, more OH is consumed in CH₄ oxidation, leaving less OH available for all reactions — including further CH₄ oxidation. This **self-inhibition** means CH₄'s atmospheric lifetime increases as its concentration increases, amplifying its radiative forcing.

---

## 3. Building the Mathematical Model

### 3.1 Atmospheric Lifetime from Burden and Flux

The **atmospheric burden** $B$ of a trace gas (kg or Tg of gas in the atmosphere) and the total **loss flux** $L$ (kg yr⁻¹) determine the **atmospheric lifetime**:

$$\tau = \frac{B}{L}$$

This is the same mass balance relationship as the soil carbon model (Essay AN3), here applied to the atmosphere.

Current atmospheric methane:
- Burden: $B \approx 4,920$ Tg CH₄ (concentration ~1911 ppb × atmospheric mass)
- Loss from tropospheric OH: $L_{\text{OH}} \approx 507$ Tg CH₄ yr⁻¹
- Loss from stratosphere: $L_{\text{strat}} \approx 40$ Tg CH₄ yr⁻¹
- Loss to soil (aerobic methanotrophy): $L_{\text{soil}} \approx 30$ Tg CH₄ yr⁻¹

$$\tau_{\text{OH}} = \frac{4920}{507} \approx 9.7 \text{ yr}, \quad \tau_{\text{total}} = \frac{4920}{507+40+30} = \frac{4920}{577} \approx 8.5 \text{ yr}$$

The overall atmospheric lifetime of methane is approximately 9 years (IPCC AR6 value: 11.8 years for "adjustment time" including feedbacks).

### 3.2 Second-Order Reaction Kinetics

The oxidation of methane by OH:

$$\text{CH}_4 + \text{OH} \to \text{CH}_3 + \text{H}_2\text{O}$$

Rate of CH₄ loss [molecules cm⁻³ s⁻¹]:

$$-\frac{d[\text{CH}_4]}{dt} = k_{\text{OH}} \times [\text{CH}_4] \times [\text{OH}]$$

where $k_{\text{OH}} \approx 6.3 \times 10^{-15}$ cm³ molecule⁻¹ s⁻¹ at 272 K (mean tropospheric temperature).

This is a **second-order** rate equation — rate proportional to the product of two concentrations. If [OH] is treated as approximately constant (pseudo-first-order approximation, valid when OH is maintained by photochemical production much faster than its depletion by CH₄):

$$-\frac{d[\text{CH}_4]}{dt} \approx k_{\text{OH}} [\text{OH}]_{\text{steady state}} \times [\text{CH}_4] = k' \times [\text{CH}_4]$$

with pseudo-first-order rate constant $k' = k_{\text{OH}} \times [\text{OH}]$. Then $\tau_{\text{OH}} = 1/k'$.

**OH concentration from $\tau$:**

$$[\text{OH}] = \frac{1}{k_{\text{OH}} \times \tau_{\text{OH}}} = \frac{1}{6.3 \times 10^{-15} \times 9.7 \times 3.15 \times 10^7} \approx 5.2 \times 10^5 \text{ molecules cm}^{-3}$$

(Converting $\tau = 9.7$ yr to seconds: $9.7 \times 365.25 \times 24 \times 3600 = 3.06 \times 10^8$ s.)

This matches global mean tropospheric OH from model estimates: ~10⁶ molecules cm⁻³.

### 3.3 Aerobic Methanotrophy

In the soil, methane that diffuses upward through aerobic layers is oxidised by **methanotrophic bacteria** using molecular oxygen:

$$\text{CH}_4 + 2\text{O}_2 \to \text{CO}_2 + 2\text{H}_2\text{O}$$

This process removes an estimated 30–60 Tg CH₄ yr⁻¹ globally from both the atmosphere (soil uptake) and from wetland methane produced below the aerobic zone (internal oxidation). Methanotrophy follows a Michaelis-Menten kinetic pattern with respect to CH₄ concentration, but for atmospheric concentrations (~1900 ppb), the rate is approximately first-order.

### 3.4 The CH₄-OH Feedback

OH is in approximate photochemical steady state, produced and consumed continuously:

$$\frac{d[\text{OH}]}{dt} \approx 0 \Rightarrow P_{\text{OH}} = [\text{OH}] \times \sum_i k_i [\text{X}_i]$$

where $\sum k_i[\text{X}_i]$ is the total rate of all reactions consuming OH (CH₄, CO, NMVOC, etc.). Increasing [CH₄] increases the denominator, reducing [OH] at steady state.

**Linearised feedback:** A 1% increase in CH₄ decreases [OH] by approximately $s \approx 0.32\%$ (the "CH₄ sensitivity" — fraction of OH consumed by CH₄ relative to all sinks). This OH decrease in turn increases $\tau_{\text{CH}_4}$ by ~0.32%, which increases the CH₄ burden by an additional ~0.32%, creating further OH reduction...

**The feedback factor $f$** (sum of geometric series):

$$f = \frac{1}{1 - s} \approx \frac{1}{1 - 0.32} = 1.47$$

This means a step increase in CH₄ emissions leads to a 47% larger eventual increase in CH₄ burden than would occur if OH were held constant. The IPCC AR6 uses this feedback to define the "methane adjustment time" of 11.8 years (vs. ~9 years chemical lifetime) for GWP calculations.

**Formal derivation:** Let $E$ = total CH₄ emission rate. At steady state, $B = E \times \tau$. If $\tau$ depends on $B$ through OH depletion:

$$\tau = \tau_0 \times \left(\frac{B}{B_0}\right)^s$$

where $s \approx 0.32$ and $\tau_0$, $B_0$ are reference values. Then $B = E \times \tau_0 (B/B_0)^s$, giving:

$$B = B_0 \times \left(\frac{E \tau_0}{B_0}\right)^{1/(1-s)} = B_0 \times \left(\frac{E}{E_0}\right)^f$$

The effective exponent is $f = 1/(1-s) \approx 1.47$: methane burden grows faster than linearly with emissions due to OH feedback.

### 3.5 Temperature Sensitivity of $k_{\text{OH}}$

The rate constant $k_{\text{OH}}$ follows an Arrhenius relationship:

$$k_{\text{OH}}(T) = A \exp(-E_a/RT)$$

with $E_a \approx 14$ kJ mol⁻¹. From 272 K to 295 K (23 K warming): $k_{\text{OH}}$ increases by ~20%. Warmer future atmospheres would oxidise CH₄ faster — a negative feedback on methane concentration, partially offsetting emission increases. But OH itself may decrease if temperatures increase water vapour, affecting photochemical production rates — the net sign of the temperature-OH-CH₄ feedback is model-dependent.

---

## 4. Worked Example by Hand

**Setting:** Global methane budget. Current annual emissions $E = 590$ Tg CH₄ yr⁻¹. Atmospheric burden $B = 4,920$ Tg CH₄. CH₄ growing at 15 ppb yr⁻¹.

**Mass balance:** $\frac{dB}{dt} = E - B/\tau$

**Implied net accumulation** (15 ppb yr⁻¹, atmospheric mass of 1 ppb CH₄ ≈ 2.86 Tg):

$$\frac{dB}{dt} = 15 \times 2.86 = 42.9 \text{ Tg yr}^{-1}$$

**Implied total loss:**

$$L = E - \frac{dB}{dt} = 590 - 42.9 = 547 \text{ Tg yr}^{-1}$$

**Implied lifetime:**

$$\tau = B/L = 4920/547 = 9.0 \text{ yr}$$

**OH depletion factor:** If CH₄ increases from 1911 ppb to 2200 ppb (+15%):

OH decrease: $\Delta[\text{OH}]/[\text{OH}] = -s \times \Delta[\text{CH}_4]/[\text{CH}_4] = -0.32 \times 0.15 = -4.8\%$

Lifetime increase: $\Delta\tau/\tau = +4.8\%$, so $\tau$ increases from 9.0 to 9.0 × 1.048 = 9.43 yr.

**Additional burden from longer lifetime** (at same emissions): $\Delta B = E \times \Delta\tau = 590 \times 0.43 = 254$ Tg CH₄ — equivalent to an extra 89 ppb of atmospheric CH₄ above what would occur without the feedback.

---

## 5. Computational Implementation

```
function ch4_lifetime(burden_Tg, loss_OH, loss_strat, loss_soil):
    total_loss = loss_OH + loss_strat + loss_soil
    tau = burden_Tg / total_loss
    return tau

function oh_feedback_factor(s_CH4_OH=0.32):
    return 1 / (1 - s_CH4_OH)

function adjusted_lifetime(tau_chem, f_feedback=1.47):
    return tau_chem * f_feedback  # "adjustment time"

function CH4_burden_at_steady_state(E_Tg_yr, tau):
    return E_Tg_yr * tau

function radiative_forcing_CH4(ppb, ppb_ref=722):
    # Simplified IPCC expression (W/m2)
    M = ppb; M0 = ppb_ref; N0 = 270  # N2O ppb reference
    return 0.036 * (sqrt(M) - sqrt(M0)) - (f_overlap(M, N0) - f_overlap(M0, N0))

function f_overlap(M, N):
    return 0.47 * log(1 + 2.01e-5*(M*N)**0.75 + 5.31e-15*M*(M*N)**1.52)
```

```{pyodide}
import numpy as np

def ch4_feedback(E_Tg, tau0=9.0, s=0.32, B0=4920, E0=590):
    """CH4 burden with and without OH feedback."""
    # Without feedback: B = E * tau0
    B_no_fb = E_Tg * tau0
    # With feedback: tau increases as B increases
    # B^(1-s) = E * tau0 * B0^(-s) * E0^(s)... solve numerically
    # or approximate: f = 1/(1-s)
    f = 1/(1-s)
    B_with_fb = B0 * (E_Tg/E0)**f
    tau_eff = B_with_fb / E_Tg
    return B_no_fb, B_with_fb, tau_eff

print("CH4-OH feedback effect on atmospheric burden:")
print(f"{'Emissions (Tg/yr)':>20} {'No feedback (Tg)':>18} {'With feedback (Tg)':>20} {'τ_eff (yr)':>12} {'ppb':>6}")
ppb_factor = 4920/1911  # Tg per ppb

for E in [450, 500, 550, 590, 650, 750]:
    B_nf, B_fb, tau = ch4_feedback(E)
    ppb_fb = B_fb / ppb_factor
    print(f"{E:>20} {B_nf:>18.0f} {B_fb:>20.0f} {tau:>12.1f} {ppb_fb:>6.0f}")

# Lifetime sensitivity
print(f"\nCH4 sensitivity to OH (s parameter):")
print(f"{'s':>5} {'f=1/(1-s)':>12} {'τ_adj (yr)':>12} {'Extra ppb @ E=650':>20}")
tau_chem = 9.0
E = 650
B0, E0 = 4920, 590

for s in [0.10, 0.20, 0.32, 0.40, 0.50]:
    f = 1/(1-s)
    tau_adj = tau_chem * f
    B_fb = B0 * (E/E0)**f
    B_nf = E * tau_chem
    delta_ppb = (B_fb - B_nf) / ppb_factor
    print(f"{s:>5.2f} {f:>12.3f} {tau_adj:>12.1f} {delta_ppb:>20.0f}")
```

---

## 6. Visualization

<div data-viz="echarts" style="height:420px" data-options='{
  "title": {"text": "CH₄-OH Feedback: Burden vs Emissions (with and without OH depletion)", "textStyle": {"fontSize": 14}},
  "tooltip": {"trigger": "axis"},
  "legend": {"data": ["Without OH feedback (linear)","With OH feedback (nonlinear, s=0.32)","Current state"], "bottom": 0},
  "xAxis": {"name": "CH₄ emissions (Tg yr⁻¹)", "nameLocation": "middle", "nameGap": 30,
    "data": [400,450,500,550,600,650,700,750,800]},
  "yAxis": {"name": "Atmospheric burden (Tg CH₄)", "nameLocation": "middle", "nameGap": 55},
  "series": [
    {"name": "Without OH feedback (linear)", "type": "line", "smooth": false,
     "itemStyle": {"color": "#90A4AE"},
     "data": [3600,4050,4500,4950,5400,5850,6300,6750,7200]},
    {"name": "With OH feedback (nonlinear, s=0.32)", "type": "line", "smooth": true,
     "lineStyle": {"width": 3},
     "itemStyle": {"color": "#C62828"},
     "data": [3320,3890,4480,5120,5820,6600,7500,8570,9830]},
    {"name": "Current state", "type": "scatter", "symbolSize": 12,
     "itemStyle": {"color": "#1565C0"},
     "data": [[590,4920]]}
  ]
}'></div>

The red curve curves upward faster than the grey linear reference — the OH feedback amplifies methane burden superlinearly with emissions. At 750 Tg/yr emissions (a plausible high-end scenario given permafrost feedbacks), the OH-feedback case yields ~8,570 Tg burden vs. 6,750 Tg without feedback — 27% more atmospheric methane, equivalent to ~600 additional ppb.

---

## 7. Interpretation

The CH₄-OH feedback is one of the most important self-amplifying processes in atmospheric chemistry. Its existence means that methane's effective GWP is higher than would be calculated from chemical lifetime alone — the IPCC uses the "adjusted time" (incorporating the feedback factor) for GWP calculations, giving CH₄ a GWP100 of 27.9 (fossil, including indirect effects) vs. ~9 from chemical lifetime alone.

The feedback also means that controlling non-methane sources of OH depletion (CO, NMVOCs from traffic and industry) has a co-benefit of restoring OH, which reduces methane lifetime and reduces methane's atmospheric burden — even without any change in methane emissions. This is one basis for the "short-lived climate forcer" (SLCF) mitigation strategy: reduce CO and NMVOC emissions, restore OH, shorten methane lifetime, achieve rapid near-term climate benefit.

---

## 8. What Could Go Wrong?

**OH concentration is not directly observable.** Global mean OH is inferred from the atmospheric budget of methyl chloroform (CH₃CCl₃), an industrial compound whose emissions were well-documented and whose atmospheric lifetime is dominated by OH oxidation. After production phase-out under the Montreal Protocol, its declining concentration constrains OH. But this inference method's accuracy degrades as CH₃CCl₃ concentrations approach zero. Future OH monitoring will rely on shorter-lived tracers with their own uncertainties.

**Post-2007 methane acceleration is not fully explained.** Atmospheric methane stalled from 1999 to 2007 (suggesting near-balance of sources and sinks), then resumed growth at an accelerating rate (~15 ppb yr⁻¹ recently, up from ~5 ppb yr⁻¹ before 2007). Candidate explanations include increased tropical wetland emissions, increased livestock, decreased OH, or increased fossil fuel emissions — the isotopic evidence (δ¹³C) points toward biogenic (lighter carbon) sources, but the relative contributions remain debated.

---

## 9. Summary

Methane atmospheric lifetime: $\tau = B/L \approx 9$–12 years (chemical: ~9 yr; adjusted for OH feedback: ~12 yr). Primary sink: tropospheric OH oxidation ($\text{CH}_4 + \text{OH} \to \text{CH}_3 + \text{H}_2\text{O}$), with rate $k_{\text{OH}}[\text{CH}_4][\text{OH}]$. OH steady-state concentration ~10⁶ molecules cm⁻³.

The CH₄-OH feedback: increasing CH₄ depletes OH, lengthening CH₄ lifetime, amplifying CH₄ burden. Feedback factor $f = 1/(1-s) \approx 1.47$ where $s \approx 0.32$ is the fraction of OH consumed by CH₄. This amplifies the warming impact of CH₄ emissions and makes GWP calculations use the adjusted time (11.8 yr) rather than chemical lifetime (9 yr).

**Key equations:**

$$\tau = B/L, \quad k_{\text{OH}}[\text{CH}_4][\text{OH}] = L_{\text{per unit volume}}$$

$$f = \frac{1}{1-s} \approx 1.47 \quad\text{[feedback factor, s ≈ 0.32]}$$

$$\tau_{\text{adj}} = \tau_{\text{chem}} \times f \approx 9 \times 1.47 \approx 13.2 \text{ yr}$$
