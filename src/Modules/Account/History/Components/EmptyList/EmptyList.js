import React, {useState} from 'react';
import {div, button, img, TextInput} from 'react-native';

import {emptyHistory} from '../../../../../Components/Images/Images';
import CustomText from '../../../../../Components/CustomText/CustomText';
import colors from '../../../../../Assets/Styles/Colors';
import styles from './Styles';

function EmptyList () {
    return (
        <div style={styles.container}>
            <img style={styles.top_img} source={emptyHistory} />
            <CustomText style={styles.bottom_title}>
                در حال حاضر هیچ آنالیزی در سابقه شما وجود ندارد.
            </CustomText>
        </div>
    );
};
export default EmptyList;