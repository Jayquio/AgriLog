'use client';

import { PageHeader } from '@/components/page-header';
import { AdminClient } from '@/components/dashboard/admin/admin-client';
import { useCollection, useFirestore } from '@/firebase';
import { collection, query } from 'firebase/firestore';
import { useMemo } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { FarmRecord, User } from '@/lib/types';

// This file is essentially the admin dashboard but at a top-level /admin route.
export default function AdminPageRoot() {
  const firestore = useFirestore();

  const usersQuery = useMemo(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'users'));
  }, [firestore]);

  const farmRecordsQuery = useMemo(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'farmRecords'));
  }, [firestore]);

  const { data: users, loading: usersLoading, error: usersError } = useCollection<User>(usersQuery);
  const { data: farmRecords, loading: recordsLoading, error: recordsError } =
    useCollection<FarmRecord>(farmRecordsQuery);

  const loading = usersLoading || recordsLoading;
  const error = usersError || recordsError;

  if (error) {
    return (
      <div className="flex flex-col gap-8">
        <PageHeader
          title="Admin Dashboard"
          description="Error loading data."
        />
        <Card>
          <CardHeader>
            <CardTitle className="text-destructive">Permission Denied</CardTitle>
          </CardHeader>
          <CardContent>
            <p>You do not have permission to view this data. Please ensure you are logged in as an administrator and have the correct permissions set in your Firestore user record.</p>
            <p className="mt-2 text-sm text-muted-foreground">Error: {error.message}</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        title="Admin Dashboard"
        description="Aggregated data and analytics for all farmers."
      />
      {loading ? (
        <div className="space-y-8">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Skeleton className="h-28" />
            <Skeleton className="h-28" />
            <Skeleton className="h-28" />
            <Skeleton className="h-28" />
          </div>
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-1/3" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        <AdminClient users={users} farmRecords={farmRecords} />
      )}
    </div>
  );
}
