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

import CreditCardCover from '../CreditCardCover';

import { useBookingInfo } from '../../contexts/BookingInfoContext';

export default function PaymentPage({ route, navigation }) {
    
    const { bookInfo } = useBookingInfo();

    const [ cardInfo, setCardInfo ] = useState();
    const [ total, setTotal ] = useState();

    useEffect(() => {
        const creditCardService = new CreditCardService();
        creditCardService.getLessCreditCardInfo({ 'user_id' : 1 }, (response) => {
            if(!response.message){
                setCardInfo(response);
            } else {
                setCardInfo();
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

    return (
        <>
        {

            cardInfo && 
            (
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
                    <CreditCardCover cardInfo={cardInfo} />

                    <Divider orientation={'vertical'} color='black' style={ styles.divider } />

                    {
                        bookInfo.table && bookInfo.table.map( (val, idx) => (
                            <View style={ styles.productHolder } key={idx.toString()}>
                                <Text style={styles.product}>{ val.type }</Text>
                                <Text style={styles.price}>{ '$ ' + val.price }</Text>
                            </View>
                        ) )
                    }

                    <Divider orientation={'vertical'} color='black' style={ [ styles.divider, { marginTop: 20 } ] } />

                    <View style={[ styles.productHolder, { marginTop: 0 } ]}>
                        <Text style={[styles.product, { fontSize: 20 }]}>Total</Text>
                        <Text style={[styles.price, { fontWeight: '700' }]}>$ { total }</Text>
                    </View>

                </View>
                <View style={{ flexGrow: 1, justifyContent: 'flex-end', alignItems: 'center', paddingBottom: 15 }}>
                    <View style={{ width: '90%', maxWidth: 400, flexDirection: 'row', justifyContent: 'space-around' }} >   
                        <Button 
                            title='Pay at the institution'
                            buttonStyle={{
                                backgroundColor: "#555",
                                borderRadius: 25,
                                padding: 10
                            }}
                            titleStyle={{
                                fontSize: 14,
                                fontWeight: '700',
                                paddingVertical: 3,
                            }}
                            containerStyle={{
                                marginTop: 10,
                                width: '48%',
                                alignSelf: 'center'
                            }}
                        /> 
                        <Button 
                            title='Pay Now'
                            buttonStyle={{
                                backgroundColor: Global.buttonbg1,
                                borderRadius: 25,
                                padding: 10
                            }}
                            titleStyle={{
                                fontSize: 14,
                                fontWeight: '700',
                                paddingVertical: 3,
                            }}
                            containerStyle={{
                                marginTop: 10,
                                width: '48%',
                                alignSelf: 'center'
                            }}
                        /> 
                    </View>
                </View>
            </View>
            )
        }
        </>
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
        marginBottom: 15, 
        marginHorizontal: 10, 
        alignSelf: 'center' 
    },
    productHolder: {
        width: '85%', 
        marginTop: 5, 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center'
    },
    product: {
        fontSize: 17,
        fontWeight: '700',
        color: '#333'
    },
    price: {
        fontSize: 15,
        color: '#444'
    }
})