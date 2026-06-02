---
layout: article.njk
title: My First Article
date: 2026-06-01
excerpt: This is an example article to get you started. You can write articles in Markdown format.
---

This is an example article. You can delete this and create your own articles in the `src/articles/` folder.

## How to Write Articles

Create a new `.md` file in the `src/articles/` folder. Each article needs some metadata at the top:

```
---
layout: article.njk
title: Your Article Title
date: 2026-06-01
excerpt: A short description that appears in listings
---

Then write your content in Markdown...
```

## Markdown Features

You can use all standard Markdown syntax:

- **Bold text** with `**text**`
- *Italic text* with `*text*`
- [Links](https://example.com)
- Lists (like this one)
- Code blocks

### Code Example

```javascript
function hello() {
  console.log("Hello, world!");
}
```

### Images

You can add images by placing them in `src/assets/images/` and linking to them:

```markdown
![Alt text](/assets/images/filename.jpg)
```

> This is a blockquote. You can use these for highlighting important information.

That's it! Just keep adding articles and the blog will automatically display them on the home page and articles page.
