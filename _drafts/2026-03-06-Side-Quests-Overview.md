---
layout: essay
title: Side Quests - Mathematics Primers
author: paul-hobson
categories:
  - maths
tags:
  - mathematics
  - tutorial
excerpt: A side quest of just maths to help with getting oriented in the modelling examples
---
## Side Quest — The Mathematics Primer

The primer is an ante-room to the main curriculum. Its purpose is not to replace a mathematics education but to give a reader who hits a wall — who sees a partial derivative and doesn't know what to do with it — a self-contained path back to solid ground before returning to the model that sent them here.

The structure mirrors a natural progression: from arithmetic and algebra through geometry, functions, and logarithms, across the bridge of pre-calculus, into single-variable and then multivariable calculus, and out through linear algebra and probability. Nine series, none of them long, each grounded in something you can see on a map or in a landscape.

Every topic is motivated before it is defined. Every definition leads immediately to a geographic example. Every example produces a number you can check.

**Series keys use a `math-primer-` prefix. Permalinks live under `/math/`.  
Series numbers use a separate M-prefix to keep them visually distinct from the geography curriculum.**

---

### Primer M1 — Numbers, Units, and Algebra

**Purpose:** The working language of quantitative reasoning. Not a remediation exercise — an invitation to notice that the arithmetic you already know is the same arithmetic that runs climate models.

**Series key:** `math-primer-algebra`  
**Permalink:** `/math/1/`

|Cluster|Title|Models|
|---|---|---|
|AA|Numbers in the Physical World|Scientific notation and orders of magnitude; unit conversion and dimensional analysis; significant figures and measurement precision|
|AA|Variables and Equations|What a variable is and isn't; solving linear equations; rearranging formulas (isolating the term you want)|
|AB|Systems of Equations|Two equations, two unknowns: elimination and substitution; geometric interpretation as intersecting lines; three-equation systems for mixing problems|
|AB|Quadratics|Factoring and the quadratic formula; parabola shape and vertex; projectile trajectory as a geographic introduction|
|AC|Proportional and Inverse Relationships|Direct proportion, constant of proportionality; inverse proportion (gravity, light, sound); log-log linearity as a preview|
|AC|Inequalities and Intervals|Solving and graphing inequalities; interval notation; feasibility regions for resource constraints|

**Geographic anchors:** Elevation unit conversions (feet → metres → km); mixing proportions for soil amendments; river discharge as a product of area and velocity; daylight hours as a function of latitude.

---

### Primer M2 — Geometry and Trigonometry

**Purpose:** The spatial branch of mathematics. Every map is geometry; every slope calculation is trigonometry; spherical coordinates — which underpin all of Series 1 — require both.

**Series key:** `math-primer-geometry`  
**Permalink:** `/math/2/`

|Cluster|Title|Models|
|---|---|---|
|BA|Euclidean Geometry|Angles, triangles, congruence, similarity; area and perimeter of standard shapes; the Pythagorean theorem as a distance formula|
|BA|Coordinate Geometry|Cartesian plane; distance and midpoint formulas; slope as rise over run; equation of a line (point-slope and slope-intercept)|
|BB|Right-Triangle Trigonometry|Sine, cosine, tangent defined from ratios; SOHCAHTOA; solving triangles; angles of elevation and depression|
|BB|The Unit Circle|Extending trig beyond right triangles; radian measure; exact values at 0, 30, 45, 60, 90; the Pythagorean identity|
|BC|Periodic Functions|Sine and cosine as waves; amplitude, period, phase shift; modelling seasonal temperature and daylight|
|BC|Polar Coordinates|From Cartesian to polar and back; distance in polar form; why polar coordinates simplify circular problems|
|BD|Spherical Geometry|Great circles; spherical excess; the haversine formula for distance on the globe; why longitude lines converge at the poles|

**Geographic anchors:** Slope and aspect from a DEM; viewshed angles; sun elevation at solstice; great-circle flight path Calgary to Tokyo; why 1° of latitude ≠ 1° of longitude in km.

---

### Primer M3 — Functions, Exponentials, and Logarithms

**Purpose:** Functions are the vocabulary of modelling. Exponentials and logarithms are the grammar of anything that grows, decays, or spans many orders of magnitude.

**Series key:** `math-primer-functions`  
**Permalink:** `/math/3/`

