'use client';

import { useState, useEffect, Suspense } from 'react';
import { PageHeader } from '@/components/shared/page-header';
import { AllocationsTable } from '@/components/tables/allocations-table';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import Link from 'next/link';

export default function AllocationsPage() {
  useEffect(() => {
    document.title = 'Distributions | BD CacheX';
  }, []);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Distribution"
        description="View and manage cache distributions across servers"
        action={
          <Link href="/dashboard/allocations/new">
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              New Distribution
            </Button>
          </Link>
        }
      />

      <div className="bg-white rounded-lg border border-slate-200">
        <Suspense fallback={<div className="p-8 text-center text-slate-500">Loading distributions...</div>}>
          <AllocationsTable />
        </Suspense>
      </div>
    </div>
  );
}
