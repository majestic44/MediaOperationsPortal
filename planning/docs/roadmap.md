# 🗺️ MCMP Portal – Structured Feature Roadmap

This roadmap outlines the development plan for the **Multi-Client Media & Content Management Portal (MCMP)** across phases.  
It is divided into logical delivery chunks that allow incremental deployment, testing, and onboarding.

---

# 📆 Phase 0 — Foundations (Completed in Monorepo Setup)

### ✅ Goals
- Initialize Turborepo monorepo
- Create directories: apps/web, apps/api, apps/worker, packages/*
- Establish TypeScript configs & workspace tooling
- Install Next.js, NestJS, Worker dependencies
- Set up shared packages: types, utils, config, ui
- Prepare planning documentation

---

# 🚀 Phase 1 — Multi-Tenant Core + Auth System

### 🔐 Authentication (Hybrid)
- Email + password (JWT)
- OAuth:
  - Google Workspace
  - Microsoft 365
  - Facebook
- Token refresh + secure storage
- Protect all API routes with JWT guard

### 🧩 Multi-Tenancy Framework
- User-to-tenant assignments
- Tenant scoping middleware
- Role-based access control (RBAC):
  - **admin**
  - **manager**
  - **creator**
  - **clientOwner**
  - **clientViewer**

### 🧱 Data Models Implemented
- User
- Tenant (Client)

### 🌐 Frontend
- Login screen (email + OAuth)
- Tenant selector (if user has >1 client)

---

# 🏢 Phase 2 — Client/Tenant Management

### ✨ Features
- Create/update/delete clients (tenants)
- Set branding:
  - Logo
  - Color palette
  - Fonts
- Set timezone
- Add brand guidelines
- Hashtag banks
- Call-to-action templates

### 🧩 Data Models
- Client/Tenant schema
- BrandSettings subdocument

### 💻 Frontend
- Clients list
- Client details page
- Branding editor UI

---

# 📝 Phase 3 — Content Composer + Library

### ✍️ Post Composer
- Rich text editor
- Dynamic fields per platform
- Image/video upload
- Hashtag suggestions
- Character counters
- Link previews

### 🗂 Content Library
- Search & filtering by:
  - Status
  - Campaign
  - Platform
  - Creator
  - Date range

### 📁 Campaigns
- Create/update/delete campaigns
- Associate posts with campaigns

### 🚦 Post States
- draft  
- pending_approval  
- approved  
- scheduled  
- published  
- failed  

### Frontend pages
- /posts
- /posts/[postId]
- /campaigns

---

# 📅 Phase 4 — Scheduling & Calendar

### 🗓 Calendar View
- Month / week / day view
- Color-coded by platform
- Drag-and-drop rescheduling
- Status icons for draft/approved/published

### 🕒 Timezone handling
- Client-specific timezone
- Automatic conversion

### 🔄 Status Routing
- draft → pending approval → approved → scheduled → published

### Backend
- Save schedule times
- Validate time windows
- Ensure no overlapping rules (optional)

---

# ✔ Phase 5 — Approval Workflow

### Client-Side Approval Portal
- Approve/reject posts
- Add comments or change requests
- View upcoming content calendar

### Notifications
- Email notifications:
  - New posts ready for approval
  - Approved posts
  - Rejected posts

### Backend
- Role checks
- Approval audit log

### UI elements
- Approval dialog
- Comment modal
- Client-facing dashboard

---

# 🚀 Phase 6 — Publishing Engine (Worker Service)

### Background Worker (BullMQ)
- Poll for due posts
- Publish to:
  - Facebook Page
  - Instagram
  - LinkedIn
  - Google Business
  - Website CMS
- Store platform post IDs
- Error handling
- Retry logic
- Logging system

### Posting API Integrations
- Meta Graph API (FB/IG)
- LinkedIn API
- Google Business Profile API
- Custom website API connector

---

# 📊 Phase 7 — Analytics & Reporting

### Data collection
- Impressions
- Clicks
- Likes
- Comments
- Shares
- Reach (where supported)

### Views
- Per-post metrics
- Per-campaign summaries
- Client-wide analytics dashboard
- Platform comparisons

### Exports
- CSV
- PDF (future enhancement)

### Worker
- Scheduled analytics refresh jobs

---

# 🎨 Phase 8 — Brand Asset Library

### Features
- Upload images/videos
- Folder structure
- Tagging
- Search
- Quick-attach to post editor

### Storage Options
- AWS S3
- Cloudflare R2
- (Local dev uses disk storage)

---

# 🎛️ Phase 9 — Advanced Features (Post-MVP)

### AI-Assisted Tools
- Caption generation
- Hashtag options
- Image alt text suggestions

### Repeatable Templates
- Weekly post templates
- Seasonal campaigns

### Collaboration Tools
- Team comments on posts
- Mention system
- Activity log

### White Labeling
- Custom domains per client
- Custom theme per client

### Inbox Hub (Future)
- Respond to comments/messages across platforms

---

# 🚢 Deployment Roadmap

### Phase A — Development
- Local dev with Docker (Mongo + Redis)
- Hot reload for web/api/worker

### Phase B — Test Environment
- Connected to test social accounts
- QA client user flow

### Phase C — Production
- Deploy:
  - Web → Vercel or container hosting
  - API → Railway/Fly.io/AWS
  - Worker → Railway/Fly.io
  - Database → MongoDB Atlas
  - Redis → Upstash/Redis Cloud
- CI/CD with GitHub Actions

---

# 🏁 Final Goal

The final system provides:

- Complete multi-tenant content lifecycle  
- Approval workflows  
- Robust publishing engine  
- Analytics dashboards  
- Asset library  
- Modern responsive UI  
- Enterprise-grade backend  

This roadmap guides the system from MVP → full SaaS maturity.

