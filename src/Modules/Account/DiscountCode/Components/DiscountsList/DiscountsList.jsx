import React from 'react';
import CustomText from '../../../../../Components/CustomText/CustomText';

function DiscountsList({ discounts }) {
    return (
        <div>
            {discounts.length > 0 ? (
                <div>
                    {discounts.map((item, index) => (
                        <div key={index}>
                            <CustomText>{item}</CustomText>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="flex justify-center items-center h-full">
                    <CustomText className="mt-24 text-gray-700">
                        در حال حاضر کد تخفیفی وجود ندارد.
                    </CustomText>
                </div>
            )}
        </div>
    );
}

export default DiscountsList;
