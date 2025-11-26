# 🧱 MCMP Portal – UI Wireframes (Text-Based)

These are **low-fidelity, text-based wireframes** describing the core screens of the MCMP Portal.

They exist to guide your **Next.js + shadcn/ui** UI layout and component choices.  
They are not pixel-perfect — but they define structure, flow, and core UI elements.

---

# 🔐 1. Login Screen

**Route:** `/login`  
**Purpose:** Authentication entry point for all users.

```text
+------------------------------------------------------+
|                      MCMP Portal                     |
|             Multi-Client Media Management            |
|                                                      |
|  +----------------------------------------------+    |
|  |              Sign in to your account         |    |
|  |                                              |    |
|  |  Email [______________________________]      |    |
|  |  Password [___________________________]      |    |
|  |                                              |    |
|  |  [  Sign In  ]                               |    |
|  |                                              |    |
|  |  ------------- or continue with ------------ |    |
|  |                                              |    |
|  |  [ Continue with Google      ]               |    |
|  |  [ Continue with Microsoft   ]               |    |
|  |  [ Continue with Facebook    ]               |    |
|  |                                              |    |
|  +----------------------------------------------+    |
|                                                      |
+------------------------------------------------------+
```

---

# 🧭 2. Main App Shell (Sidebar + Header)

Visible on **all authenticated pages** except `/login`.

```text
+---------------------------------------------------------------+
| Sidebar (left)         | Header (top, right content)          |
|------------------------|--------------------------------------|
|  LOGO / MCMP           | [Tenant: ACME Inc v ]  [⚙] [👤 JT]   |
|                        |--------------------------------------|
|  [🏠 Dashboard]        |                                      |
|  [🏢 Clients ]         |          Page Content                |
|  [📝 Posts   ]         | (Tables, cards, charts, forms...)    |
|  [📅 Calendar]         |                                      |
|  [🎯 Campaigns]        |                                      |
|  [📊 Analytics]        |                                      |
|  [🗂 Assets  ]         |                                      |
|  ------------------    |                                      |
|  [⚙ Settings]         |                                      |
|  [⇦ Sign out]         |                                      |
+---------------------------------------------------------------+
```

---

# 🏠 3. Dashboard

**Route:** `/dashboard`  
High-level metrics, scheduled posts, pending approvals.

```text
+---------------------------------------------------------------+
| Dashboard – ACME Inc                                          |
|---------------------------------------------------------------|
| [ KPI: Scheduled Posts ] [ KPI: Pending Approvals ]           |
| [ KPI: Published (7d) ]  [ KPI: Engagement (7d) ]             |
|                                                               |
| ---------- Upcoming Scheduled Posts ------------------------- |
| Date/Time       | Title                  | Platforms          |
|---------------------------------------------------------------|
| Aug 12 10am     | Summer Sale Teaser     | FB, IG             |
| Aug 12 3pm      | Blog: New Features     | Website            |
| ...                                                           |
|                                                               |
| ------------- Pending Approvals ----------------------------- |
| Title                  | Due Date | Owner                     |
|---------------------------------------------------------------|
| Fall Launch Teaser     | Aug 13   | Client Owner              |
| Labor Day Promo        | Aug 14   | Client Owner              |
| ...                                                           |
+---------------------------------------------------------------+
```

---

# 🏢 4. Clients List & Client Detail

## 4.1 Clients List  
**Route:** `/clients`

```text
+-----------------------------------------------------------+
| Clients                                                   |
| [ + New Client ]                                          |
| Search [__________________________]                       |
|                                                           |
| --------------------------------------------------------  |
| Name         | Timezone     | Brand Color | Actions       |
| --------------------------------------------------------  |
| ACME Inc     | America/NY   | ● #FF5733   | [Open]        |
| Blue Ocean   | Europe/Lon   | ● #007BFF   | [Open]        |
+-----------------------------------------------------------+
```

## 4.2 Client Detail  
**Route:** `/clients/[id]`  
Tabs: Overview / Branding / Guidelines / Integrations

```text
+-----------------------------------------------------------+
| ACME Inc                                  [ Edit Client ] |
| Tabs: [Overview] [Branding] [Guidelines] [Integrations]   |
|-----------------------------------------------------------|
| Overview                                                  |
| - Timezone: America/New_York                              |
| - Default Posting Windows: M–F 9:00–17:00                 |
|                                                           |
| Recent Campaigns                                          |
| Recent Posts                                              |
+-----------------------------------------------------------+
```

---

# 📝 5. Posts List

**Route:** `/posts`

```text
+-------------------------------------------------------------------+
| Posts for: [ ACME Inc v ]                                         |
| Filters: [Status v] [Platform v] [Campaign v] [Date Range v]      |
| [ + New Post ]                                                    |
|                                                                   |
| ---------------------------------------------------------------- |
| Title               | Status     | Platforms | Campaign  |  ⋯     |
| ---------------------------------------------------------------- |
| Summer Sale Teaser  | Scheduled  | FB, IG   | Summer ’25 | [⋯]   |
| New Feature Blog    | Draft      | Website  | Product    | [⋯]   |
| Labor Day Promo     | Pending    | FB, IG   | Holiday    | [⋯]   |
+-------------------------------------------------------------------+
```

---

# ✍️ 6. Post Editor

**Route:** `/posts/[id]` or `/posts/new`

