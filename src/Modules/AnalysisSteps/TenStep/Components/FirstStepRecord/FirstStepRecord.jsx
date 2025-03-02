import React from "react";
import CustomText from "../../../../../Components/CustomText/CustomText";
import Footer from "../../../../../Components/Analysis/Footer/Footer";
import recVideo from "../../../../../Components/Images/recVideo.png"; // Direct import
// import languages from "../../../../../assets/i18n/i18n";
import { toast } from "react-toastify"; // Replacing Toast

function FirstStepRecord({ title, description, func, footerNextFunc, pageCount }) {
  return (
    <div className="flex-1 flex flex-col justify-between">
      <CustomText
        font_weight="bold"
        className="text-gray-800 text-center mt-1 text-sm"
      >
        {title}
      </CustomText>
      <CustomText className="text-gray-800 text-center text-xs w-[90%] mx-auto">
        {description}
      </CustomText>
      <button
        className="flex items-center justify-center hover:bg-gray-100 active:bg-gray-200 p-2 rounded-full"
        onClick={func}
      >
        <img
          className="w-10 h-10 object-contain"
          src={recVideo}
          alt="Record Video"
        />
      </button>
      <Footer
        nextFunc={footerNextFunc}
        screenCount={pageCount}
        line="85%"
        backFunc={() => toast.info("امکان برگشت به مرحله قبل امکان پذیر نیست")} // Replaced Toast.show
      />
    </div>
  );
}

export default FirstStepRecord;