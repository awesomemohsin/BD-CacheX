'use client';

import { useState, useEffect } from 'react';
import { PageHeader } from '@/components/shared/page-header';
import { ServersListTable } from '@/components/tables/servers-list-table';
import { ServerModal } from '@/components/shared/server-modal';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Server } from '@/lib/types';

export default function ServersPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedServer, setSelectedServer] = useState<Server | null>(null);

  useEffect(() => {
    document.title = 'Servers | BD CacheX';
  }, []);

  const handleAddClick = () => {
    setSelectedServer(null);
    setIsModalOpen(true);
  };

  const handleEdit = (server: Server) => {
    setSelectedServer(server);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedServer(null);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Servers"
        description="Manage cache servers and capacity allocation"
        action={
          <Button onClick={handleAddClick}>
            <Plus className="w-4 h-4 mr-2" />
            Add Server
          </Button>
        }
      />

      <div className="bg-white rounded-lg border border-slate-200">
        <ServersListTable onEdit={handleEdit} />
      </div>

      <ServerModal
        open={isModalOpen}
        server={selectedServer}
        onClose={handleCloseModal}
      />
    </div>
  );
}
