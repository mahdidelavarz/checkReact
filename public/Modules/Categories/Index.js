import React, { Component } from 'react';
import { View, TouchableOpacity, BackHandler, ScrollView, Image } from 'react-native';

import SimpleHeader from '../../Components/CustomHeader/SimpleHeader/SimpleHeader';
import LoadingModal from '../../Components/CustomModal/LoadingModal/LoadingModal';
import CustomText from '../../Components/CustomText/CustomText';
import { empty_image } from '../../Components/Images/Images';
import Loading from '../../Components/Loading/Loading';
import language from '../../Assets/i18n/i18n';
import Storage from '../../Factories/Storage';
import { CDN_Url } from '../../Configs/Urls';
import styles from './Styles';

let storage = new Storage();
class Categories extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoadingBtn: false,
            isLoading: false,
            data: []
        };
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
        this.getCategories(); // دریافت دسته بندی ها
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    handleBackButtonClick = () => {
        this.props.history.push("/tabBar");
        return true;
    }

    getCategories() {
        this.setState({ isLoading: true });
        storage.get("categories.json", data => {
            this.setState({
                data: JSON.parse(data),
                isLoading: false
            });
        });
    }

    onPressItem(short_name) {
        this.setState({ isLoadingBtn: true });
        storage.get("centers.json", data => {
            var temp = JSON.parse(data);
            var _data = [];
            temp.forEach(item => {
                if (item.category === short_name) {
                    _data.push(item);
                }
            });
            storage.set("Select_Centers", JSON.stringify(_data));
            this.setState({ isLoadingBtn: false });
            // ارسال نام آیتم به صفحه مراکز درمانی
            this.props.history.push(`/treatmentCenters/${short_name}`);
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <SimpleHeader
                    func={() => this.props.history.push('/tabBar')}
                    title={language('categories')}
                />
                {!this.state.isLoading ?
                    <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
                        {
                            this.state.data.map((item, index) => (
                                <TouchableOpacity
                                    key={index}
                                    style={styles.list}
                                    activeOpacity={0.6}
                                    onPress={() => this.onPressItem(item.short_name)}
                                >
                                    {item.logo_image ?
                                        <Image
                                            resizeMode='cover'
                                            style={styles.list_img}
                                            source={{ uri: `${CDN_Url.serverUrl + CDN_Url.categoryLogoDirUrl + item.logo_image}` }}
                                        />
                                        :
                                        <Image resizeMode='cover' style={styles.list_empty_img} source={empty_image} />
                                    }
                                    <View style={styles.list_bottom}>
                                        <CustomText font_weight={'bold'} numberOfLines={1} style={styles.list_bottom_title}>
                                            {item.title}
                                        </CustomText>
                                    </View>
                                </TouchableOpacity>
                            ))
                        }
                    </ScrollView>
                    :
                    <Loading />
                }
                <LoadingModal isVisible={this.state.isLoadingBtn} />
            </View>
        );
    }
};
export default Categories;