'use server';

import { GoogleGenerativeAI } from '@google/generative-ai';
import { z } from 'zod';

// Validate input using standard Zod
const CostVsProfitAnalysisInputSchema = z.object({
  farmRecords: z.array(
    z.object({
      cropType: z.string(),
      harvestDate: z.string(),
      expenses: z.number(),
      harvestQuantity: z.number(),
      marketPrice: z.number(),
    })
  ),
});

export async function costVsProfitAnalysis(input: any) {
  // 1. Validate Input
  const validationResult = CostVsProfitAnalysisInputSchema.safeParse(input);
  if (!validationResult.success) {
    throw new Error("Invalid data format");
  }
  
  const { farmRecords } = validationResult.data;

  // 2. Initialize AI directly (Make sure GOOGLE_GENAI_API_KEY is in your .env)
  const apiKey = process.env.GOOGLE_GENAI_API_KEY;
  if (!apiKey) throw new Error("Missing API Key");

  const genAI = new GoogleGenerativeAI(apiKey);
  
  // 3. Use the standard model (Flash is fast)
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

  // 4. Construct a simple text prompt (No complex Handlebars templates)
  const promptText = `
    You are an expert agricultural analyst. 
    Analyze these farm records and provide cost vs profit insights.
    
    Records:
    ${JSON.stringify(farmRecords, null, 2)}
    
    Instructions: 
    1. Calculate profit for each (Revenue - Expenses).
    2. Summarize total profitability.
    3. Give 3 tips to improve profit.
  `;

  try {
    // 5. Call the API
    const result = await model.generateContent(promptText);
    const response = result.response;
    const text = response.text();

    // 6. Return result
    return { analysis: text };

  } catch (error) {
    console.error("AI Error:", error);
    throw new Error("AI request failed: " + error);
  }
}
