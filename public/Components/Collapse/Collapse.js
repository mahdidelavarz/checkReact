import React, { useState } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import * as Animatable from 'react-native-animatable';

import CustomText from '../CustomText/CustomText';
import colors from '../../Assets/Styles/Colors';
import { ic_arrow } from '../Images/Images';
import styles from './Styles';

function Collapse(props) {
    const [isOpen, setOpen] = useState(false);
    const { title, body } = props;

    return (
        <View style={styles.collapse} >
            <TouchableOpacity
                style={styles.collapse_top}
                activeOpacity={0.8}
                onPress={() => setOpen(!isOpen)}
            >
                <View style={styles.collapse_top_right}>
                    <CustomText font_weight={'bold'} style={styles.collapse_top_right_title}>
                        {title}
                    </CustomText>
                </View>
                <View style={styles.collapse_top_left}>
                    <Image style={[styles.collapse_top_left_ic, { transform: [{ rotate: isOpen ? '270deg' : '90deg' }] }]}
                        source={ic_arrow}
                    />
                </View>
            </TouchableOpacity>
            {isOpen ?
                <Animatable.View animation="fadeInUp" style={styles.body}>
                    <Animatable.Text style={styles.body_txt}>
                        {body}
                    </Animatable.Text>
                </Animatable.View>
                :
                null
            }
        </View>
    );
};
export default Collapse;