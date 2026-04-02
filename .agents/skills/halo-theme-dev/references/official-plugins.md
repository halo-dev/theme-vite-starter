# Official Plugin Integration

Halo's official plugins can extend the frontend UI. Themes should adapt to these plugins rather than re-implementing the same functionality.

## Checking Plugin Availability

Use `pluginFinder.available(pluginName)` to conditionally render plugin-dependent UI. This prevents broken UI when the plugin is not installed.

```html
<button th:if="${pluginFinder.available('PluginSearchWidget')}"
        onclick="javascript:SearchWidget.open()">
  Search
</button>
```

Always guard plugin-dependent elements with `th:if="${pluginFinder.available('...')}"`.

## Search Widget (PluginSearchWidget)

The official search plugin provides a ready-made search UI. Themes do not need to build their own search — just add a trigger button:

```html
<button th:if="${pluginFinder.available('PluginSearchWidget')}"
        onclick="javascript:SearchWidget.open()">
  Search
</button>
```

## Dark Mode Adaptation

Official plugins that provide UI components (search widget, comment component, etc.) support a shared color scheme system. Themes that implement dark mode should apply the appropriate class or `data-color-scheme` attribute to `<html>` or `<body>` so plugin UI matches the theme's color scheme automatically.

### Method 1: CSS class on `<html>` or `<body>`

| Class | Effect |
| ----- | ------ |
| `color-scheme-auto` | Follows system dark/light preference |
| `color-scheme-dark` or `dark` | Force dark mode |
| `color-scheme-light` or `light` | Force light mode |

```html
<html class="color-scheme-dark">

<!-- or -->

<html class="dark">
```

### Method 2: `data-color-scheme` attribute on `<html>` or `<body>`

| Value | Effect |
| ----- | ------ |
| `auto` | Follows system preference |
| `dark` | Force dark mode |
| `light` | Force light mode |

```html
<html data-color-scheme="auto">
```

> Both methods achieve the same result. Dark mode switching is typically handled by frontend JavaScript (toggling the class/attribute at runtime). This applies to all official plugins that render UI (search widget, comment component, etc.).
