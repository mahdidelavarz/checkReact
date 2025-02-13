import React, { Component } from 'react';
import { View, TouchableOpacity, BackHandler, Image } from 'react-native';
import Toast from 'react-native-simple-toast';

import { ic_circle, ic_circle_check, iran, english } from '../../Components/Images/Images';
import SimpleHeader from '../../Components/CustomHeader/SimpleHeader/SimpleHeader';
import SimpleButton from '../../Components/CustomButton/SimpleButton';
import CustomText from '../../Components/CustomText/CustomText';
import { changeLang } from '../../Factories/ChangeLang';
import languages from '../../Assets/i18n/i18n';
import styles from './Styles';

class Languages extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedIndex: -1,
            selectedItem: '',
            countries: [
                { title: languages('persian'), img: iran, id: 1 },
                { title: 'english', img: english, id: 2 },
            ]
        }
    };

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    handleBackButtonClick = () => {
        this.props.history.push(`/${this.props.match.params.screenName}`)
        return true;
    }

    onPressSelectItem = (item, index) => {
        this.setState({
            selectedIndex: index,
            selectedItem: item.id
        });
    }

    onPressChangeLanguage = () => {
        const { selectedItem } = this.state;
        if (!selectedItem) {
            Toast.show(languages("unselected_language_alert"));
        } else if (selectedItem === 1) {
            changeLang('fa');
        } else {
            changeLang('en');
        }
    }

    render() {
        const { selectedIndex } = this.state;
        return (
            <View style={styles.container}>
                <SimpleHeader
                    func={() => this.props.history.push(`/${this.props.match.params.screenName}`)}
                    title={languages('change_languages')}
                />
                <CustomText style={styles.title}>
                    {languages('select_languages')}
                </CustomText>
                {
                    this.state.countries.map((item, index) => (
                        <TouchableOpacity
                            key={index}
                            style={styles.list}
                            activeOpacity={0.7}
                            onPress={() => this.onPressSelectItem(item, index)}
                        >
                            <View style={styles.list_right}>
                                <Image style={styles.list_right_ic} source={item.img} />
                            </View>
                            <View style={styles.list_center}>
                                <CustomText style={styles.list_center_title}>
                                    {item.title}
                                </CustomText>
                            </View>
                            <View style={styles.list_left}>
                                <Image
                                    style={styles.list_left_ic}
                                    source={index === selectedIndex ? ic_circle_check : ic_circle}
                                />
                            </View>
                        </TouchableOpacity>
                    ))
                }
                <SimpleButton
                    func={this.onPressChangeLanguage}
                    btnStyle={styles.btn_change_lang}
                    title={languages("change")}
                    titleStyle={{ fontSize: 16 }}
                />
            </View>
        );
    }
};
export default Languages;