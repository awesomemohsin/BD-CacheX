'use client';

import { useState } from 'react';
import { Company, CompanyType, StatusType } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Loader2 } from 'lucide-react';

interface CompanyFormProps {
  initialData?: Company;
  onSubmit: (data: Partial<Company>) => void;
  isLoading?: boolean;
}

export function CompanyForm({
  initialData,
  onSubmit,
  isLoading = false,
}: CompanyFormProps) {
  const [formData, setFormData] = useState<Partial<Company>>(
    initialData || {
      name: '',
      type: CompanyType.ISP,
      email: '',
      address: '',
      status: StatusType.ACTIVE,
    }
  );

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name?.trim()) newErrors.name = 'Company name is required';
    if (!formData.email?.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email address';
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

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700">
          Company Name *
        </label>
        <Input
          value={formData.name || ''}
          onChange={(e) => handleChange('name', e.target.value)}
          placeholder="e.g., Telecom India Ltd"
          className={errors.name ? 'border-red-500' : ''}
        />
        {errors.name && <p className="text-xs text-red-600">{errors.name}</p>}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700">Type *</label>
        <Select
          value={formData.type}
          onValueChange={(value) => handleChange('type', value || '')}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={CompanyType.ISP}>ISP</SelectItem>
            <SelectItem value={CompanyType.IIG}>IIG</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700">
          Email Address *
        </label>
        <Input
          type="email"
          value={formData.email || ''}
          onChange={(e) => handleChange('email', e.target.value)}
          placeholder="e.g., contact@company.com"
          className={errors.email ? 'border-red-500' : ''}
        />
        {errors.email && <p className="text-xs text-red-600">{errors.email}</p>}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700">Address</label>
        <Input
          value={formData.address || ''}
          onChange={(e) => handleChange('address', e.target.value)}
          placeholder="e.g., New Delhi, India"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700">Status</label>
        <Select
          value={formData.status}
          onValueChange={(value) => handleChange('status', value || '')}
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
          {initialData ? 'Update Company' : 'Add Company'}
        </Button>
      </div>
    </form>
  );
}
