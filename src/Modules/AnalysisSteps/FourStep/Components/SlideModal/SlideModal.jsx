import React from 'react';
import { Modal } from 'react-native';
import CustomText from '../../../../../Components/CustomText/CustomText';

function SlideModal({ visible, title, data, onPrees, closeFunc }) {
    return (
        <Modal 
            visible={visible}
            animationType={'fade'}
            transparent={true}
        >
            <div className="flex justify-end bg-black bg-opacity-50 h-full">
                <div className="w-full h-1/2 bg-white flex flex-col rounded-t-2xl">
                    <div className="flex justify-center border-b border-gray-300 py-4">
                        <CustomText className="text-center text-lg font-bold text-black">
                            {title}
                        </CustomText>
                    </div>
                    {data.map((item, index) => (
                        <button 
                            key={index} 
                            className="flex justify-center border-b border-gray-300 py-4 text-green-600 text-lg"
                            onClick={() => onPrees(item)}
                        >
                            {item.value}
                        </button>
                    ))}
                    <button 
                        className="flex justify-center border-t-4 border-gray-200 py-5 bg-white text-red-600 text-lg"
                        onClick={closeFunc}
                    >
                        لغو
                    </button>
                </div>
            </div>
        </Modal>
    );
}

export default SlideModal;
