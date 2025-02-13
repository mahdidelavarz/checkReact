import React from 'react';
import {Modal, View, TouchableOpacity, Image, ScrollView} from 'react-native';
import {Link} from 'react-router-native'; 

import CustomText from '../../CustomText/CustomText';
import colors from '../../../Assets/Styles/Colors';
import languages from '../../../Assets/i18n/i18n';
import {alert} from '../../Images/Images';
import styles from './Styles';

function CloseModal(props) {
    const {visible, resumeFunc} = props;
    return (
        <Modal visible={visible} animationType='slide' transparent={true}>
            <View style={styles.container}>
                <View style={styles.content}>
                    <View style={styles.header}>
                        <View style={styles.header_circle}>
                            <Image style={styles.header_circle_img} source={alert} />
                        </View>
                    </View>
                    <ScrollView style={styles.center}>
                        <View style={styles.center_view}>
                            <CustomText style={styles.center_view_txt}>
                                {languages('close_modal_txt')}
                            </CustomText>
                        </View>
                    </ScrollView>
                    <View style={styles.bottom}>
                        <TouchableOpacity activeOpacity={0.7} style={[styles.bottom_btn, styles.buttom_2]} onPress={resumeFunc}>
                            <CustomText style={styles.bottom_btn_txt}>
                                {languages('resume_analysis')}
                            </CustomText>
                        </TouchableOpacity>
                        <Link underlayColor={colors.violet} style={styles.bottom_btn} to={'/tabBar'}>
                            <CustomText style={styles.bottom_btn_txt}>
                                {languages('close_analysis')}
                            </CustomText>
                        </Link>
                    </View>
                </View>
            </View>
        </Modal>
    );
};
export default CloseModal;