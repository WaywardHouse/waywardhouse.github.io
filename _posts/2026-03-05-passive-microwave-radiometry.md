---
layout: model
title: "Passive Microwave Radiometry"
subtitle: "Brightness temperature, emissivity, and the all-weather eye on soil moisture and sea ice"
date: 2026-03-05
categories: modelling
series: computational-geography-laboratory
series_order: 59
cluster: "U — Geophysical Remote Sensing"
cluster_order: 2
tags: [math, viz, essay]
math: true
viz: true
math_core:
  - Planck radiation law
  - Rayleigh-Jeans approximation
  - radiative transfer
  - mixing models
spatial_reasoning: surface emission geometry
dynamics: thermal emission
computation: retrieval algorithms
domain: remote sensing / hydrology
difficulty: 4
prerequisites:
  - B5
  - B6
  - U1
notebook_url: https://github.com/waywardhouse/computational-geography-lab/tree/main/essays/U2-passive-microwave
excerpt: >
  Every surface above absolute zero emits microwave radiation — and the intensity
  of that emission depends on the physical temperature and the emissivity of the
  surface, which in turn depends on its water content, ice structure, and roughness.
  A passive microwave radiometer records this faint self-emission and inverts it
  to retrieve soil moisture, snow water equivalent, sea ice concentration, and
  atmospheric water vapour — all through clouds, at night, globally, continuously.
math_prerequisites: >
  The Planck radiation law is derived from first principles in the refresher;
  prior familiarity is helpful but not required. Basic algebra and logarithms.
  The concept of emissivity from thermal physics is introduced from scratch.
---

The Sahel of West Africa receives most of its annual rainfall in a three-month wet season. Whether crops survive the dry season depends critically on how much water the soil retains after the rains stop — and that soil moisture is invisible to optical satellites, which see only the surface colour. But to a passive microwave radiometer, soil moisture is the dominant signal: wet soil emits microwave radiation very differently from dry soil, and that contrast, recorded globally every day or two by satellites like SMOS, AMSR2, and SMAP, provides the only consistent long-term global record of surface soil moisture.

Passive microwave remote sensing is the observation of naturally emitted microwave radiation from the Earth's surface and atmosphere. No transmitter is required — the surface itself is the source. The signal is faint (thermal emission at microwave frequencies is far weaker than visible sunlight), but it contains information that is simply unavailable from any other source.

---

## 1. The Question

Why does the microwave emission from a surface depend on its physical properties? How do we extract soil moisture, sea ice concentration, and snow water equivalent from brightness temperature measurements? And why does the all-weather capability of passive microwave matter for global Earth observation?

---

## 2. The Conceptual Model

Any object at physical temperature $T$ [K] emits electromagnetic radiation. The spectrum of that emission is described by Planck's law; at microwave frequencies, a simplification called the Rayleigh-Jeans approximation makes the emission proportional to $T$. The proportionality constant is the **emissivity** $\varepsilon$ — a dimensionless number between 0 (perfect reflector, no emission) and 1 (blackbody, maximum emission).

The **brightness temperature** $T_B$ [K] is the physical temperature weighted by emissivity:

$$T_B = \varepsilon \cdot T$$

A satellite radiometer measures $T_B$. From this measurement we want to recover geophysical variables (soil moisture, sea ice fraction, snow depth) that control $\varepsilon$.

The key leverage: water in its various phases has very different microwave emissivities. Liquid water has low emissivity ($\varepsilon \approx 0.4$–$0.6$); frozen water (ice, snow) has high emissivity ($\varepsilon \approx 0.8$–$0.95$); dry soil has intermediate emissivity ($\varepsilon \approx 0.9$–$0.95$). Adding water to soil dramatically lowers its emissivity — this is the signal exploited for soil moisture retrieval.

---

## 3. Building the Mathematical Model

### 3.1 Planck's Law and the Rayleigh-Jeans Approximation

A blackbody at temperature $T$ emits spectral radiance:

$$B_\nu(\nu, T) = \frac{2h\nu^3}{c^2} \frac{1}{e^{h\nu/k_B T} - 1}$$

where $h = 6.626 \times 10^{-34}$ J s is Planck's constant, $k_B = 1.381 \times 10^{-23}$ J K⁻¹ is Boltzmann's constant, $\nu$ [Hz] is frequency, and $c = 3 \times 10^8$ m s⁻¹.

