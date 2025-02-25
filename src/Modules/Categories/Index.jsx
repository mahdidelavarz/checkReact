import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import SimpleHeader from "../../Components/CustomHeader/SimpleHeader/SimpleHeader";
import LoadingModal from "../../Components/CustomModal/LoadingModal/LoadingModal";
import CustomText from "../../Components/CustomText/CustomText";
import emptyImage from "../../Components/Images/empty_image.png"; // Direct import
import Loading from "../../Components/Loading/Loading";
import language from "../../Assets/i18n/i18n";
import storage from "../../Factories/Storage";
import { CDN_Url } from "../../Configs/Urls";
import autoBack from "../../Components/Images/auth_back.jpg"; // Updated per your instruction
import autoBackRtl from "../../Components/Images/auth_back_rtl.jpg";

function Categories() {
    const navigate = useNavigate();
    const [isLoadingBtn, setIsLoadingBtn] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState([]);
    const [back, setBack] = useState(autoBackRtl); // Default to RTL image

    useEffect(() => {
        // Check document direction to set background image
        if (document.dir !== "rtl") {
            setBack(autoBack);
        }

        // Replacing BackHandler with browser back navigation
        const handleBack = () => {
            navigate("/tabBar");
            return true;
        };
        window.addEventListener("popstate", handleBack);

        // Fetch categories
        getCategories();

        return () => window.removeEventListener("popstate", handleBack);
    }, [navigate]);

    const getCategories = () => {
        setIsLoading(true);
        storage.get("categories.json", (data) => {
            setData(data ? JSON.parse(data) : []);
            setIsLoading(false);
        });
    };

    const onPressItem = (short_name) => {
        setIsLoadingBtn(true);
        storage.get("centers.json", (data) => {
            let temp = data ? JSON.parse(data) : [];
            let filteredData = temp.filter((item) => item.category === short_name);
            storage.set("Select_Centers", JSON.stringify(filteredData));
            setIsLoadingBtn(false);
            navigate(`/treatmentCenters/${short_name}`);
        });
    };

    const handleBackButtonClick = () => {
        navigate("/tabBar");
    };

    return (
        <div
            className="min-h-screen flex flex-col bg-cover bg-center"
            style={{ backgroundImage: `url(${back})` }}
        >
            <SimpleHeader
                func={handleBackButtonClick}
                title={language("categories")}
            />
            {!isLoading ? (
                <div className="flex-1 overflow-y-auto p-4">
                    {data.map((item, index) => (
                        <button
                            key={index}
                            className="mx-1 mt-2 h-[50vw] max-h-[300px] flex flex-col items-center mb-1 rounded-md relative hover:shadow-md"
                            onClick={() => onPressItem(item.short_name)}
                        >
                            {item.logo_image ? (
                                <img
                                    className="w-full h-full rounded-md object-cover"
                                    src={`${CDN_Url.serverUrl}${CDN_Url.categoryLogoDirUrl}${item.logo_image}`}
                                    alt={item.title}
                                />
                            ) : (
                                <img
                                    className="w-[170px] h-[170px] rounded-md object-cover"
                                    src={emptyImage}
                                    alt="Empty"
                                />
                            )}
                            <div className="bg-black/40 absolute bottom-0 left-0 right-0 h-10 flex items-center justify-center rounded-b-md">
                                <CustomText className="text-white text-sm text-center font-bold">
                                    {item.title}
                                </CustomText>
                            </div>
                        </button>
                    ))}
                </div>
            ) : (
                <Loading />
            )}
            <LoadingModal isVisible={isLoadingBtn} />
        </div>
    );
}

export default Categories;