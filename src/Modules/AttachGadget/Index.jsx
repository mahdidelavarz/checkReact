import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"; // Replacing BackHandler and props.history
import { toast } from "react-toastify"; // Replacing Toast

import SimpleHeader from "../../Components/CustomHeader/SimpleHeader/SimpleHeader";
import { ic_ok, gadgetScan } from "../../Components/Images/Images";
import CustomText from "../../Components/CustomText/CustomText";
import { findMessages } from "../../Filters/Filters";
import storage from "../../Factories/Storage"; // Import functional storage
import { Url } from "../../Configs/Urls";

let Token;

function AttachGadget() {
    const navigate = useNavigate();
    const { code } = useParams(); // Replacing props.match.params.code
    const [tokenFetched, setTokenFetched] = useState(false); // Track token fetch completion

    useEffect(() => {
        // Replacing BackHandler with browser back navigation
        const handleBack = () => {
            navigate(-1);
            return true;
        };
        window.addEventListener("popstate", handleBack);

        // Fetch token
        storage.get("Token", (data) => {
            Token = data;
            setTokenFetched(true); // Mark token as fetched
        });

        return () => window.removeEventListener("popstate", handleBack);
    }, [navigate]);

    const onPressAttachGadget = async () => {
        if (!tokenFetched || !Token) {
            toast.error("لطفاً ابتدا وارد شوید"); // Notify if token isn’t ready
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
            if (response.status === 201) {
                navigate("/secondStep");
            }
            const responseJson = await response.json();
            findMessages(responseJson.detail, (message) => {
                toast.info(message); // Replacing Toast.show
            });
        } catch (error) {
            toast.error("خطای سرویس‌دهنده‌ی داخلی. دوباره تلاش کنید"); // Replacing Toast.show
        }
    };

    const handleBack = () => {
        navigate("/qRCodeScan");
    };

    return (
        <div className="flex flex-col min-h-screen bg-white">
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
                        className="w-[70%] h-[45px] bg-green-500 rounded-full flex flex-row items-center justify-evenly"
                        onClick={onPressAttachGadget}
                    >
                        <CustomText className="text-white text-base">افزودن</CustomText>
                        <img
                            className="w-[25px] h-[25px] object-contain"
                            src={ic_ok}
                            alt="OK Icon"
                        />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AttachGadget;