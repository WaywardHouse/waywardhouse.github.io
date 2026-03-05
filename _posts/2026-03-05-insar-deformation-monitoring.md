---
layout: essay
title: "InSAR Deformation Monitoring"
subtitle: "Interferometric phase, unwrapping, and millimetre-scale surface displacement from orbit"
date: 2026-03-05
categories: modeling
series: computational-geography-laboratory
series_order: 57
cluster: "T — Radar Remote Sensing"
cluster_order: 2
tags: [math, viz, essay]
math: true
viz: true
math_core:
  - complex numbers
  - phase arithmetic
  - trigonometry
  - signal processing
spatial_reasoning: line-of-sight geometry
dynamics: deformation mapping
computation: phase unwrapping
domain: geodesy / remote sensing
difficulty: 5
prerequisites:
  - T1
  - F13
  - F16
notebook_url: https://github.com/waywardhouse/computational-geography-lab/tree/main/essays/T2-insar
excerpt: >
  Two radar images of the same area, taken weeks apart from slightly different
  orbital positions, contain in their phase difference a record of every millimetre
  of ground motion that occurred between the acquisitions. InSAR — interferometric
  SAR — reads that record. This essay derives the interferometric phase from the
  geometry of two-pass imaging, explains the phase unwrapping problem, and applies
  the technique to measure land subsidence, earthquake deformation, and volcanic
  inflation.
math_prerequisites: >
  SAR fundamentals including the complex pixel representation (Essay T1). Basic
  trigonometry. The concept of phase and phase difference is reviewed from scratch
  in §3.1.
---

On 17 January 1994, the Northridge earthquake struck the San Fernando Valley north of Los Angeles. Within weeks, Didier Massonnet and colleagues had produced a map of the coseismic ground deformation from ERS-1 SAR data — a coloured interference pattern covering 100 km × 100 km, showing displacement fringes that corresponded precisely to the earthquake fault geometry. Each colour cycle represented 2.8 cm of range change along the satellite line of sight. The map was published in Nature and marked the moment the Earth science community recognised InSAR as a transformative tool.

The physics is elegant: two radar images of the same area, acquired from nearly the same orbital position but at different times, contain phase information that records the path length from satellite to ground. If the ground has moved between the two acquisitions, the path lengths differ, and the phase difference encodes that displacement. With wavelengths of a few centimetres and phase measurements accurate to a fraction of a radian, InSAR can detect surface motion smaller than a millimetre.

---

## 1. The Question

How does the phase difference between two SAR images encode surface displacement? How do we extract displacement from the wrapped phase? And what limits the accuracy and applicability of the technique?

---

## 2. The Conceptual Model

A SAR image records, at each pixel, the complex backscattered field $s = A e^{j\phi}$, where $A$ is amplitude and $\phi$ is phase. The phase accumulates over the two-way path from satellite to ground:

$$\phi = -\frac{4\pi R}{\lambda}$$

where $R$ is the slant range and the minus sign is conventional (phase decreases as range increases). For a satellite 700 km away and $\lambda = 0.056$ m:

$$\phi = -\frac{4\pi \times 700{,}000}{0.056} \approx -1.57 \times 10^8 \text{ rad}$$

This is an enormous number of phase cycles — completely uninformative on its own. What is informative is the **phase difference** between two acquisitions: the contribution from the absolute range cancels, leaving only the change.

---

## 3. Building the Mathematical Model

### 3.1 The Interferometric Phase

Two SAR images $s_1 = A_1 e^{j\phi_1}$ and $s_2 = A_2 e^{j\phi_2}$ are multiplied together (one conjugated) to form the **interferogram**:

$$I = s_1 \cdot s_2^* = A_1 A_2 e^{j(\phi_1 - \phi_2)}$$

The phase of the interferogram is:

$$\Delta\phi = \phi_1 - \phi_2 = -\frac{4\pi}{\lambda}(R_1 - R_2)$$

The difference $R_1 - R_2$ has three contributions:

$$R_1 - R_2 = \Delta R_{\text{topo}} + \Delta R_{\text{defo}} + \Delta R_{\text{atm}} + \Delta R_{\text{noise}}$$

