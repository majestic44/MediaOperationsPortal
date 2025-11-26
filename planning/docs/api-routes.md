# 🛠 API Route Layout – MCMP Portal

Base URL (local dev):

- **Backend API:** `http://localhost:3001`
- All routes below are **relative to** `/` (e.g. `/auth/login` → `http://localhost:3001/auth/login`)

---

## 🔐 Auth Routes

### `POST /auth/register`
Create a new user with email/password.

- **Body:**
  - `email: string`
  - `password: string`
  - `name: string`

---

### `POST /auth/login`
Login using email/password and receive a JWT access token.

- **Body:**
  - `email: string`
  - `password: string`
- **Response:**
  - `access_token: string`

---

### `GET /auth/me`
Get the current authenticated user.

- **Headers:**
  - `Authorization: Bearer <token>`

---

### OAuth – Google

#### `GET /auth/google`
Redirect to Google OAuth.

#### `GET /auth/google/callback`
Google OAuth callback → returns or redirects with JWT.

---

### OAuth – Microsoft

#### `GET /auth/microsoft`
Redirect to Microsoft OAuth.

#### `GET /auth/microsoft/callback`
Microsoft OAuth callback → returns or redirects with JWT.

---

### OAuth – Facebook

#### `GET /auth/facebook`
Redirect to Facebook OAuth.

#### `GET /auth/facebook/callback`
Facebook OAuth callback → returns or redirects with JWT.

---

## 👤 User Routes

> Most of these are **admin / internal** only.

### `GET /users`
List users (optionally filter by tenant).

- **Query:**
  - `tenantId?: string`

---

### `GET /users/:id`
Get a single user by ID.

---

### `POST /users`
Create a new user (admin-created).

- **Body:**
  - `email: string`
  - `name: string`
  - `role: "admin" | "manager" | "creator" | "clientOwner" | "clientViewer"`
  - `tenants: string[]` (tenant IDs)

---

### `PUT /users/:id`
Update user (role, tenants, etc.).

---

### `DELETE /users/:id`
Soft delete / disable a user.

---

## 🧩 Client / Tenant Routes

### `GET /clients`
List all clients (tenants) the current user can access.

---

### `GET /clients/:id`
Get detail for a specific client.

---

### `POST /clients`
Create a new client/tenant.

- **Body:**
  - `name: string`
  - `slug?: string`
  - `timezone?: string`
  - `brandSettings?: { logoUrl?: string; colors?: string[]; fonts?: string[] }`

---

### `PUT /clients/:id`
Update client details & brand settings.

---

### `DELETE /clients/:id`
Archive / delete a client (usually soft delete).

---

## 🔌 Integration Routes

Manages each client’s platform connections (Facebook, Instagram, LinkedIn, etc).

### `GET /clients/:clientId/integrations`
List integration accounts for a client.

---

### `POST /clients/:clientId/integrations/:platform/connect`
Start an OAuth/connect flow for a platform.

- `platform` examples:
  - `facebook`
  - `instagram`
  - `linkedin`
  - `google-business`
  - `website`

*(Exact implementation may rely on separate OAuth URLs.)*

---

### `DELETE /clients/:clientId/integrations/:integrationId`
Disconnect a specific integration.

---

## 🎯 Campaign Routes

### `GET /clients/:clientId/campaigns`
List campaigns for a client.

---

### `GET /clients/:clientId/campaigns/:campaignId`
Get a single campaign.

---

### `POST /clients/:clientId/campaigns`
Create a new campaign.

- **Body:**
  - `name: string`
  - `description?: string`
  - `startDate?: string`
  - `endDate?: string`
  - `tags?: string[]`

---

### `PUT /clients/:clientId/campaigns/:campaignId`
Update a campaign.

---

### `DELETE /clients/:clientId/campaigns/:campaignId`
Archive / delete a campaign.

---

## 📝 Post Routes

### `GET /clients/:clientId/posts`
List posts for a client.

- **Query (optional):**
  - `status?: string`
  - `campaignId?: string`
  - `platform?: string`
  - `from?: string` (ISO date)
  - `to?: string` (ISO date)

---

### `GET /clients/:clientId/posts/:postId`
Get a single post.

---

### `POST /clients/:clientId/posts`
Create a new post (usually starts as `draft`).

- **Body:**
  - `title: string`
  - `body: string`
  - `platforms: string[]`
  - `assets?: string[]`
  - `campaignId?: string`
  - `scheduleTime?: string` (ISO)

---

### `PUT /clients/:clientId/posts/:postId`
Update a post (content, platforms, schedule, etc.).

---

### `DELETE /clients/:clientId/posts/:postId`
Delete or archive a post.

---

### Workflow Actions

#### `POST /clients/:clientId/posts/:postId/submit`
Move from `draft` → `pending_approval`.

---

#### `POST /clients/:clientId/posts/:postId/approve`
Approve a post (e.g. `pending_approval` → `approved` or `scheduled`).

- **Body (optional):**
  - `scheduleTime?: string` (override schedule)

---

#### `POST /clients/:clientId/posts/:postId/reject`
Reject a post (back to `draft` with reason).

- **Body:**
  - `reason: string`

---

## 📅 Calendar Routes

### `GET /clients/:clientId/calendar`
Get a calendar view of posts for a client.

- **Query:**
  - `from: string` (ISO)
  - `to: string` (ISO)

**Response:**
- List of posts (with scheduleTime and platform(s)) for those dates.

---

## 📊 Analytics Routes

### `GET /clients/:clientId/analytics`
High-level analytics for a client.

- **Query (optional):**
  - `from?: string`
  - `to?: string`
  - `groupBy?: "day" | "week" | "month"`

---

### `GET /clients/:clientId/campaigns/:campaignId/analytics`
Campaign-level performance.

---

### `GET /clients/:clientId/posts/:postId/analytics`
Per-post performance (impressions, clicks, likes, comments, shares, etc.).

---

## 🧱 Internal / Worker Routes (Optional, Internal Use)

These routes are typically **internal** or protected with service-level auth.

### `POST /internal/jobs/publish`
Enqueue a post for publishing.

- **Body:**
  - `postId: string`

---

### `POST /internal/jobs/analytics`
Enqueue analytics refresh for a post or client.

- **Body:**
  - `postId?: string`
  - `clientId?: string`

---

## 🔐 Auth & Security Notes

- All non-auth routes are protected by:
  - `Authorization: Bearer <JWT>` header
- Role & tenant checks apply:
  - Users **only see clients (tenants)** they belong to.
  - Roles (`admin`, `manager`, etc.) determine allowed operations.

---

## ✅ Summary

This API surface supports:

- Multi-tenant client management  
- Full content lifecycle:
  - Draft → Approval → Schedule → Publish → Analytics  
- Integrations per client  
- Campaign grouping  
- Calendar views  
- Worker job integration (publish + analytics)  

This file should live at:

```text
/planning/docs/api-routes.md
