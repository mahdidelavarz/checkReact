import React, { Component } from 'react';
import { View, BackHandler, Text, ProgressBarAndroid } from 'react-native';
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
import styles from './Styles';

class FiveStep extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isCloseModal: false,
            isHelpModal: false,
            isLoading: false,
            isCheck: false,
            timeTotal: 1200, //1200, بیست دقیقه زمان برای آماده شدن نمونه
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
    }

    handleBackButtonClick = () => {
        this.setState({ isCloseModal: false });
        return true;
    }

    _timeShow = () => {
        let timeDown = this.state.timeTotal;
        let minute = 0;
        let second = 0;
        timeDown = timeDown - 1;
        if (timeDown == 0) {
            this.setState({ timeSecond: 0 });
            clearTimeout(this.timer);
        } else {
            if (timeDown > 60) {
                minute = Math.floor(timeDown / 60);
                second = timeDown - minute * 60;
                if (second == 0) {
                    second = 59
                    minute = minute - 1;
                }
            } else {
                second = timeDown;
            }
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
            clearTimeout(this.timer)
            this.props.history.push('/sixStep');
        }
    }

    render() {
        const { isCheck, timeMinute, timeSecond } = this.state;
        if (this.state.isLoading) {
            return (
                <Loading />
            )
        } else {
            return (
                <View style={styles.container}>
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
                    <View style={styles.content}>
                        <View style={styles.top}>
                            <View style={[styles.top_circle,
                            { borderColor: timeMinute == 0 && timeSecond == 0 ? colors.green : colors.ligh_txt }]}
                            >
                                <Text style={styles.top_circle_timer}>
                                    {timeMinute > 9 ? timeMinute : "0" + timeMinute}
                                    {" " + ":" + " "}
                                    {timeSecond > 9 ? timeSecond : "0" + timeSecond}
                                </Text>
                            </View>
                            <ProgressBarAndroid
                                styleAttr='Horizontal'
                                animating={true}
                                indeterminate={timeMinute == 0 && timeSecond == 0 ? false : true}
                                progress={1}
                                style={{ width: '20%', height: timeMinute == 0 && timeSecond == 0 ? 1 : 5 }}
                            />
                        </View>
                        <View style={styles.description}>
                            <CustomText style={styles.description_title}>
                                {languages('sample_maintenance')}
                            </CustomText>
                            <CustomText style={styles.description_txt}>
                                {languages('twenty_minutes_wait')}
                            </CustomText>
                        </View>
                        <View style={styles.check}>
                            <CheckBtn
                                func={() => this.setState({ isCheck: !isCheck })}
                                isCheck={isCheck}
                                title={languages('already_ready')}
                            />
                        </View>
                        <View style={styles.footer}>
                            <Footer
                                nextFunc={this.onPressNextStep}
                                screenCount={5}
                                line={'35%'}
                                backFunc={() => this.setState({ isCloseModal: true })}
                            />
                        </View>
                    </View>
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
                </View>
            );
        }
    }
};
export default FiveStep;