import React, { Component } from 'react';
import { Linking, StatusBar, ImageBackground } from 'react-native';
import DropdownAlert from 'react-native-dropdownalert';
import Toast from 'react-native-simple-toast';
import { Link } from 'react-router-native';

import { auto_back, auto_back_rtl, about, ic_change_lang, ic_circle, ic_circle_check } from '../../Components/Images/Images';
import CustomText from '../../Components/CustomText/CustomText';
import colors from '../../Assets/Styles/Colors';
import language from '../../Assets/i18n/i18n';

class Conditions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isCheck: false
        }
    }

    nextStep = () => {
        if (!this.state.isCheck) {
            this.dropDownAlertRef.alertWithType('warn', language('notAcceptAlert'));
        } else {
            this.props.history.push('/logIn');
        }
    }

    render() {
        const { isCheck } = this.state;
        return (
            <ImageBackground className="flex-1 items-center justify-center pb-2" source={auto_back}>
                <DropdownAlert
                    ref={ref => this.dropDownAlertRef = ref}
                    inactiveStatusBarBackgroundColor={colors.dark_green}
                    titleStyle={{ fontFamily: 'iranyekanwebbold(fanum)', fontSize: 10, color: colors.white }}
                />
                <StatusBar backgroundColor={colors.dark_green} barStyle={'light-content'} />
                <div className="flex-1 justify-center">
                    <CustomText className="text-white text-center text-sm">
                        {language('term_title')}
                    </CustomText>
                </div>
                <button
                    className="absolute top-2 right-2 flex items-center justify-center"
                    onPress={() => Toast.show("این صفحه هنوز آماده نشده است")}
                >
                    <img className="w-6 h-6" src={ic_change_lang} />
                </button>
                {/* <Link to={'/languages/conditions'} underlayColor={'transparent'} className="absolute top-2 right-2 flex items-center justify-center">
                    <img className="w-6 h-6" src={ic_change_lang} />
                </Link> */}
                <div className="bg-white flex-9 w-11/12 rounded-lg border border-light_txt flex-col">
                    <div className="flex-2.2 items-center justify-around">
                        <img className="w-18 h-18" src={about} />
                        <CustomText className="font-bold text-base">
                            {language('term_head')}
                        </CustomText>
                    </div>
                    <div className="flex-6.5 p-2">
                        <div className="overflow-y-auto">
                            <CustomText className="text-light_txt text-xs leading-6 text-center">
                                {language('term')}
                            </CustomText>
                        </div>
                    </div>
                    <div className="flex-1.3 items-center justify-between pb-1">
                        <button
                            activeOpacity={0.6}
                            className="flex flex-row items-center justify-center"
                            onPress={() => this.setState({ isCheck: !this.state.isCheck })}
                        >
                            <img
                                className="w-5 h-5"
                                src={!isCheck ? ic_circle : ic_circle_check}
                            />
                            <CustomText className="text-xs ml-2 font-bold">
                                {language('accept')}
                            </CustomText>
                        </button>
                        <button
                            activeOpacity={0.8}
                            className="w-7/10 h-9 rounded-full items-center justify-center bg-green"
                            onPress={this.nextStep}
                        >
                            <CustomText className="text-white text-base">
                                {language('continue')}
                            </CustomText>
                        </button>
                    </div>
                </div>
            </ImageBackground>
        );
    }
};

export default Conditions;
