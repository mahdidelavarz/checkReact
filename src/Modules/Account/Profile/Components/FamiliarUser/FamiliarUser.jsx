import React, { useState, useEffect } from "react";
import { toast } from "react-toastify"; // Replacing Toast

import {
    ic_user, ic_arrow, ic_country, ic_share, logo, ic_passcode, ic_discount,
    ic_update, ic_credit, ic_support, ic_inviteFriend, ic_exit_app
} from "../../../../../Components/Images/Images";
import SimpleModal from "../../../../../Components/CustomModal/SimpleModal/SimpleModal";
import CustomText from "../../../../../Components/CustomText/CustomText";
import { statusHandle } from "../../../../../Factories/HttpHandler";
import languages from "../../../../../assets/i18n/i18n";
import storage from "../../../../../Factories/Storage"; // Import functional storage
import { Url } from "../../../../../Configs/Urls";
import Store from "../../../../../Store/Store";

let Token; // Kept as closure variable

function FamiliarUser({ param }) { // Destructured props for clarity
    const [isModalExitToApp, setIsModalExitToApp] = useState(false);
    const [password, setPassword] = useState(false);

    useEffect(() => {
        storage.get("Token", (token) => (Token = token));
        storage.get("Password", (pass) => setPassword(!!pass)); // Convert to boolean
    }, []);

    const removePassword = () => {
        storage.remove("Password");
        setPassword(false); // Directly set to false since we're removing it
    };

    const onPressItem = (item) => {
        if ([2, 3, 5, 8].includes(item.id)) {
            toast.info("این صفحه هنوز آماده نشده است"); // Replacing Toast.show
        } else if (item.id === 7) {
            share();
        } else if (item.id === 11) {
            setIsModalExitToApp(true);
        } else {
            param.navigate(item.link); // Updated to use navigate from param
        }
    };

    const share = async () => {
        try {
            // Replacing Share.share with Web Share API
            if (navigator.share) {
                await navigator.share({
                    title: "Invite",
                    text: "Check out this link!",
                    url: "http://etcco.ir",
                });
                console.log("Share successful");
            } else {
                // Fallback for browsers without Web Share API
                navigator.clipboard.writeText("http://etcco.ir");
                toast.info("Link copied to clipboard: http://etcco.ir");
            }
        } catch (error) {
            console.error("Share error:", error);
            toast.error("Failed to share: " + error.message);
        }
    };

    const onPressExitToApp = async () => {
        setIsModalExitToApp(false);
        try {
            const response = await fetch(`${Url.serverUrl}Auth/logout/`, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: `token ${Token}`,
                },
            });
            statusHandle(response.status, param.navigate); // Updated to use navigate
            const responseJson = await response.json();
            if (responseJson.detail) {
                const keys = ["Token", "Profile"];
                storage.multiRemove(keys); // Updated to functional storage
                Store.decrementTabBar();
                Store.clearToken();
                param.navigate("/"); // Updated to use navigate
            }
        } catch (error) {
            toast.error(`${error.message}`); // Replacing Toast.show
        }
    };

    return (
        <div className="flex flex-col space-y-2 p-4">
            {list.map((item, index) => (
                <button
                    key={index}
                    className={`flex items-center justify-between w-full p-4 border-b border-gray-300 ${index + 1 === list.length ? "mb-8 border-none" : ""}`}
                    onClick={() => onPressItem(item)}
                >
                    <div className="flex items-center space-x-4">
                        <img className="w-6 h-6" src={item.icon} alt={item.title} />
                        <CustomText className="text-lg text-dark_txt">{item.title}</CustomText>
                        {item.id === 2 && (
                            <CustomText className="text-green-500 text-lg">{props.credit}</CustomText>
                        )}
                        {item.id === 4 && (
                            <input
                                type="checkbox"
                                checked={password}
                                onChange={removePassword}
                                className="ml-2"
                                disabled // Optional: disable since clicking removes it
                            />
                        )}
                    </div>
                    <img className="w-4 h-4" src={ic_arrow} alt="arrow" />
                </button>
            ))}
            <SimpleModal
                isVisible={isModalExitToApp}
                img={ic_exit_app}
                title="خروج"
                description="آیا مایلید از برنامه خارج شوید؟"
                right_func={onPressExitToApp}
                left_func={() => setIsModalExitToApp(false)}
            />
        </div>
    );
}

export default FamiliarUser;

const list = [
    { title: "ویرایش پروفایل", icon: ic_user, id: 1, link: "/editProfile" },
    { title: "کیف پول", icon: ic_credit, id: 2, link: "/wallet" },
    { title: "کد تخفیف", icon: ic_discount, id: 3, link: "/discountCode" },
    { title: "گذرواژه ورود", icon: ic_passcode, id: 4, link: "/securityPassword" },
    { title: "تغییر زبان اپلیکیشن", icon: ic_country, id: 5, link: "/languages/tabBar" },
    { title: "معرفی به دوستان", icon: ic_inviteFriend, id: 6, link: "/invite" },
    { title: "اشتراک گذاری", icon: ic_share, id: 7 },
    { title: "بروز رسانی", icon: ic_update, id: 8, link: "/update" },
    { title: "ارتباط با پشتیبانی", icon: ic_support, id: 9, link: "/contactSupport" },
    { title: "درباره daddy check", icon: logo, id: 10, link: "/aboutUs" },
    { title: "خروج", icon: ic_exit_app, id: 11 },
];