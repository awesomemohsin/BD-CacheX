'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { DistributionForm } from '@/components/forms/distribution-form';
import { Distribution } from '@/lib/types';
import { toast } from 'sonner';

interface DistributionModalProps {
  open: boolean;
  distribution?: Distribution | null;
  onClose: () => void;
}

export function DistributionModal({ open, distribution, onClose }: DistributionModalProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (data: Partial<Distribution>) => {
    if (!distribution) return;
    setIsLoading(true);
    try {
      const res = await fetch(`/api/distributions/${distribution.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (result.success) {
        toast.success('Distribution updated successfully');
        // Trigger global SWR mutation to reload tables
        import('swr').then(({ mutate }) => {
          mutate('/api/distributions');
          mutate('/api/servers');
        });
        onClose();
      } else {
        toast.error(result.error || 'Failed to save distribution');
      }
    } catch (error) {
      toast.error('Failed to save distribution');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            Edit Distribution
          </DialogTitle>
          <DialogDescription>
            Update the distribution mapping and capacity configuration.
          </DialogDescription>
        </DialogHeader>
        <DistributionForm
          initialData={distribution || undefined}
          onSubmit={handleSubmit}
          isLoading={isLoading}
        />
      </DialogContent>
    </Dialog>
  );
}
