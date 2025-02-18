import React, { Component } from 'react';
import { BackHandler, Image } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';

import SimpleHeader from '../../Components/CustomHeader/SimpleHeader/SimpleHeader';
import { ic_left_back } from '../../Components/Images/Images';
import RulesModal from './Components/RulesModal/RulesModal';
import languages from '../../Assets/i18n/i18n';
import Slide from './Components/Slide/Slide';
import { slides } from './Data';

class TextTraining extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModal: true
        };
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    handleBackButtonClick = () => {
        this.props.history.goBack();
        return true;
    }

    _renderItem = ({ item }) => {
        return <Slide item={item} />;
    }

    _renderNextButton = () => {
        return (
            <div className="w-10 h-10 bg-green-500 rounded-full justify-center items-center">
                <Image
                    source={ic_left_back}
                    className="w-4 h-4 tint-white"
                />
            </div>
        );
    };

    _renderPrevButton = () => {
        return (
            <div className="w-10 h-10 bg-green-500 rounded-full justify-center items-center">
                <Image
                    source={ic_left_back}
                    className="w-4 h-4 transform rotate-180 tint-white"
                />
            </div>
        );
    }

    render() {
        return (
            <div className="flex-1 bg-white">
                <SimpleHeader
                    func={this.handleBackButtonClick}
                    title={languages('text_training')}
                />
                <div className="flex-1">
                    <AppIntroSlider
                        ref={ref => this.slider = ref}
                        data={slides}
                        showNextButton={true}
                        showDoneButton={true}
                        showPrevButton={true}
                        renderItem={this._renderItem}
                        renderNextButton={this._renderNextButton}
                        renderPrevButton={this._renderPrevButton}
                        activeDotStyle="bg-green-500 w-4"
                    />
                    <RulesModal
                        isVisible={this.state.isModal}
                        closeFunc={() => this.setState({ isModal: false })}
                    />
                </div>
            </div>
        );
    }
}

export default TextTraining;
