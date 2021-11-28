import React, { useEffect, useState, useCallback } from 'react';
import {
    RefreshControl,
    ScrollView,
    TouchableHighlight,
    View,
    Dimensions,
    Text,
    Alert
} from 'react-native';
import LessDetailResInfo from '../Reservation/LessDetailResInfo';

import BookingService from '../../services/BookingService';

import { useAuth } from '../../contexts/AuthContext';
import Loading from '../Loading';

import { createStackNavigator } from '@react-navigation/stack';
import MoreDetailResInfo from '../Reservation/MoreDetailResInfo';
import CancellationPolicy from '../Reservation/CancellationPolicy';

import Paginate from '../Paginate';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Cancel from '../Reservation/Cancel';

var width = ( ( Dimensions.get('window').width ) >= 355 ) ? 355 : Dimensions.get('window').width;

const Stack = createStackNavigator();

function ReservationList({ navigation, showHeader }) {

    const [ reservations, setReservations ] = useState();
    const [refreshing, setRefreshing] = useState(false);
    const [twoColumns, setTwoColumns] = useState(false);
    const [paginate, setPaginate] = useState();

    const [ warning, setWarning ] = useState();

    const onRefresh = useCallback(() => {
        setRefreshing(true);
    }, []);

    const { currentUser } = useAuth();

    useEffect(() => {
        setWarning();
        var dim = (Dimensions.get('window').width - width*2);
        if( dim < 0 ){
            setTwoColumns(false);
        } else {
            setTwoColumns(true);
        }

        var bookingService = new BookingService();
        bookingService.getBookings({ user_id : currentUser.id }, (suc) => {
            if( suc.length !== 0 ){
                bookingService.getBookingsPerPage({ ids : suc.slice(0, 6) }, (suc) => {
                    setRefreshing(false);
                    setReservations(suc);
                }, (err) => {
                    console.log(err);
                })
                setPaginate(<Paginate allIds={suc} setItems={setReservations} fetchIds={bookingService.getBookingsPerPage} perpage={6} />);
            } else {
                setReservations(" ");
            }
        }, (err) => {
            setRefreshing(false);
            setReservations();
            if( err.message === "Network request failed" ){
                setWarning(' ');
            }
        });

    }, [refreshing]);

    function handleResPressed(id){
        showHeader(false);
        navigation.push('reservation', {
            booking_id: id
        })
    }

    return (
        <>
            <ScrollView 
                style={{ flex: 1 }}
                contentContainerStyle={{
                    flexGrow: 1
                }}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }    
            >
                {
                    reservations && reservations !== " " && (
                    <View style={
                        { 
                            flex: 1, 
                            width: '100%', 
                            flexDirection: 'row', 
                            flexWrap: 'wrap', 
                            justifyContent: twoColumns ? 'flex-start' : 'center' 
                        }
                    }>
                        {
                            reservations.map( (val, idx) => (
                                <TouchableHighlight
                                    underlayColor={'transparent'}
                                    key={idx} 
                                    onPress={() => handleResPressed(val.id)}
                                    style={{ width }}
                                >
                                    <LessDetailResInfo resInfo={val} />
                                </TouchableHighlight>
                            ) )
                        }
                    </View>
                    )
                }
                {   !reservations && !warning && <Loading />    }
                {
                    ( reservations && reservations === " " ) && (
                        <View style={{ flexGrow: 1, alignItems: 'center', marginTop: '20%' }}>
                            <MaterialCommunityIcons name='cancel' color={"#666"} size={30} />
                            <Text style={{ color: "#666", fontSize: 21, fontWeight: '700' }}>EMPTY</Text>
                        </View>
                    )
                    
                }
                {
                    paginate && (
                        <View style={{flex: 1, alignItems: 'center', justifyContent: 'flex-end' }}>
                            { paginate }
                        </View>
                    )
                }
                {
                    warning && (
                        <View style={{ flexGrow: 1, alignItems: 'center', paddingTop: '50%' }} >
                            <MaterialCommunityIcons name={'wifi-off'} color="#666" size={32} />
                            <Text style={{ marginTop: 5, fontSize: 22, fontWeight: '700', color: '#666'}}>
                                Something went wrong!
                            </Text>
                            <Text style={{ marginTop: 20,  fontSize: 16, color: '#666'}}>
                                Check if you are connected to internet.
                            </Text>
                        </View>
                    )
                }
            </ScrollView>

        </>
    )
}


export default function Reservation({ showHeader }){
    return (
        <Stack.Navigator
            initialRouteName='reservationsList'
            screenOptions={{ headerShown: false }}
        >
            <Stack.Screen name='reservationsList'>
                { props => <ReservationList {...props} showHeader={showHeader} /> }
            </Stack.Screen>
            <Stack.Screen name='reservation'>
                { props => <MoreDetailResInfo {...props} showHeader={showHeader} /> }
            </Stack.Screen>
            <Stack.Screen name="cancellationpolicy" component={CancellationPolicy} />
            <Stack.Screen name="cancel" component={Cancel} />
        </Stack.Navigator>
    )
}