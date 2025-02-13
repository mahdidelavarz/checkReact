import React, {useState} from 'react';
import {View, TouchableOpacity, Image} from 'react-native';

import CustomText from '../../../../../Components/CustomText/CustomText';
import {ic_refresh, ic_arrow} from '../../../../../Components/Images/Images';
import colors from '../../../../../Assets/Styles/Colors';
import styles from './Styles';

function RecordFooter(props) {
    const {step, rightFunc, rightTxt, leftFunc, leftTxt, refresh} = props;
    return (
        <View style={styles.footer}>
            <View style={styles.footer_flex}>
                <TouchableOpacity style={styles.footer_flex_btn} onPress={rightFunc}>
                    <Image style={styles.footer_flex_btn_ic_arrow} source={ic_arrow} />
                    <CustomText style={styles.footer_flex_btn_txt}>
                        {rightTxt}
                    </CustomText>
                </TouchableOpacity>
            </View>
            <View style={styles.footer_center}>
                <CustomText font_weight={'bold'} style={styles.footer_center_txt_number}>
                    {step} <CustomText font_weight={'bold'} style={{color: colors.dark_txt}}>/ 3</CustomText>
                </CustomText>
                <View style={styles.footer_center_row}>
                    <View style={styles.footer_center_row_step_view} />
                    <View style={[styles.footer_center_row_step_view, {
                        backgroundColor: step == 1 ? colors.ligh_txt : step == 2 ? colors.violet : step == 3 ? colors.violet : null
                    }]} 
                    />
                    <View style={[styles.footer_center_row_step_view, {backgroundColor: step == 3 ? colors.violet : colors.ligh_txt}]} />
                </View>
            </View>
            <View style={styles.footer_flex}>
                <TouchableOpacity style={styles.footer_flex_btn} onPress={leftFunc}>
                    <CustomText style={styles.footer_flex_btn_txt}>
                        {leftTxt}
                    </CustomText>
                    <Image style={styles.footer_flex_btn_ic} source={refresh ? ic_refresh : ic_arrow} />
                </TouchableOpacity>
            </View>
        </View>
    )
};
export default RecordFooter;