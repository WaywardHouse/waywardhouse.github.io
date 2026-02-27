---
layout: essay
title: "The Trade Reality"
subtitle: "A Data Foundation for Understanding Alberta's Economy"
series: "Alberta in Context"
series_order: 1
date: 2026-02-15
last_modified_at: 2026-02-26
author: paul
categories:
  - economic-geography
  - trade
tags:
  - alberta
  - trade
  - energy
  - agriculture
  - equalization
  - confederation
  - economic-structure
viz: true
description: >
  What Alberta actually produces, where it sells, what it imports, and how its
  fiscal relationship with Ottawa works — the numbers that ground any serious
  discussion of Alberta's place in Confederation.
excerpt: >
  Alberta generates 32% of Canadian exports from 12% of the population.
  Its per-capita GDP is the highest of any province. Its fiscal contribution
  to Confederation is enormous and documented. But 88.5% of its exports go
  to one country, and its economy is embedded in continental supply chains
  that are not costless to replace. These are the numbers that honest debate
  must acknowledge.
difficulty: 2
domain: economic-geography
math_core: proportional-reasoning
spatial_reasoning: trade-flows
toc: true
comments: true
---

## Contents
{:.no_toc}

* TOC
{:toc}

---

## Purpose

This essay provides the hard numbers that ground any serious discussion of Alberta's place in Confederation. It is designed to be read before — or alongside — the other essays in this series on Alberta's trade position, energy markets, and comparative political economy.

The facts here do not resolve political questions about sovereignty, equalization, western alienation, or the costs and benefits of Confederation. They establish the terms on which honest debate must proceed.

---

## 1. What Alberta Actually Produces

Alberta is the energy province — but the full picture of its economy is more varied than that label suggests. Understanding what Alberta makes is the first step to understanding what it needs and what it risks.

### 1.1 GDP and Economic Structure

Alberta's GDP in 2024 stood at approximately $460 billion CAD, making it Canada's third-largest provincial economy despite having only 4.9 million people — about 12% of Canada's population. Per-capita GDP is the highest of any province at roughly $94,000, approximately 40–45% above the national average.[^statcan-pea]

[^statcan-pea]: Statistics Canada, Provincial Economic Accounts, 2024.

<div data-viz="echarts" style="height:380px" data-options='{
  "title": {"text": "Alberta GDP by Sector (2024)", "left": "center"},
  "tooltip": {"trigger": "item", "formatter": "{b}: {d}%"},
  "series": [{
    "type": "pie",
    "radius": ["40%", "70%"],
    "avoidLabelOverlap": true,
    "itemStyle": {"borderRadius": 6, "borderWidth": 2},
    "label": {"show": true, "formatter": "{b}\n{d}%"},
    "data": [
      {"value": 27, "name": "Oil & Gas Extraction"},
      {"value": 15, "name": "Real Estate & Finance"},
      {"value": 8, "name": "Construction"},
      {"value": 6, "name": "Manufacturing"},
      {"value": 8, "name": "Retail & Wholesale"},
      {"value": 5, "name": "Public Administration"},
      {"value": 2, "name": "Agriculture"},
      {"value": 29, "name": "Other Services"}
    ]
  }]
}'></div>

> **Occupation vs. revenue:** Despite energy dominating the export picture, most Albertans work in services. Energy provides enormous revenue but relatively few direct jobs — about 6–8% of total employment. The sector's importance is fiscal, not primarily occupational.
{:.callout}

### 1.2 Agriculture: The Underappreciated Export Base

Alberta is a significant agricultural producer, often overlooked in energy-focused analysis. In 2024, agri-food exports totalled $17.5 billion, making Alberta Canada's third-largest agri-food exporter at roughly 19–20% of national totals.[^ab-ag]

[^ab-ag]: Government of Alberta, Agricultural Trade Services, 2024.

| Category | 2024 Export Value | National Significance |
|:---|---:|:---|
| Beef & cattle | $3.6 billion | 43% of all Canadian cattle; 75%+ of beef processing in Alberta |
| Oilseeds & grain | $5.8 billion | Canola, wheat, barley |
| Processed food (value-added) | $9.7 billion | Premium rye whisky, potato products |
| Primary agricultural products | $7.8 billion | Raw commodities |
| **Total agri-food exports** | **$17.5 billion** | **~20% of Canada's total** |

---

## 2. What Alberta Exports — and to Whom

Alberta's international export profile is extraordinarily concentrated — by product, by destination, and by trade route.

### 2.1 Total International Exports

Alberta exported $183.2 billion CAD worth of goods internationally in 2024 — the second-highest of any Canadian province, accounting for roughly 32% of all Canadian merchandise exports. At $37,500 per resident, Alberta's per-capita export value is the highest of any province.[^lop-trade]

