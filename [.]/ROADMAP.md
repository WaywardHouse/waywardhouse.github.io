# Wayward House — Content Roadmap

This document defines the intellectual architecture and publication plan for Wayward House's modelling curriculum. It covers both existing series (1–15) and planned extensions (16–25), with a particular focus on Canadian and Albertan context throughout.

The curriculum is designed as a **layered learning system**: foundational series (1–6) build mathematical and process-model literacy; intermediate series (7–15) apply those tools to specific earth systems; advanced series (16–18) add machine learning and hybrid modelling methods; applied series (19–25) bring the full toolkit to bear on real industry and economic problems.

---

## Existing Series (1–15)

### Series 1 — Foundations of Computational Geography
Mathematical language for spatial modelling: rates of change, coordinate systems, spherical geometry, linear change, exponential growth, logistic saturation, inverse-square attenuation, diffusion, gravity models, and Earth as a rotating sphere. 12 models (clusters A–E).

### Series 2 — Environmental Systems
Energy balance, canopy light attenuation, photosynthesis, snowpack energy balance, glacier mass balance, evapotranspiration. 16 models (clusters F–J).

### Series 3 — Spatial Analysis
Map algebra, viewshed, cost-distance, spatial interpolation, terrain analysis, network flow, DEM processing. 13 models (clusters K–N).

### Series 4 — Cryosphere Systems
Snow water equivalent estimation, glacial lake outburst floods, glacial meltwater chemistry, avalanche terrain, wind-driven snow redistribution. 10 models (clusters P–R).

### Series 5 — Advanced Remote Sensing
Hyperspectral imaging, thermal infrared, LiDAR, bathymetric LiDAR, SAR, InSAR, GRACE gravity, passive microwave. 7 models (clusters S–U).

### Series 6 — Atmospheric Hazards
Boundary layer turbulence, fire weather, fire spread modelling, fire emissions, hail formation, tornado dynamics, extreme wind, thunderstorm dynamics. 11 models (clusters V–Y).

### Series 7 — Geomorphology *(syllabus page: /series/7/)*
### Series 8 — Ocean Systems *(syllabus page: /series/8/)*
### Series 9 — Biogeography *(syllabus page: /series/9/)*
### Series 10 — Urban and Human Systems *(syllabus page: /series/10/)*
### Series 11 — Water Resources *(syllabus page: /series/11/)*
### Series 12 — Data Assimilation *(syllabus page: /series/12/)*
### Series 13 — Greenhouse Gas Systems *(syllabus page: /series/13/)*
### Series 14 — Climate System Integration *(syllabus page: /series/14/)*

### Series 15 — Computational Geography Laboratory
Advanced cross-domain models: SAR/InSAR, geophysical remote sensing, hillslope processes, fluvial geomorphology, coastal morphodynamics, urban climate, transportation, land use, reservoir operations, water quality, groundwater remediation, and an introduction to ML methods. 32 models (clusters T, U, AA–AU).

---

## New Series — Machine Learning and AI

### Series 16 — Machine Learning for Geographic and Environmental Systems

**Purpose:** Apply statistical learning methods to geographic prediction and classification problems. Emphasis on correct spatial methodology — spatial cross-validation, autocorrelation-aware train/test splits, feature engineering from terrain and satellite data.

**Series key:** `computational-geography-ml-applied`

| Cluster | Title | Models |
|---------|-------|--------|
| BA | Spatial Feature Engineering | Feature extraction from DEMs, satellite bands, neighbourhood statistics, distance metrics |
| BA | Supervised Classification | Land cover mapping from Landsat (Alberta foothills scene), accuracy assessment with spatial blocking |
| BB | Spatial Regression | Soil organic carbon prediction across the prairies; spatial cross-validation vs naive k-fold |
| BC | Random Forests for Environmental Prediction | Alberta wildfire danger rating from fire weather, fuel type, topography |
| BC | Gradient Boosting for Streamflow Forecasting | XGBoost/LightGBM on South Saskatchewan discharge; feature importance for operational decisions |
| BD | Clustering and Unsupervised Learning | Identifying ecoregions from satellite time series; k-means vs DBSCAN for spatial data |
| BE | Gaussian Processes for Spatial Interpolation | Kriging reframed as ML; hyperparameter tuning; comparison with traditional variogram fitting |
| BF | Model Interpretability for Environmental Models | SHAP values, partial dependence, spatial patterns in feature importance; when black boxes fail |

**Authoring notes:**
- All models use real or high-fidelity synthetic Canadian datasets (MODIS, Landsat, NRCan soil surveys, ECCC weather stations)
- Lead with a concrete prediction task, not methodology
- Every model includes spatial cross-validation — this is the non-negotiable methodological requirement that separates geographic ML from general ML

---

### Series 17 — Deep Learning for Earth Observation

**Purpose:** Convolutional and sequence models applied to satellite and aerial imagery. Alberta and Canadian landscapes as the primary study area — oil sands, boreal forest, prairie agriculture, Rocky Mountain terrain.

**Series key:** `computational-geography-deep-learning`

