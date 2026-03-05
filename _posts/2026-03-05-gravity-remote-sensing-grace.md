---
layout: essay
title: "Gravity Remote Sensing (GRACE)"
subtitle: "Weighing the water cycle from orbit: groundwater, ice sheets, and the changing geoid"
date: 2026-03-05
categories: modeling
series: computational-geography-laboratory
series_order: 58
cluster: "U — Geophysical Remote Sensing"
cluster_order: 1
tags: [math, viz, essay]
math: true
viz: true
math_core:
  - Newton's law of gravitation
  - spherical harmonics
  - mass-spring analogy
  - time-series analysis
spatial_reasoning: 3D mass distribution
dynamics: mass redistribution
computation: equivalent water height
domain: geodesy / hydrology
difficulty: 4
prerequisites:
  - F13
  - E12
notebook_url: https://github.com/waywardhouse/computational-geography-lab/tree/main/essays/U1-grace-gravimetry
excerpt: >
  Two satellites flying in formation 220 km apart can detect a change in the
  distance between them of a few micrometres — and from that measurement, infer
  that an aquifer beneath a desert has lost a cubic kilometre of water. GRACE turned
  this improbable idea into operational science. This essay derives how gravity
  variations translate into inter-satellite range-rate changes, explains the spherical
  harmonic representation of the gravity field, and applies the technique to
  groundwater depletion, ice sheet mass balance, and the geoid.
math_prerequisites: >
  Newton's law of gravitation. Exponential and trigonometric functions. The concept
  of a potential field is introduced from scratch. Spherical harmonics are described
  qualitatively — their mathematical form is given but not derived.
---

Beneath the fields of the Central Valley of California, one of the most productive agricultural regions on Earth, the aquifers are emptying. Satellite data from GRACE — the Gravity Recovery and Climate Experiment — showed that California lost approximately 4 cubic kilometres of groundwater per year during the 2011–2017 drought, a depletion rate visible from 500 km altitude because removing water from an aquifer literally makes the Earth slightly lighter, and that change in mass slightly weakens the gravitational field.

GRACE measured that weakening not by pointing a gravity sensor at the ground, but by measuring the distance between two satellites flying 220 km apart in the same orbit. When the lead satellite flew over a region of greater mass, it was pulled forward slightly; the following satellite, not yet over the mass anomaly, was pulled less — and the gap between them grew. That gap change, measured to micrometer precision by a microwave ranging system, is the gravity signal.

---

## 1. The Question

How does a mass anomaly on Earth's surface translate into a measurable change in the distance between two co-orbiting satellites? How do we convert those measurements into maps of water storage change? And what can those maps tell us about groundwater depletion, ice sheet loss, and sea level rise?

---

## 2. The Conceptual Model

The gravitational potential $V$ at a point in space depends on the distribution of mass below. Near the Earth's surface, variations in surface mass loading (water, ice, soil moisture) produce perturbations to $V$ that propagate upward into space with amplitudes that decrease with altitude and with spatial scale.

Two satellites in a near-circular orbit at altitude $h$ above a mass anomaly experience slightly different gravitational accelerations as they sequentially fly over it. The lead satellite is accelerated as it approaches the anomaly and decelerated as it passes over it; the following satellite does the same, but delayed by $\Delta t = L/V$ where $L$ is the inter-satellite separation and $V$ is orbital velocity. The net effect is a time-varying change in the range between them — the GRACE measurement.

The spatial resolution of the technique is limited by the orbital altitude (approximately 330 km during the GRACE mission): features smaller than roughly 300 km in horizontal extent are invisible because their gravitational perturbation at altitude is too small to measure.

---

## 3. Building the Mathematical Model

### 3.1 Gravitational Potential and Mass Anomalies

Newton's gravitational potential at position $\mathbf{r}$ due to a mass distribution $\rho(\mathbf{r}')$ is:

