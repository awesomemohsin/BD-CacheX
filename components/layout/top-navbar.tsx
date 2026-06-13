'use client';

import { Bell, Settings, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ProfileModal } from '@/components/shared/profile-modal';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

import { useState, useEffect } from 'react';

interface TopNavbarProps {
  onMenuClick?: () => void;
}

export function TopNavbar({ onMenuClick }: TopNavbarProps) {
  const [email, setEmail] = useState('admin@bdcache.com');
  const [name, setName] = useState('Admin User');
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  
  // Settings state variables
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [alertThreshold, setAlertThreshold] = useState(90);
  const [enableEmailAlerts, setEnableEmailAlerts] = useState(true);
  const [checkInterval, setCheckInterval] = useState('5');

  // Notifications state variables
  const [unreadCount, setUnreadCount] = useState(3);
  const mockNotifications = [
    {
      id: 1,
      type: 'critical',
      message: 'FNA Cache capacity is critically low (free storage below 5%).',
      time: '10 mins ago',
    },
    {
      id: 2,
      type: 'info',
      message: 'Md. Akramul Haque added new distribution for Virgo ISP.',
      time: '1 hour ago',
    },
    {
      id: 3,
      type: 'success',
      message: 'Edge Server CDN-Edge-B3 live check passed successfully.',
      time: '2 hours ago',
    },
  ];

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedEmail = localStorage.getItem('user-email');
      const storedName = localStorage.getItem('user-name');
      if (storedEmail) {
        setEmail(storedEmail);
      }
      if (storedName) {
        setName(storedName);
      }
    }
  }, [isProfileOpen]); // reload details when profile modal changes (e.g. if we switch accounts or view it)

  const getInitials = (emailStr: string, nameStr: string) => {
    if (nameStr && nameStr.trim()) {
      const parts = nameStr.trim().split(' ');
      if (parts.length > 1) {
        return (parts[0][0] + parts[1][0]).toUpperCase();
      }
      return nameStr.substring(0, 2).toUpperCase();
    }
    return emailStr.substring(0, 2).toUpperCase();
  };

  return (
    <>
      <header className="fixed top-0 left-0 lg:left-64 right-0 h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 z-40">
        {/* Mobile menu toggle */}
        {onMenuClick && (
          <button
            onClick={onMenuClick}
            className="p-2 rounded-lg text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors mr-4 lg:hidden"
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}
        
        {/* Left spacer - Search option removed */}
        <div className="flex-1"></div>

        {/* Right Actions */}
        <div className="flex items-center gap-4 ml-auto">
          {/* User Button */}
          <button
            onClick={() => setIsProfileOpen(true)}
            className="flex items-center gap-3 hover:bg-slate-50 px-3 py-2 rounded-lg transition-colors border border-transparent hover:border-slate-100"
          >
            <Avatar className="w-8 h-8">
              <AvatarFallback className="bg-blue-600 text-white text-xs font-bold">
                {getInitials(email, name)}
              </AvatarFallback>
            </Avatar>
            <div className="text-left hidden sm:block">
              <p className="text-sm font-medium text-slate-900">{name}</p>
              <p className="text-xs text-slate-500">{email}</p>
            </div>
          </button>
        </div>
      </header>

      {/* Profile Dialog */}
      <ProfileModal
        open={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        userEmail={email}
      />

      {/* Settings Dialog */}
      <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
        <DialogContent className="sm:max-w-md bg-white border border-slate-200 shadow-2xl rounded-2xl p-6">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Settings className="w-5 h-5 text-blue-600" />
              <span>System Settings</span>
            </DialogTitle>
            <DialogDescription className="text-slate-500 text-sm">
              Configure capacity monitoring thresholds and alert rules.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={(e) => {
            e.preventDefault();
            setIsSettingsOpen(false);
            toast.success('System settings saved successfully');
          }} className="space-y-4 mt-4">
            <div className="space-y-3">
              {/* Capacity Threshold */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Critical Capacity Threshold (%)
                </label>
                <div className="flex items-center gap-3">
                  <Input
                    type="number"
                    min="50"
                    max="99"
                    value={alertThreshold}
                    onChange={(e) => setAlertThreshold(Number(e.target.value))}
                    className="bg-slate-50/50 border-slate-200 text-slate-900 h-10 w-24 rounded-xl text-sm"
                    required
                  />
                  <span className="text-xs text-slate-500 font-medium">
                    Trigger warning when used server storage exceeds this limit.
                  </span>
                </div>
              </div>

              {/* Toggle Alerts */}
              <div className="flex items-center justify-between py-2 border-b border-t border-slate-100 mt-2">
                <div className="space-y-0.5">
                  <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                    Email Alert Dispatch
                  </span>
                  <span className="text-[11px] text-slate-500 font-medium block">
                    Send real-time warnings to BTRC and ISP admins.
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={enableEmailAlerts}
                  onChange={(e) => setEnableEmailAlerts(e.target.checked)}
                  className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500 focus:ring-1 cursor-pointer"
                />
              </div>

              {/* Sync Interval */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Database Sync Check Interval
                </label>
                <select
                  value={checkInterval}
                  onChange={(e) => setCheckInterval(e.target.value)}
                  className="flex h-10 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs text-slate-700 shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-500"
                >
                  <option value="1">Every 1 minute</option>
                  <option value="5">Every 5 minutes</option>
                  <option value="15">Every 15 minutes</option>
                  <option value="60">Every 1 hour</option>
                </select>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl h-10 text-xs mt-2 flex items-center justify-center"
            >
              Save Settings
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}

