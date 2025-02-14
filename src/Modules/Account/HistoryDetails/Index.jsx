import React, { Component } from 'react';
import { div, img, BackHandler, button } from 'react-native';
import RNFetchBlob from 'react-native-fetch-blob';

import SimpleHeader from '../../../Components/CustomHeader/SimpleHeader/SimpleHeader';
import SimpleButton from '../../../Components/CustomButton/SimpleButton';
import CustomText from '../../../Components/CustomText/CustomText';
import HeaderTable from './Components/HeaderTable/HeaderTable';
import ColumnTable from './Components/ColumnTable/ColumnTable';
import { happy_boy } from '../../../Components/Images/Images';
import { CustomPDF } from './Components/CustomPDF/CustomPDF';
import Loading from '../../../Components/Loading/Loading';
import { findMessages } from '../../../Filters/Filters';
import colors from '../../../Assets/Styles/Colors';
import languages from '../../../Assets/i18n/i18n';
import Storage from '../../../Factories/Storage';
import { Url } from '../../../Configs/Urls';

let Token;
let fullName;
let phoneNumber;
let storage = new Storage();
class HistoryDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            totalMotile: "",
            analysis: "",
            message: "",
            result: "",
            sample: "",
            time: "",
            date: "",
            isLoading: false,
            position: 0,
        };
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
        this.setState({ isLoading: true });
        storage.get('Token', (token) => {
            Token = token;
            this.getDetails();
        });
        storage.get("Profile", data => {
            var res = JSON.parse(data);
            if (res) {
                fullName = res.first_name + ' ' + res.last_name;
                phoneNumber = res.phone;
            }
        }); // دریافت نام کاربر از لوکال استوریج
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    handleBackButtonClick = () => {
        this.props.history.push('/history');
        return true;
    };

    async getDetails() {
        let id = this.props.match.params.historyId;
        try {
            const response = await fetch(`${Url.serverUrl}Analysis/results/detail/?analysis_id=${id}`, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: 'token ' + Token,
                },
            });
            const responseJson = await response.json();
            this.setState({
                analysis: responseJson.analysis,
                result: responseJson.result,
                sample: responseJson.sample,
                time: responseJson.analysis.register_date.substring(11, 19),
                date: responseJson.analysis.register_date.substring(0, 10),
                totalMotile: Math.round(responseJson.result.prog) + Math.round(responseJson.result.nprog),
                isLoading: false
            });
            findMessages(responseJson.result.detail, message => this.setState({ message: message }));
            this.getResultImage(id);
        } catch (error) {
            this.setState({ isLoading: false });
        }
    }

    getResultImage(id) {
        RNFetchBlob.config({ fileCache: true, appendExt: 'jpg' })
            .fetch('GET', `${Url.serverUrl}Analysis/results/image/?analysis_id=${id}`,
                {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: 'token ' + Token,
                })
            .then((res) => {
                this.setState({ imgUrl: res.path() });
            })
            .catch((error) => {
                console.log('error', error);
            });
    }

    onPressResultImg = () => {
        storage.set("ResultImg", this.state.imgUrl);
        this.props.history.push(`/resultImg/${this.props.match.params.historyId}`)
    };

    onPressResultVideo = () => {
        this.props.history.push(`/resultVideo/${this.props.match.params.historyId}`);
    };

    createPdf = () => {
        const model = {
            "title": this.state.analysis.title ? this.state.analysis.title : this.props.match.params.historyId,
            "fullName": fullName,
            "phoneNumber": phoneNumber,
            "date": this.state.date,
            "time": this.state.time,
            "volume": this.state.sample.volume,
            "color": this.state.sample.color,
            "viscosity": this.state.sample.viscosity,
            "quantity": Math.round(this.state.result.quantity),
            "prog": Math.round(this.state.result.prog),
            "n_prog": Math.round(this.state.result.nprog),
            "immotile": Math.round(this.state.result.immotile),
            "imgUrl": this.state.imgUrl,
        };
        CustomPDF(model);
    }

    render() {
        const { analysis, result, sample, time, date, totalMotile } = this.state;
        return (
            <div className="flex-1">
                <SimpleHeader
                    func={this.handleBackButtonClick}
                    title={languages('history_details')}
                />
                {!this.state.isLoading ? (
                    <div className="flex-1" showsVerticalScrollIndicator={false}>
                        <div className="w-full h-48 flex justify-center items-center">
                            <img className="w-4/5 h-4/5" resizeMode="contain" src={happy_boy} />
                        </div>
                        <div className="w-11/12 self-center border border-gray-400 mt-2 rounded-lg">
                            <div className="h-8 bg-green-500 flex justify-center items-center">
                                <CustomText className="text-white text-center">{analysis.title}</CustomText>
                            </div>
                            <CustomText className="text-center self-center text-xs w-11/12 my-2">
                                {this.state.message}
                            </CustomText>
                            <SimpleButton
                                btnStyle="w-3/5 self-center mt-2 mb-2"
                                titleStyle="text-xs"
                                title={'مشاهده مراکز درمانی'}
                                func={() => this.props.history.push('/categories')}
                            />
                        </div>
                        <div className="my-2">
                            <CustomText font_weight="bold" className="text-xl text-black text-center my-1">
                                Information
                            </CustomText>
                            <HeaderTable
                                title1={'Analysis Name'}
                                title2={'Analysis Data'}
                                title3={'Analysis Time'}
                            />
                            <ColumnTable
                                value1={analysis.title}
                                value2={date}
                                value3={time}
                            />
                        </div>
                        <div className="my-2">
                            <CustomText font_weight="bold" className="text-xl text-black text-center my-1">
                                Initial Data
                            </CustomText>
                            <HeaderTable
                                title1={'Parameter'}
                                title2={'Value'}
                                title3={'Normal Range'}
                            />
                            <ColumnTable
                                value1={'Volume(ml)'}
                                value2={sample.volume}
                                value3={'> 1.5 ml'}
                            />
                            <ColumnTable
                                value1={'Color'}
                                value2={sample.color}
                                value3={'Milky'}
                            />
                            <ColumnTable
                                value1={'Viscosity'}
                                value2={sample.viscosity}
                                value3={'thick'}
                            />
                        </div>
                        <div className="my-2">
                            <CustomText font_weight="bold" className="text-xl text-black text-center my-1">
                                Motility Result
                            </CustomText>
                            <HeaderTable
                                title1={'Spermatozoa'}
                                title2={'Value'}
                                title3={'Reference Value'}
                            />
                            <ColumnTable
                                value1={'Quantity'}
                                value2={Math.round(result.quantity)}
                                value3={'-'}
                            />
                            <ColumnTable
                                value1={'Concentration'}
                                value2={'-'}
                                value3={'15'}
                            />
                        </div>
                        <div className="my-2">
                            <HeaderTable
                                title1={'Class'}
                                title2={'Quantity'}
                                title3={'%'}
                                title4={'Reference Value'}
                            />
                            <ColumnTable
                                value1={'Total Motile'}
                                value2={totalMotile}
                                value3={percent(totalMotile, totalMotile, result.immotile)}
                                value4={'> 40 %'}
                            />
                            <ColumnTable
                                value1={'Progressive'}
                                value2={Math.round(result.prog)}
                                value3={percent(result.prog, totalMotile, result.immotile)}
                                value4={'> 32 %'}
                            />
                            <ColumnTable
                                value1={'None Progressive'}
                                value2={Math.round(result.nprog)}
                                value3={percent(result.nprog, totalMotile, result.immotile)}
                                value4={'-'}
                            />
                            <ColumnTable
                                value1={'Immotile'}
                                value2={Math.round(result.immotile)}
                                value3={percent(result.immotile, totalMotile, result.immotile)}
                                value4={'< 60 %'}
                            />
                        </div>
                        <SimpleButton
                            btnStyle="w-3/5 self-center mt-2 mb-2"
                            titleStyle="text-xs"
                            title={'دانلود نسخه PDF'}
                            func={this.createPdf}
                        />
                        <div className="w-11/12 self-center">
                            <CustomText font_weight="bold" className="text-xl text-black text-center my-1">
                                Processed photo from sample
                            </CustomText>
                            <button
                                onClick={this.onPressResultImg}
                                activeOpacity={0.6}>
                                <img
                                    className="w-full h-48 rounded-lg"
                                    src={{ uri: `file://${this.state.imgUrl}` }}
                                />
                            </button>
                        </div>
                        <SimpleButton
                            btnStyle="w-3/5 self-center mt-2 mb-2"
                            titleStyle="text-xs"
                            title={'مشاهده ویدیو تحلیل شده'}
                            func={this.onPressResultVideo}
                        />
                    </div>
                ) : (
                        <Loading />
                    )
                }
            </div>
        );
    }
};

export default HistoryDetails;

function percent(value, total, immotile) {
    var result = ((Math.round(value)) / (total + immotile)) * 100;
    var string = JSON.stringify(result);
    var indexOf = string.indexOf(".");
    var sub = string.substring(0, indexOf == 2 ? 5 : 4)
    return sub;
};
