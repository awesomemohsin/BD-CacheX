'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { CompanyForm } from '@/components/forms/company-form';
import { Company } from '@/lib/types';
import { toast } from 'sonner';

interface CompanyModalProps {
  open: boolean;
  company?: Company | null;
  onClose: () => void;
}

export function CompanyModal({ open, company, onClose }: CompanyModalProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (data: Partial<Company>) => {
    setIsLoading(true);
    try {
      const url = company ? `/api/companies/${company.id}` : '/api/companies';
      const method = company ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (result.success) {
        toast.success(company ? 'Company updated successfully' : 'Company added successfully');
        // Trigger global SWR mutation to reload tables
        import('swr').then(({ mutate }) => {
          mutate('/api/companies');
          mutate('/api/allocations');
        });
        onClose();
      } else {
        toast.error(result.error || 'Failed to save company');
      }
    } catch (error) {
      toast.error('Failed to save company');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {company ? 'Edit Company' : 'Add New Company'}
          </DialogTitle>
          <DialogDescription>
            {company
              ? 'Update the company information'
              : 'Add a new ISP or IIG company to the system'}
          </DialogDescription>
        </DialogHeader>
        <CompanyForm
          initialData={company || undefined}
          onSubmit={handleSubmit}
          isLoading={isLoading}
        />
      </DialogContent>
    </Dialog>
  );
}