| Cluster | Title | Models |
|---------|-------|--------|
| CA | CNN Fundamentals for Image Classification | Landsat scene classification; building a CNN from scratch vs transfer learning; confusion matrix over Alberta land cover classes |
| CA | Semantic Segmentation of Satellite Imagery | U-Net for oil sands facility delineation; labelling strategy; handling class imbalance |
| CB | Object Detection in High-Resolution Imagery | Detecting well pads, storage tanks, and access roads from Sentinel-2; YOLO and its geographic relatives |
| CC | Change Detection | Bitemporal image differencing vs deep change detection; monitoring boreal deforestation and oil sands expansion |
| CD | Time Series Deep Learning | LSTM for river discharge at Red Deer; Transformer architecture for multi-station precipitation; teleconnections |
| CE | Transfer Learning and Foundation Models | Using pre-trained EO foundation models (Clay, Prithvi) on Canadian scenes; fine-tuning strategies |
| CF | Wildfire Mapping from Multi-Spectral Imagery | NBR burn severity mapping; active fire detection from VIIRS; post-fire recovery trajectories in boreal |

**Authoring notes:**
- Interactive visualisations for architecture diagrams (ECharts or custom D3)
- Python code cells (Pyodide where feasible; notebook links for GPU-dependent models)
- Alberta wildfire datasets (CWFIS, Parks Canada) anchor the applied examples

---

### Series 18 — Physics-Informed and Hybrid Models

**Purpose:** Hybrid models that embed physical knowledge in machine learning — reducing data requirements, enforcing conservation laws, extrapolating safely beyond training conditions. The frontier where process modelling and ML meet.

**Series key:** `computational-geography-hybrid-models`

| Cluster | Title | Models |
|---------|-------|--------|
| DA | Physics-Informed Neural Networks | PINNs for 1D groundwater flow (Darcy equation as loss penalty); solving PDEs without finite-difference grids |
| DA | Conservation Laws as Constraints | Enforcing water balance in a neural hydrological model; soft vs hard constraints |
| DB | Surrogate Models for Expensive Simulations | Emulating a reservoir simulator with a neural network; Latin hypercube sampling; uncertainty propagation |
| DC | Neural ODEs for Environmental Systems | Fitting a differential equation model to ecological data; continuous-time sequence models |
| DD | Hybrid Hydrological Modelling | Coupling a conceptual bucket model (HBV) with an ML residual corrector; the HybridHydro approach |
| DE | Reinforcement Learning for Resource System Operation | RL agent for reservoir release scheduling (Oldman River); reward design for competing objectives |

**Authoring notes:**
- These are research-frontier topics — each model should clearly delineate what is established vs exploratory
- Link to reproducible notebooks; code complexity is higher than earlier series

---

## New Series — Industry Verticals

The industry series are deliberately applied: they open with a real operational problem, build the minimum necessary model, and interpret results in terms a practitioner or analyst would recognize. The goal is not survey coverage but **feature-rich worked examples** that demonstrate what computational geography actually delivers in a professional context.

All series emphasize Alberta and Canadian settings. Where an analogous international example is pedagogically clearer, it is used as a secondary reference, not the primary case.

---

### Series 19 — Oil and Gas Systems

**Purpose:** Quantitative models for petroleum production, transportation, emissions monitoring, and project economics. Alberta is the anchor — Athabasca oil sands, Montney/Duvernay shale, pipeline corridors — with comparisons to other basins where instructive.

**Series key:** `computational-geography-oil-gas`

| Cluster | Title | Models | Alberta connection |
|---------|-------|--------|--------------------|
| OA | Reservoir Engineering Fundamentals | Material balance (Havlena-Odeh); Darcy's law and permeability; decline curve analysis (Arps hyperbolic) | Conventional Pembina/Wainwright pools; Cardium sandstone |
| OB | SAGD and Heavy Oil Modelling | Butler's SAGD steam chamber model; viscosity-temperature relationships; steam-oil ratio optimization | Athabasca/Cold Lake SAGD operations; CNOOC Long Lake |
| OB | Oil Sands Mining Operations | Truck-shovel production modelling; ore-grade dilution; tailings volume as a function of extraction rate | Syncrude/Suncor Athabasca mine design |
| OC | Pipeline Network Hydraulics | Steady-state Darcy-Weisbach flow; compressor station sizing; network optimization (LP formulation) | Trans Mountain, Keystone, Enbridge Mainline corridors |
| OC | Pipeline Integrity and Inspection | Defect growth modelling (crack vs corrosion); ILI tool accuracy; risk-based inspection interval | NEB pipeline safety data; Line 5 context |
| OD | Methane Emissions from Oil and Gas Operations | Bottom-up inventory: equipment-count × emission factor × activity; Gaussian plume dispersion from well pads | Alberta AER facility data; Peace River deep basin |
| OD | Satellite Detection of Methane Super-Emitters | TROPOMI column concentration anomalies; attribution to sources; Alberta vs Permian detection frequency | GHGSat and Carbon Mapper over Alberta |
| OE | Alberta Royalty Regime and Project Economics | Oil sands royalty (pre/post-payout sliding scale); netback: WTI → WCS differential → transport → royalties → OPEX | Fort Hills vs Hibernia fiscal regime comparison |
| OE | Breakeven Price and Capital Allocation | NPV, IRR, payback period; Monte Carlo on price and cost inputs; capital allocation under uncertainty | Athabasca vs Permian Basin breakeven comparison; capital flight post-2015 |

---

### Series 20 — Forestry and Carbon Systems

**Purpose:** Forest growth, disturbance, carbon accounting, and remote sensing for the boreal and montane forests of western Canada. Mountain pine beetle and wildfire are the defining disturbances; carbon markets are the economic context.

**Series key:** `computational-geography-forestry`

