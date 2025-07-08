import { config } from "@dotenvx/dotenvx";
import { GoogleGenAI } from "@google/genai";

config();

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

export { ai };