- **Topographic term** $\Delta R_{\text{topo}}$: the two satellites view from slightly different positions (baseline $B_\perp$), so a hill of height $h$ appears at slightly different ranges in each image.
- **Deformation term** $\Delta R_{\text{defo}}$: if the ground moves by $d$ [m] along the line of sight (LOS) between acquisitions, the range changes by $d$.
- **Atmospheric term** $\Delta R_{\text{atm}}$: spatial variations in water vapour and ionospheric electron content change the path delay differently in each image.
- **Noise term** $\Delta R_{\text{noise}}$: thermal noise and decorrelation.

### 3.2 The Topographic Phase

If the two satellites orbit at positions separated by a perpendicular baseline $B_\perp$ [m] (the component of the baseline perpendicular to the LOS), a point at height $h$ above the reference surface appears at range $R_1$ in image 1 and $R_2$ in image 2:

$$\Delta R_{\text{topo}} \approx -\frac{B_\perp h}{R \sin\theta_i}$$

The corresponding phase contribution is:

$$\Delta\phi_{\text{topo}} = -\frac{4\pi}{\lambda} \cdot \left(-\frac{B_\perp h}{R\sin\theta_i}\right) = \frac{4\pi B_\perp h}{\lambda R \sin\theta_i}$$

This is the **topographic phase** — it is removed using a digital elevation model (DEM) to produce a **differential interferogram** containing primarily the deformation signal.

The **altitude of ambiguity** $h_a$ [m] is the height difference that produces one full phase cycle ($2\pi$) of topographic phase:

$$h_a = \frac{\lambda R \sin\theta_i}{2 B_\perp}$$

For $\lambda = 0.056$ m, $R = 700$ km, $\theta_i = 38°$, $B_\perp = 100$ m:

$$h_a = \frac{0.056 \times 700{,}000 \times 0.616}{2 \times 100} = \frac{24{,}147}{200} = 120.7 \text{ m}$$

A 100 m baseline produces one fringe per 120 m of topographic height. Shorter baselines are preferable for deformation studies (less topographic sensitivity); longer baselines are useful for DEM generation (more phase cycles per unit height).

### 3.3 The Deformation Phase

After removing the topographic phase, the residual differential phase is dominated by the deformation term:

$$\Delta\phi_{\text{defo}} = -\frac{4\pi}{\lambda} d_{\text{LOS}}$$

where $d_{\text{LOS}}$ [m] is the surface displacement in the satellite LOS direction (positive = toward the satellite). Solving for displacement:

$$d_{\text{LOS}} = -\frac{\lambda \Delta\phi_{\text{defo}}}{4\pi}$$

For Sentinel-1 C-band ($\lambda = 0.056$ m), one full phase cycle ($\Delta\phi = 2\pi$) corresponds to:

$$d = \frac{0.056}{2} = 0.028 \text{ m} = 2.8 \text{ cm}$$

This is the **half-wavelength sensitivity**: each fringe in the interferogram represents 2.8 cm of LOS displacement. The phase measurement precision is typically $\sim\pi/10$ rad, giving displacement sensitivity of approximately $\lambda/40 = 1.4$ mm.

### 3.4 Phase Unwrapping

The interferometric phase is inherently **wrapped** — it is only known modulo $2\pi$, since $e^{j\phi}$ is periodic. The observed phase at pixel $(i,j)$ is:

$$\Delta\phi_{\text{obs}}(i,j) = W[\Delta\phi_{\text{true}}(i,j)] \in (-\pi, \pi]$$

where $W[\cdot]$ is the wrapping operator. To recover the true (unwrapped) phase, we must add the correct integer multiple of $2\pi$ at each pixel:

$$\Delta\phi_{\text{true}}(i,j) = \Delta\phi_{\text{obs}}(i,j) + 2\pi n(i,j)$$

The integers $n(i,j)$ are unknown. Phase unwrapping is the problem of determining them.

The standard assumption is **phase continuity**: the true phase field varies smoothly, so phase jumps in the wrapped image of magnitude greater than $\pi$ are treated as wrapping artefacts. The Goldstein branch-cut algorithm and the minimum-cost-flow algorithm are the most widely used approaches.

The unwrapping problem fails at **phase discontinuities** — abrupt deformation gradients (fault edges, landslides), strong atmospheric gradients, or decorrelated regions. In these cases, the assumption of smooth phase variation is violated and unwrapping errors propagate through the image.

### 3.5 Coherence

The **interferometric coherence** $\gamma$ measures the degree of phase correlation between the two images:

