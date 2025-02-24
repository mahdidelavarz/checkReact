import React from 'react';


let yekanBold = 'iranyekanwebbold(fanum)';
let yekanRegular = 'iranyekanweblight(fanum)';

const CustomText = (props) => {
    const {children, font_weight } = props;
    return (
        //!_______the native style witch changes the fontFamily dinamically _______________style={[{ fontFamily: font_weight === 'bold' ? yekanBold : yekanRegular }, style]}
        <span className={font_weight === 'bold' ? 'font-bold' : 'font-normal'} >
            {children}
        </span>
    );
}
export default CustomText;