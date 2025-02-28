import React from "react";
import CustomText from "../../../../../Components/CustomText/CustomText";

function SlideModal({ visible, title, data, onPress, closeFunc }) {
  if (!visible) return null; // Conditional render instead of Modal's visible prop

  return (
    <div className="fixed inset-0 flex justify-end bg-black bg-opacity-50 z-50 animate-fade-in">
      <div className="w-full h-1/2 bg-white flex flex-col rounded-t-2xl">
        <div className="flex justify-center border-b border-gray-300 py-4">
          <CustomText className="text-center text-lg font-bold text-black">
            {title}
          </CustomText>
        </div>
        <div className="flex-1 overflow-y-auto">
          {data.map((item, index) => (
            <button
              key={index}
              className="w-full flex justify-center border-b border-gray-300 py-4 text-green-600 text-lg hover:bg-gray-100 active:bg-gray-200"
              onClick={() => onPress(item)}
            >
              {item.value}
            </button>
          ))}
        </div>
        <button
          className="w-full flex justify-center border-t-4 border-gray-200 py-5 bg-white text-red-600 text-lg hover:bg-gray-100 active:bg-gray-200"
          onClick={closeFunc}
        >
          لغو
        </button>
      </div>
    </div>
  );
}

export default SlideModal;