| Cluster | Title | Models | Canadian connection |
|---------|-------|--------|---------------------|
| FA | Forest Stand Growth Modelling | 3-PG model: radiation, temperature, water, nutrition limitations; age-class structure; site index | Black spruce and lodgepole pine; BC and Alberta inventory data |
| FA | Boreal Forest Succession | Patch-mosaic dynamics; fire-driven age-class cycling; steady-state vs transient landscapes | Northern Alberta boreal; Wood Buffalo National Park |
| FB | Canadian Forest Fire Weather System | Full FWI system derivation: FFMC, DC, DMC, ISI, BUI, FWI; spread rate from Canadian Fire Behaviour Prediction | 2016 Fort McMurray fire; CWFIS data |
| FB | Crown Fire Transition and Area Burned Modelling | Van Wagner crown fire initiation; spotting probability; provincial area burned regression | Alberta and BC historical fire datasets |
| FC | Mountain Pine Beetle Spread | Cold-kill threshold model; beetle developmental timing; stand susceptibility scoring | BC beetle kill 2000–2015; spillover into Alberta |
| FC | Post-Disturbance Carbon Flux | Net ecosystem carbon balance after fire vs harvest; fire return interval effects on long-run carbon stock | Boreal carbon model calibrated to FLUXNET-Canada sites |
| FD | Forest Carbon Protocols and Offsets | CBM-CFS3 accounting logic; additionality and permanence; Alberta offset market; forward crediting | Spray Lake Sawmills offset project |
| FE | Remote Sensing for Forest Monitoring | Landsat time series for disturbance detection; Sentinel-1 SAR for AGB estimation; Lidar-derived stand metrics | NFIS (National Forest Information System); CFS remote sensing data |

---

### Series 21 — Mining and Resource Extraction

**Purpose:** Geostatistical resource estimation, mine design, tailings management, and reclamation — anchored in Alberta oil sands and Saskatchewan mineral deposits.

**Series key:** `computational-geography-mining`

| Cluster | Title | Models | Canadian connection |
|---------|-------|--------|---------------------|
| MA | Geostatistics for Resource Estimation | Variogram modelling (experimental, fitting, anisotropy); ordinary kriging; resource classification | Oil sands ore grade (Alberta Energy Regulator); Jansen potash (BHP, Saskatchewan) |
| MA | Sequential Gaussian Simulation | Stochastic simulation of grade uncertainty; risk quantification for resource declaration | Sudbury nickel vs oil sands bitumen grade uncertainty |
| MB | Open Pit Mine Optimization | Lerchs-Grossmann ultimate pit limit; pushback design; NPV-maximizing production schedule | Syncrude/Suncor open pit progression; Copper Mountain BC |
| MB | Underground Mine Design | Stope sizing; drawpoint spacing; dilution vs recovery trade-off | Red Lake gold (Ontario); Cigar Lake uranium (Saskatchewan) |
| MC | Oil Sands Tailings Management | Fine tailings (MFT) water balance; beach slope model; fluid fine tailings consolidation | Athabasca oil sands tailings ponds; AER Directive 085 |
| MC | Tailings Geotechnical Stability | Liquefaction triggering (Seed-Idriss); factor of safety under static and seismic loading; monitoring design | Mount Polley (BC) as failure case; best practice from Alberta |
| MD | Mine Closure and Land Reclamation | Equivalent land capability (ALCES framework); revegetation species selection; pit lake water quality | Syncrude Mildred Lake reclamation; Gateway Hill |

---

### Series 22 — Prairie Agriculture

**Purpose:** Crop growth, soil health, irrigation, and climate risk across the Canadian prairies. Southern Alberta and Saskatchewan are the primary settings; the Peace River country (frost-risk agriculture) and the Manitoba lowlands round out the regional picture.

**Series key:** `computational-geography-agriculture`

| Cluster | Title | Models | Prairie connection |
|---------|-------|--------|---------------------|
| PA | Crop Growth and Evapotranspiration | FAO-56 reference ET; Penman-Monteith; growing-degree-day accumulation for wheat and canola | AAFC meteorological stations; AgriMet southern Alberta |
| PA | Soil Water Balance and Drought Stress | Thornthwaite-Mather water balance; rooting-depth extraction; yield penalty from deficit | Saskatchewan dryland wheat; Palliser Triangle vulnerability |
| PB | Prairie Soil Carbon and Erosion | RothC soil organic matter model calibrated to prairie Chernozems; RUSLE with AAFC land cover | Prairie Farm Rehabilitation Administration legacy data |
| PB | Salinization and Soil Degradation | Salt-affected land mapping; evaporite dissolution in glacial till; management response modelling | Alberta 'white soil' problem in central and southern regions |
| PC | Irrigation Management and Water Allocation | Consumptive use modelling; irrigation efficiency (centre-pivot vs flood); licence priority | Bow, Oldman, and St. Mary rivers; LNID and BRID allocations |
| PC | Drought Index and Water Conflict Modelling | SPI and PDSI derivation; conjunctive surface-groundwater modelling; allocation priority under shortage | South Saskatchewan River Basin water sharing agreement |
| PD | Crop Yield Variability and Climate Risk | Yield distribution modelling; price-yield joint risk; weather derivatives | AgriStability trigger model; crop insurance actuarial data |
| PD | Climate Change Impacts on Prairie Agriculture | Growing-degree-day shifts (CMIP6 for AB/SK); frost-free period extension; precipitation seasonality change | PCIC downscaled projections; Alberta Agriculture scenario tool |

---

### Series 23 — Energy Systems and Transition

