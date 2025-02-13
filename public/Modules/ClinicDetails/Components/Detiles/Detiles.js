import React from 'react';
import { View, Image } from 'react-native';

import { ic_about, ic_phone, ic_location } from '../../../../Components/Images/Images';
import CustomText from '../../../../Components/CustomText/CustomText';
import language from '../../../../Assets/i18n/i18n';
import SimpleRow from '../SimpleRow/SimpleRow';
import styles from './Styles';

function Detiles(props) {
    const { title, score, phoneNumber, address } = props;
    return (
        <View>
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
            <View style={styles.view_address}>
                <View style={styles.view_address_right}>
                    <Image style={styles.view_address_right_ic} source={ic_location} />
                </View>
                <View style={styles.view_address_center}>
                    <CustomText style={styles.view_address_center_txt}>
                        {language('address')}
                    </CustomText>
                </View>
                <View style={styles.view_address_left}>
                    <CustomText style={styles.view_address_left_txt}>
                        {address}
                    </CustomText>
                </View>
            </View>
        </View>
    );
};
export default Detiles;