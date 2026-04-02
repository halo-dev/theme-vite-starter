# Static Assets & Build Tooling

## Static Asset Directory

All theme static assets **must** be placed under `templates/assets/`:

```
templates/
└── assets/
    ├── css/
    │   └── style.css
    ├── js/
    │   └── main.js
    └── images/
        └── logo.png
```

---

## Referencing Static Assets in Templates

### Method 1: HTML tag attributes (recommended)

Use Thymeleaf's `@{}` expression:

```html
<!-- CSS -->
<link rel="stylesheet" th:href="@{/assets/dist/style.css}" />

<!-- JavaScript -->
<script th:src="@{/assets/dist/main.iife.js}"></script>

<!-- Image -->
<img th:src="@{/assets/images/logo.png}" alt="Logo" />
```

The path `@{/assets/dist/style.css}` maps to `templates/assets/dist/style.css` and renders as `/themes/theme-foo/assets/dist/style.css`.

**With version query string (strongly recommended — prevents caching)**:

```html
<link rel="stylesheet" th:href="@{/assets/dist/style.css?v={v}(v=${theme.spec.version})}" />
<script th:src="@{/assets/dist/main.iife.js?v={v}(v=${theme.spec.version})}"></script>
```

### Method 2: `#theme.assets()` utility

Use when you need the asset path in a non-attribute context (e.g. a JavaScript variable or inline CSS).

> Note: do **not** include `/assets/` prefix in the path argument.

```html
<script th:inline="javascript">
  var logoUrl = '[(${#theme.assets("/images/logo.png")})]';
  // Value: /themes/theme-foo/assets/images/logo.png

  loadScript('[(${#theme.assets("/dist/main.iife.js")})]');
</script>
```

---

## Vite Integration

For themes using a modern frontend stack (TypeScript, Sass, PostCSS, TailwindCSS, etc.) or needing HTML template reuse (`include`/`slot`), the official Vite plugin is strongly recommended:

**`vite-plugin-halo-theme`**: https://github.com/halo-sigs/vite-plugin-halo-theme

See [vite-plugin.md](vite-plugin.md) for the full integration guide, template syntax, and configuration examples.
