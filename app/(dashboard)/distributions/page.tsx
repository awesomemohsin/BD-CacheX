'use client';

import { useEffect, Suspense } from 'react';
import { PageHeader } from '@/components/shared/page-header';
import { DistributionsTable } from '@/components/tables/distributions-table';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import Link from 'next/link';

export default function DistributionsPage() {
  useEffect(() => {
    document.title = 'Distributions | BD CacheX';
  }, []);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Distribution"
        description="View and manage cache distributions across servers"
        action={
          <Link href="/dashboard/distributions/new">
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              New Distribution
            </Button>
          </Link>
        }
      />

      <div className="bg-white rounded-lg border border-slate-200">
        <Suspense fallback={<div className="p-8 text-center text-slate-500">Loading distributions...</div>}>
          <DistributionsTable />
        </Suspense>
      </div>
    </div>
  );
}
