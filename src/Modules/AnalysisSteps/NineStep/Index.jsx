import React, { Component } from 'react';
import { BackHandler } from 'react-native';
import DropdownAlert from 'react-native-dropdownalert';

import HelpHeader from '../../../Components/Analysis/HelpHeader/HelpHeader';
import CloseModal from '../../../Components/Analysis/CloseModal/CloseModal';
import HelpModal from '../../../Components/Analysis/HelpModal/HelpModal';
import CheckBtn from '../../../Components/Analysis/CheckBtn/CheckBtn';
import CustomText from '../../../Components/CustomText/CustomText';
import { attachGadget } from '../../../Components/Images/Images';
import Footer from '../../../Components/Analysis/Footer/Footer';
import languages from '../../../Assets/i18n/i18n';
import Storage from "../../../Factories/Storage";

let storage = new Storage();

class NineStep extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isCloseModal: false,
            isHelpModal: false,
            isCheckFull: false,
            isCheckClear: false
        };
    }

    componentDidMount() {
        BackHandler.addEventListener("hardwareBackPress", this.handleBackButtonClick);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    handleBackButtonClick = () => {
        this.setState({ isCloseModal: false });
        return true;
    }

    onPressNextStep = () => {
        if (!this.state.isCheckFull || !this.state.isCheckClear) {
            this.dropDownAlert.alertWithType('warn', languages('step_alert'));
        } else {
            this.props.history.push('/tenStep');
        }
    }

    render() {
        const { isCheckFull, isCheckClear } = this.state;
        return (
            <div className="flex flex-col min-h-screen bg-white">
                {/* Alert */}
                <DropdownAlert
                    ref={ref => this.dropDownAlert = ref}
                    inactiveStatusBarBackgroundColor="bg-green-700"
                    titleStyle="font-bold text-sm text-white"
                />

                {/* Header */}
                <HelpHeader
                    closeFunc={() => this.setState({ isCloseModal: true })}
                    helpFunc={() => this.setState({ isHelpModal: true })}
                    count={9}
                />

                {/* Content */}
                <div className="flex flex-col flex-1">
                    <div className="flex items-center justify-center h-52 pr-4">
                        <img className="w-1/2 h-1/2 object-contain" src={attachGadget} />
                    </div>

                    <div className="flex flex-col items-center space-y-4">
                        <CustomText className="text-lg font-bold text-gray-800 text-center mt-2">
                            {languages('putting_up_container')}
                        </CustomText>
                        <CustomText className="text-sm text-gray-700 text-center w-11/12 mx-auto mt-3">
                            {languages('prepare_step_9_sedcription')}
                        </CustomText>
                    </div>

                    {/* Check Buttons */}
                    <div className="flex flex-col items-center justify-center h-52 space-y-2">
                        <CheckBtn
                            func={() => this.setState({ isCheckFull: !isCheckFull })}
                            isCheck={isCheckFull}
                            title={languages('btn_check_1')}
                        />
                        <CheckBtn
                            func={() => this.setState({ isCheckClear: !isCheckClear })}
                            isCheck={isCheckClear}
                            title={languages('btn_check_2')}
                            btnStyle="mt-2"
                        />
                    </div>
                </div>

                {/* Footer */}
                <div className="flex justify-center">
                    <Footer
                        nextFunc={this.onPressNextStep}
                        screenCount={9}
                        line="w-3/4"
                        backFunc={() => this.setState({ isCloseModal: true })}
                    />
                </div>

                {/* Modals */}
                <CloseModal
                    visible={this.state.isCloseModal}
                    closeFunc={this.onPressCloseAnalysis}
                    resumeFunc={() => this.setState({ isCloseModal: false })}
                />
                <HelpModal
                    visible={this.state.isHelpModal}
                    description={languages('help_modal_txt_step_9')}
                    closeFunc={() => this.setState({ isHelpModal: false })}
                />
            </div>
        );
    }
};

export default NineStep;
