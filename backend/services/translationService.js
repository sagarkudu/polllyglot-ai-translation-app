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

const customLanguageNames = {
  af: "Afrikaans",
  sq: "Albanian",
  am: "Amharic",
  ar: "Arabic",
  hy: "Armenian",
  az: "Azerbaijani",
  eu: "Basque",
  be: "Belarusian",
  bn: "Bengali",
  bs: "Bosnian",
  bg: "Bulgarian",
  ca: "Catalan",
  zh: "Chinese",
  hr: "Croatian",
  cs: "Czech",
  da: "Danish",
  nl: "Dutch",
  et: "Estonian",
  fi: "Finnish",
  gl: "Galician",
  ka: "Georgian",
  de: "German",
  el: "Greek",
  gu: "Gujarati",
  he: "Hebrew",
  hi: "Hindi",
  hu: "Hungarian",
  is: "Icelandic",
  id: "Indonesian",
  ga: "Irish",
  it: "Italian",
  kn: "Kannada",
  kk: "Kazakh",
  km: "Khmer",
  ko: "Korean",
  lo: "Lao",
  lv: "Latvian",
  lt: "Lithuanian",
  mk: "Macedonian",
  ms: "Malay",
  ml: "Malayalam",
  mt: "Maltese",
  mr: "Marathi",
  mn: "Mongolian",
  ne: "Nepali",
  no: "Norwegian",
  fa: "Persian",
  pl: "Polish",
  pt: "Portuguese",
  pa: "Punjabi",
  ro: "Romanian",
  ru: "Russian",
  sr: "Serbian",
  sk: "Slovak",
  sl: "Slovenian",
  sw: "Swahili",
  sv: "Swedish",
  ta: "Tamil",
  te: "Telugu",
  th: "Thai",
  tr: "Turkish",
  uk: "Ukrainian",
  ur: "Urdu",
  uz: "Uzbek",
  vi: "Vietnamese",
  cy: "Welsh",
  zu: "Zulu",
};

function resolveTargetLanguage(language) {
  if (languageNames[language]) {
    return languageNames[language];
  }

  if (language?.startsWith("other:")) {
    const code = language.slice("other:".length);
    return customLanguageNames[code] || null;
  }

  return null;
}

export async function translateText(text, language) {
  const targetLanguage = resolveTargetLanguage(language);

  if (!targetLanguage) {
    throw new Error("Unsupported language");
  }

  const response = await openai.responses.create({
    model: process.env.AI_MODEL,

    instructions: `
You are a professional translation engine.

Translate the user's text into ${targetLanguage}.

Rules:
- The output MUST be written in ${targetLanguage}.
- Return only the translated text.
- Do not add explanations.
- Do not add quotes.
- Preserve the original meaning and tone.
- Preserve paragraphs and line breaks where possible.
- Do not transliterate the translation into another language.
`,

    input: text,
  });

  return response.output_text.trim();
}
