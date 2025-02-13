import React from 'react';
import {Modal, View, TouchableOpacity} from 'react-native';

import CustomText from '../../../../../Components/CustomText/CustomText';
import colors from '../../../../../Assets/Styles/Colors';
import styles from './Styles';

function SlideModal(props) {
    const {visible, title, data, onPrees, closeFunc} = props;
    return (
        <Modal 
            visible={visible}
            animationType={'fade'}
            transparent={true}
        >
            <View style={styles.container}>
                <View style={styles.modal}>
                    <View style={styles.modal_top}>
                        <CustomText style={styles.modal_top_title} font_weight={'bold'}>
                            {title}
                        </CustomText>
                    </View>
                    {
                        data.map((item, index) => (
                            <TouchableOpacity 
                                key={index} 
                                activeOpacity={0.7}
                                style={styles.modal_list}
                                onPress={() => onPrees(item)}
                            >
                                <CustomText style={styles.modal_list_txt}>
                                    {item.value}
                                </CustomText>
                            </TouchableOpacity>
                        ))
                    }
                    <TouchableOpacity 
                        activeOpacity={0.7}
                        style={styles.modal_buttom}
                        onPress={closeFunc}
                    >
                        <CustomText style={styles.modal_buttom_txt}>لغو</CustomText>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};
export default SlideModal;