// packages/types/src/index.ts

// Core shared types for MCMP Portal

export type ObjectIdString = string;

export interface Tenant {
  id: ObjectIdString;
  name: string;
  slug: string;
  timezone: string;
}

export type UserRole =
  | 'admin'
  | 'manager'
  | 'creator'
  | 'clientOwner'
  | 'clientViewer';

export interface User {
  id: ObjectIdString;
  email: string;
  name: string;
  role: UserRole;
  tenants: ObjectIdString[];
}

export type Platform = 'facebook' | 'instagram' | 'linkedin' | 'google' | 'website';

export type PostStatus =
  | 'draft'
  | 'pending_approval'
  | 'approved'
  | 'scheduled'
  | 'published'
  | 'failed';

export interface Campaign {
  id: ObjectIdString;
  clientId: ObjectIdString;
  name: string;
  description?: string;
  startDate?: string;
  endDate?: string;
  tags?: string[];
}

export interface Post {
  id: ObjectIdString;
  clientId: ObjectIdString;
  campaignId?: ObjectIdString;
  title: string;
  body: string;
  platforms: Platform[];
  assets: string[];
  status: PostStatus;
  scheduleTime?: string;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
}