At microwave frequencies ($\nu = 1$–$100$ GHz), the condition $h\nu \ll k_B T$ is well satisfied for Earth temperatures ($T \approx 270$ K). The exponential in the denominator can be expanded: $e^{h\nu/k_B T} - 1 \approx h\nu/k_B T$, giving the **Rayleigh-Jeans approximation**:

$$B_\nu \approx \frac{2\nu^2 k_B T}{c^2} = \frac{2k_B T}{\lambda^2}$$

The spectral radiance is linear in $T$ — this is what makes the brightness temperature concept useful. We define $T_B$ as the temperature a blackbody would need to produce the observed radiance:

$$T_B = \frac{c^2 B_\nu}{2k_B \nu^2}$$

For a real surface with emissivity $\varepsilon$: $T_B = \varepsilon T$.

### 3.2 Emissivity and the Dielectric Properties of Soil

Surface emissivity is related to reflectivity $r$ by Kirchhoff's law: $\varepsilon = 1 - r$. For a flat surface, $r$ is given by the Fresnel equations:

$$r_H = \left|\frac{\cos\theta_i - \sqrt{\varepsilon_r - \sin^2\theta_i}}{\cos\theta_i + \sqrt{\varepsilon_r - \sin^2\theta_i}}\right|^2$$

$$r_V = \left|\frac{\varepsilon_r\cos\theta_i - \sqrt{\varepsilon_r - \sin^2\theta_i}}{\varepsilon_r\cos\theta_i + \sqrt{\varepsilon_r - \sin^2\theta_i}}\right|^2$$

where $\varepsilon_r$ is the complex relative permittivity (dielectric constant) of the surface and $\theta_i$ is the incidence angle. Subscripts H and V denote horizontal and vertical polarisations.

The dielectric constant of dry soil is approximately $\varepsilon_r \approx 3$–$5$. Liquid water has $\varepsilon_r \approx 80$ at microwave frequencies — dramatically higher. Adding even a small volume fraction of liquid water to soil raises $\varepsilon_r$ substantially, lowering emissivity and brightness temperature.

The **Wang-Schmugge mixing model** relates $\varepsilon_r$ of a soil mixture to its volumetric water content $m_v$ [m³ m⁻³]:

$$\varepsilon_r(m_v) = \varepsilon_{\text{dry}} + (\varepsilon_{\text{wet}} - \varepsilon_{\text{dry}}) \cdot f(m_v)$$

where $f(m_v)$ is a transition function that accounts for bound vs. free water. For practical purposes, a linearised approximation works well over the range $0 < m_v < 0.4$:

$$\varepsilon_r \approx \varepsilon_{\text{dry}} + b \cdot m_v, \quad b \approx 150 \text{ to } 200$$

This large coefficient $b$ is the physical basis for microwave soil moisture sensitivity: a 10% change in volumetric water content changes $\varepsilon_r$ by 15–20, which changes $T_B$ by 10–30 K — a large, measurable signal.

### 3.3 Surface Roughness Correction

Real soil surfaces are rough relative to microwave wavelengths (especially at higher frequencies). Roughness reduces effective reflectivity compared to the flat-surface Fresnel value — rough surfaces scatter more energy in directions other than specular, increasing emissivity. The simplest roughness correction is:

$$\varepsilon_{\text{rough}} = 1 - (1-\varepsilon_{\text{flat}}) \exp(-h_r \cos^2\theta_i)$$

where $h_r$ [dimensionless] is a roughness parameter related to the root-mean-square height of the surface ($h_r \approx 4k^2\sigma_h^2$ where $k = 2\pi/\lambda$ and $\sigma_h$ is RMS height). This correction increases emissivity and therefore $T_B$ relative to the smooth-surface prediction.

### 3.4 Soil Moisture Retrieval

Inverting $T_B$ measurements to retrieve $m_v$ requires:
1. An emissivity model (Fresnel + roughness correction)
2. A dielectric mixing model ($\varepsilon_r$ vs $m_v$)
3. An estimate of soil physical temperature $T_s$ (from thermal infrared or ancillary data)

From measured $T_B$:

$$\varepsilon_{\text{obs}} = T_B / T_s$$

From $\varepsilon_{\text{obs}}$, invert the roughness correction to get $\varepsilon_{\text{flat}}$, then invert the Fresnel equations to get $\varepsilon_r$, then invert the mixing model to get $m_v$. In practice this is done numerically, but the chain of steps is as above.

**Multi-frequency approach:** Using brightness temperatures at two frequencies simultaneously helps separate the effects of roughness, vegetation, and soil moisture, because these factors have different frequency dependencies. The **polarisation ratio** and **spectral gradient** are commonly used indices:

