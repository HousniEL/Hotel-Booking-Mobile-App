import React, { useState, useEffect } from 'react';
import { 
    StyleSheet, 
    Text, 
    View,
    ScrollView,
    TouchableHighlight,
    StatusBar,
} from 'react-native';

import { Divider, Button } from 'react-native-elements';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Global from '../Global';

import { servicesIcon } from '../constants';
import ImageSlider from './ImageSlider';
import Map from './Map';
import RoomCard from './RoomCard';

import FavoriteService from '../../services/FavoriteService';

import { useAuth } from '../../contexts/AuthContext';

export default function MoreDetail({ route, navigation, isSignedIn, globalNavigation }) {

    const { hotel, hotelID } = route.params;

    const { currentUser } = useAuth();

    const favoriteService = new FavoriteService();

    useEffect(() => {
        var object = {
            user_id: currentUser.id,
            hotel_id: hotelID
        }
        favoriteService.checkFavorite(object, (suc) => {
            setHeartFilling(suc.success);
        }, (err) => {
            console.log(err);
        })
    }, []);

    function handleFavorite(){
        var object = {
            user_id: currentUser.id,
            hotel_id: hotel.id
        }
        if( !heartFilling ){
            favoriteService.addFavorite(object, () => {
                setHeartFilling(!heartFilling);
            }, (err) => {
                console.log(err);
            });
        } else {
            favoriteService.deleteFavorite(object, () => {
                setHeartFilling(!heartFilling);
            }, (err) => {
                console.log(err);
            });
        }
    }

    const [heartFilling, setHeartFilling] = useState();

    function handleBook(){
        isSignedIn ? (
            navigation.push('checkPage', {
                hotel: hotel,
                hotelID: hotelID
            })
        ) : (
            globalNavigation.push('login')
        )
    }

    return (
        <>
            <StatusBar backgroundColor={Global.primary} />
            <ScrollView>

                <View style={styles.container} >
                    <View style={{ height: 250, alignItems: "center" }} >
                        <ImageSlider images={hotel.getImages()} />
                        {
                            isSignedIn && ( heartFilling === true || heartFilling === false ) && (
                                <TouchableHighlight
                                    style={{ position: 'absolute', top: 5, right: 10 }}
                                    underlayColor={'transparent'}
                                    onPress={handleFavorite}
                                >
                                    <View style={{ backgroundColor: 'rgba(0,0,0,.35)', width:35, height:35, padding: 5, borderRadius: 30 }}>
                                        <MaterialCommunityIcons 
                                            name={ (heartFilling === true) ? "heart" : "heart-outline"} 
                                            color={ (heartFilling === true ) ? "tomato" : "#FFF"}
                                            size={25}
                                        />
                                    </View>
                                </TouchableHighlight>
                            )
                        }
                        <TouchableHighlight
                            style={{ position: 'absolute', top: 5, left: 5 }}
                            underlayColor={'transparent'}
                            onPress={() => { navigation.pop() }}
                        >
                            <View style={{ backgroundColor: 'rgba(0,0,0,.35)',  width:35, height:35, padding: 5, borderRadius: 30 }}>
                                <MaterialCommunityIcons 
                                    name={"arrow-left"} 
                                    color={"#FFF"}
                                    size={25}
                                />
                            </View>
                        </TouchableHighlight>
                    </View>
                    
                    <View style={{ padding: 10, flex: 1 }} >
                        <Text style={{fontSize: 22, maxWidth: 265, fontWeight: '700', paddingHorizontal: 2, color: Global.black}}
                            numberOfLines={2}   
                        >
                            {hotel.Hotel_Name}
                        </Text>
                        <View style={styles.starscontainer}>
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
                        <View style={{ padding: 5, marginTop: 20 }}>
                            <Text style={{color: "#666", fontSize: 15, fontWeight: '700', marginBottom: 10}}>
                                OFFERS
                            </Text>
                            {
                                hotel.rooms.map( (room, idx) => (
                                    <TouchableHighlight
                                        key={idx.toString()}
                                        underlayColor={'transparent'}
                                        onPress={() => {
                                            navigation.push('roomInfo', {
                                                hotel: hotel,
                                                roomId : idx
                                            })
                                        }}
                                    >
                                        <RoomCard key={idx.toString()} room={room} />
                                    </TouchableHighlight>
                                ))
                            }
                        </View>
                        <Divider 
                            orientation="horizontal"
                            style={{marginBottom: 15}}
                        />
                        <View style={{ padding: 5 }}>
                            <Text style={{color: "#666", fontSize: 15, marginBottom: 10}}>
                                HOTEL DESCRIPTION
                            </Text>
                            <Text style={{color: '#333', fontSize: 15}}>
                                { hotel.Description }
                            </Text>
                        </View>
                        <Divider 
                            orientation="horizontal"
                            style={{marginVertical: 15}}
                        />
                        <View style={{ padding: 5 }}>
                            <Text style={{color: "#666", fontSize: 15, marginBottom: 10}}>
                                SERVICES
                            </Text>
                            <View style={styles.servicesContainer} >
                                {
                                    hotel.getServices().map( (value, idx) => (
                                        <View key={idx.toString()} style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 5, marginRight: 10 }}>
                                            <MaterialCommunityIcons 
                                                name={servicesIcon.get(value)} 
                                                color={'#444'} 
                                                size={18} 
                                                style={{ padding: 0 }} 
                                                />
                                            <Text style={{ color: '#444', fontSize: 14 }}>
                                                {' ' + value}
                                            </Text>
                                        </View>
                                    ) )
                                }
                            </View>
                        </View>
                        <Divider 
                            orientation="horizontal"
                            style={{marginVertical: 15}}
                        />
                        <View style={{ padding: 5 }}>
                            <Text style={{color: "#666", fontSize: 15, marginBottom: 8}}>
                                COORDINATES
                            </Text>
                            <Text style={{color: "#888", fontSize: 13, marginBottom: 8}} >
                                { hotel.Address + ', ' + hotel.City }
                            </Text>
                            <Map address={ hotel.Address + ', ' + hotel.City } />
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 5 }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <MaterialCommunityIcons name="phone" color='#888' size={20} />
                                    <Text style={{color: "#888", fontSize: 13, marginVertical: 5}} >
                                        {' ' + hotel.Main_Phone_Number}
                                    </Text>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <MaterialCommunityIcons name="email" color='#888' size={20} />
                                    <Text style={{color: "#888", fontSize: 13, marginVertical: 5}} >
                                        {' ' + hotel.Company_Mail_Address}
                                    </Text>
                                </View>
                            </View>
                        </View>
                        <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center', marginTop: 20, marginBottom: 5}} >
                            <Button 
                                title="Book Now"
                                buttonStyle={{
                                    width: 175,
                                    height: 45,
                                    backgroundColor: Global.secondary,
                                    borderRadius: 50,
                                    flexDirection: 'row-reverse',
                                    justifyContent: 'space-evenly',
                                    alignItems: 'center'
                                }}
                                titleStyle={{
                                    fontSize: 15
                                }}
                                onPress={handleBook}
                            />
                        </View>
                    </View>
                </View>
            </ScrollView>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
        maxWidth: 400,
        alignSelf: 'center',
        backgroundColor: 'white'
    },
    starscontainer: {
        flexDirection: 'row',
        position: 'absolute',
        top: 17,
        right: 10
    },
    servicesContainer: {
        flex: 1,
        flexDirection: 'row',
        padding: 3,
        flexWrap: 'wrap'
    },
    priceContainer: {
        position: 'absolute',
        bottom: 16,
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