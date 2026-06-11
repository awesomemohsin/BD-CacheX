'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { CacheProvider, Allocation } from '@/lib/types';
import useSWR from 'swr';
import { fetcher } from '@/lib/api-client';
import { formatDateString, formatCapacity } from '@/lib/utils';
import { StatusBadge } from './status-badge';
import { Database, Server, Calendar, User, Info, Building2 } from 'lucide-react';

interface CacheProviderDetailsModalProps {
  open: boolean;
  provider: CacheProvider | null;
  onClose: () => void;
}

export function CacheProviderDetailsModal({
  open,
  provider,
  onClose,
}: CacheProviderDetailsModalProps) {
  const { data: allocations = [] } = useSWR<Allocation[]>('/api/allocations', fetcher);

  if (!provider) return null;

  const cpAllocations = allocations.filter((a) => a.cacheProviderId === provider.id);

  const totalCap = provider.totalCapacity ?? 0;
  const usedCap = provider.usedCapacity ?? 0;
  const freeCap = Math.max(0, totalCap - usedCap);

  const totalSrv = provider.serverCount ?? 0;
  const usedSrv = provider.usedServerCount ?? 0;
  const freeSrv = Math.max(0, totalSrv - usedSrv);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-3xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-semibold bg-blue-100 text-blue-800 px-2.5 py-1 rounded-full uppercase">
              {provider.shortCode}
            </span>
            <StatusBadge status={provider.status} />
          </div>
          <DialogTitle className="text-xl font-bold text-slate-900 mt-2">
            {provider.name}
          </DialogTitle>
          <DialogDescription className="text-slate-500 text-sm">
            {provider.description || 'No description provided.'}
          </DialogDescription>
        </DialogHeader>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          {/* Capacity Box */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                <Database className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] text-slate-500 uppercase font-semibold">Capacity Used</p>
                <p className="text-lg font-bold text-slate-900 mt-0.5">{formatCapacity(totalCap)}</p>
              </div>
            </div>
          </div>

          {/* Servers Box */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                <Server className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] text-slate-500 uppercase font-semibold">Server Used</p>
                <p className="text-lg font-bold text-slate-900 mt-0.5">{totalSrv} pcs</p>
              </div>
            </div>
          </div>
        </div>

        {/* Audit Metadata */}
        <div className="mt-4 p-4 bg-slate-50/50 rounded-xl border border-slate-200/50 text-xs text-slate-500 space-y-2">
          <div className="flex flex-col sm:flex-row sm:justify-between gap-2">
            <div className="flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-slate-400" />
              <span>Created by: <strong className="text-slate-700 font-medium">{provider.createdBy || 'system@bdcache.com'}</strong></span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              <span>Created at: <strong className="text-slate-700 font-medium">{formatDateString(provider.createdAt)}</strong></span>
            </div>
          </div>
          {provider.updatedBy && (
            <div className="flex flex-col sm:flex-row sm:justify-between gap-2 pt-1 border-t border-slate-100">
              <div className="flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-slate-400" />
                <span>Last updated by: <strong className="text-slate-700 font-medium">{provider.updatedBy}</strong></span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                <span>Last updated at: <strong className="text-slate-700 font-medium">{formatDateString(provider.updatedAt)}</strong></span>
              </div>
            </div>
          )}
        </div>

        {/* Allocations Table */}
        <div className="mt-6">
          <h4 className="text-sm font-semibold text-slate-800 mb-3 flex items-center gap-1.5">
            <Building2 className="w-4 h-4 text-slate-500" />
            <span>Active Distributions ({cpAllocations.length})</span>
          </h4>
          {cpAllocations.length === 0 ? (
            <div className="text-center py-8 text-xs text-slate-500 bg-slate-50/50 border border-dashed border-slate-200 rounded-lg flex flex-col items-center justify-center gap-1">
              <Info className="w-4 h-4 text-slate-400" />
              <span>No active distributions mapped to this cache provider.</span>
            </div>
          ) : (
            <div className="border border-slate-200 rounded-lg overflow-hidden text-xs">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider font-semibold text-[10px]">
                    <th className="px-4 py-2.5">Distribution ID</th>
                    <th className="px-4 py-2.5">Company</th>
                    <th className="px-4 py-2.5">Type</th>
                    <th className="px-4 py-2.5">Capacity</th>
                    <th className="px-4 py-2.5">Server</th>
                    <th className="px-4 py-2.5">Go Live</th>
                    <th className="px-4 py-2.5">Created By</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {cpAllocations.map((alloc) => (
                    <tr key={alloc.id} className="hover:bg-slate-50/50">
                      <td className="px-4 py-2.5">
                        <a
                          href={`/dashboard/allocations?id=${alloc.id.substring(0, 6)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline hover:text-blue-700 font-mono font-medium"
                        >
                          {alloc.id.substring(0, 6)}
                        </a>
                      </td>
                      <td className="px-4 py-2.5 font-medium text-slate-800">{alloc.companyName}</td>
                      <td className="px-4 py-2.5 uppercase text-slate-500 text-[10px] font-bold">{alloc.companyType}</td>
                      <td className="px-4 py-2.5 font-semibold text-slate-700">{formatCapacity(alloc.capacityGB)}</td>
                      <td className="px-4 py-2.5 text-slate-600 truncate max-w-[120px]">{alloc.serverName}</td>
                      <td className="px-4 py-2.5 text-slate-500">{formatDateString(alloc.goLiveDate)}</td>
                      <td className="px-4 py-2.5 text-slate-500">{alloc.createdBy || 'system@bdcache.com'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
