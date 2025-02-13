import React from 'react';
import { div, ActivityIndicator, StatusBar, img, Alert, button } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import * as Animatable from 'react-native-animatable';
import Toast from 'react-native-simple-toast';
import RNRestart from 'react-native-restart';

import { log, happy_boy } from '../../Components/Images/Images';
import CustomText from '../../Components/CustomText/CustomText';
import colors from '../../Assets/Styles/Colors';
import Storage from '../../Factories/Storage';
import language from '../../Assets/i18n/i18n';
import { downloadJson } from './Controller';
import Store from '../../Store/Store';
import styles from './Styles';

let storage = new Storage();
class Splash extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isBtnRetry: false
        };
    }

    componentDidMount() {
        // storage.clearAll();
        this.startApp();
        // this.checkIdentity();
    }

    startApp() {
        NetInfo.fetch().then((state) => {
            if (state.isConnected) {
                // storage.clearAll();
                this.getData().catch(err => this.retry())
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
        if (!_version || _version != response.version) {
            const keylist = await downloadJson('keylist.json');
            if (!_keylist) _keylist = {};
            for (var file of keylist) {
                if (
                    _keylist[file.filename] &&
                    _keylist[file.filename].last_modified == file.last_modified
                )
                    continue;
                // Download the file
                const downloadedFile = await downloadJson(file.filename);
                storage.set(file.filename, JSON.stringify(downloadedFile));
                _keylist[file.filename] = {
                    filename: file.filename,
                    last_modified: file.last_modified,
                };
            }
            storage.set('keylist.json', JSON.stringify(_keylist));
            storage.set('Version', response.version);

            console.log('DOWNLOAD FINISHED');
        }
        this.checkIdentity();
    }

    checkIdentity() {
        // storage.remove("Token")
        setTimeout(() => {
            storage.get('Token', (token) => {
                if (token) {
                    storage.get('Password', (password) => {
                        this.props.history.push(password ? '/password' : '/tabBar'); // چک کردن رمز امنیتی کاربر
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
            <div style={styles.container}>
                <StatusBar
                    backgroundColor={colors.dark_green}
                    barStyle={'light-content'}
                />
                <Animatable.div
                    style={styles.center}
                    animation="zoomIn"
                    duration={1500}>
                    <img style={styles.center_logo} source={log} />
                </Animatable.div>
                {!isBtnRetry ?
                    <div style={styles.top}>
                        <ActivityIndicator size={'large'} color={colors.green} />
                    </div>
                    :
                    <div style={styles.top}>
                        <button style={styles.btn_retry} onPress={this.onPressRetryDownloadJson}>
                            <CustomText font_weight={'bold'} style={styles.btn_retry_txt}>تلاش مجدد</CustomText>
                        </button>
                    </div>
                }
                <div style={styles.bottom}>
                    <img style={styles.bottom_img} source={happy_boy} resizeMode='center' />
                </div>
            </div>
        );
    }
}
export default Splash;
