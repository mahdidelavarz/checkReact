import React from "react";
import CustomText from "../../../../../Components/CustomText/CustomText";

function ModalMsg({ isVisible, func }) {
    if (!isVisible) return null; // Return null if not visible, mimicking Modal behavior

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.5)] z-50 animate-fade-in">
            <div className="w-[80%] bg-white rounded-[10px] flex flex-col items-center p-[5px] border-2 border-[#d3d3d3] relative">
                <div className="w-[100px] h-[100px] rounded-full border-8 border-white flex items-center justify-center bg-[#d3d3d3] absolute -top-[50px]">
                    <img
                        className="w-[30px] h-[30px] text-[#808080]"
                        src="/Images/ic_user"
                        alt="User Icon"
                    />
                </div>
                <CustomText className="text-[14px] text-[#d3d3d3] text-center w-[85%] mt-[50px] mb-[15px]">
                    شما به عنوان کاربر ناشناس به اپلیکیشن وارد خواهید شد. هیچ اطلاعاتی از سوابق شما روی فضای ابری ذخیره نخواهد شد. توجه داشته باشید در صورتی که نیاز به بازیابی نتایج دارید به صورت کاربر عادی در سیستم ثبت نام کنید.
                </CustomText>
                <button
                    className="w-[50%] h-[35px] rounded-[30px] bg-green-500 flex items-center justify-center hover:opacity-70 focus:opacity-70"
                    onClick={func}
                >
                    <CustomText className="text-[16px] text-white text-center">
                        ورود مهمان
                    </CustomText>
                </button>
            </div>
        </div>
    );
}

export default ModalMsg;