---
layout: essay
title: "The Texas of the North"
subtitle: "What the Comparison Actually Reveals — and What It Obscures"
series: "Alberta in Context"
series_order: 3
date: 2026-02-19
last_modified_at: 2026-02-26
author: Paul Hobson
categories:
  - economic-geography
  - comparative-political-economy
tags:
  - alberta
  - texas
  - oklahoma
  - federalism
  - energy-economics
  - permian-basin
  - oil-sands
  - boom-bust
  - hash-viz
description: >
  An analytical comparison of Alberta, Texas, and Oklahoma as energy economies —
  covering the structural parallels, the crucial differences, and the hard
  reality of what American-style federalism would actually mean for Alberta's oil.
excerpt: >
  Alberta is routinely called the Texas of the North. The comparison is not
  without merit — both are energy economies that chafe against federal
  government. But the fiscal flows run opposite to what most Albertans assume,
  the pipeline jurisdiction problem does not disappear under American
  federalism, and Oklahoma may be the more instructive comparison than Texas.
difficulty: 3
domain: economic-geography
math_core: proportional-reasoning
spatial_reasoning: comparative-systems
toc: true
comments: true
---

## Part A: Why the Comparison Is Made at All

### The Structural Parallel

Alberta is routinely called the Texas of the North, and the comparison is not without merit. Both are landlocked energy provinces whose political culture was shaped by the oil industry, both chafe against what they see as an unsympathetic federal government dominated by more populous coastal regions, and both generate more economic output than their population share would suggest. At the level of attitude and identity, the comparison resonates.

At the level of economic structure, it holds up reasonably well — and understanding exactly where it holds and where it breaks down is the point of this essay.

### 1.1 The Numbers Side by Side

```echarts
{
  "title": { "text": "Alberta, Texas, and Oklahoma: Key Indicators", "left": "center", "textStyle": { "fontSize": 15 } },
  "tooltip": { "trigger": "axis" },
  "legend": { "bottom": 0, "data": ["Alberta", "Texas", "Oklahoma"] },
  "xAxis": {
    "type": "category",
    "data": ["Population\n(millions)", "GDP per capita\n(US$ thousands)", "Energy as %\nof exports/GDP", "Unemployment\nrate (%)"],
    "axisLabel": { "fontSize": 11, "interval": 0 }
  },
  "yAxis": { "type": "value" },
  "series": [
    { "name": "Alberta", "type": "bar", "data": [4.9, 51, 72.5, 6.5] },
    { "name": "Texas", "type": "bar", "data": [31.3, 86, 17.6, 4.1] },
    { "name": "Oklahoma", "type": "bar", "data": [4.1, 65, 23, 3.4] }
  ]
}
```

| Indicator | Alberta | Texas | Oklahoma |
|:---|:---|:---|:---|
| Population | 4.9M | 31.3M | 4.1M |
| GDP (2024) | C$345B (~US$250B) | US$2.77T | US$273B |
| GDP per capita | ~C$70,000 | ~US$86,000 | ~US$65,000 |
| Share of national GDP | ~12.2% | ~9.4% of U.S. GDP | ~1% of U.S. GDP |
| Energy as % of exports/GDP | 72.5% of int'l exports | ~17.6% of GDP (goods) | Oil & gas ~23% of GDP |
| Unemployment rate (2024) | ~6.5% | ~4.1% | ~3.4% |
| No provincial/state income tax? | No — has provincial income tax | Yes — no state income tax | No — has state income tax |
| Federal transfers: net contributor? | Yes — massively (net +$17B/yr) | No — net receiver ($71.1B in 2022) | Net receiver |
| Population growth rate | Strong (interprovincial migration) | Strong (domestic & foreign migration) | Moderate |

*Sources: BEA, Statistics Canada, Dallas Fed, OERB, Rockefeller Institute 2022 data.*[^rockefeller]

[^rockefeller]: Rockefeller Institute of Government, federal balance of payments data, 2022.

> **The first surprise:** Alberta is a net contributor to Canadian federal finances (\$17B+ per year). Texas is a net receiver of federal funds, taking in \$71.1 billion more from Washington than it pays in federal taxes. Alberta's political identity includes the conviction that it funds everyone else. In the U.S. federal system, Texas is the one being funded.
{:.callout}

### 1.2 What Makes the Parallel Work

Several structural features genuinely parallel between Alberta and Texas:

**Resource concentration as identity.** Both economies were built on extraction and shaped by the boom-bust cycle of commodity prices. The oil patch is not just an industry in either place — it is the foundational economic and cultural experience.

