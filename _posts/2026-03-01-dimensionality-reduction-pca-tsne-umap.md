---
layout: essay
title: "Dimensionality Reduction: PCA, t-SNE, and UMAP"
subtitle: "Visualizing and compressing high-dimensional geographic data"
date: 2026-03-01
categories: [modeling, machine-learning]
series: computational-geography-ml
series_order: 3
cluster: Z
cluster_title: "Foundations of Geographic ML"
tags:
  - machine-learning
  - dimensionality-reduction
  - pca
  - hyperspectral
  - remote-sensing
math: true
viz: true
difficulty: 3
math_core: [eigenvalues, eigenvectors, covariance-matrix, manifold-learning]
spatial_reasoning: 2
dynamics: 1
computation: 4
domain: [machine-learning, remote-sensing, spatial-analysis]
excerpt: >
  How do we visualize and analyze hyperspectral imagery with 200+ bands or spatial
  datasets with dozens of correlated features? Dimensionality reduction techniques
  compress high-dimensional data into 2-3 interpretable dimensions while preserving
  essential structure. This essay derives Principal Component Analysis from covariance
  eigendecomposition, implements t-SNE for nonlinear manifold learning, applies UMAP
  for scalable clustering, and demonstrates feature compression for classification.
math_prerequisites: >
  Linear algebra (eigenvectors, matrix multiplication). Basic statistics (variance,
  covariance). We'll derive PCA from first principles and introduce manifold
  concepts intuitively.
---

## 1. The Question

A hyperspectral sensor captures 224 spectral bands from 400nm to 2500nm. How do we visualize this data or identify distinct land cover types?

**Direct visualization impossible.**

Humans perceive 3 color channels (RGB).

Hyperspectral: 224 dimensions.

Standard scatter plots: Can only show 2-3 dimensions at once.

**Dimensionality reduction provides solution:**

Compress 224 bands → 3 principal components.

Visualize in RGB color space.

Retain 95%+ of variance.

**Applications:**
- Hyperspectral image visualization (224 bands → RGB)
- Feature compression for classification (reduce computation)
- Anomaly detection (outliers visible in reduced space)
- Clustering similar pixels (spectral signatures group together)
- Data exploration (discover patterns visually)
- Noise reduction (minor components = noise)

**Why it works:**

Many features correlated (redundancy).

**Example - Landsat 8:**
- Blue and Green bands: $r = 0.92$ (both measure visible light)
- NIR and Red bands: $r = -0.78$ (vegetation signature)
- SWIR1 and SWIR2: $r = 0.95$ (both measure soil/rock)

Principal Component Analysis (PCA) removes redundancy.

Finds uncorrelated components capturing maximum variance.

---

## 2. The Conceptual Model

### Principal Component Analysis (PCA)

**Core idea: Find directions of maximum variance.**

**First principal component (PC1):**
- Direction with largest variance
- Linear combination of original features
- Captures most information

**Second principal component (PC2):**
- Orthogonal to PC1 (perpendicular)
- Next largest variance
- Uncorrelated with PC1

**Continue** until all variance explained.

**Mathematical framework:**

Given data matrix $\mathbf{X}$ ($n$ samples × $p$ features).

Find orthogonal directions $\mathbf{w}_1, \mathbf{w}_2, ..., \mathbf{w}_p$ such that:

$$\text{Var}(\mathbf{X}\mathbf{w}_1) \geq \text{Var}(\mathbf{X}\mathbf{w}_2) \geq ... \geq \text{Var}(\mathbf{X}\mathbf{w}_p)$$

**Solution via eigendecomposition:**

Covariance matrix:

$$\mathbf{C} = \frac{1}{n-1}\mathbf{X}^T\mathbf{X}$$

(Assuming $\mathbf{X}$ centered: each column has mean 0)

Eigenvalue problem:

$$\mathbf{C}\mathbf{w}_i = \lambda_i \mathbf{w}_i$$

**Principal components** = eigenvectors of $\mathbf{C}$

