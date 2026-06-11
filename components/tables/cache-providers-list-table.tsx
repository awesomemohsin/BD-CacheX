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
import { CacheProvider } from '@/lib/types';
import { toast } from 'sonner';
import { CacheProviderDetailsModal } from '@/components/shared/cache-provider-details-modal';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface CacheProvidersListTableProps {
  onEdit: (provider: CacheProvider) => void;
}

export function CacheProvidersListTable({ onEdit }: CacheProvidersListTableProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [deleteTarget, setDeleteTarget] = useState<CacheProvider | null>(null);
  const [viewTarget, setViewTarget] = useState<CacheProvider | null>(null);
  
  const { data: providers = [], error, isLoading, mutate } = useSWR<CacheProvider[]>('/api/cache-providers', fetcher);
  
  const filteredProviders = providers.filter((provider) => {
    const matchesSearch =
      provider.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      provider.shortCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (provider.description && provider.description.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesStatus =
      statusFilter === 'all' || provider.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const handleDelete = (provider: CacheProvider) => {
    setDeleteTarget(provider);
  };

  const handleConfirmDelete = async () => {
    if (!deleteTarget) return;
    try {
      const res = await fetch(`/api/cache-providers/${deleteTarget.id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success) {
        toast.success('Cache provider deleted successfully');
        mutate();
        // Trigger reload on allocations since deleting CP can affect allocation lookup
        import('swr').then(({ mutate: globalMutate }) => {
          globalMutate('/api/allocations');
        });
      } else {
        toast.error(data.error || 'Failed to delete provider');
      }
    } catch (err) {
      toast.error('Failed to delete provider');
    } finally {
      setDeleteTarget(null);
    }
  };

  return (
    <div>
      {/* Search Bar */}
      <div className="p-6 border-b border-slate-200">
        <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              placeholder="Search by provider name, code, or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-slate-50"
            />
          </div>
          <div className="flex gap-3">
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

      {/* Table */}
      {isLoading ? (
        <div className="p-8 text-center text-slate-500">Loading cache providers...</div>
      ) : filteredProviders.length === 0 ? (
        <div className="p-6">
          <EmptyState
            icon={Eye}
            title={searchQuery ? 'No providers found' : 'No providers yet'}
            description={
              searchQuery
                ? 'Try adjusting your search criteria'
                : 'Start by adding a cache provider'
            }
          />
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/75 text-xs font-semibold uppercase tracking-wider text-slate-500">
                <th className="px-6 py-4">Provider Name</th>
                <th className="px-6 py-4">Short Code</th>
                <th className="px-6 py-4 text-center">Server Qty</th>
                <th className="px-6 py-4 text-right">Capacity</th>
                <th className="px-6 py-4">Description</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Created</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {filteredProviders.map((provider) => (
                <tr key={provider.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 font-semibold text-slate-800">
                    {provider.shortCode} - {provider.name}
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-mono text-xs font-medium bg-slate-100 text-slate-700 px-2.5 py-1 rounded-full">
                       {provider.shortCode}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-700 text-center font-medium">
                    <div className="font-semibold">Total: {provider.serverCount ?? 0}</div>
                    <div className="text-xs text-slate-500">Used: {provider.usedServerCount ?? 0}</div>
                    <div className="text-xs text-green-600 font-semibold">Free: {Math.max(0, (provider.serverCount ?? 0) - (provider.usedServerCount ?? 0))}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-700 text-right font-medium">
                    <div className="font-semibold">Total: {formatCapacity(provider.totalCapacity ?? 0)}</div>
                    <div className="text-xs text-slate-500">Used: {formatCapacity(provider.usedCapacity ?? 0)}</div>
                    <div className="text-xs text-green-600 font-semibold">Free: {formatCapacity(Math.max(0, (provider.totalCapacity ?? 0) - (provider.usedCapacity ?? 0)))}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">
                    {provider.description || '-'}
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={provider.status} />
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500">
                    {formatDateString(provider.createdAt)}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-1">
                      <button 
                        className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-slate-50 rounded-lg transition-all"
                        onClick={() => setViewTarget(provider)}
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-slate-50 rounded-lg transition-all"
                        onClick={() => onEdit(provider)}
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-slate-50 rounded-lg transition-all"
                        onClick={() => handleDelete(provider)}
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
        title="Delete Cache Provider"
        description="Are you sure you want to delete this cache provider? This action cannot be undone."
        itemName={deleteTarget?.name}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />
      {/* View Details Modal */}
      <CacheProviderDetailsModal
        open={!!viewTarget}
        provider={viewTarget}
        onClose={() => setViewTarget(null)}
      />
    </div>
  );
}
