import React, { useState } from 'react';

import { 
    StyleSheet, 
    Text, 
    View, 
    Image, 
    ScrollView, 
    Dimensions 
} from 'react-native';

var width = Dimensions.get('screen').width;
var height = width * 100 / 150;

export default function ImageSlider({ images }) {

    const [activeDot, setActiveDot] = useState(0);

    function handleImageSliding({ nativeEvent }){
        const currentDot = Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width);
        setActiveDot(currentDot);
    }

    return (
        <View style={styles.container} >
            <ScrollView
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                horizontal
                style={styles.paginationContainer}
                onScroll={handleImageSliding}
                snapToInterval={width}
            >
                {
                    images.map( (image, idx) => (
                        <Image 
                            key={idx}
                            source={image}
                            style={styles.Images}
                        />
                    ) )
                }
            </ScrollView>
            <View style={styles.dotsContainer}>
            {
                images.map( (image, idx) => (
                    <Text key={idx} style={ idx === activeDot ? styles.paginationActiveDot : styles.paginationDot }>
                        ⬤
                    </Text>
                ) )
            }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: { 
        width, 
        height
    },
    paginationContainer: { 
        width, 
        height 
    },
    Images: { width, height, resizeMode: 'cover' },
    dotsContainer: { 
        flexDirection: 'row', 
        alignItems: 'center',
        alignSelf: 'center', 
        position: 'absolute', 
        bottom: 0, 
        margin: 4 
    },
    paginationDot: { 
        fontSize: width / 40,
        color: '#777', 
        marginHorizontal: 2 
    },
    paginationActiveDot: { 
        fontSize: width / 37,
        color: 'white', 
        marginHorizontal: 2 
    }
})

