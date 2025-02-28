import React from "react";
import gadget from "../../../../../Components/Images/gadget.png"; // Direct import
import icClose from "../../../../../Components/Images/ic_close.png"; // Direct import
import CustomText from "../../../../../Components/CustomText/CustomText";
import language from "../../../../../Assets/i18n/i18n";

function EmptyList() {
  return (
    <div className="flex flex-col h-full bg-white">
      <div className="flex-2 flex items-center justify-center relative">
        <img
          className="w-3/5 h-3/5 object-contain"
          src={gadget}
          alt="Gadget"
        />
        <img
          className="w-[25px] h-[25px] absolute animate-zoom-in"
          src={icClose}
          alt="Close"
        />
      </div>
      <div className="flex-1 flex justify-start">
        <CustomText className="text-xs text-gray-400 text-center">
          {language("empty_gadget")}
        </CustomText>
      </div>
    </div>
  );
}

export default EmptyList;