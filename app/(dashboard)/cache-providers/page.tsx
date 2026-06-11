'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/shared/page-header';
import { CacheProvidersListTable } from '@/components/tables/cache-providers-list-table';
import { CacheProviderModal } from '@/components/shared/cache-provider-modal';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { CacheProvider } from '@/lib/types';

export default function CacheProvidersPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState<CacheProvider | null>(null);

  const handleAddClick = () => {
    setSelectedProvider(null);
    setIsModalOpen(true);
  };

  const handleEdit = (provider: CacheProvider) => {
    setSelectedProvider(provider);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProvider(null);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Cache Providers"
        description="Manage content delivery network partners"
        action={
          <Button onClick={handleAddClick}>
            <Plus className="w-4 h-4 mr-2" />
            Add Provider
          </Button>
        }
      />

      <div className="bg-white rounded-lg border border-slate-200">
        <CacheProvidersListTable onEdit={handleEdit} />
      </div>

      <CacheProviderModal
        open={isModalOpen}
        provider={selectedProvider}
        onClose={handleCloseModal}
      />
    </div>
  );
}
