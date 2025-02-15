import React from 'react';
import { ImageBackground } from 'react-native';
import { profile_back, ic_user } from '../../../../../Components/Images/Images';
import CustomText from '../../../../../Components/CustomText/CustomText';
import languages from '../../../../../Assets/i18n/i18n';

function Header({ userName }) {
    return (
        <ImageBackground className="flex-1" source={profile_back}>
            <div className="absolute bottom-[-30px] left-8 w-[70px] h-[70px] flex items-center justify-center bg-green-800 border-3 border-white rounded-full">
                <img className="w-[45px] h-[45px] text-white" source={ic_user} />
            </div>
            <CustomText
                font_weight="bold"
                className="absolute bottom-2 right-2 text-xs text-white bg-green-800 rounded-2xl px-3"
                numberOfLines={1}
            >
                {userName ? userName : languages('anonymous_user')}
            </CustomText>
        </ImageBackground>
    );
}

export default Header;