[^lop-trade]: Library of Parliament, Trade and Investment Profile: Alberta (2024-501-E).

<div data-viz="echarts" style="height:320px" data-options='{
  "title": {"text": "Alberta International Exports by Product (2024)", "left": "center"},
  "tooltip": {"trigger": "axis", "axisPointer": {"type": "shadow"}},
  "grid": {"left": "25%", "right": "15%"},
  "xAxis": {"type": "value"},
  "yAxis": {"type": "category", "data": ["Other goods", "Machinery", "Petrochemicals", "Agri-food", "Hydrocarbon gases", "Crude petroleum"]},
  "series": [{"type": "bar", "data": [22, 4.5, 1.3, 17.5, 8.3, 124.2], "label": {"show": true, "position": "right", "formatter": "${c}B"}}]
}'></div>

Over 72 cents of every export dollar leaving Alberta is an energy product. This is concentration, not diversification. Alberta's international trade position is inseparable from global oil and gas markets.

### 2.2 Export Destinations

<div data-viz="echarts" style="height:360px" data-options='{
  "title": {"text": "Alberta Export Destinations (2024)", "left": "center"},
  "tooltip": {"trigger": "item", "formatter": "{b}: ${c}B ({d}%)"},
  "series": [{
    "type": "pie",
    "radius": ["35%", "65%"],
    "data": [
      {"value": 162.1, "name": "United States"},
      {"value": 8, "name": "China"},
      {"value": 2.5, "name": "Japan"},
      {"value": 1.5, "name": "South Korea"},
      {"value": 0.8, "name": "Mexico"},
      {"value": 8.3, "name": "Rest of World"}
    ],
    "label": {"formatter": "{b}\n{d}%"}
  }]
}'></div>

> **The defining structural fact:** 88.5% of Alberta's international exports — nearly 9 in every 10 export dollars — go to the United States. Alberta is not trading with the world. It is trading with one country. Any plan for Alberta's economic future must reckon with this asymmetry.
{:.callout}

### 2.3 Trans Mountain Pipeline: Early-Stage Diversification

The completion of the Trans Mountain Pipeline Expansion (TMX) in May 2024 opened the first meaningful new export route for Alberta crude in a generation. Before TMX, approximately 0% of Alberta crude reached Asian markets by tanker. By late 2024, roughly 4.1% of Alberta's crude was reaching non-U.S. destinations.

TMX has genuine long-run diversification potential. In 2024, however, it represents an early-stage development — not yet a structural transformation of Alberta's export geography.

---

## 3. What Alberta Imports

Alberta's extraordinary export surplus is the flip side of real import dependencies.

### 3.1 International Imports (~$40 Billion)

In 2024, Alberta's international merchandise imports totalled approximately $40 billion CAD — producing a trade surplus of approximately $143 billion, one of the largest of any subnational jurisdiction in the world relative to population.[^wte]

[^wte]: Compiled from Statistics Canada customs data; see also WorldsTopExports.com analysis.

| Import Category | Approximate Value | Notes |
|:---|---:|:---|
| Light petroleum products (refined fuel) | $8.2 billion | Alberta lacks sufficient refining capacity |
| Machinery & industrial equipment | ~$6–8 billion | Drilling, processing, manufacturing equipment |
| Vehicles & auto parts | ~$3–5 billion | |
| Electronics & electrical equipment | ~$2–3 billion | |
| Chemicals | ~$2 billion | |
| Food & beverages | ~$2–3 billion | |
| Other manufactured goods | Remainder | |
| **Total imports** | **~$40 billion** | |

> **The refining paradox:** Alberta's single largest import category is refined petroleum products. The province that extracts among the world's largest volumes of crude oil must import significant quantities of refined fuel because it lacks refining capacity to process all its own production.
{:.callout}

### 3.2 Interprovincial Imports

Canada's internal market — $532 billion in goods and services crossing provincial borders in 2023 — is the often-invisible infrastructure of the Canadian economy. Alberta is a major buyer within this system.[^statcan-ipt]

[^statcan-ipt]: Statistics Canada, *The Daily*, Interprovincial Trade Flows, March/May 2025.

| Category | Primary Source Province(s) | Why Alberta Needs It |
|:---|:---|:---|
| Manufactured industrial goods | Ontario, Quebec | Limited heavy manufacturing capacity |
| Consumer manufactured goods | Ontario, Quebec, B.C. | Autos, appliances, packaged goods |
| Financial & professional services | Ontario | Banking, insurance, legal services |
| Food processing & retail goods | Ontario, Quebec, B.C. | Processed foods not produced at scale |
| Technology & software | Ontario, B.C. | Growing tech dependency |
| Construction materials | B.C., Ontario | Lumber, steel |
| General wholesale goods | Ontario (53% of purchases) | Ontario supplies over half of interprovincial buyers |

