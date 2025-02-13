import React, { Component } from 'react';
import { View, ImageBackground, StatusBar, BackHandler, Alert, Platform, I18nManager } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import DeviceInfo from 'react-native-device-info';
import Toast from 'react-native-simple-toast';

import LoadingModal from '../../../Components/CustomModal/LoadingModal/LoadingModal';
import { auto_back, auto_back_rtl } from '../../../Components/Images/Images';
import SimpleButton from '../../../Components/CustomButton/SimpleButton';
import CustomText from '../../../Components/CustomText/CustomText';
import { findMessages } from '../../../Filters/Filters';
import ModalMsg from './Components/ModalMsg/ModalMsg';
import colors from '../../../Assets/Styles/Colors';
import language from '../../../Assets/i18n/i18n';
import Storage from '../../../Factories/Storage';
import { Url } from '../../../Configs/Urls';
import styles from './Styles';

let storage = new Storage();
class LogIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            back: auto_back_rtl,
            isLoading: false,
            isModal: false
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

    onPressDoAnonymous = () => {
        this.setState({
            isModal: false,
            isLoading: true
        });
        NetInfo.fetch().then(state => {
            if (state.isConnected) {
                DeviceInfo.getMacAddress().then(macAddress => {
                    this.doAnonymous(macAddress);
                });
            } else {
                Alert.alert("عدم دسترسی به اینترنت", "لطفا اتصال به اینترنت را چک کنید.",
                    [{ text: "متوجه شدم" }],
                    { cancelable: false }
                );
            }
        });
    }

    async doAnonymous(macAddress) {
        let model = DeviceInfo.getModel();
        try {
            const response = await
                fetch(`${Url.serverUrl}Auth/signup/anonymous/`, {
                    method: 'POST', headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        "platform": Platform.OS,
                        "model": model,
                        "mac": macAddress
                    })
                });
            const responseJson = await response.json();
            this.setState({ isLoading: false });
            findMessages(responseJson.detail, message => {
                Toast.show(message);
            });
            if (responseJson.token) {
                storage.set("Token", responseJson.token);
                this.props.history.push('/tabBar');
            }
        } catch (error) {
            this.setState({ isLoading: false });
        }
    }

    render() {
        return (
            <ImageBackground style={styles.container} source={this.state.back}>
                <StatusBar backgroundColor={colors.dark_green} barStyle={'light-content'} />
                <View style={styles.top} />
                <View style={styles.center}>
                    <View style={styles.center_top}>
                        <CustomText font_weight={'bold'} style={styles.center_top_title}>
                            {language('letStart')}
                        </CustomText>
                    </View>
                    <View style={styles.center_bottom}>
                        <View style={styles.center_bottom_view}>
                            <SimpleButton
                                func={() => this.props.history.push('/signIn')}
                                title={language('login')}
                                btnStyle={{ marginVertical: 15 }}
                            />
                            <SimpleButton
                                func={() => this.props.history.push('/signUp')}
                                title={language('signup')}
                                btnStyle={{ marginVertical: 15 }}
                            />
                            <SimpleButton
                                func={() => this.setState({ isModal: true })}
                                title={language('anonymous_sign_to_app')}
                                btnStyle={{ marginVertical: 15 }}
                            />
                        </View>
                    </View>
                </View>
                <View style={styles.bottom} />
                <ModalMsg
                    isVisible={this.state.isModal}
                    func={this.onPressDoAnonymous}
                />
                <LoadingModal
                    isVisible={this.state.isLoading}
                />
            </ImageBackground>
        );
    }
};
export default LogIn;