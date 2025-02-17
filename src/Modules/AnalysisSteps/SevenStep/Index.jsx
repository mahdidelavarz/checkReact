import React, { Component } from 'react';
import { BackHandler, TouchableOpacity, Image } from 'react-native';
import DropdownAlert from 'react-native-dropdownalert';

import HelpHeader from '../../../Components/Analysis/HelpHeader/HelpHeader';
import CloseModal from '../../../Components/Analysis/CloseModal/CloseModal';
import HelpModal from '../../../Components/Analysis/HelpModal/HelpModal';
import CheckBtn from '../../../Components/Analysis/CheckBtn/CheckBtn';
import CustomText from '../../../Components/CustomText/CustomText';
import { CupFill } from '../../../Components/Images/Images';
import Footer from '../../../Components/Analysis/Footer/Footer';
import colors from '../../../Assets/Styles/Colors';
import languages from '../../../Assets/i18n/i18n';

class SevenStep extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isCloseModal: false,
            isHelpModal: false,
            isCheck: false,
            icCheck2: false
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
        if (!this.state.isCheck || !this.state.icCheck2) {
            this.dropDownAlert.alertWithType('warn', languages('step_alert'));
        } else {
            this.props.history.push('/eightStep');
        }
    }

    render() {
        const { isCheck, icCheck2 } = this.state;
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
                    count={7}
                />
                <div className="flex-1 flex flex-col">
                    <div className="h-50 justify-center items-center pr-3">
                        <Image style={{ width: width / 3, height: width / 3, resizeMode: 'contain' }} source={CupFill} />
                    </div>
                    <div className="h-50 flex items-center justify-between">
                        <CustomText font_weight={'bold'} className="text-dark-txt text-lg text-center">
                            {languages('sampling')}
                        </CustomText>
                        <CustomText className="text-dark-txt text-sm text-center w-9/10 self-center">
                            {languages('prepare_slide_description')}
                        </CustomText>
                    </div>
                    <div className="mt-5 h-30 flex items-center justify-around">
                        <CheckBtn
                            func={() => this.setState({ icCheck2: !icCheck2 })}
                            isCheck={icCheck2}
                            title={languages('sample_removed_2')}
                        />
                        <CheckBtn
                            func={() => this.setState({ isCheck: !isCheck })}
                            isCheck={isCheck}
                            title={languages('sample_removed')}
                        />
                    </div>
                </div>
                <div className="justify-center">
                    <Footer
                        nextFunc={this.onPressNextStep}
                        screenCount={7}
                        line={'55%'}
                        backFunc={() => this.setState({ isCloseModal: true })}
                    />
                </div>
                <CloseModal
                    visible={this.state.isCloseModal}
                    closeFunc={this.onPressCloseAnalysis}
                    resumeFunc={() => this.setState({ isCloseModal: false })}
                />
                <HelpModal
                    description={languages('help_modal_txt_step_7')}
                    visible={this.state.isHelpModal}
                    closeFunc={() => this.setState({ isHelpModal: false })}
                />
            </div>
        );
    }
};

export default SevenStep;
