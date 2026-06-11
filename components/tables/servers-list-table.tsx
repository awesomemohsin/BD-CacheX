'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { StatusBadge } from '@/components/shared/status-badge';
import { CapacityProgress } from '@/components/shared/capacity-progress';
import { ConfirmDeleteDialog } from '@/components/shared/confirm-delete-dialog';
import { EmptyState } from '@/components/shared/empty-state';
import useSWR from 'swr';
import { fetcher } from '@/lib/api-client';
import { formatCapacity } from '@/lib/utils';
import { Edit2, Trash2, Eye, Search } from 'lucide-react';
import { Server } from '@/lib/types';
import { toast } from 'sonner';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface ServersListTableProps {
  onEdit: (server: Server) => void;
}

export function ServersListTable({ onEdit }: ServersListTableProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [brandFilter, setBrandFilter] = useState('all');
  const [modelFilter, setModelFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [deleteTarget, setDeleteTarget] = useState<Server | null>(null);
  
  const { data: servers = [], error, isLoading, mutate } = useSWR<Server[]>('/api/servers', fetcher);
  
  const uniqueBrands = Array.from(
    new Set(servers.map((s) => s.brand).filter(Boolean))
  );

  const uniqueModels = Array.from(
    new Set(
      servers
        .filter((s) => brandFilter === 'all' || s.brand === brandFilter)
        .map((s) => s.model)
        .filter(Boolean)
    )
  );

  const handleBrandChange = (value: string) => {
    setBrandFilter(value);
    setModelFilter('all');
  };

  const filteredServers = servers.filter((server) => {
    const matchesSearch =
      server.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      server.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      server.ipAddress.toLowerCase().includes(searchQuery.toLowerCase()) ||
      server.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      server.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (server.rackNumber && server.rackNumber.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesBrand = brandFilter === 'all' || server.brand === brandFilter;
    const matchesModel = modelFilter === 'all' || server.model === modelFilter;
    const matchesStatus = statusFilter === 'all' || server.status === statusFilter;

    return matchesSearch && matchesBrand && matchesModel && matchesStatus;
  });

  const handleDelete = (server: Server) => {
    setDeleteTarget(server);
  };

  const handleConfirmDelete = async () => {
    if (!deleteTarget) return;
    try {
      const res = await fetch(`/api/servers/${deleteTarget.id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success) {
        toast.success('Server deleted successfully');
        mutate();
        // Trigger reload on allocations since deleting server can affect allocation lookup
        import('swr').then(({ mutate: globalMutate }) => {
          globalMutate('/api/allocations');
        });
      } else {
        toast.error(data.error || 'Failed to delete server');
      }
    } catch (err) {
      toast.error('Failed to delete server');
    } finally {
      setDeleteTarget(null);
    }
  };

  return (
    <div>
      {/* Search Bar */}
      <div className="p-6 border-b border-slate-200">
        <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              placeholder="Search by name, location, brand, model, IP or rack..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-slate-50"
            />
          </div>
          <div className="flex flex-wrap gap-3">
            <div className="w-[140px]">
              <Select value={brandFilter} onValueChange={handleBrandChange}>
                <SelectTrigger className="bg-slate-50">
                  <SelectValue placeholder="All Brands" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Brands</SelectItem>
                  {uniqueBrands.map((b) => (
                    <SelectItem key={b} value={b}>{b}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="w-[140px]">
              <Select value={modelFilter} onValueChange={setModelFilter}>
                <SelectTrigger className="bg-slate-50">
                  <SelectValue placeholder="All Models" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Models</SelectItem>
                  {uniqueModels.map((m) => (
                    <SelectItem key={m} value={m}>{m}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="w-[140px]">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="bg-slate-50">
                  <SelectValue placeholder="All Statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
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
        <div className="p-8 text-center text-slate-500">Loading servers...</div>
      ) : filteredServers.length === 0 ? (
        <div className="p-6">
          <EmptyState
            icon={Eye}
            title={searchQuery ? 'No servers found' : 'No servers yet'}
            description={
              searchQuery
                ? 'Try adjusting your search criteria'
                : 'Start by adding a new server'
            }
          />
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/75 text-xs font-semibold uppercase tracking-wider text-slate-500">
                <th className="px-6 py-4">Server Name</th>
                <th className="px-6 py-4">Model</th>
                <th className="px-6 py-4">Brand</th>
                <th className="px-6 py-4">Location</th>
                <th className="px-6 py-4">IP Address</th>
                <th className="px-6 py-4">Total Capacity</th>
                <th className="px-6 py-4">Utilization</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {filteredServers.map((server) => (
                <tr key={server.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 font-semibold text-slate-800">{server.name}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{server.model}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{server.brand}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{server.location}</td>
                  <td className="px-6 py-4 font-mono text-sm text-slate-500">
                    {server.ipAddress}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-700 font-medium">
                    {formatCapacity(server.totalCapacityGB)}
                  </td>
                  <td className="px-6 py-4 max-w-sm">
                    <CapacityProgress
                      used={server.usedCapacityGB}
                      total={server.totalCapacityGB}
                      showLabel={true}
                    />
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={server.status} />
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-1">
                      <button className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-slate-50 rounded-lg transition-all">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-slate-50 rounded-lg transition-all"
                        onClick={() => onEdit(server)}
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        className="p-1.5 text-slate-400 hover:text-red-650 hover:bg-slate-50 rounded-lg transition-all"
                        onClick={() => handleDelete(server)}
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
        title="Delete Server"
        description="Are you sure you want to delete this server? This action cannot be undone."
        itemName={deleteTarget?.name}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