**Variance explained** = eigenvalues $\lambda_i$

### Variance Explained

**Total variance:**

$$\text{Total} = \sum_{i=1}^p \lambda_i = \text{trace}(\mathbf{C})$$

**Proportion explained by PC $i$:**

$$\text{Proportion}_i = \frac{\lambda_i}{\sum_{j=1}^p \lambda_j}$$

**Cumulative variance:**

$$\text{Cumulative}_k = \frac{\sum_{i=1}^k \lambda_i}{\sum_{j=1}^p \lambda_j}$$

**Example:**

PC1: $\lambda_1 = 45$ → 45% variance  
PC2: $\lambda_2 = 30$ → 30% variance  
PC3: $\lambda_3 = 15$ → 15% variance  
Remaining: 10%

First 3 PCs: 90% variance retained.

### t-SNE (t-Distributed Stochastic Neighbor Embedding)

**Nonlinear dimensionality reduction.**

PCA: Linear (straight lines, planes)  
t-SNE: Nonlinear (can unfold curved manifolds)

**Core idea:**

Preserve local neighborhoods in high dimensions when mapping to low dimensions.

**Algorithm:**

1. Compute pairwise similarities in high-D space (Gaussian)
2. Initialize random low-D embedding
3. Optimize embedding to match high-D similarities
4. Use t-distribution in low-D (long tails prevent crowding)

**Hyperparameters:**
- Perplexity (effective number of neighbors, typical: 5-50)
- Learning rate
- Number of iterations (typical: 1000-5000)

**Advantages:**
- Reveals clusters (nonlinear structure)
- Beautiful visualizations

**Disadvantages:**
- Computationally expensive: $O(n^2)$
- Stochastic (different runs give different results)
- Distances not meaningful (only clusters)

### UMAP (Uniform Manifold Approximation and Projection)

**Modern alternative to t-SNE.**

**Advantages over t-SNE:**
- Faster: $O(n \log n)$ with approximate nearest neighbors
- Preserves global structure better
- Deterministic (reproducible)
- Meaningful distances

**Similar usage:**

Clustering, visualization, preprocessing for classification.

**Typical parameters:**
- n_neighbors (local structure, typical: 15)
- min_dist (how tight clusters are, typical: 0.1)
- n_components (usually 2 or 3)

---

## 3. Building the Mathematical Model

### PCA Derivation

**Objective:** Find direction $\mathbf{w}$ maximizing variance of projections.

**Setup:**

Data matrix $\mathbf{X}$ ($n \times p$), centered (column means = 0).

Project data onto unit vector $\mathbf{w}$: $\mathbf{z} = \mathbf{X}\mathbf{w}$

**Variance of projection:**

$$\text{Var}(\mathbf{z}) = \frac{1}{n-1}\mathbf{z}^T\mathbf{z} = \frac{1}{n-1}(\mathbf{X}\mathbf{w})^T(\mathbf{X}\mathbf{w})$$

$$= \frac{1}{n-1}\mathbf{w}^T\mathbf{X}^T\mathbf{X}\mathbf{w} = \mathbf{w}^T\mathbf{C}\mathbf{w}$$

Where $\mathbf{C} = \frac{1}{n-1}\mathbf{X}^T\mathbf{X}$ is covariance matrix.

**Optimization problem:**

$$\max_{\mathbf{w}} \mathbf{w}^T\mathbf{C}\mathbf{w} \quad \text{subject to} \quad \|\mathbf{w}\| = 1$$

**Lagrangian:**

$$L(\mathbf{w}, \lambda) = \mathbf{w}^T\mathbf{C}\mathbf{w} - \lambda(\mathbf{w}^T\mathbf{w} - 1)$$

**Derivative with respect to $\mathbf{w}$:**

$$\frac{\partial L}{\partial \mathbf{w}} = 2\mathbf{C}\mathbf{w} - 2\lambda\mathbf{w} = 0$$

$$\mathbf{C}\mathbf{w} = \lambda\mathbf{w}$$