**Purpose:** Electricity market design, renewable resource assessment, storage, and the economics of energy transition in a jurisdiction with one of the highest per-capita emissions and fastest-growing renewable sectors in North America.

**Series key:** `computational-geography-energy`

| Cluster | Title | Models | Alberta connection |
|---------|-------|--------|--------------------|
| QA | Electricity Market Design | Energy-only market equilibrium; merit order dispatch; price formation under scarcity; market power | Alberta AESO real-time price data; pool price spikes (2021, 2022) |
| QA | Transmission Constraints and Congestion | Optimal power flow (DC approximation); transmission capacity and line loading; LMP pricing | AESO transmission map; AB-BC interconnection limits |
| QB | Wind Resource Assessment | Weibull distribution fitting; roughness correction; turbine power curve; capacity factor probability | Pincher Creek / Crowsnest Pass wind corridor; Cowley Ridge data |
| QB | Solar PV Output Modelling | Clear-sky irradiance; plane-of-array conversion; temperature derating; bifacial gain | Southern Alberta solar: Travers Solar (largest in Canada) |
| QB | High-VRE Grid Integration | Residual load curve; curtailment probability; firm capacity requirement; duck-curve dynamics | AESO merit-order under growing solar/wind penetration |
| QC | Battery Storage Dispatch Optimization | Price arbitrage LP formulation; degradation-aware scheduling; co-optimization with ancillary services | Utility-scale BESS in Alberta deregulated market |
| QC | Hydrogen from Curtailed Renewables | Electrolysis efficiency; curtailment capture economics; blue vs green hydrogen cost comparison | Alberta blue hydrogen (ATCO/Air Products); Heartland Petrochemical Complex |
| QD | Stranded Assets and Energy Transition | Remaining productive life vs carbon price trajectory; option value of delay; stranded capital estimation | Alberta oil sands productive life under 1.5°C scenarios |
| QD | Just Transition Geography | Employment concentration in fossil fuel sectors; transition pathway modelling; community fiscal impact | Fort McMurray, Estevan, Drayton Valley employment mapping |

---

### Series 24 — Transport and Trade Corridors

**Purpose:** Network flow models, corridor economics, and supply chain resilience applied to the commodity-heavy transport systems that connect Canadian resource regions to global markets.

**Series key:** `computational-geography-transport`

| Cluster | Title | Models | Canadian connection |
|---------|-------|--------|---------------------|
| RA | Grain Movement and Rail Network Optimization | Network flow LP for grain from Saskatchewan/Alberta elevators to Vancouver/Prince Rupert; sensitivity to car supply | CP/CN grain data; Canada Grains Council movement reports |
| RA | Port Throughput and Congestion | Queue model for grain terminal; panamax vessel arrival process; truck-rail-ship interface | Port of Vancouver grain terminals; Roberts Bank expansion |
| RB | Pipeline Corridor Economics | Toll setting under NEB/CER; throughput-toll relationship; shipper commitment modelling | Trans Mountain expansion: who pays, who profits |
| RB | Energy Corridor Geopolitics | Access to tidewater: BC, Washington, US Gulf Coast alternatives; social licence as a capacity constraint | Northern Gateway failure; Keystone XL cancellation; TMX completion |
| RC | Arctic Shipping Routes | Distance savings: Northwest Passage vs Panama Canal; ice class requirements; season length under climate change | Canadian Arctic Archipelago; Nunavut shipping; icebreaker economics |
| RC | Supply Chain Resilience and Disruption | Network vulnerability analysis; single points of failure; rerouting cost under disruption | 2021 BC atmospheric river; Coquihalla closure; rail bridge collapses |
| RD | Critical Minerals Logistics | Mine-to-port routing for lithium, cobalt, nickel, rare earths; port infrastructure gaps | James Bay lithium; Ring of Fire logistics; BC port capacity |

---

### Series 25 — Economic Geography and Capital Flows

**Purpose:** The relationship between geography, resource endowments, capital mobility, and long-run economic outcomes. This is the most theoretical of the applied series but anchored throughout in Canadian economic history and current investment data.

**Series key:** `computational-geography-economic`

| Cluster | Title | Models | Canadian connection |
|---------|-------|--------|---------------------|
| SA | Staples Theory and Resource Dependency | Innis's staples thesis formalized; linkage effects (forward, backward, final demand); enclave vs integrated resource sectors | Alberta bitumen (enclave) vs forest industry (integrated); BC LNG future |
| SA | The Dutch Disease Model | Booming sector model (Corden-Neary); real exchange rate appreciation; de-industrialization mechanism | Alberta oil booms 2003–2008, 2010–2014; CAD/USD correlation with WTI |
| SB | Commodity Price Cycle Modelling | Mean reversion (Ornstein-Uhlenbeck) for WTI, copper, potash, lumber; super-cycles; price regime detection | Alberta fiscal budget forecasts vs realized WTI; Heritage Fund simulation |
| SB | Provincial Fiscal Dependency | Regression of Alberta non-renewable resource revenue on WTI price; fiscal capacity under price scenarios | Heritage Savings Trust Fund vs Norwegian Government Pension Fund: the counterfactual |
| SC | Capital Flow and FDI Gravity Models | Gravity model for foreign investment: distance, GDP, institutional quality, resource endowment; panel data | Oil sands FDI by country (US, China, EU); post-2015 capital exit |
| SC | Investment Geography under Regulatory Uncertainty | Option-value of delay; regulatory risk premium; capital allocation shift AB → TX/ND | Comparison of capital flows: Alberta vs Permian Basin 2015–2024 |
| SD | Energy Transition Finance | Integrated assessment of stranded asset value; carbon price scenarios (SCC, Canada federal backstop trajectory) | Oil sands NPV under $50/tonne vs $170/tonne carbon price; Suncor vs Shell divergence |
| SD | Transition Risk in Regional Economies | Fort McMurray real estate cycle model; municipal fiscal stress under declining assessment base; population outflow | Wood Buffalo Regional Municipality finances; 2008 and 2015 downturns |
| SE | Trade Competitiveness and Market Access | Export diversification index; revealed comparative advantage (RCA) for Canadian commodities; trade barrier modelling | Canadian softwood lumber countervailing duties; LNG cost comparison: BC vs Australia vs Qatar |
| SE | Critical Minerals and the New Resource Race | Supply chain geography for Li, Co, Ni, REEs; Canada's endowment vs production gap; strategic value to EV supply chains | Ring of Fire (Ontario), James Bay (Quebec), Athabasca Basin uranium |

