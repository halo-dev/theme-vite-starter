# Custom Template Tags

Halo provides proprietary custom tags for code injection and extension points.

---

## `<halo:comment>` — Comment extension point

### Description

Extension point tag for the comment component. When a plugin (such as the official comment plugin) implements this extension point, it renders the comment component at this tag's location.

### Usage

```html title="templates/post.html"
<!-- haloCommentEnabled checks whether a comment plugin is installed and comments are enabled for this page -->
<div th:if="${haloCommentEnabled}">
  <halo:comment group="content.halo.run" kind="Post" th:attr="name=${post.metadata.name}" />
</div>
```

```html title="templates/page.html"
<div th:if="${haloCommentEnabled}">
  <halo:comment
    group="content.halo.run"
    kind="SinglePage"
    th:attr="name=${singlePage.metadata.name}"
  />
</div>
```

### Attributes

| Attribute | Description |
| --------- | ----------- |
| `group` | Resource group |
| `kind` | Resource type |
| `name` | Unique resource identifier (`metadata.name`) |

### Supported Resource Types

| Resource | `group` | `kind` |
| -------- | ------- | ------ |
| Post | `content.halo.run` | `Post` |
| Single page | `content.halo.run` | `SinglePage` |

---

## `<halo:footer>` — Footer code injection

### Description

Renders the "Footer Code" configured in Console → System Settings → Code Injection at this tag's location. All themes should include this tag in the footer to ensure full Halo functionality (e.g. analytics scripts injected by plugins).

### Usage

```html title="templates/index.html (bottom of any template)"
<body>
  <!-- Page content -->

  <footer>
    <!-- Theme's own footer content -->
    <p>© 2024 My Site</p>

    <!-- Halo footer injection point (place before </body>) -->
    <halo:footer />
  </footer>
</body>
```

> For complete Halo functionality, include this tag in every template that contains a `<body>` element.
