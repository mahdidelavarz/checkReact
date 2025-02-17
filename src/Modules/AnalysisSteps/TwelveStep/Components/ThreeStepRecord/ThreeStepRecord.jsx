import React from 'react';
import { Image } from 'react-native';

import RecordFooter from '../../../../../Components/Analysis/RecordFooter/RecordFooter';
import { videoSuccess, ic_ok } from '../../../../../Components/Images/Images';
import CustomText from '../../../../../Components/CustomText/CustomText';
import colors from '../../../../../Assets/Styles/Colors';
import languages from '../../../../../Assets/i18n/i18n';

function ThreeStepRecord(props) {
    const { description, step, footerNextFunc, footerAgainFunc, status } = props;

    return (
        <div className="flex-1 flex flex-col justify-between">
            <CustomText className="font-bold text-dark_txt text-center mt-1 text-sm">
                <Image className="w-[15px] h-[15px]" source={ic_ok} /> 
                {status ? languages('send_done') : 'ارسال فیلد سوم با مشکل مواجه شد دوباره تلاش کنید'}
            </CustomText>
            <CustomText className="text-dark_txt text-center text-xs w-[90%] mx-auto">
                {description}
            </CustomText>
            <div className="flex items-center justify-center">
                <Image className="w-[40px] h-[40px]" source={videoSuccess} />
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