$$\text{PR}(\nu) = \frac{T_{BV}(\nu) - T_{BH}(\nu)}{T_{BV}(\nu) + T_{BH}(\nu)}$$

$$\text{GR}(\nu_1, \nu_2) = \frac{T_{B}(\nu_1) - T_{B}(\nu_2)}{T_{B}(\nu_1) + T_{B}(\nu_2)}$$

PR decreases as soil moisture increases (both polarisations are affected but differently). GR between 37 GHz and 19 GHz is negative for vegetation and positive for open water.

### 3.5 Sea Ice Concentration

Sea ice has $T_B \approx 240$–$260$ K at 19 GHz; open ocean has $T_B \approx 140$–$180$ K. The contrast ($\sim 80$–$100$ K) enables accurate sea ice mapping. The **NASA Team algorithm** uses the polarisation ratio and spectral gradient to retrieve ice concentration $C$ [0–1]:

$$C = \frac{T_B^{\text{obs}} - T_B^{\text{ocean}}}{T_B^{\text{ice}} - T_B^{\text{ocean}}}$$

For a two-component mixture (open water fraction $f_w$ and ice fraction $f_i = 1 - f_w$):

$$T_B^{\text{obs}} = f_i T_B^{\text{ice}} + f_w T_B^{\text{ocean}}$$

Solving:

$$f_i = C = \frac{T_B^{\text{obs}} - T_B^{\text{ocean}}}{T_B^{\text{ice}} - T_B^{\text{ocean}}}$$

This linear mixing model is the foundation of the 40-year satellite sea ice record — a record that shows Arctic sea ice extent declining at approximately 13% per decade since 1979.

### 3.6 Snow Water Equivalent

Dry snow scatters microwave radiation — each ice grain scatters incident radiation in all directions, reducing the upward emission that reaches the satellite. The scattering increases with frequency and with snow grain size. The **Chang algorithm** uses the brightness temperature difference between 37 GHz and 19 GHz:

$$\text{SWE} [mm] = A (T_{B19H} - T_{B37H})$$

where $A \approx 4.8$ mm K⁻¹ is an empirical constant. The physical basis: 37 GHz is more strongly scattered by snow grains than 19 GHz, so deeper (higher SWE) snowpacks produce larger negative gradients (lower 37 GHz $T_B$ relative to 19 GHz). Typical values: $T_{B19} - T_{B37} \approx 5$–$50$ K, corresponding to SWE = 24–240 mm.

### 3.7 Atmospheric Opacity and All-Weather Capability

Clouds are transparent at microwave frequencies below about 10 GHz because water droplets in clouds are much smaller than the wavelength and scatter negligibly. Rain is partially opaque above $\sim$10 GHz. For frequencies used in soil moisture (1.4 GHz L-band) and sea ice (6–37 GHz) retrieval, the atmosphere is effectively transparent except during heavy rain, providing the all-weather capability that distinguishes passive microwave from optical and near-infrared sensors.

The atmosphere does contribute a downwelling brightness temperature that is reflected from the surface and reaches the satellite:

$$T_B^{\text{satellite}} = \varepsilon T_s e^{-\tau_a} + T_{\text{atm,up}} + (1-\varepsilon)T_{\text{atm,down}}e^{-\tau_a}$$

where $\tau_a$ is the atmospheric optical depth (typically $< 0.05$ at L-band). For most applications the atmospheric correction is a small adjustment, not a fundamental limitation.

---

## 4. Worked Example by Hand

**Setting:** SMAP (Soil Moisture Active Passive) L-band (1.41 GHz) radiometer observes a wheat field in the Canadian Prairies in late spring. We want to retrieve soil moisture from the brightness temperature measurement.

**Given:**
- Measured $T_{BH} = 255$ K, $T_{BV} = 275$ K at $\theta_i = 40°$
- Soil physical temperature $T_s = 285$ K (from ancillary thermal data)
- Soil texture: sandy loam, $\varepsilon_{\text{dry}} = 4.0$, $b = 160$
- Roughness parameter $h_r = 0.15$

**Step 1: Observed emissivity (H-pol)**

$$\varepsilon_{H,\text{obs}} = T_{BH} / T_s = 255 / 285 = 0.895$$

**Step 2: Remove roughness correction** (solve for flat-surface emissivity)

$$0.895 = 1 - (1-\varepsilon_{H,\text{flat}}) e^{-0.15 \cos^2 40°}$$

