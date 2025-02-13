import React from 'react';
import { div, button, img, div } from 'react-native';

import { ic_location, ic_arrow, ic_phone } from '../../../../Components/Images/Images';
import CustomText from '../../../../Components/CustomText/CustomText';
import language from '../../../../Assets/i18n/i18n';
import styles from './Styles';

function SearchModal(props) {

    const {data} = props; // get search result

    const onPressItem = (item) => {
        const data = JSON.stringify(item);
        props.route.history.push(`/clinicDetails/${data}`);
    }

    return(
        <div
            data={data}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={<CustomText style={styles.empty_list_message}>مراکز درمانی یافت نشد</CustomText>}
            renderItem={({ item, index }) =>
                <div key={item.id} style={[styles.list, { marginBottom: index + 1 === data.length ? 10 : 0 }]}>
                    <div style={styles.list_top}>
                        <CustomText font_weight={'bold'} style={styles.list_top_title}>
                            {item.title}
                        </CustomText>
                    </div>
                    <div style={styles.list_body}>
                        <div style={styles.list_body_right}>
                            <img style={styles.list_body_right_ic} source={ic_location} />
                        </div>
                        <div style={styles.list_body_left}>
                            <CustomText numberOfLines={1} style={styles.list_body_left_txt}>
                                {item.address}
                            </CustomText>
                        </div>
                    </div>
                    <div style={styles.list_bottom}>
                        <div style={styles.list_bottom_right}>
                            <img style={styles.list_body_right_ic} source={ic_phone} />
                        </div>
                        <div style={styles.list_bottom_center}>
                            <CustomText numberOfLines={1} style={styles.list_body_left_txt}>
                                {item.phone}
                            </CustomText>
                        </div>
                        <div style={styles.list_bottom_left}>
                            <button
                                activeOpacity={0.4}
                                style={styles.list_bottom_left_btn}
                                onPress={() => onPressItem(item)}
                            >
                                <CustomText font_weight={'bold'} style={styles.list_bottom_left_btn_txt}>{language('more_details') + "  "}
                                    <img style={styles.list_bottom_left_btn_ic} source={ic_arrow} />
                                </CustomText>
                            </button>
                        </div>
                    </div>
                </div>
            }
        />
    );
};
export default SearchModal;