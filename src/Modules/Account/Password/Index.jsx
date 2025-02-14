import React, { useState, useEffect } from 'react';
import { ImageBackground, StatusBar, BackHandler, I18nManager, TextInput } from 'react-native';
import DropdownAlert from 'react-native-dropdownalert';

import { auto_back, auto_back_rtl } from '../../../Components/Images/Images';
import SimpleButton from '../../../Components/CustomButton/SimpleButton';
import CustomText from '../../../Components/CustomText/CustomText';
import colors from '../../../Assets/Styles/Colors';
import language from '../../../Assets/i18n/i18n';
import Storage from '../../../Factories/Storage';

let dropDownAlert;
let storage = new Storage();
function Password(props) {
    const [back, setBack] = useState(auto_back_rtl);
    const [code, setCode] = useState('');

    useEffect(() => {
        const backAction = () => {
            props.history.goBack();
            return true;
        };
        if (!I18nManager.isRTL) {
            setBack(auto_back);
        }
        const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);
        return () => backHandler.remove();
    }, []);

    const onPressSubmit = () => {
        if (!code) {
            dropDownAlert.alertWithType('warn', 'گذرواژه را وارد کنید');
        } else {
            storage.get("Password", pass => {
                if (code === pass) {
                    props.history.push('/tabBar');
                } else {
                    dropDownAlert.alertWithType('warn', 'کد ورودی با کدی که قبلا ذخیره کرده اید مطابقت ندارد');
                }
            });
        }
    }

    return (
        <ImageBackground className="flex-1 flex-col" source={back}>
            <StatusBar backgroundColor={colors.dark_green} barStyle={'light-content'} />
            <DropdownAlert
                ref={ref => dropDownAlert = ref}
                inactiveStatusBarBackgroundColor={colors.dark_green}
                titleStyle={{ fontFamily: 'iranyekanwebbold(fanum)', fontSize: 12, color: colors.white }}
            />
            <div className="flex-2.5" />
            <div className="flex-6 flex-col">
                <div className="flex-1 justify-center">
                    <CustomText font_weight={'bold'} className="text-[16px] text-green-500 ml-[40px]">
                        تایید گذرواژه امنیتی
                    </CustomText>
                </div>
                <div className="flex-9 items-center justify-center">
                    <div className="w-[70%]">
                        <TextInput
                            className="w-full h-[35px] rounded-[30px] text-[12px] text-left p-[10px] bg-white border border-[#d3d3d3] mt-[10px]"
                            placeholder={'گذرواژه'}
                            onChangeText={(value) => setCode(value)}
                            keyboardType={'default'}
                            onSubmitEditing={onPressSubmit}
                        />
                        <SimpleButton
                            func={onPressSubmit}
                            title={'تایید'}
                            btnStyle="my-[15px]"
                        />
                    </div>
                </div>
            </div>
            <div className="flex-1.5" />
        </ImageBackground>
    );
};
export default Password;
