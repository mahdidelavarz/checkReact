import React, { Component } from 'react';
import { BackHandler } from 'react-native';
import DropdownAlert from 'react-native-dropdownalert';

import HelpHeader from '../../../Components/Analysis/HelpHeader/HelpHeader';
import CloseModal from '../../../Components/Analysis/CloseModal/CloseModal';
import HelpModal from '../../../Components/Analysis/HelpModal/HelpModal';
import CheckBtn from '../../../Components/Analysis/CheckBtn/CheckBtn';
import CustomText from '../../../Components/CustomText/CustomText';
import { prepareSlide } from '../../../Components/Images/Images';
import Footer from '../../../Components/Analysis/Footer/Footer';
import colors from '../../../Assets/Styles/Colors';
import languages from '../../../Assets/i18n/i18n';

class EightStep extends Component {
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
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    handleBackButtonClick = () => {
        this.setState({ isCloseModal: false });
        return true;
    }

    onPressNextStep = () => {
        if (!this.state.isCheckFull) {
            this.dropDownAlert.alertWithType('warn', languages('step_alert'));
        } else if (!this.state.isCheckClear) {
            this.dropDownAlert.alertWithType('warn', languages('step_alert'));
        } else {
            this.props.history.push('/nineStep');
        }
    }

    render() {
        const { isCheckFull, isCheckClear } = this.state;
        return (
            <div className="flex-1 bg-white">
                <DropdownAlert
                    ref={ref => this.dropDownAlert = ref}
                    inactiveStatusBarBackgroundColor={colors.dark_green}
                    titleStyle="text-sm font-bold text-white"
                />
                <HelpHeader
                    closeFunc={() => this.setState({ isCloseModal: true })}
                    helpFunc={() => this.setState({ isHelpModal: true })}
                    count={8}
                />
                <div className="flex-1 flex-col">
                    <div className="h-50 justify-center items-center pr-4">
                        <img className="w-[40%] h-[40%] object-contain" src={prepareSlide} alt="Prepare Slide" />
                    </div>
                    <div className="items-center justify-between">
                        <CustomText font_weight="bold" className="text-lg text-dark_txt text-center mt-4">
                            {languages('fill_sample')}
                        </CustomText>
                        <CustomText className="text-xs text-dark_txt text-center w-[90%] self-center mt-4">
                            {languages('prepare_step_8_sedcription')}
                        </CustomText>
                    </div>
                    <div className="h-36 items-center justify-center">
                        <CheckBtn
                            func={() => this.setState({ isCheckFull: !isCheckFull })}
                            isCheck={isCheckFull}
                            title={languages('container_check_1')}
                        />
                        <CheckBtn
                            func={() => this.setState({ isCheckClear: !isCheckClear })}
                            isCheck={isCheckClear}
                            title={languages('container_check_2')}
                            btnStyle="mt-2"
                        />
                    </div>
                </div>
                <div className="justify-center">
                    <Footer
                        nextFunc={this.onPressNextStep}
                        screenCount={8}
                        line="w-[65%]"
                        backFunc={() => this.setState({ isCloseModal: true })}
                    />
                </div>
                <CloseModal
                    visible={this.state.isCloseModal}
                    closeFunc={this.onPressCloseAnalysis}
                    resumeFunc={() => this.setState({ isCloseModal: false })}
                />
                <HelpModal
                    visible={this.state.isHelpModal}
                    description={languages('help_modal_txt_step_8')}
                    closeFunc={() => this.setState({ isHelpModal: false })}
                />
            </div>
        );
    }
}

export default EightStep;
