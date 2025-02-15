import React from 'react';
import { View, Image, ActivityIndicator, Alert } from 'react-native';

import CustomText from '../../../../../Components/CustomText/CustomText';
import Footer from '../../../../../Components/Analysis/Footer/Footer';
import { recVideo } from '../../../../../Components/Images/Images';
import colors from '../../../../../Assets/Styles/Colors';
import languages from '../../../../../Assets/i18n/i18n';

function TwoStepRecord(props) {
    const { title, description, func, footerNextFunc, pageCount } = props;
    return (
        <View className="flex-1 justify-between">
            <CustomText className="font-bold text-center mt-1 text-dark-txt text-lg">
                {title}
            </CustomText>
            <CustomText className="text-center text-dark-txt text-sm mx-auto w-4/5">
                {description}
            </CustomText>
            <View className="items-center justify-center" onPress={func}>
                <ActivityIndicator size="large" color={colors.red} />
                <Image className="w-4 h-4 absolute bottom-2" source={recVideo} />
            </View>
            <Footer 
                nextFunc={footerNextFunc} 
                screenCount={pageCount} 
                line="85%" 
                backFunc={() => Alert.alert('برگشت', 'امکان برگشت به مرحله قبل امکان پذیر نیست')} 
            />
        </View>
    );
};
export default TwoStepRecord;
