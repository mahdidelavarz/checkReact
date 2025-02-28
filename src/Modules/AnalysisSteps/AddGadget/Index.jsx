import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SimpleHeader from "../../../Components/CustomHeader/SimpleHeader/SimpleHeader";
import gadgetScan from "../../../Components/Images/gadgetScan.png"; // Direct import
import icScan from "../../../Components/Images/ic_scan.png"; // Direct import
import CustomText from "../../../Components/CustomText/CustomText";
import autoBack from "../../../Components/Images/auth_back.jpg"; // Added per your instruction
import autoBackRtl from "../../../Components/Images/auth_back_rtl.jpg";

function AddGadget() {
  const navigate = useNavigate();
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

    return () => window.removeEventListener("popstate", handleBack);
  }, [navigate]);

  const handleBackButtonClick = () => {
    navigate("/secondStep");
  };

  const handleScanClick = () => {
    navigate("/qrcodeScan"); // Corrected typo from '/qRCodeScan'
  };

  return (
    <div
      className="min-h-screen flex flex-col bg-cover bg-center"
      style={{ backgroundImage: `url(${back})` }}
    >
      <SimpleHeader func={handleBackButtonClick} title="اضافه کردن گجت" />
      <div className="flex-1 flex flex-col">
        <div className="flex-2 flex flex-col items-center justify-center">
          <img
            className="w-[60%] h-[60%] object-contain"
            src={gadgetScan}
            alt="Gadget Scan"
          />
          <CustomText className="text-sm text-gray-800 text-center w-[95%]">
            {/* Add any text here if needed; left empty as per original */}
          </CustomText>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <button
            className="w-3/5 h-11 bg-green-500 rounded-3xl flex flex-row items-center justify-center hover:bg-green-600 active:bg-green-400"
            onClick={handleScanClick}
          >
            <CustomText className="text-lg text-white mr-2">اسکن</CustomText>
            <img
              className="w-6 h-6 object-contain"
              src={icScan}
              alt="Scan Icon"
            />
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddGadget;