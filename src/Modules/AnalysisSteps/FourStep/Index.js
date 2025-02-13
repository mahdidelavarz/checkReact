import React, { Component } from 'react';
import { div, BackHandler, div } from 'react-native';
import DropdownAlert from 'react-native-dropdownalert';
import Toast from 'react-native-simple-toast';

import LoadingModal from '../../../Components/CustomModal/LoadingModal/LoadingModal';
import HelpHeader from '../../../Components/Analysis/HelpHeader/HelpHeader';
import CloseModal from '../../../Components/Analysis/CloseModal/CloseModal';
import HelpModal from '../../../Components/Analysis/HelpModal/HelpModal';
import CustomText from '../../../Components/CustomText/CustomText';
import Footer from '../../../Components/Analysis/Footer/Footer';
import { statusHandle } from '../../../Factories/HttpHandler';
import colors from '../../../Assets/Styles/Colors';
import RowList from './Components/RowList/RowList';
import languages from '../../../Assets/i18n/i18n';
import Storage from '../../../Factories/Storage';
import { Url } from '../../../Configs/Urls';
import styles from './Styles';

let storage = new Storage();
class FourStep extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isCloseModal: false,
            isHelpModal: false,
            isLoading: false
        };
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    handleBackButtonClick = () => {
        this.setState({ isCloseModal: true });
        return true;
    }

    onPressNextStep = () => {
        storage.get("Token", token => {
            storage.get("SerialNumber", serialNumber => {
                storage.get("Title", title => {
                    storage.get("Color", color => {
                        storage.get("Volume", volume => {
                            storage.get("Viscosity", viscosity => {
                                // const keys = ["Viscosity", "Volume", "Color", "Title"]
                                // storage.multiRemove(keys)
                                if (!title) {
                                    this.dropDownAlert.alertWithType('warn', "لطفا عنوان را پر کنید");
                                } else if (!color) {
                                    this.dropDownAlert.alertWithType('warn', "لطفا رنگ را انتخاب کنید");
                                } else if (!volume) {
                                    this.dropDownAlert.alertWithType('warn', "لطفا حجم نمونه را انتخاب کنید");
                                } else if (!viscosity) {
                                    this.dropDownAlert.alertWithType('warn', "لطفا گرانروی (ویسکوزیتی) را انتخاب کنید");
                                } else {
                                    this.analysisCreate(token, serialNumber, title, color, volume, viscosity);
                                }
                            });
                        });
                    });
                });
            });
        });
    }

    async analysisCreate(token, serialNumber, title, color, volume, viscosity) {
        // this.props.history.push('/fiveStep');
        this.setState({ isLoading: true });
        try {
            const response = await fetch(`${Url.serverUrl}Analysis/create/`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'token ' + token
                },
                body: JSON.stringify({
                    "serial_number": serialNumber,
                    "viscosity": viscosity,
                    "color": color,
                    "title": title,
                    "volume": volume,
                })
            });
            statusHandle(response.status, this.props.history);
            if (response.status == 201) {
                this.setState({ isLoading: false });
                console.log('res', response)
                this.props.history.push('/fiveStep');
            }
        } catch (error) {
            this.setState({ isLoading: false });
            console.log("error", error);
        }
    }

    render() {
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
                    count={4}
                />
                <div style={styles.content}>
                    <div>
                        <div style={styles.top}>
                            <CustomText font_weight={'bold'} style={styles.top_title}>
                                {languages('sample_prop_head')}
                            </CustomText>
                            <CustomText style={styles.top_description_txt}>
                                {languages('sample_prop_head_description')}
                            </CustomText>
                        </div>
                        <div style={styles.center}>
                            <RowList />
                        </div>
                    </div>
                    <div style={styles.footer}>
                        <Footer
                            nextFunc={this.onPressNextStep}
                            screenCount={4}
                            line={'30%'}
                            backFunc={() => this.setState({ isCloseModal: true })}
                        />
                    </div>
                </div>
                <CloseModal
                    visible={this.state.isCloseModal}
                    closeFunc={this.onPressCloseAnalysis}
                    resumeFunc={() => this.setState({ isCloseModal: false })}
                />
                <HelpModal
                    visible={this.state.isHelpModal}
                    closeFunc={() => this.setState({ isHelpModal: false })}
                    description={languages('help_modal_txt_step_4')}
                />
                <LoadingModal isVisible={this.state.isLoading} />
            </div>
        );
    }
};
export default FourStep;