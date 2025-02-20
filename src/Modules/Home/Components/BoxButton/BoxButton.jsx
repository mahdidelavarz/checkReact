import React from 'react';
import CustomText from '../../../../Components/CustomText/CustomText';


const BoxButton = (props) => {
    const { style, func, title, img } = props;
    return (
        <button
            style={["flex-1 rounded-lg bg-green-500 shadow-md", style]}
            onClick={func}>
            <div className="flex-1 justify-evenly items-center">
                <CustomText style="text-white text-sm font-['iranyekanwebregular(fanum)']">
                    {title}
                </CustomText>
                <img style="w-9 h-9 object-contain tint-white" src={img} />
            </div>
        </button>
    );
};
export default BoxButton;
