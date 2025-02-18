import React, { Component } from 'react';
import { View, Text, Image, Button, FlatList, BackHandler } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import RNSettings from 'react-native-settings';
import { orderByDistance } from 'geolib';

import { ic_location, ic_arrow, ic_phone } from '../../Components/Images/Images';
import SimpleModal from '../../Components/CustomModal/SimpleModal/SimpleModal';
import CustomText from '../../Components/CustomText/CustomText';
import FilterModal from './Componets/FilterModal/FilterModal';
import SearchModal from './Componets/SearchModal/SearchModal';
import Loading from '../../Components/Loading/Loading';
import Header from './Componets/Header/Header';
import language from '../../Assets/i18n/i18n';
import Storage from '../../Factories/Storage';

let storage = new Storage();

class TreatmentCenters extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.match.params.id,
            isAccessLocation: false,
            isVisibleFilter: false,
            isResultSearch: false,
            isFirstFilter: false,
            isLoading: false,
            searchData: [],
            data: []
        };
        this.arrayholder = [];
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
        this.getCenters();
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    handleBackButtonClick = () => {
        storage.remove("Select_Centers_Nearby");
        this.props.history.push('/categories');
        return true;
    }

    getCenters() {
        this.setState({ isLoading: true });
        storage.get("Select_Centers_Nearby", nearby => {
            const nearbyData = JSON.parse(nearby);
            if (nearbyData) {
                this.setState({
                    data: nearbyData,
                    isLoading: false
                });
            } else {
                storage.get("Select_Centers", data => {
                    const res = JSON.parse(data);
                    this.setState({
                        data: res,
                        isLoading: false
                    });
                    this.arrayholder = res;
                });
            }
        });
    }

    searchData(text) {
        if (text.length > 1) {
            this.setState({ isResultSearch: true });
            const newData = this.arrayholder.filter(item => {
                const itemData = item.title.toUpperCase() + item.address.toUpperCase();
                const textData = text.toUpperCase();
                return itemData.indexOf(textData) > -1
            });
            this.setState({ searchData: newData });
        } else {
            this.setState({ isResultSearch: false });
        }
    }

    onPressItem = (item) => {
        const paramas = JSON.stringify(item);
        this.props.history.push(`/clinicDetails/${paramas}`);
    }

    onPressIsVisibleFilter = () => {
        this.setState({ isVisibleFilter: !this.state.isVisibleFilter });
    }

    onPressFilterData = () => {
        RNSettings.getSetting(RNSettings.LOCATION_SETTING).then(result => {
            if (result == RNSettings.ENABLED) {
                Geolocation.getCurrentPosition(info => {
                    this.filterData(info);
                });
            } else {
                this.setState({ isAccessLocation: true });
            }
        });
    }

    filterData(info) {
        storage.get("Select_Centers_Nearby", data => {
            const neardy = JSON.parse(data);
            if (!neardy) {
                if (this.state.data[0].category === "ivf") {
                    var filter = [];
                    const _data = this.state.data;
                    _data.forEach(item => {
                        const model = {
                            latitude: item.loc_latitude,
                            longitude: item.loc_longitude,
                            active_times: item.active_times,
                            address: item.address,
                            category: item.category,
                            city: item.city,
                            description: item.description,
                            email: item.email,
                            id: item.id,
                            logo_image: item.logo_image,
                            map_image: item.map_image,
                            phone: item.phone,
                            short_name: item.short_name,
                            title: item.title,
                        };
                        filter.push(model);
                    });
                    var findNearest = orderByDistance({ latitude: info.coords.latitude, longitude: info.coords.longitude }, filter);
                    this.setState({
                        data: findNearest,
                        isVisibleFilter: false,
                        isFirstFilter: true
                    });
                    storage.set("Select_Centers_Nearby", JSON.stringify(findNearest));
                } else {
                    this.setState({ isVisibleFilter: false });
                }
            } else {
                this.setState({ isVisibleFilter: false });
            }
        });
    }

    onPressOpenSettingGps = () => {
        RNSettings.openSetting(RNSettings.ACTION_LOCATION_SOURCE_SETTINGS).then(
            result => {
                if (result === RNSettings.ENABLED) {
                    this.setState({ isAccessLocation: false });
                    console.log('location is enabled');
                } else {
                    this.setState({ isAccessLocation: true });
                    console.log('location is disable');
                }
            },
        );
    }

    render() {
        return (
            <View className="flex-1">
                <Header
                    func_back={this.handleBackButtonClick}
                    func_filter={this.onPressIsVisibleFilter}
                    event={(value) => this.searchData(value)}
                />
                {!this.state.isLoading ? (
                    <View className="flex-1">
                        {!this.state.isResultSearch ? (
                            <FlatList
                                data={this.state.data}
                                keyExtractor={(item) => item.id}
                                ListEmptyComponent={<CustomText className="text-center text-black mt-[25%] text-sm">مراکز درمانی یافت نشد</CustomText>}
                                renderItem={({ item, index }) => (
                                    <View
                                        key={item.id}
                                        className={`w-[95%] h-[150px] bg-white rounded-md mt-2 flex-col items-center justify-between mb-${index + 1 === this.state.data.length ? '10' : '0'} shadow-md`}
                                    >
                                        <View className="flex-3 justify-center">
                                            <CustomText className="font-bold text-center text-lg text-dark">{item.title}</CustomText>
                                        </View>
                                        <View className="flex-3.5 flex-row">
                                            <View className="flex-1 items-center justify-center">
                                                <Image className="w-5 h-5 tint-green" source={ic_location} />
                                            </View>
                                            <View className="flex-9 justify-center">
                                                <CustomText className="text-sm text-dark text-left w-[95%]" numberOfLines={1}>
                                                    {item.address}
                                                </CustomText>
                                            </View>
                                        </View>
                                        <View className="flex-3.5 flex-row">
                                            <View className="flex-1 items-center justify-center">
                                                <Image className="w-5 h-5 tint-green" source={ic_phone} />
                                            </View>
                                            <View className="flex-4 items-start justify-center">
                                                <CustomText className="text-sm text-dark" numberOfLines={1}>
                                                    {item.phone}
                                                </CustomText>
                                            </View>
                                            <View className="flex-4.5 items-end justify-center pr-2">
                                                <Button
                                                    className="w-[70%] h-[70%] rounded-full bg-white border-1 border-green items-center justify-center"
                                                    onPress={() => this.onPressItem(item)}
                                                    title={`${language('more_details')}  `}
                                                    icon={<Image className="w-2.5 h-2.5 mt-2" source={ic_arrow} />}
                                                />
                                            </View>
                                        </View>
                                    </View>
                                )}
                            />
                        ) : (
                            <SearchModal
                                data={this.state.searchData}
                                route={this.props}
                            />
                        )}
                    </View>
                ) : (
                    <Loading />
                )}
                <FilterModal
                    isVisible={this.state.isVisibleFilter}
                    onPressCloseModal={this.onPressIsVisibleFilter}
                    onPressFilter={this.onPressFilterData}
                />
                <SimpleModal
                    isVisible={this.state.isAccessLocation}
                    img={ic_location}
                    title="دسترسی به موقعیت مکانی"
                    description="لطفا جهت سهولت بیشتر , اجازه دسترسی به موقعیت مکانی را صادر نمایید."
                    right_func={this.onPressOpenSettingGps}
                    left_func={() => this.setState({ isAccessLocation: false })}
                />
            </View>
        );
    }
}

export default TreatmentCenters;
