import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import HelpHeader from "../../../Components/Analysis/HelpHeader/HelpHeader";
import CloseModal from "../../../Components/Analysis/CloseModal/CloseModal";
import HelpModal from "../../../Components/Analysis/HelpModal/HelpModal";
import CheckBtn from "../../../Components/Analysis/CheckBtn/CheckBtn";
import CustomText from "../../../Components/CustomText/CustomText";
import attachGadget from "../../../Components/Images/attachGadget.png"; // Direct import
import Footer from "../../../Components/Analysis/Footer/Footer";
import autoBack from "../../../Components/Images/auth_back.jpg"; // Added per your instruction
import autoBackRtl from "../../../Components/Images/auth_back_rtl.jpg";
import languages from "../../../assets/i18n/i18n";

function SixStep() {
    const navigate = useNavigate();
    const [isCloseModal, setIsCloseModal] = useState(false);
    const [isHelpModal, setIsHelpModal] = useState(false);
    const [isCheck, setIsCheck] = useState(false);
    const [back, setBack] = useState(autoBackRtl); // Default to RTL image

    useEffect(() => {
        // Check document direction to set background image
        if (document.dir !== "rtl") {
            setBack(autoBack);
        }

        // Replacing BackHandler with browser back navigation
        const handleBack = () => {
            setIsCloseModal(true);
            return true;
        };
        window.addEventListener("popstate", handleBack);

        return () => window.removeEventListener("popstate", handleBack);
    }, [navigate]);

    const handleBackButtonClick = () => {
        setIsCloseModal(true);
    };

    const onPressCloseAnalysis = () => {
        setIsCloseModal(false);
        navigate("/tabBar"); // Assuming this is the intended close destination
    };

    const onPressNextStep = () => {
        if (!isCheck) {
            toast.warn(languages("step_alert")); // Replacing DropdownAlert
        } else {
            navigate("/sevenStep");
        }
    };

    return (
        <div
            className="min-h-screen flex flex-col bg-cover bg-center"
            style={{ backgroundImage: `url(${back})` }}
        >
            <HelpHeader
                closeFunc={handleBackButtonClick} // Fixed typo from sCloseModal
                helpFunc={() => setIsHelpModal(true)}
                count={6}
            />
            <div className="flex-1 flex flex-col">
                <div className="h-50 flex justify-center items-center">
                    <img
                        className="w-[52%] h-[52%] object-contain" // Approximating width / 1.9
                        src={attachGadget}
                        alt="Attach Gadget"
                    />
                </div>
                <div className="mt-2 flex flex-col items-center justify-between">
                    <CustomText
                        font_weight="bold"
                        className="text-lg text-gray-800 text-center my-5"
                    >
                        {languages("connect_gadget")}
                    </CustomText>
                    <CustomText className="text-sm text-gray-800 text-center w-9/10 mx-auto">
                        {languages("purchased_gadget_description")}
                    </CustomText>
                </div>
                <div className="h-40 flex items-center justify-center">
                    <CheckBtn
                        func={() => setIsCheck(!isCheck)}
                        isCheck={isCheck}
                        title={languages("gadget_check")}
                        btnStyle="p-6 w-11/12"
                    />
                </div>
            </div>
            <div className="flex justify-center">
                <Footer
                    nextFunc={onPressNextStep}
                    screenCount={6}
                    line="45%"
                    backFunc={handleBackButtonClick}
                />
            </div>
            <CloseModal
                visible={isCloseModal}
                closeFunc={onPressCloseAnalysis}
                resumeFunc={() => setIsCloseModal(false)}
            />
            <HelpModal
                visible={isHelpModal}
                description={languages("help_modal_txt_step_6")}
                closeFunc={() => setIsHelpModal(false)}
            />
        </div>
    );
}

export default SixStep;