**Resentment of federal overreach.** Texas fought federal pipeline regulation, environmental restrictions, and land use policy for decades, just as Alberta has fought against the National Energy Program, carbon taxes, and federal pipeline authority. In both cases, the energy industry provides the political vocabulary of grievance.

**Low-tax fiscal conservatism.** Alberta has no provincial sales tax and Canada's lowest provincial income taxes. Texas has no state income tax. Both political cultures treat low taxation as a core value.

**Outsize economic contribution.** Alberta generates 32.2% of Canadian exports from 12% of the population. Texas led all U.S. states in export revenues ($455B in 2024) — the economic engine of the sunbelt.

### 1.3 Oklahoma: A Complementary Comparison

Texas dominates the comparison because of its size and confidence. But Oklahoma is, in many ways, a useful additional comparison for Alberta — a smaller energy-dominated economy sitting in the shadow of a larger neighbour, with a structural over-dependence on oil and gas and a chronic tendency to underperform the national average during busts.[^kc-fed]

[^kc-fed]: Kansas City Federal Reserve, Oklahoma Economist series.

```echarts
{
  "title": { "text": "Oklahoma vs. Alberta: Boom-Bust Vulnerability", "left": "center", "textStyle": { "fontSize": 15 } },
  "tooltip": { "trigger": "axis" },
  "legend": { "bottom": 0 },
  "xAxis": { "type": "category", "data": ["Boom GDP Growth\n(annual avg)", "Bust GDP Growth\n(annual avg)", "Median Income\nvs. National Avg", "Poverty Rate\nvs. National Avg"] },
  "yAxis": { "type": "value", "axisLabel": { "formatter": "{value}%" } },
  "series": [
    { "name": "Oklahoma", "type": "bar", "data": [6.6, -2.1, -21, 2.9], "label": { "show": true, "position": "top" } },
    { "name": "Alberta (analogous)", "type": "bar", "data": [5.5, -1.5, 15, -2], "label": { "show": true, "position": "top" } }
  ]
}
```

| Measure | Oklahoma | Alberta (analogous) |
|:---|:---|:---|
| Oil & gas as % of state GDP (2024) | ~23% per OERB | ~72.5% of international exports |
| GDP per capita rank | 42nd of 50 states | Highest of Canadian provinces |
| Median household income vs. national | $62,000 vs. $78,000 (21% below) | Well above national average |
| GDP growth volatility | 6.6% boom, -2.1% bust (2011–2019) | Similar energy price correlation |
| Economic diversification | Limited — technology sector emerging | Limited — services growing |
| Federal dependency | Net receiver | Net contributor |
| Poverty rate | 15.3% (above national 12.4%) | Below national average |

*Sources: U.S. Census, BEA, Kansas City Fed Oklahoma Economist series, OERB, Statistics Canada.*

Oklahoma's economic history is instructive for what happens when an energy-dependent economy faces sustained price pressure without diversification. During the 2011–2015 oil boom, Oklahoma averaged 4.3% annual GDP growth. During the subsequent bust (2015–2019), that collapsed to 0.5% per year — while the U.S. economy grew at 2% throughout. Median household income in Oklahoma sits 21% below the national average, and the state's poverty rate is among the highest in the nation.

Alberta's per capita advantage over Oklahoma is enormous — Alberta's energy wealth reaches its citizens more effectively. But Oklahoma illustrates a trajectory risk: an energy economy that fails to diversify will, over the long run, deliver boom-and-bust cycles that leave the average citizen worse off than the national average, regardless of how much oil is in the ground.

---

## Part B: What American-Style Federalism Actually Means for Energy

### 2.1 The Federal Fiscal Reality

The single most important fact in the Alberta-Texas comparison is the one least discussed: Texas is a net receiver of federal spending, not a net contributor. In 2022, Texas received $71.1 billion more in federal spending than its residents and businesses paid in federal taxes.[^rockefeller2]

[^rockefeller2]: Rockefeller Institute of Government, Annual Fiscal Flows report, 2022.

Alberta, by contrast, contributed a net \$17 billion or more annually to Ottawa above what it received back in services and transfers — a position it has maintained for decades. From 2007 to 2023, the cumulative net transfer from Alberta to the federal government was \$267.4 billion.[^fairness]

[^fairness]: Fairness Alberta fiscal contribution data; Statistics Canada Fiscal Reference Tables.

