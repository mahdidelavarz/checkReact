import React from 'react';


import emptyHistory from '../../../../../Components/Images/emptyHistory.png';
import CustomText from '../../../../../Components/CustomText/CustomText';

function EmptyList() {
    return (
        <div className="flex-1 items-center justify-evenly">
            <img className="w-1/2 h-1/2 mt-12" source={emptyHistory} />
            <CustomText className="text-center text-sm text-gray-400 mt-5">
                در حال حاضر هیچ آنالیزی در سابقه شما وجود ندارد.
            </CustomText>
        </div>
    );
};

export default EmptyList;
