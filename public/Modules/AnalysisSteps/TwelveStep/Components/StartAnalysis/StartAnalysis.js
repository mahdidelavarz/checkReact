import React,  {useState, useEffect} from 'react';
import {View, Image} from 'react-native';

import CustomText from '../../../../../Components/CustomText/CustomText';
import {loading, ic_ok} from '../../../../../Components/Images/Images';
import languages from '../../../../../Assets/i18n/i18n';
import styles from './Styles';

function StartAnalysis(props) {
    useEffect(() => {
    });

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <View style={styles.loading_view}>
                    <Image style={styles.loading_view_img} source={loading} />
                </View>
                <View style={styles.txt_view}>
                    <CustomText font_weight={'bold'} style={styles.txt_view_title}>
                        <Image style={styles.txt_view_ic_ok} source={ic_ok} /> {languages('successfully')}
                    </CustomText>
                    <CustomText style={styles.txt_view_time}>
                        {languages('system_processed')}
                    </CustomText>
                </View>
            </View>
        </View>
    );
};
export default StartAnalysis;