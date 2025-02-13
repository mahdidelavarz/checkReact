import React, { useState, useEffect } from 'react';
import { ImageBackground, View, StatusBar, BackHandler, I18nManager, Alert } from 'react-native';
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
import { Url } from '../../../Configs/Urls';
import styles from './Styles';

let dropDownAlert;
function ForgotPassword(props) {
    const [back, setBack] = useState(auto_back_rtl);
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState('');

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
        if (!email) {
            dropDownAlert.alertWithType('warn', 'ایمیل را وارد کنید');
        } else {
            NetInfo.fetch().then(state => {
                if (state.isConnected) {
                    setIsLoading(true);
                    passwordReset(email);
                } else {
                    Alert.alert("عدم دسترسی به اینترنت", "لطفا اتصال به اینترنت را چک کنید.",
                        [{ text: "متوجه شدم" }],
                        { cancelable: false }
                    );
                }
            });
        }
    }

    const passwordReset = async (email) => {
        try {
            const response = await fetch(`${Url.serverUrl}Auth/password/reset/request/`, {
                method: 'POST',
                headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    "email": email.toLowerCase()
                })
            });
            const responseJson = await response.json();
            setIsLoading(false);
            findMessages(responseJson.detail, message => {
                Toast.show(message);
            });
            if (responseJson.detail) {
                Toast.show("کد تغییر رمز عبور به ایمیلتان ارسال شد");
                props.history.push("/newPassword");
            }
        } catch (error) {
            setIsLoading(false);
            Toast.show(`${error.message}`);
        }
    }

    return (
        <ImageBackground style={styles.container} source={back}>
            <StatusBar backgroundColor={colors.dark_green} barStyle={'light-content'} />
            <DropdownAlert
                ref={ref => dropDownAlert = ref}
                closeInterval={2000}
                inactiveStatusBarBackgroundColor={colors.dark_green}
                titleStyle={{ fontFamily: 'iranyekanwebbold(fanum)', fontSize: 12, color: colors.white }}
            />
            <View style={styles.top} />
            <View style={styles.center}>
                <View style={styles.center_top}>
                    <CustomText font_weight={'bold'} style={styles.center_top_title}>
                        فراموشی رمز عبور
                    </CustomText>
                </View>
                <View style={styles.center_bottom}>
                    <View style={styles.center_bottom_view}>
                        <CustomInput
                            placeholder={'ایمیل را وارد کنید'}
                            event={(value) => setEmail(value)}
                            keyboardType={'email-address'}
                            onSubmitEditing={passwordReset}
                        />
                        <SimpleButton
                            func={onPressSubmit}
                            title={'تایید'}
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
export default ForgotPassword;