$$\gamma = \frac{|\langle s_1 s_2^* \rangle|}{\sqrt{\langle |s_1|^2 \rangle \langle |s_2|^2 \rangle}} \in [0, 1]$$

where angle brackets denote spatial averaging over a window of pixels. High coherence ($\gamma > 0.6$) means reliable phase measurements; low coherence ($\gamma < 0.3$) means the phase is dominated by noise and cannot be used.

Coherence is reduced by:
- **Temporal decorrelation:** surface changes between acquisitions (vegetation growth, wind, rain, agricultural tillage). Forest has low coherence over weeks; bare rock maintains coherence over years.
- **Geometric decorrelation:** large perpendicular baselines cause the two images to view slightly different facets of scatterers, reducing correlation.
- **Volume decorrelation:** scattering from distributed volumes (vegetation, snow) rather than point-like scatterers.

### 3.6 Time-Series InSAR

A single interferogram measures the deformation over one time interval. **Time-series InSAR** (PSInSAR, SBAS) combines dozens to hundreds of interferograms from a stack of SAR acquisitions to:

1. Separate deformation from atmospheric delays by exploiting their different temporal signatures
2. Measure long-term displacement rates (mm yr⁻¹) rather than episodic events
3. Identify **persistent scatterers** (PS) — individual pixels (often building corners, rock outcrops) that maintain high coherence over years — and measure their displacement history

The atmospheric delay contribution $\Delta\phi_{\text{atm}}$ has a spatial correlation length of 5–20 km and is uncorrelated in time; deformation signals are often spatially coherent over longer scales. Stacking exploits this difference: atmospheric noise averages toward zero over many interferograms while deformation accumulates.

---

## 4. Worked Example by Hand

**Setting:** Sentinel-1 interferogram over a subsiding industrial area in the Po Valley, Italy. We observe 4.5 fringes (complete colour cycles) in the differential interferogram over a 6-month period between two acquisitions.

**Given:**
- $\lambda = 0.056$ m (C-band)
- $\theta_i = 34°$ (incidence angle)
- Number of fringes observed: $n = 4.5$
- $B_\perp = 45$ m (short baseline — good coherence)
- DEM has been used to remove topographic phase

**Step 1: Total unwrapped phase**

$$\Delta\phi_{\text{defo}} = 4.5 \times 2\pi = 28.27 \text{ rad}$$

**Step 2: LOS displacement**

$$d_{\text{LOS}} = -\frac{\lambda \Delta\phi_{\text{defo}}}{4\pi} = -\frac{0.056 \times 28.27}{4\pi} = -\frac{1.583}{12.566} = -0.126 \text{ m}$$

The negative sign indicates motion **away** from the satellite (subsidence, since the satellite looks obliquely downward). The ground has subsided 12.6 cm in 6 months.

**Step 3: Vertical displacement estimate**

The LOS displacement is a projection of the 3D displacement vector. For predominantly vertical deformation:

$$d_{\text{vertical}} = \frac{d_{\text{LOS}}}{\cos\theta_i} = \frac{-0.126}{\cos 34°} = \frac{-0.126}{0.829} = -0.152 \text{ m}$$

The area is subsiding at approximately 15.2 cm per 6 months = **30.4 cm yr⁻¹** — an extraordinarily high subsidence rate, consistent with groundwater extraction or compaction of unconsolidated sediments.

**Step 4: Altitude of ambiguity** (to assess topographic phase error if DEM has a 5 m error)

$$h_a = \frac{0.056 \times 700{,}000 \times \sin 56°}{2 \times 45} = \frac{0.056 \times 700{,}000 \times 0.829}{90} = \frac{32{,}494}{90} = 361 \text{ m}$$

A 5 m DEM error introduces $5/361 = 0.014$ fringes of topographic phase error — negligible compared to 4.5 deformation fringes. The short baseline makes this interferogram very insensitive to topographic errors.

---

## 5. Computational Implementation

```
function form_interferogram(s1, s2):
    return s1 * conjugate(s2)        # complex interferogram

function compute_phase(interferogram):
    return angle(interferogram)       # wrapped phase in (-π, π]

function topographic_phase(B_perp, h_dem, R, theta_i, lam):
    return (4*pi * B_perp * h_dem) / (lam * R * sin(theta_i))

function los_displacement(phase_unwrapped, lam):
    return -(lam * phase_unwrapped) / (4 * pi)

function coherence(s1, s2, window=5):
    # window × window spatial averaging
    numerator   = abs(spatial_mean(s1 * conjugate(s2)))
    denominator = sqrt(spatial_mean(|s1|²) * spatial_mean(|s2|²))
    return numerator / denominator
```

