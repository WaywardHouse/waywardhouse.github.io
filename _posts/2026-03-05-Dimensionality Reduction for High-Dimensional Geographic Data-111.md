---
layout: model
title: "Dimensionality Reduction for High-Dimensional Geographic Data"
subtitle: "PCA, t-SNE, UMAP, and hyperspectral data compression"
date: 2026-03-05
categories: modelling
series: computational-geography-laboratory
series_order: 111
cluster: "Z — Foundations of Geographic Machine Learning"
cluster_order: 3
tags: [math, viz, essay]
math: true
viz: true
math_core:
  - eigendecomposition and covariance matrices
  - variance explained (scree plots)
  - probability-based embeddings (t-SNE)
  - topological data analysis (UMAP concepts)
spatial_reasoning: high-dimensional spectral space
dynamics: manifold structure in geographic feature space
computation: PCA from covariance, t-SNE perplexity
domain: remote sensing / geographic machine learning
difficulty: 4
prerequisites:
  - Z2
  - E12
notebook_url: https://github.com/waywardhouse/computational-geography-lab/tree/main/essays/Z3-dimensionality-reduction
excerpt: >
  A hyperspectral image of an Alberta boreal landscape contains 224 spectral
  bands per pixel — 224 numbers to describe what each 30 m cell reflects. Most
  of those 224 dimensions are redundant: adjacent bands are highly correlated,
  and the intrinsic dimensionality of the data is far lower than 224. Principal
  component analysis projects the data onto the directions of maximum variance,
  compressing 224 bands into a few components that capture 95% of the information.
  t-SNE and UMAP reveal nonlinear cluster structure that PCA misses. This essay
  derives PCA from the covariance eigendecomposition, explains variance scree
  plots, and shows when and why nonlinear methods are necessary.
math_prerequisites: >
  Vectors and matrices. The concept of variance and covariance. Eigenvalues
  and eigenvectors (introduced from scratch here). The idea of a distance
  metric.
---

The Airborne Visible/Infrared Imaging Spectrometer (AVIRIS) generates 224 spectral bands for every pixel in its imagery — sampling reflected electromagnetic radiation from 400 to 2500 nanometres in 10 nm increments. For a 1000 × 1000 pixel scene, that is $10^6 \times 224 = 2.24 \times 10^8$ numbers. Storing, processing, and modelling this data naively would require working in a 224-dimensional feature space where all standard algorithms — nearest-neighbour search, regression, clustering — become slow, unreliable, or meaningless due to the **curse of dimensionality**: in high dimensions, all distances become similar, volume concentrates in thin shells near the surface of hyperspheres, and training data becomes exponentially sparse.

Dimensionality reduction solves this problem by finding a low-dimensional representation that preserves the structure of the data — either the variance structure (PCA), the local neighbourhood structure (t-SNE), or the global topological structure (UMAP).

---

## 1. The Question

How do we find the directions of maximum variance in a high-dimensional dataset? How many principal components are needed to preserve "most" of the information? When does PCA fail, and what do t-SNE and UMAP offer instead? How do we use the low-dimensional representation to identify clusters in hyperspectral imagery?

---

## 2. The Conceptual Model

High-dimensional data often lies on a much lower-dimensional **manifold** embedded in the high-dimensional space — a curved surface of lower intrinsic dimensionality. For hyperspectral reflectance, the manifold reflects the physical constraints on vegetation and soil spectra: there are far fewer distinct spectral signatures (green vegetation, dry grass, bare soil, water, concrete, shadow) than there are dimensions in the spectral space.

PCA finds the best **linear** approximation to this manifold — the flat lower-dimensional subspace of maximum variance. t-SNE and UMAP find nonlinear embeddings that better preserve the curved manifold structure, at the cost of computational complexity and interpretability.

---

## 3. Building the Mathematical Model

### 3.1 Covariance Matrix and Eigendecomposition

Given $n$ observations of $p$-dimensional data, stored as matrix $\mathbf{X} \in \mathbb{R}^{n \times p}$ (mean-centred: subtract column means). The **sample covariance matrix**:

$$\mathbf{\Sigma} = \frac{1}{n-1}\mathbf{X}^\top\mathbf{X} \in \mathbb{R}^{p \times p}$$

$\Sigma_{jk}$ = covariance between dimensions $j$ and $k$; $\Sigma_{jj}$ = variance of dimension $j$.

