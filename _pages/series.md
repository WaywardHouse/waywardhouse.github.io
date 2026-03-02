---
layout: default
title: Series
permalink: /series/
---

<header class="listing-header">
  <div class="listing-header-inner">
    <div class="listing-label">Reading paths</div>
    <h1 class="listing-title">Series</h1>
    <p class="listing-desc">Each series builds a sustained body of knowledge — read in sequence or dip into any cluster.</p>
  </div>
</header>

{% assign series_posts = site.posts | where_exp: "post", "post.series != nil" %}
{% assign series_groups = series_posts | group_by: "series" %}

<section class="listing-section">
  <div class="listing-inner listing-inner--narrow">

    {% if series_groups.size == 0 %}
    <p class="listing-empty">No series published yet. Browse the <a href="/archive/">archive</a>.</p>
    {% else %}

    {% for group in series_groups %}
    {% assign posts_sorted = group.items | sort: "series_order" %}
    {% assign first_post = posts_sorted | first %}
    {% assign has_clusters = posts_sorted | where_exp: "p", "p.cluster" | size %}

    <article class="series-group">

      <header class="series-group-header">
        <div class="series-group-eyebrow">{{ group.items.size }} {% if group.items.size == 1 %}essay{% else %}essays{% endif %}</div>
        <h2 class="series-group-title">{{ group.name | replace: "-", " " | replace: "computational geography ", "" | capitalize }}</h2>
        {% if first_post.excerpt %}
        <p class="series-group-desc">{{ first_post.excerpt | strip_html | truncatewords: 30 }}</p>
        {% endif %}
        <a href="{{ first_post.url | relative_url }}" class="btn btn-primary">Start reading &rarr;</a>
      </header>

      {% if has_clusters > 0 %}

        {% comment %}Group essays by cluster{% endcomment %}
        {% assign current_cluster = "" %}
        {% for post in posts_sorted %}

          {% if post.cluster != current_cluster %}
            {% unless current_cluster == "" %}</ol></div>{% endunless %}
            <div class="cluster-section">
              <div class="cluster-header">
                <span class="cluster-label">{{ post.cluster }}</span>
                {% if post.cluster_title %}<span class="cluster-title">{{ post.cluster_title }}</span>{% endif %}
              </div>
              <ol class="cluster-essay-list">
            {% assign current_cluster = post.cluster %}
          {% endif %}

              <li class="cluster-essay-item">
                <span class="cluster-essay-num">{{ post.series_order }}</span>
                <div class="cluster-essay-body">
                  <a href="{{ post.url | relative_url }}" class="cluster-essay-title">{{ post.title }}</a>
                  {% if post.subtitle %}<span class="cluster-essay-sub">{{ post.subtitle }}</span>{% endif %}
                </div>
                {% if post.difficulty %}
                <span class="difficulty-badge difficulty-badge--{{ post.difficulty }}">{{ post.difficulty }}</span>
                {% endif %}
              </li>

        {% endfor %}
        {% if posts_sorted.size > 0 %}</ol></div>{% endif %}

      {% else %}

        {% comment %}Flat list — no clusters{% endcomment %}
        <ol class="series-flat-list">
          {% for post in posts_sorted %}
          <li class="series-flat-item">
            <span class="cluster-essay-num">{{ forloop.index }}</span>
            <div class="cluster-essay-body">
              <a href="{{ post.url | relative_url }}" class="cluster-essay-title">{{ post.title }}</a>
              {% if post.subtitle %}<span class="cluster-essay-sub">{{ post.subtitle }}</span>{% endif %}
            </div>
          </li>
          {% endfor %}
        </ol>

      {% endif %}

    </article>
    {% endfor %}

    {% endif %}

  </div>
</section>
