import React from 'react';
import { div, button } from 'react-native';
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
        <div style={[styles.list, { borderColor: item.analysis.state === 'results_ready' ? colors.green : colors.ligh_txt }]}>
            <div style={styles.list_center}>
                {item.analysis.title ? (
                    <div style={styles.list_center_view}>
                        <CustomText style={styles.list_center_txt}>عنوان:</CustomText>
                        <CustomText style={{ color: colors.green }}>{item.analysis.title}</CustomText>
                    </div>
                ) : null}
                <div style={styles.list_center_view}>
                    <CustomText style={styles.list_center_txt}>تاریخ:</CustomText>
                    <CustomText style={{ color: colors.green }}>
                        {moment(item.analysis.register_date.substring(0, 10), 'YYYY/M/D').format('jYYYY/jM/jD')}
                    </CustomText>
                </div>
                <div style={styles.list_center_view}>
                    <CustomText style={styles.list_center_txt}>ساعت:</CustomText>
                    <CustomText style={{ color: colors.green }}>
                        {item.analysis.register_date.substring(11, 19)}
                    </CustomText>
                </div>
            </div>
            <button
                style={styles.ligh_btn_more}
                onPress={() => onPressItem(item)}
                activeOpacity={0.6}
            >
                <CustomText style={styles.ligh_btn_more_txt}>جزئیات بیشتر</CustomText>
            </button>
        </div>
    );
};
export default List;