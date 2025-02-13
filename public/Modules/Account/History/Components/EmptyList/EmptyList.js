import React, {useState} from 'react';
import {View, TouchableOpacity, Image, TextInput} from 'react-native';

import {emptyHistory} from '../../../../../Components/Images/Images';
import CustomText from '../../../../../Components/CustomText/CustomText';
import colors from '../../../../../Assets/Styles/Colors';
import styles from './Styles';

function EmptyList () {
    return (
        <View style={styles.container}>
            <Image style={styles.top_img} source={emptyHistory} />
            <CustomText style={styles.bottom_title}>
                در حال حاضر هیچ آنالیزی در سابقه شما وجود ندارد.
            </CustomText>
        </View>
    );
};
export default EmptyList;