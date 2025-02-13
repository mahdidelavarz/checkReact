import React, { Component } from 'react';
import { View, BackHandler, Image } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';

import SimpleHeader from '../../Components/CustomHeader/SimpleHeader/SimpleHeader';
import { ic_left_back } from '../../Components/Images/Images';
import RulesModal from './Components/RulesModal/RulesModal';
import languages from '../../Assets/i18n/i18n';
import Slide from './Components/Slide/Slide';
import { slides } from './Data';
import styles from './Styles';

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
        return (
            <Slide item={item} />
        );
    }

    _renderNextButton = () => {
        return (
            <View style={styles.right_btn}>
                <Image
                    source={ic_left_back}
                    style={styles.right_btn_ic}
                />
            </View>
        );
    };

    _renderPrevButton = () => {
        return (
            <View style={styles.right_btn}>
                <Image
                    source={ic_left_back}
                    style={[styles.right_btn_ic, { transform: [{ rotate: '180deg' }] }]}
                />
            </View>
        );
    }

    render() {
        return (
            <View style={styles.container}>
                <SimpleHeader
                    func={this.handleBackButtonClick}
                    title={languages('text_training')}
                />
                <View style={styles.content}>
                    <AppIntroSlider
                        ref={ref => this.slider = ref}
                        data={slides}
                        showNextButton={true}
                        showDoneButton={true}
                        showPrevButton={true}
                        renderItem={this._renderItem}
                        renderNextButton={this._renderNextButton}
                        renderPrevButton={this._renderPrevButton}
                        activeDotStyle={styles.slide_active_dot}
                    />
                    <RulesModal
                        isVisible={this.state.isModal}
                        closeFunc={() => this.setState({ isModal: false })}
                    />
                </View>
            </View>
        );
    }
};
export default TextTraining;