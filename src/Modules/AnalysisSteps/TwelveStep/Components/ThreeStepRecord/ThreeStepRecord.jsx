import React from "react";
import RecordFooter from "../../../../../Components/Analysis/RecordFooter/RecordFooter";
import videoSuccess from "../../../../../Components/Images/videoSuccess.png"; // Direct import
import icOk from "../../../../../Components/Images/ic_ok.png"; // Direct import
import CustomText from "../../../../../Components/CustomText/CustomText";
import languages from "../../../../../assets/i18n/i18n";

function ThreeStepRecord({ description, step, footerNextFunc, footerAgainFunc, status }) {
  return (
    <div className="flex-1 flex flex-col justify-between">
      <CustomText className="font-bold text-gray-800 text-center mt-1 text-sm flex items-center justify-center">
        <img className="w-[15px] h-[15px] mr-1" src={icOk} alt="OK Icon" />
        {status ? languages("send_done") : "ارسال فیلد سوم با مشکل مواجه شد دوباره تلاش کنید"}
      </CustomText>
      <CustomText className="text-gray-800 text-center text-xs w-[90%] mx-auto">
        {description}
      </CustomText>
      <div className="flex items-center justify-center">
        <img
          className="w-[40px] h-[40px] object-contain"
          src={videoSuccess}
          alt="Video Success"
        />
      </div>
      <RecordFooter
        step={step}
        rightFunc={footerNextFunc}
        rightTxt="پردازش"
        leftFunc={footerAgainFunc}
        leftTxt={languages("again")}
        refresh={true}
      />
    </div>
  );
}

export default ThreeStepRecord;