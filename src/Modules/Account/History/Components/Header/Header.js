import React, { useState } from 'react';
import { div, button, img, TextInput, I18nManager } from 'react-native';

import { ic_back, ic_left_back, ic_search, ic_close } from '../../../../../Components/Images/Images';
import CustomText from '../../../../../Components/CustomText/CustomText';
import colors from '../../../../../Assets/Styles/Colors';
import language from '../../../../../Assets/i18n/i18n';
import styles from './Styles';

const Header = (props) => {
    const [isVisibleInput, setIsVisibleInput] = useState(false);
    const { func_back, event } = props;
    return (
        <div>
            {!isVisibleInput ?
                <div style={styles.header}>
                    <button style={styles.header_right} onPress={func_back}>
                        <img style={styles.header_right_ic} source={I18nManager.isRTL ? ic_back : ic_left_back} />
                    </button>
                    <div style={styles.header_center}>
                        <CustomText style={styles.header_center_title}>
                            {language('historys')}
                        </CustomText>
                    </div>
                    <button style={styles.header_left} onPress={() => setIsVisibleInput(!isVisibleInput)}>
                        <img style={styles.header_left_ic} source={ic_search} />
                    </button>
                </div>
                :
                <div style={styles.header_search}>
                    <button style={styles.header_search_btn_close} onPress={() => setIsVisibleInput(!isVisibleInput)}>
                        <img style={styles.header_search_btn_close_ic} source={ic_close} />
                    </button>
                    <TextInput
                        style={styles.input}
                        placeholder={'جستجو بر اساس عنوان'}
                        placeholderTextColor={colors.dark_txt}
                        keyboardType={'default'}
                        onChangeText={event}
                    />
                </div>
            }
        </div>
    );
};
export default Header;