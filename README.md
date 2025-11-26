# 🌐 MC-MOP — Multi-Client Media Platform  
### Centralized Content Creation, Scheduling, Publishing & Analytics for Agencies  
**⚠ Proprietary Software — Licensing Required (Not Open Source)**

![Status](https://img.shields.io/badge/status-in%20development-blue)
![Node](https://img.shields.io/badge/node-18+-green)
![Next.js](https://img.shields.io/badge/Next.js-14-black)
![NestJS](https://img.shields.io/badge/NestJS-Framework-red)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-green)

---

## 📘 Overview

The **MCMP (Multi-Client Media Platform)** is a private, agency-focused content management and publishing system designed to streamline:

- Multi-client content creation  
- Scheduling across multiple social platforms  
- Automated publishing  
- Client approval workflows  
- Analytics and reporting  
- Brand asset management  

This repository exists for **planning, documentation, internal development, and code organization only**.

**It is NOT an open-source project. Redistribution, deployment, or modification without a valid license is prohibited.**

---

## 🔒 Licensing & Usage Restrictions

This platform is **fully proprietary**.

You **may not**:

- Redistribute this software  
- Self-host this software without authorization  
- Use this code commercially without a license  
- Modify it for external use  
- Incorporate it into another public/private SaaS  

You **may**:

- Use it internally as part of your licensed organization  
- Modify it internally for agency-approved workflows  

For commercial usage or licensing rights:  
📧 **[Insert your preferred contact email]**

---

## 🚀 Features

### 🧩 Multi-Tenant Client Architecture  
**Docs:** [Overview → Roles & Objectives](./planning/docs/overview.md)  

- Manage unlimited clients (tenants) from one account  
- Isolated data and permissions per client  
- Agency users may switch between clients  
- Client-side users only see the brand assigned to them  
- Time zone, brand settings, hashtag banks, and guidelines stored per client  

---

### 📝 Content Creation & Campaign Management  
**Docs:** [Wireframes → Post Editor](./planning/docs/wireframes.md) • [Schemas → Post Model](./planning/docs/schemas.md)  

- Rich-text post editor with media attachments  
- Platform-specific rules (character limits, aspect ratios, warnings)  
- Save as **Draft**, request **Approval**, or schedule directly  
- Campaign grouping for organized content strategies  
- Content library with filtering by platform, status, date, campaign  

---

### 🗂 Brand Asset Library  
**Docs:** [Schemas → Asset Model](./planning/docs/schemas.md) • [Wireframes → Asset Library](./planning/docs/wireframes.md)  

- Dedicated asset storage per client  
- Upload and organize images, videos, documents  
- Tagging + folder organization  
- “Attach to Post” integration in the Post Editor  
- File preview and metadata panel  

---

### 📅 Visual Content Calendar  
**Docs:** [Wireframes → Calendar View](./planning/docs/wireframes.md)  

- Month and Week views  
- Color coding by:
  - Status (Draft, Pending, Approved, Scheduled, Published)  
  - Platform (FB, IG, LinkedIn, Website)  
- Calendar items show post title + platforms  
- Click to open post details  
- Drag-and-drop (advanced phase)  
- Fully time-zone aware per tenant  

---

### ✔ Client Approval Workflow  
**Docs:** [Roadmap → Workflow Phase](./planning/docs/roadmap.md) • [Wireframes → Approvals](./planning/docs/wireframes.md)  

- Drafts submitted to clients for review  
- Client users receive list of pending posts  
- Review screen includes:  
  - Post preview  
  - Scheduled date/time  
  - Platforms  
  - Previous versions/comments  
- Clients may:  
  - **Approve**  
  - **Reject with Comment**  
  - **Request edits**  
- Complete approval history stored per post  

---

### 🚀 Automated Publishing Engine  
**Docs:** [API Routes → Publishing](./planning/docs/api-routes.md) • [Timeline → Phase 6](./planning/docs/timeline.md)

- Worker service (BullMQ + Redis) detects upcoming scheduled posts  
- Posts published to connected platforms automatically  
- Current & future integrations:  
  - Facebook Page (Meta API)  
  - Instagram (Meta API)  
  - Google Business Profile  
  - LinkedIn  
  - Website (CMS API)  
- Retry logic + error capture  
- Stores platform post IDs + publish timestamps  

---

### 🔗 Platform Integrations  
**Docs:** [Overview → Integrations Section](./planning/docs/overview.md)  

- Per-client OAuth connection for each platform  
- Token refresh management  
- Integration health status (Connected / Expired / Error)  
- Supports multiple integrations per client  

---

### 📊 Analytics & Performance Tracking  
**Docs:** [Wireframes → Analytics Dashboard](./planning/docs/wireframes.md) • [Schemas → Analytics Model](./planning/docs/schemas.md)  

- Per-post insights: impressions, clicks, likes, comments, shares  
- Campaign performance summaries  
- Client-wide engagement trends  
- Visual charts (line, bar, donut)  
- Analytics polling done via Worker  
- Export reports (PDF/CSV – future phase)  

---

### 🔐 Role-Based Access Control  
**Docs:** [Overview → Roles](./planning/docs/overview.md)  

Roles include:

- **Agency Admin** — full access to all clients  
- **Content Manager** — campaigns, posts, assets  
- **Content Creator** — drafts only  
- **Client Owner** — approvals, analytics  
- **Client Viewer** — read-only  

All API calls automatically scoped by **tenantId** and **role permissions**.

---

### ⚙ Complete REST API  
**Docs:** [API Routes Index](./planning/docs/api-routes.md)  

- Fully structured per-tenant API  
- CRUD operations for:
  - Clients  
  - Posts  
  - Campaigns  
  - Assets  
  - Approvals  
  - Schedules  
  - Integrations  
  - Analytics  
- Authentication via JWT  
- OAuth via NextAuth for web login  

---

### 📑 End-to-End Planning System  
**Docs:**  
- [Roadmap](./planning/docs/roadmap.md)  
- [Folder Structure](./planning/docs/folder-structure.md)  
- [Timeline](./planning/docs/timeline.md)  
- [Wireframes](./planning/docs/wireframes.md)  

Everything is fully planned out for a complete SaaS-grade platform.

---

## 📄 Additional Project Documentation

### 🤝 Contributing  
For internal developers, contribution guidelines, branch rules, and commit conventions are documented here:  
➡ **[CONTRIBUTING.md](./CONTRIBUTING.md)**

### 🔐 Security Policy  
For reporting vulnerabilities or security concerns, please review:  
➡ **[SECURITY.md](./SECURITY.md)**
