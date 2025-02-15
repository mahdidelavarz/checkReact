import React from 'react';
import { Modal, Linking } from 'react-native';
import SimpleButton from '../../../../../Components/CustomButton/SimpleButton';
import CustomText from '../../../../../Components/CustomText/CustomText';

function UpdateAppModal({ isVisible, title, body, closeModal }) {
    return (
        <Modal visible={isVisible} transparent={true} animationType="fade">
            <div className="flex-1 flex items-center justify-center bg-black/50">
                <div className="w-4/5 h-[200px] flex items-center justify-between bg-white pb-1 rounded-md">
                    <CustomText font_weight="bold" className="text-lg text-green-700 text-center">
                        {title}
                    </CustomText>
                    <div className="overflow-hidden">
                        <CustomText className="text-sm text-gray-600 text-center">
                            {body}
                        </CustomText>
                    </div>
                    <div className="flex flex-row w-[90%]">
                        <SimpleButton 
                            func={() => Linking.openURL("http://etcco.ir/")}
                            btnStyle="w-1/2 mr-0.5" 
                            title="آپدیت" 
                        />
                        <SimpleButton 
                            func={closeModal}
                            btnStyle="w-1/2" 
                            title="لغو" 
                        />
                    </div>
                </div>
            </div>
        </Modal>
    );
}

export default UpdateAppModal;
