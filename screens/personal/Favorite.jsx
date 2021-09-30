import React, { useEffect, useState, useCallback } from 'react';

import { 
    StyleSheet, 
    Text, 
    View,
    Image,
    RefreshControl,
    Dimensions,
    ScrollView
} from 'react-native';

import FavoriteService from '../../services/FavoriteService';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Global from '../Global';

import { servicesIcon, services } from '../constants';

import Loading from '../Loading';
import Rate from '../HotelAd/Rate';

import { useAuth } from '../../contexts/AuthContext';

var width = ( ( Dimensions.get('window').width ) >= 355 ) ? 355 : Dimensions.get('window').width;

export default function Favorite() {

    const [ favorites, setFavorites ] = useState();

    const [refreshing, setRefreshing] = useState(false);

    const [twoColumns, setTwoColumns] = useState(false);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
    }, []);

    const { currentUser } = useAuth();

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

    useEffect( () => {

        var dim = (Dimensions.get('window').width - width*2);
        if( dim < 0 ){
            setTwoColumns(false);
        } else {
            setTwoColumns(true);
        }

        const favoriteService = new FavoriteService();
        favoriteService.listFavorites( { user_id : currentUser.id }, (suc) => {
            setFavorites(suc);
            setRefreshing(false);
        }, (err) => {
            console.log(err);
        });
    }, [refreshing] );

    return (
        <>
            {
                !favorites ? (
                    <Loading />
                ) : (
                    <ScrollView 
                        style={{ flex: 1 }}
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={onRefresh}
                            />
                        }
                        contentContainerStyle={{ 
                            paddingTop: 25
                        }}
                    >
                        <View style={{ flex: 1,
                                    width: '100%', 
                                    flexDirection: 'row', 
                                    flexWrap: 'wrap',
                                    justifyContent: twoColumns ? 'flex-start' : 'center'  }}>
                            {
                            favorites.map( (hotel, idx) => (
                                <View
                                    key={idx}
                                    style={styles.container}
                                >
                                    <View style={{ height: 130, alignItems: "center" }} >
                                        <Image
                                            resizeMethod={'auto'}
                                            resizeMode={'cover'} 
                                            style={styles.imageStyle}
                                            source={{ uri : hotel.image.img1 }}
                                        />
                                        <View style={{ position: "absolute", bottom: 5, left: 5 }}>
                                            <Rate value={hotel.Rate}/>
                                        </View>
                                    </View>
                                    <View
                                        style={{
                                            padding: 5
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
                                        <View style={{ flexDirection: 'row', position: 'absolute', top: 10, right: 7 }} >
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
                            ) )
                            }
                        </View>
                        
                    </ScrollView>
                )
            }
        </>
    )
}


const styles = StyleSheet.create({
    container: {
        width: '90%',
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