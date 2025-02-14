import React, { useState } from 'react';
import { TextInput, Image, I18nManager } from 'react-native';

import { ic_back, ic_left_back, ic_search, ic_close } from '../../../../../Components/Images/Images';
import CustomText from '../../../../../Components/CustomText/CustomText';
import colors from '../../../../../Assets/Styles/Colors';
import language from '../../../../../Assets/i18n/i18n';

const Header = (props) => {
    const [isVisibleInput, setIsVisibleInput] = useState(false);
    const { func_back, event } = props;

    return (
        <div>
            {!isVisibleInput ?
                <div className="w-full h-15 bg-green-600 flex flex-row border-b border-dark-green">
                    <button className="flex-1.5 items-center justify-center" onPress={func_back}>
                        <Image className="w-6 h-6 tint-white" source={I18nManager.isRTL ? ic_back : ic_left_back} />
                    </button>
                    <div className="flex-7 justify-center">
                        <CustomText className="text-center text-white text-base">
                            {language('historys')}
                        </CustomText>
                    </div>
                    <button className="flex-1.5 items-center justify-center" onPress={() => setIsVisibleInput(!isVisibleInput)}>
                        <Image className="w-5 h-5 tint-white" source={ic_search} />
                    </button>
                </div>
                :
                <div className="w-full h-15 justify-center bg-green-600 border-b border-dark-green">
                    <button className="absolute left-2 z-10 w-10 h-11 items-center justify-center" onPress={() => setIsVisibleInput(!isVisibleInput)}>
                        <Image className="w-7 h-7 tint-light-text" source={ic_close} />
                    </button>
                    <TextInput
                        style={{
                            width: '95%',
                            alignSelf: 'center',
                            height: 45,
                            borderRadius: 30,
                            fontFamily: 'iranyekanwebregular(fanum)',
                            fontSize: 12,
                            color: colors.dark_txt,
                            backgroundColor: colors.white,
                            borderColor: colors.dark_txt,
                            borderWidth: 0.5,
                            paddingLeft: 45,
                            textAlign: !I18nManager.isRTL ? 'left' : 'right',
                            paddingTop: 10,
                        }}
                        placeholder={'جستجو بر اساس عنوان'}
                        placeholderTextColor={colors.dark_txt}
                        keyboardType={'default'}
                        onChangeText={event}
                    />
                </div>
            }
        </div>
    );
};

export default Header;
