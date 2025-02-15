import React, { Component } from 'react';
import { BackHandler } from 'react-native';
import Toast from 'react-native-simple-toast';

import SimpleHeader from '../../../Components/CustomHeader/SimpleHeader/SimpleHeader';
import SimpleButton from '../../../Components/CustomButton/SimpleButton';
import CustomText from '../../../Components/CustomText/CustomText';
import Keyboard from './Components/Keyboard/Keyboard';
import Storage from '../../../Factories/Storage';
import language from '../../../Assets/i18n/i18n';
import Circle from './Components/Circle/Circle';
import Store from '../../../Store/Store';

let storage = new Storage();
class SecurityPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstInput: '',
            secondInput: '',
            threeInput: '',
            fourInput: '',
            isModalConfirm: false
        };
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    handleBackButtonClick = () => {
        Store.incrementTabBar();
        this.props.history.goBack();
        return true;
    }

    onPressKeyboard(item) {
        const { firstInput, secondInput, threeInput, fourInput } = this.state;
        if (item.id !== 10) {
            if (firstInput === '') {
                this.setState({ firstInput: item.number })
            } else if (secondInput === '') {
                this.setState({ secondInput: item.number });
            } else if (threeInput === '') {
                this.setState({ threeInput: item.number });
            } else if (fourInput === '') {
                this.setState({ fourInput: item.number });
            }
        } else {
            this.clear();
        }
    }

    clear() {
        const { firstInput, secondInput, threeInput, fourInput } = this.state;
        if (fourInput || fourInput === 0) {
            this.setState({ fourInput: '' });
        } else if (threeInput || threeInput === 0) {
            this.setState({ threeInput: '' });
        } else if (secondInput || secondInput === 0) {
            this.setState({ secondInput: '' });
        } else {
            this.setState({ firstInput: '' });
        }
    }

    onPressSubmit = () => {
        const code = this.state.firstInput + '' + this.state.secondInput + '' + this.state.threeInput + '' + this.state.fourInput;
        if (!code[3]) {
            Toast.show("اعداد وارد شده کامل نیست")
        } else {
            storage.set("Password", code);
            this.props.history.push('/tabBar');
        }
    }

    render() {
        return (
            <div className="flex flex-col h-full bg-white">
                <SimpleHeader
                    func={this.handleBackButtonClick}
                    title={'گذرواژه امنیتی'}
                />
                <div className="flex flex-col h-full">
                    <div className="flex-3 items-center justify-end">
                        <CustomText className="text-center text-sm">
                            پین خود را انتخاب کنید
                        </CustomText>
                        <div className="flex mt-3 flex-row-reverse">
                            <Circle number={this.state.firstInput} />
                            <Circle number={this.state.secondInput} />
                            <Circle number={this.state.threeInput} />
                            <Circle number={this.state.fourInput} />
                        </div>
                    </div>
                    <div className="flex-7 items-center justify-end pb-1">
                        <Keyboard
                            func={(item) => this.onPressKeyboard(item)}
                        />
                    </div>
                    <div className="flex-2 items-center justify-center">
                        <SimpleButton
                            func={this.onPressSubmit}
                            btnStyle="w-1/2"
                            title={language("confirmation")}
                            titleStyle="text-lg"
                        />
                    </div>
                </div>
            </div>
        );
    }
};

export default SecurityPassword;
