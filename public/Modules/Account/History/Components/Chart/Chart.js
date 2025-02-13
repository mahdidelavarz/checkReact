import React, { Component } from 'react';
import { View, Dimensions, ScrollView } from 'react-native';
import PureChart from 'react-native-pure-chart';

import CustomText from '../../../../../Components/CustomText/CustomText';
import colors from '../../../../../Assets/Styles/Colors';
import styles from './Styles';

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
            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
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
            </ScrollView>
        );
    }
};
export default Chart;

function Card(props) {
    const { title, data } = props;
    return (
        <View style={styles.card}>
            <View style={styles.card_header}>
                <CustomText style={styles.card_header_title} font_weight={'bold'}>
                    {title}
                </CustomText>
            </View>
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
        </View>
    );
};