import React from 'react';

import { ic_about, ic_phone, ic_location } from '../../../../Components/Images/Images';
import CustomText from '../../../../Components/CustomText/CustomText';
import language from '../../../../Assets/i18n/i18n';
import SimpleRow from '../SimpleRow/SimpleRow';

function Detiles(props) {
    const { title, score, phoneNumber, address } = props;
    return (
        <div>
            <SimpleRow
                ic={ic_about}
                title={title}
                body={''}
                mode={'star'}
                star={score}
            />
            <SimpleRow
                ic={ic_phone} title={language('phoneNumber') + ":"} body={phoneNumber}
            />
            <div className="flex flex-row my-2">
                <div className="flex-1 flex items-center justify-start">
                    <img className="w-[22px] h-[22px] text-green-500" src={ic_location} />
                </div>
                <div className="flex-[1.5] flex justify-start">
                    <CustomText className="text-[14px] text-black">
                        {language('address')}
                    </CustomText>
                </div>
                <div className="flex-[7.5] flex justify-center">
                    <CustomText className="text-[14px] w-full text-gray-500">
                        {address}
                    </CustomText>
                </div>
            </div>
        </div>
    );
};

export default Detiles;
