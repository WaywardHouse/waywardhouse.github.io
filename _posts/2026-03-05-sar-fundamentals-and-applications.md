---
layout: essay
title: "SAR Fundamentals and Applications"
subtitle: "Synthetic aperture, backscatter physics, and the radar eye that sees through clouds"
date: 2026-03-05
categories: modelling
series: computational-geography-laboratory
series_order: 56
cluster: "T — Radar Remote Sensing"
cluster_order: 1
tags: [math, viz, essay]
math: true
viz: true
math_core:
  - wave interference
  - dimensional analysis
  - complex numbers
  - signal processing
spatial_reasoning: range-azimuth geometry
dynamics: coherent signal propagation
computation: backscatter analysis
domain: remote sensing
difficulty: 4
prerequisites:
  - F13
  - E12
notebook_url: https://github.com/waywardhouse/computational-geography-lab/tree/main/essays/T1-sar-fundamentals
excerpt: >
  A conventional camera records the intensity of reflected sunlight. A synthetic
  aperture radar illuminates the Earth with its own microwave pulses and records
  both the intensity and phase of the return signal — producing images in the dark,
  through clouds, and with a spatial resolution finer than the physical antenna.
  This essay derives how a small moving antenna synthesises a large virtual aperture,
  why resolution and wavelength trade off the way they do, and how backscatter
  physics enables flood mapping, ship detection, and surface roughness retrieval.
math_prerequisites: >
  Wave concepts (wavelength, frequency, phase) from Essay F13. Basic trigonometry.
  Complex numbers are introduced where needed — no prior familiarity required.
---

On the night of 26 December 2004, no optical satellite could see through the clouds covering the Indian Ocean as the Sumatra-Andaman earthquake triggered the deadliest tsunami in recorded history. But ENVISAT's Advanced SAR imaged the ocean surface through those same clouds within hours, mapping the tsunami's propagation and the inundation extent along coastlines from Thailand to Sri Lanka.

Synthetic aperture radar does not depend on sunlight. It does not depend on clear skies. It records the Earth's surface in darkness, through cloud cover, through rain (at long wavelengths), at any time of day or night. This all-weather, day-night capability makes SAR one of the most operationally useful tools in Earth observation — and the physics that enables it is, at its core, a clever exploitation of the wave nature of electromagnetic radiation.

---

## 1. The Question

How does a small satellite antenna achieve fine spatial resolution? What physical properties of the surface determine the radar return signal? And how do we exploit the backscatter signal to detect floods, ships, and surface changes?

---

## 2. The Conceptual Model

A SAR system transmits microwave pulses from an antenna mounted on a moving platform (aircraft or satellite). The pulses illuminate a swath on the Earth's surface and the backscattered signal is recorded as the platform moves along its flight path. Two geometric dimensions define the image:

**Range:** the cross-track direction, perpendicular to the flight path. Distance to a target is measured by the two-way travel time of the pulse. Range resolution is determined by the pulse bandwidth.

**Azimuth:** the along-track direction, parallel to the flight path. The key insight of SAR: by coherently combining the returns from many successive pulse transmissions as the platform moves, we can synthesise the effect of a much longer antenna — dramatically improving azimuth resolution far beyond what the physical antenna size would allow.

The surface interacts with the microwave pulse through **backscatter** — the fraction of incident energy scattered back toward the radar. Backscatter depends on surface roughness (relative to the wavelength), dielectric properties (which depend on water content), and geometry (slope, orientation).

---

## 3. Building the Mathematical Model

### 3.1 Range Resolution

A radar pulse of duration $\tau_p$ [s] travels at the speed of light $c = 3 \times 10^8$ m s⁻¹. Two targets at slightly different ranges are resolved if their returns do not overlap. The minimum resolvable range difference is:

$$\delta r = \frac{c \tau_p}{2}$$

The factor of 2 accounts for the two-way travel. For a 10 ns pulse: $\delta r = 3 \times 10^8 \times 10 \times 10^{-9} / 2 = 1.5$ m — very fine.

However, transmitting a short pulse limits the energy in each pulse. The solution is **pulse compression**: transmit a long pulse with a linearly swept frequency (a chirp), then compress it in processing. The effective range resolution after pulse compression is:

$$\delta r_g = \frac{c}{2B\sin\theta_i}$$

where $B$ [Hz] is the chirp bandwidth and $\theta_i$ is the incidence angle from vertical. The $\sin\theta_i$ term converts slant-range resolution to ground-range resolution. For $B = 100$ MHz and $\theta_i = 35°$:

