import React from 'react';
import {TouchableOpacity, Image} from 'react-native';

import {ic_user} from '../../../../../Components/Images/Images';
import CustomText from '../../../../../Components/CustomText/CustomText';
import language from '../../../../../Assets/i18n/i18n';
import styles from './Styles';

function Box(props) {
    const {btnStyle, func, txtStyle, price} = props;
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
export default Box;