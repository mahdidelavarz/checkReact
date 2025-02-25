import React from "react";
import icLocation from "../../../../Components/Images/ic_location.png"; // Direct imports
import icArrow from "../../../../Components/Images/ic_arrow.png";
import icPhone from "../../../../Components/Images/ic_phone.png";
import CustomText from "../../../../Components/CustomText/CustomText";
import language from "../../../../Assets/i18n/i18n";

function SearchModal({ data, route }) {
  const onPressItem = (item) => {
    const params = JSON.stringify(item);
    route.navigate(`/clinicDetails/${params}`); // Updated to use navigate
  };

  return (
    <div className="flex-1 overflow-y-auto">
      {data.length === 0 ? (
        <CustomText className="text-center text-black text-sm mt-[calc(50vh-50px)]">
          مراکز درمانی یافت نشد
        </CustomText>
      ) : (
        data.map((item) => (
          <div
            key={item.id}
            className="w-[95%] h-[150px] bg-white border border-gray-300 rounded-[5px] mt-[10px] mx-auto flex flex-col"
          >
            <div className="flex-3 flex justify-center">
              <CustomText className="font-bold text-[16px] text-gray-800 text-center">
                {item.title}
              </CustomText>
            </div>
            <div className="flex-3.5 flex flex-row">
              <div className="flex-1 flex items-center justify-center">
                <img
                  className="w-5 h-5"
                  src={icLocation}
                  alt="Location"
                />
              </div>
              <div className="flex-9 flex justify-center">
                <CustomText
                  numberOfLines={1}
                  className="text-[14px] w-[98%] text-gray-800 text-left"
                >
                  {item.address}
                </CustomText>
              </div>
            </div>
            <div className="flex-3.5 flex flex-row">
              <div className="flex-1 flex items-center justify-center">
                <img
                  className="w-5 h-5"
                  src={icPhone}
                  alt="Phone"
                />
              </div>
              <div className="flex-4 flex items-start justify-center">
                <CustomText
                  numberOfLines={1}
                  className="text-[14px] w-[98%] text-gray-800 text-left"
                >
                  {item.phone}
                </CustomText>
              </div>
              <div className="flex-4.5 flex items-center justify-center">
                <button
                  className="w-[80%] h-[70%] rounded-[5px] bg-green-500 flex items-center justify-center hover:bg-green-600 active:bg-green-700"
                  onClick={() => onPressItem(item)}
                >
                  <div className="flex flex-row items-center">
                    <CustomText className="font-bold text-[14px] text-white text-center">
                      {language("more_details")}
                    </CustomText>
                    <img
                      className="w-[10px] h-[10px] ml-1"
                      src={icArrow}
                      alt="Arrow"
                    />
                  </div>
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default SearchModal;