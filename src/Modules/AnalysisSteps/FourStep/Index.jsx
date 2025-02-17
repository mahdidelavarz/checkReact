import React, { Component } from 'react';
import { BackHandler } from 'react-native';
import DropdownAlert from 'react-native-dropdownalert';
import Toast from 'react-native-simple-toast';

import LoadingModal from '../../../Components/CustomModal/LoadingModal/LoadingModal';
import HelpHeader from '../../../Components/Analysis/HelpHeader/HelpHeader';
import CloseModal from '../../../Components/Analysis/CloseModal/CloseModal';
import HelpModal from '../../../Components/Analysis/HelpModal/HelpModal';
import CustomText from '../../../Components/CustomText/CustomText';
import Footer from '../../../Components/Analysis/Footer/Footer';
import { statusHandle } from '../../../Factories/HttpHandler';
import RowList from './Components/RowList/RowList';
import languages from '../../../Assets/i18n/i18n';
import Storage from '../../../Factories/Storage';
import { Url } from '../../../Configs/Urls';

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
                this.props.history.push('/fiveStep');
            }
        } catch (error) {
            this.setState({ isLoading: false });
            console.log("error", error);
        }
    }

    render() {
        return (
            <div className="flex flex-col h-screen bg-white">
                <DropdownAlert
                    ref={ref => this.dropDownAlert = ref}
                    inactiveStatusBarBackgroundColor="bg-green-700"
                    titleStyle="font-bold text-sm text-white"
                />
                <HelpHeader
                    closeFunc={() => this.setState({ isCloseModal: true })}
                    helpFunc={() => this.setState({ isHelpModal: true })}
                    count={4}
                />
                <div className="flex flex-col flex-1">
                    <div className="flex flex-col flex-4.5 justify-around">
                        <CustomText className="text-lg font-bold text-gray-800 text-center my-8">
                            {languages('sample_prop_head')}
                        </CustomText>
                        <CustomText className="text-sm text-gray-800 text-center w-11/12 mx-auto">
                            {languages('sample_prop_head_description')}
                        </CustomText>
                    </div>
                    <div className="flex flex-4.5 items-center justify-center mb-5">
                        <RowList />
                    </div>
                    <div className="flex justify-center">
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
