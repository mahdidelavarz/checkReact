import React from "react";
import { I18nManager } from "react-native";
import CustomText from "../../CustomText/CustomText";
import language from "../../../Assets/i18n/i18n";
import { ic_arrow } from "../../Images/Images";
import classNames from "classnames";

const Footer = ({ nextFunc, screenCount, backFunc, line }) => {
  return (
    <div
      className={classNames(
        "w-full h-16 flex bg-gray-200",
        I18nManager.isRTL ? "flex-row" : "flex-row-reverse"
      )}
    >
      {/* Next Button */}
      <div className="flex-1 flex items-center justify-center">
        <button
          className="w-4/5 h-9 flex items-center justify-center border border-gray-400 rounded-full"
          onClick={nextFunc}
        >
          <div className="flex items-center justify-center flex-1">
            <img
              className="w-3 h-3 transform rotate-180 text-green-500"
              src={ic_arrow}
              alt="arrow"
            />
          </div>
          <div className="flex-2 flex items-center justify-center">
            <CustomText className="text-gray-700 text-xs">
              {language("next")}
            </CustomText>
          </div>
        </button>
      </div>

      {/* Progress Bar & Screen Counter */}
      <div className="flex-2 flex flex-col items-center">
        <div className="flex items-center justify-center text-gray-700 text-sm">
          <CustomText>{screenCount + "/12"}</CustomText>
        </div>
        <div className="flex items-center justify-center w-11/12 bg-gray-400 h-4 rounded-full mt-1">
          <div
            className="bg-green-500 h-4 rounded-full"
            style={{ width: line }}
          />
        </div>
      </div>

      {/* Back Button */}
      <div className="flex-1 flex items-center justify-center">
        <button
          className="w-4/5 h-9 flex items-center justify-center border border-gray-400 rounded-full"
          onClick={backFunc}
        >
          <div className="flex-2 flex items-center justify-center">
            <CustomText className="text-gray-700 text-xs">
              {language("back")}
            </CustomText>
          </div>
          <div className="flex items-center justify-center flex-1">
            <img className="w-3 h-3 text-green-500" src={ic_arrow} alt="arrow" />
          </div>
        </button>
      </div>
    </div>
  );
};

export default Footer;
