// analyzer/services/geminiService.ts
import { GoogleGenAI } from "@google/genai";
import { GEMINI_MODEL_NAME } from "../constants";
import { SemanticAnalysisResult } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const analyzeSemanticChange = async (
  text1: string,
  text2: string
): Promise<SemanticAnalysisResult> => {
  // Replace the backtick‐literal with a normal string + "\n" concatenation:
  const prompt =
    "You are an expert text analyst. Compare the following two documents.\n" +
    "Document 1:\n" +
    "---\n" +
    text1 + "\n" +
    "---\n" +
    "Document 2:\n" +
    "---\n" +
    text2 + "\n" +
    "---\n" +
    "Based on your analysis, estimate the percentage of semantic meaning that has changed from Document 1 to Document 2.\n" +
    "A 0% change means the documents are semantically identical.\n" +
    "A 50% change means half of the core ideas or meanings have altered.\n" +
    "A 100% change means Document 2 is completely different in meaning—entirely unrelated topics or opposite views.\n" +
    "\n" +
    "Also, provide a brief justification (2-3 sentences) for your estimation, highlighting the key semantic shifts or retentions.\n" +
    "\n" +
    "Respond ONLY with a valid JSON object in the following format:\n" +
    "{\n" +
    "  \"semanticChangePercentage\": <number between 0 and 100>,\n" +
    "  \"justification\": \"<string explaining the reasoning>\"\n" +
    "}\n";

  try {
    const response = await ai.models.generateContent({
      model: GEMINI_MODEL_NAME,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        temperature: 0.2,
      },
    });

    // Guard against response.text being undefined
    if (response.text == null) {
      throw new Error("AI response did not contain any text.");
    }

    let jsonStr = response.text.trim();

    // Strip any “```json … ```” fencing, if present
    const fenceRegex = /^```(?:json)?\s*\n?(.*?)\n?\s*```$/s;
    const match = jsonStr.match(fenceRegex);
    if (match && match[1]) {
      jsonStr = match[1].trim();
    }

    const parsedData = JSON.parse(jsonStr);

    if (
      typeof parsedData.semanticChangePercentage !== "number" ||
      parsedData.semanticChangePercentage < 0 ||
      parsedData.semanticChangePercentage > 100
    ) {
      throw new Error(
        "Invalid semanticChangePercentage value received from API: " +
          parsedData.semanticChangePercentage
      );
    }
    if (typeof parsedData.justification !== "string") {
      throw new Error(
        "Invalid justification value received from API: " + parsedData.justification
      );
    }

    return parsedData as SemanticAnalysisResult;
  } catch (error) {
    console.error("Error analyzing semantic change with Gemini:", error);
    let errorMessage = "Failed to analyze semantic change. ";
    if (error instanceof Error) {
      if (error.message.includes("API Key not valid")) {
        errorMessage += "The API key is invalid or not authorized.";
      } else if (error.message.includes("Quota exceeded")) {
        errorMessage += "API quota exceeded. Please try again later.";
      } else {
        errorMessage += error.message;
      }
    } else {
      errorMessage += "An unknown error occurred.";
    }
    throw new Error(errorMessage);
  }
};
