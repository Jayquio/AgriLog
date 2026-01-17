
'use client';

import { PageHeader } from "@/components/page-header";
import { RecordsClient } from "@/components/dashboard/records/client";
import type { FarmRecordWithProfit } from "@/lib/types";
import { useUser } from "@/firebase/auth/use-user";
import { useCollection, useFirestore } from "@/firebase";
import { collection, query, where } from "firebase/firestore";
import { useMemo } from "react";
import { Skeleton } from "@/components/ui/skeleton";

function getRecordsWithProfit(records: any[] | null | undefined): FarmRecordWithProfit[] {
  if (!records) return [];
  return records
    .map((record) => {
      const revenue = Number(record.harvestQuantity) * Number(record.marketPrice);
      const profit = revenue - Number(record.expenses || 0);
      return { ...record, revenue, profit };
    })
    .sort(
      (a, b) =>
        new Date(b.harvestDate ?? 0).getTime() - new Date(a.harvestDate ?? 0).getTime()
    );
}

export default function RecordsPage() {
  const { user, loading: userLoading } = useUser();
  const firestore = useFirestore();

  const farmRecordsQuery = useMemo(() => {
    if (!user) return null;
    return query(collection(firestore, "farmRecords"), where("farmerId", "==", user.uid));
  }, [user, firestore]);

  const { data: farmRecords, loading: recordsLoading } = useCollection<any>(farmRecordsQuery!);

  const records = useMemo(() => getRecordsWithProfit(farmRecords), [farmRecords]);

  const loading = userLoading || recordsLoading;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col gap-8">
        <PageHeader
          title="Farm Records"
          description="A complete history of your farm's activities."
        />
        {loading ? (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <Skeleton className="h-96 w-full" />
            </div>
            <div>
              <Skeleton className="h-96 w-full" />
            </div>
          </div>
        ) : (
          <RecordsClient records={records} />
        )}
      </div>
    </div>
  );
}
