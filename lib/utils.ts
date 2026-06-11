import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Capacity calculation utilities
export const calculateCapacityPercentage = (used: number, total: number): number => {
  if (total === 0) return 0;
  return Math.round((used / total) * 100);
};

export const calculateAvailableCapacity = (used: number, total: number): number => {
  return Math.max(0, total - used);
};

// Format capacity in GB/TB
export const formatCapacity = (gb: number): string => {
  if (gb >= 1024) {
    return `${(gb / 1024).toFixed(2)} TB`;
  }
  return `${gb} GB`;
};

// Generate unique ID
export const generateId = (prefix: string): string => {
  const timestamp = Date.now().toString(36);
  const randomStr = Math.random().toString(36).substring(2, 9);
  return `${prefix}-${timestamp}-${randomStr}`;
};

// Format date to readable string
export const formatDateString = (date: Date | string): string => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(new Date(date));
};

// Format date and time
export const formatDateTime = (date: Date | string): string => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(date));
};

// Validate email
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Validate phone number (basic)
export const isValidPhone = (phone: string): boolean => {
  const phoneRegex = /^[\d\s\-\+\(\)]+$/;
  return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10;
};

// Truncate text
export const truncateText = (text: string, length: number): string => {
  if (text.length <= length) return text;
  return text.substring(0, length) + '...';
};
