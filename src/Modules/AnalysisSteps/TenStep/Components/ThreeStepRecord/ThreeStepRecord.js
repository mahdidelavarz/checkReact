import React from 'react';
import { div, img } from 'react-native';

import RecordFooter from '../../../../../Components/Analysis/RecordFooter/RecordFooter';
import { videoSuccess, ic_ok, ic_close } from '../../../../../Components/Images/Images';
import CustomText from '../../../../../Components/CustomText/CustomText';
import colors from '../../../../../Assets/Styles/Colors';
import languages from '../../../../../Assets/i18n/i18n';
import styles from './Styles';

function ThreeStepRecord(props) {
    const {step, footerNextFunc, footerAgainFunc, status } = props;
    return (
        <div style={{ flex: 1, justifyContent: 'space-evenly'}}>
            {status ?
                <CustomText font_weight={'bold'} style={styles.center_top_title}>
                    <img style={styles.center_top_ic} source={ic_ok} />  {languages('send_done')}
                </CustomText>
                :
                <CustomText font_weight={'bold'} style={styles.center_top_title}>
                    <img style={[styles.center_top_ic, { tintColor: colors.red }]} source={ic_close} />  ارسال فیلد اول با مشکل مواجه شد دوباره تلاش کنید
                </CustomText>
            }
            <div style={styles.center_top_btn}>
                <img style={styles.center_top_btn_ic} source={videoSuccess} />
            </div>
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: colors.light_gray }}>
                <RecordFooter
                    step={step}
                    rightFunc={footerNextFunc}
                    rightTxt={languages('next')}
                    leftFunc={footerAgainFunc}
                    leftTxt={languages('again')}
                    refresh={true}
                />
            </div>
        </div>
    );
};
export default ThreeStepRecord;