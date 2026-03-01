---
layout: series
title: "Series 3: Computational Spatial Analysis"
subtitle: "Quantitative methods for raster and vector geographic data"
series_number: 3
total_essays: 14
difficulty_range: 3-5
estimated_hours: 50
prerequisites: [series-1]
tags: [gis, spatial-analysis, interpolation, map-algebra, statistics]
---

## Series Overview

This series develops the quantitative toolkit for geographic information science, covering map algebra, spatial interpolation, kernel density estimation, spatial autocorrelation, and time series analysis of geographic data. These are the core computational methods underlying modern GIS and spatial data science.

## Pedagogical Approach

**Algorithms before software.** Each method is derived mathematically and implemented from scratch before discussing its application in GIS software. Students understand what ArcGIS or QGIS does internally, not just which buttons to click.

**Real rasters, real vectors.** All examples use authentic geospatial datasets—DEMs, satellite imagery, census data, GPS tracks. Students work with the data structures and file formats of professional practice.

## Learning Objectives

By completing this series, learners will:

1. **Implement map algebra operations** on raster datasets (local, focal, zonal, global)
2. **Apply interpolation methods** (IDW, kriging, splines) with understanding of their mathematical basis
3. **Estimate spatial densities** using kernel methods for point pattern analysis
4. **Detect spatial autocorrelation** via Moran's I and variogram analysis
5. **Perform change detection** on multi-temporal imagery
6. **Analyze spatial-temporal data** through time series methods
7. **Understand uncertainty propagation** in spatial analysis workflows
8. **Select appropriate methods** based on data characteristics and analysis goals

## Essay Sequence

### Cluster J: Map Algebra (Essays 29-32)

**Essay 29: Local Operations and Band Math**
Cell-by-cell operations. NDVI calculation. Boolean masks. Reclassification.

**Essay 30: Focal Operations and Convolution**
Neighborhood analysis. Kernel-based filtering. Slope/aspect computation. Edge detection.

**Essay 31: Zonal Statistics**
Summary by regions. Categorical analysis. Watershed characterization.

**Essay 32: Global Operations and Cost-Distance**
Entire-raster analysis. Distance transforms. Least-cost paths. Connectivity.

### Cluster K: Spatial Interpolation (Essays 33-36)

**Essay 33: Inverse Distance Weighting**
Weighted nearest neighbors. Distance decay functions. Parameter sensitivity.

**Essay 34: Kriging and Geostatistics**
Semivariogram modeling. Ordinary kriging. Prediction uncertainty quantification.

**Essay 35: Spline Interpolation**
Thin-plate splines. Regularization vs exact interpolation. Smoothness constraints.

**Essay 36: Interpolation Method Comparison**
Cross-validation. Error metrics. Method selection criteria.

### Cluster L: Point Pattern Analysis (Essays 37-40)

**Essay 37: Kernel Density Estimation**
Bandwidth selection. Quartic vs Gaussian kernels. Edge effects. Applications to crime mapping.

**Essay 38: Spatial Autocorrelation - Moran's I**
Global vs local indicators. Significance testing. Spatial weights matrices.

**Essay 39: Hotspot Detection (Getis-Ord Gi*)**
Local clustering statistics. Z-scores. False discovery rate correction.

**Essay 40: Point Process Models**
Homogeneous vs inhomogeneous Poisson. Intensity estimation. Simulation.

### Cluster M: Time Series Analysis (Essays 41-42)

**Essay 41: Change Detection in Multi-Temporal Imagery**
Differencing. Regression. Thresholding. Land cover change quantification.

**Essay 42: Spatial Time Series Decomposition**
Trend, seasonality, noise separation. NDVI phenology. Climate decomposition.

## Computational Skills Developed

- Raster data manipulation (NumPy arrays, GDAL)
- Vector geometry operations (Shapely, GeoPandas)
- Spatial indexing (R-trees, quadtrees)
- Variogram fitting (optimization)
- Monte Carlo simulation for uncertainty
- Parallel processing for large rasters

## Mathematical Progression

**Early essays:** Matrix operations, convolution, weighted averaging

**Middle essays:** Optimization (kriging, splines), probability (spatial statistics)

**Late essays:** Time series methods, hypothesis testing, multiple comparison corrections

## Prerequisites

**Required:** Series 1 (calculus, vectors, optimization basics)

**Helpful:** Basic linear algebra (matrix multiplication)

**Not required:** Prior GIS software experience

## Entry Points by Background

**GIS analysts:** Jump directly to this series. Essays provide mathematical depth behind familiar tools.

**Data scientists:** Start Essay 33 (interpolation). Spatial methods complement time series/ML background.

**Geography students:** Complete Series 1 first for mathematical foundation.

**Remote sensing focus:** Essays 29-30 (map algebra) + 41-42 (change detection) most relevant.

## Key Insights

1. **Map algebra is array programming.** Raster GIS operations are linear algebra on grids.

2. **Interpolation makes assumptions.** Every method embeds beliefs about spatial continuity.

3. **Spatial autocorrelation violates independence.** Standard statistics fail; spatial methods required.

4. **Bandwidth/distance parameters critical.** Small changes dramatically affect results.

5. **Uncertainty compounds.** Multi-step workflows accumulate error from each operation.

6. **Edge effects matter.** Boundary conditions affect results near dataset limits.

7. **Computational efficiency essential.** Large rasters demand algorithmic awareness.

## Applications Covered

- Agricultural yield mapping (interpolation)
- Urban heat island detection (focal operations, hotspots)
- Deforestation monitoring (change detection)
- Wildlife habitat suitability (map algebra, zonal stats)
- Disease clustering (point pattern analysis)
- Vegetation phenology (time series)
- Watershed delineation (global operations)

## Assessment Strategies

**Formative:**
- Implement algorithm on small test dataset
- Compare results to ground truth
- Vary parameters, observe sensitivity

**Summative suggestions:**
- Complete spatial analysis workflow on novel dataset
- Justify method selections with quantitative criteria
- Implement custom GIS operation from scratch
- Reproduce published analysis, critique methods

## Software Integration

While essays derive methods from scratch, practical GIS implementation discussed:

- **Python:** GDAL, rasterio, geopandas, pysal
- **R:** sf, stars, gstat, spatstat
- **QGIS:** Processing toolbox equivalents
- **ArcGIS:** Spatial Analyst, Geostatistical Analyst

## Extensions and Pathways

**For remote sensing:** Continue to Series 5 (image classification, spectral analysis)

**For environmental modeling:** Series 2 + Series 4 (process-based models)

**For advanced statistics:** Bayesian spatial models, geographically weighted regression (future series)

## Estimated Time Investment

**Per essay:** 3-5 hours (derivation + implementation + real data application)

**Full series:** 45-70 hours

**Core GIS sequence (Essays 29-32, 33, 37-38):** 20-30 hours

---

**Prerequisites:** Complete Series 1 before starting. Series 2 helpful but not required.

**Next:** Series 5 (Remote Sensing) builds on map algebra and change detection methods.
