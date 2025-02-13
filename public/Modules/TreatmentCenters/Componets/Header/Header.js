import React from 'react';
import { View, TouchableOpacity, I18nManager, TextInput, Image, StatusBar } from 'react-native';

import { ic_back, ic_filter, ic_left_back } from '../../../../Components/Images/Images';
import colors from '../../../../Assets/Styles/Colors';
import language from '../../../../Assets/i18n/i18n';
import styles from './Styles';

function Header(props) {

    const { func_back, func_filter, event } = props;
    return (
        <View>
            <StatusBar backgroundColor={colors.dark_green} barStyle='light-content' />
            <View style={styles.header}>
                <TouchableOpacity style={styles.header_right} onPress={func_back}>
                    <Image style={styles.header_right_ic} source={I18nManager.isRTL ? ic_back : ic_left_back} />
                </TouchableOpacity>
                <View style={styles.header_center}>
                    <TextInput
                        style={styles.header_center_input}
                        placeholder={language('search_for_medical_centers')}
                        placeholderTextColor={colors.dark_txt}
                        keyboardType={'default'}
                        onChangeText={event}
                    />
                </View>
                <TouchableOpacity style={styles.header_left} onPress={func_filter}>
                    <Image style={styles.header_left_ic} source={ic_filter} />
                </TouchableOpacity>
            </View>
        </View>
    );
};
export default Header;