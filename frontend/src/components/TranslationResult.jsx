import { useState } from "react";

function TranslationResult({
  originalText,
  translation,
  onStartOver,
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(translation);
      } else {
        // Fallback for non-secure/local environments.
        const textArea = document.createElement("textarea");
        textArea.value = translation;
        textArea.style.position = "fixed";
        textArea.style.left = "-9999px";
        textArea.style.top = "0";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
      }

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error("Failed to copy translation:", error);
      setCopied(false);
    }
  };

  return (
    <div className="translation-card result-card">

      <h2 className="section-title">
        Original text 👇
      </h2>

      <div className="result-box">
        {originalText}
      </div>

      <h2 className="section-title result-title">
        Your translation 👇
      </h2>

      <div className="translation-result-wrapper">
        <div className="result-box translation-output">
          {translation}
        </div>

        <button
          type="button"
          className={`copy-button ${copied ? "copied" : ""}`}
          onClick={handleCopy}
          title={copied ? "Copied!" : "Copy translation"}
          aria-label={copied ? "Translation copied" : "Copy translation"}
        >
          {copied ? "✓" : "⧉"}
        </button>
      </div>

      <div className="copy-status" aria-live="polite">
        {copied ? "Translation copied!" : ""}
      </div>

      <button
        className="primary-button"
        onClick={onStartOver}
      >
        Start Over
      </button>

    </div>
  );
}

export default TranslationResult;
