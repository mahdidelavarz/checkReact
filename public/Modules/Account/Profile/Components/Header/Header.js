import React from 'react';
import {View, ImageBackground, Image} from 'react-native';

import {profile_back, ic_user} from '../../../../../Components/Images/Images';
import CustomText from '../../../../../Components/CustomText/CustomText';
import languages from '../../../../../Assets/i18n/i18n';
import styles from './Styles';

function Header(props) {
    const {userName} = props;
    return (
        <ImageBackground style={styles.header} source={profile_back}>
            <View style={styles.header_circle}>
                <Image style={styles.header_circle_img} source={ic_user} />
            </View>
            <CustomText font_weight={'bold'} style={styles.header_title} numberOfLines={1}>
                {userName ? userName : languages('anonymous_user')}
            </CustomText>
        </ImageBackground>
    );
};
export default Header;