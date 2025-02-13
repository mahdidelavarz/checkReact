import React, { } from 'react';

import { ic_circle, ic_circle_check } from '../../Images/Images';
import CustomText from '../../CustomText/CustomText';
import colors from '../../../Assets/Styles/Colors';
import styles from './Styles';

function CheckBtn(props) {
    const { btnStyle, func, isCheck, title } = props;
    return (
        <button
            style={[styles.btn, btnStyle, { borderColor: !isCheck ? colors.ligh_txt : colors.green }]}
            activeOpacity={0.7}
            onPress={func}
        >
            <img
                style={[styles.btn_ic]}
                source={!isCheck ? ic_circle : ic_circle_check}
            />
            <CustomText font_weight={!isCheck ? null : 'bold'} style={styles.btn_title}>
                {title}
            </CustomText>
        </button>
    );
};
export default CheckBtn;