import React from 'react';
import {Modal, View, ScrollView, Linking} from 'react-native';

import SimpleButton from '../../../../../Components/CustomButton/SimpleButton';
import CustomText from '../../../../../Components/CustomText/CustomText';
import colors from '../../../../../Assets/Styles/Colors';
import styles from './Styles';

function UpdateAppModal(props) {
    const {isVisible, title, body, closeModal} = props;
    return (
        <Modal
            visible={isVisible}
            transparent={true}
            animationType={'fade'}
        >
            <View style={styles.container}>
                <View style={styles.content}>
                    <CustomText font_weight={'bold'} style={styles.title}>
                        {title}
                    </CustomText>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <CustomText style={styles.body}>
                            {body}
                        </CustomText>
                    </ScrollView>
                    <View style={{flexDirection: 'row', width: '90%'}}>
                        <SimpleButton 
                            func={() => Linking.openURL("http://etcco.ir/")}
                            btnStyle={{width: '50%', marginRight: 2,}} 
                            title={'آپدیت'} 
                            titleStyle={{}}
                        />
                        <SimpleButton 
                            func={closeModal}
                            btnStyle={{width: '50%'}} 
                            title={'لغو'} 
                            titleStyle={{}}
                        />
                    </View>
                </View>
            </View>
        </Modal>
    );
};
export default UpdateAppModal;