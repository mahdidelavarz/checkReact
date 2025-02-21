import React, { useEffect, useState } from 'react';
import Toast from 'react-native-simple-toast';
import { BackHandler } from 'react-native';

import SimpleHeader from '../../Components/CustomHeader/SimpleHeader/SimpleHeader';
import { ic_ok, gadgetScan } from '../../Components/Images/Images';
import CustomText from '../../Components/CustomText/CustomText';
import { statusHandle } from '../../Factories/HttpHandler';
import { findMessages } from '../../Filters/Filters';
import Storage from '../../Factories/Storage';
import { Url } from '../../Configs/Urls';

let Token;
let storage = new Storage();

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
            const response = await fetch(`${Url.serverUrl}Analysis/gadgets/`, {
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
        <div className="flex flex-col h-full bg-white">
            <SimpleHeader
                func={() => props.history.push('/qRCodeScan')}
                title={'اضافه کردن گجت'}
            />
            <div className="flex flex-col flex-1">
                <div className="flex-2 flex flex-col items-center justify-center">
                    <img className="w-[60%] h-[60%] object-contain" src={gadgetScan} alt="Gadget Scan" />
                    <CustomText className="text-lg text-gray-800 text-center w-[95%]">
                        کد گجت با موفقیت ثبت شد
                    </CustomText>
                </div>
                <div className="flex-1 flex items-center justify-center">
                    <button
                        className="w-[70%] h-[45px] bg-green-500 rounded-full flex flex-row items-center justify-evenly"
                        onClick={onPressAttachGadget}
                    >
                        <CustomText className="text-white text-base">افزودن</CustomText>
                        <img className="w-[25px] h-[25px] object-contain text-white" src={ic_ok} alt="OK Icon" />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AttachGadget;
