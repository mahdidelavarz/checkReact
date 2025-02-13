import React from 'react';
import { View, TouchableOpacity, Image, FlatList } from 'react-native';

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
        <FlatList
            data={data}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={<CustomText style={styles.empty_list_message}>مراکز درمانی یافت نشد</CustomText>}
            renderItem={({ item, index }) =>
                <View key={item.id} style={[styles.list, { marginBottom: index + 1 === data.length ? 10 : 0 }]}>
                    <View style={styles.list_top}>
                        <CustomText font_weight={'bold'} style={styles.list_top_title}>
                            {item.title}
                        </CustomText>
                    </View>
                    <View style={styles.list_body}>
                        <View style={styles.list_body_right}>
                            <Image style={styles.list_body_right_ic} source={ic_location} />
                        </View>
                        <View style={styles.list_body_left}>
                            <CustomText numberOfLines={1} style={styles.list_body_left_txt}>
                                {item.address}
                            </CustomText>
                        </View>
                    </View>
                    <View style={styles.list_bottom}>
                        <View style={styles.list_bottom_right}>
                            <Image style={styles.list_body_right_ic} source={ic_phone} />
                        </View>
                        <View style={styles.list_bottom_center}>
                            <CustomText numberOfLines={1} style={styles.list_body_left_txt}>
                                {item.phone}
                            </CustomText>
                        </View>
                        <View style={styles.list_bottom_left}>
                            <TouchableOpacity
                                activeOpacity={0.4}
                                style={styles.list_bottom_left_btn}
                                onPress={() => onPressItem(item)}
                            >
                                <CustomText font_weight={'bold'} style={styles.list_bottom_left_btn_txt}>{language('more_details') + "  "}
                                    <Image style={styles.list_bottom_left_btn_ic} source={ic_arrow} />
                                </CustomText>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            }
        />
    );
};
export default SearchModal;