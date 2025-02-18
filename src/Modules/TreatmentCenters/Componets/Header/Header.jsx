import React from 'react';
import { StatusBar, TextInput, I18nManager, img, button } from 'react-native';
import { ic_back, ic_filter, ic_left_back } from '../../../../Components/Images/Images';
import language from '../../../../Assets/i18n/i18n';

function Header(props) {
    const { func_back, func_filter, event } = props;

    return (
        <div>
            <StatusBar backgroundColor="green" barStyle='light-content' />
            <div className="w-full h-15 flex flex-row bg-white border-b border-gray-200">
                <button className="flex-1.5 items-center justify-center" onPress={func_back}>
                    <img className="w-6 h-6 tint-dark" source={I18nManager.isRTL ? ic_back : ic_left_back} />
                </button>
                <div className="flex-7 justify-center">
                    <TextInput
                        style="w-full h-10 rounded-xl font-sans text-sm text-dark bg-[#F2F8FD] border border-dark p-2.5"
                        placeholder={language('search_for_medical_centers')}
                        placeholderTextColor="dark"
                        keyboardType="default"
                        onChangeText={event}
                    />
                </div>
                <button className="flex-1.5 items-center justify-center" onPress={func_filter}>
                    <img className="w-5 h-5 tint-dark" source={ic_filter} />
                </button>
            </div>
        </div>
    );
}

export default Header;
