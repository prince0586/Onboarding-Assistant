import { GoogleGenAI, Type } from "@google/genai";
import { UserProfile, Task } from "../types";

const getAiClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.error("API_KEY is missing in environment variables.");
    throw new Error("API Key missing");
  }
  return new GoogleGenAI({ apiKey });
};

export const generateAssistantResponse = async (
  message: string,
  history: { role: 'user' | 'model'; text: string }[],
  userProfile: UserProfile
): Promise<string> => {
  const ai = getAiClient();
  
  // Construct a system instruction that gives the model context about the user
  const systemInstruction = `
    You are 'Orion', a friendly, professional, and encouraging Onboarding Assistant at a company called 'Nebula Innovate'.
    You are speaking to a new employee named ${userProfile.name}, who is a ${userProfile.role} in the ${userProfile.department} department.
    Their start date is ${userProfile.startDate}.
    
    Your goal is to help them navigate their first few weeks.
    - Be concise and actionable.
    - If asked about company specifics (like wifi passwords or lunch hours), invent plausible, pleasant answers consistent with a modern tech company culture.
    - If the user seems stressed, offer reassurance.
    - Use Markdown for formatting lists or emphasis.
  `;

  // Convert simple history to Gemini chat history format if needed, 
  // but for single turn text generation with context, we can just append to prompt or use chat session.
  // Using chat session for better flow.
  const chat = ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction,
    },
    history: history.map(h => ({
      role: h.role,
      parts: [{ text: h.text }],
    })),
  });

  try {
    const result = await chat.sendMessage({ message });
    return result.text || "I'm sorry, I couldn't generate a response at this time.";
  } catch (error) {
    console.error("Gemini Chat Error:", error);
    return "I'm having trouble connecting to the server. Please try again later.";
  }
};

export const generateRoleBasedTasks = async (userProfile: UserProfile): Promise<Partial<Task>[]> => {
  const ai = getAiClient();

  const prompt = `
    Generate 3 specific onboarding tasks for a new ${userProfile.role} in the ${userProfile.department} department.
    Return the response as a JSON array of objects with 'title', 'description', and 'category' keys.
    'category' must be one of: 'Day 1', 'Week 1', or 'Month 1'.
    Do not include markdown code blocks, just the raw JSON.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              description: { type: Type.STRING },
              category: { type: Type.STRING, enum: ['Day 1', 'Week 1', 'Month 1'] }
            },
            required: ['title', 'description', 'category']
          }
        }
      }
    });

    const text = response.text;
    if (!text) return [];
    
    // Parse JSON
    const tasks = JSON.parse(text);
    return tasks;
  } catch (error) {
    console.error("Gemini Task Gen Error:", error);
    return [];
  }
};
