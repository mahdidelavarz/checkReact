import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import icCircle from "../../Components/Images/ic_circle.png"; // Direct import
import icCircleCheck from "../../Components/Images/ic_circle_check.png"; // Direct import
import iran from "../../Components/Images/iran.png"; // Direct import
import english from "../../Components/Images/english.png"; // Direct import
import SimpleHeader from "../../Components/CustomHeader/SimpleHeader/SimpleHeader";
import SimpleButton from "../../Components/CustomButton/SimpleButton";
import CustomText from "../../Components/CustomText/CustomText";
import { changeLang } from "../../Factories/ChangeLang";
import languages from "../../Assets/i18n/i18n";
import autoBack from "../../Components/Images/auth_back.jpg"; // Adjusted path per your instruction
import autoBackRtl from "../../Components/Images/auth_back_rtl.jpg"; // Adjusted path per your instruction

function Languages() {
    const navigate = useNavigate();
    const { screenName } = useParams(); // Replacing props.match.params.screenName
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const [selectedItem, setSelectedItem] = useState("");
    const [back, setBack] = useState(autoBackRtl); // Default to RTL image
    const countries = [
        { title: languages("persian"), img: iran, id: 1 },
        { title: "english", img: english, id: 2 },
    ];

    useEffect(() => {
        // Check document direction to set background image
        if (document.dir !== "rtl") {
            setBack(autoBack);
        }

        // Replacing BackHandler with browser back navigation
        const handleBack = () => {
            navigate(`/${screenName}`);
            return true;
        };
        window.addEventListener("popstate", handleBack);

        return () => window.removeEventListener("popstate", handleBack);
    }, [navigate, screenName]);

    const handleBackButtonClick = () => {
        navigate(`/${screenName}`);
    };

    const onPressSelectItem = (item, index) => {
        setSelectedIndex(index);
        setSelectedItem(item.id);
    };

    const onPressChangeLanguage = () => {
        if (!selectedItem) {
            toast.info(languages("unselected_language_alert")); // Replacing Toast.show
        } else if (selectedItem === 1) {
            changeLang("fa");
        } else {
            changeLang("en");
        }
    };

    return (
        <div
            className="min-h-screen flex flex-col items-center bg-cover bg-center"
            style={{ backgroundImage: `url(${back})` }}
        >
            <SimpleHeader
                func={handleBackButtonClick}
                title={languages("change_languages")}
            />
            <CustomText className="text-center text-black text-lg my-2">
                {languages("select_languages")}
            </CustomText>
            {countries.map((item, index) => (
                <button
                    key={index}
                    className="w-4/5 h-14 my-2 flex flex-row items-center border-b border-gray-300 rounded-md hover:bg-gray-100 active:bg-gray-200"
                    onClick={() => onPressSelectItem(item, index)}
                >
                    <div className="flex-1 flex items-center justify-center">
                        <img
                            className="w-8 h-8 object-contain"
                            src={item.img}
                            alt={`${item.title} Flag`}
                        />
                    </div>
                    <div className="flex-[8] flex justify-center">
                        <CustomText className="text-black text-lg ml-4 text-left">
                            {item.title}
                        </CustomText>
                    </div>
                    <div className="flex-1 flex items-center justify-center">
                        <img
                            className="w-6 h-6 object-contain"
                            src={index === selectedIndex ? icCircleCheck : icCircle}
                            alt={index === selectedIndex ? "Checked" : "Unchecked"}
                        />
                    </div>
                </button>
            ))}
            <SimpleButton
                func={onPressChangeLanguage}
                btnStyle="absolute bottom-2 w-3/5 h-10"
                title={languages("change")}
                titleStyle="text-lg"
            />
        </div>
    );
}

export default Languages;