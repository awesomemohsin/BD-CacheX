'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { PageHeader } from '@/components/shared/page-header';
import { AllocationForm } from '@/components/forms/allocation-form';
import { Card, CardContent } from '@/components/ui/card';
import { Allocation } from '@/lib/types';
import { toast } from 'sonner';
import { AlertCircle } from 'lucide-react';

export default function NewAllocationPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [errorState, setErrorState] = useState<{ message: string; duplicateId?: string } | null>(null);

  useEffect(() => {
    document.title = 'New Distribution | BD CacheX';
  }, []);

  const handleSubmit = async (data: Partial<Allocation>) => {
    setIsLoading(true);
    setErrorState(null);
    try {
      const res = await fetch('/api/allocations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (result.success) {
        toast.success('Distribution created successfully');
        import('swr').then(({ mutate }) => {
          mutate('/api/allocations');
          mutate('/api/servers');
        });
        router.push('/dashboard/allocations');
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

      {errorState && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3 text-red-800">
          <AlertCircle className="w-5 h-5 shrink-0 text-red-600 mt-0.5" />
          <div className="text-sm">
            <p className="font-semibold">{errorState.message}</p>
            {errorState.duplicateId && (
              <p className="mt-1 text-xs text-red-700">
                Reference ID:{' '}
                <a
                  href={`/dashboard/allocations?id=${errorState.duplicateId.substring(0, 6)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono underline hover:text-red-900 font-semibold"
                >
                  {errorState.duplicateId.substring(0, 6)}
                </a>
              </p>
            )}
          </div>
        </div>
      )}

      <Card>
        <CardContent className="pt-6">
          <AllocationForm onSubmit={handleSubmit} isLoading={isLoading} />
        </CardContent>
      </Card>
    </div>
  );
}
