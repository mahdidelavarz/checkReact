import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SendIntentAndroid from 'react-native-send-intent';
import { StatusBar } from 'react-native';
import SimpleButton from '../../../Components/CustomButton/SimpleButton';
import { support_back, ic_back } from '../../../Components/Images/Images';
import CustomText from '../../../Components/CustomText/CustomText';
import colors from '../../../Assets/Styles/Colors';
import language from '../../../Assets/i18n/i18n';
import Store from '../../../Store/Store';

function ContactSupport() {
    const navigate = useNavigate();

    useEffect(() => {
        const handleBack = () => {
            Store.incrementTabBar();
            navigate(-1);
            return true;
        };
        window.addEventListener("popstate", handleBack);
        return () => window.removeEventListener("popstate", handleBack);
    }, [navigate]);

    return (
        <div className="flex flex-col h-screen bg-cover bg-center" style={{ backgroundImage: `url(${support_back})` }}>
            <StatusBar backgroundColor={colors.dark_green} barStyle={'light-content'} />
            
            {/* Top Section */}
            <div className="flex-1">
                <button onClick={() => navigate(-1)} className="mt-4 ml-3 p-2">
                    <img src={ic_back} alt="Back" className="w-6 h-6" />
                </button>
            </div>

            {/* Center Section */}
            <div className="flex-6 flex flex-col justify-end bg-transparent text-center">
                <CustomText className="w-1/2 mx-auto text-center">نیاز به کمک دارید؟</CustomText>
                <CustomText className="w-1/2 mx-auto text-center">تیم پشتیبانی daddy check به صورت شبانه روزی پاسخگوی شماست</CustomText>
            </div>

            {/* Bottom Section */}
            <div className="flex-3 flex flex-col justify-center items-center">
                <SimpleButton
                    btnStyle="w-1/2 mt-2"
                    title={'تماس با پشتیبانی'}
                    func={() => SendIntentAndroid.sendPhoneDial("02188223310", false)}
                />
                <SimpleButton
                    btnStyle="w-1/2 mt-2"
                    title={'ارسال ایمیل'}
                    func={() => SendIntentAndroid.sendMail("etccosw@gmail.com", "", "")}
                />
                <SimpleButton
                    btnStyle="w-1/2 mt-2"
                    title={'گفتگوی آنلاین'}
                    func={() => window.open("http://etcco.ir/", "_blank")}
                />
            </div>
        </div>
    );
}

export default ContactSupport;