$$\delta r_g = \frac{3 \times 10^8}{2 \times 10^8 \times \sin 35°} = \frac{3 \times 10^8}{1.147 \times 10^8} = 2.6 \text{ m}$$

### 3.2 Azimuth Resolution: Real Aperture

For a conventional (real aperture) radar, azimuth resolution is set by the antenna beamwidth. An antenna of physical length $L_a$ [m] at wavelength $\lambda$ [m] has a beamwidth of approximately $\lambda/L_a$ radians. At slant range $R$ [m], the azimuth resolution is:

$$\delta a_{\text{real}} = R \frac{\lambda}{L_a}$$

For a C-band satellite ($\lambda = 0.056$ m), slant range $R = 800$ km, and antenna length $L_a = 10$ m:

$$\delta a_{\text{real}} = 800{,}000 \times \frac{0.056}{10} = 4{,}480 \text{ m}$$

This 4.5 km azimuth resolution is useless for most applications. A 10 m antenna on a satellite 800 km away resolves features the size of a small town — not a field, not a building.

### 3.3 Azimuth Resolution: Synthetic Aperture

The SAR principle: as the platform moves along the flight path, each ground target is illuminated for a time $T_s$ [s] — the **synthetic aperture time** — during which the platform travels a distance $L_s = V T_s$ [m], where $V$ is the platform velocity. The coherent combination of all pulses received during this time synthesises an antenna of length $L_s$.

The resolution of this synthetic aperture is:

$$\delta a_{\text{SAR}} = \frac{\lambda R}{2 L_s}$$

The factor of 2 (compared to the real aperture formula) arises because in SAR, the target is both illuminated and received from each position along the synthetic aperture — a two-way phase history that doubles the effective aperture.

The synthetic aperture length is determined by how long the target remains within the beam: $L_s = R\lambda/L_a$ (the beam footprint length). Substituting:

$$\delta a_{\text{SAR}} = \frac{\lambda R}{2 \cdot R\lambda/L_a} = \frac{L_a}{2}$$

This remarkable result says that **SAR azimuth resolution equals half the physical antenna length, independent of range and wavelength**. Shorter antennas give better resolution (more along-track integration is required to cover the beam footprint). The $R$ and $\lambda$ dependencies cancel exactly — a satellite 800 km away achieves the same azimuth resolution as an aircraft 5 km away, given the same antenna length.

For $L_a = 10$ m: $\delta a_{\text{SAR}} = 5$ m — three orders of magnitude better than the real aperture result.

### 3.4 Radar Backscatter and the Radar Equation

The power received from a target is described by the **radar equation**:

$$P_r = \frac{P_t G^2 \lambda^2 \sigma}{(4\pi)^3 R^4}$$

where:
- $P_t$ [W] is transmitted power
- $G$ is antenna gain (dimensionless)
- $\sigma$ [m²] is the **radar cross-section** of the target — the effective area that would scatter the observed power isotropically
- $R$ [m] is range

For distributed targets (natural surfaces), the radar cross-section is normalised by the illuminated area to give the **backscatter coefficient** $\sigma^0$ [dimensionless, often expressed in dB]:

$$\sigma^0 = \frac{\sigma}{A_{\text{illuminated}}}$$

Backscatter is reported in decibels: $\sigma^0_{\text{dB}} = 10\log_{10}(\sigma^0)$.

Typical $\sigma^0$ values:
| Surface | $\sigma^0$ (dB) |
|---|---|
| Calm water (specular reflection) | −20 to −30 |
| Rough ocean / wind waves | −5 to −15 |
| Agricultural fields | −10 to −15 |
| Urban areas (corner reflectors) | +5 to +20 |
| Flooded vegetation | −5 to −12 |
| Dense forest | −6 to −12 |
| Dry sand | −20 to −25 |

### 3.5 Backscatter Mechanisms

Three mechanisms dominate radar backscatter from natural surfaces:

**Surface scattering:** Reflection from the air-surface interface. For surfaces smooth relative to $\lambda$, scattering is specular (most energy forward-scattered, little back to radar — low $\sigma^0$). For rough surfaces, energy is scattered diffusely in all directions — higher $\sigma^0$. The Rayleigh roughness criterion: a surface is "rough" to radar if the standard deviation of surface height $\sigma_h > \lambda / (8\cos\theta_i)$.

**Volume scattering:** Penetration into the medium and scattering from internal inhomogeneities. Dominant in vegetation (scattering from leaves, branches) and dry snow. Penetration depth increases with wavelength: L-band (24 cm) penetrates forest canopy; C-band (5.6 cm) is mostly attenuated by the canopy; X-band (3.1 cm) penetrates even less.

