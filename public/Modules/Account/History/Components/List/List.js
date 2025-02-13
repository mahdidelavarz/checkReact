import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import moment from 'moment-jalaali';

import CustomText from '../../../../../Components/CustomText/CustomText';
import colors from '../../../../../Assets/Styles/Colors';
import styles from './Styles';

function List(props) {

    const onPressItem = (item) => {
        // console.log("item", item)
        props.route.history.push(`/historyDetails/${item.analysis.id}`);
    };

    const { item } = props;
    return (
        <View style={[styles.list, { borderColor: item.analysis.state === 'results_ready' ? colors.green : colors.ligh_txt }]}>
            <View style={styles.list_center}>
                {item.analysis.title ? (
                    <View style={styles.list_center_view}>
                        <CustomText style={styles.list_center_txt}>عنوان:</CustomText>
                        <CustomText style={{ color: colors.green }}>{item.analysis.title}</CustomText>
                    </View>
                ) : null}
                <View style={styles.list_center_view}>
                    <CustomText style={styles.list_center_txt}>تاریخ:</CustomText>
                    <CustomText style={{ color: colors.green }}>
                        {moment(item.analysis.register_date.substring(0, 10), 'YYYY/M/D').format('jYYYY/jM/jD')}
                    </CustomText>
                </View>
                <View style={styles.list_center_view}>
                    <CustomText style={styles.list_center_txt}>ساعت:</CustomText>
                    <CustomText style={{ color: colors.green }}>
                        {item.analysis.register_date.substring(11, 19)}
                    </CustomText>
                </View>
            </View>
            <TouchableOpacity
                style={styles.ligh_btn_more}
                onPress={() => onPressItem(item)}
                activeOpacity={0.6}
            >
                <CustomText style={styles.ligh_btn_more_txt}>جزئیات بیشتر</CustomText>
            </TouchableOpacity>
        </View>
    );
};
export default List;