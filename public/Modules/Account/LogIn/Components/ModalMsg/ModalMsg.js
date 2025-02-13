import React from 'react';
import {Modal, View, TouchableOpacity, Image} from 'react-native';

import CustomText from '../../../../../Components/CustomText/CustomText';
import {ic_user} from '../../../../../Components/Images/Images';
import colors from '../../../../../Assets/Styles/Colors';
import styles from './Styles';

function ModalMsg(props) {
    const {isVisible, func} = props;
    return (
        <Modal 
            visible={isVisible}
            animated='fade'
            transparent={true}
        >
            <View style={styles.container}>
                <View style={styles.content}>
                    <View style={styles.circle}>
                        <Image style={styles.circle_ic} source={ic_user} />
                    </View>
                    <CustomText style={styles.message}>
                        شما به عنوان کاربر ناشناس به اپلیکیشن وارد خواهید شد. هیچ اطلاعاتی از سوابق شما روی فضای ابری ذخیره نخواهد شد. توجه داسته باشد در صورتی که نیاز به بازیابی نتایج دارید بصورت کاربر عادی در سیستم ثبت نام کنید.
                    </CustomText>
                    <TouchableOpacity 
                        style={styles.btn}
                        activeOpacity={0.7}
                        onPress={func}
                    >
                        <CustomText style={styles.btn_txt}>ورود مهمان</CustomText>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};
export default ModalMsg;