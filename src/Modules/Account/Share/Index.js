import React, { Component } from 'react';
import { div } from 'react-native';

import { auto_back, auto_back_rtl } from '../../../Components/Images/Images';
import SimpleButton from '../../../Components/CustomButton/SimpleButton';
import CustomInput from '../../../Components/CustomInput/CustomInput';
import CustomText from '../../../Components/CustomText/CustomText';
import colors from '../../../Assets/Styles/Colors';
import language from '../../../Assets/i18n/i18n';
import styles from './Styles';

class Share extends Component {
    render() {
        return (
            <div style={styles.container}>
                <CustomText>Share</CustomText>
            </div>
        );
    }
};
export default Share;