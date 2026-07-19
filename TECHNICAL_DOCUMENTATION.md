# Page.AI - Technical Documentation

Blueprint for building the Express.js + MongoDB backend against the existing, frozen frontend. Read this alongside `API_CONTRACT.md` (the endpoint-by-endpoint spec) - this document covers the architecture around those endpoints: how the frontend is organized to consume them, what to build server-side, and in what order.

---

## 1. Project Architecture

The frontend is a Next.js 16 (App Router) application with three route groups sharing one design system:

```
app/
 ├── (auth)/        - login, signup/onboarding, forgot-password (unauthenticated)
 ├── (app)/         - the student product (dashboard, learn, practice, progress, earn, settings)
 ├── (admin)/       - the new admin panel (dashboard, users, content, moderation, rewards, analytics, platform)
 └── layout.tsx     - root layout: fonts, ThemeProvider, blocking theme-init script
```

Each route group has its own shell layout (sidebar + topbar) but all three share:
- The same design tokens (`app/globals.css` - CSS custom properties, so the whole app re-themes via `.dark`/`.soft` class overrides)
- The same icon system (`components/dashboard/icons.tsx` - a single `<Icon name="..."/>` component over hand-drawn SVG paths, no icon library dependency)
- The same service layer (below)

## 2. Folder Structure

```
lib/
 ├── api/                - the API client itself (axios instance, interceptors, mock helpers)
 │    ├── client.ts
 │    ├── config.ts       - mock/production mode switch, base URL, timeouts
 │    ├── errors.ts        - ApiError class + error codes
 │    └── index.ts
 ├── *-data.ts            - mock datasets (dashboard-data, learn-data, practice-data, progress-data,
 │                           rewards-data, mistakes-data, settings-data, admin-data). These are the
 │                           "mock backend" - every service method reads from one of these files today
 │                           and will read from MongoDB tomorrow.
types/                   - shared TypeScript interfaces (auth, admin, common + re-exports of the
                            domain types that live next to their mock data in /lib)
services/                - one file per domain, ~24 files, all named `<domain>.api.ts`. This is the
                            ONLY layer pages/components are allowed to import data from.
hooks/
 └── useApi.ts            - generic { data, loading, error, refetch } wrapper for Client Components
providers/
 ├── AuthProvider.tsx      - session context (built, not yet mounted - see §5)
 └── WalletProvider.tsx    - shared coin balance context (built, not yet mounted - see §5)
components/
 ├── admin/                - admin panel components (new)
 ├── dashboard/, learn/, practice/, cbt/, rewards/, progress/, settings/, onboarding/, theme/, ui/
 └── (existing marketing components: Hero, Nav, Footer, etc. - untouched)
```

## 3. Service Layer

Every page/component that needs data imports from `@/services/*` (or the barrel `@/services`), never from `@/lib/*-data.ts` directly, and never calls `fetch`/`axios` itself. Example, `services/subject.api.ts`:

```ts
export const SubjectApi = {
  async getSubjects(): Promise<Subject[]> {
    return mockResponse(subjects); // swap this line for a real fetch when the backend exists
  },
};
```

Every method has a JSDoc comment naming its real endpoint (`GET /subjects`) - that comment is the contract; `API_CONTRACT.md` is the same information indexed by endpoint instead of by file.

**Read vs. write, and why some reads stay synchronous:** a few Client Components (notably `PracticeFlowClient.tsx`) keep instant, synchronous local filtering for config-screen interactions (subject/topic/difficulty chips) rather than an async round trip per click, because the dataset is small enough to hold client-side and an async call would add a visible render-cycle of lag to what's currently free. The actual write path (recording an attempt) does go through the service layer. This is a deliberate, documented exception, not an oversight - see the comment inline in that file.

## 4. API Client

