import React, { useState, useEffect } from 'react';

import Slideshow from 'react-native-image-slider-show';

export default function ImageSlider({ images }) {

    return (
        <Slideshow
            height={250}
            arrowSize={14}
            scrollEnabled={false}
            dataSource={images}
        />
    )
}
