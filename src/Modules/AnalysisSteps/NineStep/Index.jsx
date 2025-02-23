import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Replacing BackHandler and props.history
import { toast } from "react-toastify"; // Replacing DropdownAlert

import HelpHeader from "../../../Components/Analysis/HelpHeader/HelpHeader";
import CloseModal from "../../../Components/Analysis/CloseModal/CloseModal";
import HelpModal from "../../../Components/Analysis/HelpModal/HelpModal";
import CheckBtn from "../../../Components/Analysis/CheckBtn/CheckBtn";
import CustomText from "../../../Components/CustomText/CustomText";
import { attachGadget } from "../../../Components/Images/Images";
import Footer from "../../../Components/Analysis/Footer/Footer";
import languages from "../../../Assets/i18n/i18n";
import storage from "../../../Factories/Storage"; 

function NineStep() {
  const navigate = useNavigate();
  const [isCloseModal, setIsCloseModal] = useState(false);
  const [isHelpModal, setIsHelpModal] = useState(false);
  const [isCheckFull, setIsCheckFull] = useState(false);
  const [isCheckClear, setIsCheckClear] = useState(false);

  useEffect(() => {
    // Replacing BackHandler with browser back navigation
    const handleBack = () => {
      setIsCloseModal(true); // Show close modal instead of immediate navigation
      return true;
    };
    window.addEventListener("popstate", handleBack);

    return () => window.removeEventListener("popstate", handleBack);
  }, [navigate]);

  const onPressNextStep = () => {
    if (!isCheckFull || !isCheckClear) {
      toast.warn(languages("step_alert")); // Replacing DropdownAlert
    } else {
      navigate("/tenStep");
    }
  };

  const handleBackButtonClick = () => {
    setIsCloseModal(true);
  };

  const onPressCloseAnalysis = () => {
    setIsCloseModal(false);
    navigate("/tabBar"); // Assuming this is the intended close destination
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <HelpHeader
        closeFunc={handleBackButtonClick}
        helpFunc={() => setIsHelpModal(true)}
        count={9}
      />

      <div className="flex flex-col flex-1">
        <div className="flex items-center justify-center h-52 pr-4">
          <img
            className="w-1/2 h-1/2 object-contain"
            src={attachGadget}
            alt="Attach Gadget"
          />
        </div>

        <div className="flex flex-col items-center space-y-4">
          <CustomText className="text-lg font-bold text-gray-800 text-center mt-2">
            {languages("putting_up_container")}
          </CustomText>
          <CustomText className="text-sm text-gray-700 text-center w-11/12 mx-auto mt-3">
            {languages("prepare_step_9_sedcription")}
          </CustomText>
        </div>

        <div className="flex flex-col items-center justify-center h-52 space-y-2">
          <CheckBtn
            func={() => setIsCheckFull(!isCheckFull)}
            isCheck={isCheckFull}
            title={languages("btn_check_1")}
          />
          <CheckBtn
            func={() => setIsCheckClear(!isCheckClear)}
            isCheck={isCheckClear}
            title={languages("btn_check_2")}
            btnStyle="mt-2"
          />
        </div>
      </div>

      <div className="flex justify-center">
        <Footer
          nextFunc={onPressNextStep}
          screenCount={9}
          line="w-3/4"
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
        description={languages("help_modal_txt_step_9")}
        closeFunc={() => setIsHelpModal(false)}
      />
    </div>
  );
}

export default NineStep;