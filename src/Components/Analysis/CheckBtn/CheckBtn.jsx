
import React from "react";
import { ic_circle, ic_circle_check } from "../../Images/Images";
import CustomText from "../../CustomText/CustomText";

function CheckBtn({ btnStyle, func, isCheck, title }) {
    return (
        <button
            className={`
        flex items-center justify-center px-4 h-10 rounded-full border
       ${isCheck ? "border-green-500" : "border-gray-300"} 
        ${btnStyle}`
            }
            onClick={func}
        >
            <img
                className="w-5 h-5"
                src={isCheck ? ic_circle_check : ic_circle}
                alt="Check Icon"
            />
            <CustomText
                className="ml-2 text-xs"
                font_weight={isCheck ? "bold" : "normal"}
            >
                {title}
            </CustomText>
        </button>
    );
}

export default CheckBtn;
