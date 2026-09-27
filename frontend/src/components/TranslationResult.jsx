function TranslationResult({
  originalText,
  translation,
  onStartOver,
}) {
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

      <div className="result-box translation-output">
        {translation}
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