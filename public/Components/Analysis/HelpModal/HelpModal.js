import React from 'react';
import { Modal, View, TouchableOpacity, Image, ScrollView } from 'react-native';

import CustomText from '../../CustomText/CustomText';
import languages from '../../../Assets/i18n/i18n';
import { help_circle } from '../../Images/Images';
import styles from './Styles';

const HelpModal = (props) => {
    const { visible, closeFunc, description } = props;
    return (
        <Modal visible={visible} animationType='slide' transparent={true}>
            <View style={styles.container}>
                <View style={styles.content}>
                    <View style={styles.header}>
                        <View style={styles.header_circle}>
                            <Image style={styles.header_circle_img} source={help_circle} />
                        </View>
                    </View>
                    <ScrollView style={styles.center}>
                        <View style={styles.center_view}>
                            <CustomText style={styles.center_view_txt}>
                                {description}
                            </CustomText>
                        </View>
                    </ScrollView>
                    <View style={styles.bottom}>
                        <TouchableOpacity style={styles.bottom_btn} onPress={closeFunc}>
                            <CustomText style={styles.bottom_btn_txt}>
                                {languages('close')}
                            </CustomText>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};
export default HelpModal;