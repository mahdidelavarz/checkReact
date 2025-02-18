import React from 'react';

import CustomText from '../../../../Components/CustomText/CustomText';
import { ic_description } from '../../../../Components/Images/Images';
import language from '../../../../Assets/i18n/i18n';
import SimpleRow from '../SimpleRow/SimpleRow';

const Description = (props) => {
    const { description } = props;
    return (
        <div>
            <SimpleRow ic={ic_description} title={language('description')} body={''} />
            <div className="w-[88%] mx-auto pb-1.5">
                <CustomText className="text-[12px] text-gray-500 text-center">
                    {description}
                </CustomText>
            </div>
        </div>
    );
};

export default Description;
