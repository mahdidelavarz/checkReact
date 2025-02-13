import React, { useState } from 'react';
import { div, span } from 'react-native';

import CustomText from '../../../../../Components/CustomText/CustomText';
import { } from '../../../../../Components/Images/Images';
import colors from '../../../../../Assets/Styles/Colors';
import styles from './Styles';

function ColumnTable(props) {

    return (
        <div>
            <div style={styles.table}>
                <span style={styles.table_header_flex_txt}>
                    {props.value1}
                </span>
                <div style={styles.table_border} />
                <span style={styles.table_header_flex_txt}>
                    {props.value2}
                </span>
                <div style={styles.table_border} />
                <span style={styles.table_header_flex_txt}>
                    {props.value3}
                </span>
                {props.value4 ?
                    <div style={styles.view_4}>
                        <span style={[styles.table_header_flex_txt, { flex: 0, }]}>
                            {props.value4}
                        </span>
                    </div>
                    : null}
            </div>
        </div>
    );
};
export default ColumnTable;