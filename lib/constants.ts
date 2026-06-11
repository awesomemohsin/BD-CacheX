import { CompanyType, StatusType } from './types';

// Navigation items for sidebar
export const NAVIGATION_ITEMS = [
  {
    id: 'dashboard',
    name: 'Dashboard',
    href: '/dashboard',
    icon: 'LayoutGrid',
  },
  {
    id: 'allocations',
    name: 'Distribution',
    href: '/dashboard/allocations',
    icon: 'Network',
  },
  {
    id: 'companies',
    name: 'Companies',
    href: '/dashboard/companies',
    icon: 'Building2',
  },
  {
    id: 'cache-providers',
    name: 'Cache Providers',
    href: '/dashboard/cache-providers',
    icon: 'Zap',
  },
  {
    id: 'servers',
    name: 'Servers',
    href: '/dashboard/servers',
    icon: 'Server',
  },
  {
    id: 'reports',
    name: 'Reports',
    href: '/dashboard/reports',
    icon: 'BarChart3',
  },
  {
    id: 'logs',
    name: 'Activity Logs',
    href: '/dashboard/logs',
    icon: 'History',
  },
];

// Status badge colors
export const STATUS_COLORS = {
  [StatusType.ACTIVE]: {
    bg: 'bg-green-100',
    text: 'text-green-800',
    dot: 'bg-green-500',
  },
  [StatusType.PENDING]: {
    bg: 'bg-orange-100',
    text: 'text-orange-800',
    dot: 'bg-orange-500',
  },
  [StatusType.INACTIVE]: {
    bg: 'bg-red-100',
    text: 'text-red-800',
    dot: 'bg-red-500',
  },
};

// Company type options
export const COMPANY_TYPE_OPTIONS = [
  { value: CompanyType.ISP, label: 'ISP' },
  { value: CompanyType.IIG, label: 'IIG' },
];

// Status options
export const STATUS_OPTIONS = [
  { value: StatusType.ACTIVE, label: 'Active' },
  { value: StatusType.PENDING, label: 'Pending' },
  { value: StatusType.INACTIVE, label: 'Inactive' },
];

// Default cache providers
export const DEFAULT_CACHE_PROVIDERS = [
  'FNA',
  'GGC',
  'BaisanCloud',
  'BIGO',
  'Cloudflare',
  'Zenlayer',
  'G-Core Labs',
  'Tencent',
  'Netflix',
  'CDN77',
  'MCC',
  'Akamai',
];

// Pagination
export const ITEMS_PER_PAGE = 10;

// Format currency
export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value);
};

// Format date
export const formatDate = (date: Date | string) => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(new Date(date));
};
