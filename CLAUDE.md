# pe-mfe-dashboard — Claude Context

## What This Is

The portfolio landing page. Single route (`/`), public (no auth required). First thing a reviewer sees.

Port: 3002. Accessed via the shell at `/dashboard/*`.

---

## Page Layout

Single page, no sub-routes. Two sections:

**Hero section (above fold):**
- Inverted-pyramid description paragraph + tech stack tag row
- Demo registration card — adapts based on auth state (see below)

**Service grid (below fold, always visible):**
- 10 cards in a 3-column grid: go-auth, go-job-search, go-budget, go-tracer, gql-home-maintenance, gql-recipes, gql-project-mgr, gql-router, Shell+MFEs, pe-mfe-utils
- Each card: name, role badge (Backend/GraphQL/Frontend/Infrastructure), stack tags, description, GitHub link (always), "Open" link to MFE route (logged-in users only, domain MFEs only)
- Static data defined in `src/components/ServiceGrid.tsx`

---

## Demo Registration Card States

**Pre-auth:** Register button. On 429: "Demo limit reached for today."

**Post-registration (just registered):**
- Credentials (username + password) with copy buttons
- "Your data is being seeded" message + TTL/rate limit disclosure
- Rube Goldberg button: hidden until the demo registration trace leaves `useTracerStore` (i.e. polling completes); revealed via `useEffect` watching `traces`
- Rube result (OWID article title + link) displayed after chain completes

**Returning demo user (logged in as `isDemo`, no fresh `registrationResult`):**
- "You're logged in as a demo user"
- "Show credentials" button → reads `demo_credentials` from `localStorage`, checks `userId` matches current user
- Rube Goldberg button always visible

---

## Registration Flow

1. `startTrace('register-demo')` → `traceId`
2. `axiosPublic.post('/demo/register', null, { headers: { 'X-Trace-ID': traceId } })`
3. `authClient.setTokens(accessToken, refreshToken)`
4. `axiosAuth.get('/users/me')` → user object
5. `setUser(user)` from `useUserStore()` — shell nav links appear
6. `localStorage.setItem('demo_credentials', JSON.stringify({ username, password, userId }))`
7. Watch `useTracerStore().traces` — when `traceId` leaves the list → `setShowRubeButton(true)`

---

## Key Files

```
src/
  api/demoApi.ts          ← registerDemo(), getCurrentUser(), rubeGoldberg()
  utils/axios.ts          ← axiosPublic, axiosAuth, authClient (exported for setTokens)
  pages/Dashboard.tsx     ← main page; owns registration + rube state
  components/
    HeroSection.tsx       ← static description + stack tags
    DemoRegistrationCard.tsx ← adapts to pre/post/returning state
    ServiceCard.tsx       ← individual card with role badge + links
    ServiceGrid.tsx       ← static service definitions + grid layout
```

---

## env vars

- `AUTH_URL` → go-auth base URL (default: `http://localhost:8080`); used for both `axiosPublic` (unauthenticated calls) and `axiosAuth` (token-authenticated calls, including `GET /users/me` and `POST /rube`)

No `API_URL` or `GQL_URL` — all API calls go to go-auth directly.

---

## Notes

- `Button` from pe-mfe-utils takes a `text` prop, not `children`
- `registerDemo()` returns `{ data: DemoRegisterResponse, traceId: string }` — the traceId is needed to watch for trace completion
- GitHub URLs in `ServiceGrid.tsx` follow the `Strangebrewer` pattern from Go module paths — verify before deploying
- `isReturningDemo` is derived: `!!user && !registrationResult` — no `isDemo` field on the store `User` type; credential recovery falls back gracefully if localStorage has no matching entry

---

## Deferred: MFE landing page blurbs

Each MFE landing page (`/`) should show a short description of the service and how to use it — visible only to demo users. Goal: a recruiter poking around gets immediate context without having to reverse-engineer the UI.

**Dependency**: `isDemo` is a JWT claim but not currently on the `User` type in `useUserStore`. Would need to be added to `GET /users/me` response in go-auth and propagated to the store. Once that's in place, each MFE's landing page checks `user?.isDemo` and renders the blurb conditionally.

Touches 5 MFE repos (job-search, budget, home-maintenance, recipes, project-mgr) plus go-auth and pe-mfe-utils (store type).

## Tailwind
Uses `tw:` prefix (`tw:flex`, `tw:text-sm`, etc.) — required by the MFE Tailwind config.

## pe-mfe-utils
`@bka-stuff/pe-mfe-utils` is installed via `github:` URL (public tarball). Never use `pnpm link` or workspace overrides — breaks CI.
