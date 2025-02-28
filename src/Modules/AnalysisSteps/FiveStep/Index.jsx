import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import HelpHeader from "../../../Components/Analysis/HelpHeader/HelpHeader";
import CloseModal from "../../../Components/Analysis/CloseModal/CloseModal";
import HelpModal from "../../../Components/Analysis/HelpModal/HelpModal";
import CheckBtn from "../../../Components/Analysis/CheckBtn/CheckBtn";
import CustomText from "../../../Components/CustomText/CustomText";
import Footer from "../../../Components/Analysis/Footer/Footer";
import Loading from "../../../Components/Loading/Loading";
import languages from "../../../Assets/i18n/i18n";
import autoBack from "../../../Components/Images/auth_back.jpg"; // Added per your instruction
import autoBackRtl from "../../../Components/Images/auth_back_rtl.jpg";

function FiveStep() {
  const navigate = useNavigate();
  const [isCloseModal, setIsCloseModal] = useState(false);
  const [isHelpModal, setIsHelpModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isCheck, setIsCheck] = useState(false);
  const [timeTotal, setTimeTotal] = useState(1200); // 20 minutes timer
  const [timeMinute, setTimeMinute] = useState("");
  const [timeSecond, setTimeSecond] = useState("");
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

    // Start timer
    setIsLoading(true);
    const timer = setInterval(() => {
      timeShow();
    }, 1000);

    return () => {
      window.removeEventListener("popstate", handleBack);
      clearInterval(timer);
    };
  }, [navigate]);

  const timeShow = () => {
    const timeDown = timeTotal - 1;
    const minute = Math.floor(timeDown / 60);
    const second = timeDown % 60;

    if (timeDown <= 0) {
      setTimeSecond(0);
      setTimeMinute(0);
      setTimeTotal(0);
      setIsLoading(false);
    } else {
      setTimeTotal(timeDown);
      setTimeMinute(minute);
      setTimeSecond(second);
      setIsLoading(false);
    }
  };

  const handleBackButtonClick = () => {
    setIsCloseModal(true);
  };

  const onPressCloseAnalysis = () => {
    setIsCloseModal(false);
    navigate("/tabBar"); // Assuming this is the intended close destination
  };

  const onPressNextStep = () => {
    if (!isCheck) {
      toast.warn(languages("after_twenty"));
    } else {
      setTimeTotal(0); // Stop timer by setting to 0 (interval clears on unmount)
      navigate("/sixStep");
    }
  };

  if (isLoading) return <Loading />;

  return (
    <div
      className="min-h-screen flex flex-col bg-cover bg-center"
      style={{ backgroundImage: `url(${back})` }}
    >
      <HelpHeader
        closeFunc={handleBackButtonClick}
        helpFunc={() => setIsHelpModal(true)}
        count={5}
      />
      <div className="flex flex-col flex-1 items-center justify-around p-4">
        <div
          className="flex flex-col items-center justify-center border-4 w-20 h-20 rounded-full"
          style={{
            borderColor: timeMinute === 0 && timeSecond === 0 ? "#22C55E" : "#D1D5DB", // green-500 : gray-300
          }}
        >
          <span className="text-lg font-bold text-gray-700">
            {timeMinute > 9 ? timeMinute : "0" + timeMinute}:
            {timeSecond > 9 ? timeSecond : "0" + timeSecond}
          </span>
        </div>
        <div className="w-full text-center">
          <CustomText className="text-lg text-gray-700 font-semibold">
            {languages("sample_maintenance")}
          </CustomText>
          <CustomText className="text-sm text-gray-700 mx-auto w-4/5">
            {languages("twenty_minutes_wait")}
          </CustomText>
        </div>
        <CheckBtn
          func={() => setIsCheck(!isCheck)}
          isCheck={isCheck}
          title={languages("already_ready")}
        />
        <Footer
          nextFunc={onPressNextStep}
          screenCount={5}
          line="35%"
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
        description={languages("help_modal_txt_step_5")}
        closeFunc={() => setIsHelpModal(false)}
      />
    </div>
  );
}

export default FiveStep;