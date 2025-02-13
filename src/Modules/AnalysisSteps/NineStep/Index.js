import React, { Component } from 'react';
import { div, img, BackHandler, div } from 'react-native';
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
import Storage from "../../../Factories/Storage";
import styles from './Styles';

let storage = new Storage();
class NineStep extends Component {
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
        BackHandler.addEventListener("hardwareBackPress", this.handleBackButtonClick);
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
            this.props.history.push('/tenStep');
        }
    }

    render() {
        const { isCheckFull, isCheckClear } = this.state;
        return (
            <div style={styles.container}>
                <DropdownAlert
                    ref={ref => this.dropDownAlert = ref}
                    inactiveStatusBarBackgroundColor={colors.dark_green}
                    titleStyle={{ fontFamily: 'iranyekanwebbold(fanum)', fontSize: 12, color: colors.white }}
                />
                <HelpHeader
                    closeFunc={() => this.setState({ isCloseModal: true })}
                    helpFunc={() => this.setState({ isHelpModal: true })}
                    count={9}
                />
                <div style={styles.content}>
                    <div style={styles.top}>
                        <img style={styles.top_img} source={attachGadget} />
                    </div>
                    <div style={styles.description}>
                        <CustomText font_weight={'bold'} style={styles.description_title}>
                            {languages('putting_up_container')}
                        </CustomText>
                        <CustomText style={styles.description_txt}>
                            {languages('prepare_step_9_sedcription')}
                        </CustomText>
                    </div>
                    <div style={styles.check}>
                        <CheckBtn
                            func={() => this.setState({ isCheckFull: !isCheckFull })}
                            isCheck={isCheckFull}
                            title={languages('btn_check_1')}
                        />
                        <CheckBtn
                            func={() => this.setState({ isCheckClear: !isCheckClear })}
                            isCheck={isCheckClear}
                            title={languages('btn_check_2')}
                            btnStyle={{ marginTop: 5 }}
                        />
                    </div>
                </div>
                <div style={styles.footer}>
                    <Footer
                        nextFunc={this.onPressNextStep}
                        screenCount={9}
                        line={'75%'}
                        backFunc={() => this.setState({ isCloseModal: true })}
                    />
                </div>
                <CloseModal
                    visible={this.state.isCloseModal}
                    closeFunc={this.onPressCloseAnalysis}
                    resumeFunc={() => this.setState({ isCloseModal: false })}
                />
                <HelpModal
                    visible={this.state.isHelpModal}
                    description={languages('help_modal_txt_step_9')}
                    closeFunc={() => this.setState({ isHelpModal: false })}
                />
            </div>
        );
    }
};
export default NineStep;