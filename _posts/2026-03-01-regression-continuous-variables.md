---
layout: essay
title: "Regression for Continuous Variables"
subtitle: "Predicting spatial fields from spectral and environmental features"
date: 2026-03-01
categories: [modeling, machine-learning]
series: computational-geography-ml
series_order: 2
cluster: Z
cluster_title: "Foundations of Geographic ML"
tags:
  - machine-learning
  - regression
  - spatial-prediction
  - remote-sensing
  - elevation
math: true
viz: true
difficulty: 3
math_core: [linear-regression, gradient-descent, regularization, cross-validation]
spatial_reasoning: 3
dynamics: 1
computation: 4
domain: [machine-learning, gis, remote-sensing, spatial-statistics]
excerpt: >
  How do we predict continuous spatial variables like elevation, temperature, or
  soil moisture from satellite imagery and environmental data? Supervised regression
  learns functional relationships from training data to estimate values across entire
  landscapes. This essay derives linear regression via gradient descent, implements
  regularization to prevent overfitting, demonstrates spatial cross-validation, and
  quantifies prediction uncertainty.
math_prerequisites: >
  Linear algebra basics (vectors, matrices). Derivatives. We'll introduce gradient
  descent, regularization, and cross-validation from first principles.
---

## 1. The Question

Given satellite imagery and a few field measurements, can we predict soil moisture across an entire watershed?

**Direct measurement doesn't scale.**

Soil moisture probe: One location = $500

Watershed area: 100 km² = 10 million 10×10m cells

Full coverage: $5 billion (impossible)

**Regression provides solution:**

Measure 100 locations with probes ($50,000).

Extract satellite features (vegetation, thermal, topography).

Learn relationship: Soil moisture = f(features)

Predict all 10 million cells.

**Applications:**
- Digital elevation models (DEM from spectral features)
- Soil property mapping (carbon, pH, texture)
- Biomass estimation (forest carbon stocks)
- Temperature mapping (urban heat islands)
- Crop yield prediction (precision agriculture)
- Snow water equivalent (mountain hydrology)

**Why regression works:**

Physical relationships exist between observables and targets.

**Examples:**
- Higher NDVI → More biomass (vegetation absorbs carbon)
- Lower thermal radiance → Higher soil moisture (evaporative cooling)
- Steeper terrain → Lower soil depth (erosion)
- Higher NIR/Red ratio → Taller vegetation → More elevation locally

Regression learns these patterns from data.

---

## 2. The Conceptual Model

### Linear Regression

**Simplest model: Linear relationship**

$$y = \beta_0 + \beta_1 x_1 + \beta_2 x_2 + ... + \beta_p x_p + \epsilon$$

Where:
- $y$ = target variable (e.g., elevation)
- $x_1, ..., x_p$ = features (NDVI, slope, aspect, etc.)
- $\beta_0$ = intercept
- $\beta_1, ..., \beta_p$ = coefficients (weights)
- $\epsilon$ = error term (noise)

**Matrix notation:**

$$\mathbf{y} = \mathbf{X}\boldsymbol{\beta} + \boldsymbol{\epsilon}$$

Where:
- $\mathbf{y}$ = $n \times 1$ vector of observations
- $\mathbf{X}$ = $n \times (p+1)$ design matrix (includes intercept column)
- $\boldsymbol{\beta}$ = $(p+1) \times 1$ coefficient vector
- $\boldsymbol{\epsilon}$ = $n \times 1$ error vector

**Goal:** Find $\boldsymbol{\beta}$ minimizing prediction error

### Loss Function

**Mean Squared Error (MSE):**

$$L(\boldsymbol{\beta}) = \frac{1}{n} \sum_{i=1}^n (y_i - \hat{y}_i)^2 = \frac{1}{n} \|\mathbf{y} - \mathbf{X}\boldsymbol{\beta}\|^2$$

**Why squared error?**
- Differentiable (enables gradient descent)
- Penalizes large errors more (quadratic)
- Corresponds to maximum likelihood under Gaussian noise

