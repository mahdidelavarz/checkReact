import React from 'react';
import { TouchableOpacity, Image } from 'react-native';

import CustomText from '../../../../Components/CustomText/CustomText';
import { test1, test2 } from '../../../../Components/Images/Images';
import colors from '../../../../Assets/Styles/Colors';

const BoxButton = (props) => {
    const { style, func, title, img } = props;
    return (
        <TouchableOpacity 
            style={[ "flex-1 rounded-lg bg-green-500 shadow-md", style]} 
            onPress={func}>
            <div className="flex-1 justify-evenly items-center">
                <CustomText style="text-white text-sm font-['iranyekanwebregular(fanum)']">
                    {title}
                </CustomText>
                <Image style="w-9 h-9 object-contain tint-white" source={img} />
            </div>
        </TouchableOpacity>
    );
};
export default BoxButton;
