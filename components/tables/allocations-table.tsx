'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { StatusBadge } from '@/components/shared/status-badge';
import { ConfirmDeleteDialog } from '@/components/shared/confirm-delete-dialog';
import { EmptyState } from '@/components/shared/empty-state';
import useSWR from 'swr';
import { fetcher } from '@/lib/api-client';
import { formatDateString, formatCapacity } from '@/lib/utils';
import { Edit2, Trash2, Eye, Search } from 'lucide-react';
import { Allocation } from '@/lib/types';
import { toast } from 'sonner';
import { useSearchParams } from 'next/navigation';
import { AllocationDetailsModal } from '@/components/shared/allocation-details-modal';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface AllocationsTableProps {
  isDashboard?: boolean;
}

export function AllocationsTable({ isDashboard = false }: AllocationsTableProps) {
  const searchParams = useSearchParams();
  const initialIdQuery = searchParams ? (searchParams.get('id') || '') : '';

  const [searchQuery, setSearchQuery] = useState(initialIdQuery);
  const [companyTypeFilter, setCompanyTypeFilter] = useState('all');
  const [providerFilter, setProviderFilter] = useState('all');
  const [serverFilter, setServerFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [deleteTarget, setDeleteTarget] = useState<Allocation | null>(null);
  const [viewTarget, setViewTarget] = useState<Allocation | null>(null);
  
  const { data: allocations = [], error, isLoading, mutate } = useSWR<Allocation[]>('/api/allocations', fetcher);
  
  const uniqueProviders = Array.from(
    new Set(
      allocations.map((a) =>
        JSON.stringify({ id: a.cacheProviderId, name: a.cacheProviderName })
      )
    )
  ).map((p) => JSON.parse(p)) as { id: string; name: string }[];

  const uniqueServers = Array.from(
    new Set(
      allocations.map((a) =>
        JSON.stringify({ id: a.serverId, name: a.serverName })
      )
    )
  ).map((s) => JSON.parse(s)) as { id: string; name: string }[];

  const filteredAllocations = allocations.filter((allocation) => {
    const matchesSearch =
      allocation.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      allocation.cacheProviderName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      allocation.serverName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      allocation.id.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCompanyType =
      companyTypeFilter === 'all' || allocation.companyType === companyTypeFilter;

    const matchesProvider =
      providerFilter === 'all' || allocation.cacheProviderId === providerFilter;

    const matchesServer =
      serverFilter === 'all' || allocation.serverId === serverFilter;

    const matchesStatus =
      statusFilter === 'all' || allocation.status === statusFilter;

    return (
      matchesSearch &&
      matchesCompanyType &&
      matchesProvider &&
      matchesServer &&
      matchesStatus
    );
  });

  const handleDelete = (allocation: Allocation) => {
    setDeleteTarget(allocation);
  };

  const handleConfirmDelete = async () => {
    if (!deleteTarget) return;
    try {
      const res = await fetch(`/api/allocations/${deleteTarget.id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success) {
        toast.success('Distribution deleted successfully');
        mutate();
        // Recalculate server capacities by reloading servers cache
        import('swr').then(({ mutate: globalMutate }) => {
          globalMutate('/api/servers');
        });
      } else {
        toast.error(data.error || 'Failed to delete distribution');
      }
    } catch (err) {
      toast.error('Failed to delete distribution');
    } finally {
      setDeleteTarget(null);
    }
  };

  return (
    <div>
      {/* Search Bar */}
      {!isDashboard && (
        <div className="p-6 border-b border-slate-200">
          <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                placeholder="Search by company, provider, server, or ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-slate-50"
              />
            </div>
            <div className="flex flex-wrap gap-3">
              <div className="w-[155px]">
                <Select value={companyTypeFilter} onValueChange={(value) => setCompanyTypeFilter(value || 'all')}>
                  <SelectTrigger className="bg-slate-50">
                    <span className="text-slate-400 mr-1 font-medium">Type:</span>
                    <SelectValue placeholder="All" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="ISP">ISP</SelectItem>
                    <SelectItem value="IIG">IIG</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="w-[185px]">
                <Select value={providerFilter} onValueChange={(value) => setProviderFilter(value || 'all')}>
                  <SelectTrigger className="bg-slate-50">
                    <span className="text-slate-400 mr-1 font-medium">Provider:</span>
                    <SelectValue placeholder="All">
                      {(val) => {
                        if (val === 'all') return 'All';
                        const p = uniqueProviders.find((cp) => cp.id === val);
                        return p ? p.name : val;
                      }}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    {uniqueProviders.map((p) => (
                      <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="w-[185px]">
                <Select value={serverFilter} onValueChange={(value) => setServerFilter(value || 'all')}>
                  <SelectTrigger className="bg-slate-50">
                    <span className="text-slate-400 mr-1 font-medium">Server:</span>
                    <SelectValue placeholder="All">
                      {(val) => {
                        if (val === 'all') return 'All';
                        const s = uniqueServers.find((srv) => srv.id === val);
                        return s ? s.name : val;
                      }}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    {uniqueServers.map((s) => (
                      <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="w-[170px]">
                <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value || 'all')}>
                  <SelectTrigger className="bg-slate-50">
                    <span className="text-slate-400 mr-1 font-medium">Status:</span>
                    <SelectValue placeholder="All" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Table */}
      {isLoading ? (
        <div className="p-8 text-center text-slate-500">Loading distributions...</div>
      ) : filteredAllocations.length === 0 ? (
        <div className="p-6">
          <EmptyState
            icon={Eye}
            title={searchQuery ? 'No distributions found' : 'No distributions yet'}
            description={
              searchQuery
                ? 'Try adjusting your search criteria'
                : 'Start by creating a new distribution'
            }
          />
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/75 text-xs font-semibold uppercase tracking-wider text-slate-500">
                <th className="px-6 py-4">Distribution ID</th>
                <th className="px-6 py-4">Company</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4">Cache Provider</th>
                <th className="px-6 py-4">Server</th>
                <th className="px-6 py-4">Capacity</th>
                <th className="px-6 py-4">Go Live Date</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {filteredAllocations.map((allocation) => (
                <tr key={allocation.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 font-mono text-xs text-slate-500 font-semibold" title={allocation.id}>
                    {allocation.id.substring(0, 6)}
                  </td>
                  <td className="px-6 py-4 font-semibold text-slate-800">
                    {allocation.companyName}
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs font-medium bg-slate-100 text-slate-700 px-2.5 py-1 rounded-full">
                      {allocation.companyType}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-650">{allocation.cacheProviderName}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{allocation.serverName}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-slate-700">
                    {formatCapacity(allocation.capacityGB)}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500">
                    {formatDateString(allocation.goLiveDate)}
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={allocation.status} />
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-1">
                      <button 
                        className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-slate-50 rounded-lg transition-all"
                        onClick={() => setViewTarget(allocation)}
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-slate-50 rounded-lg transition-all">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        className="p-1.5 text-slate-400 hover:text-red-650 hover:bg-slate-50 rounded-lg transition-all"
                        onClick={() => handleDelete(allocation)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <ConfirmDeleteDialog
        open={!!deleteTarget}
        title="Delete Distribution"
        description="Are you sure you want to delete this distribution? This action cannot be undone."
        itemName={deleteTarget?.id}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />
      {/* View Details Modal */}
      <AllocationDetailsModal
        open={!!viewTarget}
        allocation={viewTarget}
        onClose={() => setViewTarget(null)}
      />
    </div>
  );
}
