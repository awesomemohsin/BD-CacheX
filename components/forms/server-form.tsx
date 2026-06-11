'use client';

import { useState } from 'react';
import { Server, StatusType } from '@/lib/types';
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
import useSWR from 'swr';
import { fetcher } from '@/lib/api-client';

interface ServerFormProps {
  initialData?: Server;
  onSubmit: (data: Partial<Server>) => void;
  isLoading?: boolean;
}

export function ServerForm({
  initialData,
  onSubmit,
  isLoading = false,
}: ServerFormProps) {
  const [formData, setFormData] = useState<Partial<Server>>(
    initialData || {
      name: '',
      model: '',
      brand: '',
      totalCapacityGB: 0,
      usedCapacityGB: 0,
      location: '',
      rackNumber: '',
      ipAddress: '',
      status: StatusType.ACTIVE,
      notes: '',
    }
  );

  const { data: servers = [] } = useSWR<Server[]>('/api/servers', fetcher);

  const defaultBrands = ['Dell', 'HP'];
  const availableBrands = Array.from(
    new Set([
      ...defaultBrands,
      ...servers.map((s) => s.brand),
      ...(initialData?.brand ? [initialData.brand] : []),
    ].filter(Boolean))
  );

  const [isCustomBrand, setIsCustomBrand] = useState(
    initialData ? !defaultBrands.includes(initialData.brand) : false
  );
  
  const getModelsForBrand = (brandName: string) => {
    if (!brandName) return [];
    const defaultModels: Record<string, string[]> = {
      Dell: ['DELL 730', 'DELL 830'],
      HP: ['HP ProLiant'],
    };
    const modelsFromServers = servers
      .filter((s) => s.brand === brandName && s.model)
      .map((s) => s.model);

    return Array.from(
      new Set([
        ...(defaultModels[brandName] || []),
        ...modelsFromServers,
        ...(initialData?.brand === brandName && initialData?.model
          ? [initialData.model]
          : []),
      ].filter(Boolean))
    );
  };

  const availableModels = getModelsForBrand(formData.brand || '');

  const [isCustomModel, setIsCustomModel] = useState(
    initialData ? !availableModels.includes(initialData.model) : false
  );

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name?.trim()) newErrors.name = 'Server name is required';
    if (!formData.model?.trim()) newErrors.model = 'Server model is required';
    if (!formData.brand?.trim()) newErrors.brand = 'Brand is required';
    if (!formData.totalCapacityGB || formData.totalCapacityGB <= 0) {
      newErrors.totalCapacityGB = 'Total capacity must be greater than 0';
    }
    if (!formData.location?.trim()) newErrors.location = 'Location is required';
    if (!formData.ipAddress?.trim()) {
      newErrors.ipAddress = 'IP address is required';
    } else if (!/^(\d{1,3}\.){3}\d{1,3}$/.test(formData.ipAddress)) {
      newErrors.ipAddress = 'Invalid IP address format';
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
          Server Name *
        </label>
        <Input
          value={formData.name || ''}
          onChange={(e) => handleChange('name', e.target.value)}
          placeholder="e.g., Cache-Server-01-DEL"
          className={errors.name ? 'border-red-500' : ''}
        />
        {errors.name && <p className="text-xs text-red-600">{errors.name}</p>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium text-slate-700">
              Brand *
            </label>
            {isCustomBrand && (
              <button
                type="button"
                onClick={() => {
                  setIsCustomBrand(false);
                  setFormData((prev) => ({ ...prev, brand: '', model: '' }));
                }}
                className="text-xs text-indigo-600 hover:text-indigo-700 font-medium cursor-pointer"
              >
                Choose existing brand
              </button>
            )}
          </div>
          {isCustomBrand ? (
            <Input
              value={formData.brand || ''}
              onChange={(e) => handleChange('brand', e.target.value)}
              placeholder="e.g., Cisco, Supermicro"
              className={errors.brand ? 'border-red-500' : ''}
            />
          ) : (
            <Select
              value={formData.brand || ''}
              onValueChange={(value) => {
                if (value === '__new_brand__') {
                  setIsCustomBrand(true);
                  setIsCustomModel(true);
                  setFormData((prev) => ({ ...prev, brand: '', model: '' }));
                } else {
                  setFormData((prev) => ({
                    ...prev,
                    brand: value ?? '',
                    model: '',
                  }));
                  if (errors.brand) {
                    setErrors((prev) => ({ ...prev, brand: '' }));
                  }
                }
              }}
            >
              <SelectTrigger className={errors.brand ? 'border-red-500' : ''}>
                <SelectValue placeholder="Select Brand" />
              </SelectTrigger>
              <SelectContent>
                {availableBrands.map((b) => (
                  <SelectItem key={b} value={b}>
                    {b}
                  </SelectItem>
                ))}
                <SelectItem value="__new_brand__" className="text-indigo-600 font-medium border-t border-slate-100">
                  + Add New Brand...
                </SelectItem>
              </SelectContent>
            </Select>
          )}
          {errors.brand && <p className="text-xs text-red-650">{errors.brand}</p>}
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium text-slate-700">
              Model *
            </label>
            {isCustomModel && (
              <button
                type="button"
                onClick={() => {
                  setIsCustomModel(false);
                  setFormData((prev) => ({ ...prev, model: '' }));
                }}
                className="text-xs text-indigo-600 hover:text-indigo-700 font-medium cursor-pointer"
              >
                Choose existing model
              </button>
            )}
          </div>
          {isCustomModel ? (
            <Input
              value={formData.model || ''}
              onChange={(e) => handleChange('model', e.target.value)}
              placeholder="e.g., DELL 730, HP ProLiant"
              className={errors.model ? 'border-red-500' : ''}
            />
          ) : (
            <Select
              value={formData.model || ''}
              onValueChange={(value) => {
                if (value === '__new_model__') {
                  setIsCustomModel(true);
                  setFormData((prev) => ({ ...prev, model: '' }));
                } else {
                  handleChange('model', value ?? '');
                }
              }}
              disabled={!formData.brand}
            >
              <SelectTrigger className={errors.model ? 'border-red-500' : ''}>
                <SelectValue placeholder="Select Model" />
              </SelectTrigger>
              <SelectContent>
                {availableModels.map((m) => (
                  <SelectItem key={m} value={m}>
                    {m}
                  </SelectItem>
                ))}
                <SelectItem value="__new_model__" className="text-indigo-600 font-medium border-t border-slate-100">
                  + Add New Model...
                </SelectItem>
              </SelectContent>
            </Select>
          )}
          {errors.model && <p className="text-xs text-red-650">{errors.model}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700">
          Total Capacity (GB) *
        </label>
        <Input
          type="number"
          value={formData.totalCapacityGB || ''}
          onChange={(e) =>
            handleChange('totalCapacityGB', parseInt(e.target.value) || 0)
          }
          placeholder="5000"
          className={errors.totalCapacityGB ? 'border-red-500' : ''}
        />
        {errors.totalCapacityGB && (
          <p className="text-xs text-red-650">{errors.totalCapacityGB}</p>
        )}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700">
          Location *
        </label>
        <Input
          value={formData.location || ''}
          onChange={(e) => handleChange('location', e.target.value)}
          placeholder="e.g., Delhi - Rack A1"
          className={errors.location ? 'border-red-500' : ''}
        />
        {errors.location && (
          <p className="text-xs text-red-600">{errors.location}</p>
        )}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700">
          Rack Number
        </label>
        <Input
          value={formData.rackNumber || ''}
          onChange={(e) => handleChange('rackNumber', e.target.value)}
          placeholder="e.g., A1-12"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700">
          IP Address *
        </label>
        <Input
          value={formData.ipAddress || ''}
          onChange={(e) => handleChange('ipAddress', e.target.value)}
          placeholder="e.g., 192.168.1.10"
          className={errors.ipAddress ? 'border-red-500' : ''}
        />
        {errors.ipAddress && (
          <p className="text-xs text-red-600">{errors.ipAddress}</p>
        )}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700">Notes</label>
        <Textarea
          value={formData.notes || ''}
          onChange={(e) => handleChange('notes', e.target.value)}
          placeholder="Additional notes about this server"
          rows={3}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700">Status</label>
        <Select
          value={formData.status}
          onValueChange={(value) => handleChange('status', value ?? StatusType.ACTIVE)}
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
          {initialData ? 'Update Server' : 'Add Server'}
        </Button>
      </div>
    </form>
  );
}
