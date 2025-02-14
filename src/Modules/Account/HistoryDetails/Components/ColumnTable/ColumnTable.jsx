import React, { useState } from 'react';
import { div, span } from 'react-native';

import CustomText from '../../../../../Components/CustomText/CustomText';
import { } from '../../../../../Components/Images/Images';
import colors from '../../../../../Assets/Styles/Colors';

function ColumnTable(props) {
    return (
        <div className="flex flex-row-reverse items-center justify-center w-[95%] mx-auto h-[45px] bg-white border-[1px] border-[#d3d3d3]">
            <span className="text-center text-[12px] flex-1 text-black">
                {props.value1}
            </span>
            <div className="h-full w-[1px] bg-[#d3d3d3]" />
            <span className="text-center text-[12px] flex-1 text-black">
                {props.value2}
            </span>
            <div className="h-full w-[1px] bg-[#d3d3d3]" />
            <span className="text-center text-[12px] flex-1 text-black">
                {props.value3}
            </span>
            {props.value4 ? (
                <div className="flex-1 h-full justify-center border-r-[1px] border-[#d3d3d3]">
                    <span className="flex-0 text-center text-[12px] text-black">
                        {props.value4}
                    </span>
                </div>
            ) : null}
        </div>
    );
};

export default ColumnTable;
