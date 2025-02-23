import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Replacing BackHandler and props.history
import { toast } from "react-toastify"; // Replacing DropdownAlert

import { auto_back, auto_back_rtl } from "../../../Components/Images/Images";
import SimpleButton from "../../../Components/CustomButton/SimpleButton";
import CustomText from "../../../Components/CustomText/CustomText";
import colors from "../../../Assets/Styles/Colors";
import language from "../../../assets/i18n/i18n";
import storage from "../../../Factories/Storage"; // Import functional storage

function Password() {
    const navigate = useNavigate();
    const [back, setBack] = useState(auto_back_rtl);
    const [code, setCode] = useState("");

    useEffect(() => {
        // Check document direction instead of I18nManager.isRTL
        if (document.dir !== "rtl") {
            setBack(auto_back);
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
            toast.warn("گذرواژه را وارد کنید"); // Replacing DropdownAlert
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
            className="flex-1 flex flex-col bg-cover bg-center"
            style={{ backgroundImage: `url(${back})` }}
        >
            {/* StatusBar and DropdownAlert not needed in web */}
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
                            className="w-full h-[35px] rounded-[30px] text-[12px] text-left p-[10px] bg-white border border-[#d3d3d3] mt-[10px]"
                            placeholder="گذرواژه"
                            onChange={(e) => setCode(e.target.value)} // Replacing onChangeText
                            type="password" // Replacing keyboardType and adding security
                            onKeyPress={(e) => e.key === "Enter" && onPressSubmit()} // Replacing onSubmitEditing
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