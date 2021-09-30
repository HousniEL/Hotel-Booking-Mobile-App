import React, { useEffect, useState, useCallback } from 'react';
import {
    RefreshControl,
    ScrollView,
    TouchableHighlight,
    View,
    Dimensions
} from 'react-native';
import LessDetailResInfo from '../Reservation/LessDetailResInfo';

import BookingService from '../../services/BookingService';

import { useAuth } from '../../contexts/AuthContext';
import Loading from '../Loading';

import { createStackNavigator } from '@react-navigation/stack';
import MoreDetailResInfo from '../Reservation/MoreDetailResInfo';

var width = ( ( Dimensions.get('window').width ) >= 355 ) ? 355 : Dimensions.get('window').width;

const Stack = createStackNavigator();

function ReservationList({ navigation, showHeader }) {

    const [refreshing, setRefreshing] = useState(false);
    const [twoColumns, setTwoColumns] = useState(false);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
    }, []);

    const { currentUser } = useAuth();

    const [ reservations, setReservations ] = useState();

    useEffect(() => {

        var dim = (Dimensions.get('window').width - width*2);
        if( dim < 0 ){
            setTwoColumns(false);
        } else {
            setTwoColumns(true);
        }

        var bookingService = new BookingService();
        bookingService.getBookings({ user_id : currentUser.id }, (suc) => {
            setReservations(suc);
            setRefreshing(false);
        }, (err) => {
            console.log('Err : ', err);
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
            {
                reservations ? (
                    <ScrollView 
                        style={{ flexGrow: 1 }}
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={onRefresh}
                            />
                        }    
                    >
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
                            {
                                    <TouchableHighlight
                                        underlayColor={'transparent'}
                                        onPress={() => handleResPressed(reservations[0].id)}
                                        style={{ width }}
                                    >
                                        <LessDetailResInfo resInfo={reservations[0]} />
                                    </TouchableHighlight>
                            }
                        </View>
                    </ScrollView>
                ) : (
                    <Loading />
                )
                
            }
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
        </Stack.Navigator>
    )
}