**Double-bounce scattering:** Two successive reflections, typically between a vertical structure (tree trunk, building wall) and a horizontal surface (ground, water). The two-bounce geometry returns energy precisely back toward the radar — very high $\sigma^0$, often the dominant mechanism in urban areas and flooded forests.

### 3.6 Polarimetry

SAR antennas can transmit and receive in horizontal (H) and vertical (V) polarisations. A fully polarimetric SAR measures the 2×2 **scattering matrix**:

$$\mathbf{S} = \begin{pmatrix} S_{HH} & S_{HV} \\ S_{VH} & S_{VV} \end{pmatrix}$$

where $S_{pq}$ is the complex amplitude scattered in polarisation $p$ when transmitting polarisation $q$. For reciprocal media, $S_{HV} = S_{VH}$.

The **Pauli decomposition** decomposes the scattering matrix into three mechanisms:

$$\mathbf{k} = \frac{1}{\sqrt{2}} \begin{pmatrix} S_{HH} + S_{VV} \\ S_{HH} - S_{VV} \\ 2S_{HV} \end{pmatrix}$$

- $|S_{HH} + S_{VV}|^2$: odd-bounce (surface) scattering — displayed as blue
- $|S_{HH} - S_{VV}|^2$: double-bounce — displayed as red
- $|2S_{HV}|^2$: volume scattering — displayed as green

The false-colour Pauli RGB image is one of the most informative SAR products for land cover mapping: forests appear green (volume scattering), urban areas red (double-bounce), bare soil blue (surface scattering), flooded vegetation a mixture of blue and red.

### 3.7 Flood and Ship Detection

**Flood detection** exploits the strong contrast between open water ($\sigma^0 \approx -20$ to $-30$ dB, specular) and surrounding land ($\sigma^0 \approx -10$ to $-15$ dB). A simple thresholding algorithm:

$$\text{Pixel is flooded if } \sigma^0 < \sigma^0_{\text{threshold}}$$

where $\sigma^0_{\text{threshold}}$ is typically $-15$ dB, calibrated from histogram analysis or reference pixels. The challenge is distinguishing calm water from smooth roads, sand, and other specular reflectors — solved by combining SAR with ancillary layers (slope, land cover, DEM).

**Ship detection** exploits the strong backscatter contrast between ships ($\sigma^0 \approx +5$ to $+20$ dB, many corner reflectors) and the ocean background ($\sigma^0 \approx -15$ to $-5$ dB). A CFAR (Constant False Alarm Rate) detector sets a threshold based on local background statistics:

$$T = \mu_{\text{bg}} + k \sigma_{\text{bg}}$$

where $\mu_{\text{bg}}$ and $\sigma_{\text{bg}}$ are the mean and standard deviation of backscatter in a window around the candidate pixel, and $k$ is set to control the false alarm rate (typically $k = 3$–$5$).

---

## 4. Worked Example by Hand

**Setting:** Sentinel-1 C-band SAR overpass of a coastal area suspected to contain flood inundation. We want to calculate ground-range resolution and assess whether a 50 m wide flooded field is detectable.

**Given:**
- Wavelength $\lambda = 0.056$ m (C-band, 5.405 GHz)
- Chirp bandwidth $B = 100$ MHz
- Incidence angle $\theta_i = 38°$
- Physical antenna length $L_a = 12.3$ m
- Slant range $R = 750$ km
- Platform velocity $V = 7{,}500$ m s⁻¹

**Step 1: Ground-range resolution**

$$\delta r_g = \frac{c}{2B\sin\theta_i} = \frac{3 \times 10^8}{2 \times 10^8 \times 0.6157} = \frac{3 \times 10^8}{1.231 \times 10^8} = 2.44 \text{ m}$$

**Step 2: SAR azimuth resolution**

$$\delta a_{\text{SAR}} = \frac{L_a}{2} = \frac{12.3}{2} = 6.15 \text{ m}$$

**Step 3: Real aperture check** (to illustrate the improvement)

$$\delta a_{\text{real}} = R \frac{\lambda}{L_a} = 750{,}000 \times \frac{0.056}{12.3} = 750{,}000 \times 0.00455 = 3{,}415 \text{ m}$$

SAR improves azimuth resolution by a factor of $3{,}415 / 6.15 = 555\times$.

**Step 4: Synthetic aperture time and length**

