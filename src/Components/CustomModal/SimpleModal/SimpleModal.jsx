import React from 'react';
import { Modal, View, Text, TouchableOpacity, Image } from 'react-native';
import CustomText from '../../CustomText/CustomText';
import colors from '../../../Assets/Styles/Colors';

function SimpleModal(props) {
    const { isVisible, img, title, description, right_func, left_func, mode, isReady } = props;

    return (
        <Modal
            visible={isVisible}
            animationType='slide'
            transparent={true}
        >
            <View className="flex-1 items-center justify-center bg-black bg-opacity-50">
                <View className="w-4/5 bg-white rounded-lg p-4">
                    {/* Modal Top Section */}
                    <View className="flex-2 justify-evenly items-center">
                        <Image
                            source={img}
                            className="w-6 h-6 self-center"
                            style={{ tintColor: colors.green }}
                        />
                        <CustomText className="text-lg text-center text-dark_txt">
                            {title}
                        </CustomText>
                        <CustomText className="text-sm w-11/12 self-center text-center text-light_txt">
                            {description}
                        </CustomText>
                    </View>

                    {/* Modal Bottom Section */}
                    {mode === 'singleBtn' ? (
                        <TouchableOpacity
                            className="w-1/2 h-8 bg-green rounded-full self-center justify-center mb-1"
                            onPress={right_func}
                        >
                            <CustomText className="text-base text-center text-white font-bold">
                                تایید
                            </CustomText>
                        </TouchableOpacity>
                    ) : (
                        <View className="flex-1 w-4/5 self-center flex-row justify-center items-center">
                            <TouchableOpacity
                                className="flex-1 h-10 bg-green rounded-full justify-center ml-1"
                                onPress={right_func}
                            >
                                <CustomText className="text-base text-center text-white font-bold">
                                    {isReady ? 'مشاهده' : 'بله'}
                                </CustomText>
                            </TouchableOpacity>
                            <TouchableOpacity
                                className="flex-1 h-10 border border-dark_green rounded-full justify-center ml-1 bg-white"
                                onPress={left_func}
                            >
                                <CustomText className="text-base text-center text-dark_green font-bold">
                                    {isReady ? 'بعدا' : 'خیر'}
                                </CustomText>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
            </View>
        </Modal>
    );
}

export default SimpleModal;