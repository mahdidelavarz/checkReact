import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import LoadingModal from "../../../Components/CustomModal/LoadingModal/LoadingModal";
import autoBack from "../../../Components/Images/auth_back.jpg"; // Import images directly
import autoBackRtl from "../../../Components/Images/auth_back_rtl.jpg";
import SimpleButton from "../../../Components/CustomButton/SimpleButton";
import CustomInput from "../../../Components/CustomInput/CustomInput";
import CustomText from "../../../Components/CustomText/CustomText";
import { findMessages } from "../../../Filters/Filters";
import language from "../../../Assets/i18n/i18n";
// import storage from "../../../Factories/Storage";
import { Url } from "../../../Configs/Urls";

function SignUp() {
  const navigate = useNavigate();
  const [back, setBack] = useState(autoBackRtl); // Default to RTL image
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [introCode, setIntroCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const inputs = useRef({}); // Replacing this.input for focusing

  useEffect(() => {
    // Check document direction instead of I18nManager.isRTL
    if (document.dir !== "rtl") {
      setBack(autoBack);
    }

    // Replacing BackHandler with browser back navigation
    const handleBack = () => {
      navigate(-1);
      return true;
    };
    window.addEventListener("popstate", handleBack);

    return () => window.removeEventListener("popstate", handleBack);
  }, [navigate]);

  const onPressSignUp = () => {
    const emailCheck = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!email) {
      toast.warn("لطفا ایمیل را وارد کنید");
    } else if (!emailCheck.test(email)) {
      toast.warn("ایمیل وارد شده صحیح نیست");
    } else if (!password) {
      toast.warn("لطفا پسورد را وارد کنید");
    } else if (!confirmPass) {
      toast.warn("لطفا تایید گذرواژه را وارد کنید");
    } else if (confirmPass !== password) {
      toast.warn("تایید گذرواژه با گذرواژه وارد شده مطابقت ندارد");
    } else if (confirmPass.length < 8) {
      toast.warn("گذرواژه حداقل باید 8 عدد یا حروف باشد");
    } else {
      sendUserInfo(email, confirmPass);
    }
  };

  const sendUserInfo = (email, confirmPass) => {
    if (navigator.onLine) {
      setIsLoading(true);
      const macAddress = "web-" + Math.random().toString(36).substring(2, 15); // Random ID for web
      doRegister(macAddress, email, confirmPass);
    } else {
      toast.error("عدم دسترسی به اینترنت. لطفا اتصال به اینترنت را چک کنید.");
    }
  };

  const doRegister = async (macAddress, email, confirmPass) => {
    const deviceModel = "web"; // Static value for web
    try {
      const response = await fetch(`${Url.serverUrl}Auth/signup/`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          platform: "web", // Replacing Platform.OS
          model: deviceModel,
          mac: macAddress,
          email: email.toLowerCase(),
          password: confirmPass,
        }),
      });
      const responseJson = await response.json();
      setIsLoading(false);
      findMessages(responseJson.detail, (message) => {
        toast.info(message); // Replacing Toast.show
      });
      if (responseJson.id) {
        const model = {
          mac: macAddress,
          email,
          password: confirmPass,
          userId: responseJson.id,
        };
        const params = JSON.stringify(model);
        navigate(`/confirmCode/${params}`);
      }
    } catch (error) {
      toast.error(`${error.message}`);
      setIsLoading(false);
    }
  };

  const focusNextField = (id) => {
    if (inputs.current[id]) {
      inputs.current[id].focus();
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col bg-cover bg-center"
      style={{ backgroundImage: `url(${back})` }}
    >
      <div className="flex-2.5" />
      <div className="flex-6 flex flex-col">
        <div className="flex-1 flex justify-center">
          <CustomText font_weight="bold" className="text-[20px] text-green-500 ml-[60px]">
            {language("signup")}
          </CustomText>
        </div>
        <div className="flex-9 flex items-center justify-center">
          <div className="w-[70%]">
            <CustomInput
              placeholder={language("email")}
              event={(value) => setEmail(value)}
              keyboardType="email-address" // Handled in CustomInput
              autoCapitalize="none"
              onSubmitEditing={() => focusNextField("password")}
            />
            <CustomInput
              placeholder={language("password")}
              event={(value) => setPassword(value)}
              keyboardType="default"
              mode="password"
              onRef={(ref) => (inputs.current["password"] = ref)}
              onSubmitEditing={() => focusNextField("confirm_password")}
            />
            <CustomInput
              placeholder={language("confirm_password")}
              event={(value) => setConfirmPass(value)}
              keyboardType="default"
              mode="password"
              onRef={(ref) => (inputs.current["confirm_password"] = ref)}
              onSubmitEditing={() => focusNextField("introCode")}
            />
            <CustomInput
              placeholder={`${language("introduce")} ${language("optional")}`}
              event={(value) => setIntroCode(value)}
              keyboardType="default"
              onRef={(ref) => (inputs.current["introCode"] = ref)}
              onSubmitEditing={onPressSignUp}
            />
            <SimpleButton
              func={onPressSignUp}
              title={language("signup")}
              btnStyle="mt-[10px]"
            />
          </div>
        </div>
      </div>
      <div className="flex-1.5" />
      <LoadingModal isVisible={isLoading} />
    </div>
  );
}

export default SignUp;