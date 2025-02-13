import React, { useEffect, useState } from 'react';
import { View, Image, TouchableOpacity, BackHandler } from 'react-native';
import Toast from 'react-native-simple-toast';

import SimpleHeader from '../../Components/CustomHeader/SimpleHeader/SimpleHeader';
import { ic_ok, gadgetScan } from '../../Components/Images/Images';
import CustomText from '../../Components/CustomText/CustomText';
import { statusHandle } from '../../Factories/HttpHandler';
import { findMessages } from '../../Filters/Filters';
import Storage from '../../Factories/Storage';
import { Url } from '../../Configs/Urls';
import styles from './Styles';

let Token;
let storage = new Storage;
function AttachGadget(props) {
    const [code] = useState(props.match.params.code);

    useEffect(() => {
        const backAction = () => { props.history.goBack(); return true; };
        storage.get("Token", data => { Token = data });
        const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);
        return () => backHandler.remove();
    }, []);

    const onPressAttachGadget = async () => {
        try {
            const response = await
                fetch(`${Url.serverUrl}Analysis/gadgets/`, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': 'token ' + Token
                    },
                    body: JSON.stringify({ "serial_number": code })
                });
            if (response.status == 201) {
                props.history.push("/secondStep");
            }
            const responseJson = await response.json();
            findMessages(responseJson.detail, message => {
                Toast.show(message);
            });
        } catch (error) {
            Toast.show("خطای سرویس‌ دهنده‌ی داخلی دوباره تلاش کنید");
        }
    }

    return (
        <View style={styles.container}>
            <SimpleHeader
                func={() => props.history.push('/qRCodeScan')}
                title={'اضافه کردن گجت'}
            />
            <View style={styles.content}>
                <View style={styles.top}>
                    <Image style={styles.top_img} source={gadgetScan} />
                    <CustomText style={styles.top_txt}>
                        کد گجت با موفقیت ثبت شد
                    </CustomText>
                </View>
                <View style={styles.bottom}>
                    <TouchableOpacity activeOpacity={0.7} style={styles.bottom_btn} onPress={onPressAttachGadget}>
                        <CustomText style={styles.bottom_btn_txt}>
                            افزودن
                        </CustomText>
                        <Image style={styles.bottom_btn_ic} source={ic_ok} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};
export default AttachGadget;