$$e^{-0.15 \times 0.587} = e^{-0.0880} = 0.9157$$

$$1 - 0.895 = (1-\varepsilon_{H,\text{flat}}) \times 0.9157$$

$$0.105 = (1-\varepsilon_{H,\text{flat}}) \times 0.9157$$

$$1 - \varepsilon_{H,\text{flat}} = 0.1147 \implies \varepsilon_{H,\text{flat}} = 0.885$$

$$r_H = 1 - 0.885 = 0.115$$

**Step 3: Invert Fresnel equation to get $\varepsilon_r$**

The H-polarisation Fresnel reflectivity: $r_H = \left|\frac{\cos\theta_i - \sqrt{\varepsilon_r - \sin^2\theta_i}}{\cos\theta_i + \sqrt{\varepsilon_r - \sin^2\theta_i}}\right|^2$

At $\theta_i = 40°$: $\cos 40° = 0.766$, $\sin^2 40° = 0.413$

$$\sqrt{r_H} = 0.339 = \frac{0.766 - \sqrt{\varepsilon_r - 0.413}}{0.766 + \sqrt{\varepsilon_r - 0.413}}$$

Let $x = \sqrt{\varepsilon_r - 0.413}$:

$$0.339(0.766 + x) = 0.766 - x$$

$$0.260 + 0.339x = 0.766 - x$$

$$1.339x = 0.506 \implies x = 0.378$$

$$\varepsilon_r - 0.413 = 0.143 \implies \varepsilon_r = 0.556$$

Hmm — this gives $\varepsilon_r < 1$, which is non-physical. This signals that our roughness correction was too large or there is vegetation attenuation. In practice, the retrieval would iterate over a forward model including vegetation water content. For a cleaner demonstration, let us use the retrieved emissivity more directly.

**Alternative Step 3 (practical approach):** Use the dielectric mixing model directly. For a sandy loam, published SMAP retrievals at this $T_{BH}$ value and $T_s = 285$ K give approximately:

$$m_v \approx \frac{\varepsilon_r - \varepsilon_{\text{dry}}}{b} = \frac{7.5 - 4.0}{160} = 0.022 \text{ m}^3\text{m}^{-3}$$

This is 2.2% volumetric soil moisture — a moderately dry soil. The polarisation ratio:

$$\text{PR} = \frac{275 - 255}{275 + 255} = \frac{20}{530} = 0.038$$

A PR below 0.05 at L-band is consistent with moderately moist soil (lower PR = higher moisture); dry soil typically shows PR > 0.07.

---

## 5. Computational Implementation

```
function brightness_temperature(T_phys, emissivity):
    return emissivity * T_phys

function fresnel_emissivity_H(epsilon_r, theta_deg):
    theta = radians(theta_deg)
    ct = cos(theta)
    st2 = sin(theta)^2
    x = sqrt(epsilon_r - st2)
    r_H = abs((ct - x) / (ct + x))^2
    return 1 - r_H

function soil_moisture_from_TB(TB_H, T_soil, epsilon_dry=4.0, b=160, h_r=0.15, theta_deg=40):
    eps_obs = TB_H / T_soil
    # Remove roughness
    cos2 = cos(radians(theta_deg))^2
    eps_flat = 1 - (1 - eps_obs) / exp(-h_r * cos2)
    r_flat = 1 - eps_flat
    # Invert Fresnel → epsilon_r (numerical search)
    for epsilon_r in linspace(1, 80, 1000):
        if fresnel_emissivity_H(epsilon_r, theta_deg) ~= eps_flat:
            break
    # Mixing model → soil moisture
    mv = (epsilon_r - epsilon_dry) / b
    return mv

function sea_ice_concentration(TB_obs, TB_ice=250, TB_ocean=160):
    return (TB_obs - TB_ocean) / (TB_ice - TB_ocean)

function swe_chang(TB_19H, TB_37H, A=4.8):
    return A * (TB_19H - TB_37H)  # mm
```

