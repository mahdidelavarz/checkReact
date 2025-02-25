import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import LoadingModal from "../../../Components/CustomModal/LoadingModal/LoadingModal";
import SimpleButton from "../../../Components/CustomButton/SimpleButton";
import CustomInput from "../../../Components/CustomInput/CustomInput";
import CustomText from "../../../Components/CustomText/CustomText";
import { findMessages } from "../../../Filters/Filters";
import { Url } from "../../../Configs/Urls";
import storage from "../../../Factories/Storage";
import Store from "../../../Store/Store";
import autoBack from "../../../Components/Images/auth_back.jpg"; // Updated per your instruction
import autoBackRtl from "../../../Components/Images/auth_back_rtl.jpg"; // Updated per your instruction

function ConfirmCode() {
  const navigate = useNavigate();
  const { userId } = useParams();
  const [params] = useState(JSON.parse(userId));
  const [isLoading, setIsLoading] = useState(false);
  const [back, setBack] = useState(autoBackRtl); // Default to RTL image
  const [code, setCode] = useState("");

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

  const onPressSubmit = () => {
    if (!code) {
      toast.warn("لطفا کد دریافتی را وارد کنید");
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
        toast.info(message);
      });
      if (responseJson.detail) {
        doLogin();
      } else {
        setIsLoading(false); // Ensure loading stops if no detail
      }
    } catch (error) {
      toast.error(`${error.message}`);
      setIsLoading(false);
    }
  };

  const doLogin = async () => {
    const model = "web"; // Static value for web
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
          model,
          email: params.email,
          password: params.password,
        }),
      });
      const responseJson = await response.json();
      setIsLoading(false);
      findMessages(responseJson.detail, (message) => {
        toast.info(message);
      });
      const token = responseJson.token;
      if (token) {
        storage.set("Token", token);
        Store.setToken(token);
        navigate("/tabBar");
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
          <CustomText font_weight="bold" className="text-lg text-green-600">
            تایید کد دریافتی
          </CustomText>
        </div>
        <div className="flex-9 flex flex-col items-center justify-center w-[70%]">
          <CustomInput
            placeholder="کد دریافتی"
            event={(value) => setCode(value)}
            keyboardType="default"
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
      <div className="flex-1.5" />
      <LoadingModal isVisible={isLoading} />
    </div>
  );
}

export default ConfirmCode;