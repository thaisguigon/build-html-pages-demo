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

## Bonus next steps

### Github CI/CD

Github Actions can be used for example to test, typecheck, build and deploy the project in a CI/CD workflow.

### Preview page before download

Currently the frontend app shows a live preview of the HTML code as the user is editing the page.
For a visual page preview, a preview api route `/api/page/[pageId]/preview` could be created. This api route would fetch the page data from the backend and return the generated HTML code as response.

### Unit tests

React components can be tested with Jest (see https://jestjs.io/fr/) and React Testing Library (see https://testing-library.com/).
To leverage React Testing Library, it is recommended to write accessible components that can be accessed with `*ByRole` selectors.

NestJS provides the package `@nestjs/testing`. It contains a set of utilities for testing Nest modules that integrates with Jest (see https://docs.nestjs.com/fundamentals/testing).
