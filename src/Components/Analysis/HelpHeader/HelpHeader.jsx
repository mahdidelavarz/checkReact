import React from "react";
import icClose from "../../Images/ic_close.png"; // Direct import
import icHelp from "../../Images/ic_help.png"; // Direct import
import CustomText from "../../CustomText/CustomText";
import language from "../../../assets/i18n/i18n";

const HelpHeader = ({ closeFunc, helpFunc, count }) => {
  return (
    <div className="w-full h-14 bg-white border-b border-gray-300 flex flex-row items-center">
      {/* Close Button */}
      <button
        className="flex-1.5 flex items-center justify-center hover:bg-gray-100 p-2 rounded-full"
        onClick={closeFunc}
      >
        <img
          className="w-7 h-7"
          src={icClose}
          alt="Close Icon"
        />
      </button>

      {/* Step Counter */}
      <div className="flex-7 flex justify-center">
        <CustomText className="text-lg text-gray-700 font-bold text-center">
          {language("step") + " " + count}
        </CustomText>
      </div>

      {/* Help Button */}
      <button
        className="flex-1.5 flex items-center justify-center hover:bg-gray-100 p-2 rounded-full"
        onClick={helpFunc}
      >
        <img
          className="w-6 h-6"
          src={icHelp}
          alt="Help Icon"
        />
      </button>
    </div>
  );
};

export default HelpHeader;