**Eigenvalue equation!**

$\mathbf{w}$ is eigenvector of $\mathbf{C}$.

$\lambda$ is eigenvalue (variance explained).

**Solution:**

Sort eigenvalues: $\lambda_1 \geq \lambda_2 \geq ... \geq \lambda_p$

Corresponding eigenvectors: $\mathbf{w}_1, \mathbf{w}_2, ..., \mathbf{w}_p$

**Projection onto first $k$ components:**

$$\mathbf{Z} = \mathbf{X}\mathbf{W}_k$$

Where $\mathbf{W}_k = [\mathbf{w}_1 | \mathbf{w}_2 | ... | \mathbf{w}_k]$

### Reconstruction

**Transform:** $\mathbf{Z} = \mathbf{X}\mathbf{W}_k$ (high-D → low-D)

**Reconstruct:** $\mathbf{X}_{approx} = \mathbf{Z}\mathbf{W}_k^T$ (low-D → high-D)

**Reconstruction error:**

$$E = \|\mathbf{X} - \mathbf{X}_{approx}\|^2 = \sum_{i=k+1}^p \lambda_i$$

Sum of discarded eigenvalues.

---

## 4. Worked Example by Hand

**Problem:** Apply PCA to hyperspectral data (simplified).

**Data:** 4 pixels, 3 bands (Blue, Green, NIR)

| Pixel | Blue | Green | NIR |
|-------|------|-------|-----|
| 1     | 0.2  | 0.3   | 0.6 |
| 2     | 0.4  | 0.5   | 0.8 |
| 3     | 0.1  | 0.2   | 0.4 |
| 4     | 0.3  | 0.4   | 0.7 |

**Goal:** Reduce to 2 principal components by hand.

### Step 1: Center the data

**Original matrix:**

$$\mathbf{X} = \begin{bmatrix} 0.2 & 0.3 & 0.6 \\ 0.4 & 0.5 & 0.8 \\ 0.1 & 0.2 & 0.4 \\ 0.3 & 0.4 & 0.7 \end{bmatrix}$$

**Column means:**

$$\bar{x}_{Blue} = \frac{0.2+0.4+0.1+0.3}{4} = 0.25$$

$$\bar{x}_{Green} = \frac{0.3+0.5+0.2+0.4}{4} = 0.35$$

$$\bar{x}_{NIR} = \frac{0.6+0.8+0.4+0.7}{4} = 0.625$$

**Centered data:**

$$\mathbf{X}_{centered} = \begin{bmatrix} -0.05 & -0.05 & -0.025 \\ 0.15 & 0.15 & 0.175 \\ -0.15 & -0.15 & -0.225 \\ 0.05 & 0.05 & 0.075 \end{bmatrix}$$

### Step 2: Compute covariance matrix

$$\mathbf{C} = \frac{1}{n-1}\mathbf{X}_{centered}^T\mathbf{X}_{centered}$$

$$\mathbf{X}_{centered}^T\mathbf{X}_{centered} = \begin{bmatrix} 0.05 & 0.05 & 0.0625 \\ 0.05 & 0.05 & 0.0625 \\ 0.0625 & 0.0625 & 0.078125 \end{bmatrix}$$

$$\mathbf{C} = \frac{1}{3}\begin{bmatrix} 0.05 & 0.05 & 0.0625 \\ 0.05 & 0.05 & 0.0625 \\ 0.0625 & 0.0625 & 0.078125 \end{bmatrix}$$

$$= \begin{bmatrix} 0.0167 & 0.0167 & 0.0208 \\ 0.0167 & 0.0167 & 0.0208 \\ 0.0208 & 0.0208 & 0.0260 \end{bmatrix}$$

### Step 3: Find eigenvalues

**Characteristic equation:** $\det(\mathbf{C} - \lambda\mathbf{I}) = 0$

For this matrix (highly correlated bands):

$$\lambda_1 \approx 0.0594, \quad \lambda_2 \approx 0.0000, \quad \lambda_3 \approx 0.0000$$

