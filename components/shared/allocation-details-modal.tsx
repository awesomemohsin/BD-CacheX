'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Allocation } from '@/lib/types';
import { formatDateString, formatCapacity } from '@/lib/utils';
import { StatusBadge } from './status-badge';
import { Database, Calendar, User, Info, Building2, Server, Zap } from 'lucide-react';

interface AllocationDetailsModalProps {
  open: boolean;
  allocation: Allocation | null;
  onClose: () => void;
}

export function AllocationDetailsModal({
  open,
  allocation,
  onClose,
}: AllocationDetailsModalProps) {
  if (!allocation) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-semibold bg-blue-100 text-blue-800 px-2.5 py-1 rounded-full">
              Distribution ID: {allocation.id.substring(0, 6)}
            </span>
            <StatusBadge status={allocation.status} />
          </div>
          <DialogTitle className="text-xl font-bold text-slate-900 mt-2">
            Allocation Details
          </DialogTitle>
          <DialogDescription className="text-slate-500 text-sm">
            Detailed view of this cache capacity allocation
          </DialogDescription>
        </DialogHeader>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg border border-slate-100 text-xs">
            <Building2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-[10px] text-slate-400 font-semibold uppercase">Company</p>
              <p className="font-medium text-slate-800 mt-0.5">{allocation.companyName}</p>
              <p className="text-[10px] text-slate-500 mt-0.5 bg-slate-200/50 px-1.5 py-0.5 rounded-full w-fit font-bold uppercase">{allocation.companyType}</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg border border-slate-100 text-xs">
            <Database className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-[10px] text-slate-400 font-semibold uppercase">Allocated Capacity</p>
              <p className="text-sm font-bold text-slate-800 mt-0.5">{formatCapacity(allocation.capacityGB)}</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg border border-slate-100 text-xs">
            <Zap className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-[10px] text-slate-400 font-semibold uppercase">Cache Provider</p>
              <p className="font-medium text-slate-800 mt-0.5">{allocation.cacheProviderName}</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg border border-slate-100 text-xs">
            <Server className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-[10px] text-slate-400 font-semibold uppercase">Host Server</p>
              <p className="font-medium text-slate-800 mt-0.5 leading-relaxed">{allocation.serverName}</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg border border-slate-100 text-xs">
            <Calendar className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-[10px] text-slate-400 font-semibold uppercase">Go Live Date</p>
              <p className="font-medium text-slate-800 mt-0.5">{formatDateString(allocation.goLiveDate)}</p>
            </div>
          </div>
        </div>

        {/* Notes (if any) */}
        {allocation.notes && (
          <div className="mt-4 p-3 bg-slate-50 rounded-lg border border-slate-150 text-xs">
            <div className="flex items-center gap-1.5 text-slate-700 font-semibold mb-1">
              <Info className="w-3.5 h-3.5 text-slate-400" />
              <span>Notes</span>
            </div>
            <p className="text-slate-605 leading-relaxed break-words">{allocation.notes}</p>
          </div>
        )}

        {/* Audit Metadata */}
        <div className="mt-4 p-4 bg-slate-50/50 rounded-xl border border-slate-200/50 text-xs text-slate-500 space-y-2">
          <div className="flex flex-col sm:flex-row sm:justify-between gap-2">
            <div className="flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-slate-400" />
              <span>Allocated by: <strong className="text-slate-700 font-medium">{allocation.createdBy || 'system@bdcache.com'}</strong></span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              <span>Allocated at: <strong className="text-slate-700 font-medium">{formatDateString(allocation.createdAt)}</strong></span>
            </div>
          </div>
          {allocation.updatedBy && (
            <div className="flex flex-col sm:flex-row sm:justify-between gap-2 pt-1 border-t border-slate-100">
              <div className="flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-slate-400" />
                <span>Last updated by: <strong className="text-slate-700 font-medium">{allocation.updatedBy}</strong></span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                <span>Last updated at: <strong className="text-slate-700 font-medium">{formatDateString(allocation.updatedAt)}</strong></span>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