---

## Authoring Guidelines for New Series

### What makes a good model in the applied series

1. **Open with a real operational question** — not "here is kriging" but "here is how Syncrude estimates ore grade ahead of mining and why getting it wrong costs $50M"
2. **Build the minimum viable model** — resist the temptation to add complexity before understanding the simple version
3. **Show the numbers working** — at least one worked example by hand before computing
4. **Feature-rich visualisation** — ECharts for time series and spatial comparisons; Leaflet or Mapbox for geographic context; D3 for custom charts. Every model should have at least one interactive element
5. **Interpret for the practitioner** — what does this output mean for a decision? Where does the model break down?
6. **Link Alberta/Canada data sources** — AER, AAFC, NRCan, ECCC, Statistics Canada, NEB/CER, AESO, CFS

### Difficulty ratings for new series

| Series | Typical difficulty |
|--------|-------------------|
| 16 (ML methods) | 3–4 |
| 17 (Deep learning) | 4–5 |
| 18 (Hybrid models) | 5 |
| 19–24 (Industry verticals) | 3–4 |
| 25 (Economic geography) | 3–5 |

### Data sources reference

| Domain | Source | Notes |
|--------|--------|-------|
| Oil & gas production | Alberta Energy Regulator (AER) ST-37, ST-53 | Public facility-level data |
| Pipeline data | CER (formerly NEB) | Pipeline throughput, tolls |
| Forest inventory | National Forest Information System (NFIS) | Stand-level data by province |
| Wildfire | Canadian Wildland Fire Information System (CWFIS) | Perimeters, FWI data |
| Crop data | AAFC Crop Inventory, AgriMet | Annual land cover, ET data |
| Electricity | AESO public data portal | Real-time price, generation mix |
| Grain movement | Canadian Grain Commission | Car loadings, port terminals |
| Economics | Statistics Canada, Bank of Canada | GDP, investment, trade flows |
| Satellite | USGS EarthExplorer, ESA Copernicus | Landsat, Sentinel-1/2, MODIS |
| Methane | TROPOMI/S5P, GHGSat | Column concentrations |
| Climate projections | PCIC (Pacific Climate Impacts Consortium) | CMIP6 downscaled for Canada |

---

## Publication Sequence

Series 19 (Oil & Gas) and 25 (Economic Geography) are highest priority — they are most distinctive to Wayward House's mandate and have no equivalent in the existing curriculum. Series 16 (ML methods) should follow immediately after to provide the methodological scaffold for the applied series.

Recommended order:
1. Series 25 — Economic Geography (2–3 models from cluster SA/SB to establish voice)
2. Series 19 — Oil and Gas (clusters OA and OD — reservoir fundamentals and methane monitoring)
3. Series 16 — ML methods (clusters BA and BC — spatial classification and random forests)
4. Series 20 — Forestry (cluster FB — fire weather and area burned)
5. Series 22 — Agriculture (cluster PC — irrigation and water allocation)
6. Continue expanding remaining clusters across all series

---

## What This Curriculum Is Not

- Not a textbook survey — models are chosen for their ability to carry a complete argument, not for completeness of coverage
- Not a software tutorial — code is present but it serves the model, not vice versa
- Not a policy brief — the models illuminate mechanisms; policy conclusions belong to the reader
- Not US-centric — where international comparisons add context they are used, but the default setting is Canada

---

## Side Quest — The Mathematics Primer

The primer is an ante-room to the main curriculum. Its purpose is not to replace a mathematics education but to give a reader who hits a wall — who sees a partial derivative and doesn't know what to do with it — a self-contained path back to solid ground before returning to the model that sent them here.

The structure mirrors a natural progression: from arithmetic and algebra through geometry, functions, and logarithms, across the bridge of pre-calculus, into single-variable and then multivariable calculus, and out through linear algebra and probability. Nine series, none of them long, each grounded in something you can see on a map or in a landscape.

Every topic is motivated before it is defined. Every definition leads immediately to a geographic example. Every example produces a number you can check.

**Series keys use a `math-primer-` prefix. Permalinks live under `/math/`.  
Series numbers use a separate M-prefix to keep them visually distinct from the geography curriculum.**

---

### Primer M1 — Numbers, Units, and Algebra

**Purpose:** The working language of quantitative reasoning. Not a remediation exercise — an invitation to notice that the arithmetic you already know is the same arithmetic that runs climate models.

**Series key:** `math-primer-algebra`  
**Permalink:** `/math/1/`

