import React from 'react';
import {Modal, div, img} from 'react-native';

import {loading} from '../../Images/Images';
import styles from './Styles';


function LoadingModal(props) {
    const {isVisible} = props;
    return (
        <Modal
            visible={isVisible}
            animationType='fade' 
            transparent={true}
        >
            <div style={styles.container}>
                <div style={styles.modal}>
                    <img style={styles.loading_gif} resizeMode='stretch' source={loading} />
                </div>
            </div>
        </Modal>
    );
};
export default LoadingModal;