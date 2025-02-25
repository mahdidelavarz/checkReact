import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

import icUser from "../../../../../Components/Images/ic_user.png";
import icArrow from "../../../../../Components/Images/ic_arrow.png";
import icCountry from "../../../../../Components/Images/ic_country.png";
import icShare from "../../../../../Components/Images/ic_share.png";
import logo from "../../../../../Components/Images/logo.png";
import icPasscode from "../../../../../Components/Images/ic_passcode.png";
import icDiscount from "../../../../../Components/Images/ic_discount.png";
import icUpdate from "../../../../../Components/Images/ic_update.png";
import icCredit from "../../../../../Components/Images/ic_credit.png";
import icSupport from "../../../../../Components/Images/ic_support.png";
import icInviteFriend from "../../../../../Components/Images/ic_inviteFriend.png";
import icExitApp from "../../../../../Components/Images/ic_exit_app.png";
import SimpleModal from "../../../../../Components/CustomModal/SimpleModal/SimpleModal";
import CustomText from "../../../../../Components/CustomText/CustomText";
import { statusHandle } from "../../../../../Factories/HttpHandler";
import languages from "../../../../../Assets/i18n/i18n";
import storage from "../../../../../Factories/Storage";
import { Url } from "../../../../../Configs/Urls";
import Store from "../../../../../Store/Store";

let Token; // Kept as closure variable

function FamiliarUser({ param }) {
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
            toast.info("این صفحه هنوز آماده نشده است");
        } else if (item.id === 7) {
            share();
        } else if (item.id === 11) {
            setIsModalExitToApp(true);
        } else {
            param.navigate(item.link);
        }
    };

    const share = async () => {
        try {
            if (navigator.share) {
                await navigator.share({
                    title: "Invite",
                    text: "Check out this link!",
                    url: "http://etcco.ir",
                });
                console.log("Share successful");
            } else {
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
            statusHandle(response.status, param.navigate);
            const responseJson = await response.json();
            if (responseJson.detail) {
                const keys = ["Token", "Profile"];
                storage.multiRemove(keys);
                Store.decrementTabBar();
                Store.clearToken();
                param.navigate("/"); // Assuming "/" is the login or home route
            }
        } catch (error) {
            toast.error(`${error.message}`);
        }
    };

    return (
        <div className="flex flex-col space-y-2 p-4 bg-white">
            {list.map((item, index) => (
                <button
                    key={index}
                    className={`flex items-center justify-between w-full p-4 border-b border-gray-300 ${index + 1 === list.length ? "mb-8 border-none" : ""
                        } hover:bg-gray-100`}
                    onClick={() => onPressItem(item)}
                >
                    <div className="flex items-center space-x-4">
                        <img className="w-6 h-6" src={item.icon} alt={item.title} />
                        <CustomText className="text-lg text-gray-800">{item.title}</CustomText>
                        {item.id === 2 && (
                            <CustomText className="text-green-500 text-lg">
                                {/* Assuming props.credit is not passed; adjust if needed */}
                                {/* {props.credit} */}
                            </CustomText>
                        )}
                        {item.id === 4 && (
                            <input
                                type="checkbox"
                                checked={password}
                                onChange={removePassword}
                                onClick={(e) => e.stopPropagation()} // Prevent button click from triggering
                                className="ml-2"
                                disabled // Optional: disable since clicking removes it
                            />
                        )}
                    </div>
                    <img className="w-4 h-4" src={icArrow} alt="Arrow" />
                </button>
            ))}
            <SimpleModal
                isVisible={isModalExitToApp}
                img={icExitApp}
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
    { title: "ویرایش پروفایل", icon: icUser, id: 1, link: "/editProfile" },
    { title: "کیف پول", icon: icCredit, id: 2, link: "/wallet" },
    { title: "کد تخفیف", icon: icDiscount, id: 3, link: "/discountCode" },
    { title: "گذرواژه ورود", icon: icPasscode, id: 4, link: "/securityPassword" },
    { title: "تغییر زبان اپلیکیشن", icon: icCountry, id: 5, link: "/languages/tabBar" },
    { title: "معرفی به دوستان", icon: icInviteFriend, id: 6, link: "/invite" },
    { title: "اشتراک گذاری", icon: icShare, id: 7 },
    { title: "بروز رسانی", icon: icUpdate, id: 8, link: "/update" },
    { title: "ارتباط با پشتیبانی", icon: icSupport, id: 9, link: "/contactSupport" },
    { title: "درباره daddy check", icon: logo, id: 10, link: "/aboutUs" },
    { title: "خروج", icon: icExitApp, id: 11 },
];