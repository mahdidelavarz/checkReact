import React, { useState, useEffect } from 'react';
import { ImageBackground, div, StatusBar, BackHandler, I18nManager } from 'react-native';
import DropdownAlert from 'react-native-dropdownalert';
import NetInfo from '@react-native-community/netinfo';
import Toast from 'react-native-simple-toast';

import LoadingModal from '../../../Components/CustomModal/LoadingModal/LoadingModal';
import { auto_back, auto_back_rtl } from '../../../Components/Images/Images';
import SimpleButton from '../../../Components/CustomButton/SimpleButton';
import CustomInput from '../../../Components/CustomInput/CustomInput';
import CustomText from '../../../Components/CustomText/CustomText';
import { findMessages } from '../../../Filters/Filters';
import colors from '../../../Assets/Styles/Colors';
import language from '../../../Assets/i18n/i18n';
import Storage from '../../../Factories/Storage';
import { Url } from '../../../Configs/Urls';
import styles from './Styles';

class NewPassword extends React.Component {
    constructor(props) {
        super(props);
        this.focusNextField = this.focusNextField.bind(this);
        this.dropDownAlert = null;
        this.inputs = {};
        this.state = {
            back: auto_back_rtl,
            isLoading: false,
            confirm_password: '',
            new_password: '',
            email: ''
        };
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
        if (!I18nManager.isRTL) {
            this.setState({ back: auto_back });
        }
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    handleBackButtonClick = () => {
        this.props.history.goBack();
        return true;
    }

    focusNextField(id) {
        this.inputs[id].focus();
    }

    onPressChangePassword = () => {
        const { email, confirm_password, new_password } = this.state;
        NetInfo.fetch().then(state => {
            if (state.isConnected) {
                if (!email) {
                    this.dropDownAlert.alertWithType('warn', 'لطفا ایمیل را وارد کنید');
                } else if (!confirm_password) {
                    this.dropDownAlert.alertWithType('warn', 'لطفا کد ارسالی  به ایمیل را وارد کنید');
                } else if (!new_password) {
                    this.dropDownAlert.alertWithType('warn', 'لطفا رمز جدید را وارد کنید');
                } else if (new_password.length < 8) {
                    this.dropDownAlert.alertWithType('warn', 'گذرواژه حداقل باید 8 عدد یا حروف باشد');
                } else {
                    this.changePassword(email, confirm_password, new_password);
                }
            } else {
                Alert.alert("عدم دسترسی به اینترنت", "لطفا اتصال به اینترنت را چک کنید.",
                    [{ text: "متوجه شدم" }],
                    { cancelable: false }
                );
            }
        });
    }

    async changePassword(email, confirm_password, new_password) {
        this.setState({ isLoading: true });
        try {
            const response = await fetch(`${Url.serverUrl}Auth/password/reset/confirm/`, {
                method: 'POST',
                headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    "email": email.toLowerCase(),
                    "confirm_code": confirm_password,
                    "new_password": new_password
                })
            });
            const responseJson = await response.json();
            this.setState({ isLoading: false });
            findMessages(responseJson.detail, message => {
                Toast.show(message);
            });
            if (responseJson.detail) {
                this.props.history.push("/SignIn");
            }
        } catch (error) {
            this.setState({ isLoading: false });
        }
    }

    render() {
        return (
            <ImageBackground style={styles.container} source={this.state.back}>
                <DropdownAlert
                    ref={ref => this.dropDownAlert = ref}
                    inactiveStatusBarBackgroundColor={colors.dark_green}
                    titleStyle={{ fontFamily: 'iranyekanwebbold(fanum)', fontSize: 12, color: colors.white }}
                />
                <StatusBar backgroundColor={colors.dark_green} barStyle={'light-content'} />
                <div style={styles.top} />
                <div style={styles.center}>
                    <div style={styles.center_top}>
                        <CustomText font_weight={'bold'} style={styles.center_top_title}>
                            تغییر رمز
                        </CustomText>
                    </div>
                    <div style={styles.center_bottom}>
                        <div style={styles.center_bottom_view}>
                            <CustomInput
                                placeholder={language('email')}
                                event={(value) => this.setState({ email: value })}
                                keyboardType={'email-address'}
                                autoCapitalize={'none'}
                                onSubmitEditing={() => { this.focusNextField('confirm_password') }}
                            />
                            <CustomInput
                                placeholder={'کد دریافتی'}
                                event={(value) => this.setState({ confirm_password: value })}
                                keyboardType={'default'}
                                onRef={(ref) => { this.inputs['confirm_password'] = ref }}
                                onSubmitEditing={() => { this.focusNextField('new_password') }}
                                mode={'password'}
                            />
                            <CustomInput
                                placeholder={'رمز جدید'}
                                event={(value) => this.setState({ new_password: value })}
                                keyboardType={'default'}
                                onRef={(ref) => { this.inputs['new_password'] = ref }}
                                onSubmitEditing={this.onPressChangePassword}
                                mode={'password'}
                            />
                            <SimpleButton
                                func={this.onPressChangePassword}
                                title={'تغییر'}
                                btnStyle={styles.btn}
                            />
                        </div>
                    </div>
                </div>
                <div style={styles.bottom} />
                <LoadingModal isVisible={this.state.isLoading} />
            </ImageBackground>
        );
    }
};
export default NewPassword;