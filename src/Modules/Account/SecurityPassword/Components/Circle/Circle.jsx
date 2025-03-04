import React from 'react';

import CustomText from '../../../../../Components/CustomText/CustomText';

function Circle(props) {
    const { number } = props;
    return (
        <div className={`w-9 h-9 rounded-full m-1.5 items-center justify-center ${number || number === 0 ? 'bg-green-500' : 'bg-gray-300'}`}>
            <CustomText className="text-base text-green-500">
                {number}
            </CustomText>
        </div>
    );
};
export default Circle;
