import React, { useEffect, useState } from 'react';
import { BackHandler } from 'react-native';
import DropdownAlert from 'react-native-dropdownalert';
import SimpleHeader from '../../../Components/CustomHeader/SimpleHeader/SimpleHeader';
import SimpleButton from '../../../Components/CustomButton/SimpleButton';
import CustomInput from '../../../Components/CustomInput/CustomInput';
import DiscountsList from './Components/DiscountsList/DiscountsList';
import CustomText from '../../../Components/CustomText/CustomText';
import Loading from '../../../Components/Loading/Loading';
import Store from '../../../Store/Store';

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
        <div className="flex flex-col h-full p-4 bg-white">
            <DropdownAlert ref={ref => dropDownAlert = ref} />
            <SimpleHeader func={backAction} title={'کد تخفیف'} />
            {!isLoading ? (
                <div className="flex flex-col items-center flex-1">
                    <CustomInput
                        placeholder={'کد تخفیف را وارد کنید'}
                        className="w-3/5 h-11 text-center text-base border border-gray-300 rounded-md p-2"
                        event={(value) => setCode(value)}
                        onSubmitEditing={onPressSubmit}
                    />
                    <SimpleButton
                        className="w-3/5 h-9 text-center mt-4 bg-blue-500 text-white rounded-md"
                        title={'تایید'}
                        func={onPressSubmit}
                    />
                    <div className="w-full h-10 bg-gray-200 mt-8 flex items-center justify-center">
                        <CustomText className="text-base text-gray-700">
                            لیست کد تخفیف های شما
                        </CustomText>
                    </div>
                    <div className="flex-1 w-full">
                        <DiscountsList discounts={discounts} />
                    </div>
                </div>
            ) : (
                <Loading />
            )}
        </div>
    );
};
export default DiscountCode;
