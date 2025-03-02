import React, { useState } from "react";
import icBack from "../../../../../Components/Images/ic_back.png"; // Direct imports
import icLeftBack from "../../../../../Components/Images/ic_left_back.png";
import icSearch from "../../../../../Components/Images/ic_search.png";
import icClose from "../../../../../Components/Images/ic_close.png";
import CustomText from "../../../../../Components/CustomText/CustomText";
import language from "../../../../../assets/i18n/i18n";

function Header({ func_back, event }) {
    const [isVisibleInput, setIsVisibleInput] = useState(false);
    const isRTL = document.dir === "rtl"; // Replacing I18nManager.isRTL

    return (
        <div className="w-full h-15 bg-green-600 border-b border-green-800">
            {!isVisibleInput ? (
                <div className="flex flex-row h-full">
                    <button
                        className="flex-1.5 flex items-center justify-center hover:bg-green-700"
                        onClick={func_back}
                    >
                        <img
                            className="w-6 h-6"
                            src={isRTL ? icBack : icLeftBack}
                            alt="Back Icon"
                        />
                    </button>
                    <div className="flex-7 flex justify-center items-center">
                        <CustomText className="text-center text-white text-base">
                            {language("historys")}
                        </CustomText>
                    </div>
                    <button
                        className="flex-1.5 flex items-center justify-center hover:bg-green-700"
                        onClick={() => setIsVisibleInput(!isVisibleInput)}
                    >
                        <img
                            className="w-5 h-5"
                            src={icSearch}
                            alt="Search Icon"
                        />
                    </button>
                </div>
            ) : (
                <div className="relative flex justify-center items-center h-full">
                    <button
                        className="absolute left-2 z-10 w-10 h-11 flex items-center justify-center hover:bg-green-700"
                        onClick={() => setIsVisibleInput(!isVisibleInput)}
                    >
                        <img
                            className="w-7 h-7"
                            src={icClose}
                            alt="Close Icon"
                        />
                    </button>
                    <input
                        className="w-[95%] h-[45px] rounded-[30px] text-sm text-gray-800 bg-white border border-gray-600 py-2.5 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-green-500"
                        style={{ textAlign: isRTL ? "right" : "left" }}
                        placeholder="جستجو بر اساس عنوان"
                        type="text"
                        onChange={(e) => event(e.target.value)}
                    />
                </div>
            )}
        </div>
    );
}

export default Header;