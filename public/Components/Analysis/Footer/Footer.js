import React from 'react';
import {View, TouchableOpacity, Image} from 'react-native';

import CustomText from '../../CustomText/CustomText';
import language from '../../../Assets/i18n/i18n';
import {ic_arrow} from '../../Images/Images';
import styles from './Styles';

const Footer = (props) => {
    const {nextFunc, screenCount, backFunc, line} = props;
    return (
        <View style={styles.footer}>
            <View style={styles.footer_right}>
                <TouchableOpacity activeOpacity={0.7} style={styles.footer_right_btn} onPress={nextFunc}>
                    <View style={styles.footer_right_btn_right}>
                        <Image style={styles.footer_right_btn_right_ic} source={ic_arrow} />
                    </View>
                    <View style={styles.footer_right_btn_left}>
                        <CustomText style={styles.footer_right_btn_left_txt}>
                            {language('next')}
                        </CustomText>
                    </View>
                </TouchableOpacity>
            </View>
            <View style={styles.footer_center}>
                <View style={styles.footer_center_top}>
                    <CustomText style={styles.footer_center_top_txt}>
                        {screenCount + '/' + 12}
                    </CustomText>
                </View>
                <View style={styles.footer_center_bottom}>
                    <View style={styles.footer_center_bottom_progras}>
                        <View style={[styles.footer_center_bottom_progras_line, {width: line}]} />
                    </View>
                </View>
            </View>
            <View style={styles.footer_left}>
                <TouchableOpacity activeOpacity={0.7} style={styles.footer_left_btn} onPress={backFunc}>
                    <View style={styles.footer_left_btn_left}>
                        <CustomText style={styles.footer_left_btn_left_txt}>
                            {language('back')}
                        </CustomText>
                    </View>
                    <View style={styles.footer_left_btn_right}>
                        <Image style={styles.footer_left_btn_right_ic} source={ic_arrow} />
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
};
export default Footer;