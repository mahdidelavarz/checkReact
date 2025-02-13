import React, { Component } from 'react'
import { View, Image, Dimensions, TouchableOpacity } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';

import { test1, test2 } from '../../../../Components/Images/Images';
import colors from '../../../../Assets/Styles/Colors';
import styles from './Styles';

const width = Dimensions.get('window').width;

class Slider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeIndex: 0,
            data: [
                { img: test1 },
                { img: test2 },
                { img: test1 }
            ]
        };
    }

    _renderItem = ({ item }) => {
        return (
            <TouchableOpacity style={styles.slide_btn} activeOpacity={0.5}>
                <Image style={styles.slide_btn_img} source={item.img} resizeMode='cover' />
            </TouchableOpacity>
        );
    }

    render() {
        return (
            <View style={styles.container}>
                <Carousel
                    layout={"default"}
                    ref={ref => this.carousel = ref}
                    data={this.state.data}
                    containerCustomStyle={styles.slide_border}
                    style={styles.slide_border}
                    containerCustomStyle={styles.slide_border}
                    // contentContainerCustomStyle={{ flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row' }}
                    style={styles.slide_border}
                    autoplay={true}
                    autoplayDelay={3000}
                    autoplayInterval={5000}
                    initialNumToRender={0}
                    loop={true}
                    itemWidth={width - 25}
                    sliderWidth={width}
                    renderItem={this._renderItem}
                    onSnapToItem={index => this.setState({ activeIndex: index })}
                    onSnapToItem={index => this.setState({ activeIndex: index })}
                />
                <Pagination
                    dotsLength={this.state.data.length}
                    activeDotIndex={this.state.activeIndex}
                    containerStyle={styles.slide_pagination}
                    dotContainerStyle={{ marginHorizontal: 2 }}
                    dotColor={colors.green}
                    dotStyle={styles.slide_pagination_dot}
                    inactiveDotColor={colors.rgba}
                    inactiveDotOpacity={0.4}
                    inactiveDotScale={0.6}
                    carouselRef={this.carousel}
                    tappableDots={!!this.carousel}
                />
            </View>
        );
    }
};
export default Slider;