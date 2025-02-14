import React from 'react';
import { Image } from 'react-native';

import { emptyHistory } from '../../../../../Components/Images/Images';
import CustomText from '../../../../../Components/CustomText/CustomText';
import colors from '../../../../../Assets/Styles/Colors';

function EmptyList() {
    return (
        <div className="flex-1 items-center justify-evenly">
            <Image className="w-1/2 h-1/2 mt-12" source={emptyHistory} />
            <CustomText className="text-center text-sm text-gray-400 mt-5">
                در حال حاضر هیچ آنالیزی در سابقه شما وجود ندارد.
            </CustomText>
        </div>
    );
};

export default EmptyList;
