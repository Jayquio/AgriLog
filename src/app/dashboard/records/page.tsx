import { PageHeader } from "@/components/page-header";
import { RecordsClient } from "@/components/dashboard/records/client";
import { farmRecords } from "@/lib/data";
import type { FarmRecordWithProfit } from "@/lib/types";

function getRecordsWithProfit(): FarmRecordWithProfit[] {
  return farmRecords.map((record) => {
    const revenue = record.harvestQuantity * record.marketPrice;
    const profit = revenue - record.expenses;
    return { ...record, revenue, profit };
  }).sort((a, b) => new Date(b.harvestDate).getTime() - new Date(a.harvestDate).getTime());
}

export default function RecordsPage() {
  const records = getRecordsWithProfit();

  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        title="Farm Records"
        description="A complete history of your farm's activities."
      />
      <RecordsClient records={records} />
    </div>
  );
}
