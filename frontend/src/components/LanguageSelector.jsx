import { useEffect, useMemo, useRef, useState } from "react";
import { LANGUAGES, OTHER_LANGUAGES } from "../constants/languages";

function LanguageSelector({ value, onChange }) {
  const [otherSearch, setOtherSearch] = useState("");
  const [otherOpen, setOtherOpen] = useState(false);
  const containerRef = useRef(null);

  const isOtherSelected = value?.startsWith("other:");

  const selectedOtherLanguage = useMemo(() => {
    if (!isOtherSelected) return null;

    const code = value.slice("other:".length);
    return OTHER_LANGUAGES.find((language) => language.code === code) || null;
  }, [value, isOtherSelected]);

  const suggestions = useMemo(() => {
    const query = otherSearch.trim().toLocaleLowerCase();

    if (!query) return OTHER_LANGUAGES.slice(0, 8);

    return OTHER_LANGUAGES
      .filter((language) => {
        const name = language.name.toLocaleLowerCase();
        const nativeName = language.nativeName.toLocaleLowerCase();

        return name.includes(query) || nativeName.includes(query);
      })
      .sort((a, b) => {
        const aName = a.name.toLocaleLowerCase();
        const bName = b.name.toLocaleLowerCase();

        const aStarts = aName.startsWith(query);
        const bStarts = bName.startsWith(query);

        if (aStarts !== bStarts) return aStarts ? -1 : 1;

        return aName.localeCompare(bName);
      })
      .slice(0, 8);
  }, [otherSearch]);

  useEffect(() => {
    function handleOutsideClick(event) {
      if (!containerRef.current?.contains(event.target)) {
        setOtherOpen(false);
      }
    }

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const handleOtherSelect = (language) => {
    onChange(`other:${language.code}`);
    setOtherSearch("");
    setOtherOpen(false);
  };

  const handleOtherInput = (event) => {
    const nextValue = event.target.value;

    setOtherSearch(nextValue);
    setOtherOpen(true);

    // Selecting Other clears any previously selected custom language.
    if (!isOtherSelected) {
      onChange("other:");
    }
  };

  return (
    <div className="language-list">
      {LANGUAGES.map((language) => (
        <label key={language.code} className="language-option">
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

      <div className="other-language-wrapper" ref={containerRef}>
        <label className="language-option">
          <input
            type="radio"
            name="language"
            value="other"
            checked={isOtherSelected}
            onChange={() => {
              onChange("other:");
              setOtherSearch("");
              setOtherOpen(true);
            }}
          />

          <span className="radio-custom"></span>

          <span className="language-name">
            Other
          </span>

          <span className="language-flag">
            🌎
          </span>
        </label>

        {isOtherSelected && (
          <div className="other-language-search">
            <input
              type="text"
              className="language-search-input"
              value={
                selectedOtherLanguage && !otherOpen
                  ? `${selectedOtherLanguage.name} — ${selectedOtherLanguage.nativeName}`
                  : otherSearch
              }
              onChange={handleOtherInput}
              onFocus={() => {
                setOtherOpen(true);

                if (selectedOtherLanguage) {
                  setOtherSearch(selectedOtherLanguage.name);
                }
              }}
              onKeyDown={(event) => {
                if (event.key === "Escape") {
                  setOtherOpen(false);
                }
              }}
              placeholder="Type a language..."
              autoComplete="off"
              aria-label="Search for another language"
            />

            {otherOpen && (
              <div className="language-suggestions" role="listbox">
                {suggestions.length > 0 ? (
                  suggestions.map((language) => (
                    <button
                      type="button"
                      className="language-suggestion"
                      key={language.code}
                      onMouseDown={(event) => event.preventDefault()}
                      onClick={() => handleOtherSelect(language)}
                    >
                      <span className="suggestion-name">
                        {language.name}
                      </span>

                      <span className="suggestion-native">
                        {language.nativeName}
                      </span>
                    </button>
                  ))
                ) : (
                  <div className="no-language-results">
                    No matching language found
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default LanguageSelector;
