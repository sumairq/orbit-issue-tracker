// Vercel serverless entry point.
//
// Vercel detects functions in the `api/` directory and compiles them itself,
// but its compiler does NOT apply this project's `tsconfig` path aliases
// (`database/...`, `entities`, etc.). So instead of pointing Vercel at the
// TypeScript source, we run our own `npm run build` (tsc + tsc-alias) via the
// `buildCommand`, which emits `build/` with fully *relative* imports, and this
// thin wrapper simply re-exports the compiled Express app as the handler.
//
// The app guards `app.listen()` behind `!process.env.VERCEL`, so importing it
// here does not start a listener — Vercel invokes the exported app per request.
// eslint-disable-next-line import/no-unresolved, global-require
module.exports = require('../build/index.js').default;
