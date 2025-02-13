import React, { useEffect } from 'react';
import { ImageBackground, StatusBar, View, TouchableOpacity, Image, BackHandler, Linking } from 'react-native';
import SendIntentAndroid from 'react-native-send-intent';

import SimpleButton from '../../../Components/CustomButton/SimpleButton';
import { support_back, ic_back } from '../../../Components/Images/Images';
import CustomText from '../../../Components/CustomText/CustomText';
import colors from '../../../Assets/Styles/Colors';
import language from '../../../Assets/i18n/i18n';
import Store from '../../../Store/Store';
import styles from './Styles';

function ContactSupport(props) {

    useEffect(() => {
        const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);
        return () => backHandler.remove();
    }, []);

    const backAction = () => {
        Store.incrementTabBar();
        props.history.goBack();
        return true;
    }

    return (
        <ImageBackground style={styles.container} source={support_back}>
            <StatusBar backgroundColor={colors.dark_green} barStyle={'light-content'} />
            <View style={styles.top}>
                <TouchableOpacity activeOpacity={0.7} onPress={backAction} >
                    <Image style={styles.top_btn_ic} source={ic_back} />
                </TouchableOpacity>
            </View>
            <View style={styles.center}>
                <CustomText style={styles.center_txt}>نیاز به کمک دارید؟</CustomText>
                <CustomText style={styles.center_txt}>تیم پشتیبانی daddy check به صورت شبانه روزی پاسخگوی شماست</CustomText>
            </View>
            <View style={styles.bottom}>
                <SimpleButton
                    btnStyle={styles.bottom_btn}
                    title={'تماس با پشتیبانی'}
                    func={() => SendIntentAndroid.sendPhoneDial("02188223310", false)}
                />
                <SimpleButton
                    btnStyle={styles.bottom_btn}
                    title={'ارسال ایمیل'}
                    func={() => SendIntentAndroid.sendMail("etccosw@gmail.com", "", "")}
                />
                <SimpleButton
                    btnStyle={styles.bottom_btn}
                    title={'گفتگوی آنلاین'}
                    func={() => Linking.openURL("http://etcco.ir/")}
                />
            </View>
        </ImageBackground>
    );
};
export default ContactSupport;