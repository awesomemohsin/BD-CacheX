import { LucideIcon } from 'lucide-react';
import Link from 'next/link';

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  subtext?: string;
  className?: string;
  href?: string;
}

export function StatCard({
  icon: Icon,
  label,
  value,
  subtext,
  className,
  href,
}: StatCardProps) {
  const CardContent = (
    <div className="flex items-start justify-between">
      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">{label}</p>
        <p className="text-2xl font-extrabold tracking-tight text-slate-800 group-hover:text-blue-600 transition-colors duration-300">{value}</p>
        {subtext && <p className="text-xs text-slate-500 font-medium">{subtext}</p>}
      </div>
      <div className="p-3 bg-blue-50/80 rounded-xl group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-indigo-600 group-hover:text-white transition-all duration-300 text-blue-600">
        <Icon className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
      </div>
    </div>
  );

  const cardClasses = `group bg-white p-6 rounded-2xl border border-slate-100 shadow-sm shadow-slate-100/30 hover:shadow-md hover:shadow-slate-200/40 hover:-translate-y-1 transition-all duration-300 block cursor-pointer ${className || ''}`;

  if (href) {
    return (
      <Link href={href} className={cardClasses}>
        {CardContent}
      </Link>
    );
  }

  return (
    <div className={cardClasses}>
      {CardContent}
    </div>
  );
}

