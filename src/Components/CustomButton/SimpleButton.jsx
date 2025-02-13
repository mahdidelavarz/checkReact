import React, { Component } from 'react';

import CustomText from '../CustomText/CustomText';
import { colors } from '../../Assets/Styles/Colors';

class SimpleButton extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { func, btnStyle, title, titleStyle } = this.props;
        return (
            <button 
                className={`w-full h-8 bg-green-500 rounded-full justify-center ${btnStyle}`} 
                onClick={func} 
                style={{ opacity: 0.8 }} // Equivalent to activeOpacity in React Native
            >
                <CustomText className={`text-base text-white text-center ${titleStyle}`} font_weight={'bold'}>
                    {title}
                </CustomText>
            </button>
        );
    }
}

export default SimpleButton;
