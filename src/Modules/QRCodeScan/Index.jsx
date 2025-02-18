import React, { Component } from 'react';
import { PermissionsAndroid, BackHandler } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import * as Animatable from 'react-native-animatable';
import { RNCamera } from 'react-native-camera';

import SimpleHeader from '../../Components/CustomHeader/SimpleHeader/SimpleHeader';
import LoadingModal from '../../Components/CustomModal/LoadingModal/LoadingModal';

class QRCodeScan extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isAccess: false
        };
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
        this.requestCameraPermission();
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    handleBackButtonClick = () => {
        this.props.history.goBack();
        return true;
    }

    async requestCameraPermission() {
        try {
            const grantedCom = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA,
                {
                    title: ' Camera Permission',
                    message: 'Rubit needs access to your camera ',
                },
            );
            if (grantedCom === PermissionsAndroid.RESULTS.GRANTED) {
                this.setState({ isAccess: true });
            } else {
                this.setState({ isAccess: true });
                this.requestCameraPermission();
            }
        } catch (err) {
            console.log(err);
        }
    };

    onSuccess = e => {
        this.props.history.push(`/attachGadget/${e.data}`);
    };

    render() {
        return (
            <div className="flex-1">
                <SimpleHeader
                    func={() => this.props.history.push('/addGadget')}
                    title={'اسکن QR Code'}
                />
                <QRCodeScanner
                    onRead={this.onSuccess}
                    cameraStyle="w-full h-full"
                    fadeIn={false}
                    showMarker={true}
                    checkAndroid6Permissions={true}
                    customMarker={<Marker />}
                    flashMode={RNCamera.Constants.FlashMode.auto}
                    checkAndroid6Permissions={true}
                />
            </div>
        );
    }
}

export default QRCodeScan;

function Marker() {
    return (
        <div className="flex-1 items-center justify-center bg-transparent">
            <div className="h-36 w-[85%] border-2 border-green-600 bg-transparent rounded-lg flex justify-center items-center">
                <Animatable.div
                    animation="slideInDown"
                    iterationCount={2000}
                    direction={3000}
                    className="mt-36"
                >
                    <div className="bg-violet-600 w-[85%] h-[0.15rem]" />
                </Animatable.div>
            </div>
        </div>
    );
}
