import React from 'react';


let yekanBold = 'iranyekanwebbold(fanum)';
let yekanRegular = 'iranyekanweblight(fanum)';

const CustomText = (props) => {
    const { style, numberOfLines, children, font_weight } = props;
    return (
        <span style={[{ fontFamily: font_weight === 'bold' ? yekanBold : yekanRegular }, style]} numberOfLines={numberOfLines}>
            {children}
        </span>
    );
}
export default CustomText;