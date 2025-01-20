# build-html-pages-demo

Demo for an app that builds simple html pages.

## Getting started with Docker

```
> npm run compose:up
> open http://localhost:3000
```

## Packages

- `backend`: Backend api with GraphQL endpoint
  - Built with NestJS
  - Uses Prisma to access PostgreSQL database
  - Runs on port `3001`
- `frontend`: Frontend app with UI to create, edit, save and download simple HTML pages
  - Built with NextJS
  - Uses Apollo client to fetch data from backend
  - Runs on port `3000`
- `shared`: contains GraphQL schema and generated GraphQL types.
