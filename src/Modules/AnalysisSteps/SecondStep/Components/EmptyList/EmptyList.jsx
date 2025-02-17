import React from 'react';
import * as Animatable from 'react-native-animatable';
import CustomText from '../../../../../Components/CustomText/CustomText';
import { gadget, ic_close } from '../../../../../Components/Images/Images';
import language from '../../../../../Assets/i18n/i18n';

function EmptyList() {
    return (
        <div className="flex flex-col h-full bg-white">
            <div className="flex-2 flex items-center justify-center relative">
                <img className="w-3/5 h-3/5" src={gadget} alt="Gadget" />
                <Animatable.img
                    animation="zoomIn"
                    iterationCount={300}
                    direction="alternate"
                    src={ic_close}
                    className="w-[25px] h-[25px] text-red-500 absolute"
                    alt="Close"
                />
            </div>
            <div className="flex-1 flex justify-start">
                <CustomText className="text-xs text-gray-400 text-center">
                    {language('empty_gadget')}
                </CustomText>
            </div>
        </div>
    );
}

export default EmptyList;
