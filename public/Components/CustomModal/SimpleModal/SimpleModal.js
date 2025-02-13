import React from 'react';
import { Modal, View, TouchableHighlight, Image } from 'react-native';

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
            <View style={styles.container}>
                <View style={styles.modal}>
                    <View style={styles.modal_top}>
                        <Image style={styles.modal_top_ic} source={img} />
                        <CustomText style={styles.modal_top_title}>
                            {title}
                        </CustomText>
                        <CustomText style={styles.modal_top_description}>
                            {description}
                        </CustomText>
                    </View>
                    {mode === 'singleBtn' ?
                        <TouchableHighlight style={styles.modal_bottom_btn} underlayColor={colors.ligh_txt} onPress={right_func}>
                            <CustomText style={styles.modal_bottom_btn_txt} font_weight={'bold'}>
                                تایید
                            </CustomText>
                        </TouchableHighlight>
                        :
                        <View style={styles.modal_bottom}>
                            <TouchableHighlight style={styles.modal_bottom_btn_right} underlayColor={colors.ligh_txt} onPress={right_func}>
                                <CustomText style={styles.modal_bottom_btn_txt} font_weight={'bold'}>
                                    {isReady ? 'مشاهده' : 'بله'}
                                </CustomText>
                            </TouchableHighlight>
                            <TouchableHighlight style={styles.modal_bottom_btn_left} underlayColor={colors.ligh_txt} onPress={left_func} >
                                <CustomText font_weight={'bold'} style={[styles.modal_bottom_btn_txt, { color: colors.dark_green }]}>
                                    {isReady ? 'بعدا' : 'خیر'}
                                </CustomText>
                            </TouchableHighlight>
                        </View>
                    }
                </View>
            </View>
        </Modal>
    )
}
export default SimpleModal;