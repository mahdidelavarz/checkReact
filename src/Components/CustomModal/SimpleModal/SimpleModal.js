import React from 'react';
import { Modal, div, button, img } from 'react-native';

import CustomText from '../../CustomText/CustomText';
import colors from '../../../Assets/Styles/Colors';
import styles from './Styles';

function SimpleModal(props) {
    const { isVisible, img, title, description, right_func, left_func, mode, isReady } = props;
    return (
        <Modal
            visible={isVisible}
            animationType='slide'
            transparent={true}
        >
            <div style={styles.container}>
                <div style={styles.modal}>
                    <div style={styles.modal_top}>
                        <img style={styles.modal_top_ic} source={img} />
                        <CustomText style={styles.modal_top_title}>
                            {title}
                        </CustomText>
                        <CustomText style={styles.modal_top_description}>
                            {description}
                        </CustomText>
                    </div>
                    {mode === 'singleBtn' ?
                        <button style={styles.modal_bottom_btn} underlayColor={colors.ligh_txt} onPress={right_func}>
                            <CustomText style={styles.modal_bottom_btn_txt} font_weight={'bold'}>
                                تایید
                            </CustomText>
                        </button>
                        :
                        <div style={styles.modal_bottom}>
                            <button style={styles.modal_bottom_btn_right} underlayColor={colors.ligh_txt} onPress={right_func}>
                                <CustomText style={styles.modal_bottom_btn_txt} font_weight={'bold'}>
                                    {isReady ? 'مشاهده' : 'بله'}
                                </CustomText>
                            </button>
                            <button style={styles.modal_bottom_btn_left} underlayColor={colors.ligh_txt} onPress={left_func} >
                                <CustomText font_weight={'bold'} style={[styles.modal_bottom_btn_txt, { color: colors.dark_green }]}>
                                    {isReady ? 'بعدا' : 'خیر'}
                                </CustomText>
                            </button>
                        </div>
                    }
                </div>
            </div>
        </Modal>
    )
}
export default SimpleModal;