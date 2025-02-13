import RNRestart from 'react-native-restart';
import {I18nManager} from 'react-native';
import Storage from './Storage';

let storage = new Storage();

export function changeLang (lang) {
    if (lang === 'fa') { // تغییر زبان اپلیکیشن به فارسی
        I18nManager.forceRTL(true);
        const lang = 'fa';
        storage.set("Language", lang);
        RNRestart.Restart();
    } else {
        I18nManager.forceRTL(false); // تغییر زبان اپلیکیشن به انگلیسی
        const lang = 'en';
        storage.set("Language", lang);
        RNRestart.Restart();
    }
};