```echarts
{
  "title": { "text": "Net Federal Fiscal Position: Alberta vs. Texas", "left": "center", "textStyle": { "fontSize": 15 } },
  "tooltip": { "trigger": "axis" },
  "xAxis": { "type": "category", "data": ["Alberta\n(annual, CAD)", "Texas\n(2022, USD)"] },
  "yAxis": { "type": "value", "axisLabel": { "formatter": "${value}B" }, "name": "Net fiscal position" },
  "series": [{
    "type": "bar",
    "data": [
      { "value": 17, "itemStyle": { "color": "#e74c3c" } },
      { "value": -71.1, "itemStyle": { "color": "#2ecc71" } }
    ],
    "label": { "show": true, "position": "insideTop", "formatter": function(p) { return p.value > 0 ? "+$" + p.value + "B\n(contributes)" : "-$" + Math.abs(p.value) + "B\n(receives)"; } }
  }],
  "graphic": [{ "type": "text", "left": "center", "top": 45, "style": { "text": "Positive = net contributor to federal system; Negative = net recipient", "fontSize": 11, "fill": "#888" } }]
}
```

| Fiscal Measure | Alberta in Canada | Texas in USA |
|:---|:---|:---|
| Annual net fiscal position | +$17B (contributor) | -$71.1B (recipient) |
| Federal tax paid vs. spending received | Pays far more than receives | Receives far more than pays |
| Equalization payments received | Zero — not since 1964 | Equivalent programs: net positive |
| Federal grants per capita (2024) | C$2,547/person (2nd lowest) | Receives ~$2,271/person net |
| Net contribution 2007–2022 | $244.6B net to Ottawa | Net $71.1B received from Washington in 2022 alone |

The Texas model does not produce a wealthier energy state that keeps more of its own money. It produces an energy state that, because it has large populations of lower-income residents and pays lower taxes per capita than California or New York, ends up receiving net federal redistribution. Alberta's frustration is that it writes the cheques. Texas, on net, cashes them.

### 2.2 The Pipeline Problem: Federal Control Doesn't Disappear

The most persistent political grievance in Alberta is federal obstruction of pipeline construction — Northern Gateway blocked, Energy East revived and threatened, the decade-long TMX saga. The implicit assumption in the Texas comparison is that in an American-style federal system, Alberta would control its own pipelines.

It would not. Interstate pipelines in the U.S. are regulated by the Federal Energy Regulatory Commission (FERC), an independent federal agency that regulates the interstate transmission of oil, natural gas, and electricity. No state — not Texas, not Oklahoma, not any other — has the authority to approve, reject, or set rates for a pipeline that crosses a state line. The FERC review process involves environmental assessment, public comment periods, and federal oversight functionally similar to the Canadian NEB process that Albertans find frustrating.[^ferc]

[^ferc]: Federal Energy Regulatory Commission, regulatory authority and jurisdiction summary.

> **Institutional fact:** Texas has the largest pipeline infrastructure in the United States — roughly one-sixth of all U.S. pipeline mileage. It has no control over the pipelines that cross into other states. That authority rests entirely with Washington. The federal pipeline problem does not disappear under American federalism; it has a different acronym.
{:.callout}

The 2021 Texas winter storm — in which the state's electricity grid collapsed, killing over 200 people and causing tens of billions in damages — illustrated another dimension of what energy independence within the U.S. looks like. Texas runs its own electricity grid (ERCOT) specifically to avoid federal regulation. When that grid failed catastrophically, the state had no federal backstop and no ability to import power in volume. Independence from federal regulation produced fragility, not strength.

### 2.3 The Tax Calculation

There is a persistent belief that the federal tax burden imposed on Albertans is uniquely punitive — that they would keep more of their money in a different arrangement. The comparison with Texas requires examining what Albertans would actually pay under American federal tax rules.

| Tax Comparison | Alberta Resident (C$150,000 income) | Texas Resident (US$110,000 equivalent) |
|:---|:---|:---|
| Federal income tax | Paid to CRA at federal rates | Paid to IRS at federal rates (similar brackets) |
| Provincial/state income tax | ~10–14% provincial rate | Zero — no state income tax |
| Sales tax | 5% GST only (no PST) | 6.25% state + up to 2% local = 8.25% |
| Property taxes | Lower — provincial education levy | Among highest in U.S. — fund schools locally |
| Healthcare | Included in public system | Employer/private — median cost $7,500+/year |
| Net effective burden | Moderate — healthcare included | Often higher when healthcare costs included |

