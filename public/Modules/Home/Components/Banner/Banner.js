import React from 'react';
import {View, Image, TouchableHighlight, Linking} from 'react-native';

import CustomText from '../../../../Components/CustomText/CustomText';
import {logo, logo_long, clip} from '../../../../Components/Images/Images';
import colors from '../../../../Assets/Styles/Colors';
import language from '../../../../Assets/i18n/i18n';
import styles from './Styles';

function Banner(props) {
    return (
        <TouchableHighlight style={styles.bottom_view} underlayColor={colors.dark_green} onPress={() => Linking.openURL('https://etcco.ir')}>
            <View style={styles.bottom_view_border}>
                <View style={styles.bottom_view_border_flex}>
                    <CustomText style={styles.bottom_view_border_txt}>
                        {language('right_now')} 
                    </CustomText>
                </View>
                <View style={styles.bottom_view_border_flex}>
                    <Image style={styles.bottom_view_border_ic} source={logo} />
                </View>
                <View style={[styles.bottom_view_border_flex, {flex: 1.5}]}>
                    <CustomText style={styles.bottom_view_border_txt}>
                        {language('order')} 
                    </CustomText>
                </View>
                <View style={styles.bottom_view_border_flex}>
                    <Image style={styles.bottom_view_border_ic} source={clip} />
                </View>
            </View>
        </TouchableHighlight>
    );
};
export default Banner;