(In practice, use numpy.linalg.eig - by hand is tedious for 3×3!)

### Step 4: Find eigenvectors

For $\lambda_1 = 0.0594$:

$$\mathbf{w}_1 \approx \begin{bmatrix} 0.577 \\ 0.577 \\ 0.577 \end{bmatrix}$$

All bands contribute equally (highly correlated).

For $\lambda_2, \lambda_3$ (near zero):

Correspond to noise/rounding errors in this toy example.

### Step 5: Project data

**First principal component:**

$$PC1 = \mathbf{X}_{centered} \times \mathbf{w}_1$$

$$= \begin{bmatrix} -0.05 & -0.05 & -0.025 \\ 0.15 & 0.15 & 0.175 \\ -0.15 & -0.15 & -0.225 \\ 0.05 & 0.05 & 0.075 \end{bmatrix} \begin{bmatrix} 0.577 \\ 0.577 \\ 0.577 \end{bmatrix}$$

$$\approx \begin{bmatrix} -0.073 \\ 0.274 \\ -0.305 \\ 0.104 \end{bmatrix}$$

**Interpretation:**

PC1 = "overall brightness" (average of all bands)

Pixel 2: Brightest (+0.274)  
Pixel 3: Darkest (-0.305)

### Step 6: Variance explained

**Total variance:**

$$\text{Total} = \lambda_1 + \lambda_2 + \lambda_3 \approx 0.0594$$

**PC1 explains:**

$$\frac{0.0594}{0.0594} = 100\%$$

(Because bands are perfectly correlated in this toy example)

---

## 5. Computational Implementation

### Tier 1: Foundation Path (Pi/Laptop)

**PCA from scratch (Python/NumPy):**

```python
import numpy as np
import matplotlib.pyplot as plt

class PCA:
    def __init__(self, n_components=2):
        self.n_components = n_components
        self.components = None
        self.mean = None
        self.explained_variance = None
    
    def fit(self, X):
        """Fit PCA model"""
        # Center data
        self.mean = np.mean(X, axis=0)
        X_centered = X - self.mean
        
        # Compute covariance matrix
        cov_matrix = np.cov(X_centered.T)
        
        # Eigendecomposition
        eigenvalues, eigenvectors = np.linalg.eig(cov_matrix)
        
        # Sort by eigenvalue (descending)
        idx = np.argsort(eigenvalues)[::-1]
        eigenvalues = eigenvalues[idx]
        eigenvectors = eigenvectors[:, idx]
        
        # Store principal components
        self.components = eigenvectors[:, :self.n_components]
        self.explained_variance = eigenvalues[:self.n_components]
        
        return self
    
    def transform(self, X):
        """Project data onto principal components"""
        X_centered = X - self.mean
        return X_centered @ self.components
    
    def fit_transform(self, X):
        """Fit and transform in one step"""
        self.fit(X)
        return self.transform(X)
    
    def inverse_transform(self, Z):
        """Reconstruct from reduced dimensions"""
        return Z @ self.components.T + self.mean
    
    def explained_variance_ratio(self):
        """Proportion of variance explained"""
        return self.explained_variance / np.sum(self.explained_variance)


# Example: Hyperspectral image
if __name__ == "__main__":
    # Generate synthetic hyperspectral data
    # 1000 pixels, 50 bands
    np.random.seed(42)
    
    # Create correlated bands (simulating real hyperspectral)
    n_pixels = 1000
    n_bands = 50
    
    # Base signals
    signal1 = np.random.randn(n_pixels)  # Vegetation
    signal2 = np.random.randn(n_pixels)  # Soil
    signal3 = np.random.randn(n_pixels)  # Water
    
    # Mix signals across bands with noise
    X = np.zeros((n_pixels, n_bands))
    for i in range(n_bands):
        # Wavelength-dependent mixing
        w1 = np.exp(-(i-20)**2/100)  # Peak at band 20
        w2 = np.exp(-(i-35)**2/100)  # Peak at band 35
        w3 = 1 - w1 - w2
        
        X[:, i] = (w1 * signal1 + w2 * signal2 + w3 * signal3 + 
                   0.1 * np.random.randn(n_pixels))
    
    # Apply PCA
    pca = PCA(n_components=3)
    Z = pca.fit_transform(X)
    
    # Analyze results
    var_ratio = pca.explained_variance_ratio()
    print(f"Variance explained by PC1: {var_ratio[0]:.1%}")
    print(f"Variance explained by PC2: {var_ratio[1]:.1%}")
    print(f"Variance explained by PC3: {var_ratio[2]:.1%}")
    print(f"Total (3 PCs): {np.sum(var_ratio):.1%}")
    
    # Visualize
    fig = plt.figure(figsize=(12, 4))
    
    # Scree plot
    ax1 = fig.add_subplot(131)
    ax1.bar(range(1, len(var_ratio)+1), var_ratio)
    ax1.set_xlabel('Principal Component')
    ax1.set_ylabel('Variance Explained')
    ax1.set_title('Scree Plot')
    
    # 2D projection
    ax2 = fig.add_subplot(132)
    scatter = ax2.scatter(Z[:, 0], Z[:, 1], c=signal1, 
                         cmap='viridis', s=1, alpha=0.5)
    ax2.set_xlabel('PC1')
    ax2.set_ylabel('PC2')
    ax2.set_title('PCA Projection')
    plt.colorbar(scatter, ax=ax2, label='Vegetation signal')
    
    # Reconstruction error
    X_reconstructed = pca.inverse_transform(Z)
    reconstruction_error = np.mean((X - X_reconstructed)**2)
    print(f"Reconstruction error (3 PCs): {reconstruction_error:.6f}")
    
    plt.tight_layout()
    plt.savefig('pca_analysis.png', dpi=150)
    print("Saved pca_analysis.png")
```

