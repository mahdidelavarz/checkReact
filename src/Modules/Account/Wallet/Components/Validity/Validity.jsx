import React from 'react';
import { Image } from 'react-native';

import { ic_user } from '../../../../../Components/Images/Images';
import SimpleButton from '../../../../../Components/CustomButton/SimpleButton';
import CustomInput from '../../../../../Components/CustomInput/CustomInput';
import CustomText from '../../../../../Components/CustomText/CustomText';
import colors from '../../../../../Assets/Styles/Colors';
import language from '../../../../../Assets/i18n/i18n';

function Validity(props) {
    return (
        <div className="w-3/5 h-12 flex flex-row justify-center items-center mt-5">
            <div className="flex-1 justify-center items-center">
                <Image style={{ width: 20, height: 20 }} source={ic_user} />
            </div>
            <div className="flex-2 justify-center">
                <CustomText style="text-sm text-dark_txt text-left">
                    اعتبار شما
                </CustomText>
            </div>
            <div className="flex-2 justify-center">
                <CustomText style="text-base text-green text-left">
                    22000 IRR
                </CustomText>
            </div>
        </div>
    );
};

export default Validity;
