import { Badge } from '@/components/ui/badge';
import { STATUS_COLORS } from '@/lib/constants';
import { StatusType } from '@/lib/types';

interface StatusBadgeProps {
  status: StatusType;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const colors = STATUS_COLORS[status];

  return (
    <Badge className={`${colors.bg} ${colors.text} border-0`}>
      <span className={`w-2 h-2 rounded-full ${colors.dot} mr-2 inline-block`}></span>
      {status}
    </Badge>
  );
}
