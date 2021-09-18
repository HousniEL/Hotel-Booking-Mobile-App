import React, { useEffect, useState, useCallback } from 'react';
import {
    RefreshControl,
    ScrollView,
    TouchableHighlight,
    View
} from 'react-native';
import LessDetailResInfo from '../Reservation/LessDetailResInfo';

import BookingService from '../../services/BookingService';

import { useAuth } from '../../contexts/AuthContext';
import Loading from '../Loading';

import { createStackNavigator } from '@react-navigation/stack';
import MoreDetailResInfo from '../Reservation/MoreDetailResInfo';

const Stack = createStackNavigator();

function ReservationList({ navigation, showHeader }) {

    const wait = (timeout) => {
        return new Promise(resolve => setTimeout(resolve, timeout));
    }

    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        wait(2000).then(() => setRefreshing(false));
    }, []);

    const { currentUser } = useAuth();

    const [ reservations, setReservations ] = useState();

    useEffect(() => {
        var bookingService = new BookingService();
        bookingService.getBookings({ user_id : currentUser.id }, (suc) => {
            setReservations(suc);
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
                        <View style={{ flex: 1 }}>
                            {
                                reservations.map( (val, idx) => (
                                    <TouchableHighlight
                                        underlayColor={'transparent'}
                                        key={idx} 
                                        onPress={() => handleResPressed(val.id)}
                                    >
                                        <LessDetailResInfo resInfo={val} />
                                    </TouchableHighlight>
                                ) )
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