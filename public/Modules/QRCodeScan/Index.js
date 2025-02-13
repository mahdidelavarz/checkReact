import React, { Component } from 'react';
import { View, PermissionsAndroid, BackHandler } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import * as Animatable from 'react-native-animatable';
import { RNCamera } from 'react-native-camera';

import SimpleHeader from '../../Components/CustomHeader/SimpleHeader/SimpleHeader';
import LoadingModal from '../../Components/CustomModal/LoadingModal/LoadingModal';
import styles from './Styles';

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
            <View style={styles.container}>
                <SimpleHeader
                    func={() => this.props.history.push('/addGadget')}
                    title={'اسکن QR Code'}
                />
                <QRCodeScanner
                    onRead={this.onSuccess}
                    cameraStyle={styles.camera}
                    fadeIn={false}
                    showMarker={true}
                    checkAndroid6Permissions={true}
                    customMarker={<Marker />}
                    flashMode={RNCamera.Constants.FlashMode.auto}
                    checkAndroid6Permissions={true}
                />
            </View>
        );
    }
};
export default QRCodeScan;

function Marker() {
    return (
        <View style={styles.marker}>
            <View style={styles.marker_view}>
                <Animatable.View
                    animation="slideInDown"
                    iterationCount={2000}
                    direction={3000}
                    style={styles.marker_view__animate}
                >
                    <View style={styles.marker_view__animate_line} />
                </Animatable.View>
            </View>
        </View>
    );
};