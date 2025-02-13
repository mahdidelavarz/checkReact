import React, { Component } from 'react';
import { View, Image, TouchableHighlight, BackHandler, ScrollView } from 'react-native';
import Toast from 'react-native-simple-toast';

import CustomText from '../../../Components/CustomText/CustomText';
import { } from '../../../Components/Images/Images';
import colors from '../../../Assets/Styles/Colors';
import languages from '../../../Assets/i18n/i18n';
import Storage from '../../../Factories/Storage';
import styles from './Styles';

let storage = new Storage();
class ResultAnalysis extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    handleBackButtonClick = () => {
        Toast.show("امکان برگشت به عقب وجود ندارد");
        this.props.history.goBack();
        return true;
    }

    onPreesBackToMainScreen = () => {
        // multiRemove data from local storage
        const keys = [
            "VideoRecord1", "VideoRecord2", "VideoRecord3", "Viscosity",
            "Color", "Volume", "Title"
        ];
        storage.multiRemove(keys)
        this.props.history.push('/tabBar');
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <CustomText font_weight={'bold'} style={styles.header_title}>
                        {languages('analyzing_information')}
                    </CustomText>
                </View>
                <View style={styles.content}>
                    <View style={styles.content_center}>
                        <CustomText style={styles.content_center_txt}>
                            {languages('end_analyzing')}
                        </CustomText>
                    </View>
                    <View style={styles.content_bottom}>
                        <TouchableHighlight style={styles.content_bottom_btn} underlayColor={colors.dark_green} onPress={this.onPreesBackToMainScreen}>
                            <CustomText style={styles.content_bottom_btn_txt}>
                                {languages('back_to_mainPage')}
                            </CustomText>
                        </TouchableHighlight>
                    </View>
                </View>
            </View>
        );
    }
};
export default ResultAnalysis;