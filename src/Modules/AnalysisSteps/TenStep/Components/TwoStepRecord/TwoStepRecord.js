import React from 'react';
import {div, img, Alert, ActivityIndicator} from 'react-native';

import CustomText from '../../../../../Components/CustomText/CustomText';
import Footer from '../../../../../Components/Analysis/Footer/Footer';
import {recVideo} from '../../../../../Components/Images/Images';
import colors from '../../../../../Assets/Styles/Colors';
import languages from '../../../../../Assets/i18n/i18n';
import styles from './Styles';

function TwoStepRecord(props) {
    const {title, description, func, footerNextFunc, pageCount} = props;
    return (
        <div style={{flex: 1, justifyContent: 'space-between'}}>
            <CustomText font_weight={'bold'} style={styles.center_top_title}>
                {title}
            </CustomText>
            <CustomText style={styles.center_top_description_txt}>
                {description}
            </CustomText>
            <div style={styles.center_top_btn} onPress={func}>
                <ActivityIndicator size='large' color={colors.red} />
                <img style={styles.center_top_btn_ic} source={recVideo} />
            </div>
            <Footer 
                nextFunc={footerNextFunc} 
                screenCount={pageCount} 
                line={'85%'}
                backFunc={() => Alert.alert('برگشت' , 'امکان برگشت به مرحله قبل امکان پذیر نیست')} 
            /> 
        </div>
    );
};
export default TwoStepRecord;