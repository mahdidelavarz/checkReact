import React from "react";
import CustomText from "../../../../Components/CustomText/CustomText";

function Slide({ item }) {
  return (
    <div className="flex-1 flex flex-col h-full">
      <div className="flex-5 pt-2.5 flex items-center justify-center">
        <img
          className="w-1/2 h-full object-contain"
          src={item.image}
          alt="Slide Image"
        />
      </div>
      <div className="flex-5 pt-3.5">
        <CustomText className="text-xs text-black w-11/12 mx-auto text-center">
          {item.description}
        </CustomText>
      </div>
    </div>
  );
}

export default Slide;