import React, { Component } from 'react';
import { View, BackHandler } from 'react-native';
import Toast from 'react-native-simple-toast';

import SimpleHeader from '../../../Components/CustomHeader/SimpleHeader/SimpleHeader';
import SimpleButton from '../../../Components/CustomButton/SimpleButton';
import CustomText from '../../../Components/CustomText/CustomText';
import Keyboard from './Components/Keyboard/Keyboard';
import Storage from '../../../Factories/Storage';
import language from '../../../Assets/i18n/i18n';
import Circle from './Components/Circle/Circle';
import Store from '../../../Store/Store';
import styles from './Styles';

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

    // componentDidUpdate() {
    //     if (this.state.fourInput) {
    //         this.setPasswordToStorage();
    //     }
    // }

    // setPasswordToStorage = () => {
    //     const code = this.state.firstInput + '' + this.state.secondInput + '' + this.state.threeInput + '' + this.state.fourInput;
    //     setPassword(code);
    //     this.props.history.push('/tabBar');
    // }

    handleBackButtonClick = () => {
        Store.incrementTabBar();
        this.props.history.goBack();
        return true;
    }

    onPressKeyboard(item) {
        const { firstInput, secondInput, threeInput, fourInput } = this.state;
        if (item.id != 10) {
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
            <View animation="zoomInUp" style={styles.container}>
                <SimpleHeader
                    func={this.handleBackButtonClick}
                    title={'گذرواژه امنیتی'}
                />
                <View style={styles.content}>
                    <View style={styles.top}>
                        <CustomText style={styles.top_title}>
                            پین خود را انتخاب کنید
                        </CustomText>
                        <View style={styles.top_row}>
                            <Circle number={this.state.firstInput} />
                            <Circle number={this.state.secondInput} />
                            <Circle number={this.state.threeInput} />
                            <Circle number={this.state.fourInput} />
                        </View>
                    </View>
                    <View style={styles.keyboard}>
                        <Keyboard
                            func={(item) => this.onPressKeyboard(item)}
                        />
                    </View>
                    <View style={styles.bottom}>
                        <SimpleButton
                            func={this.onPressSubmit}
                            btnStyle={{ width: '50%' }}
                            title={language("confirmation")}
                            titleStyle={{ fontSize: 16 }}
                        />
                    </View>
                </View>
            </View>
        );
    }
};
export default SecurityPassword;