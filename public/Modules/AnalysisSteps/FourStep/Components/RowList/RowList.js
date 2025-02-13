import React, { useState } from 'react';
import { View, Image, TextInput, TouchableOpacity } from 'react-native';

import CustomText from '../../../../../Components/CustomText/CustomText';
import { sampleGranular, sampleColors, sampleVolume } from './Data';
import { ic_arrow } from '../../../../../Components/Images/Images';
import colors from '../../../../../Assets/Styles/Colors';
import languages from '../../../../../Assets/i18n/i18n';
import Storage from '../../../../../Factories/Storage';
import SlideModal from '../SlideModal/SlideModal';
import styles from './Styles';
import { onChange } from 'react-native-reanimated';

let storage = new Storage();
function RowList(props) {
    const [index, setIndex] = useState('');
    // const [title, setTitle] = useState('');
    const [isModal, setIsModal] = useState(false);
    const [titleModal, setTitleModal] = useState('');
    const [dataModal, setDataModal] = useState([]);

    const onPress = (item, index) => {
        if (index == 1) {
            setTitleModal(languages('granular'));
            setDataModal(sampleGranular);
            setIsModal(true);
            setIndex(index);
        } else if (index == 2) {
            setTitleModal(languages('sample_color'));
            setDataModal(sampleColors);
            setIsModal(true);
            setIndex(index);
        } else if (index == 3) {
            setTitleModal(languages('sample_volume'));
            setDataModal(sampleVolume);
            setIsModal(true);
            setIndex(index);
        }
    }

    const onPressModal = (item) => {
        list[index].leftText = item.value;
        setIsModal(false);
        if (index == 1) {
            storage.set("Viscosity", item.value);
        } else if (index == 2) {
            storage.set("Color", item.value);
        } else if (index == 3) {
            storage.set("Volume", item.value);
        }
    }

    const onChangeInput = (value) => {
        storage.set("Title", value)
    }

    return (
        <View>
            {
                list.map((item, index) => (
                    <TouchableOpacity key={index} style={styles.list_row} activeOpacity={0.7} onPress={() => onPress(item, index)}>
                        <View style={styles.list_row_right}>
                            <CustomText style={styles.list_row_right_txt}>
                                {item.title}
                            </CustomText>
                        </View>
                        <View style={styles.list_row_body}>
                            {index === 0 ?
                                <TextInput
                                    style={styles.list_row_body_input}
                                    placeholder="عنوان"
                                    placeholderTextColor={colors.ligh_txt}
                                    onChangeText={(value) => onChangeInput(value)}
                                />
                                :
                                <CustomText style={styles.list_row_body_txt}>
                                    {item.leftText}
                                </CustomText>
                            }
                        </View>
                        <View style={styles.list_left}>
                            <Image style={styles.list_left_ic} source={ic_arrow} />
                        </View>
                    </TouchableOpacity>
                ))
            }
            <SlideModal
                visible={isModal}
                title={titleModal}
                data={dataModal}
                onPrees={(item) => onPressModal(item)}
                closeFunc={() => setIsModal(false)}
            />
        </View>
    );
};
export default RowList;
const list = [
    { title: languages('title_analysis'), leftText: languages('optional') },
    { title: languages('granular'), leftText: languages('add') },
    { title: languages('sample_color'), leftText: languages('add') },
    { title: languages('sample_volume'), leftText: languages('add') },
];