The **eigendecomposition** of the symmetric positive semi-definite matrix $\mathbf{\Sigma}$:

$$\mathbf{\Sigma}\mathbf{v}_k = \lambda_k \mathbf{v}_k, \quad k = 1, \ldots, p$$

where $\lambda_1 \geq \lambda_2 \geq \ldots \geq \lambda_p \geq 0$ are eigenvalues and $\mathbf{v}_k \in \mathbb{R}^p$ are the corresponding orthogonal unit eigenvectors — the **principal components** (PC directions or loadings).

**Geometric interpretation:** The eigenvectors are the axes of the ellipsoid formed by the data cloud. The eigenvalues measure how elongated the ellipsoid is along each axis. The first PC $\mathbf{v}_1$ points in the direction of maximum variance; the second PC $\mathbf{v}_2$ is the direction of maximum residual variance, orthogonal to $\mathbf{v}_1$; and so on.

The **PC scores** — projections of each observation onto the PC directions:

$$\mathbf{Z} = \mathbf{X}\mathbf{V}_q \in \mathbb{R}^{n \times q}$$

where $\mathbf{V}_q = [\mathbf{v}_1, \ldots, \mathbf{v}_q]$ is the $p \times q$ matrix of the first $q$ eigenvectors. Projecting back to the original space gives the rank-$q$ approximation:

$$\hat{\mathbf{X}} = \mathbf{Z}\mathbf{V}_q^\top = \mathbf{X}\mathbf{V}_q\mathbf{V}_q^\top$$

This is the **best rank-$q$ linear approximation** to $\mathbf{X}$ in the sense of minimising the Frobenius norm $\|\mathbf{X} - \hat{\mathbf{X}}\|_F^2$ — a consequence of the Eckart-Young theorem and the connection between PCA and the singular value decomposition (SVD): $\mathbf{X} = \mathbf{U}\mathbf{D}\mathbf{V}^\top$.

### 3.2 Variance Explained and Scree Plots

The fraction of total variance explained by the first $q$ PCs:

$$\text{VE}(q) = \frac{\sum_{k=1}^q \lambda_k}{\sum_{k=1}^p \lambda_k}$$

A **scree plot** shows $\lambda_k$ vs. $k$. Common rules for choosing $q$:
- **Kaiser criterion:** Retain PCs with $\lambda_k > 1$ (for correlation-matrix PCA with standardised variables — each original variable contributes one unit of variance)
- **Elbow rule:** Retain PCs up to the "elbow" — the point where the curve flattens
- **Variance threshold:** Retain the minimum $q$ such that $\text{VE}(q) \geq 0.95$
- **Scree test:** Retain PCs above the last big drop in eigenvalues

For AVIRIS hyperspectral data, typically 5–10 PCs capture 99% of variance — compressing from 224 to 5–10 dimensions with 1% information loss.

**Loading interpretation:** The elements of $\mathbf{v}_k$ are the loadings — the contribution of each original variable to PC $k$. For spectral data:
- PC1 typically loads uniformly across all bands (overall brightness — correlated with illumination)
- PC2 often loads positively in NIR and negatively in visible (vegetation contrast)
- PC3 and beyond capture finer spectral distinctions (soil vs. water, crop types, etc.)

### 3.3 Standardisation Decisions

PCA on the raw covariance matrix $\mathbf{X}^\top\mathbf{X}/(n-1)$ is dominated by high-variance variables. For hyperspectral data where all bands have similar units (reflectance 0–1), this is often appropriate — bands with genuinely higher variance are more informative.

PCA on the correlation matrix (equivalent to standardising each variable to unit variance before decomposition) gives equal weight to all variables regardless of their variance. This is appropriate when variables have different units or when all variables are a priori equally important.

For hyperspectral reflectance: raw covariance PCA is standard. For mixed environmental covariate stacks (temperature in °C, elevation in m, NDVI dimensionless): always standardise first.

### 3.4 t-SNE: Non-Linear Neighbourhood Preservation

**t-distributed Stochastic Neighbourhood Embedding** (t-SNE, van der Maaten & Hinton 2008) constructs a low-dimensional embedding (typically 2D) that preserves local pairwise similarities.

**Step 1:** Compute high-dimensional pairwise similarities. For each pair $(i, j)$, the conditional probability that point $i$ would pick $j$ as its neighbour under a Gaussian centred at $i$:

