import React from 'react';
import {div, button, img, StatusBar} from 'react-native';

import {ic_close, ic_help} from '../../Images/Images';
import CustomText from '../../CustomText/CustomText';
import colors from '../../../Assets/Styles/Colors';
import language from '../../../Assets/i18n/i18n';
import styles from './Styles';

const HelpHeader = (props) => {
    const {closeFunc, helpFunc, count} = props;
    return (
        <div style={styles.header}>
            <StatusBar backgroundColor={colors.dark_green} barStyle={'light-content'} />
            <button style={styles.header_right} onPress={closeFunc}>
                <img style={styles.header_right_ic} source={ic_close} />
            </button>
            <div style={styles.header_center}>
                <CustomText font_weight={'bold'} style={styles.header_center_txt}>
                    {language('step') + ' ' + count}
                </CustomText>
            </div>
            <button style={styles.header_left} onPress={helpFunc}>
                <img style={styles.header_left_ic} source={ic_help} />
            </button>
        </div>
    );
};
export default HelpHeader;