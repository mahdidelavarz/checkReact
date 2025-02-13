import React from 'react';
import { div, img } from 'react-native';

import RecordFooter from '../../../../../Components/Analysis/RecordFooter/RecordFooter';
import { videoSuccess, ic_ok } from '../../../../../Components/Images/Images';
import CustomText from '../../../../../Components/CustomText/CustomText';
import colors from '../../../../../Assets/Styles/Colors';
import languages from '../../../../../Assets/i18n/i18n';
import styles from './Styles';

function ThreeStepRecord(props) {
    const { description, step, footerNextFunc, footerAgainFunc, status } = props;
    return (
        <div style={{ flex: 1, justifyContent: 'space-between' }}>
            <CustomText font_weight={'bold'} style={styles.center_top_title}>
                <img style={styles.center_top_ic} source={ic_ok} />   {status ? languages('send_done') : 'ارسال فیلد سوم با مشکل مواجه شد دوباره تلاش کنید'}
            </CustomText>
            <CustomText style={styles.center_top_description_txt}>
                {description}
            </CustomText>
            <div style={styles.center_top_btn}>
                <img style={styles.center_top_btn_ic} source={videoSuccess} />
            </div>
            <RecordFooter
                step={step}
                rightFunc={footerNextFunc}
                rightTxt={'پردازش'}
                leftFunc={footerAgainFunc}
                leftTxt={languages('again')}
                refresh={true}
            />
        </div>
    );
};
export default ThreeStepRecord;