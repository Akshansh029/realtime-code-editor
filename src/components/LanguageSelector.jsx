import React, { useEffect, useState } from "react";

const LanguageSelector = () => {
  const languageVersions = {
    javascript: "18.15.0",
    typescript: "5.0.3",
    python: "3.10.0",
    java: "15.0.2",
    csharp: "6.12.0",
    php: "8.2.3",
  };

  const languages = Object.entries(languageVersions);

  const [selectedLanguage, setSelectedLanguage] = useState("javascript");

  const handleLanguageChange = (e) => {
    setSelectedLanguage(e.target.value);
  };

  //   useEffect(() => {
  //     console.log(selectedLanguage);
  //   }, [selectedLanguage]);

  return (
    <div className="relative w-60">
      <select
        value={selectedLanguage}
        onChange={handleLanguageChange}
        className="w-full px-2 py-2 text-sm text-white bg-formBg border border-gray-700 rounded-lg shadow-lg appearance-none focus:outline-none focus:ring-2 focus:"
      >
        {languages.map(([language, version]) => (
          <option key={language} value={language}>
            {language.charAt(0).toUpperCase() + language.slice(1)} ({version})
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageSelector;
