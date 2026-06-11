'use client';

import { useState, useEffect } from 'react';
import useSWR from 'swr';
import { fetcher } from '@/lib/api-client';
import { PageHeader } from '@/components/shared/page-header';
import { Input } from '@/components/ui/input';
import { EmptyState } from '@/components/shared/empty-state';
import { formatDateTime } from '@/lib/utils';
import { Search, Eye, History, RefreshCw } from 'lucide-react';
import { ActivityLog } from '@/lib/types';

export default function ActivityLogsPage() {
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    document.title = 'Activity Logs | BD CacheX';
  }, []);

  const { data: logs = [], isLoading, mutate } = useSWR<ActivityLog[]>('/api/logs', fetcher, {
    refreshInterval: 5000, // auto-refresh logs every 5 seconds
  });

  const filteredLogs = logs.filter((log) => {
    const query = searchQuery.toLowerCase();
    return (
      log.userEmail.toLowerCase().includes(query) ||
      log.action.toLowerCase().includes(query) ||
      log.entity.toLowerCase().includes(query) ||
      log.details.toLowerCase().includes(query)
    );
  });

  const getActionBadgeColor = (action: string) => {
    switch (action.toUpperCase()) {
      case 'CREATE':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'UPDATE':
        return 'bg-orange-100 text-orange-850 border-orange-200';
      case 'DELETE':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Activity Logs"
        description="Audit trace of all actions performed in the system"
        action={
          <button
            onClick={() => mutate()}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-650 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors shadow-sm"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Refresh</span>
          </button>
        }
      />

      <div className="bg-white rounded-lg border border-slate-200">
        {/* Search Bar */}
        <div className="p-6 border-b border-slate-200">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              placeholder="Search logs by email, action, entity, details..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-slate-50"
            />
          </div>
        </div>

        {/* Content */}
        {isLoading ? (
          <div className="p-8 text-center text-slate-500 text-sm">Loading logs...</div>
        ) : filteredLogs.length === 0 ? (
          <div className="p-6">
            <EmptyState
              icon={History}
              title={searchQuery ? 'No matching logs found' : 'No logs recorded yet'}
              description={
                searchQuery
                  ? 'Try adjusting your search criteria'
                  : 'Logs will appear here when actions are performed.'
              }
            />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/75 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  <th className="px-6 py-4">Timestamp</th>
                  <th className="px-6 py-4">User (Email)</th>
                  <th className="px-6 py-4">Action</th>
                  <th className="px-6 py-4">Resource</th>
                  <th className="px-6 py-4">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white text-sm">
                {filteredLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-500 whitespace-nowrap">
                      {formatDateTime(log.createdAt)}
                    </td>
                    <td className="px-6 py-4 font-semibold text-slate-800">
                      {log.userEmail}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${getActionBadgeColor(log.action)}`}>
                        {log.action}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-medium text-slate-700 whitespace-nowrap">
                      {log.entity}
                    </td>
                    <td className="px-6 py-4 text-slate-600 leading-relaxed max-w-md break-words">
                      {log.details}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