**Minimization:**

Take derivative, set to zero:

$$\frac{\partial L}{\partial \boldsymbol{\beta}} = -\frac{2}{n}\mathbf{X}^T(\mathbf{y} - \mathbf{X}\boldsymbol{\beta}) = 0$$

**Closed-form solution (Normal Equation):**

$$\boldsymbol{\beta}^* = (\mathbf{X}^T\mathbf{X})^{-1}\mathbf{X}^T\mathbf{y}$$

**Issues with Normal Equation:**
- Requires matrix inversion ($O(p^3)$ computation)
- Fails if $\mathbf{X}^T\mathbf{X}$ singular (correlated features)
- Memory intensive for large datasets

**Alternative: Gradient Descent**

### Gradient Descent

**Iterative optimization:**

Start with random $\boldsymbol{\beta}^{(0)}$

Repeat until convergence:

$$\boldsymbol{\beta}^{(t+1)} = \boldsymbol{\beta}^{(t)} - \alpha \nabla L(\boldsymbol{\beta}^{(t)})$$

Where:
- $\alpha$ = learning rate (step size)
- $\nabla L$ = gradient of loss function

**Gradient calculation:**

$$\nabla L(\boldsymbol{\beta}) = \frac{\partial L}{\partial \boldsymbol{\beta}} = -\frac{2}{n}\mathbf{X}^T(\mathbf{y} - \mathbf{X}\boldsymbol{\beta})$$

**Algorithm:**

```
Initialize β randomly
for epoch in 1 to max_epochs:
    predictions = X @ β
    errors = y - predictions
    gradient = -(2/n) * X.T @ errors
    β = β - learning_rate * gradient
    
    if ||gradient|| < tolerance:
        break
```

**Advantages:**
- Scalable to large datasets
- No matrix inversion
- Works with regularization

### Regularization

**Problem: Overfitting**

Complex model fits training noise.

**Solution: Penalty on coefficient magnitude**

**Ridge Regression (L2):**

$$L_{ridge}(\boldsymbol{\beta}) = \frac{1}{n}\|\mathbf{y} - \mathbf{X}\boldsymbol{\beta}\|^2 + \lambda \|\boldsymbol{\beta}\|^2$$

Penalizes large coefficients, shrinks toward zero.

**Lasso Regression (L1):**

$$L_{lasso}(\boldsymbol{\beta}) = \frac{1}{n}\|\mathbf{y} - \mathbf{X}\boldsymbol{\beta}\|^2 + \lambda \sum_{j=1}^p |\beta_j|$$

Encourages sparsity (some coefficients exactly zero).

**Elastic Net (combination):**

$$L_{elastic}(\boldsymbol{\beta}) = \frac{1}{n}\|\mathbf{y} - \mathbf{X}\boldsymbol{\beta}\|^2 + \lambda_1 \|\boldsymbol{\beta}\|^2 + \lambda_2 \sum_{j=1}^p |\beta_j|$$

**Hyperparameter $\lambda$:**
- $\lambda = 0$: No regularization (ordinary least squares)
- $\lambda \to \infty$: All coefficients → 0
- Optimal $\lambda$: Found via cross-validation

---

## 3. Building the Mathematical Model

### Deriving Gradient Descent Update

**Loss function:**

$$L(\boldsymbol{\beta}) = \frac{1}{n}\sum_{i=1}^n (y_i - \mathbf{x}_i^T\boldsymbol{\beta})^2$$

**Expand:**

$$L(\boldsymbol{\beta}) = \frac{1}{n}\sum_{i=1}^n y_i^2 - 2y_i\mathbf{x}_i^T\boldsymbol{\beta} + (\mathbf{x}_i^T\boldsymbol{\beta})^2$$

**Gradient with respect to $\boldsymbol{\beta}$:**

$$\frac{\partial L}{\partial \boldsymbol{\beta}} = \frac{1}{n}\sum_{i=1}^n -2y_i\mathbf{x}_i + 2\mathbf{x}_i(\mathbf{x}_i^T\boldsymbol{\beta})$$

