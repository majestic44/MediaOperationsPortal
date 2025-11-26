# 🧩 MCMP Portal – Data Model & Schemas

This document defines the **core data models** for the Multi-Client Media & Content Management Portal (MCMP) using **MongoDB + Mongoose** (via NestJS).

It is meant to be dropped into your repo as:

`/planning/docs/schemas.md`

---

## 🔑 Conventions

- All `_id` fields are MongoDB `ObjectId`.
- In TypeScript interfaces we usually represent them as `string` (ObjectId as string).
- All tenant-specific documents must include `clientId` or `tenantIds` to support **multi-tenancy**.
- For NestJS, we use `@nestjs/mongoose` with `@Schema()` and `@Prop()` decorators.

---

# 1. User Schema

Represents an internal user (agency staff) or client user (owner/viewer).

### Responsibilities

- Authentication (email/password and/or OAuth)
- Role assignment
- Tenant (client) assignments

### Mongoose Schema

```ts
// apps/api/src/users/schemas/user.schema.ts

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserRole =
  | 'admin'
  | 'manager'
  | 'creator'
  | 'clientOwner'
  | 'clientViewer';

export type OAuthProvider = 'google' | 'microsoft' | 'facebook';

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ unique: true, index: true })
  email: string;

  @Prop()
  password: string; // bcrypt hashed, may be null for pure-OAuth accounts

  @Prop()
  name: string;

  @Prop({ type: [String], default: [] })
  tenantIds: string[]; // list of clients/tenants the user can access

  @Prop({ type: String, default: 'clientViewer' })
  role: UserRole;

  @Prop({
    type: [
      {
        provider: { type: String },
        providerId: { type: String },
        profile: { type: Object },
      },
    ],
    default: [],
  })
  oauthAccounts: {
    provider: OAuthProvider;
    providerId: string; // ID from Google/Microsoft/Facebook
    profile: Record<string, unknown>;
  }[];
}

export const UserSchema = SchemaFactory.createForClass(User);
```

---

# 2. Client / Tenant Schema

Represents a **brand/client** your agency manages (a tenant).

### Responsibilities

- Holds all brand-specific settings
- Serves as tenant boundary for data

### Mongoose Schema

```ts
// apps/api/src/clients/schemas/client.schema.ts

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Client extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ unique: true, index: true })
  slug: string;

  @Prop({ type: String, default: 'UTC' })
  timezone: string;

  @Prop({
    type: {
      logoUrl: { type: String },
      primaryColor: { type: String },
      secondaryColor: { type: String },
      fonts: { type: [String], default: [] },
    },
    default: {},
  })
  brandSettings: {
    logoUrl?: string;
    primaryColor?: string;
    secondaryColor?: string;
    fonts?: string[];
  };

  @Prop({ type: String })
  brandGuidelines?: string; // Rich text / markdown

  @Prop({ type: [String], default: [] })
  hashtagBank: string[];

  @Prop({
    type: [
      {
        label: String,
        text: String,
      },
    ],
    default: [],
  })
  ctaTemplates: {
    label: string;
    text: string;
  }[];

  @Prop({
    type: [
      {
        dayOfWeek: Number, // 0-6 (Sun-Sat)
        start: String,     // "09:00"
        end: String,       // "17:00"
      },
    ],
    default: [],
  })
  defaultPostingWindows: {
    dayOfWeek: number;
    start: string;
    end: string;
  }[];
}

export const ClientSchema = SchemaFactory.createForClass(Client);
```

---

# 3. IntegrationAccount Schema

Represents a **connection** between a client and an external platform (e.g. FB, IG, LinkedIn).

### Responsibilities

- Stores access tokens/refresh tokens
- Tracks connection status & expiry
- Tied to one `clientId`

### Mongoose Schema

