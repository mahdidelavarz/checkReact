import React from "react";
import icBack from "../../Images/ic_back.png"; // Direct import
import icLeftBack from "../../Images/ic_left_back.png";
import CustomText from "../../CustomText/CustomText";

function SimpleHeader({ func, title }) {
    const isRTL = document.dir === "rtl"; // Replacing I18nManager.isRTL

    return (
        <div className="w-full h-15 bg-green-500 border-b border-gray-200 flex flex-row items-center">
            <button
                className="flex-1.5 flex items-center justify-center hover:bg-green-600"
                onClick={func}
            >
                <img
                    className="w-6 h-6"
                    src={isRTL ? icBack : icLeftBack}
                    alt="Back Icon"
                />
            </button>
            <div className="flex-8.5 flex justify-center">
                <CustomText
                    className="text-white text-base text-left mb-1.5 font-bold"
                    numberOfLines={1}
                >
                    {title}
                </CustomText>
            </div>
        </div>
    );
}

export default SimpleHeader;