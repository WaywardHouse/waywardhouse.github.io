---
layout: default
title: Start Here
permalink: /start-here/
---

<style>
.start-intro {
  max-width: var(--max-width, 1200px);
  margin: 0 auto;
  padding: 48px 24px 8px;
  text-align: center;
}
.start-intro h1 {
  font-family: var(--font-heading);
  font-size: clamp(1.75rem, 3.5vw, 2.5rem);
  font-weight: 400;
  letter-spacing: -0.02em;
  color: var(--text);
  margin: 0 0 12px;
}
.start-intro p {
  font-size: 1.0625rem;
  color: var(--text-2);
  line-height: 1.65;
  max-width: 560px;
  margin: 0 auto;
}

.start-paths {
  max-width: var(--max-width, 1200px);
  margin: 0 auto;
  padding: 40px 24px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  align-items: start;
}
@media (max-width: 720px) {
  .start-paths { grid-template-columns: 1fr; }
}

.start-path {
  border: 1px solid var(--border);
  border-radius: var(--radius-lg, 12px);
  overflow: hidden;
}
.start-path-head {
  padding: 24px 28px 20px;
  border-bottom: 1px solid var(--border);
  background: var(--bg2);
}
.start-path-label {
  font-size: 0.6875rem;
  font-weight: 600;
  letter-spacing: 0.09em;
  text-transform: uppercase;
  color: var(--accent);
  margin-bottom: 6px;
}
.start-path-title {
  font-family: var(--font-heading);
  font-size: 1.25rem;
  font-weight: 400;
  color: var(--text);
  margin: 0 0 6px;
  letter-spacing: -0.02em;
}
.start-path-desc {
  font-size: 0.875rem;
  color: var(--text-2);
  line-height: 1.55;
  margin: 0;
}

.start-essay-list {
  list-style: none;
  margin: 0;
  padding: 0;
}
.start-essay-item {
  display: grid;
  grid-template-columns: 2rem 1fr;
  gap: 12px;
  align-items: start;
  padding: 14px 28px;
  border-bottom: 1px solid var(--border);
  text-decoration: none;
}
.start-essay-item:last-child { border-bottom: none; }
.start-essay-item:hover { background: var(--bg2); }
.start-essay-num {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--text-3);
  padding-top: 3px;
  font-variant-numeric: tabular-nums;
}
.start-essay-body { min-width: 0; }
.start-essay-title {
  display: block;
  font-family: var(--font-heading);
  font-size: 0.9375rem;
  font-weight: 400;
  color: var(--text);
  line-height: 1.3;
  text-decoration: none;
}
.start-essay-item:hover .start-essay-title { color: var(--accent); }
.start-essay-sub {
  display: block;
  font-size: 0.8125rem;
  color: var(--text-2);
  line-height: 1.4;
  margin-top: 2px;
}

.start-path-foot {
  padding: 16px 28px;
  background: var(--bg2);
  border-top: 1px solid var(--border);
}
.start-path-foot a {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--accent);
  text-decoration: none;
}
.start-path-foot a:hover { text-decoration: underline; }

.start-footer {
  max-width: var(--max-width, 1200px);
  margin: 0 auto;
  padding: 8px 24px 64px;
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}
.start-footer-label {
  font-size: 0.875rem;
  color: var(--text-2);
  margin-right: 4px;
}

.start-advanced {
  max-width: var(--max-width, 1200px);
  margin: 0 auto;
  padding: 0 24px 48px;
  border-top: 1px solid var(--border);
}
.start-advanced-heading {
  padding: 32px 0 20px;
}
.start-advanced-label {
  display: inline-block;
  font-size: 0.6875rem;
  font-weight: 600;
  letter-spacing: 0.09em;
  text-transform: uppercase;
  color: var(--accent);
  margin-bottom: 6px;
}
.start-advanced-desc {
  font-size: 0.9375rem;
  color: var(--text-2);
  margin: 0;
}
.start-advanced-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}
@media (max-width: 720px) {
  .start-advanced-grid { grid-template-columns: 1fr; }
}
.start-series-card {
  display: block;
  border: 1px solid var(--border);
  border-radius: var(--radius-lg, 12px);
  padding: 20px 24px;
  text-decoration: none;
  transition: border-color 0.15s, background 0.15s;
}
.start-series-card:hover {
  background: var(--bg2);
  border-color: var(--accent);
}
.start-series-card-num {
  font-size: 0.6875rem;
  font-weight: 600;
  letter-spacing: 0.09em;
  text-transform: uppercase;
  color: var(--text-3);
  margin-bottom: 6px;
}
.start-series-card-title {
  font-family: var(--font-heading);
  font-size: 1.0625rem;
  font-weight: 400;
  color: var(--text);
  line-height: 1.3;
  letter-spacing: -0.01em;
  margin-bottom: 4px;
}
.start-series-card:hover .start-series-card-title { color: var(--accent); }
.start-series-card-sub {
  font-size: 0.8125rem;
  color: var(--text-2);
  line-height: 1.45;
  margin-bottom: 12px;
}
.start-series-card-meta {
  font-size: 0.75rem;
  color: var(--text-3);
}
</style>

