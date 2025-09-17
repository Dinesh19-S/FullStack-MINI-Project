
import { GoogleGenAI } from "@google/genai";

if (!process.env.API_KEY) {
    console.warn("API_KEY environment variable not set. AI features will not work.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

export const getMovieSummary = async (movieTitle: string): Promise<string> => {
    if (!process.env.API_KEY) {
        return "AI features are disabled because the API key is not configured.";
    }
    try {
        const prompt = `Provide a short, exciting, one-paragraph summary for the movie titled "${movieTitle}". Do not include spoilers.`;
        
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });

        return response.text;
    } catch (error) {
        console.error("Error fetching movie summary from Gemini API:", error);
        return "Could not fetch the movie summary at this time. Please try again later.";
    }
};
