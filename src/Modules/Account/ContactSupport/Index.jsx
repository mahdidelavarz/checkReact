import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import icBack from "../../../Components/Images/ic_back.png"; // Direct import
import supportBack from "../../../Components/Images/support_back.png"; // Direct import
import SimpleButton from "../../../Components/CustomButton/SimpleButton";
import CustomText from "../../../Components/CustomText/CustomText";
import Store from "../../../Store/Store";
import autoBack from "../../../Components/Images/auth_back.jpg"; // Fallback background
import autoBackRtl from "../../../Components/Images/auth_back_rtl.jpg"; // Fallback background

function ContactSupport() {
  const navigate = useNavigate();
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

  const handleBackButtonClick = () => {
    Store.incrementTabBar();
    navigate(-1);
  };

  return (
    <div
      className="min-h-screen flex flex-col bg-cover bg-center"
      style={{ backgroundImage: `${supportBack} ? url(${supportBack}) : url(${back})` }}
    >
      {/* Top Section */}
      <div className="flex-1">
        <button
          onClick={handleBackButtonClick}
          className="mt-4 ml-3 p-2 hover:bg-gray-200 rounded-full"
        >
          <img src={icBack} alt="Back" className="w-6 h-6 object-contain" />
        </button>
      </div>

      {/* Center Section */}
      <div className="flex-[6] flex flex-col justify-end bg-transparent text-center">
        <CustomText className="w-1/2 mx-auto text-center text-gray-800 text-lg">
          نیاز به کمک دارید؟
        </CustomText>
        <CustomText className="w-1/2 mx-auto text-center text-gray-700 text-sm">
          تیم پشتیبانی daddy check به صورت شبانه روزی پاسخگوی شماست
        </CustomText>
      </div>

      {/* Bottom Section */}
      <div className="flex-[3] flex flex-col justify-center items-center">
        <SimpleButton
          btnStyle="w-1/2 mt-2 bg-blue-500 text-white rounded-md h-10"
          title="تماس با پشتیبانی"
          func={() => window.location.href = "tel:02188223310"} // Web equivalent for phone dial
        />
        <SimpleButton
          btnStyle="w-1/2 mt-2 bg-blue-500 text-white rounded-md h-10"
          title="ارسال ایمیل"
          func={() => window.location.href = "mailto:etccosw@gmail.com"} // Web equivalent for email
        />
        <SimpleButton
          btnStyle="w-1/2 mt-2 bg-blue-500 text-white rounded-md h-10"
          title="گفتگوی آنلاین"
          func={() => window.open("http://etcco.ir/", "_blank")} // Already web-compatible
        />
      </div>
    </div>
  );
}

export default ContactSupport;