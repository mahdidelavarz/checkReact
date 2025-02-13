import React from 'react';
import {View, TouchableOpacity, Image, StatusBar} from 'react-native';

import {ic_close, ic_help} from '../../Images/Images';
import CustomText from '../../CustomText/CustomText';
import colors from '../../../Assets/Styles/Colors';
import language from '../../../Assets/i18n/i18n';
import styles from './Styles';

const HelpHeader = (props) => {
    const {closeFunc, helpFunc, count} = props;
    return (
        <View style={styles.header}>
            <StatusBar backgroundColor={colors.dark_green} barStyle={'light-content'} />
            <TouchableOpacity style={styles.header_right} onPress={closeFunc}>
                <Image style={styles.header_right_ic} source={ic_close} />
            </TouchableOpacity>
            <View style={styles.header_center}>
                <CustomText font_weight={'bold'} style={styles.header_center_txt}>
                    {language('step') + ' ' + count}
                </CustomText>
            </View>
            <TouchableOpacity style={styles.header_left} onPress={helpFunc}>
                <Image style={styles.header_left_ic} source={ic_help} />
            </TouchableOpacity>
        </View>
    );
};
export default HelpHeader;