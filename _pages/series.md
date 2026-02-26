---
layout: default
title: Series
permalink: /series/
---

<header class="listing-header">
  <div class="listing-header-inner">
    <div class="listing-label">Reading paths</div>
    <h1 class="listing-title">Series</h1>
    <p class="listing-desc">Sustained explorations of a single theme across multiple essays — read in order or dip in anywhere.</p>
  </div>
</header>

{% assign series_posts = site.posts | where_exp: "post", "post.series != nil" %}
{% assign series_groups = series_posts | group_by: "series" %}

<section class="listing-section">
  <div class="listing-inner listing-inner--narrow">

    {% if series_groups.size == 0 %}
    <p class="listing-empty">No series published yet. Browse the <a href="/archive/">archive</a> or explore by <a href="/topics/">topic</a>.</p>

    {% else %}
    {% for group in series_groups %}
    {% assign posts_sorted = group.items | sort: "series_order" %}
    {% assign first_post = posts_sorted | first %}

    <article style="margin-bottom: 3rem; padding-bottom: 3rem; border-bottom: 1px solid var(--border);">

      <header style="margin-bottom: 1.5rem;">
        <div style="font-size: 0.6875rem; font-weight: 600; letter-spacing: 0.09em; text-transform: uppercase; color: var(--accent); margin-bottom: 8px;">Series &middot; {{ group.items.size }} {% if group.items.size == 1 %}essay{% else %}essays{% endif %}</div>
        <h2 style="font-family: var(--font-heading); font-size: 1.75rem; font-weight: 400; color: var(--text); margin: 0 0 12px; letter-spacing: -0.02em; text-transform: capitalize; line-height: 1.2;">{{ group.name | replace: "-", " " }}</h2>
        {% if first_post.excerpt %}
        <p style="margin: 0; font-size: 1rem; color: var(--text-2); line-height: 1.65;">{{ first_post.excerpt | strip_html | truncatewords: 40 }}</p>
        {% endif %}
      </header>

      <ol style="list-style: none; margin: 0 0 1.25rem; padding: 0;">
        {% for post in posts_sorted %}
        <li style="display: grid; grid-template-columns: 2rem 1fr; gap: 16px; padding: 14px 0; border-top: 1px solid var(--border);">
          <span style="font-size: 0.8125rem; font-weight: 600; color: var(--text-3); padding-top: 3px; font-variant-numeric: tabular-nums;">{{ forloop.index }}</span>
          <div>
            <a href="{{ post.url | relative_url }}" style="font-family: var(--font-heading); font-size: 1.0625rem; font-weight: 400; color: var(--text); text-decoration: none; line-height: 1.3; display: block;">{{ post.title }}</a>
            {% if post.excerpt %}
            <p style="margin: 4px 0 0; font-size: 0.875rem; color: var(--text-2); line-height: 1.5;">{{ post.excerpt | strip_html | truncatewords: 20 }}</p>
            {% endif %}
          </div>
        </li>
        {% endfor %}
      </ol>

      <a href="{{ first_post.url | relative_url }}" class="btn btn-primary">Start reading &rarr;</a>

    </article>
    {% endfor %}
    {% endif %}

  </div>
</section>
