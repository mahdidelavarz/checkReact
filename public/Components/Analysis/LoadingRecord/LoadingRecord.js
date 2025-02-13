import React from 'react';
import { Modal, View, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';

import { loading, ic_close } from '../../Images/Images';
import CustomText from '../../CustomText/CustomText';
import colors from '../../../Assets/Styles/Colors';

const width = Dimensions.get('window').width;

function LoadingRecord(props) {
    const { isVisible } = props;
    return (
        <Modal
            visible={isVisible}
            animated={'fade'}
            transparent={false}
        >
            <View style={styles.container}>
                <View style={styles.header}>
                    <CustomText style={styles.header_txt}>تایید صحت اطلاعات</CustomText>
                </View>
                <View style={styles.content}>
                    <Image style={styles.loading_gif} resizeMode='stretch' source={loading} />
                    <CustomText style={styles.message}>
                        سیستم در حال ارسال اطلاعات ارسالی می باشد لطفا منتظر بمانید.
                    </CustomText>
                </View>
            </View>
        </Modal>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white
    },
    header: {
        width: '100%',
        height: 55,
        backgroundColor: colors.white,
        justifyContent: 'center',
        borderBottomColor: colors.light_gray,
        borderBottomWidth: 3,
    },
    header_txt: {
        fontSize: 16,
        color: colors.dark_txt,
        textAlign: 'center'
    },
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    loading_gif: {
        width: width / 3,
        height: width / 3
    },
    message: {
        fontSize: 14,
        width: '70%',
        textAlign: 'center',
        marginTop: 15,
        color: colors.light_txt
    }
});
export default LoadingRecord;