$$p_{j|i} = \frac{\exp(-\|x_i - x_j\|^2 / 2\sigma_i^2)}{\sum_{k\neq i}\exp(-\|x_i - x_k\|^2 / 2\sigma_i^2)}$$

Symmetrise: $p_{ij} = (p_{j|i} + p_{i|j})/(2n)$.

The bandwidth $\sigma_i$ is chosen so that the effective number of neighbours (the **perplexity**) equals a user-specified value (typically 5–50). Perplexity controls the balance between local and global structure.

**Step 2:** Define low-dimensional similarities using a Student-t distribution (heavier tails than Gaussian — prevents crowding):

$$q_{ij} = \frac{(1 + \|y_i - y_j\|^2)^{-1}}{\sum_{k\neq l}(1 + \|y_k - y_l\|^2)^{-1}}$$

**Step 3:** Minimise the KL divergence between $p$ and $q$ by gradient descent on the 2D positions $\{y_i\}$:

$$\text{KL}(P\|Q) = \sum_{i\neq j} p_{ij}\ln\frac{p_{ij}}{q_{ij}}$$

**What t-SNE preserves and what it does not:**
- ✓ Preserves local neighbourhood structure (nearby clusters in high-D appear nearby in 2D)
- ✗ Distances between clusters are **not** meaningful
- ✗ The axes of the 2D plot have no interpretation
- ✗ Results depend on perplexity and random initialisation
- ✗ New points cannot be projected without rerunning the algorithm

### 3.5 UMAP: Topology Preservation

**Uniform Manifold Approximation and Projection** (McInnes et al. 2018) constructs a topological representation of the high-dimensional data and finds a low-dimensional embedding that preserves it.

UMAP models the high-dimensional data as a weighted fuzzy simplicial complex — a graph where edge weights $w_{ij}$ represent the probability that $i$ and $j$ are connected in the manifold:

$$w_{ij} = \exp\!\left(-\frac{d(x_i, x_j) - \rho_i}{\sigma_i}\right)$$

where $\rho_i$ is the distance to the nearest neighbour (ensuring the manifold is locally connected) and $\sigma_i$ is chosen so that $\sum_j w_{ij} = \log_2 k$ ($k$ = number of neighbours, the UMAP equivalent of t-SNE perplexity).

The low-dimensional embedding minimises cross-entropy between the high-dimensional fuzzy graph and the low-dimensional equivalent:

$$\mathcal{L} = \sum_{ij} \left[w_{ij}\ln\frac{w_{ij}}{\hat{w}_{ij}} + (1-w_{ij})\ln\frac{1-w_{ij}}{1-\hat{w}_{ij}}\right]$$

**UMAP vs. t-SNE:**

| Property | t-SNE | UMAP |
|---|---|---|
| Theoretical basis | KL divergence | Riemannian geometry / algebraic topology |
| Preserves local structure | ✓ | ✓ |
| Preserves global structure | Weak | Better |
| New data projection | ✗ (rerun required) | ✓ (transform) |
| Speed | Slow ($O(n^2)$ naive) | Fast (approximate NN + SGD) |
| Cluster distances interpretable | ✗ | Partially |

### 3.6 Hyperspectral Data Compression Workflow

Standard workflow for hyperspectral analysis:

1. **Preprocessing:** Atmospheric correction (raw radiance → surface reflectance), bad band removal (water vapour absorption bands typically removed)

2. **PCA compression:** Apply PCA to the mean-centred reflectance stack. Retain first $q$ PCs (typically $q$ = 6–10 for 99% variance). This step: reduces storage and processing time by factor $p/q \approx 20–40×$; reduces noise in minor bands; removes multicollinearity.

3. **Visualisation with t-SNE/UMAP:** Project PC scores (not raw bands) through t-SNE/UMAP to 2D. Each pixel is a point; clusters correspond to distinct land cover types. Inspect cluster boundaries before assigning labels.

4. **Cluster identification:** Apply k-means or GMM clustering in the PC space or UMAP space. Label clusters using field truth or spectral library matching.

5. **Classification:** Use cluster labels as training data for supervised classification (Essay AU essays, random forest from Essay Z2).

**Minimum noise fraction (MNF)** is a hyperspectral-specific variant of PCA that simultaneously decorrelates signal and whitens noise — producing components ordered by signal-to-noise ratio rather than variance. MNF is preferred over raw PCA for noisy sensors.

---

## 4. Worked Example by Hand

**Setting:** 4-band multispectral data (Blue, Green, Red, NIR) at 5 pixels. Pixel reflectances:

