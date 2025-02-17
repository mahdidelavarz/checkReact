import React from 'react';
import { div, img, button, Vibration } from 'react-native'; // Assuming these are custom components
import Toast from 'react-native-simple-toast';
import moment from 'moment-jalaali';

import { ic_date, ic_about, ic_barcode } from '../../../../../Components/Images/Images';
import CustomText from '../../../../../Components/CustomText/CustomText';
import colors from '../../../../../Assets/Styles/Colors';
import languages from '../../../../../Assets/i18n/i18n';
import Storage from '../../../../../Factories/Storage';

let Token;
let storage = new Storage();

class GadgetList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectGadget: this.props.selected
        }
    }

    onPressItem(item, index, func) {
        this.setState({ selectGadget: index });
        func(index);
        storage.set("SerialNumber", item.serial_number);
        Toast.show("گجت با موفقیت ثبت شد");
        Vibration.vibrate();
    }

    render() {
        const { func } = this.props;
        const { selectGadget } = this.state;
        return (
            <div className="flex flex-col">
                <div className="h-[25%] bg-gray-100 flex items-center justify-center">
                    <CustomText font_weight={'bold'} className="text-sm text-gray-800">
                        {languages('gadget_list')}
                    </CustomText>
                </div>
                <div className="h-[70%] mt-[3%] mb-[2%] pr-1 pl-1 self-start">
                    {this.props.data.map((item, index) => (
                        <button
                            key={index.toString()}
                            className={`m-1 w-10/12 rounded-lg border ${
                                selectGadget === index ? 'border-green-500 bg-green-50' : 'border-gray-300 bg-white'
                            }`}
                            onClick={() => this.onPressItem(item, index, func)}
                        >
                            <div className="flex flex-row h-[33%]">
                                <div className="flex-1 flex items-center justify-center">
                                    <img className="w-6 h-6" src={ic_barcode} alt="Barcode" />
                                </div>
                                <div className="flex-4 flex justify-center pr-2">
                                    <CustomText numberOfLines={1} className="text-xs text-gray-500 text-left">
                                        {languages('serial') + ' '}
                                        <CustomText className="text-black">
                                            {item.serial_number}
                                        </CustomText>
                                    </CustomText>
                                </div>
                            </div>
                            <div className="flex flex-row h-[33%]">
                                <div className="flex-1 flex items-center justify-center">
                                    <img className="w-6 h-6" src={ic_date} alt="Date" />
                                </div>
                                <div className="flex-4 flex justify-center pr-2">
                                    <CustomText className="text-xs text-gray-500 text-left">
                                        {languages('expire_date') + ' '}
                                        <CustomText className="text-black">
                                            {moment(item.expiration_date, 'YYYY/M/D').format('jYYYY/jM/jD')}
                                        </CustomText>
                                    </CustomText>
                                </div>
                            </div>
                            <div className="flex flex-row h-[33%]">
                                <div className="flex-1 flex items-center justify-center">
                                    <img className="w-6 h-6" src={ic_about} alt="About" />
                                </div>
                                <div className="flex-4 flex justify-center pr-2">
                                    <CustomText className="text-xs text-gray-500 text-left">
                                        {languages('remaining_count') + ' '}
                                        <CustomText className="text-black">
                                            {item.remaining_count}
                                        </CustomText>
                                    </CustomText>
                                </div>
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        );
    }
}

export default GadgetList;