import React, { useState, useEffect } from 'react';
import Toast from 'react-native-simple-toast';
import { Share } from 'react-native';
import {
  ic_user, ic_arrow, ic_country, ic_share, logo, ic_passcode, ic_discount, 
  ic_update, ic_credit, ic_support, ic_inviteFriend, ic_exit_app
} from '../../../../../Components/Images/Images';
import SimpleModal from '../../../../../Components/CustomModal/SimpleModal/SimpleModal';
import CustomText from '../../../../../Components/CustomText/CustomText';
import { statusHandle } from '../../../../../Factories/HttpHandler';
import languages from '../../../../../Assets/i18n/i18n';
import Storage from '../../../../../Factories/Storage';
import { Url } from '../../../../../Configs/Urls';
import Store from '../../../../../Store/Store';

let Token;
let storage = new Storage();

function FamiliarUser(props) {
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
        if ([2, 3, 5, 8].includes(item.id)) {
            Toast.show("این صفحه هنوز آماده نشده است");
        } else if (item.id === 7) {
            share();
        } else if (item.id === 11) {
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
        } catch (error) {
            Toast.show(`${error.message}`);
        }
    }

    return (
        <div className="flex flex-col space-y-2 p-4">
            {list.map((item, index) => (
                <button
                    key={index}
                    className={`flex items-center justify-between w-full p-4 border-b border-gray-300 ${index + 1 === list.length ? 'mb-8 border-none' : ''}`}
                    onClick={() => onPressItem(item)}
                >
                    <div className="flex items-center space-x-4">
                        <img className="w-6 h-6 text-green-500" src={item.icon} alt="icon" />
                        <CustomText className="text-lg text-dark_txt">{item.title}</CustomText>
                        {item.id === 2 && <CustomText className="text-green-500 text-lg">{props.credit}</CustomText>}
                        {item.id === 4 && (
                            <input type="checkbox" checked={password} onChange={removePassword} className="ml-2" />
                        )}
                    </div>
                    <img className="w-4 h-4 text-gray-500" src={ic_arrow} alt="arrow" />
                </button>
            ))}
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
}

export default FamiliarUser;

const list = [
    { title: 'ویرایش پروفایل', icon: ic_user, id: 1, link: '/editProfile' },
    { title: 'کیف پول', icon: ic_credit, id: 2, link: '/wallet' },
    { title: 'کد تخفیف', icon: ic_discount, id: 3, link: '/discountCode' },
    { title: 'گذرواژه ورود', icon: ic_passcode, id: 4, link: '/securityPassword' },
    { title: 'تغییر زبان اپلیکیشن', icon: ic_country, id: 5, link: '/languages/tabBar' },
    { title: 'معرفی به دوستان', icon: ic_inviteFriend, id: 6, link: '/invite' },
    { title: 'اشتراک گذاری', icon: ic_share, id: 7 },
    { title: 'بروز رسانی', icon: ic_update, id: 8, link: '/update' },
    { title: 'ارتباط با پشتیبانی', icon: ic_support, id: 9, link: '/contactSupport' },
    { title: 'درباره daddy check', icon: logo, id: 10, link: '/aboutUs' },
    { title: 'خروج', icon: ic_exit_app, id: 11 },
];
