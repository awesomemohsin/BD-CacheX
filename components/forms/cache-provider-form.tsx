'use client';

import { useState } from 'react';
import { CacheProvider, StatusType } from '@/lib/types';
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

interface CacheProviderFormProps {
  initialData?: CacheProvider;
  onSubmit: (data: Partial<CacheProvider>) => void;
  isLoading?: boolean;
}

export function CacheProviderForm({
  initialData,
  onSubmit,
  isLoading = false,
}: CacheProviderFormProps) {
  const [formData, setFormData] = useState<Partial<CacheProvider>>(
    initialData || {
      name: '',
      shortCode: '',
      description: '',
      status: StatusType.ACTIVE,
      serverCount: 0,
      totalCapacity: 0,
    }
  );

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name?.trim()) newErrors.name = 'Provider name is required';
    if (!formData.shortCode?.trim()) newErrors.shortCode = 'Short code is required';
    if (formData.shortCode && formData.shortCode.length > 20) {
      newErrors.shortCode = 'Short code must be 20 characters or less';
    }
    if (formData.serverCount !== undefined && formData.serverCount < 0) {
      newErrors.serverCount = 'Server count must be 0 or greater';
    }
    if (formData.totalCapacity !== undefined && formData.totalCapacity < 0) {
      newErrors.totalCapacity = 'Total capacity must be 0 or greater';
    }

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
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700">
          Provider Name *
        </label>
        <Input
          value={formData.name || ''}
          onChange={(e) => handleChange('name', e.target.value)}
          placeholder="e.g., FastNet Access"
          className={errors.name ? 'border-red-500' : ''}
        />
        {errors.name && <p className="text-xs text-red-650">{errors.name}</p>}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700">
          Short Code *
        </label>
        <Input
          value={formData.shortCode || ''}
          onChange={(e) =>
            handleChange('shortCode', e.target.value.toUpperCase())
          }
          placeholder="e.g., FNA"
          className={errors.shortCode ? 'border-red-500' : ''}
        />
        {errors.shortCode && (
          <p className="text-xs text-red-650">{errors.shortCode}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">
            Server Count
          </label>
          <Input
            type="number"
            value={formData.serverCount !== undefined ? formData.serverCount : ''}
            onChange={(e) => handleChange('serverCount', parseInt(e.target.value) || 0)}
            placeholder="0"
            className={errors.serverCount ? 'border-red-500' : ''}
          />
          {errors.serverCount && <p className="text-xs text-red-650">{errors.serverCount}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">
            Total Capacity (GB)
          </label>
          <Input
            type="number"
            value={formData.totalCapacity !== undefined ? formData.totalCapacity : ''}
            onChange={(e) => handleChange('totalCapacity', parseFloat(e.target.value) || 0)}
            placeholder="0"
            className={errors.totalCapacity ? 'border-red-500' : ''}
          />
          {errors.totalCapacity && <p className="text-xs text-red-650">{errors.totalCapacity}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700">
          Description
        </label>
        <Textarea
          value={formData.description || ''}
          onChange={(e) => handleChange('description', e.target.value)}
          placeholder="Brief description of the cache provider service"
          rows={3}
        />
      </div>

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

      <div className="flex gap-3 pt-4">
        <Button
          type="submit"
          disabled={isLoading}
          className="flex-1 gap-2"
        >
          {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
          {initialData ? 'Update Provider' : 'Add Provider'}
        </Button>
      </div>
    </form>
  );
}
