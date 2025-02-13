import React from 'react';
import {Modal, View, Image} from 'react-native';

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
            <View style={styles.container}>
                <View style={styles.modal}>
                    <Image style={styles.loading_gif} resizeMode='stretch' source={loading} />
                </View>
            </View>
        </Modal>
    );
};
export default LoadingModal;