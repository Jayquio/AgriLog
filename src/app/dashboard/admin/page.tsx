import { PageHeader } from '@/components/page-header';
import { AdminClient } from '@/components/dashboard/admin/admin-client';
import { AdminWrapper } from '@/components/layout/admin-wrapper';

export default function AdminPage() {
  return (
    <AdminWrapper>
      <div className="flex flex-col gap-8">
        <PageHeader
          title="Admin Dashboard"
          description="Aggregated data and analytics for all farmers."
        />
        <AdminClient />
      </div>
    </AdminWrapper>
  );
}