The no-state-income-tax status that makes Texas popular among high earners looks different when adding healthcare costs, higher property taxes, and the realization that public services — schools, roads, social infrastructure — in Texas are noticeably below Canadian standards in a number of categories. Alberta already provides a combination of low provincial taxes and high-quality public services that the Texas model does not obviously replicate.

### 2.4 The Bust Lesson

Texas's energy economy has been through multiple catastrophic price collapses, and the historical record is instructive. The boom-bust cycle is not a problem that American-style federalism solved — in some respects it amplified it.[^fdic]

[^fdic]: FDIC Historical Records, "Banking Problems in the Southwest," Texas/Oklahoma bank failure data 1980–1990.

Between 1982 and 1987, Houston lost 211,000 jobs as oil prices collapsed from their 1981 highs. At peak, one in eight Houstonians was unemployed. The banking system effectively failed: Texas saw more bank failures between 1980 and 1990 than any other state. Real estate prices in Houston fell 25–30% and remained depressed for years. The Savings and Loan crisis of the late 1980s, which required a massive federal bailout, was in significant part a Texas oil patch story — institutions that had lent against \$35 oil prices in 1982 found themselves holding worthless collateral when prices hit \$9 in 1986.[^tx-tribune]

[^tx-tribune]: Texas Tribune; Texas Monthly; Houstonia Magazine — Houston oil bust retrospectives.

Alberta went through its own version of this in 2014–2017, losing roughly 100,000 high-wage jobs when oil prices collapsed from over $100 per barrel to under $30. The parallels are genuine. The difference is that during Alberta's bust, federal unemployment insurance, federal stabilization mechanisms, and interprovincial labour mobility cushioned the blow in ways that the Texas state government — with its limited revenue base and constitutional hostility to debt — cannot replicate.

Oklahoma's bust history makes the same point. When the oil price collapsed in the 1980s, Oklahoma saw its banking system decimated, its agricultural sector devastated simultaneously, and a prolonged economic depression from which large parts of the state never fully recovered. Rural Oklahoma today remains one of the economically distressed regions in the United States, despite sitting on significant hydrocarbon resources.

---

## Part C: Two Very Different Products in a Single Global Market

### 3.1 What Each Deposit Actually Is

When Albertans and Americans debate the relative merits of their respective oil industries, they are often comparing products that are fundamentally different in geology, production economics, and market positioning.

| Feature | Permian Basin (Texas/New Mexico) | Athabasca Oil Sands (Alberta) |
|:---|:---|:---|
| Deposit type | Light tight oil (shale) | Bitumen — ultra-heavy oil in sand |
| Estimated reserves | ~46 billion barrels proved (basin) | ~163 billion barrels proved (Canada — mostly AB) |
| Production method | Hydraulic fracturing of horizontal wells | Open-pit mining or SAGD |
| Output quality | Light, sweet — 38–45 API gravity, low sulfur | Heavy, sour — 8–12 API gravity (bitumen) |
| Refinery compatibility | Compatible with most refineries as-is | Requires dilution (dilbit) or upgrading |
| Capital intensity | Well drilled in days; production starts immediately | Facilities require billions and years to build |
| Well lifespan & decline | Steep decline curve (60–80% year 1) | Decades-long stable production once built |
| 2024 production | ~6.3 million bbl/day (48% of U.S. production) | ~3.7 million bbl/day (and growing) |

*Sources: U.S. EIA, Enverus Intelligence Research, Canadian Association of Petroleum Producers, Library of Parliament.*[^eia][^enverus]

[^eia]: U.S. Energy Information Administration, Permian Basin production data, 2024.
[^enverus]: Enverus Intelligence Research, oil sands cost structure, April 2025.

### 3.2 The Cost Structure

The conventional wisdom — that Permian shale is cheap and oil sands are expensive — is true at the level of greenfield capital cost but significantly misleading when applied to operating existing facilities.

```echarts
{
  "title": { "text": "Breakeven Cost Comparison (WTI equivalent, $/bbl)", "left": "center", "textStyle": { "fontSize": 15 } },
  "tooltip": { "trigger": "axis" },
  "legend": { "bottom": 0 },
  "xAxis": { "type": "category", "data": ["New well/project\nbreakeven", "Operating cost\n(existing)", "Existing production\nbreakeven", "Projected 2035\nnew-well breakeven"] },
  "yAxis": { "type": "value", "axisLabel": { "formatter": "${value}" }, "name": "$/barrel" },
  "series": [
    { "name": "Permian Basin", "type": "bar", "data": [63, 9, 35, 95] },
    { "name": "Oil Sands (existing SAGD)", "type": "bar", "data": [80, 26, 40, null] }
  ]
}
```

