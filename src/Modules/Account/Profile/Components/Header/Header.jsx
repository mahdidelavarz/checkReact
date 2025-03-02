import React from "react";
import profileBack from "../../../../../Components/Images/auth_back.jpg"; // Updated per your instruction
import icUser from "../../../../../Components/Images/ic_user.png";
import CustomText from "../../../../../Components/CustomText/CustomText";
import languages from "../../../../../assets/i18n/i18n";

function Header({ userName }) {
    return (
        <div
            className="flex-1 bg-cover bg-center relative"
            style={{ backgroundImage: `url(${profileBack})` }}
        >
            <div className="absolute bottom-[-30px] left-8 w-[70px] h-[70px] flex items-center justify-center bg-green-800 border-[3px] border-white rounded-full">
                <img
                    className="w-[45px] h-[45px]"
                    src={icUser}
                    alt="User Icon"
                />
            </div>
            <CustomText
                font_weight="bold"
                className="absolute bottom-2 right-2 text-xs text-white bg-green-800 rounded-2xl px-3"
                numberOfLines={1}
            >
                {userName || languages("anonymous_user")}
            </CustomText>
        </div>
    );
}

export default Header;