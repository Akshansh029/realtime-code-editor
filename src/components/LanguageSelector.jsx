import React from "react";
import { LANGUAGE_VERSIONS } from "../constants";

const LanguageSelector = ({ selectedLanguage, handleLanguageChange }) => {
  const languages = Object.entries(LANGUAGE_VERSIONS);

  return (
    <div className="relative w-60">
      <select
        value={selectedLanguage}
        onChange={handleLanguageChange}
        className="w-full px-2 py-2 text-sm text-white bg-formBg border border-gray-700 rounded-lg shadow-lg appearance-none focus:outline-none focus:ring-2 focus:"
      >
        {languages.map(([language, version]) => (
          <option key={language} value={language}>
            {language} ({version})
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageSelector;
