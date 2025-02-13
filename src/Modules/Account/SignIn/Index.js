import React, { Component } from 'react';
import { div, ImageBackground, StatusBar, BackHandler, Alert, Platform, I18nManager } from 'react-native';
import DropdownAlert from 'react-native-dropdownalert';
import NetInfo from '@react-native-community/netinfo';
import DeviceInfo from 'react-native-device-info';
import Toast from 'react-native-simple-toast';
import { Link } from 'react-router-native';

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
import Store from '../../../Store/Store';
import styles from './Styles';

let storage = new Storage();
class SignIn extends Component {
    constructor(props) {
        super(props);
        this.dropDownAlert = null;
        this.focusNextField = this.focusNextField.bind(this);
        this.inputs = {};
        this.state = {
            // email: "pouria.khazaee@gmail.com",
            // password: "12345678",
            email: "",
            password: "",
            back: auto_back_rtl,
            isLoading: false
        }
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

    onPressLogIn = () => {
        const { email, password } = this.state;
        if (!email) {
            this.dropDownAlert.alertWithType('warn', 'لطفا ایمیل خود را وارد کنید');
        } else if (!password) {
            this.dropDownAlert.alertWithType('warn', 'لطفا پسورد را وارد کنید');
        } else {
            NetInfo.fetch().then(state => {
                if (state.isConnected) {
                    this.setState({ isLoading: true });
                    DeviceInfo.getMacAddress().then(macAddress => {
                        this.doLogin(macAddress, email, password);
                    });
                } else {
                    Alert.alert("عدم دسترسی به اینترنت", "لطفا اتصال به اینترنت را چک کنید.",
                        [{ text: "متوجه شدم" }],
                        { cancelable: false }
                    );
                }
            });
        }
    }

    async doLogin(macAddress, email, password) {
        let model = DeviceInfo.getModel();
        // console.log("res", Platform.OS, macAddress, model, email, password)
        try {
            const response = await
                fetch(`${Url.serverUrl}Auth/login/`, {
                    method: 'POST', headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        "platform": Platform.OS,
                        "mac": macAddress,
                        "model": model,
                        "email": email.toLowerCase(),
                        "password": password
                    })
                });
            const responseJson = await response.json();
            const token = responseJson.token;
            if (token) {
                storage.set("Token", token);
                Store.setToken(token);
                this.props.history.push('/tabBar');
            }
            findMessages(responseJson.detail, message => {
                Toast.show(message);
            });
            this.setState({ isLoading: false });
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
                            {language('login')}
                        </CustomText>
                    </div>
                    <div style={styles.center_bottom}>
                        <div style={styles.center_bottom_view}>
                            <CustomInput
                                placeholder={language('email')}
                                event={(value) => this.setState({ email: value })}
                                keyboardType={'email-address'}
                                autoCapitalize={'none'}
                                onSubmitEditing={() => { this.focusNextField('password') }}
                            />
                            <CustomInput
                                placeholder={language('password')}
                                event={(value) => this.setState({ password: value })}
                                keyboardType={'default'}
                                onRef={(ref) => { this.inputs['password'] = ref }}
                                onSubmitEditing={this.onPressLogIn}
                                mode={'password'}
                            />
                            <SimpleButton
                                func={this.onPressLogIn}
                                title={language('login')}
                                btnStyle={{ marginVertical: 15 }}
                            />
                            <Link to={'/forgotPassword'} underlayColor={'transparnet'}>
                                <CustomText style={styles.forgot_pass_txt}>فراموشی رمز عبور؟</CustomText>
                            </Link>
                            <Link to={'/signUp'} underlayColor={'transparnet'}>
                                <CustomText style={styles.forgot_pass_txt}>ثبت نام نکرده اید؟</CustomText>
                            </Link>
                        </div>
                    </div>
                </div>
                <div style={styles.bottom} />
                <LoadingModal isVisible={this.state.isLoading} />
            </ImageBackground>
        );
    }
};
export default SignIn;