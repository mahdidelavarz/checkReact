import React from "react";
import icCircle from "../../Images/ic_circle.png"; // Direct import
import icCircleCheck from "../../Images/ic_circle_check.png"; // Direct import
import CustomText from "../../CustomText/CustomText";

function CheckBtn({ btnStyle, func, isCheck, title }) {
  return (
    <button
      className={`
        flex items-center justify-center px-4 h-10 rounded-full border
        ${isCheck ? "border-green-500" : "border-gray-300"}
        hover:bg-gray-100 active:bg-gray-200
        ${btnStyle}
      `}
      onClick={func}
    >
      <img
        className="w-5 h-5"
        src={isCheck ? icCircleCheck : icCircle}
        alt="Check Icon"
      />
      <CustomText
        className="ml-2 text-xs"
        font_weight={isCheck ? "bold" : "normal"}
      >
        {title}
      </CustomText>
    </button>
  );
}

export default CheckBtn;