```{pyodide}
import numpy as np

lam = 0.056  # C-band

def los_from_fringes(n_fringes, lam=0.056):
    phi = n_fringes * 2 * np.pi
    return -(lam * phi) / (4 * np.pi)

def vertical_disp(d_los, theta_deg):
    return d_los / np.cos(np.radians(theta_deg))

def altitude_ambiguity(lam, R, theta_deg, B_perp):
    return (lam * R * np.sin(np.radians(theta_deg))) / (2 * B_perp)

# Worked example
d_los = los_from_fringes(4.5)
d_vert = vertical_disp(d_los, 34)
ha = altitude_ambiguity(0.056, 700e3, 34, 45)

print(f"LOS displacement:    {d_los*100:.1f} cm")
print(f"Vertical subsidence: {d_vert*100:.1f} cm  ({d_vert*200:.1f} cm/yr)")
print(f"Altitude of ambiguity: {ha:.0f} m")
print(f"5m DEM error → {5/ha:.4f} fringe error (negligible)")

# Sensitivity
print(f"\nSentinel-1 C-band sensitivity:")
print(f"  1 fringe = {lam/2*100:.1f} cm LOS displacement")
print(f"  π/10 rad = {lam/40*1000:.1f} mm LOS displacement (noise floor)")
```

---

## 6. Visualization

<div data-viz="echarts" style="height:420px" data-options='{
  "title": {"text": "InSAR Displacement Sensitivity and Fringe Count vs Subsidence Rate", "textStyle": {"fontSize": 14}},
  "tooltip": {"trigger": "axis"},
  "legend": {"data": ["Sentinel-1 C (λ=5.6cm)", "Sentinel-1 C (λ=5.6cm, 1yr)"], "bottom": 0},
  "xAxis": {"name": "Subsidence rate (cm yr⁻¹)", "nameLocation": "middle", "nameGap": 30,
    "data": [1, 2, 5, 10, 20, 30, 50, 100]},
  "yAxis": {"name": "Fringes per year (2.8cm/fringe)", "nameLocation": "middle", "nameGap": 50},
  "series": [
    {
      "name": "Fringes per year (C-band)",
      "type": "bar",
      "data": [0.4, 0.7, 1.8, 3.6, 7.1, 10.7, 17.9, 35.7],
      "label": {"show": true, "position": "top", "formatter": function(p){return p.value.toFixed(1)}}
    }
  ]
}'></div>

Each fringe represents 2.8 cm of LOS displacement for Sentinel-1. Subsidence of 10 cm yr⁻¹ produces 3.6 fringes — easily counted in an interferogram. At very high rates (>50 cm yr⁻¹), fringes become densely packed and phase unwrapping becomes unreliable without supplementary data.

---

## 7. Interpretation

InSAR has fundamentally changed how Earth scientists monitor surface deformation. Before InSAR, measuring ground displacement required GPS benchmarks or levelling surveys — point measurements, expensive, sparse. InSAR delivers spatially continuous deformation maps at centimetre precision, covering thousands of square kilometres per image.

The applications span a wide range of hazards and processes. Earthquake deformation maps directly constrain fault slip models — the Northridge example used the fringe pattern to invert for fault geometry and average slip before field teams had reached most of the fault. Volcanic inflation at Yellowstone, Long Valley, and dozens of other calderas is routinely monitored by InSAR, providing early warning of magma movement. Groundwater extraction and aquifer compaction in California's Central Valley, Mexico City, and the North China Plain are mapped with mm yr⁻¹ precision, revealing which aquifer systems are losing permanent storage capacity.

The technique's limitation — line-of-sight sensitivity — is its primary constraint. A purely horizontal east-west displacement is nearly invisible to a polar-orbiting SAR (which has a mostly north-south flight track and an oblique look), while the same displacement magnitude oriented in the vertical would produce strong fringes. Combining ascending and descending orbit interferograms partially resolves this ambiguity, separating vertical from east-west deformation.

---

## 8. What Could Go Wrong?

**Atmospheric delays dominate over small deformation signals.** A 10 cm change in water vapour column height changes the microwave path delay by approximately 2–4 cm, comparable to the deformation signals of slow creep or inter-seismic strain. Single interferograms cannot separate atmospheric and deformation contributions. Time-series methods are essential for signals below $\sim 5$ cm.

