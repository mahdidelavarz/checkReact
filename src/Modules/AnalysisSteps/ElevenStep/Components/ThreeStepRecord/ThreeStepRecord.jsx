import React from 'react';
import { View, Image } from 'react-native';

import RecordFooter from '../../../../../Components/Analysis/RecordFooter/RecordFooter';
import { videoSuccess, ic_ok, ic_close } from '../../../../../Components/Images/Images';
import CustomText from '../../../../../Components/CustomText/CustomText';
import colors from '../../../../../Assets/Styles/Colors';
import languages from '../../../../../Assets/i18n/i18n';

function ThreeStepRecord(props) {
    const { step, footerNextFunc, footerAgainFunc, status } = props;
    return (
        <View className="flex-1 justify-evenly">
            {status ? 
                <CustomText className="font-bold text-center mt-1">
                    <Image className="w-4 h-4" source={ic_ok} /> {languages('send_done')}
                </CustomText>
                : 
                <CustomText className="font-bold text-center mt-1">
                    <Image className="w-4 h-4 tint-red" source={ic_close} />  ارسال فیلد دوم با مشکل مواجه شد دوباره تلاش کنید
                </CustomText>
            }
            <View className="items-center justify-center">
                <Image className="w-11 h-11 tint-violet" source={videoSuccess} />
            </View>
            <View className="absolute bottom-0 left-0 right-0 bg-light-gray">
                <RecordFooter
                    step={step}
                    rightFunc={footerNextFunc}
                    rightTxt={languages('next')}
                    leftFunc={footerAgainFunc}
                    leftTxt={languages('again')}
                    refresh={true}
                />
            </View>
        </View>
    );
};
export default ThreeStepRecord;
