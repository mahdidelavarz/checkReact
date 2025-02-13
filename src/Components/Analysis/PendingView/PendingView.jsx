import React from "react";
import CustomText from "../../CustomText/CustomText";

function PendingView() {
  return (
    <div className="flex flex-1 bg-transparent flex items-center justify-center">
      <CustomText className="text-lg text-white text-center font-bold">
        لطفا چند لحظه صبر کنید
      </CustomText>
    </div>
  );
}

export default PendingView;
