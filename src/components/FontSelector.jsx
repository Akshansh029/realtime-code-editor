import React from "react";

const FontSelector = ({ fontSize, handleFontSizeChange }) => {
  return (
    <div className="">
      <select
        id="fontSize"
        value={fontSize}
        onChange={handleFontSizeChange}
        className="px-2 py-2 text-sm text-white bg-formBg border border-gray-700 rounded-lg shadow-lg appearance-none focus:outline-none"
      >
        {[12, 14, 16, 18, 20, 24, 28, 32].map((size) => (
          <option key={size} value={size}>
            {size}px
          </option>
        ))}
      </select>
    </div>
  );
};

export default FontSelector;