|Cluster|Title|Models|
|---|---|---|
|CA|The Function Concept|Domain, codomain, range; function notation; vertical line test; piecewise functions|
|CA|Transformation of Functions|Horizontal and vertical shifts; stretching and reflecting; why f(x − a) shifts right, not left|
|CB|Composition and Inverse|Composing functions: f(g(x)); invertibility; finding inverses algebraically and graphically; why log is the inverse of exp|
|CB|Exponential Functions|The family 2x, ex, bx; growth and decay; doubling time; half-life|
|CC|The Natural Logarithm|ln as the inverse of ex; log rules (product, quotient, power); change of base|
|CC|Log Scales and Power Laws|Log-linear and log-log plots; linearizing exponential and power-law data; Richter scale, decibels, pH as geographic/physical examples|
|CD|Sequences and Series|Arithmetic and geometric sequences; partial sums; the geometric series formula; applications to compound interest and epidemic growth|

**Geographic anchors:** Radiocarbon dating (half-life); population doubling time; earthquake magnitude (log scale); Zipf's law for city sizes as a log-log relationship; acoustic attenuation in the atmosphere.

---

### Primer M4 — Pre-Calculus: Rates of Change

**Purpose:** The bridge between algebra and calculus. The core idea — that instantaneous rate of change is the limit of average rate of change — is introduced visually and intuitively before any formal limit machinery.

**Series key:** `math-primer-precalculus`  
**Permalink:** `/math/4/`

|Cluster|Title|Models|
|---|---|---|
|DA|Average Rate of Change|Slope of a secant line; Δy/Δx over an interval; units matter; glacier retreat rate from historical surveys|
|DA|From Average to Instantaneous|Shrinking the interval; what the slope approaches; the tangent line problem stated informally|
|DB|Limits Informally|What "approaching" means; one-sided limits; limits at infinity; the ε-δ definition named but not required|
|DB|Continuity|What it means for a function to have no gaps or jumps; intermediate value theorem; relevance to physical systems|
|DC|The Difference Quotient|[f(x+h) − f(x)] / h; computing it for polynomials and square roots; why this expression is the engine of calculus|
|DC|Asymptotes and End Behaviour|Horizontal and vertical asymptotes; rational function behaviour; relevance to saturation models|

**Geographic anchors:** Rate of sea level rise (tide gauge data); average vs instantaneous river discharge; temperature gradient across a front; approach speed of a satellite.

---

### Primer M5 — Differential Calculus

**Purpose:** The mathematics of change. Differentiation rules, applied relentlessly to functions that model real geographic and environmental processes.

**Series key:** `math-primer-differential-calculus`  
**Permalink:** `/math/5/`

|Cluster|Title|Models|
|---|---|---|
|EA|The Derivative Defined|Formal limit definition; derivative as a function; Leibniz vs Newton notation; differentiability|
|EA|Power Rule and Polynomial Derivatives|d/dx[xⁿ] = nxⁿ⁻¹; derivatives of sums; velocity and acceleration from a position function|
|EB|Product and Quotient Rules|Differentiating products and ratios; why the product rule is not (fg)' = f'g'; worked examples from concentration and flow|
|EB|Chain Rule|Differentiating composite functions; the most-used rule in applied calculus; temperature as a function of altitude as a function of latitude|
|EC|Derivatives of Transcendental Functions|d/dx[sin x], d/dx[cos x], d/dx[eˣ], d/dx[ln x]; chain rule with these; periodic and exponential models|
|EC|Higher-Order Derivatives|Second derivative and concavity; acceleration; inflection points; the second derivative test|
|ED|Optimization|Critical points; first and second derivative tests; finding maxima and minima; constrained optimization preview|
|ED|Related Rates|Two quantities changing together; implicit differentiation; applications to spreading fire, rising water, receding glacier|

**Geographic anchors:** Slope of a hillside as a derivative; optimal pipeline route (unconstrained); rate of change of temperature along an elevation gradient; melting rate of a retreating glacier.

---

### Primer M6 — Integral Calculus and Differential Equations

**Purpose:** Integration is the mathematics of accumulation. Differential equations are the language of process models — almost every model in the geography curriculum is, at its core, a differential equation.

**Series key:** `math-primer-integral-calculus`  
**Permalink:** `/math/6/`

