import React from 'react';
import { Modal, div, button, img, div } from 'react-native';

import CustomText from '../../CustomText/CustomText';
import languages from '../../../Assets/i18n/i18n';
import { help_circle } from '../../Images/Images';
import styles from './Styles';

const HelpModal = (props) => {
    const { visible, closeFunc, description } = props;
    return (
        <Modal visible={visible} animationType='slide' transparent={true}>
            <div style={styles.container}>
                <div style={styles.content}>
                    <div style={styles.header}>
                        <div style={styles.header_circle}>
                            <img style={styles.header_circle_img} source={help_circle} />
                        </div>
                    </div>
                    <div style={styles.center}>
                        <div style={styles.center_view}>
                            <CustomText style={styles.center_view_txt}>
                                {description}
                            </CustomText>
                        </div>
                    </div>
                    <div style={styles.bottom}>
                        <button style={styles.bottom_btn} onPress={closeFunc}>
                            <CustomText style={styles.bottom_btn_txt}>
                                {languages('close')}
                            </CustomText>
                        </button>
                    </div>
                </div>
            </div>
        </Modal>
    );
};
export default HelpModal;