```ts
// apps/api/src/integrations/schemas/integration.schema.ts

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type IntegrationPlatform =
  | 'facebook'
  | 'instagram'
  | 'linkedin'
  | 'google-business'
  | 'website';

@Schema({ timestamps: true })
export class IntegrationAccount extends Document {
  @Prop({ required: true, index: true })
  clientId: string; // ref to Client

  @Prop({ required: true })
  platform: IntegrationPlatform;

  @Prop()
  accountName?: string; // e.g. page name / profile name

  @Prop()
  externalAccountId?: string; // e.g. page ID, IG business ID, etc.

  @Prop()
  accessToken: string;

  @Prop()
  refreshToken?: string;

  @Prop()
  expiresAt?: Date;

  @Prop({ default: 'connected' })
  status: 'connected' | 'expired' | 'error';

  @Prop({ type: Object, default: {} })
  metadata: Record<string, unknown>; // platform-specific data
}

export const IntegrationAccountSchema =
  SchemaFactory.createForClass(IntegrationAccount);
```

---

# 4. Campaign Schema

Groups posts under a **campaign** (e.g. “Summer Launch”, “Holiday Promo”).

### Responsibilities

- Organize multiple posts
- Provide high-level analytics

### Mongoose Schema

```ts
// apps/api/src/campaigns/schemas/campaign.schema.ts

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Campaign extends Document {
  @Prop({ required: true, index: true })
  clientId: string; // Tenant/Client

  @Prop({ required: true })
  name: string;

  @Prop()
  description?: string;

  @Prop()
  startDate?: Date;

  @Prop()
  endDate?: Date;

  @Prop({ type: [String], default: [] })
  tags: string[];
}

export const CampaignSchema = SchemaFactory.createForClass(Campaign);
```

---

# 5. Post Schema

Represents a **single piece of content** to be published to one or more platforms.

### Responsibilities

- Holds content & scheduling info
- Tracks state transitions (Draft → Approved → Scheduled → Published)
- Holds per-platform publish data

### Mongoose Schema

```ts
// apps/api/src/posts/schemas/post.schema.ts

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IntegrationPlatform } from '../../integrations/schemas/integration.schema';

export type PostStatus =
  | 'draft'
  | 'pending_approval'
  | 'approved'
  | 'scheduled'
  | 'published'
  | 'failed';

@Schema({ timestamps: true })
export class Post extends Document {
  @Prop({ required: true, index: true })
  clientId: string;

  @Prop({ index: true })
  campaignId?: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  body: string;

  @Prop({ type: [String], default: [] })
  platforms: IntegrationPlatform[];

  @Prop({ type: [String], default: [] })
  assetUrls: string[]; // links to media in asset library or storage

  @Prop({ type: String, default: 'draft' })
  status: PostStatus;

  @Prop()
  scheduleTime?: Date; // when it should be posted

  @Prop({
    type: {
      facebook: { type: String },
      instagram: { type: String },
      linkedin: { type: String },
      'google-business': { type: String },
      website: { type: String },
    },
    default: {},
  })
  platformPostIds: Partial<Record<IntegrationPlatform, string>>;

  @Prop({
    type: {
      facebook: { type: Date },
      instagram: { type: Date },
      linkedin: { type: Date },
      'google-business': { type: Date },
      website: { type: Date },
    },
    default: {},
  })
  publishedAt: Partial<Record<IntegrationPlatform, Date>>;

  @Prop()
  createdById: string; // user who created

  @Prop()
  approvedById?: string; // user who approved

  @Prop({
    type: [
      {
        at: Date,
        fromStatus: String,
        toStatus: String,
        byUserId: String,
        note: String,
      },
    ],
    default: [],
  })
  statusHistory: {
    at: Date;
    fromStatus: PostStatus | string;
    toStatus: PostStatus | string;
    byUserId?: string;
    note?: string;
  }[];

  @Prop()
  lastError?: string; // last failure reason, if any
}

export const PostSchema = SchemaFactory.createForClass(Post);
```

---

# 6. AnalyticsRecord Schema

Stores **analytics metrics** from external platforms.

### Responsibilities

