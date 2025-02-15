import React from 'react';
import { BackHandler, Dimensions } from 'react-native';
import ImageZoom from 'react-native-image-pan-zoom';

import SimpleHeader from '../../../Components/CustomHeader/SimpleHeader/SimpleHeader';
import languages from '../../../Assets/i18n/i18n';
import Storage from '../../../Factories/Storage';

let storage = new Storage();

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

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
            <div className="flex flex-col items-center justify-center bg-white h-full">
                <SimpleHeader
                    func={this.handleBackButtonClick}
                    title={'عکس تحلیل شده از نمونه'}
                />
                <div className="flex items-center justify-center flex-1">
                    <ImageZoom
                        cropWidth={width - 20}
                        cropHeight={height / 1.3}
                        imageWidth={width - 20}
                        imageHeight={height / 1.3}
                    >
                        <img
                            className="w-full h-[calc(100vh-20px)] rounded-lg"
                            src={`file://${this.state.url}`}
                            alt="Analyzed Image"
                        />
                    </ImageZoom>
                </div>
            </div>
        );
    }
};

export default ResultImg;