`lib/api/client.ts` wraps `axios` with:
- **Base config** - base URL and timeout from `lib/api/config.ts` (env-driven: `NEXT_PUBLIC_API_BASE_URL`, `NEXT_PUBLIC_API_MODE`)
- **Request interceptor** - attaches `Authorization: Bearer <token>` from `tokenStore` (currently `localStorage`; swap for httpOnly cookies server-side if you want stronger XSS protection - see §19)
- **Response interceptor** - on a 401 in production mode, attempts one silent refresh via `/auth/refresh` and retries the original request once; normalizes all errors into `ApiError` with a stable `code` (`UNAUTHORIZED`, `VALIDATION_ERROR`, `NETWORK_ERROR`, `TIMEOUT`, etc.)
- **Retry** - idempotent GETs retry up to twice with backoff, except on auth/validation errors
- **Cancellation** - `apiClient.createCancelToken()` returns an `AbortController` for in-flight request cancellation
- **Mock mode** - `mockResponse(data, latencyMs)` / `mockFailure(message, code, latencyMs)` simulate a real round trip (0ms by default; bump `MOCK_LATENCY_MS` in `config.ts` during frontend development to see loading states)

To go live: implement the real Express endpoints, set `NEXT_PUBLIC_API_MODE=production` and `NEXT_PUBLIC_API_BASE_URL`, then work through `services/*.api.ts` one file at a time replacing `mockResponse(...)` bodies with `apiClient.get/post/patch/delete(...)` calls. No page changes required.

## 5. Authentication Architecture

Prepared, not wired in:
- `providers/AuthProvider.tsx` - session context, exposes `{ user, loading, login, signup, logout }`
- `lib/api/client.ts`'s `tokenStore` - access/refresh token persistence + the interceptor-driven refresh dance described above
- `types/auth.ts` - `Role`, `User`, `AuthTokens`, request/response shapes, including `Role = "student" | "teacher" | "school_admin" | "moderator" | "super_admin"` for RBAC

**Why `AuthProvider` isn't mounted in `app/layout.tsx` yet:** the current app has no route guarding at all - every page under `(app)` is reachable directly with no login check. Wrapping the tree in `AuthProvider` is harmless on its own (it just loads a session in the background), but the natural next step - a `<RequireAuth>` wrapper redirecting unauthenticated visitors - is a real behavior change, and the frontend-freeze instructions for this pass explicitly ruled out changing existing UX. **When real auth exists:**
1. Mount `<AuthProvider>` in `app/layout.tsx` (wrap `{children}`, alongside the existing `<ThemeProvider>`)
2. Add a `RequireAuth` component that redirects to `/login` when `!user && !loading`, and wrap `app/(app)/layout.tsx`'s children in it
3. Add the equivalent `RequireAdminRole` guard for `app/(admin)/layout.tsx`, checking `user.role !== 'student'`

## 6. State Management

Two context providers exist, following the same shape, both currently unmounted for the same reason as `AuthProvider`:
- `providers/AuthProvider.tsx` - current user/session
- `providers/WalletProvider.tsx` - coin balance, so a mission claim or store redemption can update the balance shown in the Topbar/Earn page/Dashboard simultaneously without a full page reload

Not yet built (same pattern, straightforward to add when needed): Notifications, Settings, Permissions, Offline Status, AI Session (conversation history/streaming state). Each should follow `WalletProvider.tsx`'s shape: a context + a hook (`useX`) + a `refresh()` you can call after a mutation.

`components/theme/ThemeProvider.tsx` is the one context that IS mounted - it's the reference implementation for "session-persisted client state with a blocking init script to avoid flash of wrong state," worth reading before building the others.

## 7. Mock Backend

Every `lib/*-data.ts` file is the "mock backend" - plain arrays/objects that the service layer's mock implementations read from. This is intentionally the same shape the real MongoDB documents should take (see §14's schema sketches, which mirror these files closely). When wiring up MongoDB, the fastest path is: seed collections from these exact mock files, then confirm each service's real implementation returns matching shapes.