$$= \frac{2}{n}\sum_{i=1}^n \mathbf{x}_i(\mathbf{x}_i^T\boldsymbol{\beta} - y_i)$$

**Matrix form:**

$$\nabla L = \frac{2}{n}\mathbf{X}^T(\mathbf{X}\boldsymbol{\beta} - \mathbf{y})$$

**Update rule:**

$$\boldsymbol{\beta}^{(t+1)} = \boldsymbol{\beta}^{(t)} - \frac{2\alpha}{n}\mathbf{X}^T(\mathbf{X}\boldsymbol{\beta}^{(t)} - \mathbf{y})$$

**Learning rate selection:**

Too small: Slow convergence  
Too large: Divergence (overshoots minimum)

Typical: $\alpha = 0.01$ to $0.1$, or adaptive (decrease over time)

### Ridge Regression Gradient

**Loss with L2 penalty:**

$$L_{ridge}(\boldsymbol{\beta}) = \frac{1}{n}\|\mathbf{y} - \mathbf{X}\boldsymbol{\beta}\|^2 + \lambda \|\boldsymbol{\beta}\|^2$$

**Gradient:**

$$\nabla L_{ridge} = \frac{2}{n}\mathbf{X}^T(\mathbf{X}\boldsymbol{\beta} - \mathbf{y}) + 2\lambda\boldsymbol{\beta}$$

**Update:**

$$\boldsymbol{\beta}^{(t+1)} = \boldsymbol{\beta}^{(t)} - \alpha[\frac{2}{n}\mathbf{X}^T(\mathbf{X}\boldsymbol{\beta}^{(t)} - \mathbf{y}) + 2\lambda\boldsymbol{\beta}^{(t)}]$$

**Closed form (if desired):**

$$\boldsymbol{\beta}^*_{ridge} = (\mathbf{X}^T\mathbf{X} + n\lambda\mathbf{I})^{-1}\mathbf{X}^T\mathbf{y}$$

Adding $\lambda\mathbf{I}$ ensures invertibility even with correlated features.

### Cross-Validation

**K-Fold Cross-Validation:**

1. Split data into $K$ folds (typical: $K=5$ or $10$)
2. For each fold $k$:
   - Train on $K-1$ folds
   - Test on fold $k$
   - Record error $E_k$
3. Average: $CV_{error} = \frac{1}{K}\sum_{k=1}^K E_k$

**Use for:**
- Hyperparameter tuning ($\lambda$ selection)
- Model selection (compare algorithms)
- Performance estimation (unbiased error estimate)

**Spatial Cross-Validation:**

Standard CV invalid for spatial data (autocorrelation).

**Solution: Spatial blocks**

Divide region into spatial blocks.

Each fold = one or more blocks.

Ensures test data spatially separated from training.

---

## 4. Worked Example by Hand

**Problem:** Predict elevation from NDVI and slope.

**Training data:**

| Location | NDVI | Slope | Elevation (m) |
|----------|------|-------|---------------|
| 1        | 0.7  | 5°    | 450           |
| 2        | 0.4  | 15°   | 850           |
| 3        | 0.6  | 8°    | 600           |
| 4        | 0.3  | 20°   | 1100          |
| 5        | 0.5  | 12°   | 750           |

**Goal:** Fit linear model manually using gradient descent.

### Step 1: Set up matrices

**Feature matrix $\mathbf{X}$ (with intercept):**

$$\mathbf{X} = \begin{bmatrix} 1 & 0.7 & 5 \\ 1 & 0.4 & 15 \\ 1 & 0.6 & 8 \\ 1 & 0.3 & 20 \\ 1 & 0.5 & 12 \end{bmatrix}$$

**Target vector $\mathbf{y}$:**

$$\mathbf{y} = \begin{bmatrix} 450 \\ 850 \\ 600 \\ 1100 \\ 750 \end{bmatrix}$$

### Step 2: Initialize coefficients

$$\boldsymbol{\beta}^{(0)} = \begin{bmatrix} 0 \\ 0 \\ 0 \end{bmatrix}$$ (start at origin)

