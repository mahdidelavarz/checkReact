import React from 'react';
import { View, Image } from 'react-native';

import CustomText from '../../../../Components/CustomText/CustomText';
import colors from '../../../../Assets/Styles/Colors';
import styles from './Styles';


const SimpleRow = (props) => {
    const { ic, title, body, mode, star } = props;
    return (
        <View style={styles.row}>
            <View style={styles.row_right}>
                <Image style={styles.row_right_ic} source={ic} />
            </View>
            <View style={styles.row_center}>
                <CustomText style={styles.row_center_title}>{title}
                    <CustomText style={{ color: colors.gray, fontSize: 14 }}>
                        {' ' + body}
                    </CustomText>
                </CustomText>
            </View>
            {/* <View style={styles.row_left}> */}
            {/* {mode === 'star' ?
                    <Stars
                        default={star}
                        count={5}
                        half={true}
                        starSize={20}
                        halfStar={null}
                    />
                : null
                } */}
            {/* </View> */}
        </View>
    );
};
export default SimpleRow;