## 8. Offline Architecture
*(Prepared for; the current Next.js web build does not implement this - it's aimed at the Electron/Flutter production clients described in the product docs.)*

Recommended shape once needed:
- **IndexedDB** (web) / **SQLite** (Electron/Flutter, via a shared abstraction interface) for cached subjects, questions, attempts, and mistakes
- **Sync manager** - a queue of pending mutations (attempts, mission claims, chat messages) made while offline, flushed opportunistically when connectivity returns; conflict resolution should be last-write-wins for simple counters (streak, coins) and append-only for logs (attempts, mistakes) to avoid data loss
- **Request queue** - wrap `apiClient`'s POST/PATCH/DELETE methods so that a network failure enqueues the request instead of throwing, and a background flush retries in order

This is genuinely the product's core differentiator (per the hackathon documentation) - prioritize it early once the basic CRUD backend exists.

## 9. AI Architecture

`services/ai.api.ts` is the provider-agnostic abstraction every AI-touching feature should route through:

```ts
type AiProvider = "gemma-ondevice" | "cloud";
AiApi.chat(messages, provider?)                  // single-shot
AiApi.streamChat(messages, onToken, provider?)    // token-by-token
AiApi.remediate(context)                          // the core tutoring loop
AiApi.generateMnemonic(concept, subject)
AiApi.analyzeImage(file, prompt)                  // vision - not implemented
AiApi.processDocument(fileId)                     // long-document understanding - not implemented
```

**Important architectural note carried over from the product documentation:** this product is designed around Gemma 4 running on-device via LiteRT-LM, not a conventional cloud LLM API. That means `/ai/remediate` and friends may not be a typical Express handler forwarding to OpenAI/Anthropic - the "backend" role here may be limited to context assembly, rate limiting, and logging, with actual generation happening in-process on the client (via a native bridge in the Electron/Flutter builds) or via a thin proxy to a self-hosted inference runtime. Confirm this with whoever owns the AI infrastructure decision before assuming a standard REST-to-LLM-API shape.

The mock replies in `TutorApi`/`ChatApi` are simple canned strings - the actual system/user prompt templates production should follow (including the exact JSON response schema Gemma should return) are specified in the product documentation's "AI Prompt Engineering" section; implement `AiApi.remediate`'s real body against that spec, not from scratch.

## 10. File Upload Architecture

`services/upload.api.ts` implements the signed-URL pattern:
1. Client calls `getSignedUploadUrl(fileName, kind)` → backend returns a pre-signed PUT URL (S3/R2/GCS) + a `fileId`
2. Client PUTs the file bytes directly to that URL (never through the Express server)
3. Client calls `confirmUpload(fileId, file, kind)` → backend persists metadata (size, owner, kind, CDN URL) to `uploaded_files`

This keeps large files (PDFs for Chat with Book, images, videos) off the API server entirely. `UploadKind = "image" | "pdf" | "video" | "document"` - extend as needed.

## 11. Admin Panel Architecture

New route group, `app/(admin)/admin/**`, entirely built from scratch per the brief (unlike the rest of the frontend, which was frozen). Structure:

```
app/(admin)/
 ├── layout.tsx              - shell: AdminSidebar + AdminTopbar + PageTransition (reused from the student app)
 └── admin/
      ├── page.tsx            - Dashboard (platform stats, growth trend, AI usage, system health)
      ├── users/page.tsx       - Users (search, suspend/ban/delete)
      ├── content/page.tsx     - Content management (publish/flag/archive/delete)
      ├── moderation/page.tsx  - Reports queue (resolve/dismiss)
      ├── rewards/page.tsx     - Withdrawal/redemption requests (approve/reject)
      ├── analytics/page.tsx   - Growth + AI usage charts
      └── platform/page.tsx    - Feature flags, roles & permissions, audit log, system health
components/admin/
 ├── AdminSidebar.tsx, AdminTopbar.tsx, nav-data.ts
 └── UsersTable.tsx, ContentTable.tsx, ReportsList.tsx, WithdrawalsList.tsx, FeatureFlagsList.tsx
```

Deliberately reuses existing, unmodified components wherever the shape fit: `components/learn/PageHeader.tsx` for every admin page header, `components/progress/TrendChart.tsx` for growth charts, `components/ui/Toggle.tsx` for feature flags, the same `glass-card`/`bg-cta`/`bg-surface-*` tokens as the rest of the app. All data flows through `services/admin.api.ts`, backed by `lib/admin-data.ts`.

**Access control (not yet enforced):** every admin page currently renders unconditionally - there's no role check yet, matching the "prepare, don't implement auth" instruction. Wire in `RequireAdminRole` (see §5) as soon as real roles exist. Every mutating admin action should also write an `audit_logs` entry server-side - the frontend's `AdminApi.getAuditLogs()` assumes this is populated automatically by middleware, not by the frontend calling a separate "log this" endpoint.

## 12. Backend Development Order

Recommended build order, front-loading what unblocks the most frontend value fastest:

1. **Auth** (`/auth/*`) - everything else needs a `req.user`
2. **Users/Profile** (`/users/me`) - trivial once auth exists, unblocks Profile page
3. **Subjects/Resources/Practice/Mistakes** (read-heavy, mostly static content) - seed from `lib/learn-data.ts` / `lib/practice-data.ts` / `lib/mistakes-data.ts`
4. **CBT/Mock Exams** - the exam engine's submit endpoint, since it's the one with real scoring logic
5. **Wallet/Missions/Referrals** - once attempts/exams exist to actually reward, wire the coin economy
6. **AI endpoints** - highest complexity, most likely to need its own infrastructure decision (see §9); don't block the rest of the backend on this
7. **Admin API** - once the student-facing collections exist, the admin endpoints are mostly read + status-mutation over the same data
8. **Offline sync** - after the core REST API is stable

## 13. Migration from Mock APIs to Production APIs

Per service file, the change is mechanical:
```ts
// Before
async getSubjects(): Promise<Subject[]> {
  return mockResponse(subjects);
}

// After
async getSubjects(): Promise<Subject[]> {
  return apiClient.get<Subject[]>("/subjects");
}
```
No caller changes - every page already calls `SubjectApi.getSubjects()`, not the mock data directly. Suggested rollout: migrate one service at a time, verify its consuming page(s) (listed in `API_CONTRACT.md`) against a staging backend, then move to the next. `lib/api/config.ts`'s `API_MODE` can be flipped per-environment via `NEXT_PUBLIC_API_MODE` without a code change.

## 14. MongoDB Collections & Mongoose Model Sketches

Field names below match the TypeScript types in `/types` and the mock data in `/lib/*-data.ts` closely enough that seeding from the mock files is close to copy-paste.

```js
// users
{ _id, name, email, passwordHash, role, avatarInitial, classLevel, targetExams: [String],
  focusSubjects: [String], school, status, createdAt, lastActiveAt }

// wallets  (1:1 with users)
{ userId, todayCoins, lifetimeCoins, pendingSync, storeCredit, updatedAt }

// wallet_transactions
{ userId, label, type: "earned" | "spent", coins, createdAt }

// missions (catalog, not per-user - pair with a per-user progress doc if tracking completion server-side)
{ key, label, description, icon, reward, goal }

// referrals
{ userId, code, link, totalReferrals, activeReferrals, coinsEarned, monthlyGoal, monthlyProgress }

// subjects / topics / questions / options
{ _id, name, icon, color }                                  // subjects
{ _id, subjectId, name }                                     // topics
{ _id, topicId, stem, difficulty: 1-5 }                       // questions
{ _id, questionId, label, text, isCorrect }                   // options

// attempts
{ userId, questionId, chosenOptionId, isCorrect, attemptedAt }

// mistakes
{ attemptId, userId, misconceptionSummary, mnemonic, resolved }

// mastery
{ userId, topicId, masteryScore: 0.0–1.0, updatedAt }

// exam_configs (catalog)
{ _id, title, subject, board: "WAEC"|"JAMB"|"Mock", durationMinutes, questionCount, hasCalculator }

// exam_attempts
{ userId, examConfigId, answers: Map, correct, wrong, skipped, timeTakenSeconds, coinsEarned, submittedAt }

// reports  (moderation)
{ reason, status, targetType, targetId, reportedBy, notes, createdAt }

// admin_content  (or reuse subjects/questions/resources with a shared `status` field)
{ type, title, subject, status: "published"|"draft"|"flagged"|"archived", author, updatedAt }

// audit_logs
{ actorId, action, target, ip, createdAt }

// feature_flags
{ key, label, description, enabled, rolloutPercent }
```

## 15. Express Route Structure (suggested)

```
src/
 ├── app.js                      - Express app, global middleware
 ├── routes/
 │    ├── auth.routes.js
 │    ├── users.routes.js
 │    ├── dashboard.routes.js
 │    ├── subjects.routes.js  ... (one file per API_CONTRACT.md section)
 │    └── admin/
 │         ├── users.routes.js
 │         ├── content.routes.js
 │         └── ...
 ├── controllers/                 - one per route file, thin - validation + calling services
 ├── services/                    - business logic (mastery calculation, coin awarding, etc.)
 ├── models/                      - Mongoose schemas, one file per collection in §14
 ├── middleware/
 │    ├── auth.middleware.js       - verifies JWT, attaches req.user
 │    ├── role.middleware.js       - requireRole(...roles) guard for admin routes
 │    ├── validate.middleware.js   - request body validation (zod/joi)
 │    ├── audit.middleware.js      - writes to audit_logs after any admin mutation
 │    └── errorHandler.middleware.js - maps thrown errors to { message, code } + status, matching ApiError
 └── config/
      └── db.js, env.js
```

## 16. Middleware Required

- **JWT auth** - verify access token, attach `req.user`, reject with 401 (matching `ApiError`'s `UNAUTHORIZED` code so the frontend's interceptor behaves correctly)
- **Role-based access** - `requireRole("moderator", "super_admin")` style guard for every `/admin/*` route per the role column in `API_CONTRACT.md`
- **Rate limiting** - especially on `/ai/*` (cost/abuse control) and `/auth/login` (brute force)
- **Request validation** - reject malformed bodies with 422 + a `VALIDATION_ERROR` code before hitting business logic
- **Audit logging** - wrap all `/admin/*` mutations
- **CORS** - restrict to the actual frontend origin(s) in production

## 17. Role-Based Permissions

`types/admin.ts`'s `RolePermission` and the mock `lib/admin-data.ts`'s `rolePermissions` define a simple string-permission model (`"users:suspend"`, `"content:flag"`, etc.) rather than a full RBAC engine - deliberately simple for v1. `super_admin` has `["*"]`. Implement `requireRole`/`requirePermission` middleware against this same shape so the admin UI's role table stays authoritative.

## 18. Testing Recommendations

- **Contract tests** against `API_CONTRACT.md` - for each endpoint, assert response shape matches the TypeScript type in `/types` (consider generating a JSON Schema from the TS types via `ts-json-schema-generator` and validating real responses against it in CI)
- **Service-layer parity tests** - for each `services/*.api.ts` file, a smoke test that mock mode and production mode (against a test server) return structurally identical shapes
- **E2E** - Playwright against the actual pages listed in `API_CONTRACT.md`'s "Frontend" rows, since those are the real integration surface
- **Load testing** the dashboard aggregate endpoint and `/ai/*` specifically - they're the highest-traffic and highest-latency-risk routes respectively

## 19. Security Recommendations

- Move tokens from `localStorage` to httpOnly cookies if XSS risk is a concern for this deployment (requires adjusting `tokenStore` in `lib/api/client.ts` and the request interceptor - cookies would be sent automatically, no `Authorization` header needed)
- Never trust client-sent balances/scores for anything that pays out - `wallet.storeCredit` checks, exam scoring, and mission-completion checks must all be re-verified server-side (the mock services already model this - `WalletApi.redeemItem`'s real implementation must re-check balance server-side, not trust the client's cached wallet state)
- Rate-limit `/ai/*` per user and per IP
- Validate file uploads server-side (type, size, virus scan for user-uploaded PDFs before they're servable to other users, if ever shared)
- The Earn/Wallet system was deliberately scoped to in-app-only redemptions (no cash, airtime, or third-party offerwall integration) - preserve that constraint in the backend too; don't let a future feature request quietly reintroduce a cash-out path without revisiting the reasoning documented in `API_CONTRACT.md` §17

## 20. Scalability Recommendations

- The dashboard aggregate endpoint is the highest-traffic read - consider a short-TTL cache (Redis) keyed by user
- `attempts`/`activity_log` are append-only and will grow fastest - index by `userId` + `createdAt`, consider time-based partitioning/archival once volume grows
- AI endpoints benefit from queueing + streaming rather than synchronous request/response if using a shared inference backend, to avoid holding Express workers open during generation
- Admin analytics aggregation (growth trend, AI usage by subject) should run as a scheduled job writing to a small `platform_stats_daily` collection rather than aggregating raw `attempts`/`users` on every dashboard load
