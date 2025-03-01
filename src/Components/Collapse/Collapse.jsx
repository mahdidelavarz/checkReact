import React, { useState } from "react";
import CustomText from "../CustomText/CustomText";
import icArrow from "../Images/ic_arrow.png"; // Direct import

function Collapse({ title, body }) {
  const [isOpen, setOpen] = useState(false);

  return (
    <div className="w-11/12 mx-auto my-2.5">
      <button
        className="flex flex-row h-11 bg-green-500 rounded-t-lg hover:bg-green-600 active:bg-green-700"
        onClick={() => setOpen(!isOpen)}
      >
        <div className="flex-[9] flex justify-center">
          <CustomText
            font_weight="bold"
            className="text-sm text-white text-left ml-2"
          >
            {title}
          </CustomText>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <img
            className={`w-4 h-4 transition-transform duration-300 ${
              isOpen ? "rotate-[-90deg]" : "rotate-90"
            }`}
            src={icArrow}
            alt="Arrow"
          />
        </div>
      </button>
      {isOpen && (
        <div className="rounded-b-lg bg-white border border-green-500 flex justify-center animate-fade-in-up">
          <span className="text-xs text-black text-center w-11/12 mx-auto leading-7">
            {body}
          </span>
        </div>
      )}
    </div>
  );
}

export default Collapse;