import React from "react";
import { StatusBar } from "react-native";
import { ic_close, ic_help } from "../../Images/Images";
import CustomText from "../../CustomText/CustomText";
import language from "../../../Assets/i18n/i18n";

const HelpHeader = ({ closeFunc, helpFunc, count }) => {
  return (
    <div className="w-full h-14 bg-white border-b border-gray-300 flex flex-row">
      <StatusBar backgroundColor="#006400" barStyle="light-content" />

      {/* Close Button */}
      <button className="flex-1.5 flex items-center justify-center" onClick={closeFunc}>
        <img className="w-7 h-7 text-gray-400" src={ic_close} alt="close" />
      </button>

      {/* Step Counter */}
      <div className="flex-7 flex justify-center">
        <CustomText className="text-lg text-gray-700 font-bold text-center">
          {language("step") + " " + count}
        </CustomText>
      </div>

      {/* Help Button */}
      <button className="flex-1.5 flex items-center justify-center" onClick={helpFunc}>
        <img className="w-6 h-6 text-green-500" src={ic_help} alt="help" />
      </button>
    </div>
  );
};

export default HelpHeader;
