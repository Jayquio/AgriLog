'use client';

import { useState, useEffect } from 'react';
import { collection, query, getDocs, where } from 'firebase/firestore';
import { useFirestore } from '@/firebase';
import type { User, FarmRecord } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';

export default function AdminPageRoot() {
  const db = useFirestore();

  const [stats, setStats] = useState({
    totalFarmers: 0,
    totalAreaFarmed: 0,
    totalRecords: 0,
    activeThisMonth: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!db) return;

    const fetchStats = async () => {
      try {
        // Total farmers: count users collection
        const usersQuery = query(collection(db, 'users'));
        const usersSnapshot = await getDocs(usersQuery);
        const totalFarmers = usersSnapshot.size;
        const usersData = usersSnapshot.docs.map((doc) => doc.data() as User);

        // Total Area Farmed
        const totalAreaFarmed = usersData.reduce(
          (sum, user) => sum + (user.totalArea || 0),
          0
        );

        // Total records: count farmRecords collection
        const recordsQuery = query(collection(db, 'farmRecords'));
        const recordsSnapshot = await getDocs(recordsQuery);
        const totalRecords = recordsSnapshot.size;

        // Active farmers this month: count unique farmers with recent records
        const now = new Date();
        const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        const activeQuery = query(
          collection(db, 'farmRecords'),
          where('harvestDate', '>=', firstDayOfMonth.toISOString().split('T')[0])
        );
        const activeSnapshot = await getDocs(activeQuery);
        const activeFarmerIds = new Set(
          activeSnapshot.docs.map((doc) => (doc.data() as FarmRecord).farmerId)
        );
        const activeThisMonth = activeFarmerIds.size;

        setStats({
          totalFarmers,
          totalAreaFarmed,
          totalRecords,
          activeThisMonth,
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [db]);

  const StatCard = ({
    title,
    value,
    progress,
    color = 'bg-primary',
  }: {
    title: string;
    value: number | string;
    progress: number;
    color?: string;
  }) => (
    <div className="bg-card border rounded-xl p-6 shadow-lg hover:shadow-xl transition-all">
      <p className="text-sm font-medium text-muted-foreground mb-2">{title}</p>
      <div className="text-3xl font-bold text-foreground mb-4">{value}</div>
      <div className="w-full bg-muted rounded-full h-3">
        <div
          className={`h-3 rounded-full ${color} transition-all duration-1000`}
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="text-xs text-muted-foreground mt-2">{progress}%</p>
    </div>
  );

  if (loading) {
    return (
      <div>
        <h1 className="text-3xl font-bold mb-8 font-headline">Admin Dashboard</h1>
        <p className="text-muted-foreground mb-8">
          Loading aggregated data & analytics...
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Skeleton className="h-40 rounded-xl" />
          <Skeleton className="h-40 rounded-xl" />
          <Skeleton className="h-40 rounded-xl" />
          <Skeleton className="h-40 rounded-xl" />
        </div>
      </div>
    );
  }

  const formattedTotalArea = `${stats.totalAreaFarmed.toLocaleString()} ha`;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 font-headline">Admin Dashboard</h1>
      <p className="text-muted-foreground mb-8">
        Aggregated data & analytics for farmers
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Farmers"
          value={stats.totalFarmers}
          progress={75}
          color="bg-chart-1"
        />
        <StatCard
          title="Total Area Farmed"
          value={formattedTotalArea}
          progress={40}
          color="bg-chart-2"
        />
        <StatCard
          title="Total Records"
          value={stats.totalRecords}
          progress={20}
          color="bg-chart-3"
        />
        <StatCard
          title="Active Farmers"
          value={stats.activeThisMonth}
          progress={60}
          color="bg-chart-4"
        />
      </div>
    </div>
  );
}
