'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Company, Allocation } from '@/lib/types';
import useSWR from 'swr';
import { fetcher } from '@/lib/api-client';
import { formatDateString, formatCapacity } from '@/lib/utils';
import { StatusBadge } from './status-badge';
import { Calendar, User, Info, Building2, Mail, MapPin } from 'lucide-react';

interface CompanyDetailsModalProps {
  open: boolean;
  company: Company | null;
  onClose: () => void;
}

export function CompanyDetailsModal({
  open,
  company,
  onClose,
}: CompanyDetailsModalProps) {
  const { data: allocations = [] } = useSWR<Allocation[]>('/api/allocations', fetcher);

  if (!company) return null;

  const companyAllocations = allocations.filter((a) => a.companyId === company.id);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-3xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-semibold bg-blue-100 text-blue-800 px-2.5 py-1 rounded-full uppercase">
              {company.type}
            </span>
            <StatusBadge status={company.status} />
          </div>
          <DialogTitle className="text-xl font-bold text-slate-900 mt-2">
            {company.name}
          </DialogTitle>
          <DialogDescription className="text-slate-505 text-sm flex items-center gap-1.5 mt-1">
            <Mail className="w-3.5 h-3.5 text-slate-400" />
            <a href={`mailto:${company.email}`} className="text-blue-600 hover:underline">{company.email}</a>
          </DialogDescription>
        </DialogHeader>

        {/* Info Grid */}
        <div className="grid grid-cols-1 gap-4 mt-2">
          {company.address && (
            <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg border border-slate-100 text-xs">
              <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-[10px] text-slate-400 font-semibold uppercase">Address</p>
                <p className="font-medium text-slate-805 mt-0.5 leading-relaxed">{company.address}</p>
              </div>
            </div>
          )}
        </div>

        {/* Audit Metadata */}
        <div className="mt-4 p-4 bg-slate-50/50 rounded-xl border border-slate-200/50 text-xs text-slate-500 space-y-2">
          <div className="flex flex-col sm:flex-row sm:justify-between gap-2">
            <div className="flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-slate-400" />
              <span>Created by: <strong className="text-slate-700 font-medium">{company.createdBy || 'system@bdcache.com'}</strong></span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              <span>Created at: <strong className="text-slate-700 font-medium">{formatDateString(company.createdAt)}</strong></span>
            </div>
          </div>
          {company.updatedBy && (
            <div className="flex flex-col sm:flex-row sm:justify-between gap-2 pt-1 border-t border-slate-100">
              <div className="flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-slate-400" />
                <span>Last updated by: <strong className="text-slate-700 font-medium">{company.updatedBy}</strong></span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                <span>Last updated at: <strong className="text-slate-700 font-medium">{formatDateString(company.updatedAt)}</strong></span>
              </div>
            </div>
          )}
        </div>

        {/* Allocations Table */}
        <div className="mt-6">
          <h4 className="text-sm font-semibold text-slate-800 mb-3 flex items-center gap-1.5">
            <Building2 className="w-4 h-4 text-slate-500" />
            <span>Active Distributions ({companyAllocations.length})</span>
          </h4>
          {companyAllocations.length === 0 ? (
            <div className="text-center py-8 text-xs text-slate-505 bg-slate-50/50 border border-dashed border-slate-200 rounded-lg flex flex-col items-center justify-center gap-1">
              <Info className="w-4 h-4 text-slate-400" />
              <span>No active distributions mapped to this company.</span>
            </div>
          ) : (
            <div className="border border-slate-200 rounded-lg overflow-hidden text-xs">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider font-semibold text-[10px]">
                    <th className="px-4 py-2.5">Distribution ID</th>
                    <th className="px-4 py-2.5">Capacity</th>
                    <th className="px-4 py-2.5">Cache Provider</th>
                    <th className="px-4 py-2.5">Server</th>
                    <th className="px-4 py-2.5">Go Live</th>
                    <th className="px-4 py-2.5">Created By</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {companyAllocations.map((alloc) => (
                    <tr key={alloc.id} className="hover:bg-slate-50/50">
                      <td className="px-4 py-2.5">
                        <a
                          href={`/dashboard/allocations?id=${alloc.id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline hover:text-blue-700 font-mono font-medium"
                        >
                          {alloc.id.substring(0, 8)}...
                        </a>
                      </td>
                      <td className="px-4 py-2.5 font-semibold text-slate-700">{formatCapacity(alloc.capacityGB)}</td>
                      <td className="px-4 py-2.5 text-slate-650 font-medium">{alloc.cacheProviderName}</td>
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
