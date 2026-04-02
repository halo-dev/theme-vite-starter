# Vite Integration (Recommended)

> **Strongly recommended** for building theme projects. Compared to plain Thymeleaf, this approach provides a modern frontend development experience (TypeScript, Sass, PostCSS, TailwindCSS) plus lightweight HTML component reuse (`include`/`slot`) — significantly reducing the verbosity of Thymeleaf's native fragment system.

---

## vite-plugin-halo-theme

- GitHub: https://github.com/halo-sigs/vite-plugin-halo-theme
- NPM: `@halo-dev/vite-plugin-halo-theme`

### Key Features

1. **HTML template reuse**: supports `<include>`, `<slot>` (default and named), and `<props>` syntax, preprocessed at Vite build time — fully independent of Thymeleaf.
2. **Automatic multi-page entry scanning**: automatically discovers all `.html` files under `src/` (except `src/partials/`) as Vite build entries, with output going to `templates/`.
3. **Static asset handling**: CSS/JS in `src/` is bundled by Vite into `templates/assets/`; files in `public/` are copied directly to `templates/assets/` without processing.

---

## Directory Convention

```
my-theme/
├── src/
│   ├── css/
│   │   └── main.css          # CSS source
│   ├── js/
│   │   └── main.ts           # TypeScript source
│   ├── partials/             # Not treated as page entries; referenced via include
│   │   ├── layout.html       # Shared layout
│   │   └── post-card.html    # Reusable post card component
│   ├── index.html            # Home page entry → templates/index.html
│   ├── post.html             # → templates/post.html
│   ├── page.html
│   ├── archives.html
│   ├── tags.html
│   ├── tag.html
│   ├── categories.html
│   └── category.html
├── public/                   # Copied directly to templates/assets/ (no Vite processing)
├── templates/                # Build output directory (add to .gitignore)
├── vite.config.ts
├── package.json
├── .gitignore
├── theme.yaml
└── settings.yaml
```

---

## Quick Setup

### package.json

```json
{
  "type": "module",
  "scripts": {
    "dev": "vite build --watch",
    "build": "vite build"
  },
  "devDependencies": {
    "@halo-dev/vite-plugin-halo-theme": "latest",
    "vite": "^6.0.0"
  }
}
```

### vite.config.ts

```ts
import { defineConfig } from "vite";
import { haloThemePlugin } from "@halo-dev/vite-plugin-halo-theme";

export default defineConfig({
  plugins: [haloThemePlugin()],
});
```

### .gitignore

```gitignore
node_modules/
templates/
!templates/.gitkeep
```

---

## Template Syntax (build-time only — independent of Thymeleaf)

> **Important**: `include`/`slot` syntax is processed at **Vite build time**; Thymeleaf syntax is processed at **server runtime**. The two systems are fully isolated and can be mixed freely.

### `<include>` — Import a partial

```html
<include src="layout.html">
  <main>Page content</main>
</include>
```

### Named Slots

Declare slots in a partial (`src/partials/layout.html`):

```html
<head>
  <slot name="head">
    <title th:text="${site.title}">Default title</title>
  </slot>
</head>
<body>
  <slot />
</body>
```

Use in a page:

```html
<include src="layout.html">
  <template name="head">
    <title th:text="${post.spec.title}">Post title</title>
  </template>
  <article th:utext="${post.content.content}"></article>
</include>
```

### Include Path Resolution

| Syntax | Resolves to |
| ------ | ----------- |
| `foo.html` | `src/partials/foo.html` (preferred) |
| `partials/foo.html` | `src/partials/foo.html` |
| `./foo.html` | Relative to current file |
| `/foo.html` | Relative to `src/` root |

### Static Asset Paths

**All HTML files — both `src/*.html` and `src/partials/*.html` — resolve static asset references relative to `src/`**, regardless of the file's actual location.

```html
<!-- src/partials/layout.html: referencing src/css/main.css -->
<link rel="stylesheet" href="./css/main.css" />   <!-- ✅ correct (relative to src/) -->
<link rel="stylesheet" href="../css/main.css" />   <!-- ❌ wrong (relative to file location) -->

<!-- Same rule in src/index.html -->
<script type="module" src="./js/main.ts"></script>  <!-- ✅ correct -->
```