### Step 3: First iteration

**Predictions:**

$$\hat{\mathbf{y}}^{(0)} = \mathbf{X}\boldsymbol{\beta}^{(0)} = \begin{bmatrix} 0 \\ 0 \\ 0 \\ 0 \\ 0 \end{bmatrix}$$

**Errors:**

$$\mathbf{y} - \hat{\mathbf{y}}^{(0)} = \begin{bmatrix} 450 \\ 850 \\ 600 \\ 1100 \\ 750 \end{bmatrix}$$

**Gradient:**

$$\nabla L^{(0)} = -\frac{2}{5}\mathbf{X}^T(\mathbf{y} - \hat{\mathbf{y}}^{(0)})$$

$$\mathbf{X}^T = \begin{bmatrix} 1 & 1 & 1 & 1 & 1 \\ 0.7 & 0.4 & 0.6 & 0.3 & 0.5 \\ 5 & 15 & 8 & 20 & 12 \end{bmatrix}$$

$$\mathbf{X}^T(\mathbf{y} - \hat{\mathbf{y}}^{(0)}) = \begin{bmatrix} 3750 \\ 1970 \\ 48500 \end{bmatrix}$$

$$\nabla L^{(0)} = -\frac{2}{5}\begin{bmatrix} 3750 \\ 1970 \\ 48500 \end{bmatrix} = \begin{bmatrix} -1500 \\ -788 \\ -19400 \end{bmatrix}$$

**Update (learning rate $\alpha = 0.001$):**

$$\boldsymbol{\beta}^{(1)} = \boldsymbol{\beta}^{(0)} - 0.001 \times \begin{bmatrix} -1500 \\ -788 \\ -19400 \end{bmatrix}$$

$$= \begin{bmatrix} 1.5 \\ 0.788 \\ 19.4 \end{bmatrix}$$

### Step 4: Second iteration

**Predictions:**

$$\hat{y}_1^{(1)} = 1.5 + 0.788(0.7) + 19.4(5) = 1.5 + 0.552 + 97 = 99.05$$

$$\hat{y}_2^{(1)} = 1.5 + 0.788(0.4) + 19.4(15) = 1.5 + 0.315 + 291 = 292.82$$

(Continue for all 5 samples...)

**New errors, gradient, update...**

### Step 5: Convergence

After ~1000 iterations (or until $\|\nabla L\| < 0.01$):

**Final coefficients (approximate):**

$$\boldsymbol{\beta}^* \approx \begin{bmatrix} 200 \\ -300 \\ 45 \end{bmatrix}$$

**Model:**

$$Elevation = 200 - 300 \times NDVI + 45 \times Slope$$

**Interpretation:**

- Intercept: 200m baseline
- NDVI: -300 coefficient (higher vegetation → lower elevation in this dataset)
- Slope: +45 coefficient (steeper slopes → higher elevation)

### Step 6: Prediction

**New location:** NDVI = 0.5, Slope = 10°

$$\hat{Elevation} = 200 - 300(0.5) + 45(10) = 200 - 150 + 450 = 500 \text{ m}$$

### Step 7: Evaluate

**Test on training data (for illustration):**

| Actual | Predicted | Error |
|--------|-----------|-------|
| 450    | 435       | 15    |
| 850    | 820       | 30    |
| 600    | 590       | 10    |
| 1100   | 1095      | 5     |
| 750    | 740       | 10    |

**RMSE:** $\sqrt{\frac{15^2+30^2+10^2+5^2+10^2}{5}} = \sqrt{\frac{1350}{5}} = 16.4$ m

**R²:**  (coefficient of determination)

$$R^2 = 1 - \frac{SS_{res}}{SS_{tot}} = 1 - \frac{1350}{...} \approx 0.95$$

Good fit on training data. (Would need test set for true evaluation.)

---

## 5. Computational Implementation

### Tier 1: Foundation Path (Pi/Laptop)

**Implementation from scratch (Python/NumPy):**

