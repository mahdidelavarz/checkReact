import React, { Component } from 'react';
import { BackHandler } from 'react-native';
import Toast from 'react-native-simple-toast';
import moment from 'moment-jalaali';

import { ic_user, ic_date, ic_gmail, ic_mobile } from '../../../Components/Images/Images';
import SimpleHeader from '../../../Components/CustomHeader/SimpleHeader/SimpleHeader';
import LoadingModal from '../../../Components/CustomModal/LoadingModal/LoadingModal';
import SimpleButton from '../../../Components/CustomButton/SimpleButton';
import { statusHandle } from '../../../Factories/HttpHandler';
import Loading from '../../../Components/Loading/Loading';
import DataModal from './Components/DateModal/DateModal';
import { findMessages } from '../../../Filters/Filters';
import Storage from '../../../Factories/Storage';
import Store from '../../../Store/Store';
import Row from './Components/Row/Row';

let Token;
let storage = new Storage();
class EditProfile extends Component {
    constructor(props) {
        super(props);
        this.focusNextField = this.focusNextField.bind(this);
        this.inputs = {};
        this.state = {
            firstName: '',
            lastName: '',
            birth_date: '',
            phoneNumber: '',
            email: '',
            isLoading: false,
            isDateModal: false,
            isLoadingSubmit: false
        };
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
        this.setState({ isLoading: true });
        storage.get("Token", token => {
            Token = token;
            this.getData();
        });
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    handleBackButtonClick = () => {
        Store.incrementTabBar();
        this.props.history.goBack();
        return true;
    }

    getData() {
        storage.get("Profile", data => {
            const res = JSON.parse(data);
            this.setState({
                email: res.email,
                birth_date: res.birth_date,
                firstName: res.first_name,
                lastName: res.last_name,
                phoneNumber: res.phone,
                isLoading: false
            })
        });
    }

    focusNextField(id) {
        this.inputs[id].focus();
    }

    onPressShowPicker = () => {
        this.setState({ isDateModal: !this.state.isDateModal });
    }

    onPressSubmit = async () => {
        const { email, firstName, lastName, birth_date, phoneNumber } = this.state;
        this.setState({ isLoadingSubmit: true });
        try {
            const response = await fetch(`${Url.serverUrl}Auth/profile/`, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'token ' + Token
                },
                body: JSON.stringify({
                    "email": email,
                    "first_name": firstName ? firstName : null,
                    "last_name": lastName ? lastName : null,
                    "birth_date": birth_date,
                    "phone": phoneNumber ? phoneNumber : null
                })
            });
            statusHandle(response.status, this.props.history);
            const responseJson = await response.json();
            this.setState({ isLoadingSubmit: false });
            storage.remove("Profile");
            this.handleBackButtonClick();
            findMessages(responseJson.detail, message => {
                Toast.show(message);
            });
        } catch (error) {
            this.setState({ isLoadingSubmit: false });
            Toast.show(`${error.message}`);
        }
    }

    render() {
        return (
            <div className="flex flex-col bg-white min-h-screen">
                <SimpleHeader func={this.handleBackButtonClick} title={'ویرایش پروفایل'} />
                {!this.state.isLoading ? (
                    <div className="flex flex-col items-center">
                        <Row img={ic_user} label={'نام'} event={(e) => this.setState({ firstName: e })} keyboardType={'default'} defaultValue={this.state.firstName} onRef={(ref) => { this.inputs['firstName'] = ref }} onSubmitEditing={() => { this.focusNextField('lastName') }} />
                        <Row img={ic_user} label={'نام خانوادگی'} event={(e) => this.setState({ lastName: e })} keyboardType={'default'} defaultValue={this.state.lastName} onRef={(ref) => { this.inputs['lastName'] = ref }} onSubmitEditing={() => { this.focusNextField('date') }} />
                        <Row img={ic_date} mode={'date'} date={moment(this.state.birth_date, 'YYYY/M/D').format('jYYYY/jM/jD')} label={'تاریخ تولد'} func={this.onPressShowPicker} />
                        <Row img={ic_mobile} label={'شماره موبایل'} event={(e) => this.setState({ phoneNumber: e })} keyboardType={'numeric'} defaultValue={this.state.phoneNumber} onRef={(ref) => { this.inputs['phoneNumber'] = ref }} onSubmitEditing={() => { this.focusNextField('email') }} />
                        <Row img={ic_gmail} label={'ایمیل'} event={(e) => this.setState({ email: e })} keyboardType={'email-address'} defaultValue={this.state.email} onRef={(ref) => { this.inputs['email'] = ref }} onSubmitEditing={this.onPressSubmit} />
                        <SimpleButton func={this.onPressSubmit} btnStyle="w-3/5 h-10 rounded-3xl flex items-center justify-center mt-7 mb-1 bg-blue-500" title={'ویرایش'} titleStyle="text-lg text-white" />
                    </div>
                ) : (
                    <Loading />
                )}
                <LoadingModal isVisible={this.state.isLoadingSubmit} />
                <DataModal isVisible={this.state.isDateModal} onClose={this.onPressShowPicker} date={(date) => this.setState({ birth_date: date })} />
            </div>
        );
    }
};
export default EditProfile;
