import React, { useState } from 'react';
import { View, Text } from 'react-native';

import CustomText from '../../../../../Components/CustomText/CustomText';
import { } from '../../../../../Components/Images/Images';
import colors from '../../../../../Assets/Styles/Colors';
import styles from './Styles';

function ColumnTable(props) {

    return (
        <View>
            <View style={styles.table}>
                <Text style={styles.table_header_flex_txt}>
                    {props.value1}
                </Text>
                <View style={styles.table_border} />
                <Text style={styles.table_header_flex_txt}>
                    {props.value2}
                </Text>
                <View style={styles.table_border} />
                <Text style={styles.table_header_flex_txt}>
                    {props.value3}
                </Text>
                {props.value4 ?
                    <View style={styles.view_4}>
                        <Text style={[styles.table_header_flex_txt, { flex: 0, }]}>
                            {props.value4}
                        </Text>
                    </View>
                    : null}
            </View>
        </View>
    );
};
export default ColumnTable;