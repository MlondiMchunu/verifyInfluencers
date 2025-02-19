import React, { useState } from "react";

const VerifyScientificJournalsToggle = ({ isOn, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      className={`relative w-14 h-8 flex items-center rounded-full p-1 transition-colors 
        ${isOn ? "bg-green-500" : "bg-gray-400"}`}
    >
      {/* Toggle Circle */}
      <div
        className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform
          ${isOn ? "translate-x-6" : "translate-x-0"}`}
      ></div>
    </button>
  );
};

export default VerifyScientificJournalsToggle;
