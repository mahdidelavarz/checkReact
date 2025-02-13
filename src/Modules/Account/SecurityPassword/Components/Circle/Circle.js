import React from 'react';
import {div} from 'react-native';

import CustomText from '../../../../../Components/CustomText/CustomText';
import colors from '../../../../../Assets/Styles/Colors';
import styles from './Styles';

function Circle(props) {
    const {number} = props;
    return (
        <div style={[styles.circle, {backgroundColor: number || number === 0 ? colors.green : colors.ligh_txt}]}>
            <CustomText style={styles.circle_number}>
                {number}
            </CustomText>
        </div>
    );
};
export default Circle;