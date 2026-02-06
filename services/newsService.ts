
import { GoogleGenAI, Type } from "@google/genai";
import { NewsItem, Language } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const fetchLatestTechNews = async (
  category: string = 'Technology', 
  language: Language = 'bn',
  userPrefs: string[] = []
): Promise<NewsItem[]> => {
  const langNames = {
    'bn': 'Bengali (Bangla)',
    'en': 'English',
    'hi': 'Hindi'
  };

  const prefsText = userPrefs.length > 0 ? `Prioritize these interests: ${userPrefs.join(', ')}.` : '';
  
  // Updated prompt to fetch 50 items
  const prompt = `Find the 50 most recent and trending technology news stories globally from the last 48 hours. 
  Focus on categories like smartphones, AI, software updates, gadgets, and space tech. ${prefsText}
  Translate all headlines and summaries into ${langNames[language]}.
  Return the results as a JSON array of objects.
  
  Each object must have:
  - id: a unique string
  - title: A catchy headline in ${langNames[language]}
  - description: A 2-sentence summary in ${langNames[language]}
  - content: A detailed paragraph (about 120 words) in ${langNames[language]}
  - category: A short category tag in ${langNames[language]}
  - source: Name of the news source
  - timestamp: Relative time (e.g., '2 hours ago' translated to target language)
  - imageUrl: A descriptive prompt for a technology image
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              title: { type: Type.STRING },
              description: { type: Type.STRING },
              content: { type: Type.STRING },
              category: { type: Type.STRING },
              source: { type: Type.STRING },
              timestamp: { type: Type.STRING },
              imageUrl: { type: Type.STRING },
            },
            required: ["id", "title", "description", "content", "category", "source", "timestamp", "imageUrl"],
          },
        },
      },
    });

    const newsData = JSON.parse(response.text || "[]") as NewsItem[];
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    const sourceUrls = groundingChunks.map(chunk => chunk.web?.uri).filter(Boolean);

    return newsData.map((item, idx) => ({
      ...item,
      // Use a varied set of images based on the ID or index
      imageUrl: `https://picsum.photos/seed/${item.id || idx + Math.random()}/800/450`,
      url: sourceUrls[idx % sourceUrls.length] || sourceUrls[0] || undefined
    }));
  } catch (error) {
    console.error("Error fetching news:", error);
    return [];
  }
};
