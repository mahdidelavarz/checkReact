import React, {} from 'react';
import {View, Image} from 'react-native';
import * as Animatable from 'react-native-animatable';

import CustomText from '../../../../../Components/CustomText/CustomText';
import {gadget, ic_close} from '../../../../../Components/Images/Images';
import language from '../../../../../Assets/i18n/i18n';
import styles from './Styles';

function EmptyList() {
    return (
        <View style={styles.empty}>
            <View style={styles.top}>
                <Image style={styles.top_img} resizeMode={'contain'} source={gadget} />
                <Animatable.Image 
                    animation="zoomIn" 
                    iterationCount={300} 
                    direction="alternate"
                    source={ic_close}
                    style={styles.top_ic}
                >        
                </Animatable.Image>
            </View>
            <View style={styles.bottom}>
                <CustomText style={styles.bottom_txt}>
                    {language('empty_gadget')}
                </CustomText>
            </View>
        </View>
    );
};
export default EmptyList;