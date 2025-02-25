import React from "react";
import icClose from "../../../../Components/Images/ic_close.png"; // Direct import
import SimpleButton from "../../../../Components/CustomButton/SimpleButton";
import CustomText from "../../../../Components/CustomText/CustomText";

function FilterModal({ isVisible, onPressCloseModal, onPressFilter }) {
  if (!isVisible) return null; // Conditional render instead of Modal's visible prop

  return (
    <div className="fixed inset-0 flex justify-end bg-[rgba(0,0,0,0.4)] z-50 animate-fade-in">
      <div className="h-1/3 w-full bg-white rounded-t-lg flex flex-col">
        <button
          className="h-1/5 flex items-center justify-center border-b border-gray-200 hover:bg-gray-100"
          onClick={onPressCloseModal}
        >
          <img
            className="w-7 h-7"
            src={icClose}
            alt="Close"
          />
        </button>
        <div className="h-4/5 flex flex-col items-center justify-evenly">
          <CustomText className="text-base text-gray-800">
            فیلتر بر اساس نزدیکترین کلینیک ها
          </CustomText>
          <SimpleButton
            func={onPressFilter}
            btnStyle="w-1/2"
            title="یافتن"
          />
        </div>
      </div>
    </div>
  );
}

export default FilterModal;