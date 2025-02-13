import React, { useState, useEffect } from 'react';
import { View } from 'react-native';

import CustomText from '../../../../Components/CustomText/CustomText';
import { ic_about } from '../../../../Components/Images/Images';
import colors from '../../../../Assets/Styles/Colors';
import language from '../../../../Assets/i18n/i18n';
import SimpleRow from '../SimpleRow/SimpleRow';
import styles from './Styles';

function HoursWork(props) {
    const { times } = props;
    return (
        <View>
            <SimpleRow ic={ic_about} title={language('hours_of_work')} body={''} />
            <Row day={language('saturday')} time={times["1"]} />
            <Row day={language('sunday')} time={times["2"]} />
            <Row day={language('monday')} time={times["3"]} />
            <Row day={language('tuesday')} time={times["4"]} />
            <Row day={language('wednesday')} time={times["5"]} />
            <Row day={language('thursday')} time={times["6"]} />
            <Row day={language('friday')} time={times["7"]} />
        </View>
    );
};
export default HoursWork;

function Row(props) {
    return (
        <View style={[styles.row,]}>
            <View style={styles.row_right}>
                <CustomText style={styles.row_right_txt}>
                    {props.day}
                </CustomText>
            </View>
            <View style={styles.row_center}>
                <CustomText style={styles.row_center_title}>
                    {props.time}
                </CustomText>
            </View>
        </View>
    );
};