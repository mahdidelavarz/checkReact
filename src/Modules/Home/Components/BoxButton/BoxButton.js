import React from 'react';
import { div, img, button, ImageBackground } from 'react-native';

import CustomText from '../../../../Components/CustomText/CustomText';
import { test1, test2 } from '../../../../Components/Images/Images';
import colors from '../../../../Assets/Styles/Colors';
import styles from './Styles';

const BoxButton = (props) => {
    const { style, func, title, img } = props;
    return (
        <button style={[styles.btn, style]} underlayColor={colors.dark_green} onPress={func}>
            <div style={styles.btn_view}>
                <CustomText style={styles.btn_view_txt}>
                    {title}
                </CustomText>
                <img style={styles.btn_view_img} source={img} />
            </div>
        </button>
    );
};
export default BoxButton;