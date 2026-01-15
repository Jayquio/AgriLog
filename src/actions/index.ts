"use server";

import { z } from "zod";
import {
  yieldPrediction,
  YieldPredictionInput,
} from "@/ai/flows/yield-prediction";
import {
  costVsProfitAnalysis,
  CostVsProfitAnalysisInput,
} from "@/ai/flows/cost-vs-profit-analysis";
import { farmRecords as allFarmRecords } from "@/lib/data";

const yieldPredictionSchema = z.object({
  cropType: z.string().min(1, "Crop type is required."),
  plantingDate: z.string().min(1, "Planting date is required."),
  area: z.coerce.number().positive("Area must be a positive number."),
  expenses: z.coerce.number().positive("Expenses must be a positive number."),
  inputsUsed: z.string().min(1, "Inputs used are required."),
});

export async function getYieldPrediction(prevState: any, formData: FormData) {
  const validatedFields = yieldPredictionSchema.safeParse({
    cropType: formData.get("cropType"),
    plantingDate: formData.get("plantingDate"),
    area: formData.get("area"),
    expenses: formData.get("expenses"),
    inputsUsed: formData.get("inputsUsed"),
  });

  if (!validatedFields.success) {
    return {
      message: "Invalid form data",
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    const input: YieldPredictionInput = {
      ...validatedFields.data,
      pastHarvestData: JSON.stringify(allFarmRecords.slice(0, 2)), // Use some mock past data
    };
    const result = await yieldPrediction(input);
    return { message: "success", data: result };
  } catch (error) {
    console.error(error);
    return { message: "Prediction failed. Please try again." };
  }
}

export async function getCostVsProfitAnalysis() {
  try {
    const input: CostVsProfitAnalysisInput = {
      farmRecords: allFarmRecords,
    };
    const result = await costVsProfitAnalysis(input);
    return { message: "success", data: result };
  } catch (error) {
    console.error(error);
    return { message: "Analysis failed. Please try again." };
  }
}
