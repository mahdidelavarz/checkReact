import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import HelpHeader from "../../../Components/Analysis/HelpHeader/HelpHeader";
import CloseModal from "../../../Components/Analysis/CloseModal/CloseModal";
import HelpModal from "../../../Components/Analysis/HelpModal/HelpModal";
import CheckBtn from "../../../Components/Analysis/CheckBtn/CheckBtn";
import CustomText from "../../../Components/CustomText/CustomText";
import CupFill from "../../../Components/Images/ic_cup.png"; // Direct import
//! ______________________________the imported img (cupFill) dosent exist
import Footer from "../../../Components/Analysis/Footer/Footer";
import autoBack from "../../../Components/Images/auth_back.jpg"; // Added per your instruction
import autoBackRtl from "../../../Components/Images/auth_back_rtl.jpg";
import languages from "../../../Assets/i18n/i18n";

function SevenStep() {
  const navigate = useNavigate();
  const [isCloseModal, setIsCloseModal] = useState(false);
  const [isHelpModal, setIsHelpModal] = useState(false);
  const [isCheck, setIsCheck] = useState(false);
  const [icCheck2, setIcCheck2] = useState(false);
  const [back, setBack] = useState(autoBackRtl); // Default to RTL image

  useEffect(() => {
    // Check document direction to set background image
    if (document.dir !== "rtl") {
      setBack(autoBack);
    }

    // Replacing BackHandler with browser back navigation
    const handleBack = () => {
      setIsCloseModal(true);
      return true;
    };
    window.addEventListener("popstate", handleBack);

    return () => window.removeEventListener("popstate", handleBack);
  }, [navigate]);

  const handleBackButtonClick = () => {
    setIsCloseModal(true);
  };

  const onPressCloseAnalysis = () => {
    setIsCloseModal(false);
    navigate("/tabBar"); // Assuming this is the intended close destination
  };

  const onPressNextStep = () => {
    if (!isCheck || !icCheck2) {
      toast.warn(languages("step_alert")); // Replacing DropdownAlert
    } else {
      navigate("/eightStep");
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col bg-cover bg-center"
      style={{ backgroundImage: `url(${back})` }}
    >
      <HelpHeader
        closeFunc={handleBackButtonClick}
        helpFunc={() => setIsHelpModal(true)}
        count={7}
      />
      <div className="flex-1 flex flex-col">
        <div className="h-50 flex justify-center items-center pr-3">
          <img
            className="w-[33%] h-[33%] object-contain" // Approximating width / 3
            src={CupFill}
            alt="Cup Fill"
          />
        </div>
        <div className="h-50 flex flex-col items-center justify-between">
          <CustomText
            font_weight="bold"
            className="text-lg text-gray-800 text-center"
          >
            {languages("sampling")}
          </CustomText>
          <CustomText className="text-sm text-gray-800 text-center w-[90%] mx-auto">
            {languages("prepare_slide_description")}
          </CustomText>
        </div>
        <div className="mt-5 h-30 flex flex-col items-center justify-around space-y-4">
          <CheckBtn
            func={() => setIcCheck2(!icCheck2)}
            isCheck={icCheck2}
            title={languages("sample_removed_2")}
          />
          <CheckBtn
            func={() => setIsCheck(!isCheck)}
            isCheck={isCheck}
            title={languages("sample_removed")}
          />
        </div>
      </div>
      <div className="flex justify-center">
        <Footer
          nextFunc={onPressNextStep}
          screenCount={7}
          line="55%"
          backFunc={handleBackButtonClick}
        />
      </div>
      <CloseModal
        visible={isCloseModal}
        closeFunc={onPressCloseAnalysis}
        resumeFunc={() => setIsCloseModal(false)}
      />
      <HelpModal
        visible={isHelpModal}
        description={languages("help_modal_txt_step_7")}
        closeFunc={() => setIsHelpModal(false)}
      />
    </div>
  );
}

export default SevenStep;