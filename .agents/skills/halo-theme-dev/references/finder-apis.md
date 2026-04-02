# Finder API

Finder APIs query data from **any template location** regardless of the current route — ideal for sidebars, footers, and other global data needs.

## Available Finders

| Finder | Purpose |
| ------ | ------- |
| `postFinder` | Post list / detail / prev-next / archives |
| `categoryFinder` | Category list / tree structure / breadcrumbs |
| `tagFinder` | Tag list / detail |
| `menuFinder` | Menus and menu items |
| `singlePageFinder` | Single page list / detail |
| `commentFinder` | Comments and replies |
| `contributorFinder` | Contributors |
| `siteStatsFinder` | Site statistics |
| `themeFinder` | Theme information |
| `pluginFinder` | Plugin information |

## Key Usage Pattern

Use `th:with` to bind the result in the current scope:

```html
<div th:with="menu = ${menuFinder.getPrimary()}">
  <a
    th:each="item : ${menu.menuItems}"
    th:href="${item.status.href}"
    th:text="${item.status.displayName}"
  ></a>
</div>
```

## Common Notes

- `postFinder.list({...})` is the recommended unified query method (all parameters are optional); it supersedes the deprecated `list(page, size)`, `listByCategory(...)`, etc.
- `metadata.name` is the unique resource identifier — it is not the display name (`displayName`/`title`).
- Pair `settings.yaml` `categorySelect`/`tagSelect` inputs with Finder queries so users can configure query parameters in Console instead of hard-coding them in templates.

## Online Docs

> **Do not rely on training data for Finder API method signatures — Halo evolves across versions and your training data may be outdated or incomplete. Always fetch the relevant doc before writing code that calls a specific Finder method.**

- postFinder: https://raw.githubusercontent.com/halo-dev/docs/refs/heads/main/docs/developer-guide/theme/finder-apis/post.md
- categoryFinder: https://raw.githubusercontent.com/halo-dev/docs/refs/heads/main/docs/developer-guide/theme/finder-apis/category.md
- tagFinder: https://raw.githubusercontent.com/halo-dev/docs/refs/heads/main/docs/developer-guide/theme/finder-apis/tag.md
- menuFinder: https://raw.githubusercontent.com/halo-dev/docs/refs/heads/main/docs/developer-guide/theme/finder-apis/menu.md
- singlePageFinder: https://raw.githubusercontent.com/halo-dev/docs/refs/heads/main/docs/developer-guide/theme/finder-apis/single-page.md
- commentFinder: https://raw.githubusercontent.com/halo-dev/docs/refs/heads/main/docs/developer-guide/theme/finder-apis/comment.md
- contributorFinder: https://raw.githubusercontent.com/halo-dev/docs/refs/heads/main/docs/developer-guide/theme/finder-apis/contributor.md
- siteStatsFinder: https://raw.githubusercontent.com/halo-dev/docs/refs/heads/main/docs/developer-guide/theme/finder-apis/site-stats.md
- themeFinder: https://raw.githubusercontent.com/halo-dev/docs/refs/heads/main/docs/developer-guide/theme/finder-apis/theme.md
- pluginFinder: https://raw.githubusercontent.com/halo-dev/docs/refs/heads/main/docs/developer-guide/plugin/api-reference/server/finder-for-theme.md
