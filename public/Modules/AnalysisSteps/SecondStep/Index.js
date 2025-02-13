import React, { Component } from 'react';
import { View, Linking, BackHandler } from 'react-native';
import DropdownAlert from 'react-native-dropdownalert';
import Toast from 'react-native-simple-toast';

import HelpHeader from '../../../Components/Analysis/HelpHeader/HelpHeader';
import CloseModal from '../../../Components/Analysis/CloseModal/CloseModal';
import HelpModal from '../../../Components/Analysis/HelpModal/HelpModal';
import SimpleButton from '../../../Components/CustomButton/SimpleButton';
import CustomText from '../../../Components/CustomText/CustomText';
import Footer from '../../../Components/Analysis/Footer/Footer';
import { statusHandle } from '../../../Factories/HttpHandler';
import GadgetList from './Components/GadgetList/GadgetList';
import Loading from '../../../Components/Loading/Loading';
import EmptyList from './Components/EmptyList/EmptyList';
import { } from '../../../Components/Images/Images';
import colors from '../../../Assets/Styles/Colors';
import languages from '../../../Assets/i18n/i18n';
import Storage from '../../../Factories/Storage';
import { Url } from '../../../Configs/Urls';
import styles from './Styles';

let Token;
let storage = new Storage();
class SecondStep extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            isLoading: false,
            isHelpModal: false,
            isCloseModal: false,
            selected: -1
        };
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
        this.setState({ isLoading: true });
        storage.get("Token", data => {
            Token = data;
            this.getGadgetList();
        });
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    handleBackButtonClick = () => {
        this.setState({ isCloseModal: true })
        return true;
    }

    async getGadgetList() {
        try {
            const response = await fetch(`${Url.serverUrl}Analysis/gadgets/`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'token ' + Token
                }
            });
            statusHandle(response.status, this.props.history);
            const responseJson = await response.json();
            this.setState({
                isLoading: false,
                data: responseJson
            });
        } catch (error) {
            this.setState({ isLoading: false });
            Toast.show(`${error.message}`);
        }
    }

    onPressNextStep = () => {
        if (this.state.data.length === 0) {
            this.dropDownAlert.alertWithType('warn', languages('empty_gadget_alert'));
        } else if (this.state.selected == -1) {
            this.dropDownAlert.alertWithType('warn', 'لطفا یکی از گجت ها را انتخاب کنید');
        } else {
            this.props.history.push('/thirdStep');
            storage.remove("Title")
            // this.props.history.push('/tenStep');
        }
    }

    render() {
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
                    count={2}
                />
                {!this.state.isLoading ?
                    <View style={styles.content}>
                        <View style={styles.top}>
                            <CustomText style={styles.top_title}>
                                {languages('select_gadget')}
                            </CustomText>
                            <CustomText style={styles.top_description_txt}>
                                {languages('attach_gadget_description')}
                            </CustomText>
                        </View>
                        <View style={styles.body}>
                            {this.state.data.length != 0 ?
                                <GadgetList
                                    data={this.state.data}
                                    func={(index) => this.setState({ selected: index })}
                                />
                                :
                                <EmptyList />
                            }
                        </View>
                        <View style={styles.bottom}>
                            <View style={styles.bottom_view}>
                                <SimpleButton
                                    func={() => Linking.openURL('https://etcco.ir')}
                                    btnStyle={{ flex: 1 }}
                                    title={languages('buy_gadget')}
                                    titleStyle={{ fontSize: 12 }}
                                />
                                <SimpleButton
                                    func={() => this.props.history.push('/addGadget')}
                                    btnStyle={{ flex: 1, marginLeft: 5 }}
                                    title={languages('add_gadget')}
                                    titleStyle={{ fontSize: 12 }}
                                />
                            </View>
                        </View>
                        <View style={styles.footer}>
                            <Footer
                                nextFunc={this.onPressNextStep}
                                screenCount={2}
                                line={'15%'}
                                backFunc={() => this.setState({ isCloseModal: true })}
                            />
                        </View>
                    </View>
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
                    description={languages('help_modal_txt_step_2')}
                    closeFunc={() => this.setState({ isHelpModal: false })}
                />
            </View>
        );
    }
};
export default SecondStep;