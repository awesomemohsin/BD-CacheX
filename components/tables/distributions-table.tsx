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
import { Distribution, Company, CacheProvider, Server } from '@/lib/types';
import { toast } from 'sonner';
import { useSearchParams } from 'next/navigation';
import { DistributionDetailsModal } from '@/components/shared/distribution-details-modal';
import { CompanyDetailsModal } from '@/components/shared/company-details-modal';
import { CacheProviderDetailsModal } from '@/components/shared/cache-provider-details-modal';
import { ServerDetailsModal } from '@/components/shared/server-details-modal';
import { DistributionModal } from '@/components/shared/distribution-modal';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface DistributionsTableProps {
  isDashboard?: boolean;
}

export function DistributionsTable({ isDashboard = false }: DistributionsTableProps) {
  const searchParams = useSearchParams();
  const initialIdQuery = searchParams ? (searchParams.get('id') || '') : '';

  const [searchQuery, setSearchQuery] = useState(initialIdQuery);
  const [companyTypeFilter, setCompanyTypeFilter] = useState('all');
  const [providerFilter, setProviderFilter] = useState('all');
  const [serverFilter, setServerFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [deleteTarget, setDeleteTarget] = useState<Distribution | null>(null);
  const [viewTarget, setViewTarget] = useState<Distribution | null>(null);
  const [editTarget, setEditTarget] = useState<Distribution | null>(null);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [selectedProvider, setSelectedProvider] = useState<CacheProvider | null>(null);
  const [selectedServer, setSelectedServer] = useState<Server | null>(null);
  
  const { data: distributions = [], error, isLoading, mutate } = useSWR<Distribution[]>('/api/distributions', fetcher);
  
  const uniqueProviders = Array.from(
    new Set(
      distributions.map((d) =>
        JSON.stringify({ id: d.cacheProviderId, name: d.cacheProviderName })
      )
    )
  ).map((p) => JSON.parse(p)) as { id: string; name: string }[];

  const uniqueServers = Array.from(
    new Set(
      distributions.map((d) =>
        JSON.stringify({ id: d.serverId, name: d.serverName })
      )
    )
  ).map((s) => JSON.parse(s)) as { id: string; name: string }[];

  const filteredDistributions = distributions.filter((distribution) => {
    const matchesSearch =
      distribution.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      distribution.cacheProviderName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      distribution.serverName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      distribution.id.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCompanyType =
      companyTypeFilter === 'all' || distribution.companyType === companyTypeFilter;

    const matchesProvider =
      providerFilter === 'all' || distribution.cacheProviderId === providerFilter;

    const matchesServer =
      serverFilter === 'all' || distribution.serverId === serverFilter;

    const matchesStatus =
      statusFilter === 'all' || distribution.status === statusFilter;

    return (
      matchesSearch &&
      matchesCompanyType &&
      matchesProvider &&
      matchesServer &&
      matchesStatus
    );
  });

  const handleDelete = (distribution: Distribution) => {
    setDeleteTarget(distribution);
  };

  const handleConfirmDelete = async () => {
    if (!deleteTarget) return;
    try {
      const res = await fetch(`/api/distributions/${deleteTarget.id}`, {
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
      setViewTarget(null);
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
      ) : filteredDistributions.length === 0 ? (
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
              {filteredDistributions.map((distribution) => (
                <tr key={distribution.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 font-mono text-xs text-slate-500 font-semibold" title={distribution.id}>
                    {distribution.id.substring(0, 6)}
                  </td>
                  <td className="px-6 py-4 font-semibold text-slate-800">
                    {distribution.company ? (
                      <span 
                        onClick={() => setSelectedCompany(distribution.company!)} 
                        className="hover:underline cursor-pointer text-blue-600 hover:text-blue-800"
                      >
                        {distribution.companyName}
                      </span>
                    ) : (
                      distribution.companyName
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs font-medium bg-slate-100 text-slate-700 px-2.5 py-1 rounded-full">
                      {distribution.companyType}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-650 font-medium">
                    {distribution.cacheProvider ? (
                      <span
                        onClick={() => setSelectedProvider(distribution.cacheProvider!)}
                        className="hover:underline cursor-pointer text-blue-600 hover:text-blue-800"
                      >
                        {distribution.cacheProviderName}
                      </span>
                    ) : (
                      distribution.cacheProviderName
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600 font-medium">
                    {distribution.server ? (
                      <span
                        onClick={() => setSelectedServer(distribution.server!)}
                        className="hover:underline cursor-pointer text-blue-600 hover:text-blue-800"
                      >
                        {distribution.serverName}
                      </span>
                    ) : (
                      distribution.serverName
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold text-slate-700">
                    {formatCapacity(distribution.capacityGB)}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500">
                    {formatDateString(distribution.goLiveDate)}
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={distribution.status} />
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-1">
                      <button 
                        className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-slate-50 rounded-lg transition-all"
                        onClick={() => setViewTarget(distribution)}
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button 
                        className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-slate-50 rounded-lg transition-all"
                        onClick={() => setEditTarget(distribution)}
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        className="p-1.5 text-slate-400 hover:text-red-650 hover:bg-slate-50 rounded-lg transition-all"
                        onClick={() => setViewTarget(distribution)}
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
      <DistributionDetailsModal
        open={!!viewTarget}
        distribution={viewTarget}
        onClose={() => setViewTarget(null)}
        onDelete={handleDelete}
      />
      {/* Edit Details Modal */}
      <DistributionModal
        open={!!editTarget}
        distribution={editTarget}
        onClose={() => setEditTarget(null)}
      />
      {/* View Company Details Modal */}
      <CompanyDetailsModal
        open={!!selectedCompany}
        company={selectedCompany}
        onClose={() => setSelectedCompany(null)}
      />
      {/* View Cache Provider Details Modal */}
      <CacheProviderDetailsModal
        open={!!selectedProvider}
        provider={selectedProvider}
        onClose={() => setSelectedProvider(null)}
      />
      {/* View Server Details Modal */}
      <ServerDetailsModal
        open={!!selectedServer}
        server={selectedServer}
        onClose={() => setSelectedServer(null)}
      />
    </div>
  );
}
