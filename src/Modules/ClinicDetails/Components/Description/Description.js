import React from 'react';
import {div} from 'react-native';

import CustomText from '../../../../Components/CustomText/CustomText';
import {ic_description} from '../../../../Components/Images/Images';
import language from '../../../../Assets/i18n/i18n';
import SimpleRow from '../SimpleRow/SimpleRow';
import styles from './Styles';

const Description = (props) => {
    const {description} = props;
    return (
        <div>
            <SimpleRow 
                ic={ic_description} title={language('description')} body={''}
            />
            <div style={styles.view_description}>
                <CustomText style={styles.view_description_txt}>
                    {description}
                </CustomText>
            </div>
        </div>
    );
};
export default Description;