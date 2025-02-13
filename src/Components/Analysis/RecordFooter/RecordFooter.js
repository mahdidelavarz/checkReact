import React, {useState} from 'react';
import {div, button, img} from 'react-native';

import {ic_refresh, ic_arrow, ic_ok} from '../../Images/Images';
import CustomText from '../../CustomText/CustomText';
import colors from '../../../Assets/Styles/Colors';
import styles from './Styles';

function RecordFooter(props) {
    const {step, rightFunc, rightTxt, leftFunc, leftTxt, refresh} = props;
    return (
        <div style={styles.footer}>
            <div style={styles.footer_flex}>
                <button style={styles.footer_flex_btn} onPress={rightFunc}>
                    {step ===  3 ?
                       <img style={styles.footer_flex_btn_ic_ok} source={ic_ok} />
                    :
                        <img style={styles.footer_flex_btn_ic_arrow} source={ic_arrow} />
                    }
                    <CustomText font_weight={'bold'} style={styles.footer_flex_btn_txt}>
                        {rightTxt}
                    </CustomText>
                </button>
            </div>
            <div style={styles.footer_center}>
                <CustomText font_weight={'bold'} style={styles.footer_center_txt_number}>
                    {step + '/' + 3}
                </CustomText>
                <div style={styles.footer_center_row}>
                    <div style={styles.footer_center_row_step_view} />
                    <div style={[styles.footer_center_row_step_view, {
                        backgroundColor: step == 1 ? colors.ligh_txt : step == 2 ? colors.violet : step == 3 ? colors.violet : null
                    }]} 
                    />
                    <div style={[styles.footer_center_row_step_view, {backgroundColor: step == 3 ? colors.violet : colors.ligh_txt}]} />
                </div>
            </div>
            <div style={styles.footer_flex}>
                <button style={styles.footer_flex_btn} onPress={leftFunc}>
                    <CustomText font_weight={'bold'} style={styles.footer_flex_btn_txt}>
                        {leftTxt}
                    </CustomText>
                    <img style={styles.footer_flex_btn_ic} source={refresh ? ic_refresh : ic_arrow} />
                </button>
            </div>
        </div>
    )
};
export default RecordFooter;