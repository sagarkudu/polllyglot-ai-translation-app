import { LANGUAGES } from "../constants/languages";

function LanguageSelector({ value, onChange }) {
  return (
    <div className="language-list">
      {LANGUAGES.map((language) => (
        <label
          key={language.code}
          className="language-option"
        >
          <input
            type="radio"
            name="language"
            value={language.code}
            checked={value === language.code}
            onChange={(event) => onChange(event.target.value)}
          />

          <span className="radio-custom"></span>

          <span className="language-name">
            {language.name}
          </span>

          <span className="language-flag">
            {language.flag}
          </span>
        </label>
      ))}
    </div>
  );
}

export default LanguageSelector;