$$T_s = \frac{R\lambda}{V L_a} = \frac{750{,}000 \times 0.056}{7{,}500 \times 12.3} = \frac{42{,}000}{92{,}250} = 0.455 \text{ s}$$

$$L_s = V T_s = 7{,}500 \times 0.455 = 3{,}413 \text{ m}$$

The satellite sweeps 3.4 km of flight path to synthesise one high-resolution azimuth pixel.

**Step 5: Flood detectability**

The 50 m wide flooded field spans $50/6.15 \approx 8$ pixels in azimuth and $50/2.44 \approx 20$ pixels in range. With $\sigma^0 \approx -22$ dB for the flooded surface and $-10$ dB for surrounding agricultural fields, the contrast is 12 dB — easily detectable above speckle noise. The field is well-resolved and clearly detectable.

---

## 5. Computational Implementation

```
function sar_resolution(lambda, B, theta_i_deg, L_a):
    theta_i = radians(theta_i_deg)
    delta_r  = c / (2 * B * sin(theta_i))
    delta_az = L_a / 2
    return delta_r, delta_az

function flood_detect(sigma0_image, threshold_dB=-15):
    # Returns binary flood mask
    flood_mask = sigma0_image < threshold_dB
    return flood_mask

function cfar_ship_detect(sigma0_image, window=64, k=4):
    # For each pixel, compute local background stats
    for each pixel (i,j):
        bg = sigma0_image in window around (i,j), excluding guard cells
        T = mean(bg) + k * std(bg)
        detected[i,j] = sigma0_image[i,j] > T
    return detected
```

```{pyodide}
import numpy as np

c = 3e8

def sar_resolution(lam, B, theta_deg, La):
    theta = np.radians(theta_deg)
    dr = c / (2 * B * np.sin(theta))
    daz = La / 2
    dr_real_ap = 750e3 * lam / La   # for comparison
    return dr, daz, dr_real_ap

dr, daz, dr_real = sar_resolution(lam=0.056, B=100e6, theta_deg=38, La=12.3)
print(f"Ground-range resolution: {dr:.2f} m")
print(f"SAR azimuth resolution:  {daz:.2f} m")
print(f"Real aperture azimuth:   {dr_real:.0f} m  (SAR improvement: {dr_real/daz:.0f}×)")

# Flood contrast
sigma_flood = -22  # dB
sigma_field = -10  # dB
contrast = sigma_field - sigma_flood
print(f"\nFlood–field backscatter contrast: {contrast} dB")
print(f"Detectable: {'YES' if contrast > 5 else 'NO'} (threshold ~5 dB)")

# Synthetic aperture
R, V, lam, La = 750e3, 7500, 0.056, 12.3
Ts = R * lam / (V * La)
Ls = V * Ts
print(f"\nSynthetic aperture time: {Ts:.3f} s")
print(f"Synthetic aperture length: {Ls:.0f} m")
```

---

## 6. Visualization

<div data-viz="echarts" style="height:420px" data-options='{
  "title": {"text": "SAR Backscatter Signatures by Surface Type (C-band)", "textStyle": {"fontSize": 14}},
  "tooltip": {"trigger": "axis"},
  "xAxis": {"type": "category", "data": ["Calm water", "Rough ocean", "Dry sand", "Crops", "Forest", "Flooded veg.", "Urban"],
    "axisLabel": {"rotate": 20}},
  "yAxis": {"name": "σ⁰ (dB)", "nameLocation": "middle", "nameGap": 40, "min": -35, "max": 25},
  "series": [
    {
      "name": "Typical range",
      "type": "bar",
      "data": [
        {"value": -25, "itemStyle": {"color": "#2196F3"}},
        {"value": -10, "itemStyle": {"color": "#2196F3"}},
        {"value": -22, "itemStyle": {"color": "#FF9800"}},
        {"value": -12, "itemStyle": {"color": "#4CAF50"}},
        {"value": -9,  "itemStyle": {"color": "#4CAF50"}},
        {"value": -8,  "itemStyle": {"color": "#9C27B0"}},
        {"value": 12,  "itemStyle": {"color": "#F44336"}}
      ],
      "label": {"show": true, "position": "top", "formatter": "{c} dB"}
    }
  ]
}'></div>

The dynamic range from calm water (−25 dB) to urban double-bounce (+12 dB) spans 37 dB — a factor of 5000 in power. Flood detection exploits the low end of this range; ship detection exploits the contrast between ocean background and the high-end urban-like backscatter of metal vessels.

---

## 7. Interpretation

