import React from 'react';
import {View, Modal} from 'react-native';

import CustomText from '../../CustomText/CustomText';
import styles from './Styles';

function PendingView() {
    return (
        <View style={styles.view}>
            <CustomText font_weight={'bold'} style={styles.view_message}>
                لطفا چند لحظه صبر کنید
            </CustomText>
        </View>
    )
}
export default PendingView;