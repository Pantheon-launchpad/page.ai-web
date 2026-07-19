# Page.AI - Backend API Contract

This document is the implementation blueprint for the Express.js + MongoDB backend. It mirrors the frontend's service layer (`/services/*.api.ts`) exactly - every method in that layer corresponds to one endpoint below. Once these are implemented, integration is a matter of swapping each service's mock body for a real `apiClient` call (see `TECHNICAL_DOCUMENTATION.md` → "Migrating from mock to production").

**Conventions used throughout:**

- Base URL: `/api/v1`
- Auth: `Bearer <JWT>` in the `Authorization` header unless marked "Public"
- All responses are wrapped as `{ data: T, message?: string }` on success
- All errors return `{ message: string, code: string, details?: unknown }` with the matching HTTP status
- Roles: `student` (default), `teacher`, `moderator`, `school_admin`, `super_admin`

---

## 1. Auth (`/auth`) - `services/auth.api.ts`

| Endpoint                | Method | Auth                           | Purpose                                   |
| ----------------------- | ------ | ------------------------------ | ----------------------------------------- |
| `/auth/signup`          | POST   | Public                         | Create account, returns user + tokens     |
| `/auth/login`           | POST   | Public                         | Email/password login                      |
| `/auth/google`          | POST   | Public                         | Google Identity Services token exchange   |
| `/auth/refresh`         | POST   | Public (refresh token in body) | Rotate access token                       |
| `/auth/logout`          | POST   | Bearer                         | Invalidate refresh token server-side      |
| `/auth/forgot-password` | POST   | Public                         | Send password reset email                 |
| `/auth/session`         | GET    | Bearer                         | Return current user from token, or `null` |

**POST /auth/signup**

- Request: `{ name, email, password, classLevel?, targetExams?, focusSubjects?, referralCode? }`
- Response: `{ user: User, tokens: AuthTokens }`
- Validation: `name` ≥ 2 chars; `email` valid + unique; `password` ≥ 8 chars in production (mock allows 6); `referralCode` looked up against an existing user if present
- Errors: 409 email already registered, 422 validation
- Collections: `users`, `referrals` (if code applied)
- Frontend: `app/(auth)/signup/page.tsx` → `components/onboarding/OnboardingFlow.tsx`

**POST /auth/login**

- Request: `{ email, password, rememberMe? }`
- Response: `{ user: User, tokens: AuthTokens }`
- Errors: 401 invalid credentials, 403 banned/suspended account
- Frontend: `app/(auth)/login/page.tsx`

**POST /auth/google**

