import React, { useState, useEffect } from 'react';
import { Image } from 'react-native';

import CustomText from '../../../../../Components/CustomText/CustomText';
import { loading, ic_ok } from '../../../../../Components/Images/Images';
import languages from '../../../../../Assets/i18n/i18n';

function StartAnalysis(props) {
    useEffect(() => {
        // Add any effect if necessary
    }, []);

    return (
        <div className="flex-1 items-center justify-center bg-white">
            <div className="flex flex-col h-[50%]">
                {/* Loading View */}
                <div className="flex-1 items-center justify-center">
                    <Image
                        className="h-[33.33%] w-[33.33%] object-contain"
                        source={loading}
                    />
                </div>

                {/* Text View */}
                <div className="flex-1 items-center justify-evenly">
                    <CustomText className="font-bold text-dark_txt text-lg">
                        <Image
                            className="w-[20px] h-[20px]"
                            source={ic_ok}
                        /> 
                        {languages('successfully')}
                    </CustomText>
                    <CustomText className="text-light_txt text-sm w-[75%] text-center">
                        {languages('system_processed')}
                    </CustomText>
                </div>
            </div>
        </div>
    );
}

export default StartAnalysis;
