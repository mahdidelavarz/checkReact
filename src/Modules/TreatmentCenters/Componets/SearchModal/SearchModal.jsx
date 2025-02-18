import React from 'react';
import { ScrollView, Button, Image } from 'react-native';
import { ic_location, ic_arrow, ic_phone } from '../../../../Components/Images/Images';
import CustomText from '../../../../Components/CustomText/CustomText';
import language from '../../../../Assets/i18n/i18n';

function SearchModal(props) {
    const { data } = props; // get search result

    const onPressItem = (item) => {
        const data = JSON.stringify(item);
        props.route.history.push(`/clinicDetails/${data}`);
    }

    return (
        <ScrollView
            data={data}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={<CustomText className="text-center text-black text-sm mt-[calc(50vh-50px)]">مراکز درمانی یافت نشد</CustomText>}
        >
            {data.map((item, index) => (
                <div key={item.id} className={`w-[95%] h-[150px] bg-white border-[0.7px] border-[#D1D1D6] rounded-[5px] mt-[10px] mx-auto ${index + 1 === data.length ? 'mb-[10px]' : ''}`}>
                    <div className="flex-3 justify-center">
                        <CustomText className="font-bold text-[16px] text-dark text-center">{item.title}</CustomText>
                    </div>
                    <div className="flex-3.5 flex-row">
                        <div className="flex-1 items-center justify-center">
                            <Image className="w-[20px] h-[20px] tint-green" source={ic_location} />
                        </div>
                        <div className="flex-9 justify-center">
                            <CustomText numberOfLines={1} className="text-[14px] w-[98%] text-dark text-left">{item.address}</CustomText>
                        </div>
                    </div>
                    <div className="flex-3.5 flex-row">
                        <div className="flex-1 items-center justify-center">
                            <Image className="w-[20px] h-[20px] tint-green" source={ic_phone} />
                        </div>
                        <div className="flex-4 items-start justify-center">
                            <CustomText numberOfLines={1} className="text-[14px] w-[98%] text-dark text-left">{item.phone}</CustomText>
                        </div>
                        <div className="flex-4.5 items-center justify-center">
                            <Button
                                activeOpacity={0.4}
                                className="w-[80%] h-[70%] rounded-[5px] items-center justify-center bg-green-500"
                                onPress={() => onPressItem(item)}
                            >
                                <CustomText className="font-bold text-[14px] w-[98%] text-white text-center">
                                    {language('more_details')} <Image className="w-[10px] h-[10px] mt-[5px] tint-white" source={ic_arrow} />
                                </CustomText>
                            </Button>
                        </div>
                    </div>
                </div>
            ))}
        </ScrollView>
    );
}

export default SearchModal;
