import React, { Component } from 'react';
import { div, img, BackHandler, div } from 'react-native';
import DropdownAlert from 'react-native-dropdownalert';

import HelpHeader from '../../../Components/Analysis/HelpHeader/HelpHeader';
import CloseModal from '../../../Components/Analysis/CloseModal/CloseModal';
import HelpModal from '../../../Components/Analysis/HelpModal/HelpModal';
import CheckBtn from '../../../Components/Analysis/CheckBtn/CheckBtn';
import CustomText from '../../../Components/CustomText/CustomText';
import Footer from '../../../Components/Analysis/Footer/Footer';
import { ic_cup } from '../../../Components/Images/Images';
import colors from '../../../Assets/Styles/Colors';
import languages from '../../../Assets/i18n/i18n';
import styles from './Styles';

class ThirdStep extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isCheck: false,
            isHelpModal: false,
            isCloseModal: false,
        }
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
            this.props.history.push('/fourStep');
        }
    }

    render() {
        const { isCheck } = this.state;
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
                    count={3}
                />
                <div style={styles.content}>
                    <div style={styles.top}>
                        <img style={styles.top_img} source={ic_cup} />
                        <CustomText style={styles.top_txt}>
                            {languages('collect_sample_head')}
                        </CustomText>
                    </div>
                    <div style={styles.description}>
                        <CustomText style={styles.description_txt}>
                            {languages('collect_sample_description')}
                        </CustomText>
                    </div>
                    <div style={styles.check}>
                        <CheckBtn
                            func={() => this.setState({ isCheck: !isCheck })}
                            isCheck={isCheck}
                            title={languages('sample_full')}
                            btnStyle={{ marginLeft: 5, marginRight: 5 }}
                        />
                    </div>
                </div>
                <div style={styles.footer}>
                    <Footer
                        nextFunc={this.onPressNextStep}
                        screenCount={3}
                        line={'20%'}
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
                    description={languages("help_modal_txt_step_3")}
                    closeFunc={() => this.setState({ isHelpModal: false })}
                />
            </div>
        );
    }
};
export default ThirdStep;
                    // <div style={styles.top}>
                    //     <img style={styles.top_img} source={clip} />
                    //     <CustomText style={styles.top_txt}>
                    //         {languages('collect_sample_head')}
                    //     </CustomText>
                    // </div>
                    // <div style={styles.description}>
                    //     <CustomText style={styles.description_txt}>
                    //         {languages('collect_sample_description')}
                    //     </CustomText>
                    // </div>
                    // <div style={styles.check}>
                    //     <CheckBtn 
                    //         func={() => this.setState({isCheck: !isCheck})} 
                    //         isCheck={isCheck} 
                    //         title={languages('sample_full')}
                    //         btnStyle={{marginLeft: 5, marginRight: 5}}
                    //     />
                    // </div>
                    // <div style={styles.footer}>

                    // </div>

                        // <Footer 
                        //     nextFunc={this.onPressNextStep} 
                        //     screenCount={3} 
                        //     line={'20%'}
                        //     backFunc={() => this.setState({isCloseModal: true})} 
                        // />