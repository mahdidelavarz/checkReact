import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import HelpHeader from "../../../Components/Analysis/HelpHeader/HelpHeader";
import CloseModal from "../../../Components/Analysis/CloseModal/CloseModal";
import HelpModal from "../../../Components/Analysis/HelpModal/HelpModal";
import CheckBtn from "../../../Components/Analysis/CheckBtn/CheckBtn";
import CustomText from "../../../Components/CustomText/CustomText";
import Footer from "../../../Components/Analysis/Footer/Footer";
import icCup from "../../../Components/Images/ic_cup.png"; // Direct import
import autoBack from "../../../Components/Images/auth_back.jpg"; // Added per your instruction
import autoBackRtl from "../../../Components/Images/auth_back_rtl.jpg";
import languages from "../../../assets/i18n/i18n";

function ThirdStep() {
  const navigate = useNavigate();
  const [isCheck, setIsCheck] = useState(false);
  const [isHelpModal, setIsHelpModal] = useState(false);
  const [isCloseModal, setIsCloseModal] = useState(false);
  const [back, setBack] = useState(autoBackRtl); // Default to RTL image

  useEffect(() => {
    // Check document direction to set background image
    if (document.dir !== "rtl") {
      setBack(autoBack);
    }

    // Replacing BackHandler with browser back navigation
    const handleBack = () => {
      setIsCloseModal(true); // Open modal instead of immediate navigation
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
    navigate("/tabBar"); // Assuming close navigates to tabBar as in FirstStep
  };

  const onPressNextStep = () => {
    if (!isCheck) {
      toast.warn(languages("step_alert")); // Replacing DropdownAlert
    } else {
      navigate("/fourStep");
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
        count={3}
      />
      <div className="flex-1 flex flex-col">
        <div className="h-[300px] flex flex-col items-center justify-evenly">
          <img
            className="w-[58%] h-[58%] object-contain" // Approximating width / 1.7
            src={icCup}
            alt="Cup Icon"
          />
          <CustomText className="text-lg text-gray-800 text-center">
            {languages("collect_sample_head")}
          </CustomText>
        </div>
        <div className="h-[250px] flex justify-center">
          <CustomText className="w-[90%] text-center text-sm text-gray-500 self-center">
            {languages("collect_sample_description")}
          </CustomText>
        </div>
        <div className="h-[100px] flex items-center justify-center">
          <CheckBtn
            func={() => setIsCheck(!isCheck)}
            isCheck={isCheck}
            title={languages("sample_full")}
            btnStyle="ml-1 mr-1"
          />
        </div>
      </div>
      <div className="flex justify-end">
        <Footer
          nextFunc={onPressNextStep}
          screenCount={3}
          line="20%"
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
        description={languages("help_modal_txt_step_3")}
        closeFunc={() => setIsHelpModal(false)}
      />
    </div>
  );
}

export default ThirdStep;