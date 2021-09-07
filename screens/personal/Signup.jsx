import React, { useState } from 'react';

import {
    View,
    Text,
    Image,
    ScrollView,
    TouchableHighlight,
    StyleSheet
} from 'react-native';

import { Input, Button } from 'react-native-elements';

import { Flow } from 'react-native-animated-spinkit';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Global from '../Global';

import { 
    requiredInput, 
    emailValidation,
    phoneNumberValidation,
    pwdValidation,
    pwdConfirmationValidation
} from '../../functions/inputValidation';


import { useAuth } from '../../contexts/AuthContext';

export default function Signup({ navigation }) {

    const [pwdSecure, setPwdSecure] = useState(true);
    const [pwdCSecure, setPwdCSecure] = useState(true);

    const [firstName, setfirstName] = useState();
    const [lastName, setlastName] = useState();
    const [phoneNumber, setphoneNumber] = useState();
    const [email, setemail] = useState();
    const [pwd, setpwd] = useState();
    const [pwdConfirmation, setpwdConfirmation] = useState();
    
    const [firstNameErr, setfirstNameErr] = useState();
    const [lastNameErr, setlastNameErr] = useState();
    const [phoneNumberErr, setphoneNumberErr] = useState();
    const [emailErr, setemailErr] = useState();
    const [pwdErr, setpwdErr] = useState();
    const [pwdConfirmationErr, setpwdConfirmationErr] = useState();

    const [ loading, setLoading ] = useState(false);

    const { signup } = useAuth();

    const form = new Map([
        ["firstName", firstName],
        ["lastName", lastName],
        ["email", email],
        ["phoneNumber", phoneNumber],
        ["pwd", pwd],
        ["pwdConfirmation", pwdConfirmation],
    ])

    function handleChange(name, value){
        eval("set" + name + "Err('')");
        eval("set" + name + "('" + value + "')");
    }

    function handleSubmit(){
        var pwdSet = ""; 
        var goodToGo = true;
        for(const [ key, value ] of form){
            if(!requiredInput(key, value)){
                eval("set" + key + "Err('Required field')");
                goodToGo = false;
            } else {
                eval("set" + key + "Err('')");
                if( key === "pwd" ){
                    var err = pwdValidation(value);
                    setpwdErr(err);
                    if(err !== '') goodToGo = false;
                    pwdSet = value;
                }
                if( key === "pwdConfirmation" ){
                    var err = pwdConfirmationValidation(pwdSet, value);
                    setpwdConfirmationErr(err);
                    if(err !== '') goodToGo = false;
                }
                if( key === "email" ){
                    var err = emailValidation(value);
                    setemailErr(err);
                    if(err !== '') goodToGo = false;
                }
                if( key === "phoneNumber" ){
                    var err = phoneNumberValidation(value);
                    setphoneNumberErr(err);
                    if(err !== '') goodToGo = false;
                }
            }
        }

        if(goodToGo){
            setLoading(true);    
            var formData = {};
            for(const [ key, value ] of form){
                if(key !== "pwdConfirmation" ){
                    formData[key] = value;
                } else {
                    formData["pwd_confirmation"] = value;
                }
            }
            signup(formData, (res) => {
               if(res === "success"){
                navigation.push('verification', {
                    email
                })
               }
               setLoading(false);
            }, (error) => {
                if(!error.message){
                    for(let err in error){
                        eval("set" + err + "Err('" + errors[err][0] + "')");
                    }
                } else {
                    console.log(error);
                }
                setLoading(false);
            });
        }

    }

    return (
        <ScrollView 
            contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', height: '100%' }}
            style={{ backgroundColor: Global.primary }}
        >
            <>
            <TouchableHighlight style={styles.arrowStyle} underlayColor={'transparent'} onPress={() => navigation.pop()} >
                <MaterialCommunityIcons name='arrow-left' color={'white'} size={24}
                    style={{
                        padding: 0,
                        width: 24,
                        height: 24
                    }}
                />
            </TouchableHighlight>
            <View  style={[styles.container]}>
            <Image 
                style={styles.image}
                source={require('../../assets/Images/logo-white.png')}
            />
            <Text style={styles.title} >
                Sign Up
            </Text>
            <View style={{ flex: 1, alignItems: 'center', width: '95%', maxWidth: 425 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                    <InputSample
                        name="firstName" 
                        ph={'First name'} kT={'default'} aCT={'username'} tCT={'username'} iconName={'account'} fct={handleChange}
                        err={firstNameErr}
                    />
                    <InputSample 
                        name="lastName"
                        ph={'Last name'} kT={'default'} aCT={'username'} tCT={'username'} iconName={'account'} fct={handleChange}
                        err={lastNameErr}
                    />
                </View>
                <InputSample 
                    name="email"
                    ph={'Email'} kT={'email-address'} aCT={'email'} tCT={'emailAddress'} iconName={'email'} fct={handleChange}
                    err={emailErr}
                />
                <InputSample 
                    name="phoneNumber"
                    ph={'Phone number'} kT={'phone-pad'} aCT={'tel'} tCT={'telephoneNumber'} iconName={'phone'} fct={handleChange}
                    err={phoneNumberErr}
                />
                <Input
                    placeholder={"Password"}
                    keyboardType={"default"}
                    autoCompleteType={'password'}
                    textContentType={'password'}
                    autoCorrect={false}
                    leftIcon={
                        <MaterialCommunityIcons name="account-key" size={20} color={"#CCC"} />
                    }
                    rightIcon={
                        <PasswordEyeIcon pinSecure={pwdSecure} setPinSecure={setPwdSecure} />
                    }
                    leftIconContainerStyle={{
                        width: 30
                    }}
                    containerStyle={{
                        paddingHorizontal: 0,
                    }}
                    inputStyle={styles.input}
                    placeholderTextColor={"#CCC"}
                    inputContainerStyle={styles.inputcontainer}
                    secureTextEntry={pwdSecure}
                    onChangeText={(password) => handleChange("pwd", password)}
                    errorMessage={pwdErr}
                    errorStyle={styles.erroStyle}
                />
                <Input
                    placeholder={"Password Confirmation"}
                    keyboardType={"default"}
                    autoCompleteType={'password'}
                    textContentType={'password'}
                    autoCorrect={false}
                    leftIcon={
                        <MaterialCommunityIcons name="account-key" size={20} color={"#CCC"} />
                    }
                    rightIcon={
                        <PasswordEyeIcon pinSecure={pwdCSecure} setPinSecure={setPwdCSecure} />
                    }
                    leftIconContainerStyle={{
                        width: 30
                    }}
                    containerStyle={{
                        paddingHorizontal: 0,
                    }}
                    secureTextEntry={pwdCSecure}
                    inputStyle={styles.input}
                    placeholderTextColor={"#CCC"}
                    inputContainerStyle={styles.inputcontainer}
                    onChangeText={(passwordConfirmation) => handleChange('pwdConfirmation', passwordConfirmation)}
                    errorMessage={pwdConfirmationErr}
                    errorStyle={styles.erroStyle}
                />
                <View style={{marginTop: 10, alignItems: 'center', width: '100%'}}>
                    <Button 
                        title='SIGN UP'
                        containerStyle={styles.buttonstyle}
                        buttonStyle={styles.buttonstyle}
                        titleStyle={loading ? { display: 'none' } : { fontSize: 14 }}
                        icon={ loading && <Flow size={30} color='white' /> }
                        disabled={loading}
                        iconContainerStyle={!loading ? { display: 'none' } : null}
                        onPress={handleSubmit}
                        disabledStyle={{ backgroundColor: "#899B9A" }}
                    />
                    <BottomSign navigation={navigation} />
                </View>
            </View>
            </View>
            </>
        </ScrollView>
    )
}

function InputSample({ name, ph, kT, aCT, tCT, iconName, fct, err }){
    return (
        <Input 
            placeholder={ph}
            keyboardType={kT}
            autoCompleteType={aCT}
            textContentType={tCT}
            autoCorrect={false}
            leftIcon={
                <MaterialCommunityIcons name={iconName} size={20} color={"#CCC"} />
            }
            leftIconContainerStyle={{
                width: 30
            }}
            containerStyle={[{ paddingHorizontal: 0 }, ( ph === "First name" || ph === "Last name" ) ? { width: '49%' } : null]}
            inputStyle={styles.input}
            placeholderTextColor={"#CCC"}
            inputContainerStyle={styles.inputcontainer}
            onChangeText={(value) => fct(name, value)}
            errorMessage={err}
            errorStyle={styles.erroStyle}
        />
    )
}

function BottomSign({ navigation }){
    return (
        <>
            <View style={{
                marginTop: 10,
                flexDirection: 'row'
            }}>
            <Text
            style={{
                color: 'white',
                borderColor: "black"
            }}
            >
                Already have an account? {' '}
            </Text>
            <TouchableHighlight
                onPress={() => {
                    navigation.push('login');
                }}
                underlayColor={'transparent'}
            >
                <Text style={{
                    color: Global.tabactive
                }}>Log In</Text>                  
            </TouchableHighlight>
            </View>
        </>
    )
}

function PasswordEyeIcon({ pinSecure, setPinSecure }){

    return (
        <TouchableHighlight
            style={{ padding: 4 }}
            onPress={ () => {
                setPinSecure(!pinSecure)
            } }
            underlayColor={'transparent'}
        >
            {
                (pinSecure === true)? (
                    <MaterialCommunityIcons
                        name='eye'
                        color={"#CCC"}
                        size={20}
                    />
                ) : (
                    <MaterialCommunityIcons
                        name='eye-off'
                        color={"#CCC"}
                        size={20}
                    />
                )
            }
        </TouchableHighlight>
    )
}

const styles = StyleSheet.create({
    arrowStyle: {
        paddingLeft: 20,
        paddingTop: 20,
        paddingBottom: '5%'
    },
    container: {
        flexGrow: 1,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    image: {
        width: 35,
        height: 35,
        alignSelf: 'center',
        marginBottom: 5
    },
    title: {
        alignSelf: 'center',
        fontSize: 25,
        color: 'white',
        marginBottom: 40
    },
    inputcontainer: {
        borderColor: 'transparent',
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        padding: 10,
        height: 50,
        borderRadius: 50
    },
    input: {
        color: '#CCC',
        marginLeft: 2,
        fontSize: 16,
        backgroundColor: 'transparent'
    },
    buttonstyle: {
        width: '100%',
        height: 45,
        borderRadius: 50,
        backgroundColor: Global.buttonbg1
    },
    erroStyle: {
        fontSize: 14,
        fontWeight: '700',
        color: '#F88',
        marginTop: 0,
        marginBottom: 8,
        marginHorizontal: 30
    }
})



/*
<InputSample 
                    name="identity"
                    ph={'Identity Card'} kT={'default'} aCT={'off'} tCT={'none'} iconName={'card-account-details'} fct={handleChange}
                    err={identityErr}
                />
*/