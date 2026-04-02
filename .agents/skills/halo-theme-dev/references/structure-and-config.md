# Directory Structure & Configuration

## Directory Structure

```
my-theme/
├── templates/
│   ├── assets/               # Static assets (CSS/JS/images etc.) — must be placed here
│   │   ├── css/
│   │   │   └── style.css
│   │   └── js/
│   │       └── main.js
│   ├── index.html            # Home page
│   ├── post.html             # Post detail
│   ├── page.html             # Single page detail
│   ├── archives.html         # Post archives
│   ├── tags.html             # Tag listing
│   ├── tag.html              # Tag archive
│   ├── categories.html       # Category listing
│   └── category.html         # Category archive
├── theme.yaml                # Theme configuration (required)
└── settings.yaml             # Theme settings form definition (optional)
```

> **Important**: The theme folder name must match the `metadata.name` field in `theme.yaml`; otherwise some assets may fail to load.

## theme.yaml

The theme root directory must contain `theme.yaml`. Minimal runnable config:

```yaml
apiVersion: theme.halo.run/v1alpha1
kind: Theme
metadata:
  name: theme-foo # must match the theme folder name
spec:
  displayName: My Theme
  version: 1.0.0
  requires: ">=2.0.0"
```

Full field example:

```yaml
apiVersion: theme.halo.run/v1alpha1
kind: Theme
metadata:
  name: theme-foo
spec:
  displayName: My Theme
  author:
    name: Author Name
    website: https://example.com
  description: An example theme
  logo: https://example.com/logo.png
  homepage: https://github.com/example/theme-foo
  repo: https://github.com/example/theme-foo.git
  issues: https://github.com/example/theme-foo/issues
  settingName: "theme-foo-setting"   # must match metadata.name in settings.yaml
  configMapName: "theme-foo-configMap"
  customTemplates:                   # optional
    post:
      - name: Documentation
        description: Article in documentation format
        screenshot:
        file: post_documentation.html
    category:
      - name: Knowledge Base
        description: Knowledge base category
        screenshot:
        file: category_knowledge.html
    page:
      - name: About
        description: About page
        screenshot:
        file: page_about.html
  version: 1.0.0
  requires: ">=2.0.0"
  license:
    - name: "GPL-3.0"
      url: "https://github.com/example/theme-foo/blob/main/LICENSE"
```

### Key Fields

| Field | Description | Required |
| ----- | ----------- | -------- |
| `metadata.name` | Unique theme identifier — **must match the folder name** | Yes |
| `spec.displayName` | Display name | Yes |
| `spec.version` | Theme version | Yes |
| `spec.requires` | Minimum required Halo version | Yes |
| `spec.settingName` | Setting resource name — must match `metadata.name` in settings.yaml | No |
| `spec.configMapName` | ConfigMap name for persisting settings | No (configure together with settingName) |
| `spec.customTemplates` | Custom template configuration | No |

> After modifying `theme.yaml`, click "Reload Theme Configuration" on the theme page in Console for changes to take effect.

## settings.yaml

