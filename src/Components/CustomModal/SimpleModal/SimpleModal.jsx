import React from 'react';
import CustomText from '../../CustomText/CustomText';

const SimpleModal = ({ 
  isVisible, 
  img, 
  title, 
  description, 
  right_func, 
  left_func, 
  mode, 
  isReady 
}) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="w-4/5 bg-white rounded-lg p-4 max-w-md">
        {/* Modal Top Section */}
        <div className="flex flex-col items-center justify-evenly min-h-[120px]">
          <img
            src={img}
            className="w-6 h-6"
            alt="Modal icon"
            style={{ filter: `hue-rotate(0deg) saturate(100%) brightness(100%)` }} // Approximation of tintColor
          />
          <CustomText className="text-lg text-center text-gray-800">
            {title}
          </CustomText>
          <CustomText className="text-sm w-11/12 text-center text-gray-600">
            {description}
          </CustomText>
        </div>

        {/* Modal Bottom Section */}
        {mode === 'singleBtn' ? (
          <button
            className="w-1/2 h-8 bg-green-500 rounded-full mx-auto flex items-center justify-center mb-1 hover:bg-green-600 transition-colors"
            onClick={right_func}
          >
            <CustomText className="text-base text-center text-white font-bold">
              تایید
            </CustomText>
          </button>
        ) : (
          <div className="flex w-4/5 mx-auto flex-row justify-center items-center gap-2">
            <button
              className="flex-1 h-10 bg-green-500 rounded-full flex items-center justify-center hover:bg-green-600 transition-colors"
              onClick={right_func}
            >
              <CustomText className="text-base text-center text-white font-bold">
                {isReady ? 'مشاهده' : 'بله'}
              </CustomText>
            </button>
            <button
              className="flex-1 h-10 border border-green-800 rounded-full flex items-center justify-center bg-white hover:bg-gray-100 transition-colors"
              onClick={left_func}
            >
              <CustomText className="text-base text-center text-green-800 font-bold">
                {isReady ? 'بعدا' : 'خیر'}
              </CustomText>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SimpleModal;