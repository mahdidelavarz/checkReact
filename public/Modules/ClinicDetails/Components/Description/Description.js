import React from 'react';
import {View} from 'react-native';

import CustomText from '../../../../Components/CustomText/CustomText';
import {ic_description} from '../../../../Components/Images/Images';
import language from '../../../../Assets/i18n/i18n';
import SimpleRow from '../SimpleRow/SimpleRow';
import styles from './Styles';

const Description = (props) => {
    const {description} = props;
    return (
        <View>
            <SimpleRow 
                ic={ic_description} title={language('description')} body={''}
            />
            <View style={styles.view_description}>
                <CustomText style={styles.view_description_txt}>
                    {description}
                </CustomText>
            </View>
        </View>
    );
};
export default Description;