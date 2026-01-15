import { PageHeader } from "@/components/page-header";
import { AdminClient } from "@/components/dashboard/admin/admin-client";
import { farmers } from "@/lib/data";

export default function AdminPage() {
  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        title="Admin Dashboard"
        description="Aggregated data and analytics for all farmers."
      />
      <AdminClient farmers={farmers} />
    </div>
  );
}