- Request: `{ idToken }` (Google-issued ID token, verified server-side against Google's public keys)
- Response: `{ user: User, tokens: AuthTokens }` - creates the account on first sign-in
- Frontend: `components/auth/GoogleButton.tsx` (used on both login and signup)

**POST /auth/refresh**

- Request: `{ refreshToken }`
- Response: `{ accessToken: string }`
- Errors: 401 expired/invalid refresh token → client clears tokens and redirects to `/login`
- Consumed internally by `lib/api/client.ts`'s response interceptor, not called directly by any page

**GET /auth/session**

- Response: `User | null`
- Frontend: `providers/AuthProvider.tsx` (not yet mounted - see docs)

---

## 2. Users (`/users`) - `services/user.api.ts`

| Endpoint    | Method | Auth   | Purpose                  |
| ----------- | ------ | ------ | ------------------------ |
| `/users/me` | GET    | Bearer | Get own profile + stats  |
| `/users/me` | PATCH  | Bearer | Update name/email/school |
| `/users/me` | DELETE | Bearer | Delete own account       |

- Response shape for GET: `User & { level, coins, streak, studyMinutesToday, studyGoalMinutes }`
- PATCH validation: `email` unique if changed; changing email in production should require re-verification
- Collections: `users`
- Frontend: `app/(app)/profile/page.tsx`

---

## 3. Dashboard (`/dashboard`) - `services/dashboard.api.ts`

| Endpoint     | Method | Auth   | Purpose                                          |
| ------------ | ------ | ------ | ------------------------------------------------ |
| `/dashboard` | GET    | Bearer | Aggregate payload for the whole dashboard screen |

- Response: `{ student, greeting, continueLearning, aiRecommendation, recentActivity, upcomingRevision, quickActions }`
- This is intentionally one aggregate endpoint rather than seven - the mock mirrors this shape exactly (see `lib/dashboard-data.ts`). In production, consider whether this should be denormalized/cached per-user (e.g. Redis) since it's the highest-traffic read in the app.
- Collections: `users`, `attempts`, `activity_log`, `study_plans`
- Frontend: `app/(app)/dashboard/page.tsx` and all `components/dashboard/*` widgets

---

## 4. Subjects (`/subjects`) - `services/subject.api.ts`

| Endpoint        | Method | Auth   | Purpose                                            |
| --------------- | ------ | ------ | -------------------------------------------------- |
| `/subjects`     | GET    | Bearer | List subjects with the user's own progress/mastery |
| `/subjects/:id` | GET    | Bearer | Single subject detail                              |

- Collections: `subjects`, `user_subject_progress`
- Frontend: `app/(app)/subjects/page.tsx`, `components/learn/SubjectCard.tsx`

## 5. Resources (`/resources`) - `services/resource.api.ts`

| Endpoint                  | Method | Auth   | Purpose                                                                  |
| ------------------------- | ------ | ------ | ------------------------------------------------------------------------ |
| `/resources`              | GET    | Bearer | List resources, filterable by `type`, `subject`, `search` (query params) |
| `/resources/:id/bookmark` | POST   | Bearer | Toggle bookmark, body `{ bookmarked: boolean }`                          |

- Collections: `resources`, `user_bookmarks`
- Frontend: `app/(app)/resources/page.tsx` → `components/learn/ResourceLibraryClient.tsx`

---

## 6. AI Tutor (`/ai/tutor`) - `services/tutor.api.ts`, backed by `services/ai.api.ts`

| Endpoint                 | Method | Auth   | Purpose                                                        |
| ------------------------ | ------ | ------ | -------------------------------------------------------------- |
| `/ai/tutor/capabilities` | GET    | Bearer | Capability tiles + example prompt chips (mostly static config) |
| `/ai/tutor/message`      | POST   | Bearer | Send a message, get a reply                                    |

**POST /ai/tutor/message**

- Request: `{ message: string, conversationId? }`
- Response: `{ reply: string }` (non-streaming) - production should offer an SSE variant at `/ai/tutor/stream` matching `AiApi.streamChat`
- Rate limiting: strongly recommended per-user (e.g. 50/day on free tier - ties into `premium.api.ts` plan limits)
- Frontend: `app/(app)/ai-tutor/page.tsx` → `components/learn/ChatPanel.tsx`

## 7. Chat with Book (`/chat`) - `services/chat.api.ts`

| Endpoint                  | Method           | Auth   | Purpose                                         |
| ------------------------- | ---------------- | ------ | ----------------------------------------------- |
| `/chat/sources`           | GET              | Bearer | List available textbooks/chapters/uploaded docs |
| `/chat/:sourceId/message` | POST             | Bearer | Send a message scoped to that source            |
| `/chat/upload`            | POST (multipart) | Bearer | Upload a PDF/textbook as a new source           |

- Collections: `chat_sources`, `chat_messages`
- Uses `upload.api.ts`'s signed-URL flow for the actual file bytes; this endpoint just registers the resulting file as a chat source
- Frontend: `app/(app)/chat-with-book/page.tsx` → `components/learn/ChatWithBookClient.tsx`

## 8. Flashcards (`/flashcards`) - `services/flashcard.api.ts`

| Endpoint                                   | Method | Auth   | Purpose                         |
| ------------------------------------------ | ------ | ------ | ------------------------------- |
| `/flashcards/decks`                        | GET    | Bearer | List decks with due-count       |
| `/flashcards/:deckId/cards/:cardId/review` | POST   | Bearer | Submit a review rating          |
| `/flashcards/generate`                     | POST   | Bearer | AI-generate a deck from a topic |

- **POST review** body: `{ rating: "again" \| "hard" \| "good" \| "easy" }` → response `{ nextDueAt: ISO date }`. Production should implement SM-2 (or similar) spaced-repetition scheduling here.
- Collections: `flashcard_decks`, `flashcards`, `flashcard_reviews`
- Frontend: `app/(app)/flashcards/page.tsx` → `FlashcardsClient.tsx` → `FlashcardReview.tsx`

## 9. Study Planner (`/planner`) - `services/planner.api.ts`

| Endpoint   | Method | Auth   | Purpose                                                  |
| ---------- | ------ | ------ | -------------------------------------------------------- |
| `/planner` | GET    | Bearer | Weekly plan, upcoming exams, recommendations, daily goal |

- Collections: `study_plans`, `exam_dates`
- Frontend: `app/(app)/planner/page.tsx`

---

## 10. Practice Mode (`/practice`) - `services/practice.api.ts`

| Endpoint                             | Method | Auth   | Purpose                                                          |
| ------------------------------------ | ------ | ------ | ---------------------------------------------------------------- |
| `/practice/subjects`                 | GET    | Bearer | Subject list for the config screen                               |
| `/practice/subjects/:subject/topics` | GET    | Bearer | Topics within a subject                                          |
| `/practice/questions`                | GET    | Bearer | Filtered question pool - query: `subject`, `topic`, `difficulty` |
| `/practice/attempts`                 | POST   | Bearer | Record an attempt                                                |

- **POST attempts** body: `{ questionId, chosenIndex }` → updates `mastery` per topic (see mastery formula in Section 18 of the product doc - simple heuristic: 2 correct → harder, 2 wrong → easier)
- Collections: `questions`, `attempts`, `mastery`
- Frontend: `app/(app)/practice/page.tsx` → `PracticeFlowClient.tsx`
- **Design note:** the frontend deliberately keeps question-pool filtering client-side (see the comment in `PracticeFlowClient.tsx`) for instant config-screen feedback; only the write path (`recordAttempt`) is a real round trip in the current build. `getQuestions`/`getTopics` exist as the "correct" endpoints for when the dataset is too large to hold client-side.

## 11. CBT & Mock Exams (`/cbt`) - `services/cbt.api.ts`

| Endpoint                 | Method | Auth   | Purpose                                   |
| ------------------------ | ------ | ------ | ----------------------------------------- |
| `/cbt/papers`            | GET    | Bearer | WAEC/JAMB single-subject papers           |
| `/cbt/mock-exams`        | GET    | Bearer | Longer multi-subject mock configs         |
| `/cbt/:examId/questions` | GET    | Bearer | Questions for a specific paper            |
| `/cbt/:examId/submit`    | POST   | Bearer | Submit answers, get scored result + coins |

**POST /cbt/:examId/submit**

- Request: `{ answers: Record<number, number | null>, timeTakenSeconds: number }`
- Response: `{ correct, wrong, skipped, total, coinsEarned }`
- Validation: exam must not already be submitted twice within a short window (basic anti-abuse); `timeTakenSeconds` should be sanity-checked against the paper's `durationMinutes`
- Collections: `exam_configs`, `exam_attempts`, `wallet_transactions` (coin credit)
- Frontend: `app/(app)/cbt/page.tsx`, `app/(app)/mock-exams/page.tsx` → `ExamPicker.tsx` → `CBTExamClient.tsx` → `CBTReviewScreen.tsx`

## 12. Mistake Book (`/mistakes`) - `services/mistake.api.ts`

| Endpoint    | Method | Auth   | Purpose                                                               |
| ----------- | ------ | ------ | --------------------------------------------------------------------- |
| `/mistakes` | GET    | Bearer | Past mistakes with question + AI explanation, filterable by `subject` |

- Collections: `mistakes` (joined with `questions`)
- Frontend: `app/(app)/mistakes/page.tsx` → `MistakeBookClient.tsx`, also linked from `AIExplanationPanel.tsx`

---

## 13. Progress & Analytics (`/progress`) - `services/progress.api.ts`

| Endpoint               | Method | Auth   | Purpose                                                          |
| ---------------------- | ------ | ------ | ---------------------------------------------------------------- |
| `/progress/analytics`  | GET    | Bearer | Heatmap, accuracy trend, topic performance, subject distribution |
| `/progress/weak-areas` | GET    | Bearer | Auto-identified low-mastery topics                               |

- Collections: `attempts`, `mastery` (aggregated - likely a scheduled job or on-read aggregation pipeline in Mongo)
- Frontend: `app/(app)/analytics/page.tsx`, `app/(app)/weak-areas/page.tsx`

## 14. Achievements (`/achievements`) - `services/achievement.api.ts`

| Endpoint        | Method | Auth   | Purpose                               |
| --------------- | ------ | ------ | ------------------------------------- |
| `/achievements` | GET    | Bearer | Badge list with earned/progress state |

- Collections: `achievements`, `user_achievements`
- Frontend: `app/(app)/achievements/page.tsx`

## 15. Streaks (`/streaks`) - `services/streak.api.ts`

| Endpoint   | Method | Auth   | Purpose                                   |
| ---------- | ------ | ------ | ----------------------------------------- |
| `/streaks` | GET    | Bearer | Current/longest streak + calendar history |

- Collections: `streaks`
- Frontend: `app/(app)/streaks/page.tsx`

## 16. Learning History (`/history`) - `services/history.api.ts`

| Endpoint   | Method | Auth   | Purpose                         |
| ---------- | ------ | ------ | ------------------------------- |
| `/history` | GET    | Bearer | Chronological activity timeline |

- Collections: `activity_log`
- Frontend: `app/(app)/history/page.tsx`

---

## 17. Wallet / Page Coins (`/wallet`) - `services/wallet.api.ts`

| Endpoint                       | Method | Auth   | Purpose                                               |
| ------------------------------ | ------ | ------ | ----------------------------------------------------- |
| `/wallet`                      | GET    | Bearer | Balance summary (today/lifetime/pending/store credit) |
| `/wallet/missions`             | GET    | Bearer | Daily missions with progress                          |
| `/wallet/missions/:id/claim`   | POST   | Bearer | Claim a completed mission's reward                    |
| `/wallet/rewards/recent`       | GET    | Bearer | Recent reward events                                  |
| `/wallet/store`                | GET    | Bearer | Redeemable store items                                |
| `/wallet/store/:itemId/redeem` | POST   | Bearer | Redeem an item - **in-app value only**                |
| `/wallet/breakdown`            | GET    | Bearer | Coins earned by category                              |
| `/wallet/transactions`         | GET    | Bearer | Full transaction ledger                               |

**Product constraint, load-bearing for this whole domain:** every redemption on `/wallet/store/:itemId/redeem` must resolve to in-app value (Premium time, bonus content, cosmetic items) - **never** cash, airtime, or mobile data. This was a deliberate scope decision (see conversation history / product rationale) given the platform's largely-minor user base; do not add a cash-equivalent redemption path without revisiting that decision explicitly.

- Validation: `redeemItem` checks `wallet.storeCredit >= item.cost` and `!item.comingSoon` server-side (never trust the client-side balance)
- Collections: `wallets`, `wallet_transactions`, `missions`, `store_items`
- Frontend: `app/(app)/earn/page.tsx`, `components/rewards/*`, dashboard's `RewardsSection.tsx`/`MissionsCard.tsx`

## 18. Referrals (`/referrals`) - `services/referral.api.ts`

| Endpoint            | Method | Auth                   | Purpose                       |
| ------------------- | ------ | ---------------------- | ----------------------------- |
| `/referrals`        | GET    | Bearer                 | Code/link, stats, milestones  |
| `/referrals/recent` | GET    | Bearer                 | Recently referred friends     |
| `/referrals/apply`  | POST   | Public (during signup) | Apply a code, body `{ code }` |

- Collections: `referrals`, `referral_milestones`
- Frontend: `components/rewards/ReferralsTab.tsx` (inside Profile), `components/onboarding/OnboardingFlow.tsx`

---

## 19. Settings, Downloads, Premium, Help

| Service            | Endpoint           | Method | Purpose                                                    |
| ------------------ | ------------------ | ------ | ---------------------------------------------------------- |
| `settings.api.ts`  | `/settings`        | GET    | Notification/study preference flags                        |
| `settings.api.ts`  | `/settings`        | PATCH  | Update one or more flags                                   |
| `downloads.api.ts` | `/downloads`       | GET    | Offline content list + storage used                        |
| `downloads.api.ts` | `/downloads/:id`   | DELETE | Remove a downloaded item                                   |
| `premium.api.ts`   | `/premium/plans`   | GET    | Free vs Premium feature comparison                         |
| `premium.api.ts`   | `/premium/upgrade` | POST   | Upgrade - **payment processor integration TBD, not built** |
| `help.api.ts`      | `/help/faqs`       | GET    | FAQ list                                                   |
| `help.api.ts`      | `/help/contact`    | POST   | Contact support, body `{ subject, message }`               |

- Collections: `user_settings`, `downloads`, `subscriptions`, `support_tickets`
- Frontend: `app/(app)/settings/page.tsx`, `downloads/page.tsx`, `premium/page.tsx`, `help/page.tsx`

---

## 20. Notifications (`/notifications`) - `services/notification.api.ts`

_(Architecture prepared; no dedicated UI page consumes this yet.)_

| Endpoint                  | Method | Auth   | Purpose            |
| ------------------------- | ------ | ------ | ------------------ |
| `/notifications`          | GET    | Bearer | List notifications |
| `/notifications/:id/read` | POST   | Bearer | Mark one read      |
| `/notifications/read-all` | POST   | Bearer | Mark all read      |

- Collections: `notifications`

## 21. Uploads (`/uploads`) - `services/upload.api.ts`

| Endpoint                   | Method | Auth   | Purpose                                    |
| -------------------------- | ------ | ------ | ------------------------------------------ |
| `/uploads/sign`            | POST   | Bearer | Get a signed direct-to-storage upload URL  |
| `/uploads/:fileId/confirm` | POST   | Bearer | Confirm upload succeeded, persist metadata |

- Recommended: S3-compatible storage (S3/R2/Spaces) with signed PUT URLs so large files (PDFs, videos) never transit the API server
- Collections: `uploaded_files`

## 22. Search (`/search`) - `services/search.api.ts`

| Endpoint     | Method | Auth   | Purpose                                                                    |
| ------------ | ------ | ------ | -------------------------------------------------------------------------- |
| `/search?q=` | GET    | Bearer | Cross-entity search (subjects, resources today; extend to questions/decks) |

- Production: consider MongoDB Atlas Search or a dedicated index (Meilisearch/Typesense) once content volume grows past simple regex matching

## 23. AI Abstraction (`/ai`) - `services/ai.api.ts`

_(The shared layer other AI-touching endpoints route through - see the Gemma/LiteRT-LM architecture in the product docs.)_

| Endpoint          | Method           | Auth   | Purpose                                                               |
| ----------------- | ---------------- | ------ | --------------------------------------------------------------------- |
| `/ai/chat`        | POST             | Bearer | Single-shot reply                                                     |
| `/ai/chat/stream` | POST (SSE)       | Bearer | Token-streamed reply                                                  |
| `/ai/remediate`   | POST             | Bearer | Core tutoring loop: explanation + mnemonic + follow-up question       |
| `/ai/mnemonic`    | POST             | Bearer | Standalone mnemonic generation                                        |
| `/ai/vision`      | POST (multipart) | Bearer | Image/document understanding - not implemented                        |
| `/ai/documents`   | POST             | Bearer | Long-document processing for Chat with Book uploads - not implemented |

**POST /ai/remediate** - the most important endpoint in the product, functionally:

- Request matches `RemediationContext`: `{ subject, topic, questionStem, studentChosenOption, correctOption, masteryScore, readingLevelHint?, recentMistakesSameTopic? }`
- Response matches `RemediationResult`: `{ explanation, misconceptionSummary, mnemonic, followUpQuestion: { stem, options, correctIndex }, difficultyAdjustment }`
- **This is the one endpoint where "backend" may not mean a typical Express handler** - per the product architecture, inference is designed to run via Gemma 4 + LiteRT-LM either on-device (Electron/Flutter native bridge) or via a thin proxy to that runtime, not a conventional cloud LLM API call. Express's role here may just be request logging/rate-limiting/context-assembly, with the actual generation happening outside the typical request/response cycle. Flag this to whoever builds the backend early - it changes the deployment shape.

---

## 24. Admin API (`/admin/*`) - `services/admin.api.ts`

All endpoints below require `role` ∈ `{moderator, school_admin, super_admin}` unless noted; destructive actions (`deleteUser`, `deleteContent`) require `super_admin`.

| Endpoint                         | Method | Roles                         | Purpose                                               |
| -------------------------------- | ------ | ----------------------------- | ----------------------------------------------------- |
| `/admin/dashboard`               | GET    | any admin role                | Platform stats, growth trend, AI usage, system health |
| `/admin/users`                   | GET    | any admin role                | Paginated user list, `?search=&page=&pageSize=`       |
| `/admin/users/:id`               | GET    | any admin role                | Single user detail                                    |
| `/admin/users/:id`               | PATCH  | `school_admin`, `super_admin` | Edit user fields                                      |
| `/admin/users/:id/suspend`       | POST   | `moderator`+                  | Suspend account                                       |
| `/admin/users/:id/ban`           | POST   | `moderator`+                  | Ban account                                           |
| `/admin/users/:id`               | DELETE | `super_admin`                 | Permanently delete                                    |
| `/admin/content`                 | GET    | any admin role                | All content items across types                        |
| `/admin/content/:id`             | PATCH  | `school_admin`+               | Change status (publish/flag/archive)                  |
| `/admin/content/:id`             | DELETE | `super_admin`                 | Delete content                                        |
| `/admin/reports`                 | GET    | `moderator`+                  | Reports queue, `?status=`                             |
| `/admin/reports/:id`             | PATCH  | `moderator`+                  | Update report status                                  |
| `/admin/withdrawals`             | GET    | `school_admin`+               | Coin redemption requests                              |
| `/admin/withdrawals/:id/approve` | POST   | `school_admin`+               | Approve                                               |
| `/admin/withdrawals/:id/reject`  | POST   | `school_admin`+               | Reject                                                |
| `/admin/analytics`               | GET    | any admin role                | Growth + AI usage aggregates                          |
| `/admin/feature-flags`           | GET    | `super_admin`                 | List flags                                            |
| `/admin/feature-flags/:id`       | PATCH  | `super_admin`                 | Toggle/adjust rollout                                 |
| `/admin/roles`                   | GET    | `super_admin`                 | Role → permission map                                 |
| `/admin/audit-logs`              | GET    | `super_admin`                 | Admin action history                                  |
| `/admin/system-health`           | GET    | any admin role                | Service status/latency/uptime                         |

- Collections: all of the above, plus `audit_logs` (every admin mutation should write an entry here - see middleware in the technical docs)
- Frontend: `app/(admin)/admin/**` (all pages), `components/admin/*`

---

## Appendix: MongoDB collections referenced across this contract

`users`, `wallets`, `wallet_transactions`, `missions`, `store_items`, `referrals`, `referral_milestones`, `subjects`, `topics`, `questions`, `options`, `resources`, `user_bookmarks`, `chat_sources`, `chat_messages`, `flashcard_decks`, `flashcards`, `flashcard_reviews`, `study_plans`, `exam_dates`, `exam_configs`, `exam_attempts`, `attempts`, `mistakes`, `mastery`, `achievements`, `user_achievements`, `streaks`, `activity_log`, `user_settings`, `downloads`, `subscriptions`, `support_tickets`, `notifications`, `uploaded_files`, `reports`, `audit_logs`, `feature_flags`, `role_permissions`, `system_health_snapshots`.

See `TECHNICAL_DOCUMENTATION.md` for the corresponding Mongoose schema sketches and suggested Express route file structure.
