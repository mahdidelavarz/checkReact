import React from 'react';
import { Modal, button, img } from 'react-native';
import SimpleButton from '../../../../Components/CustomButton/SimpleButton';
import CustomText from '../../../../Components/CustomText/CustomText';
import { ic_close } from '../../../../Components/Images/Images';

function FilterModal(props) {
    const { isVisible, onPressCloseModal, onPressFilter } = props;

    return (
        <Modal
            visible={isVisible}
            animationType='fade'
            transparent={true}
        >
            <div className="flex-1 justify-end bg-[rgba(0,0,0,0.4)]">
                <div className="h-1/3 bg-white rounded-t-lg">
                    <button 
                        className="h-1/5 items-center justify-center border-b border-gray-200" 
                        onPress={onPressCloseModal}
                    >
                        <img className="w-7 h-7 tint-red" source={ic_close} />
                    </button>
                    <div className="h-4/5 items-center justify-evenly">
                        <CustomText className="text-base">فیلتر بر اساس نزدیکترین کلینیک ها</CustomText>
                        <SimpleButton
                            func={onPressFilter}
                            btnStyle="w-1/2"
                            title="یافتن"
                        />
                    </div>
                </div>
            </div>
        </Modal>
    );
}

export default FilterModal;
