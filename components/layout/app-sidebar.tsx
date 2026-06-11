'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NAVIGATION_ITEMS } from '@/lib/constants';
import { cn } from '@/lib/utils';
import {
  LayoutGrid,
  Building2,
  Zap,
  Server,
  Network,
  BarChart3,
} from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  LayoutGrid: <LayoutGrid className="w-5 h-5" />,
  Building2: <Building2 className="w-5 h-5" />,
  Zap: <Zap className="w-5 h-5" />,
  Server: <Server className="w-5 h-5" />,
  Network: <Network className="w-5 h-5" />,
  BarChart3: <BarChart3 className="w-5 h-5" />,
};

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <div className="fixed left-0 top-0 h-screen w-64 bg-slate-900 text-white border-r border-slate-800 flex flex-col">
      {/* Logo/Brand */}
      <div className="p-6 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold">
            BD
          </div>
          <div>
            <h1 className="font-bold text-lg">BD Cache-X</h1>
            <p className="text-xs text-slate-400">CDN Management</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-4 py-6">
        <div className="space-y-2">
          {NAVIGATION_ITEMS.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
            return (
              <Link
                key={item.id}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-200 ease-out transform',
                  isActive
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/20 font-semibold scale-[1.02]'
                    : 'text-slate-300 hover:bg-slate-800/60 hover:text-white hover:translate-x-1'
                )}
              >
                {iconMap[item.icon]}
                <span className="text-sm">{item.name}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-slate-800">
        <div className="p-3 bg-slate-800 rounded-lg">
          <p className="text-xs text-slate-300">
            Version <span className="font-semibold">1.0.0</span>
          </p>
        </div>
      </div>
    </div>
  );
}
