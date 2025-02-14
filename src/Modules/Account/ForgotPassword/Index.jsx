import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ImageBackground } from 'react-native';
import DropdownAlert from 'react-native-dropdownalert';
import NetInfo from '@react-native-community/netinfo';
import Toast from 'react-native-simple-toast';

import LoadingModal from '../../../Components/CustomModal/LoadingModal/LoadingModal';
import SimpleButton from '../../../Components/CustomButton/SimpleButton';
import CustomInput from '../../../Components/CustomInput/CustomInput';
import CustomText from '../../../Components/CustomText/CustomText';
import { findMessages } from '../../../Filters/Filters';
import { Url } from '../../../Configs/Urls';

let dropDownAlert;
function ForgotPassword() {
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const handleBack = () => {
            navigate(-1);
        };
        window.addEventListener('popstate', handleBack);
        return () => window.removeEventListener('popstate', handleBack);
    }, [navigate]);

    const onPressSubmit = () => {
        if (!email) {
            dropDownAlert.alertWithType('warn', 'ایمیل را وارد کنید');
        } else {
            NetInfo.fetch().then(state => {
                if (state.isConnected) {
                    setIsLoading(true);
                    passwordReset(email);
                } else {
                    alert("عدم دسترسی به اینترنت. لطفا اتصال به اینترنت را چک کنید.");
                }
            });
        }
    };

    const passwordReset = async (email) => {
        try {
            const response = await fetch(`${Url.serverUrl}Auth/password/reset/request/`, {
                method: 'POST',
                headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
                body: JSON.stringify({ "email": email.toLowerCase() })
            });
            const responseJson = await response.json();
            setIsLoading(false);
            findMessages(responseJson.detail, message => {
                Toast.show(message);
            });
            if (responseJson.detail) {
                Toast.show("کد تغییر رمز عبور به ایمیلتان ارسال شد");
                navigate("/newPassword");
            }
        } catch (error) {
            setIsLoading(false);
            Toast.show(`${error.message}`);
        }
    };

    return (
        <div className="flex flex-col h-screen bg-cover" style={{ backgroundImage: `url(/path-to-image.jpg)` }}>
            <DropdownAlert ref={ref => dropDownAlert = ref} closeInterval={2000} />
            <div className="flex-2.5" />
            <div className="flex-6 flex flex-col items-center justify-center">
                <div className="flex justify-center">
                    <CustomText className="text-lg text-green-600 font-bold">
                        فراموشی رمز عبور
                    </CustomText>
                </div>
                <div className="w-3/5">
                    <CustomInput
                        placeholder={'ایمیل را وارد کنید'}
                        event={(value) => setEmail(value)}
                        keyboardType={'email-address'}
                        onSubmitEditing={passwordReset}
                    />
                    <SimpleButton
                        func={onPressSubmit}
                        title={'تایید'}
                        btnStyle="mt-4"
                    />
                </div>
            </div>
            <div className="flex-1.5" />
            <LoadingModal isVisible={isLoading} />
        </div>
    );
}
export default ForgotPassword;
