import React, { useState } from 'react';
import { Modal, View, Image, TouchableOpacity, ScrollView, Picker } from 'react-native';
import Geolocation from '@react-native-community/geolocation';

import SimpleButton from '../../../../Components/CustomButton/SimpleButton';
import CustomText from '../../../../Components/CustomText/CustomText';
import { ic_close } from '../../../../Components/Images/Images';
import colors from '../../../../Assets/Styles/Colors';
import styles from './Styles';

function FilterModal(props) {

    const { isVisible, onPressCloseModal, onPressFilter } = props;
    return (
        <Modal
            visible={isVisible}
            animationType='fade'
            transparent={true}
        >
            <View style={styles.container}>
                <View style={styles.content}>
                    <TouchableOpacity style={styles.content_header} onPress={onPressCloseModal}>
                        <Image style={styles.content_header_ic} source={ic_close} />
                    </TouchableOpacity>
                    <View style={styles.content_body}>
                        <CustomText style={styles.content_body_txt}>فیلتر بر اساس نزدیکترین کلینیک ها</CustomText>
                        <SimpleButton
                            func={onPressFilter}
                            btnStyle={styles.content_body_btn}
                            title={'یافتن'}
                            titleStyle={{}}
                        />
                    </View>
                </View>
            </View>
        </Modal>
    );
};
export default FilterModal;