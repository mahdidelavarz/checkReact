import React, { Component } from 'react';
import { View, TextInput, FlatList, BackHandler } from 'react-native';

import SimpleHeader from '../../../Components/CustomHeader/SimpleHeader/SimpleHeader';
import SimpleButton from '../../../Components/CustomButton/SimpleButton';
import CustomText from '../../../Components/CustomText/CustomText';
import { ic_user } from '../../../Components/Images/Images';
import Validity from './Components/Validity/Validity';
import colors from '../../../Assets/Styles/Colors';
import language from '../../../Assets/i18n/i18n';
import Store from '../../../Store/Store';
import Box from './Components/Box/Box';
import styles from './Styles';

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
        }
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
            <View style={styles.container}>
                <SimpleHeader
                    func={this.handleBackButtonClick}
                    title={'افزایش اعتبار حساب'}
                />
                <View style={styles.content}>
                    <View style={styles.top}>
                        <Validity />
                        <TextInput
                            style={styles.top_input}
                            placeholder={'مبلغ دلخواه'}
                            onChangeText={(e) => this.setState({ amount: e })}
                            keyboardType={'numeric'}
                            onSubmitEditing={this.onPressSubmit}
                        />
                        <CustomText style={styles.top_txt}>یا</CustomText>
                    </View>
                    <View style={styles.bottom}>
                        <View>
                            <FlatList
                                data={this.state.amountList}
                                numColumns={2}
                                style={styles.flatList}
                                extraData={this.state}
                                renderItem={({ item, index }) =>
                                    <Box
                                        func={() => this.onPressSelectAmount(index, item)}
                                        price={item.price}
                                        btnStyle={{ borderColor: selctedIndex === index ? colors.green : colors.ligh_txt }}
                                        txtStyle={{ color: selctedIndex === index ? colors.green : colors.ligh_txt }}
                                    />
                                }
                                keyExtractor={(item) => item.id}
                            />
                        </View>
                        <SimpleButton
                            func={this.onPressSubmit}
                            btnStyle={styles.btn_submit}
                            title={'پرداخت'}
                        />
                    </View>
                </View>
            </View>
        );
    }
};
export default Wallet;