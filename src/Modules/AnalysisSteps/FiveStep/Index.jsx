import React, { Component } from 'react';
import { BackHandler } from 'react-native';
import DropdownAlert from 'react-native-dropdownalert';

import HelpHeader from '../../../Components/Analysis/HelpHeader/HelpHeader';
import CloseModal from '../../../Components/Analysis/CloseModal/CloseModal';
import HelpModal from '../../../Components/Analysis/HelpModal/HelpModal';
import CheckBtn from '../../../Components/Analysis/CheckBtn/CheckBtn';
import CustomText from '../../../Components/CustomText/CustomText';
import Footer from '../../../Components/Analysis/Footer/Footer';
import Loading from '../../../Components/Loading/Loading';
import colors from '../../../Assets/Styles/Colors';
import languages from '../../../Assets/i18n/i18n';

class FiveStep extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isCloseModal: false,
            isHelpModal: false,
            isLoading: false,
            isCheck: false,
            timeTotal: 1200, // 20 minutes timer
            timeMinute: '',
            timeSecond: ''
        };
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
        this.setState({ isLoading: true })
        this.timer = setInterval(() => {
            this._timeShow();
        }, 1000);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
        clearInterval(this.timer);
    }

    handleBackButtonClick = () => {
        this.setState({ isCloseModal: false });
        return true;
    }

    _timeShow = () => {
        let timeDown = this.state.timeTotal - 1;
        let minute = Math.floor(timeDown / 60);
        let second = timeDown % 60;

        if (timeDown <= 0) {
            clearInterval(this.timer);
            this.setState({ timeSecond: 0 });
        } else {
            this.setState({
                timeTotal: timeDown,
                timeMinute: minute,
                timeSecond: second,
                isLoading: false
            });
        }
    }

    onPressNextStep = () => {
        if (!this.state.isCheck) {
            this.dropDownAlert.alertWithType('warn', languages('after_twenty'));
        } else {
            clearInterval(this.timer);
            this.props.history.push('/sixStep');
        }
    }

    render() {
        const { isCheck, timeMinute, timeSecond, isLoading } = this.state;
        if (isLoading) return <Loading />;

        return (
            <div className="flex flex-col h-screen bg-white">
                <DropdownAlert
                    ref={ref => this.dropDownAlert = ref}
                    inactiveStatusBarBackgroundColor={colors.dark_green}
                    titleStyle={{ fontFamily: 'iranyekanwebbold(fanum)', fontSize: 12, color: colors.white, textAlign: 'left' }}
                />
                <HelpHeader
                    closeFunc={() => this.setState({ isCloseModal: true })}
                    helpFunc={() => this.setState({ isHelpModal: true })}
                    count={5}
                />
                <div className="flex flex-col flex-1 items-center justify-around p-4">
                    <div className="flex flex-col items-center justify-center border-4 w-20 h-20 rounded-full"
                        style={{ borderColor: timeMinute === 0 && timeSecond === 0 ? colors.green : colors.ligh_txt }}>
                        <span className="text-lg font-bold text-gray-700">
                            {timeMinute > 9 ? timeMinute : "0" + timeMinute}:{timeSecond > 9 ? timeSecond : "0" + timeSecond}
                        </span>
                    </div>
                    <div className="w-full text-center">
                        <CustomText className="text-lg text-gray-700 font-semibold">
                            {languages('sample_maintenance')}
                        </CustomText>
                        <CustomText className="text-sm text-gray-700 mx-auto w-4/5">
                            {languages('twenty_minutes_wait')}
                        </CustomText>
                    </div>
                    <CheckBtn
                        func={() => this.setState({ isCheck: !isCheck })}
                        isCheck={isCheck}
                        title={languages('already_ready')}
                    />
                    <Footer
                        nextFunc={this.onPressNextStep}
                        screenCount={5}
                        line={'35%'}
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
                    description={languages('help_modal_txt_step_5')}
                    closeFunc={() => this.setState({ isHelpModal: false })}
                />
            </div>
        );
    }
}

export default FiveStep;
