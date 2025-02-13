import React,  {useState, useEffect} from 'react';
import {div, img} from 'react-native';

import CustomText from '../../../../../Components/CustomText/CustomText';
import {loading, ic_ok} from '../../../../../Components/Images/Images';
import languages from '../../../../../Assets/i18n/i18n';
import styles from './Styles';

function StartAnalysis(props) {
    useEffect(() => {
    });

    return (
        <div style={styles.container}>
            <div style={styles.content}>
                <div style={styles.loading_view}>
                    <img style={styles.loading_view_img} source={loading} />
                </div>
                <div style={styles.txt_view}>
                    <CustomText font_weight={'bold'} style={styles.txt_view_title}>
                        <img style={styles.txt_view_ic_ok} source={ic_ok} /> {languages('successfully')}
                    </CustomText>
                    <CustomText style={styles.txt_view_time}>
                        {languages('system_processed')}
                    </CustomText>
                </div>
            </div>
        </div>
    );
};
export default StartAnalysis;