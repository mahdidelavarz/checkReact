import React from 'react';
import { TouchableOpacity, Image } from 'react-native';

import { ic_user } from '../../../../../Components/Images/Images';
import CustomText from '../../../../../Components/CustomText/CustomText';
import language from '../../../../../Assets/i18n/i18n';

function Box(props) {
    const { btnStyle, func, txtStyle, price } = props;
    return (
        <TouchableOpacity 
            style={[styles.box, btnStyle]} 
            activeOpacity={0.7}
            onPress={func}
        >
            <Image style={styles.box_img} source={ic_user} />
            <CustomText style={[styles.box_price_txt, txtStyle]}>
                {price}
            </CustomText>
        </TouchableOpacity>
    );
};

const styles = {
    box: 'w-11/24 h-12 rounded-full border border-solid border-gray-300 items-center justify-around flex-row mt-3 mx-2',
    box_img: 'w-5 h-5',
    box_price_txt: 'text-lg',
    btn_submit: 'w-7/10 self-center h-10',
};

export default Box;