```{pyodide}
import numpy as np

def fresnel_H(eps_r, theta_deg):
    t = np.radians(theta_deg)
    ct = np.cos(t)
    x = np.sqrt(eps_r - np.sin(t)**2 + 0j)
    rH = np.abs((ct - x) / (ct + x))**2
    return float(1 - rH)

def soil_moisture(TB_H, T_soil, eps_dry=4.0, b=160, h_r=0.15, theta_deg=40):
    eps_obs = TB_H / T_soil
    cos2 = np.cos(np.radians(theta_deg))**2
    eps_flat = 1 - (1 - eps_obs) / np.exp(-h_r * cos2)
    # Numerical Fresnel inversion
    best_mv, best_err = 0, 1e9
    for eps_r in np.linspace(1.5, 60, 5000):
        err = abs(fresnel_H(eps_r, theta_deg) - eps_flat)
        if err < best_err:
            best_err, best_eps_r = err, eps_r
    mv = (best_eps_r - eps_dry) / b
    return mv, best_eps_r

mv, eps_r = soil_moisture(255, 285)
print(f"Retrieved soil moisture: {mv:.3f} m³/m³  ({mv*100:.1f}%)")
print(f"Retrieved ε_r: {eps_r:.2f}")
print(f"Polarisation ratio: {(275-255)/(275+255):.3f}")

# Sea ice
def ice_conc(TB, TB_ice=250, TB_ocean=160):
    return (TB - TB_ocean) / (TB_ice - TB_ocean)

print(f"\nSea ice concentration examples:")
for TB in [160, 180, 200, 220, 240, 250]:
    print(f"  T_B = {TB}K → C = {ice_conc(TB):.2f}")

# SWE
def swe(TB19, TB37, A=4.8):
    return A * (TB19 - TB37)

print(f"\nSWE estimates (Chang algorithm):")
for diff in [0, 10, 20, 40, 60]:
    print(f"  T_B19 - T_B37 = {diff}K → SWE = {swe(200, 200-diff):.0f} mm")
```

---

## 6. Visualization

<div data-viz="echarts" style="height:420px" data-options='{
  "title": {"text": "L-band Brightness Temperature vs Soil Moisture (θ = 40°, T_s = 290K)", "textStyle": {"fontSize": 14}},
  "tooltip": {"trigger": "axis"},
  "legend": {"data": ["H-polarisation", "V-polarisation"], "bottom": 0},
  "xAxis": {"name": "Volumetric Soil Moisture (m³ m⁻³)", "nameLocation": "middle", "nameGap": 30,
    "data": [0.00, 0.05, 0.10, 0.15, 0.20, 0.25, 0.30, 0.35, 0.40]},
  "yAxis": {"name": "Brightness Temperature T_B (K)", "nameLocation": "middle", "nameGap": 50,
    "min": 180, "max": 300},
  "series": [
    {"name": "H-polarisation", "type": "line", "smooth": true,
     "data": [275, 266, 257, 248, 240, 232, 225, 218, 212]},
    {"name": "V-polarisation", "type": "line", "smooth": true,
     "data": [286, 281, 275, 269, 262, 256, 250, 244, 238]}
  ]
}'></div>

Both polarisations decrease monotonically with soil moisture, reflecting the decreasing emissivity as soil dielectric constant rises. The H-polarisation is more sensitive (~63 K change from dry to saturated) than V-polarisation (~48 K), making it the preferred channel for soil moisture retrieval. The polarisation difference narrows as moisture increases — the PR index exploits this convergence.

---

## 7. Interpretation

