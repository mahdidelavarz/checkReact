import React from "react";
import Modal from "react-modal";
import { Link } from "react-router-native";
import classNames from "classnames"; // Ensure you install this package
import CustomText from "../../CustomText/CustomText";
import languages from "../../../Assets/i18n/i18n";
import { alert } from "../../Images/Images";

function CloseModal({ visible, resumeFunc }) {
    return (
        <Modal
            isOpen={visible}
            onRequestClose={resumeFunc}
            className="bg-white rounded-lg p-5 w-4/5 md:w-1/2 lg:w-1/3 shadow-lg"
            overlayClassName="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50"
        >
            <div className="flex flex-col items-center">
                {/* Header Section */}
                <div className="relative flex items-center justify-center w-full border-b border-gray-300 py-4">
                    <div className="absolute -bottom-3 w-16 h-16 flex justify-center items-center bg-white rounded-full shadow-md">
                        <img className="w-14 h-14" src={alert} alt="Alert Icon" />
                    </div>
                </div>

                {/* Center Content */}
                <div className="flex flex-col items-center py-6">
                    <div className="w-11/12 text-center">
                        <CustomText className="text-gray-700 text-base leading-7">
                            {languages("close_modal_txt")}
                        </CustomText>
                    </div>
                </div>

                {/* Bottom Buttons */}
                <div className="flex w-full border-t border-gray-300 py-3">
                    <button
                        className={classNames(
                            "flex-1 bg-green-500 text-white rounded-full py-2 mx-2 text-sm font-bold",
                            "hover:bg-green-600 transition"
                        )}
                        onClick={resumeFunc}
                    >
                        <CustomText>{languages("resume_analysis")}</CustomText>
                    </button>

                    <Link
                        to="/tabBar"
                        className={classNames(
                            "flex-1 bg-pink-500 text-white rounded-full py-2 mx-2 text-sm font-bold",
                            "hover:bg-pink-600 transition"
                        )}
                    >
                        <CustomText>{languages("close_analysis")}</CustomText>
                    </Link>
                </div>
            </div>
        </Modal>
    );
}

export default CloseModal;
