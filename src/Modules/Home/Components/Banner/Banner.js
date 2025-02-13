import React from 'react';
import {div, img, button, Linking} from 'react-native';

import CustomText from '../../../../Components/CustomText/CustomText';
import {logo, logo_long, clip} from '../../../../Components/Images/Images';
import colors from '../../../../Assets/Styles/Colors';
import language from '../../../../Assets/i18n/i18n';
import styles from './Styles';

function Banner(props) {
    return (
        <button style={styles.bottom_view} underlayColor={colors.dark_green} onPress={() => Linking.openURL('https://etcco.ir')}>
            <div style={styles.bottom_view_border}>
                <div style={styles.bottom_view_border_flex}>
                    <CustomText style={styles.bottom_view_border_txt}>
                        {language('right_now')} 
                    </CustomText>
                </div>
                <div style={styles.bottom_view_border_flex}>
                    <img style={styles.bottom_view_border_ic} source={logo} />
                </div>
                <div style={[styles.bottom_view_border_flex, {flex: 1.5}]}>
                    <CustomText style={styles.bottom_view_border_txt}>
                        {language('order')} 
                    </CustomText>
                </div>
                <div style={styles.bottom_view_border_flex}>
                    <img style={styles.bottom_view_border_ic} source={clip} />
                </div>
            </div>
        </button>
    );
};
export default Banner;