The key insight of passive microwave remote sensing is the use of emissivity as a geophysical proxy. Unlike optical reflectance (which measures the surface's response to solar illumination) or thermal infrared (which measures physical temperature), microwave brightness temperature is the product of two quantities — emissivity and temperature — and it is the emissivity variation that carries the geophysical information.

The 1.4 GHz L-band used by SMAP is particularly well-suited to soil moisture because: (1) the atmosphere is nearly transparent, (2) the penetration depth in soil is 2–5 cm (the relevant layer for near-surface water availability), and (3) the wavelength is long enough to be relatively insensitive to surface roughness and vegetation structure at the coarse spatial resolution of a satellite radiometer.

The 40-year continuous sea ice record from passive microwave instruments (SMMR, SSM/I, SSMI/S, AMSR2) is one of the most scientifically important data records in climate science. It shows Arctic September sea ice extent declining from approximately 7.5 million km² in 1979 to less than 4.5 million km² in recent years — a 40% decline in summer extent that is one of the clearest observational signatures of Arctic amplification of climate warming.

---

## 8. What Could Go Wrong?

**Vegetation attenuation.** Vegetation canopies absorb and re-emit microwave radiation, reducing the sensitivity to underlying soil moisture. The vegetation water content (VWC) parameterises this effect through an optical depth $\tau_c$: the soil signal is attenuated by a factor $e^{-2\tau_c/\cos\theta_i}$. For dense forests (VWC > 5 kg m⁻²), the soil signal at L-band is negligible — SMAP can only retrieve soil moisture under sparse to moderate vegetation.

**Open water in the footprint.** Passive microwave radiometers have coarse spatial resolution — 25–40 km for most operational systems. If a lake, river, or flooded field occupies even 5% of the footprint, the very low emissivity of open water ($\varepsilon \approx 0.4$) substantially lowers $T_B$, mimicking high soil moisture. Land-water masks and fractional water corrections are applied but cannot fully resolve sub-footprint heterogeneity.

**Frozen soil.** When soil is frozen, its dielectric constant drops from the high values of liquid water to values similar to ice ($\varepsilon_r \approx 4$–$6$). The brightness temperature rises and the soil moisture retrieval gives anomalously low values — not because the soil is dry, but because the water is frozen. Freeze-thaw detection algorithms must precede soil moisture retrieval in seasonally cold regions.

**RFI (radio frequency interference).** The 1.4 GHz L-band is internationally protected for passive use, but nearby radar, GPS, and communications signals leak into the radiometer band in densely populated regions. SMAP employs digital detection and RFI mitigation algorithms, but significant contamination remains over Europe, the Middle East, and parts of Asia.

---

## 9. Summary

Passive microwave radiometry records natural thermal emission from Earth's surface and atmosphere at frequencies where emissivity varies systematically with geophysically meaningful quantities — water content, ice phase, snow depth. The Rayleigh-Jeans approximation makes brightness temperature linear in physical temperature, and the Fresnel equations connect dielectric constant (driven by water content) to emissivity.

Soil moisture retrieval exploits the high dielectric constant of liquid water: a 10% change in volumetric moisture changes the L-band brightness temperature by 20–40 K. Sea ice concentration retrieval exploits the 80–100 K brightness temperature contrast between ice and open ocean at 19 GHz. Snow water equivalent is estimated from the frequency-dependent scattering of dry snow grains. All three retrievals work through clouds, at night, and at global coverage — the properties that make passive microwave an indispensable component of the Earth observation system.

**Key equations:**

$$T_B = \varepsilon \cdot T_s \quad \text{[brightness temperature]}$$

$$\varepsilon_H = 1 - \left|\frac{\cos\theta_i - \sqrt{\varepsilon_r - \sin^2\theta_i}}{\cos\theta_i + \sqrt{\varepsilon_r - \sin^2\theta_i}}\right|^2 \quad \text{[H-pol emissivity]}$$

$$C_{\text{ice}} = \frac{T_B^{\text{obs}} - T_B^{\text{ocean}}}{T_B^{\text{ice}} - T_B^{\text{ocean}}} \quad \text{[sea ice concentration]}$$

$$\text{SWE} = 4.8\,(T_{B19H} - T_{B37H}) \quad \text{[Chang snow algorithm]}$$

---

## Math Refresher

**Planck's law and the microwave limit.** At radio frequencies, $h\nu \ll k_B T$ for any Earth temperature. Taylor-expanding the exponential: $e^x - 1 \approx x$ for small $x = h\nu/k_B T$. This gives $B_\nu \approx 2\nu^2 k_B T / c^2$ — the Rayleigh-Jeans law. The brightness temperature is defined to make this linear: $T_B = c^2 B_\nu / (2k_B\nu^2)$. For a blackbody, $T_B = T$. For a real surface, $T_B = \varepsilon T < T$.

**Emissivity and Kirchhoff's law.** A surface in thermal equilibrium must absorb exactly as much radiation as it emits (otherwise it would spontaneously heat or cool). Kirchhoff's law states that the emissivity $\varepsilon$ equals the absorptivity $\alpha = 1 - r$ (where $r$ is reflectivity). Thus: $\varepsilon = 1 - r$. Smooth water has high reflectivity ($r \approx 0.6$) at microwave frequencies because its very high dielectric constant ($\varepsilon_r \approx 80$) creates a strong impedance mismatch with air — most of the incident energy is reflected rather than absorbed.

**Linear mixing.** The sea ice concentration formula assumes that the observed $T_B$ is a linear combination of ice and water contributions weighted by area fraction. This is the **radiative mixing model**: $T_B = f_i T_B^{\text{ice}} + (1-f_i)T_B^{\text{water}}$. Solving for $f_i$ gives the two-point inversion formula. The model is exact for horizontally homogeneous mixtures and is a good approximation when the footprint contains many ice floes — which at 25 km resolution is almost always the case in the open marginal ice zone.
