import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DollarSign, BarChart, ShoppingBag, Leaf } from "lucide-react";
import type { FarmRecordWithProfit } from "@/lib/types";

export function Overview({ records }: { records: FarmRecordWithProfit[] }) {
  const totalProfit = records.reduce((sum, record) => sum + record.profit, 0);
  const totalYield = records.reduce(
    (sum, record) => sum + record.harvestQuantity,
    0
  );
  const totalExpenses = records.reduce(
    (sum, record) => sum + record.expenses,
    0
  );
  const uniqueCrops = new Set(records.map((r) => r.cropType)).size;

  const formatCurrency = (amount: number) => {
    return `₱ ${amount.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Profit</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold font-headline">
            {formatCurrency(totalProfit)}
          </div>
          <p className="text-xs text-muted-foreground">
            Across {records.length} harvest cycles
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Yield</CardTitle>
          <BarChart className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold font-headline">
            {totalYield.toLocaleString()}
            <span className="text-sm font-normal text-muted-foreground">
              {" "}
              kg/sacks
            </span>
          </div>
          <p className="text-xs text-muted-foreground">
            From all recorded harvests
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
          <ShoppingBag className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold font-headline">
            {formatCurrency(totalExpenses)}
          </div>
          <p className="text-xs text-muted-foreground">
            Total operational costs
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Crops Planted</CardTitle>
          <Leaf className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold font-headline">{uniqueCrops}</div>
          <p className="text-xs text-muted-foreground">
            Unique crop varieties
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
