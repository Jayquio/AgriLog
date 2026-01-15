import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { Overview } from "@/components/dashboard/overview";
import { YieldOverTimeChart } from "@/components/dashboard/yield-over-time-chart";
import { RecentRecords } from "@/components/dashboard/recent-records";
import { farmRecords } from "@/lib/data";
import type { FarmRecordWithProfit } from "@/lib/types";

function getRecordsWithProfit(): FarmRecordWithProfit[] {
  return farmRecords.map((record) => {
    const revenue = record.harvestQuantity * record.marketPrice;
    const profit = revenue - record.expenses;
    return { ...record, revenue, profit };
  });
}

export default function DashboardPage() {
  const recordsWithProfit = getRecordsWithProfit();

  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        title="Welcome Back, Farmer Juan!"
        description="Here's an overview of your farm's performance."
      >
        <Button asChild>
          <Link href="/dashboard/records">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add New Record
          </Link>
        </Button>
      </PageHeader>
      <Overview records={recordsWithProfit} />
      <div className="grid gap-6 lg:grid-cols-2">
        <YieldOverTimeChart records={recordsWithProfit} />
        <RecentRecords records={recordsWithProfit} />
      </div>
    </div>
  );
}
