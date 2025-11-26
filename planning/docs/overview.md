# 📘 Project Overview – Multi-Client Media & Content Management Portal (MCMP)

## 1. Vision

The **MCMP Portal** is a full-scale, multi-tenant content management and publishing system designed for marketing agencies, media teams, and organizations managing *multiple clients or brands* from a single unified dashboard.

**Think:**  
A tailored hybrid of Hootsuite, Buffer, and a brand asset hub — built with client-specific workflows, approvals, and analytics.

The goal is to provide **centralized management** of:

- Social media content  
- Website posts  
- Campaign planning  
- Asset libraries  
- Scheduling  
- Platform integrations  
- Analytics  

…for **multiple clients**, each isolated and secure under a multi-tenant architecture.

---

## 2. Core Objectives

### 🎯 Consolidate content for all clients  
Draft, edit, schedule, approve, and monitor content across multiple platforms.

### 🚀 Streamline publishing  
Publish simultaneously to connected social and web platforms per client.

### 👥 Facilitate client approvals  
Client users receive posts to approve/reject with comments.

### 📊 Provide analytics  
Track performance across platforms, campaigns, and date ranges.

### 🔐 Enforce secure multi-tenancy  
Users only see the clients and data they're assigned to, with role-based permissions.

---

## 3. Primary Users & Roles

### 🏢 Internal (Agency / Media Team)

#### **Admin**
- Manages all tenants (clients)
- Manages user roles and platform integrations
- Configures global settings

#### **Content Manager**
- Creates content
- Manages calendar view
- Oversees publishing
- Reviews analytics

#### **Content Creator**
- Drafts posts
- Uploads assets
- Works under campaigns

---

### 👤 Client-Side Users

#### **Client Owner**
- Approves or rejects posts  
- Views the content calendar  
- Accesses brand analytics  

#### **Client Viewer**
- Read-only access  
- Views approvals, calendar, and reports  

---

## 4. Core Features (Modules)

### 4.1 🧩 Client & Tenant Management
Each client is a separate tenant containing:
- Name, logo, colors, brand settings
- Timezone, posting rules
- Administrative users
- Hashtag banks & reusable CTAs

---

### 4.2 🔌 Integrations & Account Connections
Per-client authentication and token storage for:
- Facebook / Instagram (Meta Graph API)
- LinkedIn
- X / Twitter
- Google Business
- YouTube (future)
- Website CMS (WordPress, Webflow, custom)

All tokens stored securely with refresh logic.

---

### 4.3 ✍️ Content Composer
A powerful post editor allowing:
- Multi-platform publishing
- Rich text body
- Media attachments
- Platform-specific formatting
- Draft > Pending Approval > Approved > Scheduled > Published
- Auto-checks for image ratios, text length, hashtag rules

---

### 4.4 📁 Content Library & Campaigns
Organize posts into:
- Campaigns
- Categories
- Tags

Filter the library by:
- Client
- Status
- Platform
- Campaign
- Date

---

### 4.5 📅 Scheduling & Calendar
Interactive calendar (month/week/day) showing:
- Scheduled posts
- Pending approvals
- Platform colors
- Drag-and-drop rescheduling

Time-zone aware per client.

---

### 4.6 ✔ Approval Workflow
Lifecycle:
- Draft  
- Submitted for approval  
- Approved / Changes Requested  
- Scheduled  
- Published  

Clients get:
- Notification when posts need review  
- Ability to approve/reject/comment  

---

### 4.7 🚀 Publishing Engine
Background worker (BullMQ) checks for scheduled posts, handles:
- Publishing to all connected platforms via APIs
- Error handling (rate limits, invalid tokens)
- Retry logic
- Auto-update status to "Published"
- Storing platform post IDs

---

### 4.8 📊 Analytics & Reporting
Types of analytics:
- Impressions  
- Clicks  
- Likes  
- Shares  
- Comments  

Analytics aggregated:
- Per post
- Per platform
- Per campaign
- Per client

Exports:
- CSV
- PDF (future)

---

### 4.9 🗂 Brand Asset Library
Each tenant has an organized library:
- Logos  
- Graphics  
- Videos  
- Templates  

Features:
- Folder organization  
- Tags  
- Quick insert into posts  

---

## 5. Architecture Overview

### 5.1 🌐 Frontend
Built with:
- **Next.js 14 (App Router)**
- **TypeScript**
- **Tailwind CSS**
- **shadcn/ui**
- **Zustand** for client-side stores

Key pages include:
- `/dashboard`
- `/clients`
- `/clients/[id]/calendar`
- `/posts`
- `/campaigns`
- `/settings`

---

### 5.2 ⚙️ Backend (API)
Backend runs on:
- **NestJS**
- **Mongoose (MongoDB)**
- **Passport.js** for OAuth (Google, Microsoft 365, Facebook)
- **JWT** for session authentication

Modules:
- Auth
- Users
- Clients
- Campaigns
- Posts
- Integrations
- Analytics

---

### 5.3 🔁 Worker Service
Handles background jobs:
- Post publishing  
- Analytics polling  
- Token refresh  
- Retries  

Powered by:
- **BullMQ**
- **Redis**

---

### 5.4 🔐 Multi-Tenancy Strategy

Every document includes a `tenantId` (clientId).  
Queries always scoped to the current user’s assigned tenants.

Admins have global (multi-tenant) access; creators/managers have scoped client access.

---

## 6. High-Level Data Model

### **Client**
- `id`
- `name`
- `slug`
- `brandSettings`
- `timezone`
- `defaultPostingWindows`

### **User**
- `id`
- `email`
- `password`
- `role`
- `tenants []`

### **IntegrationAccount**
- `clientId`
- `platform`
- `accessToken`
- `refreshToken`
- `expiresAt`

### **Campaign**
- `clientId`
- `name`
- `description`
- `startDate`
- `endDate`

### **Post**
- `clientId`
- `campaignId?`
- `title`
- `body`
- `assets`
- `platforms`
- `status`
- `scheduleTime`

### **AnalyticsRecord**
- `postId`
- `metrics`
- `platform`
- `fetchedAt`

---

## 7. MVP Scope

To deliver fast, the MVP includes:

- Multi-tenant infrastructure  
- Auth + roles  
- Client management  
- Basic post creation  
- Calendar view  
- OAuth for Facebook/Google/Microsoft  
- Approval workflow  
- Simple scheduler  
- Basic analytics (single platform)  

---

## 8. Future Enhancements

- AI content suggestions  
- Auto hashtag recommendations  
- Cross-posting templates  
- Multi-image/multi-video tools  
- Client invoicing (optional)  
- Team chat / comments  
- White-labeled client portals  
- Advanced analytics dashboards  
- Community management tools (responding to comments, inbox)  

---

## 9. Summary

The MCMP Platform is an **enterprise-level**, fully modular, multi-tenant system designed to manage every step of the content lifecycle for multiple clients.

It is built for real-world media agencies needing:
- Organized workflows  
- Reliable scheduling  
- Client approvals  
- Analytics  
- Scalable, secure architecture  

This system provides an end-to-end hub for managing content across platforms and teams, all inside a modern, scalable monorepo.