| Cluster | Title | Models |
|---------|-------|--------|
| AA | Numbers in the Physical World | Scientific notation and orders of magnitude; unit conversion and dimensional analysis; significant figures and measurement precision |
| AA | Variables and Equations | What a variable is and isn't; solving linear equations; rearranging formulas (isolating the term you want) |
| AB | Systems of Equations | Two equations, two unknowns: elimination and substitution; geometric interpretation as intersecting lines; three-equation systems for mixing problems |
| AB | Quadratics | Factoring and the quadratic formula; parabola shape and vertex; projectile trajectory as a geographic introduction |
| AC | Proportional and Inverse Relationships | Direct proportion, constant of proportionality; inverse proportion (gravity, light, sound); log-log linearity as a preview |
| AC | Inequalities and Intervals | Solving and graphing inequalities; interval notation; feasibility regions for resource constraints |

**Geographic anchors:** Elevation unit conversions (feet → metres → km); mixing proportions for soil amendments; river discharge as a product of area and velocity; daylight hours as a function of latitude.

---

### Primer M2 — Geometry and Trigonometry

**Purpose:** The spatial branch of mathematics. Every map is geometry; every slope calculation is trigonometry; spherical coordinates — which underpin all of Series 1 — require both.

**Series key:** `math-primer-geometry`  
**Permalink:** `/math/2/`

| Cluster | Title | Models |
|---------|-------|--------|
| BA | Euclidean Geometry | Angles, triangles, congruence, similarity; area and perimeter of standard shapes; the Pythagorean theorem as a distance formula |
| BA | Coordinate Geometry | Cartesian plane; distance and midpoint formulas; slope as rise over run; equation of a line (point-slope and slope-intercept) |
| BB | Right-Triangle Trigonometry | Sine, cosine, tangent defined from ratios; SOHCAHTOA; solving triangles; angles of elevation and depression |
| BB | The Unit Circle | Extending trig beyond right triangles; radian measure; exact values at 0, 30, 45, 60, 90; the Pythagorean identity |
| BC | Periodic Functions | Sine and cosine as waves; amplitude, period, phase shift; modelling seasonal temperature and daylight |
| BC | Polar Coordinates | From Cartesian to polar and back; distance in polar form; why polar coordinates simplify circular problems |
| BD | Spherical Geometry | Great circles; spherical excess; the haversine formula for distance on the globe; why longitude lines converge at the poles |

**Geographic anchors:** Slope and aspect from a DEM; viewshed angles; sun elevation at solstice; great-circle flight path Calgary to Tokyo; why 1° of latitude ≠ 1° of longitude in km.

---

### Primer M3 — Functions, Exponentials, and Logarithms

**Purpose:** Functions are the vocabulary of modelling. Exponentials and logarithms are the grammar of anything that grows, decays, or spans many orders of magnitude.

**Series key:** `math-primer-functions`  
**Permalink:** `/math/3/`

| Cluster | Title | Models |
|---------|-------|--------|
| CA | The Function Concept | Domain, codomain, range; function notation; vertical line test; piecewise functions |
| CA | Transformation of Functions | Horizontal and vertical shifts; stretching and reflecting; why f(x − a) shifts right, not left |
| CB | Composition and Inverse | Composing functions: f(g(x)); invertibility; finding inverses algebraically and graphically; why log is the inverse of exp |
| CB | Exponential Functions | The family 2^x, e^x, b^x; growth and decay; doubling time; half-life |
| CC | The Natural Logarithm | ln as the inverse of e^x; log rules (product, quotient, power); change of base |
| CC | Log Scales and Power Laws | Log-linear and log-log plots; linearizing exponential and power-law data; Richter scale, decibels, pH as geographic/physical examples |
| CD | Sequences and Series | Arithmetic and geometric sequences; partial sums; the geometric series formula; applications to compound interest and epidemic growth |

**Geographic anchors:** Radiocarbon dating (half-life); population doubling time; earthquake magnitude (log scale); Zipf's law for city sizes as a log-log relationship; acoustic attenuation in the atmosphere.

---

### Primer M4 — Pre-Calculus: Rates of Change

**Purpose:** The bridge between algebra and calculus. The core idea — that instantaneous rate of change is the limit of average rate of change — is introduced visually and intuitively before any formal limit machinery.

**Series key:** `math-primer-precalculus`  
**Permalink:** `/math/4/`

| Cluster | Title | Models |
|---------|-------|--------|
| DA | Average Rate of Change | Slope of a secant line; Δy/Δx over an interval; units matter; glacier retreat rate from historical surveys |
| DA | From Average to Instantaneous | Shrinking the interval; what the slope approaches; the tangent line problem stated informally |
| DB | Limits Informally | What "approaching" means; one-sided limits; limits at infinity; the ε-δ definition named but not required |
| DB | Continuity | What it means for a function to have no gaps or jumps; intermediate value theorem; relevance to physical systems |
| DC | The Difference Quotient | [f(x+h) − f(x)] / h; computing it for polynomials and square roots; why this expression is the engine of calculus |
| DC | Asymptotes and End Behaviour | Horizontal and vertical asymptotes; rational function behaviour; relevance to saturation models |

**Geographic anchors:** Rate of sea level rise (tide gauge data); average vs instantaneous river discharge; temperature gradient across a front; approach speed of a satellite.

---

### Primer M5 — Differential Calculus

**Purpose:** The mathematics of change. Differentiation rules, applied relentlessly to functions that model real geographic and environmental processes.

**Series key:** `math-primer-differential-calculus`  
**Permalink:** `/math/5/`

