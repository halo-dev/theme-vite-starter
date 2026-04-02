# Template Route Mapping & Template Variables

## Template Route Mapping

| Template file | URL path | Main variables | `_templateId` |
| ------------- | -------- | -------------- | ------------- |
| `templates/index.html` | `/` | `posts` | `index` |
| `templates/post.html` | `/archives/:slug` | `post` | `post` |
| `templates/page.html` | `/:slug` | `singlePage` | `page` |
| `templates/archives.html` | `/archives[/:year[/:month]]` | `archives` | `archives` |
| `templates/tags.html` | `/tags` | `tags` | `tags` |
| `templates/tag.html` | `/tags/:slug` | `tag`, `posts` | `tag` |
| `templates/categories.html` | `/categories` | `categories` | `categories` |
| `templates/category.html` | `/categories/:slug` | `category`, `posts` | `category` |
| `templates/author.html` | `/authors/:slug` | `author`, `posts` | `author` |

> Route prefixes (`/archives`, `/tags`, `/categories`) can be customized by users in Console system settings.

## Custom Templates

Register additional rendering templates for posts, single pages, or category archives via `spec.customTemplates` in `theme.yaml`. Supported types: `post`, `page`, `category`.

```yaml
spec:
  customTemplates:
    post:
      - name: Documentation
        file: post_documentation.html  # create under templates/
```

> After modifying theme.yaml, click "Reload Theme Configuration" on the theme page in Console.

## Key Notes

- Use `th:utext` (unescaped) to render post/page body content — never `th:text`.
- List variables (`posts`, `archives`, etc.) are `UrlContextListResult`; use `.hasPrevious()`/`.hasNext()`/`.prevUrl`/`.nextUrl` for pagination.
- `post.content.content` is only available automatically in `post.html`; in other templates fetch it separately via `postFinder.content(postName)`.

## Online Docs

> **Halo's VO types (field names, nested structures) change across versions. Do not guess field names from training data. Always fetch the doc for the relevant template before accessing specific fields on template variables.**

- index: https://raw.githubusercontent.com/halo-dev/docs/refs/heads/main/docs/developer-guide/theme/template-variables/index_.md
- post: https://raw.githubusercontent.com/halo-dev/docs/refs/heads/main/docs/developer-guide/theme/template-variables/post.md
- page: https://raw.githubusercontent.com/halo-dev/docs/refs/heads/main/docs/developer-guide/theme/template-variables/page.md
- archives: https://raw.githubusercontent.com/halo-dev/docs/refs/heads/main/docs/developer-guide/theme/template-variables/archives.md
- tag: https://raw.githubusercontent.com/halo-dev/docs/refs/heads/main/docs/developer-guide/theme/template-variables/tag.md
- tags: https://raw.githubusercontent.com/halo-dev/docs/refs/heads/main/docs/developer-guide/theme/template-variables/tags.md
- category: https://raw.githubusercontent.com/halo-dev/docs/refs/heads/main/docs/developer-guide/theme/template-variables/category.md
- categories: https://raw.githubusercontent.com/halo-dev/docs/refs/heads/main/docs/developer-guide/theme/template-variables/categories.md
- author: https://raw.githubusercontent.com/halo-dev/docs/refs/heads/main/docs/developer-guide/theme/template-variables/author.md
