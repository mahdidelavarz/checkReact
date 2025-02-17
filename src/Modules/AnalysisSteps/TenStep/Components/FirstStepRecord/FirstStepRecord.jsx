import React from 'react';
import { TouchableOpacity, Image } from 'react-native';
import Toast from 'react-native-simple-toast';

import CustomText from '../../../../../Components/CustomText/CustomText';
import Footer from '../../../../../Components/Analysis/Footer/Footer';
import { recVideo } from '../../../../../Components/Images/Images';
import languages from '../../../../../Assets/i18n/i18n';

function FirstStepRecord(props) {
    const { title, description, func, footerNextFunc, pageCount } = props;
    return (
        <div className="flex-1 justify-between">
            <CustomText font_weight={'bold'} className="text-dark-txt text-center mt-1 text-sm">
                {title}
            </CustomText>
            <CustomText className="text-dark-txt text-center text-xs w-9/10 self-center">
                {description}
            </CustomText>
            <TouchableOpacity className="flex items-center justify-center" onPress={func}>
                <Image className="w-10 h-10" source={recVideo} />
            </TouchableOpacity>
            <Footer
                nextFunc={footerNextFunc}
                screenCount={pageCount}
                line={'85%'}
                backFunc={() => Toast.show('امکان برگشت به مرحله قبل امکان پذیر نیست')}
            />
        </div>
    );
};

export default FirstStepRecord;
