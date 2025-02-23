import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Replacing BackHandler and props.history
import { toast } from "react-toastify"; // Replacing Toast

import SimpleHeader from "../../../Components/CustomHeader/SimpleHeader/SimpleHeader";
import SimpleButton from "../../../Components/CustomButton/SimpleButton";
import CustomText from "../../../Components/CustomText/CustomText";
import Keyboard from "./Components/Keyboard/Keyboard";
import storage from "../../../Factories/Storage"; // Import functional storage
import language from "../../../assets/i18n/i18n";
import Circle from "./Components/Circle/Circle";
import Store from "../../../Store/Store";

function SecurityPassword() {
    const navigate = useNavigate();
    const [firstInput, setFirstInput] = useState("");
    const [secondInput, setSecondInput] = useState("");
    const [threeInput, setThreeInput] = useState("");
    const [fourInput, setFourInput] = useState("");
    const [isModalConfirm, setIsModalConfirm] = useState(false); // Kept but unused in this version

    useEffect(() => {
        // Replacing BackHandler with browser back navigation
        const handleBack = () => {
            Store.incrementTabBar();
            navigate(-1);
            return true;
        };
        window.addEventListener("popstate", handleBack);

        return () => window.removeEventListener("popstate", handleBack);
    }, [navigate]);

    const onPressKeyboard = (item) => {
        if (item.id !== 10) {
            if (firstInput === "") {
                setFirstInput(item.number);
            } else if (secondInput === "") {
                setSecondInput(item.number);
            } else if (threeInput === "") {
                setThreeInput(item.number);
            } else if (fourInput === "") {
                setFourInput(item.number);
            }
        } else {
            clear();
        }
    };

    const clear = () => {
        if (fourInput || fourInput === 0) {
            setFourInput("");
        } else if (threeInput || threeInput === 0) {
            setThreeInput("");
        } else if (secondInput || secondInput === 0) {
            setSecondInput("");
        } else if (firstInput || firstInput === 0) {
            setFirstInput("");
        }
    };

    const onPressSubmit = () => {
        const code = `${firstInput}${secondInput}${threeInput}${fourInput}`;
        if (code.length < 4) {
            toast.warn("اعداد وارد شده کامل نیست"); // Replacing Toast.show
        } else {
            storage.set("Password", code); // Updated to functional storage
            navigate("/tabBar");
        }
    };

    const handleBackButtonClick = () => {
        Store.incrementTabBar();
        navigate(-1);
    };

    return (
        <div className="flex flex-col h-screen bg-white">
            <SimpleHeader
                func={handleBackButtonClick}
                title="گذرواژه امنیتی"
            />
            <div className="flex flex-col h-full">
                <div className="flex-3 flex items-center justify-end">
                    <CustomText className="text-center text-sm">
                        پین خود را انتخاب کنید
                    </CustomText>
                    <div className="flex mt-3 flex-row-reverse space-x-2">
                        <Circle number={firstInput} />
                        <Circle number={secondInput} />
                        <Circle number={threeInput} />
                        <Circle number={fourInput} />
                    </div>
                </div>
                <div className="flex-7 flex items-center justify-end pb-1">
                    <Keyboard func={onPressKeyboard} />
                </div>
                <div className="flex-2 flex items-center justify-center">
                    <SimpleButton
                        func={onPressSubmit}
                        btnStyle="w-1/2"
                        title={language("confirmation")}
                        titleStyle="text-lg"
                    />
                </div>
            </div>
        </div>
    );
}

export default SecurityPassword;