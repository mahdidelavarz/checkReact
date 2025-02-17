import React, { Component } from 'react';
import { BackHandler, TouchableOpacity, Image } from 'react-native';
import DropdownAlert from 'react-native-dropdownalert';

import HelpHeader from '../../../Components/Analysis/HelpHeader/HelpHeader';
import CloseModal from '../../../Components/Analysis/CloseModal/CloseModal';
import HelpModal from '../../../Components/Analysis/HelpModal/HelpModal';
import CheckBtn from '../../../Components/Analysis/CheckBtn/CheckBtn';
import CustomText from '../../../Components/CustomText/CustomText';
import { attachGadget } from '../../../Components/Images/Images';
import Footer from '../../../Components/Analysis/Footer/Footer';
import colors from '../../../Assets/Styles/Colors';
import languages from '../../../Assets/i18n/i18n';

class SixStep extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isCloseModal: false,
            isHelpModal: false,
            isCheck: false,
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
        if (!this.state.isCheck) {
            this.dropDownAlert.alertWithType('warn', languages('step_alert'));
        } else {
            this.props.history.push('/sevenStep');
        }
    }

    render() {
        const { isCheck } = this.state;
        return (
            <div className="flex-1 bg-white">
                <DropdownAlert 
                    ref={ref => this.dropDownAlert = ref}
                    inactiveStatusBarBackgroundColor={colors.dark_green}
                    titleStyle={{ fontFamily: 'iranyekanwebbold(fanum)', fontSize: 12, color: colors.white }}
                />
                <HelpHeader
                    closeFunc={() => this.setState({ sCloseModal: true })}
                    helpFunc={() => this.setState({ isHelpModal: true })}
                    count={6}
                />
                <div className="flex-1">
                    <div className="h-50 justify-center items-center">
                        <Image style={{ width: width / 1.9, height: width / 1.9, resizeMode: 'contain' }} source={attachGadget} />
                    </div>
                    <div className="mt-2 flex items-center justify-between">
                        <CustomText font_weight={'bold'} className="text-dark-txt text-lg text-center my-5">
                            {languages('connect_gadget')}
                        </CustomText>
                        <CustomText className="text-dark-txt text-sm text-center w-9/10 self-center">
                            {languages('purchased_gadget_description')}
                        </CustomText>
                    </div>
                    <div className="h-40 flex items-center justify-center">
                        <CheckBtn
                            func={() => this.setState({ isCheck: !isCheck })}
                            isCheck={isCheck}
                            title={languages('gadget_check')}
                            btnStyle="p-6 w-11/12"
                        />
                    </div>
                </div>
                <div className="justify-center">
                    <Footer 
                        nextFunc={this.onPressNextStep}
                        screenCount={6}
                        line={'45%'}
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
                    description={languages('help_modal_txt_step_6')}
                    closeFunc={() => this.setState({ isHelpModal: false })}
                />
            </div>
        );
    }
};

export default SixStep;
