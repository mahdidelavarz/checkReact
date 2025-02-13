import React, { useState } from 'react';
import { Modal, div, img, button, div, Picker } from 'react-native';
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
            <div style={styles.container}>
                <div style={styles.content}>
                    <button style={styles.content_header} onPress={onPressCloseModal}>
                        <img style={styles.content_header_ic} source={ic_close} />
                    </button>
                    <div style={styles.content_body}>
                        <CustomText style={styles.content_body_txt}>فیلتر بر اساس نزدیکترین کلینیک ها</CustomText>
                        <SimpleButton
                            func={onPressFilter}
                            btnStyle={styles.content_body_btn}
                            title={'یافتن'}
                            titleStyle={{}}
                        />
                    </div>
                </div>
            </div>
        </Modal>
    );
};
export default FilterModal;