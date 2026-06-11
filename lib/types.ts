// Enums
export enum CompanyType {
  ISP = 'ISP',
  IIG = 'IIG',
}

export enum StatusType {
  ACTIVE = 'Active',
  PENDING = 'Pending',
  INACTIVE = 'Inactive',
}

// Company Type
export interface Company {
  id: string;
  name: string;
  type: CompanyType;
  email: string;
  address?: string;
  status: StatusType;
  createdBy?: string;
  updatedBy?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Cache Provider Type
export interface CacheProvider {
  id: string;
  name: string;
  shortCode: string;
  description?: string;
  status: StatusType;
  serverCount?: number;
  totalCapacity?: number;
  usedServerCount?: number;
  usedCapacity?: number;
  createdBy?: string;
  updatedBy?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Server Type
export interface Server {
  id: string;
  name: string;
  model: string;
  brand: string;
  totalCapacityGB: number;
  usedCapacityGB: number;
  location: string;
  rackNumber?: string;
  ipAddress: string;
  status: StatusType;
  notes?: string;
  createdBy?: string;
  updatedBy?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Allocation Type
export interface Allocation {
  id: string;
  companyId: string;
  companyName: string;
  companyType: CompanyType;
  cacheProviderId: string;
  cacheProviderName: string;
  serverId: string;
  serverName: string;
  capacityGB: number;
  goLiveDate: Date;
  status: StatusType;
  notes?: string;
  createdBy?: string;
  updatedBy?: string;
  createdAt: Date;
  updatedAt: Date;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface ActivityLog {
  id: string;
  action: string;
  entity: string;
  details: string;
  userEmail: string;
  createdAt: Date;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  phone?: string;
  createdAt: Date;
  updatedAt: Date;
}
