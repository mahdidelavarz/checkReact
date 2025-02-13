import React, {} from 'react';
import {div, img} from 'react-native';
import * as Animatable from 'react-native-animatable';

import CustomText from '../../../../../Components/CustomText/CustomText';
import {gadget, ic_close} from '../../../../../Components/Images/Images';
import language from '../../../../../Assets/i18n/i18n';
import styles from './Styles';

function EmptyList() {
    return (
        <div style={styles.empty}>
            <div style={styles.top}>
                <img style={styles.top_img} resizeMode={'contain'} source={gadget} />
                <Animatable.img 
                    animation="zoomIn" 
                    iterationCount={300} 
                    direction="alternate"
                    source={ic_close}
                    style={styles.top_ic}
                >        
                </Animatable.img>
            </div>
            <div style={styles.bottom}>
                <CustomText style={styles.bottom_txt}>
                    {language('empty_gadget')}
                </CustomText>
            </div>
        </div>
    );
};
export default EmptyList;