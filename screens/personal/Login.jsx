import React, { useState } from 'react';

import {
    View,
    Text,
    Image,
    TouchableHighlight,
    StyleSheet
} from 'react-native';

import { Input, Button } from 'react-native-elements';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Global from '../Global';

import { useAuth } from '../../contexts/AuthContext';

export default function Login({ navigation, signed }) {

    const [pinSecure, setPinSecure] = useState(true);

    const [email, setEmail] = useState();
    const [pwd, setPwd] = useState();

    const [emailErr, setEmailErr] = useState('');
    const [pwdErr, setPwdErr] = useState('');

    const { login } = useAuth();

    function handleSubmit(){
        var goodToGo = true
        if(!email){
            goodToGo = false;
            setEmailErr('Required Field');
        }
        if(!pwd){
            goodToGo = false;
            setPwdErr('Required Field');
        }
        if(goodToGo){
            login({ email, pwd }, () => {
                signed();
            }, (error) => {
                if(error.email) setEmailErr(error.email[0]);
                if(error.pwd) setEmailErr(error.pwd[0]);
            });
        }
    }

    function handleEmail(value){
        setEmail(value);
        setEmailErr('');
    }
    
    function handlePwd(value){
        setPwd(value);
        setPwdErr('');
    }
    
    return (
        <View style={styles.container}>
            <Image 
                style={styles.image}
                source={require('../../assets/Images/logo-white.png')}
            />
            <Text style={styles.title} >
                Log In
            </Text>
            <View style={{ alignItems: 'center' }}>
                <Input
                    value={email}
                    placeholder={"Email"}
                    keyboardType={"email-address"}
                    autoCompleteType={'email'}
                    textContentType={'emailAddress'}
                    autoCorrect={false}
                    leftIcon={
                        <MaterialCommunityIcons name="email" size={20} color={"#CCC"} />
                    }
                    leftIconContainerStyle={{
                        width: 30
                    }}
                    containerStyle={{
                        paddingHorizontal: 0,
                        width: '90%',
                        maxWidth: 400,
                        minWidth: 320
                    }}
                    inputStyle={styles.input}
                    placeholderTextColor={"#CCC"}
                    inputContainerStyle={styles.inputcontainer}
                    onChangeText={handleEmail}
                    errorMessage={emailErr}
                    errorStyle={styles.erroStyle}
                />
                <Input
                    value={pwd}
                    placeholder={"Password"}
                    keyboardType={"default"}
                    autoCompleteType={'password'}
                    textContentType={'password'}
                    autoCorrect={false}
                    leftIcon={
                        <MaterialCommunityIcons name="account-key" size={20} color={"#CCC"} />
                    }
                    rightIcon={
                        <PasswordEyeIcon pinSecure={pinSecure} setPinSecure={setPinSecure} />
                    }
                    leftIconContainerStyle={{
                        width: 30
                    }}
                    containerStyle={{
                        paddingHorizontal: 0,
                        width: '90%',
                        maxWidth: 400,
                        minWidth: 320
                    }}
                    inputStyle={styles.input}
                    placeholderTextColor={"#CCC"}
                    inputContainerStyle={styles.inputcontainer}
                    secureTextEntry={pinSecure}
                    onChangeText={handlePwd}
                    errorMessage={pwdErr}
                    errorStyle={styles.erroStyle}
                />
                <TouchableHighlight>
                    <Text
                        style={{
                            alignSelf: 'center',
                            color: '#BBB'
                        }}
                    >
                        Forgot Password?
                    </Text>
                </TouchableHighlight>
                <View style={{marginTop: 30, alignItems: 'center'}}>
                    <Button 
                        title='LOGIN'
                        buttonStyle={styles.buttonstyle}
                        titleStyle={{
                            fontSize: 14
                        }}

                        onPress={handleSubmit}
                    />
                </View>
                <BottomLogin  navigation={navigation} />
            </View>
        </View>
    )
}

function BottomLogin({ navigation }){
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
                    Need an account? {' '}
                </Text>
                <TouchableHighlight
                    onPress={() => {
                        navigation.push("signup")
                    }}
                    underlayColor={'transparent'}
                >
                    <Text style={{
                        color: Global.tabactive
                    }}>Sign Up</Text>                  
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
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: Global.primary,
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
        height: 52,
        borderRadius: 25
    },
    input: {
        color: '#CCC',
        marginLeft: 2,
        fontSize: 16
    },
    buttonstyle: {
        width: 320,
        height: 45,
        borderRadius: 20,
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
