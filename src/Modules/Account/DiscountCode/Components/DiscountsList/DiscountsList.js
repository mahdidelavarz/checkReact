import React from 'react';
import {div} from 'react-native';

import CustomText from '../../../../../Components/CustomText/CustomText';
import colors from '../../../../../Assets/Styles/Colors';
import languages from '../../../../../Assets/i18n/i18n';
import styles from './Styles';

function DiscountsList(props) {
    const {discounts} = props;
    return (
        <div>
            {discounts.languages ?
                <div>
                    {
                        props.discounts.map((item, index) => (
                            <div key={index}>
                                <CustomText>
                                    {item}
                                </CustomText>
                            </div>
                        ))
                    }
                </div>
            :
                <div style={styles.empty_list}>
                    <CustomText style={styles.empty_list_message}>در حال حاضر کد تخفیفی وجود ندارد.</CustomText>
                </div>
            }
        </div>
    );
};
export default DiscountsList;