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
  History,
  X,
} from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  LayoutGrid: <LayoutGrid className="w-5 h-5" />,
  Building2: <Building2 className="w-5 h-5" />,
  Zap: <Zap className="w-5 h-5" />,
  Server: <Server className="w-5 h-5" />,
  Network: <Network className="w-5 h-5" />,
  BarChart3: <BarChart3 className="w-5 h-5" />,
  History: <History className="w-5 h-5" />,
};

interface AppSidebarProps {
  className?: string;
  onClose?: () => void;
}

export function AppSidebar({ className, onClose }: AppSidebarProps) {
  const pathname = usePathname();

  const handleLinkClick = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <div className={cn("fixed left-0 top-0 h-screen w-64 bg-white border-r border-slate-200 flex flex-col z-50", className)}>
      {/* Logo/Brand */}
      <div className="p-4 border-b border-slate-200 flex justify-between items-center relative shrink-0">
        <div className="flex-1 flex justify-center items-center">
          <img src="/logo.png" alt="BD CacheX Logo" className="h-28 w-full object-contain" />
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 transition-colors lg:hidden"
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        )}
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
                onClick={handleLinkClick}
                className={cn(
                  'flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-200 ease-out transform',
                  isActive
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/20 font-semibold scale-[1.02]'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 hover:translate-x-1'
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
      <div className="p-4 border-t border-slate-200">
        <div className="p-3 bg-slate-50 rounded-lg text-center">
          <p className="text-xs text-slate-500">
            Version <span className="font-semibold text-slate-700">1.0.0</span>
          </p>
        </div>
      </div>
    </div>
  );
}
