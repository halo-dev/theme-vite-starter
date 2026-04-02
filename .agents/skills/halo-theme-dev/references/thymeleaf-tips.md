# Thymeleaf Best Practices for Halo Themes

**1. Prefer literal substitutions over string concatenation**

```html
<!-- ✅ readable, no quoting issues -->
<title th:text="|${post.spec.title} - ${site.title}|"></title>

<!-- ❌ verbose and error-prone -->
<title th:text="${post.spec.title} + ' - ' + ${site.title}"></title>
```

**2. Use safe navigation `?.` to avoid NullPointerException**

```html
<!-- ✅ returns null instead of throwing if target is null -->
<a th:target="${item.spec.target?.value}"></a>
```

**3. Use Elvis operator `?:` for default values**

```html
<p th:text="${theme.config.basic.custom_footer ?: site.title}"></p>
```

**4. Use `th:block` to group without adding extra DOM elements**

```html
<th:block th:each="archive : ${archives.items}">
  <h2 th:text="${archive.year}"></h2>
  <ul>...</ul>
</th:block>
```

**5. Use `th:classappend` for conditional classes**

```html
<!-- ✅ appends "active" without overwriting existing classes -->
<a th:classappend="${item.active} ? 'active'">...</a>

<!-- ❌ replaces all classes -->
<a th:class="${item.active} ? 'nav-link active' : 'nav-link'">...</a>
```

**6. Use `#lists.isEmpty()` and `#strings.isEmpty()` for null-safe checks**

```html
<div th:if="${not #lists.isEmpty(post.tags)}">
  <a th:each="tag : ${post.tags}" th:text="${tag.spec.displayName}"></a>
</div>
```

**7. Do not manually add meta tags — Halo injects them automatically**

Only `<title>` needs to be in the theme. Halo automatically injects at runtime:
- `<meta name="description">` and `<meta name="keywords">`
- Open Graph tags (`og:title`, `og:description`, `og:image`, etc.)
- Twitter Card tags and canonical URL

```html
<!-- ✅ correct -->
<head>
  <title th:text="${site.title}">Site Title</title>
</head>

<!-- ❌ redundant — conflicts with Halo's auto-injected tags -->
<head>
  <title th:text="${site.title}">Site Title</title>
  <meta name="description" th:content="${site.seo.description}" />
  <meta property="og:title" th:content="${site.title}" />
</head>
```

**8. Use `@{${url}}` for dynamic permalink URLs**

```html
<!-- ✅ correct: wraps runtime URL in Thymeleaf's URL context -->
<a th:href="@{${post.status.permalink}}">...</a>

<!-- ❌ wrong: bypasses URL processing -->
<a th:href="${post.status.permalink}">...</a>
```
