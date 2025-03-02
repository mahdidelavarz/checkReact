import React from "react";
import icDescription from "../../../../Components/Images/ic_description.png"; // Direct import
import CustomText from "../../../../Components/CustomText/CustomText";
import language from "../../../../assets/i18n/i18n";
import SimpleRow from "../SimpleRow/SimpleRow";

const Description = ({ description }) => {
  return (
    <div className="flex flex-col space-y-2">
      <SimpleRow ic={icDescription} title={language("description")} body="" />
      <div className="w-[88%] mx-auto pb-1.5">
        <CustomText className="text-[12px] text-gray-500 text-center">
          {description}
        </CustomText>
      </div>
    </div>
  );
};

export default Description;