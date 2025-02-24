import React from 'react';
import CustomText from '../../../../Components/CustomText/CustomText';
import language from '../../../../Assets/i18n/i18n';

const Banner = () => {
  const handleClick = () => {
    window.open('https://etcco.ir', '_blank');
  };

  return (
    <button
      className="w-11/12 h-full rounded-xl items-center justify-center bg-green-500 focus:outline-none"
      onClick={handleClick}
    >
      <div className="w-11/12 h-[90%] rounded-xl bg-green-500 border-white border border-dashed flex flex-row justify-center items-center">
        <div className="flex-1 flex items-center justify-center">
          <CustomText className="text-white text-sm">
            {language('right_now')}
          </CustomText>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <img 
            className="w-[2.875rem] h-[2.875rem] object-contain" // w-11.5 h-11.5 converted to rem (assuming 1 unit = 0.25rem)
            src={"/Images/logo"} 
            alt="Logo"
          />
        </div>
        <div className="flex-[1.5] flex items-center justify-center">
          <CustomText className="text-white text-sm">
            {language('order')}
          </CustomText>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <img 
            className="w-[2.875rem] h-[2.875rem] object-contain"
            src="/Images/clip"
            alt="Clip"
          />
        </div>
      </div>
    </button>
  );
};

export default Banner;