import React, { useState } from 'react';
import { div, button } from 'react-native';

import CustomText from '../../../../../Components/CustomText/CustomText';
import {} from '../../../../../Components/Images/Images';
import colors from '../../../../../Assets/Styles/Colors';

function HeaderTable(props) {
    return (
        <div className="h-[45px] bg-green-500 flex flex-row-reverse items-center justify-center rounded-t-[5px] w-[95%] mx-auto">
            <CustomText font_weight="bold" style="text-center text-white text-[12px] flex-1">
                {props.title1}
            </CustomText>
            <div className="h-full w-[1px] bg-white" />
            <CustomText font_weight="bold" style="text-center text-white text-[12px] flex-1">
                {props.title2}
            </CustomText>
            <div className="h-full w-[1px] bg-white" />
            <CustomText font_weight="bold" style="text-center text-white text-[12px] flex-1">
                {props.title3}
            </CustomText>
            <div className="h-full w-[1px] bg-white" />
            {props.title4 ? (
                <div className="flex-1">
                    <div className="flex-1 items-center">
                        <CustomText font_weight="bold" style="text-white text-center mt-[10px] text-[12px]">
                            {props.title4}
                        </CustomText>
                    </div>
                    <div className="h-full w-[1px] bg-white" />
                </div>
            ) : null}
        </div>
    );
};

export default HeaderTable;
