'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/shared/page-header';
import { CompaniesListTable } from '@/components/tables/companies-list-table';
import { CompanyModal } from '@/components/shared/company-modal';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Company } from '@/lib/types';

export default function CompaniesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);

  const handleAddClick = () => {
    setSelectedCompany(null);
    setIsModalOpen(true);
  };

  const handleEdit = (company: Company) => {
    setSelectedCompany(company);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCompany(null);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Companies"
        description="Manage ISPs and Internet Interchange Gateways"
        action={
          <Button onClick={handleAddClick}>
            <Plus className="w-4 h-4 mr-2" />
            Add Company
          </Button>
        }
      />

      <div className="bg-white rounded-lg border border-slate-200">
        <CompaniesListTable onEdit={handleEdit} />
      </div>

      <CompanyModal
        open={isModalOpen}
        company={selectedCompany}
        onClose={handleCloseModal}
      />
    </div>
  );
}
