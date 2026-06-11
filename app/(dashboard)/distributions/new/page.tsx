'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { PageHeader } from '@/components/shared/page-header';
import { DistributionForm } from '@/components/forms/distribution-form';
import { Card, CardContent } from '@/components/ui/card';
import { Distribution } from '@/lib/types';
import { toast } from 'sonner';
import { AlertCircle } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

export default function NewDistributionPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [errorState, setErrorState] = useState<{ message: string; duplicateId?: string } | null>(null);
  const [formKey, setFormKey] = useState(0);

  useEffect(() => {
    document.title = 'New Distribution | BD CacheX';
  }, []);

  const handleCloseErrorModal = () => {
    setErrorState(null);
    setFormKey((prev) => prev + 1);
  };

  const handleSubmit = async (data: Partial<Distribution>) => {
    setIsLoading(true);
    setErrorState(null);
    try {
      const res = await fetch('/api/distributions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (result.success) {
        toast.success('Distribution created successfully');
        import('swr').then(({ mutate }) => {
          mutate('/api/distributions');
          mutate('/api/servers');
        });
        router.push('/dashboard/distributions');
      } else {
        setErrorState({ message: result.error || 'Failed to create distribution', duplicateId: result.duplicateId });
        toast.error(result.error || 'Failed to create distribution');
      }
    } catch (error) {
      toast.error('Failed to create distribution');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Create New Distribution"
        description="Distribute cache capacity to a company"
      />

      <Dialog open={!!errorState} onOpenChange={handleCloseErrorModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-100 rounded-lg">
                <AlertCircle className="w-5 h-5 text-red-600" />
              </div>
              <DialogTitle className="text-red-950 font-bold">Duplicate Entry Found</DialogTitle>
            </div>
            <DialogDescription className="text-left text-slate-500 mt-2">
              {errorState?.message || 'A duplicate entry already exists in the system.'}
            </DialogDescription>
            {errorState?.duplicateId && (
              <div className="mt-4 p-4 bg-slate-50 border border-slate-200 rounded-xl">
                <p className="text-sm font-semibold text-slate-700">
                  Reference ID:{' '}
                  <a
                    href={`/dashboard/distributions?id=${errorState.duplicateId.substring(0, 6)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-blue-600 underline hover:text-blue-800 font-bold"
                  >
                    {errorState.duplicateId.substring(0, 6)}
                  </a>
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  Click on the Reference ID to view the existing distribution details in a new tab.
                </p>
              </div>
            )}
          </DialogHeader>
          <DialogFooter className="flex justify-end gap-3 pt-2">
            <Button variant="outline" onClick={handleCloseErrorModal}>
              Close & Clear Form
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Card>
        <CardContent className="pt-6">
          <DistributionForm key={formKey} onSubmit={handleSubmit} isLoading={isLoading} />
        </CardContent>
      </Card>
    </div>
  );
}
