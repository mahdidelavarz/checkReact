import React from 'react';
// import { ActivityIndicator, StatusBar, Alert, Button } from 'react-native';
// import NetInfo from '@react-native-community/netinfo';
// import * as Animatable from 'react-native-animatable';
// import Toast from 'react-native-simple-toast';
// import RNRestart from 'react-native-restart';

import { log, happy_boy } from '../../Components/Images/Images';
import CustomText from '../../Components/CustomText/CustomText';
import colors from '../../Assets/Styles/Colors';
import Storage from '../../Factories/Storage';
// import language from '../../Assets/i18n/i18n';
import { downloadJson } from './Controller';
// import Store from '../../Store/Store';

let storage = new Storage();

class Splash extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isBtnRetry: false
        };
    }

    componentDidMount() {
        this.startApp();
    }

    startApp() {
        NetInfo.fetch().then((state) => {
            if (state.isConnected) {
                this.getData().catch(err => this.retry());
            } else {
                this.internetAlert();
            }
        });
    }

    retry() {
        this.setState({ isBtnRetry: true });
    }

    onPressRetryDownloadJson = () => {
        this.setState({ isBtnRetry: false }, () => {
            this.startApp();
        });
    }

    restartApp() {
        Toast.showWithGravity('خطای داخلی', Toast.LONG, Toast.TOP);
        setTimeout(() => {
            RNRestart.Restart();
        }, 2000);
    }

    async getData() {
        var _version, _keylist;
        await storage.get('Version', (version) => (_version = version));
        await storage.get('keylist.json', (keylist) => (_keylist = keylist));

        const response = await downloadJson('version.json');
        if (!_version || _version !== response.version) {
            const keylist = await downloadJson('keylist.json');
            if (!_keylist) _keylist = {};
            for (var file of keylist) {
                if (
                    _keylist[file.filename] &&
                    _keylist[file.filename].last_modified === file.last_modified
                ) continue;

                const downloadedFile = await downloadJson(file.filename);
                storage.set(file.filename, JSON.stringify(downloadedFile));
                _keylist[file.filename] = {
                    filename: file.filename,
                    last_modified: file.last_modified,
                };
            }
            storage.set('keylist.json', JSON.stringify(_keylist));
            storage.set('Version', response.version);
        }
        this.checkIdentity();
    }

    checkIdentity() {
        setTimeout(() => {
            storage.get('Token', (token) => {
                if (token) {
                    storage.get('Password', (password) => {
                        this.props.history.push(password ? '/password' : '/tabBar');
                    });
                } else {
                    this.props.history.push('/conditions');
                }
            });
        }, 5000);
    }

    internetAlert() {
        Alert.alert(
            'عدم دسترسی به اینترنت',
            'لطفا اتصال به اینترنت را چک کنید.',
            [
                {
                    text: 'تلاش مجدد',
                    onPress: () => RNRestart.Restart(),
                },
            ],
            { cancelable: false },
        );
    }

    render() {
        const { isBtnRetry } = this.state;
        return (
            <div className="flex flex-col bg-white h-full">
                <StatusBar backgroundColor={colors.dark_green} barStyle={'light-content'} />
                <Animatable.div
                    className="flex-3 items-center justify-center"
                    animation="zoomIn"
                    duration={1500}
                >
                    <img className="w-32 h-32" src={log} />
                </Animatable.div>
                {!isBtnRetry ? (
                    <div className="flex-2 items-center justify-center">
                        <ActivityIndicator size={'large'} color={colors.green} />
                    </div>
                ) : (
                    <div className="flex-2 items-center justify-center">
                        <button
                            className="w-1/2 h-10 rounded-full flex items-center justify-center bg-green-600"
                            onPress={this.onPressRetryDownloadJson}
                        >
                            <CustomText font_weight={'bold'} className="text-white text-center text-lg">
                                تلاش مجدد
                            </CustomText>
                        </button>
                    </div>
                )}
                <div className="flex-5 items-center justify-center">
                    <img
                        className="w-4/5 h-4/5 object-center"
                        src={happy_boy}
                        alt="Happy Boy"
                    />
                </div>
            </div>
        );
    }
}

export default Splash;