The SAR azimuth resolution result — $\delta a = L_a/2$, independent of range and wavelength — is one of the most elegant results in remote sensing. It means that improving resolution requires a shorter physical antenna (which demands more signal processing) or finer ground sampling (which is already achieved at $L_a/2$). The practical limit is the processing burden of coherently combining thousands of pulses across a 3 km synthetic aperture.

The backscatter physics explains why C-band SAR is the workhorse of Earth observation: its 5.6 cm wavelength interacts with surface roughness at the scale of wind waves, plant stems, and building facades — the scale most relevant for surface monitoring. L-band (24 cm) penetrates forest canopies and dry soils, making it valuable for biomass and subsurface moisture; X-band (3.1 cm) responds to fine-scale roughness and is preferred for urban mapping and ice monitoring.

The flood detection application has saved lives. The Copernicus Emergency Management Service routinely delivers SAR-based flood maps within 12–24 hours of a disaster, covering cloud-obscured regions where optical sensors are useless precisely when flood events are most likely to occur.

---

## 8. What Could Go Wrong?

**Speckle.** SAR images contain a granular noise pattern called speckle, arising from the coherent interference of returns from many scatterers within a resolution cell. Speckle makes single-pixel backscatter measurements highly variable — the signal from a uniform surface can vary by ±5 dB from pixel to pixel. Speckle filtering (spatial or multi-look averaging) reduces this noise at the cost of spatial resolution.

**Geometric distortions.** SAR images contain three types of geometric distortion: foreshortening (slopes facing the radar appear compressed), layover (steep slopes appear reversed), and shadow (slopes facing away appear dark). These distortions are deterministic and can be corrected with a DEM, but uncorrected they cause misinterpretation of slope aspects and cliff geometry.

**Azimuth ambiguities.** The pulse repetition frequency (PRF) must be high enough to sample the Doppler bandwidth of the synthetic aperture without aliasing. If the PRF is too low, energy from targets outside the intended azimuth window folds back into the image as ghost targets — azimuth ambiguities. SAR system design must balance PRF requirements against swath width.

**Dielectric vs. roughness ambiguity.** Both increased surface moisture (higher dielectric constant) and increased roughness increase backscatter. A SAR image alone cannot distinguish a wet smooth surface from a dry rough one — multi-frequency, multi-polarisation, or time-series analysis is required to separate these effects.

---

## 9. Summary

Synthetic aperture radar achieves fine azimuth resolution by synthesising a large virtual antenna from the coherent sum of returns collected as the platform moves. The key result — $\delta a = L_a/2$ independent of range — makes satellite SAR capable of metre-scale resolution from 700 km altitude with a 10–12 m physical antenna.

Backscatter from natural surfaces is governed by surface roughness, dielectric properties, and geometry, through three mechanisms: surface scattering, volume scattering, and double-bounce. C-band SAR provides 10–30 dB contrast between flooded and unflooded land, enabling near-real-time flood mapping through cloud cover. Polarimetric decomposition separates these mechanisms and enables land cover classification without optical imagery.

**Key equations:**

$$\delta r_g = \frac{c}{2B\sin\theta_i} \quad \text{[ground-range resolution]}$$

$$\delta a_{\text{SAR}} = \frac{L_a}{2} \quad \text{[SAR azimuth resolution]}$$

$$\sigma^0_{\text{dB}} = 10\log_{10}(\sigma^0) \quad \text{[backscatter coefficient]}$$

---

## Math Refresher

**Decibels.** The decibel scale $x_{\text{dB}} = 10\log_{10}(x)$ compresses the enormous dynamic range of radar power ratios into a manageable scale. A 10 dB difference means a factor of 10 in power; 3 dB means a factor of 2; 20 dB means a factor of 100. Adding decibels is equivalent to multiplying the underlying ratios — a convenient property for expressing the radar equation, which involves many multiplicative terms.

**Complex numbers in SAR.** Each SAR pixel stores a complex number $s = I + jQ$ (in-phase and quadrature components), representing the amplitude and phase of the backscattered field: $|s|$ is the amplitude, $\arg(s) = \arctan(Q/I)$ is the phase. Backscatter intensity is $|s|^2$. The phase contains additional information — interferometric SAR (Essay 57) exploits the phase difference between two images to measure surface displacement.

**The two-way phase factor.** The factor of 2 in the SAR azimuth resolution formula arises because the radar both transmits and receives from each position along the aperture. The phase of the received signal changes by $2 \times 2\pi R/\lambda$ as the range $R$ changes — the factor of 2 before $2\pi$ means the phase varies twice as fast as for a one-way propagation, doubling the effective aperture and halving the resolution cell.
