import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom"; // Replacing BackHandler and props.history
import { Link } from "react-router-dom"; // Replacing react-router-native Link
import { toast } from "react-toastify"; // Replacing Toast and DropdownAlert

import LoadingModal from "../../../Components/CustomModal/LoadingModal/LoadingModal";
import { auto_back, auto_back_rtl } from "../../../Components/Images/Images";
import SimpleButton from "../../../Components/CustomButton/SimpleButton";
import CustomInput from "../../../Components/CustomInput/CustomInput";
import CustomText from "../../../Components/CustomText/CustomText";
import { findMessages } from "../../../Filters/Filters";
import language from "../../../Assets/i18n/i18n";
import storage from "../../../Factories/Storage"; // Import functional storage
import { Url } from "../../../Configs/Urls";
import Store from "../../../Store/Store";

function SignIn() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [back, setBack] = useState(auto_back_rtl);
    const [isLoading, setIsLoading] = useState(false);
    const inputs = useRef({}); // Replacing this.inputs for focusing

    useEffect(() => {
        // Check document direction instead of I18nManager.isRTL
        if (document.dir !== "rtl") {
            setBack(auto_back);
        }

        // Replacing BackHandler with browser back navigation
        const handleBack = () => {
            navigate(-1);
            return true;
        };
        window.addEventListener("popstate", handleBack);

        return () => window.removeEventListener("popstate", handleBack);
    }, [navigate]);

    const focusNextField = (id) => {
        if (inputs.current[id]) {
            inputs.current[id].focus();
        }
    };

    const onPressLogIn = () => {
        if (!email) {
            toast.warn("لطفا ایمیل خود را وارد کنید"); // Replacing DropdownAlert
        } else if (!password) {
            toast.warn("لطفا پسورد را وارد کنید");
        } else {
            // Replacing NetInfo with navigator.onLine
            if (navigator.onLine) {
                setIsLoading(true);
                // Replacing DeviceInfo.getMacAddress with a random ID
                const macAddress = "web-" + Math.random().toString(36).substring(2, 15);
                doLogin(macAddress, email, password);
            } else {
                toast.error("عدم دسترسی به اینترنت. لطفا اتصال به اینترنت را چک کنید.");
            }
        }
    };

    const doLogin = async (macAddress, email, password) => {
        const model = "web"; // Replacing DeviceInfo.getModel
        try {
            const response = await fetch(`${Url.serverUrl}Auth/login/`, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    platform: "web", // Replacing Platform.OS
                    mac: macAddress,
                    model,
                    email: email.toLowerCase(),
                    password,
                }),
            });
            const responseJson = await response.json();
            const token = responseJson.token;
            if (token) {
                storage.set("Token", token); // Updated to functional storage
                Store.setToken(token);
                navigate("/tabBar");
            }
            findMessages(responseJson.detail, (message) => {
                toast.info(message); // Replacing Toast.show
            });
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            toast.error(`${error.message}`);
        }
    };

    const handleBackButtonClick = () => {
        navigate(-1);
    };

    return (
        <div
            className="flex-1 flex flex-col bg-cover bg-center"
            style={{ backgroundImage: `url(${back})` }}
        >
            {/* DropdownAlert and StatusBar not needed in web */}
            <div className="flex-2.5" />
            <div className="flex-6 flex flex-col">
                <div className="flex-1 flex justify-center">
                    <CustomText font_weight="bold" className="text-green-500 text-xl ml-15">
                        {language("login")}
                    </CustomText>
                </div>
                <div className="flex-9 flex items-center justify-center">
                    <div className="w-7/10">
                        <CustomInput
                            placeholder={language("email")}
                            event={(value) => setEmail(value)}
                            keyboardType="email-address" // Adjust in CustomInput for web
                            autoCapitalize="none"
                            onSubmitEditing={() => focusNextField("password")}
                        />
                        <CustomInput
                            placeholder={language("password")}
                            event={(value) => setPassword(value)}
                            keyboardType="default"
                            onRef={(ref) => (inputs.current["password"] = ref)}
                            onSubmitEditing={onPressLogIn}
                            mode="password"
                        />
                        <SimpleButton
                            func={onPressLogIn}
                            title={language("login")}
                            btnStyle="my-4"
                        />
                        <Link to="/forgotPassword">
                            <CustomText className="text-green-500 text-sm my-1">
                                فراموشی رمز عبور؟
                            </CustomText>
                        </Link>
                        <Link to="/signUp">
                            <CustomText className="text-green-500 text-sm my-1">
                                ثبت نام نکرده اید؟
                            </CustomText>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="flex-1.5" />
            <LoadingModal isVisible={isLoading} />
        </div>
    );
}

export default SignIn;