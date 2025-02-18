import React from 'react';
import { TouchableOpacity, Image, Linking } from 'react-native';

import CustomText from '../../../../Components/CustomText/CustomText';
import { logo, logo_long, clip } from '../../../../Components/Images/Images';
import colors from '../../../../Assets/Styles/Colors';
import language from '../../../../Assets/i18n/i18n';

function Banner(props) {
    return (
        <TouchableOpacity 
            style="w-11/12 h-full rounded-xl items-center justify-center bg-green-500" 
            onPress={() => Linking.openURL('https://etcco.ir')}>
            <div className="w-11/12 h-9/10 rounded-xl bg-green-500 border-white border-1 flex-row justify-center border-dotted">
                <div className="flex-1 items-center justify-center">
                    <CustomText style="text-white text-sm">
                        {language('right_now')} 
                    </CustomText>
                </div>
                <div className="flex-1 items-center justify-center">
                    <Image style="w-11.5 h-11.5 object-contain" source={logo} />
                </div>
                <div className="flex-1.5 items-center justify-center">
                    <CustomText style="text-white text-sm">
                        {language('order')} 
                    </CustomText>
                </div>
                <div className="flex-1 items-center justify-center">
                    <Image style="w-11.5 h-11.5 object-contain" source={clip} />
                </div>
            </div>
        </TouchableOpacity>
    );
};
export default Banner;
