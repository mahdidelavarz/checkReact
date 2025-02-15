import React, { Component } from 'react';
import { TextInput, BackHandler } from 'react-native';

import SimpleHeader from '../../../Components/CustomHeader/SimpleHeader/SimpleHeader';
import SimpleButton from '../../../Components/CustomButton/SimpleButton';
import CustomText from '../../../Components/CustomText/CustomText';
import { ic_user } from '../../../Components/Images/Images';
import Validity from './Components/Validity/Validity';
import colors from '../../../Assets/Styles/Colors';
import language from '../../../Assets/i18n/i18n';
import Store from '../../../Store/Store';
import Box from './Components/Box/Box';

class Wallet extends Component {
    constructor(props) {
        super(props);
        this.state = {
            amount: '',
            amountList: [
                { price: '200,000', id: 1 },
                { price: '400,000', id: 2 },
                { price: '600,000', id: 3 },
                { price: '800,000', id: 4 }
            ],
            selctedIndex: -1
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

    onPressSubmit = () => {
        alert('');
    }

    onPressSelectAmount(index, item) {
        this.setState({
            selctedIndex: index,
        });
        alert(item.price);
    }

    render() {
        const { selctedIndex } = this.state;
        return (
            <div className="flex-1 bg-white">
                <SimpleHeader
                    func={this.handleBackButtonClick}
                    title={'افزایش اعتبار حساب'}
                />
                <div className="flex-1 flex-col">
                    <div className="flex-5 items-center justify-evenly">
                        <Validity />
                        <TextInput
                            style="w-3/5 h-10 font-bold text-sm border border-green-500 rounded-3xl p-2 text-center"
                            placeholder={'مبلغ دلخواه'}
                            onChangeText={(e) => this.setState({ amount: e })}
                            keyboardType={'numeric'}
                            onSubmitEditing={this.onPressSubmit}
                        />
                        <CustomText style="text-sm text-dark_txt">یا</CustomText>
                    </div>
                    <div className="flex-5 justify-around">
                        <div className="w-full self-center">
                            <div className="grid grid-cols-2 gap-4">
                                {this.state.amountList.map((item, index) => (
                                    <Box
                                        key={item.id}
                                        func={() => this.onPressSelectAmount(index, item)}
                                        price={item.price}
                                        btnStyle={{
                                            borderColor: selctedIndex === index ? colors.green : colors.ligh_txt,
                                        }}
                                        txtStyle={{
                                            color: selctedIndex === index ? colors.green : colors.ligh_txt,
                                        }}
                                    />
                                ))}
                            </div>
                        </div>
                        <SimpleButton
                            func={this.onPressSubmit}
                            btnStyle="w-7/10 self-center h-10"
                            title={'پرداخت'}
                        />
                    </div>
                </div>
            </div>
        );
    }
};

export default Wallet;
