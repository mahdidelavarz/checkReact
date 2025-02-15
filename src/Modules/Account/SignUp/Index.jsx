import React, { Component } from 'react';
import { ImageBackground, StatusBar, BackHandler, I18nManager, Alert, Platform } from 'react-native';
import DropdownAlert from 'react-native-dropdownalert';
import NetInfo from '@react-native-community/netinfo';
import DeviceInfo from 'react-native-device-info';
import Toast from 'react-native-simple-toast';

import LoadingModal from '../../../Components/CustomModal/LoadingModal/LoadingModal';
import { auto_back, auto_back_rtl } from '../../../Components/Images/Images';
import SimpleButton from '../../../Components/CustomButton/SimpleButton';
import CustomInput from '../../../Components/CustomInput/CustomInput';
import CustomText from '../../../Components/CustomText/CustomText';
import { findMessages } from '../../../Filters/Filters';
import colors from '../../../Assets/Styles/Colors';
import language from '../../../Assets/i18n/i18n';
import { Url } from '../../../Configs/Urls';

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.input = {};
        this.state = {
            back: auto_back_rtl,
            email: '',
            password: '',
            confirmPass: '',
            introCode: '',
            isLoading: false
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

    onPressSignUp = () => {
        const { email, password, confirmPass } = this.state;
        const emailCheck = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!email) {
            this.dropDownAlert.alertWithType('warn', 'لطفا ایمیل را وارد کنید');
        } else if (emailCheck.test(email) === false) {
            this.dropDownAlert.alertWithType('warn', 'ایمیل وارد شده صحیح نیست');
        } else if (!password) {
            this.dropDownAlert.alertWithType('warn', 'لطفا پسورد را وارد کنید');
        } else if (!confirmPass) {
            this.dropDownAlert.alertWithType('warn', 'لطفا تایید گذرواژه را وارد کنید');
        } else if (confirmPass != password) {
            this.dropDownAlert.alertWithType('warn', 'تایید گذرواژه با گذرواژه وارد شده مطابقت ندارد');
        } else if (confirmPass.length < 8) {
            this.dropDownAlert.alertWithType('warn', 'گذرواژه حداقل باید 8 عدد یا حروف باشد');
        } else {
            this.sendUserInfo(email, confirmPass);
        }
    }

    sendUserInfo = (email, confirmPass) => {
        NetInfo.fetch().then(state => {
            if (state.isConnected) {
                this.setState({ isLoading: true });
                DeviceInfo.getMacAddress().then(macAddress => {
                    this.doRegister(macAddress, email, confirmPass);
                });
            } else {
                Alert.alert("عدم دسترسی به اینترنت", "لطفا اتصال به اینترنت را چک کنید.",
                    [{ text: "متوجه شدم" }],
                    { cancelable: false }
                );
            }
        });
    }

    async doRegister(macAddress, email, confirmPass) {
        let deviceModel = DeviceInfo.getModel();
        try {
            const response = await fetch(`${Url.serverUrl}Auth/signup/`, {
                method: 'POST',
                headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    "platform": Platform.OS,
                    "model": deviceModel,
                    "mac": macAddress,
                    "email": email.toLowerCase(),
                    "password": confirmPass,
                })
            });
            const responseJson = await response.json();
            this.setState({ isLoading: false });
            findMessages(responseJson.detail, message => {
                Toast.show(message);
            });
            if (responseJson.id) {
                const model = {
                    "mac": macAddress,
                    "email": email,
                    "password": confirmPass,
                    "userId": responseJson.id
                };
                const params = JSON.stringify(model);
                this.props.history.push(`/confirmCode/${params}`);
            }
        } catch (error) {
            Toast.show(`${error.message}`);
            this.setState({ isLoading: false });
        }
    }

    render() {
        return (
            <ImageBackground style="flex-1 flex-col" source={this.state.back}>
                <StatusBar backgroundColor={colors.dark_green} barStyle={'light-content'} />
                <DropdownAlert
                    ref={ref => this.dropDownAlert = ref}
                    inactiveStatusBarBackgroundColor={colors.dark_green}
                    titleStyle="font-iranyekanwebbold(fanum) text-white text-sm"
                />
                <div className="flex-2.5" />
                <div className="flex-6 flex-col">
                    <div className="flex-1 justify-center">
                        <CustomText font_weight={'bold'} style="text-green text-xl ml-15">
                            {language('signup')}
                        </CustomText>
                    </div>
                    <div className="flex-9 items-center justify-center">
                        <div className="w-7/10">
                            <CustomInput
                                placeholder={language('email')}
                                event={(value) => this.setState({ email: value })}
                                keyboardType={'email-address'}
                                autoCapitalize={'none'}
                                onSubmitEditing={() => this.input['password'].focus()}
                            />
                            <CustomInput
                                placeholder={language('password')}
                                event={(value) => this.setState({ password: value })}
                                keyboardType={'default'}
                                mode={'password'}
                                onRef={(ref) => this.input['password'] = ref}
                                onSubmitEditing={() => this.input['confirm_password'].focus()}
                            />
                            <CustomInput
                                placeholder={language('confirm_password')}
                                event={(value) => this.setState({ confirmPass: value })}
                                keyboardType={'default'}
                                mode={'password'}
                                onRef={(ref) => this.input['confirm_password'] = ref}
                                onSubmitEditing={() => this.input['introCode'].focus()}
                            />
                            <CustomInput
                                placeholder={language('introduce') + language('optional')}
                                event={(value) => this.setState({ introCode: value })}
                                keyboardType={'default'}
                                onRef={(ref) => this.input['introCode'] = ref}
                                onSubmitEditing={() => this.onPressSignUp()}
                            />
                            <SimpleButton
                                func={this.onPressSignUp}
                                title={language('signup')}
                                btnStyle="mt-2.5"
                            />
                        </div>
                    </div>
                </div>
                <div className="flex-1.5" />
                <LoadingModal
                    isVisible={this.state.isLoading}
                />
            </ImageBackground>
        );
    }
};
export default SignUp;
