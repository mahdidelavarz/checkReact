import React from 'react';
import { View, Image, FlatList, TouchableOpacity, Vibration } from 'react-native';
import Toast from 'react-native-simple-toast';
import moment from 'moment-jalaali';

import { ic_date, ic_about, ic_barcode } from '../../../../../Components/Images/Images';
import CustomText from '../../../../../Components/CustomText/CustomText';
import colors from '../../../../../Assets/Styles/Colors';
import languages from '../../../../../Assets/i18n/i18n';
import Storage from '../../../../../Factories/Storage';
import styles from './Styles';

let Token;
let storage = new Storage();
class GadgetList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectGadget: this.props.selected
        }
    }

    onPressItem(item, index, func) {
        this.setState({ selectGadget: index });
        func(index);
        storage.set("SerialNumber", item.serial_number);
        Toast.show("گجت با موفقیت ثبت شد");
        Vibration.vibrate();
    }

    render() {
        const { func } = this.props;
        const { selectGadget } = this.state;
        return (
            <View style={{ flexDirection: 'column' }}>
                <View style={styles.header}>
                    <CustomText font_weight={'bold'} style={styles.header_title}>
                        {languages('gadget_list')}
                    </CustomText>
                </View>
                <View style={styles.list}>
                    <FlatList
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        data={this.props.data}
                        renderItem={({ item, index }) =>
                            <TouchableOpacity
                                key={index}
                                activeOpacity={0.6}
                                style={[styles.main_row, {
                                    borderColor: selectGadget === index ? colors.green : colors.ligh_txt,
                                    backgroundColor: selectGadget === index ? '#E4FFF9' : colors.white
                                }]}
                                onPress={() => this.onPressItem(item, index, func)}
                            >
                                <View style={styles.row}>
                                    <View style={styles.row_right}>
                                        <Image style={styles.row_right_ic} source={ic_barcode} />
                                    </View>
                                    <View style={styles.row_left}>
                                        <CustomText numberOfLines={1} style={styles.row_left_txt}>{languages('serial') + ' '}
                                            <CustomText style={{ color: colors.black }}>
                                                {item.serial_number}
                                            </CustomText>
                                        </CustomText>
                                    </View>
                                </View>
                                <View style={styles.row}>
                                    <View style={styles.row_right}>
                                        <Image style={styles.row_right_ic} source={ic_date} />
                                    </View>
                                    <View style={styles.row_left}>
                                        <CustomText style={styles.row_left_txt}>{languages('expire_date') + ' '}
                                            <CustomText style={{ color: colors.black }}>
                                                {moment(item.expiration_date, 'YYYY/M/D').format('jYYYY/jM/jD')}
                                            </CustomText>
                                        </CustomText>
                                    </View>
                                </View>
                                <View style={styles.row}>
                                    <View style={styles.row_right}>
                                        <Image style={styles.row_right_ic} source={ic_about} />
                                    </View>
                                    <View style={styles.row_left}>
                                        <CustomText style={styles.row_left_txt}>{languages('remaining_count') + ' '}
                                            <CustomText style={{ color: colors.black }}>
                                                {item.remaining_count}
                                            </CustomText>
                                        </CustomText>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        }
                        keyExtractor={(item, index) => index.toString()}
                    />
                </View>
            </View>
        );
    }
};
export default GadgetList;