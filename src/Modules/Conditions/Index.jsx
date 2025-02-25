import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import autoBack from "../../Components/Images/auth_back.jpg"; // Updated per your instruction
import autoBackRtl from "../../Components/Images/auth_back_rtl.jpg";
import about from "../../Components/Images/about.jpg"; // Adjusted path assuming similar structure
import icChangeLang from "../../Components/Images/ic_change_lang.png";
import icCircle from "../../Components/Images/ic_circle.png";
import icCircleCheck from "../../Components/Images/ic_circle_check.png";
import CustomText from "../../Components/CustomText/CustomText";
import language from "../../Assets/i18n/i18n";

function Conditions() {
  const navigate = useNavigate();
  const [isCheck, setIsCheck] = useState(false);
  const [back, setBack] = useState(autoBackRtl); // Default to RTL image

  // Handle RTL background image
  React.useEffect(() => {
    if (document.dir !== "rtl") {
      setBack(autoBack);
    }
  }, []);

  const nextStep = () => {
    if (!isCheck) {
      toast.warn(language("notAcceptAlert"));
    } else {
      navigate("/logIn");
    }
  };

  const onPressChangeLang = () => {
    toast.info("این صفحه هنوز آماده نشده است");
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center pb-2 bg-cover bg-center"
      style={{ backgroundImage: `url(${back})` }}
    >
      <button
        className="absolute top-2 right-2 flex items-center justify-center"
        onClick={onPressChangeLang}
      >
        <img className="w-6 h-6" src={icChangeLang} alt="Change Language" />
      </button>
      <div className="flex-1 flex justify-center">
        <CustomText className="text-white text-center text-sm">
          {language("term_title")}
        </CustomText>
      </div>
      <div className="bg-white flex-[9] w-11/12 rounded-lg border border-gray-300 flex flex-col">
        <div className="flex-[2.2] flex flex-col items-center justify-around">
          <img className="w-[72px] h-[72px]" src={about} alt="About" />
          <CustomText className="font-bold text-base">
            {language("term_head")}
          </CustomText>
        </div>
        <div className="flex-[6.5] p-2">
          <div className="overflow-y-auto">
            <CustomText className="text-gray-400 text-xs leading-6 text-center">
              {language("term")}
            </CustomText>
          </div>
        </div>
        <div className="flex-[1.3] flex flex-col items-center justify-between pb-1">
          <button
            className="flex flex-row items-center justify-center hover:opacity-60"
            onClick={() => setIsCheck(!isCheck)}
          >
            <img
              className="w-5 h-5"
              src={isCheck ? icCircleCheck : icCircle}
              alt={isCheck ? "Checked" : "Unchecked"}
            />
            <CustomText className="text-xs ml-2 font-bold">
              {language("accept")}
            </CustomText>
          </button>
          <button
            className="w-[70%] h-9 rounded-full flex items-center justify-center bg-green-500 hover:opacity-80"
            onClick={nextStep}
          >
            <CustomText className="text-white text-base">
              {language("continue")}
            </CustomText>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Conditions;