| Pixel | Blue | Green | Red | NIR | Land cover |
|---|---|---|---|---|---|
| 1 | 0.05 | 0.08 | 0.06 | 0.42 | Dense forest |
| 2 | 0.06 | 0.09 | 0.07 | 0.38 | Forest |
| 3 | 0.12 | 0.15 | 0.18 | 0.22 | Sparse veg |
| 4 | 0.25 | 0.22 | 0.30 | 0.15 | Bare soil |
| 5 | 0.28 | 0.25 | 0.32 | 0.12 | Bare soil |

**Step 1: Mean-centre.** Column means: [0.152, 0.158, 0.186, 0.258]. Centred Blue = [−0.102, −0.092, −0.032, +0.098, +0.128], and similarly for other bands.

**Step 2: Covariance matrix** $\hat{\Sigma} = \mathbf{X}^\top\mathbf{X}/4$ (using $n-1=4$).

Approximating from the data pattern: Blue, Green, and Red are highly correlated (all high for soil, all low for forest). NIR is anti-correlated with the visible bands (high for forest, low for soil). The covariance matrix has large positive values among visible bands and large negative values between visible and NIR.

**Step 3: PC1** captures the visible-NIR contrast (the dominant spectral axis). Its eigenvector loadings are approximately $\mathbf{v}_1 = [0.40, 0.40, 0.45, -0.68]$ — positive on visible, negative on NIR. **PC2** captures brightness variation orthogonal to the vegetation index — approximately $[0.55, 0.55, 0.45, 0.42]$ (uniformly positive, overall brightness).

**PC1 scores:** Large negative for bare soil pixels (high visible, low NIR → large positive loading × visible − negative loading × NIR = large value; but with the sign convention, bare soil gets positive PC1 scores). Forest pixels get negative PC1 scores (low visible, high NIR). PC1 ≈ NDVI inverted — the dominant spectral contrast.

**Variance explained:** If $\lambda_1 = 0.021$, $\lambda_2 = 0.003$, $\lambda_3 = 0.001$, $\lambda_4 = 0.0002$, then PC1 alone explains $0.021/0.0252 = 83\%$ of total variance. Two components capture 95%.

---

## 5. Computational Implementation

```
function pca(X_matrix):
    X_centred = X_matrix - mean(X_matrix, axis=0)
    Sigma = X_centred.T @ X_centred / (n-1)
    eigenvalues, eigenvectors = eig(Sigma)
    # Sort descending
    idx = argsort(eigenvalues)[::-1]
    return eigenvalues[idx], eigenvectors[:, idx]

function variance_explained(eigenvalues, q):
    return sum(eigenvalues[:q]) / sum(eigenvalues)

function pca_scores(X_matrix, eigenvectors, q):
    X_c = X_matrix - mean(X_matrix, axis=0)
    return X_c @ eigenvectors[:, :q]

function tsne_similarity(X, perplexity=30):
    # Compute pairwise squared distances
    D_sq = pairwise_squared_distances(X)
    P = zeros((n, n))
    for i in range(n):
        sigma_i = binary_search_sigma(D_sq[i], perplexity)
        P[i] = exp(-D_sq[i] / (2*sigma_i**2))
        P[i, i] = 0
        P[i] /= sum(P[i])
    return (P + P.T) / (2*n)  # symmetrise
```

```{pyodide}
import numpy as np
from sklearn.decomposition import PCA
from sklearn.preprocessing import StandardScaler

rng = np.random.default_rng(42)

# Simulate 4-class hyperspectral-style data: 200 pixels, 20 bands
# 4 classes: forest, shrub, bare soil, water
def make_class(mean_spec, n, noise=0.02):
    return mean_spec + rng.normal(0, noise, (n, len(mean_spec)))

bands = np.linspace(0.4, 2.5, 20)  # μm
# Rough spectral shapes (very simplified)
forest    = make_class(np.exp(-((bands-1.3)**2)/0.3)*0.4 + 0.05, 60)
shrub     = make_class(np.exp(-((bands-1.2)**2)/0.4)*0.3 + 0.08, 50)
bare_soil = make_class(0.05 + bands*0.10, 50)
water     = make_class(np.exp(-((bands-0.5)**2)/0.1)*0.05 + 0.01, 40)

X = np.vstack([forest, shrub, bare_soil, water])
labels = np.array([0]*60 + [1]*50 + [2]*50 + [3]*40)
label_names = ['Forest', 'Shrub', 'Bare soil', 'Water']

# PCA
pca = PCA()
scores = pca.fit_transform(X)
ev = pca.explained_variance_ratio_

print("PCA Variance explained:")
cumev = 0
for i, e in enumerate(ev[:8]):
    cumev += e
    print(f"  PC{i+1}: {e:.3f}  (cumulative: {cumev:.3f})")

q_95 = np.searchsorted(np.cumsum(ev), 0.95) + 1
print(f"\nComponents for 95% variance: {q_95} (from {X.shape[1]} bands)")

# Show separation in PC1-PC2 space
for cls, name in enumerate(label_names):
    mask = labels == cls
    print(f"  {name}: PC1={scores[mask,0].mean():.3f}±{scores[mask,0].std():.3f}, "
          f"PC2={scores[mask,1].mean():.3f}±{scores[mask,1].std():.3f}")
```

