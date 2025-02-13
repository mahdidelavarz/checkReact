import React from 'react';
import { View, Image } from 'react-native';

import RecordFooter from '../../../../../Components/Analysis/RecordFooter/RecordFooter';
import { videoSuccess, ic_ok, ic_close } from '../../../../../Components/Images/Images';
import CustomText from '../../../../../Components/CustomText/CustomText';
import colors from '../../../../../Assets/Styles/Colors';
import languages from '../../../../../Assets/i18n/i18n';
import styles from './Styles';

function ThreeStepRecord(props) {
    const { step, footerNextFunc, footerAgainFunc, status } = props;
    return (
        <View style={{ flex: 1, justifyContent: 'space-evenly' }}>
            {status ?
                <CustomText font_weight={'bold'} style={styles.center_top_title}>
                    <Image style={styles.center_top_ic} source={ic_ok} />   {languages('send_done')}
                </CustomText>
                :
                <CustomText font_weight={'bold'} style={styles.center_top_title}>
                    <Image style={[styles.center_top_ic, { tintColor: colors.red }]} source={ic_close} />  ارسال فیلد دوم با مشکل مواجه شد دوباره تلاش کنید
                </CustomText>
            }
            <View style={styles.center_top_btn}>
                <Image style={styles.center_top_btn_ic} source={videoSuccess} />
            </View>
            <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: colors.light_gray }}>
                <RecordFooter
                    step={step}
                    rightFunc={footerNextFunc}
                    rightTxt={languages('next')}
                    leftFunc={footerAgainFunc}
                    leftTxt={languages('again')}
                    refresh={true}
                />
            </View>
        </View>
    );
};
export default ThreeStepRecord;