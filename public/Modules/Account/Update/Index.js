import React, { useEffect, useState } from 'react';
import { View, BackHandler, Linking } from 'react-native';

import SimpleHeader from '../../../Components/CustomHeader/SimpleHeader/SimpleHeader';
import SimpleButton from '../../../Components/CustomButton/SimpleButton';
import CustomText from '../../../Components/CustomText/CustomText';
import Loading from '../../../Components/Loading/Loading';
import colors from '../../../Assets/Styles/Colors';
import language from '../../../Assets/i18n/i18n';
import Store from '../../../Store/Store';
import styles from './Styles';

function Update(props) {
    const [isLoading, setIsLoading] = useState(false);
    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('');
    const [active, setActive] = useState(false);

    useEffect(() => {
        // getData();
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
        // getUpdateAppVersion(data => {
        //     const result = JSON.parse(data);
        //     setTitle(result[0].title);
        //     setMessage(result[0].message);
        //     setActive(result[0].active);
        //     setIsLoading(false);
        // });
    }

    return (
        <View style={styles.container}>
            <SimpleHeader
                func={backAction}
                title={language("update")}
            />
            {!isLoading ?
                <View style={styles.content}>
                    <CustomText style={styles.title}>
                        نسخه فعلی: <CustomText style={{ color: colors.green }}>{title}</CustomText>
                    </CustomText>
                    <CustomText style={styles.body}>
                        جزئیات: <CustomText style={{ color: colors.green }}>{message}</CustomText>
                    </CustomText>
                    {active ?
                        <SimpleButton
                            func={() => Linking.openURL("http://etcco.ir/")}
                            btnStyle={styles.btn}
                            title={language("update")}
                            titleStyle={{}}
                        />
                        :
                        <CustomText style={styles.notVersion_txt}>
                            ورژن بروز است
                        </CustomText>
                    }
                </View>
                :
                <Loading />
            }
        </View>
    );
};
export default Update;