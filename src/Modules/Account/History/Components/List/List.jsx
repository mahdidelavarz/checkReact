import React from "react";
import moment from "moment-jalaali";
import CustomText from "../../../../../Components/CustomText/CustomText";

function List({ item, route }) {
  const onPressItem = (item) => {
    route.navigate(`/historyDetails/${item.analysis.id}`); // Updated to use navigate
  };

  return (
    <div
      className={`w-[95%] mx-auto bg-white border rounded-md flex flex-col mt-2 ${
        item.analysis.state === "results_ready" ? "border-green-600" : "border-gray-200"
      }`}
    >
      <div className="flex-1 flex flex-col justify-evenly">
        {item.analysis.title && (
          <div className="h-10 w-[90%] mx-auto border-b border-gray-200 flex flex-row items-center justify-between">
            <CustomText className="text-sm text-gray-800">عنوان:</CustomText>
            <CustomText className="text-green-600">{item.analysis.title}</CustomText>
          </div>
        )}
        <div className="h-10 w-[90%] mx-auto border-b border-gray-200 flex flex-row items-center justify-between">
          <CustomText className="text-sm text-gray-800">تاریخ:</CustomText>
          <CustomText className="text-green-600">
            {moment(item.analysis.register_date.substring(0, 10), "YYYY/M/D").format(
              "jYYYY/jM/jD"
            )}
          </CustomText>
        </div>
        <div className="h-10 w-[90%] mx-auto border-b border-gray-200 flex flex-row items-center justify-between">
          <CustomText className="text-sm text-gray-800">ساعت:</CustomText>
          <CustomText className="text-green-600">
            {item.analysis.register_date.substring(11, 19)}
          </CustomText>
        </div>
      </div>
      <button
        className="w-full h-10 bg-green-600 hover:bg-green-700 active:bg-green-800 rounded-b-md flex items-center justify-center"
        onClick={() => onPressItem(item)}
      >
        <CustomText className="text-lg text-white text-center">
          جزئیات بیشتر
        </CustomText>
      </button>
    </div>
  );
}

export default List;