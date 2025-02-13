import React, { PureComponent } from 'react';
import { div, StatusBar, img, Dimensions, Alert } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import DeviceInfo from 'react-native-device-info';

import { logo, logo_long, analytsis_history, specia_list, sperm_analysis, text_education, videoSuccess, ic_analysis, health_education } from '../../Components/Images/Images';
import LoadingModal from '../../Components/CustomModal/LoadingModal/LoadingModal';
import SimpleModal from '../../Components/CustomModal/SimpleModal/SimpleModal';
import { findStates, findMessages } from '../../Filters/Filters';
import { statusHandle } from '../../Factories/HttpHandler';
import BoxButton from './Components/BoxButton/BoxButton';
import Slider from './Components/Slider/Slider';
import colors from '../../Assets/Styles/Colors';
import Banner from './Components/Banner/Banner';
import Storage from '../../Factories/Storage';
import language from '../../Assets/i18n/i18n';
import { Url } from '../../Configs/Urls';
import Store from "../../Store/Store";
import styles from './Styles';

const width = Dimensions.get('window').width;
let Token;
let storage = new Storage();
class Home extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            isResultReadyModal: false,
            descriptionModal: '',
            isLoading: false,
        };
    }

    componentDidMount() {
        storage.get("Token", data => Token = data);
        NetInfo.fetch().then((state) => {
            if (!state.isConnected) {
                this.alertNetwork();
            }
        });
        this.getDeviceModels();
    }

    getDeviceModels() {
        let deviceModel = DeviceInfo.getModel();
        storage.get("DeviceModel", async data => {
            const models = JSON.parse(data);
            if (models) {
                models.forEach(item => {
                    if (item.name === deviceModel) {
                        Store.setCameraZoom(item.zoom_level);
                    } else {
                        Store.setCameraZoom(0.5);
                    }
                });
            } else {
                this.setState({ isLoading: true });
                try {
                    const response = await fetch("https://daddycheck.s3.ir-thr-at1.arvanstorage.com/devicemodels.json");
                    const responseJson = await response.json();
                    storage.set("DeviceModel", JSON.stringify(responseJson));
                    this.setState({ isLoading: false });
                } catch (error) {
                    this.getDeviceModels();
                    this.setState({ isLoading: false });
                }
            }
        });
    }

    alertNetwork() {
        Alert.alert(
            'عدم دسترسی به اینترنت',
            'لطفا اتصال به اینترنت را چک کنید.',
            [{ text: 'متوجه شدم' }],
            { cancelable: false },
        );
    }

    onPressGoToAnalysisScreen = () => {
        DeviceInfo.getBatteryLevel().then((batteryLevel) => {
            if (batteryLevel > 0.2) {
                NetInfo.fetch().then((state) => {
                    if (state.isConnected) {
                        this.checkAnalysisState();
                    } else {
                        this.alertNetwork();
                    }
                });
            } else {
                Alert.alert('شارژ باطری', 'کاربر گرامی با توجه به زمان تخمینی برای انجام آنالیز لازم است ک شارژ باطری دستگاه شما بیشتر از 40 درصد باشد.',
                    [{ text: 'متوجه شدم', style: 'default' }],
                    { cancelable: false },
                );
            }
        });
    };

    async checkAnalysisState() {
        this.setState({ isLoading: true });
        try {
            const response = await fetch(`${Url.serverUrl}Analysis/state/`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'token ' + Token // Store.token
                },
            });
            statusHandle(response.status, this.props.route.history);
            const responseJson = await response.json();
            this.setState({ isLoading: false });
            findStates(responseJson.state, data => {
                if (data.is_new_analysis_permitted) {
                    this.props.route.history.push('/firstStep');
                } else if (data.code === "waiting_for_qc1") {
                    this.props.route.history.push('/tenStep');
                } else if (data.code === "waiting_for_qc2") {
                    this.props.route.history.push('/elevenStep');
                } else if (data.code === "waiting_for_qc3") {
                    this.props.route.history.push('/twelveStep');
                } else if (data.code === "waiting_for_vids") {
                    this.props.route.history.push('/processing');
                } else if (data.code === "results_ready" || data.code === "waiting_for_results") {
                    findMessages(data.message, message => {
                        this.setState({
                            descriptionModal: message,
                            isResultReadyModal: true
                        });
                    });
                }
            });
        } catch (error) {
            this.setState({ isLoading: false });
        }
    }

    onPressGoToHistoryScreen = () => {
        this.setState({ isResultReadyModal: false });
        this.props.route.history.push('/history');
    }

    render() {
        return (
            <div style={styles.container}>
                <StatusBar
                    backgroundColor={colors.dark_green}
                    barStyle={'light-content'}
                />
                <div style={styles.header}>
                    <img style={styles.header_img} source={logo_long} />
                </div>
                <div style={styles.center}>
                    <div style={{ width: width, flex: 1.5 }}>
                        <Slider />
                    </div>
                    <div style={[styles.center_row, { marginTop: 5 }]}>
                        <BoxButton
                            style={{ marginRight: 5 }}
                            func={this.onPressGoToAnalysisScreen}
                            title={language('online_sperm_analyze')}
                            img={sperm_analysis}
                        />
                        <BoxButton
                            func={() => this.props.route.history.push('/categories')}
                            title={language('centers_search')}
                            img={specia_list}
                        />
                    </div>
                    <div style={[styles.center_row, { marginTop: 5 }]}>
                        <BoxButton
                            style={{ marginRight: 5 }}
                            func={() => this.props.route.history.push('/videoTraining')}
                            title={language('video_training')}
                            img={videoSuccess}
                        />
                        <BoxButton
                            func={() => this.props.route.history.push('/textTraining')}
                            title={language('text_training')}
                            img={text_education}
                        />
                    </div>
                    <div style={[styles.center_row, { marginTop: 5 }]}>
                        <BoxButton
                            style={{ marginRight: 5 }}
                            func={this.onPressGoToHistoryScreen}
                            title={language('history')}
                            img={analytsis_history}
                        />
                        <BoxButton
                            func={() => Alert.alert('این صفحه فعلا آماده نیست', 'برای جزئیات بیشتر با پشتیبانی تماس بگیرید')}
                            title={language('training_of_medical_staff')}
                            img={health_education}
                        />
                    </div>
                </div>
                <div style={styles.bottom}>
                    <Banner />
                </div>
                <SimpleModal
                    isVisible={this.state.isResultReadyModal}
                    img={ic_analysis}
                    title={'آنالیز'}
                    isReady={true}
                    description={this.state.descriptionModal}
                    right_func={this.onPressGoToHistoryScreen}
                    left_func={() => this.setState({ isResultReadyModal: false })}
                />
                <LoadingModal isVisible={this.state.isLoading} />
            </div>
        );
    }
};
export default Home;