---

## 4. What Alberta Sells to Other Provinces

Alberta's interprovincial exports tell a somewhat different story than its international exports. While international trade is dominated by crude oil to the U.S., interprovincial sales are more diversified.

Alberta's businesses are the most likely in Canada to sell across provincial lines: 31.9% of Alberta businesses sell to other provinces, versus a national average of 26.9%. Simultaneously, 45.7% of interprovincially-trading businesses across Canada sell to Alberta customers.[^statcan-survey]

[^statcan-survey]: Statistics Canada, Canadian Survey on Interprovincial Trade, 2023.

| Alberta Interprovincial Export | Details |
|:---|:---|
| Petroleum & refined products | Crude and refined energy sold eastward |
| Natural gas | Pipeline gas to B.C., Saskatchewan, Ontario |
| Agricultural commodities | Beef, grain, canola to all provinces |
| Chemical products | Petrochemical inputs for manufacturing elsewhere |
| Construction services | Workers and expertise follow energy development cycles |
| Professional & business services | Growing service export base |
| Wholesale distribution | Major redistribution hub for western Canada |

Alberta is simultaneously the most active interprovincial seller in Canada and the most popular destination for other provinces' goods.

---

## 5. The Federal Fiscal Relationship

Separate from trade flows, Alberta has a distinctive relationship with federal fiscal programs. This is the most politically charged dimension of Alberta's economic situation, and the numbers require careful interpretation.

### 5.1 Federal Transfers to Alberta

Alberta does not receive equalization payments — it has not in the modern program era. The last payment was in 1964–65.[^fin-transfers]

[^fin-transfers]: Department of Finance Canada, Major Federal Transfers, 2025–26.

| Transfer Program | Alberta's 2025–26 Entitlement | Notes |
|:---|---:|:---|
| Canada Health Transfer (CHT) | $6.6 billion | Per-capita; Alberta receives less than average due to young population |
| Canada Social Transfer (CST) | $2.1 billion | Supports post-secondary, social programs |
| Equalization | $0 | Alberta does not qualify |
| **Total major transfers** | **$8.6 billion** | **Lowest per-capita federal grants of any province: $2,547/person** |

### 5.2 The Net Fiscal Transfer

The federal government raises more in taxes from Alberta than it spends in Alberta. This gap is real and documented. According to Fairness Alberta, Albertans sent approximately $324 billion more to the rest of Canada than was spent in Alberta from 2000–2019.[^fairness-ab]

[^fairness-ab]: Fairness Alberta, fiscal contribution data. See also Statistics Canada Fiscal Reference Tables.

However, research by economist Trevor Tombe (University of Calgary) shows that approximately 72% of Alberta's net federal contribution is explained by Alberta's high incomes and its relatively young population — not by any structural bias in federal programs. Equalization itself accounts for only about 12% of the total fiscal gap.[^tombe]

[^tombe]: Trevor Tombe, Finances of the Nation / University of Calgary, analysis of federal fiscal gaps and equalization.

> **Why the distinction matters:** Complaints about Alberta's fiscal treatment are substantially legitimate — the numbers are documented, not mythological. But the largest driver is structural wealth, not discriminatory policy. Equalization is a smaller part of the picture than its political salience suggests.
{:.callout}

### 5.3 Alberta's Provincial Fiscal Position

Alberta's provincial government ran a surplus in 2024 — one of only two provinces to do so. Alberta has the lowest debt-to-GDP ratio of any province at 30.3% and the lowest fiscal burden (government revenue as a percentage of GDP) at 9.9%. The province has no provincial sales tax.[^statcan-gov]

[^statcan-gov]: Statistics Canada, Consolidated Government Finance Statistics, 2024.

This fiscal strength is both genuine and cyclically exposed: it rests heavily on resource revenues that fluctuate with global commodity prices.

---

## 6. The Dependency Picture

Three structural dependencies emerge clearly from the data.

