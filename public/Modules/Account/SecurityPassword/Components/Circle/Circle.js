import React from 'react';
import {View} from 'react-native';

import CustomText from '../../../../../Components/CustomText/CustomText';
import colors from '../../../../../Assets/Styles/Colors';
import styles from './Styles';

function Circle(props) {
    const {number} = props;
    return (
        <View style={[styles.circle, {backgroundColor: number || number === 0 ? colors.green : colors.ligh_txt}]}>
            <CustomText style={styles.circle_number}>
                {number}
            </CustomText>
        </View>
    );
};
export default Circle;