'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Server, Allocation } from '@/lib/types';
import useSWR from 'swr';
import { fetcher } from '@/lib/api-client';
import { formatDateString, formatCapacity } from '@/lib/utils';
import { StatusBadge } from './status-badge';
import { Database, Calendar, User, Info, Building2, HardDrive, MapPin, Hash } from 'lucide-react';

interface ServerDetailsModalProps {
  open: boolean;
  server: Server | null;
  onClose: () => void;
}

export function ServerDetailsModal({
  open,
  server,
  onClose,
}: ServerDetailsModalProps) {
  const { data: allocations = [] } = useSWR<Allocation[]>('/api/allocations', fetcher);

  if (!server) return null;

  const serverAllocations = allocations.filter((a) => a.serverId === server.id);

  const totalCap = server.totalCapacityGB ?? 0;
  const usedCap = server.usedCapacityGB ?? 0;
  const freeCap = Math.max(0, totalCap - usedCap);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-3xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-semibold bg-indigo-100 text-indigo-800 px-2.5 py-1 rounded-full">
              {server.brand} - {server.model}
            </span>
            <StatusBadge status={server.status} />
          </div>
          <DialogTitle className="text-xl font-bold text-slate-900 mt-2">
            {server.name}
          </DialogTitle>
          <DialogDescription className="text-slate-500 text-sm">
            IP Address: <span className="font-mono bg-slate-100 px-1.5 py-0.5 rounded text-slate-700 font-medium">{server.ipAddress}</span>
          </DialogDescription>
        </DialogHeader>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg border border-slate-100 text-xs">
            <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
            <div>
              <p className="text-[10px] text-slate-400 font-semibold uppercase">Location</p>
              <p className="font-medium text-slate-800 mt-0.5">{server.location}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg border border-slate-100 text-xs">
            <Hash className="w-4 h-4 text-slate-400 shrink-0" />
            <div>
              <p className="text-[10px] text-slate-400 font-semibold uppercase">Rack Number</p>
              <p className="font-medium text-slate-800 mt-0.5">{server.rackNumber || '-'}</p>
            </div>
          </div>
        </div>

        {/* Capacity Box */}
        <div className="mt-4 p-4 rounded-xl bg-slate-50 border border-slate-200">
          <div className="flex items-center gap-2 text-slate-800 font-semibold text-sm mb-3">
            <Database className="w-4 h-4 text-blue-600" />
            <span>Capacity details</span>
          </div>
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="p-2.5 bg-white rounded-lg border border-slate-100">
              <p className="text-[10px] text-slate-500 uppercase font-semibold">Total Capacity</p>
              <p className="text-sm font-bold text-slate-800 mt-1">{formatCapacity(totalCap)}</p>
            </div>
            <div className="p-2.5 bg-white rounded-lg border border-slate-100">
              <p className="text-[10px] text-slate-500 uppercase font-semibold">Allocated (Used)</p>
              <p className="text-sm font-bold text-red-650 mt-1">{formatCapacity(usedCap)}</p>
            </div>
            <div className="p-2.5 bg-white rounded-lg border border-slate-100">
              <p className="text-[10px] text-slate-500 uppercase font-semibold">Remaining (Free)</p>
              <p className="text-sm font-bold text-green-600 mt-1">{formatCapacity(freeCap)}</p>
            </div>
          </div>
        </div>

        {/* Notes (if any) */}
        {server.notes && (
          <div className="mt-4 p-3 bg-slate-50 rounded-lg border border-slate-150 text-xs">
            <div className="flex items-center gap-1.5 text-slate-700 font-semibold mb-1">
              <Info className="w-3.5 h-3.5 text-slate-400" />
              <span>Admin Notes</span>
            </div>
            <p className="text-slate-600 leading-relaxed">{server.notes}</p>
          </div>
        )}

        {/* Audit Metadata */}
        <div className="mt-4 p-4 bg-slate-50/50 rounded-xl border border-slate-200/50 text-xs text-slate-500 space-y-2">
          <div className="flex flex-col sm:flex-row sm:justify-between gap-2">
            <div className="flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-slate-400" />
              <span>Created by: <strong className="text-slate-700 font-medium">{server.createdBy || 'system@bdcache.com'}</strong></span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              <span>Created at: <strong className="text-slate-700 font-medium">{formatDateString(server.createdAt)}</strong></span>
            </div>
          </div>
          {server.updatedBy && (
            <div className="flex flex-col sm:flex-row sm:justify-between gap-2 pt-1 border-t border-slate-100">
              <div className="flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-slate-400" />
                <span>Last updated by: <strong className="text-slate-700 font-medium">{server.updatedBy}</strong></span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                <span>Last updated at: <strong className="text-slate-700 font-medium">{formatDateString(server.updatedAt)}</strong></span>
              </div>
            </div>
          )}
        </div>

        {/* Allocations Table */}
        <div className="mt-6">
          <h4 className="text-sm font-semibold text-slate-800 mb-3 flex items-center gap-1.5">
            <Building2 className="w-4 h-4 text-slate-500" />
            <span>Active Distributions Hosted ({serverAllocations.length})</span>
          </h4>
          {serverAllocations.length === 0 ? (
            <div className="text-center py-8 text-xs text-slate-500 bg-slate-50/50 border border-dashed border-slate-200 rounded-lg flex flex-col items-center justify-center gap-1">
              <Info className="w-4 h-4 text-slate-400" />
              <span>No distributions currently mapped to this server.</span>
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
                    <th className="px-4 py-2.5">Cache Provider</th>
                    <th className="px-4 py-2.5">Go Live</th>
                    <th className="px-4 py-2.5">Created By</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {serverAllocations.map((alloc) => (
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
                      <td className="px-4 py-2.5 text-slate-655 font-medium truncate max-w-[120px]">{alloc.cacheProviderName}</td>
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