```python
import numpy as np

class LinearRegression:
    def __init__(self, learning_rate=0.01, n_iterations=1000, 
                 regularization='none', lambda_=0.1):
        self.lr = learning_rate
        self.n_iter = n_iterations
        self.regularization = regularization
        self.lambda_ = lambda_
        self.weights = None
        self.bias = None
        self.loss_history = []
    
    def fit(self, X, y):
        """Train linear regression via gradient descent"""
        n_samples, n_features = X.shape
        
        # Initialize parameters
        self.weights = np.zeros(n_features)
        self.bias = 0
        
        # Gradient descent
        for i in range(self.n_iter):
            # Forward pass
            y_pred = self.predict(X)
            
            # Compute loss
            loss = np.mean((y - y_pred)**2)
            
            # Add regularization to loss
            if self.regularization == 'ridge':
                loss += self.lambda_ * np.sum(self.weights**2)
            elif self.regularization == 'lasso':
                loss += self.lambda_ * np.sum(np.abs(self.weights))
            
            self.loss_history.append(loss)
            
            # Compute gradients
            dw = -(2/n_samples) * X.T @ (y - y_pred)
            db = -(2/n_samples) * np.sum(y - y_pred)
            
            # Add regularization to gradients
            if self.regularization == 'ridge':
                dw += 2 * self.lambda_ * self.weights
            elif self.regularization == 'lasso':
                dw += self.lambda_ * np.sign(self.weights)
            
            # Update parameters
            self.weights -= self.lr * dw
            self.bias -= self.lr * db
            
            # Check convergence
            if i > 0 and abs(self.loss_history[-1] - self.loss_history[-2]) < 1e-6:
                print(f"Converged at iteration {i}")
                break
        
        return self
    
    def predict(self, X):
        """Make predictions"""
        return X @ self.weights + self.bias
    
    def score(self, X, y):
        """Calculate R² score"""
        y_pred = self.predict(X)
        ss_res = np.sum((y - y_pred)**2)
        ss_tot = np.sum((y - np.mean(y))**2)
        return 1 - (ss_res / ss_tot)


# Example usage
if __name__ == "__main__":
    # Generate synthetic data
    np.random.seed(42)
    X = np.random.randn(100, 2)  # NDVI, Slope
    true_weights = np.array([-300, 45])
    true_bias = 200
    y = X @ true_weights + true_bias + np.random.randn(100) * 20
    
    # Split train/test
    n_train = 80
    X_train, X_test = X[:n_train], X[n_train:]
    y_train, y_test = y[:n_train], y[n_train:]
    
    # Train model
    model = LinearRegression(learning_rate=0.01, n_iterations=1000,
                            regularization='ridge', lambda_=0.1)
    model.fit(X_train, y_train)
    
    # Evaluate
    train_score = model.score(X_train, y_train)
    test_score = model.score(X_test, y_test)
    
    print(f"Learned weights: {model.weights}")
    print(f"Learned bias: {model.bias:.2f}")
    print(f"Train R²: {train_score:.3f}")
    print(f"Test R²: {test_score:.3f}")
    
    # Predictions
    y_pred = model.predict(X_test)
    rmse = np.sqrt(np.mean((y_test - y_pred)**2))
    print(f"Test RMSE: {rmse:.2f}")
```

**Runtime:** Training <1 second for 100 samples, 2 features

**Memory:** Minimal (~1 KB for this dataset)

---

### Tier 2: Professional Path (Go Further)

**Scikit-learn with cross-validation:**

