# pe-mfe-dashboard — Claude Context

## What This Is

The showcase MFE — a multi-page dashboard demonstrating the full system. Not yet implemented beyond scaffolding.

Port: 3002. Accessed via the shell at `/dashboard/*`. This is the only public route in the shell (no auth required).

---

## Planned Pages

| Page | Route | Status |
|---|---|---|
| Home / Summary | `/` (index) | Not started |
| Architecture | `/architecture` | Not started |

The Activity Sidebar is a collapsible persistent panel across all pages — not a route.

**Home / Summary**: aggregate view across all domains — job search stats, budget snapshot, overdue home tasks, active projects.

**Architecture**: interactive service diagram. Click a node to see tech stack, DB, hosting, and connections.

**Activity Sidebar**: collapsible, persistent across all pages. Running list of user actions newest-first. Each entry expandable to show the full distributed trace (spans from go-tracer). Planned trace visualizations:
- **Waterfall** — each span as a horizontal bar positioned relative to trace start; shows which service dominates latency
- **Async gap** (once Pub/Sub is wired) — visually separate the sync response from async downstream handling; label the gap
- **Aggregate latency** — if multiple traces exist for an action type, show P50/P95 with a sparkline inline
- **Cold start detection** — flag traces 3–5x slower than baseline; demonstrates real Cloud Run behavior
- **Call chain tree** — once service-to-service calls exist, show the dependency tree for a trace

---

## Current State

Scaffolding only. The following are template artifacts left over from the MFE template — delete them when building real features:

- `src/api/thingApi.ts` and `src/api/index.ts`
- `src/hooks/thingHooks.ts` (query key is the nonsense string `'get-car-data'`)
- The `/feck` route in `App.tsx`

---

## env vars

Not yet finalized — will be determined as pages are built out. Known minimum:
- `AUTH_URL` → go-auth base URL for token refresh (default: `http://localhost:8080`)

Additional vars (Go service URLs, GQL_URL, etc.) will be added as the aggregation and tracing pages are built.

---

## Tailwind
Uses `tw:` prefix (`tw:flex`, `tw:text-sm`, etc.) — required by the MFE Tailwind config.

## pe-mfe-utils
`@bka-stuff/pe-mfe-utils` is installed via `github:` URL (public tarball). Never use `pnpm link` or workspace overrides — breaks CI.
