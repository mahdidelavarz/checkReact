import React, { Component } from 'react';
import { BackHandler } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import RNFetchBlob from 'react-native-fetch-blob';
import Toast from 'react-native-simple-toast';
import LoadingRecord from '../../../Components/Analysis/LoadingRecord/LoadingRecord';
import CloseModal from '../../../Components/Analysis/CloseModal/CloseModal';
import CustomText from '../../../Components/CustomText/CustomText';
import { statusHandle } from '../../../Factories/HttpHandler';
import { process } from '../../../Components/Images/Images';
import languages from '../../../Assets/i18n/i18n';
import Storage from '../../../Factories/Storage';
import { Url } from '../../../Configs/Urls';

let Token;
let storage = new Storage();

class Processing extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isCloseModal: false,
            isLoading: false
        };
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
        storage.get("Token", token => Token = token);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    handleBackButtonClick = () => {
        Toast.show("امکان برگشت به مرحله قبل وجود ندارد");
        return true;
    }

    onPressProcess = () => {
        storage.get("VideoRecord1", video1 => {
            storage.get("VideoRecord2", video2 => {
                storage.get("VideoRecord3", video3 => {
                    this.uploadVideo(video1, video2, video3);
                });
            });
        });
    }

    uploadVideo(video1, video2, video3) {
        NetInfo.fetch().then(state => {
            if (state.isConnected) {
                this.setState({ isLoading: true });
                RNFetchBlob.fetch('POST', `${Url.serverUrl}Analysis/run/`, {
                    Authorization: 'token ' + Token,
                    'Content-Type': 'multipart/form-data',
                    "Accept": "application/json",
                }, [
                    {
                        name: 'video1',
                        type: 'video/mp4',
                        filename: 'video1.mp4',
                        data: RNFetchBlob.wrap(video1)
                    },
                    {
                        name: 'video2',
                        type: 'video/mp4',
                        filename: 'video2.mp4',
                        data: RNFetchBlob.wrap(video2)
                    },
                    {
                        name: 'video3',
                        type: 'video/mp4',
                        filename: 'video3.mp4',
                        data: RNFetchBlob.wrap(video3)
                    }
                ])
                    .then((res) => {
                        statusHandle(res.respInfo.status, this.props.history);
                        this.setState({ isLoading: false });
                        if (res.respInfo.status == 200) {
                            this.props.history.push(`/resultAnalysis`);
                        } else {
                            Toast.show('اطلاعات ارسالی تایید نشد دوباره تلاش کنید');
                        }
                    })
                    .catch(() => {
                        Toast.show('اطلاعات ارسالی تایید نشد دوباره تلاش کنید');
                        this.setState({ isLoading: false });
                    })
            } else {
                alert('عدم دسترسی به اینترنت', 'لطفا اتصال به اینترنت خود را چک کنید');
            }
        });
    }

    render() {
        return (
            <div className="flex flex-col h-screen bg-white">
                {/* Header */}
                <div className="w-full h-16 border-b border-gray-300 flex items-center justify-center">
                    <CustomText className="text-lg font-bold text-gray-800">
                        پردازش اطلاعات
                    </CustomText>
                </div>
                
                {/* Content */}
                <div className="flex flex-1 flex-col items-center justify-evenly">
                    <CustomText className="text-lg text-gray-900 text-center">
                        برای پردازش اطلاعات دکمه زیر را فشار دهید
                    </CustomText>
                    <div className="w-1/3 h-1/3 border border-gray-300 rounded-full flex items-center justify-center">
                        <button className="w-10/12 h-10/12 border border-gray-300 rounded-full flex items-center justify-center" onClick={this.onPressProcess}>
                            <img className="w-20 h-20 text-green-500" src={process} />
                        </button>
                    </div>
                </div>
                
                {/* Modals */}
                <CloseModal
                    visible={this.state.isCloseModal}
                    resumeFunc={() => this.setState({ isCloseModal: false })}
                />
                <LoadingRecord isVisible={this.state.isLoading} />
            </div>
        );
    }
};

export default Processing;
