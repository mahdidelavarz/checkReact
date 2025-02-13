import React from 'react';
import { View, TouchableOpacity, Image, Alert } from 'react-native';
import Toast from 'react-native-simple-toast';

import CustomText from '../../../../../Components/CustomText/CustomText';
import Footer from '../../../../../Components/Analysis/Footer/Footer';
import { recVideo } from '../../../../../Components/Images/Images';
import languages from '../../../../../Assets/i18n/i18n';
import styles from './Styles';

function FirstStepRecord(props) {
    const { title, description, func, footerNextFunc, pageCount } = props;
    return (
        <View style={{ flex: 1, justifyContent: 'space-between' }}>
            <CustomText font_weight={'bold'} style={styles.center_top_title}>
                {title}
            </CustomText>
            <CustomText style={styles.center_top_description_txt}>
                {description}
            </CustomText>
            <TouchableOpacity style={styles.center_top_btn} onPress={func}>
                <Image style={styles.center_top_btn_ic} source={recVideo} />
            </TouchableOpacity>
            <Footer
                nextFunc={footerNextFunc}
                screenCount={pageCount}
                line={'85%'}
                backFunc={() => Toast.show('امکان برگشت به مرحله قبل امکان پذیر نیست')}
            />
        </View>
    );
};
export default FirstStepRecord;