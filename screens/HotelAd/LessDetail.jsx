import React, { useState, useEffect } from 'react';
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

import { services } from "../constants";

import Rate from './Rate';

import FavoriteService from '../../services/FavoriteService';

import { useAuth } from '../../contexts/AuthContext';

export default function LessDetail({ hotel, navigation, isSignedIn }) {

    const [heartFilling, setHeartFilling] = useState();

    const { currentUser } = useAuth();

    const favoriteService = new FavoriteService();

    useEffect(() => {
        if( currentUser ){
            var object = {
                user_id: currentUser.id,
                hotel_id: hotel.id
            }
            favoriteService.checkFavorite(object, (suc) => {
                setHeartFilling(suc.success);
            }, (err) => {
                console.log(err);
            })
        }
    }, []);

    function handleFavorite(){
        var object = {
            user_id: currentUser.id,
            hotel_id: hotel.id
        }
        if( !heartFilling ){
            favoriteService.addFavorite(object, (res) => {
                setHeartFilling(!heartFilling);
            }, (err) => {
                console.log(err);
            });
        } else {
            favoriteService.deleteFavorite(object, (res) => {
                setHeartFilling(!heartFilling);
            }, (err) => {
                console.log(err);
            });
        }
    }

    function getStars(Stars){
        var starArray = [false, false, false, false, false];
        for(let i = 0; i < Stars; i++){
            starArray[i] = true;
        }
        return starArray;  
    }

    function getServices(Services){
        let i = 0;
        var setSer = []
        for(let char of Services){
            if(char === "1") setSer.push(services[i]);
            i++;
        }
        return setSer;
    }

    function handlePress(){
        navigation.push('hotelInfo', {
            hotelID: hotel.id
        })
    }

    return (
        <TouchableHighlight
            underlayColor={'transparent'}
            onPress={handlePress}
        >

            <View
                style={styles.container}
            >
                <View style={{ height: 130, alignItems: "center" }} >
                    <Image
                        resizeMethod={'auto'}
                        resizeMode={'cover'} 
                        style={styles.imageStyle}
                        source={{ uri : hotel.image.img1 }}
                    />
                    {
                        isSignedIn && ( heartFilling === true || heartFilling === false ) && (
                            <TouchableHighlight
                                style={{ position: 'absolute', top: 5, right: 5 }}
                                underlayColor={'transparent'}
                                onPress={handleFavorite}
                            >
                                <View style={{ backgroundColor: 'rgba(0,0,0,.5)', width:33, height:33, padding: 5, borderRadius: 30 }}>
                                    <MaterialCommunityIcons 
                                        name={ (heartFilling === true) ? "heart" : "heart-outline"} 
                                        color={ (heartFilling === true ) ? "tomato" : '#ddd'}
                                        size={23}
                                    />
                                </View>
                            </TouchableHighlight>       
                        )
                    }
                    <View style={{ position: "absolute", bottom: 5, left: 5 }}>
                        <Rate value={hotel.Rate}/>
                    </View>
                </View>
                <View
                    style={{
                        padding: 5,
                        flex: 1
                    }}
                >
                    <Text style={{fontSize: 19, fontWeight: '700', maxWidth: '75%', paddingHorizontal: 2, color: Global.black}}>
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
                            getStars(hotel.Stars).map((value, idx) => (
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
                            getServices(hotel.Services).map( (value, idx) => (
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
                            {hotel.minPrice + '$'}
                        </Text>
                    </View>
                </View>
            </View>
        </TouchableHighlight>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '95%',
        maxWidth: 355,
        paddingBottom: 5,
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
        bottom: 8,
        right: 10,
        alignItems: 'flex-end'
    },
    priceHeader: {
        color: '#999',
        fontSize: 11,
        alignSelf: 'flex-end',
        textAlign: 'right',
        width: 80,
        marginBottom: 10
    },
    price: {
        fontSize: 21,
        color: '#2a7800',
        fontWeight: '700'
    }
});
