# Global Variables

The following variables are available in all templates without any additional declaration.

---

## `site` — Site information

Source: Console → System Settings.

```json
{
  "title": "Site Title",
  "subtitle": "Site Subtitle",
  "url": "https://example.com",
  "logo": "https://example.com/logo.png",
  "favicon": "https://example.com/favicon.ico",
  "allowRegistration": false,
  "post": {
    "postPageSize": 10,
    "archivePageSize": 10,
    "categoryPageSize": 10,
    "tagPageSize": 10
  },
  "seo": {
    "blockSpiders": false,
    "keywords": "keywords",
    "description": "Site description"
  },
  "comment": {
    "enable": true,
    "systemUserOnly": false,
    "requireReviewForNew": false
  },
  "routes": {
    "categoriesUri": "/categories",
    "tagsUri": "/tags",
    "archivesUri": "/archives"
  }
}
```

**Common examples**:

```html
<title th:text="${site.title}"></title>
<img th:src="${site.logo}" alt="Logo" />
<meta name="description" th:content="${site.seo.description}" />
```

---

## `theme` — Current theme info

```json
{
  "metadata": {
    "name": "theme-foo",
    "creationTimestamp": "..."
  },
  "spec": {
    "displayName": "My Theme",
    "version": "1.0.0",
    "author": { "name": "Author", "website": "https://example.com" },
    "description": "Theme description",
    "logo": "https://example.com/logo.png",
    "homepage": "https://github.com/example/theme-foo",
    "settingName": "theme-foo-setting",
    "configMapName": "theme-foo-configMap"
  },
  "config": {
    "style": { "color_scheme": "system" },
    "layout": { "nav": "single" }
  }
}
```

**Common examples**:

```html
<!-- Display theme version -->
<span th:text="${theme.spec.version}"></span>

<!-- Static asset reference with version (recommended — prevents caching) -->
<link rel="stylesheet" th:href="@{/assets/dist/style.css?v={v}(v=${theme.spec.version})}" />
<script th:src="@{/assets/dist/main.iife.js?v={v}(v=${theme.spec.version})}"></script>
```

---

## `theme.config` — Theme settings values

Access pattern: `theme.config.[group].[name]`

- `group`: value of `spec.forms[].group` in `settings.yaml`
- `name`: value of `spec.forms[].formSchema[].name`

**Example** (based on the settings.yaml in [structure-and-config.md](structure-and-config.md)):

```html
<body th:class="${theme.config.style.color_scheme}">
  <nav th:if="${theme.config.layout.nav == 'single'}">...</nav>
  <nav th:if="${theme.config.layout.nav == 'double'}">...</nav>
</body>
```

---

## `#theme.assets()` — Static asset path utility

Returns the full path to a static asset for use in non-attribute contexts (e.g. inside JavaScript).

> Note: the path passed to this function does **not** need an `/assets/` prefix.

```html
<script th:inline="javascript">
  var mainJs = '[(${#theme.assets("/dist/main.iife.js")})]';
  // Renders as: /themes/theme-foo/assets/dist/main.iife.js
</script>
```

---

## Online Docs

> **If you need the exact structure of `site`, `theme`, or `theme.config`, fetch the doc below — do not guess field names from training data.**

https://raw.githubusercontent.com/halo-dev/docs/refs/heads/main/docs/developer-guide/theme/global-variables.md

---

## `haloCommentEnabled` — Comment component status

Boolean. Evaluates both "is a comment plugin installed" and "are comments enabled for this page". Use together with the `halo:comment` custom tag:

```html
<div th:if="${haloCommentEnabled}">
  <halo:comment group="content.halo.run" kind="Post" th:attr="name=${post.metadata.name}" />
</div>
```
