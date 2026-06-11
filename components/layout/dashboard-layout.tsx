'use client';

import { AppSidebar } from './app-sidebar';
import { TopNavbar } from './top-navbar';

export function DashboardLayout({ children }: { children: React.ReactNode }) {
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
