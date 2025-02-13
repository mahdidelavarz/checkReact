import React from "react";
import { Modal } from "react-native";
import CustomText from "../../CustomText/CustomText";
import { loading } from "../../Images/Images";

const LoadingRecord = ({ isVisible }) => {
  return (
    <Modal visible={isVisible} animationType="fade" transparent={false}>
      <div className="flex flex-col h-screen bg-white">
        
        {/* Header */}
        <div className="w-full h-14 bg-white flex items-center justify-center border-b-4 border-gray-300">
          <CustomText className="text-lg text-gray-800 text-center">
            تایید صحت اطلاعات
          </CustomText>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col items-center justify-center">
          <img className="w-1/3 h-1/3 object-contain" src={loading} alt="Loading" />
          <CustomText className="text-base text-gray-600 text-center w-3/4 mt-4">
            سیستم در حال ارسال اطلاعات ارسالی می باشد لطفا منتظر بمانید.
          </CustomText>
        </div>

      </div>
    </Modal>
  );
};

export default LoadingRecord;
