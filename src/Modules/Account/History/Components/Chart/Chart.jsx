import React, { Component } from 'react';
import { Dimensions } from 'react-native';
import PureChart from 'react-native-pure-chart';

import CustomText from '../../../../../Components/CustomText/CustomText';
import colors from '../../../../../Assets/Styles/Colors';

class Chart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: JSON.parse(this.props.data),
        };
    }

    render() {
        const { data } = this.state;
        return (
            <div className="flex-1 bg-white" showsVerticalScrollIndicator={false}>
                <Card
                    title={'Progressive'}
                    data={{ data: data.prog, color: 'rgba(3, 169, 121, 1)' }}
                />
                <Card
                    title={'None Progressive'}
                    data={{ data: data.nprogs, color: 'rgba(3, 169, 244, 1)' }}
                />
                <Card
                    title={'Immotile'}
                    data={{ data: data.immotiles, color: 'rgba(244, 67, 54, 1)' }}
                />
            </div>
        );
    }
}
export default Chart;

function Card(props) {
    const { title, data } = props;
    return (
        <div className="w-full mx-auto my-2 border-t border-b border-blue-800">
            <div className="h-10 flex items-center justify-center bg-gray-200">
                <CustomText className="text-xl text-black font-bold">
                    {title}
                </CustomText>
            </div>
            <PureChart
                type="bar"
                data={[data]}
                xAxisColor={colors.ligh_txt}
                yAxisColor={colors.green}
                xAxisGridLineColor={colors.light_gray}
                yAxisGridLineColor={colors.light_gray}
                width={Dimensions.get("window").width}
                height={Dimensions.get("window").height / 2.5}
                backgroundColor={'white'}
                defaultColumnWidth={45}
                defaultColumnMargin={60}
                labelColor={colors.dark_green}
            />
        </div>
    );
};
