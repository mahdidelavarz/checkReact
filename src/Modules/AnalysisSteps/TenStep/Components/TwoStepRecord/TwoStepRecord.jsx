import React from 'react';
import { TouchableOpacity, Image, ActivityIndicator, Alert } from 'react-native';

import CustomText from '../../../../../Components/CustomText/CustomText';
import Footer from '../../../../../Components/Analysis/Footer/Footer';
import { recVideo } from '../../../../../Components/Images/Images';
import colors from '../../../../../Assets/Styles/Colors';
import languages from '../../../../../Assets/i18n/i18n';

function TwoStepRecord(props) {
    const { title, description, func, footerNextFunc, pageCount } = props;

    return (
        <div className="flex-1 justify-between">
            <CustomText font_weight={'bold'} className="text-dark-txt text-center mt-1">
                {title}
            </CustomText>
            <CustomText className="text-dark-txt text-center w-4/5 mx-auto text-sm">
                {description}
            </CustomText>
            <div className="flex items-center justify-center relative" onPress={func}>
                <ActivityIndicator size="large" color={colors.red} />
                <Image className="w-4 h-4 absolute bottom-2" source={recVideo} />
            </div>
            <Footer
                nextFunc={footerNextFunc}
                screenCount={pageCount}
                line={'85%'}
                backFunc={() => Alert.alert('برگشت', 'امکان برگشت به مرحله قبل امکان پذیر نیست')}
            />
        </div>
    );
}

export default TwoStepRecord;
