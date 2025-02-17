import React from 'react';
import { TouchableOpacity, Image } from 'react-native';

import CustomText from '../../../../../Components/CustomText/CustomText';
import { ic_refresh, ic_arrow } from '../../../../../Components/Images/Images';
import colors from '../../../../../Assets/Styles/Colors';

function RecordFooter(props) {
    const { step, rightFunc, rightTxt, leftFunc, leftTxt, refresh } = props;
    return (
        <div className="w-full flex flex-row h-12">
            {/* Right Button */}
            <div className="flex-2.5 items-center justify-center">
                <TouchableOpacity
                    className="w-4/5 h-7 rounded-full border-1 border-light-txt bg-white flex flex-row justify-evenly items-center"
                    onPress={rightFunc}
                >
                    <Image className="w-2.5 h-2.5 tint-green transform rotate-180" source={ic_arrow} />
                    <CustomText className="text-green text-xs">
                        {rightTxt}
                    </CustomText>
                </TouchableOpacity>
            </div>

            {/* Center Step Indicator */}
            <div className="flex-5 items-center justify-center pb-4">
                <CustomText font_weight={'bold'} className="text-violet text-sm">
                    {step} <CustomText font_weight={'bold'} className="text-dark-txt">/ 3</CustomText>
                </CustomText>
                <div className="flex flex-row-reverse">
                    <div className="w-10 h-3 rounded-full mx-1 mt-1 bg-violet" />
                    <div
                        className={`w-10 h-3 rounded-full mx-1 mt-1 ${
                            step === 1
                                ? 'bg-light-txt'
                                : step === 2 || step === 3
                                ? 'bg-violet'
                                : ''
                        }`}
                    />
                    <div
                        className={`w-10 h-3 rounded-full mx-1 mt-1 ${
                            step === 3 ? 'bg-violet' : 'bg-light-txt'
                        }`}
                    />
                </div>
            </div>

            {/* Left Button */}
            <div className="flex-2.5 items-center justify-center">
                <TouchableOpacity
                    className="w-4/5 h-7 rounded-full border-1 border-light-txt bg-white flex flex-row justify-evenly items-center"
                    onPress={leftFunc}
                >
                    <CustomText className="text-green text-xs">
                        {leftTxt}
                    </CustomText>
                    <Image className="w-2.5 h-2.5 tint-green" source={refresh ? ic_refresh : ic_arrow} />
                </TouchableOpacity>
            </div>
        </div>
    );
}

export default RecordFooter;
