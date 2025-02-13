import React from 'react';
import {Modal, div, button} from 'react-native';

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
            <div style={styles.container}>
                <div style={styles.modal}>
                    <div style={styles.modal_top}>
                        <CustomText style={styles.modal_top_title} font_weight={'bold'}>
                            {title}
                        </CustomText>
                    </div>
                    {
                        data.map((item, index) => (
                            <button 
                                key={index} 
                                activeOpacity={0.7}
                                style={styles.modal_list}
                                onPress={() => onPrees(item)}
                            >
                                <CustomText style={styles.modal_list_txt}>
                                    {item.value}
                                </CustomText>
                            </button>
                        ))
                    }
                    <button 
                        activeOpacity={0.7}
                        style={styles.modal_buttom}
                        onPress={closeFunc}
                    >
                        <CustomText style={styles.modal_buttom_txt}>لغو</CustomText>
                    </button>
                </div>
            </div>
        </Modal>
    );
};
export default SlideModal;