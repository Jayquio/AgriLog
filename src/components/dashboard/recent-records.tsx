import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import type { FarmRecordWithProfit } from "@/lib/types";

export function RecentRecords({ records }: { records: FarmRecordWithProfit[] }) {
  const formatCurrency = (amount: number) =>
    `₱ ${amount.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-2">
          <CardTitle className="font-headline">Recent Harvests</CardTitle>
          <CardDescription>
            A list of your most recent farm records.
          </CardDescription>
        </div>
        <Button asChild size="sm" className="ml-auto gap-1">
          <Link href="/dashboard/records">
            View All
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Crop</TableHead>
              <TableHead className="hidden sm:table-cell">Harvest Date</TableHead>
              <TableHead className="hidden sm:table-cell">Yield</TableHead>
              <TableHead className="text-right">Profit</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {records.slice(0, 5).map((record) => (
              <TableRow key={record.id}>
                <TableCell>
                  <div className="font-medium">{record.cropType}</div>
                  <div className="hidden text-sm text-muted-foreground md:inline">
                    {record.area} ha
                  </div>
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                   {new Date(record.harvestDate).toLocaleDateString()}
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  <Badge className="text-xs" variant="secondary">
                    {record.harvestQuantity} {record.cropType === 'Vegetables' || record.cropType === 'Banana' ? 'kg' : 'sacks'}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className={`font-medium ${record.profit >= 0 ? 'text-primary-DEFAULT' : 'text-destructive'}`}>
                    {formatCurrency(record.profit)}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
