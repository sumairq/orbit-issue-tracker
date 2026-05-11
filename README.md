# Jira Clone

A full-stack Jira-style issue tracker. Drag-and-drop kanban board, rich-text issue descriptions, comments, search, and filters — all backed by a relational schema and a JWT-authenticated REST API.

This is a monorepo with two independently versioned packages: a TypeScript Express API and a React frontend.

## Stack

| Layer    | Tech                                                                                       |
| -------- | ------------------------------------------------------------------------------------------ |
| Frontend | React 19, react-router 7, styled-components 6, Formik, Quill, @hello-pangea/dnd, Webpack 5 |
| Backend  | Node.js, Express 5, TypeScript 6, TypeORM 0.3 (PostgreSQL)                                 |
| Auth     | JWT bearer tokens, guest-account seeding                                                   |
| Tooling  | ESLint 10 (flat config), Prettier 3, lint-staged, Husky, pm2                               |
| E2E      | Cypress 15                                                                                 |

## Repository layout

```
.
├── api/              Express + TypeORM backend (TypeScript)
│   ├── src/
│   │   ├── controllers/       thin handlers; wrap in catchErrors, return via res.respond
│   │   ├── entities/          TypeORM entities; each owns its static `validations` map
│   │   ├── database/          connection + guest-account seeder
│   │   ├── middleware/        addRespondToResponse, authenticateUser, handleError
│   │   ├── errors/            CustomError subclasses; catchErrors async wrapper
│   │   ├── routes/            attachPublicRoutes / attachPrivateRoutes
│   │   ├── utils/             typeorm helpers (find/create/update/delete + validation)
│   │   └── types/             express.d.ts augmentations (res.respond, req.currentUser)
│   ├── tsconfig.json
│   └── eslint.config.mjs
│
├── client/           React frontend (JS + PropTypes)
│   ├── src/
│   │   ├── App/               root, global styles, Toast, Routes
│   │   ├── Auth/              guest-account bootstrap → /authenticate
│   │   ├── Project/           feature root: Board, IssueSearch, IssueCreate, ProjectSettings
│   │   └── shared/
│   │       ├── components/    Button, Modal, Form, Select, TextEditor, …
│   │       ├── hooks/         useApi (query + mutation, in-memory cache)
│   │       ├── utils/         api wrapper, authToken, queryParamModal, url helpers
│   │       └── constants/
│   ├── webpack.config.js                  dev
│   ├── webpack.config.production.js       prod
│   └── eslint.config.mjs
│
├── package.json      root orchestrator (install-deps, build, start:production)
└── CLAUDE.md         contributor / agent guidance
```

## Prerequisites

- Node.js 20+ (Webpack 5, babel-loader 10, and ESLint 10 all require modern Node)
- PostgreSQL 13+
- Two databases:
  - `jira-clone_development` — used by `npm start`
  - `jira_test` — used by the Cypress suite (`start:test` switches to it)

## Setup

```bash
git clone https://github.com/sumairq/jira-clone.git
cd jira-clone
npm run install-deps           # installs root, api/, and client/
```

Create `api/.env`:

```ini
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_DATABASE=jira-clone_development
JWT_SECRET=replace-me
PORT=3000
```

The schema is rebuilt from entity decorators on every boot (`synchronize: true`) — there are no migration files. Drop and recreate the database to reset.

The frontend's default API base URL is `http://api.sumair.ml:3000`. Override it for local dev by setting `API_URL` (read via Webpack's `DefinePlugin`).

## Running locally

Two terminals:

```bash
cd api && npm start            # ts-node + nodemon, http://localhost:3000
cd client && npm start         # webpack-dev-server, http://localhost:8080
```

On first load the app calls `POST /authentication/guest`, which seeds 3 users + 1 project + 8 issues + comments and returns a JWT for one of the users. **There is no real signup flow** — the guest endpoint is the canonical entrypoint.

## Production builds

```bash
npm run build                  # tsc → api/build/, webpack → client/build/
npm run start:production       # boots both packages under pm2
```

The API entrypoint in production needs `tsconfig-paths.js` to be `-r`-loaded so path aliases resolve in compiled JS. The provided `start:production` script handles this; any new entrypoint must too.

## Tests

```bash
cd api && npm run start:test                # NODE_ENV=test, uses jira_test DB
cd client && npm run test:cypress           # opens the Cypress runner
```

