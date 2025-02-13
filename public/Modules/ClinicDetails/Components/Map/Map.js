import React from 'react';
import { View, Image, TouchableOpacity, Text } from 'react-native';
import SendIntentAndroid from 'react-native-send-intent';
import Toast from 'react-native-simple-toast';

import CustomText from '../../../../Components/CustomText/CustomText';
import { ic_direction } from '../../../../Components/Images/Images';
import { CDN_Url } from '../../../../Configs/Urls';
import styles from './Styles';


function Map(props) {
    const { img, lat, long, approximate } = props;

    const onPressRouting = () => {
        if (lat && long) {
            // مسیریابی با استفاده از نقشه پیشفرض موبایل
            SendIntentAndroid.openMaps(lat + ' ' + long, "d");
        } else {
            Toast.show("نقشه یافت نشد");
        }
    }

    return (
        <View style={styles.map}>
            <CustomText font_weight={'bold'} style={styles.map_approximate}>فاصله تقریبی
                <Text style={{ color: '#000', fontSize: 10 }}> {approximate}</Text> کیلومتر
            </CustomText>
            <View style={styles.top_map}>
                {img ?
                    <TouchableOpacity activeOpacity={0.6} onPress={onPressRouting}>
                        <Image style={styles.top_map_img} source={{ uri: `${CDN_Url.serverUrl + CDN_Url.centerMapDirUrl + img}` }} />
                    </TouchableOpacity>
                    : null
                }
            </View>
            <View style={styles.bottom_map}>
                <TouchableOpacity style={styles.bottom_map_btn} activeOpacity={0.6} onPress={onPressRouting}>
                    <Image style={styles.bottom_map_btn_ic} source={ic_direction} />
                    <CustomText font_weight={'bold'} style={styles.bottom_map_btn_txt}>مسیریابی</CustomText>
                </TouchableOpacity>
            </View>
        </View>
    );
};
export default Map;