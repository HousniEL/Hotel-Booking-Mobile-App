import React, { useState, useEffect } from 'react';

import {
    StyleSheet,
    View,
    Text,
    TouchableHighlight
} from 'react-native';

import { Button, Divider } from 'react-native-elements';

import Global from '../Global';

import MaterialCommunityIcons  from 'react-native-vector-icons/MaterialCommunityIcons';

import CreditCardService from '../../services/CreditCardService';
import BookingService from '../../services/BookingService';

import CreditCardCover from '../CreditCardCover';

import { useBookingInfo } from '../../contexts/BookingInfoContext';
import Loading from '../Loading';

import { Flow } from 'react-native-animated-spinkit';
import Success from './Success';

export default function PaymentPage({ navigation, route, drawerNavigation }) {
    
    const { hotelName } = route.params;

    const { bookInfo } = useBookingInfo();

    const [ cardInfo, setCardInfo ] = useState();
    const [ total, setTotal ] = useState();
    const [ wait, setWait ] = useState(false);
    const [ done, setDone ] = useState(false);

    useEffect(() => {
        const creditCardService = new CreditCardService();
        creditCardService.getLessCreditCardInfo({ 'user_id' : bookInfo.User_ID }, (response) => {
            if(!response.message){
                setCardInfo(response);
            } else {
                setCardInfo('nothing');
            }
        }, (error) => {
            console.log(error);
        });
        var totalIni = 0;
        bookInfo.table.map(val => {
            totalIni += Number(val.price);
        })
        setTotal(totalIni.toFixed(2));
    }, [])


    function handlePayNow(){
        setWait(true);
        const bookingService = new BookingService();
        bookingService.addBooking(bookInfo, true, total, (ID) => {
            var setOfRooms = [];
            for(let room of bookInfo.table){
                setOfRooms.push({
                    Hotel_Room_Type_ID : room.id,
                    Pers_count : Number(room['room']['adults']) + Number(room['room']['childrens'])
                })
            }
            bookingService.addRoomsBooked(ID, setOfRooms, () => {
                var object = {
                    booking_id : ID,
                    user_id : bookInfo.User_ID,
                    hotelName : hotelName
                }
                bookingService.sendEmail(object, (res) => {
                    setDone(true);
                    setWait(false);
                }, (err) => {
                    console.log('Email Err', err);
                })
            }, (err) => {
                console.log('Rs : ', err);
                setWait(false);
            })
        }, (err) => {
            console.log('G : ', err);
            setWait(false);
        });
    }
    
    function handlePayLater(){

    }

    return (
        <>
        {
            done === true && <Success success={done} setSuccess={setDone} navigation={navigation} />
        }
        {
            cardInfo ? (
            <View style={{ flexGrow: 1, height: '100%' }}>
                <View style={styles.bigContainer}>
                    <Text
                        style={{
                            fontSize: 20,
                            fontWeight: '700',
                            color: '#FFF',
                            position: 'absolute',
                            width: '100%',
                            textAlign: 'center'
                        }}
                    >Payment</Text>
                    <TouchableHighlight
                        underlayColor={'transparent'}
                        style={{
                            paddingVertical: 15,
                            paddingLeft: 10,
                            height: '100%',
                            width: '10%',
                        }}
                        onPress={() => navigation.pop()}
                    >
                        <MaterialCommunityIcons name='arrow-left' color={'white'} size={24}
                            style={{
                                padding: 0,
                                width: 24,
                                height: 24
                            }}
                        />
                    </TouchableHighlight>
                </View>
                <View style={{ width: '90%', maxWidth: 400, alignSelf: 'center', alignItems: 'center' }}>
                    {
                        ( cardInfo !== 'nothing' ) ? (
                            <CreditCardCover cardInfo={cardInfo} />
                        ) : (
                            <AddACreditCard drawerNavigation={drawerNavigation} />
                        )
                    }

                    <Divider orientation={'vertical'} color='black' style={ styles.divider } />

                    {
                        bookInfo.table && bookInfo.table.map( (val, idx) => (
                            <View style={ styles.productHolder } key={idx.toString()}>
                                <View>
                                    <Text style={styles.product}>{ val.type }</Text>
                                    <Text style={{ color: 'gray' }}>
                                        { val.room.adults + ' adults, ' + val.room.childrens + ' childrens.'  }
                                    </Text>
                                </View>
                                <Text style={styles.price}>{ '$ ' + val.price }</Text>
                            </View>
                        ) )
                    }

                </View>
                <View style={{ flexGrow: 1, justifyContent: 'flex-end', alignItems: 'center', paddingBottom: 15 }}>
                    <View style={{ width: '90%', maxWidth: 400, alignItems: 'center' }}>

                        <Divider orientation={'vertical'} color='black' style={ [ styles.divider, { marginTop: 20 } ] } />

                        <View style={[ styles.productHolder, { marginTop: 17, marginBottom: 10, alignItems: 'center' } ]}>
                            <Text style={[styles.product, { fontWeight: '700', fontSize: 20 }]}>Total</Text>
                            <Text style={[styles.price, { fontWeight: '700', fontSize: 17 }]}>$ { total }</Text>
                        </View>
                        <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-around' }} >   
                            <Button 
                                title='Pay at the institution'
                                buttonStyle={styles.payLaterButtonStyle}
                                titleStyle={styles.payLaterTitleStyle}
                                containerStyle={styles.payLaterContainerStyle}
                                onPress={ handlePayLater }
                                disabled={wait}
                                disabledStyle={ wait && { backgroundColor: "#555" }}
                                disabledTitleStyle={ wait && { color: 'white' }}
                            /> 
                            <Button 
                                title='Pay Now'
                                buttonStyle={ styles.payNowButtonStyle }
                                titleStyle={ !wait ? styles.payNowTitleStyle : { display: 'none' } }
                                containerStyle={ styles.payNowContainerStyle }
                                icon={ wait && <Flow size={30} color='white' /> }
                                onPress={ handlePayNow }
                                disabled={wait}
                                disabledStyle={{ backgroundColor: "#899B9A" }}
                            /> 
                        </View>
                    </View>
                </View>
            </View>
            ) : (
                <Loading />
            )
        }
        </>
    )

}

