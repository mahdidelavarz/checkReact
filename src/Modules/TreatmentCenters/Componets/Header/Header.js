import React from 'react';
import { div, button, I18nManager, TextInput, img, StatusBar } from 'react-native';

import { ic_back, ic_filter, ic_left_back } from '../../../../Components/Images/Images';
import colors from '../../../../Assets/Styles/Colors';
import language from '../../../../Assets/i18n/i18n';
import styles from './Styles';

function Header(props) {

    const { func_back, func_filter, event } = props;
    return (
        <div>
            <StatusBar backgroundColor={colors.dark_green} barStyle='light-content' />
            <div style={styles.header}>
                <button style={styles.header_right} onPress={func_back}>
                    <img style={styles.header_right_ic} source={I18nManager.isRTL ? ic_back : ic_left_back} />
                </button>
                <div style={styles.header_center}>
                    <TextInput
                        style={styles.header_center_input}
                        placeholder={language('search_for_medical_centers')}
                        placeholderTextColor={colors.dark_txt}
                        keyboardType={'default'}
                        onChangeText={event}
                    />
                </div>
                <button style={styles.header_left} onPress={func_filter}>
                    <img style={styles.header_left_ic} source={ic_filter} />
                </button>
            </div>
        </div>
    );
};
export default Header;