**Runtime:** <1 second for 1000 pixels × 50 bands on laptop

**Memory:** ~400 KB for this dataset

---

### Tier 2: Professional Path (Go Further)

**Scikit-learn with t-SNE and UMAP:**

```python
from sklearn.decomposition import PCA
from sklearn.manifold import TSNE
from umap import UMAP
import numpy as np
import matplotlib.pyplot as plt

# Load larger hyperspectral image (e.g., 100k pixels, 224 bands)
# X_large shape: (100000, 224)

# PCA for visualization
pca = PCA(n_components=3)
X_pca = pca.fit_transform(X_large)

print(f"PCA variance explained: {pca.explained_variance_ratio_[:3]}")
print(f"Cumulative: {np.sum(pca.explained_variance_ratio_[:3]):.1%}")

# t-SNE (subsample for speed)
n_sample = 5000
idx = np.random.choice(len(X_large), n_sample, replace=False)
X_sample = X_large[idx]

tsne = TSNE(n_components=2, perplexity=30, random_state=42, 
            n_jobs=-1)  # Use all cores
X_tsne = tsne.fit_transform(X_sample)

# UMAP (faster, scales better)
umap = UMAP(n_components=2, n_neighbors=15, min_dist=0.1, 
            random_state=42)
X_umap = umap.fit_transform(X_sample)

# Visualize all three
fig, axes = plt.subplots(1, 3, figsize=(15, 4))

# PCA
axes[0].scatter(X_pca[idx, 0], X_pca[idx, 1], s=1, alpha=0.5)
axes[0].set_title('PCA')
axes[0].set_xlabel('PC1')
axes[0].set_ylabel('PC2')

# t-SNE
axes[1].scatter(X_tsne[:, 0], X_tsne[:, 1], s=1, alpha=0.5)
axes[1].set_title('t-SNE')
axes[1].set_xlabel('Component 1')
axes[1].set_ylabel('Component 2')

# UMAP
axes[2].scatter(X_umap[:, 0], X_umap[:, 1], s=1, alpha=0.5)
axes[2].set_title('UMAP')
axes[2].set_xlabel('Component 1')
axes[2].set_ylabel('Component 2')

plt.tight_layout()
plt.savefig('dimensionality_reduction_comparison.png', dpi=150)
```

