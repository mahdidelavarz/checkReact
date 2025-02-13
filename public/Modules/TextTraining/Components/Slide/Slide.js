import React from 'react';
import { View, Image } from 'react-native';

import CustomText from '../../../../Components/CustomText/CustomText';
import styles from './Styles';

function Slide(props) {
    const { item } = props;

    return (
        <View style={styles.slide}>
            <View style={styles.slide_top}>
                <Image style={styles.slide_top_img} source={item.image} resizeMode='stretch' />
            </View>
            <View style={styles.slide_bottom}>
                <CustomText style={styles.slide_bottom_txt}>
                    {item.description}
                </CustomText>
            </View>
        </View>
    );
}
export default Slide;