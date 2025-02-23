import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Replacing BackHandler and props.history
import { toast } from "react-toastify"; // Replacing Toast

import LoadingRecord from "../../../Components/Analysis/LoadingRecord/LoadingRecord";
import CloseModal from "../../../Components/Analysis/CloseModal/CloseModal";
import CustomText from "../../../Components/CustomText/CustomText";
import { statusHandle } from "../../../Factories/HttpHandler";
import { process } from "../../../Components/Images/Images";
import languages from "../../../Assets/i18n/i18n";
import storage from "../../../Factories/Storage"; // Import functional storage
import { Url } from "../../../Configs/Urls";

let Token;

function Processing() {
    const navigate = useNavigate();
    const [isCloseModal, setIsCloseModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        // Replacing BackHandler with browser back navigation
        const handleBack = () => {
            toast.info("امکان برگشت به مرحله قبل وجود ندارد"); // Replacing Toast.show
            return true; // Prevent default back navigation
        };
        window.addEventListener("popstate", handleBack);

        // Fetch token
        storage.get("Token", (token) => (Token = token));

        return () => window.removeEventListener("popstate", handleBack);
    }, [navigate]);

    const onPressProcess = () => {
        storage.get("VideoRecord1", (video1) => {
            storage.get("VideoRecord2", (video2) => {
                storage.get("VideoRecord3", (video3) => {
                    uploadVideo(video1, video2, video3);
                });
            });
        });
    };

    const uploadVideo = async (video1, video2, video3) => {
        // Replacing NetInfo with navigator.onLine
        if (navigator.onLine) {
            setIsLoading(true);
            const formData = new FormData();
            // Assuming videos are stored as blob URLs from previous steps (e.g., ElevenStep)
            // Convert blob URLs to blobs if needed; here we assume they’re blob URLs or file paths
            try {
                const blob1 = await fetch(video1).then((res) => res.blob());
                const blob2 = await fetch(video2).then((res) => res.blob());
                const blob3 = await fetch(video3).then((res) => res.blob());

                formData.append("video1", blob1, "video1.mp4");
                formData.append("video2", blob2, "video2.mp4");
                formData.append("video3", blob3, "video3.mp4");

                const response = await fetch(`${Url.serverUrl}Analysis/run/`, {
                    method: "POST",
                    headers: {
                        Authorization: `token ${Token}`,
                        Accept: "application/json",
                    },
                    body: formData,
                });

                statusHandle(response.status, navigate); // Updated to use navigate
                setIsLoading(false);
                if (response.status === 200) {
                    navigate("/resultAnalysis");
                } else {
                    toast.warn("اطلاعات ارسالی تایید نشد دوباره تلاش کنید");
                }
            } catch (error) {
                setIsLoading(false);
                toast.warn("اطلاعات ارسالی تایید نشد دوباره تلاش کنید");
                console.error("Upload error:", error);
            }
        } else {
            toast.error("عدم دسترسی به اینترنت. لطفا اتصال به اینترنت خود را چک کنید");
        }
    };

    const handleBackButtonClick = () => {
        toast.info("امکان برگشت به مرحله قبل وجود ندارد");
    };

    return (
        <div className="flex flex-col h-screen bg-white">
            {/* Header */}
            <div className="w-full h-16 border-b border-gray-300 flex items-center justify-center">
                <CustomText className="text-lg font-bold text-gray-800">
                    پردازش اطلاعات
                </CustomText>
            </div>

            {/* Content */}
            <div className="flex flex-1 flex-col items-center justify-evenly">
                <CustomText className="text-lg text-gray-900 text-center">
                    برای پردازش اطلاعات دکمه زیر را فشار دهید
                </CustomText>
                <div className="w-1/3 h-1/3 border border-gray-300 rounded-full flex items-center justify-center">
                    <button
                        className="w-10/12 h-10/12 border border-gray-300 rounded-full flex items-center justify-center"
                        onClick={onPressProcess}
                    >
                        <img
                            className="w-20 h-20"
                            src={process}
                            alt="Process Button"
                        />
                    </button>
                </div>
            </div>

            {/* Modals */}
            <CloseModal
                visible={isCloseModal}
                resumeFunc={() => setIsCloseModal(false)}
            />
            <LoadingRecord isVisible={isLoading} />
        </div>
    );
}

export default Processing;