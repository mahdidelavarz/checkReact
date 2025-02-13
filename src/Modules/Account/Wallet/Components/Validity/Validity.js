import React from 'react';
import {div, img} from 'react-native';

import {ic_user} from '../../../../../Components/Images/Images';
import SimpleButton from '../../../../../Components/CustomButton/SimpleButton';
import CustomInput from '../../../../../Components/CustomInput/CustomInput';
import CustomText from '../../../../../Components/CustomText/CustomText';
import colors from '../../../../../Assets/Styles/Colors';
import language from '../../../../../Assets/i18n/i18n';
import styles from './Styles';


function Validity(props) {
    return (
        <div style={styles.row_top}>
            <div style={styles.row_top_right}>
                <img style={styles.row_top_right_ic} source={ic_user} />
            </div>
            <div style={styles.row_top_center}>
                <CustomText style={styles.row_top_center_txt}>
                 اعتبار شما
                </CustomText>
            </div>
            <div style={styles.row_top_left}>
                <CustomText style={styles.row_top_left_txt}>
                    22000 IRR
                </CustomText>
            </div>
        </div>
    );
};
export default Validity;