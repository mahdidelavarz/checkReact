import React, { Component } from 'react';
import { div, div, img, BackHandler } from 'react-native';
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
import styles from './Styles';

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
            <div style={styles.container}>
                <SimpleHeader
                    func={this.handleBackButtonClick}
                    title={this.state.title}
                />
                {!this.state.isLoading ?
                    <div style={styles.content}>
                        <div style={styles.view_bg}>
                            {this.state.logo_img ?
                                <img
                                    style={styles.view_top_img}
                                    source={{ uri: `${CDN_Url.serverUrl + CDN_Url.centerLogoDirUrl + this.state.logo_img}` }}
                                />
                                :
                                <img style={styles.view_top_empty_img} source={empty_image} />
                            }
                        </div>
                        <div style={styles.view_bg}>
                            <Detiles
                                title={this.state.title}
                                score={this.state.score}
                                phoneNumber={this.state.phoneNumber}
                                address={this.state.address}
                            />
                        </div>
                        <div style={styles.view_bg}>
                            <Description description={this.state.description} />
                        </div>
                        {this.state.lat ?
                            <div style={[styles.view_bg, { marginBottom: 5 }]}>
                                <Map
                                    img={this.state.map_img}
                                    lat={this.state.lat}
                                    long={this.state.long}
                                    approximate={this.state.approximateDistance}
                                />
                            </div>
                            : null
                        }
                    </div>
                    :
                    <Loading />
                }
            </div>
        );
    }
};
export default ClinicDetails;