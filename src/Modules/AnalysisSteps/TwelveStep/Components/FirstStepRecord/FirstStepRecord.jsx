import React from "react";
import CustomText from "../../../../../Components/CustomText/CustomText";
import Footer from "../../../../../Components/Analysis/Footer/Footer";
import recVideo from "../../../../../Components/Images/recVideo.png"; // Direct import
import languages from "../../../../../Assets/i18n/i18n";
import { toast } from "react-toastify"; // Replacing Alert

function FirstStepRecord({ title, description, func, footerNextFunc, pageCount }) {
  return (
    <div className="flex-1 flex flex-col justify-between">
      <CustomText
        font_weight="bold"
        className="text-center text-gray-800 text-base mt-1"
      >
        {title}
      </CustomText>
      <CustomText className="text-center text-gray-800 text-sm w-[90%] mx-auto">
        {description}
      </CustomText>
      <button
        className="flex items-center justify-center hover:bg-gray-100 active:bg-gray-200 p-2 rounded-full"
        onClick={func}
      >
        <img
          className="w-[40px] h-[40px] object-contain"
          src={recVideo}
          alt="Record Video"
        />
      </button>
      <Footer
        nextFunc={footerNextFunc}
        screenCount={pageCount}
        line="85%"
        backFunc={() => toast.info("برگشت", "امکان برگشت به مرحله قبل امکان پذیر نیست")} // Replaced Alert.alert with toast
      />
    </div>
  );
}

export default FirstStepRecord;