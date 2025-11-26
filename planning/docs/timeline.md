# ⏱ MCMP Portal – Development Timeline (Gantt-Style Overview)

This timeline assumes a **single primary developer** working roughly **full-time**.  
Adjust durations as needed for your actual pace or team size.

> ✅ = Major milestone / deployable checkpoint

---

## 🗂 Phase Summary

| Phase | Name                               | Duration (Est.) | Milestone |
|------:|------------------------------------|-----------------|-----------|
| 0     | Foundations & Monorepo             | 3–5 days        | ✅        |
| 1     | Auth + Multi-Tenancy               | 5–7 days        | ✅        |
| 2     | Client (Tenant) Management         | 3–5 days        | ✅        |
| 3     | Content Composer + Library         | 7–10 days       | ✅        |
| 4     | Scheduling & Calendar              | 5–7 days        | ✅        |
| 5     | Approval Workflow                  | 4–6 days        | ✅        |
| 6     | Publishing Engine (Worker)         | 7–10 days       | ✅        |
| 7     | Analytics & Reporting              | 7–10 days       | ✅        |
| 8     | Brand Asset Library                | 4–6 days        | ✅        |
| 9     | Polish, QA, Deployment Hardening   | 7–10 days       | ✅        |

Rough total: **~7–10 weeks**, depending on depth and integrations.

---

## 📅 High-Level Timeline (Week by Week)

You can think in **sprints** (1-week sprints here as an example).

### 🟦 Week 1 — Foundations (Phase 0)

**Goals:**
- Initialize Turborepo monorepo
- Set up:
  - `apps/web` (Next.js)
  - `apps/api` (NestJS)
  - `apps/worker` (Node + BullMQ)
  - `packages/types`, `packages/utils`, `packages/config`, `packages/ui`
- Configure:
  - `tsconfig.base.json`
  - `turbo.json`
  - Root `package.json` with workspaces
- Install core dependencies:
  - Next.js, React, Tailwind, shadcn/ui
  - NestJS, Mongoose, Passport, JWT
  - BullMQ, Redis client
- Bootstrap basic “it runs” dev environment:
  - `npm run dev` → web + api + worker all start

**Milestone:**
- ✅ **Monorepo builds & runs in dev**

---

### 🟦 Week 2 — Auth + Multi-Tenancy (Phase 1)

**Backend:**
- Add `User` schema + `UsersModule`
- Implement AuthModule:
  - Local (email/password) strategy
  - JWT strategy
  - OAuth strategies:
    - Google
    - Microsoft 365
    - Facebook
- Implement `auth/login`, `auth/me`, OAuth callbacks
- Set up `JwtAuthGuard` and role-based decorators

**Frontend:**
- Build `/login` page:
  - Email/password form
  - “Login with Google/Microsoft/Facebook” buttons
- Basic handling of JWT (store in memory or httpOnly cookie)
- Redirect to `/dashboard` on successful auth

**Multi-tenancy:**
- Add `tenantIds` to `User`
- Add tenant resolution middleware on backend
- Add simple tenant switcher in frontend if user has more than one

**Milestone:**
- ✅ **Users can log in, switch tenants, and hit protected APIs**

---

### 🟦 Week 3 — Client/Tenant Management (Phase 2)

**Backend:**
- Implement `Client` schema + `ClientsModule`
- CRUD routes:
  - `GET /clients`
  - `GET /clients/:id`
  - `POST /clients`
  - `PUT /clients/:id`
- Brand settings fields: logo, colors, fonts, guidelines, hashtags, CTA templates

**Frontend:**
- `/clients` list page
- `/clients/[id]` details page:
  - Branding controls
  - Hashtag bank editor
  - CTA template list

**Milestone:**
- ✅ **Admins can create and manage tenants with basic brand settings**

---

### 🟦 Weeks 4–5 — Content Composer + Library (Phase 3)

**Backend:**
- `Campaign` schema + module
- `Post` schema + module
  - Fields: title, body, status, platforms, scheduleTime, assetUrls, campaignId
- Routes:
  - CRUD for campaigns
  - CRUD for posts
  - Filtering (status, campaign, platform, date range)

**Frontend:**
- `/campaigns` page:
  - List, create, edit campaigns
- `/posts` page:
  - Table/list of posts
  - Filters
- `/posts/[id]` page:
  - Post editor (rich text / basic editor)
  - Select platforms
  - Pick campaign
  - Attach media (stub for now)
  - Choose schedule time

**Milestone:**
- ✅ **You can create, edit, and organize posts and campaigns per client**

---

### 🟦 Week 6 — Scheduling & Calendar (Phase 4)

**Backend:**
- Ensure `scheduleTime` and `status` transitions are validated
- Add calendar endpoint:
  - `GET /clients/:clientId/calendar?from=...&to=...`
- Returns posts with schedule times and platforms

