import React from 'react';
import { div, img, button, Linking } from 'react-native';

import { ic_home } from '../../../../Components/Images/Images';
import language from '../../../../Assets/i18n/i18n';
import SimpleRow from '../SimpleRow/SimpleRow';
import styles from './Styles';

function Social(props) {
    const { telegram, instagram, whatsApp } = props;
    return (
        <div>
            <SimpleRow
                ic={ic_home} title={language('social_networks')} body={''}
            />
            <div style={styles.row_social}>
                <div style={styles.row_social_flex}>
                    <button style={styles.row_social_flex_circle} onPress={() => Linking.openURL(`http://${telegram['instagram']}`)}>
                        <img style={styles.row_social_flex_circle_ic} source={ic_home} />
                    </button>
                </div>
                <div style={styles.row_social_flex}>
                    <button style={styles.row_social_flex_circle} onPress={() => Linking.openURL(`http://${instagram['instagram']}`)}>
                        <img style={styles.row_social_flex_circle_ic} source={ic_home} />
                    </button>
                </div>
                <div style={styles.row_social_flex}>
                    <button style={styles.row_social_flex_circle} onPress={() => Linking.openURL(`http://${whatsApp['instagram']}`)}>
                        <img style={styles.row_social_flex_circle_ic} source={ic_home} />
                    </button>
                </div>
            </div>
        </div>
    );
};
export default Social;