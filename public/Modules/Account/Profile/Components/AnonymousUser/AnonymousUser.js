import React from 'react';
import {View} from 'react-native';

import SimpleButton from '../../../../../Components/CustomButton/SimpleButton';
import CustomText from '../../../../../Components/CustomText/CustomText';
import colors from '../../../../../Assets/Styles/Colors';
import languages from '../../../../../Assets/i18n/i18n';
import styles from './Styles';


function AnonymousUser(props){
    return (
        <View style={styles.container}>
            <CustomText font_weight={'bold'} style={styles.title}>
                {languages('empty_account_txt')}
            </CustomText>
            <CustomText style={styles.description_txt}>
                {languages('empty_account_description')}
            </CustomText>
            <View style={styles.view_btn}>
                <SimpleButton 
                    func={() => props.param.route.history.push('/signUp')}
                    btnStyle={styles.btn} 
                    title={languages('signup')} 
                    titleStyle={{color: colors.green}}
                />
                <SimpleButton 
                    func={() => props.param.route.history.push('/signIn')}
                    btnStyle={{height: 40}} 
                    title={languages('login')} 
                    titleStyle={{}}
                />
            </View>
        </View>
    );
};
export default AnonymousUser;