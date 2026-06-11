'use client';

import { useState } from 'react';
import { StatusBadge } from '@/components/shared/status-badge';
import { CapacityProgress } from '@/components/shared/capacity-progress';
import useSWR from 'swr';
import { fetcher } from '@/lib/api-client';
import { calculateCapacityPercentage, formatCapacity } from '@/lib/utils';
import { Edit2, Trash2, Eye } from 'lucide-react';
import { ServerDetailsModal } from '@/components/shared/server-details-modal';
import { Server } from '@/lib/types';

export function ServersTable() {
  const [viewTarget, setViewTarget] = useState<Server | null>(null);
  const { data: servers = [], isLoading } = useSWR<Server[]>('/api/servers', fetcher);

  return (
    <div>
      <div className="p-6 border-b border-slate-100 bg-slate-50/50">
        <h3 className="text-lg font-bold text-slate-800">
          Server Utilization
        </h3>
        <p className="text-sm text-slate-500">
          Monitor server capacity and distribution status
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/75 text-xs font-semibold uppercase tracking-wider text-slate-500">
              <th className="px-6 py-4">Server Name</th>
              <th className="px-6 py-4">Model</th>
              <th className="px-6 py-4">Brand</th>
              <th className="px-6 py-4">Location</th>
              <th className="px-6 py-4">Capacity</th>
              <th className="px-6 py-4">Utilization</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white">
            {isLoading ? (
              <tr>
                <td colSpan={8} className="text-center py-12 text-slate-500">
                  <div className="flex justify-center items-center gap-2">
                    <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                    <span>Loading servers...</span>
                  </div>
                </td>
              </tr>
            ) : servers.length === 0 ? (
              <tr>
                <td colSpan={8} className="text-center py-12 text-slate-500">
                  No servers found
                </td>
              </tr>
            ) : (
              servers.map((server) => (
                <tr key={server.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 font-semibold text-slate-800">
                    <span
                      onClick={() => setViewTarget(server)}
                      className="hover:underline cursor-pointer text-blue-600 hover:text-blue-800"
                    >
                      {server.name}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-600 text-sm">{server.model}</td>
                  <td className="px-6 py-4 text-slate-600 text-sm">{server.brand}</td>
                  <td className="px-6 py-4 text-slate-600 text-sm">{server.location}</td>
                  <td className="px-6 py-4 text-slate-700 text-sm font-medium">
                    {formatCapacity(server.totalCapacityGB)}
                  </td>
                  <td className="px-6 py-4 max-w-xs">
                    <div className="space-y-1.5">
                      <CapacityProgress
                        used={server.usedCapacityGB}
                        total={server.totalCapacityGB}
                        showLabel={false}
                      />
                      <span className="text-xs text-slate-500 font-medium">
                        {calculateCapacityPercentage(
                          server.usedCapacityGB,
                          server.totalCapacityGB
                        )}
                        % used
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={server.status} />
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-1">
                      <button 
                        className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-slate-50 rounded-lg transition-all"
                        onClick={() => setViewTarget(server)}
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
      <ServerDetailsModal
        open={!!viewTarget}
        server={viewTarget}
        onClose={() => setViewTarget(null)}
      />
    </div>
  );
}
