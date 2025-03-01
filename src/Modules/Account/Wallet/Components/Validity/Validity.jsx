import React from 'react';

import ic_user from '../../../../../Components/Images/ic_user.png';


import CustomText from '../../../../../Components/CustomText/CustomText';



function Validity(props) {
    return (
        <div className="w-3/5 h-12 flex flex-row justify-center items-center mt-5">
            <div className="flex-1 justify-center items-center">
                <img className='w-20 h-20' source={ic_user} />
            </div>
            <div className="flex-2 justify-center">
                <CustomText style="text-sm text-dark_txt text-left">
                    اعتبار شما
                </CustomText>
            </div>
            <div className="flex-2 justify-center">
                <CustomText style="text-base text-green text-left">
                    22000 IRR
                </CustomText>
            </div>
        </div>
    );
};

export default Validity;
