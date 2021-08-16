import React, { useState } from 'react';
import { 
    StyleSheet, 
    Text, 
    View,
    TouchableHighlight,
    Image
} from 'react-native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Global from '../Global';

import { servicesIcon } from '../constants';

export default function LessDetail({ hotel, navigation }) {

    const [heartFilling, setHeartFilling] = useState(false);

    return (
        <TouchableHighlight
            underlayColor={'transparent'}
            onPress={() => {
                navigation.push('hotelInfo', {
                    hotel: hotel
                })
            }}
        >

            <View
                style={styles.container}
            >
                <View style={{ height: 130, alignItems: "center" }} >
                    <Image
                        resizeMethod={'auto'}
                        resizeMode={'cover'} 
                        style={styles.imageStyle}
                        source={{ uri : hotel.images[0].url }}
                    />
                    <TouchableHighlight
                        style={{ position: 'absolute', top: 5, right: 5 }}
                        underlayColor={'transparent'}
                        onPress={() => setHeartFilling(!heartFilling)}
                    >
                        <View>
                            <MaterialCommunityIcons 
                                name={ (heartFilling === true) ? "heart" : "heart-outline"} 
                                color={ (heartFilling === true ) ? "tomato" : Global.black}
                                size={30}
                            />
                        </View>
                    </TouchableHighlight>
                </View>
                <View
                    style={{
                        padding: 5,
                        flex: 1
                    }}
                >
                    <Text style={{fontSize: 20, fontWeight: '700', paddingHorizontal: 2, color: Global.black}}>
                        {hotel.Hotel_Name}
                    </Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <MaterialCommunityIcons name="map-marker" color={Global.black} size={12} style={{padding: 0}} />
                        <Text style={{ color: Global.black, fontSize: 13 }}>
                            { hotel.Address + ', ' + hotel.City }
                        </Text>
                    </View>
                    <View
                        style={{
                            flexDirection: 'row',
                            position: 'absolute',
                            top: 10,
                            right: 7
                        }}
                    >
                        {
                            hotel.getStars().map((value, idx) => (
                                <MaterialCommunityIcons
                                    name='star'
                                    color={ value ? 'gold' : '#BBB'}
                                    size={16}
                                    key={idx.toString()}
                                />
                            ))
                        }
                    </View>
                    <Text style={styles.servicesContainer} numberOfLines={3} >
                        {
                            hotel.getServices().map( (value, idx) => (
                                <View key={idx.toString()} style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <MaterialCommunityIcons 
                                        name={servicesIcon.get(value)} 
                                        color={'#666'} 
                                        size={(value === "Free of charge cancellation") ? 14 : 12} 
                                        style={{ padding: 0 }} 
                                        />
                                    <Text style={{ color: '#666', fontSize: 14 }}>
                                        {' ' + value + '  '}
                                    </Text>
                                </View>
                            ) )
                        }
                    </Text>
                    <View style={styles.priceContainer} >
                        <Text style={styles.priceHeader}>
                            Starting price per night
                        </Text>
                        <Text style={styles.price} >
                            {hotel.getMinPrice() + '$'}
                        </Text>
                    </View>
                </View>
            </View>
        </TouchableHighlight>
    )
}

const styles = StyleSheet.create({
    container: {
        width: 320,
        height: 275,
        alignSelf: 'center',
        marginBottom: 25,
        borderRadius:5,
        borderColor: '#ddd',
        borderWidth: 1,
        elevation: 5,
        backgroundColor: 'white'
    },
    imageStyle: {
        width: '100%',
        height: 130,
        backgroundColor:'#EEE',
        borderTopRightRadius: 5,
        borderTopLeftRadius: 5
    },
    servicesContainer: {
        flex: 1,
        maxHeight: 80,
        marginTop: 12,
        marginRight: 90,
        padding: 3,
        textAlign: 'justify',
        lineHeight: 25,
    },
    priceContainer: {
        position: 'absolute',
        bottom: 12,
        right: 10,
        alignItems: 'flex-end'
    },
    priceHeader: {
        color: '#999',
        fontSize: 12,
        alignSelf: 'flex-end',
        textAlign: 'right',
        width: 80,
    },
    price: {
        fontSize: 23,
        color: '#2a7800',
        fontWeight: '700'
    }
});
