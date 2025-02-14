import React from 'react';
import { Text, TouchableOpacity, View, Image } from 'react-native';
import moment from 'moment-jalaali';

import CustomText from '../../../../../Components/CustomText/CustomText';
import colors from '../../../../../Assets/Styles/Colors';

function List(props) {
    const onPressItem = (item) => {
        props.route.history.push(`/historyDetails/${item.analysis.id}`);
    };

    const { item } = props;
    return (
        <View className={`w-[95%] self-center bg-white border-[1px] rounded-md flex flex-col mt-2 ${item.analysis.state === 'results_ready' ? 'border-green-600' : 'border-light-gray'}`}>
            <View className="flex-1 justify-evenly">
                {item.analysis.title ? (
                    <View className="h-10 w-[90%] self-center border-b border-light-gray flex items-center justify-between flex-row">
                        <CustomText className="text-sm text-dark-txt">عنوان:</CustomText>
                        <CustomText className="text-green-600">{item.analysis.title}</CustomText>
                    </View>
                ) : null}
                <View className="h-10 w-[90%] self-center border-b border-light-gray flex items-center justify-between flex-row">
                    <CustomText className="text-sm text-dark-txt">تاریخ:</CustomText>
                    <CustomText className="text-green-600">
                        {moment(item.analysis.register_date.substring(0, 10), 'YYYY/M/D').format('jYYYY/jM/jD')}
                    </CustomText>
                </View>
                <View className="h-10 w-[90%] self-center border-b border-light-gray flex items-center justify-between flex-row">
                    <CustomText className="text-sm text-dark-txt">ساعت:</CustomText>
                    <CustomText className="text-green-600">
                        {item.analysis.register_date.substring(11, 19)}
                    </CustomText>
                </View>
            </View>
            <TouchableOpacity
                className="w-full h-10 bg-green-600 justify-center rounded-b-md"
                onPress={() => onPressItem(item)}
            >
                <CustomText className="text-lg text-white text-center">جزئیات بیشتر</CustomText>
            </TouchableOpacity>
        </View>
    );
};
export default List;
