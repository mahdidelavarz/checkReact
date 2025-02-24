import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import LoadingModal from "../../../Components/CustomModal/LoadingModal/LoadingModal";
import autoBack from "../../../Components/Images/auth_back.jpg"; // Import images directly
import autoBackRtl from "../../../Components/Images/auth_back_rtl.jpg";
import SimpleButton from "../../../Components/CustomButton/SimpleButton";
import CustomInput from "../../../Components/CustomInput/CustomInput";
import CustomText from "../../../Components/CustomText/CustomText";
import { findMessages } from "../../../Filters/Filters";
import language from "../../../Assets/i18n/i18n";
import storage from "../../../Factories/Storage";
import { Url } from "../../../Configs/Urls";
import Store from "../../../Store/Store";

function SignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [back, setBack] = useState(autoBackRtl); // Default to RTL image
  const [isLoading, setIsLoading] = useState(false);
  const inputs = useRef({});

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

  const focusNextField = (id) => {
    if (inputs.current[id]) {
      inputs.current[id].focus();
    }
  };

  const onPressLogIn = () => {
    if (!email) {
      toast.warn("لطفا ایمیل خود را وارد کنید");
    } else if (!password) {
      toast.warn("لطفا پسورد را وارد کنید");
    } else {
      if (navigator.onLine) {
        setIsLoading(true);
        const macAddress = "web-" + Math.random().toString(36).substring(2, 15);
        doLogin(macAddress, email, password);
      } else {
        toast.error("عدم دسترسی به اینترنت. لطفا اتصال به اینترنت را چک کنید.");
      }
    }
  };

  const doLogin = async (macAddress, email, password) => {
    const model = "web";
    try {
      const response = await fetch(`${Url.serverUrl}Auth/login/`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          platform: "web",
          mac: macAddress,
          model,
          email: email.toLowerCase(),
          password,
        }),
      });
      const responseJson = await response.json();
      const token = responseJson.token;
      if (token) {
        storage.set("Token", token);
        Store.setToken(token);
        navigate("/tabBar");
      }
      findMessages(responseJson.detail, (message) => {
        toast.info(message);
      });
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      toast.error(`${error.message}`);
    }
  };

  const handleBackButtonClick = () => {
    navigate(-1);
  };

  return (
    <div
      className="w-full h-[100vh] flex flex-col bg-cover bg-center"
      style={{ backgroundImage: `url(${back})` }} // Use imported image URL
    >
      <div className="flex-2.5" />
      <div className="flex-6 flex flex-col">
        <div className="flex-1 flex justify-center">
          <CustomText font_weight="bold" className="text-green-500 text-xl ml-[60px]">
            {language("login")}
          </CustomText>
        </div>
        <div className="flex-9 flex items-center justify-center">
          <div className="w-[70%]">
            <CustomInput
              placeholder={language("email")}
              event={(value) => setEmail(value)}
              keyboardType="email-address"
              autoCapitalize="none"
              onSubmitEditing={() => focusNextField("password")}
            />
            <CustomInput
              placeholder={language("password")}
              event={(value) => setPassword(value)}
              keyboardType="default"
              onRef={(ref) => (inputs.current["password"] = ref)}
              onSubmitEditing={onPressLogIn}
              mode="password"
            />
            <SimpleButton
              func={onPressLogIn}
              title={language("login")}
              btnStyle="my-4"
            />
            <Link to="/forgotPassword">
              <CustomText className="text-green-500 text-sm my-1">
                فراموشی رمز عبور؟
              </CustomText>
            </Link>
            <Link to="/signUp">
              <CustomText className="text-green-500 text-sm my-1">
                ثبت نام نکرده اید؟
              </CustomText>
            </Link>
          </div>
        </div>
      </div>
      <div className="flex-1.5" />
      <LoadingModal isVisible={isLoading} />
    </div>
  );
}

export default SignIn;