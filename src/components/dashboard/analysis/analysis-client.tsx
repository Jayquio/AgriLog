"use client";

import { useState, useTransition, useMemo } from "react";
import { getCostVsProfitAnalysis } from "@/actions";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Lightbulb, Bot } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import { useUser } from "@/firebase/auth/use-user";
import { useCollection, useFirestore } from "@/firebase";
import { collection, query, where } from "firebase/firestore";

type AnalysisState = {
  message: string;
  data?: {
    analysis: string;
  };
};

export function AnalysisClient() {
  const { user } = useUser();
  const firestore = useFirestore();
  const [isPending, startTransition] = useTransition();
  const [analysisResult, setAnalysisResult] = useState<AnalysisState | null>(null);
  const { toast } = useToast();

  const farmRecordsQuery = useMemo(() => {
    if (!user) return null;
    return query(collection(firestore, "farmRecords"), where("farmerId", "==", user.uid));
  }, [user, firestore]);

  const { data: farmRecords, loading: recordsLoading } = useCollection<any>(farmRecordsQuery!);

  const handleAnalysis = () => {
    startTransition(async () => {
      if (!farmRecords || farmRecords.length === 0) {
        toast({
          title: "No data to analyze",
          description: "Please add some farm records first.",
          variant: "destructive",
        });
        return;
      }
      const result = await getCostVsProfitAnalysis(farmRecords);
      if (result.message !== "success") {
        toast({
          title: "Error",
          description: result.message,
          variant: "destructive",
        });
      }
      setAnalysisResult(result as AnalysisState);
    });
  };

  return (
    <div className="space-y-8">
       <Card>
        <CardHeader>
          <CardTitle className="font-headline">Start Analysis</CardTitle>
          <CardDescription>
            Click the button to analyze all your farm data and receive
            AI-powered insights on cost trends and profitability.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={handleAnalysis} disabled={isPending || recordsLoading}>
            {isPending ? "Analyzing..." : recordsLoading ? "Loading records..." : "Analyze My Farm Data"}
          </Button>
        </CardContent>
      </Card>

      {isPending && (
         <Card>
          <CardHeader>
             <Skeleton className="h-6 w-1/2" />
          </CardHeader>
          <CardContent className="space-y-4">
             <Skeleton className="h-4 w-full" />
             <Skeleton className="h-4 w-full" />
             <Skeleton className="h-4 w-3/4" />
          </CardContent>
        </Card>
      )}

      {analysisResult?.data && (
        <Card className="bg-secondary">
          <CardHeader>
            <CardTitle className="font-headline flex items-center gap-2">
              <Bot className="text-primary" /> Cost vs. Profit Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Alert>
              <Lightbulb className="h-4 w-4" />
              <AlertTitle>AI Insights & Recommendations</AlertTitle>
              <AlertDescription className="whitespace-pre-wrap">
                {analysisResult.data.analysis}
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      )}

      {!isPending && !analysisResult && (
         <div className="flex h-64 items-center justify-center rounded-lg border-2 border-dashed border-border bg-card p-8 text-center">
            <div>
              <h3 className="text-lg font-semibold">Awaiting Analysis</h3>
              <p className="text-muted-foreground">
                Your analysis results will appear here.
              </p>
            </div>
          </div>
      )}
    </div>
  );
}