import React, { Component } from 'react';
import { div, ImageBackground, StatusBar, div, img, button } from 'react-native';
import DropdownAlert from 'react-native-dropdownalert';
import Toast from 'react-native-simple-toast';
import { Link } from 'react-router-native';


import { auto_back, auto_back_rtl, about, ic_change_lang, ic_circle, ic_circle_check } from '../../Components/Images/Images';
import CustomText from '../../Components/CustomText/CustomText';
import colors from '../../Assets/Styles/Colors';
import language from '../../Assets/i18n/i18n';
import styles from './Styles';

class Conditions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isCheck: false
        }
    }

    nextStep = () => {
        if (!this.state.isCheck) {
            this.dropDownAlertRef.alertWithType('warn', language('notAcceptAlert'));
        } else {
            this.props.history.push('/logIn');
        }
    }

    render() {
        const { isCheck } = this.state;
        return (
            <ImageBackground style={styles.container} source={auto_back}>
                <DropdownAlert
                    ref={ref => this.dropDownAlertRef = ref}
                    inactiveStatusBarBackgroundColor={colors.dark_green}
                    titleStyle={{ fontFamily: 'iranyekanwebbold(fanum)', fontSize: 10, color: colors.white }}
                />
                <StatusBar backgroundColor={colors.dark_green} barStyle={'light-content'} />
                <div style={styles.header}>
                    <CustomText style={styles.header_txt}>
                        {language('term_title')}
                    </CustomText>
                </div>
                <button style={styles.header_btn} onPress={() => Toast.show("این صفحه هنوز آماده نشده است")}>
                    <img style={styles.header_btn_ic} source={ic_change_lang} />
                </button>
                {/* <Link to={'/languages/conditions'} underlayColor={'transparent'} style={styles.header_btn}>
                    <img style={styles.header_btn_ic} source={ic_change_lang} />
                </Link> */}
                <div style={styles.content}>
                    <div style={styles.content_top}>
                        <img style={styles.content_top_img} source={about} />
                        <CustomText font_weight={'bold'} style={styles.content_top_txt}>
                            {language('term_head')}
                        </CustomText>
                    </div>
                    <div style={styles.content_center}>
                        <div showsVerticalScrollIndicator={false}>
                            <CustomText style={styles.content_center_txt}>
                                {language('term')}
                            </CustomText>
                        </div>
                    </div>
                    <div style={styles.content_bottom}>
                        <button activeOpacity={0.6} style={styles.content_bottom_check_btn} onPress={() => this.setState({ isCheck: !this.state.isCheck })}>
                            <img
                                style={[styles.content_bottom_check_btn_ic,]}
                                source={!isCheck ? ic_circle : ic_circle_check}
                            />
                            <CustomText style={styles.content_bottom_check_btn_txt} font_weight={'bold'}>
                                {language('accept')}
                            </CustomText>
                        </button>
                        <button activeOpacity={0.8} style={styles.content_bottom_btn} onPress={this.nextStep}>
                            <CustomText style={styles.content_bottom_btn_txt}>ادامه</CustomText>
                        </button>
                    </div>
                </div>
            </ImageBackground>
        );
    }
};
export default Conditions;