import React from "react";
import CustomText from "../../../../../Components/CustomText/CustomText";
import Footer from "../../../../../Components/Analysis/Footer/Footer";
import recVideo from "../../../../../Components/Images/recVideo.png"; // Direct import

function TwoStepRecord({ title, description, func, footerNextFunc, pageCount }) {
  return (
    <div className="flex-1 flex flex-col justify-between">
      <CustomText className="font-bold text-gray-800 text-center mt-1 text-sm">
        {title}
      </CustomText>
      <CustomText className="text-gray-800 text-center text-xs w-[80%] mx-auto">
        {description}
      </CustomText>
      <div
        className="flex items-center justify-center relative cursor-pointer"
        onClick={func}
      >
        <div className="w-10 h-10 border-4 border-red-500 rounded-full animate-spin"></div>
        <img
          className="absolute bottom-2 w-[15px] h-[15px] object-contain"
          src={recVideo}
          alt="Recording Icon"
        />
      </div>
      <Footer
        nextFunc={footerNextFunc}
        screenCount={pageCount}
        line="85%"
        backFunc={() => toast.info("برگشت", "امکان برگشت به مرحله قبل امکان پذیر نیست")} // Replaced Alert.alert with toast
      />
    </div>
  );
}

export default TwoStepRecord;