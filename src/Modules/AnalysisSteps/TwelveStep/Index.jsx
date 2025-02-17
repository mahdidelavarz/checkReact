import React, { Component } from 'react';
import { PermissionsAndroid, Alert, BackHandler } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import RNFetchBlob from 'react-native-fetch-blob';
import Storage from '../../../Factories/Storage';
import { RNCamera } from 'react-native-camera';
import Toast from 'react-native-simple-toast';

import LoadingRecord from '../../../Components/Analysis/LoadingRecord/LoadingRecord';
import HelpHeader from '../../../Components/Analysis/HelpHeader/HelpHeader';
import CloseModal from '../../../Components/Analysis/CloseModal/CloseModal';
import FirstStepRecord from './Components/FirstStepRecord/FirstStepRecord';
import ThreeStepRecord from './Components/ThreeStepRecord/ThreeStepRecord';
import HelpModal from '../../../Components/Analysis/HelpModal/HelpModal';
import TwoStepRecord from './Components/TwoStepRecord/TwoStepRecord';
import { statusHandle } from '../../../Factories/HttpHandler';
import { findMessages } from '../../../Filters/Filters';
import languages from '../../../Assets/i18n/i18n';
import { Url } from '../../../Configs/Urls';
import Store from "../../../Store/Store";

let Token;
let storage = new Storage();

class TwelveStep extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            isHelpModal: false,
            isCloseModal: false,
            isStartRecordOne: false,
            isEndRecordOne: false,
            isStatusPhoto: false,
            cameraZoom: 0,
            videoUri: null
        };
    }

    async permissionCamera() {
        try {
            const grantedCom = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA, {
                'title': ' Camera Permission',
                'message': 'Rubit needs access to your camera '
            }
            );
            if (grantedCom === PermissionsAndroid.RESULTS.GRANTED) {
                console.log("You can use the camera")
            } else {
                console.log("Camera permission denied")
            }
        } catch (err) {
            console.warn(err)
        }
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
        this.permissionCamera();
        storage.get("Token", token => Token = token);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    handleBackButtonClick = () => {
        this.setState({ isCloseModal: true });
        return true;
    }

    async takePicture() {
        this.setState({
            isStartRecordOne: false,
            isLoading: true,
            isEndRecordOne: true,
        });
        try {
            const options = { quality: 0.5 };
            setTimeout(async () => {
                const data = await this.camera.takePictureAsync(options);
                this.uploadQcImage(data.uri);
            }, 200);
        } catch (e) {
            alert(e);
        }
    };

    async uploadQcImage(uri) {
        NetInfo.fetch().then(state => {
            if (state.isConnected) {
                RNFetchBlob.fetch('POST', `${Url.serverUrl}Analysis/qc/`, {
                    Authorization: 'token ' + Token,
                    'Content-Type': 'multipart/form-data',
                },
                    [
                        {
                            name: "index",
                            data: JSON.stringify(3)
                        },
                        {
                            name: 'image',
                            type: 'image/jpeg',
                            filename: 'image.jpg',
                            data: RNFetchBlob.wrap(uri)
                        }
                    ])
                    .then((res) => {
                        statusHandle(res.respInfo.status, this.props.history);
                        if (res.respInfo.status == 200) {
                            this.setState({ isStatusPhoto: false });
                            this.props.history.push("/processing");
                        } else {
                            Toast.show('اطلاعات ارسالی تایید نشد دوباره تلاش کنید');
                            this.setState({ isStatusPhoto: false, isEndRecordOne: false });
                        }
                        this.setState({ isLoading: false });
                        const message = JSON.parse(res.data);
                        findMessages(message.detail, message => {
                            Toast.show(message);
                        });
                    })
                    .catch((err) => {
                        console.log("error", err)
                        this.setState({ isLoading: false })
                    })
            } else {
                Alert.alert('عدم دسترسی به اینترنت', 'لطفا اتصال به اینترنت خود را چک کنید')
            }
        });
    }

    async startRecording() {
        try {
            this.setState({
                isStartRecordOne: true,
            });
            let { uri, codec = "mp4" } = await this.camera.recordAsync({
                mute: true,
                maxDuration: 6,
                quality: RNCamera.Constants.VideoQuality["4:3"]
            });
            this.setState({ videoUri: uri });
            storage.set("VideoRecord3", uri);
        } catch (e) {
            alert(e)
        }
    }

    onPressNextStep(step) {
        if (step == 1) {
            Toast.show('ابتدا ویدیو ضبط نمایید');
        } else if (step == 2) {
            Toast.show('چند لحظه صبر کنید');
        }
    }

    render() {
        const { isStartRecordOne } = this.state;
        let content = (
            <FirstStepRecord
                title={languages('send_three_field')}
                description={languages('send_step_10_sedcription')}
                func={this.startRecording.bind(this)}
                pageCount={12}
                footerNextFunc={() => this.onPressNextStep(1)}
            />
        );
        if (isStartRecordOne) {
            setTimeout(() => {
                this.camera.stopRecording();
                this.takePicture();
            }, 6000);
            content = (
                <TwoStepRecord
                    title={'در حال ارسال'}
                    description={'سیستم در حال ارسال اطلاعات فیلد سوم می باشد لطفا چند لحظه صبر کنید'}
                    func={this.startRecording.bind(this)}
                    pageCount={12}
                    footerNextFunc={() => this.onPressNextStep(2)}
                />
            );
        }

        return (
            <div className="flex flex-col h-full bg-white">
                <RNCamera
                    ref={ref => {
                        this.camera = ref;
                    }}
                    useNativeZoom={true}
                    style="flex-1 justify-center items-center"
                    type={RNCamera.Constants.Type.back}
                    flashMode={RNCamera.Constants.FlashMode.auto}
                />
                <div className="absolute top-0 w-full">
                    <HelpHeader
                        closeFunc={() => this.setState({ isCloseModal: true })}
                        helpFunc={() => this.setState({ isHelpModal: true })}
                        count={12}
                    />
                </div>
                <div className="flex-1 bg-white">
                    {content}
                </div>
                <LoadingRecord isVisible={this.state.isLoading} />
                <CloseModal
                    visible={this.state.isCloseModal}
                    resumeFunc={() => this.setState({ isCloseModal: false })}
                />
                <HelpModal
                    visible={this.state.isHelpModal}
                    closeFunc={() => this.setState({ isHelpModal: false })}
                    description={languages("help_modal_txt_step_12")}
                />
            </div>
        );
    }
}

export default TwelveStep;
