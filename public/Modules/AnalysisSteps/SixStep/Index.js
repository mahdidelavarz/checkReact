import React, { Component } from 'react';
import { View, ScrollView, BackHandler, Image } from 'react-native';
import DropdownAlert from 'react-native-dropdownalert';

import HelpHeader from '../../../Components/Analysis/HelpHeader/HelpHeader';
import CloseModal from '../../../Components/Analysis/CloseModal/CloseModal';
import HelpModal from '../../../Components/Analysis/HelpModal/HelpModal';
import CheckBtn from '../../../Components/Analysis/CheckBtn/CheckBtn';
import CustomText from '../../../Components/CustomText/CustomText';
import { attachGadget } from '../../../Components/Images/Images';
import Footer from '../../../Components/Analysis/Footer/Footer';
import colors from '../../../Assets/Styles/Colors';
import languages from '../../../Assets/i18n/i18n';
import styles from './Styles';

class SixStep extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isCloseModal: false,
            isHelpModal: false,
            isCheck: false,
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
        if (!this.state.isCheck) {
            this.dropDownAlert.alertWithType('warn', languages('step_alert'));
        } else {
            this.props.history.push('/sevenStep');
        }
    }

    render() {
        const { isCheck } = this.state;
        return (
            <View style={styles.container}>
                <DropdownAlert ref={ref => this.dropDownAlert = ref}
                    inactiveStatusBarBackgroundColor={colors.dark_green}
                    titleStyle={{ fontFamily: 'iranyekanwebbold(fanum)', fontSize: 12, color: colors.white }}
                />
                <HelpHeader
                    closeFunc={() => this.setState({ sCloseModal: true })}
                    helpFunc={() => this.setState({ isHelpModal: true })}
                    count={6}
                />
                <ScrollView style={styles.content}>
                    <View style={styles.top}>
                        <Image style={styles.top_img} source={attachGadget} />
                    </View>
                    <View style={styles.description}>
                        <CustomText font_weight={'bold'} style={styles.description_title}>
                            {languages('connect_gadget')}
                        </CustomText>
                        <CustomText style={styles.description_txt}>
                            {languages('purchased_gadget_description')}
                        </CustomText>
                    </View>
                    <View style={styles.check}>
                        <CheckBtn
                            func={() => this.setState({ isCheck: !isCheck })}
                            isCheck={isCheck}
                            title={languages('gadget_check')}
                            btnStyle={{ padding: 25, width: '90%' }}
                        />
                    </View>
                </ScrollView>
                <View style={styles.footer}>
                    <Footer nextFunc={this.onPressNextStep}
                        screenCount={6}
                        line={'45%'}
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
                    description={languages('help_modal_txt_step_6')}
                    closeFunc={() => this.setState({ isHelpModal: false })}
                />
            </View>
        );
    }
};
export default SixStep;