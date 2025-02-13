import React from "react";
import { Modal } from "react-native";
import CustomText from "../../CustomText/CustomText";
import languages from "../../../Assets/i18n/i18n";
import { help_circle } from "../../Images/Images";

const HelpModal = ({ visible, closeFunc, description }) => {
  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="w-4/5 bg-white h-1/2 rounded-lg flex flex-col shadow-lg relative">
          
          {/* Header with Icon */}
          <div className="h-14 flex items-center justify-center border-b border-gray-300 relative">
            <div className="w-16 h-16 bg-white rounded-full absolute bottom-0 flex items-center justify-center shadow-md">
              <img className="w-14 h-14" src={help_circle} alt="help" />
            </div>
          </div>

          {/* Center Content */}
          <div className="flex-grow px-6 py-4">
            <CustomText className="text-base text-gray-700 text-left w-full">
              {description}
            </CustomText>
          </div>

          {/* Bottom Button */}
          <div className="h-14 flex items-center justify-center border-t border-gray-300 p-2">
            <button
              className="w-3/5 bg-green-500 text-white py-2 rounded-full text-lg transition-all hover:bg-green-600"
              onClick={closeFunc}
            >
              {languages("close")}
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default HelpModal;
