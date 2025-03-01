import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import SimpleHeader from "../../../Components/CustomHeader/SimpleHeader/SimpleHeader";
import SimpleButton from "../../../Components/CustomButton/SimpleButton";
import CustomInput from "../../../Components/CustomInput/CustomInput";
import DiscountsList from "./Components/DiscountsList/DiscountsList";
import CustomText from "../../../Components/CustomText/CustomText";
import Loading from "../../../Components/Loading/Loading";
import Store from "../../../Store/Store";
import autoBack from "../../../Components/Images/auth_back.jpg"; // Adjusted path
import autoBackRtl from "../../../Components/Images/auth_back_rtl.jpg"; // Adjusted path

function DiscountCode() {
  const navigate = useNavigate();
  const [discounts, setDiscounts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [code, setCode] = useState("");
  const [back, setBack] = useState(autoBackRtl); // Default to RTL image

  useEffect(() => {
    // Check document direction to set background image
    if (document.dir !== "rtl") {
      setBack(autoBack);
    }

    // Replacing BackHandler with browser back navigation
    const handleBack = () => {
      Store.incrementTabBar();
      navigate(-1);
      return true;
    };
    window.addEventListener("popstate", handleBack);

    return () => window.removeEventListener("popstate", handleBack);
  }, [navigate]);

  const onPressSubmit = () => {
    if (!code) {
      toast.warn("کد تخفیف را وارد کنید"); // Replaced DropdownAlert
    } else {
      setIsLoading(true); // Placeholder; add API call or logic if intended
    }
  };

  const backAction = () => {
    Store.incrementTabBar();
    navigate(-1);
  };

  return (
    <div
      className="min-h-screen flex flex-col p-4 bg-cover bg-center"
      style={{ backgroundImage: `url(${back})` }}
    >
      <SimpleHeader func={backAction} title="کد تخفیف" />
      {!isLoading ? (
        <div className="flex flex-col items-center flex-1">
          <CustomInput
            placeholder="کد تخفیف را وارد کنید"
            className="w-3/5 h-11 text-center text-base border border-gray-300 rounded-md p-2"
            event={(value) => setCode(value)}
            onSubmitEditing={onPressSubmit}
          />
          <SimpleButton
            className="w-3/5 h-9 text-center mt-4 bg-blue-500 text-white rounded-md"
            title="تایید"
            func={onPressSubmit}
          />
          <div className="w-full h-10 bg-gray-200 mt-8 flex items-center justify-center">
            <CustomText className="text-base text-gray-700">
              لیست کد تخفیف های شما
            </CustomText>
          </div>
          <div className="flex-1 w-full">
            <DiscountsList discounts={discounts} />
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
}

export default DiscountCode;