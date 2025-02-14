import React from 'react';
import { Modal, Image } from 'react-native';

import CustomText from '../../../../../Components/CustomText/CustomText';
import { ic_user } from '../../../../../Components/Images/Images';
import colors from '../../../../../Assets/Styles/Colors';

function ModalMsg(props) {
    const { isVisible, func } = props;
    return (
        <Modal 
            visible={isVisible}
            animated='fade'
            transparent={true}
        >
            <div className="flex-1 items-center justify-center bg-[rgba(0,0,0,0.5)]">
                <div className="w-[80%] bg-white rounded-[10px] items-center p-[5px] border-[2px] border-[#d3d3d3]">
                    <div className="w-[100px] h-[100px] rounded-full border-[8px] border-white items-center justify-center bg-[#d3d3d3] absolute top-[-50px]">
                        <Image className="w-[30px] h-[30px] tint-[#808080]" source={ic_user} />
                    </div>
                    <CustomText className="text-[14px] text-[#d3d3d3] text-center w-[85%] self-center mt-[50px] mb-[15px]">
                        شما به عنوان کاربر ناشناس به اپلیکیشن وارد خواهید شد. هیچ اطلاعاتی از سوابق شما روی فضای ابری ذخیره نخواهد شد. توجه داسته باشد در صورتی که نیاز به بازیابی نتایج دارید بصورت کاربر عادی در سیستم ثبت نام کنید.
                    </CustomText>
                    <button 
                        className="w-[50%] h-[35px] rounded-[30px] bg-green-500 justify-center"
                        activeOpacity={0.7}
                        onPress={func}
                    >
                        <CustomText className="text-[16px] text-white text-center">ورود مهمان</CustomText>
                    </button>
                </div>
            </div>
        </Modal>
    );
};
export default ModalMsg;
