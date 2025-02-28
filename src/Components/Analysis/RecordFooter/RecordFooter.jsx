import React from "react";
import CustomText from "../../CustomText/CustomText";
import icRefresh from "../../Images/ic_refresh.png"; // Direct import
import icArrow from "../../Images/ic_arrow.png"; // Direct import
import icOk from "../../Images/ic_ok.png"; // Direct import

function RecordFooter({ step, rightFunc, rightTxt, leftFunc, leftTxt, refresh }) {
  return (
    <div className="w-full flex flex-row h-[50px]">
      {/* Right Button */}
      <div className="flex flex-[2.5] items-center justify-center">
        <button
          className="w-[85%] h-[30px] rounded-full border border-gray-400 bg-white flex flex-row justify-evenly items-center hover:bg-gray-100 active:bg-gray-200"
          onClick={rightFunc}
        >
          {step === 3 ? (
            <img className="w-[10px] h-[10px]" src={icOk} alt="OK Icon" />
          ) : (
            <img
              className="w-[10px] h-[10px] transform rotate-180"
              src={icArrow}
              alt="Arrow Icon"
            />
          )}
          <CustomText className="text-[10px] text-gray-800 font-bold">
            {rightTxt}
          </CustomText>
        </button>
      </div>

      {/* Step Indicator */}
      <div className="flex flex-[5] items-center justify-center pb-[15px]">
        <CustomText className="text-[12px] text-gray-800 font-bold">
          {step}/3
        </CustomText>
        <div className="flex flex-row-reverse mt-1">
          <div className="w-[40px] h-[12px] rounded-full mx-1 bg-purple-500" />
          <div
            className={`w-[40px] h-[12px] rounded-full mx-1 ${
              step >= 2 ? "bg-purple-500" : "bg-gray-400"
            }`}
          />
          <div
            className={`w-[40px] h-[12px] rounded-full mx-1 ${
              step === 3 ? "bg-purple-500" : "bg-gray-400"
            }`}
          />
        </div>
      </div>

      {/* Left Button */}
      <div className="flex flex-[2.5] items-center justify-center">
        <button
          className="w-[85%] h-[30px] rounded-full border border-gray-400 bg-white flex flex-row justify-evenly items-center hover:bg-gray-100 active:bg-gray-200"
          onClick={leftFunc}
        >
          <CustomText className="text-[10px] text-gray-800 font-bold">
            {leftTxt}
          </CustomText>
          <img
            className="w-[10px] h-[10px]"
            src={refresh ? icRefresh : icArrow}
            alt={refresh ? "Refresh Icon" : "Arrow Icon"}
          />
        </button>
      </div>
    </div>
  );
}

export default RecordFooter;