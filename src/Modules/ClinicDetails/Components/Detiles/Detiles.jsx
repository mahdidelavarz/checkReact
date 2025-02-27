import React from "react";
import icAbout from "../../../../Components/Images/ic_about.png"; // Direct imports
import icPhone from "../../../../Components/Images/ic_phone.png";
import icLocation from "../../../../Components/Images/ic_location.png";
import CustomText from "../../../../Components/CustomText/CustomText";
import language from "../../../../Assets/i18n/i18n";
import SimpleRow from "../SimpleRow/SimpleRow";

function Detiles({ title, score, phoneNumber, address }) {
  return (
    <div className="flex flex-col space-y-2">
      <SimpleRow
        ic={icAbout}
        title={title}
        body=""
        mode="star"
        star={score}
      />
      <SimpleRow ic={icPhone} title={`${language("phoneNumber")}:`} body={phoneNumber} />
      <div className="flex flex-row my-2">
        <div className="flex-1 flex items-center justify-start">
          <img
            className="w-[22px] h-[22px]"
            src={icLocation}
            alt="Location Icon"
          />
        </div>
        <div className="flex-[1.5] flex justify-start">
          <CustomText className="text-[14px] text-black">
            {language("address")}
          </CustomText>
        </div>
        <div className="flex-[7.5] flex justify-center">
          <CustomText className="text-[14px] w-full text-gray-500">
            {address}
          </CustomText>
        </div>
      </div>
    </div>
  );
}

export default Detiles;