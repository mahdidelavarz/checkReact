import React, {Component} from 'react';
import {button} from 'react-native';

import CustomText from '../CustomText/CustomText';
import colors from '../../Assets/Styles/Colors';
import styles from './Styles';

class SimpleButton extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const {func, btnStyle, title, titleStyle} = this.props;
        return (
            <button activeOpacity={0.8} style={[styles.simple_btn, btnStyle]} onPress={func}>
                <CustomText style={[styles.simple_btn_txt, titleStyle]} font_weight={'bold'}>
                    {title}
                </CustomText>
            </button>
        );
    }
};
export default SimpleButton;