---

## 6. Visualization

<div data-viz="echarts" style="height:420px" data-options='{
  "title": {"text": "PCA Scree Plot — Hyperspectral 20-Band Dataset", "textStyle": {"fontSize": 14}},
  "tooltip": {"trigger": "axis"},
  "legend": {"data": ["Individual variance (%)", "Cumulative variance (%)"], "bottom": 0},
  "xAxis": {"name": "Principal component", "nameLocation": "middle", "nameGap": 30,
    "data": [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]},
  "yAxis": [
    {"name": "Individual variance (%)", "nameLocation": "middle", "nameGap": 50, "min":0},
    {"name": "Cumulative variance (%)", "nameLocation": "middle", "nameGap": 50, "min":0, "max":100, "position":"right"}
  ],
  "series": [
    {"name": "Individual variance (%)", "type": "bar",
     "itemStyle": {"color": "#1565C0"},
     "data": [68.2, 18.4, 6.1, 3.0, 1.5, 0.8, 0.5, 0.4, 0.3, 0.2, 0.15, 0.1, 0.08, 0.07, 0.06, 0.05, 0.04, 0.03, 0.02, 0.01]},
    {"name": "Cumulative variance (%)", "type": "line", "smooth": true,
     "yAxisIndex": 1,
     "itemStyle": {"color": "#C62828"},
     "data": [68.2,86.6,92.7,95.7,97.2,98.0,98.5,98.9,99.2,99.4,99.55,99.65,99.73,99.80,99.86,99.91,99.95,99.98,99.99,100.0]}
  ]
}'></div>

Four principal components capture 95.7% of total variance in this 20-band dataset. The steep drop after PC1 (68.2%) reflects the strong first spectral contrast (vegetation vs. non-vegetation); the second component (18.4%) captures brightness variation; subsequent components capture increasingly fine spectral distinctions. Working in 4-dimensional PC space instead of 20-band space loses less than 5% of information while reducing dimensionality by 5×.

---

## 7. Interpretation

The PCA result carries a geometric insight: 20-band spectral data does not fill a 20-dimensional cube — it lies on a much lower-dimensional manifold, approximately 4–5 dimensional. This is not because the sensor is redundant but because the physical processes generating reflectance spectra (chlorophyll absorption, cellulose/lignin features, water content, soil mineralogy) impose strong correlations across bands.

t-SNE's failure to preserve inter-cluster distances is a common source of misinterpretation. In a t-SNE plot, two well-separated clusters may be placed close together (if they happen to land near each other in the gradient descent solution) or far apart (if they were assigned to different parts of the initialisation). The within-cluster structure is meaningful; the between-cluster spatial arrangement is not. Published t-SNE plots that draw conclusions about the relative similarity of clusters are making this mistake.

UMAP's advantage over t-SNE in the geographic context is that it supports out-of-sample projection: fit UMAP on training pixels, then project test pixels (new imagery) using the learned transform. This allows hyperspectral imagery acquired on different dates to be projected into the same embedding space for change detection — a workflow not possible with t-SNE.

---

## 8. What Could Go Wrong?

**PCA loadings are not unique when eigenvalues are equal or near-equal.** If two eigenvalues are identical (or differ by less than estimation uncertainty), the corresponding eigenvectors are not uniquely defined — any rotation within their span is equally valid. Attempting to interpret PC2 and PC3 independently when $\lambda_2 \approx \lambda_3$ is meaningless. Check whether nearby eigenvalues are distinguishable before interpreting individual loading vectors.

