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
- [zod-matter](https://github.com/HiDeoo/zod-matter) parse and validate frontmatter a tiny wrapper for gray-matter
- [framer-motion](https://github.com/framer/motion) an open source motion library for React, made by Framer.
<!-- - [shadcn/ui](https://github.com/shadcn/ui) ui elements in `src/components/ui` -->

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

### Vite configuration

- To let `gray-matter` work in vite i had to configure it here is a reference [solution](https://github.com/jonschlinkert/gray-matter/issues/143)

## Basic commands

All commands are run from the root of the project, from a terminal:

| Command        | Action                                                           |
| :------------- | :--------------------------------------------------------------- |
| `pnpm install` | Installs dependencies                                            |
| `pnpm dev`     | Starts local dev server at `localhost:1520` and lunch app window |
| `pnpm build`   | Build your production app to `./dist/`                           |
| `pnpm format`  | prettier format files                                            |
| `pnpm check`   | prettier check if files are formatted                            |

---

> Threads [@mouktardev](https://www.threads.net/@mouktardev) Twitter [@mouktardev](https://twitter.com/mouktardev)
