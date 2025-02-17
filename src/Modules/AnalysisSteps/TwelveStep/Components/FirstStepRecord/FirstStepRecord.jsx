import React from 'react';
import { Alert, Image } from 'react-native';

import CustomText from '../../../../../Components/CustomText/CustomText';
import Footer from '../../../../../Components/Analysis/Footer/Footer';
import { recVideo } from '../../../../../Components/Images/Images';
import languages from '../../../../../Assets/i18n/i18n';

function FirstStepRecord(props) {
    const { title, description, func, footerNextFunc, pageCount } = props;
    return (
        <div className="flex-1 justify-between">
            <CustomText font_weight={'bold'} className="text-center text-dark_txt text-base mt-1">
                {title}
            </CustomText>
            <CustomText className="text-center text-dark_txt text-sm w-[90%] self-center">
                {description}
            </CustomText>
            <button className="flex items-center justify-center" onPress={func}>
                <Image className="w-[40px] h-[40px]" source={recVideo} />
            </button>
            <Footer
                nextFunc={footerNextFunc}
                screenCount={pageCount}
                line="85%"
                backFunc={() => Alert.alert('برگشت', 'امکان برگشت به مرحله قبل امکان پذیر نیست')}
            />
        </div>
    );
};
export default FirstStepRecord;
