import React, { useState, useEffect } from 'react';
import { ImageBackground, View, StatusBar, BackHandler, I18nManager, Platform } from 'react-native';
import DropdownAlert from 'react-native-dropdownalert';
import DeviceInfo from 'react-native-device-info';
import Toast from 'react-native-simple-toast';

import LoadingModal from '../../../Components/CustomModal/LoadingModal/LoadingModal';
import { auto_back, auto_back_rtl } from '../../../Components/Images/Images';
import SimpleButton from '../../../Components/CustomButton/SimpleButton';
import CustomInput from '../../../Components/CustomInput/CustomInput';
import CustomText from '../../../Components/CustomText/CustomText';
import { findMessages } from '../../../Filters/Filters';
import colors from '../../../Assets/Styles/Colors';
import Storage from '../../../Factories/Storage';
import language from '../../../Assets/i18n/i18n';
import { Url } from '../../../Configs/Urls';
import Store from '../../../Store/Store';
import styles from './Styles';

let dropDownAlert;
let storage = new Storage();
function ConfirmCode(props) {
    const [params] = useState(JSON.parse(props.match.params.userId));
    const [isLoading, setIsLoading] = useState(false);
    const [back, setBack] = useState(auto_back_rtl);
    const [code, setCode] = useState('');

    useEffect(() => {
        const backAction = () => {
            props.history.goBack()
            return true;
        };
        if (!I18nManager.isRTL) {
            setBack(auto_back);
        }
        const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);
        return () => backHandler.remove();
    }, []);

    const onPressSubmit = () => {
        if (!code) {
            dropDownAlert.alertWithType('warn', 'لطفا کد دریافتی را وارد کنید');
        } else {
            setIsLoading(true);
            doConfirmCode(code);
        }
    }

    const doConfirmCode = async (code) => {
        try {
            const response = await fetch(`${Url.serverUrl}Auth/signup/confirm/`, {
                method: 'POST',
                headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    "user_id": params.userId,
                    "confirm_code": code
                })
            });
            const responseJson = await response.json();
            findMessages(responseJson.detail, message => {
                Toast.show(message);
            });
            if (responseJson.detail) {
                doLogin();
            }
        } catch (error) {
            Toast.show(`${error.message}`);
            setIsLoading(false);
        }
    }

    const doLogin = async () => {
        let model = DeviceInfo.getModel();
        try {
            const response = await fetch(`${Url.serverUrl}Auth/login/`, {
                method: 'POST', headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    "platform": Platform.OS,
                    "mac": params.mac,
                    "model": model,
                    "email": params.email,
                    "password": params.password
                })
            });
            const responseJson = await response.json();
            setIsLoading(false);
            findMessages(responseJson.detail, message => {
                Toast.show(message);
            });
            const token = responseJson.token;
            if (token) {
                storage.set("Token", token);
                Store.setToken(token);
                props.history.push('/tabBar');
            }
        } catch (error) {
            setIsLoading(false);
        }
    }

    return (
        <ImageBackground style={styles.container} source={back}>
            <StatusBar backgroundColor={colors.dark_green} barStyle={'light-content'} />
            <DropdownAlert
                ref={ref => dropDownAlert = ref}
                inactiveStatusBarBackgroundColor={colors.dark_green}
                titleStyle={{ fontFamily: 'iranyekanwebbold(fanum)', fontSize: 12, color: colors.white }}
            />
            <View style={styles.top} />
            <View style={styles.center}>
                <View style={styles.center_top}>
                    <CustomText font_weight={'bold'} style={styles.center_top_title}>
                        تایید کد دریافتی
                    </CustomText>
                </View>
                <View style={styles.center_bottom}>
                    <View style={styles.center_bottom_view}>
                        <CustomInput
                            placeholder={'کد دریافتی'}
                            event={(value) => setCode(value)}
                            keyboardType={'default'}
                            onSubmitEditing={onPressSubmit}
                            mode={'password'}
                        />
                        <SimpleButton
                            func={onPressSubmit}
                            title={'تایید کد'}
                            btnStyle={{ marginVertical: 15 }}
                        />
                    </View>
                </View>
            </View>
            <View style={styles.bottom} />
            <LoadingModal isVisible={isLoading} />
        </ImageBackground>
    );
};
export default ConfirmCode;