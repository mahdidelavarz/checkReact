import React, { Component } from 'react';
import { BackHandler, Image } from 'react-native';
import DropdownAlert from 'react-native-dropdownalert';

import { laam, kiseh, dastkesh, pad, ic_cup, ic_pipette, ic_slide, clip, syringe } from '../../../Components/Images/Images';
import HelpHeader from '../../../Components/Analysis/HelpHeader/HelpHeader';
import CloseModal from '../../../Components/Analysis/CloseModal/CloseModal';
import HelpModal from '../../../Components/Analysis/HelpModal/HelpModal';
import CheckBtn from '../../../Components/Analysis/CheckBtn/CheckBtn';
import CustomText from '../../../Components/CustomText/CustomText';
import Footer from '../../../Components/Analysis/Footer/Footer';
import Loading from '../../../Components/Loading/Loading';
import languages from '../../../Assets/i18n/i18n';
import Storage from '../../../Factories/Storage';

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
        }
    }

    render() {
        const { isCheck, isLoading, isCloseModal, isHelpModal } = this.state;

        return (
            <div className="flex-1 bg-white">
                <DropdownAlert
                    ref={ref => this.dropDownAlert = ref}
                    inactiveStatusBarBackgroundColor="bg-green-800"
                    titleStyle="font-bold text-xs text-white"
                />
                <HelpHeader
                    closeFunc={() => this.setState({ isCloseModal: true })}
                    helpFunc={() => this.setState({ isHelpModal: true })}
                    count={1}
                />

                {!isLoading ? (
                    <div className="flex-1">
                        <div className="h-24 flex justify-center">
                            <CustomText className="text-sm text-gray-800 text-center w-[95%] mx-auto">
                                {languages('supplies')}
                            </CustomText>
                        </div>

                        <div className="h-[450px] flex items-center mb-[250px]">
                            {this.state.steps.map((item) => (
                                <div key={item.id} className="flex flex-row w-[90%] h-[22%] rounded-md mt-1 bg-gray-200 border border-gray-400">
                                    <div className="flex-1.5 flex items-center justify-center">
                                        <Image className="w-12 h-12 object-center" source={item.img} />
                                    </div>
                                    <div className="flex-3.5 flex justify-center">
                                        <CustomText className="text-sm text-gray-800">
                                            {item.title}
                                        </CustomText>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="h-36 flex items-center justify-center">
                            <CheckBtn
                                func={() => this.setState({ isCheck: !isCheck })}
                                isCheck={isCheck}
                                title={languages('supplies_done')}
                            />
                        </div>

                        <div className="flex justify-center">
                            <Footer
                                nextFunc={this.onPressNextStep}
                                screenCount={1}
                                line={'10%'}
                                backFunc={() => this.setState({ isCloseModal: true })}
                            />
                        </div>
                    </div>
                ) : (
                    <Loading />
                )}

                <CloseModal
                    visible={isCloseModal}
                    closeFunc={this.onPressCloseAnalysis}
                    resumeFunc={() => this.setState({ isCloseModal: false })}
                />

                <HelpModal
                    visible={isHelpModal}
                    description={languages('help_modal_txt_step_1')}
                    closeFunc={() => this.setState({ isHelpModal: false })}
                />
            </div>
        );
    }
}

export default FirstStep;
