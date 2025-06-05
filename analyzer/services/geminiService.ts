
import { GoogleGenAI } from "@google/genai"; 
import { GEMINI_MODEL_NAME } from '../constants';
import { SemanticAnalysisResult } from "../types"; // Type information is for build time

// Initialize the GoogleGenAI client directly with process.env.API_KEY
// The API key's presence and validity are assumed to be handled by the environment.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY }); 

export const analyzeSemanticChange = async (text1: string, text2: string): Promise<SemanticAnalysisResult> => {
  // The explicit check for process.env.API_KEY has been removed.
  // We assume the API key is pre-configured and valid when 'ai' instance is created.
  // If the key is invalid, the ai.models.generateContent call below should fail and be caught.

  const prompt = \`
You are an expert text analyst. Compare the following two documents.
Document 1:
---
\${text1}
---
Document 2:
---
\${text2}
---
Based on your analysis, estimate the percentage of semantic meaning that has changed from Document 1 to Document 2.
A 0% change means the documents are semantically identical.
A 50% change means half of the core ideas or meanings have altered.
A 100% change means Document 2 is completely different in meaning from Document 1, discussing entirely unrelated topics or expressing opposite views on all subjects.

Also, provide a brief justification (2-3 sentences) for your estimation, highlighting the key semantic shifts or retentions.

Respond ONLY with a valid JSON object in the following format:
{
  "semanticChangePercentage": <number between 0 and 100>,
  "justification": "<string explaining the reasoning>"
}
Do not include any other text, explanations, or markdown formatting outside of this JSON object.
\`;

  try {
    const response = await ai.models.generateContent({
      model: GEMINI_MODEL_NAME,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        temperature: 0.2,
      },
    });

    let jsonStr = response.text.trim();
    
    const fenceRegex = /^\`\`\`(?:json)?\\s*\\n?(.*?)\\n?\\s*\`\`\`$/s;
    const match = jsonStr.match(fenceRegex);
    if (match && match[1]) { 
      jsonStr = match[1].trim();
    }
    
    const parsedData = JSON.parse(jsonStr);

    if (typeof parsedData.semanticChangePercentage !== 'number' || parsedData.semanticChangePercentage < 0 || parsedData.semanticChangePercentage > 100) {
        throw new Error("Invalid semanticChangePercentage value received from API: " + parsedData.semanticChangePercentage);
    }
    if (typeof parsedData.justification !== 'string') {
        throw new Error("Invalid justification value received from API: " + parsedData.justification);
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
        }
        // The specific error message "Gemini API Key is not configured" was tied to the removed check.
        // Other messages from the API or parsing errors will be appended.
        else {
            errorMessage += error.message;
        }
    } else {
        errorMessage += "An unknown error occurred.";
    }
    throw new Error(errorMessage);
  }
};
