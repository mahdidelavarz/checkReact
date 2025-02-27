import React from "react";
import { toast } from "react-toastify"; // Replacing Toast
import icDirection from "../../../../Components/Images/ic_direction.png"; // Direct import
import CustomText from "../../../../Components/CustomText/CustomText";
import { CDN_Url } from "../../../../Configs/Urls";

function Map({ img, lat, long, approximate }) {
  const onPressRouting = () => {
    if (lat && long) {
      // Replace SendIntentAndroid.openMaps with a web maps URL (e.g., Google Maps)
      const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${long}&travelmode=driving`;
      window.open(mapsUrl, "_blank"); // Open in new tab
    } else {
      toast.error("نقشه یافت نشد"); // Replacing Toast.show
    }
  };

  return (
    <div className="w-full flex flex-col justify-between">
      <CustomText
        font_weight="bold"
        className="text-[8px] text-white absolute top-1 left-1 z-10 bg-green-500 rounded-md py-0.5 px-1 border border-black"
      >
        فاصله تقریبی
        <span className="text-black text-[10px]"> {approximate} </span> کیلومتر
      </CustomText>
      <div className="w-full h-[150px]">
        {img && (
          <button
            className="w-full h-full active:opacity-60"
            onClick={onPressRouting}
          >
            <img
              className="w-full h-[150px] object-cover rounded-t-md"
              src={`${CDN_Url.serverUrl}${CDN_Url.centerMapDirUrl}${img}`}
              alt="Map"
            />
          </button>
        )}
      </div>
      <div className="h-[45px] flex items-center justify-center">
        <button
          className="bg-green-500 rounded-b-md h-[45px] w-full flex flex-row items-center justify-center hover:bg-green-600 active:bg-green-700"
          onClick={onPressRouting}
        >
          <img
            className="w-[35px] h-[35px] mr-1"
            src={icDirection}
            alt="Direction Icon"
          />
          <CustomText
            font_weight="bold"
            className="text-[16px] text-white text-center"
          >
            مسیریابی
          </CustomText>
        </button>
      </div>
    </div>
  );
}

export default Map;