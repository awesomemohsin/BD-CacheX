'use client';

import { useState } from 'react';
import { Allocation, StatusType } from '@/lib/types';
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
import { Loader2 } from 'lucide-react';

interface AllocationFormProps {
  initialData?: Allocation;
  onSubmit: (data: Partial<Allocation>) => void;
  isLoading?: boolean;
}

export function AllocationForm({
  initialData,
  onSubmit,
  isLoading = false,
}: AllocationFormProps) {
  const { data: companies = [], isLoading: loadingComp } = useSWR<any[]>('/api/companies', fetcher);
  const { data: cacheProviders = [], isLoading: loadingCp } = useSWR<any[]>('/api/cache-providers', fetcher);
  const { data: servers = [], isLoading: loadingSrv } = useSWR<any[]>('/api/servers', fetcher);

  const isLoadingData = loadingComp || loadingCp || loadingSrv;

  const [formData, setFormData] = useState<Partial<Allocation>>(
    initialData || {
      companyId: '',
      companyName: '',
      companyType: undefined,
      cacheProviderId: '',
      cacheProviderName: '',
      serverId: '',
      serverName: '',
      capacityGB: 0,
      goLiveDate: new Date().toISOString().split('T')[0],
      status: StatusType.ACTIVE,
      notes: '',
    }
  );

  const [errors, setErrors] = useState<Record<string, string>>({});

  const selectedCompany = companies.find((c) => c.id === formData.companyId);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.companyId) newErrors.companyId = 'Company is required';
    if (!formData.cacheProviderId)
      newErrors.cacheProviderId = 'Cache provider is required';
    if (!formData.serverId) newErrors.serverId = 'Server is required';
    if (!formData.capacityGB || formData.capacityGB <= 0) {
      newErrors.capacityGB = 'Capacity must be greater than 0';
    }
    if (!formData.goLiveDate) newErrors.goLiveDate = 'Go live date is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const handleChange = (field: string, value: string | number) => {
    if (field === 'companyId') {
      const company = companies.find((c) => c.id === value);
      setFormData((prev) => ({
        ...prev,
        companyId: value,
        companyName: company?.name || '',
        companyType: company?.type,
      }));
    } else {
      if (field === 'cacheProviderId') {
        const provider = cacheProviders.find((cp) => cp.id === value);
        setFormData((prev) => ({
          ...prev,
          cacheProviderId: value,
          cacheProviderName: provider?.name || '',
        }));
      } else if (field === 'serverId') {
        const server = servers.find((s) => s.id === value);
        setFormData((prev) => ({
          ...prev,
          serverId: value,
          serverName: server?.name || '',
        }));
      } else {
        setFormData((prev) => ({ ...prev, [field]: value }));
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
      {/* Company Selection */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700">
          Company *
        </label>
        <Select value={formData.companyId} onValueChange={(value) => handleChange('companyId', value)}>
          <SelectTrigger className={errors.companyId ? 'border-red-500' : ''}>
            <SelectValue placeholder="Select a company" />
          </SelectTrigger>
          <SelectContent>
            {companies.map((company) => (
              <SelectItem key={company.id} value={company.id}>
                {company.name} ({company.type})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.companyId && (
          <p className="text-xs text-red-600">{errors.companyId}</p>
        )}
      </div>

      {/* Company Type (Auto-populated) */}
      {selectedCompany && (
        <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
          <p className="text-sm text-slate-600">
            Company Type: <span className="font-semibold">{selectedCompany.type}</span>
          </p>
        </div>
      )}

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
            <SelectValue placeholder="Select a cache provider" />
          </SelectTrigger>
          <SelectContent>
            {cacheProviders.map((provider) => (
              <SelectItem key={provider.id} value={provider.id}>
                {provider.name} ({provider.shortCode})
              </SelectItem>
            ))}
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
            <SelectValue placeholder="Select a server" />
          </SelectTrigger>
          <SelectContent>
            {servers.map((server) => (
              <SelectItem key={server.id} value={server.id}>
                {server.name} ({server.location})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.serverId && (
          <p className="text-xs text-red-600">{errors.serverId}</p>
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
          placeholder="Additional notes about this allocation"
          rows={3}
        />
      </div>

      {/* Submit Button */}
      <div className="flex gap-3 pt-4">
        <Button type="submit" disabled={isLoading} className="flex-1 gap-2">
          {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
          {initialData ? 'Update Allocation' : 'Create Allocation'}
        </Button>
      </div>
    </form>
  );
}
