import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import autoBack from "../../../Components/Images/auth_back.jpg"; // Import images directly
import autoBackRtl from "../../../Components/Images/auth_back_rtl.jpg";
import SimpleButton from "../../../Components/CustomButton/SimpleButton";
import CustomText from "../../../Components/CustomText/CustomText";
import language from "../../../assets/i18n/i18n";
import storage from "../../../Factories/Storage";

function Password() {
  const navigate = useNavigate();
  const [back, setBack] = useState(autoBackRtl); // Default to RTL image
  const [code, setCode] = useState("");

  useEffect(() => {
    // Check document direction to set background image
    if (document.dir !== "rtl") {
      setBack(autoBack); // Use non-RTL image
    }

    // Replacing BackHandler with browser back navigation
    const backAction = () => {
      navigate(-1);
      return true;
    };
    window.addEventListener("popstate", backAction);

    return () => window.removeEventListener("popstate", backAction);
  }, [navigate]);

  const onPressSubmit = () => {
    if (!code) {
      toast.warn("گذرواژه را وارد کنید");
    } else {
      storage.get("Password", (pass) => {
        if (code === pass) {
          navigate("/tabBar");
        } else {
          toast.warn("کد ورودی با کدی که قبلا ذخیره کرده اید مطابقت ندارد");
        }
      });
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
          <CustomText font_weight="bold" className="text-[16px] text-green-500 ml-[40px]">
            تایید گذرواژه امنیتی
          </CustomText>
        </div>
        <div className="flex-9 flex items-center justify-center">
          <div className="w-[70%]">
            <input
              className="w-full h-[35px] rounded-[30px] text-[12px] text-left p-[10px] bg-white border border-[#d3d3d3] mt-[10px] focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="گذرواژه"
              onChange={(e) => setCode(e.target.value)}
              type="password"
              onKeyPress={(e) => e.key === "Enter" && onPressSubmit()}
            />
            <SimpleButton
              func={onPressSubmit}
              title="تایید"
              btnStyle="my-[15px]"
            />
          </div>
        </div>
      </div>
      <div className="flex-1.5" />
    </div>
  );
}

export default Password;