import React, { Component } from 'react';
import { TouchableOpacity, Image, BackHandler } from 'react-native';
import Toast from 'react-native-simple-toast';

import { ic_circle, ic_circle_check, iran, english } from '../../Components/Images/Images';
import SimpleHeader from '../../Components/CustomHeader/SimpleHeader/SimpleHeader';
import SimpleButton from '../../Components/CustomButton/SimpleButton';
import CustomText from '../../Components/CustomText/CustomText';
import { changeLang } from '../../Factories/ChangeLang';
import languages from '../../Assets/i18n/i18n';

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
        this.props.history.push(`/${this.props.match.params.screenName}`);
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
            <div className="flex flex-col items-center bg-white">
                <SimpleHeader
                    func={() => this.props.history.push(`/${this.props.match.params.screenName}`)}
                    title={languages('change_languages')}
                />
                <CustomText className="text-center text-black text-lg my-2">
                    {languages('select_languages')}
                </CustomText>
                {
                    this.state.countries.map((item, index) => (
                        <TouchableOpacity
                            key={index}
                            className="w-4/5 h-14 my-2 flex flex-row items-center border-b border-light_txt rounded-md"
                            activeOpacity={0.7}
                            onPress={() => this.onPressSelectItem(item, index)}
                        >
                            <div className="flex-1 flex items-center justify-center">
                                <Image className="w-8 h-8 object-center" source={item.img} />
                            </div>
                            <div className="flex-8 justify-center">
                                <CustomText className="text-black text-lg ml-4 text-left">
                                    {item.title}
                                </CustomText>
                            </div>
                            <div className="flex-1 flex items-center justify-center">
                                <Image
                                    className="w-6 h-6"
                                    source={index === selectedIndex ? ic_circle_check : ic_circle}
                                />
                            </div>
                        </TouchableOpacity>
                    ))
                }
                <SimpleButton
                    func={this.onPressChangeLanguage}
                    btnStyle="absolute bottom-2 w-3/5 h-10"
                    title={languages("change")}
                    titleStyle="text-lg"
                />
            </div>
        );
    }
}

export default Languages;