| Cost Metric | Permian Basin | Oil Sands (existing SAGD/mining) |
|:---|:---|:---|
| New well breakeven (WTI) | $62–64/bbl (2024) | $74/bbl avg; top-tier SAGD needs $80+ for greenfield |
| Operating cost (existing) | $8–10/bbl LOE — very low | $23–30/bbl USD operating cost |
| Breakeven for existing production | ~$30–40/bbl (sunk capital) | ~$30–50/bbl (once facility built) |
| Production decline rate | 60–80% in year 1; requires constant redrilling | Essentially flat for 30–50 years |
| Capital reinvestment required | Continuous — treadmill to maintain production | Minimal once sunk — primarily maintenance |
| Price differential to WTI | Minimal | WCS typically C$10–20 below WTI |
| Long-run supply cost (full cycle) | Rising — core Permian acreage depleting | Stable to declining with efficiency gains |

*Sources: Dallas Federal Reserve Energy Survey 2024; EIA; Enverus Intelligence Research 2025; ATB Financial Oil Sands analysis.*[^dallas-fed]

[^dallas-fed]: Dallas Federal Reserve, Quarterly Energy Survey, 2024.

> **Different business models:** The Permian's advantage is speed and flexibility — drill a well in days, produce immediately, stop when prices fall. The oil sands' advantage is durability — once the billions are spent, production is stable for decades at declining operating cost. These are genuinely different business models, not just versions of the same thing.
{:.callout}

One projection worth noting: U.S. shale breakeven costs for new wells are forecast to rise from approximately \$70/bbl today to \$95/bbl by 2035 as the best core acreage in the Permian is exhausted. Oil sands operating costs, meanwhile, have been declining — Suncor reduced its breakeven cost by US$7/barrel in 2024 alone. The long-run economics of the two deposits may be converging, but not in the direction most critics of the oil sands assume.

### 3.3 The Geopolitical Positioning

Both the Permian and the oil sands are exposed to global oil prices set by OPEC+ — primarily Saudi Arabia, which can produce at ~$29 per barrel and flood the market when it chooses. This shared exposure is the most important long-run fact about North American oil production.

| Vulnerability Factor | Permian | Oil Sands |
|:---|:---|:---|
| OPEC+ price war exposure | High — new drilling pauses rapidly | Moderate — existing production continues |
| Energy transition risk | Moderate — can run down inventory faster | Higher — long-cycle assets at risk if demand peaks |
| U.S. political risk | Low — fully domestic | Moderate — depends on U.S. market access |
| Market access | Domestic pipeline + Gulf Coast export | Requires pipeline to U.S. or Pacific coast |
| Price discount | Minimal | Persistent WCS-WTI spread of C$10–20/bbl |
| Environmental regulatory risk | U.S. ESG/methane regs; fracking bans in some states | Emissions caps, carbon tax, Indigenous consultation |
| Inventory longevity | Core Permian acreage depleting | ~163B barrels; essentially unlimited at current rates |

### 3.4 The Refinery Mismatch

Perhaps the most underappreciated technical fact about Alberta's oil is that it is not interchangeable with Permian crude. Bitumen is a fundamentally different product that requires specific refinery configurations to process.

Midwestern U.S. refineries (the PADD 2 complex, centred on Chicago and the Gulf Coast) were specifically retooled to process heavy Canadian crude — these are Alberta's natural customers. The Western Canadian Select (WCS) discount — typically $10–20/barrel below WTI — reflects this constraint: because Alberta crude can only go to certain refineries via certain pipelines, buyers have pricing power.

Permian crude is light, sweet, and trades near WTI because it can go to almost any refinery in the world with minimal processing adjustment. A barrel of WTI-quality Permian crude can be sold to a Korean refinery, a Spanish refinery, or a Louisiana refinery with equal ease. A barrel of dilbit needs to go somewhere that is specifically equipped to receive it.

This structural reality constrains Alberta's negotiating position in ways that have nothing to do with federal politics and everything to do with chemistry.

---

## Part D: Six Conclusions

### Conclusion 1: The fiscal comparison runs opposite to what most Albertans assume.

Alberta, in Canada, is the fiscal engine contributing \$17 billion or more per year above what it receives. Texas, in the U.S., is a net recipient of \$71 billion per year. Moving to an American-style federal system would not obviously change this dynamic — it would redirect the flow through different mechanisms.

