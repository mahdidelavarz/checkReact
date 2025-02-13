import React, { Component } from 'react';
import { View, Image, BackHandler, ScrollView } from 'react-native';
import DropdownAlert from 'react-native-dropdownalert';

import HelpHeader from '../../../Components/Analysis/HelpHeader/HelpHeader';
import CloseModal from '../../../Components/Analysis/CloseModal/CloseModal';
import HelpModal from '../../../Components/Analysis/HelpModal/HelpModal';
import CheckBtn from '../../../Components/Analysis/CheckBtn/CheckBtn';
import CustomText from '../../../Components/CustomText/CustomText';
import { CupFill } from '../../../Components/Images/Images';
import Footer from '../../../Components/Analysis/Footer/Footer';
import colors from '../../../Assets/Styles/Colors';
import languages from '../../../Assets/i18n/i18n';
import styles from './Styles';

class SevenStep extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isCloseModal: false,
            isHelpModal: false,
            isCheck: false,
            icCheck2: false
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
        if (!this.state.isCheck || !this.state.icCheck2) {
            this.dropDownAlert.alertWithType('warn', languages('step_alert'));
        } else {
            this.props.history.push('/eightStep');
        }
    }


    render() {
        const { isCheck, icCheck2 } = this.state;
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
                    count={7}
                />
                <ScrollView style={styles.content}>
                    <View style={styles.top}>
                        <Image style={styles.top_img} source={CupFill} />
                    </View>
                    <View style={styles.description}>
                        <CustomText font_weight={'bold'} style={styles.description_title}>
                            {languages('sampling')}
                        </CustomText>
                        <CustomText style={styles.description_txt}>
                            {languages('prepare_slide_description')}
                        </CustomText>
                    </View>
                    <View style={styles.check}>
                        <CheckBtn
                            func={() => this.setState({ icCheck2: !icCheck2 })}
                            isCheck={icCheck2}
                            title={languages('sample_removed_2')}
                        />
                        <CheckBtn
                            func={() => this.setState({ isCheck: !isCheck })}
                            isCheck={isCheck}
                            title={languages('sample_removed')}
                        />
                    </View>
                </ScrollView>
                <View style={styles.footer}>
                    <Footer
                        nextFunc={this.onPressNextStep}
                        screenCount={7}
                        line={'55%'}
                        backFunc={() => this.setState({ isCloseModal: true })}
                    />
                </View>
                <CloseModal
                    visible={this.state.isCloseModal}
                    closeFunc={this.onPressCloseAnalysis}
                    resumeFunc={() => this.setState({ isCloseModal: false })}
                />
                <HelpModal
                    description={languages('help_modal_txt_step_7')}
                    visible={this.state.isHelpModal}
                    closeFunc={() => this.setState({ isHelpModal: false })}
                />
            </View>
        );
    }
};
export default SevenStep;