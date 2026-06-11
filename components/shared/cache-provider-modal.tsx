'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { CacheProviderForm } from '@/components/forms/cache-provider-form';
import { CacheProvider } from '@/lib/types';
import { toast } from 'sonner';

interface CacheProviderModalProps {
  open: boolean;
  provider?: CacheProvider | null;
  onClose: () => void;
}

export function CacheProviderModal({ open, provider, onClose }: CacheProviderModalProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (data: Partial<CacheProvider>) => {
    setIsLoading(true);
    try {
      const url = provider ? `/api/cache-providers/${provider.id}` : '/api/cache-providers';
      const method = provider ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (result.success) {
        toast.success(provider ? 'Provider updated successfully' : 'Provider added successfully');
        // Trigger global SWR mutation to reload tables
        import('swr').then(({ mutate }) => {
          mutate('/api/cache-providers');
          mutate('/api/allocations');
        });
        onClose();
      } else {
        toast.error(result.error || 'Failed to save provider');
      }
    } catch (error) {
      toast.error('Failed to save provider');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {provider ? 'Edit Cache Provider' : 'Add Cache Provider'}
          </DialogTitle>
          <DialogDescription>
            {provider
              ? 'Update the cache provider information'
              : 'Add a new CDN or cache provider'}
          </DialogDescription>
        </DialogHeader>
        <CacheProviderForm
          initialData={provider || undefined}
          onSubmit={handleSubmit}
          isLoading={isLoading}
        />
      </DialogContent>
    </Dialog>
  );
}
