import React from 'react';
import {View} from 'react-native';

import CustomText from '../../../../../Components/CustomText/CustomText';
import colors from '../../../../../Assets/Styles/Colors';
import languages from '../../../../../Assets/i18n/i18n';
import styles from './Styles';

function DiscountsList(props) {
    const {discounts} = props;
    return (
        <View>
            {discounts.languages ?
                <View>
                    {
                        props.discounts.map((item, index) => (
                            <View key={index}>
                                <CustomText>
                                    {item}
                                </CustomText>
                            </View>
                        ))
                    }
                </View>
            :
                <View style={styles.empty_list}>
                    <CustomText style={styles.empty_list_message}>در حال حاضر کد تخفیفی وجود ندارد.</CustomText>
                </View>
            }
        </View>
    );
};
export default DiscountsList;