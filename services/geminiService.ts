import { GoogleGenAI } from "@google/genai";
import { YearlyData } from '../types';

export const analyzeEnergyData = async (data: YearlyData[]): Promise<{ title: string; growth: string; description: string; suggestion: string } | null> => {
  try {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      console.warn("API Key not found, using mock insight.");
      return null;
    }

    const ai = new GoogleGenAI({ apiKey });
    const model = 'gemini-2.5-flash';

    // Prepare a summary of the latest data for the prompt
    const latestYear = data[data.length - 1];
    const firstYear = data[0];
    const dataSummary = JSON.stringify({
      startYear: firstYear,
      endYear: latestYear
    });

    const prompt = `
      Act as an energy analyst. Analyze this JSON summary of US Residential Electricity Consumption per capita: ${dataSummary}.
      Provide a JSON response with the following 4 fields (no markdown, just raw JSON):
      1. "title": A short catchy title (max 3 words) about the trend (e.g., "Rising Demand").
      2. "growth": The percentage change from start to end year formatted as string (e.g., "+12%").
      3. "description": A very brief sentence (max 15 words) explaining why.
      4. "suggestion": A 2-word strategic suggestion (e.g., "Review Efficiency").
    `;

    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        responseMimeType: 'application/json'
      }
    });

    const text = response.text;
    if (!text) return null;
    
    return JSON.parse(text);

  } catch (error) {
    console.error("Gemini analysis failed:", error);
    return null;
  }
};