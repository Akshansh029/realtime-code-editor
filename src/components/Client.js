import React from "react";

const Client = ({ username }) => {
  const getInitials = (name) => {
    if (!name) return "";

    const words = name.trim().split(/\s+/);
    const initials = words.map((word) => word[0].toUpperCase());
    return initials.join("");
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="text-base font-medium h-10 w-10 flex items-center justify-center rounded-md bg-[#8a4af3] text-white">
        {getInitials(username)}
      </div>
      <span className="text-xs font-medium">{username}</span>
    </div>
  );
};

export default Client;