- Per-post, per-platform metrics
- Historical data for trends

### Mongoose Schema

```ts
// apps/api/src/analytics/schemas/analytics.schema.ts

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IntegrationPlatform } from '../../integrations/schemas/integration.schema';

@Schema({ timestamps: true })
export class AnalyticsRecord extends Document {
  @Prop({ required: true, index: true })
  clientId: string;

  @Prop({ required: true, index: true })
  postId: string;

  @Prop({ required: true })
  platform: IntegrationPlatform;

  @Prop({
    type: {
      impressions: { type: Number, default: 0 },
      reach: { type: Number, default: 0 },
      clicks: { type: Number, default: 0 },
      likes: { type: Number, default: 0 },
      comments: { type: Number, default: 0 },
      shares: { type: Number, default: 0 },
      saves: { type: Number, default: 0 },
    },
    default: {},
  })
  metrics: {
    impressions?: number;
    reach?: number;
    clicks?: number;
    likes?: number;
    comments?: number;
    shares?: number;
    saves?: number;
  };

  @Prop({ required: true })
  fetchedAt: Date; // when this snapshot was retrieved
}

export const AnalyticsRecordSchema =
  SchemaFactory.createForClass(AnalyticsRecord);
```

---

# 7. Asset Schema (Optional but Recommended)

If you want a dedicated media library per client.

### Responsibilities

- Track uploaded assets across clients
- Store references to storage (S3, etc.)

### Mongoose Schema

```ts
// apps/api/src/assets/schemas/asset.schema.ts

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AssetType = 'image' | 'video' | 'file';

@Schema({ timestamps: true })
export class Asset extends Document {
  @Prop({ required: true, index: true })
  clientId: string;

  @Prop({ required: true })
  type: AssetType;

  @Prop({ required: true })
  url: string; // storage URL

  @Prop()
  filename?: string;

  @Prop()
  altText?: string;

  @Prop({ type: [String], default: [] })
  tags: string[];

  @Prop({ type: String })
  folder?: string; // logical folder name / path
}

export const AssetSchema = SchemaFactory.createForClass(Asset);
```

---

# 8. Shared TypeScript Interfaces (packages/types)

To share typings across **frontend**, **backend**, and **worker**, mirror the schemas into `packages/types/src/index.ts`.

### Example Shared Interfaces

```ts
// packages/types/src/index.ts

export type ObjectIdString = string;

export type UserRole =
  | 'admin'
  | 'manager'
  | 'creator'
  | 'clientOwner'
  | 'clientViewer';

export interface IUser {
  id: ObjectIdString;
  email: string;
  name: string;
  role: UserRole;
  tenantIds: ObjectIdString[];
}

export interface IClient {
  id: ObjectIdString;
  name: string;
  slug: string;
  timezone: string;
  brandSettings?: {
    logoUrl?: string;
    primaryColor?: string;
    secondaryColor?: string;
    fonts?: string[];
  };
}

export type Platform =
  | 'facebook'
  | 'instagram'
  | 'linkedin'
  | 'google-business'
  | 'website';

export type PostStatus =
  | 'draft'
  | 'pending_approval'
  | 'approved'
  | 'scheduled'
  | 'published'
  | 'failed';

export interface IPost {
  id: ObjectIdString;
  clientId: ObjectIdString;
  campaignId?: ObjectIdString;
  title: string;
  body: string;
  platforms: Platform[];
  assetUrls: string[];
  status: PostStatus;
  scheduleTime?: string;
}
```

---

# ✅ Summary

These schemas provide:

- A solid **multi-tenant data model**  
- Clear separation of:
  - Users
  - Clients (tenants)
  - Integrations
  - Posts
  - Campaigns
  - Analytics
  - Assets  
- Direct mappings into:
  - NestJS Mongoose schemas in `apps/api/src/**/schemas/*.schema.ts`
  - Shared TS interfaces in `packages/types/src/index.ts`

Keep this file in sync with actual implementation as the project evolves.
