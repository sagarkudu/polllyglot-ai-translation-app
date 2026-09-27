import "dotenv/config";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.AI_KEY,
  baseURL: process.env.AI_URL,
});

const languageNames = {
  fr: "French",
  es: "Spanish",
  ja: "Japanese",
};

export async function translateText(text, language) {
  const targetLanguage = languageNames[language];

  if (!targetLanguage) {
    throw new Error("Unsupported language");
  }

  const response = await openai.responses.create({
    model: process.env.AI_MODEL,

    instructions: `
You are a professional translation engine.

Translate the user's text into ${targetLanguage}.

Rules:
- Return only the translated text.
- Do not add explanations.
- Do not add quotes.
- Preserve the original meaning.
- Preserve paragraphs and line breaks where possible.
`,

    input: text,
  });

  return response.output_text.trim();
}
