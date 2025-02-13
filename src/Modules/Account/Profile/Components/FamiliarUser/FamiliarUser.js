import React, { useState, useEffect } from 'react';
import { div, div, img, button, Share, input type="checkbox" } from 'react-native';
import Toast from 'react-native-simple-toast';

import { ic_user, ic_arrow, ic_country, ic_share, logo, ic_passcode, ic_discount, ic_update, ic_credit, ic_support, ic_inviteFriend, ic_exit_app } from '../../../../../Components/Images/Images';
import SimpleModal from '../../../../../Components/CustomModal/SimpleModal/SimpleModal';
import CustomText from '../../../../../Components/CustomText/CustomText';
import { statusHandle } from '../../../../../Factories/HttpHandler';
import languages from '../../../../../Assets/i18n/i18n';
import Storage from '../../../../../Factories/Storage';
import { Url } from '../../../../../Configs/Urls';
import Store from '../../../../../Store/Store';
import styles from './Styles';

let Token;
let storage = new Storage();
function FamiliarUser(props) {
    // const [isModalUpdateApp, setIsModalUpdateApp] = useState(false);
    const [isModalExitToApp, setIsModalExitToApp] = useState(false);
    const [password, setPassword] = useState(false);

    useEffect(() => {
        storage.get("Token", token => Token = token);
        storage.get("Password", pass => setPassword(pass ? true : false));
    }, []);

    const removePassword = () => {
        storage.remove("Password");
        setPassword(!password);
    }

    const onPressItem = (item) => {
        if (item.id == 2 || item.id == 3 || item.id == 8 || item.id == 5) {
            Toast.show("این صفحه هنوز آماده نشده است");
        } else if (item.id == 7) {
            share();
        } else if (item.id == 11) {
            setIsModalExitToApp(true);
        } else {
            props.param.route.history.push(item.link);
        }
    }

    const share = () => {
        Share.share({ message: "http://etcco.ir" })
            .then(result => console.log(result))
            .catch(error => console.log(error));
    }

    const onPressExitToApp = async () => {
        setIsModalExitToApp(false);
        try {
            const response = await fetch(`${Url.serverUrl}Auth/logout/`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'token ' + Token
                },
            });
            statusHandle(response.status, props.param.route.history);
            const responseJson = await response.json();
            if (responseJson.detail) {
                const keys = ["Token", "Profile"];
                storage.multiRemove(keys);
                Store.decrementTabBar();
                Store.clearToken();
                props.param.route.history.push('/');
            }
            console.log("res", responseJson.detail)
        } catch (error) {
            Toast.show(`${error.message}`);
        }
    }

    return (
        <div style={styles.container} showsVerticalScrollIndicator={true}>
            {
                list.map((item, index) => (
                    <button
                        key={index}
                        activeOpacity={0.6}
                        onPress={() => onPressItem(item)}
                    // disabled={item.id == 2 || item.id == 3 ? true : false}
                    >
                        <div style={[styles.row,
                        { marginBottom: index + 1 == list.length ? 35 : 0, borderBottomWidth: index + 1 == list.length ? 0 : 1 }]}
                        >
                            <div style={styles.row_right}>
                                <img style={styles.row_right_ic} source={item.icon} />
                            </div>
                            <div style={styles.row_center}>
                                <CustomText style={styles.row_center_txt}>
                                    {item.title}
                                </CustomText>
                                {item.id == 2 ?
                                    <CustomText style={styles.test}>
                                        {props.credit}
                                    </CustomText>
                                    : null}
                                {item.id == 4 ?
                                    <input type="checkbox"
                                        onValueChange={removePassword}
                                        value={password}
                                        style={styles.test}
                                    />
                                    : null}
                            </div>
                            <div style={styles.row_left}>
                                <img style={styles.row_left_ic} source={ic_arrow} />
                            </div>
                        </div>
                    </button>
                ))
            }
            <SimpleModal
                isVisible={isModalExitToApp}
                img={ic_exit_app}
                title={'خروج'}
                description={'آیا مایلید از برنامه خارج شوید؟'}
                right_func={onPressExitToApp}
                left_func={() => setIsModalExitToApp(false)}
            />
        </div>
    );
};
export default FamiliarUser;
const list = [
    // {title: languages('username'), icon: ic_user, id: '1'},
    // {title: languages('phoneNumber'), icon: ic_phone, id: '2'},
    // {title: languages('national_code'), icon: ic_user, id: '3'},
    // {title: languages('wallet'), icon: ic_credit, id: '4'},
    // {title: languages('password'), icon: ic_passcode, id: '5'},
    // {title: languages('languages'), icon: ic_country, id: '6'},
    { title: 'ویرایش پروفایل', icon: ic_user, id: '1', link: '/editProfile' },
    { title: 'کیف پول', icon: ic_credit, id: '2', link: '/wallet' },
    { title: 'کد تخفیف', icon: ic_discount, id: '3', link: '/discountCode' },
    { title: 'گذرواژه ورود', icon: ic_passcode, id: '4', link: '/securityPassword' },
    { title: 'تغییر زبان اپلیکیشن', icon: ic_country, id: '5', link: '/languages/tabBar' },
    { title: 'معرفی به دوستان', icon: ic_inviteFriend, id: '6', link: '/invite' },
    { title: 'اشتراک گذاری', icon: ic_share, id: '7' },
    { title: 'بروز رسانی', icon: ic_update, id: '8', link: '/update' },
    { title: 'ارتباط با پشتیبانی', icon: ic_support, id: '9', link: '/contactSupport' },
    { title: 'درباره daddy check', icon: logo, id: '10', link: '/aboutUs' },
    { title: 'خروج', icon: ic_exit_app, id: '11' },
];