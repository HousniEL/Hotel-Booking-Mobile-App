import React, { useState, useEffect } from 'react';

import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    StatusBar,
    ScrollView
} from 'react-native';


import Global from '../Global';

import MaterialCommunityIcons  from 'react-native-vector-icons/MaterialCommunityIcons';


import { Input, CheckBox, Button } from 'react-native-elements';


export default function PaymentPage() {

    //const { hotel } = route.params;

    return (
        <>
            <StatusBar backgroundColor={Global.primary} barStyle={'default'} />

            <View style={{flex: 1}}>
                    <View style={styles.greenArea}>
                    </View>
                    <TouchableOpacity onPress={() => navigation.pop()}>
                        <MaterialCommunityIcons name='arrow-left' style={{
                            marginLeft: 10
                        }} size={25} color='white' />
                    </TouchableOpacity>
                    <Text style={styles.mainHeader}>
                        Payment
                    </Text>
                </View>
                <View style={styles.mainContainer}>
                    <View>
                        <Text
                            style={{
                                fontWeight: '700',
                                marginBottom: 0,
                                color: '#888',
                                fontSize: 15
                            }}
                        >Choose Payment Method</Text>
                        <CheckBox 
                            title='Credit/Debit Card'
                            iconRight
                            checkedIcon='dot-circle-o'
                            checkedColor={Global.primary}
                            uncheckedIcon='circle-o'
                            checked={true}
                            containerStyle={styles.radioContainer}
                            textStyle= {styles.radioText}
                        />
                        <CheckBox 
                            title='Paypal'
                            iconRight
                            checkedIcon='dot-circle-o'
                            uncheckedIcon='circle-o'
                            containerStyle={styles.radioContainer}
                            textStyle= {styles.radioText}
                        />
                    </View>
                    <View style={{ marginTop: 10 }}>
                        <Text
                            style={styles.formElement}
                        >Card Number</Text>
                        <Input 
                            placeholder='XXXX XXXX XXXX XXXX'
                            keyboardType={'numeric'}
                            textContentType={'creditCardNumber'}
                            inputContainerStyle={styles.inputcontainerstyle}
                            inputStyle= {styles.inputstyle}
                            containerStyle={{
                                paddingHorizontal: 0
                            }}
                        />
                        <Text
                            style={styles.formElement}
                        >Name on Card</Text>
                        <Input 
                            placeholder='Name'
                            keyboardType={'default'}
                            textContentType={'name'}
                            inputContainerStyle={styles.inputcontainerstyle}
                            inputStyle= {styles.inputstyle}
                            containerStyle={{
                                paddingHorizontal: 0
                            }}
                        />
                        <View
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-between'
                            }}
                        >
                            <View style={{ flexBasis: '35%' }}>
                                <Text
                                    style={styles.formElement}
                                >CVV Code</Text>
                                <Input 
                                    placeholder='***'
                                    keyboardType={'numeric'}
                                    textContentType={'password'}
                                    inputContainerStyle={styles.inputcontainerstyle}
                                    inputStyle= {styles.inputstyle}
                                    containerStyle={{
                                        paddingHorizontal: 0
                                    }}
                                />
                            </View>
                            <View style={{ flexBasis: '60%' }}>
                                <Text
                                    style={styles.formElement}
                                >Expiration Date</Text>
                                <Input 
                                    placeholder='MM/YY'
                                    keyboardType={'numeric'}
                                    inputContainerStyle={styles.inputcontainerstyle}
                                    inputStyle= {styles.inputstyle}
                                    containerStyle={{
                                        paddingHorizontal: 0
                                    }}
                                />
                            </View>
                        </View>
                    </View>
                </View>
            <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center', paddingBottom: 15 }}>
                <Text style={{ alignSelf: 'center', color: '#999', fontWeight: '700', fontSize: 18 }}>
                    $2500.00
                </Text>
                <View style={{ width: '100%', maxWidth: 400, flexDirection: 'row', justifyContent: 'space-around' }} >
                    
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
                            width: 160,
                            alignSelf: 'center'
                        }}
                    /> 
                    <Button 
                        title='Confirm'
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
                            width: 160,
                            alignSelf: 'center'
                        }}
                    /> 
                </View>
            </View>
        </>
    )

}


const styles = StyleSheet.create({
    greenArea : {
        width: '100%',
        height: 150,
        backgroundColor: Global.primary,
        position: 'absolute'
    },
    mainHeader : {
        alignSelf: 'center',
        fontSize: 18,
        marginBottom: 0,
        fontWeight: '700',
        marginVertical: 5,
        color: 'white'
    },
    mainContainer: {
        width: '90%', 
        maxWidth: 400,
        alignSelf: 'center',
        backgroundColor: 'white',
        elevation: 20,
        borderRadius: 5,
        marginTop: -45,
        padding: 15
    },
    radioContainer: {
        padding: 0,
        paddingVertical: 8,
        backgroundColor: '#EEE',
        marginLeft: 0,
        width: '100%'
    },
    radioText : {
        marginRight: 'auto',
        marginLeft: 8,
        color: '#777'
    },
    inputcontainerstyle: {
        backgroundColor: "white",
        borderColor: '#DDD',
        borderWidth: 2,
        borderBottomWidth: 2,
        borderRadius: 5,
        height: 0,
        paddingVertical: 18
    },
    inputstyle : {
        fontSize: 15,
        paddingHorizontal: 5,
        paddingTop: 0,
        color: 'black'
    },
    formElement : {
        marginBottom: 2,
        color: '#999',
        fontWeight: "700",
        fontSize: 12
    }
})