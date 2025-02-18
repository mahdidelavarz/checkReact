import React, { Component } from 'react';
import { TouchableOpacity, Image, Dimensions } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';

import { test1, test2 } from '../../../../Components/Images/Images';
import colors from '../../../../Assets/Styles/Colors';

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
            <TouchableOpacity style="rounded-xl" activeOpacity={0.5}>
                <Image style="w-full h-full rounded-xl" source={item.img} resizeMode='cover' />
            </TouchableOpacity>
        );
    }

    render() {
        return (
            <div className="flex items-center">
                <Carousel
                    layout={"default"}
                    ref={ref => this.carousel = ref}
                    data={this.state.data}
                    containerCustomStyle="rounded-xl"
                    style="rounded-xl"
                    autoplay={true}
                    autoplayDelay={3000}
                    autoplayInterval={5000}
                    initialNumToRender={0}
                    loop={true}
                    itemWidth={width - 25}
                    sliderWidth={width}
                    renderItem={this._renderItem}
                    onSnapToItem={index => this.setState({ activeIndex: index })}
                />
                <Pagination
                    dotsLength={this.state.data.length}
                    activeDotIndex={this.state.activeIndex}
                    containerStyle="absolute bottom-[-25px] right-5"
                    dotContainerStyle="mx-1"
                    dotColor={colors.green}
                    dotStyle="w-4 h-2 rounded-full"
                    inactiveDotColor={colors.rgba}
                    inactiveDotOpacity={0.4}
                    inactiveDotScale={0.6}
                    carouselRef={this.carousel}
                    tappableDots={!!this.carousel}
                />
            </div>
        );
    }
}

export default Slider;
