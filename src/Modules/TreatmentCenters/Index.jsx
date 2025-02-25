import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { orderByDistance } from "geolib";

import icLocation from "../../Components/Images/ic_location.png"; // Direct imports
import icArrow from "../../Components/Images/ic_arrow.png";
import icPhone from "../../Components/Images/ic_phone.png";
import autoBack from "../../Components/Images/auth_back.jpg"; // Updated per your instruction
import autoBackRtl from "../../Components/Images/auth_back_rtl.jpg";
import SimpleModal from "../../Components/CustomModal/SimpleModal/SimpleModal";
import CustomText from "../../Components/CustomText/CustomText";
import FilterModal from "./Componets/FilterModal/FilterModal"; // Assuming 'Componets' typo is intentional
import SearchModal from "./Componets/SearchModal/SearchModal";
import Loading from "../../Components/Loading/Loading";
import Header from "./Componets/Header/Header";
import language from "../../Assets/i18n/i18n";
import storage from "../../Factories/Storage";

function TreatmentCenters() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [isAccessLocation, setIsAccessLocation] = useState(false);
    const [isVisibleFilter, setIsVisibleFilter] = useState(false);
    const [isResultSearch, setIsResultSearch] = useState(false);
    const [isFirstFilter, setIsFirstFilter] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [searchData, setSearchData] = useState([]);
    const [data, setData] = useState([]);
    const [arrayholder, setArrayholder] = useState([]);
    const [back, setBack] = useState(autoBackRtl); // Default to RTL image

    useEffect(() => {
        // Check document direction to set background image
        if (document.dir !== "rtl") {
            setBack(autoBack);
        }

        // Replacing BackHandler with browser back navigation
        const handleBack = () => {
            storage.remove("Select_Centers_Nearby");
            navigate("/categories");
            return true;
        };
        window.addEventListener("popstate", handleBack);

        // Fetch centers
        getCenters();

        return () => window.removeEventListener("popstate", handleBack);
    }, [navigate]);

    const getCenters = () => {
        setIsLoading(true);
        storage.get("Select_Centers_Nearby", (nearby) => {
            const nearbyData = nearby ? JSON.parse(nearby) : null;
            if (nearbyData) {
                setData(nearbyData);
                setIsLoading(false);
            } else {
                storage.get("Select_Centers", (data) => {
                    const res = data ? JSON.parse(data) : [];
                    setData(res);
                    setArrayholder(res);
                    setIsLoading(false);
                });
            }
        });
    };

    const searchDataFnc = (text) => {
        if (text.length > 1) {
            setIsResultSearch(true);
            const newData = arrayholder.filter((item) => {
                const itemData = `${item.title.toUpperCase()} ${item.address.toUpperCase()}`;
                const textData = text.toUpperCase();
                return itemData.indexOf(textData) > -1;
            });
            setSearchData(newData);
        } else {
            setIsResultSearch(false);
        }
    };

    const onPressItem = (item) => {
        const params = JSON.stringify(item);
        navigate(`/clinicDetails/${params}`);
    };

    const onPressIsVisibleFilter = () => {
        setIsVisibleFilter(!isVisibleFilter);
    };

    const onPressFilterData = () => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    filterData(position);
                },
                (error) => {
                    console.error("Geolocation error:", error);
                    setIsAccessLocation(true);
                }
            );
        } else {
            toast.error("Geolocation is not supported in your browser.");
            setIsVisibleFilter(false);
        }
    };

    const filterData = (position) => {
        storage.get("Select_Centers_Nearby", (data) => {
            const nearby = data ? JSON.parse(data) : null;
            if (!nearby) {
                if (data && data[0]?.category === "ivf") {
                    const filter = data.map((item) => ({
                        latitude: item.loc_latitude,
                        longitude: item.loc_longitude,
                        active_times: item.active_times,
                        address: item.address,
                        category: item.category,
                        city: item.city,
                        description: item.description,
                        email: item.email,
                        id: item.id,
                        logo_image: item.logo_image,
                        map_image: item.map_image,
                        phone: item.phone,
                        short_name: item.short_name,
                        title: item.title,
                    }));
                    const findNearest = orderByDistance(
                        {
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude,
                        },
                        filter
                    );
                    setData(findNearest);
                    setIsVisibleFilter(false);
                    setIsFirstFilter(true);
                    storage.set("Select_Centers_Nearby", JSON.stringify(findNearest));
                } else {
                    setIsVisibleFilter(false);
                }
            } else {
                setIsVisibleFilter(false);
            }
        });
    };

    const onPressOpenSettingGps = () => {
        toast.info("لطفاً دسترسی به موقعیت مکانی را در تنظیمات مرورگر فعال کنید.");
        setIsAccessLocation(false);
    };

    const handleBackButtonClick = () => {
        storage.remove("Select_Centers_Nearby");
        navigate("/categories");
    };

    return (
        <div
            className="min-h-screen flex flex-col bg-cover bg-center"
            style={{ backgroundImage: `url(${back})` }}
        >
            <Header
                func_back={handleBackButtonClick}
                func_filter={onPressIsVisibleFilter}
                event={(value) => searchDataFnc(value)}
            />
            {!isLoading ? (
                <div className="flex-1">
                    {!isResultSearch ? (
                        <div className="flex flex-col items-center">
                            {data.length === 0 ? (
                                <CustomText className="text-center text-black mt-[25%] text-sm">
                                    مراکز درمانی یافت نشد
                                </CustomText>
                            ) : (
                                data.map((item) => (
                                    <div
                                        key={item.id}
                                        className="w-[95%] h-[150px] bg-white rounded-md mt-2 flex flex-col items-center justify-between shadow-md mb-2"
                                    >
                                        <div className="flex-3 flex justify-center">
                                            <CustomText className="font-bold text-center text-lg text-gray-800">
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
                                            <div className="flex-[9] flex justify-center">
                                                <CustomText
                                                    className="text-sm text-gray-800 text-left w-[95%]"
                                                    numberOfLines={1}
                                                >
                                                    {item.address}
                                                </CustomText>
                                            </div>
                                        </div>
                                        <div className="flex-3.5 flex flex-row">
                                            <div className="flex-1 flex items-center justify-center">
                                                <img className="w-5 h-5" src={icPhone} alt="Phone" />
                                            </div>
                                            <div className="flex-[4] flex items-start justify-center">
                                                <CustomText
                                                    className="text-sm text-gray-800"
                                                    numberOfLines={1}
                                                >
                                                    {item.phone}
                                                </CustomText>
                                            </div>
                                            <div className="flex-[4.5] flex items-end justify-center pr-2">
                                                <button
                                                    className="w-[70%] h-[70%] rounded-full bg-white border border-green-500 flex items-center justify-center hover:bg-green-50"
                                                    onClick={() => onPressItem(item)}
                                                >
                                                    <CustomText className="text-green-500 text-sm">
                                                        {language("more_details")}
                                                    </CustomText>
                                                    <img
                                                        className="w-2.5 h-2.5 ml-1"
                                                        src={icArrow}
                                                        alt="Arrow"
                                                    />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    ) : (
                        <SearchModal data={searchData} route={{ navigate }} />
                    )}
                </div>
            ) : (
                <Loading />
            )}
            <FilterModal
                isVisible={isVisibleFilter}
                onPressCloseModal={onPressIsVisibleFilter}
                onPressFilter={onPressFilterData}
            />
            <SimpleModal
                isVisible={isAccessLocation}
                img={icLocation}
                title="دسترسی به موقعیت مکانی"
                description="لطفا جهت سهولت بیشتر، اجازه دسترسی به موقعیت مکانی را صادر نمایید."
                right_func={onPressOpenSettingGps}
                left_func={() => setIsAccessLocation(false)}
            />
        </div>
    );
}

export default TreatmentCenters;