Always write asset paths as if the file is in `src/`, even when it is inside `src/partials/`.

---

## Full Example: Shared Layout

### `src/partials/layout.html`

```html
<!DOCTYPE html>
<html lang="en" xmlns:th="http://www.thymeleaf.org">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <slot name="head">
      <title th:text="${site.title}">Site title</title>
    </slot>
    <link rel="stylesheet" href="./css/main.css" />
  </head>
  <body>
    <header>
      <a th:href="@{/}" th:text="${site.title}"></a>
      <nav th:with="menu = ${menuFinder.getPrimary()}">
        <ul>
          <li th:each="item : ${menu.menuItems}">
            <a
              th:href="${item.status.href}"
              th:text="${item.status.displayName}"
              th:target="${item.spec.target?.value}"
            ></a>
          </li>
        </ul>
      </nav>
    </header>

    <main>
      <slot />
    </main>

    <footer>
      <halo:footer />
    </footer>
  </body>
</html>
```

### `src/index.html`

```html
<include src="layout.html">
  <template name="head">
    <title th:text="${site.title}">Home</title>
  </template>

  <section>
    <ul>
      <li th:each="post : ${posts.items}">
        <a th:href="${post.status.permalink}" th:text="${post.spec.title}"></a>
        <time th:text="${#temporals.format(post.spec.publishTime, 'yyyy-MM-dd')}"></time>
        <p th:text="${post.status.excerpt}"></p>
      </li>
    </ul>
    <nav th:if="${posts.hasPrevious() || posts.hasNext()}">
      <a th:if="${posts.hasPrevious()}" th:href="${posts.prevUrl}">Previous</a>
      <span th:text="${posts.page} + '/' + ${posts.totalPages}"></span>
      <a th:if="${posts.hasNext()}" th:href="${posts.nextUrl}">Next</a>
    </nav>
  </section>
</include>
```

### `src/post.html`

```html
<include src="layout.html">
  <template name="head">
    <title th:text="${post.spec.title}">Post title</title>
  </template>

  <article>
    <h1 th:text="${post.spec.title}"></h1>
    <time th:text="${#temporals.format(post.spec.publishTime, 'yyyy-MM-dd')}"></time>
    <div th:utext="${post.content.content}"></div>

    <!-- Prev / next navigation -->
    <div th:with="cursor = ${postFinder.cursor(post.metadata.name)}">
      <a
        th:if="${cursor.hasPrevious()}"
        th:href="${cursor.previous.status.permalink}"
        th:text="${cursor.previous.spec.title}"
        >Previous</a
      >
      <a
        th:if="${cursor.hasNext()}"
        th:href="${cursor.next.status.permalink}"
        th:text="${cursor.next.spec.title}"
        >Next</a
      >
    </div>

    <!-- Comments -->
    <div th:if="${haloCommentEnabled}">
      <halo:comment group="content.halo.run" kind="Post" th:attr="name=${post.metadata.name}" />
    </div>
  </article>
</include>
```

---

## TailwindCSS Integration

```bash
pnpm add -D tailwindcss @tailwindcss/vite
```

```ts
// vite.config.ts
import tailwindcss from "@tailwindcss/vite";
import { haloThemePlugin } from "@halo-dev/vite-plugin-halo-theme";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [tailwindcss(), haloThemePlugin()],
});
```

```css
/* src/css/main.css */
@import "tailwindcss";
```

---

## Ready-to-use Templates

The skill's `assets/` directory provides two ready-to-use templates:

- `assets/theme-minimal/` — Zero-build-tool minimal theme; good for quick prototyping or plain HTML/CSS themes
- `assets/theme-vite/` — Full Vite project with vite-plugin-halo-theme; recommended as the starting point for new themes

Usage: copy the directory into `themes/` in your Halo working directory, ensure the folder name matches `metadata.name` in `theme.yaml`, then install and activate in Console.
