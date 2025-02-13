import React, {useState} from 'react';
import {div, button} from 'react-native';

import CustomText from '../../../../../Components/CustomText/CustomText';
import {} from '../../../../../Components/Images/Images';
import colors from '../../../../../Assets/Styles/Colors';
import styles from './Styles';

function HeaderTable(props) {
    return (
        <div style={styles.table_header}>
            <CustomText font_weight={'bold'} style={styles.table_header_flex_txt}>
                {props.title1}
            </CustomText>
            <div style={styles.table_header_border} />
            <CustomText font_weight={'bold'} style={styles.table_header_flex_txt}>
                {props.title2}
            </CustomText>
            <div style={styles.table_header_border} />
            <CustomText font_weight={'bold'} style={styles.table_header_flex_txt}>
                {props.title3}
            </CustomText>
            <div style={styles.table_header_border} />
            {props.title4 ?
                <div style={{flex: 1}}>
                    <div style={{flex: 1, alignItems: 'center'}}>
                    <CustomText font_weight={'bold'} style={{color: colors.white, textAlign: 'center', marginTop: 10, fontSize: 12}}>
                        {props.title4}
                    </CustomText>
                    </div>
                    <div style={styles.table_header_border} />
                </div>
            :null}
        </div>
    );
};
export default HeaderTable;