**Runtime:**
- PCA: 5-10 seconds (100k × 224)
- t-SNE: 30-60 seconds (5k subsample)
- UMAP: 10-20 seconds (5k subsample)

**GPU acceleration:** RAPIDS cuML for massive datasets

---

## 6. Interpretation

### Real Application: AVIRIS Hyperspectral

**AVIRIS (Airborne Visible/Infrared Imaging Spectrometer):**

224 contiguous spectral bands (400-2500 nm)

Spatial resolution: 4-20m depending on altitude

**Data volume:**

Single flight line: 512 pixels × 10,000 lines × 224 bands = 1.15 GB

**PCA compression:**

First 10 PCs: Retain 99%+ variance

Reduces 224 bands → 10 features

**Interpretation of components:**

PC1 (50-60% variance): Overall albedo (brightness)
- High: Bright surfaces (snow, concrete, sand)
- Low: Dark surfaces (water, shadows, asphalt)

PC2 (15-25% variance): Vegetation vs soil
- High: Vegetation (high NIR, low red)
- Low: Soil (low NIR, moderate red)

PC3 (5-10% variance): Soil moisture / mineralogy
- High: Dry surfaces (high SWIR)
- Low: Wet surfaces (low SWIR absorption)

PC4-10 (1-5% each): Subtle spectral features
- Specific absorption bands
- Atmospheric effects
- Sensor noise

**Applications:**

Mineral mapping: PC3-PC5 reveal absorption features

Vegetation stress: Subtle shifts in PC2-PC3

Change detection: Temporal PCA differences

### Feature Engineering for Classification

**Curse of dimensionality:**

With 224 features, need huge training set.

Rule of thumb: 10 samples per feature.

224 features → Need 2,240 samples per class!

**Solution: PCA preprocessing**

Reduce 224 → 20 PCs (99% variance)

Now need only 200 samples per class.

Classifier trains faster, generalizes better.

**Workflow:**

1. Fit PCA on unlabeled data
2. Transform training data
3. Train classifier on PCs
4. Transform test data
5. Predict

**Performance:**

Full 224 bands: 87% accuracy, 45 sec training  
20 PCs: 86% accuracy, 3 sec training

Minimal accuracy loss, huge speed gain.

---

## 7. What Could Go Wrong?

### Interpreting PCA Components

**Problem:**

PCs are linear combinations of all features.

Difficult to interpret physically.

**Example:**

PC1 = 0.42×Blue + 0.45×Green + 0.48×Red + 0.35×NIR + ...

What does this mean physically?

**Solution:**

- Examine loadings (coefficients)
- Plot PC vs wavelength (spectral signature)
- Use domain knowledge
- Consider sparse PCA (fewer non-zero loadings)

### Outliers Dominate

**Problem:**

PCA sensitive to outliers (uses variance).

Single extreme point can skew PC1.

**Example:**

999 forest pixels: NIR = 0.4-0.6  
1 cloud pixel: NIR = 0.95

PC1 dominated by cloud direction.

**Solution:**

- Remove outliers before PCA
- Robust PCA (uses median, not mean)
- Normalize features (standard scaling)

### t-SNE Pitfalls

**Problem 1: Perplexity matters**

Perplexity = 5: Too local (fragmented clusters)  
Perplexity = 50: Too global (merged clusters)

Must experiment.

**Problem 2: Different runs, different results**

Stochastic optimization → different embeddings.

Set random seed for reproducibility.

**Problem 3: Distances meaningless**

Cluster A and B appear close in t-SNE.

Does NOT mean actually similar!

Only within-cluster structure reliable.

**Problem 4: Computational cost**

$O(n^2)$ scales poorly.

1M pixels: Intractable on CPU.

**Solution:**

