import { PageHeader } from "@/components/page-header";
import { PredictionClient } from "@/components/dashboard/yield-prediction/prediction-client";

export default function YieldPredictionPage() {
  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        title="AI Yield Prediction"
        description="Forecast your harvest quantity using our AI-powered tool."
      />
      <PredictionClient />
    </div>
  );
}
