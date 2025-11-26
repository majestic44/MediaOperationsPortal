# 📁 MCMP Portal – Full Monorepo Folder Structure
This document outlines the **entire project directory structure** for the MCMP (Multi-Client Media Portal) enterprise monorepo using:

- Turborepo  
- Next.js 14 (App Router)  
- NestJS + Mongoose  
- BullMQ Worker  
- Shared Packages  

---

# 🏗 Root Structure

mcmp/
│
├── apps/
│ ├── web/ # Next.js 14 frontend (App Router + shadcn/ui)
│ ├── api/ # NestJS backend (Auth, Clients, Posts, Campaigns, etc.)
│ └── worker/ # BullMQ worker service (publish + analytics jobs)
│
├── packages/
│ ├── types/ # Shared TypeScript types/interfaces
│ ├── utils/ # Shared utilities (apiClient, logging, dates)
│ ├── config/ # Shared env + config loaders
│ └── ui/ # Shared UI components (AppShell, layouts, etc.)
│
├── planning/
│ └── docs/ # Project documentation (overview, roadmap, timeline, etc.)
│
├── node_modules/
│
├── package.json # Monorepo workspace root
├── turbo.json # Turborepo pipeline configuration
├── tsconfig.json # Root TypeScript config
├── tsconfig.base.json
├── .gitignore
└── README.md


---

# 🖥 apps/web (Next.js Frontend)

apps/web/
│
├── app/
│ ├── layout.tsx
│ ├── page.tsx
│ │
│ ├── login/
│ │ └── page.tsx
│ │
│ ├── dashboard/
│ │ └── page.tsx
│ │
│ ├── clients/
│ │ ├── page.tsx
│ │ └── [id]/page.tsx
│ │
│ ├── posts/
│ │ ├── page.tsx
│ │ └── [id]/page.tsx
│ │
│ ├── calendar/
│ │ └── page.tsx
│ │
│ └── settings/
│ └── page.tsx
│
├── components/
│ ├── layout/
│ │ ├── Sidebar.tsx
│ │ ├── Header.tsx
│ │ └── ThemeToggle.tsx
│ │
│ ├── ui/
│ └── forms/
│
├── lib/
│ ├── api.ts
│ ├── auth.ts
│ └── store.ts
│
├── public/
├── styles/
├── tailwind.config.js
├── postcss.config.js
├── next.config.js
└── README.md


---

# 🔌 apps/api (NestJS Backend)

apps/api/
│
├── src/
│ ├── main.ts
│ ├── app.module.ts
│ │
│ ├── auth/
│ │ ├── auth.module.ts
│ │ ├── auth.controller.ts
│ │ ├── auth.service.ts
│ │ └── strategies/
│ │ ├── local.strategy.ts
│ │ ├── jwt.strategy.ts
│ │ ├── google.strategy.ts
│ │ ├── microsoft.strategy.ts
│ │ └── facebook.strategy.ts
│ │
│ ├── users/
│ │ ├── users.module.ts
│ │ ├── users.controller.ts
│ │ ├── users.service.ts
│ │ └── schemas/user.schema.ts
│ │
│ ├── clients/
│ │ ├── clients.module.ts
│ │ ├── clients.controller.ts
│ │ ├── clients.service.ts
│ │ └── schemas/client.schema.ts
│ │
│ ├── posts/
│ │ ├── posts.module.ts
│ │ ├── posts.controller.ts
│ │ ├── posts.service.ts
│ │ └── schemas/post.schema.ts
│ │
│ ├── campaigns/
│ │ ├── campaigns.module.ts
│ │ ├── campaigns.controller.ts
│ │ ├── campaigns.service.ts
│ │ └── schemas/campaign.schema.ts
│ │
│ ├── integrations/
│ │ ├── integrations.module.ts
│ │ ├── integrations.controller.ts
│ │ ├── integrations.service.ts
│ │ └── schemas/integration.schema.ts
│ │
│ ├── analytics/
│ │ ├── analytics.module.ts
│ │ ├── analytics.controller.ts
│ │ ├── analytics.service.ts
│ │ └── schemas/analytics.schema.ts
│ │
│ ├── common/
│ │ ├── guards/jwt-auth.guard.ts
│ │ ├── decorators/user.decorator.ts
│ │ ├── pipes/validation.pipe.ts
│ │ └── exceptions/
│ │
│ └── utils/
│
├── .env.example
├── nest-cli.json
└── tsconfig.json


---

# ⚙️ apps/worker (BullMQ Worker)

apps/worker/
│
├── src/
│ ├── main.js
│ ├── queues/
│ │ ├── publish.queue.js
│ │ └── analytics.queue.js
│ │
│ ├── workers/
│ │ ├── publish.worker.js
│ │ └── analytics.worker.js
│ │
│ └── utils/
│ └── redis.js
│
├── package.json
└── .env.example


---

# 📦 packages (Shared Libraries)

packages/
│
├── types/
│ ├── src/index.ts
│ └── package.json
│
├── utils/
│ ├── src/logger.ts
│ ├── src/time.ts
│ ├── src/apiClient.ts
│ └── package.json
│
├── config/
│ ├── src/index.ts
│ └── package.json
│
└── ui/
├── src/layout/AppShell.tsx
└── package.json


---

# 🗂 planning/docs

planning/docs/
│
├── overview.md
├── roadmap.md
├── folder-structure.md
├── api-routes.md
├── schemas.md
├── wireframes.md
└── timeline.md


---

# 🧪 tests (optional)

tests/
│
├── api/
└── web/


---

# ✔ Final Notes

- This monorepo structure is built for **scalable SaaS**.
- Supports independent deploys for Web, API, and Worker.
- Shared packages avoid duplication.
- NestJS modules allow clean vertical slicing of features.
- Next.js App Router cleanly separates UI sections.

