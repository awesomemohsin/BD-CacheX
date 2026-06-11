'use client';

import { useState } from 'react';
import { StatusBadge } from '@/components/shared/status-badge';
import useSWR from 'swr';
import { fetcher } from '@/lib/api-client';
import { formatDateString } from '@/lib/utils';
import { Edit2, Trash2, Eye } from 'lucide-react';
import { CompanyDetailsModal } from '@/components/shared/company-details-modal';
import { Company } from '@/lib/types';

export function CompaniesTable() {
  const [viewTarget, setViewTarget] = useState<Company | null>(null);
  const { data: companies = [], isLoading } = useSWR<any[]>('/api/companies', fetcher);

  return (
    <div>
      <div className="p-6 border-b border-slate-100 bg-slate-50/50">
        <h3 className="text-lg font-bold text-slate-800">
          Companies Overview
        </h3>
        <p className="text-sm text-slate-500">
          Manage ISPs and Internet Interchange Gateways
        </p>
      </div>

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
            {isLoading ? (
              <tr>
                <td colSpan={6} className="text-center py-12 text-slate-500">
                  <div className="flex justify-center items-center gap-2">
                    <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                    <span>Loading companies...</span>
                  </div>
                </td>
              </tr>
            ) : companies.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-12 text-slate-500">
                  No companies found
                </td>
              </tr>
            ) : (
              companies.map((company) => (
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
                      <button className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-slate-50 rounded-lg transition-all">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-slate-50 rounded-lg transition-all">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <CompanyDetailsModal
        open={!!viewTarget}
        company={viewTarget}
        onClose={() => setViewTarget(null)}
      />
    </div>
  );
}
