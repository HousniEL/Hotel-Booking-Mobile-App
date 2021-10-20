import React, { useEffect, useState } from 'react';

import {
    ScrollView,
    Text,
    View,
    TouchableHighlight,
    StyleSheet
} from 'react-native';

import { Button } from 'react-native-elements';

import BookingService from '../../services/BookingService';
import Global from '../Global';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { useAuth } from '../../contexts/AuthContext';
import Loading from '../Loading';
import Verifying from './Verifying';
import { Flow } from 'react-native-animated-spinkit';

export default function MoreDetailResInfo({ navigation, route, showHeader }){

    var { booking_id } = route.params;

    const { currentUser } = useAuth();

    const [ bookingInfo, setBookingInfo ] = useState();
    const [ reservationDate, setReservationDate ] = useState();
    const [ cancel, setCancel ] = useState();
    const [ duration, setDuration ] = useState();
    const [ wait, setWait ] = useState(false);

    function hanldeCancel(){
        const bookingService = new BookingService();
        const object = {
            user_id : currentUser.id,
            booking_id : booking_id
        }
        bookingService.cancelBooking(object, () => {
            showHeader(true);
            navigation.pop();
        }, (err) => {
            console.log(err);
        });
    }

    useEffect(() => {
        const bookingService = new BookingService();
        const object = {
            user_id : currentUser.id,
            booking_id : booking_id
        }
        bookingService.getBookingInfo(object, (suc) => {
            if( suc.created_at ){
                setDuration(Math.floor(( new Date(suc.Date_To) - new Date(suc.Date_From) ) / ( 1000*24*60*60 )));
                setBookingInfo(suc);
                const reservationDateTable = suc.created_at.split('T');
                setReservationDate(reservationDateTable[0] + ' ' + reservationDateTable[1].split('.')[0]) ;
            }
        }, (err) => {
            console.log(err);
        })
    }, []);

    return (
        <ScrollView
            style={{ flexGrow: 1 }}
            contentContainerStyle={{ flexGrow: 1 }}
        >
            {
                bookingInfo ? (
                    <>
                        <TouchableHighlight
                            underlayColor={'transparent'}
                            style={{
                                paddingVertical: 15,
                                paddingLeft: 10,
                                width: '10%',
                            }}
                            onPress={() => { showHeader(true); navigation.pop(); } }
                        >
                            <MaterialCommunityIcons name='arrow-left' color={'#222'} size={24}
                                style={{
                                    padding: 0,
                                    width: 24,
                                    height: 24
                                }}
                            />
                        </TouchableHighlight>
                        <View style={{ width: '90%', maxWidth: 400, alignSelf: 'center' }}>
                            <Text style={ styles.hotelName }>{bookingInfo.Hotel_Name}</Text>
                            <View style={ styles.content }>
                                <Text style={ styles.contentTitle }>Check in</Text>
                                <Text style={ styles.contentContent }>{ bookingInfo.Date_From }</Text>
                            </View>
                            <View style={ styles.content }>
                                <Text style={ styles.contentTitle }>Check out</Text>
                                <Text style={ styles.contentContent }>{ bookingInfo.Date_To }</Text>
                            </View>
                            <View style={ styles.content }>
                                <Text style={ styles.contentTitle }>Duration stay</Text>
                                <Text style={ styles.contentContent }>{ duration + ' days' }</Text>
                            </View>
                            <Table bookedRooms={ bookingInfo.bookedRooms } duration={duration} total={ bookingInfo.totalAmount } />
                            <View style={ styles.content }>
                                <Text style={ styles.contentTitle }>Reservation date</Text>
                                <Text style={ styles.contentContent }>{ reservationDate }</Text>
                            </View>
                            <View style={ styles.content }>
                                <Text style={ styles.contentTitle }>Your reservation status</Text>
                                <Text style={ styles.contentContent }>{ bookingInfo.Status }</Text>
                            </View>
                        </View>
                        {
                            bookingInfo.Status !== "Refused" && bookingInfo.Status !== "Cancelled" && (
                                <View style={{ flexGrow: 1, alignItems: 'center', justifyContent: 'flex-end', padding: 10 }}>
                                    <Button
                                        title="Cancel"
                                        containerStyle={{ width: '45%', maxWidth: 355 }}
                                        buttonStyle={{ backgroundColor: "rgb(201, 41, 41)", height: 40 }}
                                        titleStyle={ !wait ? null : { display: 'none' } }
                                        icon={ wait && <Flow size={30} color='white' /> }
                                        disabled={wait}
                                        disabledStyle={{ backgroundColor: "rgb(201, 41, 41)" }}
                                        disabledTitleStyle={{ color: '#bbb' }}
                                        onPress={() => { setWait(true), setCancel(true) }}
                                    />
                                </View>
                            )
                        }
                        {
                            cancel === true && <Verifying cancel={cancel} setCancel={setCancel} sendCancel={hanldeCancel} />
                        }
                    </>
                ) : (
                    <Loading />
                )
            }
        </ScrollView>
    );

};

