import { translateText } from "../services/translationService.js";

export async function translateController(req, res) {
  try {
    const { text, language } = req.body;

    if (!text || !text.trim()) {
      return res.status(400).json({
        success: false,
        message: "Text is required",
      });
    }

    if (!language) {
      return res.status(400).json({
        success: false,
        message: "Language is required",
      });
    }

    const translation = await translateText(
      text,
      language
    );

    return res.status(200).json({
      success: true,
      translation,
    });

  } catch (error) {
    console.error("Translation error:", error);

    return res.status(500).json({
      success: false,
      message: "Translation failed",
    });
  }
}