|Cluster|Title|Models|
|---|---|---|
|FA|Antiderivatives|Reversing differentiation; indefinite integrals; the constant of integration; power rule in reverse|
|FA|The Definite Integral|Signed area under a curve; Riemann sums; the definite integral as a limit|
|FB|Fundamental Theorem of Calculus|The two parts: differentiation and integration as inverses; evaluating definite integrals without Riemann sums|
|FB|Integration Techniques|Substitution (u-substitution); integration by parts; when to use which|
|FC|Applications of Integration|Area between curves; cumulative precipitation from a rate; volume of a reservoir from a depth-area curve|
|FC|Average Value and Accumulated Change|Average value of a continuous function; total runoff from a hydrograph; net displacement vs total distance|
|FD|Introduction to Differential Equations|What a DE is; order and linearity; verifying solutions; the DE y' = ky and its exponential solution|
|FD|Separable Differential Equations|Separation of variables; population growth, radioactive decay, Newton's law of cooling; logistic equation derived|

**Geographic anchors:** Volume of water behind a dam from depth-area curves; cumulative snowmelt from a melt-rate function; exponential decay of radiocarbon; logistic growth of a beaver population colonizing a watershed.

---

### Primer M7 — Multivariable Calculus

**Purpose:** The real world has more than one dimension. Terrain, atmosphere, and ocean are all functions of at least two spatial variables plus time. Multivariable calculus is the minimum toolkit for working with any of them.

**Series key:** `math-primer-multivariable`  
**Permalink:** `/math/7/`

|Cluster|Title|Models|
|---|---|---|
|GA|Functions of Two Variables|Surfaces, contour plots, level curves; elevation as f(x, y); reading a topographic map as a mathematical object|
|GA|Partial Derivatives|Holding one variable fixed; ∂f/∂x and ∂f/∂y; geometric interpretation as slope in x and y directions|
|GB|The Gradient Vector|∇f = (∂f/∂x, ∂f/∂y); gradient points uphill, magnitude is steepness; gradient descent as the inverse|
|GB|Directional Derivatives|Rate of change in an arbitrary direction; dot product with a unit vector; steepest ascent/descent as a maximization|
|GC|Optimization in Two Variables|Critical points: setting both partials to zero; second derivative test (Hessian determinant); saddle points|
|GC|Lagrange Multipliers|Constrained optimization: maximize f subject to g = 0; gradient condition; examples from resource allocation|
|GD|Double Integrals|Integrating over a 2D region; Fubini's theorem; change of order; area and volume as special cases|
|GD|Applications of Double Integrals|Mass of a variable-density region; centre of mass; expected value over a spatial domain; raster cell aggregation|

**Geographic anchors:** Gradient of a DEM as a flow direction vector; aspect angle from ∂z/∂x and ∂z/∂y; total sediment load over a watershed as a double integral; optimal weather station placement (constrained optimization).

---

### Primer M8 — Linear Algebra for Spatial Thinkers

**Purpose:** Vectors and matrices underlie coordinate transformation, remote sensing, spatial statistics, and machine learning. This series develops the geometric intuition first — linear algebra as a language for describing space, not just a set of matrix operations.

**Series key:** `math-primer-linear-algebra`  
**Permalink:** `/math/8/`

|Cluster|Title|Models|
|---|---|---|
|HA|Vectors|Geometric vectors; addition and scalar multiplication; magnitude and direction; position vectors; displacement|
|HA|Dot Product and Angle|a·b =|a|   |b|cos θ; orthogonality; projection; how similarity between satellite spectral signatures is a dot product|
|HB|Cross Product and Normal Vectors|a × b; area of a parallelogram; normal to a plane; application to slope-aspect from three terrain points|
|HB|Matrices and Matrix Operations|Matrix addition, scalar multiplication, matrix multiplication; why AB ≠ BA; the identity matrix|
|HC|Systems of Linear Equations|Augmented matrix; row reduction (Gaussian elimination); consistent vs inconsistent systems; overdetermined systems|
|HC|Inverse and Determinant|Matrix inverse; 2×2 and 3×3 determinants; when a matrix is invertible; solving Ax = b|
|HD|Eigenvalues and Eigenvectors|What they are geometrically; characteristic polynomial; dominant eigenvalue; why PCA is an eigenproblem|
|HD|Linear Transformations|Rotation, scaling, reflection as matrices; composing transforms; coordinate system changes; map projections as linear approximations|

**Geographic anchors:** Rotation matrix for converting between geographic coordinate systems; PCA of a multispectral image as an eigenproblem; least-squares fitting as a matrix solve; adjacency matrix for a watershed network.

---

### Primer M9 — Probability and Statistics for Environmental Modellers

