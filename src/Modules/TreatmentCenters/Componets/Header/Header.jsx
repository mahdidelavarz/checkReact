import React from "react";
import icBack from "../../../../Components/Images/ic_back.png"; // Direct imports
import icLeftBack from "../../../../Components/Images/ic_left_back.png";
import icFilter from "../../../../Components/Images/ic_filter.png";
import language from "../../../../assets/i18n/i18n";

function Header({ func_back, func_filter, event }) {
    const isRTL = document.dir === "rtl"; // Replacing I18nManager.isRTL

    return (
        <div className="w-full h-15 bg-white border-b border-gray-200 flex flex-row items-center">
            <button
                className="flex-1.5 flex items-center justify-center hover:bg-gray-100"
                onClick={func_back}
            >
                <img
                    className="w-6 h-6"
                    src={isRTL ? icBack : icLeftBack}
                    alt="Back Icon"
                />
            </button>
            <div className="flex-7 flex justify-center">
                <input
                    className="w-full h-10 rounded-xl text-sm text-gray-800 bg-[#F2F8FD] border border-gray-600 p-2.5 focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder={language("search_for_medical_centers")}
                    type="text"
                    onChange={(e) => event(e.target.value)}
                />
            </div>
            <button
                className="flex-1.5 flex items-center justify-center hover:bg-gray-100"
                onClick={func_filter}
            >
                <img
                    className="w-5 h-5"
                    src={icFilter}
                    alt="Filter Icon"
                />
            </button>
        </div>
    );
}

export default Header;