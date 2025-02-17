import React from 'react';
import { ActivityIndicator, Image, Alert } from 'react-native';

import CustomText from '../../../../../Components/CustomText/CustomText';
import Footer from '../../../../../Components/Analysis/Footer/Footer';
import { recVideo } from '../../../../../Components/Images/Images';
import colors from '../../../../../Assets/Styles/Colors';
import languages from '../../../../../Assets/i18n/i18n';

function TwoStepRecord(props) {
    const { title, description, func, footerNextFunc, pageCount } = props;

    return (
        <div className="flex-1 flex flex-col justify-between">
            <CustomText className="font-bold text-dark_txt text-center mt-1 text-sm">
                {title}
            </CustomText>
            <CustomText className="text-dark_txt text-center text-xs w-[80%] mx-auto">
                {description}
            </CustomText>
            <div className="flex items-center justify-center relative" onPress={func}>
                <ActivityIndicator size="large" color={colors.red} />
                <Image className="absolute bottom-2 w-[15px] h-[15px]" source={recVideo} />
            </div>
            <Footer 
                nextFunc={footerNextFunc} 
                screenCount={pageCount} 
                line={'85%'}
                backFunc={() => Alert.alert('برگشت' , 'امکان برگشت به مرحله قبل امکان پذیر نیست')} 
            />
        </div>
    );
}

export default TwoStepRecord;
