'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { StatusBadge } from '@/components/shared/status-badge';
import { ConfirmDeleteDialog } from '@/components/shared/confirm-delete-dialog';
import { EmptyState } from '@/components/shared/empty-state';
import useSWR from 'swr';
import { fetcher } from '@/lib/api-client';
import { formatDateString } from '@/lib/utils';
import { Edit2, Trash2, Eye, Search } from 'lucide-react';
import { Company } from '@/lib/types';
import { toast } from 'sonner';
import { CompanyDetailsModal } from '@/components/shared/company-details-modal';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface CompaniesListTableProps {
  onEdit: (company: Company) => void;
}

export function CompaniesListTable({ onEdit }: CompaniesListTableProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [deleteTarget, setDeleteTarget] = useState<Company | null>(null);
  const [viewTarget, setViewTarget] = useState<Company | null>(null);

  const handleTypeFilterChange = (value: string | null) => {
    setTypeFilter(value || 'all');
  };

  const handleStatusFilterChange = (value: string | null) => {
    setStatusFilter(value || 'all');
  };
  
  const { data: companies = [], error, isLoading, mutate } = useSWR<Company[]>('/api/companies', fetcher);
  
  const filteredCompanies = companies.filter((company) => {
    const matchesSearch =
      company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      company.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (company.address && company.address.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesStatus =
      statusFilter === 'all' || company.status === statusFilter;

    const matchesType =
      typeFilter === 'all' || company.type === typeFilter;

    return matchesSearch && matchesStatus && matchesType;
  });

  const handleDelete = (company: Company) => {
    setDeleteTarget(company);
  };

  const handleConfirmDelete = async () => {
    if (!deleteTarget) return;
    try {
      const res = await fetch(`/api/companies/${deleteTarget.id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success) {
        toast.success('Company deleted successfully');
        mutate();
        // Also refresh other endpoints if needed (global mutate)
        import('swr').then(({ mutate: globalMutate }) => {
          globalMutate('/api/distributions');
          globalMutate('/api/servers');
        });
      } else {
        toast.error(data.error || 'Failed to delete company');
      }
    } catch (err) {
      toast.error('Failed to delete company');
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
              placeholder="Search by name, email, or address..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-slate-50"
            />
          </div>
          <div className="flex gap-3">
            <div className="w-[155px]">
              <Select value={typeFilter} onValueChange={handleTypeFilterChange}>
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
            <div className="w-[170px]">
              <Select value={statusFilter} onValueChange={handleStatusFilterChange}>
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
        <div className="p-8 text-center text-slate-500">Loading companies...</div>
      ) : filteredCompanies.length === 0 ? (
        <div className="p-6">
          <EmptyState
            icon={Eye}
            title={searchQuery ? 'No companies found' : 'No companies yet'}
            description={
              searchQuery
                ? 'Try adjusting your search criteria'
                : 'Start by adding a new company to the system'
            }
          />
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/75 text-xs font-semibold uppercase tracking-wider text-slate-500">
                <th className="px-6 py-4">Company Name</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Created</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {filteredCompanies.map((company) => (
                <tr key={company.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 font-semibold text-slate-800">
                    <span
                      onClick={() => setViewTarget(company)}
                      className="hover:underline cursor-pointer text-blue-600 hover:text-blue-800"
                    >
                      {company.name}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs font-medium bg-slate-100 text-slate-700 px-2.5 py-1 rounded-full">
                      {company.type}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <a
                      href={`mailto:${company.email}`}
                      className="text-blue-600 hover:text-blue-700 hover:underline text-sm font-medium"
                    >
                      {company.email}
                    </a>
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={company.status} />
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500">
                    {formatDateString(company.createdAt)}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-1">
                      <button 
                        className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-slate-50 rounded-lg transition-all"
                        onClick={() => setViewTarget(company)}
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-slate-50 rounded-lg transition-all"
                        onClick={() => onEdit(company)}
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        className="p-1.5 text-slate-400 hover:text-red-650 hover:bg-slate-50 rounded-lg transition-all"
                        onClick={() => handleDelete(company)}
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
        title="Delete Company"
        description="Are you sure you want to delete this company? This action cannot be undone."
        itemName={deleteTarget?.name}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />
      {/* View Details Modal */}
      <CompanyDetailsModal
        open={!!viewTarget}
        company={viewTarget}
        onClose={() => setViewTarget(null)}
      />
    </div>
  );
}