- Use UMAP instead (faster)
- Subsample large datasets
- Use approximations (Barnes-Hut)

### Choosing Number of Components

**Problem:**

How many PCs to retain? No universal rule.

**Options:**

1. **Scree plot elbow:** Where eigenvalues flatten
2. **Variance threshold:** e.g., 95% cumulative
3. **Cross-validation:** Best downstream performance
4. **Kaiser rule:** Keep PCs with $\lambda > 1$

**Example:**

PC1-3: 85% variance (elbow visible)  
PC1-10: 95% variance (threshold met)  
PC1-5: Best classification accuracy (CV result)

Different criteria, different answers. Use domain knowledge.

---

## 8. Extension: Kernel PCA

**Linear PCA limitation:**

Only finds linear patterns.

**Example:**

Data in concentric circles (nonlinear).

PCA fails to separate.

**Kernel PCA solution:**

Map data to high-dimensional space (kernel trick).

Apply PCA in that space.

Project back to 2D.

**Common kernels:**

RBF (Radial Basis Function):

$$k(\mathbf{x}_i, \mathbf{x}_j) = \exp\left(-\frac{\|\mathbf{x}_i - \mathbf{x}_j\|^2}{2\sigma^2}\right)$$

Polynomial:

$$k(\mathbf{x}_i, \mathbf{x}_j) = (\mathbf{x}_i^T\mathbf{x}_j + c)^d$$

**Trade-off:**

More expressive (captures nonlinearity)  
More expensive (kernel matrix $n \times n$)  
Harder to interpret

---

## 9. Math Refresher: Eigenvalues and Eigenvectors

### Definition

For square matrix $\mathbf{A}$:

$$\mathbf{A}\mathbf{v} = \lambda\mathbf{v}$$

$\mathbf{v}$ = eigenvector (direction)  
$\lambda$ = eigenvalue (scaling factor)

**Interpretation:**

Matrix multiplication just scales $\mathbf{v}$, doesn't change direction.

### Finding Eigenvalues

**Characteristic equation:**

$$\det(\mathbf{A} - \lambda\mathbf{I}) = 0$$

**Example (2×2):**

$$\mathbf{A} = \begin{bmatrix} 4 & 1 \\ 1 & 3 \end{bmatrix}$$

$$\det\begin{bmatrix} 4-\lambda & 1 \\ 1 & 3-\lambda \end{bmatrix} = (4-\lambda)(3-\lambda) - 1 = 0$$

$$\lambda^2 - 7\lambda + 11 = 0$$

$$\lambda_1 \approx 4.79, \quad \lambda_2 \approx 2.21$$

### Properties

**Symmetric matrices** (like covariance):
- Real eigenvalues
- Orthogonal eigenvectors
- $\mathbf{v}_i^T\mathbf{v}_j = 0$ for $i \neq j$

**Trace:** $\text{trace}(\mathbf{A}) = \sum \lambda_i$

**Determinant:** $\det(\mathbf{A}) = \prod \lambda_i$

---

## Summary

- PCA finds orthogonal directions maximizing variance via eigendecomposition of covariance matrix C = X^T X
- Principal components are eigenvectors w_i with variance explained equal to eigenvalues λ_i sorted descending
- Dimensionality reduction projects high-D data onto first k components Z = XW_k retaining 90-99% variance
- t-SNE preserves local neighborhoods via nonlinear embedding optimizing probability distributions between high/low dimensions
- UMAP provides faster scalable alternative with O(n log n) complexity preserving both local and global structure
- Hyperspectral AVIRIS 224 bands compress to 10 PCs retaining 99% variance enabling visualization and classification
- Feature compression via PCA reduces training requirements from 2240 to 200 samples improving generalization
- Outliers dominate PCA via variance maximization requiring robust preprocessing or median-based alternatives
- t-SNE stochastic with perplexity hyperparameter controlling local vs global structure requiring experimentation
- Professional implementation uses scikit-learn PCA with UMAP for visualization and classification preprocessing workflows

---
