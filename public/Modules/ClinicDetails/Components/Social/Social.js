import React from 'react';
import { View, Image, TouchableOpacity, Linking } from 'react-native';

import { ic_home } from '../../../../Components/Images/Images';
import language from '../../../../Assets/i18n/i18n';
import SimpleRow from '../SimpleRow/SimpleRow';
import styles from './Styles';

function Social(props) {
    const { telegram, instagram, whatsApp } = props;
    return (
        <View>
            <SimpleRow
                ic={ic_home} title={language('social_networks')} body={''}
            />
            <View style={styles.row_social}>
                <View style={styles.row_social_flex}>
                    <TouchableOpacity style={styles.row_social_flex_circle} onPress={() => Linking.openURL(`http://${telegram['instagram']}`)}>
                        <Image style={styles.row_social_flex_circle_ic} source={ic_home} />
                    </TouchableOpacity>
                </View>
                <View style={styles.row_social_flex}>
                    <TouchableOpacity style={styles.row_social_flex_circle} onPress={() => Linking.openURL(`http://${instagram['instagram']}`)}>
                        <Image style={styles.row_social_flex_circle_ic} source={ic_home} />
                    </TouchableOpacity>
                </View>
                <View style={styles.row_social_flex}>
                    <TouchableOpacity style={styles.row_social_flex_circle} onPress={() => Linking.openURL(`http://${whatsApp['instagram']}`)}>
                        <Image style={styles.row_social_flex_circle_ic} source={ic_home} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};
export default Social;