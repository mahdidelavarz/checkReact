import { I18nManager } from 'react-native';
import I18n from 'react-native-i18n';

import fa from '../languages/Persian/fa';
import en from '../languages/English/en';

I18n.fallbacks = true;
I18n.defaultLocale = I18nManager.isRTL ? 'fa' : 'en'; // این خط کد موقتی است و تغییر میکند
I18n.locale = I18nManager.isRTL ? 'fa' : 'en';

I18n.translations = {
    fa,
    en
};

export const setLocale = (locale) => {
    I18n.locale = locale;
};

export const getCurrentLocale = () => I18n.locale;

export const translateHeaderText = (langKey) => ({ screenProps }) => {
    const title = I18n.translate(langKey, screenProps.language);
    return { title };
};

export default I18n.translate.bind(I18n);