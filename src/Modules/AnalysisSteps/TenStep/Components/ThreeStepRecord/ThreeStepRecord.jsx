import React from "react";
import RecordFooter from "../../../../../Components/Analysis/RecordFooter/RecordFooter";
import videoSuccess from "../../../../../Components/Images/videoSuccess.png"; // Direct import
import icOk from "../../../../../Components/Images/ic_ok.png"; // Direct import
import icClose from "../../../../../Components/Images/ic_close.png"; // Direct import
import CustomText from "../../../../../Components/CustomText/CustomText";
import languages from "../../../../../assets/i18n/i18n";

function ThreeStepRecord({ step, footerNextFunc, footerAgainFunc, status }) {
  return (
    <div className="flex-1 flex flex-col justify-evenly">
      {status ? (
        <CustomText
          font_weight="bold"
          className="text-gray-800 text-center mt-1 flex items-center justify-center"
        >
          <img className="w-6 h-6 mr-1" src={icOk} alt="OK Icon" />
          {languages("send_done")}
        </CustomText>
      ) : (
        <CustomText
          font_weight="bold"
          className="text-gray-800 text-center mt-1 flex items-center justify-center"
        >
          <img
            className="w-6 h-6 mr-1 filter hue-rotate-0 brightness-75"
            src={icClose}
            alt="Close Icon"
          />
          {languages("send_failed_try_again")}
        </CustomText>
      )}
      <div className="flex items-center justify-center">
        <img
          className="w-11 h-11 filter hue-rotate-270"
          src={videoSuccess}
          alt="Video Success"
        />
      </div>
      <div className="absolute bottom-0 left-0 right-0 bg-gray-200">
        <RecordFooter
          step={step}
          rightFunc={footerNextFunc}
          rightTxt={languages("next")}
          leftFunc={footerAgainFunc}
          leftTxt={languages("again")}
          refresh={true}
        />
      </div>
    </div>
  );
}

export default ThreeStepRecord;