'use client';

import { Bell, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ProfileModal } from '@/components/shared/profile-modal';

import { useState, useEffect } from 'react';

export function TopNavbar() {
  const [email, setEmail] = useState('admin@bdcache.com');
  const [name, setName] = useState('Admin User');
  const [isProfileOpen, setIsProfileOpen] = useState(false);

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
      <header className="fixed top-0 left-64 right-0 h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 z-40">
        {/* Left spacer - Search option removed */}
        <div className="flex-1"></div>

        {/* Right Actions */}
        <div className="flex items-center gap-4 ml-auto">
          {/* Notifications */}
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </Button>

          {/* Settings */}
          <Button variant="ghost" size="icon">
            <Settings className="w-5 h-5" />
          </Button>

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

      <ProfileModal
        open={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        userEmail={email}
      />
    </>
  );
}

