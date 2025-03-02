import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import HelpHeader from "../../../Components/Analysis/HelpHeader/HelpHeader";
import CloseModal from "../../../Components/Analysis/CloseModal/CloseModal";
import HelpModal from "../../../Components/Analysis/HelpModal/HelpModal";
import CheckBtn from "../../../Components/Analysis/CheckBtn/CheckBtn";
import CustomText from "../../../Components/CustomText/CustomText";
import prepareSlide from "../../../Components/Images/prepareSlide.png"; // Direct import
import Footer from "../../../Components/Analysis/Footer/Footer";
import autoBack from "../../../Components/Images/auth_back.jpg"; // Added per your instruction
import autoBackRtl from "../../../Components/Images/auth_back_rtl.jpg";
import languages from "../../../assets/i18n/i18n";

function EightStep() {
  const navigate = useNavigate();
  const [isCloseModal, setIsCloseModal] = useState(false);
  const [isHelpModal, setIsHelpModal] = useState(false);
  const [isCheckFull, setIsCheckFull] = useState(false);
  const [isCheckClear, setIsCheckClear] = useState(false);
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
    if (!isCheckFull) {
      toast.warn(languages("step_alert")); // Replacing DropdownAlert
    } else if (!isCheckClear) {
      toast.warn(languages("step_alert"));
    } else {
      navigate("/nineStep");
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
        count={8}
      />
      <div className="flex-1 flex flex-col">
        <div className="h-50 flex justify-center items-center pr-4">
          <img
            className="w-[40%] h-[40%] object-contain"
            src={prepareSlide}
            alt="Prepare Slide"
          />
        </div>
        <div className="flex flex-col items-center justify-between">
          <CustomText
            font_weight="bold"
            className="text-lg text-gray-800 text-center mt-4"
          >
            {languages("fill_sample")}
          </CustomText>
          <CustomText className="text-xs text-gray-800 text-center w-[90%] mx-auto mt-4">
            {languages("prepare_step_8_sedcription")} {/* Fixed typo from original */}
          </CustomText>
        </div>
        <div className="h-36 flex flex-col items-center justify-center space-y-2">
          <CheckBtn
            func={() => setIsCheckFull(!isCheckFull)}
            isCheck={isCheckFull}
            title={languages("container_check_1")}
          />
          <CheckBtn
            func={() => setIsCheckClear(!isCheckClear)}
            isCheck={isCheckClear}
            title={languages("container_check_2")}
            btnStyle="mt-2"
          />
        </div>
      </div>
      <div className="flex justify-center">
        <Footer
          nextFunc={onPressNextStep}
          screenCount={8}
          line="65%" // Corrected from w-[65%] to match prior usage
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
        description={languages("help_modal_txt_step_8")}
        closeFunc={() => setIsHelpModal(false)}
      />
    </div>
  );
}

export default EightStep;