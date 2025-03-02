import React from 'react';
import ic_user from '../../../../../Components/Images/ic_user.png';
import CustomText from '../../../../../Components/CustomText/CustomText';
import language from '../../../../../assets/i18n/i18n';

function Box(props) {
    const { selectedIndex, index, func, price } = props;
    return (
        <button
            className={`border-2 rounded-md p-2 ${selectedIndex === index ? 'border-green-500' : 'border-gray-300'}`}
            activeOpacity={0.7}
            onPress={func}
        >
            <img className='w-5 h-5' source={ic_user} />
            <CustomText >
                {price}
            </CustomText>
        </button>
    );
};

export default Box;
