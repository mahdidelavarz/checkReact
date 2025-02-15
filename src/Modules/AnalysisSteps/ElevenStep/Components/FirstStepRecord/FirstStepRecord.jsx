import React from 'react';
import { View, Button, Image, Alert } from 'react-native';
import Toast from 'react-native-simple-toast';

import CustomText from '../../../../../Components/CustomText/CustomText';
import Footer from '../../../../../Components/Analysis/Footer/Footer';
import { recVideo } from '../../../../../Components/Images/Images';
import languages from '../../../../../Assets/i18n/i18n';

function FirstStepRecord(props) {
    const { title, description, func, footerNextFunc, pageCount } = props;
    return (
        <View className="flex-1 justify-between">
            <CustomText className="font-bold text-center text-dark-txt text-sm mt-1">
                {title}
            </CustomText>
            <CustomText className="text-center text-dark-txt text-xs w-9/10 mx-auto">
                {description}
            </CustomText>
            <Button style="items-center justify-center" onPress={func}>
                <Image className="w-10 h-10" source={recVideo} />
            </Button>
            <Footer
                nextFunc={footerNextFunc}
                screenCount={pageCount}
                line="85%"
                backFunc={() => Toast.show('امکان برگشت به مرحله قبل امکان پذیر نیست')}
            />
        </View>
    );
};
export default FirstStepRecord;