$$V(\mathbf{r}) = -G \int \frac{\rho(\mathbf{r}')}{|\mathbf{r} - \mathbf{r}'|} dV'$$

where $G = 6.674 \times 10^{-11}$ N m² kg⁻² is the gravitational constant.

For a thin surface mass layer with surface density $\Delta\sigma$ [kg m⁻²] (mass per unit area, e.g. a water layer of depth $\Delta h$ [m] has $\Delta\sigma = \rho_w \Delta h$), the perturbation to $V$ at satellite altitude $r$ is:

$$\Delta V(r, \theta, \phi) = -G \int \frac{\Delta\sigma(\theta', \phi')}{|\mathbf{r} - \mathbf{r}'|} dA'$$

This integral is evaluated most efficiently using **spherical harmonic expansion**.

### 3.2 Spherical Harmonic Representation

Any function on a sphere can be decomposed into spherical harmonics $Y_n^m(\theta, \phi)$ — the analogue of Fourier modes on a flat surface. The gravitational potential at radius $r$ outside a sphere of radius $R_\oplus$ is:

$$V(r,\theta,\phi) = \frac{GM_\oplus}{r}\sum_{n=0}^{\infty}\sum_{m=-n}^{n} \left(\frac{R_\oplus}{r}\right)^n C_n^m Y_n^m(\theta,\phi)$$

where:
- $n$ is the spherical harmonic degree (related to spatial scale: degree $n$ corresponds to a spatial wavelength of approximately $2\pi R_\oplus / n \approx 40{,}000/n$ km)
- $m$ is the order
- $C_n^m$ are the **Stokes coefficients** — the amplitudes of each harmonic component

A change in surface mass $\Delta\sigma$ produces a change in the Stokes coefficients $\Delta C_n^m$:

$$\Delta C_n^m = \frac{R_\oplus}{(2n+1)M_\oplus} \int \Delta\sigma(\theta,\phi) Y_n^m(\theta,\phi) \sin\theta \, d\theta \, d\phi$$

GRACE solves the inverse problem: from measured $\Delta C_n^m$, recover $\Delta\sigma$.

### 3.3 From Stokes Coefficients to Equivalent Water Height

The surface mass change is expressed as an **equivalent water height** $\Delta h_w$ [m], the depth of a uniform water layer whose mass equals the observed mass change:

$$\Delta h_w(\theta,\phi) = \frac{R_\oplus \rho_{\text{av}}}{3\rho_w} \sum_{n=1}^{N_{\max}} \sum_{m=-n}^{n} \frac{2n+1}{1+k_n} \Delta C_n^m Y_n^m(\theta,\phi)$$

where:
- $\rho_{\text{av}} = 5515$ kg m⁻³ is the mean density of the Earth
- $\rho_w = 1000$ kg m⁻³ is the density of fresh water
- $k_n$ are the **load Love numbers** — corrections for the elastic deformation of the solid Earth under the surface load (the Earth's crust flexes slightly under water/ice loads)
- $N_{\max} \approx 60$ is the maximum harmonic degree resolved by GRACE (corresponding to ~330 km spatial resolution)

The factor $(2n+1)/(1+k_n)$ accounts for the degree-dependent sensitivity of the gravity field to surface loading and the elastic response of the solid Earth.

### 3.4 The Range-Rate Observable

GRACE directly measures the **range rate** $\dot{\rho}$ [m s⁻¹] — the rate of change of the distance between the two satellites. The relationship between range rate and gravitational potential difference is, to first order:

$$\dot{\rho} \approx \frac{1}{V_{\text{orb}}} \left[V(\mathbf{r}_2) - V(\mathbf{r}_1)\right] + \text{non-gravitational corrections}$$

where $V_{\text{orb}} \approx 7600$ m s⁻¹ is the orbital velocity and $\mathbf{r}_1$, $\mathbf{r}_2$ are the positions of the two satellites. Non-gravitational accelerations (atmospheric drag, solar radiation pressure) are measured by onboard accelerometers and removed.

The precision of the K-Band Ranging (KBR) system on GRACE was approximately 0.1 μm s⁻¹ in range rate, corresponding to gravitational potential differences of $\Delta V = V_{\text{orb}} \times 0.1 \times 10^{-6} \approx 7.6 \times 10^{-4}$ m² s⁻², and to equivalent water height changes of approximately **1–2 cm** over 400 km spatial scales.

### 3.5 Spatial Filtering and the Gibbs Phenomenon

Truncating the spherical harmonic series at $N_{\max} = 60$ produces ringing artefacts (Gibbs phenomenon) around sharp mass boundaries — similar to the ringing that appears when you try to represent a step function with a finite Fourier series. The standard remedy is to apply an isotropic Gaussian smoothing filter with radius $r_f$ [km]:

$$W_n = \exp\!\left(-n(n+1)\sigma_f^2/2\right), \quad \sigma_f = \frac{r_f/R_\oplus}{\sqrt{2\ln 2}}$$

A 500 km Gaussian filter eliminates most ringing at the cost of further smoothing the signal. This trade-off between resolution and noise is the central challenge of GRACE data processing — no smoothing gives noisy maps; too much smoothing blurs the signal.

### 3.6 Mass Budget Components

The total surface mass change in a region combines hydrological, cryospheric, and solid-earth signals:

$$\Delta\sigma_{\text{total}} = \Delta\sigma_{\text{TWS}} + \Delta\sigma_{\text{GIA}} + \Delta\sigma_{\text{atm}} + \varepsilon$$

where:
- $\Delta\sigma_{\text{TWS}}$ is terrestrial water storage change (groundwater, soil moisture, snow, surface water)
- $\Delta\sigma_{\text{GIA}}$ is the glacial isostatic adjustment signal — ongoing uplift of the solid Earth since the last ice age, which produces a gravity change unrelated to current water or ice
- $\Delta\sigma_{\text{atm}}$ is the atmospheric pressure loading (typically removed using reanalysis data before scientific analysis)

For ice sheet studies, GIA is the dominant systematic error — Greenland and Antarctica are still experiencing GIA from deglaciation 10,000 years ago, producing apparent gravity trends of 1–3 mm yr⁻¹ in equivalent water height that must be modelled and removed to isolate present-day ice mass loss.

---

## 4. Worked Example by Hand

**Setting:** We want to estimate the order-of-magnitude gravitational perturbation from the loss of 1 km³ of water from an aquifer, and compare it to the GRACE detection threshold.

**Given:**
- Aquifer area: $A = 50{,}000$ km² = $5 \times 10^{10}$ m² (roughly the size of the Central Valley)
- Volume loss: $\Delta V_w = 1$ km³ = $10^9$ m³
- Water density: $\rho_w = 1000$ kg m⁻³
- Satellite altitude: $h = 500$ km above the surface

**Step 1: Equivalent water height**

$$\Delta h_w = \frac{\Delta V_w}{A} = \frac{10^9 \text{ m}^3}{5 \times 10^{10} \text{ m}^2} = 0.02 \text{ m} = 2 \text{ cm}$$

**Step 2: Surface mass change**

$$\Delta\sigma = \rho_w \Delta h_w = 1000 \times 0.02 = 20 \text{ kg m}^{-2}$$

**Step 3: Gravitational acceleration perturbation at satellite altitude**

For a disk-shaped mass anomaly of radius $a \approx \sqrt{A/\pi} = 126$ km and surface density $\Delta\sigma$, the gravitational acceleration directly above at altitude $h$ is approximately:

$$\Delta g \approx 2\pi G \Delta\sigma \left(1 - \frac{h}{\sqrt{h^2 + a^2}}\right)$$

$$= 2\pi \times 6.674 \times 10^{-11} \times 20 \times \left(1 - \frac{500}{\sqrt{500^2 + 126^2}}\right)$$

$$= 8.385 \times 10^{-9} \times \left(1 - \frac{500}{515.7}\right)$$

$$= 8.385 \times 10^{-9} \times 0.0304 = 2.55 \times 10^{-10} \text{ m s}^{-2}$$

**Step 4: Range rate change over 10 s**

As the lead satellite passes over the anomaly, it experiences this acceleration differential over an approximate time $t \approx a/V_{\text{orb}} = 126{,}000/7600 = 16.6$ s:

$$\Delta\dot{\rho} \approx \Delta g \times (a/V_{\text{orb}}) = 2.55 \times 10^{-10} \times 16.6 = 4.2 \times 10^{-9} \text{ m s}^{-1}$$

This is $4.2 \times 10^{-3}$ μm s⁻¹ — below GRACE's 0.1 μm s⁻¹ noise floor for a single pass. However, GRACE accumulated $\sim 130$ passes per month over a given region, and the monthly average improved sensitivity by $\sqrt{130} \approx 11\times$, bringing the effective threshold to $\sim 0.009$ μm s⁻¹ — just barely detecting the 2 cm equivalent water height anomaly.

This explains why GRACE needed monthly averaging to detect groundwater signals, and why its spatial resolution is coarse: the signal-to-noise ratio for a given mass anomaly improves with the square root of the number of independent passes.

---

## 5. Computational Implementation

```
function equivalent_water_height(delta_stokes, n_max=60, r_filter_km=500):
    # Apply Love number correction and Gaussian filter
    for each degree n, order m:
        W_n = gaussian_weight(n, r_filter_km)
        Ks_n = (2*n+1) / (1 + k_n[n])      # k_n from Love number table
        contribution[n,m] = delta_stokes[n,m] * Ks_n * W_n
    # Synthesise field on latitude-longitude grid
    delta_h = (R_earth * rho_av) / (3 * rho_w) * sum_harmonics(contribution)
    return delta_h

function mass_budget(delta_h_mm, area_km2, rho=1000):
    # Convert mm EWH over an area to Gt
    volume_m3 = (delta_h_mm / 1000) * (area_km2 * 1e6)
    mass_kg   = rho * volume_m3
    return mass_kg / 1e12  # Gt
```

```{pyodide}
import numpy as np

G = 6.674e-11
rho_w = 1000

def ewh_to_mass_Gt(ewh_mm, area_km2):
    """Convert equivalent water height (mm) over area (km²) to Gt."""
    vol = (ewh_mm / 1000) * (area_km2 * 1e6)  # m³
    return rho_w * vol / 1e12  # Gt

def gravity_anomaly_disk(sigma_kg_m2, a_km, h_km):
    """Gravitational acceleration above centre of disk at altitude h."""
    a, h = a_km * 1e3, h_km * 1e3
    return 2 * np.pi * G * sigma_kg_m2 * (1 - h / np.sqrt(h**2 + a**2))

# Central Valley example
ewh = 2.0  # cm
sigma = rho_w * ewh / 100
a_km = np.sqrt(50000 / np.pi)
dg = gravity_anomaly_disk(sigma, a_km, 500)
print(f"Surface mass change: {sigma:.1f} kg/m²  (={ewh}cm EWH)")
print(f"Gravity perturbation at 500km: {dg:.3e} m/s²")

# Annual loss examples (published GRACE results, approximate)
print("\nGRACE-observed mass trends (approx.):")
regions = [("Greenland ice sheet", -280, 1.7e6), 
           ("Antarctic ice sheet", -150, 14e6),
           ("Central Valley CA",   -4,   52000)]
for name, rate_Gt_yr, area in regions:
    ewh_rate = rate_Gt_yr * 1e12 / (rho_w * area * 1e6) * 1000  # mm/yr
    print(f"  {name}: {rate_Gt_yr:+d} Gt/yr  ≈ {ewh_rate:.1f} mm/yr EWH")
```

---

## 6. Visualization

<div data-viz="echarts" style="height:420px" data-options='{
  "title": {"text": "GRACE-Observed Water Storage Trends — Selected Regions (approx.)", "textStyle": {"fontSize": 14}},
  "tooltip": {"trigger": "axis"},
  "xAxis": {"type": "category",
    "data": ["Greenland", "W. Antarctica", "E. Antarctica", "Amazon basin", "Central Valley CA", "North India", "Tigris-Euphrates", "Patagonia"],
    "axisLabel": {"rotate": 25}},
  "yAxis": {"name": "Mass trend (Gt yr⁻¹)", "nameLocation": "middle", "nameGap": 55},
  "series": [{
    "name": "Mass trend",
    "type": "bar",
    "data": [
      {"value": -280, "itemStyle": {"color": "#F44336"}},
      {"value": -150, "itemStyle": {"color": "#F44336"}},
      {"value": -40,  "itemStyle": {"color": "#FF9800"}},
      {"value":  60,  "itemStyle": {"color": "#2196F3"}},
      {"value":  -4,  "itemStyle": {"color": "#FF5722"}},
      {"value": -54,  "itemStyle": {"color": "#F44336"}},
      {"value": -20,  "itemStyle": {"color": "#FF9800"}},
      {"value": -25,  "itemStyle": {"color": "#FF9800"}}
    ]
  }]
}'></div>

Red bars indicate mass loss; blue indicates gain. The Greenland and Antarctic ice sheets dominate the global mass balance, collectively contributing ~430 Gt yr⁻¹ to sea level rise. Regional groundwater depletion in India and the Tigris-Euphrates basin — invisible to optical sensors — is clearly resolved by GRACE at the basin scale.

---

## 7. Interpretation

GRACE changed what we know about the water cycle at the continental scale. Before GRACE, continental water storage change was inferred indirectly from runoff measurements and model simulations. GRACE observed it directly, revealing that:

- The Greenland ice sheet's contribution to sea level rise accelerated from ~50 Gt yr⁻¹ in 2002 to ~280 Gt yr⁻¹ by 2012, with strong seasonal and interannual variability.
- North India's Indo-Gangetic aquifer is depleting at ~54 Gt yr⁻¹ — a rate that, if sustained, will exhaust the accessible portion of the aquifer within decades, threatening food security for hundreds of millions of people.
- The 2011–2017 California drought produced a groundwater deficit detectable from orbit, providing data that eventually fed into state-level groundwater management legislation.

The geoid — the equipotential surface of the Earth's gravity field that would correspond to mean sea level if the ocean were at rest — is also measured by GRACE. Changes in the geoid over time directly reflect the redistribution of mass. Melting glaciers lower the local geoid over Greenland and Antarctica (less mass pulling the ocean toward the poles), while water storage increase in low-latitude aquifers raises the geoid above them. These geoid changes affect regional sea level beyond the globally averaged contribution.

---

## 8. What Could Go Wrong?

**GIA contamination.** Post-glacial isostatic adjustment produces gravity changes comparable in magnitude to present-day ice mass change over Greenland and Antarctica. GIA models have uncertainties of 15–30% in these regions — a dominant source of uncertainty in ice sheet mass balance estimates.

**Signal leakage.** The truncation of spherical harmonics at degree 60 causes mass signals to leak across basin boundaries. A concentrated mass anomaly in a small catchment appears spread over a larger area in the GRACE solution. Mascon approaches (fitting discrete mass concentrations rather than spherical harmonics) partially address this but introduce different regularisation choices.

**Ocean-land leakage.** Coastal aquifer and ice sheet signals leak into adjacent ocean grids and vice versa. For small coastal glaciers, the leakage correction can be as large as the signal itself. Careful forward modelling of adjacent ocean and land mass changes is required.

**Temporal aliasing.** GRACE produces monthly solutions, but sub-monthly mass variations (tides, rapid hydrological events) are not fully resolved. These aliases appear as spurious stripes in GRACE solutions — a systematic pattern in the north-south direction due to the polar orbital geometry. De-striping filters remove them at the cost of smoothing the signal.

---

## 9. Summary

GRACE measured Earth's changing gravity field by tracking the inter-satellite range rate between two co-orbiting spacecraft to micrometer-per-second precision. Mass changes on Earth's surface — in aquifers, ice sheets, soils, and lakes — perturb the gravitational potential and produce measurable range-rate anomalies as the satellites fly over.

The spherical harmonic decomposition converts range-rate measurements into maps of Stokes coefficient changes, which are then converted to equivalent water height anomalies using Love number corrections and Gaussian spatial filtering. The result is a monthly time series of surface mass change at ~330 km spatial resolution, sensitive to changes of approximately 1–2 cm in equivalent water height.

GRACE and its successor GRACE-FO (launched 2018) have become indispensable for monitoring global water and ice mass budgets — providing the observational backbone for quantifying contributions to sea level rise, detecting aquifer depletion before it becomes critical, and tracking the hydrological fingerprints of climate change.

**Key equations:**

$$\Delta h_w = \frac{R_\oplus \rho_{\text{av}}}{3\rho_w}\sum_{n,m}\frac{2n+1}{1+k_n}\Delta C_n^m Y_n^m \quad \text{[EWH from Stokes coefficients]}$$

$$h_a = \frac{\lambda R \sin\theta_i}{2B_\perp} \quad \text{[not applicable here — see InSAR]}$$

$$\Delta g_{\text{disk}} = 2\pi G \Delta\sigma \left(1 - \frac{h}{\sqrt{h^2 + a^2}}\right) \quad \text{[gravity of disk anomaly]}$$

---

## Math Refresher

**Gravitational potential vs. acceleration.** The gravitational potential $V$ [m² s⁻²] is the potential energy per unit mass. Gravitational acceleration $\mathbf{g}$ is the gradient of $V$: $\mathbf{g} = \nabla V$ (or $g = dV/dr$ in the radial direction). The potential decreases as $1/r$ with distance; acceleration decreases as $1/r^2$. GRACE measures potential differences (via range rate) rather than accelerations directly — this is important because the potential from a surface mass decreases more slowly with altitude than the acceleration, making it slightly easier to detect at satellite altitude.

**Spherical harmonics as latitude-longitude modes.** Just as a Fourier series decomposes a 1D periodic function into $\sin$ and $\cos$ modes, spherical harmonics decompose a function on a sphere into modes indexed by degree $n$ (related to total spatial wavenumber) and order $m$ (related to the east-west wavenumber). Degree 1 harmonics represent a dipole (shift of the Earth's centre of mass); degree 2, quadrupole patterns; higher degrees, increasingly fine spatial structures. GRACE resolves up to degree ~60, corresponding to spatial wavelengths of $\geq 40{,}000/60 \approx 670$ km.

**Why Gaussian smoothing?** The spherical harmonic coefficients from GRACE become increasingly noisy at high degrees because the gravity signal decreases with altitude faster than the noise. High-degree coefficients ($n > 40$) are dominated by noise. The Gaussian filter $W_n \propto e^{-n^2\sigma_f^2/2}$ downweights high-degree terms exponentially — a sensible choice because the noise grows approximately exponentially with degree while the physical signal decays approximately exponentially.
