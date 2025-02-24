import React from "react";
import CustomText from "../CustomText/CustomText";

function SimpleButton({ func, btnStyle, title, titleStyle }) {
    return (
        <button
            className={`w-full h-8 bg-green-500 rounded-full flex justify-center items-center hover:opacity-80 focus:opacity-80 ${btnStyle}`} // Added hover/focus for web interactivity
            onClick={func}
        >
            <CustomText
                className={`text-base text-white text-center ${titleStyle}`}
                font_weight="bold"
            >
                {title}
            </CustomText>
        </button>
    );
}

export default SimpleButton;