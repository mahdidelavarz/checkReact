import React, { Component } from 'react';
import { BackHandler, Image } from 'react-native';
import DropdownAlert from 'react-native-dropdownalert';

import HelpHeader from '../../../Components/Analysis/HelpHeader/HelpHeader';
import CloseModal from '../../../Components/Analysis/CloseModal/CloseModal';
import HelpModal from '../../../Components/Analysis/HelpModal/HelpModal';
import CheckBtn from '../../../Components/Analysis/CheckBtn/CheckBtn';
import CustomText from '../../../Components/CustomText/CustomText';
import Footer from '../../../Components/Analysis/Footer/Footer';
import { ic_cup } from '../../../Components/Images/Images';
import colors from '../../../Assets/Styles/Colors';
import languages from '../../../Assets/i18n/i18n';

class ThirdStep extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isCheck: false,
            isHelpModal: false,
            isCloseModal: false,
        }
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
            this.props.history.push('/fourStep');
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
                    closeFunc={() => this.setState({ isCloseModal: true })}
                    helpFunc={() => this.setState({ isHelpModal: true })}
                    count={3}
                />
                <div className="flex-1">
                    <div className="h-[300px] flex items-center justify-evenly">
                        <Image style={{ width:  width / 1.7, height: width / 1.7 }} source={ic_cup} />
                        <CustomText style="text-lg text-dark_txt">
                            {languages('collect_sample_head')}
                        </CustomText>
                    </div>
                    <div className="h-[250px] justify-center">
                        <CustomText className="w-[90%] text-center text-sm self-center">
                            {languages('collect_sample_description')}
                        </CustomText>
                    </div>
                    <div className="h-[100px] flex items-center justify-center">
                        <CheckBtn
                            func={() => this.setState({ isCheck: !isCheck })}
                            isCheck={isCheck}
                            title={languages('sample_full')}
                            btnStyle="ml-1 mr-1"
                        />
                    </div>
                </div>
                <div className="flex justify-end">
                    <Footer
                        nextFunc={this.onPressNextStep}
                        screenCount={3}
                        line="20%"
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
                    description={languages("help_modal_txt_step_3")}
                    closeFunc={() => this.setState({ isHelpModal: false })}
                />
            </div>
        );
    }
};
export default ThirdStep;