<div data-viz="echarts" style="height:380px" data-options='{
  "title": {"text": "Alberta: Structural Dependencies", "left": "center"},
  "tooltip": {},
  "radar": {
    "indicator": [
      {"name": "U.S. Market\n(88.5% of exports)", "max": 100},
      {"name": "Canadian\nInternal Market", "max": 100},
      {"name": "Energy Price\nExposure", "max": 100},
      {"name": "Pipeline\nInfrastructure", "max": 100},
      {"name": "Federal Fiscal\nFramework", "max": 100},
      {"name": "Shared Currency\n& Banking", "max": 100}
    ],
    "shape": "circle"
  },
  "series": [{
    "type": "radar",
    "data": [{"value": [95, 75, 90, 85, 60, 70], "name": "Dependency Severity", "areaStyle": {"opacity": 0.2}}]
  }]
}'></div>

### 6.1 Dependency on the U.S. Market

At 88.5% of all international exports, Alberta's economy is more tightly coupled to the U.S. market than almost any other comparably-sized subnational jurisdiction in the world. A sustained U.S. trade disruption would be devastating in ways that no change to federal-provincial arrangements could offset.

### 6.2 Dependency on Canadian Internal Market Infrastructure

Alberta's interprovincial trade operates within a Canadian internal market that is deeply integrated: shared currency, common regulatory frameworks, tariff-free movement, and seamless financial infrastructure. Unwinding this integration would require renegotiating all of it from scratch.

### 6.3 Dependency on Energy Prices

Alberta's fiscal surpluses, high incomes, and net contribution to federal finances are all functions of high energy prices. No change in political arrangements can eliminate this cyclical exposure.

| Dependency | Current Situation | Separation / Independence Risk |
|:---|:---|:---|
| U.S. market (88.5% of exports) | Full access via CUSMA | Requires renegotiation; no guaranteed access |
| Canadian internal market | Full, tariff-free access | Loss of automatic access; friction costs certain |
| TMX pipeline to tidewater | Operational since May 2024 | Complicated by transition and ownership questions |
| Federal transfers (CHT, CST) | $8.6B annually | Would be lost; requires new fiscal arrangements |
| Shared currency (CAD) | Integrated monetary system | Exchange rate risk and transaction costs |
| Banking & financial system | Fully integrated | Alberta lacks its own central bank capacity |

---

## 7. What These Numbers Mean

These facts do not resolve political questions about Alberta's future. Reasonable people can examine them and reach different conclusions. But they establish what honest debate must acknowledge.

**Alberta is genuinely wealthy.** Its per-capita economic output, export volumes, and fiscal position are impressive by any international standard. The grievances about equalization and federal spending are grounded in real numbers, not mythology.

**Alberta is also genuinely integrated.** Its economy is deeply embedded in the U.S. market, the Canadian internal market, and continental supply chains. The infrastructure of that integration is not costless to replace.

**The U.S. is Alberta's largest external dependency.** The political energy directed at federal-provincial fiscal arrangements, while legitimate, can obscure the larger structural vulnerability: 88.5% of Alberta's export value depends on access to a single foreign market whose policies Alberta cannot control.

**Diversification is real but early.** TMX and growing Asian market interest represent genuine progress. In 2024, this remains an early-stage shift.

**Energy prices, not federal policy, drive Alberta's fortunes.** Both Alberta's greatest prosperity and its greatest fiscal stress have been driven primarily by global commodity prices. No change in federal arrangements eliminates this exposure.

> These facts are the starting point. What Alberta does with them — how it manages its assets, diversifies its economy, and engages the rest of Canada and the world — is a political and strategic question that data alone cannot answer. But data this clear sets a high bar for arguments built on either grievance mythology or complacency about genuine vulnerabilities.
{:.callout}

---

## Sources and Data Notes

All figures in Canadian dollars (CAD). Export data is primarily customs-basis; interprovincial trade uses supply-use methodology. These methodologies are not directly comparable.

| Data Source | Used For |
|:---|:---|
| Statistics Canada, Provincial Economic Accounts, 2024 | GDP, provincial shares |
| Library of Parliament, Trade & Investment Profile: Alberta (2024-501-E) | International export/import data |
| WorldsTopExports.com (compiled from Statistics Canada) | Product-level export detail, trade balances |
| Government of Alberta, Choose Alberta factsheet, 2025 | Sector-level export figures, agri-food data |
| Statistics Canada, *The Daily* (March/May 2025) | Interprovincial trade flows |
| Department of Finance Canada, Major Transfers 2025–26 | Federal transfer entitlements |
| Statistics Canada, Consolidated Government Finance Statistics, 2024 | Fiscal burden, debt ratios, per-capita grants |
| Finances of the Nation / Trevor Tombe (University of Calgary) | Analysis of federal fiscal gaps and equalization |
| Statistics Canada, Canadian Survey on Interprovincial Trade, 2023 | Interprovincial trade participation rates |

---

*Next in this series: [Alberta in the Canadian Economy — A Trade Reality Check](/alberta-in-context/trade-reality-check/)*
