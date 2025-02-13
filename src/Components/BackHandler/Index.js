import React, { Component } from 'react';
import { BackHandler } from 'react-native';

class Back_Handler extends Component {

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    handleBackButtonClick = () => {
        console.log("e")
        return true;
    }

    render() {
        return this.props.children;
    }
};
export default Back_Handler;