**Purpose:** Every measurement has uncertainty. Every model has parameters estimated from data. This series covers the probability and statistics needed to work honestly with environmental data — not a statistics course, but the foundations you need to understand confidence intervals, significance tests, and Bayesian reasoning in context.

**Series key:** `math-primer-probability`  
**Permalink:** `/math/9/`

|Cluster|Title|Models|
|---|---|---|
|IA|Probability Foundations|Sample spaces and events; probability axioms; conditional probability; independence; Bayes' theorem introduced|
|IA|Counting and Combinatorics|Permutations and combinations; the binomial coefficient; relevance to ecological sampling design|
|IB|Discrete Distributions|Bernoulli, binomial, Poisson; mean and variance; fitting to wildfire ignition counts and flood occurrence|
|IB|Continuous Distributions|Probability density functions; the uniform and exponential distributions; the normal distribution and its parameters|
|IC|The Normal Distribution|Standard normal; z-scores; 68-95-99.7 rule; central limit theorem stated and illustrated|
|IC|Confidence Intervals|What a confidence interval means; CI for a mean; margin of error; how sample size affects precision|
|ID|Hypothesis Testing|Null and alternative hypotheses; p-values without mysticism; Type I and Type II error; practical vs statistical significance|
|ID|Regression and Correlation|Pearson correlation; least-squares line; R²; residuals; what regression can and cannot show|
|IE|Introduction to Bayesian Reasoning|Prior, likelihood, posterior; Bayes' theorem for continuous parameters; how evidence updates belief; contrast with frequentist inference|
|IE|Uncertainty Propagation|How uncertainty in inputs becomes uncertainty in outputs; Monte Carlo error propagation; sensitivity analysis|

**Geographic anchors:** Flood return period (recurrence interval) as a probability; normal approximation for annual precipitation; Poisson model for wildfire ignitions; Bayesian updating of glacier mass balance estimates; Monte Carlo uncertainty in a crop yield model.

---

## Math Primer — Design Principles

### What makes this different from a textbook

**Every concept is motivated before it is defined.** The slope of a hillside motivates the derivative; the area of a watershed motivates the integral; the direction of steepest ascent motivates the gradient. A reader who has been confused by calculus in the abstract should find it obvious when they are standing on a mountain.

**The progression is honest about difficulty.** Pre-calculus (M4) is harder than it looks; multivariable calculus (M7) is harder still. The primer does not pretend otherwise. What it promises is that each step follows naturally from the one before, and that the geographic context makes the investment worthwhile.

**Practice is built in, not bolted on.** Each model ends with 3–5 worked problems drawn from geographic or environmental contexts — not x² + 3x − 4 = 0, but "the elevation z of a hillside is given by z = 100 − 2x² − y². At what point (x, y) does the terrain reach its maximum elevation?"

**Interactive visualisations carry the intuition.** The derivative as a tangent line that pivots as a point moves along a curve. The gradient vector as an arrow on a terrain surface. The double integral as volume filling up under a surface. These are the images that make the abstraction stick.

### Linking primer to curriculum

The primer is not prerequisite-gated — a reader can enter the geography curriculum at Series 1 without touching the primer. But every geography model that requires a specific mathematical concept carries a **"Math foundation"** link in the essay hero pointing to the relevant primer model.

Suggested cross-links:

|Geography series|Math prerequisite|Primer link|
|---|---|---|
|Series 1 (Foundations)|Algebra, functions, trig|M1, M2, M3|
|Series 1, Model 12 (Rotating sphere)|Spherical geometry, trig|M2 cluster BD|
|Series 2 (Environmental systems)|Exponentials, differential equations|M3, M6|
|Series 3 (Spatial analysis)|Vectors, coordinate geometry|M2, M8|
|Series 4 (Cryosphere)|Differential equations, integration|M6|
|Series 6 (Atmospheric hazards)|Partial derivatives|M7|
|Series 12 (Data assimilation)|Linear algebra, probability|M8, M9|
|Series 16 (ML methods)|Linear algebra, probability, optimization|M8, M9, M5|
|Series 17 (Deep learning)|Linear algebra, chain rule|M5, M8|
|Series 25 (Economic geography)|Probability, regression|M9|

### Primer series pages

Each primer series needs a `_pages/math-primer-M*.md` with: `yaml layout: page permalink: /math/N/ title: "Math Primer M[N]: [Title]" series_number: [100 + N] # keep in separate number space from geography series series_key: math-primer-[slug]`

A landing page at `/math/` (not yet created) should list all nine primer series with a short "start here if you need..." description for each.