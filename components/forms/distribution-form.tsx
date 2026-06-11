'use client';

import { useState } from 'react';
import { Distribution, StatusType, CompanyType } from '@/lib/types';
import useSWR from 'swr';
import { fetcher } from '@/lib/api-client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Loader2, ChevronDown, Search, Check } from 'lucide-react';
import { cn, formatCapacity } from '@/lib/utils';

interface FormState extends Omit<Partial<Distribution>, 'goLiveDate'> {
  goLiveDate: string;
}

interface DistributionFormProps {
  initialData?: Distribution;
  onSubmit: (data: Partial<Distribution>) => void;
  isLoading?: boolean;
}

export function DistributionForm({
  initialData,
  onSubmit,
  isLoading = false,
}: DistributionFormProps) {
  const { data: companies = [], isLoading: loadingComp } = useSWR<any[]>('/api/companies', fetcher);
  const { data: cacheProviders = [], isLoading: loadingCp } = useSWR<any[]>('/api/cache-providers', fetcher);
  const { data: servers = [], isLoading: loadingSrv } = useSWR<any[]>('/api/servers', fetcher);

  const isLoadingData = loadingComp || loadingCp || loadingSrv;

  const [formData, setFormData] = useState<FormState>(() => {
    if (initialData) {
      return {
        ...initialData,
        serverCount: initialData.serverCount || 1,
        goLiveDate: initialData.goLiveDate
          ? new Date(initialData.goLiveDate).toISOString().split('T')[0]
          : new Date().toISOString().split('T')[0],
      };
    }
    return {
      companyId: '',
      companyName: '',
      companyType: undefined,
      cacheProviderId: '',
      cacheProviderName: '',
      serverId: '',
      serverName: '',
      capacityGB: 0,
      serverCount: 1,
      goLiveDate: new Date().toISOString().split('T')[0],
      status: StatusType.ACTIVE,
      notes: '',
    };
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [companySearch, setCompanySearch] = useState('');
  const [isCompanyDropdownOpen, setIsCompanyDropdownOpen] = useState(false);

  const selectedCompany = companies.find((c) => c.id === formData.companyId);

  const filteredCompanies = companies.filter((c) => {
    const matchesType = !formData.companyType || c.type === formData.companyType;
    const matchesSearch =
      !companySearch.trim() ||
      c.name.toLowerCase().includes(companySearch.toLowerCase());
    return matchesType && matchesSearch;
  });

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.companyType) newErrors.companyType = 'Company type is required';
    if (!formData.companyId) newErrors.companyId = 'Company is required';
    if (!formData.cacheProviderId)
      newErrors.cacheProviderId = 'Cache provider is required';
    if (!formData.serverId) newErrors.serverId = 'Server is required';
    if (!formData.capacityGB || formData.capacityGB <= 0) {
      newErrors.capacityGB = 'Capacity must be greater than 0';
    }
    if (!formData.serverCount || formData.serverCount <= 0) {
      newErrors.serverCount = 'Server quantity must be greater than 0';
    }
    if (!formData.goLiveDate) newErrors.goLiveDate = 'Go live date is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit({
        ...formData,
        goLiveDate: new Date(formData.goLiveDate),
      });
    }
  };

  const handleChange = (field: string, value: any) => {
    const safeValue = value ?? '';
    if (field === 'companyId') {
      const company = companies.find((c) => c.id === safeValue);
      setFormData((prev) => ({
        ...prev,
        companyId: safeValue,
        companyName: company?.name || '',
        companyType: company?.type,
      }));
      setIsCompanyDropdownOpen(false);
    } else {
      if (field === 'cacheProviderId') {
        const provider = cacheProviders.find((cp) => cp.id === safeValue);
        setFormData((prev) => ({
          ...prev,
          cacheProviderId: safeValue,
          cacheProviderName: provider ? `${provider.shortCode} - ${provider.name}` : '',
        }));
      } else if (field === 'serverId') {
        const server = servers.find((s) => s.id === safeValue);
        const rackStr = server?.rackNumber ? ` / ${server.rackNumber}` : '';
        const formattedName = server
          ? `${server.brand} - ${server.model} - ${server.name} - ${server.location}${rackStr}`
          : '';
        setFormData((prev) => ({
          ...prev,
          serverId: safeValue,
          serverName: formattedName,
        }));
      } else {
        setFormData((prev) => ({ ...prev, [field]: safeValue }));
      }
    }

    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  if (isLoadingData) {
    return (
      <div className="flex flex-col items-center justify-center py-12 gap-2 text-slate-500">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        <p className="text-sm">Loading options from database...</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Company Type Selection */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700">
          Company Type *
        </label>
        <Select
          value={formData.companyType || ''}
          onValueChange={(value) => {
            const newType = value as CompanyType || undefined;
            setFormData((prev) => ({
              ...prev,
              companyType: newType,
              companyId: '',
              companyName: '',
            }));
            setCompanySearch('');
          }}
        >
          <SelectTrigger className={errors.companyType ? 'border-red-500' : ''}>
            <SelectValue placeholder="Select type (ISP / IIG)">
              {(val) => val}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ISP">ISP</SelectItem>
            <SelectItem value="IIG">IIG</SelectItem>
          </SelectContent>
        </Select>
        {errors.companyType && (
          <p className="text-xs text-red-650">{errors.companyType}</p>
        )}
      </div>

      {/* Company Selection */}
      <div className="space-y-2 relative">
        <label className="text-sm font-medium text-slate-700">
          Company *
        </label>
        
        {/* Custom Select Trigger */}
        <button
          type="button"
          disabled={!formData.companyType}
          onClick={() => setIsCompanyDropdownOpen(!isCompanyDropdownOpen)}
          className={cn(
            "flex w-full items-center justify-between gap-1.5 rounded-lg border bg-white py-2 pr-2 pl-2.5 text-sm transition-colors outline-none select-none disabled:cursor-not-allowed disabled:opacity-50 h-8",
            errors.companyId ? "border-red-500" : "border-slate-200 hover:border-slate-300"
          )}
        >
          <span className={cn(!formData.companyId && "text-slate-400")}>
            {formData.companyId
              ? `${formData.companyName} (${formData.companyType})`
              : formData.companyType
              ? "Select a company"
              : "Select company type first"}
          </span>
          <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
        </button>

        {/* Custom Popover Content */}
        {isCompanyDropdownOpen && formData.companyType && (
          <>
            {/* Backdrop to close dropdown when clicking outside */}
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsCompanyDropdownOpen(false)}
            />
            
            {/* Dropdown Menu */}
            <div className="absolute left-0 right-0 mt-1 bg-white border border-slate-200 rounded-lg shadow-md z-50 max-h-72 flex flex-col overflow-hidden">
              {/* Search Box */}
              <div className="p-2 border-b border-slate-100 bg-slate-50">
                <div className="relative">
                  <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                  <Input
                    placeholder="Search company..."
                    value={companySearch}
                    onChange={(e) => setCompanySearch(e.target.value)}
                    className="pl-8 h-8 text-xs bg-white focus:ring-0"
                    autoFocus
                  />
                </div>
              </div>

              {/* Items List */}
              <div className="overflow-y-auto py-1 max-h-56">
                {filteredCompanies.map((company) => (
                  <button
                    key={company.id}
                    type="button"
                    onClick={() => {
                      handleChange('companyId', company.id);
                    }}
                    className={cn(
                      "w-full text-left px-3 py-2 text-sm hover:bg-slate-50 flex items-center justify-between transition-colors",
                      formData.companyId === company.id && "bg-slate-50 font-medium text-blue-600"
                    )}
                  >
                    <span>{company.name}</span>
                    {formData.companyId === company.id && (
                      <Check className="w-4 h-4 text-blue-600" />
                    )}
                  </button>
                ))}
                {filteredCompanies.length === 0 && (
                  <div className="p-4 text-xs text-slate-500 text-center">
                    No companies found
                  </div>
                )}
              </div>
            </div>
          </>
        )}
        
        {errors.companyId && (
          <p className="text-xs text-red-655">{errors.companyId}</p>
        )}
      </div>

      {/* Cache Provider Selection */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700">
          Cache Provider *
        </label>
        <Select
          value={formData.cacheProviderId}
          onValueChange={(value) => handleChange('cacheProviderId', value)}
        >
          <SelectTrigger className={errors.cacheProviderId ? 'border-red-500' : ''}>
            <SelectValue placeholder="Select a cache provider">
              {(val) => {
                const provider = cacheProviders.find((cp) => cp.id === val);
                return provider ? `${provider.shortCode} - ${provider.name}` : undefined;
              }}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {cacheProviders.map((provider) => {
              const totalCap = provider.totalCapacity ?? 0;
              const totalSrv = provider.serverCount ?? 0;

              return (
                <SelectItem key={provider.id} value={provider.id}>
                  {provider.shortCode} - {provider.name} (Qty: {totalSrv} pcs | Capacity: {formatCapacity(totalCap)})
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
        {errors.cacheProviderId && (
          <p className="text-xs text-red-600">{errors.cacheProviderId}</p>
        )}
      </div>

      {/* Server Selection */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700">
          Server *
        </label>
        <Select
          value={formData.serverId}
          onValueChange={(value) => handleChange('serverId', value)}
        >
          <SelectTrigger className={errors.serverId ? 'border-red-500' : ''}>
            <SelectValue placeholder="Select a server">
              {(val) => {
                const srv = servers.find((s) => s.id === val);
                if (!srv) return undefined;
                const rackStr = srv.rackNumber ? ` / ${srv.rackNumber}` : '';
                return `${srv.brand} - ${srv.model} - ${srv.name} - ${srv.location}${rackStr}`;
              }}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {servers.map((server) => {
              const rackStr = server.rackNumber ? ` / ${server.rackNumber}` : '';
              const totalCap = server.totalCapacityGB ?? 0;
              const usedCap = server.usedCapacityGB ?? 0;
              const freeCap = Math.max(0, totalCap - usedCap);

              return (
                <SelectItem key={server.id} value={server.id}>
                  {server.brand} - {server.model} - {server.name} - {server.location}{rackStr} (Free: {formatCapacity(freeCap)} | Original: {formatCapacity(totalCap)})
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
        {errors.serverId && (
          <p className="text-xs text-red-600">{errors.serverId}</p>
        )}
      </div>

      {/* Server Quantity Input */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700">
          Server Quantity *
        </label>
        <Input
          type="number"
          min="1"
          value={formData.serverCount !== undefined ? formData.serverCount : 1}
          onChange={(e) => handleChange('serverCount', parseInt(e.target.value) || 1)}
          placeholder="e.g., 4"
          className={errors.serverCount ? 'border-red-500' : ''}
        />
        {errors.serverCount && (
          <p className="text-xs text-red-600">{errors.serverCount}</p>
        )}
      </div>

      {/* Capacity Input */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700">
          Capacity (GB) *
        </label>
        <Input
          type="number"
          value={formData.capacityGB || ''}
          onChange={(e) => handleChange('capacityGB', parseInt(e.target.value) || 0)}
          placeholder="Enter capacity in GB"
          className={errors.capacityGB ? 'border-red-500' : ''}
        />
        {errors.capacityGB && (
          <p className="text-xs text-red-600">{errors.capacityGB}</p>
        )}
      </div>

      {/* Go Live Date */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700">
          Go Live Date *
        </label>
        <Input
          type="date"
          value={formData.goLiveDate ? formData.goLiveDate.toString().split('T')[0] : ''}
          onChange={(e) => handleChange('goLiveDate', e.target.value)}
          className={errors.goLiveDate ? 'border-red-500' : ''}
        />
        {errors.goLiveDate && (
          <p className="text-xs text-red-600">{errors.goLiveDate}</p>
        )}
      </div>

      {/* Status */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700">Status</label>
        <Select
          value={formData.status}
          onValueChange={(value) => handleChange('status', value)}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={StatusType.ACTIVE}>Active</SelectItem>
            <SelectItem value={StatusType.PENDING}>Pending</SelectItem>
            <SelectItem value={StatusType.INACTIVE}>Inactive</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Notes */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700">Notes</label>
        <Textarea
          value={formData.notes || ''}
          onChange={(e) => handleChange('notes', e.target.value)}
          placeholder="Additional notes about this distribution"
          rows={3}
        />
      </div>

      {/* Submit Button */}
      <div className="flex gap-3 pt-4">
        <Button type="submit" disabled={isLoading} className="flex-1 gap-2">
          {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
          {initialData ? 'Update Distribution' : 'Create Distribution'}
        </Button>
      </div>
    </form>
  );
}