```text
+-------------------------------------------------------------------+
| [← Back]                                        [ Save Draft ]    |
|                                                [ Submit for Approval ] 
|                                                                   |
| Title: [______________________________________________]           |
|                                                                   |
| Body:                                                            |
| +-----------------------------------------------------------+    |
| | Rich text editor:                                        |    |
| | - Headline                                               |    |
| | - Paragraph                                              |    |
| | - Hashtags                                               |    |
| +-----------------------------------------------------------+    |
|                                                                   |
| Attach Media: [ Upload ] [ Choose from Library ]                  |
| Thumbnails: [img1] [img2] …                                       |
|                                                                   |
| ---------------- Right Sidebar --------------------------------- |
| Status: [ Draft v ]                                               |
| Platforms: [x] FB  [x] IG  [ ] LinkedIn  [ ] Website              |
| Campaign:  [ Summer Launch v ]                                    |
| Schedule: [ ] Post Now                                            |
|           [x] Schedule: [ 2025-08-12 10:00 ]                       |
| Platform Checks:                                                  |
| - FB: 120 / 280 chars                                             |
| - IG: Ratio OK ✔                                                  |
+-------------------------------------------------------------------+
```

---

# 📅 7. Calendar View

**Route:** `/calendar`

```text
+---------------------------------------------------------------+
| Calendar – ACME Inc                                           |
| [<] August 2025 [>]            View: [Month v] [Week]         |
| Filters: [Platform v] [Status v]                              |
|---------------------------------------------------------------|
| Sun   Mon   Tue   Wed   Thu   Fri   Sat                       |
|---------------------------------------------------------------|
|      1     2     3     4     5     6                          |
|      [Post A – FB]                                            |
|                                                               |
| 7     8     9     10    11    12    13                        |
|       [Post B – IG] [Post C – FB/IG]                          |
|       [●● more]                                               |
+---------------------------------------------------------------+
```

Clicking an item → modal/sheet with post details + “Edit”.

---

# ✔ 8. Approvals (Client-Facing)

**Route:** `/approvals` or built into `/posts` filtered view.

```text
+----------------------------------------------------------------+
| Pending Approvals – ACME Inc                                   |
| ------------------------------------------------------------- |
| Title              | Scheduled For      | Platforms | Actions  |
| ------------------------------------------------------------- |
| Fall Launch Teaser | 2025-09-01 10:00   | FB, IG    | [Review] |
| Labor Day Promo    | 2025-08-30 15:00   | FB, IG    | [Review] |
+----------------------------------------------------------------+

Review Modal:

+--------------------------------------------------------------+
| Review Post                                                  |
| Title: Fall Launch Teaser                                   |
| Platforms: FB, IG                                           |
| Schedule: 2025-09-01 10:00                                  |
|                                                              |
| Preview: "Get ready for our Fall Launch..."                 |
|                                                              |
| Comment: [__________________________________________]       |
|                                                              |
| [ Reject with Comment ]     [ Approve ]                     |
+--------------------------------------------------------------+
```

---

# 📊 9. Analytics Dashboard

**Route:** `/analytics`

```text
+------------------------------------------------------------------+
| Analytics – ACME Inc                                             |
| Date range: [ Last 30 Days v ]  Platform: [ All v ]             |
| Campaign: [ All v ]                                              |
|                                                                  |
| KPI Cards:                                                       |
| [ Impressions: 120,000 ] [ Clicks: 4,500 ] [ Engagement: 3.7% ] |
|                                                                  |
| Chart:                                                           |
|  (Line chart: impressions over 30 days)                          |
|                                                                  |
| Top Posts                                                        |
| ---------------------------------------------------------------- |
| Title             | Platform | Impressions | Clicks | CTR        |
| ---------------------------------------------------------------- |
| Summer Teaser     | FB       | 20,000      | 900    | 4.5%       |
| Fall Launch       | IG       | 18,000      | 800    | 4.4%       |
+------------------------------------------------------------------+
```

---

# 🗂 10. Asset Library

**Route:** `/assets`

```text
+-------------------------------------------------------------+
| Assets – ACME Inc                                           |
| [ Upload Asset ]   View: [Grid v] [List]                    |
| Filters: Type [All v]  Tags [________]  Folder [Root v]     |
|                                                             |
| [Thumb 1] [Thumb 2] [Thumb 3] [Thumb 4]                     |
| [Thumb 5] [Thumb 6] [Thumb 7] [Thumb 8]                     |
|                                                             |
| Clicking a thumb opens details:                             |
| - Preview                                                   |
| - Filename, tags                                            |
| - "Attach to Post" button                                   |
+-------------------------------------------------------------+
```

---

# ⚙ 11. Settings Page

**Route:** `/settings`

```text
+--------------------------------------------------------------+
| Settings                                                     |
| Tabs: [Profile] [Notifications] [Security]                   |
|--------------------------------------------------------------|
| Profile                                                      |
| Name: [___________________]                                  |
| Email: [___________________] (read-only if OAuth)            |
| Avatar: [ Change ]                                           |
|                                                              |
| [ Save Changes ]                                             |
+--------------------------------------------------------------+
```

---

# ✅ Summary

These wireframes define:

- The **layout** of all core screens  
- The **components** each page should contain  
- The consistent sidebar + header **app shell**  
- UX for posts, approvals, scheduling, analytics, and assets  

They should be used as a **blueprint while building your Next.js frontend**.
