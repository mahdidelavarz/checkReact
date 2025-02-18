import React from 'react';
import { View, Image } from 'react-native';

import CustomText from '../../../../Components/CustomText/CustomText';

function Slide(props) {
    const { item } = props;

    return (
        <View className="flex-1 flex-col">
            <View className="flex-5 pt-2.5 items-center justify-center">
                <Image className="w-1/2 h-full" source={item.image} resizeMode='stretch' />
            </View>
            <View className="flex-5 pt-3.5">
                <CustomText className="text-xs text-black w-11/12 self-center text-center">
                    {item.description}
                </CustomText>
            </View>
        </View>
    );
}
export default Slide;