**t-SNE is not reproducible without a fixed random seed.** The gradient descent optimisation is stochastic and can converge to different local minima. Two runs of t-SNE on the same data with different seeds produce differently shaped (but equally valid) plots. Conclusions about cluster structure should be based on repeated runs with different initialisations; features that appear consistently across runs are real.

**PCA of raster data requires careful handling of NoData.** Missing data (clouds, shadows, scan line failures) must not be included in the covariance computation. A pixel with NoData in any band must be excluded from the PCA input, or the covariance will be biased by imputed or filled values. For partial missingness (10–30% of pixels cloud-covered), the expectation-maximisation PCA algorithm handles missing values consistently without imputation.

**UMAP's topology preservation depends on the neighbourhood parameter $k$.** Small $k$ emphasises local structure; large $k$ preserves global structure. There is no single correct value — the appropriate choice depends on what structure is scientifically relevant. Reporting UMAP results without specifying $k$ (and perplexity for t-SNE) makes the analysis non-reproducible.

---

## 9. Summary

PCA finds the orthogonal directions of maximum variance in high-dimensional data by eigendecomposition of the covariance matrix $\mathbf{\Sigma}\mathbf{v}_k = \lambda_k\mathbf{v}_k$. The fraction of variance explained by $q$ components is $\sum_{k=1}^q\lambda_k/\sum_{k=1}^p\lambda_k$; scree plots identify the natural dimensionality of the data. For hyperspectral imagery (200+ bands), 5–10 PCs typically capture 99% of variance.

t-SNE preserves local neighbourhood similarity through KL divergence minimisation between Gaussian similarities in high-D and Student-t similarities in 2D; cluster positions in the embedding are not meaningful. UMAP uses algebraic topology (fuzzy simplicial sets) to preserve both local and global structure, supports out-of-sample projection, and is faster. Both methods excel at revealing cluster structure invisible to PCA when the data lies on a nonlinear manifold.

**Key equations:**

$$\mathbf{\Sigma} = \frac{1}{n-1}\mathbf{X}^\top\mathbf{X}, \quad \mathbf{\Sigma}\mathbf{v}_k = \lambda_k\mathbf{v}_k$$

$$\text{VE}(q) = \sum_{k=1}^q\lambda_k \big/ \sum_{k=1}^p\lambda_k$$

$$\mathbf{Z} = \mathbf{X}\mathbf{V}_q \quad\text{[PC scores]}$$

$$\text{KL}(P\|Q) = \sum_{ij}p_{ij}\ln(p_{ij}/q_{ij}) \quad\text{[t-SNE objective]}$$

---

## Math Refresher

**Eigenvalues and eigenvectors.** An eigenvector $\mathbf{v}$ of matrix $\mathbf{A}$ is a vector that, when multiplied by $\mathbf{A}$, comes out as a scaled version of itself: $\mathbf{A}\mathbf{v} = \lambda\mathbf{v}$. The eigenvalue $\lambda$ is the scaling factor. For the covariance matrix $\mathbf{\Sigma}$ (symmetric positive semi-definite), all eigenvalues are real and non-negative. Geometrically: $\mathbf{\Sigma}$ stretches the eigenvectors, and $\lambda_k$ measures how much stretching occurs along eigenvector $\mathbf{v}_k$. The first eigenvector (largest $\lambda$) is the direction along which the data ellipsoid is most elongated — the direction of maximum variance. Computing eigenvectors: $(\mathbf{A} - \lambda\mathbf{I})\mathbf{v} = 0$ has a non-trivial solution only when $\det(\mathbf{A}-\lambda\mathbf{I}) = 0$ — the characteristic equation whose roots are the eigenvalues.

**KL divergence as a distance between distributions.** The KL divergence $\text{KL}(P\|Q) = \sum_i p_i\ln(p_i/q_i)$ measures how different distribution $P$ is from distribution $Q$. It is zero when $P = Q$ and positive otherwise (by Jensen's inequality). It is **not symmetric**: $\text{KL}(P\|Q) \neq \text{KL}(Q\|P)$. t-SNE minimises $\text{KL}(P\|Q)$ — prioritising fidelity in the high-dimensional similarities $p_{ij}$, which means it strongly penalises placing nearby high-D points far apart in 2D (but tolerates placing far-apart high-D points close together in 2D). This asymmetry is what makes t-SNE preserve local structure at the expense of global distances.