| Cluster | Title | Models |
|---------|-------|--------|
| EA | The Derivative Defined | Formal limit definition; derivative as a function; Leibniz vs Newton notation; differentiability |
| EA | Power Rule and Polynomial Derivatives | d/dx[xⁿ] = nxⁿ⁻¹; derivatives of sums; velocity and acceleration from a position function |
| EB | Product and Quotient Rules | Differentiating products and ratios; why the product rule is not (fg)' = f'g'; worked examples from concentration and flow |
| EB | Chain Rule | Differentiating composite functions; the most-used rule in applied calculus; temperature as a function of altitude as a function of latitude |
| EC | Derivatives of Transcendental Functions | d/dx[sin x], d/dx[cos x], d/dx[eˣ], d/dx[ln x]; chain rule with these; periodic and exponential models |
| EC | Higher-Order Derivatives | Second derivative and concavity; acceleration; inflection points; the second derivative test |
| ED | Optimization | Critical points; first and second derivative tests; finding maxima and minima; constrained optimization preview |
| ED | Related Rates | Two quantities changing together; implicit differentiation; applications to spreading fire, rising water, receding glacier |

**Geographic anchors:** Slope of a hillside as a derivative; optimal pipeline route (unconstrained); rate of change of temperature along an elevation gradient; melting rate of a retreating glacier.

---

### Primer M6 — Integral Calculus and Differential Equations

**Purpose:** Integration is the mathematics of accumulation. Differential equations are the language of process models — almost every model in the geography curriculum is, at its core, a differential equation.

**Series key:** `math-primer-integral-calculus`  
**Permalink:** `/math/6/`

| Cluster | Title | Models |
|---------|-------|--------|
| FA | Antiderivatives | Reversing differentiation; indefinite integrals; the constant of integration; power rule in reverse |
| FA | The Definite Integral | Signed area under a curve; Riemann sums; the definite integral as a limit |
| FB | Fundamental Theorem of Calculus | The two parts: differentiation and integration as inverses; evaluating definite integrals without Riemann sums |
| FB | Integration Techniques | Substitution (u-substitution); integration by parts; when to use which |
| FC | Applications of Integration | Area between curves; cumulative precipitation from a rate; volume of a reservoir from a depth-area curve |
| FC | Average Value and Accumulated Change | Average value of a continuous function; total runoff from a hydrograph; net displacement vs total distance |
| FD | Introduction to Differential Equations | What a DE is; order and linearity; verifying solutions; the DE y' = ky and its exponential solution |
| FD | Separable Differential Equations | Separation of variables; population growth, radioactive decay, Newton's law of cooling; logistic equation derived |

**Geographic anchors:** Volume of water behind a dam from depth-area curves; cumulative snowmelt from a melt-rate function; exponential decay of radiocarbon; logistic growth of a beaver population colonizing a watershed.

---

### Primer M7 — Multivariable Calculus

**Purpose:** The real world has more than one dimension. Terrain, atmosphere, and ocean are all functions of at least two spatial variables plus time. Multivariable calculus is the minimum toolkit for working with any of them.

**Series key:** `math-primer-multivariable`  
**Permalink:** `/math/7/`

| Cluster | Title | Models |
|---------|-------|--------|
| GA | Functions of Two Variables | Surfaces, contour plots, level curves; elevation as f(x, y); reading a topographic map as a mathematical object |
| GA | Partial Derivatives | Holding one variable fixed; ∂f/∂x and ∂f/∂y; geometric interpretation as slope in x and y directions |
| GB | The Gradient Vector | ∇f = (∂f/∂x, ∂f/∂y); gradient points uphill, magnitude is steepness; gradient descent as the inverse |
| GB | Directional Derivatives | Rate of change in an arbitrary direction; dot product with a unit vector; steepest ascent/descent as a maximization |
| GC | Optimization in Two Variables | Critical points: setting both partials to zero; second derivative test (Hessian determinant); saddle points |
| GC | Lagrange Multipliers | Constrained optimization: maximize f subject to g = 0; gradient condition; examples from resource allocation |
| GD | Double Integrals | Integrating over a 2D region; Fubini's theorem; change of order; area and volume as special cases |
| GD | Applications of Double Integrals | Mass of a variable-density region; centre of mass; expected value over a spatial domain; raster cell aggregation |

**Geographic anchors:** Gradient of a DEM as a flow direction vector; aspect angle from ∂z/∂x and ∂z/∂y; total sediment load over a watershed as a double integral; optimal weather station placement (constrained optimization).

---

### Primer M8 — Linear Algebra for Spatial Thinkers

**Purpose:** Vectors and matrices underlie coordinate transformation, remote sensing, spatial statistics, and machine learning. This series develops the geometric intuition first — linear algebra as a language for describing space, not just a set of matrix operations.

**Series key:** `math-primer-linear-algebra`  
**Permalink:** `/math/8/`

