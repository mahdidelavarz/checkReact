import React, { Component } from 'react';
import { BackHandler } from 'react-native';

import SimpleHeader from '../../../Components/CustomHeader/SimpleHeader/SimpleHeader';
import { ic_scan, gadgetScan } from '../../../Components/Images/Images';
import CustomText from '../../../Components/CustomText/CustomText';

class AddGadget extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    handleBackButtonClick = () => {
        this.props.history.goBack();
        return true;
    }

    render() {
        return (
            <div className="flex-1 bg-white">
                <SimpleHeader
                    func={() => this.props.history.push('/secondStep')}
                    title={'اضافه کردن گجت'}
                />
                <div className="flex-1 flex-col">
                    <div className="flex-2 items-center justify-center">
                        <img className="w-[60%] h-[60%] object-contain" src={gadgetScan} alt="Gadget Scan" />
                        <CustomText className="text-sm text-dark_txt text-center w-[95%] self-center">
                            {/* Add any text here if needed */}
                        </CustomText>
                    </div>
                    <div className="flex-1 items-center justify-center">
                        <button
                            activeOpacity={0.7}
                            className="w-3/5 h-11 bg-green-500 rounded-3xl flex flex-row items-center justify-center"
                            onClick={() => this.props.history.push('/qRCodeScan')}
                        >
                            <CustomText className="text-lg text-white mr-2">
                                اسکن
                            </CustomText>
                            <img className="w-6 h-6 object-contain" src={ic_scan} alt="Scan Icon" />
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default AddGadget;
