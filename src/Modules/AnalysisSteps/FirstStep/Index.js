import React, { Component } from 'react';
import { div, img, BackHandler, div } from 'react-native';
import DropdownAlert from 'react-native-dropdownalert';

import { laam, kiseh, dastkesh, pad,  ic_cup, ic_pipette, ic_slide, clip, syringe } from '../../../Components/Images/Images';
import HelpHeader from '../../../Components/Analysis/HelpHeader/HelpHeader';
import CloseModal from '../../../Components/Analysis/CloseModal/CloseModal';
import HelpModal from '../../../Components/Analysis/HelpModal/HelpModal';
import CheckBtn from '../../../Components/Analysis/CheckBtn/CheckBtn';
import CustomText from '../../../Components/CustomText/CustomText';
import Footer from '../../../Components/Analysis/Footer/Footer';
import Loading from '../../../Components/Loading/Loading';
import colors from '../../../Assets/Styles/Colors';
import languages from '../../../Assets/i18n/i18n';
import Storage from '../../../Factories/Storage';
import styles from './Styles';

let Token;
let storage = new Storage();
class FirstStep extends Component {
    constructor(props) {
        super(props);
        this.state = {
            steps: [
                { title: '1 عدد گجت مناسب با مدل تلفن همراه شما ', img: clip, id: 1 },
                { title: '1 عدد ظرف مخصوص جمع آوری نمونه', img: ic_cup, id: 2 },
                { title: '1 عدد چمبر', img: laam, id: 3 },
                { title: '1 عدد سرنگ', img: syringe, id: 4 },
                { title: '1 عدد دستمال مرطوب الکلی', img: pad, id: 5 },
                { title: '1 جفت دستکش یکبار مصرف', img: dastkesh, id: 6 },
                { title: '1 عدد پلاستیک زیپدار', img: kiseh, id: 7 },
            ],
            isCheck: false,
            isLoading: false,
            isHelpModal: false,
            isCloseModal: false,
        }
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
        this.setState({ isLoading: false });
        storage.get("Token", data => { Token = data });
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    handleBackButtonClick = () => {
        this.setState({ isCloseModal: true });
        return true;
    }

    onPressCloseAnalysis = () => {
        this.setState({ isCloseModal: false }, () => {
            this.props.history.push('tabBar');
        });
    }

    onPressNextStep = () => {
        if (!this.state.isCheck) {
            this.dropDownAlert.alertWithType('warn', languages('step_alert'));
        } else {
            this.props.history.push('/secondStep');
            // this.props.history.push('/tenStep');
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
                    count={1}
                />
                {!this.state.isLoading ?
                    <div style={{ flex: 1 }}>
                        <div style={{ flex: 1 }}>
                            <div style={styles.content_top}>
                                <CustomText style={styles.content_top_txt}>
                                    {languages('supplies')}
                                </CustomText>
                            </div>
                            <div style={styles.content_body}>
                                {
                                    this.state.steps.map((item) => (
                                        <div key={item.id} style={styles.content_body_row}>
                                            <div style={styles.content_body_row_right}>
                                                <img style={styles.content_body_row_right_img} source={item.img} />
                                            </div>
                                            <div style={styles.content_body_row_left}>
                                                <CustomText style={styles.content_body_row_left_txt}>
                                                    {item.title}
                                                </CustomText>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                            <div style={styles.content_center}>
                                <CheckBtn
                                    func={() => this.setState({ isCheck: !isCheck })}
                                    isCheck={isCheck}
                                    title={languages('supplies_done')}
                                />
                            </div>
                        </div>
                        <div style={styles.content_bottom}>
                            <Footer
                                nextFunc={this.onPressNextStep}
                                screenCount={1}
                                line={'10%'}
                                backFunc={() => this.setState({ isCloseModal: true })}
                            />
                        </div>
                    </div>
                    :
                    <Loading />
                }
                <CloseModal
                    visible={this.state.isCloseModal}
                    closeFunc={this.onPressCloseAnalysis}
                    resumeFunc={() => this.setState({ isCloseModal: false })}
                />
                <HelpModal
                    visible={this.state.isHelpModal}
                    description={languages('help_modal_txt_step_1')}
                    closeFunc={() => this.setState({ isHelpModal: false })}
                />
            </div>
        );
    }
};
export default FirstStep;