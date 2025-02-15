import React from 'react';
import { View, Button, Image } from 'react-native';

import CustomText from '../../../../../Components/CustomText/CustomText';
import { ic_refresh, ic_arrow } from '../../../../../Components/Images/Images';
import colors from '../../../../../Assets/Styles/Colors';

function RecordFooter(props) {
    const { step, rightFunc, rightTxt, leftFunc, leftTxt, refresh } = props;
    return (
        <View className="w-full flex-row h-12">
            <View className="flex-2.5 items-center justify-center">
                <Button className="w-4/5 h-7 rounded-2xl border border-light-txt bg-white flex-row justify-evenly items-center" onPress={rightFunc}>
                    <Image className="w-2.5 h-2.5 tint-green transform rotate-180" source={ic_arrow} />
                    <CustomText className="text-xs text-green">
                        {rightTxt}
                    </CustomText>
                </Button>
            </View>
            <View className="flex-5 items-center justify-center pb-3">
                <CustomText className="font-bold text-sm text-violet">
                    {step} <CustomText className="font-bold text-dark-txt">/ 3</CustomText>
                </CustomText>
                <View className="flex-row-reverse">
                    <View className="w-10 h-3 rounded-full bg-violet mx-1 mt-1"></View>
                    <View className={`w-10 h-3 rounded-full mx-1 mt-1 ${step === 1 ? 'bg-light-txt' : step === 2 || step === 3 ? 'bg-violet' : ''}`}></View>
                    <View className={`w-10 h-3 rounded-full mx-1 mt-1 ${step === 3 ? 'bg-violet' : 'bg-light-txt'}`}></View>
                </View>
            </View>
            <View className="flex-2.5 items-center justify-center">
                <Button className="w-4/5 h-7 rounded-2xl border border-light-txt bg-white flex-row justify-evenly items-center" onPress={leftFunc}>
                    <CustomText className="text-xs text-green">
                        {leftTxt}
                    </CustomText>
                    <Image className="w-2.5 h-2.5 tint-green" source={refresh ? ic_refresh : ic_arrow} />
                </Button>
            </View>
        </View>
    );
};
export default RecordFooter;