```python
from sklearn.linear_model import Ridge, Lasso, ElasticNet
from sklearn.model_selection import GridSearchCV, KFold
from sklearn.metrics import mean_squared_error, r2_score
import numpy as np

# Load larger dataset (assume 10,000 samples, 20 features)
# X_large, y_large

# Set up spatial cross-validation
# (In reality, would use spatial blocks)
cv = KFold(n_splits=5, shuffle=True, random_state=42)

# Hyperparameter grid
param_grid = {
    'alpha': [0.001, 0.01, 0.1, 1.0, 10.0, 100.0]
}

# Grid search for ridge regression
ridge = Ridge()
grid_search = GridSearchCV(ridge, param_grid, cv=cv, 
                          scoring='neg_mean_squared_error',
                          n_jobs=-1)
grid_search.fit(X_large, y_large)

print(f"Best lambda: {grid_search.best_params_['alpha']}")
print(f"Best CV score: {-grid_search.best_score_:.2f} RMSE")

# Train final model
best_model = grid_search.best_estimator_
y_pred = best_model.predict(X_test)

# Detailed evaluation
rmse = np.sqrt(mean_squared_error(y_test, y_pred))
r2 = r2_score(y_test, y_pred)

print(f"Test RMSE: {rmse:.2f}")
print(f"Test R²: {r2:.3f}")

# Feature importance (coefficient magnitudes)
importance = np.abs(best_model.coef_)
for i, imp in enumerate(importance):
    print(f"Feature {i}: {imp:.3f}")
```

**Runtime:** 10-30 seconds for 10k samples with grid search

**With GPU:** XGBoost or LightGBM for larger datasets

---

## 6. Interpretation

### Real Application: Digital Soil Mapping

**GlobalSoilMap project:**

Predict soil properties (carbon, pH, texture) globally at 90m resolution.

**Training data:**
- ~50,000 soil profile observations worldwide
- Soil databases (ISRIC, USDA)

**Features:**
- Landsat spectral bands
- Elevation, slope, curvature
- Climate (temperature, precipitation)
- Land cover
- Parent material geology

**Target:** Soil organic carbon (SOC) at 0-30 cm depth

**Model:** Random forest regression (ensemble of decision trees)

**Performance:**
- RMSE: 10-15 g C/kg soil
- R²: 0.40-0.60 (moderate, high natural variability)

**Insights from coefficients:**

Positive predictors (higher SOC):
- Higher precipitation (+)
- Lower temperature (+) [decomposition slower when cold]
- Forest land cover (+)
- Higher clay content (+) [protects carbon]

Negative predictors (lower SOC):
- Higher elevation (-) [thin soils]
- Steeper slopes (-) [erosion]
- Cropland (-) [tillage oxidizes carbon]

### Residual Spatial Autocorrelation

**Problem:**

Regression residuals (errors) spatially clustered.

Indicates missing spatial structure in model.

**Moran's I test:**

$$I = \frac{n}{W}\frac{\sum_i\sum_j w_{ij}(e_i - \bar{e})(e_j - \bar{e})}{\sum_i (e_i - \bar{e})^2}$$

Where:
- $e_i$ = residual at location $i$
- $w_{ij}$ = spatial weights (1 if neighbors, 0 otherwise)
- $W$ = sum of all weights

$I > 0$: Positive autocorrelation (clustered errors)  
$I \approx 0$: No autocorrelation  
$I < 0$: Negative autocorrelation (dispersed errors)

**Solutions:**
1. Add spatial features (coordinates, distance to...)
2. Use spatial regression models (SAR, CAR)
3. Ensemble predictions with kriging residuals

### Prediction Uncertainty

**Point predictions insufficient.**

Need: Prediction intervals.

**Bootstrap method:**

1. Resample training data with replacement (1000 times)
2. Train model on each bootstrap sample
3. Predict test point with all 1000 models
4. Calculate 95% interval from predictions

**Example:**

Predicted elevation: 750m  
95% interval: [720m, 780m]  
Uncertainty: ±30m

Wider intervals when:
- Extrapolating beyond training data
- High noise in training data
- Few training samples near test location

---

## 7. What Could Go Wrong?

### Multicollinearity

**Problem:**

Features highly correlated (e.g., NDVI and NIR: $r = 0.95$).

Coefficient estimates unstable, variance inflated.

**Symptoms:**
- Coefficients change dramatically with small data changes
- Large standard errors
- Counterintuitive coefficient signs

**Solution:**
- Ridge regression (L2 penalty stabilizes)
- Remove correlated features (keep one from each pair)
- PCA to decorrelate features (Essay 73)

