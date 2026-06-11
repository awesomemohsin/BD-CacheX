'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ServerForm } from '@/components/forms/server-form';
import { Server } from '@/lib/types';
import { toast } from 'sonner';

interface ServerModalProps {
  open: boolean;
  server?: Server | null;
  onClose: () => void;
}

export function ServerModal({ open, server, onClose }: ServerModalProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (data: Partial<Server>) => {
    setIsLoading(true);
    try {
      const url = server ? `/api/servers/${server.id}` : '/api/servers';
      const method = server ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (result.success) {
        toast.success(server ? 'Server updated successfully' : 'Server added successfully');
        // Trigger global SWR mutation to reload tables
        import('swr').then(({ mutate }) => {
          mutate('/api/servers');
        });
        onClose();
      } else {
        toast.error(result.error || 'Failed to save server');
      }
    } catch (error) {
      toast.error('Failed to save server');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {server ? 'Edit Server' : 'Add New Server'}
          </DialogTitle>
          <DialogDescription>
            {server
              ? 'Update the server information'
              : 'Add a new cache server to the system'}
          </DialogDescription>
        </DialogHeader>
        <ServerForm
          initialData={server || undefined}
          onSubmit={handleSubmit}
          isLoading={isLoading}
        />
      </DialogContent>
    </Dialog>
  );
}
