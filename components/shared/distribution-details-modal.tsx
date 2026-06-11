'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Distribution } from '@/lib/types';
import { formatDateString, formatCapacity } from '@/lib/utils';
import { StatusBadge } from './status-badge';
import { Database, Calendar, User, Info, Building2, Server, Zap } from 'lucide-react';

interface DistributionDetailsModalProps {
  open: boolean;
  distribution: Distribution | null;
  onClose: () => void;
  onDelete?: (distribution: Distribution) => void;
}

export function DistributionDetailsModal({
  open,
  distribution,
  onClose,
  onDelete,
}: DistributionDetailsModalProps) {
  if (!distribution) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-semibold bg-blue-100 text-blue-800 px-2.5 py-1 rounded-full">
              Distribution ID: {distribution.id.substring(0, 6)}
            </span>
            <StatusBadge status={distribution.status} />
          </div>
          <DialogTitle className="text-xl font-bold text-slate-900 mt-2">
            Distribution Details
          </DialogTitle>
          <DialogDescription className="text-slate-500 text-sm">
            Detailed view of this cache capacity distribution
          </DialogDescription>
        </DialogHeader>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg border border-slate-100 text-xs">
            <Building2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-[10px] text-slate-400 font-semibold uppercase">Company</p>
              <p className="font-medium text-slate-800 mt-0.5">{distribution.companyName}</p>
              <p className="text-[10px] text-slate-500 mt-0.5 bg-slate-200/50 px-1.5 py-0.5 rounded-full w-fit font-bold uppercase">{distribution.companyType}</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg border border-slate-100 text-xs">
            <Database className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-[10px] text-slate-400 font-semibold uppercase">Distributed Capacity</p>
              <p className="text-sm font-bold text-slate-800 mt-0.5">{formatCapacity(distribution.capacityGB)}</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg border border-slate-100 text-xs">
            <Zap className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-[10px] text-slate-400 font-semibold uppercase">Cache Provider</p>
              <p className="font-medium text-slate-800 mt-0.5">{distribution.cacheProviderName}</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg border border-slate-100 text-xs">
            <Server className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-[10px] text-slate-400 font-semibold uppercase">Host Server</p>
              <p className="font-medium text-slate-800 mt-0.5 leading-relaxed">{distribution.serverName}</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg border border-slate-100 text-xs">
            <Calendar className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-[10px] text-slate-400 font-semibold uppercase">Go Live Date</p>
              <p className="font-medium text-slate-800 mt-0.5">{formatDateString(distribution.goLiveDate)}</p>
            </div>
          </div>
        </div>

        {/* Notes (if any) */}
        {distribution.notes && (
          <div className="mt-4 p-3 bg-slate-50 rounded-lg border border-slate-150 text-xs">
            <div className="flex items-center gap-1.5 text-slate-700 font-semibold mb-1">
              <Info className="w-3.5 h-3.5 text-slate-400" />
              <span>Notes</span>
            </div>
            <p className="text-slate-605 leading-relaxed break-words">{distribution.notes}</p>
          </div>
        )}

        {/* Audit Metadata */}
        <div className="mt-4 p-4 bg-slate-50/50 rounded-xl border border-slate-200/50 text-xs text-slate-500 space-y-2">
          <div className="flex flex-col sm:flex-row sm:justify-between gap-2">
            <div className="flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-slate-400" />
              <span>Distributed by: <strong className="text-slate-700 font-medium">{distribution.createdBy || 'system@bdcache.com'}</strong></span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              <span>Distributed at: <strong className="text-slate-700 font-medium">{formatDateString(distribution.createdAt)}</strong></span>
            </div>
          </div>
          {distribution.updatedBy && (
            <div className="flex flex-col sm:flex-row sm:justify-between gap-2 pt-1 border-t border-slate-100">
              <div className="flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-slate-400" />
                <span>Last updated by: <strong className="text-slate-700 font-medium">{distribution.updatedBy}</strong></span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                <span>Last updated at: <strong className="text-slate-700 font-medium">{formatDateString(distribution.updatedAt)}</strong></span>
              </div>
            </div>
          )}
        </div>
        {onDelete && (
          <div className="mt-6 flex justify-end gap-3 border-t border-slate-100 pt-4 shrink-0">
            <button
              onClick={() => onDelete(distribution)}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl text-xs flex items-center justify-center cursor-pointer transition-colors"
            >
              Delete Distribution
            </button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
