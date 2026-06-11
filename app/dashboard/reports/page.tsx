'use client';

import { useEffect } from 'react';
import useSWR from 'swr';
import { fetcher } from '@/lib/api-client';
import { PageHeader } from '@/components/shared/page-header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BarChart3, Download } from 'lucide-react';
import { formatCapacity } from '@/lib/utils';

export default function ReportsPage() {
  useEffect(() => {
    document.title = 'Reports | BD CacheX';
  }, []);
  const { data: companies = [], isLoading: loadingComp } = useSWR<any[]>('/api/companies', fetcher);
  const { data: cacheProviders = [], isLoading: loadingCp } = useSWR<any[]>('/api/cache-providers', fetcher);
  const { data: servers = [], isLoading: loadingSrv } = useSWR<any[]>('/api/servers', fetcher);
  const { data: distributions = [], isLoading: loadingDist } = useSWR<any[]>('/api/distributions', fetcher);

  const isLoading = loadingComp || loadingCp || loadingSrv || loadingDist;

  if (isLoading) {
    return (
      <div className="flex h-[60vh] flex-col items-center justify-center gap-2 text-slate-500">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-sm font-medium mt-2">Loading reports & analytics...</p>
      </div>
    );
  }

  // Calculate company-wise capacity
  const companyCapacity = companies.map((company) => {
    const companyDistributions = distributions.filter((d) => d.companyId === company.id);
    const totalCapacity = companyDistributions.reduce((sum, d) => sum + d.capacityGB, 0);
    return {
      name: company.name,
      type: company.type,
      capacity: totalCapacity,
      distributionCount: companyDistributions.length,
    };
  });

  // Calculate cache provider-wise capacity
  const providerCapacity = cacheProviders.map((provider) => {
    const providerDistributions = distributions.filter(
      (d) => d.cacheProviderId === provider.id
    );
    const totalCapacity = providerDistributions.reduce((sum, d) => sum + d.capacityGB, 0);
    return {
      name: provider.name,
      shortCode: provider.shortCode,
      capacity: totalCapacity,
      distributionCount: providerDistributions.length,
    };
  });

  // Calculate server-wise utilization
  const serverUtilization = servers.map((server) => {
    const utilization = (server.usedCapacityGB / server.totalCapacityGB) * 100;
    return {
      name: server.name,
      total: server.totalCapacityGB,
      used: server.usedCapacityGB,
      utilization: utilization.toFixed(1),
    };
  });

  // Top companies by capacity
  const topCompanies = companyCapacity
    .sort((a, b) => b.capacity - a.capacity)
    .slice(0, 5);

  // Top cache providers
  const topProviders = providerCapacity
    .sort((a, b) => b.capacity - a.capacity)
    .slice(0, 5);

  return (
    <div className="space-y-8">
      <PageHeader
        title="Reports & Analytics"
        description="Overview of capacity utilization and allocation metrics"
        action={
          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export PDF
            </Button>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export CSV
            </Button>
          </div>
        }
      />

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Total Distributions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{distributions.length}</div>
            <p className="text-xs text-slate-600 mt-2">
              Across {companies.length} companies
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Total Capacity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {formatCapacity(servers.reduce((sum, s) => sum + s.totalCapacityGB, 0))}
            </div>
            <p className="text-xs text-slate-600 mt-2">
              Managed across {servers.length} servers
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Cache Providers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{cacheProviders.length}</div>
            <p className="text-xs text-slate-600 mt-2">
              Active CDN partners
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Avg Utilization</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {(
                (servers.reduce((sum, s) => sum + s.usedCapacityGB, 0) /
                  servers.reduce((sum, s) => sum + s.totalCapacityGB, 0)) *
                100
              ).toFixed(1)}
              %
            </div>
            <p className="text-xs text-slate-600 mt-2">
              Across all servers
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Top Companies */}
      <Card>
        <CardHeader>
          <CardTitle>Top 5 Companies by Capacity</CardTitle>
          <CardDescription>
            Companies with highest allocated cache capacity
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Company</TableHead>
                <TableHead>Type</TableHead>
                <TableHead className="text-right">Capacity</TableHead>
                <TableHead className="text-right">Distributions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {topCompanies.map((company) => (
                <TableRow key={company.name}>
                  <TableCell className="font-medium">{company.name}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{company.type}</Badge>
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    {formatCapacity(company.capacity)}
                  </TableCell>
                  <TableCell className="text-right">
                    {company.distributionCount}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Top Cache Providers */}
      <Card>
        <CardHeader>
          <CardTitle>Top 5 Cache Providers by Capacity</CardTitle>
          <CardDescription>
            Cache providers with highest allocated capacity
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Provider</TableHead>
                <TableHead>Code</TableHead>
                <TableHead className="text-right">Capacity</TableHead>
                <TableHead className="text-right">Distributions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {topProviders.map((provider) => (
                <TableRow key={provider.name}>
                  <TableCell className="font-medium">{provider.name}</TableCell>
                  <TableCell>
                    <span className="font-mono text-sm bg-slate-100 px-2 py-1 rounded">
                      {provider.shortCode}
                    </span>
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    {formatCapacity(provider.capacity)}
                  </TableCell>
                  <TableCell className="text-right">
                    {provider.distributionCount}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Server Utilization */}
      <Card>
        <CardHeader>
          <CardTitle>Server Utilization</CardTitle>
          <CardDescription>
            Individual server capacity and usage metrics
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Server</TableHead>
                <TableHead className="text-right">Total Capacity</TableHead>
                <TableHead className="text-right">Used</TableHead>
                <TableHead className="text-right">Utilization</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {serverUtilization.map((server) => (
                <TableRow key={server.name}>
                  <TableCell className="font-medium">{server.name}</TableCell>
                  <TableCell className="text-right">
                    {formatCapacity(server.total)}
                  </TableCell>
                  <TableCell className="text-right">
                    {formatCapacity(server.used)}
                  </TableCell>
                  <TableCell className="text-right">
                    <span
                      className={`font-semibold ${
                        parseFloat(server.utilization) <= 60
                          ? 'text-green-600'
                          : parseFloat(server.utilization) <= 80
                            ? 'text-orange-600'
                            : 'text-red-600'
                      }`}
                    >
                      {server.utilization}%
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
