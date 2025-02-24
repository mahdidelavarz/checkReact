import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import LoadingModal from "../../../Components/CustomModal/LoadingModal/LoadingModal";
import autoBack from "../../../Components/Images/auth_back.jpg"; // Import image directly
import autoBackRtl from "../../../Components/Images/auth_back_rtl.jpg";
import SimpleButton from "../../../Components/CustomButton/SimpleButton";
import CustomInput from "../../../Components/CustomInput/CustomInput";
import CustomText from "../../../Components/CustomText/CustomText";
import { findMessages } from "../../../Filters/Filters";
import { Url } from "../../../Configs/Urls";

function ForgotPassword() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [back, setBack] = useState(autoBackRtl); // Default to RTL image

    useEffect(() => {
        // Check document direction to set background image
        if (document.dir !== "rtl") {
            setBack(autoBack);
        }

        // Replacing BackHandler-esque behavior with browser back navigation
        const handleBack = () => {
            navigate(-1);
            return true;
        };
        window.addEventListener("popstate", handleBack);

        return () => window.removeEventListener("popstate", handleBack);
    }, [navigate]);

    const onPressSubmit = () => {
        if (!email) {
            toast.warn("ایمیل را وارد کنید");
        } else {
            if (navigator.onLine) {
                setIsLoading(true);
                passwordReset(email);
            } else {
                toast.error("عدم دسترسی به اینترنت. لطفا اتصال به اینترنت را چک کنید.");
            }
        }
    };

    const passwordReset = async (email) => {
        try {
            const response = await fetch(`${Url.serverUrl}Auth/password/reset/request/`, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email: email.toLowerCase() }),
            });
            const responseJson = await response.json();
            setIsLoading(false);
            findMessages(responseJson.detail, (message) => {
                toast.info(message);
            });
            if (responseJson.detail) {
                toast.success("کد تغییر رمز عبور به ایمیلتان ارسال شد");
                navigate("/newPassword");
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
            <div className="flex-6 flex flex-col items-center justify-center">
                <div className="flex justify-center">
                    <CustomText className="text-lg text-green-600 font-bold">
                        فراموشی رمز عبور
                    </CustomText>
                </div>
                <div className="w-3/5">
                    <CustomInput
                        placeholder="ایمیل را وارد کنید"
                        event={(value) => setEmail(value)}
                        keyboardType="email-address"
                        onSubmitEditing={() => passwordReset(email)} // Directly call passwordReset
                    />
                    <SimpleButton
                        func={onPressSubmit}
                        title="تایید"
                        btnStyle="mt-4"
                    />
                </div>
            </div>
            <div className="flex-1.5" />
            <LoadingModal isVisible={isLoading} />
        </div>
    );
}

export default ForgotPassword;