| Cluster | Title | Models |
|---------|-------|--------|
| HA | Vectors | Geometric vectors; addition and scalar multiplication; magnitude and direction; position vectors; displacement |
| HA | Dot Product and Angle | a·b = |a||b|cos θ; orthogonality; projection; how similarity between satellite spectral signatures is a dot product |
| HB | Cross Product and Normal Vectors | a × b; area of a parallelogram; normal to a plane; application to slope-aspect from three terrain points |
| HB | Matrices and Matrix Operations | Matrix addition, scalar multiplication, matrix multiplication; why AB ≠ BA; the identity matrix |
| HC | Systems of Linear Equations | Augmented matrix; row reduction (Gaussian elimination); consistent vs inconsistent systems; overdetermined systems |
| HC | Inverse and Determinant | Matrix inverse; 2×2 and 3×3 determinants; when a matrix is invertible; solving Ax = b |
| HD | Eigenvalues and Eigenvectors | What they are geometrically; characteristic polynomial; dominant eigenvalue; why PCA is an eigenproblem |
| HD | Linear Transformations | Rotation, scaling, reflection as matrices; composing transforms; coordinate system changes; map projections as linear approximations |

**Geographic anchors:** Rotation matrix for converting between geographic coordinate systems; PCA of a multispectral image as an eigenproblem; least-squares fitting as a matrix solve; adjacency matrix for a watershed network.

---

### Primer M9 — Probability and Statistics for Environmental Modellers

**Purpose:** Every measurement has uncertainty. Every model has parameters estimated from data. This series covers the probability and statistics needed to work honestly with environmental data — not a statistics course, but the foundations you need to understand confidence intervals, significance tests, and Bayesian reasoning in context.

**Series key:** `math-primer-probability`  
**Permalink:** `/math/9/`

| Cluster | Title | Models |
|---------|-------|--------|
| IA | Probability Foundations | Sample spaces and events; probability axioms; conditional probability; independence; Bayes' theorem introduced |
| IA | Counting and Combinatorics | Permutations and combinations; the binomial coefficient; relevance to ecological sampling design |
| IB | Discrete Distributions | Bernoulli, binomial, Poisson; mean and variance; fitting to wildfire ignition counts and flood occurrence |
| IB | Continuous Distributions | Probability density functions; the uniform and exponential distributions; the normal distribution and its parameters |
| IC | The Normal Distribution | Standard normal; z-scores; 68-95-99.7 rule; central limit theorem stated and illustrated |
| IC | Confidence Intervals | What a confidence interval means; CI for a mean; margin of error; how sample size affects precision |
| ID | Hypothesis Testing | Null and alternative hypotheses; p-values without mysticism; Type I and Type II error; practical vs statistical significance |
| ID | Regression and Correlation | Pearson correlation; least-squares line; R²; residuals; what regression can and cannot show | 
| IE | Introduction to Bayesian Reasoning | Prior, likelihood, posterior; Bayes' theorem for continuous parameters; how evidence updates belief; contrast with frequentist inference |
| IE | Uncertainty Propagation | How uncertainty in inputs becomes uncertainty in outputs; Monte Carlo error propagation; sensitivity analysis |

**Geographic anchors:** Flood return period (recurrence interval) as a probability; normal approximation for annual precipitation; Poisson model for wildfire ignitions; Bayesian updating of glacier mass balance estimates; Monte Carlo uncertainty in a crop yield model.

---

## Math Primer — Design Principles

### What makes this different from a textbook

**Every concept is motivated before it is defined.** The slope of a hillside motivates the derivative; the area of a watershed motivates the integral; the direction of steepest ascent motivates the gradient. A reader who has been confused by calculus in the abstract should find it obvious when they are standing on a mountain.

**The progression is honest about difficulty.** Pre-calculus (M4) is harder than it looks; multivariable calculus (M7) is harder still. The primer does not pretend otherwise. What it promises is that each step follows naturally from the one before, and that the geographic context makes the investment worthwhile.

**Practice is built in, not bolted on.** Each model ends with 3–5 worked problems drawn from geographic or environmental contexts — not x² + 3x − 4 = 0, but "the elevation z of a hillside is given by z = 100 − 2x² − y². At what point (x, y) does the terrain reach its maximum elevation?"

**Interactive visualisations carry the intuition.** The derivative as a tangent line that pivots as a point moves along a curve. The gradient vector as an arrow on a terrain surface. The double integral as volume filling up under a surface. These are the images that make the abstraction stick.

### Linking primer to curriculum

The primer is not prerequisite-gated — a reader can enter the geography curriculum at Series 1 without touching the primer. But every geography model that requires a specific mathematical concept carries a **"Math foundation"** link in the essay hero pointing to the relevant primer model.

Suggested cross-links:

| Geography series | Math prerequisite | Primer link |
|-----------------|-------------------|-------------|
| Series 1 (Foundations) | Algebra, functions, trig | M1, M2, M3 |
| Series 1, Model 12 (Rotating sphere) | Spherical geometry, trig | M2 cluster BD |
| Series 2 (Environmental systems) | Exponentials, differential equations | M3, M6 |
| Series 3 (Spatial analysis) | Vectors, coordinate geometry | M2, M8 |
| Series 4 (Cryosphere) | Differential equations, integration | M6 |
| Series 6 (Atmospheric hazards) | Partial derivatives | M7 |
| Series 12 (Data assimilation) | Linear algebra, probability | M8, M9 |
| Series 16 (ML methods) | Linear algebra, probability, optimization | M8, M9, M5 |
| Series 17 (Deep learning) | Linear algebra, chain rule | M5, M8 |
| Series 25 (Economic geography) | Probability, regression | M9 |

### Primer series pages

Each primer series needs a `_pages/math-primer-M*.md` with:
```yaml
layout: page
permalink: /math/N/
title: "Math Primer M[N]: [Title]"
series_number: [100 + N]   # keep in separate number space from geography series
series_key: math-primer-[slug]
```

A landing page at `/math/` (not yet created) should list all nine primer series with a short "start here if you need..." description for each.

