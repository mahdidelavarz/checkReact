import React, { useState } from "react";
import { toast } from "react-toastify"; // Replacing Toast
import moment from "moment-jalaali";

import  ic_date  from "../../../../../Components/Images/ic_date.png";
import  ic_about  from "../../../../../Components/Images/ic_about.png";
import ic_barcode  from "../../../../../Components/Images/ic_barcode.png";
import CustomText from "../../../../../Components/CustomText/CustomText";
import languages from "../../../../../assets/i18n/i18n";
import storage from "../../../../../Factories/Storage"; // Import functional storage

function GadgetList({ data, func }) {
    const [selectGadget, setSelectGadget] = useState(-1); // Initialize as -1, assuming no initial selection

    const onPressItem = (item, index) => {
        setSelectGadget(index);
        func(index); // Call the parent function with the selected index
        storage.set("SerialNumber", item.serial_number); // Updated to functional storage
        toast.success("گجت با موفقیت ثبت شد"); // Replacing Toast.show
        // Vibration.vibrate() is not available in web; omitted (see note below)
    };

    return (
        <div className="flex flex-col h-full">
            <div className="h-1/4 bg-gray-100 flex items-center justify-center">
                <CustomText font_weight="bold" className="text-sm text-gray-800">
                    {languages("gadget_list")}
                </CustomText>
            </div>
            <div className="h-3/4 mt-[3%] mb-[2%] px-1 overflow-y-auto">
                {data.map((item, index) => (
                    <button
                        key={index.toString()}
                        className={`m-1 w-10/12 rounded-lg border ${selectGadget === index
                            ? "border-green-500 bg-green-50"
                            : "border-gray-300 bg-white"
                            }`}
                        onClick={() => onPressItem(item, index)}
                    >
                        <div className="flex flex-row h-1/3">
                            <div className="flex-1 flex items-center justify-center">
                                <img className="w-6 h-6" src={ic_barcode} alt="Barcode" />
                            </div>
                            <div className="flex-[4] flex justify-center pr-2">
                                <CustomText
                                    numberOfLines={1}
                                    className="text-xs text-gray-500 text-left"
                                >
                                    {languages("serial") + " "}
                                    <CustomText className="text-black">
                                        {item.serial_number}
                                    </CustomText>
                                </CustomText>
                            </div>
                        </div>
                        <div className="flex flex-row h-1/3">
                            <div className="flex-1 flex items-center justify-center">
                                <img className="w-6 h-6" src={ic_date} alt="Date" />
                            </div>
                            <div className="flex-[4] flex justify-center pr-2">
                                <CustomText className="text-xs text-gray-500 text-left">
                                    {languages("expire_date") + " "}
                                    <CustomText className="text-black">
                                        {moment(item.expiration_date, "YYYY/M/D").format("jYYYY/jM/jD")}
                                    </CustomText>
                                </CustomText>
                            </div>
                        </div>
                        <div className="flex flex-row h-1/3">
                            <div className="flex-1 flex items-center justify-center">
                                <img className="w-6 h-6" src={ic_about} alt="About" />
                            </div>
                            <div className="flex-[4] flex justify-center pr-2">
                                <CustomText className="text-xs text-gray-500 text-left">
                                    {languages("remaining_count") + " "}
                                    <CustomText className="text-black">
                                        {item.remaining_count}
                                    </CustomText>
                                </CustomText>
                            </div>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
}

export default GadgetList;