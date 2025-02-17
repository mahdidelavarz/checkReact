import React from 'react';
import { TouchableOpacity, Image } from 'react-native';

import RecordFooter from '../../../../../Components/Analysis/RecordFooter/RecordFooter';
import { videoSuccess, ic_ok, ic_close } from '../../../../../Components/Images/Images';
import CustomText from '../../../../../Components/CustomText/CustomText';
import colors from '../../../../../Assets/Styles/Colors';
import languages from '../../../../../Assets/i18n/i18n';

function ThreeStepRecord(props) {
    const { step, footerNextFunc, footerAgainFunc, status } = props;
    return (
        <div className="flex-1 justify-evenly">
            {status ? (
                <CustomText font_weight={'bold'} className="text-dark-txt text-center mt-1">
                    <Image className="w-6 h-6" source={ic_ok} /> {languages('send_done')}
                </CustomText>
            ) : (
                <CustomText font_weight={'bold'} className="text-dark-txt text-center mt-1">
                    <Image className="w-6 h-6" style={{ tintColor: colors.red }} source={ic_close} />{' '}
                    {languages('send_failed_try_again')}
                </CustomText>
            )}

            <div className="flex items-center justify-center">
                <Image className="w-11 h-11 tint-violet" source={videoSuccess} />
            </div>

            <div className="absolute bottom-0 left-0 right-0 bg-light-gray">
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
}

export default ThreeStepRecord;
