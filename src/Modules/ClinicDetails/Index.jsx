import React, { Component } from 'react';
import { BackHandler } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import RNSettings from 'react-native-settings';
import { getPreciseDistance } from 'geolib';

import SimpleHeader from '../../Components/CustomHeader/SimpleHeader/SimpleHeader';
import Description from './Components/Description/Description';
import { empty_image } from '../../Components/Images/Images';
import Loading from '../../Components/Loading/Loading';
import Detiles from './Components/Detiles/Detiles';
import Storage from '../../Factories/Storage';
import { CDN_Url } from '../../Configs/Urls';
import Map from './Components/Map/Map';

let storage = new Storage();

class ClinicDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.match.params.id,
            approximateDistance: '',
            isLoading: true,
            phoneNumber: '',
            description: '',
            logo_img: '',
            address: '',
            map_img: '',
            title: '',
            long: '',
            lat: ''
        };
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
        this.getData();
        RNSettings.getSetting(RNSettings.LOCATION_SETTING).then(result => {
            if (result == RNSettings.ENABLED) {
                const details = JSON.parse(this.props.match.params.id);
                if (details.loc_latitude != null && details.loc_longitude != null) {
                    Geolocation.getCurrentPosition(info => {
                        var precise = getPreciseDistance(
                            { latitude: info.coords.latitude, longitude: info.coords.longitude },
                            { latitude: details.loc_latitude, longitude: details.loc_longitude }
                        );
                        var km = precise / 1000;
                        this.setState({ approximateDistance: km.toFixed(0) });
                    });
                }
            }
        });
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    handleBackButtonClick = () => {
        this.props.history.push(`/treatmentCenters/${'123'}`);
        return true;
    }

    getData() {
        const details = JSON.parse(this.props.match.params.id);
        this.setState({
            title: details.title,
            phoneNumber: details.phone,
            score: details.score,
            address: details.address,
            description: details.description,
            times: details.times,
            lat: details.loc_latitude,
            long: details.loc_longitude,
            logo_img: details.logo_image,
            map_img: details.map_image,
            isLoading: false
        });
    }

    render() {
        return (
            <div className="flex flex-col h-full bg-white">
                <SimpleHeader
                    func={this.handleBackButtonClick}
                    title={this.state.title}
                />
                {!this.state.isLoading ? (
                    <div className="flex-1 bg-white">
                        <div className="w-full flex items-center justify-center">
                            {this.state.logo_img ? (
                                <img
                                    className="w-[55%] h-[55%] object-contain"
                                    src={`${CDN_Url.serverUrl + CDN_Url.centerLogoDirUrl + this.state.logo_img}`}
                                    alt={this.state.title}
                                />
                            ) : (
                                <img className="w-[140px] h-[140px] self-center" src={empty_image} alt="Empty" />
                            )}
                        </div>

                        <div className="w-[95%] mx-auto mt-2 p-4 rounded-md bg-white shadow-md">
                            <Detiles
                                title={this.state.title}
                                score={this.state.score}
                                phoneNumber={this.state.phoneNumber}
                                address={this.state.address}
                            />
                        </div>

                        <div className="w-[95%] mx-auto mt-2 p-4 rounded-md bg-white shadow-md">
                            <Description description={this.state.description} />
                        </div>

                        {this.state.lat && (
                            <div className="w-[95%] mx-auto mt-2 mb-1 p-4 rounded-md bg-white shadow-md">
                                <Map
                                    img={this.state.map_img}
                                    lat={this.state.lat}
                                    long={this.state.long}
                                    approximate={this.state.approximateDistance}
                                />
                            </div>
                        )}
                    </div>
                ) : (
                    <Loading />
                )}
            </div>
        );
    }
}

export default ClinicDetails;
