import React, { Component } from 'react';
import { PermissionsAndroid, BackHandler, Alert } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import RNFetchBlob from 'react-native-fetch-blob';
import Storage from '../../../Factories/Storage';
import Toast from 'react-native-simple-toast';
import { RNCamera } from 'react-native-camera';

import LoadingRecord from '../../../Components/Analysis/LoadingRecord/LoadingRecord';
import PendingView from '../../../Components/Analysis/PendingView/PendingView';
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

class TenStep extends Component {
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
            videoUri: null,
        };
    }

    async permissionCamera() {
        try {
            const grantedCom = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA,
                {
                    title: ' Camera Permission',
                    message: 'Rubit needs access to your camera ',
                },
            );
            if (grantedCom === PermissionsAndroid.RESULTS.GRANTED) {
                console.log('You can use the camera');
            } else {
                console.log('Camera permission denied');
            }
        } catch (err) {
            console.log(err);
        }
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
        this.permissionCamera();
        storage.get("Token", token => Token = token);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener(
            'hardwareBackPress',
            this.handleBackButtonClick,
        );
    }

    handleBackButtonClick = () => {
        this.setState({ isCloseModal: true });
        return true;
    };

    takePicture = async () => {
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

    uploadQcImage(uri) {
        NetInfo.fetch().then((state) => {
            if (state.isConnected) {
                RNFetchBlob.fetch('POST', `${Url.serverUrl}Analysis/qc/`,
                    {
                        Authorization: 'token ' + Token,
                        'Content-Type': 'multipart/form-data',
                    },
                    [
                        {
                            name: 'index',
                            data: JSON.stringify(1),
                        },
                        {
                            name: 'image',
                            type: 'image/jpeg',
                            filename: 'image.jpg',
                            data: RNFetchBlob.wrap(uri),
                        },
                    ],
                )
                    .then((res) => {
                        statusHandle(res.respInfo.status, this.props.history);
                        if (res.respInfo.status == 200) {
                            this.setState({ isStatusPhoto: true, });
                        } else {
                            this.setState({ isStatusPhoto: false, isEndRecordOne: false });
                            Toast.show('اطلاعات ارسالی تایید نشد دوباره تلاش کنید');
                        }
                        this.setState({ isLoading: false });
                        const message = JSON.parse(res.data);
                        findMessages(message.detail, message => {
                            Toast.show(message);
                        });
                    })
                    .catch((err) => {
                        console.log("error", err)
                        this.setState({ isLoading: false, isStatusPhoto: false });
                    });
            } else {
                Alert.alert('عدم دسترسی به اینترنت', 'لطفا اتصال به اینترنت خود را چک کنید');
            }
        });
    }

    async startRecording() {
        try {
            this.setState({
                isStartRecordOne: true,
            });
            let { uri, codec = 'mp4' } = await this.camera.recordAsync({
                mute: true,
                maxDuration: 6,
                quality: RNCamera.Constants.VideoQuality['4:3'],
            });
            console.log('uri', uri);
            this.setState({ videoUri: uri });
        } catch (e) {
            alert(e);
        }
    }

    onPressNextStep(step) {
        if (step == 1) {
            Toast.show('ابتدا ویدیو ضبط نمایید');
        } else if (step == 2) {
            Toast.show('چند لحظه صبر کنید');
        } else if (step == 3) {
            if (this.state.isStatusPhoto) {
                storage.set('VideoRecord1', this.state.videoUri);
                this.camera.pausePreview();
                this.props.history.push(`/elevenStep`);
            } else {
                Toast.show('اطلاعات ارسالی تایید نشد دوباره تلاش کنید');
            }
        }
    }

    render() {
        const { isStartRecordOne, isEndRecordOne } = this.state;
        let content = (
            <FirstStepRecord
                title={languages('send_first_field')}
                description={languages('send_step_10_sedcription')}
                func={this.startRecording.bind(this)}
                pageCount={10}
                footerNextFunc={() => this.onPressNextStep(1)}
            />
        );
        if (isStartRecordOne) {
            setTimeout(() => {
                this.camera.stopRecording();
                this.takePicture();
            }, 3000);
            content = (
                <TwoStepRecord
                    title={'در حال ارسال'}
                    description={'سیستم در حال ارسال اطلاعات فیلد اول می باشد لطفا چند لحظه صبر کنید'}
                    func={this.startRecording.bind(this)}
                    pageCount={10}
                    footerNextFunc={() => this.onPressNextStep(2)}
                />
            );
        }
        if (isEndRecordOne) {
            content = (
                <ThreeStepRecord
                    status={this.state.isStatusPhoto}
                    step={1}
                    footerNextFunc={() => this.onPressNextStep(3)}
                    footerAgainFunc={() => this.setState({ isEndRecordOne: false })}
                />
            );
        }
        return (
            <div className="flex-1 bg-white">
                <RNCamera
                    ref={(ref) => {
                        this.camera = ref;
                    }}
                    style="flex-1 items-center"
                    useNativeZoom={true}
                    type={RNCamera.Constants.Type.back}
                    flashMode={RNCamera.Constants.FlashMode.auto}
                />
                <div className="absolute top-0 w-full">
                    <HelpHeader
                        closeFunc={() => this.setState({ isCloseModal: true })}
                        helpFunc={() => this.setState({ isHelpModal: true })}
                        count={10}
                    />
                </div>
                <div className="flex-1 bg-white">{content}</div>
                <LoadingRecord isVisible={this.state.isLoading} />
                <CloseModal
                    visible={this.state.isCloseModal}
                    resumeFunc={() => this.setState({ isCloseModal: false })}
                />
                <HelpModal
                    visible={this.state.isHelpModal}
                    closeFunc={() => this.setState({ isHelpModal: false })}
                    description={languages("help_modal_txt_step_10")}
                />
            </div>
        );
    }
}

export default TenStep;