`NODE_ENV=test` exposes `/test/reset-database` and `/test/create-account` for the suite. Cypress assumes the API at `:3000` and the client at `:8080` (see `client/cypress.json`).

Run a single spec:

```bash
cd client && node_modules/.bin/cypress run --spec cypress/integration/<name>.spec.js
```

## Architecture notes

### API request pipeline

`api/src/index.ts` wires middleware in this exact order — anything after `authenticateUser` is gated by JWT:

1. `cors`, `express.json`, `express.urlencoded`
2. `addRespondToResponse` — attaches `res.respond(data)`, the only shape controllers should return
3. `attachPublicRoutes` — `POST /authentication/guest` (and `/test/*` when `NODE_ENV=test`)
4. `authenticateUser` — reads `Bearer` JWT, loads `User`, sets `req.currentUser`
5. `attachPrivateRoutes` — comments, issues, project, currentUser
6. 404 → `RouteNotFoundError` → `handleError`

### Errors

Controllers wrap handlers in `catchErrors` so thrown errors flow into `handleError`. Throw a `CustomError` subclass (`EntityNotFoundError`, `BadUserInputError`, `InvalidTokenError`, `RouteNotFoundError`) for anything client-facing — only those serialize `message/code/status/data`. Everything else collapses to a generic 500.

The frontend branches on `error.code === 'INVALID_TOKEN'` to log the user out, so do not reuse that code for unrelated auth failures.

### Persistence helpers

CRUD goes through `api/src/utils/typeorm.ts`, never the repository directly:

- `findEntityOrThrow` — throws `EntityNotFoundError` with the constructor name
- `createEntity` / `updateEntity` — validate via the entity's static `validations` map (see `Issue.validations`), throwing `BadUserInputError` on failure
- `deleteEntity` — find then `instance.remove()`

When adding an entity, follow the `Issue.ts` pattern: extend `BaseEntity`, declare `static validations`, export from `entities/index.ts`, and register in the `entities` map in `utils/typeorm.ts` — otherwise validation is silently skipped.

### Path aliases

`api/tsconfig.json` sets `baseUrl: src` with `paths: { "*": ["./*"] }`. Imports look like `import { User } from 'entities'`, not relative paths. Dev (`ts-node`) resolves directly; prod (compiled JS) needs `tsconfig-paths.js` `-r`-loaded.

The client mirrors this via Webpack's `resolve.modules` and `jsconfig.json` — `import api from 'shared/utils/api'`, not `../../shared/utils/api`.

### Frontend data layer

`shared/utils/api.js` wraps axios:

- Auto-attaches `Bearer ${getStoredAuthToken()}`
- On `INVALID_TOKEN`, clears the token and pushes `/authenticate`
- Exposes `api.optimisticUpdate(url, { updatedFields, currentFields, setLocalData })` for instant UI with automatic rollback + toast on failure

`shared/hooks/api/useApi` exposes `.get` (= `useQuery`) and `.post/.put/.patch/.delete` (= `useMutation`). `useQuery` has an in-module cache keyed by URL with `cache-first` / `cache-only` / `no-cache` policies. The `setLocalData` it returns updates both React state and the cache, so use it for optimistic edits — cached pages stay in sync automatically.

### Modals

Modals are URL-driven. `shared/utils/queryParamModal.js` exports `createQueryParamModalHelpers(name)` returning `{ open, close, isOpen }`, which toggle a query param. See `Project/index.jsx` for the `issue-search` and `issue-create` usage.

### Routing

`react-router-dom` v7 with `unstable_HistoryRouter` so a shared `history` instance (`browserHistory.js`) can be used by both the axios layer (for unauthorized redirects) and `queryParamModal` (for modal toggles) outside the React tree.

## Conventions

- API: TypeScript strict mode (`noImplicitAny`, `strictNullChecks`); single quotes, trailing commas
- Client: plain JS + PropTypes; same Prettier settings
- File naming: PascalCase for React components and TypeORM entities; camelCase for utils/hooks/controllers
- Lint runs on commit via root husky + lint-staged in each subpackage; do not bypass with `--no-verify`
- Return data from API controllers via `res.respond(...)`, never `res.json` / `res.send`

## License

[MIT](./LICENSE) — © Sumair Qaisar
