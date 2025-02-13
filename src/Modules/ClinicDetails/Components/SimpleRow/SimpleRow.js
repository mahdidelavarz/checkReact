import React from 'react';
import { div, img } from 'react-native';

import CustomText from '../../../../Components/CustomText/CustomText';
import colors from '../../../../Assets/Styles/Colors';
import styles from './Styles';


const SimpleRow = (props) => {
    const { ic, title, body, mode, star } = props;
    return (
        <div style={styles.row}>
            <div style={styles.row_right}>
                <img style={styles.row_right_ic} source={ic} />
            </div>
            <div style={styles.row_center}>
                <CustomText style={styles.row_center_title}>{title}
                    <CustomText style={{ color: colors.gray, fontSize: 14 }}>
                        {' ' + body}
                    </CustomText>
                </CustomText>
            </div>
            {/* <div style={styles.row_left}> */}
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
            {/* </div> */}
        </div>
    );
};
export default SimpleRow;