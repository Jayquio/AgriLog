'use server';

import { GoogleGenerativeAI } from '@google/generative-ai';
import { z } from 'zod';

const YieldPredictionInputSchema = z.object({
  cropType: z.string().describe('The type of crop (e.g., rice, corn, banana, vegetables).'),
  plantingDate: z.string().describe('The planting date of the crop (YYYY-MM-DD).'),
  area: z.number().describe('The area of the farm in hectares.'),
  expenses: z.number().describe('The expenses incurred in ₱ (seeds, fertilizer, labor).'),
  inputsUsed: z.string().describe('The types and amounts of inputs used (fertilizer, pesticides, etc.).'),
  pastHarvestData: z.string().describe('Historical harvest data for the farm (yield, inputs, expenses).'),
});
export type YieldPredictionInput = z.infer<typeof YieldPredictionInputSchema>;

const YieldPredictionOutputSchema = z.object({
  predictedYield: z.number().describe('The predicted yield in sacks/kg.'),
  confidence: z.number().describe('A confidence score (0-1) for the prediction.'),
  insights: z.string().describe('Insights and recommendations based on the prediction.'),
});
export type YieldPredictionOutput = z.infer<typeof YieldPredictionOutputSchema>;

export async function yieldPrediction(input: YieldPredictionInput): Promise<YieldPredictionOutput> {
  const validationResult = YieldPredictionInputSchema.safeParse(input);
  if (!validationResult.success) {
    throw new Error("Invalid data format for yield prediction");
  }
  
  const { cropType, plantingDate, area, expenses, inputsUsed, pastHarvestData } = validationResult.data;

  const apiKey = process.env.GOOGLE_GENAI_API_KEY;
  if (!apiKey) throw new Error("Missing API Key for Google AI");

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

  const promptText = `
    You are an AI-powered agricultural advisor for Filipino farmers. Based on the historical data, crop type, planting date, expenses, and inputs, predict the yield for the farm.

    Your response MUST be a valid JSON object with the following keys: "predictedYield" (number), "confidence" (a number between 0 and 1), and "insights" (string).

    Your analysis should be based on the following information:

    Crop Type: ${cropType}
    Planting Date: ${plantingDate}
    Area (hectares): ${area}
    Expenses (₱): ${expenses}
    Inputs Used: ${inputsUsed}
    Past Harvest Data: ${pastHarvestData}
  `;

  try {
    const result = await model.generateContent(promptText);
    const response = result.response;
    const text = response.text();

    // The AI might wrap the JSON in markdown, so we clean it.
    const cleanedJson = text.replace(/```json\n?/g, '').replace(/```/g, '').trim();
    const parsedOutput = JSON.parse(cleanedJson);
    
    // Validate the output to ensure it matches the schema
    const outputValidation = YieldPredictionOutputSchema.safeParse(parsedOutput);
    if (!outputValidation.success) {
      throw new Error("AI returned data in an unexpected format.");
    }

    return outputValidation.data;

  } catch (error: any) {
    console.error("AI Error (Yield Prediction):", error);
    throw new Error("AI request failed for yield prediction: " + error.message);
  }
}
