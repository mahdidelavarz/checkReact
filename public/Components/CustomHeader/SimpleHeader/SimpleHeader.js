import React from 'react';
import { View, TouchableOpacity, Image, StatusBar, I18nManager } from 'react-native';

import { ic_back, ic_left_back } from '../../Images/Images';
import CustomText from '../../CustomText/CustomText';
import colors from '../../../Assets/Styles/Colors';
import styles from './Styles';

function SimpleHeader(props) {
    const { func, title } = props;
    return (
        <View style={styles.header}>
            <StatusBar backgroundColor={colors.dark_green} barStyle={'light-content'} />
            <TouchableOpacity
                activeOpacity={0.7}
                style={styles.header_right}
                onPress={func}
            >
                <Image style={styles.header_right_ic} source={!I18nManager.isRTL ? ic_left_back : ic_back} />
            </TouchableOpacity>
            <View style={styles.header_center}>
                <CustomText font_weight={'bold'} style={styles.header_center_title} numberOfLines={1} >
                    {title}
                </CustomText>
            </View>
        </View>
    );
};
export default SimpleHeader;