import React from 'react';

import CustomText from '../../../../Components/CustomText/CustomText';
import { ic_about } from '../../../../Components/Images/Images';
import language from '../../../../assets/i18n/i18n';
import SimpleRow from '../SimpleRow/SimpleRow';

function HoursWork({ times }) {
    return (
        <div>
            <SimpleRow ic={ic_about} title={language('hours_of_work')} body={''} />
            <Row day={language('saturday')} time={times["1"]} />
            <Row day={language('sunday')} time={times["2"]} />
            <Row day={language('monday')} time={times["3"]} />
            <Row day={language('tuesday')} time={times["4"]} />
            <Row day={language('wednesday')} time={times["5"]} />
            <Row day={language('thursday')} time={times["6"]} />
            <Row day={language('friday')} time={times["7"]} />
        </div>
    );
};
export default HoursWork;

function Row({ day, time }) {
    return (
        <div className="flex flex-row w-[80%] h-10 border-b border-t border-gray-300 self-center">
            <div className="flex-2 flex items-center justify-center">
                <CustomText className="text-[15px] text-gray-800">
                    {day}
                </CustomText>
            </div>
            <div className="flex-3 flex items-center justify-center">
                <CustomText className="text-[15px] text-gray-500">
                    {time}
                </CustomText>
            </div>
        </div>
    );
};