**Frontend:**
- `/calendar` page:
  - Month/Week view
  - Basic calendar UI (can be library or custom)
  - Color-coded by platform or status
  - Drag-and-drop to change schedule (optional at first: click-to-edit time is enough)

**Timezone:**
- Respect client timezone for display and scheduling

**Milestone:**
- ✅ **Content calendar shows scheduled posts per client**

---

### 🟦 Week 7 — Approval Workflow (Phase 5)

**Backend:**
- Add workflow endpoints:
  - `POST /clients/:clientId/posts/:postId/submit`
  - `POST /clients/:clientId/posts/:postId/approve`
  - `POST /clients/:clientId/posts/:postId/reject`
- Enforce role rules:
  - Only `clientOwner` / `clientViewer` with permissions can approve/reject
- Track `statusHistory` for posts

**Frontend:**
- Client-facing view (could be same UI with different role-based visibility):
  - “Needs Approval” list
  - Approve / Reject buttons
  - Comment modal for rejection
- Visual indicators in calendar and post list:
  - Pending approval badges
  - Approved vs draft vs scheduled

**Notifications (basic):**
- For MVP: just show in-app indicators
- Future: wire email notifications

**Milestone:**
- ✅ **Clients can approve or reject posts; workflow is visible in UI**

---

### 🟦 Weeks 8–9 — Publishing Engine (Phase 6)

**Worker (apps/worker):**
- Implement `publish` queue + processors:
  - Pull due posts (`status = 'approved' | 'scheduled'` and `scheduleTime <= now`)
  - For each platform integration:
    - Call respective platform API
    - Handle success: store `platformPostIds`, set `publishedAt`
    - Handle error: set `status = 'failed'`, capture `lastError`

**Backend:**
- Internal endpoints:
  - `/internal/jobs/publish` (optional)
- Exposure of publish status in `PostsController`

**Integrations:**
- Implement initial integration for **one platform first** (e.g. Facebook Page via Meta Graph API) as a proof of concept
- Introduce abstraction layer for other platforms

**Milestone:**
- ✅ **System can automatically publish scheduled posts to at least one real platform**

---

### 🟦 Weeks 10–11 — Analytics & Reporting (Phase 7)

**Backend:**
- `AnalyticsRecord` schema + module
- Worker:
  - `analytics` queue
  - Poll APIs for metrics (for published posts)
  - Write `AnalyticsRecord` documents
- API endpoints:
  - `GET /clients/:clientId/analytics`
  - `GET /clients/:clientId/campaigns/:campaignId/analytics`
  - `GET /clients/:clientId/posts/:postId/analytics`

**Frontend:**
- Client-level analytics dashboard:
  - Trend charts (by day/week)
  - Top-performing posts
- Campaign analytics:
  - Summary cards (impressions, clicks, engagement)
- Post analytics tab:
  - Show metrics for each platform

**Milestone:**
- ✅ **Users can see analytics for posts, campaigns, and clients**

---

### 🟦 Week 12 — Brand Asset Library (Phase 8)

**Backend:**
- `Asset` schema + module
- Upload endpoint (MVP: local disk; future: S3/R2)
- Link from `Post` assets to `Asset` docs

**Frontend:**
- `/assets` page:
  - Grid/list view
  - Filters (type, tags)
- Asset picker dialog in Post editor:
  - Select from uploaded images/videos

**Milestone:**
- ✅ **Brand assets can be uploaded, browsed, and attached to posts**

---

### 🟦 Week 13+ — Polish, QA, and Deployment (Phase 9)

**Tasks:**
- Full QA cycle:
  - Test flows per role
  - Test multi-tenant separation
  - Test OAuth logins
  - Test worker behavior
- Error handling & UX polish:
  - Toasts, validation messages
  - Empty states, loading spinners
- Documentation:
  - Setup guides
  - API docs
  - Admin usage notes
- Deployment:
  - Web app (Vercel or container)
  - API (Railway/Fly.io/AWS)
  - Worker (same as API or separate)
  - MongoDB (Atlas)
  - Redis (Upstash/Redis Cloud)

**Milestone:**
- ✅ **Production-ready release of MCMP MVP v1.0**

---

## 🎯 Priority-Based Cut Lines

If you need to ship **earlier**, you can cut at:

- **Cut Line 1 (Early MVP):** Up to Phase 4  
  - Multi-tenancy  
  - Auth  
  - Clients  
  - Posts  
  - Calendar (no publishing, manual handling)

- **Cut Line 2 (Strong MVP):** Up to Phase 6  
  - Full workflow + automated publishing for at least one platform

- **Full v1.0:** All phases through analytics + asset library.

---

## ✅ Summary

This timeline gives you:

- A **sprint-by-sprint plan**  
- Clear **milestones** for demo readiness  
- Logical cut points for early releases  
- A structure that matches your current monorepo and planning docs

You can tweak weeks and durations based on how deep you want to go into integrations, UI polish, and analytics sophistication.
