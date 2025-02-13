import React from 'react';
import { div, img } from 'react-native';

import CustomText from '../../../../Components/CustomText/CustomText';
import styles from './Styles';

function Slide(props) {
    const { item } = props;

    return (
        <div style={styles.slide}>
            <div style={styles.slide_top}>
                <img style={styles.slide_top_img} source={item.image} resizeMode='stretch' />
            </div>
            <div style={styles.slide_bottom}>
                <CustomText style={styles.slide_bottom_txt}>
                    {item.description}
                </CustomText>
            </div>
        </div>
    );
}
export default Slide;