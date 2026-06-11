'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/shared/page-header';
import { AllocationsTable } from '@/components/tables/allocations-table';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import Link from 'next/link';

export default function AllocationsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Allocations"
        description="View and manage cache allocations across servers"
        action={
          <Link href="/dashboard/allocations/new">
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              New Allocation
            </Button>
          </Link>
        }
      />

      <div className="bg-white rounded-lg border border-slate-200">
        <AllocationsTable />
      </div>
    </div>
  );
}