**Phase unwrapping errors propagate.** An unwrapping error of $2\pi$ at one location (adding or removing one fringe incorrectly) propagates as a constant offset or a ramp across all pixels connected to that location by the unwrapping path. In rapidly deforming areas (post-seismic landslides, active volcanoes) where the phase gradient exceeds $\pi$ per pixel, unwrapping necessarily fails and the deformation field is only partially recoverable.

**Temporal decorrelation over vegetation.** In tropical and temperate forests, a 12-day Sentinel-1 repeat interval is often sufficient to decorrelate the signal — leaves move in the wind, vegetation grows, and the coherence falls below 0.3. Longer-wavelength L-band SAR (ALOS-2, NISAR) maintains coherence longer over vegetation because the longer wavelength is less sensitive to small-scale surface changes.

**Reference frame ambiguity.** InSAR measures relative displacement: the phase at each pixel is relative to a reference point assumed to be stable. If the reference point is itself deforming (a common problem in areas of broad subsidence), the apparent displacement pattern is systematically biased. Anchoring to GPS benchmarks or GNSS-consistent reference frames is essential for absolute displacement maps.

---

## 9. Summary

InSAR forms an interferogram by multiplying two complex SAR images to extract their phase difference. That phase difference encodes topographic height (from the baseline geometry), surface displacement (from the deformation term), and atmospheric delay. After removing topography using a DEM, the differential phase gives LOS displacement with $\lambda/40$ sensitivity — approximately 1–2 mm for C-band satellites.

Phase unwrapping recovers the integer ambiguity from the wrapped observations under the assumption of phase continuity. Coherence quantifies the reliability of the phase measurement — decorrelation over vegetation and over long time intervals limits the applicability of the technique. Time-series InSAR overcomes many single-interferogram limitations by exploiting the temporal structure of atmospheric noise and deformation signals across stacks of dozens to hundreds of images.

**Key equations:**

$$\Delta\phi_{\text{defo}} = -\frac{4\pi}{\lambda} d_{\text{LOS}} \quad \text{[deformation phase]}$$

$$\Delta\phi_{\text{topo}} = \frac{4\pi B_\perp h}{\lambda R \sin\theta_i} \quad \text{[topographic phase]}$$

$$h_a = \frac{\lambda R \sin\theta_i}{2 B_\perp} \quad \text{[altitude of ambiguity]}$$

$$\gamma = \frac{|\langle s_1 s_2^*\rangle|}{\sqrt{\langle|s_1|^2\rangle\langle|s_2|^2\rangle}} \quad \text{[coherence]}$$

---

## Math Refresher

**Phase and the complex exponential.** A signal $s = Ae^{j\phi} = A(\cos\phi + j\sin\phi)$ stores amplitude $A = |s|$ and phase $\phi = \arg(s)$. Multiplying two signals $s_1 e^{j\phi_1}$ and $s_2^* = s_2 e^{-j\phi_2}$ gives $s_1 s_2^* = A_1 A_2 e^{j(\phi_1-\phi_2)}$ — the product carries the phase difference. This is why interferogram formation is simply pixel-by-pixel complex multiplication: the absolute phases (huge numbers) cancel, leaving the difference (small, informative).

**Wrapping and modular arithmetic.** The wrapped phase $W[\phi] = \phi - 2\pi \lfloor(\phi+\pi)/(2\pi)\rfloor$ maps any real number to $(-\pi, \pi]$. Phase unwrapping is the inverse problem: given the wrapped values, recover the original. It is equivalent to the problem of determining which multiple of $2\pi$ to add at each pixel, given only the constraint that the unwrapped field is smooth.

**Line-of-sight projection.** For a satellite looking at incidence angle $\theta_i$ from vertical, the LOS unit vector has components $(\sin\theta_i, 0, \cos\theta_i)$ in the (east, north, up) frame (for a right-looking satellite on a descending pass). The LOS displacement is $d_{\text{LOS}} = \mathbf{d} \cdot \hat{\mathbf{LOS}}$ — the dot product of the 3D displacement vector with the LOS unit vector. For predominantly vertical motion: $d_{\text{LOS}} = d_v \cos\theta_i$, giving $d_v = d_{\text{LOS}}/\cos\theta_i$.
