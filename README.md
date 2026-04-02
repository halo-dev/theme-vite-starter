# Theme Vite Starter

面向 [Halo](https://www.halo.run/) 的主题脚手架：在 `src/` 中编写模板与前端资源，经构建生成 Halo 实际读取的 `templates/` 目录。

官方主题开发指南：<https://docs.halo.run/developer-guide/theme/prepare>

## 技术栈

| 类别     | 说明                                                                                                                                                                                                  |
| -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 运行时   | Halo 使用 **Thymeleaf** 渲染主题；模板变量与 Finder API 随 Halo 版本演进，请以[官方文档](https://docs.halo.run/developer-guide/theme/prepare)为准。                                                   |
| 构建     | **Vite**（依赖 `@voidzero-dev/vite-plus-core`；通过 [vite-plus](https://www.npmjs.com/package/vite-plus) 的 `vp` CLI 集成格式化、Lint 等）                                                            |
| 语言     | **TypeScript**（`tsc` 参与 `build` 脚本）                                                                                                                                                             |
| 主题插件 | [`@halo-dev/vite-plugin-halo-theme`](https://www.npmjs.com/package/@halo-dev/vite-plugin-halo-theme) — 源码见 [halo-sigs/vite-plugin-halo-theme](https://github.com/halo-sigs/vite-plugin-halo-theme) |
| 打包发布 | [`@halo-dev/theme-package-cli`](https://github.com/halo-dev/theme-package-cli) — 将主题打成 ZIP 供控制台上传                                                                                          |
| 包管理   | **pnpm**（版本见 `package.json` 的 `packageManager`）                                                                                                                                                 |

## 目录结构

- **`src/` 是源码目录**：在此维护 `.html` 页面与 `partials/` 片段、`css/`、`js/`（含 TS）等。插件在 **Vite 构建时** 处理 `<include>` / `<slot>` 等语法（与服务器上 **Thymeleaf 运行时** 互不替代，可同时使用）。
- **`templates/` 是构建产物**：Halo 只认主题根目录下的 `templates/`（内含页面 HTML 与 `templates/assets/` 等）。**不要**把 `src/` 当作 Halo 直接读取的路径；开发或发版前需执行构建，使 `templates/` 与当前源码一致。

```
.
├── src/                 # 源码：页面 HTML、partials、css、js
├── public/              # 可选；复制到 templates/assets/
├── templates/           # 构建生成
├── theme.yaml           # 主题元数据（必填）
├── settings.yaml        # 控制台主题设置表单（可选）
├── vite.config.ts
└── package.json
```

### `@halo-dev/vite-plugin-halo-theme`

1. **多页入口**：自动将 `src/` 下（除 `src/partials/` 外）的 `.html` 作为入口，输出到 `templates/` 下同名文件（例如 `src/index.html` → `templates/index.html`）。
2. **静态资源**：`src/` 中的 CSS/JS 由 Vite 打包进 `templates/assets/`；`public/` 中的文件会原样复制到 `templates/assets/`（不经打包）。
3. **模板复用**：支持构建期 `<include>`、`<slot>`，减轻纯 Thymeleaf 片段的重复书写。
4. **资源路径约定**：所有 HTML（含 `partials`）里引用静态资源时，路径按 **`src/` 根** 解析，而不是按当前文件所在子目录；说明见 [vite-plugin-halo-theme](https://github.com/halo-sigs/vite-plugin-halo-theme)。

## 开发

```bash
git clone git@github.com:halo-dev/theme-vite-starter.git ~/halo2-dev/themes/theme-vite-starter
cd ~/halo2-dev/themes/theme-vite-starter
pnpm install
pnpm dev
```

`pnpm dev` 等价于对主题执行 `vp build --watch`：修改 `src/` 后会持续重新生成 `templates/`。将主题目录链到或复制到 Halo 的 `themes/<metadata.name>/` 后，在控制台安装并启用主题即可预览。

开发 Halo 端建议关闭 Thymeleaf 缓存（例如环境变量 `SPRING_THYMELEAF_CACHE=false` 或配置 `spring.thymeleaf.cache: false`），便于模板热更新调试。

## 构建与打包

```bash
pnpm build
```

该命令会执行 TypeScript 检查、`vp build` 生成 `templates/`，并调用 `theme-package` 生成可分发的 ZIP。默认会打包 `templates/`、`theme.yaml` / `settings.yaml` 等必要文件，详见 [theme-package-cli](https://github.com/halo-dev/theme-package-cli)。

仅需要产物目录、不需要 ZIP 时：

```bash
pnpm build-only
```

## 其他脚本

| 命令           | 作用                        |
| -------------- | --------------------------- |
| `pnpm check`   | `vp check --fix`（Lint 等） |
| `pnpm prepare` | `vp config`（项目准备）     |

## Agent Skills

仓库在 `.agents/skills/` 下内置了 **Halo 主题开发** 相关的 Agent Skill（例如 `halo-theme-dev`），整理了 Thymeleaf 要点、Finder API、`theme.yaml` / `settings.yaml`、vite 插件用法等参考材料。若在 Cursor 等支持 Agent Skills 的环境里开发，启用后可让 AI 更贴合 Halo 主题的约定来辅助编写与修改主题。
