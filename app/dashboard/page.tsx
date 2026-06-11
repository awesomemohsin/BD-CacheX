'use client';

import { StatCard } from '@/components/dashboard/stat-card';
import { PageHeader } from '@/components/shared/page-header';
import { CompaniesTable } from '@/components/tables/companies-table';
import { ServersTable } from '@/components/tables/servers-table';
import { AllocationsTable } from '@/components/tables/allocations-table';
import { useEffect } from 'react';
import useSWR from 'swr';
import { fetcher } from '@/lib/api-client';
import { calculateCapacityPercentage } from '@/lib/utils';
import { Database, Server, Building2, Zap, Network } from 'lucide-react';

export default function DashboardPage() {
  useEffect(() => {
    document.title = 'Dashboard | BD CacheX';
  }, []);

  const { data: companies = [], isLoading: loadingComp } = useSWR<any[]>('/api/companies', fetcher);
  const { data: cacheProviders = [], isLoading: loadingCp } = useSWR<any[]>('/api/cache-providers', fetcher);
  const { data: servers = [], isLoading: loadingSrv } = useSWR<any[]>('/api/servers', fetcher);
  const { data: allocations = [], isLoading: loadingAlloc } = useSWR<any[]>('/api/allocations', fetcher);

  const isLoading = loadingComp || loadingCp || loadingSrv || loadingAlloc;

  // Calculate metrics
  const totalCapacity = servers.reduce((sum, server) => sum + server.totalCapacityGB, 0);
  const usedCapacity = servers.reduce((sum, server) => sum + server.usedCapacityGB, 0);
  const activeServers = servers.filter((s) => s.status === 'Active').length;
  const activeCompanies = companies.filter((c) => c.status === 'Active').length;
  const activeAllocations = allocations.filter((a) => a.status === 'Active').length;

  if (isLoading) {
    return (
      <div className="flex h-[60vh] flex-col items-center justify-center gap-2 text-slate-500">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-sm font-medium mt-2">Loading dashboard metrics...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <PageHeader
        title="Dashboard"
        description="Overview of your CDN cache allocation system"
      />

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard
          icon={Database}
          label="Total Capacity"
          value={`${totalCapacity} GB`}
          subtext={`${usedCapacity} GB used`}
        />
        <StatCard
          icon={Server}
          label="Active Servers"
          value={activeServers}
          subtext={`of ${servers.length} total`}
        />
        <StatCard
          icon={Building2}
          label="Connected Companies"
          value={activeCompanies}
          subtext={`of ${companies.length} total`}
        />
        <StatCard
          icon={Zap}
          label="Cache Providers"
          value={cacheProviders.length}
          subtext="Active partners"
        />
        <StatCard
          icon={Network}
          label="Active Distributions"
          value={activeAllocations}
          subtext={`of ${allocations.length} total`}
        />
      </div>

      {/* Data Tables Section */}
      <div className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Companies Table */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm shadow-slate-100/30 overflow-hidden hover:shadow-md transition-shadow duration-300">
            <CompaniesTable />
          </div>

          {/* Servers Table */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm shadow-slate-100/30 overflow-hidden hover:shadow-md transition-shadow duration-300">
            <ServersTable />
          </div>
        </div>

        {/* Distribution Table */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm shadow-slate-100/30 overflow-hidden hover:shadow-md transition-shadow duration-300">
          <div className="p-6 border-b border-slate-100 bg-slate-50/50">
            <h3 className="text-lg font-bold text-slate-800">
              Distribution Overview
            </h3>
            <p className="text-sm text-slate-500">
              Live monitoring of cache capacity distributions across CDN edge servers
            </p>
          </div>
          <AllocationsTable isDashboard={true} />
        </div>
      </div>
    </div>
  );
}
