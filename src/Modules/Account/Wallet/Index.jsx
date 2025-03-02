import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import SimpleHeader from "../../../Components/CustomHeader/SimpleHeader/SimpleHeader";
import SimpleButton from "../../../Components/CustomButton/SimpleButton";
import CustomText from "../../../Components/CustomText/CustomText";
import Validity from "./Components/Validity/Validity";
import Store from "../../../Store/Store";
import Box from "./Components/Box/Box";
import autoBack from "../../../Components/Images/auth_back.jpg"; // Adjusted path
import autoBackRtl from "../../../Components/Images/auth_back_rtl.jpg"; // Adjusted path
import language from "../../../assets/i18n/i18n";

function Wallet() {
    const navigate = useNavigate();
    const [amount, setAmount] = useState("");
    const [amountList] = useState([
        { price: "200,000", id: 1 },
        { price: "400,000", id: 2 },
        { price: "600,000", id: 3 },
        { price: "800,000", id: 4 },
    ]);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const [back, setBack] = useState(autoBackRtl); // Default to RTL image

    useEffect(() => {
        // Check document direction to set background image
        if (document.dir !== "rtl") {
            setBack(autoBack);
        }

        // Replacing BackHandler with browser back navigation
        const handleBack = () => {
            Store.incrementTabBar();
            navigate(-1);
            return true;
        };
        window.addEventListener("popstate", handleBack);

        return () => window.removeEventListener("popstate", handleBack);
    }, [navigate]);

    const handleBackButtonClick = () => {
        Store.incrementTabBar();
        navigate(-1);
    };

    const onPressSubmit = () => {
        alert("Submit pressed"); // Placeholder; replace with actual logic if needed
    };

    const onPressSelectAmount = (index, item) => {
        setSelectedIndex(index);
        alert(item.price); // Placeholder; replace with actual logic if needed
    };

    return (
        <div
            className="min-h-screen flex flex-col bg-cover bg-center"
            style={{ backgroundImage: `url(${back})` }}
        >
            <SimpleHeader func={handleBackButtonClick} title="افزایش اعتبار حساب" />
            <div className="flex-1 flex flex-col">
                <div className="flex-[5] flex items-center justify-evenly">
                    <Validity />
                    <input
                        className="w-3/5 h-10 font-bold text-sm border border-green-500 rounded-3xl p-2 text-center focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="مبلغ دلخواه"
                        onChange={(e) => setAmount(e.target.value)}
                        type="number" // Replacing keyboardType="numeric"
                        onKeyPress={(e) => e.key === "Enter" && onPressSubmit()}
                    />
                    <CustomText className="text-sm text-gray-800">یا</CustomText>
                </div>
                <div className="flex-[5] flex flex-col justify-around">
                    <div className="w-full mx-auto">
                        <div className="grid grid-cols-2 gap-4">
                            {amountList.map((item, index) => (
                                <Box
                                    key={item.id}
                                    func={() => onPressSelectAmount(index, item)}
                                    price={item.price}
                                    selectedIndex={selectedIndex}
                                    index={index}
                                />
                            ))}
                        </div>
                    </div>
                    <SimpleButton
                        func={onPressSubmit}
                        btnStyle="w-7/12 mx-auto h-10 bg-blue-500 text-white rounded-md"
                        title="پرداخت"
                    />
                </div>
            </div>
        </div>
    );
}

export default Wallet;