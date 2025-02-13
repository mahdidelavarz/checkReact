import React from 'react';
import { View, Image, BackHandler, Dimensions } from 'react-native';
import ImageZoom from 'react-native-image-pan-zoom';

import SimpleHeader from '../../../Components/CustomHeader/SimpleHeader/SimpleHeader';
import languages from '../../../Assets/i18n/i18n';
import Storage from '../../../Factories/Storage';
import styles from './Styles';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
let storage = new Storage();

class ResultImg extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            url: ""
        }
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
        storage.get("ResultImg", data => {
            this.setState({ url: data });
        });
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    handleBackButtonClick = () => {
        this.props.history.push(`/historyDetails/${this.props.match.params.id}`);
        storage.remove("ResultImg");
        return true;
    };

    render() {
        return (
            <View style={styles.container}>
                <SimpleHeader
                    func={this.handleBackButtonClick}
                    title={'عکس تحلیل شده از نمونه'}
                />
                <View style={styles.content}>
                    <ImageZoom cropWidth={width - 20}
                        cropHeight={height / 1.3}
                        imageWidth={width - 20}
                        imageHeight={height / 1.3}
                    >
                        <Image style={styles.content_img} source={{ uri: `file://${this.state.url}` }} />
                    </ImageZoom>
                </View>
            </View>
        );
    }
};
export default ResultImg;