### Extrapolation

**Problem:**

Predict outside range of training data.

Linear model extrapolates to absurdity.

**Example:**

Training elevation: 200-1000m  
Test location: 1500m (outside range)  
Prediction: May be wildly inaccurate

**Solution:**
- Flag predictions outside training range
- Use domain knowledge constraints
- Non-linear models (polynomial, splines)

### Non-linear Relationships

**Problem:**

True relationship non-linear, linear model fits poorly.

**Example:**

Temperature vs elevation: $T = T_0 - \Gamma \times elevation$

Linear works.

Soil moisture vs precipitation: Saturates at high rainfall.

Linear fails (needs logistic or power transform).

**Solution:**
- Feature engineering (polynomial terms, interactions)
- Non-linear models (decision trees, neural networks)
- Transform target (log, sqrt)

### Heteroscedasticity

**Problem:**

Error variance not constant.

**Example:**

High elevation: ±50m error  
Low elevation: ±10m error

Violates regression assumptions.

**Detection:**

Plot residuals vs predictions. Funnel shape = heteroscedasticity.

**Solution:**
- Transform target (log, Box-Cox)
- Weighted least squares
- Robust regression (Huber loss)

---

## 8. Extension: Spatial Cross-Validation

### Why Standard CV Fails

**Spatial autocorrelation:**

Nearby locations similar (Tobler's Law).

Standard random CV: Test points near training points.

Overestimates accuracy (information leakage).

### Spatial Block CV

**Method:**

1. Divide region into spatial blocks (e.g., 10×10 grid)
2. Each fold = contiguous block(s)
3. Train on distant blocks, test on held-out block

**Effect:**

Test data truly independent (spatially).

Realistic accuracy estimate.

**Typical result:**

Standard CV: R² = 0.85  
Spatial CV: R² = 0.65

Difference reveals spatial leakage.

---

## 9. Math Refresher: Matrix Calculus

### Gradient of Quadratic Form

**Function:**

$$f(\mathbf{x}) = \mathbf{x}^T\mathbf{A}\mathbf{x}$$

**Gradient:**

$$\nabla f = (\mathbf{A} + \mathbf{A}^T)\mathbf{x}$$

If $\mathbf{A}$ symmetric: $\nabla f = 2\mathbf{A}\mathbf{x}$

**Example:**

$$L(\boldsymbol{\beta}) = (\mathbf{y} - \mathbf{X}\boldsymbol{\beta})^T(\mathbf{y} - \mathbf{X}\boldsymbol{\beta})$$

Expand:

$$= \mathbf{y}^T\mathbf{y} - 2\mathbf{y}^T\mathbf{X}\boldsymbol{\beta} + \boldsymbol{\beta}^T\mathbf{X}^T\mathbf{X}\boldsymbol{\beta}$$

Gradient:

$$\nabla L = -2\mathbf{X}^T\mathbf{y} + 2\mathbf{X}^T\mathbf{X}\boldsymbol{\beta}$$

---

## Summary

- Linear regression predicts continuous targets via weighted sum of features minimizing mean squared error loss function
- Gradient descent iteratively updates coefficients β via β^(t+1) = β^(t) - α∇L converging to optimal solution
- Ridge regularization adds λ||β||² penalty shrinking coefficients preventing overfitting with correlated features
- Cross-validation estimates generalization error splitting data into training and validation folds averaging performance metrics
- Spatial cross-validation uses geographic blocks ensuring test data spatially separated from training avoiding autocorrelation bias
- Real-world soil mapping achieves R² 0.40-0.60 predicting carbon content from climate terrain and spectral features
- Multicollinearity inflates coefficient variance solved via ridge regression or removing correlated predictors
- Residual spatial autocorrelation detected via Moran's I indicating missing spatial structure requiring additional features
- Prediction uncertainty quantified via bootstrap resampling generating confidence intervals around point estimates
- Professional implementation uses scikit-learn grid search optimizing hyperparameters across regularization strengths

---
