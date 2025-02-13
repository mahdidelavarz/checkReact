import React from 'react';
import {div, Modal} from 'react-native';

import CustomText from '../../CustomText/CustomText';
import styles from './Styles';

function PendingView() {
    return (
        <div style={styles.view}>
            <CustomText font_weight={'bold'} style={styles.view_message}>
                لطفا چند لحظه صبر کنید
            </CustomText>
        </div>
    )
}
export default PendingView;