function AddACreditCard({ drawerNavigation }){
    return (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '90%', marginTop: 15, marginBottom: 5 }}>
            <Text style={{ fontSize: 18 }}>There is no payment method</Text>
            <TouchableHighlight underlayColor={'transparent'} onPress={() => drawerNavigation.jumpTo('Profile')} >
                <MaterialCommunityIcons
                    name={'plus'} color={Global.primary} size={28} style={{ width: 28, height: 28 }}
                />
            </TouchableHighlight>
        </View>
    )
}


const styles = StyleSheet.create({
    bigContainer: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Global.primary,
        marginBottom: 20
    },
    mainHeader : {
        alignSelf: 'center',
        fontSize: 18,
        marginBottom: 0,
        fontWeight: '700',
        color: 'white'
    },
    mainContainer: {
        width: '90%', 
        maxWidth: 400,
        alignSelf: 'center',
        backgroundColor: 'white',
        elevation: 20,
        borderRadius: 5,
        padding: 15
    },
    divider: {
        marginTop: 30, 
        marginBottom: 0, 
        marginHorizontal: 10, 
        alignSelf: 'center' 
    },
    productHolder: {
        width: '85%', 
        marginTop: 20, 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'flex-start'
    },
    product: {
        fontSize: 18,
        color: '#000'
    },
    price: {
        fontSize: 16,
        color: '#000'
    },
    payLaterButtonStyle: {
        backgroundColor: "#555",
        borderRadius: 25,
        height: 45
    },
    payLaterTitleStyle: {
        fontSize: 14,
        fontWeight: '700',
        paddingVertical: 3,
    },
    payLaterContainerStyle: {
        marginTop: 10,
        width: '47%',
        alignSelf: 'center'
    },
    payNowButtonStyle : {
        backgroundColor: Global.buttonbg1,
        borderRadius: 25,
        height: 45
    },
    payNowTitleStyle : {
        fontSize: 14,
        fontWeight: '700',
        paddingVertical: 3,
    },
    payNowContainerStyle: {
        marginTop: 10,
        width: '47%',
        alignSelf: 'center'
    }
})