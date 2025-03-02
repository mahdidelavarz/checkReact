import React from 'react';
import { Alert, Image } from 'react-native';

import CustomText from '../../../../../Components/CustomText/CustomText';
import { ic_refresh, ic_arrow } from '../../../../../Components/Images/Images';
// import colors from '../../../../../assets/Styles/Colors';

function RecordFooter(props) {
    const { step, rightFunc, rightTxt, leftFunc, leftTxt, refresh } = props;
    return (
        <div className="w-full flex flex-row h-[50px]">
            {/* Right Button */}
            <div className="flex-[2.5] items-center justify-center">
                <button
                    className="w-[80%] h-[30px] rounded-full border border-light_txt bg-white flex flex-row justify-evenly items-center"
                    onPress={rightFunc}
                >
                    <Image
                        className="w-[10px] h-[10px] tint-green rotate-180"
                        source={ic_arrow}
                    />
                    <CustomText className="text-green text-xs">
                        {rightTxt}
                    </CustomText>
                </button>
            </div>

            {/* Center */}
            <div className="flex-[5] items-center justify-center pb-[15px]">
                <CustomText className="text-violet text-sm font-bold">
                    {step} <CustomText className="text-dark_txt font-bold">/ 3</CustomText>
                </CustomText>
                <div className="flex flex-row-reverse">
                    <div className="w-[40px] h-[12px] rounded-[10px] mx-[5px] mt-[5px] bg-violet" />
                    <div
                        className={`w-[40px] h-[12px] rounded-[10px] mx-[5px] mt-[5px] ${
                            step == 1
                                ? 'bg-light_txt'
                                : step == 2
                                ? 'bg-violet'
                                : step == 3
                                ? 'bg-violet'
                                : ''
                        }`}
                    />
                    <div
                        className={`w-[40px] h-[12px] rounded-[10px] mx-[5px] mt-[5px] ${
                            step == 3 ? 'bg-violet' : 'bg-light_txt'
                        }`}
                    />
                </div>
            </div>

            {/* Left Button */}
            <div className="flex-[2.5] items-center justify-center">
                <button
                    className="w-[80%] h-[30px] rounded-full border border-light_txt bg-white flex flex-row justify-evenly items-center"
                    onPress={leftFunc}
                >
                    <CustomText className="text-green text-xs">
                        {leftTxt}
                    </CustomText>
                    <Image
                        className="w-[10px] h-[10px] tint-green"
                        source={refresh ? ic_refresh : ic_arrow}
                    />
                </button>
            </div>
        </div>
    );
}

export default RecordFooter;
