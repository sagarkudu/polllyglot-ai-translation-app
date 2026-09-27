import { useState } from "react";

import TranslationForm from "../components/TranslationForm";
import TranslationResult from "../components/TranslationResult";

import { translateText } from "../services/translationService";
import Header from "../layout/Header";

function TranslatorPage() {
  const [text, setText] = useState("");
  const [language, setLanguage] = useState("hi");

  const [translation, setTranslation] = useState("");

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [step, setStep] = useState("input");

  const handleTranslate = async () => {
    if (!text.trim()) {
      setError("Please enter some text.");
      return;
    }

    try {
      setError("");
      setLoading(true);

      const result = await translateText(text, language);

      setTranslation(result.translation);

      setStep("result");
    } catch (error) {
      console.error(error);

      setError("Unable to translate. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleStartOver = () => {
    setText("");
    setTranslation("");
    setLanguage("hi");
    setError("");
    setStep("input");
  };

  return (
    <div className="app">
      <Header />

      <main className="main-content">
        {step === "input" && (
          <TranslationForm
            text={text}
            language={language}
            onTextChange={setText}
            onLanguageChange={setLanguage}
            onTranslate={handleTranslate}
            loading={loading}
            error={error}
          />
        )}

        {step === "result" && (
          <TranslationResult
            originalText={text}
            translation={translation}
            onStartOver={handleStartOver}
          />
        )}
      </main>
    </div>
  );
}

export default TranslatorPage;
