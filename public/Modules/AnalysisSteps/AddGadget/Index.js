import React, { Component } from 'react';
import { View, Image, TouchableOpacity, BackHandler } from 'react-native';

import SimpleHeader from '../../../Components/CustomHeader/SimpleHeader/SimpleHeader';
import { ic_scan, gadgetScan } from '../../../Components/Images/Images';
import CustomText from '../../../Components/CustomText/CustomText';
import styles from './Styles';

class AddGadget extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    handleBackButtonClick = () => {
        this.props.history.goBack();
        return true;
    }

    render() {
        return (
            <View style={styles.container}>
                <SimpleHeader
                    func={() => this.props.history.push('/secondStep')}
                    title={'اضافه کردن گجت'}
                />
                <View style={styles.content}>
                    <View style={styles.top}>
                        <Image style={styles.top_img} source={gadgetScan} />
                        <CustomText style={styles.top_txt}>

                        </CustomText>
                    </View>
                    <View style={styles.bottom}>
                        <TouchableOpacity activeOpacity={0.7} style={styles.bottom_btn} onPress={() => this.props.history.push('/qRCodeScan')}>
                            <CustomText style={styles.bottom_btn_txt}>
                                اسکن
                            </CustomText>
                            <Image style={styles.bottom_btn_ic} source={ic_scan} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
};
export default AddGadget;