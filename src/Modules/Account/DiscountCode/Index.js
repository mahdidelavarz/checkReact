import React, { useEffect, useState } from 'react';
import { div, div, BackHandler } from 'react-native';
import DropdownAlert from 'react-native-dropdownalert';

import SimpleHeader from '../../../Components/CustomHeader/SimpleHeader/SimpleHeader';
import SimpleButton from '../../../Components/CustomButton/SimpleButton';
import CustomInput from '../../../Components/CustomInput/CustomInput';
import DiscountsList from './Components/DiscountsList/DiscountsList';
import CustomText from '../../../Components/CustomText/CustomText';
import Loading from '../../../Components/Loading/Loading';
import { } from '../../../Components/Images/Images';
import colors from '../../../Assets/Styles/Colors';
import language from '../../../Assets/i18n/i18n';
import Store from '../../../Store/Store';
import styles from './Styles';

let Token;
let dropDownAlert;
function DiscountCode(props) {
    const [discounts, setDiscounts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [code, setCode] = useState('');

    useEffect(() => {
        const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);
        return () => backHandler.remove();
    }, []);

    const onPressSubmit = () => {
        if (!code) {
            dropDownAlert.alertWithType('warn', 'کد تخفیف را وارد کنید');
        } else {
            setIsLoading(true);
        }
    }

    const backAction = () => {
        Store.incrementTabBar();
        props.history.goBack();
        return true;
    }


    return (
        <div style={styles.container}>
            <DropdownAlert
                ref={ref => dropDownAlert = ref}
                inactiveStatusBarBackgroundColor={colors.dark_green}
                titleStyle={{ fontFamily: 'iranyekanwebbold(fanum)', fontSize: 12, color: colors.white }}
            />
            <SimpleHeader
                func={backAction}
                title={'کد تخفیف'}
            />
            {!isLoading ?
                <div style={{ flex: 1 }}>
                    <CustomInput
                        placeholder={'کد تخفیف را وارد کنید'}
                        style={styles.input}
                        event={(value) => setCode(value)}
                        onSubmitEditing={onPressSubmit}
                    />
                    <SimpleButton
                        btnStyle={styles.btn}
                        title={'تایید'}
                        func={onPressSubmit}
                    />
                    <div style={styles.list_header}>
                        <CustomText style={styles.list_header_title}>
                            لیست کد تخفیف های شما
                            </CustomText>
                    </div>
                    <div style={styles.content}>
                        <DiscountsList discounts={discounts} />
                    </div>
                </div>
                :
                <Loading />
            }
        </div>
    );
};
export default DiscountCode;