import React from "react";
import { THEMES } from "../constants"; // Adjust the path as needed

const ThemeSelector = ({ theme, handleThemeChange }) => {
  return (
    <div className="">
      <select
        id="theme"
        value={theme}
        onChange={handleThemeChange}
        className="px-2 py-2 text-sm text-white bg-formBg border border-gray-700 rounded-lg shadow-lg appearance-none focus:outline-none"
      >
        {THEMES.map((themeName) => (
          <option key={themeName} value={themeName}>
            {themeName}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ThemeSelector;
