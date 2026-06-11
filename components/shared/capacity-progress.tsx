import { calculateCapacityPercentage, formatCapacity } from '@/lib/utils';
import { cn } from '@/lib/utils';

interface CapacityProgressProps {
  used: number;
  total: number;
  showLabel?: boolean;
  className?: string;
}

export function CapacityProgress({
  used,
  total,
  showLabel = true,
  className,
}: CapacityProgressProps) {
  const percentage = calculateCapacityPercentage(used, total);
  
  // Color based on usage percentage
  const getColor = (p: number) => {
    if (p <= 60) return 'bg-green-500';
    if (p <= 80) return 'bg-orange-500';
    return 'bg-red-500';
  };

  return (
    <div className={cn('space-y-2', className)}>
      <div className="flex items-center justify-between">
        {showLabel && (
          <span className="text-sm text-slate-600">
            {formatCapacity(used)} / {formatCapacity(total)}
          </span>
        )}
        <span className="text-sm font-semibold text-slate-900">{percentage}%</span>
      </div>
      <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all ${getColor(percentage)}`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
}
