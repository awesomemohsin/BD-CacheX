'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AppSidebar } from './app-sidebar';
import { TopNavbar } from './top-navbar';

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  useEffect(() => {
    // 1. Guard route by verifying localStorage credentials
    if (typeof window !== 'undefined') {
      const email = localStorage.getItem('user-email');
      if (!email) {
        router.push('/login');
      } else {
        setIsAuthenticated(true);
      }

      // 2. Global window.fetch interceptor for x-user-email header injection
      const originalFetch = window.fetch;
      window.fetch = async function (input, init) {
        let url = '';
        if (typeof input === 'string') {
          url = input;
        } else if (input instanceof URL) {
          url = input.href;
        } else if (input && typeof input === 'object' && 'url' in input) {
          url = (input as any).url;
        }

        if (url.startsWith('/api/') || url.includes('/api/')) {
          const storedEmail = localStorage.getItem('user-email') || 'admin@bdcache.com';
          
          init = init || {};
          init.headers = init.headers || {};

          if (init.headers instanceof Headers) {
            init.headers.set('x-user-email', storedEmail);
          } else if (Array.isArray(init.headers)) {
            const exists = init.headers.some(h => h[0].toLowerCase() === 'x-user-email');
            if (!exists) {
              init.headers.push(['x-user-email', storedEmail]);
            }
          } else {
            (init.headers as Record<string, string>)['x-user-email'] = storedEmail;
          }
        }
        return originalFetch(input, init);
      };
    }
  }, [router]);

  if (!isAuthenticated) {
    return (
      <div className="flex h-screen flex-col items-center justify-center bg-slate-900 text-slate-450 gap-3">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Verifying session...</p>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden relative">
      {/* Desktop Sidebar */}
      <AppSidebar className="hidden lg:flex" />

      {/* Mobile Sidebar Overlay Drawer */}
      {isMobileSidebarOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity duration-200"
            onClick={() => setIsMobileSidebarOpen(false)}
          />
          {/* Drawer panel */}
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white shadow-xl animate-in slide-in-from-left duration-200">
            <AppSidebar className="flex w-full" onClose={() => setIsMobileSidebarOpen(false)} />
          </div>
        </div>
      )}

      {/* Workspace */}
      <div className="flex-1 flex flex-col ml-0 lg:ml-64 min-w-0 overflow-hidden">
        <TopNavbar onMenuClick={() => setIsMobileSidebarOpen(true)} />
        <main className="flex-1 overflow-auto pt-20 pb-6 px-4 md:px-6">
          {children}
        </main>
      </div>
    </div>
  );
}
