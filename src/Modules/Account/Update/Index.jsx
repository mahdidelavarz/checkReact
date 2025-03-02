import React, { useEffect, useState } from 'react';
import { BackHandler, Linking } from 'react-native';

import SimpleHeader from '../../../Components/CustomHeader/SimpleHeader/SimpleHeader';
import SimpleButton from '../../../Components/CustomButton/SimpleButton';
import CustomText from '../../../Components/CustomText/CustomText';
import Loading from '../../../Components/Loading/Loading';
import language from '../../../assets/i18n/i18n';
import Store from '../../../Store/Store';

function Update(props) {
    const [isLoading, setIsLoading] = useState(false);
    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('');
    const [active, setActive] = useState(false);

    useEffect(() => {
        const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);
        return () => backHandler.remove();
    }, []);

    const backAction = () => {
        Store.incrementTabBar();
        props.history.goBack();
        return true;
    }

    const getData = () => {
        setIsLoading(false);
    }

    return (
        <div className="flex-1">
            <SimpleHeader
                func={backAction}
                title={language("update")}
            />
            {!isLoading ?
                <div className="flex-1 bg-white justify-center">
                    <CustomText className="text-center text-light-txt text-lg my-2">
                        نسخه فعلی: <CustomText className="text-green">{title}</CustomText>
                    </CustomText>
                    <CustomText className="text-center text-light-txt text-lg my-2">
                        جزئیات: <CustomText className="text-green">{message}</CustomText>
                    </CustomText>
                    {active ?
                        <SimpleButton
                            func={() => Linking.openURL("http://etcco.ir/")}
                            btnStyle="w-1/2 self-center mt-5"
                            title={language("update")}
                            titleStyle={{}}
                        />
                        :
                        <CustomText className="text-center text-light-txt text-lg mt-5">
                            ورژن بروز است
                        </CustomText>
                    }
                </div>
                :
                <Loading />
            }
        </div>
    );
};
export default Update;
