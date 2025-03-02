import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import LoadingModal from "../../../Components/CustomModal/LoadingModal/LoadingModal";
import HelpHeader from "../../../Components/Analysis/HelpHeader/HelpHeader";
import CloseModal from "../../../Components/Analysis/CloseModal/CloseModal";
import HelpModal from "../../../Components/Analysis/HelpModal/HelpModal";
import CustomText from "../../../Components/CustomText/CustomText";
import Footer from "../../../Components/Analysis/Footer/Footer";
import { statusHandle } from "../../../Factories/HttpHandler";
import RowList from "./Components/RowList/RowList";
import languages from "../../../assets/i18n/i18n";
import storage from "../../../Factories/Storage";
import { Url } from "../../../Configs/Urls";
import autoBack from "../../../Components/Images/auth_back.jpg"; // Added per your instruction
import autoBackRtl from "../../../Components/Images/auth_back_rtl.jpg";

let Token;

function FourStep() {
    const navigate = useNavigate();
    const [isCloseModal, setIsCloseModal] = useState(false);
    const [isHelpModal, setIsHelpModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
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

    const onPressNextStep = () => {
        storage.get("Token", (token) => {
            storage.get("SerialNumber", (serialNumber) => {
                storage.get("Title", (title) => {
                    storage.get("Color", (color) => {
                        storage.get("Volume", (volume) => {
                            storage.get("Viscosity", (viscosity) => {
                                if (!title) {
                                    toast.warn("لطفا عنوان را پر کنید");
                                } else if (!color) {
                                    toast.warn("لطفا رنگ را انتخاب کنید");
                                } else if (!volume) {
                                    toast.warn("لطفا حجم نمونه را انتخاب کنید");
                                } else if (!viscosity) {
                                    toast.warn("لطفا گرانروی (ویسکوزیتی) را انتخاب کنید");
                                } else {
                                    analysisCreate(token, serialNumber, title, color, volume, viscosity);
                                }
                            });
                        });
                    });
                });
            });
        });
    };

    const analysisCreate = async (token, serialNumber, title, color, volume, viscosity) => {
        setIsLoading(true);
        try {
            const response = await fetch(`${Url.serverUrl}Analysis/create/`, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: `token ${token}`,
                },
                body: JSON.stringify({
                    serial_number: serialNumber,
                    viscosity,
                    color,
                    title,
                    volume,
                }),
            });
            statusHandle(response.status, navigate);
            if (response.status === 201) {
                setIsLoading(false);
                navigate("/fiveStep");
            } else {
                setIsLoading(false);
                // Optionally handle non-201 statuses with a toast message if needed
            }
        } catch (error) {
            setIsLoading(false);
            console.error("Error:", error);
            toast.error(`${error.message}`);
        }
    };

    const handleBackButtonClick = () => {
        setIsCloseModal(true);
    };

    const onPressCloseAnalysis = () => {
        setIsCloseModal(false);
        navigate("/tabBar");
    };

    return (
        <div
            className="min-h-screen flex flex-col bg-cover bg-center"
            style={{ backgroundImage: `url(${back})` }}
        >
            <HelpHeader
                closeFunc={handleBackButtonClick}
                helpFunc={() => setIsHelpModal(true)}
                count={4}
            />
            <div className="flex flex-col flex-1">
                <div className="flex flex-col flex-[4.5] justify-around">
                    <CustomText className="text-lg font-bold text-gray-800 text-center my-8">
                        {languages("sample_prop_head")}
                    </CustomText>
                    <CustomText className="text-sm text-gray-800 text-center w-11/12 mx-auto">
                        {languages("sample_prop_head_description")}
                    </CustomText>
                </div>
                <div className="flex-[4.5] flex items-center justify-center mb-5">
                    <RowList />
                </div>
                <div className="flex justify-center">
                    <Footer
                        nextFunc={onPressNextStep}
                        screenCount={4}
                        line="30%"
                        backFunc={handleBackButtonClick}
                    />
                </div>
            </div>
            <CloseModal
                visible={isCloseModal}
                closeFunc={onPressCloseAnalysis}
                resumeFunc={() => setIsCloseModal(false)}
            />
            <HelpModal
                visible={isHelpModal}
                closeFunc={() => setIsHelpModal(false)}
                description={languages("help_modal_txt_step_4")}
            />
            <LoadingModal isVisible={isLoading} />
        </div>
    );
}

export default FourStep;