import React from 'react';
import { Text } from 'react-native';

let yekanBold = 'iranyekanwebbold(fanum)';
let yekanRegular = 'iranyekanweblight(fanum)';

const CustomText = (props) => {
    const { style, numberOfLines, children, font_weight } = props;
    return (
        <Text style={[{ fontFamily: font_weight === 'bold' ? yekanBold : yekanRegular }, style]} numberOfLines={numberOfLines}>
            {children}
        </Text>
    );
}
export default CustomText;