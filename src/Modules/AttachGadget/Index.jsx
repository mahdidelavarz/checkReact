import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import SimpleHeader from "../../Components/CustomHeader/SimpleHeader/SimpleHeader";
import gadgetScan from "../../Components/Images/gadgetScan.png"; // Direct import
import icOk from "../../Components/Images/ic_ok.png"; // Direct import
import CustomText from "../../Components/CustomText/CustomText";
import { findMessages } from "../../Filters/Filters";
import storage from "../../Factories/Storage";
import { Url } from "../../Configs/Urls";
import autoBack from "../../Components/Images/auth_back.jpg"; // Added per your instruction
import autoBackRtl from "../../Components/Images/auth_back_rtl.jpg";

let Token;

function AttachGadget() {
  const navigate = useNavigate();
  const { code } = useParams();
  const [tokenFetched, setTokenFetched] = useState(false);
  const [back, setBack] = useState(autoBackRtl); // Default to RTL image

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

    // Fetch token
    storage.get("Token", (data) => {
      Token = data;
      setTokenFetched(true);
    });

    return () => window.removeEventListener("popstate", handleBack);
  }, [navigate]);

  const onPressAttachGadget = async () => {
    if (!tokenFetched || !Token) {
      toast.error("لطفاً ابتدا وارد شوید");
      return;
    }

    try {
      const response = await fetch(`${Url.serverUrl}Analysis/gadgets/`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `token ${Token}`,
        },
        body: JSON.stringify({ serial_number: code }),
      });
      const responseJson = await response.json();
      if (response.status === 201) {
        navigate("/secondStep");
      }
      findMessages(responseJson.detail, (message) => {
        toast.info(message);
      });
    } catch (error) {
      toast.error("خطای سرویس‌دهنده‌ی داخلی. دوباره تلاش کنید");
    }
  };

  const handleBack = () => {
    navigate("/qRCodeScan"); // Corrected typo from original
  };

  return (
    <div
      className="min-h-screen flex flex-col bg-cover bg-center"
      style={{ backgroundImage: `url(${back})` }}
    >
      <SimpleHeader func={handleBack} title="اضافه کردن گجت" />
      <div className="flex flex-col flex-1">
        <div className="flex-2 flex flex-col items-center justify-center">
          <img
            className="w-[60%] h-[60%] object-contain"
            src={gadgetScan}
            alt="Gadget Scan"
          />
          <CustomText className="text-lg text-gray-800 text-center w-[95%]">
            کد گجت با موفقیت ثبت شد
          </CustomText>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <button
            className="w-[70%] h-[45px] bg-green-500 rounded-full flex flex-row items-center justify-evenly hover:bg-green-600 active:bg-green-700"
            onClick={onPressAttachGadget}
          >
            <CustomText className="text-white text-base">افزودن</CustomText>
            <img
              className="w-[25px] h-[25px] object-contain"
              src={icOk}
              alt="OK Icon"
            />
          </button>
        </div>
      </div>
    </div>
  );
}

export default AttachGadget;