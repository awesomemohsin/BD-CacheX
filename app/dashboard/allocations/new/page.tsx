'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { PageHeader } from '@/components/shared/page-header';
import { AllocationForm } from '@/components/forms/allocation-form';
import { Card, CardContent } from '@/components/ui/card';
import { Allocation } from '@/lib/types';
import { toast } from 'sonner';

export default function NewAllocationPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (data: Partial<Allocation>) => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/allocations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (result.success) {
        toast.success('Allocation created successfully');
        import('swr').then(({ mutate }) => {
          mutate('/api/allocations');
          mutate('/api/servers');
        });
        router.push('/dashboard/allocations');
      } else {
        toast.error(result.error || 'Failed to create allocation');
      }
    } catch (error) {
      toast.error('Failed to create allocation');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Create New Allocation"
        description="Allocate cache capacity to a company"
      />

      <Card>
        <CardContent className="pt-6">
          <AllocationForm onSubmit={handleSubmit} isLoading={isLoading} />
        </CardContent>
      </Card>
    </div>
  );
}
