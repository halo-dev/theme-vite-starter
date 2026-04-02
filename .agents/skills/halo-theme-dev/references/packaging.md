# Theme Packaging

Use [`@halo-dev/theme-package-cli`](https://github.com/halo-dev/theme-package-cli) to package a theme into a ZIP file for uploading to Halo Console or distributing to others.

## Installation

```bash
npm install -g @halo-dev/theme-package-cli
```

Or run without installing via `npx`:

```bash
npx @halo-dev/theme-package-cli
```

## Usage

Run in the theme root directory (the one containing `theme.yaml`):

```bash
# Package only essential files (recommended)
theme-package

# Package all files (excluding node_modules, dist, .git, etc.)
theme-package --all
```

## Default Package Contents (without `--all`)

| Included | Description |
| -------- | ----------- |
| `templates/` | Templates and static assets |
| `*.yaml` / `*.yml` | Config files: `theme.yaml`, `settings.yaml`, etc. |
| `i18n/` | Internationalization files (if present) |
| `README.md` | Documentation file (if present) |
| `LICENSE` | License file (if present) |

> For Vite-based themes, run `npm run build` first to generate the `templates/` output, then run the packaging command.
