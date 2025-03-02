import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Replacing BackHandler and props.history
import { toast } from "react-toastify"; // Replacing DropdownAlert and Toast

import HelpHeader from "../../../Components/Analysis/HelpHeader/HelpHeader";
import CloseModal from "../../../Components/Analysis/CloseModal/CloseModal";
import HelpModal from "../../../Components/Analysis/HelpModal/HelpModal";
import SimpleButton from "../../../Components/CustomButton/SimpleButton";
import CustomText from "../../../Components/CustomText/CustomText";
import Footer from "../../../Components/Analysis/Footer/Footer";
import { statusHandle } from "../../../Factories/HttpHandler";
// !gadjet list is imported from current path but it dose not exist
import GadgetList from "../SecondStep/Components/GadgetList/GadgetList";
import Loading from "../../../Components/Loading/Loading";
// !emptyList is imported from current path but it dose not exist
import EmptyList from "./Components/EmptyList/EmptyList";
import { Url } from "../../../Configs/Urls";
import languages from "../../../assets/i18n/i18n";
import storage from "../../../Factories/Storage"; // Import functional storage

let Token;

function SecondStep() {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isHelpModal, setIsHelpModal] = useState(false);
    const [isCloseModal, setIsCloseModal] = useState(false);
    const [selected, setSelected] = useState(-1);

    useEffect(() => {
        // Replacing BackHandler with browser back navigation
        const handleBack = () => {
            setIsCloseModal(true);
            return true;
        };
        window.addEventListener("popstate", handleBack);

        // Fetch token and gadget list
        setIsLoading(true);
        storage.get("Token", (token) => {
            Token = token;
            getGadgetList();
        });

        return () => window.removeEventListener("popstate", handleBack);
    }, [navigate]);

    const getGadgetList = async () => {
        try {
            const response = await fetch(`${Url.serverUrl}Analysis/gadgets/`, {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: `token ${Token}`,
                },
            });
            statusHandle(response.status, navigate); // Updated to use navigate
            const responseJson = await response.json();
            setData(responseJson);
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            toast.error(`${error.message}`); // Replacing Toast.show
        }
    };

    const onPressNextStep = () => {
        if (data.length === 0) {
            toast.warn(languages("empty_gadget_alert")); // Replacing DropdownAlert
        } else if (selected === -1) {
            toast.warn("لطفا یکی از گجت ها را انتخاب کنید");
        } else {
            navigate("/thirdStep");
            storage.remove("Title"); // Updated to functional storage
        }
    };

    const handleBackButtonClick = () => {
        setIsCloseModal(true);
    };

    const onPressCloseAnalysis = () => {
        setIsCloseModal(false);
        navigate("/tabBar"); // Assuming this is the intended close destination
    };

    return (
        <div className="flex flex-col min-h-screen bg-white">
            <HelpHeader
                closeFunc={handleBackButtonClick}
                helpFunc={() => setIsHelpModal(true)}
                count={2}
            />
            {!isLoading ? (
                <div className="flex flex-col flex-1">
                    <div className="flex flex-col items-center justify-evenly flex-3">
                        <CustomText className="text-center text-lg text-gray-800">
                            {languages("select_gadget")}
                        </CustomText>
                        <CustomText className="text-center text-sm text-gray-500 w-11/12">
                            {languages("attach_gadget_description")}
                        </CustomText>
                    </div>
                    <div className="flex-4">
                        {data.length !== 0 ? (
                            <GadgetList data={data} func={(index) => setSelected(index)} />
                        ) : (
                            <EmptyList />
                        )}
                    </div>
                    <div className="flex flex-col items-center justify-center flex-2 w-4/5 mx-auto">
                        <div className="flex flex-row w-full space-x-2">
                            <SimpleButton
                                func={() => window.open("https://etcco.ir", "_blank")} // Replacing Linking.openURL
                                btnStyle="flex-1"
                                title={languages("buy_gadget")}
                                titleStyle="text-sm"
                            />
                            <SimpleButton
                                func={() => navigate("/addGadget")}
                                btnStyle="flex-1 ml-2"
                                title={languages("add_gadget")}
                                titleStyle="text-sm"
                            />
                        </div>
                    </div>
                    <div className="flex-1 flex justify-center">
                        <Footer
                            nextFunc={onPressNextStep}
                            screenCount={2}
                            line="15%"
                            backFunc={handleBackButtonClick}
                        />
                    </div>
                </div>
            ) : (
                <Loading />
            )}
            <CloseModal
                visible={isCloseModal}
                closeFunc={onPressCloseAnalysis}
                resumeFunc={() => setIsCloseModal(false)}
            />
            <HelpModal
                visible={isHelpModal}
                description={languages("help_modal_txt_step_2")}
                closeFunc={() => setIsHelpModal(false)}
            />
        </div>
    );
}

export default SecondStep;