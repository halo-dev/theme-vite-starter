---
name: halo-theme-dev
description: >
  Use when creating or modifying a Halo CMS theme: writing Thymeleaf templates,
  configuring theme.yaml or settings.yaml, calling Finder APIs, using
  vite-plugin-halo-theme, defining theme settings forms, referencing static assets,
  implementing halo:comment or halo:footer extension points, or defining model
  annotation fields (AnnotationSetting).
---

# Halo Theme Development

Halo is built on **Spring Boot + Spring WebFlux + Thymeleaf**. Themes use Thymeleaf templates for frontend page rendering.

> **Important**: Halo's APIs, VO field names, and template variables evolve across versions. **Do not rely on training data for specific field names, method signatures, or type structures.** When writing code that accesses template variables or calls Finder API methods, always fetch the relevant online doc from the References section below first.

## Thymeleaf Quick Reference

Full docs: https://raw.githubusercontent.com/thymeleaf/thymeleaf-docs/refs/heads/master/docs/tutorials/3.1/usingthymeleaf.md

Core syntax cheatsheet:

```html
<!-- Output text -->
<h1 th:text="${site.title}"></h1>

<!-- Output unescaped HTML -->
<div th:utext="${post.content.content}"></div>

<!-- Links -->
<a th:href="@{${post.status.permalink}}">Post link</a>
<link rel="stylesheet" th:href="@{/assets/dist/style.css}" />

<!-- Loop -->
<li th:each="post : ${posts.items}" th:text="${post.spec.title}"></li>

<!-- Conditionals -->
<div th:if="${posts.hasNext()}">Next page</div>
<div th:unless="${posts.hasNext()}">Last page</div>

<!-- Local variable -->
<div th:with="menu = ${menuFinder.getPrimary()}">...</div>

<!-- Fragment include -->
<div th:replace="~{fragments/header :: header}"></div>

<!-- Layout reuse: pages pass fragments into a parameterized layout -->
<html th:replace="~{layout :: html(head = null, content = ~{::content})}">
  <th:block th:fragment="content"><!-- page body --></th:block>
</html>

<!-- Inline JavaScript -->
<script th:inline="javascript">
  var url = '[(${#theme.assets("/dist/main.iife.js")})]';
</script>
```

## Development Workflow

1. Create a theme folder under `themes/` in the Halo working directory (must match `metadata.name` in `theme.yaml`)
2. Write `theme.yaml` (required) and `settings.yaml` (optional)
3. Create template files under `templates/`
4. Install and activate the theme in Console → Theme Management
5. Visit the frontend to verify

Disable Thymeleaf caching during development: set env var `SPRING_THYMELEAF_CACHE=false` (Docker), or `spring.thymeleaf.cache: false` in config (source mode).

## Starter Templates

The `assets/` directory provides two ready-to-use theme templates:

- **`assets/theme-minimal/`** — Zero-build-tool minimal theme with all 8 template files; ideal for quick prototyping or simple themes
- **`assets/theme-vite/`** — Vite project template with `vite-plugin-halo-theme` (**recommended for new themes**); includes partial layout reuse and CSS toolchain

Usage: copy the directory into `themes/` in your Halo working directory, ensure the folder name matches `metadata.name` in `theme.yaml`, then install and activate in Console.

## References Index

| File | Content | When to read |
| ---- | ------- | ------------ |
| [references/structure-and-config.md](references/structure-and-config.md) | Directory structure, theme.yaml fields, settings.yaml form definition | Creating a theme, configuring theme.yaml/settings.yaml |
| [references/vite-plugin.md](references/vite-plugin.md) | vite-plugin-halo-theme integration guide, include/slot template syntax, TailwindCSS integration | Setting up a Vite-based theme (recommended) |
| [references/templates.md](references/templates.md) | Template route mapping, available variables per template | Writing template files |
| [references/global-variables.md](references/global-variables.md) | Global variables (site, theme, theme.config) and type definitions | Accessing site info or theme setting values |
| [references/finder-apis.md](references/finder-apis.md) | All Finder APIs (postFinder, categoryFinder, tagFinder, menuFinder, singlePageFinder, etc.) | Querying data from any template |
| [references/static-resources.md](references/static-resources.md) | Static asset reference methods (`@{}`, `#theme.assets()`) | Referencing CSS/JS/images in plain HTML themes |
| [references/template-tags.md](references/template-tags.md) | Custom tags (halo:comment extension point, halo:footer injection) | Integrating comment plugins, injecting footer code |
| [references/official-plugins.md](references/official-plugins.md) | Official plugin integration: pluginFinder.available(), search widget, dark mode color scheme adaptation | Adding search, adapting dark mode for plugin UI |
| [references/annotations.md](references/annotations.md) | AnnotationSetting for model custom fields, `#annotations` utility for reading metadata in templates | Adding custom fields to menu items/posts/categories and using them in templates |
| [references/packaging.md](references/packaging.md) | Packaging a theme as a ZIP using `@halo-dev/theme-package-cli` | Preparing a theme for release or upload |
| [references/thymeleaf-tips.md](references/thymeleaf-tips.md) | Halo-specific Thymeleaf best practices: literal substitutions, safe navigation, meta tag rules, permalink syntax | Writing any template file |
