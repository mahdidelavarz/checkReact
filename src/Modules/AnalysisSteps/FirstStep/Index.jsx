import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Replacing BackHandler and props.history
import { toast } from "react-toastify"; // Replacing DropdownAlert

import { laam, kiseh, dastkesh, pad, ic_cup, ic_pipette, ic_slide, clip, syringe } from "../../../Components/Images/Images";
import HelpHeader from "../../../Components/Analysis/HelpHeader/HelpHeader";
import CloseModal from "../../../Components/Analysis/CloseModal/CloseModal";
import HelpModal from "../../../Components/Analysis/HelpModal/HelpModal";
import CheckBtn from "../../../Components/Analysis/CheckBtn/CheckBtn";
import CustomText from "../../../Components/CustomText/CustomText";
import Footer from "../../../Components/Analysis/Footer/Footer";
import Loading from "../../../Components/Loading/Loading";
import languages from "../../../Assets/i18n/i18n";
import storage from "../../../Factories/Storage"; // Import functional storage

let Token;

function FirstStep() {
  const navigate = useNavigate();
  const [steps] = useState([
    { title: "1 عدد گجت مناسب با مدل تلفن همراه شما ", img: clip, id: 1 },
    { title: "1 عدد ظرف مخصوص جمع آوری نمونه", img: ic_cup, id: 2 },
    { title: "1 عدد چمبر", img: laam, id: 3 },
    { title: "1 عدد سرنگ", img: syringe, id: 4 },
    { title: "1 عدد دستمال مرطوب الکلی", img: pad, id: 5 },
    { title: "1 جفت دستکش یکبار مصرف", img: dastkesh, id: 6 },
    { title: "1 عدد پلاستیک زیپدار", img: kiseh, id: 7 },
  ]);
  const [isCheck, setIsCheck] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isHelpModal, setIsHelpModal] = useState(false);
  const [isCloseModal, setIsCloseModal] = useState(false);

  useEffect(() => {
    // Replacing BackHandler with browser back navigation
    const handleBack = () => {
      setIsCloseModal(true);
      return true;
    };
    window.addEventListener("popstate", handleBack);

    setIsLoading(false);
    storage.get("Token", (data) => { Token = data; });

    return () => window.removeEventListener("popstate", handleBack);
  }, [navigate]);

  const onPressCloseAnalysis = () => {
    setIsCloseModal(false);
    navigate("/tabBar");
  };

  const onPressNextStep = () => {
    if (!isCheck) {
      toast.warn(languages("step_alert")); // Replacing DropdownAlert
    } else {
      navigate("/secondStep");
    }
  };

  const handleBackButtonClick = () => {
    setIsCloseModal(true);
  };

  return (
    <div className="flex-1 bg-white">
      <HelpHeader
        closeFunc={handleBackButtonClick}
        helpFunc={() => setIsHelpModal(true)}
        count={1}
      />

      {!isLoading ? (
        <div className="flex-1 flex flex-col">
          <div className="h-24 flex justify-center">
            <CustomText className="text-sm text-gray-800 text-center w-[95%] mx-auto">
              {languages("supplies")}
            </CustomText>
          </div>

          <div className="flex-1 flex items-center mb-[250px]">
            <div className="w-[90%] space-y-1">
              {steps.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-row w-full rounded-md bg-gray-200 border border-gray-400 p-2"
                >
                  <div className="flex-1.5 flex items-center justify-center">
                    <img
                      className="w-12 h-12 object-contain"
                      src={item.img}
                      alt={item.title}
                    />
                  </div>
                  <div className="flex-3.5 flex justify-center">
                    <CustomText className="text-sm text-gray-800">
                      {item.title}
                    </CustomText>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="h-36 flex items-center justify-center">
            <CheckBtn
              func={() => setIsCheck(!isCheck)}
              isCheck={isCheck}
              title={languages("supplies_done")}
            />
          </div>

          <div className="flex justify-center">
            <Footer
              nextFunc={onPressNextStep}
              screenCount={1}
              line="10%"
              backFunc={handleBackButtonClick}
            />
          </div>
        </div>
      ) : (
        <Loading />
      )}

      <CloseModal
        visible={isCloseModal}
        closeFunc={onPressCloseAnalysis}
        resumeFunc={() => setIsCloseModal(false)}
      />

      <HelpModal
        visible={isHelpModal}
        description={languages("help_modal_txt_step_1")}
        closeFunc={() => setIsHelpModal(false)}
      />
    </div>
  );
}

export default FirstStep;