import LanguageSelector from "./LanguageSelector";

function TranslationForm({
  text,
  language,
  onTextChange,
  onLanguageChange,
  onTranslate,
  loading,
  error,
}) {
  return (
    <div className="translation-card">

      <h2 className="section-title">
        Text to translate 👇
      </h2>

      <textarea
        className="translation-input"
        value={text}
        onChange={(event) => onTextChange(event.target.value)}
        placeholder="Enter text..."
        disabled={loading}
      />

      <h2 className="section-title language-title">
        Select language 👇
      </h2>

      <LanguageSelector
        value={language}
        onChange={onLanguageChange}
      />

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      <button
        className="primary-button"
        onClick={onTranslate}
        disabled={loading || !text.trim()}
      >
        {loading ? (
          <>
            <span className="spinner"></span>
            Translating...
          </>
        ) : (
          "Translate"
        )}
      </button>

    </div>
  );
}

export default TranslationForm;