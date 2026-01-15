"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { FarmRecordWithProfit } from "@/lib/types";

export function RecordsClient({ records }: { records: FarmRecordWithProfit[] }) {
  const formatCurrency = (amount: number) =>
    `₱ ${amount.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
      <div className="lg:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Farm Records</CardTitle>
            <CardDescription>
              Manage and view all your farm records.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Crop</TableHead>
                  <TableHead>Planting Date</TableHead>
                  <TableHead className="hidden md:table-cell">Expenses</TableHead>
                  <TableHead className="hidden md:table-cell">Profit</TableHead>
                  <TableHead>
                    <span className="sr-only">Actions</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {records.map((record) => (
                  <TableRow key={record.id}>
                    <TableCell className="font-medium">{record.cropType}</TableCell>
                    <TableCell>{new Date(record.plantingDate).toLocaleDateString()}</TableCell>
                    <TableCell className="hidden md:table-cell">{formatCurrency(record.expenses)}</TableCell>
                    <TableCell className="hidden md:table-cell">{formatCurrency(record.profit)}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button aria-haspopup="true" size="icon" variant="ghost">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Toggle menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                          <DropdownMenuItem>Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter>
            <div className="text-xs text-muted-foreground">
              Showing <strong>1-{records.length}</strong> of <strong>{records.length}</strong> records
            </div>
          </CardFooter>
        </Card>
      </div>

      <div>
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Add New Record</CardTitle>
            <CardDescription>
              Fill out the form to add a new farm record.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="cropType">Crop Type</Label>
                <Input id="cropType" placeholder="e.g., Rice" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="area">Area (hectares)</Label>
                <Input id="area" type="number" placeholder="e.g., 2.5" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
               <div className="space-y-2">
                <Label htmlFor="plantingDate">Planting Date</Label>
                <Input id="plantingDate" type="date" />
              </div>
               <div className="space-y-2">
                <Label htmlFor="harvestDate">Harvest Date</Label>
                <Input id="harvestDate" type="date" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="expenses">Expenses (₱)</Label>
                <Input id="expenses" type="number" placeholder="e.g., 15000" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="harvestQuantity">Harvest Quantity</Label>
                <Input id="harvestQuantity" type="number" placeholder="e.g., 120" />
              </div>
            </div>
             <div className="space-y-2">
                <Label htmlFor="marketPrice">Market Price (per unit)</Label>
                <Input id="marketPrice" type="number" placeholder="e.g., 1200" />
              </div>
            <div className="space-y-2">
              <Label htmlFor="inputsUsed">Inputs Used</Label>
              <Textarea
                id="inputsUsed"
                placeholder="List fertilizers, pesticides, etc."
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save Record</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
