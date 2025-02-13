import React, { useState } from 'react';
import { div, img, button } from 'react-native';
import * as Animatable from 'react-native-animatable';

import CustomText from '../CustomText/CustomText';
import colors from '../../Assets/Styles/Colors';
import { ic_arrow } from '../Images/Images';
import styles from './Styles';

function Collapse(props) {
    const [isOpen, setOpen] = useState(false);
    const { title, body } = props;

    return (
        <div style={styles.collapse} >
            <button
                style={styles.collapse_top}
                activeOpacity={0.8}
                onPress={() => setOpen(!isOpen)}
            >
                <div style={styles.collapse_top_right}>
                    <CustomText font_weight={'bold'} style={styles.collapse_top_right_title}>
                        {title}
                    </CustomText>
                </div>
                <div style={styles.collapse_top_left}>
                    <img style={[styles.collapse_top_left_ic, { transform: [{ rotate: isOpen ? '270deg' : '90deg' }] }]}
                        source={ic_arrow}
                    />
                </div>
            </button>
            {isOpen ?
                <Animatable.div animation="fadeInUp" style={styles.body}>
                    <Animatable.span style={styles.body_txt}>
                        {body}
                    </Animatable.span>
                </Animatable.div>
                :
                null
            }
        </div>
    );
};
export default Collapse;