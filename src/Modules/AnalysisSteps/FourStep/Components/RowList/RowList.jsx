import React, { useState } from 'react';
import CustomText from '../../../../../Components/CustomText/CustomText';
import { sampleGranular, sampleColors, sampleVolume } from './Data';
import { ic_arrow } from '../../../../../Components/Images/Images';
import languages from '../../../../../Assets/i18n/i18n';
import Storage from '../../../../../Factories/Storage';
import SlideModal from '../SlideModal/SlideModal';

let storage = new Storage();
function RowList(props) {
    const [index, setIndex] = useState('');
    const [isModal, setIsModal] = useState(false);
    const [titleModal, setTitleModal] = useState('');
    const [dataModal, setDataModal] = useState([]);

    const onPress = (item, index) => {
        if (index === 1) {
            setTitleModal(languages('granular'));
            setDataModal(sampleGranular);
        } else if (index === 2) {
            setTitleModal(languages('sample_color'));
            setDataModal(sampleColors);
        } else if (index === 3) {
            setTitleModal(languages('sample_volume'));
            setDataModal(sampleVolume);
        }
        setIsModal(true);
        setIndex(index);
    };

    const onPressModal = (item) => {
        list[index].leftText = item.value;
        setIsModal(false);
        if (index === 1) {
            storage.set('Viscosity', item.value);
        } else if (index === 2) {
            storage.set('Color', item.value);
        } else if (index === 3) {
            storage.set('Volume', item.value);
        }
    };

    const onChangeInput = (value) => {
        storage.set('Title', value);
    };

    return (
        <div className="w-full flex flex-col items-center">
            {list.map((item, idx) => (
                <button
                    key={idx}
                    className="w-11/12 h-12 rounded-md mt-2 flex flex-row border border-gray-400 bg-white"
                    onClick={() => onPress(item, idx)}
                >
                    <div className="flex-1 flex items-center px-2">
                        <CustomText className="text-sm text-gray-800 text-left">
                            {item.title}
                        </CustomText>
                    </div>
                    <div className="flex-1 flex items-center justify-center">
                        {idx === 0 ? (
                            <input
                                type="text"
                                className="text-center text-sm text-gray-800 border-none outline-none"
                                placeholder="عنوان"
                                onChange={(e) => onChangeInput(e.target.value)}
                            />
                        ) : (
                            <CustomText className="text-sm text-gray-800 text-center">
                                {item.leftText}
                            </CustomText>
                        )}
                    </div>
                    <div className="flex items-center justify-center px-2">
                        <img className="w-3 h-3 text-green-500" src={ic_arrow} alt="arrow" />
                    </div>
                </button>
            ))}
            <SlideModal
                visible={isModal}
                title={titleModal}
                data={dataModal}
                onPress={(item) => onPressModal(item)}
                closeFunc={() => setIsModal(false)}
            />
        </div>
    );
};

export default RowList;

const list = [
    { title: languages('title_analysis'), leftText: languages('optional') },
    { title: languages('granular'), leftText: languages('add') },
    { title: languages('sample_color'), leftText: languages('add') },
    { title: languages('sample_volume'), leftText: languages('add') },
];