### Conclusion 2: Federal pipeline control does not disappear under American federalism.

Texas cannot approve or reject a pipeline that crosses state lines. The Keystone XL was regulated at the federal level from the start. An Alberta that joined the U.S. would trade the National Energy Board for FERC and find itself making many of the same arguments to a different set of Washington bureaucrats.

### Conclusion 3: The boom-bust cycle is not mitigated by American federalism.

Houston's 1980s collapse destroyed a quarter of a million jobs, wiped out the banking system, and required a federal bailout. Oklahoma's bust created poverty that persists decades later. Canada's social safety net — EI, federal stabilization mechanisms, interprovincial labour mobility — has cushioned Alberta's downturns in ways that American state-level government cannot replicate.

### Conclusion 4: Alberta's oil is technically different from Permian oil.

Bitumen is not shale oil. It is heavier, more expensive to process, requires specific infrastructure, and sells at a persistent discount. These are geological facts, not political choices. No change in political arrangement alters the WCS-WTI spread or the refinery configuration requirements.

### Conclusion 5: Oklahoma is a useful additional benchmark.

Oklahoma is energy-dependent, politically conservative, low-tax, and deeply resentful of federal interference. Its median household income is 21% below the national average. Its poverty rate is among the highest in the nation. Its GDP growth is more volatile than the national average. The Texas comparison is aspirational; the Oklahoma comparison is cautionary — and both are informative.

### Conclusion 6: The comparison is politically useful and economically imprecise.

Alberta's political class invokes Texas because Texas is large, wealthy, confident, and politically conservative. The comparison does rhetorical work. It is less useful as an analytical framework for understanding what Alberta's economic future might look like under different federal arrangements, because the important details — fiscal flows, pipeline jurisdiction, healthcare costs, product type, refinery configurations, boom-bust cushioning — all complicate the simple narrative.

> The more instructive exercise is to ask not "why can't Alberta be Texas?" but rather "what has actually happened to energy-dependent American states over the last fifty years?" The answer, in Texas and Oklahoma alike, is: spectacular booms, brutal busts, persistent inequality, and a federal government that was ultimately called upon when things went wrong — just as Ottawa has been called upon by Alberta.
{:.callout}

---

## Sources and Data Notes

All U.S. dollar figures are in USD; Canadian figures in CAD unless noted. Exchange rate approximation: 1 CAD ≈ 0.73 USD throughout 2024.

| Source | Data Used |
|:---|:---|
| U.S. Bureau of Economic Analysis (BEA) | Texas and Oklahoma GDP, per capita income, growth rates |
| Dallas Federal Reserve (dallasfed.org) | Texas economic snapshot; Permian breakeven cost survey 2024; energy employment |
| Rockefeller Institute of Government | Texas-U.S. federal balance of payments 2022 ($71.1B net receipt) |
| U.S. Energy Information Administration (EIA) | Permian production volumes, U.S. oil production breakdown, 2024 annual |
| Oklahoma Energy Resources Board (OERB) | Oklahoma oil & gas GDP contribution FY2024 ($60.3B, 23% of state GDP) |
| Kansas City Federal Reserve — Oklahoma Economist series | Oklahoma GDP growth volatility, boom-bust cycle analysis |
| Federal Energy Regulatory Commission (FERC) | Interstate pipeline jurisdiction, regulatory authority |
| Statistics Canada / Fraser Institute / Fairness Alberta | Alberta fiscal contribution data, net transfer to Ottawa |
| Enverus Intelligence Research, April 2025 | Oil sands cost structure, SAGD economics, TMX capacity |
| Texas Tribune / Texas Monthly / Houstonia Magazine | 1980s oil bust history — employment, banking crisis, recovery |
| oilandgasinfo.ca / Canadian Energy Research Institute | Oil supply cost comparison by region; oil sands breakeven |
| U.S. Census Bureau / SmartAsset analysis | Oklahoma poverty rate, household income comparisons |
| U.S. Trade Representative (USTR) | Texas exports 2024 by commodity and destination |
| Railroad Commission of Texas (RRC) | Texas pipeline infrastructure |
| FDIC Historical Records — "Banking Problems in the Southwest" | Texas/Oklahoma bank failure data 1980–1990 |

---

*Previous in this series: [A Trade Reality Check](/alberta-in-context/trade-reality-check/) · Next: [Contested Ground — Global Energy Markets, War, Sanctions, and the Renewable Tide](/alberta-in-context/global-energy-markets/)*