function Table({ bookedRooms, duration, total }){

    var rooms = bookedRooms.map( val => {
        return val['type'];  
      } );
    var prices = bookedRooms.map( val => {
        return val['Price'];  
    } );
    var guests = bookedRooms.map( val => {
        return val['Pers_count'];  
    } );

    return (
        <View style={ styles.table }>
            <View style={ styles.column }>
                <Text style={[ styles.columnHeader, { borderTopLeftRadius: 3, borderRightColor: 'white', borderRightWidth: 1 } ]}>Room</Text>
                {
                    rooms.map( (val, idx) => (
                        <Text key={idx} style={[ styles.columnContent, { borderRightColor: '#e0e0e0', borderRightWidth: 1 } ]}>{ val }</Text>
                    ) )
                }
                <Text style={[ styles.columnContent, { fontWeight: '700' } ]}>Total</Text>
            </View>
            <View style={ styles.column }>
                <Text style={[ styles.columnHeader, { borderRightColor: 'white', borderRightWidth: 1 } ]}>Guests Number</Text>
                {
                    guests.map( (val, idx) => (
                        <Text key={idx} style={[ styles.columnContent, { borderRightColor: '#e0e0e0', borderRightWidth: 1 } ]}>{ val }</Text>
                    ) )
                }
                <Text style={ styles.columnContent }></Text>
            </View>
            <View style={ styles.column }>
                <Text style={[ styles.columnHeader, { borderTopRightRadius: 3 } ]}>Price</Text>
                {
                    prices.map( (val, idx) => (
                        <Text key={idx} style={ styles.columnContent }>{ duration  + ' x $' + val }</Text>
                    ) )
                }
                <Text style={[ styles.columnContent, { fontWeight: '700' } ]}>{ '$' + total }</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    hotelName: {
        marginTop: 0,
        marginBottom: 20,
        fontSize: 23
    },
    content: {
        marginVertical: 7,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    contentTitle: {
        fontSize: 16,
        fontWeight: '700'
    },
    contentContent: {
        fontSize: 15
    },
    table: { 
        flexDirection: 'row',
        alignSelf: 'center',
        width: '100%',
        borderColor: '#e0e0e0',
        borderWidth: 1,
        borderBottomWidth: 0,
        borderRadius: 4,
        marginVertical: 20
    },
    column: {
        flexGrow: 1
    },
    columnHeader: {
        fontSize: 16,
        backgroundColor: Global.secondary,
        color: 'white',
        paddingHorizontal: 5,
        paddingVertical: 10,
        fontWeight: '700'
    },
    columnContent: {
        fontSize: 16,
        paddingHorizontal: 5,
        paddingVertical: 10,
        borderBottomColor: '#e0e0e0',
        borderBottomWidth: 1
    }
});