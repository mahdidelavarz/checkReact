import React, { useState, useRef } from 'react';
import Slider from 'react-slick'; // Replacing react-native-snap-carousel
import 'slick-carousel/slick/slick.css'; // Required CSS
import 'slick-carousel/slick/slick-theme.css'; // Required theme CSS



// Using window.innerWidth instead of Dimensions
const width = window.innerWidth;

const CustomSlider = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const sliderRef = useRef(null);

  const data = [
    { img: "/assets/Images/clip.png" },
    { img: "/assets/Images/clip.png" },
    { img: "/assets/Images/clip.png" }
  ];

  const settings = {
    dots: true,
    infinite: true, // equivalent to loop
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000, // equivalent to autoplayInterval
    initialSlide: 0, // equivalent to initialNumToRender
    pauseOnHover: true,
    afterChange: (current) => setActiveIndex(current), // equivalent to onSnapToItem
    customPaging: (i) => (
      <button
        className={`w-4 h-2 rounded-full mx-1 ${i === activeIndex ? 'bg-green-500' : 'bg-gray-400 opacity-40'
          }`}
      />
    ),
    dotsClass: 'slick-dots absolute bottom-[-25px] right-5 flex justify-end', // Custom dot positioning
    arrows: false, // Hiding arrows since original didn't have them
  };

  const renderItem = ({ item }) => {
    return (
      <button className="rounded-xl focus:outline-none" onClick={() => { }}>
        <img
          className="w-full h-full rounded-xl object-cover"
          src={item.img}
          alt="Slide"
        />
      </button>
    );
  };

  return (
    <div className=" w-full ">
      <Slider
        ref={sliderRef}
        {...settings}
        className="rounded-xl"
      >
        {data.map((item, index) => (
          <div key={index}>
            {renderItem({ item })}
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default CustomSlider;