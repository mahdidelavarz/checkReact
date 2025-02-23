import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify"; // Replacement for react-native-simple-toast
import storage from "../../../Factories/Storage";
import Store from "../../../Store/Store";
import LoadingModal from "../../../Components/CustomModal/LoadingModal/LoadingModal";
import SimpleButton from "../../../Components/CustomButton/SimpleButton";
import CustomInput from "../../../Components/CustomInput/CustomInput";
import CustomText from "../../../Components/CustomText/CustomText";
import { findMessages } from "../../../Filters/Filters";
import { Url } from "../../../Configs/Urls";

import auto_back from "../../../Components/Images/auto_back.png";
import auto_back_rtl from "../../../Components/Images/auto_back_rtl.png";

// No need to instantiate storage; it's already an object
// let storage = new Storage(); // Remove this line

function ConfirmCode() {
  const navigate = useNavigate();
  const { userId } = useParams();
  const [params] = useState(JSON.parse(userId));
  const [isLoading, setIsLoading] = useState(false);
  const [back, setBack] = useState(auto_back_rtl);
  const [code, setCode] = useState("");

  useEffect(() => {
    if (document.dir !== "rtl") {
      setBack(auto_back);
    }
    const handleBack = () => {
      navigate(-1);
      return true;
    };
    window.addEventListener("popstate", handleBack);
    return () => window.removeEventListener("popstate", handleBack);
  }, [navigate]);

  const onPressSubmit = () => {
    if (!code) {
      toast.warn("لطفا کد دریافتی را وارد کنید"); // Replaced DropdownAlert with toast
    } else {
      setIsLoading(true);
      doConfirmCode(code);
    }
  };

  const doConfirmCode = async (code) => {
    try {
      const response = await fetch(`${Url.serverUrl}Auth/signup/confirm/`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: params.userId,
          confirm_code: code,
        }),
      });
      const responseJson = await response.json();
      findMessages(responseJson.detail, (message) => {
        toast.info(message); // Replaced Toast.show with toast
      });
      if (responseJson.detail) {
        doLogin();
      }
    } catch (error) {
      toast.error(`${error.message}`); // Replaced Toast.show with toast
      setIsLoading(false);
    }
  };

  const doLogin = async () => {
    // DeviceInfo.getModel() isn't available in web; use a fallback or skip
    const model = "web"; // Static value for web, or fetch from navigator if needed
    try {
      const response = await fetch(`${Url.serverUrl}Auth/login/`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          platform: "web",
          mac: params.mac,
          model: model,
          email: params.email,
          password: params.password,
        }),
      });
      const responseJson = await response.json();
      setIsLoading(false);
      findMessages(responseJson.detail, (message) => {
        toast.info(message); // Replaced Toast.show with toast
      });
      const token = responseJson.token;
      if (token) {
        storage.set("Token", token); // Use functional storage directly
        Store.setToken(token);
        navigate("/tabBar");
      }
    } catch (error) {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="flex flex-col h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${back})` }}
    >
      {/* Top Section */}
      <div className="flex-2.5" />

      {/* Center Section */}
      <div className="flex-6 flex flex-col items-center justify-center">
        <div className="flex-1 flex justify-center">
          <CustomText font_weight="bold" className="text-lg text-green-600">
            تایید کد دریافتی
          </CustomText>
        </div>
        <div className="flex-9 flex flex-col items-center justify-center w-[70%]">
          <CustomInput
            placeholder="کد دریافتی"
            event={(value) => setCode(value)}
            keyboardType="default" // Might not apply in web; adjust CustomInput if needed
            onSubmitEditing={onPressSubmit}
            mode="password"
          />
          <SimpleButton
            func={onPressSubmit}
            title="تایید کد"
            btnStyle="mt-4"
          />
        </div>
      </div>

      {/* Bottom Section */}
      <div className="flex-1.5" />

      {/* Loading Modal */}
      <LoadingModal isVisible={isLoading} />
    </div>
  );
}

export default ConfirmCode;