Defines a form that is auto-rendered on the theme settings page in Console, using [FormKit](https://github.com/formkit/formkit).

```yaml
apiVersion: v1alpha1
kind: Setting
metadata:
  name: theme-foo-setting  # must match spec.settingName in theme.yaml
spec:
  forms:
    - group: style   # group name (accessed in templates as theme.config.style.xxx)
      label: Style
      formSchema:
        - $formkit: radio
          name: color_scheme   # field name (accessed as theme.config.style.color_scheme)
          label: Default color scheme
          value: system
          options:
            - label: Follow system
              value: system
            - label: Dark
              value: dark
            - label: Light
              value: light
        - $formkit: color
          name: background_color
          label: Background color
          value: "#f2f2f2"
    - group: layout
      label: Layout
      formSchema:
        - $formkit: radio
          name: nav
          label: Navigation layout
          value: "single"
          options:
            - label: Single column
              value: "single"
            - label: Double column
              value: "double"
```

### Using Settings Values in Templates

Pattern: `theme.config.[group].[name]`

```html
<!-- Use color_scheme from the style group -->
<body th:class="${theme.config.style.color_scheme}">
  <ul th:if="${theme.config.layout.nav == 'single'}">
    Single-column nav
  </ul>
  <div th:if="${theme.config.layout.nav == 'double'}">Double-column nav</div>
</body>
```

### Native FormKit Input Types

Commonly used native input components in theme settings (see links for full docs):

| `$formkit` value | Purpose | Docs |
| ---------------- | ------- | ---- |
| `text` | Single-line text | https://formkit.com/inputs/text.md |
| `textarea` | Multi-line text | https://formkit.com/inputs/textarea.md |
| `number` | Number input | https://formkit.com/inputs/number.md |
| `password` | Password input | https://formkit.com/inputs/password.md |
| `radio` | Radio buttons (options list) | https://formkit.com/inputs/radio.md |
| `checkbox` | Checkbox (single or multi-select) | https://formkit.com/inputs/checkbox.md |
| `color` | Color picker (returns hex value) | https://formkit.com/inputs/color.md |
| `range` | Slider range | https://formkit.com/inputs/range.md |
| `date` | Date picker | https://formkit.com/inputs/date.md |
| `datetime-local` | Date-time picker | https://formkit.com/inputs/datetime-local.md |
| `button` | Button | https://formkit.com/inputs/button.md |
| `email` | Email input | https://formkit.com/inputs/email.md |
| `group` | Group (for grouping fields) | https://formkit.com/inputs/group.md |
| `url` | URL input | https://formkit.com/inputs/url.md |

FormKit Inputs overview: https://formkit.com/inputs

FormKit Schema (conditional rendering, loops, expressions, advanced usage): https://formkit.com/essentials/schema.md

> Note: FormKit Pro input components are not supported.

### Halo Extended Input Types

Additional input components provided by Halo on top of FormKit:

| `$formkit` value | Purpose |
| ---------------- | ------- |
| `select` | Enhanced dropdown with multi-select, search, and remote data source |
| `switch` | Toggle switch (boolean or custom on/off values) |
| `toggle` | Visual toggle supporting image/color/text options |
| `attachment` | Attachment picker (preview, direct upload, select from library) |
| `attachmentInput` | Attachment picker (library popup only) |
| `code` | Code editor (supports yaml/html/js/css/json) |
| `array` | Object array (add/remove/reorder — recommended over repeater) |
| `list` | Primitive array (strings, numbers, etc.) |
| `categorySelect` | Post category selector (returns `metadata.name`) |
| `categoryCheckbox` | Post category checkbox (returns array of `metadata.name`) |
| `tagSelect` | Post tag selector (returns `metadata.name`) |
| `tagCheckbox` | Post tag checkbox (returns array of `metadata.name`) |
| `postSelect` | Post selector |
| `singlePageSelect` | Single page selector |
| `menuSelect` | Menu selector (supports multi-select) |
| `menuCheckbox` | Menu checkbox |
| `menuRadio` | Menu radio |
| `iconify` | Icon picker (Iconify-based, supports svg/dataurl/url/name formats) |
| `secret` | Secret resource selector |
| `verificationForm` | Remote verification form group |

Full parameter reference: https://raw.githubusercontent.com/halo-dev/docs/refs/heads/main/docs/developer-guide/form-schema.md

### FormKit Schema Gotchas

**1. Inside `array` / `list` children, use `$value` — not `$get()`**

Within the `children` of an `array`, `list`, or `repeater`, access the current item's data via `$value`, not `$get(id).value`. `$get()` can only reference standalone named input nodes by `id`; it cannot reach the current item in a nested context.

```yaml
# ✅ Correct: use $value.[name] to reference a sibling field
- $formkit: array
  name: socials
  children:
    - $formkit: text
      name: platform
      label: Platform
    - $formkit: text
      name: url
      label: URL
      if: "$value.platform !== ''"   # references sibling field "platform"

    # ❌ Wrong: $get(platform).value does not work in a nested context
    - $formkit: text
      name: url
      if: "$get(platform).value !== ''"
```

**2. Nodes using `if` must also declare a `key`**

Any `$formkit`/`$el`/`$cmp` node with an `if` attribute must declare a unique `key`. Without it, Vue reuses DOM nodes when the condition toggles, causing stale form values or rendering glitches.

```yaml
# ✅ Correct: add key whenever if is present
- $formkit: text
  key: url-field
  name: url
  label: URL
  if: "$value.show_link === true"

# ❌ Wrong: missing key may cause value leakage on toggle
- $formkit: text
  name: url
  label: URL
  if: "$value.show_link === true"
```