{% assign foundations = site.posts | where: "series", "computational-geography-foundations" | sort: "series_order" %}
{% assign alberta = site.posts | where: "series", "Alberta in Context" | sort: "series_order" %}
{% assign series_ghg = site.posts | where: "series_number", 13 | first %}
{% assign series_climate = site.posts | where: "series_number", 14 | first %}

<div class="start-intro">
  <h1>Where do you want to start?</h1>
  <p>Two bodies of work — pick the one that matches what you're looking for, or read both.</p>
</div>

<div class="start-paths">

  <div class="start-path">
    <div class="start-path-head">
      <div class="start-path-label">Analysis</div>
      <h2 class="start-path-title">Political Economy</h2>
      <p class="start-path-desc">How places actually function — economically, politically, ecologically. Specific cases, primary sources, no assumed economics background.</p>
    </div>
    <ol class="start-essay-list">
      {% for post in alberta %}
      <li>
        <a href="{{ post.url | relative_url }}" class="start-essay-item">
          <span class="start-essay-num">{{ forloop.index }}</span>
          <span class="start-essay-body">
            <span class="start-essay-title">{{ post.title }}</span>
            {% if post.subtitle %}<span class="start-essay-sub">{{ post.subtitle }}</span>{% endif %}
          </span>
        </a>
      </li>
      {% endfor %}
    </ol>
    <div class="start-path-foot">
      <a href="{{ '/topic/economic-geography/' | relative_url }}">Browse all essays &rarr;</a>
    </div>
  </div>

  <div class="start-path">
    <div class="start-path-head">
      <div class="start-path-label">Computation</div>
      <h2 class="start-path-title">Computational Geography</h2>
      <p class="start-path-desc">Geography as a quantitative science — from algebra to climate models. Each essay builds on the last. Code is open on GitHub.</p>
    </div>
    <ol class="start-essay-list">
      {% for post in foundations limit: 4 %}
      <li>
        <a href="{{ post.url | relative_url }}" class="start-essay-item">
          <span class="start-essay-num">{{ forloop.index }}</span>
          <span class="start-essay-body">
            <span class="start-essay-title">{{ post.title }}</span>
            {% if post.subtitle %}<span class="start-essay-sub">{{ post.subtitle }}</span>{% endif %}
          </span>
        </a>
      </li>
      {% endfor %}
    </ol>
    <div class="start-path-foot">
      <a href="{{ '/series/' | relative_url }}">View full series with all {{ foundations.size }} essays &rarr;</a>
    </div>
  </div>

</div>

{% if series_ghg or series_climate %}
<div class="start-advanced">
  <div class="start-advanced-heading">
    <span class="start-advanced-label">Advanced series</span>
    <p class="start-advanced-desc">Build on the foundations — quantitative greenhouse gas accounting and climate system modelling.</p>
  </div>
  <div class="start-advanced-grid">
    {% if series_ghg %}
    <a href="{{ series_ghg.url | relative_url }}" class="start-series-card">
      <div class="start-series-card-num">Series {{ series_ghg.series_number }}</div>
      <div class="start-series-card-title">{{ series_ghg.title | split: ": " | last }}</div>
      <div class="start-series-card-sub">{{ series_ghg.subtitle }}</div>
      <div class="start-series-card-meta">{{ series_ghg.total_essays }} essays &middot; Difficulty {{ series_ghg.difficulty_range }}</div>
    </a>
    {% endif %}
    {% if series_climate %}
    <a href="{{ series_climate.url | relative_url }}" class="start-series-card">
      <div class="start-series-card-num">Series {{ series_climate.series_number }}</div>
      <div class="start-series-card-title">{{ series_climate.title | split: ": " | last }}</div>
      <div class="start-series-card-sub">{{ series_climate.subtitle }}</div>
      <div class="start-series-card-meta">{{ series_climate.total_essays }} essays &middot; Difficulty {{ series_climate.difficulty_range }}</div>
    </a>
    {% endif %}
  </div>
</div>
{% endif %}

<div class="start-footer">
  <span class="start-footer-label">Not sure?</span>
  <a href="{{ '/what-is-a-spatial-model/' | relative_url }}" class="btn btn-primary">Try Essay 1 — takes 15 minutes to know if this is for you &rarr;</a>
</div>
