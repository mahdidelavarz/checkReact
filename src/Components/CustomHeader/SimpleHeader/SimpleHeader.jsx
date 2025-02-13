import React from 'react';
import { StatusBar, I18nManager } from 'react-native';

import { ic_back, ic_left_back } from '../../Images/Images';
import CustomText from '../../CustomText/CustomText';
import { colors } from '../../../Assets/Styles/Colors';

function SimpleHeader(props) {
    const { func, title } = props;

    return (
        <div className="w-full h-15 bg-green-500 border-b border-light-gray flex flex-row">
            <StatusBar backgroundColor={colors.dark_green} barStyle={'light-content'} />
            <button
                className="flex-1.5 items-center justify-center"
                onClick={func}
            >
                <img 
                    className="w-6 h-6 text-light-gray"
                    src={!I18nManager.isRTL ? ic_left_back : ic_back} 
                    alt="back icon" 
                />
            </button>
            <div className="flex-8.5 justify-center">
                <CustomText className="text-white text-base text-left mb-1.5 font-bold" numberOfLines={1}>
                    {title}
                </CustomText>
            </div>
        </div>
    );
}

export default SimpleHeader;
