import React, { Component } from 'react';
import { View, BackHandler, PermissionsAndroid, Alert } from 'react-native';
import RNFetchBlob from 'react-native-fetch-blob';
import Video from 'react-native-video';

import SimpleHeader from '../../../Components/CustomHeader/SimpleHeader/SimpleHeader';
import Loading from '../../../Components/Loading/Loading';
import languages from '../../../Assets/i18n/i18n';
import Storage from '../../../Factories/Storage';
import { Url } from '../../../Configs/Urls';
import styles from './Styles';

let storage = new Storage();
class ResultVideo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            uri: '',
            isLoading: false
        };
    }

    async requestExternalStoreageRead() {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                {
                    title: 'Storage Permission',
                    message: 'App needs access to memory to download the file ',
                },
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                //Alert.alert("Permission granted","Now you can download anything!");
            } else {
                Alert.alert(
                    'Permission Denied!',
                    'You need to give storage permission to download the file',
                );
            }
        } catch (err) {
            console.warn(err);
        }
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
                {
                    title: 'Access Storage',
                    message: 'Access Storage for the pictures',
                },
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log('You can use read from the storage', granted);
            } else {
                console.log('Storage permission denied');
            }
        } catch (err) {
            console.warn(err);
        }
    }

    componentDidMount() {
        this.requestExternalStoreageRead();
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
        this.setState({ isLoading: true });
        storage.get('Token', (token) => {
            this.getResultVideo(token);
        });
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    handleBackButtonClick = () => {
        this.props.history.push(`/historyDetails/${this.state.id}`);
        return true;
    };

    getResultVideo(token) {
        RNFetchBlob.config({ fileCache: true })
            .fetch('GET', `${Url.serverUrl}Analysis/results/video/?analysis_id=${this.state.id}`,
                {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'token ' + token,
                },
            )
            .then((res) => {
                this.setState({
                    uri: res.path(),
                    isLoading: false,
                });
                console.log('r', res.path());
            })
            .catch((error) => {
                console.log('error', error);
            });
    }

    render() {
        return (
            <View style={styles.container}>
                <SimpleHeader
                    func={() => this.props.history.push(`/historyDetails/${this.state.id}`)}
                    title={'ویدیو تحلیل شده از نمونه'}
                />
                {!this.state.isLoading ?
                    <View style={styles.container}>
                        <Video
                            source={{ uri: `${this.state.uri}` }}
                            repeat={true}
                            resizeMode="stretch"
                            volume={0.0}
                            style={styles.video_player}
                        />
                    </View>
                    :
                    <Loading />
                }
            </View>
        );
    }
};
export default ResultVideo;