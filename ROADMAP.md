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
