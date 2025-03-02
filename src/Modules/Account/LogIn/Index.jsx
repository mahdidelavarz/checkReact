import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import LoadingModal from "../../../Components/CustomModal/LoadingModal/LoadingModal";
import autoBack from "../../../Components/Images/auth_back_rtl.jpg";
import autoBackRtl from "../../../Components/Images/auth_back_rtl.jpg";
import SimpleButton from "../../../Components/CustomButton/SimpleButton";
import CustomText from "../../../Components/CustomText/CustomText";
import { findMessages } from "../../../Filters/Filters";
import ModalMsg from "./Components/ModalMsg/ModalMsg";
import language from "../../../assets/i18n/i18n";
import storage from "../../../Factories/Storage";
import { Url } from "../../../Configs/Urls";

function LogIn() {
  const navigate = useNavigate();
  const [back, setBack] = useState(autoBackRtl); // Default to RTL image
  const [isLoading, setIsLoading] = useState(false);
  const [isModal, setIsModal] = useState(false);

  useEffect(() => {
    // Check document direction to set background image
    if (document.dir !== "rtl") {
      setBack(autoBack); // Use non-RTL image
    }

    // Replacing BackHandler with browser back navigation
    const handleBack = () => {
      navigate(-1);
      return true;
    };
    window.addEventListener("popstate", handleBack);

    return () => window.removeEventListener("popstate", handleBack);
  }, [navigate]);

  const onPressDoAnonymous = () => {
    setIsModal(false);
    setIsLoading(true);

    if (navigator.onLine) {
      const macAddress = "web-" + Math.random().toString(36).substring(2, 15); // Random ID for web
      doAnonymous(macAddress);
    } else {
      toast.error("عدم دسترسی به اینترنت. لطفا اتصال به اینترنت را چک کنید.");
      setIsLoading(false);
    }
  };

  const doAnonymous = async (macAddress) => {
    const model = "web";
    try {
      const response = await fetch(`${Url.serverUrl}Auth/signup/anonymous/`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          platform: "web",
          model,
          mac: macAddress,
        }),
      });
      const responseJson = await response.json();
      setIsLoading(false);
      findMessages(responseJson.detail, (message) => {
        toast.info(message);
      });
      if (responseJson.token) {
        storage.set("Token", responseJson.token);
        navigate("/tabBar");
      }
    } catch (error) {
      setIsLoading(false);
      toast.error(`${error.message}`);
    }
  };

  return (
    <div
      className="w-full h-[100vh] bg-cover flex"
      style={{ backgroundImage: `url(${back})` }} // Use imported image URL
    >
      <div className="flex-2.5" />
      <div className="flex-6 flex flex-col">
        <div className="flex-1 flex justify-center">
          <CustomText font_weight="bold" className="text-[16px] text-green-500 ml-[60px]">
            {language("letStart")}
          </CustomText>
        </div>
        <div className="flex-9 flex items-center justify-center">
          <div className="w-[70%]">
            <SimpleButton
              func={() => navigate("/signIn")}
              title={language("login")}
              btnStyle="my-[15px]"
            />
            <SimpleButton
              func={() => navigate("/signUp")}
              title={language("signup")}
              btnStyle="my-[15px]"
            />
            <SimpleButton
              func={() => setIsModal(true)}
              title={language("anonymous_sign_to_app")}
              btnStyle="my-[15px]"
            />
          </div>
        </div>
      </div>
      <div className="flex-1.5" />
      <ModalMsg isVisible={isModal} func={onPressDoAnonymous} />
      <LoadingModal isVisible={isLoading} />
    </div>
  );
}

export default LogIn;