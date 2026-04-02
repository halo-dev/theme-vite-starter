# Model Metadata (Annotations)

Themes can extend built-in Halo models with custom fields via `AnnotationSetting` resources (e.g. adding an icon to menu items, or a download URL to posts), then read those values in templates via the `#annotations` utility.

## Defining a Metadata Form (AnnotationSetting)

Create a file (any name) in the theme root, e.g. `annotation-setting.yaml`, and declare an `AnnotationSetting` resource:

```yaml
apiVersion: v1alpha1
kind: AnnotationSetting
metadata:
  name: theme-foo-menuitem-abc123  # recommended: add theme prefix + random suffix to avoid conflicts
spec:
  targetRef:
    group: ""
    kind: MenuItem
  formSchema:
    - $formkit: text
      name: icon
      label: Menu icon class
      value: ""
```

Multiple models can be declared in the same file separated by `---`:

```yaml
apiVersion: v1alpha1
kind: AnnotationSetting
metadata:
  name: theme-foo-post-abc123
spec:
  targetRef:
    group: content.halo.run
    kind: Post
  formSchema:
    - $formkit: text
      name: download_url
      label: Download URL
      value: ""

---
apiVersion: v1alpha1
kind: AnnotationSetting
metadata:
  name: theme-foo-menuitem-abc123
spec:
  targetRef:
    group: ""
    kind: MenuItem
  formSchema:
    - $formkit: text
      name: icon
      label: Icon
      value: ""
```

### Supported Models

| Model | `group` | `kind` |
| ----- | ------- | ------ |
| Post | `content.halo.run` | `Post` |
| Single page | `content.halo.run` | `SinglePage` |
| Post category | `content.halo.run` | `Category` |
| Post tag | `content.halo.run` | `Tag` |
| Menu item | `""` | `MenuItem` |
| User | `""` | `User` |

### Notes

- All values in `metadata.annotations` are **strings**, so form values must also be strings.
- Do not use components with non-string output such as `number`, `group`, or `repeater`.
- For `checkbox`, explicitly set `on-value` / `off-value` to string values (e.g. `"true"` / `"false"`).
- Use a theme-name prefix plus a random suffix for `metadata.name` to avoid conflicts with other themes/plugins, e.g. `theme-earth-post-wanfs5`.

## Reading Metadata in Templates

Halo provides a `#annotations` utility object in Thymeleaf with three methods:

### `#annotations.get(object, key)` — Get a value

```html
<div th:with="menu = ${menuFinder.getPrimary()}">
  <li th:each="item : ${menu.menuItems}">
    <i th:class="${#annotations.get(item, 'icon')}"></i>
    <a th:href="${item.status.href}" th:text="${item.status.displayName}"></a>
  </li>
</div>
```

### `#annotations.getOrDefault(object, key, defaultValue)` — Get a value with fallback

```html
<i th:class="${#annotations.getOrDefault(menuItem, 'icon', 'fa fa-link')}"></i>
```

### `#annotations.contains(object, key)` — Check if a key exists

```html
<i
  th:if="${#annotations.contains(menuItem, 'icon')}"
  th:class="${#annotations.get(menuItem, 'icon')}"
></i>
```

## Online Docs

> **`AnnotationSetting` spec and supported models may change across Halo versions. Fetch the relevant doc if unsure about supported `group`/`kind` combinations or form schema constraints.**

- Using metadata in templates: https://raw.githubusercontent.com/halo-dev/docs/refs/heads/main/docs/developer-guide/theme/annotations.md
- Defining annotation forms: https://raw.githubusercontent.com/halo-dev/docs/refs/heads/main/docs/developer-guide/annotations-form.md
