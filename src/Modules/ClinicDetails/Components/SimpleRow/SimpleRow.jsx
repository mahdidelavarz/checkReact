import React from 'react';

import CustomText from '../../../../Components/CustomText/CustomText';

const SimpleRow = ({ ic, title, body }) => {
    return (
        <div className="flex flex-row w-[95%] h-[50px]">
            <div className="flex-1 flex items-center justify-center">
                <img className="w-[22px] h-[22px] text-green-500" src={ic} alt="icon" />
            </div>
            <div className="flex-9 flex items-center justify-center">
                <CustomText className="text-[14px] text-black">
                    {title}
                    <CustomText className="text-gray-500 text-[14px]">
                        {' ' + body}
                    </CustomText>
                </CustomText>
            </div>
        </div>
    );
};
export default SimpleRow;
