import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Replacing BackHandler and props.history
import { toast } from "react-toastify"; // Replacing Toast and Alert

import LoadingModal from "../../../Components/CustomModal/LoadingModal/LoadingModal";
import { auto_back, auto_back_rtl } from "../../../Components/Images/Images";
import SimpleButton from "../../../Components/CustomButton/SimpleButton";
import CustomText from "../../../Components/CustomText/CustomText";
import { findMessages } from "../../../Filters/Filters";
import ModalMsg from "./Components/ModalMsg/ModalMsg";
import colors from "../../../Assets/Styles/Colors";
import language from "../../../assets/i18n/i18n";
import storage from "../../../Factories/Storage"; // Import functional storage
import { Url } from "../../../Configs/Urls";

// Removed let storage = new Storage();

function LogIn() {
  const navigate = useNavigate();
  const [back, setBack] = useState(auto_back_rtl);
  const [isLoading, setIsLoading] = useState(false);
  const [isModal, setIsModal] = useState(false);

  useEffect(() => {
    // Check document direction instead of I18nManager.isRTL
    if (document.dir !== "rtl") {
      setBack(auto_back);
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

    // Replacing NetInfo with navigator.onLine
    if (navigator.onLine) {
      // Replacing DeviceInfo.getMacAddress with a fallback (MAC not available in web)
      const macAddress = "web-" + Math.random().toString(36).substring(2, 15); // Random ID for web
      doAnonymous(macAddress);
    } else {
      toast.error("عدم دسترسی به اینترنت. لطفا اتصال به اینترنت را چک کنید.");
      setIsLoading(false);
    }
  };

  const doAnonymous = async (macAddress) => {
    const model = "web"; // Replacing DeviceInfo.getModel with static value
    try {
      const response = await fetch(`${Url.serverUrl}Auth/signup/anonymous/`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          platform: "web", // Replacing Platform.OS
          model,
          mac: macAddress,
        }),
      });
      const responseJson = await response.json();
      setIsLoading(false);
      findMessages(responseJson.detail, (message) => {
        toast.info(message); // Replacing Toast.show
      });
      if (responseJson.token) {
        storage.set("Token", responseJson.token); // Updated to functional storage
        navigate("/tabBar");
      }
    } catch (error) {
      setIsLoading(false);
      toast.error(`${error.message}`);
    }
  };

  return (
    <div
      className="flex-1 flex flex-col bg-cover bg-center"
      style={{ backgroundImage: `url(${back})` }}
    >
      {/* StatusBar not needed in web; can use CSS if desired */}
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