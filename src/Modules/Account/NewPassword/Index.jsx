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
import { Url } from "../../../Configs/Urls";

function NewPassword() {
  const navigate = useNavigate();
  const [back, setBack] = useState(autoBackRtl); // Default to RTL image
  const [isLoading, setIsLoading] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [email, setEmail] = useState("");
  const inputs = useRef({});

  useEffect(() => {
    // Check document direction to set background image
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

  const focusNextField = (id) => {
    if (inputs.current[id]) {
      inputs.current[id].focus();
    }
  };

  const onPressChangePassword = () => {
    if (navigator.onLine) {
      if (!email) {
        toast.warn("لطفا ایمیل را وارد کنید");
      } else if (!confirmPassword) {
        toast.warn("لطفا کد ارسالی به ایمیل را وارد کنید");
      } else if (!newPassword) {
        toast.warn("لطفا رمز جدید را وارد کنید");
      } else if (newPassword.length < 8) {
        toast.warn("گذرواژه حداقل باید 8 عدد یا حروف باشد");
      } else {
        changePassword(email, confirmPassword, newPassword);
      }
    } else {
      toast.error("عدم دسترسی به اینترنت. لطفا اتصال به اینترنت را چک کنید.");
    }
  };

  const changePassword = async (email, confirm_password, new_password) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${Url.serverUrl}Auth/password/reset/confirm/`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.toLowerCase(),
          confirm_code: confirm_password,
          new_password,
        }),
      });
      const responseJson = await response.json();
      setIsLoading(false);
      findMessages(responseJson.detail, (message) => {
        toast.info(message);
      });
      if (responseJson.detail) {
        navigate("/SignIn");
      }
    } catch (error) {
      setIsLoading(false);
      toast.error(`${error.message}`);
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col bg-cover bg-center"
      style={{ backgroundImage: `url(${back})` }} // Use imported image URL
    >
      <div className="flex-2.5" />
      <div className="flex-6 flex flex-col">
        <div className="flex-1 flex justify-center">
          <CustomText font_weight="bold" className="text-[16px] text-green-500 ml-[60px]">
            تغییر رمز
          </CustomText>
        </div>
        <div className="flex-9 flex items-center justify-center">
          <div className="w-[70%]">
            <CustomInput
              placeholder={language("email")}
              event={(value) => setEmail(value)}
              keyboardType="email-address"
              autoCapitalize="none"
              onSubmitEditing={() => focusNextField("confirm_password")}
            />
            <CustomInput
              placeholder="کد دریافتی"
              event={(value) => setConfirmPassword(value)}
              keyboardType="default"
              onRef={(ref) => (inputs.current["confirm_password"] = ref)}
              onSubmitEditing={() => focusNextField("new_password")}
              mode="password"
            />
            <CustomInput
              placeholder="رمز جدید"
              event={(value) => setNewPassword(value)}
              keyboardType="default"
              onRef={(ref) => (inputs.current["new_password"] = ref)}
              onSubmitEditing={onPressChangePassword}
              mode="password"
            />
            <SimpleButton
              func={onPressChangePassword}
              title="تغییر"
              btnStyle="mt-[15px]"
            />
          </div>
        </div>
      </div>
      <div className="flex-1.5" />
      <LoadingModal isVisible={isLoading} />
    </div>
  );
}

export default NewPassword;