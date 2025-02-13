import React from 'react';
import { div, img } from 'react-native';

import { ic_about, ic_phone, ic_location } from '../../../../Components/Images/Images';
import CustomText from '../../../../Components/CustomText/CustomText';
import language from '../../../../Assets/i18n/i18n';
import SimpleRow from '../SimpleRow/SimpleRow';
import styles from './Styles';

function Detiles(props) {
    const { title, score, phoneNumber, address } = props;
    return (
        <div>
            <SimpleRow
                ic={ic_about}
                title={title}
                body={''}
                mode={'star'}
                star={score}
            />
            <SimpleRow
                ic={ic_phone} title={language('phoneNumber') + ":"} body={phoneNumber}
            />
            <div style={styles.view_address}>
                <div style={styles.view_address_right}>
                    <img style={styles.view_address_right_ic} source={ic_location} />
                </div>
                <div style={styles.view_address_center}>
                    <CustomText style={styles.view_address_center_txt}>
                        {language('address')}
                    </CustomText>
                </div>
                <div style={styles.view_address_left}>
                    <CustomText style={styles.view_address_left_txt}>
                        {address}
                    </CustomText>
                </div>
            </div>
        </div>
    );
};
export default Detiles;