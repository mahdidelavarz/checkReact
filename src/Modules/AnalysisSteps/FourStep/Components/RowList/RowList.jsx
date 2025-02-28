import React, { useState } from "react";
import icArrow from "../../../../../Components/Images/ic_arrow.png"; // Direct import
import CustomText from "../../../../../Components/CustomText/CustomText";
import { sampleGranular, sampleColors, sampleVolume } from "./Data";
import languages from "../../../../../Assets/i18n/i18n";
import storage from "../../../../../Factories/Storage";
import SlideModal from "../SlideModal/SlideModal";

function RowList() {
  const [index, setIndex] = useState("");
  const [isModal, setIsModal] = useState(false);
  const [titleModal, setTitleModal] = useState("");
  const [dataModal, setDataModal] = useState([]);
  const [listState, setListState] = useState([
    { title: languages("title_analysis"), leftText: languages("optional") },
    { title: languages("granular"), leftText: languages("add") },
    { title: languages("sample_color"), leftText: languages("add") },
    { title: languages("sample_volume"), leftText: languages("add") },
  ]);

  const onPress = (item, idx) => {
    if (idx === 1) {
      setTitleModal(languages("granular"));
      setDataModal(sampleGranular);
    } else if (idx === 2) {
      setTitleModal(languages("sample_color"));
      setDataModal(sampleColors);
    } else if (idx === 3) {
      setTitleModal(languages("sample_volume"));
      setDataModal(sampleVolume);
    }
    setIsModal(true);
    setIndex(idx);
  };

  const onPressModal = (item) => {
    const updatedList = [...listState];
    updatedList[index].leftText = item.value;
    setListState(updatedList);
    setIsModal(false);
    if (index === 1) {
      storage.set("Viscosity", item.value);
    } else if (index === 2) {
      storage.set("Color", item.value);
    } else if (index === 3) {
      storage.set("Volume", item.value);
    }
  };

  const onChangeInput = (value) => {
    const updatedList = [...listState];
    updatedList[0].leftText = value || languages("optional"); // Reset to "optional" if empty
    setListState(updatedList);
    storage.set("Title", value);
  };

  return (
    <div className="w-full flex flex-col items-center">
      {listState.map((item, idx) => (
        <button
          key={idx}
          className="w-11/12 h-12 rounded-md mt-2 flex flex-row border border-gray-400 bg-white hover:bg-gray-100 active:bg-gray-200"
          onClick={() => onPress(item, idx)}
        >
          <div className="flex-1 flex items-center px-2">
            <CustomText className="text-sm text-gray-800 text-left">
              {item.title}
            </CustomText>
          </div>
          <div className="flex-1 flex items-center justify-center">
            {idx === 0 ? (
              <input
                type="text"
                className="text-center text-sm text-gray-800 border-none outline-none w-full bg-transparent"
                placeholder="عنوان"
                value={item.leftText === languages("optional") ? "" : item.leftText} // Show empty if "optional"
                onChange={(e) => onChangeInput(e.target.value)}
                onClick={(e) => e.stopPropagation()} // Prevent button click from triggering modal
              />
            ) : (
              <CustomText className="text-sm text-gray-800 text-center">
                {item.leftText}
              </CustomText>
            )}
          </div>
          <div className="flex items-center justify-center px-2">
            <img className="w-3 h-3" src={icArrow} alt="Arrow" />
          </div>
        </button>
      ))}
      <SlideModal
        visible={isModal}
        title={titleModal}
        data={dataModal}
        onPress={onPressModal}
        closeFunc={() => setIsModal(false)}
      />
    </div>
  );
}

export default RowList;