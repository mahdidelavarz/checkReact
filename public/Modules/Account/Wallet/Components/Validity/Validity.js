import React from 'react';
import {View, Image} from 'react-native';

import {ic_user} from '../../../../../Components/Images/Images';
import SimpleButton from '../../../../../Components/CustomButton/SimpleButton';
import CustomInput from '../../../../../Components/CustomInput/CustomInput';
import CustomText from '../../../../../Components/CustomText/CustomText';
import colors from '../../../../../Assets/Styles/Colors';
import language from '../../../../../Assets/i18n/i18n';
import styles from './Styles';


function Validity(props) {
    return (
        <View style={styles.row_top}>
            <View style={styles.row_top_right}>
                <Image style={styles.row_top_right_ic} source={ic_user} />
            </View>
            <View style={styles.row_top_center}>
                <CustomText style={styles.row_top_center_txt}>
                 اعتبار شما
                </CustomText>
            </View>
            <View style={styles.row_top_left}>
                <CustomText style={styles.row_top_left_txt}>
                    22000 IRR
                </CustomText>
            </View>
        </View>
    );
};
export default Validity;