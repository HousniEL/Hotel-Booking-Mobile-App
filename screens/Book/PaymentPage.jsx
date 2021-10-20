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
import { Success, Waiting } from './Popup';

export default function PaymentPage({ navigation, route, drawerNavigation }) {
    
    const { payat, hotelName } = route.params;

    const { bookInfo } = useBookingInfo();

    const [ cardInfo, setCardInfo ] = useState();
    const [ total, setTotal ] = useState();
    const [ wait, setWait ] = useState(false);
    const [ check, setCheck ] = useState();
    const [ paymentType, setPaymentType ] = useState("");
    const [ done, setDone ] = useState(false);
    const [ duration, setDuration ] = useState();

    useEffect(() => {
        var duree = Math.floor(( new Date(bookInfo.Date_To) - new Date(bookInfo.Date_From) ) / ( 1000*24*60*60 ) );
        setDuration(duree);


        const creditCardService = new CreditCardService();
        creditCardService.getLessCreditCardInfo({ 'user_id' : bookInfo.User_ID }, (response) => {
            if(!response.message){
                setCardInfo(response);
                var totalIni = 0;
                bookInfo.table.map(val => {
                    totalIni += Number(duree) * Number(val.price);
                })
                setTotal(totalIni.toFixed(2));
            } else {
                setCardInfo('nothing');
            }
        }, (error) => {
            console.log(error);
        });
    }, [])


    function handlePayNow(){
        setPaymentType(true);
        setWait(true);
    }

    function handlePayment(type){
        const bookingService = new BookingService();
        bookingService.addBooking(bookInfo, type, total, (ID) => {
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
        setPaymentType(false);
        setWait(true);
    }

    return (
        <>
        {
            wait === true && !check && <Waiting wait={wait} check={check} setCheck={setCheck} handlePayment={handlePayment} setWait={setWait} type={paymentType} setType={setPaymentType}/>
        }
        {
            done === true && <Success success={done} setSuccess={setDone} navigation={navigation} />
        }
        {
            total ? (
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
                <View style={{ width: '90%', maxWidth: 470, alignSelf: 'center', alignItems: 'center' }}>
                    {
                        ( cardInfo !== 'nothing' ) ? (
                            <CreditCardCover cardInfo={cardInfo} />
                        ) : (
                            <AddACreditCard navigation={navigation} drawerNavigation={drawerNavigation} />
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
                                <View style={{ alignItems: 'flex-end', flexGrow: 1 }}>
                                    <Text style={styles.price}>{ '$ ' +  Number( duration * val.price) }</Text>
                                    <Text style={{ color: 'gray' }}>
                                        { duration + ' x $' +  val.price  }
                                    </Text>
                                </View>
                            </View>
                        ) )
                    }

                </View>
                <View style={{ flexGrow: 1, justifyContent: 'flex-end', alignItems: 'center', paddingBottom: 15 }}>
                    <View style={{ width: '90%', maxWidth: 470, alignItems: 'center' }}>

                        <Divider orientation={'vertical'} color='black' style={ [ styles.divider, { marginTop: 20 } ] } />

                        <View style={[ styles.productHolder, { marginTop: 17, marginBottom: 10, alignItems: 'center' } ]}>
                            <Text style={[styles.product, { fontWeight: '700', fontSize: 20 }]}>Total</Text>
                            <Text style={[styles.price, { fontWeight: '700', fontSize: 17 }]}>$ { total }</Text>
                        </View>
                        <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-around' }} >   
                            <Button 
                                title='Pay at the institution'
                                buttonStyle={styles.payLaterButtonStyle}
                                titleStyle={ (paymentType === "" || paymentType === true) ? styles.payLaterTitleStyle : { display: 'none' }}
                                containerStyle={styles.payLaterContainerStyle}
                                icon={ wait && !paymentType && <Flow size={30} color='white' /> }
                                onPress={ handlePayLater }
                                disabled={ wait || payat == 0 }
                                disabledStyle={ ( wait || payat == 0 ) && { backgroundColor: "#ddd" }}
                                disabledTitleStyle={ ( wait || payat == 0 ) && { color: '#aaa' }}
                            /> 
                            <Button 
                                title='Pay Now'
                                buttonStyle={ styles.payNowButtonStyle }
                                titleStyle={ (paymentType === "" || paymentType === false) ? styles.payNowTitleStyle : { display: 'none' } }
                                containerStyle={ styles.payNowContainerStyle }
                                icon={ wait && paymentType && <Flow size={30} color='white' /> }
                                onPress={ handlePayNow }
                                disabled={cardInfo === 'nothing' || wait}
                                disabledStyle={{ backgroundColor: "#899B9A" }}
                                disabledTitleStyle={{ color: '#bbb' }}

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

function AddACreditCard({ navigation, drawerNavigation }){

    function handleAddPayment(){
        navigation.pop();
        drawerNavigation.jumpTo('Profile');
    }

    return (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '90%', marginTop: 15, marginBottom: 5 }}>
            <Text style={{ fontSize: 18 }}>There is no payment method</Text>
            <TouchableHighlight underlayColor={'transparent'} onPress={handleAddPayment} >
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
        width: '45%',
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
        width: '45%',
        alignSelf: 'center'
    }
})