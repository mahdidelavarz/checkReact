import React, { Component } from 'react';
import { View, Image, BackHandler, ScrollView } from 'react-native';
import DropdownAlert from 'react-native-dropdownalert';

import HelpHeader from '../../../Components/Analysis/HelpHeader/HelpHeader';
import CloseModal from '../../../Components/Analysis/CloseModal/CloseModal';
import HelpModal from '../../../Components/Analysis/HelpModal/HelpModal';
import CheckBtn from '../../../Components/Analysis/CheckBtn/CheckBtn';
import CustomText from '../../../Components/CustomText/CustomText';
import { prepareSlide } from '../../../Components/Images/Images';
import Footer from '../../../Components/Analysis/Footer/Footer';
import colors from '../../../Assets/Styles/Colors';
import languages from '../../../Assets/i18n/i18n';
import styles from './Styles';

class EightStep extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isCloseModal: false,
            isHelpModal: false,
            isCheckFull: false,
            isCheckClear: false
        };
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    handleBackButtonClick = () => {
        this.setState({ isCloseModal: false });
        return true;
    }

    onPressNextStep = () => {
        if (!this.state.isCheckFull) {
            this.dropDownAlert.alertWithType('warn', languages('step_alert'));
        } else if (!this.state.isCheckClear) {
            this.dropDownAlert.alertWithType('warn', languages('step_alert'));
        } else {
            this.props.history.push('/nineStep');
        }
    }

    render() {
        const { isCheckFull, isCheckClear } = this.state;
        return (
            <View style={styles.container}>
                <DropdownAlert
                    ref={ref => this.dropDownAlert = ref}
                    inactiveStatusBarBackgroundColor={colors.dark_green}
                    titleStyle={{ fontFamily: 'iranyekanwebbold(fanum)', fontSize: 12, color: colors.white }}
                />
                <HelpHeader
                    closeFunc={() => this.setState({ isCloseModal: true })}
                    helpFunc={() => this.setState({ isHelpModal: true })}
                    count={8}
                />
                <ScrollView style={styles.content}>
                    <View style={styles.top}>
                        <Image style={styles.top_img} source={prepareSlide} />
                    </View>
                    <View style={styles.description}>
                        <CustomText font_weight={'bold'} style={styles.description_title}>
                            {languages('fill_sample')}
                        </CustomText>
                        <CustomText style={styles.description_txt}>
                            {languages('prepare_step_8_sedcription')}
                        </CustomText>
                    </View>
                    <View style={styles.check}>
                        <CheckBtn
                            func={() => this.setState({ isCheckFull: !isCheckFull })}
                            isCheck={isCheckFull}
                            title={languages('container_check_1')}
                        />
                        <CheckBtn
                            func={() => this.setState({ isCheckClear: !isCheckClear })}
                            isCheck={isCheckClear}
                            title={languages('container_check_2')}
                            btnStyle={{ marginTop: 10 }}
                        />
                    </View>
                </ScrollView>
                <View style={styles.footer}>
                    <Footer
                        nextFunc={this.onPressNextStep}
                        screenCount={8}
                        line={'65%'}
                        backFunc={() => this.setState({ isCloseModal: true })}
                    />
                </View>
                <CloseModal
                    visible={this.state.isCloseModal}
                    closeFunc={this.onPressCloseAnalysis}
                    resumeFunc={() => this.setState({ isCloseModal: false })}
                />
                <HelpModal
                    visible={this.state.isHelpModal}
                    description={languages('help_modal_txt_step_8')}
                    closeFunc={() => this.setState({ isHelpModal: false })}
                />
            </View>
        );
    }
};
export default EightStep;