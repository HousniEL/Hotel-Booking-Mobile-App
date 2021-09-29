import React, { useState } from 'react';

import { StyleSheet, Text, View, ScrollView, TouchableHighlight } from 'react-native';

import { Input, Button } from 'react-native-elements';

import Global from '../Global';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import CCNumber from './credit card/CCNumber';
import CVV from './credit card/CVV';
import Exp from './credit card/Exp';
import SelectCountry from './credit card/SelectCountry';

import { useAuth } from '../../contexts/AuthContext';

import { Flow } from 'react-native-animated-spinkit';

import CreditCardService from '../../services/CreditCardService';

export default function AddCreditCard({ navigation, showHeader }) {

    const { currentUser } = useAuth();

    const [ creditNum, setCreditNum ]           =   useState();
    const [ name, setName ]                     =   useState();
    const [ cvv, setCvv ]                       =   useState();
    const [ exp, setExp ]                       =   useState();
    const [ country, setCountry ]               =   useState();
    const [ city, setCity ]                     =   useState();
    const [ billingAddress, setBillingAddress ] =   useState();
    const [ pcode, setPcode ]                   =   useState();
    
    const [ creditNumErr, setcreditNumErr ]           =   useState();
    const [ nameErr, setnameErr ]                     =   useState();
    const [ cvvErr, setcvvErr ]                       =   useState();
    const [ expErr, setexpErr ]                       =   useState();
    const [ countryErr, setcountryErr ]               =   useState();
    const [ cityErr, setcityErr ]                     =   useState();
    const [ billingAddressErr, setbillingAddressErr ] =   useState();
    const [ pcodeErr, setpcodeErr ]                   =   useState();

    const [ loading, setLoading ] = useState(false);

    const info = {
        creditNum,
        name,
        cvv,
        exp,
        country,
        city,
        billingAddress,
        pcode,
    }

    function handleSave(){
        var goodToGo = true;
        Object.entries(info).map( value => {
            if( !value[1] ){
                goodToGo = false;
                eval("set" + value[0] + "Err('err')");
            }
        } )
        if(creditNum && creditNum.length < 13){
            goodToGo = false;
            setcreditNumErr(' ');
        }
        if(cvv && cvv.length < 3){
            goodToGo = false;
            setcvvErr(' ');
        }
        if(exp && exp.length < 5){
            goodToGo = false;
            setexpErr(' ');
        }
        if(goodToGo){
            setLoading(true);
            const creditCardService = new CreditCardService();
            info['user_id'] = currentUser.id;
            creditCardService.addCreditCard(info, (res) => {
                navigation.push('info');
                showHeader(true);
                setLoading(false);
            }, (err) => {
                console.log('ERR', err);
                setLoading(false);
            })
        }
    }

    return (
        <ScrollView style={{ backgroundColor: 'white' }}>
            <View style={styles.header}>
                <Text
                    style={{
                        fontSize: 18,
                        fontWeight: '700',
                        color: '#FFF',
                        position: 'absolute',
                        width: '100%',
                        textAlign: 'center'
                    }}
                >Enter Your Payment Information</Text>
                <TouchableHighlight
                    underlayColor={'transparent'}
                    style={{
                        paddingVertical: 15,
                        paddingLeft: 10,
                        height: '100%',
                        width: '10%',
                    }}
                    onPress={() => { navigation.pop(); showHeader(true); }}
                >
                    <MaterialCommunityIcons name='arrow-left' color={'white'} size={22}
                        style={{
                            padding: 0,
                            width: 22,
                            height: 22
                        }}
                    />
                </TouchableHighlight>
            </View>
            <View style={{ width: '90%', maxWidth: 450, alignSelf: 'center' }}>
                <View style={styles.warning}>
                    <MaterialCommunityIcons name="alert-circle" size={19} color='tomato' />
                    <Text style={{ color: 'tomato', marginLeft: 10, fontSize: 14 }}>
                        Only accept Visa or MasterCard
                    </Text>
                </View>
                <Text style={styles.formElement}>
                    Card Number <Text style={{color : 'tomato'}}>*</Text>
                </Text>
                <CCNumber setCreditNum={setCreditNum} required={creditNumErr} setErr={setcreditNumErr} />
                <Text style={styles.formElement}>
                    Name on Card <Text style={{color : 'tomato'}}>*</Text>
                </Text>
                <Input
                    value={name}
                    placeholder='Name'
                    keyboardType={'default'}
                    textContentType={'name'}
                    inputContainerStyle={[
                        styles.inputcontainerstyle,
                        name && name.length > 4 && { borderColor: 'green' },
                        nameErr && { borderColor: 'tomato' }
                    ]}
                    inputStyle= {styles.inputstyle}
                    containerStyle={{
                        paddingHorizontal: 0
                    }}
                    onChangeText={ value => { setName(value); setnameErr() } }
                    errorStyle={{ marginTop: 0, color: 'tomato' }}
                />
                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{ flexBasis: '45%' }}>
                        <Text style={styles.formElement} >
                            CVV Code <Text style={{color : 'tomato'}}>*</Text>
                        </Text>
                        <CVV setCvvValue={setCvv} required={cvvErr} setErr={setcvvErr} />
                    </View>
                    <View style={{ flexBasis: '45%' }}>
                        <Text style={styles.formElement} >
                            Expiration Date <Text style={{color : 'tomato'}}>*</Text>
                        </Text>
                        <Exp setExpValue={setExp} required={expErr} setErr={setexpErr} />
                    </View>
                </View>
                <Text style={styles.formElement}>
                    Country <Text style={{color : 'tomato'}}>*</Text>
                </Text>
                <SelectCountry setCountryValue={setCountry} required={countryErr} setErr={setcountryErr} />
                <Text style={styles.formElement}>
                    City <Text style={{color : 'tomato'}}>*</Text>
                </Text>
                <Input 
                    value={city}
                    keyboardType={'default'}
                    textContentType={'addressCity'}
                    inputContainerStyle={[
                        styles.inputcontainerstyle,
                        city && city.length > 4 && { borderColor: 'green' },
                        cityErr && { borderColor: 'tomato' }
                    ]}
                    inputStyle= {styles.inputstyle}
                    containerStyle={{
                        paddingHorizontal: 0
                    }}
                    errorStyle={{ marginTop: 0, color: 'tomato' }}
                    onChangeText={ value => { setCity(value), setcityErr() } }
                />
                <Text style={styles.formElement}>
                    Billing address <Text style={{color : 'tomato'}}>*</Text>
                </Text>
                <Input
                    value={billingAddress}
                    keyboardType={'default'}
                    textContentType={'streetAddressLine1'}
                    inputContainerStyle={[
                        styles.inputcontainerstyle,
                        billingAddress && billingAddress.length > 4 && { borderColor: 'green' },
                        billingAddressErr && { borderColor: 'tomato' }
                    ]}
                    inputStyle= {styles.inputstyle}
                    containerStyle={{
                        paddingHorizontal: 0
                    }}
                    onChangeText={ value => { setBillingAddress(value), setbillingAddressErr() } }
                    errorStyle={{ marginTop: 0, color: 'tomato' }}
                />
                <Text style={styles.formElement}>
                    Postal code <Text style={{color : 'tomato'}}>*</Text>
                </Text>
                <Input
                    value={pcode}
                    keyboardType={'default'}
                    textContentType={'postalCode'}
                    inputContainerStyle={[styles.inputcontainerstyle, 
                        pcode && pcode.length > 4 && { borderColor: 'green' },
                        pcodeErr && { borderColor: 'tomato' }
                    ]}
                    inputStyle= {styles.inputstyle}
                    containerStyle={{
                        paddingHorizontal: 0
                    }}
                    onChangeText={ value => { setPcode(value), setpcodeErr() } }
                    errorStyle={{ marginTop: 0, color: 'tomato' }}
                />
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 20 }}>
                    <Button 
                        title={'Cancel'}
                        containerStyle={{ flexBasis: '47%' }}
                        buttonStyle={{
                            backgroundColor: 'transparent',
                            borderColor: Global.bg1,
                            borderWidth: 2,
                            height: 42
                        }}
                        disabled={loading}
                        disabledStyle={{ backgroundColor: 'transparent' }}
                        disabledTitleStyle={{ color: Global.bg1 }}
                        titleStyle={{ color: Global.bg1, fontSize: 15 }}
                        onPress={() => { navigation.pop() }}
                    />
                    <Button 
                        title={'Save'}
                        containerStyle={{ flexBasis: '47%' }}
                        buttonStyle={{
                            backgroundColor: Global.bg1,
                            height: 42
                        }}
                        titleStyle={loading ? { display: 'none' } : { fontSize: 15 }}
                        icon={ loading && <Flow size={30} color='white' /> }
                        disabled={loading}
                        iconContainerStyle={!loading ? { display: 'none' } : null}
                        onPress={handleSave}
                    />
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Global.primary,
        marginBottom: 20,
    },
    warning: {
        flexDirection: 'row',
        paddingHorizontal: 10,
        paddingVertical: 15,
        borderRadius: 5,
        backgroundColor: '#FCE2E3',
        marginBottom: 20,
        alignItems: 'center'
    },
    title: {
        paddingVertical: 15,
        marginBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#DDD',
        textAlign: 'center',
        fontSize: 18,
        color: '#444' 
    },
    inputcontainerstyle: {
        backgroundColor: "white",
        borderColor: '#CCC',
        borderWidth: 1,
        borderRadius: 5,
        height: 42,
        paddingVertical: 18
    },
    inputstyle : {
        fontSize: 15,
        paddingHorizontal: 5,
        paddingTop: 0,
        height: 42,
        color: 'black'
    },
    formElement : {
        marginBottom: 2,
        color: '#444',
        fontWeight: "700",
        fontSize: 14
    }
})
