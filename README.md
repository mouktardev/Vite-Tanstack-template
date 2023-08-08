# SPA - Vite - React - TanStack

### Includes:

- [Vite](https://vitejs.dev),
- [ReactJS](https://reactjs.org)
- [Tailwindcss](https://tailwindcss.com)
- [Eslint](https://eslint.org)
- [Prettier](https://prettier.io)
- [TypeScript](https://www.typescriptlang.org)
- [Tanstack-router](https://tanstack.com/router/v1)
- [Tanstack-Loader](https://tanstack.com/)
- [react-markdown](https://github.com/remarkjs/react-markdown) React component to render markdown.
  - [remark-gfm](https://github.com/remarkjs/remark-gfm) remark plugin to support GFM (autolink literals, footnotes, strikethrough, tables, tasklists).
  - [react-syntax-highlighter](https://github.com/react-syntax-highlighter/react-syntax-highlighter) Syntax highlighting component for React
- [zod-matter](https://github.com/HiDeoo/zod-matter) parse and validate frontmatter a tiny wrapper for gray-matter
- [lucide-react](https://lucide.dev/) an open source icon library.
- [framer-motion](https://github.com/framer/motion) an open source motion library for React, made by Framer.
- [nanostores](https://github.com/nanostores/nanostores) an open source state manager.

### File based structure:

- Routes declaration at src/routes.tsx
- `src/pages/_app.tsx` for an app level layout
- `src/pages/404.tsx` for a custom not-found page
- `src/pages/posts/layout.tsx` nested layout for all pages in posts
- Index routes
  - `src/pages/index.tsx` → /
  - `src/pages/posts/index.tsx` → /posts
- `src/schema.tsx` zod schema and fetch method's for posts.
- `src/component/breadcrumbs.tsx`

## Basic commands

All commands are run from the root of the project, from a terminal:

| Command        | Action                                                                           |
| :------------- | :------------------------------------------------------------------------------- |
| `pnpm install` | Installs dependencies                                                            |
| `pnpm dev`     | Starts local dev server at `localhost:1521` and lunch app window                 |
| `pnpm build`   | Build your production app to `./dist/`                                           |
| `pnpm lint`    | runs eslint to identifying if problematic patterns found in your JavaScript code |
| `pnpm check`   | prettier check if files are formatted                                            |
| `pnpm format`  | prettier format files                                                            |

---

> Threads [@mouktardev](https://www.threads.net/@mouktardev) Twitter [@mouktardev](https://twitter.com/mouktardev)
