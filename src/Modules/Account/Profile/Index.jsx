import React, { Component } from 'react';
import { StatusBar } from 'react-native';
import Toast from 'react-native-simple-toast';

import AnonymousUser from './Components/AnonymousUser/AnonymousUser';
import FamiliarUser from './Components/FamiliarUser/FamiliarUser';
import { statusHandle } from '../../../Factories/HttpHandler';
import Loading from '../../../Components/Loading/Loading';
import { findMessages } from '../../../Filters/Filters';
import colors from '../../../Assets/Styles/Colors';
import Storage from '../../../Factories/Storage';
import Header from './Components/Header/Header';
import { Url } from '../../../Configs/Urls';

let storage = new Storage();

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            token: '',
            email: ''
        };
    }

    componentDidMount() {
        this.setState({ isLoading: true });
        storage.get("Token", token => {
            this.setState({ token });
            this.getData(token);
        });
    }

    getData(token) {
        storage.get("Profile", data => {
            const res = JSON.parse(data);
            if (data) {
                this.setState({
                    email: res.email,
                    isLoading: false
                });
                console.log("full");
            } else {
                this.getDataFromServer(token);
                console.log("empty");
            }
        });
    }

    async getDataFromServer(token) {
        try {
            const response = await fetch(`${Url.serverUrl}Auth/profile/`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'token ' + token
                },
            });

            statusHandle(response.status, this.props.route.history);
            const responseJson = await response.json();

            if (responseJson.detail === "err_user_anonymous") {
                findMessages(responseJson.detail, message => {
                    Toast.show(message);
                });
            } else {
                storage.set("Profile", JSON.stringify(responseJson));
                this.setState({
                    email: responseJson.email
                });
            }

            this.setState({ isLoading: false });
        } catch (error) {
            this.setState({ isLoading: false });
            Toast.show(`${error.message}`);
        }
    }

    render() {
        if (!this.state.isLoading) {
            return (
                <div className="flex flex-col h-screen bg-white">
                    <StatusBar backgroundColor={colors.dark_green} barStyle={'light-content'} />
                    <div className="flex-2">
                        <Header userName={this.state.email} />
                    </div>
                    <div className="flex-8">
                        {!this.state.email ? (
                            <AnonymousUser param={this.props} />
                        ) : (
                            <FamiliarUser param={this.props} />
                        )}
                    </div>
                </div>
            );
        } else {
            return <Loading />;
        }
    }
}

export default Profile;
