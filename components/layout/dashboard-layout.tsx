'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AppSidebar } from './app-sidebar';
import { TopNavbar } from './top-navbar';

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

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
    <div className="flex h-screen bg-slate-50">
      <AppSidebar />
      <div className="flex-1 flex flex-col ml-64">
        <TopNavbar />
        <main className="flex-1 overflow-auto pt-16 pb-6 px-6">
          {children}
        </main>
      </div>
    </div>
  );
}
