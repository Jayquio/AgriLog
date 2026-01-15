"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Users, Leaf, Map, Tractor } from "lucide-react";
import type { Farmer } from "@/lib/types";

export function AdminClient({ farmers }: { farmers: Farmer[] }) {
  const totalFarmers = farmers.length;
  const totalArea = farmers.reduce((sum, f) => sum + f.totalArea, 0);
  const averageCrops =
    farmers.reduce((sum, f) => sum + f.cropCount, 0) / totalFarmers;

  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Farmers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-headline">{totalFarmers}</div>
            <p className="text-xs text-muted-foreground">
              Currently registered on the platform
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Area Farmed</CardTitle>
            <Map className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-headline">
              {totalArea.toLocaleString()}{" "}
              <span className="text-base font-normal">ha</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Total land area being tracked
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Crops/Farmer</CardTitle>
            <Leaf className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-headline">
              {averageCrops.toFixed(1)}
            </div>
            <p className="text-xs text-muted-foreground">
              Average crop variety per farmer
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Records</CardTitle>
            <Tractor className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-headline">125</div>
            <p className="text-xs text-muted-foreground">
              Farm records created this month
            </p>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Farmer Directory</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Farmer</TableHead>
                <TableHead>Location</TableHead>
                <TableHead className="hidden sm:table-cell">Total Area</TableHead>
                <TableHead className="hidden sm:table-cell">Crops</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {farmers.map((farmer) => (
                <TableRow key={farmer.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9">
                        <AvatarImage src={`https://picsum.photos/seed/${farmer.id}/40/40`} alt="Avatar" />
                        <AvatarFallback>{farmer.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="grid gap-0.5">
                        <p className="font-medium">{farmer.name}</p>
                        <p className="text-sm text-muted-foreground">{farmer.id}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{farmer.farmLocation}</TableCell>
                  <TableCell className="hidden sm:table-cell">
                    {farmer.totalArea} ha
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    {farmer.cropCount}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
